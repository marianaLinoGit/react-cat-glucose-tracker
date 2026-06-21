# Nala Glucose Tracker

Aplicação web desenvolvida para acompanhar medições de glicemia de uma gata com diabetes, permitindo registrar valores, visualizar histórico, editar informações e acompanhar a evolução por meio de gráficos.

O projeto foi criado com foco em portfólio, demonstrando uso de React, Next.js, TypeScript, Redux Toolkit, Sass Modules, persistência local e visualização de dados.

## Sobre o projeto

O Nala Glucose Tracker é um projeto front-end mockado, sem backend, que utiliza `localStorage` para persistir os dados no navegador.

A aplicação permite registrar medições de glicemia em mg/dL, classificar automaticamente os valores como baixos, normais, altos ou muito altos, e visualizar a evolução das medições em gráfico.

> Este projeto tem finalidade educacional e de portfólio. Ele não substitui acompanhamento veterinário, diagnóstico ou orientação profissional.

## Funcionalidades

- Adicionar nova medição de glicemia
- Validar campos obrigatórios no formulário
- Bloquear cadastro de medições em datas futuras
- Classificar automaticamente a glicemia
- Editar medições registradas
- Remover medições com modal de confirmação
- Visualizar histórico de registros
- Visualizar gráfico de evolução da glicemia
- Exibir cards de resumo:
    - Última medição
    - Média das medições
    - Menor valor registrado
    - Maior valor registrado

- Persistir dados no navegador usando `localStorage`

## Tecnologias utilizadas

- **Next.js**: framework React utilizado para estruturação da aplicação
- **React**: construção da interface com componentes reutilizáveis
- **TypeScript**: tipagem estática para maior segurança e organização do código
- **Redux Toolkit**: gerenciamento de estado global da aplicação
- **React Redux**: integração entre Redux e componentes React
- **Sass Modules**: estilização modular por componente
- **Recharts**: criação do gráfico de evolução da glicemia
- **Lucide React**: biblioteca de ícones utilizada nos botões e ações da interface
- **UUID**: geração de identificadores únicos para cada medição
- **LocalStorage**: persistência local dos dados sem necessidade de backend

## Decisões técnicas

### Projeto sem backend

A aplicação foi desenvolvida sem backend para manter o foco no front-end. Os dados são armazenados no `localStorage`, permitindo simular persistência de informações diretamente no navegador.

### Estado global com Redux Toolkit

As medições de glicemia são armazenadas em um estado global usando Redux Toolkit. Isso facilita o compartilhamento dos dados entre componentes como formulário, gráfico, cards de resumo e histórico.

### Estrutura por feature

A regra de negócio relacionada à glicemia fica centralizada em `features/glucose`, separando tipos, regras, reducers e seletores.

### Sass Modules

Cada componente possui seu próprio arquivo `.module.scss`, evitando conflito de estilos e mantendo a manutenção mais simples.

## Estrutura de pastas

```txt
src/
  app/
    favicon.ico
    layout.tsx
    page.tsx
    globals.scss

  components/
    ConfirmModal/
    GlucoseChart/
    GlucoseForm/
    GlucoseList/
    StatusBadge/
    SummaryCards/

  features/
    glucose/
      glucoseSelectors.ts
      glucoseSlice.ts
      glucoseTypes.ts
      glucoseUtils.ts

  store/
    hooks.ts
    store.ts
    StoreProvider.tsx

  styles/
    _variables.scss
```

## Como rodar o projeto

Clone o repositório:

```bash
git clone https://github.com/marianaLinoGit/react-cat-glucose-tracker
```

Acesse a pasta do projeto:

```bash
cd react-cat-glucose-tracker
```

Instale as dependências:

```bash
npm install
```

Rode o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```

Acesse no navegador:

```txt
http://localhost:3000
```

## Scripts disponíveis

```bash
npm run dev
```

Inicia o servidor de desenvolvimento.

```bash
npm run build
```

Gera a versão de produção da aplicação.

```bash
npm run start
```

Executa a versão de produção após o build.

```bash
npm run lint
```

Executa a verificação de lint do projeto.

## Instalações principais

Dependências utilizadas no projeto:

```bash
npm install @reduxjs/toolkit react-redux recharts uuid lucide-react
```

Sass:

```bash
npm install sass
```

Tipos do UUID:

```bash
npm install -D @types/uuid
```

## Possíveis melhorias futuras

- Cadastro de múltiplos pets
- Configuração personalizada dos limites de glicemia
- Exportação dos dados
- Exportação de relatório em PDF
- Filtro por período
- Campo para dose de insulina
- Campo para alimentação antes/depois da medição
- Dashboard com tendência de alta ou queda
- Publicação/Deploy
- Testes unitários
- Testes de componentes

## Status do projeto

Em desenvolvimento.

## Objetivo do projeto

Este projeto foi criado para demonstrar habilidades em desenvolvimento front-end moderno, incluindo componentização, gerenciamento de estado, tipagem com TypeScript, estilização modular, persistência local e visualização de dados.
