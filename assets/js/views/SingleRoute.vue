<template>
	<div>
		 <div class="container">
		 	<div class="row">
		 		<div class="col-md-10 col-md-offset-1">
			        <div class="panel panel-default">
			            <div class="panel-heading">
			               <div v-if="message">
			               		{{message}}
			               </div>
			               <div v-else>
			               		<strong>Method:</strong> {{pathName}}
				                <br>
				                <strong>Hook Path:</strong> {{data.path}}
						    </div>
			            </div>

			            <div class="panel-body" v-if="noHookDataMessage">
			            	{{noHookDataMessage}}
			            </div>

			            <div class="panel-body single-route-body wrap" v-else>
			              <p v-if="data.ip">
			              	<strong>IP:</strong> {{data.ip}}
			              </p>
			               <p v-if="data.url">
			              	<strong>URL:</strong> {{data.url}}
			              </p>
			               <p v-if="data.query_string">
			              	<strong>Query String:</strong> {{data.query_string}}
			              </p>
			              <div v-if="data.headers">
			              	<p><strong>HEADERS:</strong></p>
			              	<p v-for="(value, key) in data.headers">
			              		 <mark>{{key}}</mark>: {{value}}
			              	</p>
			              </div>
			              <div v-if="data.body">
			              	<p><strong>BODY:</strong></p>
			              	<p>{{data.body}}</p>
			              </div>
			            </div>

			            <div class="panel-footer" v-if="!noHookDataMessage">
		                    <div class="row">
		                        <div class="col-md-12">
		                            <div class="text-left">
		                                <form class="form-inline">
				                          
				                            <input type="text" class="form-control input-width" id="sendToRoute" placeholder="Send to route" v-model="sendToRoute">
				                         
				                           <button type="button" class="btn btn-primary" @click="makeRequest">Send Request</button>
				                        </form>
		                            </div>
		                        </div>
		                    </div>
		                </div>
			        </div>
			    </div>
		 	</div>
		 </div>
		 <div class="container">
		 	<div class="row">
		 		<div class="col-md-10 col-md-offset-1">
		 			<div class="panel panel-default" v-if="requestResponse">
	                    <div class="panel-heading">
	                    	<p><strong>Response</strong></p>
	                    	<p v-if="responseStatus">
	                    		Status: {{responseStatus}}
	                    	</p>
	                    </div>

	                    <div class="panel-body single-route-body wrap" v-html="requestResponse">
	                       
	                    </div>
	                </div>
		 		</div>
		 	</div>
		</div>
	</div>
</template>

<script>
	export default {
		created() {
			this.sendRequest(this.$route.params.id);
		},

		computed: {
            pathName() {
            	if (this.data.method) {
            		 return this.data.method.toUpperCase();
            	} else {
            		return '';
            	} 
               
            }
        },

		data() {
			return {
				message: '',
				noHookDataMessage: '',
				data: {},
				sendToRoute: '',
				requestResponse: '',
				responseStatus: ''

			};
		},

		methods: {
			sendRequest(id) {
				axios.get(window.targetUrl + '/api/hooks/' + id, {
                    headers: {
                        'Authorization': `Bearer ${window.apiKey}`,
                    }
                })
                .then(respose => {
                	this.data = respose.data.data;
                	if (!this.data.url) {
                		this.noHookDataMessage = "No data for this hook is available";
                	}
                })
                .catch(error => {
                	this.message = "Sorry, there was an error retrieving data";
                });
			},

			makeRequest() {
				if (!this.sendToRoute) {
					return;
				}

				let sendToUrl;
				const method = this.data.method;

				if (this.data.query_string) {
					sendToUrl = this.sendToRoute + '?' + this.data.query_string;
					
				} else {
					sendToUrl = this.sendToRoute;
				}

				axios[method](sendToUrl, {
					headers: this.data.headers,
					body: this.data.body ? this.data.body : null
				})
				.then(response => {
					this.requestResponse = response.data;
					this.responseStatus = response.status;

				})
				.catch(error => {
					this.requestResponse = error.response.data;
					this.responseStatus = error.response.status;
				});
			}
		}
	}
</script>

<style>
	.input-width {
		width: 70% !important;
	}
</style>