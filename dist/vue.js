class Vue {
}

// DOCTYPE标签
const doctypeReg = /^<!DOCTYPE [^>]+>/i;
// 开始标签开放正则
const startTagOpenReg = /^<([\w\-]+)/;
// 属性正则
const attributeReg = /^[\s]+([(\w\-]+)[\s]*=[\s]*\"([^"]*?)\"/;
// 自闭和标签正则
const unaryReg = /^\s+\/>/;
// 开始标签闭合正则
const startTagCloseReg = /^[\s]*>/;
// 结束标签
const endTagReg = /^<\/([\w\-]+)>/;
// 注释
const commentReg = /^<!--([\s\S]*?)-->/;
function parseHTML(html, option) {
    let startIndex = 0, endIndex = 0, index = 0;
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
            if (['', '\n'].includes(text))
                continue;
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
            option.start?.(tagObj.tag, tagObj.attrs, false, startIndex, endIndex);
        }
        if (unaryReg.test(html)) {
            option.start?.(tagObj.tag, tagObj.attrs, true, startIndex, endIndex);
        }
    }
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
}

var VNodeType;
(function (VNodeType) {
    VNodeType[VNodeType["ELEMENT"] = 1] = "ELEMENT";
    VNodeType[VNodeType["TEXT"] = 3] = "TEXT";
    VNodeType[VNodeType["COMMENT"] = 8] = "COMMENT";
})(VNodeType || (VNodeType = {}));

/**
 * @description 创建抽象语法树节点
 */
function createASTElement(tag, attrs, parent) {
    return {
        type: VNodeType.ELEMENT,
        tag,
        attrs,
        children: [],
        parent,
    };
}
// 创建抽象文本节点
function createASTText(text) {
    return {
        type: VNodeType.TEXT,
        text,
    };
}
function parse(template) {
    const stack = [];
    parseHTML(template, {
        start(tag, attrs, isUnary) {
            console.log('start', tag, attrs);
            const currentNode = stack[stack.length - 1] || null;
            const newNode = createASTElement(tag, attrs, currentNode);
            stack.push(newNode);
            if (!currentNode) {
                if (isUnary) {
                    stack.pop();
                }
                return;
            }
            currentNode.children.push(newNode);
            if (isUnary) {
                stack.pop();
            }
        },
        end(tag) {
            console.log('end', tag);
            stack.pop();
        },
        // comment(text){
        //    console.log('comment',text);
        // },
        text(text) {
            console.log('text', text);
            const currentNode = stack[stack.length - 1] || null;
            if (!currentNode)
                return;
            const newNode = createASTText(text);
            currentNode.children.push(newNode);
        }
    });
    return stack;
}

function compiler(template) {
    const ast = parse(template);
    console.log('ast', ast);
}

Vue.compiler = compiler;

export { Vue as default };
//# sourceMappingURL=vue.js.map
