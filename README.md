# Nala Glucose Tracker

Projeto desenvolvido em React + Next.js para acompanhamento mockado da glicemia de uma gata com diabetes.

A aplicação permite registrar medições de glicemia, visualizar histórico, acompanhar médias e analisar a evolução dos valores em gráfico. Os dados são armazenados localmente no navegador usando `localStorage`, sem necessidade de backend.

## Tecnologias utilizadas

- Next.js
- React
- TypeScript
- Sass
- Sass Modules
- Redux Toolkit
- React Redux
- Recharts
- UUID
- LocalStorage

## Funcionalidades

- Cadastro de medições de glicemia
- Classificação automática da glicemia:
    - Baixa
    - Normal
    - Alta
    - Muito alta

- Gráfico de evolução das medições
- Cards de resumo
- Histórico de registros
- Remoção de medições
- Persistência local com `localStorage`
- Gerenciamento de estado com Redux Toolkit

## Como rodar o projeto

Instale as dependências:

```bash
npm install
```

Rode o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador:

```bash
http://localhost:3000
```

## Observação

Este projeto tem finalidade educacional e de portfólio. Ele não substitui acompanhamento veterinário, diagnóstico ou orientação profissional.
