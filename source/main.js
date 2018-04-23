const electron = require('electron')
const {Menu,ipcMain,dialog} = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const fs = require('fs');
const request = require('request');
const fix = require( 'fix-path' );
const fetch = require( 'node-fetch' );
const WebSocket = require( 'ws' );
const environment = require("./environment.json");

fix();

let currentInstrument;

const configPath = path.join( __dirname.replace("app.asar", "app.asar.unpacked" ), '/config.json' );
let config = JSON.parse( fs.readFileSync( configPath ) );

let windows = {};

ipcMain.on("addInstrument", addInstrument );
ipcMain.on("editInstrument", editInstrument );
ipcMain.on("removeInstrument", removeInstrument );
ipcMain.on("loadInstrument", loadInstrument );

ipcMain.on("editInfluxDB", editInfluxDB );
ipcMain.on("updateInfluxDB", updateInfluxDB );
ipcMain.on("downloadData", downloadData );
ipcMain.on("htmlReport", htmlReport );

ipcMain.on("configChannel", configChannel );
ipcMain.on("configChannels", configChannels );
ipcMain.on("mppt", openMPPT );
ipcMain.on("bugReport", openBugReport );
ipcMain.on("calibratePD", openCalibratePD );
ipcMain.on("scheduleLight", openScheduleLight );

ipcMain.on("reportError", reportError );


function makeInstrumentMenu() {
  return {
    label: 'Instrument',
    submenu: [
      { label: 'Add a new instrument', click() { addInstrument(); } },
      { label: 'Edit instrument', click() { editInstrument( currentInstrument ); } },
      { label: 'Edit database config', click() { editInfluxDB( ); } },
      { label: 'Show all measurements', click() { showAllMeasurements( currentInstrument ); } },
      { type: 'separator' },
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },

      ...config.instruments.map( (instrument) => {
        return { label: instrument.trackerName, checked: currentInstrument == instrument.trackerHost, click( event ) { loadInstrument( event, instrument.trackerHost ) } }
      } )
    ]
  };
}

function openSocket( instrumentConfig ) {

  const ws = new WebSocket('ws://' + instrumentConfig.trackerHost + ':' + instrumentConfig.trackerPortWS );
  
  ws.on('open', function open() {
    console.log("Socket is open");
  });

  ws.on('close', function open() {
    console.log("Socket is closed");
    setTimeout( () => openSocket( instrumentConfig ), 1000 );
  });

  ws.on('error', function error( err ) {
    console.log("Socket is in error state: " + error.code );
  });


  ws.on('message', wsIncoming );

  ws.isAlive = true;
  ws.on('pong', () => ws.isAlive = true );

  var socketTimeout = () => {

    let interval = setInterval( () => {

      if( !ws.isAlive ) {
        ws.terminate();
      }

      if( ws.readyState == WebSocket.CLOSED ) {
        clearInterval( interval );
      }

      ws.isAlive = false;
      ws.ping( '', false, true );

    }, 30000 );
  }

  socketTimeout();
}



function wsIncoming( data ) {

  data = JSON.parse( data );

  if( data.instrumentId && windows[ 'instrumentMain' ]) {

    if( data.chanId ) {
      windows[ 'instrumentMain' ].webContents.send( "channel.update." + data.instrumentId + "." + data.chanId, data ); 
    }

    if( data.groupName ) {
      
      windows[ 'instrumentMain' ].webContents.send( "group.update." + data.instrumentId + "." + data.groupName, data ); 
    }
  }
}



