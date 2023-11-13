import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';

export default {
  input: './src/index.js', // 打包的入口文件
  output: {
    file: 'dist/vue.js',
    format: 'umd',
    name: 'Vue', // 在window上有一个 vue
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    serve({
      port: 10086,
      contentBase: '', // ‘’当前目录
      openPage: '/index.html',
    }),
  ],
};