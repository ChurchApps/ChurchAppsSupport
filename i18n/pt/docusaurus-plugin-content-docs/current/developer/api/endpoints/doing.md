---
title: "Endpoints de Tarefas"
---

# Endpoints de Tarefas

<div class="article-intro">

O módulo de Tarefas gerencia planejamento de cultos, escala de voluntários, gerenciamento de tarefas e automações. Ele fornece ferramentas para criar planos de culto com horários e posições, atribuir voluntários, gerenciar datas de bloqueio, construir itens de ordem de culto, conectar-se a provedores de conteúdo externos e configurar fluxos de trabalho automatizados com condições e ações.

</div>

**Caminho base:** `/doing`

## Planos

Caminho base: `/doing/plans`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os planos da igreja |
| GET | `/:id` | JWT | — | Obter um plano por ID |
| GET | `/ids?ids=` | JWT | — | Obter múltiplos planos por IDs separados por vírgula |
| GET | `/types/:planTypeId` | JWT | — | Obter planos por tipo de plano |
| GET | `/presenter` | JWT | — | Obter planos dos próximos 7 dias (visualização do apresentador) |
| GET | `/public/current/:planTypeId` | Público | — | Obter o plano atual para um tipo de plano |
| POST | `/` | JWT | — | Criar ou atualizar planos (aceita objeto único ou array) |
| POST | `/copy/:id` | JWT | — | Copiar um plano incluindo posições, horários, atribuições e itens de ordem de culto. O body inclui `copyMode` ("none", "positions", "all") e `copyServiceOrder` (booleano) |
| POST | `/autofill/:id` | JWT | — | Preencher automaticamente atribuições de voluntários para um plano. Body: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Excluir um plano e todos os horários, atribuições, posições e itens de plano relacionados |

### Exemplo: Copiar um Plano

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## Tipos de Plano

Caminho base: `/doing/planTypes`

Estende a classe base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — sem verificação de permissões).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os tipos de plano |
| GET | `/:id` | JWT | — | Obter um tipo de plano por ID |
| GET | `/ids?ids=` | JWT | — | Obter múltiplos tipos de plano por IDs separados por vírgula |
| GET | `/ministryId/:ministryId` | JWT | — | Obter tipos de plano para um ministério |
| POST | `/` | JWT | — | Criar ou atualizar tipos de plano |
| DELETE | `/:id` | JWT | — | Excluir um tipo de plano |

## Itens do Plano

Caminho base: `/doing/planItems`

Gerencia itens de ordem de culto (cabeçalhos, seções, músicas, etc.) organizados em uma estrutura de árvore pai-filho.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um item do plano por ID |
| GET | `/ids?ids=` | JWT | — | Obter múltiplos itens do plano por IDs separados por vírgula |
| GET | `/plan/:planId` | JWT | — | Obter todos os itens do plano para um plano (retorna estrutura de árvore) |
| GET | `/presenter/:churchId/:planId` | Público | — | Obter itens do plano para visualização do apresentador (retorna estrutura de árvore) |
| POST | `/` | JWT | — | Criar ou atualizar itens do plano |
| POST | `/sort` | JWT | — | Atualizar ordem de classificação de um item do plano (reordena irmãos) |
| DELETE | `/:id` | JWT | — | Excluir um item do plano |

## Feed do Plano

Caminho base: `/doing/planFeed`

Fornece feeds de itens do plano para o apresentador. Se não existirem itens do plano, preenche automaticamente a partir do feed de local do Lessons.church usando o `contentId` do plano.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/presenter/:churchId/:planId` | Público | — | Obter feed do plano para o apresentador (preenche automaticamente do feed de local se vazio) |

## Posições

Caminho base: `/doing/positions`

Estende a classe base CRUD (GET `/:id`, POST `/`, DELETE `/:id` — sem verificação de permissões).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter uma posição por ID |
| GET | `/ids?ids=` | JWT | — | Obter múltiplas posições por IDs separados por vírgula |
| GET | `/plan/ids?planIds=` | JWT | — | Obter posições para múltiplos planos por IDs de planos separados por vírgula |
| GET | `/plan/:planId` | JWT | — | Obter todas as posições de um plano |
| POST | `/` | JWT | — | Criar ou atualizar posições |
| DELETE | `/:id` | JWT | — | Excluir uma posição |

## Horários

Caminho base: `/doing/times`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/all` | JWT | — | Listar todos os horários da igreja |
| GET | `/:id` | JWT | — | Obter um horário por ID |
| GET | `/plans?planIds=` | JWT | — | Obter horários para múltiplos planos por IDs de planos separados por vírgula |
| GET | `/plan/:planId` | JWT | — | Obter todos os horários de um plano |
| POST | `/` | JWT | — | Criar ou atualizar horários |
| DELETE | `/:id` | JWT | — | Excluir um horário |

## Atribuições

