<template>
  <div id="login">
    <div class="loginBox">
        <h2>登录管理界面</h2>
      <div class="loginItem">
        <el-input @keyup.enter="login" v-model="userInfo.username" placeholder="请输入用户名">
          <template #prefix>
            <i class="el-input__icon el-icon-user-solid"></i> </template
        ></el-input>
      </div>
      <div class="loginItem">
        <el-input @keyup.enter="login" v-model="userInfo.password" placeholder="请输入密码">
          <template #prefix>
            <i class="el-input__icon el-icon-s-goods"></i> </template
        ></el-input>
      </div>
      <el-button @click="login" type="primary">登录</el-button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref,getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import $axios from "../util/index"
import { useStore  } from "vuex"
import { ElMessage } from 'element-plus'
export default {
  setup(props,content) {
      const { proxy } = getCurrentInstance()
        const route = useRoute()
        const router = useRouter()
        const store = useStore();
       const userInfo = reactive({username:'',password:'' })
     function login(){
          $axios.post('/manage/login',{username:userInfo.username,password:userInfo.password}).then(res=>{
              if(res.code==200){
                ElMessage.success({
                    message: res.msg,
                    type: 'success'
                });
               store.commit('CHANGE_manageInfo',res.data)
               console.log(store.state.manageInfo);
                router.push('/manage')
              }
          })
      }
    return {
        userInfo,
        login
    };
  },
};
</script>

<style lang="scss" scoped>
#login {
  min-height: 100vh;
  background: url("../assets/images/5ca5616de2b91.png") no-repeat;
  background-size: 100% 100%;
}
.loginItem{
    display: flex;
    justify-content: space-between;
    white-space: nowrap;
    line-height: 40px;
    margin-bottom: 20px;
}
.loginBox{
    position: absolute;
    width: 500px;
    right:50%;
    top:45%;
    transform: translate(50%,-50%);
    h1{
        margin-bottom: 30px;
    }
    h2{
        margin-bottom: 25px;
    }

}
.el-button--primary{
    width: 500px;
  background: linear-gradient(to  right, #FE92C1 , #BB9DEA); /* 标准的语法 */
}
</style>