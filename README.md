<div align="center">

# Biblionx Web Browsers (Plugins and Widget)

*Browser extensions and an embeddable web widget that translate written Spanish into Dominican Sign Language (LSRD) with a 3D signing avatar.*

![Version](https://img.shields.io/badge/version-v6.0.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-chrome%20%7C%20firefox-lightgrey)
![License](https://img.shields.io/badge/license-LGPLv3-blue.svg)

</div>

Biblionx is a UNICDA thesis project (Trabajo de Grado) that translates written Spanish (Dominican Republic) into **Dominican Sign Language (LSRD, Lengua de Señas Dominicana)**. This repository holds the browser-side front end of the Biblionx architecture:

- **Widget** - a script that website owners embed in their pages. It adds a floating accessibility button; visitors select text and the avatar signs it in LSRD.
- **Plugins** - Chrome (Manifest V3) and Firefox (Manifest V2) extensions that add a context-menu entry to translate selected text on any page in a popup player window.

Both targets share the same UI code (`plugin/`) and embed the sign player from [`biblionx-player-webjs`](https://github.com/Biblionx-Project/biblionx-player-webjs).

> **Status:** this repository is a Biblionx architecture reference component. The active, functional product is [`biblionx-lsrd-translator`](https://github.com/Biblionx-Project/biblionx-lsrd-translator). See the [Biblionx-Project](https://github.com/Biblionx-Project) organization for the other components.

## Table of Contents

- [Repository Layout](#repository-layout)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Configuration](#configuration)
  - [Installation](#installation)
- [Build](#build)
  - [Building the Widget](#building-the-widget)
  - [Building the Plugins](#building-the-plugins)
  - [Local Development Server](#local-development-server)
- [Usage](#usage)
  - [Embedding the Widget](#embedding-the-widget)
  - [Widget Options](#widget-options)
  - [Loading the Plugins](#loading-the-plugins)
- [Origins](#origins)

## Repository Layout

| Path | Contents |
| ---- | -------- |
| `plugin/` | Shared UI: `Plugin.js` (player wrapper), components (dictionary, settings, suggestion and info screens), SCSS, icons, fonts and the per-mode endpoint constants in `plugin/constants/`. Entry point for the extensions: `plugin/index.js`. |
| `widget/` | Widget entry point (`widget/src/index.js`, `Widget.js`), widget-only components and styles, a demo page (`widget/index.html`) and a small static server (`widget/server.js`). Build output goes to `widget/app/`. |
| `webextensions/chrome.extension/` | Chrome extension (Manifest V3, service worker, context menu). Build output goes to `app/player/`. |
| `webextensions/firefox.extension/` | Firefox extension (Manifest V2, background script, context menu). Build output goes to `app/player/`. |
| `safari.safariextension/` | Legacy Safari extension sources. Not wired into the gulp build and not maintained. |
| `gulpfile.js` | Build tasks (`build:widget`, `build:chrome`, `build:firefox`, `build:webextensions`, `build`, `run:widget`). |
| `webpack.config.js` | Bundles `plugin/index.js` or `widget/src/index.js` into a single script exposed on `window`. |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) 22 LTS or later with npm. Several current dev dependencies (for example `sass-loader` 17 and `cross-env` 10) require a recent Node.js; the `.nvmrc` pin is outdated.
- [Biblionx Player WebJS](https://github.com/Biblionx-Project/biblionx-player-webjs), cloned as a **sibling directory** of this repository. `package.json` installs it from `file:../biblionx-player-webjs`, and the build copies its prebuilt Unity player from `src/target/`.

```sh
git clone https://github.com/Biblionx-Project/biblionx-player-webjs.git
git clone https://github.com/Biblionx-Project/biblionx-web-browsers.git
```

Resulting layout:

```
.
├── biblionx-player-webjs/
└── biblionx-web-browsers/
```

### Configuration

The build mode selects which endpoint file in `plugin/constants/` is bundled (`development-paths.js`, `homolog-paths.js` or `production-paths.js`). Copy `.env.example` to `.env` and set the mode:

```dotenv
# production | homolog | development
BIBLIONX_MODE=development
MODE=development
```

`BIBLIONX_MODE` takes precedence over `MODE`; if neither is set, `production` is used. The `npm run build`, `build-debug`, `test` and `test-prod` scripts set `MODE` themselves through `cross-env`.

Each constants file defines:

| Constant | Purpose |
| -------- | ------- |
| `ROOT_PATH` | Public path the bundle loads its assets and player from (also the widget's default `rootPath`). |
| `DICTIONARY_URL` | LSRD dictionary word list endpoint. |
| `REVIEW_URL` | Translation review/suggestion endpoint. |
| `SIGNS_URL` | Base URL for sign images. |

Development and homolog modes point to a local backend at `http://localhost:8000`. Each value can be overridden by an environment variable of the same name at build time, or by editing the constants file.

### Installation

```sh
cd biblionx-web-browsers
npm install
```

## Build

### Building the Widget

Make sure `$is-widget` is set to `1` in `plugin/scss/_variables.scss` (the default):

```scss
$is-widget: 1;
```

Then run:

```sh
npm run gulp build:widget
```

The widget bundle, `index.html`, assets, fonts and the player (`target/`) are written to `widget/app/`.

### Building the Plugins

Before building the extensions, set `$is-widget` to `0` in `plugin/scss/_variables.scss`:

```scss
$is-widget: 0;
```

Then build both browser extensions:

```sh
npm run gulp build:webextensions
```

or a single one with `npm run gulp build:chrome` / `npm run gulp build:firefox`. Output is written to `webextensions/<browser>.extension/app/player/`.

`npm run build` (production) and `npm run build-debug` (development) build the extensions and the widget in one pass. Because both targets share the same `$is-widget` setting, build the widget and the plugins separately when you need correct styles for each.

### Local Development Server

```sh
npm test         # development mode
npm run test-prod  # production mode
```

This runs the `run:widget` gulp task: it rebuilds the widget whenever files under `plugin/`, `widget/src/` or `widget/assets/` change and serves `widget/app/` with `widget/server.js` at `http://localhost:8080`.

To lint the code base (with automatic fixes):

```sh
npm run lint
```

## Usage

### Embedding the Widget

Copy the built `widget/app/` folder to your web server and add the following markup before the closing `</body>` tag of your page.

```html
<div vw class="enabled">
  <div vw-access-button class="active"></div>
  <div vw-plugin-wrapper>
    <div class="vw-plugin-top-wrapper"></div>
  </div>
</div>
<script src="<path-to>/app/biblionx-plugin.js"></script>
<script>
  new window.Biblionx.Widget({ rootPath: '<path-to>/app' });
</script>
```

`widget/index.html` is a complete working example page.

### Widget Options

`new window.Biblionx.Widget(options)` accepts:

| Option | Default | Description |
| ------ | ------- | ----------- |
| `rootPath` | `ROOT_PATH` of the build mode | Base path of the `app/` folder (bundle, assets and `target/` player). A trailing `/` is added if missing. |
| `personalization` | `undefined` | URL of a JSON file with avatar/logo personalization settings. |
| `opacity` | `1` | Widget background opacity, from `0` (transparent) to `1` (opaque). |
| `position` | `"R"` | Initial position: `"TL"`, `"T"`, `"TR"`, `"L"`, `"R"`, `"BL"`, `"B"` or `"BR"`. |
| `avatar` | `"icaro"` | Initial avatar: `"icaro"`, `"hosana"`, `"guga"` or `"random"`. |

Example:

```javascript
new window.Biblionx.Widget({
  rootPath: '/app',
  personalization: 'http://localhost:8000/config/default_logo.json',
  opacity: 0.75,
  position: 'L',
  avatar: 'random',
});
```

### Loading the Plugins

The extensions are not published to any browser store; load the local build instead:

- **Chrome:** open `chrome://extensions`, enable *Developer mode*, choose *Load unpacked* and select `webextensions/chrome.extension/`.
- **Firefox:** open `about:debugging#/runtime/this-firefox`, choose *Load Temporary Add-on* and select `webextensions/firefox.extension/manifest.json`.

Select text on any page, right-click and choose **Traducir '...' a LSRD (Biblionx)** to open the LSRD player popup.

## Origins

This project was initially forked from the open-source VLibras project. It has since evolved enough to stand as an independent project of its own. Licensed under LGPLv3 — see [LICENSE](LICENSE).
