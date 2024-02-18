import { observer } from "./observe/index";
import { nextTick } from "./utils/nextTick";

/*
 * @Author: zhangchunjie8 zhangchunjie8@jd.com
 * @Date: 2023-08-04 16:50:30
 * @LastEditors: zhangchunjie8 zhangchunjie8@jd.com
 * @LastEditTime: 2023-08-08 21:38:57
 */
export function initState(vm) {
  let opts = vm.$options;
  // 判断
  if(opts.props) {
    initProps();
  }
  if(opts.data) {
    initData(vm);
  }
  if(opts.computed) {
    initComputed();
  }
  if(opts.watch) {
    initWatch();
  }
  if(opts.methods) {
    initMethods();
  }
}

function initProps() {}

function initComputed() {}

function initWatch() {}

function initMethods() {}

/**
 * vue2对data初始化
 * data可能是对象、函数
 * @param {*} vm 
 */
function initData(vm) {
  let data = vm.$options.data;

  // 如果data是函数形式，函数内的this应该指向vue实例，不然就是window
  data = vm._data = typeof data === 'function' ? data.call(vm) : data;

  // 将data上的所有属性代理到实例上vm
  for (const key in data) {
    proxy(vm, '_data' ,key)
  }

  // data数据进行劫持,data对象的value可能是对象，也可能是数组，也可能是原始类型
  observer(data);
}

function proxy (vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(newVal) {
      vm[source][key] = newVal;
    }
  })
}

// 
export function stateMixin(Vue) {
  // 通常用于数据更新后获取最新的dom
  Vue.prototype.$nextTick = function (cb) {
    nextTick(cb);
  }
}