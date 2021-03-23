<template>
    <div>
             <div class="left">
          <div class="searchBox">
            <div class="searchTab rightLine">热门</div>
            <div class="searchTab rightLine">最新</div>
            <div class="searchTab">浏览</div>
          </div>
          <div   class="articles">
              <ul class="infinite-list" infinite-scroll-distance='200'	 v-infinite-scroll="load"  style="overflow:auto">
    <li v-for="(item,index) in articles" :key="index" class="infinite-list-item">   
        <div @click="goDetail(item)"  class="article">
              <div class="user">
                {{item.author.username}}·{{item.howTime}}
              </div>
              <div class="title">
                {{item.title}}
              </div>
              <div class="introduce">
                {{item.introduce}}
              </div>
              <ul class="btnArticle">
                <li class="dz">
                  <img width="16" height="16" class="btnIcon" src="../assets/images/dz.png" alt="">
                       <span>
                 &nbsp;{{0}}
                  </span>
                </li>
                <li class="talk">
                  <img width="14" height="14" class="btnIcon talkIcon" src="../assets/images/talk.png" alt=""/>
                  <span>
                 &nbsp;{{item.commonnum}}
                  </span>
                </li>
                <li class="see">
                  <img width="16" height="16" class="btnIcon" src="../assets/images/see.png" alt="">
                    <span>
                 &nbsp;{{item.readnumber}}
                  </span>
                </li>
              </ul>
              <img class="articleImg" width="60" height="60" :src="item.coverImg" alt=""/>
            </div></li>
  </ul>
  
          </div>
        </div>
    </div>
</template>

<script>
import {ref,reactive,getCurrentInstance,inject,watch} from "vue";
 import {  useRouter } from 'vue-router'
import {rTime,howTime} from '../assets/js/toolFun';
  export default {
    setup () {
          const { proxy } = getCurrentInstance();
          let articles = reactive([]);
          let router = useRouter();
          const lableId = inject("lableId");
                   watch(lableId,(nval,oval)=>{
                    articles.splice(0,articles.length);
                     getArticle(1,10,lableId.value);
            })
          function getArticle(pn=1,size=10,lable=111){
            proxy.$axios.get(`/article?pn=${pn}&&size=${size}&&lableId=${lable}`).then(res=>{
              if(res.code==200){
                res.data.forEach((a)=>{
                  a['updatedTime']=rTime(a['updatedTime'])
                  a['howTime']=howTime(a['updatedTime'])
                 let push= articles.findIndex((value)=>{
                    return value._id==a._id;
                  })
                  if(push){
                    articles.push(a)
                  }
                })
              }
            })
          } 
          function load(){
            let lable=111;
            if(lableId.value){lable=lableId.value}
            if(articles.length%2>0){}
            else{
              getArticle(articles.length/2+1,2,lable)
            }
          }

          getArticle()
         function goDetail(value){
                router.push({
                    path:"/article",
                    query:{
                        id:value._id
                    }
                })
          }
        return {
          articles,
          load,
          goDetail
        }
    },
}
</script>

<style lang="scss" scoped>
.articles{
  // background: url("../assets/images/db36f85ba021ac98f93e52d959979645.jpg") fixed 0 / cover;
}
.article{
    padding:18px 24px;
    text-align: left;
    box-sizing: border-box;
    background: hsla(0,0%,100%,.5);
    border-bottom: 1px solid rgba(178,186,194,.15);
    position: relative;
    cursor: pointer;
    text-shadow: 0 1px 1px hsla(0, 0%, 100%, .3);
    // box-shadow: 0 0 0 1px hsla(0, 0%, 100%, .3) inset, 0 0.3em 1em rgba(0, 0, 0, 0.12);
    .articleImg{
      flex: 0 0 auto;
    background-color: #fff;
    border-radius: 2px;
    position: absolute;
    right:30px;
    top:30px;
    }
    &:hover{
      background: #FFFEF9;
    }
    .user{
      font-size: 12px;
    color: #b2bac2;
    }
    .title{
      width: 568px;
    font-weight: 600;
    line-height: 1.2;
    color: #2e3135;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 8px;
    font-size: 16px;
    }
    .introduce{
      font-size:12px;
      white-space: nowrap;
      overflow: hidden;
      max-width: 489px;
      margin-top: 12px;
    }
  
  .btnArticle{
    margin-top: 12px;
    color: #b2bac2;
    height: 25px;
    font-size: 12px;
    font-weight: 700;
    .btnIcon{
     position: relative;
     top:2px;
    }
    .talkIcon{
      top:5px;
    }
    li{
      border:1px solid #edeeef;
      padding:2px 4px;
      box-sizing: border-box;
      height: 25px;
    }
    .talk{
      margin-left: -1px;
        span{
        position: relative;
        top:2px;

        }
    }
    .see{
      margin-left: -1px;
    }
  }
  .right{
    margin-left:20px;
    .avator{
      width:280px;
      padding-top: 50px;
      padding-bottom: 40px;
      background: #fff;
      border-bottom: 1px solid rgba(178, 186, 194, 0.15);
      cursor: pointer;
    }
    .avatorImg{
      border-radius:50%;
    }
    .name{
      font-size: 25px;
      font-weight: 700;
      margin-top: 15px;
    }
  }
  .bqian{
    width: 280px;
    background: #fff;
    margin-top: 20px;
    padding-top: 30px;
    padding-bottom: 30px;
    .title{
      font-size: 14px;
      color:#909090;
      text-align: center;
      font-family: 700;
    }
    .bqianItem{
      display: inline-block;
      cursor: pointer;
      padding: 5px 10px;
      border-radius: 5px;
      background-color: #eee;
      color: #333;
      margin: 10px 10px 0 0;
      text-decoration: none;
    }
  }
}
.infinite-list{
   height:calc(100vh - 140px);
   &::-webkit-scrollbar{
    display:none;
}
}
.bottomBa{
  color:#909090;
  margin-top:15px;
  font-size: 12px;
  display: block;
  img{
    position: relative;
    top:3px;
  }
}
  .left{
    width: 700px;
    background: #fff;
    .searchBox{
      display: flex;
      justify-content: start;
      font-size: 14px;
      height: 46px;
      color:#909090;
      line-height: 46px;
      box-sizing: border-box;
      border-bottom:1px solid hsla(0,0%,59.2%,.1)
    }
    .searchTab{
      padding:0 20px;
      margin-top: 18px;
      height: 14px;
      line-height: 14px;
      cursor: pointer;
      &:hover{
        color:#409eff;
      }
    }
    .rightLine{
      border-right:1px solid #909090;
    }
  }
  @media screen and (min-width: 0px)and (max-width: 1050px){
   .left{
       width: 375px;

   }
   .article .title{
       width: 248px;
   }
   .article .introduce{
       width: 248px;
   }

  }
</style>
<style >

.headerBox .el-col{
  background: #000;
}
.infinite-list-item{
  width: 100%;
}
</style>