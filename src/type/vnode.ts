
export enum VNodeType {
    ELEMENT = 1, // 元素节点
    TEXT = 3, // 文本节点
    COMMENT = 8, // 注释节点
}

// 虚拟节点
export interface VNode {
    tag: string,
    attrArr: Array<object>,
    children:Array<VNode>,
    text:string,
    comment:string
}