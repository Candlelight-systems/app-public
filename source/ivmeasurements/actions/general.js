

export const changeSunIntensity = ( newValue ) => {
	
	return {
		type: 'SUN_CHANGE_INTENSITY',
		newValue: newValue
	};
}

export const ChangeParamName = ( paramId, paramValue ) => {

	return {
		type: 'CHANGE_PARAM_NAME',
		paramId: paramId,
		newValue: paramValue
	};
}