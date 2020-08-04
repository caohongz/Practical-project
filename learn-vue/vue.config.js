module.exports = {
  devServer: {
    before(app) {
      app.get("/api/courses", (req, res) => {
        setTimeout(() => {
          res.json([{ name: "web全栈" }, { name: "web高级" }]);
        }, 1000);
      });
    },
    // proxy: "http://localhost:3000",
  },
};
