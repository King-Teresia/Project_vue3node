<template>
    <div>
        <el-page-header title="新闻管理" @back="goBack">
            <template #content>
                <span class="text-large font-600 mr-3"> 编辑新闻 </span>
            </template>
        </el-page-header>

        <el-form ref="newsFormRef" :model="newsForm" :rules="newsFormRules" label-width="80px" class="demo-ruleForm">
            <el-form-item label="新闻标题" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>
            <el-form-item label="新闻内容" prop="content">
                <editor @tpEvent="editorChange" :ToContent="newsForm.content" v-if="newsForm.vifParams" />
                <!-- 前面的@tpevent是子传父 后面的ToContent是父传子 -->
                <!-- 这个就是那个 复杂文本编辑栏 插/组件 但是因为，我们后续还要编辑这个东西，所以我们要封装一下 起个名字吧就叫 editor-->
            </el-form-item>

            <el-form-item label="新闻种类" prop="category">
                <el-select v-model="newsForm.category" class="m-2" placeholder="Select" style="width: 100%;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="封面" prop="coverImg">
                <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false" :auto-upload="false" :on-change="changeUpload">

                    <img v-if="newsForm.coverImg" :src="uploadCoverImg" class="avatar" />
                    <!-- 就是用上面这个 改变头像的 然后再用后面的哪个class限制长度和宽度(和下面的默认头像相同class="avatar-uploader-icon") -->

                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>

                </el-upload>
            </el-form-item>

            <el-form-item>
                <el-button @click="submitForm">更新新闻</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>

<script setup >
import { reactive, ref, computed, onMounted } from "vue";
import editor from "../../components/editor/editor.vue"
import { Plus } from '@element-plus/icons-vue'
import { useRouter, useRoute } from "vue-router"
import axios from "axios"
const router = useRouter()
const route = useRoute()
const newsFormRef = ref()
const newsForm = reactive({
    title: "",
    content: "",
    category: 1,//category(种类，分类) 1我们设置为 最新动态 2设置为 典型案例 3为通知公告
    coverImg: "",//封面图片
    file: null,//有封面图片 就得有图片信息
    isPublish: 0,//0代表没发布，1代表发布新闻了
    vifParams: false
})
const newsFormRules = reactive({
    title: [
        { required: true, message: '该项为必填项', trigger: 'blur' },
    ],
    content: [
        { required: true, message: '该项为必填项', trigger: 'blur' },

    ],
    category: [
        { required: true, message: '该项为必填项', trigger: 'blur' },

    ],
    coverImg: [
        { required: true, message: '该项为必填项', trigger: 'blur' },

    ],
})

// 每次editor改变的时候 都调用一次这个函数
const editorChange = (data) => {
    newsForm.content = data
    console.log("editorChange收到参数data了");

}
const options = [
    {
        label: "最新动态",
        value: 1
    }, {
        label: "典型案例",
        value: 2
    }, {
        label: "通知公告",
        value: 3
    }
]

const uploadCoverImg = computed(() => newsForm.coverImg.includes("blob") ? newsForm.coverImg : 'http://localhost:3000' + newsForm.coverImg)

const changeUpload = (file) => {
    newsForm.coverImg = URL.createObjectURL(file.raw)
    newsForm.file = file.raw
}


const submitForm = () => {
    // 第一步，校验表单(校验表单信息是否完整)
    newsFormRef.value.validate(async (valid) => {
        if (valid) {
            console.log(newsForm);
            const tp1 = new FormData()//详情见 OneNote
            for (let i in newsForm) {
                tp1.append(i, newsForm[i])
            }
            console.log(tp1);
            await axios.put("/adminapi/news/newslist", tp1, {
                Headers: {
                    "ConTent-Type": "multipart/form-data"
                }
            }).then(res => {
                console.log(res);

            })
            router.push("/news-manager/newslist")


        }
    });

}

///////////////////////////////////////////
onMounted(async () => {
    // console.log(route);
    await axios.get(`/adminapi/news/newslist/${route.params.id}`).then(res => Object.assign(newsForm, res.data.iWantData[0]))//因为newsForm是reactive对象，所以不能简单的赋值，因为简单赋值reactive监听不到，要用 Object.assign 这种对象的方法，这样就能监听到了
    // console.log(newsForm.content);
    // console.log(newsForm.content.length);

    if (newsForm.content.length > 0) {
        newsForm.vifParams = true
    }
    // console.log(newsForm.vifParams);

})


const goBack = () => {
    router.back()//真方便，这个返回到上一级的代码应该是自带封装的(要不然不可能这么方便,转到定义看了一眼还真是)
}

// newsForm.content ? !vifParams : console.log("请输入内容");


</script>

<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 20px;
}


/* 复制粘贴 */
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
    width: 178px;
    height: 178px;
}
</style>