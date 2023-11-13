/*
 * @Author: zhangchunjie8 zhangchunjie8@jd.com
 * @Date: 2023-08-03 21:27:04
 * @LastEditors: zhangchunjie8 zhangchunjie8@jd.com
 * @LastEditTime: 2023-08-08 20:51:48
 */
import { initMixin } from './init';
/**
 *  Vue的入口文件
 * @param {*} options 
 */
function Vue(options) {
  // 初始化
  this._init(options);
}

initMixin(Vue);

export default Vue;