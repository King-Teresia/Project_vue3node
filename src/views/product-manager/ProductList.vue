<template>
    <div>
        <el-page-header title="产品管理" :icon="null">
            <template #content>
                <span class="text-large font-600 mr-3"> 产品列表 </span>
            </template>
        </el-page-header>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="productName" label="产品名称" />

            <el-table-column prop="introduce" label="简要描述">
                <template #default="scope">
                    {{ categoryToTxt(scope.row.category) }}
                </template>
            </el-table-column>

            <el-table-column prop="editTime" label="更新时间">
                <template #default="scope">
                    {{ timeFormat.getTime(scope.row.ediTime) }}
                </template>
            </el-table-column>




            <el-table-column label="操作">
                <template #default="scope">
                    <el-button circle :icon="Edit" @click="handleEdit(scope.row)"></el-button>

                    <el-popconfirm title="啊油sure?" confirm-button-text="是的捏" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row)">
                        <template #reference>
                            <el-button circle :icon="Delete" type="danger"></el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>

        </el-table>

    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import timeFormat from "../../util/timeFormat"
import { Edit, Delete } from "@element-plus/icons-vue";
import router from "@/router";

const tableData = ref([])

onMounted(() => {
    getTablesData()
})

const getTablesData = async () => {
    await axios.get("/adminapi/product/productlist").then(res =>
        tableData.value = res.data.iWantData
    )
}

const categoryToTxt = (para) => {
    const arr = ["最新动态", "典型案例", "通知公告"]
    return arr[para - 1]
}


const handleDelete = async (data) => {
    console.log(data);

    console.log(data._id);
    await axios.delete(`/adminapi/product/productlist/${data._id}`)//这块要加 下划线 _id才可以

    await getTablesData()//删除完了，但是页面也得刷新(但是刷新整个页面没必要，本地删除也可以，但是有可能会 前后端数据不一样，前后端数据不一样这就很致命了，所以就刷新 这块的数据 开销没有整个页面那么大 而且还能保证数据一致)

}

const handleEdit = (item) => {
    router.push(`/product-manage/editproduct/${item._id}`)
}



</script>

<style lang="scss" scoped>
.el-table {
    margin-top: 20px;
}

:deep(.htmlContent) {
    img {
        max-width: 99%;
    }
}
</style>