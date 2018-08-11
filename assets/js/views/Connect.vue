<template>
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">Connect to Mailroom Server</div>

                    <div class="panel-body">
                        <form class="form-inline">
                          <div class="form-group">
                            <input type="text" class="form-control" id="apiKey" placeholder="Enter Api Key" v-model="apiKey">
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
    export default {
        created() {
            this.apiKey = window.apiKey;
            if(this.apiKey) {
                this.sendRequest();
            }
        },

        data() {
            return {
                apiKey: '',
                message: ''
            };
        },

        methods: {
            saveKey() {
                window.apiKey = this.apiKey;
                this.sendRequest();

            },

            sendRequest() {
                axios.get('https://mailroom.myapi.website/api/user', {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                    }
                  }).then(response =>{
                        let name = response.data.name;
                        this.message = `Hello ${name}.  You successfully connected.`;
                  }).catch(error => {
                        this.message = 'Sorry, there was an error connecting to the server';
                  });
            }
        }
    }
</script>
