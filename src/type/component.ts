declare interface Component{
    el:Element;
    $el:Element;
    $data:Object;
    $options:Object;
    $parent:Component;
    $root:Component;
    $children:Component[];
    $refs:Object;
    $slots:Object;
    $scopedSlots:Object;
    $isServer:boolean;
    $isPrerender:boolean;
    $mount:Function;
    $forceUpdate:Function;
    $nextTick:Function;
    $destroy:Function;
}

