import { createRouter, createWebHashHistory } from 'vue-router'
import MainBox from '../views/MainBox.vue'
import Login from '@/views/Login.vue'
import RouterConfigRoutes from "./config.js";
import store from '../store'
import tp from "../views/tp01.vue"
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    component: MainBox
  }, {
    path: "/tp",
    name: "tp",
    component: tp
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// // 判断是否为 管理员身份权限(===表判断别忘了) 是return出去是 true 不是那就false就顺利把用户管理的那俩路由过滤出去了
const isAdmin = (item) => {
  if (item.mustAdmin) {
    return store.state.userInfo.role === 1
  }
  return true
}



//动态创建路由 并封装一下 待会在路由拦截里直接用
const configRouter = () => {
  if (!router.hasRoute("mainbox")) {//这块是用户权限用户管理不可视的设置(因为在第68行用户切换的时候已经删除了路由了，so要在这添加上)
    router.addRoute({
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox
    })
  }
  RouterConfigRoutes.forEach(item => {
    isAdmin(item) && router.addRoute("mainbox", item)//然后在添加子路由 在父路由身上

  });
  // 改变store中isGetRouter的状态(默认为false 咱们要改为true 因为我们是用这个isGetRouter来判断用户是否为第一次访问咱的网站 我来解释一下:configRouter配置好了(isGetRouter就为true了)，说明所有的路由都可以访问，那么这就不是第一次了(第一次访问是没有token的是不能进入各种信息页面的) )
  store.commit("ChangeRouterState", true)
}



// 设置路由拦截(也叫路由守卫)
router.beforeEach((to, from, next) => {
  if (to.name === "login") { //如果是去登陆界面那么直接放行
    next()
  } else {
    if (!localStorage.getItem("token")) { //没有token的话
      next({
        path: "/login"
      })
    } else { //这块比较麻烦，最好在看视频回味一下
      if (store.state.isGetRouter) {
        // console.log(!store.state.isGetRouter);
        next()
      } else {
        // console.log("认证通过")

        // 删除所有路由(因为用户列表权限那块是添加的 不是更新的 所以就算后续添加的路由顺利把用户管理那俩过滤出去了，但是我是从这一堆里选，上一个admin留存下来的 依然在这里，所以如果是 admin登陆 在切普通用户 依然能看到用户管理那俩)
        router.removeRoute("mainbox")//把父路由删了，那么父路由底下的 子路由也就没了

        configRouter()
        next({
          path: to.fullPath
        })//为什么要再path一下，因为 configRouter()刚配置完是没有生效的所以要再来一下，但是必须设置一个进入条件，要不然就 设置路由未生效 转进路径 进来后又摄制路由未生效，就死循环了
      }
    }
  }
})



export default router
