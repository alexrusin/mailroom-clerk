import './bootstrap';
import router from './routes';
import store from './store';
import mixins from './mixins';

Vue.mixin(mixins);

const app = new Vue({
    el: '#app',

    router,
    store: new Vuex.Store(store),
});
