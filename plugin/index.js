const Plugin = require('./Plugin.js');

if (typeof window !== 'undefined') {
  window.Biblionx = window.Biblionx || {};
  window.Biblionx.Plugin = Plugin;
  window.VLibras = window.VLibras || window.Biblionx;
}

export { Plugin };

