<template>
    <div class="headerBox">
              <el-col :span="60">
                  <div class="grid-content bg-purple-dark">
                      <div class="headerCenter">
                          <div class="logo">
                            <div class="text-magic" data-word="zkblog">
                            </div>
                          </div>
                            <div class="nav-box">
                                <div @click="navGo" class="nav-item">首页</div>  
                                <div @click="navGo" class="nav-item checked">文章</div>  
                                <div @click="navGo" class="nav-item">归档</div>  
                                <div @click="navGo" class="nav-item">项目</div>  
                                <div @click="navGo" class="nav-item">历程</div>  
                                <div @click="navGo" class="nav-item">留言</div>  
                                <div @click="navGo" class="nav-item">关于</div>  
                          </div>
                          <div v-if="!loginInfo.username" class="login-btns">
                                <el-button @click="showLogin=true;showRegister=true" type="text">登录</el-button>
                                <el-button @click="showRegister=true;showLogin=false" type="text">注册</el-button>
                          </div>
                          <div v-else>
                             <div class="userInfo_box">
                                    <el-dropdown>
                                    <span class="el-dropdown-link">
                                    <el-avatar :src="loginInfo.picUrl"></el-avatar>
                                    <p class="userName">
                                    {{loginInfo.username}}
                                    </p>
                                    </span>
                                    <template #dropdown>
                                    <el-dropdown-menu>
                                    <el-dropdown-item @click="showUpPic=true">上传头像</el-dropdown-item>
                                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                                    </el-dropdown-menu>
                                    </template>
                                    </el-dropdown>
                             </div>
                             
                          </div>
<!-- moble -->
<van-dropdown-menu>
  <van-dropdown-item @change="mobleMenu" v-model="state.value1" :options="option1" />
</van-dropdown-menu>

                      </div> 
                  
                  </div>
            </el-col>

    <!-- 登录弹窗 -->
    
<el-dialog
  :title="showLogin?'登录':'注册'"
  v-model="showRegister"
  width="350px"
  >
    <div class="form_register">
        <div class="userName">
            用户名：&nbsp;&nbsp;
            <el-input v-model="userInfo.username" placeholder="请输入用户名"></el-input>
        </div>
        <div v-show="!showLogin" class="email">
            邮箱：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input v-model="userInfo.email" placeholder="请输入邮箱"></el-input>
        </div>
        <div class="password">
            密码：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input v-model="userInfo.password" @keyup.enter="register" placeholder="请输入密码"></el-input>
        </div>
        <!-- <div class="password">
            头像：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <up-picture></up-picture>
        </div> -->

    </div>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="showRegister = false">取 消</el-button>
      <el-button type="primary" @click="register">确 定</el-button>
    </span>
  </template>
</el-dialog>
<el-dialog
  title="上传头像"
  v-model="showUpPic"
  width="420px"
 >
    <div class="form_register">
        <div class="password">
            头像：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <up-picture></up-picture>
        </div>
    </div>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="showUpPic = false">取 消</el-button>
      <el-button type="primary" @click="upPic">确 定</el-button>
    </span>
  </template>
</el-dialog>
    </div>
</template>

