---
title: "Endpoints do Doing"
---

# Endpoints do Doing

<div class="article-intro">

O módulo Doing gerencia o planejamento de cultos, a escala de voluntários, o gerenciamento de tarefas e as automações. Ele oferece ferramentas para criar planos de culto com horários e posições, atribuir voluntários, gerenciar datas de indisponibilidade, montar os itens da ordem do culto, conectar-se a provedores de conteúdo externos e configurar fluxos automatizados com condições e ações.

</div>

**Caminho base:** `/doing`

## Planos

Caminho base: `/doing/plans`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os planos da igreja |
| GET | `/:id` | JWT | — | Obter um plano pelo ID |
| GET | `/ids?ids=` | JWT | — | Obter vários planos por IDs separados por vírgula |
| GET | `/types/:planTypeId` | JWT | — | Obter planos por tipo de plano |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + edição do ministério | Pré-visualizar a visão geral de escalas que o envio de **Text Volunteers** enviaria: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` para os voluntários escalados no intervalo (um por pessoa; quem optou por não receber e números ausentes são ignorados; números compartilhados são deduplicados; limitado a 200) |
| GET | `/presenter` | JWT | — | Obter os planos dos próximos 7 dias (visualização do apresentador) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Edição do ministério | Fluxos ativos de confirmação de escala (`workflowType = "assignmentConfirmation"`) que um plano pode selecionar: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Pública | — | Obter o plano atual de um tipo de plano |
| GET | `/public/signup/:churchId` | Pública | — | Planos abertos para inscrição própria, do mais próximo para o mais distante, cada um com suas posições de inscrição própria (ordenadas por `categoryName` e depois por `name`, com `filledCount` das atribuições Accepted/Unconfirmed) e horários. Sem nomes de voluntários. Quando a configuração da igreja `volunteerSignupNextOnly` é `"true"`, somente o primeiro plano de cada tipo é retornado. Cada `plan` inclui um `signupDeadline` calculado (instante ISO, ou `null`): `signupDeadlineHours` antes do primeiro horário do tipo `service` do plano (qualquer horário com data, se não houver horário de serviço; 9:00 no fuso horário da igreja em `serviceDate`, se o plano não tiver horários) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` para as posições de inscrição própria do plano (nomes de exibição dos responsáveis com atribuições Accepted/Unconfirmed). Retorna `[]` a menos que `showVolunteerNames` do plano esteja ativado |
| POST | `/` | JWT | — | Criar ou atualizar planos (aceita um objeto único ou um array). Defina `confirmationWorkflowId` para incluir o plano em um fluxo de confirmação de escala, ou `null` para excluí-lo nas próximas requisições. Envie `signupDeadlineHours: null` para remover um prazo; omitir o campo mantém o valor salvo |
| POST | `/copy/:id` | JWT | Edição do ministério | Copiar um plano incluindo posições, horários, atribuições e itens da ordem do culto. O corpo inclui `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") e `copyServiceOrder` (booleano). Sem `targetPlanId`, um novo plano é criado, e `notes`, `signupDeadlineHours`, `showVolunteerNames` e `autoReplaceOnDecline` são herdados do plano de origem, a menos que o corpo os informe. Com `targetPlanId`, a cópia preenche esse plano existente (quem chama precisa ter permissão para editá-lo). A opção **Repeat weekly** do B1Admin chama esse endpoint uma vez por semana, copiando sempre do plano criado na semana anterior |
| POST | `/textRange` | JWT | `texting.send` + edição do ministério | Enviar mensagem de texto a todos os voluntários escalados em um intervalo de datas pelo provedor de SMS da igreja. Corpo: `{ startDate, endDate, ministryId, planTypeId?, message }` (mensagem de até 1600 caracteres; campos de mesclagem são resolvidos para cada destinatário). Retorna as contagens da pré-visualização, além de `recipientCount`, `successCount`, `failCount` e `error` (`no_provider` ou `insufficient_credits`) quando o envio é interrompido antecipadamente |
| POST | `/:id/issueRequests` | JWT | Edição do plano | Emitir as novas atribuições Unconfirmed ainda não notificadas do plano pelo seu fluxo de confirmação: marca cada uma como notificada e inicia um card de fluxo por atribuição. Corpo vazio; retorna `{ issued }`. Falha, a menos que o plano esteja publicado (não `prepared`), tenha um `confirmationWorkflowId` ativo com pelo menos uma etapa e o prazo de resposta ainda não tenha expirado |
| POST | `/autofill/:id` | JWT | — | Preencher automaticamente as atribuições de voluntários de um plano. Corpo: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Excluir um plano e todos os horários, atribuições, posições e itens relacionados |

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
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os tipos de plano |
| GET | `/:id` | JWT | — | Obter um tipo de plano pelo ID |
| GET | `/ids?ids=` | JWT | — | Obter vários tipos de plano por IDs separados por vírgula |
| GET | `/ministryId/:ministryId` | JWT | — | Obter os tipos de plano de um ministério |
| POST | `/` | JWT | — | Criar ou atualizar tipos de plano |
| DELETE | `/:id` | JWT | — | Excluir um tipo de plano |

## Itens do Plano

Caminho base: `/doing/planItems`

Gerencia os itens da ordem do culto (cabeçalhos, seções, músicas etc.) organizados em uma estrutura de árvore pai-filho.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um item do plano pelo ID |
| GET | `/ids?ids=` | JWT | — | Obter vários itens do plano por IDs separados por vírgula |
| GET | `/plan/:planId` | JWT | — | Obter todos os itens de um plano (retorna a estrutura em árvore) |
| GET | `/presenter/:churchId/:planId` | Pública | — | Obter os itens do plano para a visualização do apresentador (retorna a estrutura em árvore) |
| POST | `/` | JWT | — | Criar ou atualizar itens do plano |
| POST | `/sort` | JWT | — | Atualizar a ordem de um item do plano (reordena os irmãos) |
| DELETE | `/:id` | JWT | — | Excluir um item do plano |

## Feed do Plano

Caminho base: `/doing/planFeed`

Fornece feeds dos itens do plano para o apresentador. Se não existirem itens no plano, ele é preenchido automaticamente a partir do feed de venue do Lessons.church usando o `contentId` do plano.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/presenter/:churchId/:planId` | Pública | — | Obter o feed do plano para o apresentador (preenchido automaticamente a partir do feed de venue se estiver vazio) |

