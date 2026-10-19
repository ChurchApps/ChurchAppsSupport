---
title: "B1App"
---

# B1App

<div class="article-intro">

O B1App é o aplicativo público para membros da igreja, construído com Next.js. Ele oferece a experiência do membro, incluindo perfis, diretórios de grupos, transmissão ao vivo e páginas de doação.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale o **Node.js 22+** e o **Git** -- veja [Pré-requisitos](../setup/prerequisites)
- Configure o destino da sua API (demo ou local) -- veja [Variáveis de Ambiente](../setup/environment-variables)

</div>

:::warning
O B1App requer o Node.js 22 ou superior. Versões anteriores não são compatíveis.
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

Abra o `.env` e configure as URLs de endpoint `NEXT_PUBLIC_*_API`. Elas podem apontar para a API de demonstração compartilhada (`https://api.demo.churchapps.org`) ou para a sua instância local da API. O arquivo de exemplo pode ainda listar URLs de staging desativadas; substitua-as.

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O servidor de desenvolvimento do Next.js inicia em [http://localhost:3301](http://localhost:3301).

## Comandos Principais

| Comando | Descrição |
|---------|-------------|
| `npm run dev` | Inicia o servidor de desenvolvimento do Next.js na porta 3301 |
| `npm run build` | Build de produção via Next.js |
| `npm run test` | Executa testes end-to-end com Playwright |
| `npm run lint` | Executa o lint do Next.js |

## Principais Variáveis de Ambiente

| Variável | Descrição |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | URLs de endpoint da API para cada módulo |

:::info
O script `postinstall` copia os arquivos de locale e CSS de `@churchapps/apphelper`. Se os componentes aparecerem sem estilo após a instalação, execute `npm run postinstall` manualmente.
:::

## Stack Tecnológica

- **Next.js 16** com TypeScript
- **React 19** para os componentes de interface
- **Material-UI 7** para o sistema de design
- **React Query 5** para o estado do servidor
- **`@churchapps/apphelper*`** pacotes para componentes compartilhados

## Implantação

As builds de produção são implantadas no **S3 + CloudFront**:

1. `npm run build` gera a build otimizada do Next.js
2. A saída da build é sincronizada com um bucket do S3
3. A invalidação do CloudFront é disparada para servir a nova versão

:::tip
Para instruções detalhadas de implantação, veja o guia [Implantação de Aplicativos Web](../deployment/web-apps).
:::
