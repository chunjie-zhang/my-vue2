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
    console.log('数组数据劫持');
    let result = oldArrayProtoMethods[item].apply(this, args);
    return result;
  }
})