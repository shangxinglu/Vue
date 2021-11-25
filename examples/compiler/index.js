import Vue from '../../dist/vue.js'

const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script type="module" src="./index.js"></script>
</head>
<body>
    <div id="app">
        <div class="div1"></div>
        <div class="div2"></div>
    </div>
</body>
</html>
`

Vue.compiler(template)