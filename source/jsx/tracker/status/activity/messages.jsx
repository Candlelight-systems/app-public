import React from 'react'

const pad = ( val ) => {
	if( val < 10 ) {
		return "0" + val;
	}
	return val;
}

class Message extends React.Component {

	constructor() {
		super();
	}

	render() {

		const time = this.props.time;
		const date = new Date( time );

		const timeText = `${ pad( date.getHours() ) }:${ pad( date.getMinutes() ) }:${ pad( date.getSeconds() )}`;
		const channel = this.props.channel ? `(Chan ${ this.props.channel })` : ``;
		return ( <div className={ this.divClass } >
			[ {timeText} ]: { channel } { this.props.message }
		</div> );
	}
}

class MessageError extends Message {
	constructor() {
		super();
		this.divClass = "text-danger";
	}
}

class MessageWarning extends Message {
	constructor() {
		super();
		this.divClass = "text-warning";
	}
}

class MessageInfo extends Message {
	constructor() {
		super();
		this.divClass = "text-info";
	}
}

export { MessageError, MessageWarning, MessageInfo }

