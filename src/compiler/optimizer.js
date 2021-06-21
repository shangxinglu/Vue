import { log } from "../core/util";


/**
 * 优化AST，为AST添加静态和静态根节点的标记
 * 可以用来提升Patch
 */
export function optimize(root, options) {
    if (!root) return;

    markStatic(root);

    markRootStatic(root);
}


// 标记静态节点
export function markStatic(node) {
    node.static = isStatic(node);
    // log(node.name);
    if (node.type !== 1) return

    const children = node.children || [];
    for (let item of children) {
        markStatic(item);

        // 子节点含有非静态节点，更改父节点为非静态
        if (!item.static) {
            node.static = false;
        }
    }


}


// 标记静态根节点
export function markRootStatic(node) {
    if (node.type !== 1) return;

    const { children } = node,
        childLen = children.length;
    if (node.static && childLen && !(childLen === 1 && children[0].type === 3)) {
        node.staticRoot = true;
        return;
    } else {
        node.staticRoot = false;
    }

    if (childLen >= 1) {
        for (let i = 0; i < childLen; i++) {
            markRootStatic(children[i]);
        }
    }


}

// export function markStatic(root) {
//     let currentParent = root,
//         childIndex = 0,
//          children,currentChildren;
//     while (true) {
//         ({ children } = currentParent);
//         // debugger


//         // 存在子节点则将当前指针指向子节点
//         if(children?.length&&childIndex<children.length) {
//             currentParent = children[childIndex];
//             if(currentParent.children){
//                 childIndex = 0;
//             }
//             log(currentParent.name);
//         } else {
//             if(!currentParent.parent){
//                 break;
//             }
//             currentChildren = currentParent,
//             currentParent = currentParent.parent,
//             children = currentParent.children;

//             childIndex = children.indexOf(currentChildren)+1;

//         }


//     }
// }



// 判断是否是静态节点
function isStatic(node) {
    if (node.type === 3) return true;

    return false;
}
