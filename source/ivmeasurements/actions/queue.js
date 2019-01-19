export const QUEUE_ADD_ELEMENT = 'QUEUE_ADD_ELEMENT';
export const QUEUE_REMOVE_ELEMENT = 'QUEUE_REMOVE_SELECTED_ELEMENT';
export const QUEUE_REMOVE_ELEMENT_SAFE = 'QUEUE_REMOVE_SELECTED_ELEMENT_SAFE';
export const QUEUE_SELECT_ELEMENT = 'QUEUE_SELECT_ELEMENT';
export const QUEUE_UP_ELEMENT = 'QUEUE_UP_ELEMENT';
export const QUEUE_DOWN_ELEMENT = 'QUEUE_DOWN_ELEMENT';

export function queueAddElement(id, type, name, defaults) {
  return {
    type: QUEUE_ADD_ELEMENT,
    newElement: {
      id: id,
      type: type,
      name: name,
      ...defaults
    }
  };
}

export function queueRemoveSelectedElement() {
  return (dispatch, getState) => {
    dispatch(
      queueRemoveElement(
        getState().currentPreset,
        getState().currentQueueElement
      )
    );
  };
}

export function queueRemoveElement(preset, index) {
  return {
    type: QUEUE_REMOVE_ELEMENT,
    preset: preset,
    index: index
  };
}

export function queueRemoveElementSafe(preset, index) {
  return {
    type: QUEUE_REMOVE_ELEMENT_SAFE,
    preset: preset,
    index: index
  };
}

export function queueSelectElement(index) {
  return {
    type: QUEUE_SELECT_ELEMENT,
    index: index
  };
}

export function queueUpElement(index) {
  return {
    type: QUEUE_UP_ELEMENT,
    index: index
  };
}
export function queueDownElement(index) {
  return {
    type: QUEUE_DOWN_ELEMENT,
    index: index
  };
}
