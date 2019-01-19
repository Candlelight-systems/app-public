
export default function svgToPDF( domElement, width, height ) {

  return new Promise( ( resolver, rejecter ) => {

    var canvas = document.createElement('canvas');
    canvas.width = width * 4;
    canvas.height = height * 4;
    var ctx = canvas.getContext('2d');
    
    var DOMURL = window.URL || window.webkitURL || window;

    var img = new Image();
    var svg = new Blob( [ domElement.innerHTML ], { type: 'image/svg+xml' } );
    var url = DOMURL.createObjectURL( svg );

    img.onload = function() {
      ctx.drawImage( img, 0, 0, width * 4, height * 4 );
      resolver( canvas.toDataURL() );
      DOMURL.revokeObjectURL(url);
    }

    img.src = url;
  } );
}
