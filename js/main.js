

var css1 = `/* 
 * 面试官你好，我是张帆
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */

*{
  transition: all 1s;
}
html{
  background: #eee;
}
#code{
  border: 1px solid #aaa;
  padding: 16px;
}

/* 我需要一点代码高亮 */

.token.selector{ color: #690; }
.token.property{ color: #905; }

/* 加一个呼吸效果 */

#code{
  animation: breath 0.5s infinite alternate-reverse;
}

/* 现在正式开始 */

/* 我需要一张白纸 */

#code-wrapper{
  width: 50%; left: 0; position: fixed; 
  height: 100%;
}

#paper > .content {
 display: block;
}

/* 于是我就可以在白纸上写字了，请看右边 */
`

var css2 = `
/* 接下来用一个库 marked.js
 * 把 Markdown 变成 HTML
 */



`
var md = `
## 自我介绍

我叫 张帆，
1992 年 6 月出生，
大连交通大学毕业，
自学前端一年，
希望应聘贵司的前端开发岗位

## 技能介绍

熟悉 JavaScript / HTML / CSS(3) / Vue.js / webpack打包 / NPM 发布与管理 等等前端技术
并热衷不断探索新知识、新领域。

## 项目介绍

1.[《用 Vue 仿 CNode 社区》](https://zhangfan4132.github.io/CNode/dist/)

2.[《jQuery 仿<NetEase>网易云音乐》](http://www.fan-zh.com/)

3.[《canvas画板》](https://zhangfan4132.github.io/Canvas-board-Mobile-/)

4.[《会动的简历》](https://zhangfan4132.github.io/animating-resume/)

5.[《手机端豆瓣展现》](https://zhangfan4132.github.io/Mobile-Douban/)

## 联系方式

- 手机: 18851706206
- QQ: 413273029
- Email: 413273029@qq.com



`
let css3 = `
/*
 * 这就是我的会动的简历
 * 谢谢您抽出宝贵时间观看！
 */
`

writeCss('', css1, ()=>{ // writeCss call the function
  createPaper(() => {
    writeMarkdown(md, ()=> {
      writeCss(css1, css2, ()=>{
        convertMarkdownToHtml(()=>{
          writeCss(css1 + css2, css3, ()=> {
            console.log('完成')
          })
        })
      })
    })
  })
})

/*把code写到#code和style标签里*/
function writeCss(prefix, code, fn){
  let domCode = document.querySelector('#code')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
    styleTag.innerHTML = prefix +  code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight
    if (n >= code.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 70)
}

function writeMarkdown(markdown, fn){
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 35)
}

function createPaper(fn){
  var paper = document.createElement('div') 
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn && fn.call()
}

function convertMarkdownToHtml(fn){
  var div = document.createElement('div')  
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
}

