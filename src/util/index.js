import axios from 'axios';
let baseUrl = '';
import {
    ElMessage
} from 'element-plus'
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3001'

} else {
    baseUrl = 'http://localhost:3001'
}
const instance = axios.create({
    baseURL:baseUrl,
    timeout: 15000
})
const $axios = {
    fetch(methods, url, data, config) {
        return new Promise((resolve, reject) => {
            instance[methods](url, data, config).then(res => {
                if(res.data.code==201){
                    if (process.env.NODE_ENV === "development") {
                        window.location.href="/manage/login";
                   }else{
                        window.location.href="";
                   }
                }
                else if (res.data.code != 200) {
                    ElMessage.warning({
                        message: res.data.msg,
                        type: 'warning'
                    })
                }
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    post(url, data, config) {
        return this.fetch('post',url, data, config)
    },
    get(url, data, config) {
        return this.fetch('get',url, data, config)
    },
}
export default $axios;