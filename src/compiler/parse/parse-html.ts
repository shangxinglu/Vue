
// import {VNode} from 'src/type/vnode'
// import {createVNode} from 'src/core/vdom/vnode'
import {HTMLTemplate} from 'src/type/compiler'

// DOCTYPE标签
const doctypeReg = /^<!DOCTYPE [^>]+>/i

// 开始标签开放正则
const startTagOpenReg = /^<([\w\-]+)/

// 属性正则
const attributeReg = /^[\s]+([(\w\-]+)[\s]*=[\s]*\"([^"]*?)\"/

// 自闭和标签正则
const unaryReg = /^\s+\/>/

// 开始标签闭合正则
const startTagCloseReg = /^[\s]*>/

// 结束标签
const endTagReg = /^<\/([\w\-]+)>/

// 注释
const commentReg = /^<!--([\s\S]*?)-->/



type MatchType = Array<string>


interface TagAttr{
    name:string,
    value:string
}
interface ParseOption {
    // 开始标签hook
    start?:(tag:string, attrs:Array<TagAttr>,isUnary:boolean ,startIndex?:number,endIndex?:number) => void,
    // 结束标签hook
    end?:(tag:string,startIndex?:number,endIndex?:number) => void,
    // 文本hook
    text?:(text:string,startIndex?:number,endIndex?:number) => void,
    // 注释hook
    comment?:(text:string,startIndex?:number,endIndex?:number) => void,
}


interface Tag {
    tag:string,
    attrs:Array<TagAttr>,
} 

export function parseHTML(html:HTMLTemplate,option:ParseOption):void{
    let startIndex:number=0,
    endIndex:number=0,
    index:number=0

 
    
    while(html){
        // DOCTYPE标签
        if(doctypeReg.test(html)){
            const match = (html.match(doctypeReg)) as MatchType
            crop(match[0])
            continue
            
        }

        // 注释
        if(commentReg.test(html)){
            const match = (html.match(commentReg.source)) as MatchType
            crop(match[0])
            
            option.comment?.(match[1],startIndex,endIndex)
            continue
        }

        // 开始标签
        if(startTagOpenReg.test(html)){
            const tagObj:Tag = {
                tag:'',
                attrs:[]
            }
           const match = (html.match(startTagOpenReg)) as MatchType
             crop(match[0])
             tagObj.tag = match[1]
             parseTagAttr(tagObj)
            continue
        }

        // 闭合标签
        if(endTagReg.test(html)){
            const match = (html.match(endTagReg)) as MatchType
            crop(match[0])
            option.end?.(match[1],startIndex,endIndex)
            continue
        }

        /**
         * 以上正则都不满足，则为文本
         */
        if(html.includes('<')){
            const i = html.indexOf('<')
            const text = html.slice(0,i)
            crop(text) 
            if(['','\n'].includes(text)) continue
            option.text?.(text,startIndex,endIndex)
            continue
        }

        crop(html)
    }

    // 匹配标签属性
    function parseTagAttr(tagObj:Tag):void{

        while(attributeReg.test(html)){
            const match = (html.match(attributeReg)) as MatchType
            crop(match[0])
            const attrObj:TagAttr = {
                name:match[1],
                value:match[2]||''
            }
            tagObj.attrs.push(attrObj)
        }
        parseTagClose(tagObj)
    }

    // 匹配标签闭合
    function parseTagClose(tagObj:Tag){
        if(startTagCloseReg.test(html)){
            const match = (html.match(startTagCloseReg)) as MatchType
            crop(match[0])
            option.start?.(tagObj.tag,tagObj.attrs,false,startIndex,endIndex)
        }
        if(unaryReg.test(html)){
            option.start?.(tagObj.tag,tagObj.attrs,true,startIndex,endIndex)
        }
            
    }

    // 剪裁html中已经匹配的字符串
    function crop(str:string){
        // console.log(str);
        
        const len = str.length
        html = html.substring(len)
        startIndex = index
        index+=len
        endIndex = index
        // console.log(startIndex,endIndex,index);
    }

    

}

