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

// 匹配插值表达式 {{ msg }}
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

/**
 * 对属性进行处理
 * @param {*} attrs 
 * @returns 
 */
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
  // slice(开始,结尾),如果是负数则从末尾开始 这里从0取到-1的字符,去掉了最后一个 ,
  return `{${str.slice(0, -1)}}`
}

/**
 * 解析ast语法树children
 * type 1: 元素 3: 文本
 * @param {*} node
 */
function gen (node) {
  if (node.type === 1) { // 元素
    return generate(node);
  } else { // 文本 （1）文本 （2）插值表达式
    let text = node.text;
    // 如果不是插值表达式
    if (!defaultTagRE.test(text)) {
      // stringify是为了加上'',让传入的值变成字符串
      console.log('=======!defaultTagRE.test(text)', text, JSON.stringify(text));
      return `_v(${JSON.stringify(text)})`
    }
    // 如果是插值表达式
    let tokens = [];
    // 解决先匹配/a/g.test('abs') true 然后匹配 a/g.test('abc') false 因为他的lastIndex变化了，从第二个开始了；需要重置才能正确使用
    let lastIndex = defaultTagRE.lastIndex = 0; // 重置正则匹配的起始位置
    let match;
    while (match = defaultTagRE.exec(text)) {
      //  ['{{ mg }}', ' mg ', index: 14, input: '\n      hello, {{ mg }}\n    ', groups: undefined]
      console.log('========match', match);

      // 匹配到插值表达式的str索引
      let index = match.index;

      // 如果插值表达式前面有文本
      if (index > lastIndex) { 
        // 添加内容 文本类型非插值表达式类型 比如：\n      hello, 
        tokens.push(JSON.stringify(text.slice(lastIndex, index)))
      }
      // 插值表达式的值，比如{{msg}} => msg
      tokens.push(`_s(${match[1].trim()})`);

      // 将lastIndex指向插值表达式后面的索引
      lastIndex = index + match[0].length;

      // 如果插值表达式后面还有文本
      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
      }

      return `_v(${tokens.join('+')})`
    }
  }
}

/**
 * 处理子元素
 * 
 * @param {*} el ast预发树
 * @return {*} 
 */
function genChildren (el) {
  let children = el.children;
  if (children) {
    return children.map(child => gen(child)).join(',')
  }
}

/**
 * 转译ast语法树为string
 * _c 解析标签 _v解析文本 _s解析插值表达式
 * @param {*} el 
 */
export function generate(el) {
  console.log('========generate', el);
  let children = genChildren(el);
  let code = `_c(${el.tag}, ${el.attrs.length ? `${genProps(el.attrs)}` : 'null'}, ${children ? children : 'null'})`
  // =======code _c(div, {class:"container",style:{"color":" red"}}, _v("\n      hello, "+_s(mg)+" 你好。\n    "))
  console.log('=======code', code);
}
