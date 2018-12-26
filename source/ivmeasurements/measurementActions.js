export default [

	{
		type: 'JV',
		name: 'J(V) curve',
		defaults: {
			jvStopValues: [ { start: 0, end: 1, scanRate: 0.2 } ] 
			
		}
	},
	{
		type: 'MPPT',
		name: 'MPP tracking',
		defaults: {
			duration: 15,
			durationUnit: 60,
			stepSize: 1
		}
	},
	{
		type: 'TCPControl',
		name: 'TCP/IP request',
		defaults: {
			
		}
	}
]