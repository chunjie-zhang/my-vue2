/**
 * data有多少个属性被劫持就有多个dep，在数据劫持的时候通知watcher更新数据
 * 
 * @class Dep
 */
let id = 0;
class Dep {
  constructor() {
    this.id = id++;
    this.subs = [];
  }
  // 收集watcher
  depend() {
    // 希望watcher可以存放dep, 双向记忆
    // this.subs.push(Dep.target);
    Dep.target.addDep(this)
  }
  // 收集watcher
  addSub(watcher) {
    this.subs.push(watcher);
  }
  // 更新watcher
  notify() {
    this.subs.forEach(watcher => {
      watcher.update();
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

export default Dep;