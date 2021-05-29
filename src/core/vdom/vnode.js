

// 虚拟节点

export default class VNode{

    /**
     * @param {String} [tag] 标签名
     * @param {Object} [data] 节点数据
     * @param {Array} [children] 子节点
     * @param {String} [text] 文本内容
     * @param {String} [elm] html的节点
     * @param {Object} [context] vue实例
     * @param {Object} [componentOptions] 组件的选项参数
     * @param {String} [ns] 命名空间
     */
    constructor(tag,data,children,text,elm,context,componentOptions){
        this.tag = tag,
        this.data = data,
        this.children = children,
        this.text = text,
        this.elm = elm,
        this.context = context,
        this.componentOptions = componentOptions;


        this.ns = undefined, // 命名空间
        this.componentInstance = undefined, // 组件实例
        this.isClone = false, // 是否是克隆节点
        this.isComment = false, // 是否是注释节点
        this.fnContext = undefined, // 函数组件实例
        this.fnOptions = undefined; // 函数组件选项参数
    }
}

// 创建一个注释节点
export function createEmptyVNode(text=''){
    const vnode = new VNode;
    vnode.isComment = true,
    vnode.text = text;

    return vnode;
}


// 创建一个文本节点
export function createTextVNode(text){
    return new VNode(undefined,undefined,undefined,String(text));
}