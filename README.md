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