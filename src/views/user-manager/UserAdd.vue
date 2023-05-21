<template>
    <div>
        <el-page-header title="用户管理" :icon="null">
            <template #content>
                <span class="text-large font-600 mr-3"> 添加用户 </span>
            </template>
        </el-page-header>

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

            <el-form-item label="头像" prop="avatar">
                <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false" :auto-upload="false" :on-change="changeUpload">

                    <img v-if="userForm.avatar" :src="uploadAvatar" class="avatar" />
                    <!-- 就是用上面这个 改变头像的 然后再用后面的哪个class限制长度和宽度(和下面的默认头像相同class="avatar-uploader-icon") -->

                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>

                </el-upload>
            </el-form-item>

            <el-form-item>
                <el-button @click="submitForm">更新</el-button>
            </el-form-item>


        </el-form>
    </div>
</template>

<script setup>
import { computed, ref, reactive } from "vue";
const uploadAvatar = computed(() => userForm.avatar.includes("blob") ? userForm.avatar : 'http://localhost:3000' + userForm.avatar)

const changeUpload = (file) => {
    userForm.avatar = URL.createObjectURL(file.raw)
    userForm.file = file.raw
}

const userFormRef = ref()

const userForm = reactive({
    username: "",
    password: "",
    role: 2,//别忘了 1是管理员，2是普通编辑者，默认创建 普通的
    introduce: "",
    avatar: "",
    file: null,
    sex: 0//可以不在页面上让用户填写，但是默认添加一个保密

})

const userFormRules = reactive({
    username: [
        { required: true, message: '用户名为必填项', trigger: 'blur' },
        { min: 1, max: 12, message: '用户名最少1位,最长12位', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码格式不正确', trigger: 'blur' },
        { min: 6, max: 12, message: '密码最少6位,最长12位', trigger: 'blur' },

    ],
    role: [{ required: true, message: '请选择权限', trigger: 'blur' }],
    introduce: [
        { required: true, message: '介绍一下自己', trigger: 'blur' },
    ],
    avatar: [
        { required: true, message: '头像去哪啦', trigger: 'blur' },
    ],
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

/////////////////////////////////////

import { useStore } from "vuex";
const store = useStore()
// console.log(store.state);

import { Plus } from '@element-plus/icons-vue'
import axios from "axios"
import { useRouter } from "vue-router";
const router = useRouter()


const submitForm = () => {
    // 第一步，校验表单(校验表单信息是否完整)
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            // console.log(userForm);
            const tp1 = new FormData()//OneNote写了 Formdata 
            for (let i in userForm) {
                tp1.append(i, userForm[i])
            }
            // console.log(tp1);
            await axios.post("/adminapi/user/useradd", tp1, {
                Headers: {
                    "ConTent-Type": "multipart/form-data"
                }
            }).then(res => {
                console.log(res);

            })
            router.push("/user-manager/userlist")


        }
    });

}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 20px;
}

:deep(.avatar-uploader, .el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}



:deep(.avatar-uploader .el-upload:hover) {
    border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.avatar {
    // 保持和class="avatar-uploader-icon" 的长度和宽度相同
    width: 178px;
    height: 178px;
}
</style>