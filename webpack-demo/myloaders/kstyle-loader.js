// 暗号：可以做，但没必要
module.exports = function (source) {
  console.log(source);
  return `const tag = document.createElement('style');
    tag.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(tag)`;
};
