/*
 * @Author: zhangchunjie8 zhangchunjie8@jd.com
 * @Date: 2023-08-04 14:53:24
 * @LastEditors: zhangchunjie8 zhangchunjie8@jd.com
 * @LastEditTime: 2023-08-08 20:59:25
 */
import { initState } from './initState'
import { compileToFunction } from './compile/index'
import { mounteComponent } from './lifecycle';

/**
 * 初始化Vue的原型方法
 *
 * @param {*} Vue
 */
export const initMixin = function (Vue) {
  /**
   * 初始化Vue将data转为响应式数据
   * 挂载vue模版
   *
   * @param {*} Vue
   */
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

/**
 * 挂载模版
 *
 * @param {*} el
 */
Vue.prototype.$mount = function(el) {
    // el -> template -> render
    let vm = this;
    // 获取元素
    el = document.querySelector(el);
    vm.$el = el;
    let options = vm.$options;
    if(!options.render) {
      let template = options.template;
      if (!template && el) {
        // 获取html
        el = el.outerHTML;
        console.log('======el', el);
        // 变成render函数
        let render = compileToFunction(el);
        console.log('=======render', render);
        // （1）将render函数变为vnode （2）vnode变为真实dom放到页面上
        options.render = render;
      }
    }
    // 挂载组件
    mounteComponent(vm, el);
  }
}