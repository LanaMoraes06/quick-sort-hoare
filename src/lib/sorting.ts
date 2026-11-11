export type SortEvent = 'initial' | 'pivot' | 'compare' | 'swap' | 'settled' | 'done' | 'write' | 'partition';
export type TraceStep = {
  values: number[];
  pivot: number | null;
  active: number[];
  sorted: number[];
  range: [number, number] | null;
  comparisons: number;
  swaps: number;
  writes?: number;
  depth: number;
  event: SortEvent;
  leftPointer?: number | null;
  rightPointer?: number | null;
  boundary?: number | null;
  line: number;
  text: string;
};

export const EXAMPLE = [8, 3, 1, 7, 0, 10, 2];

export const pseudocode = [
  'quickSort(a, início, fim)',
  '  se início >= fim: retornar',
  '  p = particionarHoare(a, início, fim)',
  '  quickSort(a, início, p)',
  '  quickSort(a, p + 1, fim)',
  '',
  'particionarHoare(a, início, fim)',
  '  valorPivô = a[início]',
  '  i = início - 1; j = fim + 1',
  '  repetir:',
  '    avançar i até a[i] >= valorPivô',
  '    recuar j até a[j] <= valorPivô',
  '    se i >= j: retornar j',
  '    trocar(a[i], a[j])',
];

/**
 * Quick Sort com partição de Hoare, usando a[início] como VALOR do pivô.
 * A partição devolve um LIMITE entre dois grupos, não uma posição final do pivô.
 * Recursão inclusiva correta: [início, p] e [p+1, fim].
 * Os ponteiros i/j, as comparações e as trocas são registradas durante a execução real.
 */
export function quickSortTrace(input: number[]): TraceStep[] {
  const a = [...input];
  const steps: TraceStep[] = [];
  const sorted = new Set<number>();
  let comparisons = 0;
  let swaps = 0;

  function push(
    event: SortEvent, text: string, pivot: number | null,
    active: number[], range: [number, number] | null,
    line: number, depth: number,
    leftPointer: number | null = null, rightPointer: number | null = null,
    boundary: number | null = null
  ) {
    steps.push({
      values: [...a], pivot, active: [...active], sorted: [...sorted],
      range, comparisons, swaps, depth, event, line, text,
      leftPointer, rightPointer, boundary
    });
  }

  push('initial', 'Vetor original. A estratégia de Hoare usa dois ponteiros que caminham em sentidos opostos.', null, [], null, 0, 0);

  function sort(lo: number, hi: number, depth: number): void {
    if (lo > hi) return;
    if (lo === hi) {
      sorted.add(lo);
      push('settled', `O índice ${lo} contém apenas ${a[lo]}; esta subparte já está ordenada.`, null, [lo], [lo, hi], 1, depth);
      return;
    }

    const pivotValue = a[lo];
    let pivotIndex = lo; // acompanha o elemento ORIGINAL escolhido, inclusive durante trocas
    let i = lo - 1;
    let j = hi + 1;
    push('pivot', `Intervalo [${lo}–${hi}]: valor do pivô = ${pivotValue}, escolhido no primeiro elemento. Ponteiros i e j nas extremidades.`, pivotIndex, [lo], [lo, hi], 7, depth);

    while (true) {
      // Procurar, da esquerda, o primeiro valor >= pivô.
      while (true) {
        i++;
        comparisons++;
        push('compare', `Ponteiro i → índice ${i}. ${a[i]} ${a[i] < pivotValue ? '<' : '≥'} ${pivotValue}; ${a[i] < pivotValue ? 'continuamos avançando' : 'paramos em i'}.`, pivotIndex, [i], [lo, hi], 10, depth, i, j <= hi ? j : null);
        if (a[i] >= pivotValue) break;
      }
      // Procurar, da direita, o primeiro valor <= pivô.
      while (true) {
        j--;
        comparisons++;
        push('compare', `Ponteiro j ← índice ${j}. ${a[j]} ${a[j] > pivotValue ? '>' : '≤'} ${pivotValue}; ${a[j] > pivotValue ? 'continuamos recuando' : 'paramos em j'}.`, pivotIndex, [i, j], [lo, hi], 11, depth, i, j);
        if (a[j] <= pivotValue) break;
      }

      if (i >= j) {
        // Em Hoare, j é a fronteira. NÃO significa que o pivô ficou definitivamente em j.
        push('partition', `Os ponteiros se encontraram/cruzaram (i=${i}, j=${j}). Partição em j=${j}: índices ${lo}–${j} e ${j + 1}–${hi}. O pivô não precisa estar na posição final.`, null, [j], [lo, hi], 12, depth, i, j, j);
        sort(lo, j, depth + 1);
        sort(j + 1, hi, depth + 1);
        return;
      }

      const leftValue = a[i];
      const rightValue = a[j];
      [a[i], a[j]] = [a[j], a[i]];
      swaps++;
      if (pivotIndex === i) pivotIndex = j;
      else if (pivotIndex === j) pivotIndex = i;
      push('swap', `Troca dos índices ${i} e ${j}: ${leftValue} ↔ ${rightValue}. Os ponteiros continuarão avançando para o centro.`, pivotIndex, [i, j], [lo, hi], 13, depth, i, j);
    }
  }

  sort(0, a.length - 1, 0);
  for (let k = 0; k < a.length; k++) sorted.add(k);
  push('done', 'Ordenação concluída com Hoare! Os dois lados de cada partição foram ordenados recursivamente.', null, [], null, 4, 0);
  return steps;
}

