import React from 'react';
import path from 'path';
import url from 'url';

class Header extends React.Component {
	

	constructor( props ) {
		super( props );
	}

	render() {
  		
		let busy = 0;
		let total = 0;
  		if( this.props.channels ) {
  			total = this.props.channels.length;
  			let chan;

  			for( chan of this.props.channels ) {
  				
  				chan.busy && busy++;
  			}
  		}

		return (

			<nav className="header navbar navbar-default">

				<div className="container-fluid">
					
					<div className="navbar-left">
						<img src="./images/logo.png" width="350" />
				    </div>
				    
				</div>
			</nav>
		);// /*<div><small>{ this.props.channels ? "Running " + busy + "/" + total : "" } channels</small></div>*/
	}
}

export default Header;