import { HTMLTemplate } from 'src/type/compiler';
import { VNodeType } from 'src/type/vnode';
interface ASTVNode {
    type: VNodeType;
    tag?: string;
    attrs?: Array<object>;
    text?: string;
}
interface ASTElement {
    type: VNodeType.ELEMENT;
    tag: string;
    attrs: Array<object>;
    children: Array<ASTVNode>;
    parent?: ASTElement | null;
}
export declare function parse(template: HTMLTemplate): ASTElement[];
export {};
