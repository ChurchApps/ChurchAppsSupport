---
title: "Implantação de APIs"
---

# Implantação de APIs

<div class="article-intro">

As APIs do ChurchApps são implantadas como funções AWS Lambda usando o Serverless Framework. Esta página cobre o fluxo de build, implantação e configuração para ambientes de staging e produção.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure a API localmente -- veja [Configuração Local da API](../api/local-setup)
- Configure as credenciais AWS na sua máquina
- Certifique-se de ter acesso à conta AWS de destino

</div>

## Build

As APIs são construídas para produção usando uma configuração TypeScript dedicada:

```bash
npm run build:prod
```

Isso usa o `tsconfig.prod.json` para compilar o projeto para o runtime Lambda.

## Implantação

Implantar em staging:

```bash
npm run deploy-staging
```

Implantar em produção:

```bash
npm run deploy-prod
```

## O Que É Criado

Cada implantação de API cria ou atualiza as seguintes funções AWS Lambda:

| Função | Propósito |
|--------|-----------|
| `web` | Manipulador de requisições HTTP via API Gateway |
| `socket` | Manipulador de conexões WebSocket |
| `timer15Min` | Tarefa agendada que executa a cada 15 minutos |
| `timerMidnight` | Tarefa agendada que executa diariamente à meia-noite |

## Configuração de Ambiente

Em ambientes implantados, a configuração é lida do **AWS SSM Parameter Store** em vez de arquivos `.env`. Isso mantém segredos fora do pacote de implantação e permite alterações de configuração sem reimplantar.

:::warning
Nunca faça commit de credenciais de produção no repositório. Todas as configurações sensíveis devem ser armazenadas no AWS SSM Parameter Store e acessadas em tempo de execução.
:::

:::tip
Para testar uma implantação sem afetar a produção, sempre implante em staging primeiro usando `npm run deploy-staging` e verifique as alterações antes de promover para prod.
:::

## Artigos Relacionados

- **[Configuração Local da API](../api/local-setup)** -- Configurando a API para desenvolvimento
- **[Estrutura do Módulo](../api/module-structure)** -- Entendendo a arquitetura de funções Lambda
- **[Implantação de Aplicações Web](./web-apps)** -- Implantando as aplicações frontend
