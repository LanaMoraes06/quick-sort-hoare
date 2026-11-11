import { useEffect, useMemo, useState } from 'react';
import { CirclePlay, Pause, RotateCcw } from 'lucide-react';
import { bubbleSortTrace, mergeSortTrace, quickSortTrace } from '../lib/sorting';
import { SortingBars } from './SortingBars';

const initial = [34, 12, 51, 18, 42, 7, 28, 64];
const facts = [
  { name: 'Bubble Sort', fn: bubbleSortTrace, about: 'Compara pares vizinhos.', type: 'Trocas' },
  { name: 'Quick Sort · Hoare', fn: quickSortTrace, about: 'Dois ponteiros: i e j.', type: 'Trocas' },
  { name: 'Merge Sort', fn: mergeSortTrace, about: 'Divide e mescla.', type: 'Escritas' }
];
export function Comparison() {
  const traces = useMemo(() => facts.map(item => item.fn(initial)), []);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const length = Math.max(...traces.map(t => t.length));
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => {
      if (frame >= length - 1) setPlaying(false);
      else setFrame(i => i + 1);
    }, 220);
    return () => clearTimeout(id);
  }, [frame, playing, length]);
  const getStep = (t: TraceStep[]) => t[Math.min(frame, t.length - 1)];
  const toggle = () => { if (frame >= length - 1) setFrame(0); setPlaying(s => !s || frame >= length - 1); };
  return (
    <div className="mt-6 panel p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><div className="card-kicker">EXPERIMENTO PARALELO</div><h3 className="mt-2 text-lg font-bold">Mesmo vetor. Estratégias diferentes.</h3><p className="mt-1 text-xs leading-6 text-slate-400">Compare três algoritmos executados de verdade, passo a passo, sobre a mesma entrada.</p></div><div className="flex gap-2"><button onClick={toggle} className="btn-primary">{playing ? <Pause size={16}/> : <CirclePlay size={16}/>} {playing ? 'Pausar' : frame >= length - 1 ? 'Repetir' : 'Comparar'}</button><button onClick={() => {setFrame(0);setPlaying(false);}} className="btn-icon" aria-label="Reiniciar comparação"><RotateCcw size={16}/></button></div></div>
      <div className="mt-5 grid gap-3 lg:grid-cols-3">{facts.map((fact,i) => {const t = traces[i]; const step = getStep(t); return <div key={fact.name} className="rounded-xl border border-line bg-[#0c111b] p-3 sm:p-4"><div className="flex items-center justify-between gap-3"><strong className="text-sm">{fact.name}</strong><span className="font-mono text-[10px] text-slate-500">{Math.min(frame + 1,t.length)}/{t.length}</span></div><p className="mt-1 text-xs text-slate-500">{fact.about}</p><SortingBars step={step} compact /><div className="grid grid-cols-2 gap-2 border-t border-line pt-3"><div className="text-[10px] text-slate-400">Comparações <strong className="mt-1 block text-lg text-white">{step.comparisons}</strong></div><div className="text-[10px] text-slate-400">{fact.type} <strong className="mt-1 block text-lg text-white">{fact.type === 'Escritas' ? step.writes : step.swaps}</strong></div></div><div className="mt-2 h-1 overflow-hidden rounded bg-[#252a39]"><div className="h-full bg-mint" style={{width:`${100*Math.min(frame,t.length-1)/(t.length-1)}%`}}/></div></div>;})}</div>
      <p className="mt-4 text-[11px] leading-5 text-slate-500">Os passos avançam juntos, não no mesmo tempo de CPU. Cada algoritmo registra eventos diferentes; contagens de trocas e escritas não são medidas diretamente equivalentes de custo. O resultado depende da entrada.</p>
    </div>
  );
}
