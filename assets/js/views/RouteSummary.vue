<template>
    <div class="col-md-10 col-md-offset-1">
        <div class="panel panel-default">
            <div class="panel-heading">
                <strong>Method:</strong> {{pathName}}
                <br>
                <strong>Hook Path:</strong> {{data.path}}
            </div>
            <div class="panel-body">
               <button type="button" class="btn btn-primary" @click="showRoute(data.id)">View Route</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['data'],

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
               
            };
        },

        methods: {
            showRoute(id) {
                this.$router.push({ path: `/routes/${id}`});
            }
        }
        
    }
</script>