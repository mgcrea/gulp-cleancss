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

  var cleancss = new CleanCSS(options);

  function transform(file, encoding, next) {

    if(file.isNull()) {
      return next(null, file); // pass along
    }

    try {
      file.contents = new Buffer(cleancss.minify(file.contents));
      file.path = gutil.replaceExtension(file.path, '.css');
    } catch(err) {
      return next(new gutil.PluginError('gulp-cleancss', err));
    }

    if(options.debug) {
      gutil.log(util.format('File \'%s\' created.', chalk.cyan(path.relative(process.cwd(), file.path))));
    }

    next(null, file);

  }

  return through.obj(transform);

};
