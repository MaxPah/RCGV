// Gruntfile.js
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-symlink');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // properties are css files
  // values are less files
  var filesLess = {};

  // Configuration du projet
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Définition de la tache 'less'
    // https://github.com/gruntjs/grunt-contrib-less
    less: {
      bundles: {
        files: filesLess
      }
    },
    concat: {
      dist: {
        src: [
          'jquery/dist/jquery.min.js',
          'bootstrap/js/transition.js',
          'bootstrap/js/alert.js',
          'bootstrap/js/modal.js',
          'bootstrap/js/dropdown.js',
          'bootstrap/js/scrollspy.js',
          'bootstrap/js/tab.js',
          'bootstrap/js/tooltip.js',
          'bootstrap/js/popover.js',
          'bootstrap/js/button.js',
          'bootstrap/js/collapse.js',
          'bootstrap/js/carousel.js',
          'bootstrap/js/affix.js',
          'bxslider-4/dist/jquery.bxslider.min.js',
          'rcgv/js/scripts.js'
        ],
        dest: 'dist/rcgv/js/scripts.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/rcgv/js/scripts.min.js': ['dist/rcgv/js/scripts.js']
        }
      }
    },
    cssmin: {
      dist: {
        options: {
          banner: '/* RCGV - Maxime PAHUD && Pierre Lizet */'
        },
        files: {
          'dist/rcgv/css/rcgv.min.css': [
            'bxslider-4/dist/jquery.bxslider.min.css',
            'dist/rcgv/css/rcgv.css'
          ]
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['css', 'javascript']);
  grunt.registerTask('css', ['less:discovering', 'less', 'cssmin']);
  grunt.registerTask('javascript', ['concat', 'uglify']);
  grunt.registerTask('deploy', ['assets:install', 'default']);
  grunt.registerTask('less:discovering', 'This is a function', function() {
    // LESS Files management
    // Source LESS files are located inside : bundles/[bundle]/less/
    // Destination CSS files are located inside : built/[bundle]/css/
    var mappingFileLess = grunt.file.expandMapping(
      ['rcgv/less/rcgv.less'],
      'dist/', {
        cwd: '.',
        rename: function(dest, matchedSrcPath, options) {
          return dest + matchedSrcPath.replace(/less/g, 'css');
        }
      });

    grunt.util._.each(mappingFileLess, function(value) {
      // Why value.src is an array ??
      filesLess[value.dest] = value.src[0];
    });
  });

};