<template>
    <el-container>
        <AsiDe></AsiDe>
        <el-container direction="vertical">
            <HeaDer></HeaDer>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import AsiDe from "../components/mainboxMain/AsiDe.vue";
import HeaDer from "../components/mainboxMain/HeaDer.vue"
</script>

<style lang="scss" scoped>
.el-main {
    overflow: auto;
    height: calc(100vh - 60px);

    div {
        height: 101%;
    }

}
</style>