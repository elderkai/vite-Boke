<template>
    <div>
<el-upload
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
    :http-request="upPictures"
    :file-list='listFile'
    limit='1'
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>

</el-upload>
<el-dialog v-model="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
    </div>
</template>

<script>
import {ref,inject } from 'vue';
import { getSts, upPicture,deepClone } from "../assets/js/toolFun";
    export default {
        setup(){
        let dialogImageUrl=ref('');
        let coverPic=inject('coverPic');
        let dialogVisible=ref(false);
        let showPic=ref(true);
        let listFile=ref([]);
        if(coverPic.value){
         listFile.value.push(coverPic.value)   
        }
        function handleRemove(file, fileList) {
                console.log(file, fileList);
            }
        function handlePictureCardPreview(file) {
            console.log(file);
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
                getSts()
            function upPictures(param){
               let file = param.file;
            upPicture(file).then(res=>{
            coverPic.value=res;
            console.log(listFile);
            });
            }
            return {
                dialogImageUrl,
                dialogVisible,
                handleRemove,
                handlePictureCardPreview,
                listFile,
                upPictures
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>