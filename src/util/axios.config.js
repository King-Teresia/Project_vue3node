import axios from "axios";


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 发请求前 携带token
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // console.log(response.headers); //看看headers有没有.Authorzation属性 测试一下拦截器工不工作
    // ok，没问题，接下来把Authorization解构出来
    const { authorization } = response.headers
    authorization && localStorage.setItem("token", authorization)
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { status } = error.response
    if (status === 401) {
        localStorage.removeItem("token")
        window.location.href = "#/login"
    }
    return Promise.reject(error);
});