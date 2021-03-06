
import React from 'react';

class Error extends React.Component {

  constructor( props ) {
    super( props );
  }

  render() {    

  	var messages = [];
  	if( this.props.methods ) {

  		for( var i = 0; i < this.props.methods.length; i ++ ) {
  			messages.push( <div><a href="#" onClick={ this.props.methods[ i ][ 1 ] }>{ this.props.methods[ i ][ 0 ] }</a></div> )
  		}

  	}
  	{ !! this.props.method && [<br />,  ] }
    
    return <div className="error">The system encountered an unfortunate error: <br /> { this.props.message } { messages } </div>;
  }
}

export default Error;