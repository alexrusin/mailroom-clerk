export default {

	state: {
		apiKey: '',
		targetUrl: 'https://mailroom.myapi.website',
		sendToRoutes: {}
	},

	mutations: {
		saveApiKey(state, key){
			state.apiKey = key;
		},

		setRouteByKey(state, route) {
			state.sendToRoutes[route.id] = route.path;
		}
	}

};