<template>
    <div class="timeSort">
 <el-timeline>
    <el-timeline-item
      v-for="(item, index) in articles"
      :key="index"
      :icon="item.icon"
      :type="item.type"
      :color="item.color"
      :size="item.size"
      :timestamp="item.updatedTime">
        <div @click="goArticle(item._id)" class="articleTitle">
        {{item.title}}
        </div>
    </el-timeline-item>
  </el-timeline>
    </div>
</template>

<script>
import {ref,reactive,getCurrentInstance} from "vue";
 import {  useRouter } from 'vue-router'
import {rTime,howTime} from '../assets/js/toolFun';
  export default {
    setup () {
          const { proxy } = getCurrentInstance();
          let articles = reactive([]);
          let router = useRouter();
          function getArticle(pn=1,size=10){
            proxy.$axios.get(`/article?pn=${pn}&&size=${size}`).then(res=>{
              if(res.code==200){
                  res.data=res.data.reverse()
                res.data.forEach((a,b)=>{
                  a['updatedTime']=rTime(a['updatedTime'])
                  a['createdTime']=rTime(a['createdTime'])
                  a['howTime']=howTime(a['updatedTime'])
                  b%2==0? a['icon']="el-icon-loading":a['icon']="el-icon-orange"
                  b%2==0?  a['color']="#ffbd2f": a['color']="#28c93f"
                  a['type']="primary"
                  a['size']="large"
                  articles.push(a)
                })


              }
            })
          } 
          getArticle();
          function goArticle(value){
                  router.push({
                    path:"/article",
                    query:{
                        id:value
                    }
                })
          }
   
        return {
            articles,
            goArticle
        }
    }
}
</script>

<style lang="scss" scoped>
ul{
display: inline-grid;
.el-timeline-item__content{
    text-align: left;
}
}
.timeSort{
    margin-top: 75px;
}
.articleTitle{
    cursor: pointer;
    &:hover{
        color: #34c44b;
    }
};
</style>