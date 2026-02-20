---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

O LessonsApp é a aplicação de gerenciamento de conteúdo de lições para o [Lessons.church](https://lessons.church). Ele fornece uma interface para criar, organizar e publicar currículos de lições para igrejas, construído com Next.js e React.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale **Node.js 22+** e **Git** -- veja [Pré-requisitos](../setup/prerequisites)
- Configure seu alvo de API (staging ou local) -- veja [Variáveis de Ambiente](../setup/environment-variables)

</div>

:::warning
O LessonsApp requer Node.js 22 ou posterior. Versões anteriores não são suportadas.
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

Atualize as URLs dos endpoints de API para apontar para a API de staging ou para sua instância local da API.

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O servidor de desenvolvimento Next.js inicia em [http://localhost:3501](http://localhost:3501).

## Comandos Principais

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Iniciar servidor de desenvolvimento Next.js na porta 3501 |
| `npm run build` | Build de produção via Next.js |

## Stack Tecnológica

- **Next.js 16** com TypeScript
- **React 19** para componentes de UI
- Pacotes **`@churchapps/apphelper*`** para componentes compartilhados

:::info
O LessonsApp se comunica com o backend **LessonsApi**, que é uma API separada da API principal do ChurchApps. Certifique-se de que seu ambiente esteja configurado com o endpoint correto da API de Lições.
:::

## Implantação

Os builds de produção são implantados no **S3 + CloudFront**:

1. `npm run build` gera o build otimizado do Next.js
2. A saída do build é sincronizada com um bucket S3
3. A invalidação do CloudFront é acionada para servir a nova versão

:::tip
Para instruções detalhadas de implantação, veja o guia de [Implantação de Aplicações Web](../deployment/web-apps).
:::
