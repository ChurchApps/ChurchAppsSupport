---
title: "Referência de Endpoints"
---

# Referência de Endpoints

<div class="article-intro">

Esta seção documenta todos os endpoints REST expostos pela API do ChurchApps. Cada página de módulo lista todas as rotas com seu método HTTP, caminho, requisitos de autenticação e permissões necessárias.

</div>

## URL Base

| Ambiente | URL |
|----------|-----|
| Desenvolvimento local | `http://localhost:8084` |
| Produção | `https://api.churchapps.org` |

## Convenções de Requisição

- **Content-Type:** Todos os corpos de requisição e resposta usam `application/json`
- **Multi-tenant:** Toda requisição autenticada é limitada a um `churchId` extraído do token JWT — você não passa `churchId` na URL
- **Salvamento em lote:** A maioria dos endpoints `POST` aceita um **array de objetos**. A API irá inserir novos registros (sem campo `id`) e atualizar existentes (com campo `id`) em uma única chamada
- **IDs:** Todos os IDs de entidade são UUIDs

### Exemplo: Salvamento em Lote

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

O primeiro objeto é criado (novo); o segundo é atualizado (tem `id`).

## Formato de Resposta

Respostas bem-sucedidas retornam JSON — seja um objeto único ou um array. Respostas de erro usam códigos de status HTTP padrão:

| Código | Significado |
|--------|------------|
| `200` | Sucesso |
| `400` | Requisição inválida (erros de validação) |
| `401` | Não autorizado (token ausente/inválido ou permissões insuficientes) |
| `404` | Não encontrado |
| `500` | Erro do servidor |

Erros de validação retornam:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Como Ler as Tabelas de Endpoints

Cada página de módulo organiza os endpoints por controller. As tabelas usam estas colunas:

| Coluna | Descrição |
|--------|-----------|
| **Método** | Método HTTP (`GET`, `POST`, `DELETE`) |
| **Caminho** | Caminho da rota relativo ao caminho base do controller |
| **Auth** | **JWT** = requer token Bearer, **Público** = sem autenticação necessária |
| **Permissão** | Permissão necessária (ex: `People.Edit`). `—` significa qualquer usuário autenticado |
| **Descrição** | O que o endpoint faz |

Controllers que estendem a classe base CRUD padrão fornecem quatro endpoints automaticamente: `GET /` (listar todos), `GET /:id` (obter por ID), `POST /` (criar/atualizar) e `DELETE /:id` (excluir).

## Módulo de Relatórios

O módulo de Relatórios funciona de forma diferente dos outros módulos. Em vez de CRUD baseado em banco de dados, ele carrega definições de relatórios de arquivos JSON no disco e executa consultas SQL parametrizadas.

| Método | Caminho | Auth | Descrição |
|--------|---------|------|-----------|
| GET | `/reporting/reports/:keyName` | JWT | Carregar uma definição de relatório por nome de chave |
| GET | `/reporting/reports/:keyName/run` | JWT | Executar um relatório e retornar resultados |

Os parâmetros do relatório são passados como valores de query string (ex: `?startDate=2024-01-01&endDate=2024-12-31`). O parâmetro `churchId` é injetado automaticamente a partir do token JWT. Cada definição de relatório pode especificar seus próprios requisitos de permissão.

## Índice de Módulos

| Módulo | Caminho Base | Descrição |
|--------|-------------|-----------|
| [Autenticação](./authentication) | `/membership/users`, `/membership/oauth` | Login, registro, tokens JWT, OAuth, permissões |
| [Membros](./membership) | `/membership/*` | Pessoas, igrejas, grupos, domicílios, papéis, formulários, configurações |
| [Presença](./attendance) | `/attendance/*` | Campus, cultos, sessões, visitas, registros de check-in |
| [Conteúdo](./content) | `/content/*` | Páginas, sermões, eventos, arquivos, galerias, Bíblia, streaming |
| [Doações](./giving) | `/giving/*` | Doações, fundos, gateways de pagamento, assinaturas |
| [Mensagens](./messaging) | `/messaging/*` | Conversas, notificações, dispositivos, SMS |
| [Tarefas](./doing) | `/doing/*` | Planos, tarefas, atribuições, automações, agendamento |
