class Vue {
}

// DOCTYPE标签
const doctypeReg = /^<!DOCTYPE [^>]+>/i;
// 开始标签开放正则
const startTagOpenReg = /^<([\w\-]+)/;
// 属性正则
const attributeReg = /^[\s]+([(\w\-]+)[\s]*=[\s]*\"([^"]*?)\"/;
// 开始标签闭合正则
const startTagCloseReg = /^[\s]*>/;
// 结束标签
const endTagReg = /^<\/([\w\-]+)>/;
// 注释
const commentReg = /^<!--([\s\S]*?)-->/;
function parseHTML(html, option) {
    let startIndex = 0, endIndex = 0, index = 0;
    // 剪裁html中已经匹配的字符串
    function crop(str) {
        // console.log(str);
        const len = str.length;
        html = html.substring(len);
        startIndex = index;
        index += len;
        endIndex = index;
        // console.log(startIndex,endIndex,index);
    }
    while (html) {
        // DOCTYPE标签
        if (doctypeReg.test(html)) {
            const match = (html.match(doctypeReg));
            crop(match[0]);
            continue;
        }
        // 注释
        if (commentReg.test(html)) {
            const match = (html.match(commentReg.source));
            crop(match[0]);
            option.comment?.(match[1], startIndex, endIndex);
            continue;
        }
        // 开始标签
        if (startTagOpenReg.test(html)) {
            const tagObj = {
                tag: '',
                attrs: []
            };
            const match = (html.match(startTagOpenReg));
            crop(match[0]);
            tagObj.tag = match[1];
            parseTagAttr(tagObj);
            continue;
        }
        // 闭合标签
        if (endTagReg.test(html)) {
            const match = (html.match(endTagReg));
            crop(match[0]);
            option.end?.(match[1], startIndex, endIndex);
            continue;
        }
        /**
         * 以上正则都不满足，则为文本
         */
        if (html.includes('<')) {
            const i = html.indexOf('<');
            const text = html.slice(0, i);
            crop(text);
            option.text?.(text, startIndex, endIndex);
            continue;
        }
        crop(html);
    }
    // 匹配标签属性
    function parseTagAttr(tagObj) {
        while (attributeReg.test(html)) {
            const match = (html.match(attributeReg));
            crop(match[0]);
            const attrObj = {
                name: match[1],
                value: match[2] || ''
            };
            tagObj.attrs.push(attrObj);
        }
        parseTagClose(tagObj);
    }
    // 匹配标签闭合
    function parseTagClose(tagObj) {
        if (startTagCloseReg.test(html)) {
            const match = (html.match(startTagCloseReg));
            crop(match[0]);
            option.start?.(tagObj.tag, tagObj.attrs, startIndex, endIndex);
        }
    }
}

function parse(template) {
    parseHTML(template, {
        start(tag, attrs) {
            console.log('start', tag, attrs);
        },
        end(tag) {
            console.log('end', tag);
        },
        comment(text) {
            console.log('comment', text);
        },
        text(text) {
            console.log('text', text);
        }
    });
}

function compiler(template) {
    parse(template);
}

Vue.compiler = compiler;

export { Vue as default };
//# sourceMappingURL=vue.js.map
