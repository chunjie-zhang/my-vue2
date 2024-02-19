import { nextTick } from '../utils/nextTick';
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

  run() {
    this.get();
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
    // 注意: 不要数据更新后每次都调用get 方法
    queueWatcher(this);
  }
}

// 将需要批量更新的watcher存放到一个队列中
let queue = [];
// 存放watcher的id
let has = {};
// 是否已经执行过
let pedding = false;

// 列队处理的操作
function finishWatcher() {
  queue.forEach((item) => {
    // 更新视图
    item.run();
    // updated生命周期执行
    item.cb();
  })
  queue = [];
  has = {};
  pedding = false;
}

/**
 * 队列处理，解决多次重复更新的问题
 * @param {*} watcher 
 */
function queueWatcher(watcher) {
  let id = watcher.id; // 每个组件都是同一个id
  if (!has[id]) {
    // 队列处理
    has[id] = true;
    queue.push(watcher);
    // 防抖处理
    if (!pedding) {
      // setTimeout(() => {
        // queue.forEach((item) => item.run())
        // queue = [];
        // has = {};
        // pedding = false;
      // }, 0)
      nextTick(finishWatcher); // nextTick相当于定时器
    }
    pedding = true;
  }
}

export default Watcher;