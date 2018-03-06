
import React from 'react';
import $ from "jquery";
import fs from "fs";
import { ipcRenderer } from "electron";
import KeithleySMU from "../../app/external/keithleySMU";
import Lamp from "../../app/external/verasol";
import Graph from 'node-jsgraph/dist/jsgraph-es6';
import PDFDocument from 'pdfkit'
import { CSVBuilder, ITXBuilder } from "../../app/util/filebuilder"
import svgToPDF from "../../app/util/svgToPDF"
import { getIVParameters } from "../../app/util/iv"

const {dialog} = require('electron').remote;

let iv_height = 400,
    iv_width = 550;


class MPPTJV extends React.Component {
  
  constructor() {
    super( ...arguments );

    // List all GPIB resources



    this.connectToGPIB = this.connectToGPIB.bind( this );
    this.iv = this.iv.bind( this );
    this.mppt = this.mppt.bind( this );
    this.stop_mppt = this.stop_mppt.bind( this );

    this.form_iv_change = this.handleInputChange.bind( this );
    this.form_mppt_change = this.handleInputChange.bind( this );
    this.form_gpib_change = this.handleInputChange.bind( this );
    this.form_ext_change = this.handleInputChange.bind( this );

    this.downloadPDF = this.downloadPDF.bind( this );
    this.downloadITX = this.downloadITX.bind( this );
    this.downloadCSV = this.downloadCSV.bind( this );


    this.state = {
      gpib_resources: [],
      iv_starting_voltage: 1,
      iv_stopping_voltage: 0,
      iv_hysteresis: 0,
      iv_scan_rate: 0.1,
      mppt_duration: 500,
      area: 0.5,
      powin: 1000,

      connected_keithley: false,
      connected_lamp: false
    };
  }


  async connectKeithleyToGPIB() {

    var resource = this.state.gpib_resource;
    this.instrument = new KeithleySMU( resource );

    this.instrument.connect().then( ( message ) => {
    
      this.setState( { connected_keithley: message, connectionerror_keithley: false } );  
    
    }).catch( ( error ) => {

      console.log( error );
      this.setState( { connectionerror_keithley: error.toString(), connected_keithley: false } );
    }); 
  }



  async connectLampToGPIB() {

    var resource = this.state.gpib_resource;
    this.instrument_lamp = new Lamp( resource );

    this.instrument_lamp.connect().then( ( message ) => {
    
      this.setState( { connected_lamp: message, connectionerror_lamp: false } );  
    
    }).catch( ( error ) => {

      console.log( error );
      this.setState( { connectionerror_lamp: error.toString(), connected_lamp: false } );
    }); 
  }


  handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState( { [name]: value } );
      

