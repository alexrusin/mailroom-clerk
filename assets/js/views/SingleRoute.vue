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

				                           <button type="button" class="btn btn-primary" @click="makeRequest" id="send-request">
				                           	 	<span class="buttonText">Send Request</span>
                								<span class="buttonLoadingImage hiddenButtonElement"></span>
				                           </button>
				                           <button v-if="data" type="button" class="btn btn-success" @click="syncRequest" id="sync-request">
				                           	 	<span class="buttonText">Sync Request</span>
                								<span class="buttonLoadingImage hiddenButtonElement"></span>
				                           </button>
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
		 			<div class="panel panel-default" v-if="requestResponse || responseStatus">
	                    <div class="panel-heading">
	                    	<p><strong>Response</strong></p>
	                    	<p v-if="responseStatus">
	                    		Status: {{responseStatus}}
	                    	</p>
	                    </div>

						<div v-if="isHtmlResponse" class="panel-body single-route-body wrap" v-html="requestResponse">
	                    </div>
	                    <div v-else class="panel-body single-route-body wrap">
							{{requestResponse}}
	                    </div>

	                </div>
		 		</div>
		 	</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		created() {
			this.sendRequest(this.$route.params.id);
			window.Echo.join(this.routePrefix + '-' + this.$route.params.id)
				.listen('HookReceived', (event) => {
                this.data = event;
            });
		},

		computed: {
            pathName() {
            	if (this.data.method) {
            		 return this.data.method.toUpperCase();
            	} else {
            		return '';
            	}

            },
            ...mapState(['apiKey', 'targetUrl', 'routePrefix'])

        },

		data() {
			return {
				message: '',
				noHookDataMessage: '',
				data: {},
				sendToRoute: '',
				requestResponse: '',
				responseStatus: '',
				isHtmlResponse: false,

			};
		},

		methods: {
			sendRequest(id) {
				axios.get(this.targetUrl + '/api/hooks/' + id, {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                    }
                })
                .then(respose => {
                	this.enableButtons();
                	this.data = respose.data.data;
                	if (!this.data.url) {
                		this.noHookDataMessage = "No data for this hook is available";
                		return;
                	}

                	this.sendToRoute = this.$store.state.sendToRoutes[this.data.id];
                })
                .catch(error => {
                	this.enableButtons();
                	this.message = "Sorry, there was an error retrieving data";
                });
			},

			syncRequest() {
				if (this.data.id) {
					this.disableButtons();
                	this.showSpinner('#sync-request');
                	this.sendRequest(this.data.id);
				}
				
			},

			persistSendToRoute(route, id) {
				let data = {};
				data.id = id;
				data.path = route;

				this.$store.commit('setRouteByKey', data);
			},

			makeRequest() {
				if (!this.sendToRoute) {
					return;
				}

				this.persistSendToRoute(this.sendToRoute, this.data.id);
				this.disableButtons();
                this.showSpinner('#send-request');

				let sendToUrl;
				const method = this.data.method;

				if (this.data.query_string) {
					sendToUrl = this.sendToRoute + '?' + this.data.query_string;

				} else {
					sendToUrl = this.sendToRoute;
				}

				let payload = this.data.body ? this.data.body : null;

				axios({
					method: method,
					url: sendToUrl,
					data: payload,
					headers: this.data.headers,
					timeout: 5000
				})
				.then(response => {
					this.requestResponse = response.data;
					this.isHtmlResponse = this.htmlResponse(response.data);
					this.responseStatus = response.status;
					this.enableButtons();

				})
				.catch(error => {
					if(error.response) {
						this.requestResponse = error.response.data;
						this.isHtmlResponse = this.htmlResponse(error.response.data);
						this.responseStatus = error.response.status;
					} else {
						this.responseStatus = '';
						this.requestResponse = `Error sending request: ${error.message}`;
					}
					
					this.enableButtons();
				});
			},

			htmlResponse(data) {
				if (typeof data !== 'string') {
					return false;
				}
				data = data.trim();
				return data.startsWith('<script>') || data.startsWith('<!doctype html>') || data.startsWith('<html') || data.startsWith('<!DOCTYPE html>');
			}
		}
	}
</script>

<style>
	.input-width {
		width: 70% !important;
	}
</style>
