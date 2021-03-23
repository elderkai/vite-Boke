<template>
    <div>
        <div class="manageArticle">
            <el-table
            :data="articles"
            border
            style="width: 1200px"
            max-height="600">
                <el-table-column
                prop="author"
                label="作者"
                width="120">
                    <template #default="scope">
                        <el-avatar :size="size" :src="scope.row.author.picUrl"></el-avatar>
                        {{scope.row.author.username}}
                    </template>
                </el-table-column>
            <el-table-column
            prop="title"
            label="文章"
            width="150">
            </el-table-column>
            <el-table-column
            prop="introduce"
            label="介绍"
            width="150">
            </el-table-column>
            <el-table-column
            prop="readnumber"
            label="浏览量"
            width="150">

            </el-table-column>
            <el-table-column
            prop="commonnum"
            label="评论"
            width="150">

            </el-table-column>
            <el-table-column
            prop="updatedTime"
            label="创建时间"
            width="160">
            </el-table-column>
            <el-table-column label="图片">
                <template #default="scope">
                    <div>
                    <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.coverImg"
                   ></el-image>

                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <div>
                    <el-button size="mini"
                    type="text"
                    @click="editArticle(scope.row)"
                    >修改</el-button
                    >
                    <el-button size="mini"
                    type="text"
                    @click="delArticle(scope.row)"
                    >删除</el-button
                    >

                    </div>
                </template>
            </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import { ref,getCurrentInstance } from "vue";
    import { ElMessage } from 'element-plus'
    import { useStore  } from "vuex"
    import {  useRouter } from 'vue-router'
    import { rTime } from "../../assets/js/toolFun";
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const router=useRouter()
        let articles = ref([])
           function  getdata(){
                proxy.$axios.get('/article').then(res=>{
                    if(res.code==200){
                        console.log(res.data);
                            res.data.map((a)=>{
                            return a['updatedTime']=rTime(a['updatedTime'])
                            })
                     
                           articles.value = res.data;
                    }
                })
            }
            getdata()
            function delArticle(value){
                proxy.$axios.post('/article/remove',{_id:value._id}).then(res=>{
                    if(res.code==200){
                        getdata()
                        ElMessage.success({
                        message: res.msg,
                        type: 'success'
                        });
                    }
                })

            }
            function editArticle(value){
                console.log(value);
                router.push({
                    path:"/manage/editArticle",
                    query:{
                        id:value._id
                    }
                })
            }
        return {
            articles,
            delArticle,
            editArticle
        }
    }
}
</script>

<style lang="scss" scoped>
.manageArticle{
    margin-top: 40px;
    margin-left: 30px;
}
</style>