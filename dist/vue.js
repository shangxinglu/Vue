let id$1 = 0;
class Dep {
    constructor() {
        this.subs = [];
        this.id = id$1++;
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    removeSub(sub) {
        const index = this.subs.indexOf(sub);
        if (index > -1) {
            this.subs.splice(index, 1);
        }
    }
    // Dep挂载添加依赖
    // 建立与Watcher的联系
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }
    // 通知依赖更新
    notify() {
        const subs = this.subs.slice();
        for (let i = 0; i < subs.length; i++) {
            subs[i].update();
        }
    }
}
const targetStack = [];
function pushTarget(target) {
    targetStack.push(target);
    Dep.target = target;
}
function popTarget() {
    targetStack.pop();
    Dep.target = targetStack[targetStack.length - 1];
}

// 数组操作拦截
// 需要拦截的方法
const methodList = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
for (let method of methodList) {
    arrayMethods[method] = function (...args) {
        const res = arrayProto[method].apply(this, arguments);
        const ob = this.__ob__;
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
                break;
        }
        if (inserted)
            ob.observerArray(inserted);
        ob?.dep?.notify?.();
        return res;
    };
}

const def = (obj, key, value, isEnum = false) => {
    Object.defineProperty(obj, key, {
        value,
        enumerable: isEnum,
        writable: true,
        configurable: true
    });
};
const parsePath = (path) => {
    const segments = path.split('.');
    return function (obj) {
        for (let item of segments) {
            if (!obj)
                return;
            obj = obj[item];
        }
    };
};

function defineReactive(obj, key, val) {
    const dep = new Dep;
    const argLen = arguments.length;
    if (argLen === 2) {
        val = obj[key];
    }
    Object.defineProperty(obj, key, {
        get() {
            const childObj = observer(val);
            if (Dep.target) {
                dep.depend();
                if (childObj) {
                    // 触发observer对象中的dep收集
                    childObj.dep.depend();
                    if (Array.isArray(val)) {
                        dependArray(val);
                    }
                }
            }
            console.log('getter', dep);
            return val;
        },
        set(newVal) {
            console.log('setter');
            if (newVal === val)
                return;
            val = newVal;
            // 目标发生变化，通知订阅者  
            this.dep.notify();
        }
    });
}
// 将数组的方法挂载到数组对象原型上
function protoAugment(target, source) {
    target.__proto__ = source;
}
function dependArray(data) {
    for (let item of data) {
        item?.__ob__?.dep?.depend?.();
        if (Array.isArray(item)) {
            dependArray(item);
        }
    }
}
// 将对象所有成员转成响应式
class Observer {
    constructor(data) {
        this.dep = new Dep;
        def(data, '__ob__', this);
        if (Array.isArray(data)) {
            protoAugment(data, arrayMethods);
            this.observerArray(data);
        }
        else if (typeof data === 'object') {
            this.walk(data);
        }
    }
    walk(data) {
        const keys = Reflect.ownKeys(data);
        for (let key of keys) {
            defineReactive(data, key);
        }
    }
    observerArray(data) {
        for (let item of data) {
            observer(item);
        }
    }
}
function observer(obj) {
    if (typeof obj !== 'object' || obj === null)
        return;
    let ob;
    if (obj.__ob__) {
        ob = obj.__ob__;
    }
    else {
        ob = new Observer(obj);
    }
    return ob;
}

let id = 0;
class Watcher {
    constructor(vm, expOrFn, cb, options) {
        this.vm = vm;
        this.cb = cb;
        this.expOrFn = expOrFn;
        this.id = id++;
        this.deps = [];
        this.depIds = new Set;
        if (options) {
            this.lazy = !!options.lazy;
        }
        if (typeof expOrFn === 'string') {
            this.getter = parsePath(expOrFn);
        }
        else {
            this.getter = expOrFn;
        }
        this.newVal = this.get();
    }
    get() {
        pushTarget(this);
        const value = this.getter(this.vm);
        this.oldVal = this.newVal;
        this.newVal = value;
        popTarget();
    }
    run() {
    }
    update() {
        this.cb(this.newVal, this.oldVal);
    }
    // 收集相关的dep
    addDep(dep) {
        // 防止重复添加同一个dep
        if (!this.depIds.has(dep.id))
            this.depIds.add(dep.id);
        dep.addSub(this);
    }
    // 当前watcher依赖的所有dep
    depend() {
    }
    // 移除dep
    removeDep() {
    }
    // 从与自身相关的dep中移除
    teardown() {
        for (let item of this.deps) {
            item.removeSub(this);
        }
    }
}

class Vue {
}
Vue.defineReactive = defineReactive;
Vue.Watcher = Watcher;

