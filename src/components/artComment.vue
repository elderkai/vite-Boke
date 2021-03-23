<template>
    <div>
        <div class="commentArticle">
            <img class="userAvator" :src="$store.state.userInfo.picUrl" alt="" srcset="">
            <el-input  placeholder="输入评论..." @keyup.enter="upComment" v-model="comment"></el-input>
        </div>
        <div class="comments">
            <div v-for="item in comments" :key="item._id" class="comment">
                <comment-item :success='success'  :data="item"></comment-item>
            </div>
        </div>
    </div>
</template> 

<script>
import {ref,inject,getCurrentInstance,toRefs, reactive,toRef,provide } from 'vue';
import { useStore  } from "vuex";
import {rTime,howTime} from '../assets/js/toolFun';
import {  ElMessage } from 'element-plus';
import commentItem from './commentItem.vue';
export default {
    components:{
        commentItem
    },
    setup () {
        let _id = inject("_id");
        const store = useStore();
        const userInfo = store.state.userInfo;
        const {proxy} = getCurrentInstance();
        const comment = ref('');
        let comments=reactive([]);
        function getComment(){
            proxy.$axios.get(`/getComment?articleId=${_id}`).then(res=>{
                if(res.code==200){
                       res.data.forEach(a => {
                        a['updatedTime']=rTime(a['updatedTime'])
                        a['howTime']=howTime(a['updatedTime'])
                    });
                    let data=res.data.filter((a)=>{
                        return a.follow==undefined;
                    })
                    data.forEach((a)=>{
                        if(comments.findIndex(b=>{return b._id==a._id})==-1){
                            comments.push(a)
                        }
                    })
                    comments.forEach((a)=>{
                           if(a["children"]==undefined){a["children"]=reactive([])}
                        res.data.forEach((b)=>{
                            if(a._id==b.follow){
                                if(a["children"].findIndex((c)=>{
                                    return c._id==b._id;
                                })==-1){
                                    a["children"][a["children"].length]=b;
                                    a["children"]=a["children"];
                                    }
                            }    
                        })
                    })
                  
                }
            })
        }
        getComment()
        function upComment(){
            proxy.$axios.post('addComment',{articleId:_id,content:comment.value,user:store.state.userInfo._id,follow:null}).then(res=>{
                if(res.code==200){
                    comment.value='';
                    ElMessage.success({
                        message:res.msg
                    })
                    getComment()
                }
            })
        }
        function success(value){
            getComment();
        }
        provide("success",success)
        return {
            userInfo,
            comment,
            upComment,
            comments,
            success,
        }
    }
}
</script>

<style lang="scss" scoped>
.commentArticle{
    display: flex;
    justify-content: space-between ;
    margin-top: 12px;
    .userAvator{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 6px;
        position: relative;
        top:4px;
    }
}
    .comment{  
    margin-top: 12px;
    margin-left: 12px;
    line-height: 30px;
    position: relative;

}
</style>