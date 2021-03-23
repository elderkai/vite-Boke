<template>
  <div>
    <div class="btns">
      <el-button size="mini" @click="upArticle" type="primary">提交</el-button>
      <el-button size="mini" @click="clearArticle" type="danger"
        >清空</el-button
      >
    </div>
    <div class="articleEdits">
        <div class="edit_title">
          名称：<el-input v-model="title"></el-input>
        </div>
        <div class="edit_title">
          介绍：<el-input v-model="introduce"></el-input>
        </div>
        <div class="upPic edit_title">
          上传封面图：
        <up-pictures></up-pictures>
        </div>
        <div class="lableSelect">
          选择标签：
        <el-select v-model="checkedLable" placeholder="请选择">
        <el-option
        v-for="item in lables"
        :key="item._id"
        :label="item.lable"
        :value="item._id">
        </el-option>
        </el-select>
        </div>
    </div>
    <editor
      v-model="edit"
      api-key="kwknrcado9dsg7x0m4xruc0v12fkmgafl0d0ymn3ckm1iqcp"
      :init="init"
    />
  </div>
</template>

<script>
import upPictures from './upPicture.vue';
import tinymce from "tinymce/tinymce";
import "tinymce/plugins/image"; // 插入上传图片插件
import { ref,getCurrentInstance ,provide} from "vue";
import COS from "cos-js-sdk-v5";
import Editor from "@tinymce/tinymce-vue";
import { ElMessage } from 'element-plus'
import { useStore  } from "vuex"
import { useRoute } from 'vue-router'

import { getSts, upPicture } from "../assets/js/toolFun";
export default {
  components: {
    editor: Editor,
    upPictures
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const route = useRoute()
    let edit = ref("");
    let lables=ref([]);
    let title=ref('');
    let coverPic=ref('');
    provide("coverPic",coverPic );
    let introduce=ref('');
    let checkedLable=ref('');
    let articleId=route.query.id;
    if(route.query.id){
      proxy.$axios.get(`/article/${articleId}`).then(res=>{
        if(res.code==200){
          checkedLable.value=res.data.lable._id;
          title.value=res.data.title;
          introduce.value=res.data.introduce;
          coverPic.value=res.data.coverImg;
          edit.value=res.data.content;
        }
      })
    }
    function upArticle(value) {
      let content=edit.value;
     
      let lable=checkedLable.value;
      let author=proxy.$store.state.manageInfo._id;
      let params= { content,introduce:introduce.value, coverImg:coverPic.value, title:title.value, lable, author };
      let url='add';
      if(articleId){
        params._id=articleId;
        url="rewrite";
      }
      proxy.$axios
        .post(`article/${url}`,params)
        .then((res) => {
          if (res.code == 200) {
                ElMessage.success({
                message: res.msg,
                type: 'success'
            });
          }
        });
    }
    function clearArticle(value) {
      edit.value = "";
    }
    function getLable(){
      proxy.$axios.get('/lable/getLables').then(res=>{
        if(res.code==200){
          lables.value=res.data;
        }
      })
    }
    getLable()
    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
    getSts();
    return {
      edit,
      upArticle,
      clearArticle,
      lables,
      title,
      introduce,
      checkedLable,
      init: {
        language_url: `../../static/tinymace/langs/zh_CN.js`,
        language: "zh_CN",
        height: "600",
        skin_url: "", // skin路径
        paste_data_images: true, // 允许粘贴图像
        plugins: "lists image media table wordcount",
        toolbar:
          "undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat",
        images_upload_handler: (blobInfo, success, failure) => {
          const img = "data:image/jpeg;base64," + blobInfo.base64();
          upPicture(dataURLtoFile(img, "1.jpg"), success);
        },
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.btns {
  margin-bottom: 20px;
}
.edit_title{
  display: flex;
  white-space: nowrap;
  margin:20px 0;
  .el-input{
    width: 200px;
    margin-left: 2.5em;
  }
}
.lableSelect{
  margin-bottom: 20px;
}
</style>
<style>
.el-select{
  width: 200px;
}
  .el-select-dropdown__list{
    width: 200px;
    display: flex;
    flex-direction: column;
  }
</style>