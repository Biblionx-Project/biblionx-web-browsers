window.resizeTo(540, 470);

safari.self.addEventListener('message', function(request) {
  if (request.name !== 'plugin:selectedText' && request.message === undefined) {
    return;
  }

  const PluginClass = window.Biblionx && window.Biblionx.Plugin;

  if (!PluginClass) return;

  window.plugin =
    window.plugin || new PluginClass({enableMoveWindow: false});
  window.plugin.translate(request.message);
});

safari.self.tab.dispatchMessage('page:ready', true);
