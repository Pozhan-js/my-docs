import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
Vue.use(VueAwesomeSwiper);

function isUa() {
  //判断是否为移动端
  return !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/);
}
function sleep(time = 0) {
  //休眠函数
  return new Promise(resolve => setTimeout(resolve, time >> 0 || 300));
}
Vue.prototype.$sleep = sleep;
Vue.prototype.$isUa = isUa;
