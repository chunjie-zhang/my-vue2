/**
 *
 *
 * @export
 * @param {*} Vue
 */
export function renderMixin (Vue) {

  /**
   * 标签
   */
  Vue.prototype._c = function () {

  }

  /**
   *  文本
   */
  Vue.prototype._v = function () {
    
  }

  /**
   * 变量
   */
  Vue.prototype._s = function () {
    
  }

  /**
   * render函数变为vnode
   *
   * @export
   * @param {*} Vue
   */
  Vue.prototype._render = function () {
    let vm = this;
    let render = vm.$options.render;
    let vnode = render.call(this)
    console.log('======vnode', vnode);
  }
}