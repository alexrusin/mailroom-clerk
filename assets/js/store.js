export default {

	state: {
		apiKey: '3XLShcU93V6EDYSVhOcmqZfcsH0wZdcLYdiirQhAidSb5FN8tBaxE6EIIcQQ',
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