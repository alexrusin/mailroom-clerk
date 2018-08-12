
import VueRouter from 'vue-router';

let routes = [
	{
		path: '/',
		component: require('./views/Connect')
	},

	{
		path: '/routes',
		component: require('./views/Routes')
	},

	{
		path: '/routes/:id',
		component: require('./views/SingleRoute')
	}

];

export default new VueRouter({
	routes,
	linkActiveClass: "is-active"
});