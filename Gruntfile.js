module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      dist: {
        src: ['scripts/*.js', 'scripts/**/*.js'],
        dest: 'dest/imctube.js',
      },
    },
    uglify: {
      my_target: {
        options: {
          mangle: false,
          sourceMap: true 
        },
        files: {
          'dest/imctube.min.js': 'dest/imctube.js'
        }
      }
    },
    ngAnnotate: {
      options: {
        singleQuotes: true,
      },
      app1: {
        files: {
          'imctube.js': ['imctube.js']
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ng-annotate');

  grunt.registerTask('default', ['concat', 'ngAnnotate', 'uglify']);
};
