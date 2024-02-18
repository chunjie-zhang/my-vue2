import { pushTarget, popTarget } from './dep'

let id = 0;

/**
 * (1) 通过这个类watcher实现更新视图
 * 
 * 收集依赖 vue watcher data{ name, msg}
 * dep: dep和data中的属性是一一对应的
 * watcher: data在视图上用几个，就有几个watcher
 * dep和watcher：多对多 dep.name = [w1, w2]
 * 
 * @class
 * @vm vue实例
 * @updateComponent 更新组件
 * @cb 回调函数 - 处理计算属性
 * @options 标识处理渲染的
 * 
 */
class Watcher {

  constructor(vm, updateComponent, cb, options) {
    this.vm = vm;
    this.exprOrfn = updateComponent;
    this.cb = cb;
    this.id = id++;
    this.options = options;
    this.deps = []; // watcher存放dep
    this.depsId = new Set();

    if (typeof updateComponent === 'function') {
      this.getter = updateComponent; // 用来更新视图
    }

    // 更新视图
    this.get();
  }

  /***
   * 1. 去重
   */
  addDep(dep) {
    let id = dep.id;
    if (!this.depsId.has(id)) {
      this.deps.push(dep);
      this.depsId.add(id);
      dep.addSub(this);
    }
  }

  // 初次渲染 在数据劫持get时，进行dep的收集
  get() {
    // 将watcher传给dep，在data响应式get时触发dep的depend方法进行双向绑定
    pushTarget(this);
    // 渲染页面 vm._updata(vm._render())
    this.getter();
    // 双向绑定成功，给dep取消watcher
    popTarget();
  }
  // 在数据更新set时更新视图
  update() {
    this.getter();
  }
}

export default Watcher;