

const ncname = /[A-Za-z_][\w.\-]/; // 基本的名称正则
qnameCapture = `((?:${ncname}:)?${ncname})`, // 捕获名称
startTagOpen = new RegExp(`^<${qnameCapture}`), // 开始标签的开始
startTagClose = /^\s*(\/?)>/, // 开始标签的闭合
endTag = new RegExp(`^<\\/${qnameCapture}>`), // 结束标签
attribute = /^\s*([^\s"'<>=\/]+)(?:\s*(=)\s*(?:"([^"]*)"))/, // 属性
doctype = /^<!DOCTYPE [^>]+>/i, // 文档模式
comment = /^<!--/; // 注释

/**
 * @description 解析HTML字符模板
 * 
 * @param {String} html HTML模板
 * @param {Object} options
 * @param {Function} options.start 解析到标签开始位置触发
 * @param {Function} options.end 解析到标签结束位置触发
 * @param {Function} options.chart 解析到文本触发
 * @param {Function} options.comment 解析到注释触发
 */
export function parseHTML(html,options){
    const startReg = /<[\w]+?>/;
    while(html){
        
    }

}