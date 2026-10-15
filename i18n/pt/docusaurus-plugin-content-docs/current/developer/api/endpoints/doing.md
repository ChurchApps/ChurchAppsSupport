---
title: "Endpoints do Doing"
---

# Endpoints do Doing

<div class="article-intro">

O módulo Doing gerencia o planejamento de cultos, a escala de voluntários, o gerenciamento de tarefas e as automações. Ele oferece ferramentas para criar planos de culto com horários e posições, atribuir voluntários, gerenciar datas de indisponibilidade, montar os itens da ordem do culto, conectar-se a provedores externos de conteúdo e configurar fluxos de trabalho automatizados com condições e ações.

</div>

**Caminho base:** `/doing`

## Planos

Caminho base: `/doing/plans`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista todos os planos da igreja |
| GET | `/:id` | JWT | — | Obtém um plano pelo ID |
| GET | `/ids?ids=` | JWT | — | Obtém vários planos pelos IDs separados por vírgula |
| GET | `/types/:planTypeId` | JWT | — | Obtém os planos de um tipo de plano |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + edição do ministério | Prévia do envio **Mensagem para Voluntários** da visão geral de serviço: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` para os voluntários escalados no intervalo (uma vez por pessoa; cancelados e números ausentes são ignorados; números compartilhados são deduplicados; limite de 200) |
| GET | `/presenter` | JWT | — | Obtém os planos dos próximos 7 dias (visão do apresentador) |
| GET | `/public/current/:planTypeId` | Público | — | Obtém o plano atual de um tipo de plano |
| GET | `/public/signup/:churchId` | Público | — | Planos abertos para inscrição própria, do mais próximo para o mais distante, cada um com suas posições de inscrição própria (ordenadas por `categoryName` e depois por `name`, além de `filledCount` das atribuições Aceitas/Não confirmadas) e horários. Sem nomes de voluntários. Quando a configuração da igreja `volunteerSignupNextOnly` é `"true"`, apenas o primeiro plano de cada tipo é retornado |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` para as posições de inscrição própria do plano (nomes de exibição dos responsáveis Aceitos/Não confirmados). Retorna `[]` a menos que `showVolunteerNames` do plano esteja ativado |
| POST | `/` | JWT | — | Cria ou atualiza planos (aceita um objeto único ou um array) |
| POST | `/copy/:id` | JWT | Edição do ministério | Copia um plano, incluindo posições, horários, atribuições e itens da ordem do culto. O corpo inclui `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") e `copyServiceOrder` (booleano). Sem `targetPlanId`, um novo plano é criado, e `notes`, `signupDeadlineHours`, `showVolunteerNames` e `autoReplaceOnDecline` são herdados do plano de origem, a menos que o corpo os informe. Com `targetPlanId`, a cópia preenche esse plano existente (quem chama precisa poder editá-lo). A opção **Repetir semanalmente** do B1Admin chama este endpoint uma vez por semana, copiando sempre do plano criado na semana anterior |
| POST | `/textRange` | JWT | `texting.send` + edição do ministério | Envia mensagem de texto a todos os voluntários escalados em um intervalo de datas pelo provedor de mensagens da igreja. Corpo: `{ startDate, endDate, ministryId, planTypeId?, message }` (mensagem de até 1600 caracteres; campos de mesclagem resolvidos para cada destinatário). Retorna as contagens da prévia mais `recipientCount`, `successCount`, `failCount` e `error` (`no_provider` ou `insufficient_credits`) quando o envio é interrompido antes do fim |
| POST | `/autofill/:id` | JWT | — | Preenche automaticamente as atribuições de voluntários de um plano. Corpo: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Exclui um plano e todos os horários, atribuições, posições e itens relacionados |

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

Estende a classe base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — sem verificações de permissão).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista todos os tipos de plano |
| GET | `/:id` | JWT | — | Obtém um tipo de plano pelo ID |
| GET | `/ids?ids=` | JWT | — | Obtém vários tipos de plano pelos IDs separados por vírgula |
| GET | `/ministryId/:ministryId` | JWT | — | Obtém os tipos de plano de um ministério |
| POST | `/` | JWT | — | Cria ou atualiza tipos de plano |
| DELETE | `/:id` | JWT | — | Exclui um tipo de plano |

## Itens do Plano

Caminho base: `/doing/planItems`

Gerencia os itens da ordem do culto (cabeçalhos, seções, músicas etc.), organizados em uma estrutura de árvore pai-filho.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém um item do plano pelo ID |
| GET | `/ids?ids=` | JWT | — | Obtém vários itens do plano pelos IDs separados por vírgula |
| GET | `/plan/:planId` | JWT | — | Obtém todos os itens de um plano (retorna estrutura de árvore) |
| GET | `/presenter/:churchId/:planId` | Público | — | Obtém os itens do plano para a visão do apresentador (retorna estrutura de árvore) |
| POST | `/` | JWT | — | Cria ou atualiza itens do plano |
| POST | `/sort` | JWT | — | Atualiza a ordem de um item do plano (reordena os irmãos) |
| DELETE | `/:id` | JWT | — | Exclui um item do plano |

## Feed do Plano

Caminho base: `/doing/planFeed`

Fornece os feeds de itens do plano para o apresentador. Se não houver itens do plano, o feed é preenchido automaticamente a partir do feed de venue do Lessons.church, usando o `contentId` do plano.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Público | — | Obtém o feed do plano para o apresentador (preenchido automaticamente a partir do feed de venue se estiver vazio) |

## Posições

Caminho base: `/doing/positions`

Estende a classe base CRUD (GET `/:id`, POST `/`, DELETE `/:id` — sem verificações de permissão).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém uma posição pelo ID |
| GET | `/ids?ids=` | JWT | — | Obtém várias posições pelos IDs separados por vírgula |
| GET | `/plan/ids?planIds=` | JWT | — | Obtém as posições de vários planos pelos IDs de planos separados por vírgula |
| GET | `/plan/:planId` | JWT | — | Obtém todas as posições de um plano |
| POST | `/` | JWT | — | Cria ou atualiza posições |
| DELETE | `/:id` | JWT | — | Exclui uma posição |

## Horários

Caminho base: `/doing/times`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Lista todos os horários da igreja |
| GET | `/:id` | JWT | — | Obtém um horário pelo ID |
| GET | `/plans?planIds=` | JWT | — | Obtém os horários de vários planos pelos IDs de planos separados por vírgula |
| GET | `/plan/:planId` | JWT | — | Obtém todos os horários de um plano |
| POST | `/` | JWT | — | Cria ou atualiza horários |
| DELETE | `/:id` | JWT | — | Exclui um horário |

## Atribuições

Caminho base: `/doing/assignments`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obtém as atribuições do usuário atual |
| GET | `/my/upcoming` | JWT | — | Até 20 atribuições do usuário atual em planos com data a partir de ontem (planos em rascunho, ou `prepared`, são ignorados), do mais próximo para o mais distante: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Alimenta a prévia de serviço na página inicial do membro |
| GET | `/:id` | JWT | — | Obtém uma atribuição pelo ID |
| GET | `/plan/ids?planIds=` | JWT | — | Obtém atribuições de vários planos pelos IDs de planos separados por vírgula |
| GET | `/plan/:planId` | JWT | — | Obtém todas as atribuições de um plano |
| POST | `/` | JWT | — | Cria ou atualiza atribuições (o status padrão é "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Aceita uma atribuição (deve ser a pessoa atribuída) |
| POST | `/decline/:id` | JWT | — | Recusa uma atribuição (deve ser a pessoa atribuída) |
| DELETE | `/:id` | JWT | — | Exclui uma atribuição |

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

## Datas de Indisponibilidade

Caminho base: `/doing/blockoutDates`

Estende a classe base CRUD (GET `/:id`, DELETE `/:id` — sem verificações de permissão).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém uma data de indisponibilidade pelo ID |
| GET | `/ids?ids=` | JWT | — | Obtém várias datas de indisponibilidade pelos IDs separados por vírgula |
| GET | `/my` | JWT | — | Obtém as datas de indisponibilidade do usuário atual |
| GET | `/upcoming` | JWT | — | Obtém todas as datas de indisponibilidade futuras da igreja |
| POST | `/` | JWT | — | Cria ou atualiza datas de indisponibilidade (usa o usuário atual como personId se não for informado) |
| DELETE | `/:id` | JWT | — | Exclui uma data de indisponibilidade |

## Tarefas

Caminho base: `/doing/tasks`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Obtém as tarefas abertas do usuário atual |
| GET | `/:id` | JWT | — | Obtém uma tarefa pelo ID |
| GET | `/:id/contact` | JWT | Pode visualizar o cartão | Informações de contato da pessoa a que um cartão de fluxo de trabalho se refere: `{ personId, displayName, mobilePhone, email }`. Permite que um responsável atribuído sem acesso a Pessoas entre em contato com a pessoa |
| GET | `/closed` | JWT | — | Obtém as tarefas concluídas do usuário atual |
| GET | `/timeline?taskIds=` | JWT | — | Obtém os dados da linha do tempo de tarefas pelos IDs de tarefas separados por vírgula |
| GET | `/directoryUpdate/:personId` | JWT | — | Obtém a tarefa de atualização de diretório de uma pessoa |
| POST | `/` | JWT | — | Cria ou atualiza tarefas. Adicione `?type=directoryUpdate` para tratar tarefas de atualização de diretório (envia fotos automaticamente) |
| POST | `/:id/conversation` | JWT | `tasks.edit` ou responsável pelo cartão | Anexa a conversa de anotações ao cartão. Corpo: `{ conversationId }`. A primeira conversa anexada prevalece; chamadas posteriores retornam o cartão sem alterações |
| POST | `/loadForGroups` | JWT | — | Carrega tarefas de grupos específicos. Corpo: `{ groupIds: [], status: "Open" }` |

## Automações

Caminho base: `/doing/automations`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista todas as automações da igreja |
| GET | `/:id` | JWT | — | Obtém uma automação pelo ID |
| GET | `/check` | Público | — | Dispara uma verificação de todas as automações |
| POST | `/` | JWT | — | Cria ou atualiza automações |
| DELETE | `/:id` | JWT | — | Exclui uma automação |

## Ações

Caminho base: `/doing/actions`

As ações definem o que acontece quando uma automação é disparada.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém uma ação pelo ID |
| GET | `/automation/:id` | JWT | — | Obtém todas as ações de uma automação |
| POST | `/` | JWT | — | Cria ou atualiza ações |
| DELETE | `/:id` | JWT | — | Exclui uma ação |

## Condições

Caminho base: `/doing/conditions`

As condições definem os critérios que disparam uma automação.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém uma condição pelo ID |
| GET | `/automation/:id` | JWT | — | Obtém todas as condições de uma automação |
| POST | `/` | JWT | — | Cria ou atualiza condições |
| DELETE | `/:id` | JWT | — | Exclui uma condição |

## Conjunções

Caminho base: `/doing/conjunctions`

As conjunções vinculam várias condições em uma automação (lógica E/OU).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém uma conjunção pelo ID |
| GET | `/automation/:id` | JWT | — | Obtém todas as conjunções de uma automação |
| POST | `/` | JWT | — | Cria ou atualiza conjunções |
| DELETE | `/:id` | JWT | — | Exclui uma conjunção |

## Autenticações de Provedores de Conteúdo

Caminho base: `/doing/contentProviderAuths`

Estende a classe base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — sem verificações de permissão).

Gerencia os registros de autenticação OAuth de provedores externos de conteúdo (por exemplo, integrações com softwares de apresentação).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista todas as autenticações de provedores de conteúdo |
| GET | `/:id` | JWT | — | Obtém uma autenticação de provedor de conteúdo pelo ID |
| GET | `/ids?ids=` | JWT | — | Obtém várias autenticações de provedores de conteúdo pelos IDs separados por vírgula |
| GET | `/ministry/:ministryId` | JWT | — | Obtém todas as autenticações de provedores de conteúdo de um ministério |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Obtém o registro de autenticação de um ministério e provedor específicos |
| POST | `/` | JWT | — | Cria ou atualiza autenticações de provedores de conteúdo |
| DELETE | `/:id` | JWT | — | Exclui uma autenticação de provedor de conteúdo |

## Proxy de Provedor

Caminho base: `/doing/providerProxy`

Encaminha requisições para provedores externos de conteúdo (por exemplo, ProPresenter, EasyWorship). Lida automaticamente com a renovação de tokens quando eles expiram.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Navega pelos arquivos do provedor de conteúdo. Corpo: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Obtém as apresentações de um provedor de conteúdo. Corpo: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Obtém uma playlist de um provedor de conteúdo. Corpo: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Obtém as instruções de um item de conteúdo. Corpo: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Obtém as instruções expandidas de um item de conteúdo. Corpo: `{ ministryId, providerId, path }` |

## Páginas Relacionadas

- [Endpoints de Membresia](./membership) — Pessoas, grupos, funções e permissões
- [Endpoints de Presença](./attendance) — Rastreamento de cultos e visitas
- [Estrutura de Módulos](../module-structure) — Padrões de organização do código
