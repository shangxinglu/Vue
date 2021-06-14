

import { cached, log } from '../../core/shared/util'
import {parseFilter} from './filter-parser'
const defaultDelimiterReg = /\{\{((?:.|\r?\n)+?)\}\}/g,
    delimiterReg = /[{}()|\[\]\/\\*.+?^$-]/g;

const bulidRegexp = cached(delimiter => {
    const open = delimiter[0].replace(delimiterReg, '$&'),
        close = delimiter[1].replace(delimiterReg, '$&');

    return new RegExp(`${open}((?:.|\\n)+?)${close}`, 'g');
})

/**
 * @description 解析文本中的变量
 * 
 * @param {String} text 文本
 * @param {String} delimiter 分隔符
 */
export function parseText(text, delimiter) {
    const textReg = delimiter ? bulidRegexp(delimiter) : defaultDelimiterReg;
    if (!textReg.test(text)) return;

    const token = [],
    rowToken = [];

    textReg.lastIndex = 0;
    let match, vname,
        lastIndex = 0,
        index = 0;
    while (match = textReg.exec(text)) {

        index = match.index;

        // 获取变量之前的字符串
        if (index > lastIndex) {
            let sub = text.substring(lastIndex, index);
            rowToken.push(sub);
            token.push(sub);
        }

        const exp = parseFilter(match[1].trim());
        token.push(`_s(${exp})`);
        rowToken.push({'@binding':exp});

        lastIndex = textReg.lastIndex;

    }
    
    if (lastIndex < text.length) {
        let sub = text.substring(lastIndex, text.length);
        token.push(sub);
    }

    return token;
}
