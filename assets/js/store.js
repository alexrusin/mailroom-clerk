export default {

	state: {
		apiKey: '',
		targetUrl: 'https://mailroom.myapi.website',
		routePrefix: '',
		sendToRoutes: {}
	},

	mutations: {
		saveApiKey(state, key){
			state.apiKey = key;
		},

		saveTargetUrl(state, key){
			state.targetUrl = key;
		},

		saveRoutePrefix(state, key){
			state.routePrefix = key;
		},

		setRouteByKey(state, route) {
			state.sendToRoutes[route.id] = route.path;
		}
	}

};