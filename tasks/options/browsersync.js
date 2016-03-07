module.exports = function (grunt) {
  var language = grunt.config('lng') || 'en';
  var rootPath = 'output/site/' + language + '/';
  var assetPath = 'output/assets/';

  var obj = {
    dev: {
      bsFiles: {
        src : [
          assetPath + '**/*.css',
          assetPath + '/**/*.js',
          rootPath  + '*.html'
        ]
      },
      options: {
        watchTask: true,
        server: rootPath
      }
    }
  };

  return obj;
};
