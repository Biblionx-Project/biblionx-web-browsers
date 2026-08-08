<div align="center">
# VLibras Web (Plugins y Widget)

Los Plugins y el Widget de VLibras Web son extensiones para navegadores web y páginas HTML.

![Versión](https://img.shields.io/badge/version-v6.0.0-blue.svg)
![Plataforma](https://img.shields.io/badge/platform-chrome%20%7C%20firefox%20%7C%20safari-lightgrey)
![Licencia](https://img.shields.io/badge/license-LGPLv3-blue.svg)

</div>

> **Note — Biblionx-Project:** this repository is an adaptation of [VLibras](https://www.vlibras.gov.br/) kept as an architecture reference for the Biblionx thesis project (Dominican Sign Language, LSRD, text translator). The project's active, functional component is [`modelo-traductor-lsrd`](https://github.com/Biblionx-Project/modelo-traductor-lsrd); this repo is kept as a historical reference of the original VLibras ecosystem, not as an active dependency of the final product. See the [Biblionx-Project](https://github.com/Biblionx-Project) organization.

## Tabla de Contenidos

- [Primeros Pasos](#primeros-pasos)
  - [Requisitos del Sistema](#requisitos-del-sistema)
  - [Prerrequisitos](#prerrequisitos)
  - [Instalación](#instalacion)
- [Compilación](#compilacion)
  - [Compilar el Widget](#compilar-el-widget)
  - [Compilar los Plugins](#compilar-los-plugins)
- [Instalación en Producción / Uso](#instalacion-en-produccion-uso)
  - [Instalar el Widget](#instalar-el-widget)
  - [Instalar los Plugins](#instalar-los-plugins)
- [Modernización de Dependencias (Pasada Iteración)](#modernizacion-de-dependencias-pasada-iteracion)
- [Colaboradores](#colaboradores)
- [Licencia](#licencia)

## Primeros Pasos

Estas instrucciones le permitirán obtener una copia del proyecto compilada y ejecutándose en su máquina local para fines de desarrollo y pruebas.

### Requisitos del Sistema

* SO: Ubuntu 26.04 LTS o superior, o sistemas Windows/macOS compatibles.

### Prerrequisitos

Antes de comenzar la compilación de las herramientas, debe instalar algunos prerrequisitos:

[Node.js](https://nodejs.org/es/)

En sistemas basados en Debian/Ubuntu:

```sh
curl -sL https://deb.nodesource.com/setup_current.x | sudo -E bash -
```

```sh
sudo apt install -y nodejs
```
<br/>

[VLibras Player WebJS](https://gitlab.lavid.ufpb.br/vlibras2019/vlibras-player-webjs)

VLibras Player WebJS es requerido durante la instalación del proyecto; solo necesita clonarlo en la misma ruta que la raíz de este proyecto.

```sh
git clone https://gitlab.lavid.ufpb.br/vlibras2019/vlibras-web-extensions/vlibras-player-webjs.git
```

> Nota: Es necesario tener acceso al repositorio de VLibras Player WebJS para poder clonarlo.

### Configuración

Antes de ejecutar la aplicación, asegúrese de crear un archivo `.env` en la raíz del proyecto y definir la siguiente variable de entorno:

```dotenv
# Contenido de .env (definir como "production", "homolog" o "development")
MODE=development
```

### Instalación

Después de instalar todos los prerrequisitos, instale las dependencias del proyecto ejecutando el comando:

```bash
cd biblionx-web-browsers/
```

```sh
npm install
```

## Compilación

Una vez completada la instalación, puede proceder a compilar los Plugins y el Widget.

### Compilar el Widget

```sh
npm run gulp build:widget
```

El archivo compilado se puede encontrar en la carpeta `widget/app/`. Diríjase a la [sección de instalación del Widget](#instalar-el-widget) para ver las instrucciones de instalación.

### Compilar los Plugins

Antes de compilar, debe establecer `$is-widget` en `0` en `plugin/scss/_variables.scss`:

```scss
$is-widget: 0;
```

Para compilar el plugin, tiene dos opciones diferentes según el navegador de destino:

- Firefox/Chrome - los archivos compilados se pueden encontrar en la carpeta `webextensions`.

```sh
npm run gulp build:webextensions
```

- Safari - los archivos compilados se pueden encontrar en la carpeta `safari.safariextension`.

```sh
npm run gulp build:safari
```

> Nota: También puede generar todas las compilaciones para todos los destinos a la vez ejecutando el comando: `npm run gulp build`

## Instalación en Producción / Uso

### Instalar el Widget

El Widget se puede instalar en su sitio web insertando unos pocos fragmentos de código antes de cerrar la etiqueta `<body>` de una página HTML:

```html
<body> <!-- Inicio del cuerpo de la página -->

  ... <!-- Contenido de la página -->

  <div vw class="enabled">
    <div vw-access-button class="active"></div>
    <div vw-plugin-wrapper>
      <div class="vw-plugin-top-wrapper"></div>
    </div>
  </div>
  <script src="<su-ruta-de-directorio>/app/vlibras-plugin.js"></script>
  <script>
    new window.VLibras.Widget();
  </script>
</body> <!-- Fin del cuerpo de la página -->
```

> Nota: La carpeta `app` se puede copiar a cualquier directorio, recuerde ingresar la ruta correcta hacia ella.

#### Configuración de Valores por Defecto

Al usar el Widget, puede personalizar varios aspectos como la opacidad, posición y el avatar inicial. A continuación se presentan los parámetros disponibles:

| Parámetro         | Valor por Defecto                | Descripción  |
| ----------------- | -------------------------------- | ------------ |
| `rootPath`        | `"https://vlibras.gov.br/app/"`  | La ruta base para los recursos utilizados por el Widget. Puede configurarse para apuntar a un directorio específico. En desarrollo, use su ruta local. |
| `personalization` | `null`                           | Especifica una URL JSON válida para configuraciones personalizadas de avatar. |
| `opacity`         | `1`                              | Controla la opacidad de fondo del Widget. Un valor entre 0 (completamente transparente) y 1 (completamente opaco). |
| `position`        | `"R"`                            | Establece la posición inicial del Widget en la página. Los valores válidos son: "TL" (arriba-izquierda), "T" (arriba), "TR" (arriba-derecha), "R" (derecha), "BR" (abajo-derecha), "B" (abajo), "BL" (abajo-izquierda) y "L" (izquierda). |
| `avatar`          | `"icaro"`                        | Define el avatar inicial de VLibras. Los avatares disponibles son: "icaro", "hosana" y "guga". También puede usar "random". |

Ejemplo de uso:

```javascript
new window.VLibras.Widget({
  rootPath: "/app",
  personalization: 'https://vlibras.gov.br/config/configs.json',
  opacity: 0.75,
  position: 'L',
  avatar: 'random'
});
```

### Instalar los Plugins

VLibras ya cuenta con versiones oficiales de los plugins en las tiendas de extensiones de Chrome y Firefox.
Para usar la versión de los plugins compilada en su máquina, consulte las instrucciones de instalación de extensiones en la página oficial de su navegador.

## Modernización de Dependencias

En la última iteración, el proyecto pasó por un proceso de modernización para alinearse con los estándares actuales de desarrollo:
- **Migración de SASS**: Se reemplazó el paquete deprecado `node-sass` por la implementación oficial moderna `sass` (Dart Sass), lo que mejora la compatibilidad y estabilidad en la compilación de estilos.
- **Soporte Multiplataforma**: Se integró `cross-env` en los scripts de ejecución de `npm` para asegurar el correcto establecimiento de variables de entorno (como `MODE`) tanto en sistemas Unix como en Windows.
- **Actualización de Dependencias**: Se actualizaron paquetes clave como `nouislider` (de v8 a v15.8.1), `trie-search` (de v1 a v2.2.1), `webpack` a v5.97.1, y los loaders de estilos/sass correspondientes.

## Colaboradores

* Diêgo Ferreira - <diego.raian@lavid.ufpb.br>
* Mateus Pires - <mateuspires@lavid.ufpb.br>
* Suanny Fabyne - <suanny@lavid.ufpb.br>
* Thiago Filipe - <thiago.filipe@lavid.ufpb.br>

## Licencia

Este proyecto está bajo la Licencia LGPLv3 - ver el archivo [LICENSE](LICENSE) para más detalles.
