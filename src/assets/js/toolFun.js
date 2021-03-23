import axios from '../../util/index'
import COS from 'cos-js-sdk-v5'
let cos;
let toolCos={}
function getSts(){
    axios.get('/sts').then(res=>{
      if(res.code==200){
          toolCos.cos = new COS({
          // 必选参数
          getAuthorization:  function (options, callback) {
              // 请求的URL替换为服务端提供的接口
              callback({
                  TmpSecretId: res.data.credentials.tmpSecretId,
                  TmpSecretKey: res.data.credentials.tmpSecretKey,
                  XCosSecurityToken: res.data.credentials.sessionToken,
                  // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                  StartTime: res.data.startTime, // 时间戳，单位秒，如：1580000000
                  ExpiredTime: res.data.expiredTime, // 时间戳，单位秒，如：1580000900
              })
          }
      })
      }
    })
  }
 function upPicture(fileObj,func){
          var Bucket = "zk-1256024584";
          var Region = "ap-guangzhou";
        //   let that=this 
        return new Promise((resolve,reject)=>{
          console.log('fileObj',fileObj);
            toolCos.cos.putObject({
              Bucket, /* 必须 */
              Region,     /* 存储桶所在地域，必须字段 */
              Key:"blog"+new Date().getTime(),              /* 必须 */
              StorageClass: 'STANDARD',
              Body: fileObj, // 上传文件对象
              onProgress: function(progressData) {
              // console.log(JSON.stringify(progressData));
              // console.log(progressData);
              // that.percentage=progressData.percent*100
              }
            }, 
            function(err, data) {
              if(data.statusCode==200){
                  let url="https://"+data.Location
                  console.log(url);
                  if(func){
                  resolve(func(url)) 
                  }else{
                    resolve(url);
                  }
              }else{
                reject(err);
              }
              
            });
        })
  }
  function deepClone(target) {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
    // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
         // 判断如果当前的值是null的话；直接赋值为null
        } else if(target===null) {
            result = null;
         // 判断如果当前的值是一个RegExp对象的话，直接赋值    
        } else if(target.constructor===RegExp){
            result = target;
        }else {
         // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
     // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target;
    }
     // 返回最终结果
    return result;
}
  function rTime(date) {
    let now = new Date(date),
    Y = now.getFullYear(),
    M = now.getMonth()+1,
    D= now.getDate(),
    h = now.getHours(),
    m = now.getMinutes(),
    s = now.getSeconds();
    M = M<10?'0'+M:M;
    D = D<10?'0'+D:D;
    h = h<10?'0'+h:h;
    m = m<10?'0'+m:m;
    s = s<10?'0'+s:s;
    return Y+'-'+M+'-'+D+' '+h+':'+m+':'+s;
  }
  function howTime(value){
    let date=new Date(value).getTime();
    let date2=new Date().getTime();
    
    let times = date2-date;
     var days = parseInt(times / (1000 * 60 * 60 * 24));
      var hours = parseInt((times % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((times % (1000 * 60 * 60)) / (1000 * 60));
    if(days>0){
      return `${days}天前`
    }
    else if(hours>0){
      return  `${hours}小时前`
    }else if(minutes>0){
      return `${minutes}分钟前`
    }else{
      return `刚刚`
    }
  }
export {getSts,upPicture,toolCos,rTime,howTime,deepClone}
