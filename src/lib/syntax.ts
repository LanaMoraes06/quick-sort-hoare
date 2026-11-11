/**
 * Realce de sintaxe leve e seguro para os exemplos do laboratório.
 * Não importa Prism.js (que causava a exceção durante a inicialização).
 * O texto é renderizado pelo React, sem innerHTML.
 */
export type SyntaxKind =
  | 'keyword'
  | 'string'
  | 'number'
  | 'boolean'
  | 'comment'
  | 'function'
  | 'operator'
  | 'punctuation'
  | 'builtin';

export type CodePart = { text: string; kind?: SyntaxKind };

const KEYWORDS = new Set((
  'and as async await auto bool break byte case catch char class const constexpr continue ' +
  'def default delete do double else elif enum except export extends false final finally ' +
  'float for from func function goto if implements import in inline int interface is let ' +
  'local long namespace new not null nullptr of or override package pass private protected ' +
  'public raise record return short signed sizeof static string struct super switch this throw ' +
  'throws true try typedef typename union unsigned using var virtual void volatile while yield'
).split(/\s+/));

const BUILTINS = new Set((
  'Array Arrays Console List Math Number String System WriteLine cout cin endl ipairs ipairs ' +
  'len print print_r range require std table tonumber tostring'
).split(/\s+/));

const BOOLEAN_LITERALS = new Set(['true', 'false', 'True', 'False', 'null', 'None', 'nil', 'nullptr']);

/** Retorna partes da linha; espaços em branco são preservados integralmente. */
export function tokenizeCodeLine(line: string, language: string): CodePart[] {
  const commentPattern = language === 'python'
    ? '#[^\\n]*'
    : language === 'lua'
      ? '--[^\\n]*'
      : '\\/\\/[^\\n]*|\\/\\*.*?\\*\\/';

  const source = [
    commentPattern,
    '"(?:\\\\.|[^"\\\\])*"',
    "'(?:\\\\.|[^'\\\\])*'",
    '`(?:\\\\.|[^`\\\\])*`',
    '\\b[A-Za-z_][A-Za-z_0-9]*\\b',
    '\\b\\d+(?:\\.\\d+)?\\b',
    '[+*%<>=!&|^~\\/-]+',
    '[{}()[\\],.;:]'
  ].join('|');

  const pattern = new RegExp(source, 'g');
  const parts: CodePart[] = [];
  let previous = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(line)) !== null) {
    if (match.index > previous) {
      parts.push({ text: line.slice(previous, match.index) });
    }
    const token = match[0];
    let kind: SyntaxKind | undefined;

    if ((language === 'python' && token.startsWith('#')) ||
        (language === 'lua' && token.startsWith('--')) ||
        (language !== 'lua' && language !== 'python' && (token.startsWith('//') || token.startsWith('/*')))) {
      kind = 'comment';
    } else if (/^["'`]/.test(token)) {
      kind = 'string';
    } else if (/^\d/.test(token)) {
      kind = 'number';
    } else if (BOOLEAN_LITERALS.has(token)) {
      kind = 'boolean';
    } else if (KEYWORDS.has(token)) {
      kind = 'keyword';
    } else if (BUILTINS.has(token)) {
      kind = 'builtin';
    } else if (/^[+*%<>=!&|^~\/-]+$/.test(token)) {
      kind = 'operator';
    } else if (/^[{}()[\],.;:]$/.test(token)) {
      kind = 'punctuation';
    } else if (/^[A-Za-z_]\w*$/.test(token)) {
      // Simples destaque para identificadores seguidos de '('.
      const following = line.slice(pattern.lastIndex);
      if (/^\s*\(/.test(following)) kind = 'function';
    }

    parts.push({ text: token, kind });
    previous = pattern.lastIndex;
  }

  if (previous < line.length) parts.push({ text: line.slice(previous) });
  return parts;
}
