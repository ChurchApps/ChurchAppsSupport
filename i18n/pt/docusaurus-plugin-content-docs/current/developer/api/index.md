---
title: "API"
---

# API

<div class="article-intro">

A API do ChurchApps é um **monólito modular** -- um único codebase que serve seis módulos de dados, cada um com seu próprio banco de dados. Esta arquitetura oferece os benefícios organizacionais dos microsserviços (limites claros, armazenamentos de dados independentes) com a simplicidade operacional de uma única implantação.

</div>

## Módulos

| Módulo | Propósito |
|--------|---------|
| **Membership** | Pessoas, grupos, casas, permissões |
| **Attendance** | Serviços, sessões, registros de presença |
| **Content** | Páginas, seções, elementos, streaming |
| **Giving** | Doações, fundos, processamento de pagamento |
| **Messaging** | Conversas, notificações, email |
| **Doing** | Tarefas, planos, atribuições |

## Pilha Tecnológica

- **Runtime:** Node.js 22.x com TypeScript (ES modules)
- **Framework:** Express
- **Injeção de Dependência:** Inversify (roteamento baseado em decorador)
- **Banco de Dados:** MySQL -- um banco de dados por módulo, cada um com seu próprio pool de conexão
- **Autenticação:** Autenticação baseada em JWT via `CustomAuthProvider`
- **Implantação:** AWS Lambda via Serverless Framework v3

## Portas

| Protocolo | Porta | Descrição |
|----------|------|-------------|
| HTTP | `8084` | API REST Principal |
| WebSocket | `8087` | Conexões de socket em tempo real |

## Funções Lambda

Quando implantado na AWS, a API é executada como seis funções Lambda:

- **`web`** -- Processa todas as solicitações HTTP
- **`socket`** -- Gerencia conexões WebSocket
- **`timer15Min`** -- Executa a cada 30 minutos para notificações por email (o nome é histórico)
- **`timerMidnight`** -- Executa diariamente para emails resumidos e tarefas de manutenção
- **`timerScheduledTasks`** -- Executa diariamente para automações vencidas e processamento de fluxo de trabalho atrasado
- **`timerWebhooks`** -- Executa a cada minuto para entregar webhooks de saída enfileirados

## Bibliotecas Compartilhadas

A API depende de dois pacotes ChurchApps compartilhados:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Utilitários base (DateHelper, ApiHelper, etc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Utilitários de servidor Express, incluindo autenticação, auxiliares de banco de dados e integrações AWS

:::info
A API usa ES modules (`"type": "module"` em `package.json`). Certifique-se de que suas importações usam a sintaxe de módulos ES.
:::

## Nesta Seção

- **[Configuração Local](./local-setup)** -- Clone, configure e execute a API localmente
- **[Banco de Dados](./database)** -- Arquitetura banco de dados por módulo, scripts de schema e padrões de acesso a dados
- **[Estrutura do Módulo](./module-structure)** -- Controllers, repositórios, modelos e autenticação
- **[Chaves de API](./api-keys)** -- Tokens de acesso pessoal para scripts e conectores
- **[Aplicativos Conectados (OAuth)](./connected-apps)** -- Fluxo OAuth multi-tenant para aplicativos de terceiros
- **[Webhooks](./webhooks)** -- Envie notificações de eventos para sistemas externos
- **[Servidor MCP](./mcp)** -- Endpoint do Model Context Protocol que expõe a API aos assistentes de IA
- **[Referência de Endpoint](./endpoints/)** -- Documentação completa da API REST para todos os módulos
