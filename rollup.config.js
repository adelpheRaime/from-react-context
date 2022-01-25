import {nodeResolve} from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import babel from "@rollup/plugin-babel"
import del from "rollup-plugin-delete"
// import dts from "rollup-plugin-dts"
//import typescript  from "@rollup/plugin-typescript"
const pkg=require("./package.json");
export default[
    {
        input:"src/index.js",
        output:[
            {
                file:pkg.main,
                format:"cjs",
            },
            {
                file:pkg.main,
                format:"cjs",
            },
            {
                file:pkg.module,
                format:"esm",
            },

        ],
        external:['react'],
        plugins:[
            del({targets:"dist/*"}),
            nodeResolve({
                extensions:[".js",".jsx"]
            }),
           
            //typescript({tsconfig:"./tsconfig.json"}),
            babel({
                babelHelpers:"runtime",
                plugins:[ "@babel/plugin-transform-react-jsx"],
                exclude:"node_modules/**",
                extensions:[".js",".jsx"]
            }),
            commonjs()
        ],
        
    }
]