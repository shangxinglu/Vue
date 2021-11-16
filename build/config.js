import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript'


 export default {
    input:'./platform/web/entry.ts',
    output:{
        file:'dist/vue.js',
        format:'esm',
        sourcemap:true
    },
    plugins:[
        typescript({
            exclude: 'node_modules/**'
        }),
        babel({
            exclude: 'node_modules/**'
        })
    ]
}