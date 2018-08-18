import './bootstrap';
import router from './routes';
import store from './store';

const app = new Vue({
    el: '#app',

    router,
    store: new Vuex.Store(store)
});
