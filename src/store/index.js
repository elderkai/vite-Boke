import  Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

const store = new Vuex.Store({
    state:{
        manageInfo:{
            picUrl:"https://blog-1256024584.cos.ap-nanjing.myqcloud.com/12312.png",
            username:""
        },
        userInfo:{
            picUrl:"https://blog-1256024584.cos.ap-nanjing.myqcloud.com/12312.png",
            username:"",
            email:"",
            "_id":''
        }
    },
    getter:{
        getManage:()=>{
            return state.manageInfo
        }
    },
    mutations:{
        'CHANGE_manageInfo'(state,payload){
            state.manageInfo=payload;
        },
        'CHANGE_userInfo'(state,payload){
            state.userInfo=payload;
        },

    },
    actions:{

    },
    modules:{},
    plugins:[createPersistedState({
        storage:{
            getItem:key=>sessionStorage.getItem(key),
            setItem:(key,value)=>
                sessionStorage.setItem(key,value),
                removeItem:key=>sessionStorage.removeItem(key),
        }
    })]
})
export default store;