let callback = [];
let pedding = false;

// 防抖处理操作
function flush() {
  callback.forEach(cb => cb());
  pedding = false;
  callback = [];
}

let timerFunc;

// 处理兼容问题
if (Promise) {
  timerFunc = () => {
    Promise.resolve().then(flush); // 异步执行
  }
} else if (MutationObserver) { // h5的异步方法， 他可以监听dom的变化，监控完毕后再来异步更新
  let observe = new MutationObserver(flush);
  let textNode = document.createTextNode(1); // 创建文本节点
  observe.observe(textNode, { characterData: true}) // 观测文本的内容
  timerFunc = () => {
    textNode.textContent = 2;
  }
} else if(setImmediate) {
  timerFunc = () => {
    setImmediate(flush);
  }
}

export function nextTick(cb) {
  // console.log('=======nextTick', cb);
  callback.push(cb);
  if (!pedding) {
    // 异步方法，得处理兼容问题
    timerFunc();
    pedding = true;
  }
}