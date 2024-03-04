import { observer } from "./observe/index";
import Watcher from "./observe/watcher";
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
  if (opts.props) {
    initProps(vm);
  }
  if (opts.data) {
    initData(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
  if (opts.methods) {
    initMethods(vm);
  }
}

function initProps() {}

function initComputed() {}

function initWatch(vm) {
  let watch = vm.$options.watch;
  console.log('======watch', watch)
  // 获取watch监听的值
  for (let key in watch) {
    let handler = watch[key]; // 数组、对象、函数、字符串
    if (Array.isArray(handler)) { // 数组情况
      handler.forEach((item) => {
        createWatcher(vm, key, handler);
      })
    } else { // 对象、函数、字符串
      // 3. 创建一个方法来处理
      createWatcher(vm, key, handler)
    }
  }
}

function initMethods(vm) {
  // 代理methods到实例上
  let methods = vm.$options.methods;

  methods = vm._methods = methods;

  for (const key in methods) {
    proxy(vm, '_methods' ,key)
  }
}

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

/**
 * 将data数据放到vm上-this
 * @param {*} vm 
 * @param {*} source 
 * @param {*} key 
 */
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

/**
 *vm.$watch(() => return 'a') // 返回的值就是 watcher上的属性 user = false
 *
 * @param {*} vm 实例
 * @param {*} exprOrfn watch监听的属性
 * @param {*} handler 变化后执行的东西
 * @param {*} options 
 */
function createWatcher(vm, exprOrfn, handler, options) {
  // 处理hander
  if (typeof handler === 'object') {
    options = handler; // 用户的配置
    handler = handler.handler // 执行函数
  }

  if (typeof handler === 'string') {
    handler = vm[handler]; // 将实例上的方法作为handler, 方法代理和data一样
  }

  // 其他是函数
  // watch 最终处理 $watch 这个方法
  return vm.$watch(exprOrfn, handler, options)
}

// 
export function stateMixin(Vue) {
  // 通常用于数据更新后获取最新的dom
  Vue.prototype.$nextTick = function (cb) {
    nextTick(cb);
  }
  // 针对watch进行处理
  Vue.prototype.$watch = function (exprOrfn, handler, options={}) {
    console.log('======$watch', exprOrfn,handler, options)
    /***
     * 实现watch方法 就是 new Watcher - 渲染走渲染watcher $watch 走 watcher user = false 核心是Watcher
     * 
     * options的user标识是否是用户调用的
     */
    let watcher = new Watcher(this, exprOrfn, handler, {...options, user: true});
    if (options?.immediate) { // 如果有immediate，就立即执行
      handler.call(this);
    }
  }
}