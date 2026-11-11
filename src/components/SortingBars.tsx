import type { TraceStep } from '../lib/sorting';

type Props = { step: TraceStep; compact?: boolean; showValues?: boolean };
export function SortingBars({ step, compact = false, showValues = true }: Props) {
  const values = step.values;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(1, max - min);
  return (
    <div role="img" aria-label={`Estado do vetor: ${values.join(', ')}`} className={`flex items-end justify-center gap-1.5 overflow-x-auto py-4 ${compact ? 'h-40' : 'h-64 md:h-72'} scrollbar-thin`}>
      <div className="flex h-full min-w-max items-end justify-center gap-1.5 px-1">
        {values.map((value, idx) => {
          const pivot = step.pivot === idx;
          const active = step.active.includes(idx);
          const settled = step.sorted.includes(idx);
          let state = 'bar-neutral';
          if (settled) state = 'bar-sorted';
          if (active) state = step.event === 'swap' || step.event === 'write' ? 'bar-swap' : 'bar-compare';
          if (pivot) state = 'bar-pivot';
          const height = compact ? 25 + ((value - min) / span) * 88 : 46 + ((value - min) / span) * 155;
          return (
            <div className={`bar-col ${step.boundary === idx ? 'bar-divider' : ''} ${compact ? 'w-5 sm:w-7' : 'w-7 sm:w-9'}`} key={idx}>
              {showValues && <span className={`bar-number ${compact ? 'text-[10px]' : 'text-xs'}`}>{value}</span>}
              <div className={`bar-shape ${state}`} style={{ height: `${height}px` }} />
              {!compact && <span className="bar-index">{idx}</span>}
              {!compact && <span className="bar-pointers" aria-hidden="true">{step.leftPointer === idx ? 'i' : ''}{step.leftPointer === idx && step.rightPointer === idx ? '/' : ''}{step.rightPointer === idx ? 'j' : ''}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
