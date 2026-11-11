import { useEffect, useState } from 'react';
import { Check, ClipboardCopy, Code2, Terminal } from 'lucide-react';
import { tokenizeCodeLine } from '../lib/syntax';
import { languages } from '../data/languages';

export function CodeGallery() {
  const [selected, setSelected] = useState('python');
  const [copied, setCopied] = useState(false);
  const active = languages.find(l => l.id === selected) ?? languages[0];
  useEffect(() => { setCopied(false); }, [selected]);
  const copy = async () => {
    try { await navigator.clipboard.writeText(active.code); setCopied(true); }
    catch { setCopied(false); }
  };
  return (
    <section id="codigos" className="section-wrap scroll-mt-24">
      <div className="eyebrow"><span className="eyebrow-dot"/> ALGORITMO NA PRÁTICA <span className="eyebrow-index">/ 05</span></div>
      <div className="section-heading"><div><h2>Um algoritmo, <span className="gradient-text">várias linguagens.</span></h2><p>A mesma lógica de Hoare, com dois ponteiros, em seis sintaxes diferentes. Copie, execute e descubra o que muda — e o que permanece igual.</p></div><span className="pill muted-pill"><Code2 size={14}/> 6 linguagens</span></div>
      <div className="panel overflow-hidden">
        <div className="flex flex-wrap gap-1 border-b border-line bg-[#101520] px-3 py-3 sm:px-5" role="tablist" aria-label="Linguagem do código">
          {languages.map(lang => <button key={lang.id} role="tab" aria-selected={lang.id===selected} onClick={() => setSelected(lang.id)} className={`code-tab ${lang.id===selected ? 'code-tab-active' : ''}`}>{lang.name}</button>)}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3"><div className="flex items-center gap-2 text-xs font-mono text-slate-400"><Terminal size={15} className="text-violet"/> {active.extension} <span className="ml-2 rounded bg-[#24302e] px-2 py-1 text-[10px] text-mint">executável</span></div><button onClick={copy} className="btn-subtle text-xs">{copied ? <Check size={15}/> : <ClipboardCopy size={15}/>} {copied ? 'Copiado!' : 'Copiar código'}</button></div>
        <div className="code-scroll max-h-[560px] overflow-y-auto bg-[#090e17] px-2 py-4 sm:px-5" role="tabpanel" aria-label={`Implementação em ${active.name}`}>
          <div className="min-w-max">{active.code.split('\n').map((line, i) => <div className="language-line" key={`${active.id}-${i}`}><span className="line-number">{i+1}</span><code className="language-code">{tokenizeCodeLine(line || ' ', active.id).map((part, tokenIndex) => part.kind ? <span key={tokenIndex} className={`token ${part.kind}`}>{part.text}</span> : <span key={tokenIndex}>{part.text}</span>)}</code></div>)}</div>
        </div>
        <div className="grid gap-4 border-t border-line bg-[#101521] p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:px-7"><div><span className="card-kicker">DETALHE DA LINGUAGEM</span><p className="mt-2 text-sm text-slate-300">{active.note}</p></div><div className="rounded-lg border border-line bg-[#0b111b] px-4 py-3 font-mono text-xs text-mint">[0, 1, 2, 3, 7, 8, 10]</div></div>
      </div>
      <p className="mt-4 text-xs leading-6 text-slate-400">Todas as versões usam o primeiro valor como pivô e dois ponteiros. A partição retorna o limite j: as chamadas recursivas usam [início, j] e [j + 1, fim]. O pivô não precisa terminar em posição definitiva. Em Lua, os índices começam em 1; nas outras linguagens, em 0.</p>
    </section>
  );
}
