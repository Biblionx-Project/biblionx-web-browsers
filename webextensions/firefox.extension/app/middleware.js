let isLoaded = false;

// Biblionx endpoint configuration (local development default, fallback to production)
const BIBLIONX_API =
  (typeof window !== 'undefined' && window.BIBLIONX_API) ||
  'http://localhost:8000'; // production fallback: https://api.biblionx.org

window.addEventListener('load', () => {
  const PluginClass =
    (window.Biblionx && window.Biblionx.Plugin) ||
    (window.VLibras && window.VLibras.Plugin);

  if (!PluginClass) {
    console.error('Biblionx/VLibras plugin constructor not found');
    return;
  }

  window.plugin =
    window.plugin ||
    new PluginClass({
      enableMoveWindow: false,
      personalization: `${BIBLIONX_API}/config/default_logo.json`,
    });
});

window.addEventListener('message', ({ data }) => {
  if (typeof data !== 'string' || !data.trim()) return;
  if (!isLoaded) boundTranslate(data);
  else translate(data);
});

function boundTranslate(text) {
  if (!window.plugin || !window.plugin.player) return;
  window.plugin.player.on('load', () => {
    const interval = setInterval(() => {
      if (isLoadedControls()) {
        isLoaded = true;
        setTimeout(() => translate(text), 1000);
        clearInterval(interval);
      }
    }, 500);
  });
}

function translate(text) {
  if (!window.plugin || !window.plugin.player) return;
  window.plugin.player.translate(text);
}

function isLoadedControls() {
  return !!document.querySelector('[vp-controls].vpw-controls');
}
