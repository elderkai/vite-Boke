<template>
  <div>
    <div class="bar-title">vite-blog</div>
    <el-menu
      background-color="#282C34"
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <router-link to="/manage/user">
        <el-menu-item index="1">
          <template #title>
            <i class="el-icon-user"></i>
            <span>用户管理</span>
          </template>
        </el-menu-item>
      </router-link>
     
        <el-submenu index="2">
          <template #title> <i class="el-icon-notebook-2"></i>文章</template>
            <router-link to="/manage/editArticle">
              <el-menu-item index="2-1">添加文章</el-menu-item>
            </router-link>
            <router-link to="/manage/article">
              <el-menu-item index="2-2">文章管理</el-menu-item>
            </router-link>
        </el-submenu>

      <router-link to="/manage/user">
        <el-menu-item index="3">
          <template #title>
            <i class="el-icon-chat-dot-round"></i>
            留言
          </template>
        </el-menu-item>
      </router-link>
      <router-link to="/manage/label">
        <el-menu-item index="4">
          <template #title>
            <i class="el-icon-discount"></i>
            标签
          </template>
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>

<script>
import { reactive, toRefs, defineComponent, ref } from "vue";
export default {
  setup() {
    function handleOpen(key, keyPath) {
      console.log(key, keyPath);
    }
    function handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
    return {
      isCollapse: ref(false),
      handleOpen,
      handleClose,
    };
  },
};
</script>

<style lang="scss" scoped>
.bar-title {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  padding: 30px 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-submenu {
  width: 200px;
}
</style>