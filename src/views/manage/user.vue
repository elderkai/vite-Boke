<template>
    <div>
      <div class="manage_user_table">
          <el-table
          :data="tableData"
          border
          style="width: 1200px"
          max-height="600">
          <el-table-column
            fixed
            prop="username"
            label="昵称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="300">
          </el-table-column>
          <el-table-column
            prop="picUrl"
            label="头像"
            width="150">
              <template #default="scope">
                <el-avatar :size="size" :src="scope.row.picUrl"></el-avatar>
              </template>
          </el-table-column>
          <el-table-column
            prop="power"
            label="权限"
            width="120">
            <template #default="scope">
              {{scope.row.power==1?'管理':"用户"}}
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
                @click="delUser(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
import $axios from "../../util/index";
import { reactive, toRefs, defineComponent, ref,getCurrentInstance  } from 'vue';
  import { ElMessage } from 'element-plus'
  import {rTime} from "../../assets/js/toolFun"
    export default {
        setup(){
            let tableData=ref([])
            const instance = getCurrentInstance()
            const { proxy } = getCurrentInstance()
          
            function delUser(value){
              console.log(value._id);
              proxy.$axios.post('/user/remove',{_id:value._id}).then(res=>{
                if(res.code==200){
                  getData()
                  ElMessage.success({
                    message: res.msg,
                    type: 'success'
                });
                }
              })
            }
        function getData(){
            proxy.$axios.get('/getUsers').then(res=>{
                if(res.code==200){
                  tableData.value=[]
                   res.data.map((a)=>{
                            return a['update-time']=rTime(a['update-time'])
                        })
                    tableData.value=res.data;
                }
            })
        }
        return{
          tableData,
          getData,
          delUser
        }
        },
        created(){
            
            this.getData()
        }
    }
</script>

<style lang="scss" scoped>
.manage_user_table{
  margin-top: 50px;
  margin-left: 120px;
}
</style>