function doMenu() {
  //require("./menu");
  const template = [
  ];

  if( environment.ageing ) {
    template.push( makeInstrumentMenu() );
  }

  //if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'},
      ]
    });

    if( process.env.NODE_ENV == 'development' ) {
      template[ 0 ].submenu.push( {role: 'toggledevtools'} )
    }
  //}

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function saveConfig( ) {
  
  fs.writeFile( configPath, JSON.stringify( config, undefined, "\t" ), ( error ) => {

    if( error ) {
      reportError( error );
    } else {
      config = JSON.parse( fs.readFileSync( configPath ) );    
    }
    
  }); 
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

function createMainWindow() {
  // Create the browser window.
  windows[ 'instrumentList' ] = new BrowserWindow({ width: 800, height: 700, resizable: false })

  // and load the index.html of the app.
  windows[ 'instrumentList' ].loadURL(url.format({
    pathname: path.join(__dirname, 'app/instrumentlist.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // windows[ 'instrumentList' ].webContents.openDevTools()

  // Emitted when the window is closed.
  windows[ 'instrumentList' ].on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    windows[ 'instrumentList' ] = null
  });

  doMenu();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createMainWindow )

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (windows[ 'instrumentList' ] === null) {
    createMainWindow()
  }
})

async function downloadData( event, tracker, measurementName, chanId ) {

    let json = await fetch( `http://${ tracker.trackerHost }:${ tracker.trackerPort }/getMeasurement?measurementName=${ measurementName }`, {
      method: 'GET'
    })
    .then( ( response ) => response.json() )
    .catch( () => {

      throw new Error(`Error while connecting to the instrument. Check that you are online and that the instrument is available on your network.`);
    });

    openForm( null, "downloadform", { 
    
      measurementName: measurementName, 
      db: config.database, 
      cellInfo: json.cellInfo, 
      chanId: chanId 
    
    }, {
        width: 850,
        height: 800,
        resizable: false

      } ).then( ( result ) => {
      
        config.instruments.push( result );
        saveConfig();
        reloadInstruments();

      } ).catch( () => {} );
}



function htmlReport( event, cellInfo, chanId, measurementName ) {

    let listenerConfig, listenerSavePDF/*, listenerPrintPDF*/;

    ipcMain.on("htmlReport.config", ( listenerConfig = ( event, data ) => {
      
      if( ! windows[ 'htmlReport' ] ) {
        return;
      }

      windows[ "htmlReport"].webContents.send( "config", data );
    } ) );

    ipcMain.on("htmlReport.savePDF", ( listenerSavePDF = ( event, data ) => {
      
      if( ! windows[ 'htmlReport' ] ) {
        return;
      }


      dialog.showSaveDialog( {

        message: "Save the report for device " + data.cellName,
        defaultPath: "~/" + data.cellName + ".pdf"

      }, ( fileName ) => {

        windows[ 'htmlReport' ].webContents.printToPDF( {
          marginsType: 1,
          pageSize: 'A4',
          landscape: true
        }, ( err, data ) => {

          fs.writeFile( fileName, data, ( error ) => {
            console.log( err );  
          } );
        } );

      } );
        
      //windows[ "htmlReport"].webContents.send( "savePDF", data );
    } ) );

/*

    ipcMain.on("htmlReport.printPDF", ( listenerPrintPDF = ( event, data ) => {
      
      if( ! windows[ 'htmlReport' ] ) {
        return;
      }

        windows[ 'htmlReport' ].webContents.print( {
          marginsType: 1,
          pageSize: 'A4',
          landscape: true
        }, ( err, data ) => {

          fs.writeFile( fileName, data, ( error ) => {
            console.log( err );  
          } );
        } );
        
      //windows[ "htmlReport"].webContents.send( "savePDF", data );
    } ) );
*/
    openForm( null, "htmlreport_control", { 
      measurementName: measurementName, 
      db: config.database, 
      cellInfo: cellInfo, 
      chanId: chanId 
    },   {
      
      width: 400,
      height: 595,
      x: 50,
      y: 100,
      center: false,
      resizable: false

    }, () => {

        ipcMain.removeListener( "htmlReport.config", listenerConfig );
        ipcMain.removeListener( "htmlReport.savePDF", listenerSavePDF );
   //     ipcMain.removeListener( "htmlReport.printPDF", listenerPrintPDF );
    } );

    windows[ 'htmlReport' ] = new BrowserWindow( {
      width: 1122, 
      height: 795, 
      x: 500, 
      y: 100, 
      center: false,
      resizable: false
    } )
  

    windows[ 'htmlReport' ].webContents.once("dom-ready", () => {
      windows[ 'htmlReport' ].webContents.send("loadData", { measurementName: measurementName, db: config.database, cellInfo: cellInfo, chanId: chanId } );
    });     
      // and load the index.html of the app.
    windows[ 'htmlReport' ].loadURL( url.format({
      pathname: path.join(__dirname, 'app/htmlreport.html'),
      protocol: 'file:',
      slashes: true
    }) );
}





function openBugReport( event ) {

    openForm( null, "bugreport", {  },   {
      width: 540,
      height: 600,
      resizable: false

    } );
}


function openMPPT( keithleyModel ) {

    windows[ 'mppt' ] = new BrowserWindow({width: 1400, height: 1024, center: true, resizable: false })
      // and load the index.html of the app.
    windows[ 'mppt' ].loadURL(url.format({
      pathname: path.join(__dirname, 'app/mppt.html'),
      protocol: 'file:',
      slashes: true
    }));
}


async function openCalibratePD( event, data ) {

  openForm( null, "calibratepd", { instrumentId: data.instrumentId, groupName: data.groupName, config: data.config }, {
    width: 800,
    height: 600,
    resizable: false
  }, async () => {

    var channelConfig = await fetch( "http://" + data.config.trackerHost + ":" + data.config.trackerPort + "/resetAllChannels?instrumentId=" + data.instrumentId + "&groupName=" + data.groupName, { method: 'GET' } ).then( ( response ) => response.json() );
  } );
}


async function openScheduleLight( event, data ) {


  //await fetch( "http://" + data.config.trackerHost + ":" +   data.config.trackerPort + "/light.pause?instrumentId=" + data.instrumentId, { method: 'GET' } );
  

  // Once the light has been updated, send the information to the main window for update
  let listener;
  ipcMain.on("light.updated", (  listener = () => {
    windows[ "instrumentMain"].webContents.send( "light.updated" );
  } ) );

  openForm( null, "scheduleLight", { instrumentId: data.instrumentId, groupName: data.groupName, config: data.config }, {
    width: 800,
    height: 600,
    resizable: false
  }, function() {

    // After the window is closed, remove the listener
    ipcMain.removeListener( "light.updated", listener );
//  await fetch( "http://" + data.config.trackerHost + ":" + data.config.trackerPort + "/light.resume?instrumentId=" + data.instrumentId, { method: 'GET' } );

  } );
}




// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function removeInstrument( event, trackerHost ) {

  dialog.showMessageBox( {
    type: 'question',
    message: 'Are you sure that you want to remove this instrument ?',
    cancelId: 0,
    defaultId: 0,
    title: "Remove the instrument",
    buttons: [ "Cancel", "Yes" ]    
  }, ( index ) => {

    if( index == 1 ) {

      config.instruments.forEach( ( instrument, index ) => {

        if( instrument.trackerHost == trackerHost ) {
          config.instruments.splice( index, 1 );
        }

      } );

      saveConfig();
      reloadInstruments();
    }

  } );
}

