require('babel-register');
var webpackAlias = require('jest-webpack-alias');
var pkg = require('./package.json');
var babel = require('babel-core');
var presets = pkg.babel && pkg.babel.presets ? pkg.babel.presets : ['es2015'];

var babelPreprocessor = function(src, filename) {
  if (babel.util.canCompile(filename)) {
    return babel.transform(src, {
      filename: filename,
      retainLines: true,
      presets: presets
    }).code;
  }

  return src;
}

module.exports = {
  process: function(src, filename) {
    if (filename.indexOf('node_modules') === -1) {
      src = babelPreprocessor(src, filename);
      src = webpackAlias.process(src, filename);
    }
    return src;
  }
};
