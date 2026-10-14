window.addEventListener('load', function () {
  const iframe = document.querySelector('iframe');
  const runtime =
    typeof browser !== 'undefined' && browser.runtime
      ? browser.runtime
      : chrome.runtime;

  runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (!request || request.selectedText === undefined) return;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(request.selectedText, '*');
    }
  });
  runtime.sendMessage({ ready: true });
});
