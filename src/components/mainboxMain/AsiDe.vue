<template>
    <el-aside width="auto">
        <!-- <el-aside :width="$store.state.isCollapse ? '64px' : '200px'"> 这个是kerwin写的，我不想指定宽度-->
        <el-menu :collapse="$store.state.isCollapse" :router="true" :default-active="route.fullPath">
            <!-- 注意这里的 index 是唯一标识，要设置成唯一的，因为后续要用这个索引来做高亮，你不能点一个全亮了那不像话,  卧槽，menu开启router属性能直接根据这块的index进行路径跳转 -->
            <el-menu-item index="/home">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span> 主页</span>
            </el-menu-item>

            <el-menu-item index="/center">
                <el-icon>
                    <UserFilled />
                </el-icon>
                <span> 个人中心</span>
            </el-menu-item>

            <el-sub-menu index="/user-manager" v-admin>
                <template #title>
                    <el-icon>
                        <User />
                    </el-icon>
                    <span>用户管理</span>
                </template>

                <!-- <el-menu-item-group title="这里是小字"> -->
                <el-menu-item index="/user-manager/adduser">添加用户</el-menu-item>
                <el-menu-item index="/user-manager/userlist">用户列表</el-menu-item>
                <!-- </el-menu-item-group> -->
            </el-sub-menu>

            <el-sub-menu index="/news-manager">
                <template #title>
                    <el-icon>
                        <Camera />
                    </el-icon>
                    <span>新闻管理</span>
                </template>

                <!-- <el-menu-item-group title="这里是小字"> -->
                <el-menu-item index="/news-manager/addnews">添加新闻</el-menu-item>
                <el-menu-item index="/news-manager/newslist">新闻列表</el-menu-item>
                <!-- </el-menu-item-group> -->
            </el-sub-menu>


            <el-sub-menu index="/product-manager">
                <template #title>
                    <el-icon>
                        <MessageBox />
                    </el-icon>
                    <span>产品管理</span>
                </template>

                <!-- <el-menu-item-group title="这里是小字"> -->
                <el-menu-item index="/product-manager/addproduct">添加产品</el-menu-item>
                <el-menu-item index="/product-manager/productlist">产品列表</el-menu-item>
                <!-- </el-menu-item-group> -->
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<script setup>
import { HomeFilled, User, MessageBox, Camera, UserFilled } from "@element-plus/icons-vue"
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore()
const route = useRoute()
// console.log(route.fullPath);


const vAdmin = {
    mounted(el) {
        // console.log(el);
        if (store.state.userInfo.role !== 1) {
            el.parentNode.removeChild(el)
        }
    },
}

</script>


<style lang="scss" scoped>
.el-aside {
    height: 100vh;
}
</style>