<template>
    <div class="col-md-10 col-md-offset-1">
        <div class="panel panel-default">
            <div class="panel-heading">
                <strong>Method</strong>{{data.method}}
                <strong>Hook Path:</strong> {{data.path}}
            </div>
            <div class="panel-body">
               Or maybe not mine
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['data'],
        
        data() {
            return {
               
            };
        }
        
    }
</script>