(function () {
  function getText(element) {
    var value = element.nodeValue;
    if (!value)
      if (!element.firstChild)
        return null;
      else
        return getText(element.firstChild);
    return value.replace(/(\n|  |\t)/g, '');
  }

  function createLink(header, id) {
    var link = document.createElement('a');
    link.href = '#' + id;
    link.innerText = '¶';
    header.appendChild(link);
  }

  function execute(header) {
    var id = getText(header.firstChild);
    if (!id)
      return;
    header.id = id;
    createLink(header, id);
  }
  document.addEventListener('DOMContentLoaded', function () {
    if (!document.querySelector('.posts'))
      [].forEach.call(document.querySelectorAll('.post h2, .post h3'), execute);
  });
})();
