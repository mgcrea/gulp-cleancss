/* jshint node:true */
'use strict';

var util = require('util');
var path = require('path');
var chalk = require('chalk');
var gutil = require('gulp-util');
var through = require('through2');
var PluginError = gutil.PluginError;
var CleanCSS = require('clean-css');

module.exports = function(options) {
  options = options || {};

  function transform(file, encoding, next) {

    if(file.isNull()) {
      return next(null, file); // pass along
    }

    file.contents = new Buffer(new CleanCSS(options).minify(file.contents));
    file.path = gutil.replaceExtension(file.path, '.css');
    if(options.debug) gutil.log(util.format('File \'%s\' created.', chalk.cyan(path.relative(process.cwd(), file.path))));
    next(null, file);

  }

  return through.obj(transform);

};
