

/**
 * 优化AST，为AST添加静态和静态根节点的标记
 * 可以用来提升Patch
 */
export function optimize(root, options) {
    if (!root) return;

    markStatic(root);
}

export function markStatic(root) {
    let isComplete = false,
        currentParent = root,
        childIndex = 0,
         children,currentChildren;
    while (!isComplete) {
        ({ children } = currentParent);
        
        // 存在子节点则将当前指针指向子节点
        if(children?.length&&childIndex<children.length) {
            currentParent = children[childIndex];
        } else {
            if(!children.parent){
                isComplete = true;
                break;
            }
            currentChildren = currentParent,
            currentParent = currentParent.parent,
            children = currentParent.children;

            childIndex = children.indexOf(currentChildren)+1;
            
        }


    }
}

export function markRootStatic(root) {

}