<div align="center">
# Biblionx Web (Plugins and Widget)

*Adapted from [VLibras](https://www.vlibras.gov.br/) Web — browser extensions and widget for web pages.*

![Version](https://img.shields.io/badge/version-v6.0.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-chrome%20%7C%20firefox%20%7C%20safari-lightgrey)
![License](https://img.shields.io/badge/license-LGPLv3-blue.svg)

</div>

> **Note — Biblionx-Project:** this repository is an adaptation of [VLibras](https://www.vlibras.gov.br/) kept as an architecture reference for the Biblionx thesis project (Dominican Sign Language, LSRD, text translator). The project's active, functional component is [`biblionx-lsrd-translator`](https://github.com/Biblionx-Project/biblionx-lsrd-translator); this repo is kept as a historical reference of the original VLibras ecosystem, not as an active dependency of the final product. See the [Biblionx-Project](https://github.com/Biblionx-Project) organization.

## Table of Contents

- [Getting Started](#getting-started)
  - [System Requirements](#system-requirements)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Build](#build)
  - [Building the Widget](#building-the-widget)
  - [Building the Plugins](#building-the-plugins)
- [Production Installation / Usage](#production-installation--usage)
  - [Installing the Widget](#installing-the-widget)
  - [Installing the Plugins](#installing-the-plugins)
- [Dependency Modernization (Past Iteration)](#dependency-modernization-past-iteration)
- [Contributors](#contributors)
- [License](#license)

## Getting Started

These instructions will get you a copy of the project built and running on your local machine for development and testing purposes.

### System Requirements

* OS: Ubuntu 26.04 LTS or later, or compatible Windows/macOS systems.

### Prerequisites

Before starting the build process, you need to install a few prerequisites:

[Node.js](https://nodejs.org/en/)

On Debian/Ubuntu-based systems:

```sh
curl -sL https://deb.nodesource.com/setup_current.x | sudo -E bash -
```

```sh
sudo apt install -y nodejs
```
<br/>

[Biblionx Player WebJS](https://github.com/Biblionx-Project/biblionx-player-webjs)

Biblionx Player WebJS is required during the installation of the project; you just need to clone it into the same path as this project's root.

```sh
git clone https://github.com/Biblionx-Project/biblionx-player-webjs.git
```

> Note: You need access to the Biblionx Player WebJS repository in order to clone it.

### Configuration

Before running the application, make sure to create a `.env` file at the project root and define the following environment variable:

```dotenv
# .env content (set to "production", "homolog", or "development")
MODE=development
```

### Installation

After installing all the prerequisites, install the project's dependencies by running the command:

```bash
cd biblionx-web-browsers/
```

```sh
npm install
```

## Build

Once the installation is complete, you can proceed to build the Plugins and the Widget.

### Building the Widget

```sh
npm run gulp build:widget
```

The compiled file can be found in the `widget/app/` folder. See the [Widget installation section](#installing-the-widget) for installation instructions.

### Building the Plugins

Before building, you must set `$is-widget` to `0` in `plugin/scss/_variables.scss`:

```scss
$is-widget: 0;
```

To build the plugin, you have two different options depending on the target browser:

- Firefox/Chrome - the compiled files can be found in the `webextensions` folder.

```sh
npm run gulp build:webextensions
```

- Safari - the compiled files can be found in the `safari.safariextension` folder.

```sh
npm run gulp build:safari
```

> Note: You can also generate all builds for all targets at once by running: `npm run gulp build`

## Production Installation / Usage

### Installing the Widget

The Widget can be installed on your website by inserting a few code snippets before closing the `<body>` tag of an HTML page:

```html
<body> <!-- Start of page body -->

  ... <!-- Page content -->

  <div vw class="enabled">
    <div vw-access-button class="active"></div>
    <div vw-plugin-wrapper>
      <div class="vw-plugin-top-wrapper"></div>
    </div>
  </div>
  <script src="<your-directory-path>/app/vlibras-plugin.js"></script>
  <script>
    new window.VLibras.Widget();
  </script>
</body> <!-- End of page body -->
```

> Note: The `app` folder can be copied to any directory; remember to enter the correct path to it.

#### Default Values Configuration

When using the Widget, you can customize several aspects such as opacity, position, and the initial avatar. The available parameters are listed below:

| Parameter         | Default Value                    | Description  |
| ----------------- | -------------------------------- | ------------ |
| `rootPath`        | `"https://vlibras.gov.br/app/"`  | The base path for the resources used by the Widget. Can be configured to point to a specific directory. In development, use your local path. |
| `personalization` | `null`                           | Specifies a valid JSON URL for custom avatar configurations. |
| `opacity`         | `1`                              | Controls the Widget's background opacity. A value between 0 (fully transparent) and 1 (fully opaque). |
| `position`        | `"R"`                            | Sets the Widget's initial position on the page. Valid values are: "TL" (top-left), "T" (top), "TR" (top-right), "R" (right), "BR" (bottom-right), "B" (bottom), "BL" (bottom-left), and "L" (left). |
| `avatar`          | `"icaro"`                        | Defines the initial VLibras avatar. Available avatars are: "icaro", "hosana", and "guga". You can also use "random". |

Usage example:

```javascript
new window.VLibras.Widget({
  rootPath: "/app",
  personalization: 'https://vlibras.gov.br/config/configs.json',
  opacity: 0.75,
  position: 'L',
  avatar: 'random'
});
```

### Installing the Plugins

VLibras already has official plugin versions in the Chrome and Firefox extension stores.
To use the version of the plugins built on your machine, see the extension installation instructions on your browser's official page.

## Dependency Modernization

In the latest iteration, the project went through a modernization process to align with current development standards:
- **SASS Migration**: The deprecated `node-sass` package was replaced with the modern official implementation `sass` (Dart Sass), improving compatibility and stability when compiling styles.
- **Cross-Platform Support**: `cross-env` was integrated into the `npm` run scripts to ensure environment variables (such as `MODE`) are correctly set on both Unix and Windows systems.
- **Dependency Updates**: Key packages were updated, including `nouislider` (from v8 to v15.8.1), `trie-search` (from v1 to v2.2.1), `webpack` to v5.97.1, and the corresponding style/sass loaders.

## Contributors

* Diêgo Ferreira - <diego.raian@lavid.ufpb.br>
* Mateus Pires - <mateuspires@lavid.ufpb.br>
* Suanny Fabyne - <suanny@lavid.ufpb.br>
* Thiago Filipe - <thiago.filipe@lavid.ufpb.br>

## License

This project is licensed under the LGPLv3 License - see the [LICENSE](LICENSE) file for details.
