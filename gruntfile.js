'use strict';

var fs = require('fs');
const rollup_babel = require('rollup-plugin-babel');
const rollup_json = require('rollup-plugin-json');
const rollup_replace = require('rollup-plugin-replace');

let webpackConfig;
let themeJSON;

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      // Task
      dist: {
        // Target
        files: {
          // Dictionary of files
          'app/app/css/main.css': 'css/main.scss',
          'app/app/css/htmlreport.css': 'css/htmlreport.scss'
        }
      }
    },

    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: './node_modules/bootstrap/dist/js/',
            src: ['bootstrap.min.js'],
            dest: 'app/app/js/',
            filter: 'isFile'
          },

          {
            expand: true,
            cwd: './node_modules/bootstrap-toggle/js/',
            src: ['bootstrap2-toggle.min.js'],
            dest: 'app/app/js/',
            filter: 'isFile'
          },

          {
            expand: true,
            cwd: './node_modules/bootstrap-toggle/css/',
            src: ['bootstrap2-toggle.min.css'],
            dest: 'app/app/css/',
            filter: 'isFile'
          },

          {
            expand: true,
            cwd: './node_modules/jquery/dist/',
            src: ['jquery.min.js'],
            dest: 'app/app/js/',
            filter: 'isFile'
          },

          {
            expand: true,
            cwd: './node_modules/bootstrap/fonts/',
            src: ['*'],
            dest: 'app/app/fonts/',
            filter: 'isFile'
          },

          {
            expand: true,
            cwd: '/Users/normanpellet/Documents/Web/graph/dist/',
            src: ['jsgraph-es6.js'],
            dest: 'app/node_modules/node-jsgraph/dist/',
            filter: 'isFile'
          },

          {
            expand: true,
            cwd: './source/',
            src: ['**/**.html'],
            dest: 'app/app/',
            filter: 'isFile'
          },

          {
            expand: true,
            cwd: './source/app',
            src: ['**/**.js'],
            dest: 'app/app/',
            filter: 'isFile'
          },

          {
            expand: true,
            cwd: './environments/logos/',
            src: ['./' + grunt.option('target') + '.png'],
            dest: 'app/app/images/',
            rename: function(dest, src) {
              return 'app/app/images/logo_client.png';
            }
          },

          // JV app
          {
            expand: true,
            cwd: '../app_jv/app/render',
            src: ['**/*'],
            dest: 'app/render/jv/'
          }
        ]
      }
    },

    rollup: {
      main: {
        options: {
          format: 'cjs',
          sourceMap: true,

          plugins: function() {
            return [
              rollup_babel({
                exclude: './node_modules/**',
                babelrc: false,
                presets: ['babel-preset-minify', 'react'],
                plugins: [
                  'transform-object-rest-spread',
                  'transform-class-properties',
                  'transform-exponentiation-operator',
                  [
                    'inline-replace-variables',
                    {
                      __VERSION__: 'v<%= pkg.version %>'
                    }
                  ],
                  'transform-node-env-inline'
                ]
              }),

              rollup_json({})
            ];
          }
        },
        files: {
          'app/main.js': 'source/main.js'
        }
      },

      interface: {
        options: {
          format: 'cjs',
          sourceMap: true,
          external: [
            'react',
            'react-dom',
            'electron',
            'node-jsgraph',
            'prop-types',
            'react-redux',
            'url-lib',
            'redux',
            'fs',
            'ipcRenderer',
            'extend',
            'jquery',
            'lodash.debounce',
            'default',
            'url',
            'node-jsgraph/dist/jsgraph-es6'
          ],
          plugins: function() {
            return [
              rollup_json({
                exclude: ['*.json']
              }),
              rollup_babel({
                exclude: ['./node_modules/**', '*.json'],
                babelrc: false,
                presets: ['react', 'babel-preset-minify'],
                plugins: [
                  'transform-object-rest-spread',
                  'transform-class-properties',
                  'transform-exponentiation-operator',
                  [
                    'inline-replace-variables',
                    {
                      __VERSION__: 'v<%= pkg.version %>'
                    }
                  ]
                ]
              }),
              rollup_replace(themeJSON)
            ];
          }
        },
        files: {
          'app/app/instrument.js': 'source/instrument.jsx',
          'app/app/instrumentform.js': 'source/instrumentform.jsx',
          'app/app/cellform.js': 'source/cellform.jsx',
          'app/app/cellformall.js': 'source/cellformall.jsx',
          'app/app/instrumentlist.js': 'source/instrumentlist.jsx',
          'app/app/influxdbform.js': 'source/influxdbform.jsx',
          'app/app/downloadform.js': 'source/downloadform.jsx',
          'app/app/bugreport.js': 'source/bugreport.jsx',
          'app/app/calibratepd.js': 'source/calibratepd.jsx',
          'app/app/scheduleLight.js': 'source/scheduleLight.jsx',
          'app/app/htmlreport.js': 'source/htmlreport.jsx',
          'app/app/calibratepyranometer.js': 'source/calibratepyranometer.jsx',
          'app/app/htmlreport_control.js': 'source/htmlreport_control.jsx',
          'app/app/showallmeasurements.js': 'source/showallmeasurements.jsx',
          'app/app/mppt.js': 'source/mppt.jsx',
          'app/app/diagnostics.js': 'source/diagnostics.jsx',
          'app/app/ivmeasurements.js': 'source/ivmeasurements/index.jsx'
        }
      }
    }
  });

  grunt.registerTask('deploy', 'Deploying app', () => {
    var target = grunt.option('target') || 'dev';
    var theme = grunt.option('theme') || 'light';

    if (!fs.existsSync('./environments/' + target + '.json')) {
      target = 'dev';
    }

    fs.writeFileSync(
      './css/_theme.scss',
      fs.readFileSync('./css/themes/' + theme + '.scss')
    );
    themeJSON = JSON.parse(fs.readFileSync('./css/themes/' + theme + '.json'));
    console.log(themeJSON);
    //   generateWebpackConfig( themeJSON );
    //'inline-replace-variables', theme

    var env = JSON.parse(fs.readFileSync('./environments/' + target + '.json'));

    if (env.development) {
      process.env.NODE_ENV = 'development';
    } else {
      process.env.NODE_ENV = 'production';
    }

    process.env.buildEnvironment = env;
    fs.writeFileSync(
      './app/config.json',
      JSON.stringify(env.defaultConfig, undefined, '\t')
    );
    fs.writeFileSync(
      './app/environment.json',
      JSON.stringify(env.environment, undefined, '\t')
    );

    grunt.task.run('copy');
    grunt.task.run('less');
    grunt.task.run('rollup');
  });

  grunt.loadNpmTasks('grunt-rollup');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-babel');
};
