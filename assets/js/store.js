export default {

	state: {
		apiKey: 'apWw89sXzh8h3qodf2qbuDM8fdfJZ2avL9HtvSU04w4qS8EsJQDS3KbjsoVp',
		targetUrl: 'http://mailroom.test',
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