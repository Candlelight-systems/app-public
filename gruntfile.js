'use strict';

var fs = require('fs');

let webpackConfig;

module.exports = function(grunt) {


function generateWebpackConfig( theme ) {

  webpackConfig = {
     
     externals: {
      "jquery": "jQuery",
      "node-jsgraph/dist/jsgraph-es6": "commonjs node-jsgraph/dist/jsgraph-es6",
      "fs": "commonjs fs",
      "child_process": "commonjs child_process",
      "python-shell": "commonjs python-shell",
      "path": "commonjs path",
      "electron": "commonjs electron",
      "react": "commonjs react",
      "react-dom": "commonjs react-dom",
      "pdfkit": "commonjs pdfkit",
      "html-pdf": "commonjs html-pdf",
      "debounce": "commonjs lodash.debounce"
     },

     target: 'electron',
      
      node: {
        __dirname: false
      }
      ,

     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         },
         {
             test: /\.jsx$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
              query: {
                presets: [
                  'react'
                  ],
                plugins: [
                  'transform-class-properties',
                  [
                    'inline-replace-variables', theme ]
                ]
              }
         }]
     }
 }


 
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        less: {                              // Task
          dist: {                            // Target
            files: {                         // Dictionary of files
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

            /*    expand: true, 
                cwd: '/Users/normanpellet/Documents/Web/graph/dist/',
                src: ['jsgraph-es6.js'], 
                dest: 'node_modules/node-jsgraph/dist/', 
                filter: 'isFile'
              },
*/
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


        babel: {
          main: {
            options: {
              sourceMap: true,
              comments: false,
              presets: ['babili', 'react'],
              plugins: ["transform-node-env-inline"]
            },
            files: {
              'app/main.js': 'source/main.js'
            }
          }
        },

        webpack: {
          
           instrument: Object.assign( {
               entry: [ './source/instrument.jsx' ],
               output: {
                   filename: 'app/app/instrument.js'
               } }, webpackConfig ),

            formInstrument: 
              Object.assign( {
               entry: [ './source/instrumentform.jsx' ],
               output: {
                   filename: 'app/app/instrumentform.js'
               } }, webpackConfig ),


            cellForm: 
              Object.assign( {
               entry: [ './source/cellform.jsx' ],
               output: {
                   filename: 'app/app/cellform.js'
               } }, webpackConfig ),


            cellFormall: 
              Object.assign( {
               entry: [ './source/cellformall.jsx' ],
               output: {
                   filename: 'app/app/cellformall.js'
               } }, webpackConfig ),

            listInstrument: 
              Object.assign( {
               entry: [ './source/instrumentlist.jsx' ],
               output: {
                   filename: 'app/app/instrumentlist.js'
               } }, webpackConfig ),
          

            formInflux: 
              Object.assign( {
               entry: [ './source/influxdbform.jsx' ],
               output: {
                   filename: 'app/app/influxdbform.js'
               } }, webpackConfig ),

            footer: 
              Object.assign( {
               entry: [ './source/footer.jsx' ],
               output: {
                   filename: 'app/app/footer.js'
               } }, webpackConfig ),
          
          
            downloadform: 
              Object.assign( {
               entry: [ './source/downloadform.jsx' ],
               output: {
                   filename: 'app/app/downloadform.js'
               } }, webpackConfig ),

            mppt: 
              Object.assign( {
               entry: [ './source/mppt.jsx' ],
               output: {
                   filename: 'app/app/mppt.js'
               } }, webpackConfig ),
          

            bugreport: 
              Object.assign( {
               entry: [ './source/bugreport.jsx' ],
               output: {
                   filename: 'app/app/bugreport.js'
               } }, webpackConfig ),

            calibratePD: 
              Object.assign( {
               entry: [ './source/calibratepd.jsx' ],
               output: {
                   filename: 'app/app/calibratepd.js'
               } }, webpackConfig ),


            scheduleLight: 
              Object.assign( {
               entry: [ './source/scheduleLight.jsx' ],
               output: {
                   filename: 'app/app/scheduleLight.js'
               } }, webpackConfig ),
            
            htmlReport: 
              Object.assign( {
               entry: [ './source/htmlreport.jsx' ],
               output: {
                   filename: 'app/app/htmlreport.js'
               } }, webpackConfig ),

            htmlReport_config: 
              Object.assign( {
               entry: [ './source/htmlreport_control.jsx' ],
               output: {
                   filename: 'app/app/htmlreport_control.js'
               } }, webpackConfig ),


            showallmeasurements: 
              Object.assign( {
               entry: [ './source/showallmeasurements.jsx' ],
               output: {
                   filename: 'app/app/showallmeasurements.js'
               } }, webpackConfig ),

            calibratepyranometer: 
              Object.assign( {
               entry: [ './source/calibratepyranometer.jsx' ],
               output: {
                   filename: 'app/app/calibratepyranometer.js'
               } }, webpackConfig )
        }
    });
  
}


    grunt.registerTask( 'deploy', "Deploying app", () => {

      var target = grunt.option('target') || 'dev';
      var theme = grunt.option('theme') || 'light';

      if( ! fs.existsSync( "./environments/" + target + ".json" ) ) {
        target = 'dev';
      }

      fs.writeFileSync( "./css/_theme.scss", fs.readFileSync( "./css/themes/" + theme + ".scss" ) );
      let themeJSON = JSON.parse( fs.readFileSync( "./css/themes/" + theme + ".json" ) );

      generateWebpackConfig( themeJSON );

      var env = JSON.parse( fs.readFileSync( "./environments/" + target + ".json" ) );

      if( env.development ) {
        process.env.NODE_ENV = 'development';
      } else {
        process.env.NODE_ENV = 'production';
      }
      
      process.env.buildEnvironment = env;
      fs.writeFileSync( "./app/config.json", JSON.stringify( env.defaultConfig, undefined, "\t" ) );
      fs.writeFileSync( "./app/environment.json", JSON.stringify( env.environment, undefined, "\t" ) );

      grunt.task.run( 'copy' );
      grunt.task.run( 'babel' );
      grunt.task.run( 'less' );
      grunt.task.run( 'webpack' );
      
    } );

    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-babel');
};