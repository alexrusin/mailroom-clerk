<template>
    <div class="container">
        <div class="row" v-if="message">
            <div class="col-md-12 col-md-offset-1">
                <p v-html="message"></p>
            </div>
        </div>
       <div v-for="route in routeComponents">
            <route-summary :data="route"></route-summary>
       </div>
    </div>
</template>

<script>
    import RouteSummary from './RouteSummary.vue';
    import router from './../routes';
    import {mapState} from 'vuex';

    export default {
        components: {RouteSummary, router},
        computed: mapState(['apiKey', 'targetUrl']),
        created() {
            this.sendRequest();
        },
        data() {
            return {
                routeComponents: [],
                message: ''
            };
        },

        methods: {
            sendRequest() {
                 axios.get(this.targetUrl + '/api/hooks', {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                    }
                  }).then(response => {
                       this.routeComponents = response.data.data;
                       if (this.routeComponents.length === 0) {
                           this.message = 'You have no routes available.  Please visit https://mailroom.myapi.website to create routes';
                       } else {
                           this.message = '';
                       }
                       

                  }).catch(error => {
                        this.message = `Cant't retreieve routes at this time.  Please verify your credentials by entering your API Key`;
                  });
            }
        }
        
    }
</script>
