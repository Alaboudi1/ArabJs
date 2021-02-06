const { ChavascriptBabelPlugin } = require('../dist/chavascript-parser');
const babel = require('@babel/core');

const inputCode = `

استورد ("https://unpkg.com/comlink/dist/esm/comlink.mjs")



`;

const output = babel.transformSync(inputCode, {
  plugins: [ChavascriptBabelPlugin]
});

console.log(output.code);