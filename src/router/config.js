// 这个config.js是为了配合 动态创建路由 (把这些子路由创建在mainbox下 在index.js里用到的)
import Home from '@/views/home/Home.vue'
import Center from '@/views/center/Center.vue'
import NewsAdd from '../views/news-manager/NewsAdd.vue'
import NewsList from '../views/news-manager/NewsList.vue'
import EditNews from "../views/news-manager/EditNews.vue"
import ProductList from '../views/product-manager/ProductList.vue'
import ProductAdd from '../views/product-manager/ProductAdd.vue'
import EditProduct from "../views/product-manager/EditProduct.vue"

import UserAdd from '../views/user-manager/UserAdd.vue'
import UserList from '../views/user-manager/UserList.vue'

import NotFound from "../views/notfound/NotFound.vue"

// 子路由
const routes = [
    {
        path: "/center",
        component: Center
    },
    {
        path: "/home",
        component: Home
    },
    {
        path: "/news-manager/addnews",
        component: NewsAdd
    },
    {
        path: "/news-manager/newslist",
        component: NewsList
    },
    {
        path: "/news-manage/editnews/:id",
        component: EditNews
    },
    {
        path: "/product-manager/addproduct",
        component: ProductAdd
    },
    {
        path: "/product-manager/productlist",
        component: ProductList
    },
    {
        path: "/product-manage/editproduct/:id",
        component: EditProduct
    },

    {
        path: "/user-manager/adduser",
        component: UserAdd,
        mustAdmin: true//用户管理的这两个 一个添加，一个列表必须是管理员身份才能访问
    },
    {
        path: "/user-manager/userlist",
        component: UserList,
        mustAdmin: true//用户管理的这两个 一个添加，一个列表必须是管理员身份才能访问

    },
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/:pathMatch(.*)*",//固定语法 "/:pathMatch(.*)*" 代表用户瞎写的 咱们这块(前后端)没有注册的访问路径
        component: NotFound
    }
]

export default routes