// import {createVNode} from 'src/core/vdom/vnode'
// DOCTYPE标签
const doctypeReg = /^<!DOCTYPE [^>]+>/i;
// 开始标签开放正则
const startTagOpenReg = /^<([\w\-]+)/;
// 属性正则
const attributeReg = /^[\s]+([(\w\-]+)[\s]*=[\s]*\"([^"]*?)\"/;
// 自闭和标签正则
const unaryReg = /^\s+\/>/;
// 开始标签闭合正则
const startTagCloseReg = /^[\s]*>/;
// 结束标签
const endTagReg = /^<\/([\w\-]+)>/;
// 注释
const commentReg = /^<!--([\s\S]*?)-->/;
function parseHTML(html, option) {
    let startIndex = 0, endIndex = 0, index = 0;
    while (html) {
        // DOCTYPE标签
        if (doctypeReg.test(html)) {
            const match = (html.match(doctypeReg));
            crop(match[0]);
            continue;
        }
        // 注释
        if (commentReg.test(html)) {
            const match = (html.match(commentReg.source));
            crop(match[0]);
            option.comment?.(match[1], startIndex, endIndex);
            continue;
        }
        // 开始标签
        if (startTagOpenReg.test(html)) {
            const tagObj = {
                tag: '',
                attrs: []
            };
            const match = (html.match(startTagOpenReg));
            crop(match[0]);
            tagObj.tag = match[1];
            parseTagAttr(tagObj);
            continue;
        }
        // 闭合标签
        if (endTagReg.test(html)) {
            const match = (html.match(endTagReg));
            crop(match[0]);
            option.end?.(match[1], startIndex, endIndex);
            continue;
        }
        /**
         * 以上正则都不满足，则为文本
         */
        if (html.includes('<')) {
            const i = html.indexOf('<');
            const text = html.slice(0, i);
            crop(text);
            // if(['','\n'].includes(text)) continue
            option.text?.(text, startIndex, endIndex);
            continue;
        }
        crop(html);
    }
    // 匹配标签属性
    function parseTagAttr(tagObj) {
        while (attributeReg.test(html)) {
            const match = (html.match(attributeReg));
            crop(match[0]);
            const attrObj = {
                name: match[1],
                value: match[2] || ''
            };
            tagObj.attrs.push(attrObj);
        }
        parseTagClose(tagObj);
    }
    // 匹配标签闭合
    function parseTagClose(tagObj) {
        if (startTagCloseReg.test(html)) {
            const match = (html.match(startTagCloseReg));
            crop(match[0]);
            option.start?.(tagObj.tag, tagObj.attrs, false, startIndex, endIndex);
            return;
        }
        if (unaryReg.test(html)) {
            const match = (html.match(unaryReg));
            crop(match[0]);
            option.start?.(tagObj.tag, tagObj.attrs, true, startIndex, endIndex);
        }
    }
    // 剪裁html中已经匹配的字符串
    function crop(str) {
        // console.log(str);
        const len = str.length;
        html = html.substring(len);
        startIndex = index;
        index += len;
        endIndex = index;
        // console.log(startIndex,endIndex,index);
    }
}

/**
 * @description 创建抽象语法树节点
 */
function createASTElement(tag, attrs, parent) {
    return {
        type: VNodeType.ELEMENT,
        tag,
        attrs,
        children: [],
        parent,
    };
}
// 创建抽象文本节点
function createASTText(text) {
    return {
        type: VNodeType.TEXT,
        text,
    };
}
function parse(template) {
    const stack = [];
    let root = null;
    parseHTML(template, {
        start(tag, attrs, isUnary) {
            console.log('start', tag, attrs);
            const currentNode = stack[stack.length - 1] || null;
            const newNode = createASTElement(tag, attrs, currentNode);
            stack.push(newNode);
            if (!root) {
                root = newNode;
            }
            if (!currentNode) {
                if (isUnary) {
                    stack.pop();
                }
                return;
            }
            currentNode.children.push(newNode);
            if (isUnary) {
                stack.pop();
            }
        },
        end(tag) {
            console.log('end', tag);
            stack.pop();
        },
        // comment(text){
        //    console.log('comment',text);
        // },
        text(text) {
            console.log('text', text);
            const currentNode = stack[stack.length - 1] || null;
            if (!currentNode)
                return;
            text = text.trim();
            if (['\n', ''].includes(text))
                return;
            const newNode = createASTText(text);
            currentNode.children.push(newNode);
        }
    });
    return root;
}

function compiler(template) {
    const ast = parse(template);
    console.log('ast', ast);
}

Vue.compiler = compiler;

export { Vue as default };
//# sourceMappingURL=vue.js.map
