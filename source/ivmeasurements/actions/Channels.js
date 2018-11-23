
export function ChannelsChangeChan( chanId, field, value ) {
	return {
		type: 'CHANNELS_LIST_CHANGE',
		chanId: chanId,
		field: field,
		value: value
	};
}


export function ChannelsToggleViewData( chanId, force ) {
	return {
		type: 'CHANNELS_VIEWDATA_TOGGLE',
		chanId: chanId,
		force: force
	}
};


export function ChannelsToggleViewConfig( ) {
	return {
		type: 'CHANNELS_VIEWCONFIG_TOGGLE'
	}
};