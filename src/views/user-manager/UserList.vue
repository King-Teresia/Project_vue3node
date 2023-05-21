<template>
    <div>
        <el-page-header title="用户管理" :icon="null">
            <template #content>
                <span class="text-large font-600 mr-3"> 用户列表 </span>
            </template>
        </el-page-header>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="username" label="用户名" width="180" />

            <el-table-column prop="avatar" label="头像">
                <template #default="scope">
                    <div v-if="scope.row.avatar">
                        <el-avatar :size="50" :src="'http://localhost:3000' + scope.row.avatar">

                        </el-avatar>
                    </div>
                    <div v-else>
                        <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png">

                        </el-avatar>
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="role" label="角色">
                <template #default="scope">
                    <el-tag v-if="scope.row.role === 1" class="ml-2" type="success">管理员</el-tag>

                    <el-tag v-else class="ml-2" type="info">编辑者</el-tag>

                </template>
            </el-table-column>


            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>

                    <el-popconfirm title="啊油sure?" confirm-button-text="是的捏" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row)">
                        <template #reference>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>


                </template>
            </el-table-column>
        </el-table>
    </div>


    <!-- 现在开始做编辑 邮箱 电话  -->
    <el-dialog v-model="dialogVisible" title="编辑栏" width="50%">
        <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="80px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" />
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="userForm.password" type="password" />
            </el-form-item>

            <el-form-item label="权限" prop="role">
                <el-select v-model="userForm.role" class="m-2" placeholder="Select" style="width: 100%;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="介绍" prop="introduce">
                <el-input v-model="userForm.introduce" type="textarea" />
            </el-form-item>


            <el-form-item label="邮箱" prop="mail">
                <el-input v-model="userForm.mail" />
            </el-form-item>

            <el-form-item label="电话" prop="phone">
                <el-input v-model="userForm.phone" />
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="yesSure">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";

const dialogVisible = ref(false)
const tableData = ref([])
onMounted(() => {
    getTablesData()
})
const getTablesData = async () => {

    await axios.get("/adminapi/user/userlist").then(res => {
        // 我在外面拿不到 res.data，所以就在里面弄了
        tableData.value = res.data.data

    })
}

const handleEdit = async (data) => {
    // console.log(data);
    await axios.get(`adminapi/user/userlist/${data._id}`).then(res => {
        // console.log(res.data.data);
        // userForm = res.data.data[0]
        Object.assign(userForm, res.data.data[0])//因为userForm是reactive对象，所以不能简单的赋值
    })
    dialogVisible.value = true
}

const handleDelete = async (data) => {
    console.log(data);
    await axios.delete(`/adminapi/user/userlist/${data._id}`)//这块要加 下划线 _id才可以

    getTablesData()//删除完了，但是页面也得刷新(但是刷新整个页面没必要，本地删除也可以，但是有可能会 前后端数据不一样，前后端数据不一样这就很致命了，所以就刷新 这块的数据 开销没有整个页面那么大 而且还能保证数据一致)

}



// 编辑栏

const userFormRef = ref()

let userForm = reactive({
    username: "",
    password: "",
    role: 2,//别忘了 1是管理员，2是普通编辑者，默认创建 普通的
    introduce: "",
    mail: "",
    phone: ""

})

const userFormRules = reactive({
    username: [
        { required: true, message: '用户名为必填项', trigger: 'blur' },
        { min: 1, max: 12, message: '用户名最少1位,最长12位', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码格式不正确', trigger: 'blur' },
        { min: 6, max: 12, message: '密码最少6位,最长12位', trigger: 'blur' },

    ]
})


const options = [

    {
        label: "管理员",
        value: 1
    }, {
        label: "编辑者",
        value: 2
    }
]

const yesSure = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            // 三件事:
            // 1.更新到后端数据
            console.log(userForm);
            await axios.put(`/adminapi/user/userlist/${userForm._id}`, userForm)
            // 2.将dialog编辑栏隐藏
            dialogVisible.value = false
            // 3.table后去数据,展示到页面
            getTablesData()
        }
    })
}






</script>








<style lang="scss" scoped>
.el-table {
    margin-top: 30px;
}
</style>