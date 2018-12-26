
export default {

	JV_VIEWDATA_TOGGLE: ( state, action ) => {

		if( action.force !== undefined ) {

			if( action.force ) {

				if( state.indexOf( action.jvId ) > -1 ) {
					return state;
				} else {
					return [ ...state, action.jvId ];
				}

			} else {

				if( state.indexOf( action.jvId ) > -1 ) {
					return state.filter( ( el ) => el !== action.jvId );
				} else {
					return state;
				}
			}
			
		}

		if( state.indexOf( action.jvId ) > -1 ) {

			return state.filter( ( jv ) => jv !== action.jvId )

		} else {

			return [ ...state, action.jvId ];
		}
	}
}