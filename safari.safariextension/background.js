let popup = null;
let selectedText = undefined;
const appURL = safari.extension.baseURI + 'app/player/index.html';

safari.application.addEventListener('contextmenu', function(event) {
  let selectedText = event.userInfo;

  if (!selectedText) return;

  if (selectedText.length > 20) {
    selectedText = selectedText.substr(0, 20) + '...';
  }

  if (selectedText !== '') {
    event.contextMenu.appendContextMenuItem('translateLSRD', 'Traducir "' + selectedText + '" a LSRD');
  }
}, false);

safari.application.addEventListener('command', function(event) {
  if (event.command === 'translateLSRD') {
    selectedText = event.userInfo;

    if (popup === null) {
      popup = safari.application.openBrowserWindow().activeTab;
      popup.url = appURL;

      popup.addEventListener('close', function() {
        popup = null;
      });

      popup.addEventListener('navigate', function(event) {
        if (event.target.url !== appURL) {
          popup = null;
        }
      });

      popup.addEventListener('message', function(request) {
        if (selectedText !== undefined && request.name === 'page:ready' && request.message == true) {
          popup.page.dispatchMessage('plugin:selectedText', selectedText);
          selectedText = undefined;
        };
      });
    } else {
      popup.browserWindow.activate();
      popup.page.dispatchMessage('plugin:selectedText', selectedText);
      selectedText = undefined;
    }
  }
}, false);
