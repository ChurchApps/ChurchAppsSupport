---
title: "API"
---

# API

<div class="article-intro">

A API do ChurchApps é um **monólito modular** -- uma única base de código que atende seis módulos de dados, cada um com seu próprio banco de dados. Essa arquitetura oferece os benefícios organizacionais de microsserviços (limites claros, armazenamentos de dados independentes) com a simplicidade operacional de uma única implantação.

</div>

## Módulos

| Módulo | Finalidade |
|--------|------------|
| **Membership** | Pessoas, grupos, domicílios, permissões |
| **Attendance** | Cultos, sessões, registros de check-in |
| **Content** | Páginas, seções, elementos, transmissões |
| **Giving** | Doações, fundos, processamento de pagamentos |
| **Messaging** | Conversas, notificações, e-mail |
| **Doing** | Tarefas, planos, atribuições |

## Stack Tecnológica

- **Runtime:** Node.js 24.x com TypeScript (módulos ES)
- **Framework:** Express
- **Injeção de Dependências:** Inversify (roteamento baseado em decoradores)
- **Banco de Dados:** MySQL -- um banco de dados por módulo, cada um com seu próprio pool de conexões
- **Autenticação:** Autenticação baseada em JWT via `CustomAuthProvider`
- **Implantação:** AWS Lambda via Serverless Framework v3

## Portas

| Protocolo | Porta | Descrição |
|-----------|-------|-----------|
| HTTP | `8084` | API REST principal |
| WebSocket | `8087` | Conexões de socket em tempo real |

## Funções Lambda

Quando implantada na AWS, a API roda como seis funções Lambda:

- **`web`** -- Trata todas as requisições HTTP
- **`socket`** -- Gerencia as conexões WebSocket
- **`timer15Min`** -- Executa a cada 30 minutos para e-mails de notificação (o nome é histórico)
- **`timerMidnight`** -- Executa diariamente para e-mails de resumo e tarefas de manutenção
- **`timerScheduledTasks`** -- Executa diariamente para automações vencidas e processamento de fluxos de trabalho atrasados
- **`timerWebhooks`** -- Executa a cada minuto para entregar webhooks de saída enfileirados

## Bibliotecas Compartilhadas

A API depende de dois pacotes compartilhados do ChurchApps:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Utilitários base (DateHelper, ApiHelper etc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Utilitários do servidor Express, incluindo autenticação, auxiliares de banco de dados e integrações com a AWS

:::info
A API usa módulos ES (`"type": "module"` no `package.json`). Certifique-se de que seus imports usem a sintaxe de módulos ES.
:::

## Nesta Seção

- **[Configuração Local](./local-setup)** -- Clone, configure e execute a API localmente
- **[Banco de Dados](./database)** -- Arquitetura de um banco por módulo, scripts de esquema e padrões de acesso a dados
- **[Estrutura de Módulos](./module-structure)** -- Controllers, repositórios, modelos e autenticação
- **[Chaves de API](./api-keys)** -- Tokens de acesso pessoais para scripts e conectores
- **[Aplicativos Conectados (OAuth)](./connected-apps)** -- Fluxo OAuth multi-tenant para aplicativos de terceiros
- **[Webhooks](./webhooks)** -- Envio de notificações de eventos para sistemas externos
- **[Servidor MCP](./mcp)** -- Endpoint do Model Context Protocol que expõe a API para assistentes de IA
- **[Referência de Endpoints](./endpoints/)** -- Documentação completa da API REST de todos os módulos
