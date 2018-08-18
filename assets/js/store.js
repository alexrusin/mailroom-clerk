export default {

	state: {
		apiKey: '',
		targetUrl: 'https://mailroom.myapi.website'
	},

	mutations: {
		saveApiKey(state, key){
			state.apiKey = key;
		}
	}

};