<template>
    <div class="article">
        <h2>{{article.title}}</h2>
        <p class="instroduce">{{article.introduce}}</p>
        <img :src="article.coverPic" alt="" class="coverImg">
        <div v-html="article.content"></div>
        <art-comment></art-comment>
    </div>
</template>

<script>
import { reactive,getCurrentInstance,provide } from 'vue';
import { useRoute } from 'vue-router';
import artComment from "../components/artComment.vue";
    export default {
        components:{
            artComment
        },
        setup(){
            const route = useRoute();
            const articleId=route.query.id;
            const { proxy } = getCurrentInstance();
            let article=reactive({title:"",introduce:"",coverPic:"",content:""});
            provide('_id',articleId)
   
            if(route.query.id){
            proxy.$axios.get(`/article/${articleId}`).then(res=>{
                if(res.code==200){
                 
                article.title=res.data.title;
                article.introduce=res.data.introduce;
                article.coverPic=res.data.coverImg;
                article.content=res.data.content;
                }
            })
            }
            return{
                article,
            }
        }
    }
</script>

<style lang="scss" scoped>
.article{
       &::-webkit-scrollbar{
    display:none;
}
    overflow-y:scroll;
    height: calc(100vh - 140px);
    background: #fff;
    h2{
        font-size: 28px;
    }
    .instroduce{
        font-size: 16px;
        color: cadetblue;
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .coverImg{
          /* height: 200px; */
    width: 100%;
    /* margin-left: 50%; */
    /* transform: translate(-50%, 0); */
    margin-top: 12px;
    margin-bottom: 30px;
    }
}
</style>