import { mergeOptions } from "../utils/index";

export function initGlobalApi (Vue) {
  Vue.options = {};
  Vue.mixin = function (mixin) {
    // 源码
    // Vue.options = { created: [a, b, c], watch: [a,b,c]}
    this.options = mergeOptions(this.options, mixin)
    console.log('======mergeField', this.options);
  }
}