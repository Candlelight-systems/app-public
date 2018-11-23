import React from 'react';
import { ipcRenderer } from 'electron';
import environment from '../../../../../app/environment.json';
import urllib from 'url-lib';
import { autoZero } from '../../../../queries';

import { MessageInfo, MessageError, MessageWarning } from './messages.jsx';

//import { default as InstrumentStatus_1_0 } from "./instrumentstatus_1.0.jsx"

let speedOptions = [];

/*
	ADS1259
	0b00000000 ==> 10SPS
	0b00000001 ==> 16SPS
	0b00000010 ==> 50SPS
	0b00000011 ==> 60SPS
	0b00000100 ==> 400SPS
	0b00000101 ==> 1.2kSPS
	0b00000110 ==> 3.6kSPS
	0b00000111 ==> 14kSPS

	ADS1147
	0b00000000 ==> 5SPS
	0b00000001 ==> 10SPS
	0b00000010 ==> 20SPS
	0b00000011 ==> 40SPS
	0b00000100 ==> 80SPS
	0b00000101 ==> 160SPS
	0b00000110 ==> 320SPS
	0b00000111 ==> 640SPS
	0b00000111 ==> 1000SPS
	0b00000111 ==> 2000SPS
*/

class InstrumentStatus extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      messages: []
    };

    this.wsUpdate = this.wsUpdate.bind(this);
  }

  componentDidUpdate() {
    if (this.atBottom) {
      this.logDiv.scrollTop = this.logDiv.scrollHeight;
    }
  }

  componentWillUpdate() {
    this.atBottom = this.logDiv.scrollTop >= this.logDiv.scrollHeight - 150;
  }

  componentDidMount() {
    ipcRenderer.on('instrument.log.' + this.props.instrumentId, this.wsUpdate);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(
      'instrument.log.' + this.props.instrumentId,
      this.wsUpdate
    );
  }

  wsUpdate(event, message) {
    this.state.messages.push(message);
    if (this.state.messages.length > 100) {
      this.state.messages.shift();
    }

    this.setState({
      message: this.state.message
    });
  }

  render() {
    const messages = this.state.messages.map(message => {
      switch (message.type) {
        case 'info':
          return (
            <MessageInfo
              key={message.time + '_' + message.channel}
              {...message}
            />
          );
          break;

        case 'warning':
          return (
            <MessageWarning
              key={message.time + '_' + message.channel}
              {...message}
            />
          );
          break;

        case 'error':
          return (
            <MessageError
              key={message.time + '_' + message.channel}
              {...message}
            />
          );
          break;
      }
    });

    return (
      <div>
        <h4>Activity log</h4>
        <div className="activityLog" ref={el => (this.logDiv = el)}>
          {messages.length > 0 ? messages : 'No message to display'}
        </div>
      </div>
    );
  }
}

export default InstrumentStatus;
