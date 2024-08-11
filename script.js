var editbar = document.getElementById('edit');
var editor = CodeMirror.fromTextArea(editbar, {
    lineNumbers: true,
    mode: 'markdown',
    theme: 'xq-light',
});
var converter = new showdown.Converter({
    tables: true,
    strikethrough: true,
    extensions: [
        showdownKatex({
            // 使用方式见：https://obedm503.github.io/showdown-katex
            // 详细配置见：https://katex.org/docs/options.html
            throwOnError: true, // 公式有错时，是否抛出错误
            displayMode: false, // 如果为false，公式以inline方式渲染
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false },
                { left: '~', right: '~', display: false, asciimath: true },
            ],
        }),
    ],
});
var showbar = document.getElementById('show');
var css = document.getElementById('cssfile');
if (!window.localStorage.getItem('lastText')) window.localStorage.setItem('lastText',
`# 欢迎使用JustMark!
**JustMark** 是一个网页端的Markdown编辑器。

欢迎访问[github仓库](https://github.com/doing1024/justmark)。

欢迎提 PR 或 ISSUE ～`
);
editor.on('change', (codemirrorIns, codemirrorObj) => {
    showbar.innerHTML = converter.makeHtml(editor.getValue());
    var ratio = editbar.scrollTop / editbar.scrollHeight;
    showbar.scrollTop = showbar.scrollHeight * ratio;
    window.localStorage.setItem('lastText',editor.getValue());
});
editor.setValue(window.localStorage.getItem('lastText'));
showbar.innerHTML = converter.makeHtml(editor.getValue());
var todark = function (){        
    css.href = "https://unpkg.com/github-markdown-css@5.6.1/github-markdown-dark.css";
    editor.setOption("theme", "abcdef");
    return false;
};
var tolight = function (){
    css.href = "https://unpkg.com/github-markdown-css@5.6.1/github-markdown-light.css"; 
    editor.setOption("theme","xq-light");
    return true;
};
if (window.localStorage.getItem('isLight') == 'false') document.getElementsByTagName('input')[0].checked = 1,todark();
if (window.localStorage.getItem('isLight') == null) window.localStorage.setItem('isLight','true');
var changeTheme = function (){
    if (window.localStorage.getItem('isLight') == 'true') window.localStorage.setItem('isLight',todark());
    else window.localStorage.setItem('isLight',tolight());
};
