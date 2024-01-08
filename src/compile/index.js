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
const endTagExp = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的</div>
// 匹配标签属性 app <div id="app">{{ msg }}</div> 
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
// 匹配 {{ msg }}
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
// 创建一个AST对象
function createAstElement(tagName, attrs) {
  return {
    
  }
}
// 开始标签
function startTag(tag, attrs) {
  console.log('======startTag', tag, attrs);
}
// 获取文本
function charts(text) {
  console.log('========charts', text);
}
// 结束标签
function endTag(tag) {
  console.log('======endTag', tag);
}

// 遍历 <div id="app">{{ msg }}</div> 开始标签 文本 结束标签
function parseHTML(html) {
  while(html) { // html为空结束
    // 判断是否有标签<>
    let textEnd = html.indexOf('<');
      // 判断是否是开始标签
      if (textEnd === 0) {
        // 开始标签的内容- tagname, attrs
        const startTagMatch = parseStartTag();
        if (startTagMatch) {
          startTag(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }
        // 结束标签
        let endTagMatch = html.match(endTagExp);
        console.log('=======endTagMatch', endTagMatch);
        if (endTagMatch) {
          advance(endTagMatch[0].length);
          endTag(endTagMatch[1]);
          continue;
        }

      }
      // 文本
      let text;
      if (textEnd > 0) {
        // 获取文本内容 {{ msg }}</div>
        text = html.substring(0, textEnd); // {{ msg }}
        console.log('====text', text, html, textEnd);
      }
      // 如果有文本，获取完后删除掉
      if (text) {
        advance(text.length);
        console.log('=====startEndTag', html);
        // 对文本进行处理
        charts(text);
      }
  }

  // 获取开始标签
  function parseStartTag() {
    // // 获取开始标签
    const start = html.match(startTagOpen);
    console.log(('=====parseStartTag', start));

    // 如果没有开始标签就不进行
    if (start) {
      // 创建AST语法树
      let match = {
        tagName: start[1],
        attrs: [],
      }
      // 删除开始标签  id="app">{{ msg }}</div>
      advance(start[0].length);

      // 属性 多个 遍历
      let attr;
      let end;

      while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        console.log('=======attr', attr, html, (html.match(startTagClose)));
        match.attrs.push({name: attr[1], value: attr[3] || attr[4] || attr[5]});
        // 删除开始标签的属性  >{{ msg }}</div>
        advance(attr[0].length);
      }
      if(end) {
        console.log('======end', html, end);
        // 删除开始标签的结束标签  {{ msg }}</div>
        advance(end[0].length);
        return match;
      }
    }
  }

  // 删除HTML字符串
  function advance(len) {
    html = html.substring(len);
    console.log('=======advance', html);
  }
}


export function compileToFunction (el) {
  console.log('=====compileToFunction', el);

  parseHTML(el)
}