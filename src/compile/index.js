/**
 * ast语法树 {} vnode {}
 * <div id="app">{{ msg }}</div>
 * {
 *   tag: 'div',
 *   attr: [{id: 'app}],
 * children: [{tag: null, text: hello}]
 * }
*/

const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;  // 标签名称
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // 处理 <span:xxx></span:xxx>
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的</div>
// 匹配标签属性 app <div id="app">{{ msg }}</div> 
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
// 匹配 {{ msg }}
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

// 开始标签
function startTag() {

}
// 文本
function charts() {

}
// 结束标签
function end() {

}

// 遍历 <div id="app">{{ msg }}</div> 开始标签 文本 结束标签
function parseHTML(html) {
  while(html) { // html为空结束
    // 判断标签<>
    let textEnd = html.indexOf('<');
      if (textEnd === 0) { // 盘判断是否是标签
        // 开始标签
        const startTagMatch = parseStartTag(); // 开始标签的内容
      }
      // 文本
      if (textEnd > 0) {
        // 获取文本内容
        // let text = html.
      }
      break;
  }

  // 获取开始标签
  function parseStartTag() {
    // // 获取开始标签
    const start = html.match(startTagOpen);
    console.log(('=====parseStartTag', start));
    // 创建AST语法树
    let match = {
      tagName: start[1],
      attrs: [],
    }
    // 删除开始标签
    advance(start[0].length);

    // 属性 多个 遍历
    let attr;
    let end;

    while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
      console.log('=======attr', attr);
      match.attrs.push({name: attr[1], value: attr[3] || attr[4] || attr[5]});
      advance(attr[0].length);
    }
    if(end) {
      console.log('======end', end);
      advance(end[0].length);
      return match;
    }
  }

  // 删除开始标签
  function advance(len) {
    html = html.substring(len);
    console.log('=======advance', html); // id="app">{{ msg }}</div>
  }
}


export function compileToFunction (el) {
  console.log('=====compileToFunction', el);

  parseHTML(el)
}