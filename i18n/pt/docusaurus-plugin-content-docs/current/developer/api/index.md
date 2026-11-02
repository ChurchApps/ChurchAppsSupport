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

## Stack tecnológica

- **Runtime:** Node.js 24.x com TypeScript (módulos ES)
- **Framework:** Express
- **Injeção de dependências:** Inversify (roteamento baseado em decoradores)
- **Banco de dados:** MySQL -- um banco por módulo, cada um com seu próprio pool de conexões
- **Autenticação:** autenticação JWT via `CustomAuthProvider`
- **Implantação:** AWS Lambda via Serverless Framework v3

## Portas

| Protocolo | Porta | Descrição |
|-----------|-------|-----------|
| HTTP | `8084` | API REST principal |
| WebSocket | `8087` | Conexões socket em tempo real |

## Funções Lambda

Quando implantada na AWS, a API roda como seis funções Lambda:

- **`web`** -- Trata todas as requisições HTTP
- **`socket`** -- Gerencia as conexões WebSocket
- **`timer15Min`** -- Roda a cada 30 minutos para notificações por e-mail (o nome é histórico)
- **`timerMidnight`** -- Roda diariamente para e-mails de resumo e tarefas de manutenção
- **`timerScheduledTasks`** -- Roda diariamente para automações vencidas e processamento de fluxos de trabalho atrasados
- **`timerWebhooks`** -- Roda a cada minuto para entregar webhooks de saída enfileirados

## Bibliotecas compartilhadas

A API depende de dois pacotes compartilhados do ChurchApps:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Utilitários base (DateHelper, ApiHelper etc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Utilitários do servidor Express, incluindo autenticação, auxiliares de banco de dados e integrações com a AWS

:::info
A API usa módulos ES (`"type": "module"` no `package.json`). Certifique-se de que suas importações usem a sintaxe de módulos ES.
:::

## Nesta seção

- **[Configuração local](./local-setup)** -- Clone, configure e execute a API localmente
- **[Banco de dados](./database)** -- Arquitetura de um banco por módulo, scripts de esquema e padrões de acesso a dados
- **[Estrutura do módulo](./module-structure)** -- Controllers, repositórios, modelos e autenticação
- **[Chaves de API](./api-keys)** -- Tokens de acesso pessoais para scripts e conectores
- **[Aplicativos conectados (OAuth)](./connected-apps)** -- Fluxo OAuth multi-inquilino para aplicativos de terceiros
- **[Webhooks](./webhooks)** -- Envia notificações de eventos para sistemas externos
- **[Servidor MCP](./mcp)** -- Endpoint do Model Context Protocol que expõe a API para assistentes de IA
- **[Referência de endpoints](./endpoints/)** -- Documentação REST completa de todos os módulos
