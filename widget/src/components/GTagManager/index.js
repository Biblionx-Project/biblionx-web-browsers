// Optional Google Tag Manager integration for the Biblionx widget.
// Disabled by default: no tag is loaded and no data is sent unless a GTM
// container ID is supplied, either as an argument or via
// `window.BIBLIONX_GTM_ID` set by the host page before the widget loads.

const DATA_LAYER = 'biblionxDataLayer';

const resolveContainerId = (containerId) =>
  containerId || (typeof window !== 'undefined' && window.BIBLIONX_GTM_ID) || '';

export const initGTagManager = (containerId) => {
  const gtmId = resolveContainerId(containerId);
  if (!gtmId) return false;

  const existingGTMScript = document.querySelector(
    'script[src*="googletagmanager.com/gtm.js"]'
  );
  if (existingGTMScript) {
    sendCustomEvent('accessibility_activated', {
      user_action: 'activate_accessibility',
    });
    return false;
  }

  window[DATA_LAYER] = window[DATA_LAYER] || [];
  window[DATA_LAYER].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.async = true;
  script.src =
    'https://www.googletagmanager.com/gtm.js?id=' +
    encodeURIComponent(gtmId) +
    '&l=' +
    DATA_LAYER;
  document.head.appendChild(script);

  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src =
    'https://www.googletagmanager.com/ns.html?id=' + encodeURIComponent(gtmId);
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);

  return true;
};

function sendCustomEvent(eventName, eventData = {}) {
  window[DATA_LAYER] = window[DATA_LAYER] || [];
  const siteData = {
    site_domain: window.location.hostname,
    page_url: window.location.href,
    date: new Date().toISOString(),
  };
  window[DATA_LAYER].push({
    event: eventName,
    ...siteData,
    ...eventData,
  });
}
