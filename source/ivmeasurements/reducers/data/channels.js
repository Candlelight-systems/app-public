
export default {

	CHANNELS_VIEWDATA_TOGGLE: ( state, action ) => {

		if( action.force !== undefined ) {

			if( action.force ) {

				if( state.indexOf( action.chanId ) > -1 ) {
					return state;
				} else {
					return [ ...state, action.chanId ];
				}

			} else {

				if( state.indexOf( action.chanId ) > -1 ) {
					return state.filter( ( el ) => el !== action.chanId );
				} else {
					return state;
				}
			}
			
		}

		if( state.indexOf( action.chanId ) > -1 ) {

			return [ ...state.splice( 0, state.indexOf( action.chanId ) ), ...state.splice( 1 )  ]
		} else {

			return [ ...state, action.chanId ];
		}
	}
}