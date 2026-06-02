---
title: "API"
---

# API

<div class="article-intro">

A API ChurchApps é um **monólito modular** -- uma única base de código que serve seis módulos distintos, cada um com seu próprio banco de dados. Essa arquitetura oferece a você os benefícios organizacionais dos microsserviços (limites claros, armazenamentos de dados independentes) com a simplicidade operacional de uma única implantação.

</div>

## Módulos

| Módulo | Propósito |
|--------|---------|
| **Membership** | Pessoas, grupos, residências, permissões |
| **Attendance** | Serviços, sessões, registros de check-in |
| **Content** | Páginas, seções, elementos, streaming |
| **Giving** | Doações, fundos, processamento de pagamento |
| **Messaging** | Conversas, notificações, email |
| **Doing** | Tarefas, planos, atribuições |

## Stack de Tecnologia

- **Runtime:** Node.js 22.x com TypeScript (módulos ES)
- **Framework:** Express
- **Injeção de Dependência:** Inversify (roteamento baseado em decorador)
- **Banco de Dados:** MySQL -- um banco de dados por módulo, cada um com seu próprio pool de conexão
- **Auth:** Autenticação baseada em JWT via `CustomAuthProvider`
- **Deployment:** AWS Lambda via Serverless Framework v3

## Portas

| Protocolo | Porta | Descrição |
|----------|------|-------------|
| HTTP | `8084` | API REST Principal |
| WebSocket | `8087` | Conexões de socket em tempo real |

## Funções Lambda

Quando implantado no AWS, a API é executada como quatro funções Lambda:

- **`web`** -- Lida com todas as solicitações HTTP
- **`socket`** -- Gerencia conexões WebSocket
- **`timer15Min`** -- Executa a cada 15 minutos para notificações de email
- **`timerMidnight`** -- Executa diariamente para emails de resumo e tarefas de manutenção

## Bibliotecas Compartilhadas

A API depende de dois pacotes ChurchApps compartilhados:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Utilitários base (DateHelper, ApiHelper, etc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Utilitários de servidor Express incluindo autenticação, auxiliares de banco de dados e integrações AWS

:::info
A API usa módulos ES (`"type": "module"` em `package.json`). Certifique-se de que suas importações usam a sintaxe de módulo ES.
:::

## Nesta Seção

- **[Configuração Local](./local-setup)** -- Clone, configure e execute a API localmente
- **[Banco de Dados](./database)** -- Arquitetura de banco de dados por módulo, scripts de schema e padrões de acesso a dados
- **[Estrutura do Módulo](./module-structure)** -- Controladores, repositórios, modelos e autenticação
- **[Chaves de API](./api-keys)** -- Tokens de acesso pessoal para scripts e conectores
- **[Aplicativos Conectados (OAuth)](./connected-apps)** -- Fluxo OAuth multi-locatário para aplicativos de terceiros
- **[Webhooks](./webhooks)** -- Notificações de eventos push para sistemas externos
- **[Servidor MCP](./mcp)** -- Endpoint do Model Context Protocol que expõe a API a assistentes de IA
- **[Referência de Endpoint](./endpoints/)** -- Documentação completa da API REST para todos os módulos
