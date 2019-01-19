export function lockQueue() {
  return {
    type: 'RUN_LOCK'
  };
}

export function stopping() {
  return {
    type: 'RUN_STOPPING'
  };
}

export function unlockQueue() {
  return {
    type: 'RUN_UNLOCK'
  };
}

export function setCurrentQueueElement(queueElement) {
  return {
    type: 'SET_RUNNING_QUEUE_ELEMENT',
    currentQueueElement: queueElement
  };
}
