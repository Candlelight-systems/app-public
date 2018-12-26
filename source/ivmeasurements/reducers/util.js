
export const changeItemInArray = ( haystack, key, keyValue, field, fieldValue ) => {

	if( haystack.filter( ( haystackEl ) => haystackEl[ key ] == keyValue ).length == 0 ) {

		haystack = [...haystack, { [ key ]: keyValue } ];
		return haystack;
	}

	return haystack.map( ( haystackEl ) => {

		if( haystackEl[ key ] !== keyValue ) {
			return haystackEl;
		}

		haystackEl[ field ] = fieldValue;
		return haystackEl;
	});
}