
import { log, no, makeMap } from '../../core/util/index'


const ncname = '[A-Za-z_][\\w.\\-]*', // 基本的名称正则
    qnameCapture = `((?:${ncname}:)?${ncname})`, // 捕获名称
    startTagOpen = new RegExp(`^<${qnameCapture}`), // 开始标签的开始
    startTagClose = /^\s*(\/?)>/, // 开始标签的闭合
    endTag = new RegExp(`^<\\/${qnameCapture}>`), // 结束标签
    attribute = /^\s*([^\s"'<>=\/]+)(?:\s*(=)\s*(?:"([^"]*)"|'([^']*)'|([^\s"'<>=`]+)))?/, // 属性
    dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|#|:)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"|'([^']*)'|([^\s<>"'=`]+)))?/, // 动态属性
    doctype = /^<!DOCTYPE [^>]+>/i, // 文档模式
    comment = /^<!--/, // 注释
    conditionalComment = /^!\[/; // 条件注释

export const isPlainTextElement = makeMap('script,style,textarea', true);

const regCache = {}; // 正则缓存

// 解码的映射
const decodeMap = {
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&amp;': '&',
    '&#39;': "'",
    '&#9;': '\t',
    '&#10;': '\n',

},

    encodeAttr = /&(lt|gt|quot|amp|#39);/g, // 编码字符

    encodeAttrWithNewLine = /&(lt|gt|quot|amp|#39|#9|#10);/g; // 编码换行符

// 解码属性
function decodeAttr(value, shouldDecodeNewLines) {
    const reg = shouldDecodeNewLines ? encodeAttrWithNewLine : encodeAttr;

    return value.replace(reg, match => decodeMap[match]);

}

/**
 * @description 解析HTML字符模板
 * 
 * @param {String} html HTML模板
 * @param {Object} options
 * @param {Function} options.start 解析到标签开始位置触发
 * @param {Function} options.end 解析到标签结束位置触发
 * @param {Function} options.chars 解析到文本触发
 * @param {Function} options.comment 解析到注释触发
 * @param {Boolean} options.shouldKeepComment 是否保留注释
 * @param {Function} options.isUnaryTag 判断标签是否是自闭合标签
 * @param {Boolean} options.shouldDecodeNewlines 处理attr中换行符
 * @param {Boolean} options.shouldDecodeNewlinesForHref 处理a标签中href的换行符
 * 
 * 
 */
export function parseHTML(html, options) {
    const stack = [],
        isUnaryTag = options.isUnaryTag || no;

    let lastTag = null, // 当前解析最后一个标签名
        index = 0; // 当前HTML模板解析下标
    while (html) {
        // 确保不在纯文本中
        if (!lastTag || !isPlainTextElement(lastTag)) {

            // debugger;
            let textEndIndex = html.indexOf('<');
            if (textEndIndex === 0) {

                // 解析注释
                if (comment.test(html)) {
                    const commentEndIndex = html.indexOf('-->');
                    if (commentEndIndex >= 0) {
                        advance(commentEndIndex + 3);
                        if (options.shouldKeepComment) {
                            options.comment(html.substring(4, commentEndIndex));
                        }
                        continue;
                    }
                }

                // 解析条件注释
                if (conditionalComment.test(html)) {
                    const endInedx = html.indexOf(']>');
                    advance(endInedx + 2);

                    continue;
                }

                // 解析DOCTYPE
                const doctypeMatch = html.match(doctype);
                if (doctypeMatch) {
                    advance(doctypeMatch);
                    continue;
                }

                // 解析结束标签
                const endTagMatch = html.match(endTag);
                if (endTagMatch) {
                    const startIndex= index;
                    advance(endTagMatch);
                    parseEndTag(endTagMatch[1],startIndex,index);
                    continue;
                }

                // 解析开始标签
                const startTagMatch = parseStartTag();
                if (startTagMatch) {
                    handleStartTag(startTagMatch); // start钩子函数回调
                    continue;
                }
            }

            let text = ''; // 文本
            if (textEndIndex >= 0) {
                text += html.substring(0, textEndIndex);
                advance(textEndIndex);
                while (!(endTag.test(html) || startTagOpen.test(html) || comment.test(html) || conditionalComment.test(html))) {
                    textEndIndex = html.indexOf('<', 1);
                    if (textEndIndex < 0) {
                        text += html;
                        html = '';
                        break;
                    }

                    text += html.substring(0, textEndIndex);
                    advance(textEndIndex);
                }

                options.chars?.(text);

            }

            if (textEndIndex < 0) {
                text += html;
                html = '';
                options.chars?.(text);

            }
        } else {
            const stackedTag = lastTag.toLowerCase(),
                stackedTagReg = regCache[stackedTag] || (regCache[stackedTag] = new RegExp(`([\\s\\S]*?)(</${stackedTag}[^>]*>)`, 'i'));

            let start = index;
            html = html.replace(stackedTagReg, function (all, text, endTag) {
                options.chars?.(text);
                index += text.length + endTag.length;
                return '';
            });

            parseEndTag(stackedTag, start, index);
        }


    }

    // 根据匹配结果或截取长度更新html
    // 推进解析进度
    function advance(match) {
        let len;
        if (typeof match === 'number') {
            len = match;
        } else {
            len = match[0].length;
        }

        if (len) {
            index += len;
            html = html.substring(len);
        }
    }

    /**
     * @description  解析开始标签处理
     * 
     * @returns {Object} 解析后的标签对象
     */
    function parseStartTag() {


        // 获取标签名字
        const startTag = html.match(startTagOpen);
        if (!startTag) return;

        const matchObj = {
            tagName: startTag[1],
            attrs: [],
            unarySlash: '', // 判断是否是自闭合标签
            start: index, // 记录开始坐标
        }
        advance(startTag);


        // 获取属性
        let attr, end;

        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            matchObj.attrs.push(attr);
            advance(attr)
        }

        if (!end) return;

        matchObj.unarySlash = end[1],
            advance(end),
            matchObj.end = index; // 记录结束坐标


        return matchObj;



    }

    /**
     * @description 解析结束标签处理
     * 
     * @param {String} tagName 标签名称
     */
    function parseEndTag(tagName, start, end) {
        // debugger
        let current
        for (current = stack.length - 1; current >= 0; current--) {
            const node = stack[stack.length - 1];
            if (node.lowerCasedTag === tagName.toLowerCase()) {
                break;
            }
        }

        if (current >= 0) {

            for (let i = stack.length - 1; i >= current; i--) {

                options.end?.(stack[i].tag, start, end);
            }
        } else {
            current = 0;
        }


        stack.length = current;

        lastTag = stack[stack.length - 1]?.tag || '';
    }

    /**
     * @description 开始标签解析后的回调处理
     */
    function handleStartTag(match) {
        const { tagName, unarySlash, attrs, start, end } = match,
            isUnary = isUnaryTag(unarySlash) || !!unarySlash;

        const len = attrs.length,
            attrsArr = new Array(len);
        for (let i = 0; i < len; i++) {
            let item = attrs[i],
                value = item[3] || item[4] || item[5] || '',
                shouldDecodeNewLines = tagName === 'a' && item[1] === 'href' ?
                    options.shouldDecodeNewLinesForHref : options.shouldDecodeNewLines; // 是否解析换行符

            attrsArr[i] = {
                name: item[1],
                value: decodeAttr(value, shouldDecodeNewLines),
            }
        }

        if (!isUnary) {
            stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrsArr })
            lastTag = tagName;
        }
        options.start(tagName, attrsArr, isUnary, start, end);
    }
}


