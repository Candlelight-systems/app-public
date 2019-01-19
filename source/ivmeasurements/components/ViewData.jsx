import React from 'react';
import { connect } from 'react-redux';
import JVDataWrapper from './data/JVDataWrapper';
import JVTableWrapper from './data/JVTableWrapper';
import ChanListWrapper from './ChanListWrapper.js';
import JVListWrapper from './JVListWrapper.js';
import MPPDataWrapper from './data/MPPDataWrapper';

const mapStateToProps = state => {
  return {
    queueElement: state.queue[state.currentQueueElement]
  };
};

const ViewDataElement = ({ dispatch, queueElement }) => {
  if (!queueElement) {
    return null;
  }

  return (
    <div>
      {(() => {
        switch (queueElement.type) {
          case 'JV':
            return (
              <div>
                <div className="row view-list">
                  <ChanListWrapper />
                </div>
                <div className="row view-list">
                  <JVListWrapper />
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <JVDataWrapper />
                  </div>

                  <div className="col-sm-12">
                    <JVTableWrapper />
                  </div>
                </div>
              </div>
            );
            break;

          case 'MPPT':
            return (
              <div>
                <div className="row view-list">
                  <ChanListWrapper />
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <MPPDataWrapper />
                  </div>
                </div>
              </div>
            );
            break;
        }
      })()}
    </div>
  );
};

export default connect(mapStateToProps)(ViewDataElement);
