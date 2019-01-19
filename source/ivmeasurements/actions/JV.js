
export const ADD_JV_FORM_ELEMENT = 'ADD_JV_FORM_ELEMENT';
export const REMOVE_JV_FORM_ELEMENT = 'REMOVE_JV_FORM_ELEMENT';
export const CHANGE_JV_FORM_ELEMENT = 'CHANGE_JV_FORM_ELEMENT';

export function AddJVElement( index, queueId ) { 
	return {
		type: ADD_JV_FORM_ELEMENT,
		index: index,
		queueId: queueId
	}
}

export function RemoveJVElement( index, queueId ) { 
	return {
		type: REMOVE_JV_FORM_ELEMENT,
		index: index,
		queueId: queueId
	}
}

export function ChangeJVElement( index, fieldName, newValue, queueId ) {
	return {
		type: CHANGE_JV_FORM_ELEMENT,
		fieldName: fieldName,
		newValue: newValue,
		index: index,
		queueId: queueId
	}
}

export function JVToggleViewData( jvId, force ) {
	return {
		type: 'JV_VIEWDATA_TOGGLE',
		jvId: jvId,
		force: force
	}
}