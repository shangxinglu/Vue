import {VNode} from '../../type/vnode'


/**
 * @description 创建虚拟节点
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