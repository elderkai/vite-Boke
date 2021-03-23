<template>
    <div>
        <div class="header">
            <img class="userAvator" :src="item.user.picUrl" alt="" srcset="">
            <div class="right">
                <p>
                {{item.user.username}}
                </p>
                <p>
                <span v-if="item.replayName" class="replayCont">
                    {{"回复&nbsp;"+item.replayName+':'}}
                    </span>{{item.content}}
                </p>
            </div>
        </div>
        <div class="bottom_comment">
            <div class="time">
                {{item.howTime}}
            </div> 
            <div class="huifu" @click.stop="show=!show">
                <img src="../assets/images/comment.png" class="btnIcon" alt="">
                回复
            </div>
        </div>
        <div class="replay"  ref="input">
            <el-input v-show="show" :placeholder="'回复'+item.user.username+'...'" @keyup.enter="upComment" v-model="replay"></el-input>
        </div>
        <div class="children">
            <comment-item  v-for="a in item.children" :key="a._id" :data="a"></comment-item>
        </div>
    </div>
</template>

<script>
import {getCurrentInstance, ref,onMounted,inject} from "vue";
import {useStore} from "vuex";
import { ElMessage } from 'element-plus';
export default {
    name:"commentItem",
    props:{
        data:{
            type:Object
        },
      
    },
    components:{
    },
    setup (props,context) {
        const {proxy} = getCurrentInstance();
        const store = useStore();
        let item = props.data;
        let show = ref(false);
        let success = inject("success");
        var _this = proxy;
        onMounted(()=>{
            document.addEventListener('click',(e)=>{
                 if (show.value == true) {
                if(!_this.$refs.input.contains(e.target)){
                    show.value=false;
                }
                 }  
            })  
        })
        let replay = ref('');
        function upComment(){
          let id=item._id;
          let replayName=item.user.username;
           let follow=id;
           if(item.follow!=null){
               follow=item.follow;
           }
            proxy.$axios.post('addComment',{articleId:item.articleId,replayName,content:replay.value,user:store.state.userInfo._id,commentId:id,follow}).then(res=>{
                if(res.code==200){
                    replay.value='';
                    show.value=false;
                    success()
                    ElMessage.success({
                        message:res.msg
                    })
                }
            })
        }
        return {
            item,
            replay,
            show,
            upComment
        }
    },
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
    .header{
    display: flex;
    justify-content:start ;
    }
    .bottom_comment{
    display: flex;
    justify-content:space-between ;
    padding:0 12px;
    border-bottom: 1px solid #fff;
    .time{
        font-size: 12px;
        color:#8a93a0;
    }
    }
        .userAvator{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 6px;
        position: relative;
        top:13px;
    }
    p{
        font-size: 12px;
        color: #000;
    }
    .huifu{
        font-size: 14px;
        color:#8a93a0;
        .btnIcon{
            width: 16px;
            height: 16px;
            position: relative;
            top:3px;
        }
    }
    .children{
    padding-left: 20px;
    border-bottom: 1px solid #fff;
    border-top: 1px solid #fff;
    background: #f4f5f5;
    }
}
.replayCont{
    color:#8a93a0;
}
</style>