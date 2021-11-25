import {parseHTML} from './parse-html'
import {HTMLTemplate} from 'src/type/compiler'
import { VNodeType} from 'src/type/vnode';


interface ASTVNode{
    type:VNodeType,
    tag?:string,
    attrs?:Array<object>,
    text?:string,   
}

interface ASTElement{
    type:VNodeType.ELEMENT,
    tag:string,
    attrs:Array<object>,
    children:Array<ASTVNode>,
    parent?:ASTElement|null,
}

/**
 * @description 创建抽象语法树节点
 */
function createASTElement(tag: string, attrs: any, parent: ASTElement|null):ASTElement {
    return {
        type:VNodeType.ELEMENT,
        tag,
        attrs,
        children: [],
        parent,
    }
}

// 创建抽象文本节点
function createASTText(text: string):ASTVNode {
  return {
    type:VNodeType.TEXT,
    text,
  } 
}



export function parse(template:HTMLTemplate){
    const stack:ASTElement[] = []
    parseHTML(template,{
        start(tag,attrs,isUnary){
            console.log('start',tag,attrs);
            const currentNode = stack[stack.length-1]||null
            const newNode = createASTElement(tag,attrs,currentNode)
            stack.push(newNode)
            if(!currentNode) {
                if(isUnary) {
                    stack.pop()
                }
                return
            }
            currentNode.children.push(newNode)
            if(isUnary) {
                stack.pop()
            }
        },
        end(tag){
            console.log('end',tag);
            stack.pop()
        },
        // comment(text){
        //    console.log('comment',text);

        // },
        text(text){
            console.log('text',text);
            const currentNode = stack[stack.length-1]||null
            if(!currentNode) return
            const newNode = createASTText(text)
            currentNode.children.push(newNode)
            
        }   
    })

    return stack
}

