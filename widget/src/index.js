const Widget = require('./Widget');

if (typeof window !== 'undefined') {
  window.Biblionx = window.Biblionx || {};
  window.Biblionx.Widget = Widget;
  window.VLibras = window.VLibras || window.Biblionx;
}

export { Widget };
