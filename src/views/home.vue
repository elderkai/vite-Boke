<template>
  <div class="body">
    <div class="container">
      <div class="conLeft">
        <router-view></router-view>
      </div>
      <div class="right">
        <div class="avator">
          <img
            width="70"
            height="70"
            class="avatorImg"
            src="../assets/images/avator.jpg"
            alt=""
          />
          <div class="name">岁月如歌</div>
        </div>
        <div class="bqian">
          <div class="title">标签云</div>
          <span v-for="item in lables" :key="item._id" @click="change(item._id)" class="bqianItem">{{
            item.lable
          }}</span>
        </div>
        <a
          class="bottomBa"
          target="_blank"
          href="https://beian.miit.gov.cn/#/Integrated/index"
        >
          <p>
            <!-- <img src="../assets/images/backIcon.png" alt=""> -->
            豫ICP备2020036603号-1
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { canvasModel } from "../assets/js/canvasModel";
import { ref, reactive, getCurrentInstance, provide } from "vue";
// import {rTime,howTime} from '../assets/js/toolFun';
export default {
  setup() {
    const { ctx } = getCurrentInstance();
    let lableId = ref("");
    let lables = ref([]);
    provide("lableId", lableId);
    function getLables() {
      ctx.$axios.get("/lable/getLables").then((res) => {
        if (res.code == 200) {
          lables.value = res.data;
          console.log(lables);
        }
      });
    }
    getLables();
    function change(value){
      lableId.value=value;
      console.log(lableId.value);
    }
    return {
      lables,
      change
    };
  },
  created() {
    setTimeout(() => {
      let path = Math.ceil(Math.random() * canvasModel.length) - 1;
      window.L2Dwidget.init({
        pluginRootPath:
          "https://cdn.jsdelivr.net/gh/wangsrGit119/wangsr-image-bucket/L2Dwidget",
        pluginJsPath: "lib/",
        pluginModelPath: "live2d-widget-model-koharu/assets/",
        tagMode: false,
        debug: false,
        model: { jsonPath: canvasModel[path] },
        display: { position: "right", width: 150, height: 300 },
        mobile: { show: true },
        log: false,
      });
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.body {
  background: #f4f5f5;
  min-height: 100vh;
}
.container {
  width: 1000px;
  min-width: 1000px;
  margin: 0 auto;
  display: flex;
  padding-top: 25px;
  justify-content: first;
  .left {
    width: 700px;
    background: #fff;
    .searchBox {
      display: flex;
      justify-content: start;
      font-size: 14px;
      height: 46px;
      color: #909090;
      line-height: 46px;
      box-sizing: border-box;
      border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
    }
    .searchTab {
      padding: 0 20px;
      margin-top: 18px;
      height: 14px;
      line-height: 14px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
    .rightLine {
      border-right: 1px solid #909090;
    }
  }
  .article {
    padding: 18px 24px;
    text-align: left;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(178, 186, 194, 0.15);
    position: relative;
    cursor: pointer;
    .articleImg {
      flex: 0 0 auto;
      background-color: #fff;
      border-radius: 2px;
      position: absolute;
      right: 30px;
      top: 30px;
    }
    &:hover {
      background: #fffef9;
    }
    .user {
      font-size: 12px;
      color: #b2bac2;
    }
    .title {
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
    .introduce {
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      max-width: 489px;
      margin-top: 12px;
    }
  }
  .btnArticle {
    margin-top: 12px;
    color: #b2bac2;
    height: 25px;
    font-size: 12px;
    font-weight: 700;
    .btnIcon {
      position: relative;
      top: 2px;
    }
    .talkIcon {
      top: 5px;
    }
    li {
      border: 1px solid #edeeef;
      padding: 2px 4px;
      box-sizing: border-box;
      height: 25px;
    }
    .talk {
      margin-left: -1px;
      span {
        position: relative;
        top: 2px;
      }
    }
    .see {
      margin-left: -1px;
    }
  }
  .right {
    margin-left: 20px;
    .avator {
      width: 280px;
      padding-top: 50px;
      padding-bottom: 40px;
      background: #fff;
      border-bottom: 1px solid rgba(178, 186, 194, 0.15);
      cursor: pointer;
    }
    .avatorImg {
      border-radius: 50%;
    }
    .name {
      font-size: 25px;
      font-weight: 700;
      margin-top: 15px;
    }
  }
  .bqian {
    width: 280px;
    background: #fff;
    margin-top: 20px;
    padding-top: 30px;
    padding-bottom: 30px;
    .title {
      font-size: 14px;
      color: #909090;
      text-align: center;
      font-family: 700;
    }
    .bqianItem {
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
.infinite-list {
  height: calc(100vh - 140px);
  &::-webkit-scrollbar {
    display: none;
  }
}
.bottomBa {
  color: #909090;
  margin-top: 15px;
  font-size: 12px;
  display: block;
  img {
    position: relative;
    top: 3px;
  }
}
.conLeft {
  width: 700px;
}
</style>
<style >
.headerBox .el-col {
  background: #000;
}

.articles {
  /* max-height:calc(100vh - 165px); */
  /* overflow-y: scroll; */
}
@media screen and (min-width: 0px)and (max-width: 750px){
   .body{
       width: 375px;
       overflow-x: hidden;
       min-height: calc(100vh - 61px)!important;
   }
   .conLeft{
     width: 375px!important;
     white-space:normal!important;
      word-wrap:break-word;
   }
    }
</style>