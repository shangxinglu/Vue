let id=0

export class Dep{
     subs:Watcher[] = []
     id:number

     static target:Watcher

     constructor(){
            this.id = id++
            this.subs = []
     }

     addSub(sub:Watcher){
         this.subs.push(sub)
     }

     removeSub(sub:Watcher){
         const index = this.subs.indexOf(sub)
         if(index>-1){
            this.subs.splice(index,1)
         }
     }

     // Dep挂载添加依赖
     // 建立与Watcher的联系
     depend(){
        if(Dep.target){
            Dep.target.addDep(this)
        }
     }

     // 通知依赖更新
    notify(){
        const subs = this.subs.slice()
        for(let i=0;i<subs.length;i++){
            subs[i].update()
        }
    }
}


const targetStack:Array<Watcher> = []

export function pushTarget(target:Watcher){
  targetStack.push(target)
  Dep.target = target
}

export function popTarget(){
  targetStack.pop()
  Dep.target = targetStack[targetStack.length-1]
}