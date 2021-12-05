import Vue from '../../dist/vue.js'

const template = `
    <div id="app">
        <div class="div1">测试文本</div>
        <div class="div2"></div>
    </div>
`

Vue.compiler(template)