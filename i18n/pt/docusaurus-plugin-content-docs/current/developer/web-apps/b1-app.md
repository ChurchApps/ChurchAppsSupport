---
title: "B1App"
---

# B1App

<div class="article-intro">

O B1App é a aplicação pública para membros da igreja construída com Next.js. Ele fornece a experiência do membro incluindo perfis, diretórios de grupos, transmissão ao vivo e páginas de doação.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale **Node.js 22+** e **Git** -- veja [Pré-requisitos](../setup/prerequisites)
- Configure seu alvo de API (staging ou local) -- veja [Variáveis de Ambiente](../setup/environment-variables)

</div>

:::warning
O B1App requer Node.js 22 ou posterior. Versões anteriores não são suportadas.
:::

## Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Instale as dependências

```bash
cd B1App
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp dotenv.sample.txt .env
```

Abra o `.env` e configure as URLs dos endpoints `NEXT_PUBLIC_*_API`. Essas podem apontar para a API de staging ou para sua instância local da API.

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O servidor de desenvolvimento Next.js inicia em [http://localhost:3301](http://localhost:3301).

## Comandos Principais

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Iniciar servidor de desenvolvimento Next.js na porta 3301 |
| `npm run build` | Build de produção via Next.js |
| `npm run test` | Executar testes end-to-end com Playwright |
| `npm run lint` | Executar lint do Next.js |

## Variáveis de Ambiente Principais

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_*_API` | URLs dos endpoints de API para cada módulo |

:::info
O script `postinstall` copia arquivos de localização e CSS do `@churchapps/apphelper`. Se os componentes aparecerem sem estilo após a instalação, execute `npm run postinstall` manualmente.
:::

## Stack Tecnológica

- **Next.js 16** com TypeScript
- **React 19** para componentes de UI
- **Material-UI 7** para sistema de design
- **React Query 5** para estado do servidor
- Pacotes **`@churchapps/apphelper*`** para componentes compartilhados

## Implantação

Os builds de produção são implantados no **S3 + CloudFront**:

1. `npm run build` gera o build otimizado do Next.js
2. A saída do build é sincronizada com um bucket S3
3. A invalidação do CloudFront é acionada para servir a nova versão

:::tip
Para instruções detalhadas de implantação, veja o guia de [Implantação de Aplicações Web](../deployment/web-apps).
:::
