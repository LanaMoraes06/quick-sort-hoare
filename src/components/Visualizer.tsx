import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, CirclePlay, Pause, RotateCcw, Shuffle, SkipForward, SlidersHorizontal } from 'lucide-react';
import { getRandomArray, parseArray, pseudocode, quickSortTrace, EXAMPLE } from '../lib/sorting';
import { SortingBars } from './SortingBars';

export function Visualizer() {
  const [source, setSource] = useState(EXAMPLE);
  const [entry, setEntry] = useState(EXAMPLE.join(', '));
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(65);
  const [error, setError] = useState('');
  const trace = useMemo(() => quickSortTrace(source), [source]);
  const step = trace[index] ?? trace[0];
  const done = index === trace.length - 1;

  useEffect(() => {
    if (!playing) return;
    const timeout = window.setTimeout(() => {
      if (index >= trace.length - 1) { setPlaying(false); return; }
      setIndex(i => i + 1);
    }, Math.max(90, 1050 - speed * 9));
    return () => window.clearTimeout(timeout);
  }, [playing, index, speed, trace.length]);
  useEffect(() => { if (done) setPlaying(false); }, [done]);

  const apply = () => {
    try {
      const parsed = parseArray(entry);
      setSource(parsed);
      setError(''); setIndex(0); setPlaying(false);
    } catch (e) { setError((e as Error).message); }
  };
  const randomize = () => {
    const a = getRandomArray(12);
    setSource(a); setEntry(a.join(', ')); setIndex(0); setPlaying(false); setError('');
  };
  const start = () => { if (done) setIndex(0); setPlaying(p => !p || done); };
  const reset = () => { setIndex(0); setPlaying(false); };
  return (
    <section id="visualizador" className="section-wrap scroll-mt-24">
      <div className="eyebrow"><span className="eyebrow-dot" /> LABORATÓRIO INTERATIVO <span className="eyebrow-index">/ 02</span></div>
      <div className="section-heading">
        <div><h2>Veja a lógica <span className="gradient-text">ganhar vida.</span></h2><p>Particionamento de Hoare de verdade: acompanhe i e j avançando, as trocas e a fronteira entre as partes. Experimente com seus próprios números.</p></div>
        <div className="pill muted-pill"><span className="live-dot" /> execução passo a passo</div>
      </div>
      <div className="panel overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3"><span className="terminal-icon">{'>_'}</span><div><div className="text-sm font-bold">sorting_visualizer.tsx</div><div className="text-[11px] text-slate-500 font-mono">Hoare · pivô inicial · dois ponteiros</div></div></div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400"><span className="h-2 w-2 rounded-full bg-mint" /> {done ? 'COMPLETO' : playing ? 'EXECUTANDO' : 'AGUARDANDO'}</div>
        </div>
        <div className="px-4 pt-5 sm:px-7">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
            <label className="text-xs font-semibold text-slate-300" htmlFor="custom-vector">Seu vetor <span className="font-normal text-slate-500">· 2–25 inteiros, separados por vírgulas</span>
              <input id="custom-vector" className="input-field mt-2 font-mono" value={entry} onChange={e => setEntry(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') apply(); }} spellCheck={false} />
            </label>
            <div className="flex flex-wrap gap-2"><button className="btn-subtle" onClick={apply}><Check size={16} /> Aplicar vetor</button><button className="btn-subtle" onClick={randomize}><Shuffle size={16} /> Aleatório</button></div>
          </div>
          {error && <div role="alert" className="mt-3 text-xs text-rose-300">{error}</div>}
          <SortingBars step={step} />
          <div className="mb-5 flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400">
            <span className="legend"><i className="bg-violet" /> Pivô</span><span className="legend"><i className="bg-sky" /> Comparação</span><span className="legend"><i className="bg-amber-400" /> Troca</span><span className="legend"><i className="bg-mint" /> Ordenado</span>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="stat"><span>COMPARAÇÕES</span><strong>{step.comparisons}</strong></div>
            <div className="stat"><span>TROCAS REAIS</span><strong>{step.swaps}</strong></div>
            <div className="stat"><span>PROGRESSO</span><strong>{Math.round((index / (trace.length - 1)) * 100)}<small>%</small></strong></div>
          </div>
          <div className="my-5 h-1.5 overflow-hidden rounded-full bg-[#1e2638]" role="progressbar" aria-label="Progresso da ordenação" aria-valuemin={0} aria-valuemax={trace.length-1} aria-valuenow={index}><div className="h-full rounded-full bg-gradient-to-r from-violet to-mint transition-all" style={{ width: `${100 * index / (trace.length - 1)}%` }} /></div>
          <div className="grid items-center gap-4 border-t border-line py-5 md:grid-cols-[auto_1fr_auto]">
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={start} className="btn-primary min-w-28" aria-label={playing ? 'Pausar ordenação' : 'Iniciar ordenação'}>{playing ? <Pause size={17} fill="currentColor" /> : <CirclePlay size={17}/>} {playing ? 'Pausar' : done ? 'Repetir' : 'Iniciar'}</button>
              <button className="btn-icon" onClick={() => {setPlaying(false); setIndex(i => Math.min(i + 1, trace.length-1));}} disabled={done} title="Próxima etapa" aria-label="Próxima etapa"><SkipForward size={17} /></button>
              <button className="btn-icon" onClick={reset} title="Reiniciar" aria-label="Reiniciar"><RotateCcw size={17} /></button>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-[#111826] px-3 py-3"><span className="text-violet"><ArrowRight size={16}/></span><p className="text-xs leading-relaxed text-slate-300" aria-live="polite">{step.text}</p></div>
            <label className="flex items-center gap-3 text-xs text-slate-400"><SlidersHorizontal size={16}/><span className="whitespace-nowrap">Velocidade</span><input aria-label="Velocidade da animação" type="range" min="1" max="100" value={speed} onChange={e => setSpeed(Number(e.target.value))} className="accent-violet w-24" /></label>
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="panel p-5 sm:p-7"><div className="card-kicker">POR TRÁS DOS BASTIDORES</div><h3 className="mt-2 text-lg font-bold">Pseudocódigo sincronizado</h3><p className="mt-1 text-xs leading-6 text-slate-400">A linha destacada corresponde à operação que o visualizador está executando.</p>
          <div className="code-scroll mt-5"><div className="min-w-[385px] py-3">{pseudocode.map((line, i) => <div key={i} className={`pseudo-line ${step.line === i && index > 0 ? 'pseudo-active' : ''}`}><span className="select-none text-right text-slate-600">{String(i+1).padStart(2,'0')}</span><code className="whitespace-pre">{line}</code></div>)}</div></div>
        </div>
        <div className="panel p-5 sm:p-7"><div className="card-kicker">LEITURA DA EXECUÇÃO</div><h3 className="mt-2 text-lg font-bold">O que está acontecendo?</h3>
          <div className="mt-6 space-y-5">
            <div><div className="flex items-center justify-between text-xs text-slate-400"><span>Etapa atual</span><span className="font-mono text-slate-300">{index + 1} / {trace.length}</span></div><p className="mt-2 text-sm leading-7 text-slate-200">{step.text}</p></div>
            <div className="grid grid-cols-2 gap-3"><div className="inner-stat">Profundidade recursiva<strong>{step.depth}</strong></div><div className="inner-stat">Intervalo ativo<strong>{step.range ? `${step.range[0]} — ${step.range[1]}` : '—'}</strong></div></div>
            <div className="rounded-xl border border-[#29243d] bg-[#171426] p-4 text-xs leading-6 text-slate-300"><span className="mb-1 inline-block font-semibold text-[#c5b0ff]">Dica de leitura</span><p>Índices aparecem embaixo das barras. A cor verde identifica subpartes já resolvidas. As letras i/j mostram os ponteiros; a linha divisória indica a fronteira retornada por Hoare. O pivô pode se mover e não precisa terminar em posição definitiva após a partição.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
