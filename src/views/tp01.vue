<template>
    <!-- 我是父亲 -->
    <child @tpEvent="test" :message="newsForm.content"></child>
</template>

<script setup>
import child from "./tp02.vue"
const test = (data) => {
    console.log(data);
}

const newsForm = {
    content: "我是父亲里的 要传给子的东西"
}

</script>