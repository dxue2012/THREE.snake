/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    typescript: {
        base: {
            src: ['js/**/*.ts'],
            options: {
                module: 'amd', //or commonjs
                target: 'es5', //or es3
                sourceMap: true,
                declaration: false,
                watch: true
            }
        }
    },
    concat: {
        dist: {
            src: ['./js/*.js'],
            dest: './THREE.Snake.js'
        }
    },
    watch: {
        /*
        less: {
            files: ["./less/*.less"],
            tasks: ["less"],
            options: {
                nospawn: true
            }
        },
        */
        typescript: {
            files: ["./js/**/*.ts"],
            tasks: ["typescript"]
        }
    },
    concurrent: {
        options: {
            logConcurrentOutput: true
        },
        dev: {
            tasks: [/* "watch:less", */ "watch:typescript"]
        }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-concurrent');

  // Default task.
  grunt.registerTask('default', ["concurrent:dev"]);
  grunt.registerTask('compile', ["concat:dist"]);
};
