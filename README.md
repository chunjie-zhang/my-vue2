<!--
 * @Author: zhangchunjie8 zhangchunjie8@jd.com
 * @Date: 2023-08-03 21:26:25
 * @LastEditors: zhangchunjie8 zhangchunjie8@jd.com
 * @LastEditTime: 2023-08-03 21:26:48
-->
# 手写vue2框架
vue框架执行流程

vue初始化渲染 -> 先初始化数据 -> 将模板进行编译 -> 变成render() -> 生成虚拟节点 -> 变成真实DOM -> 放到页面上

## 1.初始化数据
将data的数据进行劫持，响应式

## 2.vue模版编译
template render el 
注意：el必须要有；

1. 有render执行render
2. 无render找template，template编译为render函数执行；
3. 无template用el.outerHTML编译为temlpate在编译为render然后执行

![编译流程图片](https://cdn.jsdelivr.net/gh/chunjie-zhang/common-drawing-bed@dev/xxx/lifecycle.67er4mv42ac0.webp)

## 3.vue的生命周期
(1) Vue.mixin() // 混入
(2) 设计模式 发布订阅 vue options:{data: [], watch:[]}

## 4.依赖收集&自动更新
自动更新：
1. 数据变化，自动更新视图 vm._updata(vm._render())
2. vue中更新组件策略是：以组件为单位，给每一个组件添加一个watcher，属性变化后，调用这个watcher

对象依赖收集：
1. dep和watcher关系 多对多 computed

数组依赖收集：
思路：
1. 我们要给所有的对象类型增加一个dep []
2. 获取数组的值，会调用get方法，我们希望让当前数组这个渲染的watcher
  2.1 需要获取当前的dep
  2.2 当前面对数组取值的时候，我们就让数组的dep记住这个watcher
3. 我们获取更新数组的时候push等，找到我们这个watcher进行更新

### 4.1 队列处理
解决数据多次修改多次自动更新的问题,期望多次修改只更新一次。
批量处理 vue异步更新视图 数据更新后不会马上执行。

## 5. nextTick
$nextTick和数据更新的异步操作是一个方法，nextTick.主要就是防抖基本操作

## 6. watch
最终是$watch方法实现的 - 实现$watch方法 就是 new Watcher - 渲染走渲染watcher, $watch 走 watcher user = false
watch基本使用方法：

1. 属性：方法
```js
watch: {
  a: (newVal, oldVal) => {
    console.log(newVal);
  }
}
```
2. 属性：数组
```js
watch: {
  a: [
    (newVal, oldVal) => {
    console.log(newVal);
    },
    (newVal, oldVal) => {
      console.log(newVal);
    }
  ]
}
```
3. 属性：对象
```js
watch: {
  a: {
    handler:  (newVal, oldVal) => {
      console.log(newVal);
    },
    immediate: true,
    deep: true
  }
}
```
4. 属性：字符串
```js
methods: {
  aa: () => {
    console.log(1111);
  }
},
watch: {
  a: 'aa'
}
```


