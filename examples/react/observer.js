'use strict';

import {interceptor} from "../../src/observer";


const update = ()=>{
    const arr = [1,2,3,4];
    interceptor(arr);
    arr.push(1,9)
    console.log(arr)
}


export {
    update,
}