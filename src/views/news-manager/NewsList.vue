<template>
    <div>
        <el-page-header title="新闻管理" :icon="null">
            <template #content>
                <span class="text-large font-600 mr-3"> 新闻列表 </span>
            </template>
        </el-page-header>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="title" label="标题" />

            <el-table-column prop="category" label="类别">
                <template #default="scope">
                    {{ categoryToTxt(scope.row.category) }}
                </template>
            </el-table-column>

            <el-table-column prop="editTime" label="更新时间">
                <template #default="scope">
                    {{ timeFormat.getTime(scope.row.editTime) }}
                </template>
            </el-table-column>

            <el-table-column prop="isPublish" label="发布状态">
                <template #default="scope">
                    <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0"
                        @click="switchChange(scope.row)" />
                </template>
            </el-table-column>


            <el-table-column label="操作">
                <template #default="scope">
                    <el-button circle :icon="Star" type="success" @click="preview(scope.row)"></el-button>
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

        <el-dialog v-model="dialogVisible" title="预览新闻" width="50%">
            <h2>{{ previewData.title }}</h2>
            <div style="font-size: 12px; color:gray">
                {{ timeFormat.getTime(previewData.editTime) }}
                <el-divider />
                <div v-html="previewData.content" class="htmlContent"></div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import timeFormat from "../../util/timeFormat"
import { Star, Edit, Delete } from "@element-plus/icons-vue";
import router from "@/router";
import { useStore } from "vuex";
const store = useStore();
const tableData = ref([])
const dialogVisible = ref(false)
const previewData = ref({})

onMounted(() => {
    getTablesData()
})

let dataBackOfNewsList = []
const getTablesData = async () => {
    await axios.get("/adminapi/news/newslist").then(res =>
        dataBackOfNewsList = res.data.iWantData
    )
    if (store.state.userInfo.role !== 1) {
        let newArr = dataBackOfNewsList.filter(newObj => newObj.username == store.state.userInfo.username)//判断一下 这些数据的.username属性 是否和当前的 store里的username属性相同 只吧相同的 过滤出来
        tableData.value = newArr
    } else {
        tableData.value = dataBackOfNewsList
    }
}

const categoryToTxt = (para) => {
    const arr = ["最新动态", "典型案例", "通知公告"]
    return arr[para - 1]
}

const switchChange = async (scopeRow) => {
    // console.log(scopeRow.isPublish);
    await axios.put("/adminapi/news/publish", {
        _id: scopeRow._id,
        isPublish: scopeRow.isPublish
    })
    await getTablesData()
}

const preview = (scopeRow) => {
    console.log(scopeRow);
    previewData.value = scopeRow
    dialogVisible.value = true
}

const handleDelete = async (data) => {
    console.log(data);

    console.log(data._id);
    await axios.delete(`/adminapi/news/newslist/${data._id}`)//这块要加 下划线 _id才可以

    await getTablesData()//删除完了，但是页面也得刷新(但是刷新整个页面没必要，本地删除也可以，但是有可能会 前后端数据不一样，前后端数据不一样这就很致命了，所以就刷新 这块的数据 开销没有整个页面那么大 而且还能保证数据一致)

}

const handleEdit = (item) => {
    router.push(`/news-manage/editnews/${item._id}`)
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