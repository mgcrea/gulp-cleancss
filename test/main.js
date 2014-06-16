var pkg = require('../package.json');
var cleancss = require('../' + pkg.main);
var path = require('path');
var extend = require('lodash.assign');
var File = require('gulp-util').File;
var Buffer = require('buffer').Buffer;
var should = require('should');
var fs = require('fs');
require('mocha');

describe('gulp-cleancss', function() {

  var defaults = {
    cwd: path.resolve(__dirname, './fixtures'),
    base: path.resolve(__dirname, './fixtures')
  };

  beforeEach(function() {
  });

  describe('cleancss()', function() {

    it('should properly clean a stylesheet', function(done) {

      var fixturePath = path.resolve(__dirname, './fixtures/bootstrap.css');
      var fixtureName = path.basename(fixturePath);
      var fixture = new File(extend({path: fixturePath, contents: fs.readFileSync(fixturePath)}, defaults));
      var expectedPath = path.resolve(__dirname, './expected/bootstrap.min.css');
      var expectedContent = fs.readFileSync(expectedPath);

      var stream = cleancss();
      stream.on('data', function(newFile){
        // fs.writeFileSync(expectedPath, newFile.contents);
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);
        newFile.contents.toString().length.should.be.above(0);
        should.equal(newFile.contents.toString(), expectedContent.toString());
        newFile.path.should.equal(fixturePath);
        newFile.relative.should.equal(fixtureName);
      });
      stream.once('end', done);
      stream.write(fixture);
      stream.end();

    });

  });

});
