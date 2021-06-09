

import {cached,log} from '../../core/shared/util'
const defaultDelimiterReg = /\{\{((?:.|\r?\n))+?\}\}/g,
delimiterReg = /[{}()|\[\]\/\\*.+?^$-]/g;

const  bulidRegexp =  cached(delimiter=>{
    const open = delimiter[0].replace(delimiterReg,'$&'),
    close = delimiter[1].replace(delimiterReg,'$&');

    return new RegExp(`${open}((?:.|\\n)+?)${close}`,'g');
})

/**
 * @description 解析文本中的变量
 * 
 * @param {String} text 文本
 * @param {String} delimiter 分隔符
 */
export function parseText(text,delimiter){
    const textReg = delimiter?bulidRegexp(delimiter):defaultDelimiterReg;
    if(!textReg.test(text)) return;

    const token = [];

    

}
