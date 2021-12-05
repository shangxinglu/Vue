
/**
 * @description 虚拟节点
 * 
 * @param tag {string} 标签名
 * @param data {VNodeData} 节点数据
 * @param children {Array<VNode>} 子节点数组
 * @param text {string} 文本 
 * @param comment {string} 注释
 * @returns 
 */
export default class VNode {
    tag?:string;
    data?:VNodeData;
    children?:Array<VNode>;
    text?:string|Empty;
    comments?:string|Empty;

    constructor(tag?:string,data?:VNodeData,children?:Array<VNode>,text?:string|Empty,comment?:string|Empty){
        this.tag = tag;
        this.data = data;
        this.children = children;
        this.text = text;
        this.comments = comment;
    }
}

// 创建一个空节点
export const createEmptyNode = ():VNode => {
    return new VNode();
}

// 创建一个文本节点
export const createTextNode = (text:string):VNode => {
    return new VNode('',{},[],String(text));
}

// // 创建一个注释节点
// export const createCommentNode = (comment:string):VNode => {
//     return new VNode('',{},[],undefined,comment);
// }