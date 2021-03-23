<template>
    <div>
        <header-comp/>
<router-view></router-view>
    </div>
</template>

<script>
import headerComp from "../components/headerComp.vue"
    export default {
        components:{
         headerComp
        },
        setup(){
            return{

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>