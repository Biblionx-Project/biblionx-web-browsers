const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const fs = require('fs');
const path = require('path');

const options = {
  dest: {
    widget: 'widget/app',
    chrome: 'webextensions/chrome.extension/app/player',
    firefox: 'webextensions/firefox.extension/app/player',
  },
};

function build(target, {
  player = 'node_modules/vlibras/src/target/**/*',
  script = 'plugin/index.js',
  template = 'plugin/index.html',
} = {}) {
  const destPath = options.dest[target];

  const webpackCfg = target === 'widget' ? webpackConfig.widgetWebpackConfig : webpackConfig.pluginWebpackConfig;

  const pluginOptions = { cwd: 'plugin', base: 'plugin' };
  const targetOptions = { cwd: target, base: target };

  const promises = [];

  const runStream = (stream) => {
    return new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('end', resolve);
      stream.on('error', reject);
    });
  };

  promises.push(runStream(gulp.src(player).pipe(gulp.dest(`${destPath}/target`))));
  promises.push(runStream(gulp.src(script).pipe(webpack(webpackCfg)).pipe(gulp.dest(destPath))));
  promises.push(runStream(gulp.src(template).pipe(gulp.dest(destPath))));
  promises.push(runStream(gulp.src(['assets/*', '!assets/icons/**'], pluginOptions).pipe(gulp.dest(destPath))));
  promises.push(runStream(gulp.src('assets/fonts/*', pluginOptions).pipe(gulp.dest(destPath))));

  if (fs.existsSync(path.join(target, 'assets'))) {
    promises.push(runStream(gulp.src(['assets/*', '!assets/icons/**'], targetOptions).pipe(gulp.dest(destPath))));
  }
  if (fs.existsSync(path.join(target, 'assets/fonts'))) {
    promises.push(runStream(gulp.src('assets/fonts/*', targetOptions).pipe(gulp.dest(destPath))));
  }

  return Promise.all(promises);
}

gulp.task('build:chrome', () => build('chrome'));
gulp.task('build:firefox', () => build('firefox'));

gulp.task('build:webextensions', gulp.series('build:chrome', 'build:firefox'));

gulp.task('build:widget', () => build('widget', {
  script: 'widget/src/index.js',
  template: 'widget/src/index.html',
}));

gulp.task('build', gulp.series('build:webextensions', 'build:widget'));

gulp.task('run:widget', (done) => nodemon({
  script: 'widget/server.js',
  ext: 'html js scss css',
  watch: ['plugin', 'widget/src', 'widget/assets'],
  tasks: ['build:widget'],
  done,
}));
