import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import alias from '@rollup/plugin-alias';
import path from 'path'

import aliases from './alias'




 export default {
    input:'src/platform/web/entry-runtime-with-compiler.ts',
    output:{
        file:'dist/vue.js',
        format:'esm',
        sourcemap:true
    },
    plugins:[
        typescript({
            
            tsconfig: path.resolve(__dirname, '../tsconfig.json'),
            cacheRoot: path.resolve(__dirname, '../node_modules/.rts2_cache'),
            

        }),
        babel({
            exclude: 'node_modules/**'
        }),
        alias({
            entries: aliases
        })

    ]
}