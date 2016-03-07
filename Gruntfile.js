module.exports = function(grunt) {

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    env: process.env,

    languages: ["en", "de"]
  };

  grunt.util._.extend(config, loadConfig('./tasks/options/', grunt));
  grunt.initConfig(config);

  grunt.loadTasks('tasks');
  require('load-grunt-tasks')(grunt);

  /* TASKS */

  grunt.registerTask('default', ['build', 'watch']);

  grunt.registerTask('dev', ['browserSync:dev', 'watch']);

  grunt.registerTask('build', ['clean', 'internal-build-images', 'internal-build-assets', 'internal-build-templates', 'assetFingerprint']);
  grunt.registerTask('build-images', ['clean:images', 'internal-build-images', 'assetFingerprint:images']);
  grunt.registerTask('build-assets', ['clean:assets', 'internal-build-assets', 'assetFingerprint:assets']);
  grunt.registerTask('build-templates', ['clean:templates', 'internal-build-templates', 'assetFingerprint']);

  grunt.registerTask('release-composer', ['build', 'copy:composer']);

  grunt.registerTask('build-webjar', ['build', 'maven:webjars']);
  grunt.registerTask('install-webjar', ['build', 'maven:install', 'clean:dist']);
  grunt.registerTask('release-webjar', ['build', 'maven:release', 'clean:dist']);

  grunt.registerTask('publish', ['gh-pages-clean', 'build', 'gh-pages']);

  grunt.registerTask('internal-build-images', ['copy:images', 'imagemin']);
  grunt.registerTask('internal-build-assets', ['copy:assets', 'sass', 'postcss', 'uglify']);
  grunt.registerTask('internal-build-templates', ['copy:templates', 'copy:others', 'json-refs', 'generate-html']);

};

function loadConfig(path, context) {
  var glob = require('glob');
  var object = {};
  var key, task;

  glob.sync('*', {cwd: path}).forEach(function(option) {
    key = option.replace(/\.js$/,'');
    task = require(path + option);
    if (typeof task === 'function') {
      task = task(context);
    }
    object[key] = task;
  });

  return object;
}
