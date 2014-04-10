module.exports = (grunt) ->

  # Project Config
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    # Build CSS from Stylus.
    stylus:
      compile:
        options:
          compress: false
          "resolve url": true
        files:
          "frontend/static/css/app.css": ["frontend/static_src/stylus/app.styl"]

    # Build JS from CoffeeScript.
    coffee:
      compile:
        options: 
          join: true
        files:
          "frontend/static/js/app.js": ["frontend/static_src/coffee/app.coffee"]

    # Grunt is watching you code.
    watch:
      stylus:
        files: [
          "frontend/static_src/stylus/*.styl"
          "frontend/static_src/stylus/**/*.styl"
        ]
        tasks: ["stylus:compile"]

      coffee:
        files: [
          "bower_components/**/*.js"
          "!bower_components/**/*min.js"
          "frontend/static_src/coffee/*.coffee"
        ]
        tasks: ["coffee:compile", "concat:vendor"]

    # Run a dev server.
    connect:
      server:
        options:
          port: 9002
          base: "."
          livereload: true
          keepalive: true

    # Concat Bower components together.
    concat:
      vendor:
        files:
          "frontend/static/js/vendor.js": ["bower_components/**/*.js", "!bower_components/**/*min.js"]


  # Enable Plugins
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-stylus"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.registerTask "default", ["stylus:compile", "coffee:compile", "watch"]
  grunt.registerTask "server", ["connect"]
  return
