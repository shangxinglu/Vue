import { parseHTML } from './html-parser'



/**
 * @description 将HTML字符串转为AST
 * 
 * @param {String} template HTML字符串模板
 * @param {Object} options 选项数据
 */
export function parse(template, options) {
    const stack = [];
    let currentParent = null; // 当前父级元素


    // 关闭节点
    function closeElement(el) {

    }

    parseHTML(template, {
        start(tagName, attrs, isUnary) {
            const el = createASTElement(tagName, attrs, currentParent);
            if (!isUnary) {
                currentParent = el;
                stack.push(el);
            }
        },

        end(tag) {
            const el = stack.pop();
            currentParent = stack[stack.length - 1];
            closeElement(el);
        },

        chars() {

        },

        comment() {

        }
    })
}

/**
 * @description  创建AST元素
 * 
 * @param {String} tag 标签名
 * @param {Array} attrs 属性数据
 * @param {Object} parent 父级元素
 * 
 * @returns {Object}
 */
export function createASTElement(tag, attrs, parent) {
    return {
        type: 1,
        parent,
        tag,
        attrsList: attrs,
        children: []

    }
}
