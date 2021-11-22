

// 虚拟节点
export interface VNode {
    tag: string,
    attrArr: Array<object>,
    children:Array<VNode>,
    text:string,
    comment:string
}