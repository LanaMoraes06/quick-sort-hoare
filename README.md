# Quick Sort Lab

Site educacional interativo **em português brasileiro** para aprender Quick Sort com o particionamento de **Hoare (valor de pivô no primeiro elemento, dois ponteiros i/j)**. Um projeto de portfólio em Dark Mode, responsivo e inteiramente client-side.

## O que está implementado

- Página inicial com demonstração automática produzida pelo algoritmo real.
- Explicação de pivô, particionamento, recursão, divisão e conquista e escolhas alternativas de pivô.
- **Visualizador funcional** com entrada personalizada de 2 a 25 números inteiros, vetor aleatório, iniciar/pausar, avançar um passo, reiniciar e velocidade ajustável.
- **Contadores reais** de comparações e trocas, ponteiros i/j, fronteira das partições, posição visual do pivô e profundidade recursiva; pseudocódigo sincronizado.
- Tabela de complexidade, gráfico teórico e observações sobre espaço e estabilidade.
- Seção de aplicações possíveis e limitações do Quick Sort.
- Seis implementações completas, copiáveis e com destaque de sintaxe: **Python, Java, C#, C++, JavaScript e Lua**.
- Comparação tabular com Bubble, Selection, Insertion, Merge e Heap Sort.
- Visualização paralela **real** de Quick Sort, Bubble Sort e Merge Sort, com o mesmo vetor de entrada.
- Cursos de HTML5/CSS3, Maratona Java e bootcamps da DIO (links fornecidos pelo solicitante).
- Área dedicada ao **CEPEIN/FEMA**, incentivando consultar oportunidades de prática/voluntariado sem anunciar vagas garantidas.
- Nove desafios de múltipla escolha com 3 níveis, feedback e acompanhamento de progresso durante a sessão.
- Navegação por âncoras, menu responsivo, foco visível, textos alternativos e suporte a `prefers-reduced-motion`.

## Tecnologias

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 3
- Lucide Icons
- realce de sintaxe local (sem Prism.js) para syntax highlighting

Não há backend, conta ou API necessária. A lógica de ordenação ocorre no navegador.

## Rodando localmente

