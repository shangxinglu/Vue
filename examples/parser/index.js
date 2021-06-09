import {parse} from  '../../src/compiler/parser/index';

const html = `<div class="d1" id="d1"><script>dfsdfsdf </script><span></span></div>`;

const tree = parse(html);

console.log(tree);



