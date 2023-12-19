<template>
    <el-header>
        <div class="left">
            <el-icon @click="changeCollage">
                <Menu></Menu>
            </el-icon>
            <span style="margin-left: 10px;">企业门户网站管理系统</span>
        </div>

        <div class="right">
            <span>欢迎回来 {{ store.state.userInfo.username }}</span>
            <!--这里上面这句,可以直接用$store ; 笔记里也记了  -->
            <el-dropdown>
                <span class>
                    <el-icon :size="30" color="white">
                        <SwitchFilled />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="ToCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="quite">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script setup>
// 我要用store来控制侧边栏的展开
import { useStore } from "vuex";
const store = useStore();
const changeCollage = () => {
    store.commit("ChangeCollapse")
}

import { Menu, SwitchFilled } from "@element-plus/icons-vue"
import { useRouter } from "vue-router";
const router = useRouter()
const ToCenter = () => {
    router.push("/center")
}

const quite = () => {
    localStorage.removeItem("token")
    store.commit("RemoveUserInfo")
    console.log(store.state);

    router.push("/login")
}

</script>


<style lang="scss" scoped>
.el-header {
    background-color: #2d3a4b;
    color: white;
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    width: 200px;
}

.left,
.right {
    display: flex;
}

.left {

    // Element plugs中的 icon图标 本质上是对i标签的一个封装 所以对i进行设置
    i {
        margin: auto;
        cursor: pointer;

    }
}

.right {
    .el-dropdown {
        //elemnet plugs的特点 标签是什么 类名就是什么 所以是el-dropdown
        margin: auto;
        margin-left: 10px;
    }
}
</style>


