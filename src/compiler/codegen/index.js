
// 生成节点字符串
export function  genNode(node,state) {
    const {type} = node;

    if(type ===1){
        return genElement(node,state);
    } else if(type === 3 && node.isComment){
        return genComment(node);
    } else {
        return genText(node);
    }
}


// 生成元素节点的代码字符串
export function  genElement(el,state) {

    const data = el.plain?undefined:genData(el,state),

    children = genChildren(el,state);

    const codeStr= `_c(${el.tag}${
        data?`,${data}`:''
    }${
       children?`,${children}`:'' 
    })`;

    return codeStr;
}

// 生成文本节点的代码字符串
export function  genText(text) {
    return `_v(${text.type===2?text.expression:JSON.stringify(text.text)})`;
}

// 生成注释节点的代码字符串
export function  genComment(comment) {
    return `_e(${JSON.stringify(comment.text)})`;
}


// 生成属性数据代码字符串
export function  genData(el,state) {
    let data = '{';
    const {id,key,class:className} = el;

    if(key){
        data += `key:${key},`;
    }

    if(id){
        data += `id:${id},`;
    }

    if(className){
        data += `className:${className},`;
    }

  
    // 去除最后一个',' 并添加}
    data = data.replace(/,$/,'')+'}';

    return data;

    
}


// 生成子节点的代码字符串
export function genChildren(el,state) {
    const {children} = el;

    if(children.length){
        return [`${children.map(child=>genNode(child,state)).join(',')}`];
    }
}



