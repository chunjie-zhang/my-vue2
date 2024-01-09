import { parseHTML } from './parseAst';
import { generate } from './generate';

export function compileToFunction (el) {
  console.log('=====compileToFunction', el);

  // 1 将html变为ast语法树
  let ast = parseHTML(el)
  console.log('=========ast', ast);

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

  let code = generate(ast)

}