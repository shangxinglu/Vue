import { markStatic } from '../src/compiler/optimizer'

const root = {
    name:'root',
},
A = {
    name:'A',
    parent:root,
},
B = {
    name:'B',
    parent:A,
},
C = {
    name:'C',
    parent:A,
},
H = {
    name:'H',
    parent:A,
},

D = {
    name:'D',
    parent:root,
},
E = {
    name:'E',
    parent:root,
},
F = {
    name:'F',
    parent:E,
},
G = {
    name:'G',
    parent:E,
};

root.children = [A,D,E],
A.children = [B,C,H],
E.children = [F,G];

// debugger

markStatic(root);