**Pré-requisito:** Node.js 20.19+ ou Node.js 22.12+ e conexão com a internet para instalar os pacotes npm.

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (normalmente **http://localhost:5173**).

Para verificar os testes de lógica e gerar uma versão de produção:

```bash
npm run test:logic
npm run build
npm run preview
```

O `npm run build` gera a pasta `dist/`, pronta para hospedagem estática (como Vercel, Netlify ou GitHub Pages, após configurar o caminho base do Vite quando necessário).

## Organização

```text
src/
├── App.tsx                   # Seções e navegação
├── styles.css                # Estilos do site + Tailwind
├── lib/sorting.ts            # Algoritmos e rastreamento fiel de execução
├── data/languages.ts         # Exemplos nas seis linguagens
├── data/challenges.ts        # Exercícios e explicações
└── components/
    ├── Visualizer.tsx        # Controles, métricas e pseudocódigo
    ├── SortingBars.tsx       # Visualização em barras
    ├── CodeGallery.tsx       # Abas, syntax highlighting e cópia
    ├── Comparison.tsx        # Três algoritmos em paralelo
    └── ChallengeSection.tsx  # Quiz
scripts/test-traces.cjs       # Teste automatizado de lógica
```

## Notas importantes

- Números repetidos e negativos são aceitos no visualizador, que mostra valores e índices independentemente da altura visual das barras.
- As trocas contadas são **trocas efetivas entre índices diferentes**; uma comparação sem troca não incrementa esse contador. O Merge Sort reporta **escritas**, não trocas, porque sua estratégia é diferente.
- No gráfico de complexidade as curvas são **ilustrativas**, não benchmarks reais.
- A seção comparativa sincroniza **eventos de execução**, e não duração de CPU; as contagens dos algoritmos não são métricas intercambiáveis de tempo.
- O progresso dos exercícios fica apenas em memória durante a sessão.
- Os links externos abrem com `rel="noopener noreferrer"`.

## Verificação realizada na criação

- **7.239 ordenações** passaram nos três algoritmos (incluindo casos extremos e 2.400 vetores aleatórios), e **30.096 fronteiras de partição Hoare** foram verificadas quanto à separação correta.
- Os exemplos **Python, Java, JavaScript e C++ com Hoare** foram executados com a saída esperada `[0, 1, 2, 3, 7, 8, 10]`. Os exemplos C# e Lua foram revisados, mas não executados neste ambiente (runtimes indisponíveis).
- Os arquivos TypeScript/TSX passaram por uma verificação de **sintaxe**. **A compilação completa via Vite ainda precisa ser executada no ambiente local**, pois o ambiente de criação não conseguiu acessar o registro do npm para instalar dependências. Não foi realizado teste de navegador aqui.

## Referências

- [Centro de Pesquisas — FEMA (CEPEIN)](https://www.fema.edu.br/centro-pesquisas/)
- [Curso em Vídeo — HTML5 e CSS3](https://youtu.be/Ejkb_YpuHWs?si=JCDuQzTt7cqC1LFv)
- [DevDojo — Maratona Java](https://youtu.be/VKjFuX91G5Q?si=abYFtMIdNN0Xjg7L)
- [DIO Bootcamps](https://www.dio.me/en/bootcamp)

Projeto exclusivamente educacional, sem vínculo de administração ou seleção de participantes do CEPEIN.

## Solução de problemas: tela em branco

1. **Não abra o `index.html` diretamente** no navegador e não use a extensão Live Server.
2. No terminal, entre na pasta que contém `package.json` e execute `npm install` e depois `npm run dev`.
3. Acesse o endereço indicado pelo Vite (normalmente `http://localhost:5173/`).
4. Se continuar sem conteúdo, pressione **F12 > Console** e copie a primeira mensagem de erro em vermelho; confira também o terminal do Vite.
5. Tente `npm run build`: os erros de TypeScript ou dependências, caso existam, serão mostrados no terminal.

Esta versão inclui um aviso na página quando a aplicação falha ao renderizar. O aviso não substitui a instalação das dependências.


## Diferenças em relação ao particionamento de Lomuto

- O valor do pivô é escolhido como `a[inicio]`, e os ponteiros `i` e `j` caminham em sentidos opostos.
- `i` para no primeiro valor **maior ou igual** ao pivô; `j` para no primeiro valor **menor ou igual** ao pivô. Se ainda não se cruzaram, os valores são trocados.
- Quando os ponteiros se cruzam, **`j` é a fronteira retornada**; o pivô não precisa estar em seu lugar definitivo.
- As duas chamadas corretas são `quickSort(a, inicio, j)` e `quickSort(a, j + 1, fim)`. Diferente de Lomuto, **não** remova automaticamente o índice `j` das duas chamadas.
- A animação mostra os ponteiros `i/j`, as comparações, as trocas e a fronteira de divisão. Os exemplos nas seis linguagens e as nove perguntas foram atualizados.
- Para verificar a lógica e a propriedade de cada partição, execute `npm run test:logic`.

## Atualizar seu repositório existente

Não é necessário criar outro repositório Git. Extraia o ZIP, copie o **conteúdo** da pasta `QuickSortLab-Hoare/` sobre os arquivos do seu projeto atual (não apague a pasta oculta `.git`) e execute:

```bash
npm install
npm run test:logic
npm run build
git add .
git commit -m "feat: migrar visualizador Quick Sort para Hoare"
git push origin main
```

Se você já conectou esse repositório à Vercel, ela deverá fazer um novo deploy após o push.

## Publicar na Vercel

1. Mantenha `package.json`, `index.html` e `src/` na **raiz** do repositório.
2. Execute `npm install`, `npm run test:logic` e `npm run build`.
3. No painel da Vercel, importe o repositório GitHub e selecione **Framework Preset: Vite**.
4. Use **Root Directory:** `./`, **Build Command:** `npm run build` e **Output Directory:** `dist`.
5. Cada push para `main` pode gerar um novo deploy automaticamente após vincular o projeto ao GitHub.

## Correção da tela branca (realce de sintaxe local (sem Prism.js))

Se aparecia o erro `Cannot set properties of undefined (setting 'class-name')`, o componente `CodeGallery.tsx` carregava `prism-cpp` sem antes importar `prism-c`. Nesta versão, a ordem das dependências foi corrigida.

Para instalar e executar:

```bash
npm install
npm run dev
```

Abra a URL indicada pelo Vite (geralmente http://localhost:5173/).

## Correção do erro de inicialização

Esta edição remove a dependência de Prism.js, responsável pelo erro `Cannot set properties of undefined (setting 'class-name')` no carregamento de algumas combinações de importações via Vite. Os exemplos de seis linguagens continuam com realce de sintaxe, agora realizado por um pequeno analisador local em `src/lib/syntax.ts`. Não há importações de componentes Prism na inicialização.

Para atualizar uma instalação anterior, copie todos os arquivos desta versão sobre o projeto atual (sem apagar `.git`), execute `npm install` e reinicie o Vite. Para limpar o cache do Vite, encerre o servidor e apague `node_modules/.vite`.
# quick-sort-hoare
