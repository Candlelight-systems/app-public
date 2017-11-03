
import React from 'react';

class Timer extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      now: Date.now()
    };
  }

  componentDidMount() {
    
    setInterval( () => {
console.log('up');
      this.setState( { now: Date.now() });

    }, 1000 );    
  }


  render() {
    return ( <span>{ Math.round( ( this.state.now - this.props.latest ) / 1000 ) }s</span> );
  }

}

export default Timer;