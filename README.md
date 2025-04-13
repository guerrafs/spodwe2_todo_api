# spodwe2_todo_api

Aplicação de API de Lista de Tarefas

## Descrição

Este projeto é uma API de lista de tarefas (Todo List App) desenvolvida com Node.js, Express e SQLite (via better-sqlite3). A aplicação permite:
- Listar todas as tarefas (todos).
- Criar novos todos.
- Atualizar o status de tarefas para concluídas ou não concluídas.

## Funcionalidades

- Listagem de todos os todos.
- Criação de tarefa via endpoint POST.
- Atualização de status de tarefa via endpoint PUT.
- Edição de tarefas em andamento via endpoint PUT
- Filtros de visualização na interface (todos, apenas não concluídos, apenas concluídos).

## Estrutura do Projeto

- **src/**
  - `app.js`: Servidor Express que gerencia a API.
  - `main.js`: Lógica para manipulação da interface e interação com a API.
  - `db.mjs`: Configuração do banco de dados SQLite e execução de queries.
  - `style.css`: Estilos da interface.
- `index.html`: Arquivo principal da interface web.
- `package.json`: Dependências e scripts do projeto.
- `samples/`: Exemplos de payloads para teste dos endpoints.

## Pré-requisitos

- Node.js (>=14.x)
- npm ou yarn

## Instalação

```bash
npm install
```

### Execução do Vite (Interface)

```bash
npm run dev
```

### Execução do Servidor

```bash
node src/app.js
```

## Licença

Este projeto está licenciado sob a Licença MIT.