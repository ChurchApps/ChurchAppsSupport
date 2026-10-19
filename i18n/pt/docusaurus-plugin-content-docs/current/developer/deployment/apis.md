---
title: "Implantação da API"
---

# Implantação da API

<div class="article-intro">

As APIs da ChurchApps são implantadas como funções AWS Lambda usando o Serverless Framework. Esta página descreve o fluxo de build, implantação e configuração para os ambientes de demonstração e de produção.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Configure a API localmente -- veja [Configuração Local da API](../api/local-setup)
- Configure as credenciais da AWS na sua máquina
- Certifique-se de ter acesso à conta AWS de destino

</div>

## Build

As APIs são compiladas para produção usando uma configuração dedicada do TypeScript:

```bash
npm run build:prod
```

Isso usa o `tsconfig.prod.json` para compilar o projeto para o runtime do Lambda.

## Implantação

Para implantar no ambiente de demonstração:

```bash
npm run deploy-demo
```

Para implantar em produção:

```bash
npm run deploy-prod
```

Na prática, a Api é implantada pelo GitHub Actions: **Deploy Demo** roda a cada push para `main`, e **Deploy Prod** é iniciado manualmente (workflow dispatch). Não existe mais um ambiente de staging.

## Migrações do banco de dados

O **Deploy Prod** aplica as migrações pendentes do banco de dados como parte da implantação. Os bancos de dados de produção só aceitam conexões de dentro da VPC, então logo após o `serverless deploy` o workflow invoca a função Lambda `migrate` (`api-Prod-migrate`), que executa as migrações pendentes de cada módulo e retorna `{ ok, environment, modules }`. Se algum módulo falhar ou for recusado (por exemplo, um banco de dados sem histórico de migrações), o job falha, para que o esquema nunca fique para trás do código. O **Rollback Prod** reverte apenas o código da Lambda; as migrações permanecem aplicadas, então mantenha-as aditivas. Veja [Administração do Servidor -- Migrações do Banco de Dados](../server-admin#database-migrations) para verificar o status ou executar migrações manualmente.

## O que é criado

Cada implantação da API cria ou atualiza as seguintes funções AWS Lambda:

| Função | Finalidade |
|----------|---------|
| `web` | Manipulador de requisições HTTP via API Gateway |
| `socket` | Manipulador de conexões WebSocket |
| `timer15Min` | Tarefa agendada que roda a cada 30 minutos (o nome é histórico) |
| `timerMidnight` | Tarefa agendada que roda diariamente à meia-noite |
| `migrate` | Aplica as migrações pendentes do banco de dados; invocada pelo workflow Deploy Prod |

## Configuração do ambiente

Nos ambientes implantados, a configuração é lida do **AWS SSM Parameter Store** em vez de arquivos `.env`. Isso mantém os segredos fora do pacote de implantação e permite alterar a configuração sem reimplantar.

:::warning
Nunca faça commit de credenciais de produção no repositório. Todas as configurações sensíveis devem ser armazenadas no AWS SSM Parameter Store e acessadas em tempo de execução.
:::

:::tip
Todo merge em `main` é implantado primeiro no ambiente de demonstração. Teste sua alteração lá (por exemplo, em [demo.b1.church](https://demo.b1.church)) antes de executar o Deploy Prod.
:::

## Artigos relacionados

- **[Configuração Local da API](../api/local-setup)** -- Como configurar a API para desenvolvimento
- **[Estrutura dos Módulos](../api/module-structure)** -- Entendendo a arquitetura das funções Lambda
- **[Implantação de Aplicativos Web](./web-apps)** -- Implantando as aplicações de frontend
