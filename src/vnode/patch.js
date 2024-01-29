export function patch(oldVnode, vnode) {
  // console.log(oldVnode, vnode);
  // vnode => 真实dom
  // 创建新dom
  let el = createEl(vnode);
  // console.log('=======el', el);
  // (2) 替换 （1）获取父节点 (2) 插入 (3) 删除
  let parentEl = oldVnode.parentNode;
  parentEl.insertBefore(el, oldVnode.nextsibling);
  parentEl.removeChild(oldVnode);
  return el;
}

// 创建 真实dom
function createEl(vnode) {
  let { tag, children, key, data, text } = vnode;
  if (typeof tag === 'string') { // 标签
    vnode.el = document.createElement(tag); // 创建元素
    if (children.length > 0) { // 有子集
      children.forEach(child => {
        vnode.el.appendChild(createEl(child))
      });
    }
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}