## Posições

Caminho base: `/doing/positions`

Estende a classe base CRUD (GET `/:id`, POST `/`, DELETE `/:id` — sem verificações de permissão).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter uma posição pelo ID |
| GET | `/ids?ids=` | JWT | — | Obter várias posições por IDs separados por vírgula |
| GET | `/plan/ids?planIds=` | JWT | — | Obter as posições de vários planos por IDs de planos separados por vírgula |
| GET | `/plan/:planId` | JWT | — | Obter todas as posições de um plano |
| POST | `/` | JWT | — | Criar ou atualizar posições |
| DELETE | `/:id` | JWT | — | Excluir uma posição |

## Horários

Caminho base: `/doing/times`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/all` | JWT | — | Listar todos os horários da igreja |
| GET | `/:id` | JWT | — | Obter um horário pelo ID |
| GET | `/plans?planIds=` | JWT | — | Obter os horários de vários planos por IDs de planos separados por vírgula |
| GET | `/plan/:planId` | JWT | — | Obter todos os horários de um plano |
| POST | `/` | JWT | — | Criar ou atualizar horários |
| DELETE | `/:id` | JWT | — | Excluir um horário |

## Atribuições

Caminho base: `/doing/assignments`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/my` | JWT | — | Obter as atribuições do usuário atual |
| GET | `/my/upcoming` | JWT | — | Até 20 atribuições do usuário atual em planos com data a partir de ontem (planos em rascunho ou `prepared` são ignorados), do mais próximo para o mais distante: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Alimenta a prévia de escalas na página inicial do membro |
| GET | `/:id` | JWT | — | Obter uma atribuição pelo ID |
| GET | `/plan/ids?planIds=` | JWT | — | Obter as atribuições de vários planos por IDs de planos separados por vírgula |
| GET | `/plan/:planId` | JWT | — | Obter todas as atribuições de um plano |
| POST | `/` | JWT | — | Criar ou atualizar atribuições (o status padrão é "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Aceitar uma atribuição (deve ser a pessoa atribuída) |
| POST | `/decline/:id` | JWT | — | Recusar uma atribuição (deve ser a pessoa atribuída) |
| POST | `/signup` | JWT | — | Inscrição própria em uma posição. Corpo: `{ positionId }`. A posição deve permitir inscrição própria e ter vagas; cria uma atribuição Accepted. Rejeitada com "Signup deadline has passed" quando o prazo de inscrição do plano (contado a partir do primeiro horário de serviço, conforme descrito acima) já tiver passado |
| DELETE | `/signup/:id` | JWT | — | Remover a sua própria inscrição. Rejeitada com "Removal deadline has passed" após o prazo de inscrição do plano |
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

## Datas de Indisponibilidade

Caminho base: `/doing/blockoutDates`

Estende a classe base CRUD (GET `/:id`, DELETE `/:id` — sem verificações de permissão).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter uma data de indisponibilidade pelo ID |
| GET | `/ids?ids=` | JWT | — | Obter várias datas de indisponibilidade por IDs separados por vírgula |
| GET | `/my` | JWT | — | Obter as datas de indisponibilidade do usuário atual |
| GET | `/upcoming` | JWT | — | Obter todas as próximas datas de indisponibilidade da igreja |
| POST | `/` | JWT | — | Criar ou atualizar datas de indisponibilidade (usa o usuário atual como personId se não for informado) |
| DELETE | `/:id` | JWT | — | Excluir uma data de indisponibilidade |

## Tarefas

Caminho base: `/doing/tasks`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Obter as tarefas abertas do usuário atual |
| GET | `/:id` | JWT | — | Obter uma tarefa pelo ID |
| GET | `/:id/contact` | JWT | Pode visualizar o card | Informações de contato da pessoa à qual um card de fluxo se refere: `{ personId, displayName, mobilePhone, email }`. Permite que um responsável atribuído sem acesso a Pessoas entre em contato com a pessoa |
| GET | `/closed` | JWT | — | Obter as tarefas encerradas do usuário atual |
| GET | `/timeline?taskIds=` | JWT | — | Obter os dados da linha do tempo das tarefas por IDs de tarefas separados por vírgula |
| GET | `/directoryUpdate/:personId` | JWT | — | Obter a tarefa de atualização de diretório de uma pessoa |
| POST | `/` | JWT | — | Criar ou atualizar tarefas. Adicione `?type=directoryUpdate` para tratar tarefas de atualização de diretório (envia as fotos automaticamente) |
| POST | `/:id/conversation` | JWT | `tasks.edit` ou responsável pelo card | Vincular a conversa de anotações a um card. Corpo: `{ conversationId }`. A primeira conversa vinculada prevalece; chamadas posteriores retornam o card sem alterações |
| POST | `/loadForGroups` | JWT | — | Carregar tarefas de grupos específicos. Corpo: `{ groupIds: [], status: "Open" }` |

## Automações

Caminho base: `/doing/automations`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Listar todas as automações da igreja |
| GET | `/:id` | JWT | — | Obter uma automação pelo ID |
| GET | `/check` | Pública | — | Disparar uma verificação de todas as automações |
| POST | `/` | JWT | — | Criar ou atualizar automações |
| DELETE | `/:id` | JWT | — | Excluir uma automação |

## Ações

Caminho base: `/doing/actions`

As ações definem o que acontece quando uma automação é disparada.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter uma ação pelo ID |
| GET | `/automation/:id` | JWT | — | Obter todas as ações de uma automação |
| POST | `/` | JWT | — | Criar ou atualizar ações |
| DELETE | `/:id` | JWT | — | Excluir uma ação |

## Condições

Caminho base: `/doing/conditions`

As condições definem os critérios que disparam uma automação.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter uma condição pelo ID |
| GET | `/automation/:id` | JWT | — | Obter todas as condições de uma automação |
| POST | `/` | JWT | — | Criar ou atualizar condições |
| DELETE | `/:id` | JWT | — | Excluir uma condição |

## Conjunções

Caminho base: `/doing/conjunctions`

As conjunções vinculam várias condições em uma automação (lógica E/OU).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter uma conjunção pelo ID |
| GET | `/automation/:id` | JWT | — | Obter todas as conjunções de uma automação |
| POST | `/` | JWT | — | Criar ou atualizar conjunções |
| DELETE | `/:id` | JWT | — | Excluir uma conjunção |

## Autenticações de Provedores de Conteúdo

Caminho base: `/doing/contentProviderAuths`

Estende a classe base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — sem verificações de permissão).

