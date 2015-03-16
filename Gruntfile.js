'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: [
                'Gruntfile.js',
                'src/**/*.js'
            ],
            test: {
                src: ['test/**/*.js'],
                options: {
                    jshintrc: 'test/.jshintrc'
                }
            }
        },

        jsdoc: {
            dist: {
                src: ['src/**/*.js'],
                jsdoc: 'node_modules/.bin/jsdoc',
                options: {
                    destination: 'doc',
                    configure : 'jsdoc.conf.json'
                }
            }
        }
    });

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('doc', ['jsdoc']);
    grunt.registerTask('default', ['jshint', 'jsdoc']);

};