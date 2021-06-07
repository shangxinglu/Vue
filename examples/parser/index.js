import {parse} from  '../../src/compiler/parser/index';

const html = `<div class="d1" id="d1"><span></span></div>`;

const tree = parse(html);

console.log(tree);