Caminho base: `/doing/assignments`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/my` | JWT | — | Obter atribuições do usuário atual |
| GET | `/:id` | JWT | — | Obter uma atribuição por ID |
| GET | `/plan/ids?planIds=` | JWT | — | Obter atribuições para múltiplos planos por IDs de planos separados por vírgula |
| GET | `/plan/:planId` | JWT | — | Obter todas as atribuições de um plano |
| POST | `/` | JWT | — | Criar ou atualizar atribuições (padrão de status "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Aceitar uma atribuição (deve ser a pessoa atribuída) |
| POST | `/decline/:id` | JWT | — | Recusar uma atribuição (deve ser a pessoa atribuída) |
| DELETE | `/:id` | JWT | — | Excluir uma atribuição |

### Exemplo: Aceitar uma Atribuição

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## Datas de Bloqueio

Caminho base: `/doing/blockoutDates`

Estende a classe base CRUD (GET `/:id`, DELETE `/:id` — sem verificação de permissões).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter uma data de bloqueio por ID |
| GET | `/ids?ids=` | JWT | — | Obter múltiplas datas de bloqueio por IDs separados por vírgula |
| GET | `/my` | JWT | — | Obter datas de bloqueio do usuário atual |
| GET | `/upcoming` | JWT | — | Obter todas as datas de bloqueio futuras da igreja |
| POST | `/` | JWT | — | Criar ou atualizar datas de bloqueio (padrão personId para o usuário atual se não fornecido) |
| DELETE | `/:id` | JWT | — | Excluir uma data de bloqueio |

## Tarefas

Caminho base: `/doing/tasks`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Obter tarefas abertas do usuário atual |
| GET | `/:id` | JWT | — | Obter uma tarefa por ID |
| GET | `/closed` | JWT | — | Obter tarefas fechadas do usuário atual |
| GET | `/timeline?taskIds=` | JWT | — | Obter dados de linha do tempo para tarefas por IDs separados por vírgula |
| GET | `/directoryUpdate/:personId` | JWT | — | Obter tarefa de atualização de diretório para uma pessoa |
| POST | `/` | JWT | — | Criar ou atualizar tarefas. Adicione `?type=directoryUpdate` para tratar tarefas de atualização de diretório (auto-upload de fotos) |
| POST | `/loadForGroups` | JWT | — | Carregar tarefas para grupos específicos. Body: `{ groupIds: [], status: "Open" }` |

## Automações

Caminho base: `/doing/automations`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Listar todas as automações da igreja |
| GET | `/:id` | JWT | — | Obter uma automação por ID |
| GET | `/check` | Público | — | Acionar uma verificação de todas as automações |
| POST | `/` | JWT | — | Criar ou atualizar automações |
| DELETE | `/:id` | JWT | — | Excluir uma automação |

## Ações

Caminho base: `/doing/actions`

Ações definem o que acontece quando uma automação é acionada.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter uma ação por ID |
| GET | `/automation/:id` | JWT | — | Obter todas as ações de uma automação |
| POST | `/` | JWT | — | Criar ou atualizar ações |
| DELETE | `/:id` | JWT | — | Excluir uma ação |

## Condições

Caminho base: `/doing/conditions`

Condições definem os critérios que acionam uma automação.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter uma condição por ID |
| GET | `/automation/:id` | JWT | — | Obter todas as condições de uma automação |
| POST | `/` | JWT | — | Criar ou atualizar condições |
| DELETE | `/:id` | JWT | — | Excluir uma condição |

## Conjunções

Caminho base: `/doing/conjunctions`

Conjunções ligam múltiplas condições em uma automação (lógica E/OU).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter uma conjunção por ID |
| GET | `/automation/:id` | JWT | — | Obter todas as conjunções de uma automação |
| POST | `/` | JWT | — | Criar ou atualizar conjunções |
| DELETE | `/:id` | JWT | — | Excluir uma conjunção |

## Autenticações de Provedores de Conteúdo

Caminho base: `/doing/contentProviderAuths`

Estende a classe base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — sem verificação de permissões).

Gerencia registros de autenticação OAuth para provedores de conteúdo externos (ex: integrações com software de apresentação).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Listar todas as autenticações de provedores de conteúdo |
| GET | `/:id` | JWT | — | Obter uma autenticação de provedor de conteúdo por ID |
| GET | `/ids?ids=` | JWT | — | Obter múltiplas autenticações de provedores de conteúdo por IDs separados por vírgula |
| GET | `/ministry/:ministryId` | JWT | — | Obter todas as autenticações de provedores de conteúdo para um ministério |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Obter registro de autenticação para um ministério e provedor específicos |
| POST | `/` | JWT | — | Criar ou atualizar autenticações de provedores de conteúdo |
| DELETE | `/:id` | JWT | — | Excluir uma autenticação de provedor de conteúdo |

## Proxy de Provedor

Caminho base: `/doing/providerProxy`

Faz proxy de requisições para provedores de conteúdo externos (ex: ProPresenter, EasyWorship). Lida com renovação de token automaticamente quando os tokens expiram.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| POST | `/browse` | JWT | — | Navegar por arquivos do provedor de conteúdo. Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Obter apresentações de um provedor de conteúdo. Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Obter uma playlist de um provedor de conteúdo. Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Obter instruções para um item de conteúdo. Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Obter instruções expandidas para um item de conteúdo. Body: `{ ministryId, providerId, path }` |

## Páginas Relacionadas

- [Endpoints de Membros](./membership) — Pessoas, grupos, papéis e permissões
- [Endpoints de Presença](./attendance) — Rastreamento de cultos e visitas
- [Estrutura do Módulo](../module-structure) — Padrões de organização de código
