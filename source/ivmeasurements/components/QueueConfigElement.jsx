import React from 'react';
import { connect } from 'react-redux';
import MPPTFormWrapper from './MPPTFormWrapper';
//import ChanControlWrapper from './ChanControlWrapper'
import JVFormWrapper from './JVFormWrapper';

const mapStateToProps = state => {
  return {
    queueElement: state.queue[state.currentQueueElement]
  };
};

const QueueConfigElement = ({ dispatch, queueElement }) => {
  if (!queueElement) {
    return null;
  }

  return (
    <div className="col-sm-8">
      {(() => {
        switch (queueElement.type) {
          case 'JV':
            return <JVFormWrapper {...queueElement} />;
            break;

          case 'MPPT':
            return <MPPTFormWrapper {...queueElement} />;
            break;
        }
      })()}
    </div>
  );
};

export default connect(mapStateToProps)(QueueConfigElement);
