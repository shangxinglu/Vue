
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
]


const arrayProto:any = Array.prototype 

const arrayMethods = Object.create(arrayProto)

for(let method of methodList) {
    arrayMethods[method] = function(...args:any[]) {
        const res = arrayProto[method].apply(this, arguments)
        const ob = this.__ob__

        let inserted:any

        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice':
                inserted = args.slice(2)
                break;
        }

        if(inserted) ob.observerArray(inserted)

        ob?.dep?.notify?.()

        return res
    }
}

export {
    arrayMethods
}