Gerencia os registros de autenticação OAuth para provedores de conteúdo externos (por exemplo, integrações de software de apresentação).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Listar todas as autenticações de provedores de conteúdo |
| GET | `/:id` | JWT | — | Obter uma autenticação de provedor de conteúdo pelo ID |
| GET | `/ids?ids=` | JWT | — | Obter várias autenticações de provedores de conteúdo por IDs separados por vírgula |
| GET | `/ministry/:ministryId` | JWT | — | Obter todas as autenticações de provedores de conteúdo de um ministério |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Obter o registro de autenticação de um ministério e provedor específicos |
| POST | `/` | JWT | — | Criar ou atualizar autenticações de provedores de conteúdo |
| DELETE | `/:id` | JWT | — | Excluir uma autenticação de provedor de conteúdo |

## Proxy de Provedores

Caminho base: `/doing/providerProxy`

Encaminha requisições para provedores de conteúdo externos (por exemplo, ProPresenter, EasyWorship). Renova o token automaticamente quando ele expira.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| POST | `/browse` | JWT | — | Navegar pelos arquivos do provedor de conteúdo. Corpo: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Obter as apresentações de um provedor de conteúdo. Corpo: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Obter uma playlist de um provedor de conteúdo. Corpo: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Obter as instruções de um item de conteúdo. Corpo: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Obter as instruções expandidas de um item de conteúdo. Corpo: `{ ministryId, providerId, path }` |

## Páginas Relacionadas

- [Endpoints de Membresia](./membership) — Pessoas, grupos, funções e permissões
- [Endpoints de Frequência](./attendance) — Registro de serviços e visitas
- [Estrutura de Módulos](../module-structure) — Padrões de organização do código
