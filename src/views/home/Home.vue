<!-- mainbox中用来展示 企业门户主页 -->
<template>
    <div>
        <!-- home{{ store.state.userInfo.username }} -->
        <el-page-header title="123企业门户网站管理系统" :icon="null">
            <template #content>
                <span class="text-large font-600 mr-3"> 首页 </span>
            </template>

        </el-page-header>

        <el-card class="box-card" style="margin-top: 20px;margin-bottom: 50px">
            <!-- 这块注意一下，element-plugs的 el-row 里的这个:span=x 这个值 总和为24 =>网页满满当当一行 超出就会挤下去，总和不够24就会占不满-->
            <el-row>
                <el-col :span="3">
                    <el-avatar :size="80" :src="avatarURL" />
                </el-col>
                <el-col :span="21">
                    <h3 style="line-height: 80px;">欢迎回来{{ $store.state.userInfo.username }},{{ welcomeTxt }}</h3>
                </el-col>

            </el-row>
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>产品列表</span>
                </div>
            </template>

            <el-carousel :interval="4000" type="card" height="200px" v-if="productLoop.length > 0">
                <el-carousel-item v-for="item in  productLoop " :key="item._id">
                    <div :style="{
                        backgroundImage: `url(http://localhost:3000${item.coverImg})`,
                        backgroundSize: 'cover'
                    }">
                        <h3 text="2xl" justify="center">{{ item.productName }}</h3>
                    </div>
                </el-carousel-item>
            </el-carousel>

        </el-card>

    </div>
</template>

<script setup>
// // 用这个主页 来测试一下 更新token(这块和后端的UserRouter做相关配置)
// import axios from "axios"
// axios.get("/adminapi/user/home").then((res) => {
//     console.log(res.data);
// })

// 用这个主页 在来测试一下 store里的数据
import { useStore } from "vuex";
const store = useStore()
// console.log(store.state);

import { computed, onMounted, ref } from "vue";
import axios from "axios"
const avatarURL = computed(() =>
    store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
)

const welcomeTxt = computed(() => new Date().getHours() < 12 ? "愿你像上午的太阳，冉冉升起" : "什么?要下班了?奥里给干了xdm!")

// product轮播图
const productLoop = ref([])
onMounted(() => {
    getData()
})

const getData = async () => {
    await axios.get("/adminapi/product/productlist").then(res =>
        productLoop.value = res.data.iWantData
    )
    // console.log(productLoop.value);

}




</script>

<style lang="scss" scoped>
// .el-card {
//     margin-top: 50px;
// }


.el-carousel__item h3 {
    color: #111111;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

// avatar & product
.el-col-3 {
    display: flex;
    justify-content: center;
    align-items: center
}

.el-col-21 {
    text-align: left;
}
</style>