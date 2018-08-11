
import VueRouter from 'vue-router';

let routes = [
	{
		path: '/',
		component: require('./views/Home')
	},

	{
		path: '/about',
		component: require('./views/Connect')
	}
];

export default new VueRouter({
	routes,
	linkActiveClass: "is-active"
});