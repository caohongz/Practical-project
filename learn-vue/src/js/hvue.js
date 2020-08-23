function defineReactive(obj, key, val) {
  const dep = new Dep();
  observe(val);
  Object.defineProperty(obj, key, {
    get() {
      console.log("get:", key, val);
      Dep.target && dep.addDep(Dep.target);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        val = newVal;
        dep.notify();
        console.log("set:", key, val);
      }
    },
  });
}

function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }
  new Observe(obj);
}

class Observe {
  constructor(value) {
    this.value = value;
    if (Array.isArray(this.value)) {
      // todo
    } else {
      this.walk();
    }
  }
  walk() {
    Object.keys(this.value).forEach((key) => {
      defineReactive(this.value, key, this.value[key]);
    });
  }
}

function proxy(vm) {
  Object.keys(vm.$data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key];
      },
      set(newVal) {
        if (newVal !== vm.$data[key]) {
          vm.$data[key] = newVal;
        }
      },
    });
  });
}

class HVue {
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
        console.log("Element Node:", node.nodeName);
        this.elementCompile(node);
      } else if (this.isInter(node)) {
        console.log("Text Node:", node.textContent);
        this.textCompile(node);
      }
      if (node.childNodes) {
        this.compile(node);
      }
    });
  }
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }
  elementCompile(node) {
    Array.from(node.attributes).forEach((attr) => {
      const { name, value } = attr;
      console.log("test", name, value);
      if (name.indexOf("k-") === 0) {
        const dir = name.substring(2);
        this[dir] && this[dir](node, value);
        console.log("text", dir, this[dir]);
      } else if (name.indexOf("@") === 0) {
        const dir = name.substring(1);
        console.log("ele", dir);

        const callback =
          this.$vm.$options.methods && this.$vm.$options.methods[value];
        if (dir === "click") {
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
  textCompile(node) {
    this.update(node, RegExp.$1, "text");
  }
  update(node, exp, dir) {
    const fn = dir + "Updater";
    this[fn] && this[fn](node, this.$vm[exp]);
    new Watcher(this.$vm, exp, (val) => {
      this[fn] && this[fn](node, val);
    });
  }
  textUpdater(node, val) {
    node.textContent = val;
  }
  htmlUpdater(node, val) {
    node.innerHTML = val;
  }
}

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
    console.log(this.fn);
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
