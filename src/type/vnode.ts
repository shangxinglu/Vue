
declare enum VNodeType {
    ELEMENT = 1, // 元素节点
    TEXT = 3, // 文本节点
    COMMENT = 8, // 注释节点
}

// 虚拟节点
declare interface VNode {
    tag: string,
    data: VNodeData,
    children:Array<VNode>|null,
    text:string|null,
    comment:string|null
}


// 虚拟节点attr数据
declare interface VNodeAttr {
    [attrName:string]:string
}


// 虚拟节点数据
declare interface VNodeData {
    attrs?:VNodeAttr
}