const less = require("less");
// 暗号：可以做，但没必要
module.exports = function (source) {
  less.render(source, (err, output) => {
    this.callback(err, output.css);
  });
};
