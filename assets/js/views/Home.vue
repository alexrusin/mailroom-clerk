<template>
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <p v-if="message" v-html="message"></p>
               <div v-for="route in routeComponents">
                    <route-summary :data="route"></route-summary>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
    import RouteSummary from './RouteSummary.vue';
    import router from './../routes';
    export default {
        components: {RouteSummary, router},
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
                 axios.get('https://mailroom.myapi.website/api/hooks', {
                    headers: {
                        'Authorization': `Bearer ${window.apiKey}`,
                    }
                  }).then(response => {
                       this.routeComponents = response.data.data;
                       this.message = '';

                  }).catch(error => {
                        this.message = `Cant't retreieve routes at this time.  Please verify your credentials by entering your API Key`;
                  });
            }
        }
        
    }
</script>
