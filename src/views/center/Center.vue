<!-- mainbox中用来展示 用户个人中心 -->
<template>
    <div>
        <!-- <div>
        center
    </div> -->
        <el-page-header title="123企业门户网站管理系统" :icon="null">
            <template #content>
                <span class="text-large font-600 mr-3"> 用户中心 </span>
            </template>

        </el-page-header>

        <el-row :gutter="20">
            <el-col :span="8">
                <el-card class="box-card">
                    <el-avatar :size="80" :src="avatarURL" />
                    <h3>{{ $store.state.userInfo.username }}</h3>
                    <h5>{{ $store.state.userInfo.role === 1 ? "管理员" : "编辑" }}</h5>
                </el-card>
            </el-col>

            <el-col :span="16">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>个人信息</span>
                        </div>
                    </template>

                    <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px"
                        class="demo-ruleForm">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userForm.username" />
                        </el-form-item>

                        <el-form-item label="性别" prop="sex">
                            <el-select v-model="userForm.sex" class="m-2" placeholder="Select" style="width: 100%;">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="介绍" prop="introduce">
                            <el-input v-model="userForm.introduce" type="textarea" />
                        </el-form-item>

                        <el-form-item label="头像" prop="avatar">
                            <el-upload class="avatar-uploader"
                                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
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
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore()
console.log(store.state);

import { computed, ref, reactive } from "vue";
import { Plus } from '@element-plus/icons-vue'
import axios from "axios"
import { ElMessage } from 'element-plus'

const avatarURL = computed(() =>
    store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
)
const userFormRef = ref()
const { username, sex, introduce, avatar } = store.state.userInfo
const userForm = reactive({
    username,
    sex,
    introduce,
    avatar,
    file: null
})

const userFormRules = reactive({
    username: [
        { required: true, message: '用户名为必填项', trigger: 'blur' },
        { min: 1, max: 12, message: '用户名最少1位,最长12位', trigger: 'blur' },
    ],
    sex: [
        { required: true, message: '性别不明', trigger: 'blur' },
    ],
    introduce: [
        { required: true, message: '介绍一下自己', trigger: 'blur' },
    ],
    avatar: [
        { required: true, message: '头像去哪啦', trigger: 'blur' },
    ],
})

const options = [
    {
        label: "保密",
        value: 0
    },
    {
        label: "男",
        value: 1
    }, {
        label: "女",
        value: 2
    }
]
// 每次选完图片后的回调
const changeUpload = (file) => {
    // console.log(file);
    userForm.avatar = URL.createObjectURL(file.raw)
    userForm.file = file.raw
}

const submitForm = () => {
    // 第一步，校验表单(校验表单信息是否完整)
    userFormRef.value.validate((valid) => {
        if (valid) {
            // console.log(userForm);
            const tp1 = new FormData()
            for (let i in userForm) {
                tp1.append(i, userForm[i])
            }
            // console.log(tp1);
            axios.post("/adminapi/user/upload", tp1, {
                Headers: {
                    "ConTent-Type": "multipart/form-data"
                }
            }).then(res => {
                // console.log(res);
                if (res.data.ActionType === 1111) {
                    // console.log("ActionType没问题");
                    // console.log(res);
                    store.commit("ChangeUserInfo", res.data.data)
                    ElMessage({
                        message: '更新成功',
                        type: 'success',

                    })

                }
            })
        }
    });

}

const uploadAvatar = computed(() => userForm.avatar.includes("blob") ? userForm.avatar : 'http://localhost:3000' + userForm.avatar)


</script>

<style lang="scss" scoped>
.el-row {
    margin-top: 20px;

    .box-card {
        text-align: center;

        h3,
        h5 {
            margin: 10px 0;
        }
    }
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