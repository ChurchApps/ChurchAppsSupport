---
title: "API"
---

# API

<div class="article-intro">

A API do ChurchApps é um **monólito modular** -- uma única base de código que serve seis módulos distintos, cada um com seu próprio banco de dados. Essa arquitetura oferece os benefícios organizacionais de microsserviços (limites claros, armazenamentos de dados independentes) com a simplicidade operacional de uma única implantação.

</div>

## Módulos

| Módulo | Propósito |
|--------|-----------|
| **Membership** | Pessoas, grupos, domicílios, permissões |
| **Attendance** | Cultos, sessões, registros de check-in |
| **Content** | Páginas, seções, elementos, streaming |
| **Giving** | Doações, fundos, processamento de pagamentos |
| **Messaging** | Conversas, notificações, email |
| **Doing** | Tarefas, planos, atribuições |

## Stack Tecnológica

- **Runtime:** Node.js 22.x com TypeScript (ES modules)
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

Quando implantada na AWS, a API roda como quatro funções Lambda:

- **`web`** -- Lida com todas as requisições HTTP
- **`socket`** -- Gerencia conexões WebSocket
- **`timer15Min`** -- Executa a cada 15 minutos para notificações por email
- **`timerMidnight`** -- Executa diariamente para emails de resumo e tarefas de manutenção

## Bibliotecas Compartilhadas

A API depende de dois pacotes compartilhados do ChurchApps:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Utilitários base (DateHelper, ApiHelper, etc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Utilitários de servidor Express incluindo autenticação, helpers de banco de dados e integrações AWS

:::info
A API usa ES modules (`"type": "module"` no `package.json`). Certifique-se de que suas importações usem a sintaxe de ES module.
:::

## Nesta Seção

- **[Configuração Local](./local-setup)** -- Clonar, configurar e executar a API localmente
- **[Banco de Dados](./database)** -- Arquitetura de banco de dados por módulo, scripts de esquema e padrões de acesso a dados
- **[Estrutura do Módulo](./module-structure)** -- Controllers, repositórios, modelos e autenticação
- **[Referência de Endpoints](./endpoints/)** -- Documentação completa da API REST para todos os módulos
