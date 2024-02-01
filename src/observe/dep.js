/**
 *
 *
 * @class Dep
 */
class Dep {
  constructor() {

  }
  // 收集watcher
  depend() {
    this.subs.push();
  }
  // 更新watcher
  notify() {
    this.subs.forEach(watcher => {
      watcher.updata();
    });
  }
}

// 添加watcher
Dep.target = null;
export function pushTarget(watcher) {
  Dep.target = watcher;
}

// 取消watcher
export function popTarget() {
  Dep.target = null;
}