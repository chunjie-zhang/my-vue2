import { parseHTML } from './parseAst';
import { generate } from './generate';

export function compileToFunction (el) {
  // console.log('=====compileToFunction', el);

  // 1 将html变为ast语法树
  let ast = parseHTML(el)
  // console.log('=========ast', ast);

  /**
   * 2 ast语法树变为 render 函数：
   * （1） ast语法树变为字符串
   * （2）字符串变为render函数
   * 
   * <div id="app"><div class="container">{{ msg }}</div><h1>Vue</h1></div>
   * 
   * render() { _c 解析标签 _v解析文本 _s解析data数据
   *   return  _c('div', {id: 'app'}, ‘’， _c('div', {class: 'container'}, _s(msg), _c('h1', '', _v(Vue))))
   * }
   * 
  */
  // 2(1) ast语法树变为 render 字符串
  let code = generate(ast);

  // 2(2) render字符串 变为render函数  https://zhuanlan.zhihu.com/p/97850060
  // 生成代码 (模板引擎的实现原理就是 with + new Function)  with会从传进来的参数里取值,这里的this是调用者  关闭严格模式才能用with  
  let render = new Function(`with(this){return ${code}}`);
  
  return render;
}

// with (vm) {
    // 传this,则vm的属性会给this
    // name => this.name => vm.name => vm.data.name
//     // 此时,name就是vm.name
// log name
// }