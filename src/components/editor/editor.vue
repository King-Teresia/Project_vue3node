<template>
    <div id="TempEditor">

    </div>
</template>

<script setup>
import { onMounted, onUpdated } from "vue";//, defineEmits, defineProps 提示信息is a compiler macro and no longer needs to be imported.
import E from "wangeditor"

// 子传父用defineEmits 父传子用defineProps
const emits = defineEmits(["tpEvent"])
const props = defineProps({
    ToContent: String
})

onMounted(() => {
    const editor = new E("#TempEditor")
    editor.create()
    // console.log(props);
    // console.log(props.ToContent);
    props.ToContent && editor.txt.html(props.ToContent) // 重新设置编辑器内容

    // // 配置 onchange 回调函数 来自https://www.wangeditor.com/v4/官方文档 的回调函数
    editor.config.onchange = function (newHtml) {
        // console.log("change 之后最新的 html", newHtml);
        // 子传父
        emits("tpEvent", newHtml)
    };

})

onUpdated(() => {

})






</script>

<style lang="scss" scoped>
#TempEditor {
    text-align: left;
}
</style>

