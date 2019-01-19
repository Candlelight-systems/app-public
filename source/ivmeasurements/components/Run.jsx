import React from 'react';
import PropTypes from 'prop-types';

const pad = v => {
  if (v < 10) {
    return '0' + v;
  }
  return v;
};

const processMessage = message => {
  let channel = null;
  let className = null;
  let date = null;
  switch (message.type) {
    case 'success':
      className = 'message-succes';
      break;
    case 'warning':
      className = 'message-warning';
      break;
    case 'danger':
      className = 'message-danger';
      break;
    case 'info':
      className = 'message-info';
      break;
  }

  if (message.channel) {
    channel = <strong>(Ch {message.channel})</strong>;
  }

  if (message.date) {
    let d = new Date(message.date);
    date = (
      <label className="log-date">
        [ {pad(d.getHours())}:{pad(d.getMinutes())}
        ::
        {pad(d.getSeconds())} ]:
      </label>
    );
  }

  return (
    <div className={className}>
      {date} {channel} {message.message}
    </div>
  );
};

const Run = ({ status, messages, runStart, runStop }) => {
  let buttonRun = null;
  let buttonStop = null;
  if (status) {
    buttonRun = (
      <button className="btn btn-default" disabled={true}>
        Running...
      </button>
    );
    buttonStop = (
      <button className="btn btn-danger" onClick={runStop}>
        Stop measurement run
      </button>
    );
  } else {
    buttonRun = (
      <button className="btn btn-default" onClick={runStart}>
        Run
      </button>
    );
    buttonStop = null;
  }

  return (
    <div className="">
      <h4>Measurement operation</h4>
      <div className="btn btn-group">
        {buttonRun} {buttonStop}
      </div>
    </div>
  );
};

Run.propTypes = {
  messages: PropTypes.array.isRequired
};

export default Run;
