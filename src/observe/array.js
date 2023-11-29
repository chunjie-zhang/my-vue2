// 重写数组

// 1. 获取原来的数组方法
let oldArrayProtoMethods = Array.prototype;

// 2. 继承
export let ArrayMethods = Object.create(oldArrayProtoMethods);

// 劫持方法list,这些会对原来的数组进行操作，需要改写，其他的如slice、map是生成新数组不需要
let methods = [
  'push',
  'pop',
  'unshift',
  'shift',
  'splice',
];

methods.forEach((item) => {
  ArrayMethods[item] = function (...args) {
    let result = oldArrayProtoMethods[item].apply(this, args);
    // 数组追加对象的情况 arr.push({e: 6})
    let inserted; // 拿到要追加的数据
    switch (item) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.splice(2);
    }
    let ob = this.__ob__;
    if (inserted) {
      ob.observerArray(inserted); // 对添加的对象进行劫持
    }
    return result;
  }
})