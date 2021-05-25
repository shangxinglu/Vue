'use strict';

/**
 * 运行环境的数据
 */

export const hasProto = '__proto__' in {};

// 是否是开发环境
export const isDev = process.env.NODE_ENV==='development';
console.log(process.env.NODE_ENV)