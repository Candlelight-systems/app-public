export const MPPT_CHANGE_DURATION = 'MPPT_CHANGE_DURATION';
export const MPPT_CHANGE_DURATION_UNIT = 'MPPT_CHANGE_DURATION_UNIT';
export const MPPT_CHANGE_STEP_SIZE = 'MPPT_CHANGE_STEP_SIZE';

export function MPPTChangeDuration( value, index ) {
	return {
		type: MPPT_CHANGE_DURATION,
		index: index,
		value: value
	};
}

export function MPPTChangeDurationUnit( value, index ) {
	return {
		type: MPPT_CHANGE_DURATION_UNIT,
		index: index,
		value: value
	}
}

export function MPPTChangeStepSize( value, index ) {
	return {
		type: MPPT_CHANGE_STEP_SIZE,
		index: index,
		value: value
	}
}