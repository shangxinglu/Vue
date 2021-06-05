
import { log } from '../../core/util/index'


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


/**
 * @description 解析HTML字符模板
 * 
 * @param {String} html HTML模板
 * @param {Object} options
 * @param {Function} options.start 解析到标签开始位置触发
 * @param {Function} options.end 解析到标签结束位置触发
 * @param {Function} options.chart 解析到文本触发
 * @param {Function} options.comment 解析到注释触发
 * @param {Boolean} options.shouldKeepComment 是否保留注释
 * 
 * 
 */
export function parseHTML(html, options) {
    const stack = [];



    while (html) {
        // debugger;

        // 解析注释
        if (comment.test(html)) {
            const commentEndIndex = html.indexOf('-->');
            if (commentEndIndex >= 0) {
                advance(commentEndIndex + 3);
                if (options.shouldKeepComment) {
                    options.comment(html.substring(4,commentEndIndex));
                }
                continue;
            }
        }

        // 解析条件注释
        if(conditionalComment.test(html)){
            const endInedx = html.indexOf(']>');
            advance(endInedx+2);

            continue;
        }

        // 解析DOCTYPE
        const doctypeMatch = html.match(doctype);
        if(doctypeMatch){
            advance(doctypeMatch);
            continue;
        }

        // 解析结束标签
        const endTagMatch = html.match(endTag);
        if (endTagMatch) {
            advance(endTagMatch);
            continue;
        }

        // 解析开始标签
        const startTagMatch = parseStartTag();
        if (startTagMatch) {
            handleStartTag(startTagMatch); // start钩子函数回调
            continue;
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
        if (len) html = html.substring(len);
    }

    /**
     * @description  解析开始标签
     * 
     * @returns {Object} 解析后的标签对象
     */
    function parseStartTag() {


        // 获取标签名字
        const startTag = html.match(startTagOpen);
        if (!startTag) return;

        const matchObj = {
            tagName: startTag[1],
            attr: [],
            unarySlash: '', // 判断是否是自闭合标签
        }
        advance(startTag);


        // 获取属性
        let attr, end;

        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            matchObj.attr.push(attr);
            advance(attr)
        }

        if (!end) return;

        matchObj.unarySlash = end[1];
        advance(end);

        return matchObj;



    }

    /**
     * @description 开始标签解析后的回调处理
     */
    function handleStartTag(match) {
        options.start();
    }
}


