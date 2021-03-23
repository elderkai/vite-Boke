<template>
    <div>
        <div class="addBtn">
            <el-button @click="showAdd" type="text">添加</el-button>
            <div class="inputAdd">
              <el-input placeholder="添加标签" v-show="show" @change="addLable" v-model="lable"></el-input>
            </div>
        </div>
        <div class="tableBox">
            <el-table
            :data="lables"
            border
            style="width: 600px"
            max-height="600">

                <el-table-column
                prop="lable"
                label="标签"
                width="120">
                    <template #default="scope">
                        <el-input @change="upLable(scope.row)" v-model="scope.row.lable" placeholder="请输入内容"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                prop="update-time"
                label="创建时间"
                width="300">
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="mini"
                        type="text"
                        @click="delLable(scope.row)"
                        >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { reactive,ref,getCurrentInstance } from "vue";
  import {rTime} from "../../assets/js/toolFun"
  import { ElMessage } from 'element-plus'
export default {
    setup () {
        const {ctx} = getCurrentInstance();
        let lables = ref([])
        let lable=ref('')
        let show=ref(false)
        function showAdd(){
            show.value=!show.value
        }
        function addLable(){
            ctx.$axios.post('/lable/create',{lable:lable.value}).then(res=>{
                if(res.code==200){
                    show.value=false;
                    lable.value='';
                    getData()
                }
            })
            
        }
     function getData(){
                ctx.$axios.get("/lable/getLables").then(res=>{
                    if(res.code==200){
                        lables.value=[]
                        res.data.map((a)=>{
                            return a['update-time']=rTime(a['update-time'])
                        })
                            lables.value = res.data;
                    }
                })
            }
            getData()
            function delLable(value){
                ctx.$axios.post('/lable/remove',{_id:value._id}).then(
                    res=>{
                        if(res.code==200){
                            ElMessage.success
                        ({
                        message: res.msg,
                        type: 'success'
                        });
                         getData()
                        }
                    }
                )
            }
            function upLable(value){
                ctx.$axios.post('/lable/change',{
                    _id:value._id,
                    lable:value.lable
                }).then(res=>{
                    if(res.code==200){
                    ElMessage.success
                        ({
                        message: res.msg,
                        type: 'success'
                        });
                  getData()
                    }
                })
            }
        return {
            lables,
            delLable,
            upLable,
            lable,
            addLable,
            showAdd,
            show,
            
        }
    }
}
</script>

<style lang="scss" scoped>
.tableBox{
    margin-top:20px;
    margin-left: 120px;
}
.addBtn{
    margin-left: 50px;
    margin-top:30px;
    .inputAdd{
        width: 100px;
        height: 40px;
    }
}
</style>