export type Language = { id: string; name: string; extension: string; note: string; code: string };
export const languages: Language[] = [
  {
    id: 'python', name: 'Python', extension: 'main.py',
    note: 'Dois ponteiros caminham em sentidos opostos. O retorno j é a fronteira entre as regiões; não excluímos j da recursão esquerda.',
    code: `# Quick Sort: partição de Hoare, pivô no primeiro elemento
def particionar(a, inicio, fim):
    pivo = a[inicio]
    i, j = inicio - 1, fim + 1

    while True:
        while True:
            i += 1
            if a[i] >= pivo:
                break
        while True:
            j -= 1
            if a[j] <= pivo:
                break
        if i >= j:
            return j  # Fronteira; não é a posição final do pivô
        a[i], a[j] = a[j], a[i]

def quick_sort(a, inicio, fim):
    if inicio >= fim:
        return
    fronteira = particionar(a, inicio, fim)
    quick_sort(a, inicio, fronteira)
    quick_sort(a, fronteira + 1, fim)

numeros = [8, 3, 1, 7, 0, 10, 2]
quick_sort(numeros, 0, len(numeros) - 1)
print(numeros)  # [0, 1, 2, 3, 7, 8, 10]`
  },
  {
    id: 'java', name: 'Java', extension: 'Main.java',
    note: 'O método particionar retorna uma fronteira, e as chamadas recursivas incluem essa fronteira apenas do lado esquerdo.',
    code: `import java.util.Arrays;

public class Main {
    // Hoare: pivô no primeiro elemento e dois ponteiros
    static int particionar(int[] a, int inicio, int fim) {
        int pivo = a[inicio];
        int i = inicio - 1;
        int j = fim + 1;

        while (true) {
            do { i++; } while (a[i] < pivo);
            do { j--; } while (a[j] > pivo);
            if (i >= j) return j;

            int temp = a[i];
            a[i] = a[j];
            a[j] = temp;
        }
    }

    static void quickSort(int[] a, int inicio, int fim) {
        if (inicio >= fim) return;
        int fronteira = particionar(a, inicio, fim);
        quickSort(a, inicio, fronteira);
        quickSort(a, fronteira + 1, fim);
    }

    public static void main(String[] args) {
        int[] numeros = {8, 3, 1, 7, 0, 10, 2};
        quickSort(numeros, 0, numeros.length - 1);
        System.out.println(Arrays.toString(numeros));
    }
}`
  },
  {
    id: 'csharp', name: 'C#', extension: 'Program.cs',
    note: 'Exemplo com top-level statements (C# 9+) e funções locais estáticas; as trocas usam tuplas.',
    code: `using System;

int[] numeros = { 8, 3, 1, 7, 0, 10, 2 };
QuickSort(numeros, 0, numeros.Length - 1);
Console.WriteLine($"[{string.Join(", ", numeros)}]");

static int Particionar(int[] a, int inicio, int fim)
{
    int pivo = a[inicio];
    int i = inicio - 1;
    int j = fim + 1;
    while (true)
    {
        do { i++; } while (a[i] < pivo);
        do { j--; } while (a[j] > pivo);
        if (i >= j) return j;
        (a[i], a[j]) = (a[j], a[i]);
    }
}

static void QuickSort(int[] a, int inicio, int fim)
{
    if (inicio >= fim) return;
    int fronteira = Particionar(a, inicio, fim);
    QuickSort(a, inicio, fronteira);
    QuickSort(a, fronteira + 1, fim);
}`
  },
  {
    id: 'cpp', name: 'C++', extension: 'main.cpp',
    note: 'std::vector armazena os valores e std::swap realiza as trocas. Retornamos j como limite inclusivo da subparte esquerda.',
    code: `#include <iostream>
#include <vector>
#include <utility>
using namespace std;

// Partição de Hoare com pivô na primeira posição
int particionar(vector<int>& a, int inicio, int fim) {
    int pivo = a[inicio];
    int i = inicio - 1;
    int j = fim + 1;
    while (true) {
        do { ++i; } while (a[i] < pivo);
        do { --j; } while (a[j] > pivo);
        if (i >= j) return j;
        swap(a[i], a[j]);
    }
}

void quickSort(vector<int>& a, int inicio, int fim) {
    if (inicio >= fim) return;
    int fronteira = particionar(a, inicio, fim);
    quickSort(a, inicio, fronteira);
    quickSort(a, fronteira + 1, fim);
}

int main() {
    vector<int> numeros = {8, 3, 1, 7, 0, 10, 2};
    quickSort(numeros, 0, (int)numeros.size() - 1);
    cout << "[";
    for (size_t i = 0; i < numeros.size(); ++i) {
        if (i) cout << ", ";
        cout << numeros[i];
    }
    cout << "]" << endl;
}`
  },
  {
    id: 'javascript', name: 'JavaScript', extension: 'main.js',
    note: 'A desestruturação facilita as trocas; os ponteiros param em a[i] >= pivô e a[j] <= pivô.',
    code: `// Hoare: primeiro elemento como pivô
function particionar(a, inicio, fim) {
  const pivo = a[inicio];
  let i = inicio - 1;
  let j = fim + 1;
  while (true) {
    do { i++; } while (a[i] < pivo);
    do { j--; } while (a[j] > pivo);
    if (i >= j) return j;
    [a[i], a[j]] = [a[j], a[i]];
  }
}

function quickSort(a, inicio, fim) {
  if (inicio >= fim) return;
  const fronteira = particionar(a, inicio, fim);
  quickSort(a, inicio, fronteira);
  quickSort(a, fronteira + 1, fim);
}

const numeros = [8, 3, 1, 7, 0, 10, 2];
quickSort(numeros, 0, numeros.length - 1);
console.log(numeros); // [0, 1, 2, 3, 7, 8, 10]`
  },
  {
    id: 'lua', name: 'Lua', extension: 'main.lua',
    note: 'Em Lua, tabelas-sequência começam no índice 1. O repeat ... until permite avançar/recuar antes de testar o pivô.',
    code: `-- Hoare: primeiro elemento como pivô (índices Lua: 1..n)
local function particionar(a, inicio, fim)
    local pivo = a[inicio]
    local i = inicio - 1
    local j = fim + 1
    while true do
        repeat
            i = i + 1
        until a[i] >= pivo
        repeat
            j = j - 1
        until a[j] <= pivo
        if i >= j then
            return j
        end
        a[i], a[j] = a[j], a[i]
    end
end

local function quick_sort(a, inicio, fim)
    if inicio >= fim then return end
    local fronteira = particionar(a, inicio, fim)
    quick_sort(a, inicio, fronteira)
    quick_sort(a, fronteira + 1, fim)
end

local numeros = {8, 3, 1, 7, 0, 10, 2}
quick_sort(numeros, 1, #numeros)
print("[" .. table.concat(numeros, ", ") .. "]")
-- [0, 1, 2, 3, 7, 8, 10]`
  }
];
