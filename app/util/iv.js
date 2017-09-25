
export let getIVParameters = ( waveform, powerwaveform, area, powin, inverted = false ) => {

    let jsc = waveform.getY( waveform.getIndexFromX( 0 ) );
    let voc = waveform.getX( waveform.findLevel( 0 ) );

    let maxpower;

    if( inverted ) {
      maxpower = powerwaveform.getMaxY();  
    } else {
      maxpower = powerwaveform.getMinY();  
    }
    
    let ff = maxpower / ( jsc * voc );
    let pce = Math.round( maxpower * 1000 / area / ( powin / 10 ) * 100 * 100 ) / 100 * ( inverted ? 1 : -1 );

    let maxIndex = powerwaveform.findLevel( maxpower );
    let vmax = powerwaveform.getX( maxIndex );

    return {
      isc: jsc * 1000 * ( inverted ? 1 : -1 ),
      jsc: jsc / area * 1000 * ( inverted ? 1 : -1 ),
      voc: voc,
      ff: ff * 100,
      power: maxpower * 1000,
      pce: pce,
      jmax: 0,
      vmax: vmax
    };
}