
export const def = (obj: any, key: string, value: any,isEnum:boolean = false) => {
    Object.defineProperty(obj, key, {
        value,
        enumerable: isEnum,
        writable: true,
        configurable: true
    });
}

export const parsePath = (path:string)=>{
    const segments = path.split('.')

    return function(obj:any){
        for(let item of segments){
            if(!obj) return
            obj = obj[item]
        }
    }
}