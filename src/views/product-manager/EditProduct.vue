<template>
    <div>
        <el-page-header title="产品管理" @back="goBack">
            <template #content>
                <span class="text-large font-600 mr-3"> 编辑产品 </span>
            </template>
        </el-page-header>

        <el-form ref="productFormRef" :model="productForm" :rules="productFormRules" label-width="80px"
            class="demo-ruleForm">
            <el-form-item label="产品名称" prop="productName">
                <el-input v-model="productForm.productName" />
            </el-form-item>


            <el-form-item label="产品简要描述" prop="introduce">
                <el-input v-model="productForm.introduce" type="textarea" />
            </el-form-item>

            <el-form-item label="产品详细描述" prop="detail">
                <el-input v-model="productForm.detail" type="textarea" />
            </el-form-item>

            <el-form-item label="产品图片" prop="coverImg">
                <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false" :auto-upload="false" :on-change="changeUpload">

                    <img v-if="productForm.coverImg" :src="uploadCoverImg" class="avatar" />
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

import { computed, ref, reactive, onMounted } from "vue";
const uploadCoverImg = computed(() => productForm.coverImg.includes("blob") ? productForm.coverImg : 'http://localhost:3000' + productForm.coverImg)

const changeUpload = (file) => {
    productForm.coverImg = URL.createObjectURL(file.raw)
    productForm.file = file.raw
}

const productFormRef = ref()

const productForm = reactive({
    productName: "",
    introduce: "",
    detail: "",
    coverImg: "",
    file: null,

})

const productFormRules = reactive({
    productName: [
        { required: true, message: '为必填项', trigger: 'blur' },
        { min: 1, message: '产品名字至少为1位', trigger: 'blur' },
    ],
    introduce: [
        { required: true, message: '产品简要描述', trigger: 'blur' },
    ],
    detail: [{ required: true, message: '产品详细描述', trigger: 'blur' }],
    coverImg: [
        { required: true, message: '上个封面', trigger: 'blur' },
    ],
})


const goBack = () => {
    router.back()//真方便，这个返回到上一级的代码应该是自带封装的(要不然不可能这么方便,转到定义看了一眼还真是)
}

/////////////////////////////////////

import { Plus } from '@element-plus/icons-vue'
import axios from "axios"
import { useRouter, useRoute } from "vue-router";
const router = useRouter()
const route = useRoute()


const submitForm = () => {
    // 第一步，校验表单(校验表单信息是否完整)
    productFormRef.value.validate(async (valid) => {
        if (valid) {
            // console.log(productForm);
            const tp1 = new FormData()//OneNote写了 Formdata 
            for (let i in productForm) {
                tp1.append(i, productForm[i])
            }
            // console.log(tp1);
            await axios.put("/adminapi/product/productlist", tp1, {
                Headers: {
                    "ConTent-Type": "multipart/form-data"
                }
            }).then(res => {
                console.log(res);

            })
            router.push("/product-manager/productlist")
        }
    });
}


// ////////////////
onMounted(async () => {
    // console.log(route);
    await axios.get(`/adminapi/product/productlist/${route.params.id}`).then(res => Object.assign(productForm, res.data.iWantData[0]))//因为newsForm是reactive对象，所以不能简单的赋值，要用 Object.assign
    // console.log(newsForm.content);



})



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