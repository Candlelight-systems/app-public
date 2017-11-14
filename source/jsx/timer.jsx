
import React from 'react';

class Timer extends React.PureComponent {

  constructor( props ) {
    super( props );
    this.state = {
      now: Date.now()
    };
  }

  componentDidMount() {

    this.updated = Date.now();

    this.interval = setInterval( () => {

      if( this.props.timerValue === undefined || isNaN( this.props.timerValue.time ) ) {
        return;
      }

      if( this.props.direction == 'ascending' ) {

        if( ! this.updated ) {
          return;
        }

        this.setState( { 
          timerValue: ( Date.now() - this.updated ) + this.props.timerValue.time
        } );  

      } else {

        this.setState( { 
          timerValue: this.props.timerValue.time - ( Date.now() - this.updated )
        } );  
      }
    
    }, 1000 );    
  }

  componentWillUnmount() {
    clearInterval( this.interval );
  }

  componentWillReceiveProps( nextProps ) {

    if( nextProps.timerValue === this.props.timerValue ) {
      return;
    }

    this.updated = Date.now();
  }

  processTime( value ) {

    let str = [];
    let spacer = this.props.spacer || "";

    value /= 1000;
    if( value > 60 && ( this.props.maxLevel > 1 || ! this.props.maxLevel ) ) { // minutes

      if( value > 3600 && ( this.props.maxLevel > 2 || ! this.props.maxLevel ) ) { // hours

        if( value > 3600 * 24 && ( this.props.maxLevel > 3 || ! this.props.maxLevel ) ) { // days

          str.push( Math.floor( value / ( 3600 * 24 ) ) + spacer + "d" );
          value = value % ( 3600 * 24 ); 
          
        }

        str.push( Math.floor( value / 3600 )  + spacer + "h" );
        value = value % 3600;
      }

      str.push( Math.floor( value / 60 )  + spacer + "m" );
      value = value % 60;
    }

    str.push( Math.floor( value )  + spacer + "s" );
    str = str.splice( 0, this.props.precision || 1 );
    return str.join(" ");
  }

  render() {

    if( ! this.state.timerValue || isNaN( this.state.timerValue ) ) {
      return <span>N/A</span>;
    }

    return ( <span>{ this.processTime( this.state.timerValue ) }</span> );
  }

}

export default Timer;