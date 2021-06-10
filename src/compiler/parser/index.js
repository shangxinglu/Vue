import { parseHTML } from './html-parser'
import {parseText} from './text-parser'
import {log,cached} from '../../core/shared/util'




/**
 * @description 将HTML字符串转为AST
 * 
 * @param {String} template HTML字符串模板
 * @param {Object} options 选项数据
 */
export function parse(template, options) {
    const stack = [];
    let root = null; // 根节点
    let currentParent = null; // 当前父级元素


    // 关闭节点
    function closeElement(el) {
        // debugger
        trimEndingWhitespace(el);

        // 构建父子节点关系
        if (currentParent && !el.forbidden) {
            currentParent.children.push(el),
                el.parent = currentParent;
        }

    }

    // 去除尾随的空白文本节点
    function trimEndingWhitespace(el) {
        let lastNode = null;

        let { children } = el;
        // let tmp = children[children.length - 1];
        // debugger

        while ((lastNode = children[children.length - 1]) && lastNode.type === 3 && lastNode.text === '') {
            children.pop();
        }
    }

    parseHTML(template, {
        start(tagName, attrs, isUnary,start,end) {
            log('start',tagName,start,end);
            const el = createASTElement(tagName, attrs, currentParent);

            // 判断禁止标签
            if (isForbiddenTag(el)) {
                el.forbidden = true;
            }

            if (!root) {
                root = el;
            }

            if (!isUnary) {
                currentParent = el;
                stack.push(el);
            } else {
                // debugger
                closeElement(el);
            }
        },

        end(tag,start,end) {
            log('end',tag,start,end);

            const el = stack.pop();
            currentParent = stack[stack.length - 1];
            closeElement(el);
        },

        chars(text) {
            log('text',text);
            const textParse = parseText(text);
            log(textParse);
        },

        comment(text) {
            if (currentParent) {
                const el = {
                    type: 3,
                    text,
                    isComment: true,
                };
                currentParent.children.push(el);
            }

        }
    })

    return root;
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


// 判断是否是禁止的标签
function isForbiddenTag(el) {
    const { tag } = el;
    return (tag === 'style' || tag === 'script');
}