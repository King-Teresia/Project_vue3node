<template>
    <h3>i am 02</h3>
</template>

<script setup>
import { onMounted } from "vue"
const emits = defineEmits(["tpEvent"])
onMounted(() => {
    emits("tpEvent", "tp02的东西")
    // setTimeout(() => {

    // }, 2000);

    console.log(props);
    console.log(props.message);


})

const props = defineProps({
    message: String
})

</script>