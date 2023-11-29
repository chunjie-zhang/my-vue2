/*
 * @Author: zhangchunjie8 zhangchunjie8@jd.com
 * @Date: 2023-08-04 14:53:24
 * @LastEditors: zhangchunjie8 zhangchunjie8@jd.com
 * @LastEditTime: 2023-08-08 20:59:25
 */
import { initState } from './initState'

export const initMixin = function (Vue) {
  Vue.prototype._init = function(options) {
    let vm = this;
    vm.$options = options;
    // 初始化状态
    initState(vm);

    // 渲染模版 el
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  }

  Vue.prototype.$mount = function(el) {
    // el -> template -> render
    let vm = this;
    // 获取元素
    el = document.querySelector(el);
    let options = vm.$options;
    if(!options.render) {
      let template = options.template;
      if (!template && el) {
        // 获取html
        el = el.outerHTML;
        console.log('======', el);
      }
    }
  }
}