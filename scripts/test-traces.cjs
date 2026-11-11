// Execute depois de npm install: npm run test:logic
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const file = path.join(__dirname, '..', 'src', 'lib', 'sorting.ts');
const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText;
const mod = { exports: {} };
new Function('exports', 'module', 'require', compiled)(mod.exports, mod, require);
const { quickSortTrace, bubbleSortTrace, mergeSortTrace, parseArray } = mod.exports;
const algorithms = { QuickSortHoare: quickSortTrace, BubbleSort: bubbleSortTrace, MergeSort: mergeSortTrace };
let checked = 0;
let partitionsChecked = 0;

function verify(values) {
  const sorted = [...values].sort((a, b) => a - b);
  for (const [name, run] of Object.entries(algorithms)) {
    const trace = run(values);
    const last = trace.at(-1);
    if (JSON.stringify(last.values) !== JSON.stringify(sorted)) {
      throw new Error(`${name} falhou com ${values.join(',')}`);
    }
    if (last.event !== 'done') throw new Error(`${name}: sem etapa final`);
    if (name === 'QuickSortHoare') {
      const partitions = trace.filter(step => step.event === 'partition');
      if (values.length > 1 && !partitions.length) throw new Error('Sem partições Hoare');
      for (const step of partitions) {
        const [lo, hi] = step.range;
        const j = step.boundary;
        if (!(lo <= j && j < hi)) throw new Error(`Fronteira inválida: ${lo}, ${j}, ${hi}`);
        const left = step.values.slice(lo, j + 1);
        const right = step.values.slice(j + 1, hi + 1);
        if (Math.max(...left) > Math.min(...right)) {
          throw new Error(`Partição Hoare inválida: ${JSON.stringify(step)}`);
        }
        partitionsChecked++;
      }
      if (trace.some(step => step.event === 'partition' && step.pivot !== null)) {
        throw new Error('Partição não pode declarar posição definitiva de pivô');
      }
      for (let k = 1; k < trace.length; k++) {
        if (trace[k].comparisons < trace[k-1].comparisons || trace[k].swaps < trace[k-1].swaps) {
          throw new Error('Contadores não monotônicos');
        }
      }
    }
    checked++;
  }
}

const special = [
  [], [7], [2, 1], [1, 2], [2, 2], [5, 5, 5, 5],
  [8, 3, 1, 7, 0, 10, 2], [3, 1, 2],
  [1, 1, 2, 3, 3, 4], [4, 3, 2, 1, 1, 1],
  Array(25).fill(0), Array.from({length: 25}, (_, i) => i),
  Array.from({length: 25}, (_, i) => 25-i),
];
for (const values of special) verify(values);
for (let size = 2; size <= 25; size++) {
  for (let attempt = 0; attempt < 100; attempt++) {
    // Intervalo menor -> mais números repetidos, inclusive negativos.
    const values = Array.from({length: size}, () => Math.floor(Math.random() * 41) - 20);
    verify(values);
  }
}
for (const [raw, expected] of [['1, 2, 3', [1, 2, 3]], ['9 -4; 3', [9, -4, 3]]]) {
  if (JSON.stringify(parseArray(raw)) !== JSON.stringify(expected)) throw new Error('Parser inválido');
}
console.log(`OK: ${checked} execuções corretas, ${partitionsChecked} partições Hoare verificadas; inclui casos repetidos, negativos e limites.`);
