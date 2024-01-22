import { patch } from "./vnode/patch";

/**
 * 挂载组件
 * （1）vm._render 将render函数变为vnode
 * （2）vm._update将vnode变为真实dom放到页面
 * 
 * @param {*} vm 
 * @param {*} el 
 */
export function mounteComponent (vm, el) {
  // 
  vm._updata(vm._render())
}

/**
 * 生命周期组件
 * (1) render函数转为vnode
 * (2) vnode转为 真实dom
 * 
 * @export
 * @param {*} vue
 */
export function lifecycleMixin(Vue) {

  Vue.prototype._updata = function (vnode) {
    console.log('=======vnode', vnode);
    let vm = this;
    
    // 两个参数 (1) 旧dom (2) vnode
    vm.$el = patch(vm.$el, vnode);
  }


}