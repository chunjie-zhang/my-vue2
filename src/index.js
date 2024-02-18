/*
 * @Author: zhangchunjie8 zhangchunjie8@jd.com
 * @Date: 2023-08-03 21:27:04
 * @LastEditors: zhangchunjie8 zhangchunjie8@jd.com
 * @LastEditTime: 2023-08-08 20:51:48
 */
import { initGlobalApi } from './global-api/index';
import { initMixin } from './init';
import { stateMixin } from './initState';
import { lifecycleMixin } from './lifecycle';
import { renderMixin } from './vnode/index';

/**
 *  Vue的入口文件
 * @param {*} options 
 */
function Vue(options) {
  // 初始化
  this._init(options);
}

/***
 * 初始化加载
 */
initMixin(Vue);

/*** 
 * 注册生命周期函数
*/
lifecycleMixin(Vue)

/**
 * 添加_render方法
 */
renderMixin(Vue);

/***
 * 全局方法
 * Vue.mixin Vue.component Vue.extend
 */
initGlobalApi(Vue)

stateMixin(Vue);

export default Vue;