export function bubbleSortTrace(input: number[]): TraceStep[] {
  const a = [...input];
  const steps: TraceStep[] = [];
  const sorted = new Set<number>();
  let comparisons = 0; let swaps = 0;
  const push = (event: SortEvent, active: number[], text: string) => steps.push({ values: [...a], pivot: null, active, sorted: [...sorted], range: null, comparisons, swaps, depth: 0, event, line: 0, text });
  push('initial', [], 'Aguardando início');
  for (let i = 0; i < a.length - 1; i++) {
    let changed = false;
    for (let j = 0; j < a.length - i - 1; j++) {
      comparisons++;
      push('compare', [j, j + 1], `Comparando ${a[j]} e ${a[j + 1]}`);
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swaps++;
        changed = true;
        push('swap', [j, j + 1], 'Trocando vizinhos');
      }
    }
    sorted.add(a.length - i - 1);
    push('settled', [a.length - i - 1], 'Maior elemento posicionado');
    if (!changed) break;
  }
  for (let i = 0; i < a.length; i++) sorted.add(i);
  push('done', [], 'Bubble Sort concluído');
  return steps;
}

export function mergeSortTrace(input: number[]): TraceStep[] {
  const a = [...input];
  const steps: TraceStep[] = [];
  let comparisons = 0; let writes = 0;
  const push = (event: SortEvent, active: number[], text: string) => steps.push({ values: [...a], pivot: null, active, sorted: event === 'done' ? a.map((_, i) => i) : [], range: null, comparisons, swaps: 0, writes, depth: 0, event, line: 0, text });
  push('initial', [], 'Aguardando início');
  function sort(lo: number, hi: number) {
    if (hi - lo <= 1) return;
    const mid = Math.floor((lo + hi) / 2);
    sort(lo, mid); sort(mid, hi);
    const left = a.slice(lo, mid); const right = a.slice(mid, hi);
    let i = 0; let j = 0; let k = lo;
    while (i < left.length && j < right.length) {
      comparisons++;
      push('compare', [lo + i, mid + j], `Comparando ${left[i]} e ${right[j]}`);
      a[k] = left[i] <= right[j] ? left[i++] : right[j++];
      writes++;
      push('write', [k], 'Mesclando subvetores');
      k++;
    }
    while (i < left.length) { a[k] = left[i++]; writes++; push('write', [k], 'Copiando elemento restante'); k++; }
    while (j < right.length) { a[k] = right[j++]; writes++; push('write', [k], 'Copiando elemento restante'); k++; }
  }
  sort(0, a.length);
  push('done', [], 'Merge Sort concluído');
  return steps;
}

export function getRandomArray(length = 12): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * 88) + 8);
}

export function parseArray(raw: string): number[] {
  const items = raw.trim().split(/[\s,;]+/).filter(Boolean);
  if (items.length < 2 || items.length > 25) throw new Error('Digite de 2 a 25 números separados por vírgula ou espaço.');
  const values = items.map(Number);
  if (values.some(n => !Number.isSafeInteger(n) || n < -999 || n > 999)) {
    throw new Error('Use apenas números inteiros entre -999 e 999.');
  }
  return values;
}
