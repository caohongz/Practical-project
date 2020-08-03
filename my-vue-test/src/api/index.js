export function getCourses() {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove([{ name: "web全栈" }, { name: "web高级" }]);
    }, 2000);
  });
}