      this.getAverageIVParameters();
  }



  async downloadPDF() {

      var pdfdoc = new PDFDocument( {
        autoFirstPage: false
      });

      pdfdoc.pipe( fs.createWriteStream('./output.pdf') );

      pdfdoc.addPage( { layout: 'landscape' } );

      pdfdoc.image( await svgToPDF( this.graph_iv_dom, iv_width, iv_height ), 200, 15, { width: iv_width } );
      if( this.state.mppt_j ) {
        pdfdoc.image( await svgToPDF( this.graph_mppt_dom, mppt_width, mppt_height ), 200, 150, { width: iv_width } );
      }

      pdfdoc.font("Times-Roman");

      pdfdoc
        .fontSize( 15 )
        .text("Device name: " + this.state.samplename , 0, 15, { underline: true } )
        .fontSize( 12 )
        .text("Active area: " + this.state.area.toPrecision( 3 ) + "cm", 0, 35 )
        .moveUp()
        .fontSize( 8 )
        .text( 2, 120, 35 );


      var printInfo = ( waveform, waveformPower, marginLeft, yPosition ) => {

        var params = this.getIVParameters( waveform, waveformPower, this.state.area, this.state.powin );

        pdfdoc
          .fontSize( 14 )
          .text("Forward scan", 0, yPosition, { underline: true } )
          .fontSize( 12 )
          .text("V", marginLeft, yPosition + 20 )
          .fontSize( 8 ).moveUp().text( "oc", 8 + marginLeft ).fontSize( 12 )
          .text("J", marginLeft)
          .fontSize( 8 ).moveUp().text( "sc", 6 + marginLeft ).fontSize( 12 )
          .text("I", marginLeft)
          .fontSize( 8 ).moveUp().text( "sc", 6 + marginLeft ).fontSize( 12 )
          .text("V", marginLeft)
          .fontSize( 8 ).moveUp().text( "pmax", 6 + marginLeft ).fontSize( 12 )
          .text("I", marginLeft )
          .fontSize( 8 ).moveUp().text( "pmax", 8 + marginLeft ).fontSize( 12 )
          .text("P", marginLeft)
          .fontSize( 8 ).moveUp().text( "out", 8 + marginLeft ).fontSize( 12 )
          .text("FF", marginLeft)
          .text("PCE", marginLeft)


          pdfdoc
          .text( Math.round( params.voc * 1000 ) / 1000 + " V", marginLeft + 35, yPosition + 20 )
          
          .text( Math.round( params.isc * 100 ) / 100 + " mA", marginLeft + 35 )
          .fontSize( 8 ).moveUp().text( "-2", 25 + marginLeft + 35 - 8 ).fontSize( 12 )
          .text( Math.round( params.jsc * 100 ) / 100 + " mA cm", marginLeft  + 35 )
          .fontSize( 8 ).moveUp().text( "-2", 25 + marginLeft + 35 - 8 ).fontSize( 12 )
          .text( Math.round( params.vmax * 1000 ) / 1000 + "V", marginLeft + 35 )
          .text( Math.round( params.jmax * 100 ) / 100 + "mA cm", marginLeft + 35 )
          .fontSize( 8 ).moveUp().text( "-2", 25 + marginLeft + 35 - 8 ).fontSize( 12 )
          .text( Math.round( params.power * 100 ) / 100 + " mW cm", marginLeft + 35 )
          .fontSize( 8 ).moveUp().text( "-2", 25 + marginLeft + 35 - 8 ).fontSize( 12 )
          .text( Math.round( params.ff * 10 ) / 10 + " %", marginLeft + 35 )
          .text( Math.round( params.pce * 100 ) / 100 + " %", marginLeft + 35 )

        }

        printInfo( this.state.data_iv_forward, this.state.data_iv_forward_power, 20, 60 );




      pdfdoc.end();
   
  }

  downloadCSV() {

  }

  downloadITX() {

      var outputfile;
      outputfile = new ITXBuilder();  
      

      if( this.state.data_iv_forward ) {
        outputfile.addWaveform( this.state.data_iv_forward, { 
          waveName: "Photocurrent_fw",
          waveNameX: "Photocurrent_fw_voltage"
        } );


        outputfile.addWaveform( this.state.data_iv_forward_power, { 
          waveName: "Power_fw",
          noXWave: true
        } );
      }

      if( this.state.data_iv_backward ) {
        
        outputfile.addWaveform( this.state.data_iv_backward, { 
          waveName: "Photocurrent_fw",
          waveNameX: "Photocurrent_fw_backward"
        } );

        outputfile.addWaveform( this.state.data_iv_backward_power, { 
          waveName: "Power_fw",
          noXWave: true
        } );
      }

      if( this.state.mppt_j ) {
        
        outputfile.addWaveform( this.state.mppt_j, { 
          waveName: "MPPT_current",
          waveNameX: "MPPT_Time_s"
        } );

        outputfile.addWaveform( this.state.mppt_v, { 
          waveName: "MPPT_voltage",
          noXWave: true
        } );

        outputfile.addWaveform( this.state.mppt_p, { 
          waveName: "MPPT_voltage",
          noXWave: true
        } );
      }


      dialog.showSaveDialog( {

        message: "Save the data for the cell \"" + this.state.samplename + "\"",
        defaultPath: "~/" + this.state.samplename + ".itx"

      }, ( fileName ) => {

        fs.writeFileSync(fileName, outputfile.build() );
      });
  }


  async iv() {

    if( ! this.instrument ) {
      throw "Cannot initiate a j-V curve. No instrument is connected.";
    }

    var numPoints = 100;
    var step =( this.state.iv_stopping_voltage - this.state.iv_starting_voltage ) / ( numPoints - 1 );     
    var settling = 0.01;
    var currMax = 0.1;

    var dataiv, poweriv;


    await this.instrument_lamp.command("AMPLitude 1");
    await this.instrument_lamp.command("OUTput ON");

    this.setState( { iv_making: true } );
    await this.instrument.command(":STAT:MEAS:ENAB 512; *SRE 1; *CLS");
    //await this.instrument.command(":*SRE 1;");
    await this.instrument.command(":FORM:ELEM VOLT,CURR");  
    await this.instrument.command(":SOUR:VOLT:MODE SWE");
    await this.instrument.command(":SOUR:VOLT:START "+ (this.state.iv_starting_voltage) +"; STOP "+ this.state.iv_stopping_voltage +"; STEP "+ step + "" );
    await this.instrument.command(":TRAC:CLE");
    await this.instrument.command(":TRAC:POIN "+ numPoints +";:TRIG:COUN " + numPoints + "" )           // # of Triggers
    await this.instrument.command(":TRAC:FEED:CONT NEXT")

    await this.instrument.command(":SOUR:DEL "+ settling + "");
    await this.instrument.command(":SENS:CURR:PROT " + currMax + "" ); 
    await this.instrument.command(":SENS:CURR:RANGE:UPP "+ currMax );
    
    await this.instrument.command(":SENS:CURR:RANGE:AUTO 1");
    await this.instrument.command(":OUTP:STAT ON")                                      // Switch Output ON, yet again

    await this.instrument.command(":INIT")                                            // Reset time to zero

    await this.instrument.delay( 5000 );
    await this.instrument.query("_wait_stb");
    

    ({ dataiv, poweriv } = await this.instrument.getIVTrace());
    
    
    this.setState( { 
      data_iv_forward: dataiv, 
      data_iv_forward_power: poweriv, 
      data_iv_backward: null, 
      data_iv_backward_power: null 
    } );

//console.log( this.state.iv_hysteresis );
    if( this.state.iv_hysteresis ) {

      
      await this.instrument.command(":STAT:MEAS:ENAB 512; *SRE 1; *CLS");
      await this.instrument.command(":TRAC:CLE");
      await this.instrument.command(":SOUR:VOLT:START "+ (this.state.iv_stopping_voltage) +"; STOP "+ this.state.iv_starting_voltage +"; STEP "+ -step + "" );
      await this.instrument.command(":TRAC:POIN "+ numPoints +";:TRIG:COUN " + numPoints + "" )           // # of Triggers
      await this.instrument.command(":TRAC:FEED:CONT NEXT")
      await this.instrument.command(":INIT")  
      
      //await this.instrument.query("*OPC?")  

      await this.instrument.delay( 2000 );
      await this.instrument.query("_wait_stb");

      ({ dataiv, poweriv } = await this.instrument.getIVTrace());  
      this.setState( { data_iv_backward: dataiv, data_iv_backward_power: poweriv } );
    
    }

    await this.instrument.command( ":OUTP:STAT OFF" );


    await this.instrument_lamp.command("OUTput OFF");

    this.getAverageIVParameters();

    this.setState( { iv_making: false } );
  }

  getAverageIVParameters() {
    var paramFW = this.getIVParameters( this.state.data_iv_forward, this.state.data_iv_forward_power );

    if( this.state.data_iv_backward ) {
      
      var paramBW = this.getIVParameters( this.state.data_iv_backward, this.state.data_iv_backward_power );

      for( var i in paramBW ) {
        paramFW[ i ] = ( paramBW[ i ] + paramFW[ i ] ) / 2;
      }
    }

    paramFW.jsc = Math.round( paramFW.jsc * 100 ) / 100;
    paramFW.voc = Math.round( paramFW.voc * 1000 ) / 1000;
    paramFW.ff = Math.round( paramFW.ff * 10 ) / 10;
    paramFW.pce = Math.round( paramFW.pce * 1000 ) / 1000;

    this.setState( paramFW );
  }

  getIVParameters( waveform, powerwaveform ) {

    return getIVParameters( waveform, powerwaveform );
  }

  setVoltage( v ) {
    this.instrument.command(":SOUR:VOLT:LEV:IMM:AMPL " + ( voltage ) )             // Set current Voltage
  }


  async iv_prepare() {

    await this.instrument.command("*CLS")
    await this.instrument.command(":STAT:MEAS:ENAB 512")                        // Set SRQ
    await this.instrument.command(":TRAC:FEED:CONT NEVER")
    await this.instrument.command(":TRAC:CLE")  
    await this.instrument.command("*SRE 1")  
    await this.instrument.command(":SOUR:VOLT:MODE SWE")
    await this.instrument.command(":FORM:ELEM VOLT,CURR");  
  }

  async _iv( fromV, toV, nbPoints ) {
    
    var stepV = ( toV - fromV ) / ( nbPoints - 1 );
    //await this.instrument.command("*SRE 1")  
    await this.instrument.command("*CLS")  
    await this.instrument.command(":SOUR:VOLT:START " + fromV + "; STOP " + toV + "; STEP " + stepV );
    await this.instrument.command(":TRAC:CLE; :TRAC:POIN "+ nbPoints +";:TRIG:COUN "+ nbPoints + "; :TRAC:FEED:CONT NEXT");
    await this.instrument.command(":INIT");

    await this.instrument.delay( 10 );
    await this.instrument.query("_wait_stb");
    
    return this.instrument.getIVTrace();
  }
  

  async mppt() {

    var settlingTime = 0;

    await this.instrument_lamp.command("AMPLitude 1");
    await this.instrument_lamp.command("OUTput ON");

    await this.instrument.command(":SOUR:DEL " + settlingTime );
    await this.instrument.command(":OUTP:STAT ON");

    this.iv_prepare();

    this.setState( { running_mpp: true });
    await this.instrument.command(":SENS:CURR:PROT " + 0.1 );
    await this.instrument.command(":SENS:CURR:RANGE:UPP " + 0.1 )// Select expected current
    await this.instrument.command(":SENS:CURR:RANGE:AUTO 1")
    
    await this.instrument.command(":OUTP:STAT ON")  

    //{ dataiv, poweriv } = iv( from, to, 10 );
    
    let mppt_j = Graph.newWaveform(),
        mppt_v = Graph.newWaveform(),
        mppt_p = Graph.newWaveform();
                        // Clear Buffer
    let vfrom = 0, 
        vto, 
        direction = 1, 
        vdelta = 5e-3,
        start = Date.now(),
        now,
        now2,
        i,
        dataiv, poweriv, t;


    while( true ) {

      now = Date.now();
      vto = vfrom + vdelta * direction;

      ({ dataiv, poweriv } = await this._iv( vfrom, vto, 5 ));

      now2 = Date.now();

      for( i = 0; i < dataiv.getLength(); i ++ ) {

        t = ( i * ( now2 - now ) / dataiv.getLength() + now - start ) / 1000;
        
        mppt_j.append( t, dataiv.getY( i ) );
        mppt_v.append( t, dataiv.getX( i ) );
        mppt_p.append( t, dataiv.getY( i ) * dataiv.getX( i ) );
      }

      var slope = await mppt_p.fit( {

        params: [ 0, 0 ],
        subsetIndex: [ mppt_p.getLength() - dataiv.getLength(), mppt_p.getLength() - 1 ],
        function: ( x, params ) => {
          return ( x - mppt_p.getX( mppt_p.getLength() - dataiv.getLength() ) ) * params[ 0 ] + params[ 1 ]
        }
      }).then( ( params ) => {
        return params[ 0 ];
      });

      var maxPower = ( mppt_p.getMinY() * 1000 * 100 ) / 100;
      var maxEfficiency = - Math.round( mppt_p.getMinY() * 1000 / this.state.area / ( this.state.powin / 10 ) * 100 * 100 ) / 100;

      this.setState( {

        mppt_v: mppt_v,
        mppt_j: mppt_j,
        mppt_p: mppt_p,

        mppt_max_power: maxPower,
        mppt_max_efficiency: maxEfficiency

      } );

      if( slope > 0 ) {
        direction *= -1;
      }

      vfrom = vto;

      if( this.stopMPP ) {
        this.stopMPP = false;
        break;
      }

      if( now - start > this.state.mppt_duration * 1000 ) {
        break;
      }
    }


    await this.instrument.command(":OUTP:STAT OFF")  
    await this.instrument_lamp.command("OUTput ON");

    this.setState( { running_mpp: false });
  }

  stop_mppt() {

    this.stopMPP = true;
  }

  componentDidMount() {

    this.graph_iv_instance = new Graph( this.graph_iv_dom );
    this.graph_iv_instance.resize( iv_width, iv_height );

    this.legend = this.graph_iv_instance.makeLegend();
    this.legend.setAutoPosition( 'bottom' );
    this.legend.notHideable();


    this.graph_iv_instance
          .getLeftAxis()
          .setUnit( "A")
          .setUnitWrapper("(", ")")
          .gridsOff()
          .setUnitDecade( true )
          .setScientific( true )
          .setLabel( "Current density" );


    this.graph_iv_instance
          .getBottomAxis()
          .setUnit( "V")
          .setUnitWrapper("(", ")")
          .gridsOff()
          .setLabel( "Voltage" );



    this.graph_iv_instance
          .getRightAxis()
          .setUnit( "W")
          .setUnitWrapper("(", ")")
          .setUnitDecade( true )
          .setScientific( true )
          .gridsOff()
          .setLabel( "Power" );


    this.graph_iv_instance.draw();
    this.legend.update();

    this.serie_iv_forward = this
                      .graph_iv_instance
                      .newSerie("iv-fw")
                      .setLabel("j(V) fw")
                      .autoAxis()
                      .setLineColor('blue');

    this.serie_iv_backward = this
                      .graph_iv_instance
                      .newSerie("iv-bw")
                      .setLabel("j(V) bw")
                      .autoAxis()
                      .setLineColor('red');

    this.serie_iv_forward_power = this
                      .graph_iv_instance
                      .newSerie("pow-fw")
                      .setLabel("P(V) fw")
                      .autoAxis()
                      .setYAxis( this.graph_iv_instance.getRightAxis() )
                      .setLineColor('blue')
                      .setLineStyle( 2 );

    this.serie_iv_backward_power = this
                      .graph_iv_instance
                      .newSerie("pow-bw")
                      .setLabel("P(V) bw")
                      .autoAxis()
                      .setYAxis( this.graph_iv_instance.getRightAxis() )
                      .setLineColor('red')
                      .setLineStyle( 2 );


    this.shape_mpp_backward = this.graph_iv_instance
                                .newShape( "ellipse" )
                                .setR( "3px", "3px" )
                                .setFillColor( 'black' )
                                .draw()
                                .setSerie( this.serie_iv_backward_power );

    this.shape_mpp_forward = this.graph_iv_instance
                                .newShape( "ellipse" )
                                .setR( "3px", "3px" )
                                .setFillColor( 'black' )
                                .draw()
                                .setSerie( this.serie_iv_forward_power );


    this.graph_mppt_instance = new Graph( this.graph_mppt_dom );
    this.graph_mppt_instance.resize( 550, 300 );

    this.graph_mppt_instance
          .getLeftAxis( 0 )
          .setUnit( "A")
          .setUnitWrapper("(", ")")
          .setUnitDecade( true )
          .setScientific( true )
          .gridsOff()
          .setLabel( "Current" );


this.graph_mppt_instance
          .getLeftAxis( 1 )
          .setUnit( "V")
          .setUnitWrapper("(", ")")
          .setUnitDecade( true )
          .setScientific( true )
          .gridsOff()
          .setLabel( "Voltage" );


this.graph_mppt_instance
          .getLeftAxis( 2 )
          .setUnit( "W")
          .setUnitWrapper("(", ")")
          .setUnitDecade( true )
          .setScientific( true )
          .gridsOff()
          .setLabel( "Power" );


    this.graph_mppt_instance
          .getBottomAxis()
          .setUnit( "s")
          .setUnitWrapper("(", ")")
          .gridsOff()
          .setLabel( "Time" );

    this.graph_mppt_instance.getLeftAxis( 0 ).setSpan( 0, 0.3 );
    this.graph_mppt_instance.getLeftAxis( 1 ).setSpan( 0.35, 0.65 );
    this.graph_mppt_instance.getLeftAxis( 2 ).setSpan( 0.7, 1 );

    this.serie_mppt_j = this.graph_mppt_instance.newSerie("mppt_i").autoAxis().setYAxis( this.graph_mppt_instance.getLeftAxis( 0 ) );
    this.serie_mppt_v = this.graph_mppt_instance.newSerie("mppt_v").autoAxis().setYAxis( this.graph_mppt_instance.getLeftAxis( 1 ) );
    this.serie_mppt_p = this.graph_mppt_instance.newSerie("mppt_p").autoAxis().setYAxis( this.graph_mppt_instance.getLeftAxis( 2 ) );
    
    this.graph_mppt_instance.autoscaleAxes().draw();


    this.doListInstruments();


 //   this.state.data_iv_forward = Graph.newWaveform().setData([ 0.00159047, 0.00137599, 0.00116845, 0.000966239, 0.000768515, 0.000573518, 0.000380705, 0.000197053, 1.69232e-05, -0.000160399, -0.000333588, -0.000497843, -0.000664469, -0.000819633, -0.00097038, -0.0011206, -0.00126473, -0.00140276, -0.00153492, -0.00166282, -0.00178445, -0.00190068, -0.0020134, -0.00211749, -0.00222306, -0.00232323, -0.00241041, -0.00250073, -0.00257734, -0.00265292, -0.00273215, -0.00279307, -0.00285689, -0.00291986, -0.00297507, -0.00302145, -0.00306849, -0.00310677, -0.00315721, -0.00319512, -0.00323154, -0.00327204, -0.00329976, -0.00331859, -0.00334243, -0.00336161, -0.00337943, -0.00340376, -0.00342808, -0.00344035, -0.0034578, -0.00347864, -0.00348327, -0.00348974, -0.00350606, -0.00351705, -0.00352489, -0.003535, -0.00354604, -0.00354704, -0.00356564, -0.00356582, -0.00356452, -0.00355965, -0.00358025, -0.00358969, -0.00358747, -0.00360011, -0.00360075, -0.00359804, -0.00361004, -0.00360675, -0.00361336, -0.0036207, -0.00362369, -0.00362688, -0.00363007, -0.00362537, -0.00362981, -0.00362558, -0.0036274, -0.00363489, -0.00363401, -0.0036317, -0.00363843, -0.00364736, -0.00363954, -0.00363407, -0.00364801, -0.00364133, -0.00363788, -0.00365436, -0.00364088, -0.00364797, -0.00363684, -0.00364537, -0.00364988, -0.00364615, -0.0036536, -0.00365154, -0.00364875, -0.00366419, -0.0036478, -0.00365334, -0.00365336, -0.00365423, -0.00366708, -0.00364507, -0.00366117, -0.00366083, -0.00365518, -0.00364931, -0.00365207, -0.00366019, -0.0036408, -0.00366224, -0.00365427, -0.00364991, -0.00365051, -0.00364705, -0.00365731, -0.00364347, -0.00365904, -0.00366021, -0.003658, -0.00366524, -0.00366347, -0.00365046, -0.0036635, -0.00366383, -0.00365939, -0.00365331, -0.00365609, -0.00365287, -0.00365572, -0.00365494, -0.0036538, -0.00365581, -0.00366109, -0.00366263, -0.00366145, -0.00365647, -0.00366035, -0.00365679, -0.00366961, -0.00365212, -0.0036645, -0.00365376, -0.00365547, -0.00365083, -0.00364956, -0.0036563, -0.00366769, -0.00366565, -0.00366528, -0.00365187, -0.00367057, -0.00366705, -0.00366124, -0.00365905, -0.0036608, -0.00365811, -0.00366258, -0.00365181, -0.00365048, -0.0036648, -0.00365531, -0.00367345, -0.00366403, -0.00365175, -0.00365491, -0.00366593, -0.00366296, -0.0036618, -0.00366139, -0.00365608, -0.00365766, -0.00367779, -0.00365661, -0.00365323, -0.00366134, -0.00365836, -0.00366565, -0.00365922, -0.00366088, -0.00365118, -0.00366221, -0.00366016, -0.00366639, -0.00365931, -0.00365406, -0.00366611, -0.0036621, -0.00366975, -0.00366627, -0.0036627, -0.00365175, -0.00366242, -0.00366046, -0.00364766, -0.00366264, -0.00366809, -0.0036576, -0.00367803, -0.00367317, -0.00365774, -0.00366222, -0.0036634, -0.00366293, -0.0036669, -0.00366489, -0.00366211, -0.00367056, -0.00366424, -0.00366067 ] ).rescaleX( 1.07, - 0.005 );
 //   this.state.data_iv_forward_power = this.state.data_iv_forward.duplicate().math( ( y, x ) => y * x );
 //   this.getAverageIVParameters();


    this.componentDidUpdate();
  
  }

  placeMaxPowerShape( waveform, shape ) {

    if( ! shape ) {
      return;
    }

    if( ! waveform ) {
      shape.hide();
      return;
    }

    let maxPowerXMin = waveform.findLocalMinMaxIndex( 0 ,waveform.getLength() - 1, "min" );
    let maxPower = waveform.getY( waveform.getIndexFromX( maxPowerXMin ) );

    shape.show().setPosition( { x: maxPowerXMin, y: maxPower } ).redraw();
  }

  componentDidUpdate() {

    if( ! this.graph_iv_instance || ! this.graph_mppt_instance ) {
      return;
    }

    if( this.state.data_iv_forward ) {
      this.serie_iv_forward.setWaveform( this.state.data_iv_forward );
    }

    if( this.state.data_iv_forward_power ) {
      this.serie_iv_forward_power.setWaveform( this.state.data_iv_forward_power );
    }
    this.placeMaxPowerShape( this.state.data_iv_forward_power, this.shape_mpp_forward );
    

    if( this.state.data_iv_backward ) {
      this.serie_iv_backward.setWaveform( this.state.data_iv_backward );
    }

    if( this.state.data_iv_backward_power ) {
        this.serie_iv_backward_power.setWaveform( this.state.data_iv_backward_power );
    }
    this.placeMaxPowerShape( this.state.data_iv_backward_power, this.shape_mpp_backward );

    this.graph_iv_instance.autoscaleAxes().draw();
    this.legend.update();

    this.graph_iv_instance.getLeftAxis().forceMax( - this.graph_iv_instance.getLeftAxis().getDataMin() );
    this.graph_iv_instance.getRightAxis().forceMax( - this.graph_iv_instance.getRightAxis().getDataMin() );

    if( this.state.mppt_p ) {
      this.serie_mppt_p.setWaveform( this.state.mppt_p );
    }
    
    if( this.state.mppt_j ) {
      this.serie_mppt_j.setWaveform( this.state.mppt_j );
    }

    if( this.state.mppt_v ) {
      this.serie_mppt_v.setWaveform( this.state.mppt_v );
    }

    this.graph_mppt_instance.autoscaleAxes().draw();

  }

  scheduleListInstruments() {
    setTimeout( () => {
      this.doListInstruments();
    }, 5000 )
  }

  doListInstruments() {
    
    KeithleySMU.list().then( ( results ) => {

      this.setState( { gpib_resources: results } );
      this.scheduleListInstruments();
    } ).catch( () => {
      this.scheduleListInstruments();
    });
  }


  render() {

    let list_gpibresources = [];
    for( var i = 0; i < this.state.gpib_resources.length; i ++ ) {
      list_gpibresources.push( <option value={ this.state.gpib_resources[ i ] } key={ this.state.gpib_resources[ i ] }>{ this.state.gpib_resources[ i ] }</option> );
    }


    return (

        <div className="container-fluid">

        <div className="row">
        <div className="col-xs-4">
            <div className="container-fluid">

              <h3>j(V) and MPP tracker</h3>


              <form>
                <div className="form-group row">
                  <label htmlFor="gpib_resource">Keithley GPIB resource</label>
                  
                
                  <div className="input-group">
                    <select name="gpibresource" id="gpib_resource" name="gpib_resource" className="form-control" value={this.state.gpib_resource} onChange={this.form_gpib_change}>
                      <option value="-1">Select the Keithley</option>
                      { list_gpibresources }
                    </select>
                    <div className="input-group-btn">
                      <button type="button" className="btn btn-primary" onClick={ this.connectKeithleyToGPIB }>Connect</button>  
                    </div>
                  </div>
                </div>
                
              
                { this.state.connectionerror_keithley && 
                  <p className="bg-danger">Problem connecting to GPIB resource. Check Keithley parameters. The returned error was : { this.state.connectionerror } </p>
                }
                { this.state.connected_keithley &&
                  <p className="bg-success">Successfully connected to remote host (IDN { this.state.connected_keithley })</p>
                }


                <div className="form-group row">
                  <label htmlFor="gpib_resource">Verasol GPIB resource</label>
                  
                
                  <div className="input-group">
                    <select name="gpibresource" id="gpib_resource" name="gpib_resource" className="form-control" value={this.state.gpib_resource} onChange={this.form_gpib_change}>
                      <option value="-1">Select the Verasol lamp</option>
                      { list_gpibresources }
                    </select>
                    <div className="input-group-btn">
                      <button type="button" className="btn btn-primary" onClick={ this.connectLampToGPIB }>Connect</button>  
                    </div>
                  </div>
                </div>
                
              
                { this.state.connectionerror_lamp && 
                  <p className="bg-danger">Problem connecting to GPIB resource. Check Verasol parameters. The returned error was : { this.state.connectionerror } </p>
                }
                { this.state.connected_lamp &&
                  <p className="bg-success">Successfully connected to remote host (IDN { this.state.connected_lamp })</p>
                }
              </form>


              <form>

              <div className="form-group row">
                  <label>Sample name</label>
                  <input type="text" className="form-control" name="samplename" value={ this.state.samplename } onChange={ this.form_ext_change } />
                  
                </div>

                <div className="form-group row">
                  <label>Light intensity</label>
                  
                    <div className="input-group">
                      <input type="number" className="form-control" name="powin" value={ this.state.powin } onChange={ this.form_ext_change } />
                      <span className="input-group-addon">W m<sup>-2</sup></span>
                    </div>
                  
                </div>

                <div className="form-group row">
                  <label >Device area</label>
                  
                    <div className="input-group">
                      <input type="number" className="form-control" name="area" value={ this.state.area } onChange={ this.form_ext_change } />
                      <span className="input-group-addon">cm<sup>-2</sup></span>
                    </div>
                  
                </div>
              </form>

              <form>
                <div className="form-group row">
                  <label>Starting voltage</label>
                  
                    <div className="input-group">
                      <input type="number" className="form-control" name="iv_starting_voltage" value={ this.state.iv_starting_voltage } onChange={ this.form_iv_change } />
                      <span className="input-group-addon">V</span>
                  
                  </div>
                </div>
                
                <div className="form-group row">
                  <label>Stopping voltage</label>
                  
                    <div className="input-group">
                      <input  type="number" className="form-control" name="iv_stopping_voltage" value={ this.state.iv_stopping_voltage } onChange={ this.form_iv_change } />
                      <span className="input-group-addon">V</span>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="checkbox">

                      <div className="checkbox">
                        <label>
                          <input type="checkbox" name="iv_hysteresis" value={ this.state.iv_hysteresis } onChange={ this.form_iv_change } /> Hysteresis
                        </label>
                      </div>

                  </div>
                </div>

                <div className="form-group row">
                  <label>Scan rate</label>
                  <div>
                    <div className="input-group">
                      <input  type="number" className="form-control" name="iv_scan_rate" type="number" max="1" min="0.0001" step="0.0001" value={ this.state.iv_scan_rate } onChange={ this.form_iv_change } />
                      <span className="input-group-addon">V s<sup>-1</sup></span>
                    </div>
                  </div>
                </div>

               

              </form>

              <form>

                <div className="form-group row">

                    <label>MPPT duration</label>
                  
                    <div className="input-group">
                      <input  className="form-control" name="mppt_duration" type="number" max="1000" min="10" step="1" value={ this.state.mppt_duration } onChange={ this.form_mppt_change } />
                      <span className="input-group-addon">s</span>
                    </div>
                  
                </div>
              </form>


              <div className="row">
              <div className="btn-group form-group">
                
                <button onClick={ this.iv } className={ "btn btn-primary" + ( this.state.iv_making || ! this.state.connected_keithley || ! this.state.connected_lamp ? ' disabled' : '' ) } type="button"><span className="glyphicon glyphicon-record"></span> Record IV</button>
                    
                { ! this.state.running_mpp &&
                  <button onClick={ this.mppt } className={ "btn btn-primary" + ( ! this.state.connected_keithley || ! this.state.connected_lamp ? ' disabled' : '' ) } type="button"><span className="glyphicon glyphicon-record"></span> Record MPP</button>
                }
                { !! this.state.running_mpp &&
                  <button onClick={ this.stop_mppt } className="btn btn-danger" type="button"><span className="glyphicon glyphicon-stop"></span> Stop MPP</button>
                }
                 <div className="clearfix visible-xs-block"></div>
              </div>
              </div>
              <div className="row">
              <div className="btn-group form-group">


      {/*          <button onClick={ this.downloadPDF } className={ "btn btn-default" } type="button"><span className="glyphicon glyphicon-download"></span> Download PDF</button>*/}
                <button onClick={ this.downloadITX } className={ "btn btn-default" } type="button"><span className="glyphicon glyphicon-download"></span> Download ITX</button>
                {/*button onClick={ this.downloadCSV } className={ "btn btn-default" } type="button"><span className="glyphicon glyphicon-download"></span> Download CSV</button>*/}
                   
                 <div className="clearfix visible-xs-block"></div>
              </div>
              </div>

            </div>
          </div>
        


          <div className="col-xs-5">
            <div className="row">
              <div className="graph" ref={ ( el ) => { this.graph_iv_dom = el } }></div>
            </div>
            <div className="row">
              <div className="graph"  ref={ ( el ) => { this.graph_mppt_dom = el } }></div>
            </div>
          </div>

          <div className="col-xs-3">
            <h3>Extracted data</h3>

              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">J<sub>sc</sub></span>
                  <input type="text" className="form-control" readOnly={true} value={ this.state.jsc } />
                  <span className="input-group-addon">mA cm<sup>-2</sup></span>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">V<sub>oc</sub></span>
                  <input type="text" className="form-control" readOnly={true} value={ this.state.voc } />
                  <span className="input-group-addon">V</span>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">FF</span>
                  <input type="number" max="100" step="0.1" className="form-control" readOnly={true} value={ this.state.ff } />
                  <span className="input-group-addon">%</span>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">PCE</span>
                  <input type="number" min="0" max="35" step="0.01" className="form-control" readOnly={true} value={ this.state.pce } />
                  <span className="input-group-addon">%</span>
                </div>
              </div>

              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">MPPT PCE</span>
                  <input type="text" className="form-control" readOnly={true} value={ this.state.mppt_max_efficiency } />
                  <span className="input-group-addon">%</span>
                </div>
              </div>

          </div>
          
        </div>
        </div>
        

    );
  }
}

export default MPPTJV;