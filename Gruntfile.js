module.exports = function(grunt) {

    //Initializing the configuration object
    grunt.initConfig({

        
        concat: {
            options: {
                separator: "\n;",
            },
            js_app: {
                src: [
                    './src/js/**/*.js',
                ],
                dest: './assets/js/app.js',
            }
        },

        watch: {
            js: {
                files: [
                    './src/**/*.*'
                ],
                tasks: [ 'concat']
            }
        },
    });

    // Plugin loading
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Task definition
    grunt.registerTask('default', [ 'concat','watch']);

};