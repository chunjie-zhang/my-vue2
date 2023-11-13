/*
 * @Author: zhangchunjie8 zhangchunjie8@jd.com
 * @Date: 2023-08-08 21:30:03
 * @LastEditors: zhangchunjie8 zhangchunjie8@jd.com
 * @LastEditTime: 2023-08-09 10:10:08
 */

export function observer(data) {
  console.log('====observer', data);
  // 判断如果不是对象或者是null直接返回
  if (typeof data !== "object" || data === null) {
    return data
  }

  // 如果是一个对象，进行数据劫持
  return new Observer(data);
}

/**
 * 对数据进行劫持
 * vue2 使用 Object.defineProperty 对数据进行劫持
 * 缺点：只能对对象的某个属性进行数据劫持，不能对整个对象进行数据劫持，不能监听到对象的push、pop等api操作变化
 * 解决方案：new Proxy()
*/
class Observer {
  constructor(data) {
    this.walk(data);
  }
  /**
   * 遍历对象属性
   * @param {*} value 
   */
  walk(data) {
    let keys = Object.keys(data);
    for (let index = 0; index < keys.length; index++) {
      // 对对象的每一个属性进行劫持
      let key = keys[index];
      let value = data[key];
      defineReactive(data, key, value)
    }
  }
}

// 对对象中的属性进行劫持
function defineReactive (data, key, value) {
  // 深度代理
  observer(value);

  Object.defineProperty(data, key, {
    get() {
      console.log('=======获取');
      return value;
    },
    set(newVal) {
      if (newVal === value) return;
      /**
       * 处理：
       * 1. 一开始是原始值，后面变成了引用值的情况 
       * 2. {a: {b: 1}, c: 2} -> {a: {c: 2}, c: 2}
      */
      observer(newVal)

      value = newVal;
    }
  })
}

/**
 * 总结：
 * 1. Object.defineProperty 有缺点 只能对对象的一个属性进行劫持
 * 2. 遍历， 只能对对象的第一层进行劫持
 * 3. 需要递归对对象的深度属性进行劫持
 * 4. get set
*/
