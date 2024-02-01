import { pushTarget, popTarget } from './dep'

/**
 * 收集依赖 vue watcher data{ name, msg}
 * dep: dep和data中的属性是一一对应的
 * watcher: data在视图上用几个，就有几个watcher
 * dep和watcher：一对多 dep.name = [w1, w2]
 * 
 * @class
 */
let id = 0;

class Watcher {

  constructor(vm, updateComponent, cb, options) {
    this.vm = vm;
    this.exprOrfn = updateComponent;
    this.cb = cb;
    this.id = id++;
    this.options = options;

    if (typeof updateComponent === 'function') {
      this.getter = updateComponent; // 用来更新视图
    }

    // 更新视图
    this.get();
  }

  // 初次渲染
  get() {
    // 将watcher传给dep
    pushTarget(this);
    // 渲染页面
    this.getter();
    // 给dep取消watcher
    popTarget();
  }
  // 更新
  update() {
    this.getter();
  }
}

export default Watcher;