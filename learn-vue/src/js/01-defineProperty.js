const obj = {
  foo: "foo",
  bar: "bar",
  baz: { a: 1 },
  array: [1, 2, 3],
};

const originalProto = Array.prototype;
const arrayProto = Object.create(originalProto);
["push", "pop", "shift", "unshift"].forEach((method) => {
  arrayProto[method] = function() {
    originalProto[method].apply(this, arguments);
    console.log("数组执行" + method + "操作：" + arguments);
  };
});

function defineReactive(obj, key, val) {
  observe(val);
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key, val);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        observe(newVal);
        val = newVal;
        console.log("set", key, val);
      }
    },
  });
}

function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }
  if (Array.isArray(obj)) {
    obj.__proto__ = arrayProto;
    const keys = Object.keys(obj);
    for (let i = 0; i < obj.length; i++) {
      observe(obj[i]);
    }
  } else {
    Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
  }
}

function set(obj, key, val) {
  defineReactive(obj, key, val);
}

observe(obj);

// defineReactive(obj, "foo", "foo");
// obj.foo;
obj.baz;
// obj.baz.a = 100;
set(obj, "dong", "dong");
obj.dong;
obj.array.push(4);
obj.array;
