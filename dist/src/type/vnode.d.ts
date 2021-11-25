export declare enum VNodeType {
    ELEMENT = 1,
    TEXT = 3,
    COMMENT = 8
}
export interface VNode {
    tag: string;
    attrArr: Array<object>;
    children: Array<VNode>;
    text: string;
    comment: string;
}
