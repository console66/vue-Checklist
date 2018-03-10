/* 引入vue和主页 */
import Vue from 'vue'
import Demo from './checklist/demo.vue'

/* 实例化一个vue */
new Vue({
  el: '#app',
  render: h => h(Demo)
})