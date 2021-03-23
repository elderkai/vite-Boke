<template>
    <div class="manage">
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->
        <div class="manage-bar">
            <manage-menu></manage-menu>
        </div>
        <div class="container">
            <manage-header></manage-header>
            <div class="manage-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import manageMenu from "../../components/manageMenu.vue"
import manageHeader from "../../components/manageHeader.vue"
import { reactive, toRefs, defineComponent, ref } from 'vue'
    export default {
        components:{
            manageMenu,
            manageHeader
        },
        setup(){
         
        }

    }
</script>

<style lang="scss" scoped>
.manage{
    text-align: left;
    display: flex;
    justify-content: space-between;
}
.manage-bar{
    background: #282C34;
    width:200px;
    min-height: 100vh;
    position:fixed;
    left:0;
}
.bar-title{
    font-size:24px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    padding:30px 0;
}
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-submenu{
      width: 200px;
  }
  .manage-content{
      width: 100%;
      box-sizing: border-box;
      padding-left: 200px;
  }
  .container{
      text-align: left;
      overflow-x: hidden;
  }

</style>
