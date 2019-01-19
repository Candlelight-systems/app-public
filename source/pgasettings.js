
export let pgaValueToRange = ( pgaValue, fsr ) => {
	// FSR is in A
	let str = "";
fsr = 20e-3;
	// Convert to mA
	str += Math.round( fsr / parseInt( pgaValue ) * 1000 * 1000 ) / 1000;

	return str;
}