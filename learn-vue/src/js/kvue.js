function defineReactive(obj, key, val) {
  observe(val);
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      Dep.target && dep.addDep(Dep.target);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        observe(newVal);
        val = newVal;
        dep.notify();
      }
    },
  });
}

function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }
  new Observer(obj);
}

function set(obj, key, val) {
  defineReactive(obj, key, val);
}

class Observer {
  constructor(value) {
    this.value = value;
    if (Array.isArray(value)) {
      // todo
    } else {
      this.walk(value);
    }
  }
  walk(obj) {
    Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
  }
}

function proxy(vm) {
  Object.keys(vm.$data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key];
      },
      set(newVal) {
        vm.$data[key] = newVal;
      },
    });
  });
}

class KVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    observe(this.$data);
    proxy(this);
    new Compile(options.el, this);
  }
}

class Compile {
  constructor(el, vm) {
    this.$el = document.querySelector(el);
    this.$vm = vm;
    this.compile(this.$el);
  }
  compile(el) {
    el.childNodes.forEach((node) => {
      if (node.nodeType === 1) {
        console.log("编译元素", node.nodeName);
        this.compileElement(node);
      } else if (this.isInter(node)) {
        console.log("文本节点", node.textContent);
        this.compileText(node);
      }
      if (node.childNodes) {
        this.compile(node);
      }
    });
  }
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  compileText(node) {
    console.log(RegExp.$1);
    this.update(node, RegExp.$1, "text");
  }

  compileElement(node) {
    const attrs = node.attributes;
    Array.from(attrs).forEach((attr) => {
      const { name, value } = attr;
      if (name.indexOf("k-") === 0) {
        const dir = name.substring(2);
        this[dir] && this[dir](node, value);
        console.log("dir");
      } else if (name.indexOf("@") === 0) {
        const command = name.substring(1);
        const callback =
          this.$vm.$options.methods && this.$vm.$options.methods[value];
        console.log("@", command, callback);
        if (command === "click") {
          node.addEventListener("click", callback.bind(this.$vm));
        }
      }
    });
  }

  text(node, exp) {
    this.update(node, exp, "text");
  }

  html(node, exp) {
    this.update(node, exp, "html");
  }

  update(node, exp, dir) {
    const fn = this[dir + "Updater"];
    fn && fn(node, this.$vm[exp]);
    new Watcher(this.$vm, exp, (val) => {
      fn && fn(node, val);
    });
  }

  textUpdater(node, value) {
    node.textContent = value;
  }

  htmlUpdater(node, value) {
    node.innerHTML = value;
  }
}

// const watchers = [];

class Watcher {
  constructor(vm, key, fn) {
    this.vm = vm;
    this.key = key;
    this.fn = fn;
    Dep.target = this;
    this.vm[this.key];
    Dep.target = null;
  }
  update() {
    this.fn.call(this.vm, this.vm[this.key]);
  }
}

class Dep {
  constructor() {
    this.deps = [];
  }

  addDep(dep) {
    this.deps.push(dep);
  }

  notify() {
    this.deps.forEach((dep) => dep.update());
  }
}
