<template>
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">Connect to Mailroom Server</div>

                    <div class="panel-body">
                        <form>
                            <div class="form-group">
                                <input type="text" class="form-control input-key-width" id="apiKey" placeholder="Enter Url" v-model="appUrl">
                                <input type="text" class="form-control input-key-width" id="apiKey" placeholder="Enter Api Key" v-model="storedKey">
                            </div>
                         
                           <button type="button" class="btn btn-primary" @click="saveKey">Connect</button>
                        </form>
                        <br>
                        <p v-if="message"><mark>{{message}}</mark></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        computed: mapState(['apiKey', 'targetUrl']),

        created() {
            this.storedKey = this.apiKey;
            this.appUrl = this.targetUrl;
            if(this.storedKey && this.appUrl) {
                this.sendRequest();
            }
        },

        data() {
            return {
                appUrl: '',
                storedKey: '',
                message: ''
            };
        },

        methods: {
            saveKey() {
                this.$store.commit('saveApiKey', this.storedKey);
                this.$store.commit('saveTargetUrl', this.appUrl);
                this.sendRequest();

            },

            sendRequest() {
                axios.get(this.targetUrl + '/api/user', {
                    headers: {
                        'Authorization': `Bearer ${this.storedKey}`,
                    }
                  }).then(response =>{
                        let name = response.data.name;
                        this.$store.commit('saveRoutePrefix', response.data.route_prefix);
                        this.message = `Hello ${name}.  You successfully connected.`;
                  }).catch(error => {
                        this.message = 'Sorry, there was an error connecting to the server';
                  });
            }
        }
    }
</script>

<style>
    .input-key-width {
        width: 60% !important;
        margin-bottom: 1em;
        margin-right: auto;
        margin-left: auto;
    }
</style>
