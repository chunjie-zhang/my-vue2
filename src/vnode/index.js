// 将render函数变为vnode
/**
 *
 * @export
 * @param {*} Vue
 */
export function renderMixin (Vue) {

  /**
   * 标签
   */
  Vue.prototype._c = function () {
    // console.log('=======_c', ...arguments);
    return createElement(...arguments)
  }

  /**
   *  文本
   */
  Vue.prototype._v = function (text) {
    return createText(text);
  }

  /**
   * 变量
   */
  Vue.prototype._s = function (val) {
    return val == null ? '' : (typeof val === 'object') ? JSON.stringify(val) : val;
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
    // 这个时候data的数据和需要的函数都在vm的实例上，根据with的作用域可以直接拿到使用
    let vnode = render.call(this)
    return vnode;
  }
}

/**
 * 创建vnode
 * @param {*} tag 标签
 * @param {*} data 数据
 * @param {*} key key
 * @param {*} children 子集
 * @param {*} text 文本
 */
function vnode (tag, data, key, children, text) {
  return {
    tag,
    data,
    key,
    children,
    text
  }
}

/**
 * 创建元素
 *
 * @param {*} tag
 * @param {*} [data={}]
 * @param {*} children
 * @return {*} 
 */
function createElement(tag, data={}, ...children) {
  return vnode(tag, data, data.key, children);
}

/**
 * 创建文本
 *
 * @param {*} text
 * @return {*} 
 */
function createText(text) {
  return vnode(undefined, undefined, undefined, undefined, text);
}
