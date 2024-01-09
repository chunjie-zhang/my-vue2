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
**/

function genProps (attrs) {
  let str = '';
  // 对象

  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    // {name: 'style', value: 'color: red; font-size: 14px'} 解析为 {style: {color: red, font-size: 14px}}
    if (attr.name === 'style') {
      let obj = {}
      attr.value.split(';').forEach(item => {
        let [key, value] = item.split(':');
        obj[key] = value;
      });
      attr.value = obj;
    }
    // 拼接属性字符串
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0, -1)}}`
}

export function generate(el) {
  console.log('========generate', el);
  let code = `_c(${el.tag}, ${el.attrs.length ? `${genProps(el.attrs)}` : 'null'}`
  console.log('=======code', code);
}
