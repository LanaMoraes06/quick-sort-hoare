import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, XCircle, Zap } from 'lucide-react';
import { challenges } from '../data/challenges';

type Answers = Record<number, number>;
export function ChallengeSection() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const challenge = challenges[current];
  const selected = answers[challenge.id];
  const answered = selected !== undefined;
  const correctCount = challenges.filter(c => answers[c.id] === c.correct).length;
  const answeredCount = Object.keys(answers).length;
  const pick = (choice: number) => { if (!answered) setAnswers(a => ({...a, [challenge.id]: choice})); };
  return (
    <section id="desafios" className="section-wrap scroll-mt-24">
      <div className="eyebrow"><span className="eyebrow-dot"/> HORA DE PRATICAR <span className="eyebrow-index">/ 09</span></div>
      <div className="section-heading"><div><h2>Desafie <span className="gradient-text">sua lógica.</span></h2><p>Aprender é testar hipóteses. São nove desafios com feedback imediato, em três níveis de dificuldade.</p></div><span className="pill muted-pill"><Zap size={14}/> aprender fazendo</span></div>
      <div className="grid gap-5 lg:grid-cols-[265px_1fr]">
        <div className="panel p-5"><div className="card-kicker">SEU PROGRESSO</div><div className="mt-4 text-4xl font-bold">{answeredCount}<span className="text-lg text-slate-500"> / {challenges.length}</span></div><p className="mt-1 text-xs text-slate-400">questões respondidas</p><div className="mt-4 h-2 rounded-full bg-[#232c3c]"><div className="h-2 rounded-full bg-gradient-to-r from-violet to-mint transition-all" style={{width:`${answeredCount/challenges.length*100}%`}} /></div><div className="mt-4 rounded-lg bg-[#141e27] p-3 text-sm"><span className="text-mint font-bold">{correctCount}</span> <span className="text-slate-400">respostas corretas</span></div><div className="mt-6 space-y-2">{(['Iniciante','Intermediário','Avançado'] as const).map((level, n) => <div key={level}><span className="mb-2 block text-[10px] uppercase tracking-[.2em] text-slate-500">{level}</span><div className="flex gap-2">{challenges.slice(n*3,n*3+3).map((c, i) => <button key={c.id} aria-label={`Desafio ${c.id}`} onClick={()=>setCurrent(n*3+i)} className={`quiz-number ${current===n*3+i ? 'quiz-current' : ''} ${answers[c.id]!==undefined ? answers[c.id]===c.correct ? 'quiz-success' : 'quiz-wrong' : ''}`}>{c.id}</button>)}</div></div>)}</div></div>
        <div className="panel flex flex-col p-5 sm:p-8"><div className="flex items-center justify-between"><span className="pill"><span className="h-1.5 w-1.5 rounded-full bg-violet"/>{challenge.level}</span><span className="font-mono text-xs text-slate-500">QUESTÃO {String(current+1).padStart(2,'0')} / 09</span></div><h3 className="mt-6 max-w-xl text-xl font-bold leading-relaxed sm:text-2xl">{challenge.question}</h3><div className="mt-6 grid gap-3">{challenge.options.map((option, i) => <button key={i} disabled={answered} onClick={()=>pick(i)} className={`answer-option ${answered && i===challenge.correct ? 'answer-correct' : ''} ${answered && i===selected && selected!==challenge.correct ? 'answer-incorrect' : ''}`}><span className="answer-letter">{String.fromCharCode(65+i)}</span><span>{option}</span>{answered && i===challenge.correct ? <CheckCircle2 size={18} className="ml-auto flex-shrink-0 text-mint"/> : answered && i===selected ? <XCircle size={18} className="ml-auto flex-shrink-0 text-rose-400"/> : null}</button>)}</div>
          {answered && <div role="status" className={`mt-5 rounded-xl border p-4 text-sm leading-7 ${selected===challenge.correct ? 'border-emerald-900 bg-emerald-950/30' : 'border-amber-900 bg-amber-950/20'}`}><strong className={selected===challenge.correct ? 'text-mint' : 'text-amber-300'}>{selected===challenge.correct ? '✓ Você acertou!' : 'Quase! Veja o raciocínio:'}</strong><p className="mt-1 text-slate-300">{challenge.explanation}</p></div>}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-7"><button onClick={()=>setCurrent(i=>Math.max(i-1,0))} disabled={current===0} className="btn-subtle"><ArrowLeft size={16}/> Anterior</button><div className="flex gap-2"><button onClick={()=>{setAnswers({});setCurrent(0);}} className="btn-icon" title="Zerar respostas" aria-label="Zerar respostas"><RotateCcw size={16}/></button><button onClick={()=>setCurrent(i=>Math.min(i+1,challenges.length-1))} disabled={current===challenges.length-1} className="btn-primary">Próximo <ArrowRight size={16}/></button></div></div>
        </div>
      </div>
    </section>
  );
}
