import {VNode} from '../../type/vnode'




/**
 * @description 创建虚拟节点
 * 
 * @param tag {string} 标签名
 * @param attrArr {Array<object>} 属性数组
 * @param children {Array<VNode>} 子节点数组
 * @param text {string} 文本 
 * @param comment {string} 注释
 * @returns 
 */
export function createVNode(tag:string,attrArr:Array<object>,children:Array<VNode>,text:string,comment:string):VNode{
    return {
        tag,
        attrArr,
        children,
        text,
        comment
    }
}