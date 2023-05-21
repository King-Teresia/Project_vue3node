<template>
    <!-- Login
    <button @click="setToken(); test()">点我设置token</button> -->

    <!-- 粒子库 -->
    <Particles id="tsparticles" :particlesInit="particlesInit" :options="options" />

    <!-- form表单 -->
    <div id="formBody">
        <h3>企业门户管理网站</h3>
        <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="loginRules" label-width="75px"
            class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" autocomplete="off" />
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" autocomplete="off" />
            </el-form-item>

            <el-form-item>
                <el-button @click="submitForm">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios"
import { ElMessage } from 'element-plus'
import { useStore } from "vuex";
const store = useStore()
const router = useRouter()
const submitForm = () => {
    // 第一步，校验表单(校验表单信息是否完整)
    loginFormRef.value.validate((valid) => {
        if (valid) {

            axios.post("/adminapi/user/login", loginForm).then((res) => {//不配置反向代理向后端发会 报跨域 的错，所以要去 vue.config.js中设置反向代理
                // console.log(res.data);
                if (res.data.type === "ok") {
                    // console.log(res.data.data);
                    store.commit("ChangeUserInfo", res.data.data)
                    store.commit("ChangeRouterState", false)//这个是因为 做用户权限不可见 用户管理的时候，的一个bug，切换用户登陆的话 前一个用户的权限会一直生效，所以要在这 每次登陆的时候，都初始化一下，改为false 这样就能从新进入 路由守卫 从而过滤用户管理那两个路由
                    router.push("/home")
                    // localStorage.setItem("token", "amiya") 
                    // 好了 我已经在axios拦截器里 能把后端返回来的token存下了，这个做测试的 假的存储token 就可以注释掉了

                } else {
                    ElMessage({
                        showClose: true,
                        message: '用户名 密码不正确',
                        type: 'error',
                    })
                }
            })
        }
    });
    // 第二部，将表单内容提交给后端
    // 第三步，保存从后端获取到的token(先本地保存把 因为我已经设置路由拦截了，没token进不了别的页面)
    // localStorage.setItem("token", "amiya")
}
// 表单的引用对象
const loginFormRef = ref()
// 表单的响应式
const loginForm = reactive({
    username: "",
    password: ""
})
// 表单的rules
const loginRules = reactive({
    username: [{
        required: true, message: "请输入用户名", trigger: "blur"
    }],
    password: [{
        required: true, message: "请输入密码", trigger: "blur"
    }]
})

//particles粒子库 需要和tsparticles配合使用
import { loadFull } from "tsparticles";
const particlesInit = async (engine) => { await loadFull(engine) }
// 粒子库的配置
const options = {
    background: {
        color: {
            value: '#2d3a4b'
        }
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 100,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        collisions: {
            enable: true
        },
        move: {
            direction: 'none',
            enable: true,
            outModes: {
                default: 'bounce'
            },
            random: false,
            speed: 1.5,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            value: { min: 1, max: 5 },
        }
    },
    detectRetina: true
}


</script>

<style lang="scss" scoped>
#formBody {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 280px;
    background-color: rgba($color: #000000, $alpha: .6);
    color: white;
    text-align: center;

    h3 {
        margin: 10px;
        font-size: 30px;

    }

    .el-form-item {
        width: 95%;
    }


}

:deep(.el-form-item__label) {
    color: white;
}
</style>