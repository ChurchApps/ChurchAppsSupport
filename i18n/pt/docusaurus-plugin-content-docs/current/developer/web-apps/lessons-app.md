---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

O LessonsApp é a aplicação de gerenciamento de conteúdo de lições do [Lessons.church](https://lessons.church). Ele oferece uma interface para criar, organizar e publicar currículos de lições para igrejas, desenvolvida com Next.js e React.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Instale o **Node.js 22+** e o **Git** -- veja [Pré-requisitos](../setup/prerequisites)
- Configure o destino da sua API (LessonsApi local) -- veja [Variáveis de Ambiente](../setup/environment-variables)

</div>

:::warning
O LessonsApp requer o Node.js 22 ou superior. Versões anteriores não são compatíveis.
:::

## Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Instale as dependências

```bash
cd LessonsApp
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo de ambiente para `.env` e configure os endpoints da API:

```bash
cp dotenv.sample.txt .env
```

Atualize as URLs dos endpoints da API para apontar para a sua instância local da LessonsApi (`http://localhost:8090`). A API de staging do Lessons foi desativada, então substitua quaisquer URLs `api.staging.lessons.church` que ainda estejam no arquivo de exemplo.

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O servidor de desenvolvimento do Next.js inicia em [http://localhost:3501](http://localhost:3501).

## Comandos principais

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento do Next.js na porta 3501 |
| `npm run build` | Gera o build de produção via Next.js |

## Stack tecnológica

- **Next.js 16** com TypeScript
- **React 19** para os componentes de interface
- Pacotes **`@churchapps/apphelper*`** para componentes compartilhados

:::info
O LessonsApp se comunica com o backend **LessonsApi**, que é uma API separada da API principal da ChurchApps. Certifique-se de que o ambiente esteja configurado com o endpoint correto da API de Lessons.
:::

## Implantação

As builds de produção são implantadas no **S3 + CloudFront**:

1. `npm run build` gera o build otimizado do Next.js
2. O resultado do build é sincronizado com um bucket do S3
3. A invalidação do CloudFront é disparada para servir a nova versão

:::tip
Para instruções detalhadas de implantação, veja o guia [Implantação de Aplicativos Web](../deployment/web-apps).
:::
