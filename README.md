# 🗃️ Pokédex TypeScript Lite

Uma aplicação em linha de comando (CLI) desenvolvida em **TypeScript** e **Node.js** que consome a **PokeAPI**, permitindo buscar dados de Pokémon em tempo real e gerenciar uma Box local com persistência de dados em JSON.

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js)
![GitHub](https://img.shields.io/badge/GitHub-Versionamento-black?logo=github)
![Status](https://img.shields.io/badge/Status-Concluído-success)

---

# 🔗 Links do Projeto

- Repositório GitHub: **[Acessar Repositório](https://github.com/elenfrankowski/pokedex-typescript-lite)**
- Kanban (Trello): **[Acessar Quadro Trello](https://trello.com/b/qdQ04Nhe/mini-projeto-pokedex-typescript-lite)**

---

# 📑 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Objetivo](#-objetivo)
- [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [Funcionalidades](#-funcionalidades)
- [Demonstração](#-demonstração)
- [Arquitetura do Projeto](#️-arquitetura-do-projeto)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#️-instalação)
- [Execução](#️-execução)
- [Conceitos Aplicados](#-conceitos-aplicados)
- [Kanban](#-kanban)
- [Branches Utilizadas](#-branches-utilizadas)
- [Requisitos Atendidos](#-requisitos-atendidos)
- [Melhorias Futuras](#-melhorias-futuras)
- [Desenvolvedora](#-desenvolvedora)

---

# 🎯 Sobre o Projeto

O Pokédex TypeScript Lite foi desenvolvido com o objetivo de praticar conceitos fundamentais de desenvolvimento back-end utilizando Node.js e TypeScript.

A aplicação consulta dados diretamente da PokeAPI, transforma as informações recebidas em objetos simplificados e permite armazená-las em uma Box local com persistência em arquivo JSON.

---

# 🚀 Objetivo

O objetivo deste projeto é aplicar, na prática, os conhecimentos adquiridos durante os estudos de TypeScript e Node.js, desenvolvendo uma aplicação em camadas capaz de consumir uma API externa, manipular dados, persistir informações localmente e seguir boas práticas de organização e versionamento de código.
Praticar os principais conceitos estudados:

- Node.js
- JavaScript Back-end
- TypeScript
- Interfaces
- Funções Tipadas
- Arrays e Objetos
- JSON
- Métodos de Array
- Classes
- Async/Await
- Fetch API
- Tratamento de Erros
- Git
- GitHub
- GitFlow
- Kanban

---

# 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|------------|------------|
| Node.js | Ambiente de execução |
| TypeScript | Tipagem estática |
| TSX | Execução de arquivos TypeScript |
| PokeAPI | Fonte dos dados |
| Git | Controle de versão |
| GitHub | Hospedagem do projeto |
| fs/promises | Persistência em JSON |
| readline-sync | Interação via terminal |

---

# ✨ Funcionalidades

✅ Buscar Pokémon por nome ou ID

✅ Tratar erro de Pokémon inexistente

✅ Transformar resposta da API em objeto simplificado

✅ Adicionar Pokémon ao catálogo local

✅ Impedir Pokémon duplicado

✅ Listar Pokémon da Box

✅ Calcular média de weight (peso) dos Pokémon utilizando o método `.reduce()`

✅ Remover Pokémon por ID

✅ Filtrar Pokémon por tipo

✅ Exibir HP, Ataque e Defesa

✅ Persistir dados em arquivo JSON

✅ Exibir mensagens estilizadas no terminal

---

# 📸 Demonstração

## 🔄 Fluxo de Teste Automático Inicial

Ao iniciar a aplicação, uma rotina de testes é executada automaticamente para validar funcionalidades essenciais como busca, tratamento de erros, persistência e prevenção de duplicidade, gerando o seguinte log completo:

```text
=========================================
🔄 INICIANDO FLUXO DE TESTE AUTOMÁTICO
=========================================
[OK] ✅ pikachu adicionado ao catálogo.
[OK] ✅ charmander adicionado ao catálogo.
[AVISO] ⚠️  pikachu já está no catálogo.
[ERRO] ❌ Pokémon não encontrado.

--- 📦 CATÁLOGO ATUAL ---
🆔 #25 - 📛 pikachu | 🌿 Tipos: electric | 📏 Altura: 4 | ⚖️ Peso: 60
📊 Stats -> ❤️ HP: 35 | ⚔️ ATK: 55 | 🛡️ DEF: 40
🆔 #4 - 📛 charmander | 🌿 Tipos: fire | 📏 Altura: 6 | ⚖️ Peso: 85
📊 Stats -> ❤️ HP: 39 | ⚔️ ATK: 52 | 🛡️ DEF: 43

[OK] ✅ Pokémon removido do catálogo.

--- 📦 CATÁLOGO ATUAL ---
🆔 #4 - 📛 charmander | 🌿 Tipos: fire | 📏 Altura: 6 | ⚖️ Peso: 85
📊 Stats -> ❤️ HP: 39 | ⚔️ ATK: 52 | 🛡️ DEF: 43
===================================
🔄 FIM DO FLUXO DE TESTE AUTOMÁTICO.
=====================================
```

---

## 📦 Listagem da Box com Cálculo de Média

Exemplo da listagem estilizada exibindo os Pokémons armazenados e o cálculo automático da média de peso utilizando o método `.reduce()`.

```text
=================== 📦 SUA BOX DE POKÉMONS ===================

🆔 #1 - 📛 Bulbasaur
🌿 Tipos: Grass, Poison
📏 Altura: 0.7 m
⚖️ Peso: 6.9 kg

📊 Stats
❤️ HP: 45
⚔️ ATK: 49
🛡️ DEF: 49

--------------------------------------------------------------

🆔 #150 - 📛 Mewtwo
🌿 Tipos: Psychic
📏 Altura: 2.0 m
⚖️ Peso: 122.0 kg

📊 Stats
❤️ HP: 106
⚔️ ATK: 110
🛡️ DEF: 90

==============================================================
⚖️ Peso Médio dos Pokémons na Box: 64.5 kg
==============================================================
```
---

# 🏗️ Arquitetura do Projeto

O projeto foi organizado em camadas para promover separação de responsabilidades, legibilidade e facilidade de manutenção.

## Models

Responsáveis pela definição das estruturas de dados utilizadas pela aplicação.

```text
src/models/
```

Exemplo:

```ts
PokemonResumo
```

---

## Services

Responsáveis pela comunicação com serviços externos e persistência de dados.

```text
src/services/
```

### ApiService

Realiza consultas à PokeAPI.

### BoxService

Realiza leitura e escrita do arquivo JSON utilizado como armazenamento local.

---

## Repository

Responsável pelas regras de negócio e manipulação da Box de Pokémon.

```text
src/repository/
```

### Responsabilidades

- Salvar Pokémon
- Validar duplicidade
- Remover Pokémon
- Filtrar por tipo
- Calcular média de peso

---

## Controllers

Responsáveis pelo fluxo da aplicação e interação com o usuário.

```text
src/controllers/
```

### TerminalController

Controla o menu interativo, recebe entradas do usuário e direciona as ações.

---

## Utils

Funções auxiliares para formatação visual dos dados exibidos no terminal.

```text
src/utils/
```

# 🧠 Métodos de Array Aplicados

A aplicação utiliza diversos métodos nativos do JavaScript para manipulação eficiente dos dados.

| Método | Aplicação |
|----------|------------|
| `.map()` | Transformação dos dados recebidos da API |
| `.some()` | Verificação de duplicidade |
| `.filter()` | Remoção de Pokémon por ID |
| `.reduce()` | Cálculo da média de peso |
| `.find()` | Busca de atributos específicos |
| `.forEach()` | Exibição das listagens |

---

# 📚 Conceitos Aplicados

## TypeScript

Utilizado para garantir tipagem estática e maior segurança durante o desenvolvimento.

Exemplos:

```ts
Promise<boolean>
Promise<PokemonResumo[]>
id: number
```

---

## Interface PokemonResumo

Responsável por representar apenas os dados necessários da resposta da API.

```ts
interface PokemonResumo {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}
```

---

## Fetch + Async/Await

A comunicação com a PokeAPI é realizada de forma assíncrona.

```ts
const response = await fetch(url);
```

---

## Tratamento de Erros

Utilização de blocos `try/catch` para capturar falhas de requisição e erros de execução.

```ts
try {
  // lógica
} catch (error) {
  // tratamento
}
```

---

## Persistência em JSON

Os Pokémon capturados permanecem armazenados mesmo após o encerramento da aplicação através do arquivo:

```text
pc_box.json
```

A leitura e gravação são realizadas utilizando:

```ts
fs/promises
```

> ⚠️ O arquivo `pc_box.json` é criado automaticamente pela aplicação para armazenar os Pokémon capturados.

---

# 📂 Estrutura do Projeto

```text
pokedex-typescript-lite/
│
├── src/
│   ├── controllers/
│   │   └── TerminalController.ts
│   │
│   ├── models/
│   │   └── PokemonResumo.ts
│   │
│   ├── repository/
│   │   ├── BoxRepository.ts
│   │   └── catalogoPokemon.ts
│   │
│   ├── services/
│   │   ├── apiService.ts
│   │   └── boxService.ts
│   │
│   ├── utils/
│   │   └── textFormatters.ts
│   │
│   └── main.ts
│
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── package.json
├── package-lock.json
├── tsconfig.json
├── pc_box.json
└── README.md
```

---

# 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de possuir instalado:

- Node.js
- npm
- Git

Verifique as versões:

```bash
node -v
npm -v
git --version
```

---

# ⚙️ Instalação

Clone o repositório:

```bash
git clone https://github.com/elenfrankowski/pokedex-typescript-lite.git
```

Entre na pasta:

```bash
cd pokedex-typescript-lite
```

Instale as dependências:

```bash
npm install
```

---

# ▶️ Execução

Execute o projeto em ambiente de desenvolvimento (isso irá rodar o fluxo automático inicial e em seguida abrirá o menu interativo):

```bash
npm run start
```

---

# 📌 Kanban

O gerenciamento das tarefas foi realizado utilizando Kanban através do Trello.

🔗 [Acessar Quadro Trello](https://trello.com/b/qdQ04Nhe/mini-projeto-pokedex-typescript-lite)

---

# 🌿 Branches Utilizadas

O desenvolvimento do projeto seguiu rigorosamente as práticas do GitFlow para o isolamento de features e organização do histórico de commits. As branches utilizadas foram:

- `develop`: Branch padrão de integração contínua do projeto.
- `adjust/alinhamento-projeto`: Ajustes finais de formatação, exibição de dados e integração do método `.reduce()`.
- `feat/remover-pokemon-id`: Implementação da lógica de exclusão física de um Pokémon da Box baseado no ID.
- `feat/filtrar-pokemon-tipo`: Desenvolvimento do filtro personalizado por tipos de elementos.
- `feat/listar-pokemon-box`: Construção da lógica de leitura e renderização estruturada dos Pokémons na tela.
- `feat/capturar-pokemon-box`: Implementação do fluxo de salvamento e validação contra Pokémons duplicados.
- `feat/integrar-busca-api`: Integração com os endpoints da PokéAPI para busca em tempo real.
- `feat/loop-menu`: Estruturação do menu interativo CLI e controle de repetição do terminal.
- `feat/text-formatters`: Criação de funções utilitárias puras para estilização visual de textos, pesos e medidas.
- `feat/catalogo-pokemon`: Desenvolvimento inicial da estrutura de dados da coleção.
- `feat/box-service`: Criação da camada de leitura e persistência em arquivos com `fs/promises`.
- `feat/service-api`: Abstração inicial e configuração de chamadas HTTP assíncronas com Fetch.
- `feat/interfaces-pokemon`: Mapeamento e tipagem inicial das interfaces de contratos e payloads do sistema.
```
---

# ✅ Requisitos Atendidos

- [x] Consumo de API externa (PokeAPI)
- [x] Utilização de TypeScript
- [x] Uso de Interfaces
- [x] Programação Orientada a Objetos
- [x] Métodos de Array
- [x] Persistência em JSON
- [x] Tratamento de Erros
- [x] Git e GitHub
- [x] GitFlow
- [x] Kanban
- [x] Estrutura em Camadas
- [x] Menu Interativo em Terminal

---

# 🔮 Melhorias Futuras

- Favoritar Pokémon
- Ordenar Pokémon por peso, altura ou nome
- Exibir estatísticas avançadas da Box
- Implementar testes automatizados
- Criar interface gráfica web

---

# ⭐ Diferenciais do Projeto

- Arquitetura organizada em camadas
- Persistência local utilizando JSON
- Tratamento de erros para requisições inválidas
- Utilização de métodos avançados de Array
- Estrutura preparada para expansão futura
- Aplicação de GitFlow durante o desenvolvimento
- Planejamento e acompanhamento via Kanban

---

# 👩‍💻 Desenvolvedora

**Elen Frankowski**

🔗 GitHub: [github.com/elenfrankowski](https://github.com/elenfrankowski)

📚 Projeto desenvolvido como atividade prática do módulo de TypeScript e Node.js, aplicando conceitos de Programação Orientada a Objetos, consumo de APIs REST, persistência de dados em JSON, GitFlow e organização ágil com Kanban.