function reportError( e ) {

  console.log('Error reporting !');
  dialog.showMessageBox( {
    type: 'error',
    message: 'An error has happened: ' + e.toString(),
    cancelId: 0,
    defaultId: 0,
    title: "Error",
    buttons: [ "Ok" ]    
  }, ( index ) => {

  } );
}

function reloadInstruments() {
  windows[ 'instrumentList' ].webContents.send("reloadInstruments");
  doMenu();
}

function addInstrument() {

  openForm( null, "instrumentform", {},   {
    width: 850,
    height: 800,
    resizable: false

  } ).then( ( result ) => {
    
    try {
      config.instruments.push( result );
      saveConfig();
      reloadInstruments();
    } catch( e ) {
      reportError( e );
    }


  }).catch( () => {} );

}

function loadInstrument( event, trackerHost ) {

  if( ! windows[ 'instrumentMain' ] ) {
    // Create the browser window.
    windows[ 'instrumentMain' ] = new BrowserWindow({width: 1400, height: 1024, center: true, resizable: false})

      // and load the index.html of the app.
    windows[ 'instrumentMain' ].loadURL(url.format({
      pathname: path.join(__dirname, 'app/instrument.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  
  if( windows[ 'instrumentList' ] ) {
    windows[ 'instrumentList' ].close();
  }

  let instrumentConfig;

  config.instruments.forEach( ( instrument, index ) => {

    if( instrument.trackerHost == trackerHost ) {
      instrumentConfig = instrument;
      currentInstrument = instrument;
    }
  });

  // Global
  


  if( windows[ 'instrumentMain' ].webContents.isLoading() ) {

    windows[ 'instrumentMain' ].webContents.once("dom-ready", () => {  
      windows[ 'instrumentMain' ].webContents.send( "loadInstrument", { tracker: instrumentConfig, db: config.database } );  
    });
    
  } else {

      windows[ 'instrumentMain' ].webContents.send( "loadInstrument", { tracker: instrumentConfig, db: config.database } );  
  }
  
  windows[ 'instrumentMain' ].once("close", () => {
    windows[ 'instrumentMain' ] = null;
  });
  
  openSocket( instrumentConfig );
}

function editInstrument( event, trackerHost ) {

  let data;

  config.instruments.forEach( ( instrument, index ) => {

    if( instrument.trackerHost == trackerHost ) {
      data = instrument;
    }

  } );

  if( ! data ) {
    throw "Could not find the data corresponding to this instrument";
  }

  openForm( null, "instrumentform", data, {
    width: 850,
    height: 800,
    resizable: false

  }  ).then( ( results ) => {

    Object.assign( data, results );
    saveConfig();

    if( windows[ 'instrumentMain' ] ) {
      windows[ 'instrumentMain' ].webContents.send( "loadInstrument", { tracker: data, db: config.database } ); 
    }
    
    if( windows[ 'instrumentList' ] ) {
      windows[ 'instrumentList' ].webContents.send( "instrumentUpdated" ); 
    }
    
    reloadInstruments();

  } ).catch( () => {} );
}




function editInfluxDB( event ) {

  let data;
  let influxConfig = config.database;

  openForm( null, "influxdbform", influxConfig, { width: 600, height: 700, resizable: false } ).then( ( results ) => {

    config.database = results;
    saveConfig();

    updateInfluxDB();

    if( windows[ 'instrumentMain' ] ) {
      windows[ 'instrumentMain' ].webContents.send( "reloadDB", { db: config.database } ); 
    }
    
  } ).catch( () => {} );
}




function showAllMeasurements( instrument ) {
  
  openForm( null, "showallmeasurements", { config: instrument, configDB: config.database }, { width: 600, height: 700, resizable: false } ).then( ( results ) => {

  } ).catch( () => {} );
}


function updateInfluxDB() {

  config.instruments.forEach( ( instrument ) => {
console.log( "http://" + instrument.trackerHost + ":" + instrument.trackerPort + "/setInfluxDB" );
console.log( config.database ); 
    request.post( {
       url: "http://" + instrument.trackerHost + ":" + instrument.trackerPort + "/setInfluxDB", 
       form: config.database }, function() {

       } );
  });
}


async function configChannel( event, data ) {

  let influxConfig = config.database;

  var channelConfig = await fetch( "http://" + data.trackerHost + ":" + data.trackerPort + "/getChannelConfig?instrumentId=" + data.instrumentId + "&chanId=" + data.chanId, { method: 'GET' } ).then( ( response ) => response.json() );

  var instrumentConfig = await fetch( "http://" + data.trackerHost + ":" + data.trackerPort + "/getInstrumentConfig?instrumentId=" + data.instrumentId, { method: 'GET' } ).then( ( response ) => response.json() );

  var channelState = await fetch( "http://" + data.trackerHost + ":" + data.trackerPort + "/getStatus?instrumentId=" + data.instrumentId + "&chanId=" + data.chanId, { method: 'GET' } ).then( ( response ) => response.json() );

  //var externalConnection = await fetch( "http://" + data.trackerHost + ":" + data.trackerPort + "/getChannelConfig?instrumentId=" + data.instrumentId + "&chanId=" + data.chanId, { method: 'GET' } ).then( ( response ) => response.json() );
  var externalConnection = false;

  return openForm( null, "cellform", { 
    instrumentConfig: instrumentConfig, 
    channelConfig: channelConfig, 
    channelState: channelState[ data.groupName ].channels[ data.chanId ],
  }, { width: 600, height: 800 } ).then( ( results ) => {
    
    event.sender.send( "channelConfigured", results );
    return results;    

  } ).catch( () => {} );
}



async function configChannels( event, data ) {

  let influxConfig = config.database;

  var channelsState = await fetch( "http://" + data.trackerHost + ":" + data.trackerPort + "/getStatus?instrumentId=" + data.instrumentId + "&groupName=" + data.groupName, { method: 'GET' } ).then( ( response ) => response.json() );
  var instrumentConfig = await fetch( "http://" + data.trackerHost + ":" + data.trackerPort + "/getInstrumentConfig?instrumentId=" + data.instrumentId, { method: 'GET' } ).then( ( response ) => response.json() );
  var channelState = await fetch( "http://" + data.trackerHost + ":" + data.trackerPort + "/getStatus?instrumentId=" + data.instrumentId + "&chanId=" + data.chanIds[ 0 ], { method: 'GET' } ).then( ( response ) => response.json() );
  
  return openForm( null, "cellformall", { 

    channelState: channelState[ data.groupName ].channels[ data.chanIds[ 0 ] ], 
    channelsState: channelsState[ data.groupName ].channels, 
    instrumentConfig: instrumentConfig,
    channelIds: data.chanIds

  }, { width: 600, height: 800 } ).then( ( results ) => {
  
    event.sender.send( "channelsConfigured", results );
    return results;    
    
  } ).catch( () => {} );
}





let windowForm;

function openForm( windowName, pageName, formData, options = { width: 300, height: 420 }, onClose ) {

  if( windowForm ) {
    ( windowForm._rejecter && windowForm._rejecter() );
    windowForm.close();
  }
  // Create the browser window.
  windowForm = new BrowserWindow( options );

  // and load the index.html of the app.
  windowForm.loadURL( url.format({
    pathname: path.join(__dirname, 'app/' + pageName + '.html'),
    protocol: 'file:',
    slashes: true
  }) );

  windows[ "form" ] = windowForm;

  windowForm.once("closed", () => {
    windows[ "form" ] = null;
    ( windowForm && windowForm._rejecter && windowForm._rejecter() );
    windowForm = null;

    if( typeof onClose == "function" ) {
      onClose();
    }

  })
  return new Promise( ( resolver, rejecter ) => {
    
    ipcMain.once("validateForm", ( event, data ) => {

      resolver( data );
    });

    ipcMain.once("closeForm", ( event, data ) => {

      if( windowForm ) {
        windowForm.close();
        windowForm = null;
      }
    });

    windowForm.webContents.once("dom-ready", () => {
      windowForm.webContents.send("loadForm", formData );
    });
     

    windowForm._rejecter = rejecter;
  });
}
