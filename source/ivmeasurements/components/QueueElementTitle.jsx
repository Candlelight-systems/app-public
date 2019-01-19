import { connect } from 'react-redux';
import React from 'react';

let elementType = null;

const QueueTitle = ({ queueElements, selectedElement }) => {
  console.log(queueElements, selectedElement);
  return (
    <h4>
      {selectedElement + 1}. {queueElements[selectedElement].name}
    </h4>
  );
};

const mapStateToProps = state => {
  return {
    queueElements: state.queue,
    selectedElement: state.currentQueueElement
  };
};

const QueueTitleWrapper = connect(mapStateToProps)(QueueTitle);

export default QueueTitleWrapper;
