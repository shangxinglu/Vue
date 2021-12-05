import Vue from '../../dist/vue.js'

const {defineReactive,Watcher} = Vue


const obj = {
    testObj:{
     name:'testObj',
    }
}

defineReactive(obj,'name',[1,2,3])

obj.name;

new Watcher(obj,'name',()=>{
    console.log('change name');
})

obj.name.push(4)