<script>
import {ref,getCurrentInstance,provide,toRefs,reactive,onMounted} from "vue";
import {useRoute,useRouter} from "vue-router";
import upPicture from "./upPicture.vue";
import { ElMessage } from 'element-plus';
import { useStore  } from "vuex";
export default {
    components:{
        upPicture
    },
    props:{},
    setup (props,context) {
        const { proxy,ctx } = getCurrentInstance();
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        let userInfo=ref({username:"",password:"",email:"",picUrl:"",power:0});
        let showRegister=ref(false);
        let showLogin=ref(false);
        let showUpPic=ref(false);
        let loginInfo =reactive({username:"",picUrl:"","_id":"",email:""})
        loginInfo.username= store.state.userInfo.username;
        loginInfo.picUrl= store.state.userInfo.picUrl;
        loginInfo._id= store.state.userInfo._id;
        loginInfo.email= store.state.userInfo.email;
        let coverPic=ref('');
        provide("coverPic",coverPic );
        const state = reactive({
        value1: 0,
        });
           const option1 = [
      { text: '首页', value: 0 },
      { text: '文章', value: 1 },
      { text: '归档', value: 2 },
      { text: '项目', value: 3 },
      { text: '历程', value: 4 },
      { text: '留言', value: 5 },
      { text: '关于', value: 6 },
    ];
    function mobleMenu(value){
        console.log(value);
        switch(value){
            case 0:
                router.push("/home");
                break;
            case 1:
                router.push("/");
                break;
            case 2:
                router.push("/timeSort");
                break;
            case 3:
                router.push("/project");
                break;
            case 4:
                router.push("/course");
                break;
            case 5:
                router.push("/message");
                break;
            case 6:
                router.push("/about");
                break;                
                

        }
    }
        function changeNav(){
            let path=route.path;
             let doms=document.getElementsByClassName("nav-item");
              for(var i=0;i<doms.length;i++){
               doms[i].style.color="#71777c";
            }
            console.log(state.value1);
            switch(path){
                case '/home':
                    doms[0].style.color="rgb(64, 158, 255)";
                    state.value1=0;
                break;
                case '/':
                     doms[1].style.color="rgb(64, 158, 255)";
                      state.value1=1;
                break;
                case '/timeSort':
                     doms[2].style.color="rgb(64, 158, 255)";
                      state.value1=2;
                break;
                case '/project':
                     doms[3].style.color="rgb(64, 158, 255)";
                      state.value1=3;
                break;
                case '/course':
                     doms[4].style.color="rgb(64, 158, 255)";
                      state.value1=4;
                break;
                case '/message':
                     doms[5].style.color="rgb(64, 158, 255)";
                      state.value1=5;
                break;
                case '/about':
                     doms[6].style.color="rgb(64, 158, 255)";
                      state.value1=6;
                break;

            }
        }
        onMounted(()=>{
            changeNav();

        })
        function navGo(event){
            let doms=document.getElementsByClassName("nav-item");
            for(var i=0;i<doms.length;i++){
               doms[i].style.color="#71777c";
            }
            event.target.style.color="rgb(64, 158, 255)";
            if(event.target.innerHTML=="首页"){
                router.push('/home')
            }
            else if(event.target.innerHTML=="文章"){
                router.push("/")
            }
            else if(event.target.innerHTML=="归档"){
                router.push("/timeSort")
            }
            else if(event.target.innerHTML=="项目"){
                router.push("/project")
            }
            else if(event.target.innerHTML=="历程"){
                router.push("/course")
            }
            else if(event.target.innerHTML=="留言"){
                router.push("/message")
            }
            else if(event.target.innerHTML=="关于"){
                router.push("/about")
            }
        }
        function register(){
            userInfo.picUrl=coverPic.value;
            const {username,password,power,email} =userInfo.value;
            if(showLogin.value){
                proxy.$axios.post("/login",{username,password}).then(res=>{
                    if(res.code==200){
                        showLogin.value=false;
                        showRegister.value=false;
                        loginInfo.username=res.data.username;
                        loginInfo.picUrl=res.data.picUrl;
                        loginInfo._id=res.data._id;
                        loginInfo.email=res.data.email;
                        store.commit('CHANGE_userInfo',loginInfo)
                        ElMessage.success({
                            message:res.msg,
                            type:'success',
                        })
                    }
                })
            }
            else{
                proxy.$axios.post('/register',{username,password,power,email}).then(res=>{
                    if(res.code==200){
                        showRegister.value=false;
                        ElMessage.success({
                        message: res.msg,
                        type: 'success'
                        });
                        clearinfo();
                    }
                })
            }
           
           
        }
        function clearinfo(){
             userInfo.value.username='';
            userInfo.value.password='';
            userInfo.value.email='';
            userInfo.value.picUrl='';
                store.commit('CHANGE_userInfo',userInfo.value)
        }
        function logout(){
            proxy.$axios.post('logout').then(res=>{
                if(res.code==200){
                    ElMessage.success({
                        message:res.msg
                    })
                    loginInfo._id="";
                    loginInfo.username="";
                    loginInfo.picUrl="https://blog-1256024584.cos.ap-nanjing.myqcloud.com/12312.png";
                    store.commit("CHANGE_userInfo",loginInfo)
                   
                }
            })
        }
        function upPic(){
            proxy.$axios.post("/user/updata",{picUrl:coverPic.value,username:loginInfo.username,email:loginInfo.email,power:0,_id:loginInfo._id}).then(res=>{
                if(res.code==200){
                    showUpPic.value=false;
                    loginInfo.picUrl=coverPic.value;
                     store.commit("CHANGE_userInfo",loginInfo)
                    
                    ElMessage.success({
                    message:res.msg
                    })
                }
            })
        }
        
        return {
            navGo,
            showRegister,
            userInfo,
            register,
            showLogin,
            loginInfo,
            logout,
            showUpPic,
            upPic,
            state,
            option1,
            mobleMenu
        }
    }
}
</script>

