<template>
  <div class="manage-header">
    <div class="manageUser">
      <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :src="$store.state.manageInfo.picUrl"></el-avatar>
        <p class="manageName">
         {{$store.state.manageInfo.username}}
        </p>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
         <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { useStore  } from "vuex"
    export default {
        setup(){
            return{

            }
        }
    }
</script>
<style lang="scss" scoped>
.manage-header{
   width: 100vw;
   box-sizing: border-box;
   padding-left: 200px;
   height: 100px;
 background: linear-gradient(to bottom right, #FE92C1 , #BB9DEA); /* 标准的语法 */

}
.manageUser{
    width:56px;
    float: right;
    margin-right: 40px;
    margin-top: 20px;
    }
.manageName{
    text-align: center;
    white-space: nowrap;
    color:#fff;
}
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-avatar--large{
      display: block;
      margin-left: 50%;
      transform: translate(-52%,0);
  }
</style>