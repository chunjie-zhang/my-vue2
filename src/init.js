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
  }
}