<style lang="scss" scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-co-60{
      height: 60px;
  }
  .el-col {
    border-radius: 4px;
    width: 100%;
    border-bottom: 1px solid #f1f1f1;
  }
  .bg-purple-dark {
  }
  .headerCenter{
      width: 1000px;
      min-width: 1000px;
      margin:0 auto;
      display: flex;
      background: #000;
      justify-content: start;
     
    .nav-box{
        display: flex;
        justify-content: start;
    }
      .nav-item{
          cursor: pointer;
          color: #71777c;
          font-size: 16px;
          font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
          font-weight: 400;
          margin-left:30px;
          line-height: 60px;
          &:hover{
              color: rgb(64, 158, 255);
          }
      }
      .checked{
            color: rgb(64, 158, 255);
      }
  }
  .text-magic {
    position: absolute;
    top: 20%;
    transform: translate(100%, -50%) scale(2.5);
    width: 90px;
    font-size: 12px;
    font-family: Raleway, Verdana, Arial;
    color: transparent;
}
.white {
    position: absolute;
    left: -10px;
    width: 100%;
    background: #000;
    z-index: 4;
    animation: whiteMove 10s ease-out infinite;
}

.text-magic::before {
    content: attr(data-word);
    position: absolute;
    top: 0;
    left: 0;
    height: 36px;
    color: red;
    overflow: hidden;
    z-index: 2;
    filter: contrast(200%);
    text-shadow: 1px 0 0 red;
    animation: move 0.95s infinite;
}

.text-magic::after {
    content: attr(data-word);
    position: absolute;
    top: 0;
    left: -1px;
    height: 36px;
    color: rgba(255, 255, 255, 0.8);
    overflow: hidden;
    z-index: 3;
    color: cyan;
    filter: contrast(200%);
    text-shadow: -1px 0 0 cyan;
    mix-blend-mode: lighten;
    animation: move 1.1s infinite -0.5s;
}

@keyframes whiteMove {
    9% {
        top: 38px;
    }
    14% {
        top: 8px;
    }
    18% {
        top: 42px;
    }
    22% {
        top: 1px;
    }
    32% {
        top: 32px;
    }
    34% {
        top: 12px;
    }
    40% {
        top: 26px;
    }
    43% {
        top: 7px;
    }
    99% {
        top: 30px;
    }
}

@keyframes move {
    10% {
        top: -0.4px;
        left: -1.1px;
    }
    20% {
        filter: hue-rotate(-90deg);
        top: 0.4px;
        left: -0.2px;
    }
    30% {
        filter: hue-rotate(0);
        left: .5px;
    }
    40% {
        top: -0.3px;
        left: -0.7px;
    }
    50% {
        filter: blur(1px);
        left: 0.2px;
    }
    60% {
        filter: blur(0);
        top: 1.8px;
        left: -1.2px;
    }
    70% {
        top: -1px;
        left: 0.1px;
    }
    80% {
        top: -0.4px;
        left: -0.9px;
    }
    90% {
        left: 1.2px;
    }
    100% {
        left: -1.2px;
    }
}
.logo{
    position: relative;
    width: 140px;
    height: 60px;
}
.login-btns{
    margin-top: 10px;
    margin-left:242px;
}
.el-button--text{
    color:#fff;
    &:hover{
        color:#67c23a;
    }
}
.form_register{
    div{
        display: flex;
        white-space: nowrap;
        margin-bottom: 10px;
        line-height: 40px;
    }
    .el-input{
        width: 210px;
    }
}
.userInfo_box{
    cursor: pointer;
    margin-left: 262px;
    margin-top: 7px;
    .el-avatar{
        width: 30px;
        height: 30px;
    }
}
.el-dropdown-menu{
    display: flex;
    flex-direction: column;
}
.el-dropdown-menu__item{
   float: none;
   display: block;
}
@media screen and (min-width: 1050px){
    .van-dropdown-menu{
        display:none;
    }
}
@media screen and (min-width: 0px)and (max-width: 1050px){
        .van-dropdown-menu{
        display:block;
    }
   .headerBox{
       width: 375px;
       overflow-x: hidden;
   }
   .nav-box{
       display: none!important;
   }
   .userInfo_box{
   margin-left:114px;
   }
   .login-btns{
       margin-left:88px;
   }

    }
    
</style>
<style >
   .van-dropdown-menu__bar{
       height: 60px;
       background:#000;
   }
   .van-dropdown-menu__title{
       color:#fff;
   }
   .van-dropdown-menu{
       margin-left: 12px;
   }
</style>