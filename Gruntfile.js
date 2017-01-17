'use strict';

module.exports = (grunt) => {

    let paths = {
        scripts: [
            'src/js/*.js'
        ],
        styles: [
            'src/styles/*.styl'
        ]

    };

    let cfg = {
        stylus: {
            dist: {
                options: {
                    use: [
                        () => require('autoprefixer-stylus')('last 2 versions')
                    ]
                },
                files: {
                    'dist/css/app.min.css': paths.styles
                }
            }
        },

        browserify: {
            dist: {
                files: {
                    'dist/js/app.min.js': paths.scripts
                },
                options: {
                    transform: [
                        ['babelify', { presets: ['es2015'] }]
                    ]
                }
            }
        },

        watch: {
            options: {
                livereloader: true
            },
            styles: {
                files: paths.styles,
                tasks: ['stylus']
            },
            scripts: {
                files: paths.scripts,
                tasks: ['browserify']
            }
        }
    };

    require('load-grunt-tasks')(grunt);

    grunt.initConfig(cfg);
    grunt.registerTask('default', 'watch');
    grunt.registerTask('build', []);
};