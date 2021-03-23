<template>
    <div class="editContainer">   
        <div class="editBox">
            <edit-article></edit-article>
        </div>
    </div>
</template>

<script>
import EditArticle from '../../components/editArticle.vue'
export default {
        components: {
        EditArticle
   },
    setup () {
        
        return {}
    }
}
</script>

<style lang="scss" scoped>
.editBox{
    margin-top: 40px;
    width: 100%;
    padding:0 20px;
    box-sizing: border-box;
}
</style>