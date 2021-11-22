
import {VNode} from '../../type/vnode'
import {createVNode} from '../../core/vdom/vnode'

type HTMLTemplate = string

export function parseHTML(string:HTMLTemplate):VNode{
    return createVNode('div',[],[],'','')
}

