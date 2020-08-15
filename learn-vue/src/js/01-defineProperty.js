const obj = {
  foo: "foo",
  bar: "bar",
  baz: { a: 1 },
};
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
  Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
}

function set(obj, key, val) {
  defineReactive(obj, key, val);
}

observe(obj);

// defineReactive(obj, "foo", "foo");
// obj.foo;
// obj.baz = { a: 10 };
// obj.baz.a = 100;
set(obj, "dong", "dong");
obj.dong;
