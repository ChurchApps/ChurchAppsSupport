---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

O B1Admin é o painel de administração da igreja -- uma aplicação React de página única construída com Vite e Material-UI. A equipe da igreja o utiliza para gerenciar pessoas, grupos, presença, doações, conteúdo e mais.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale **Node.js 22+** e **Git** -- veja [Pré-requisitos](../setup/prerequisites)
- Configure seu alvo de API (staging ou local) -- veja [Variáveis de Ambiente](../setup/environment-variables)

</div>

## Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Instale as dependências

```bash
cd B1Admin
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp dotenv.sample.txt .env
```

Abra o `.env` e configure os endpoints da API. Você pode apontar para a API de staging ou para sua instância local da API.

### 4. Inicie o servidor de desenvolvimento

```bash
npm start
```

Isso inicia o servidor de desenvolvimento Vite. A aplicação estará disponível no seu navegador com hot module replacement habilitado.

## Variáveis de Ambiente Principais

| Variável | Descrição |
|----------|-----------|
| `REACT_APP_STAGE` | Nome do ambiente (ex: `local`, `staging`, `prod`) |
| `PORT` | Porta do servidor de desenvolvimento (padrão: `3101`) |
| `REACT_APP_*_API` | URLs dos endpoints de API para cada módulo |

:::info
O script `postinstall` copia arquivos de localização e CSS do `@churchapps/apphelper`. Se os componentes aparecerem sem estilo, execute `npm run postinstall` manualmente.
:::

## Comandos Principais

| Comando | Descrição |
|---------|-----------|
| `npm start` | Iniciar servidor de desenvolvimento Vite |
| `npm run build` | Build de produção via Vite |
| `npm run test` | Executar testes end-to-end com Playwright |
| `npm run lint` | Executar ESLint com auto-correção |

## Stack Tecnológica

- **React 19** com TypeScript
- **Vite** para ferramentas de build e servidor de desenvolvimento
- **Material-UI 7** para componentes de UI
- **React Query 5** para estado do servidor
- Pacotes **`@churchapps/apphelper*`** para componentes compartilhados

## Implantação

Os builds de produção são implantados no **S3 + CloudFront**:

1. `npm run build` gera os assets estáticos
2. Os assets são sincronizados com um bucket S3
3. A invalidação do CloudFront é acionada para servir a nova versão

:::tip
Para instruções detalhadas de implantação, veja o guia de [Implantação de Aplicações Web](../deployment/web-apps).
:::
