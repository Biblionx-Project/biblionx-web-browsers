const Plugin = require('./Plugin.js');

if (typeof window !== 'undefined') {
  window.Biblionx = window.Biblionx || {};
  window.Biblionx.Plugin = Plugin;
}

export { Plugin };

