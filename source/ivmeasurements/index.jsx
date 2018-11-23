import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import app from './reducers/main';
import QueueWrapper from './components/QueueWrapper.js';
import QueueConfigElement from './components/QueueConfigElement.jsx';
import ViewData from './components/ViewData.jsx';
import CurrentQueueElementTitle from './components/QueueElementTitle.jsx';

import { dataReceived } from './actions/Data';

import ChanControlWrapper from './components/ChanControlWrapper';

import JV from './util/jv';
import Waveform from 'jsgraph-waveform';

import DataReceiver from './data/receiver';
import RunWrapper from './components/RunWrapper';
import ActivityStatus from '../jsx/tracker/status/activity/main.jsx';

import { execution, executionStop } from './execution/main';
import { ipcRenderer } from 'electron';

let store = createStore(
  app,
  {},
  compose(
    applyMiddleware(logger),
    applyMiddleware(thunk)
  )
);

const render = (store, instrumentId, tracker) => {
  ReactDOM.render(
    <Provider store={store}>
      <div className="container-fluid">
        <ChanControlWrapper channels={store.channels} buttonView={true} />

        <div className="row statuses">
          <div className="col-lg-3 group-status group-status-instrument">
            <ActivityStatus instrumentId={instrumentId} />
          </div>
          <div className="col-lg-3 group-status group-status-instrument">
            <QueueWrapper />
          </div>

          <div className="col-lg-3 group-status group-status-instrument">
            <RunWrapper
              runStart={() => {
                execution(store, instrumentId, tracker);
              }}
              runStop={() => {
                executionStop(store);
              }}
            />
          </div>

          <div className="clearfix" />
        </div>

        <CurrentQueueElementTitle />

        <div className="col-lg-9 group-status">
          <h4>Configuration</h4>
          <QueueConfigElement />
        </div>
        <div className="col-lg-9 group-status">
          <h4>Output data</h4>
          <ViewData />
        </div>
      </div>
    </Provider>,

    document.getElementById('root')
  );
};

ipcRenderer.on('loadInstrument', (event, cfg) => {
  const tracker = cfg.tracker;
  const db = cfg.db;

  fetch(
    'http://' +
      tracker.trackerHost +
      ':' +
      tracker.trackerPort +
      '/getInstruments',
    {
      method: 'GET'
    }
  )
    .then(response => response.json())
    .then(json => {
      for (var j in json) {
        // Attach listeners
        const instrumentId = j;
        render(store, instrumentId, tracker);
        break;
      }
    });
});
