
// import {VNode} from 'src/type/vnode'
// import {createVNode} from 'src/core/vdom/vnode'
import {HTMLTemplate} from 'src/type/compiler'

// 开始标签开放正则
const startTagOpenReg = /^<[\w\-]+/g

// 开始标签闭合正则
const startTagCloseReg = /^[\s]+>$/g

// 属性正则
const attributeReg = /^[\s]+[\w\-][\s]+=[\s]+\"[^"]*\"/g

// 结束标签
const endTagReg = /^<\/[\w\-]+>$/g

// 注释
const commentReg = /^<!--[\s\S]*?-->$/g

// 文本
const textReg = /^[\s\S]*?$/g


export function parseHTML(html:HTMLTemplate):void{
    if(html){
        // 开始标签
        if(startTagOpenReg.test(html)){
           
        }

        // 开始闭合标签

    }
}

