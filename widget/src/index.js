const Widget = require('./Widget');

if (typeof window !== 'undefined') {
  window.Biblionx = window.Biblionx || {};
  window.Biblionx.Widget = Widget;
}

export { Widget };
