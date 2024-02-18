import Watcher from "./observe/watcher";
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
  // 调用beforeMount生命周期
  callHook(vm, 'beforeMount');
  // 挂载组件
  // （1）vm._render 将render函数变为vnode
  // （2）vm._update将vnode变为真实dom放到页面
  let updateComponent = () => {
    vm._updata(vm._render())
    console.log('=======updateComponent');
  }
  // 每个组件添加watcher
  new Watcher(vm, updateComponent, () =>{}, true);

  // 调用mounted生命周期
  callHook(vm, 'mounted');
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
    // console.log('=======vnode', vnode);
    let vm = this;
    
    // 两个参数 (1) 旧dom (2) vnode
    vm.$el = patch(vm.$el, vnode);
  }
}

/**
 * 生命周期调用
 *
 * @export
 * @param {*} vm
 * @param {*} hook
 */
export function callHook(vm, hook) {
  const handlers = vm.$options[hook];
  if (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      // 改变生命周期的this指向问题
      handlers[i].call(this)
    }
    // console.log('======this', hook, this);
  }
}