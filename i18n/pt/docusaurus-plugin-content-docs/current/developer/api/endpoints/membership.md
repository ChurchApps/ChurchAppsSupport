---
title: "Endpoints de Membership"
---

# Endpoints de Membership

<div class="article-intro">

O módulo Membership gerencia pessoas, igrejas, grupos, domicílios, funções, permissões, formulários e configurações. É o maior módulo e fornece a camada central de identidade e autorização para todos os outros módulos.

</div>

**Caminho base:** `/membership`

## Pessoas

Caminho base: `/membership/people`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | People.View ou Member | Listar todas as pessoas da igreja |
| GET | `/:id` | JWT | People.View ou registro próprio | Obter uma pessoa pelo ID (inclui envios de formulário) |
| GET | `/ids?ids=` | JWT | People.View ou Member | Obter várias pessoas por IDs separados por vírgula |
| GET | `/basic?ids=` | JWT | — | Obter informações básicas (apenas nome) de várias pessoas |
| GET | `/names?ids=` | JWT | Qualquer permissão da igreja | `[{ id, name: { display, first, last }, photo }]`, ordenado por sobrenome e depois nome, para IDs separados por vírgula que o chamador já possui, para que funções sem People.View (doações, presença) possam identificar pessoas. Sem busca, sem filtro de diretório |
| POST | `/names` | JWT | Qualquer permissão da igreja | Igual a `GET /names`. Corpo: `{ peopleIds }` (ou `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member ou People.ViewNames | Pessoas adicionadas recentemente. Chamadores apenas com People.ViewNames recebem o modelo básico (`id`, `name.display`, `photo`, `membershipStatus`), sem pessoas que optaram por não aparecer |
| GET | `/search?term=&email=` | JWT | People.View, Member ou People.ViewNames | Pesquisar pessoas por nome ou e-mail (até 100, ordenado por sobrenome e depois nome). Chamadores apenas com People.ViewNames recebem uma pesquisa por nome retornando o modelo básico; uma pesquisa por `email` retorna `[]` |
| GET | `/search/phone?number=` | JWT | People.View ou Member | Pesquisar por número de telefone |
| GET | `/search/group?groupId=` | JWT | People.View ou Member | Obter pessoas de um grupo específico |
| GET | `/household/:householdId` | JWT | — | Obter todas as pessoas de um domicílio |
| GET | `/attendance` | JWT | People.Edit | Carregar participantes com filtros (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Carregar dados de linha do tempo de pessoas e grupos |
| GET | `/directory/:id` | JWT | — | Obter pessoa para a visualização do diretório (respeita as preferências de visibilidade) |
| GET | `/claim/:churchId` | JWT | — | Vincular um registro de pessoa ao usuário atual em uma igreja |
| POST | `/` | JWT | People.Edit ou EditSelf | Criar ou atualizar pessoas (em lote) |
| POST | `/search` | JWT | People.View, Member ou People.ViewNames | Pesquisar pessoas (variante POST). Corpo: `{ term }` ou `{ email }`; mesmas regras de somente nomes de `GET /search` |
| POST | `/advancedSearch` | JWT | People.View ou Member | Pesquisa com múltiplas condições (idade, birthMonth, membershipStatus, etc.) |
| POST | `/loadOrCreate` | Público | — | Encontrar ou criar uma pessoa pelo e-mail. Corpo: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Atualizar as atribuições de membros do domicílio |
| POST | `/public/email` | Público | — | Enviar um e-mail para uma pessoa. Corpo: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interno | — | Carregar e-mails de pessoas por IDs (servidor para servidor, requer jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Excluir uma pessoa |

### Exemplo: Pesquisar Pessoas

```
GET /membership/people/search?term=John
Authorization: Bearer <token>
```

```json
[
  {
    "id": "abc-123",
    "name": { "first": "John", "last": "Smith" },
    "contactInfo": { "email": "john@example.com" },
    "membershipStatus": "Member"
  }
]
```

### Exemplo: Criar uma Pessoa

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Usuários {#users}

Caminho base: `/membership/users`

Consulte [Autenticação e Permissões](./authentication) para os endpoints de login, registro e gerenciamento de senha.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| POST | `/login` | Público | — | Fazer login (e-mail/senha, atualização de JWT ou authGuid) |
| POST | `/register` | Público | — | Registrar um novo usuário |
| POST | `/forgot` | Público | — | Enviar e-mail de redefinição de senha |
| POST | `/setPasswordGuid` | Público | — | Definir a senha usando o GUID de autenticação do link do e-mail |
| POST | `/verifyCredentials` | Público | — | Verificar e-mail/senha e retornar as igrejas associadas |
| POST | `/loadOrCreate` | JWT | — | Encontrar ou criar um usuário pelo e-mail/userId |
| POST | `/setDisplayName` | JWT | — | Atualizar o nome e sobrenome do usuário |
| POST | `/updateEmail` | JWT | — | Alterar o endereço de e-mail do usuário |
| POST | `/updatePassword` | JWT | — | Alterar a senha do usuário (mínimo de 6 caracteres) |
| POST | `/updateOptedOut` | JWT | — | Definir o status de opt-out de uma pessoa |
| POST | `/sendInviteEmail` | JWT | People.Edit | Enviar um e-mail de convite a uma pessoa desta igreja (`email`, `personName`, `contextName`). O botão mostra **Sign Up** para alguém sem conta e **Log In** para um usuário existente. Um usuário que nunca fez login recebe um link **Set Your Password** que expira em 7 dias. Conta para o limite diário de e-mails da igreja (`429` quando atingido) |
| GET | `/search?term=` | JWT | Server.Admin | Pesquisar todos os usuários por nome/e-mail |
| DELETE | `/` | JWT | — | Excluir a conta do usuário atual |

## Igrejas

Caminho base: `/membership/churches`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Carregar todas as igrejas do usuário atual |
| GET | `/:id` | JWT | — | Obter igreja pelo ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obter o usuário administrador de domínio de uma igreja |
| GET | `/:id/impersonate` | JWT | Server.Admin | Personificar uma igreja (somente administrador do servidor) |
| GET | `/all?term=` | JWT | Server.Admin | Pesquisar todas as igrejas (admin) |
| GET | `/search/?name=` | Público | — | Pesquisar igrejas pelo nome |
| GET | `/lookup/?subDomain=&id=` | Público | — | Localizar uma igreja pelo subdomínio ou ID |
| POST | `/` | JWT | Settings.Edit | Atualizar os dados da igreja |
| POST | `/add` | JWT | — | Registrar uma nova igreja. Campos obrigatórios: name, address1, city, state, zip, country |
| POST | `/search` | Público | — | Pesquisar igrejas pelo nome (variante POST) |
| POST | `/select` | JWT | — | Selecionar/trocar para uma igreja. Corpo: `{ churchId }` ou `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Arquivar ou desarquivar uma igreja |
| POST | `/byIds` | Público | — | Carregar várias igrejas por IDs |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Excluir igrejas abandonadas há 7 dias ou mais |

## Grupos

Caminho base: `/membership/groups`

Estende o CRUD padrão (GET `/`, GET `/:id` da classe base).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Listar todos os grupos |
| GET | `/:id` | JWT | — | Obter grupo pelo ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Pesquisar grupos por filtros de culto |
| GET | `/my` | JWT | — | Obter os grupos do usuário atual |
| GET | `/my/:tag` | JWT | — | Obter os grupos do usuário atual filtrados por tag |
| GET | `/tag/:tag` | JWT | — | Obter todos os grupos com uma tag específica |
| GET | `/public/:churchId/:id` | Público | — | Obter um grupo público por igreja e ID |
| GET | `/public/:churchId/tag/:tag` | Público | — | Obter grupos públicos por tag |
| GET | `/public/:churchId/label?label=` | Público | — | Obter grupos públicos por rótulo |
| GET | `/public/:churchId/slug/:slug` | Público | — | Obter um grupo público pelo slug |
| POST | `/` | JWT | Groups.Edit | Criar ou atualizar grupos (gera o slug automaticamente) |
| DELETE | `/:id` | JWT | Groups.Edit | Excluir um grupo (também exclui as equipes filhas dos grupos de ministério) |

## Membros do Grupo

Caminho base: `/membership/groupmembers`

Estende o CRUD padrão (GET `/:id`, DELETE `/:id` da classe base).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/:id` | JWT | GroupMembers.View | Obter membro do grupo pelo ID |
| GET | `/` | JWT | GroupMembers.View* | Listar membros do grupo. Filtre por `?groupId=`, `?groupIds=` ou `?personId=`. *Também permitido se o usuário estiver no grupo ou consultar o próprio personId |
| GET | `/my` | JWT | — | Obter as participações em grupos do usuário atual |
| GET | `/basic/:groupId` | JWT | — | Obter a lista básica de membros de um grupo |
| GET | `/public/leaders/:churchId/:groupId` | Público | — | Obter os líderes de um grupo (público) |
| GET | `/public/:churchId/:groupId` | Público | — | Obter a lista pública de um grupo (campos mínimos: `personId`, `displayName`, `leader`, foto). Somente quando o grupo opta por `publicRoster`; alimenta o elemento `staffGrid` do construtor de sites |
| POST | `/` | JWT | GroupMembers.Edit | Adicionar ou atualizar membros do grupo |
| DELETE | `/:id` | JWT | GroupMembers.View | Remover um membro do grupo |

## Domicílios

Caminho base: `/membership/households`

Controlador CRUD padrão.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Listar todos os domicílios |
| GET | `/:id` | JWT | — | Obter domicílio pelo ID |
| POST | `/` | JWT | People.Edit | Criar ou atualizar domicílios |
| DELETE | `/:id` | JWT | People.Edit | Excluir um domicílio |

## Funções

Caminho base: `/membership/roles`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/:id` | JWT | Roles.View | Obter função pelo ID |
| GET | `/church/:churchId` | JWT | Roles.View | Obter todas as funções de uma igreja |
| POST | `/` | JWT | Roles.Edit | Criar ou atualizar funções |
| DELETE | `/:id` | JWT | Roles.Edit | Excluir uma função (também remove suas permissões e membros) |

## Membros da Função

Caminho base: `/membership/rolemembers`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/roles/:id` | JWT | Roles.View | Obter os membros de uma função. Adicione `?include=users` para incluir os dados dos usuários |
| POST | `/` | JWT | Roles.Edit | Adicionar membros a uma função (cria o usuário se o e-mail não existir) |
| DELETE | `/:id` | JWT | Roles.View | Remover um membro da função |
| DELETE | `/self/:churchId/:userId` | JWT | — | Remover a si mesmo de uma igreja |

## Permissões da Função

Caminho base: `/membership/rolepermissions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/roles/:id` | JWT | Roles.View | Obter as permissões de uma função (use `null` como ID para a função "Everyone") |
| POST | `/` | JWT | Roles.Edit | Criar ou atualizar permissões de função |
| DELETE | `/:id` | JWT | Roles.Edit | Excluir uma permissão de função |

## Permissões

Caminho base: `/membership/permissions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Obter a lista completa de permissões disponíveis |

Cada entrada tem `apiName`, `section` (tipo de conteúdo), `action`, e os rótulos `displaySection` / `displayAction` que o editor de funções do B1Admin mostra. Adições recentes: `MembershipApi` / `People` / `View Names` (**View People Names Only**, em People and Groups) e `GivingApi` / `Donations` / `Enter` (**Enter Donations**, em Donations; consulte [Lotes de Doações](./giving.md#donation-batches)).

## Formulários

Caminho base: `/membership/forms`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Listar todos os formulários (o administrador vê todos; editores veem os atribuídos + formulários que não são de membros) |
| GET | `/:id` | JWT | Acesso ao formulário | Obter um formulário pelo ID |
| GET | `/archived` | JWT | Forms.Admin ou Forms.Edit | Listar formulários arquivados |
| GET | `/standalone/:id?churchId=` | JWT | — | Obter um formulário independente (formulários restritos exigem autenticação) |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Criar ou atualizar formulários |
| DELETE | `/:id` | JWT | Acesso ao formulário | Excluir um formulário |

## Envios de Formulário

Caminho base: `/membership/formsubmissions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Listar envios. Filtre por `?personId=` ou `?formId=` |
| GET | `/:id` | JWT | Forms.Admin ou Forms.Edit | Obter envio pelo ID. Adicione `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Acesso ao formulário | Obter todos os envios de um formulário (inclui formulário, perguntas, respostas) |
| POST | `/` | JWT | — | Enviar respostas do formulário (trata formulários restritos e não restritos, envia notificações por e-mail). Quando o formulário tem `autoCreatePerson`, encontra ou cria uma pessoa Guest pelo e-mail e vincula o envio; quando `followUpSubject`/`followUpBody` são definidos, envia um e-mail de acompanhamento com modelo ao remetente |
| DELETE | `/:id` | JWT | Forms.Admin ou Forms.Edit | Excluir um envio e suas respostas |

## Perguntas

Caminho base: `/membership/questions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | Acesso ao formulário | Listar perguntas de um formulário. Requer `?formId=` |
| GET | `/:id` | JWT | Acesso ao formulário | Obter uma pergunta pelo ID |
| GET | `/unrestricted?formId=` | JWT | — | Obter perguntas de um formulário não restrito |
| GET | `/sort/:id/up` | JWT | — | Mover uma pergunta para cima na ordem |
| GET | `/sort/:id/down` | JWT | — | Mover uma pergunta para baixo na ordem |
| POST | `/` | JWT | Acesso ao formulário | Criar ou atualizar perguntas (atribui a ordem automaticamente) |
| DELETE | `/:id?formId=` | JWT | Acesso ao formulário | Excluir uma pergunta |

## Respostas

Caminho base: `/membership/answers`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Listar respostas. Filtre por `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Criar ou atualizar respostas |

## Permissões de Membro

Caminho base: `/membership/memberpermissions`

Controla o acesso de cada membro a formulários específicos.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/:id` | JWT | Acesso ao formulário | Obter uma permissão de membro pelo ID |
| GET | `/member/:id` | JWT | Acesso ao formulário | Obter todas as permissões de formulário de um membro |
| GET | `/form/:id` | JWT | Acesso ao formulário | Obter todas as permissões de membros de um formulário |
| GET | `/form/:id/my` | JWT | Acesso ao formulário | Obter a permissão do usuário atual para um formulário |
| POST | `/` | JWT | Acesso ao formulário | Criar ou atualizar permissões de membro |
| DELETE | `/:id?formId=` | JWT | Acesso ao formulário | Excluir uma permissão de membro |
| DELETE | `/member/:id?formId=` | JWT | Acesso ao formulário | Excluir todas as permissões de um membro em um formulário |

## Configurações

Caminho base: `/membership/settings`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | Settings.Edit | Obter todas as configurações da igreja |
| GET | `/public/:churchId` | Público | — | Obter as configurações públicas de uma igreja |
| POST | `/` | JWT | Settings.Edit | Salvar configurações (aceita upload de imagem em base64) |

## Domínios

Caminho base: `/membership/domains`

Estende o CRUD padrão (GET `/:id`, GET `/`, DELETE `/:id` da classe base).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Listar todos os domínios |
| GET | `/:id` | JWT | — | Obter domínio pelo ID |
| GET | `/lookup/:domainName` | JWT | — | Localizar um domínio pelo nome |
| GET | `/public/lookup/:domainName` | Público | — | Localização pública de domínio pelo nome |
| GET | `/health/check` | Público | — | Executar verificação de integridade nos domínios não verificados |
| POST | `/` | JWT | Settings.Edit | Criar ou atualizar domínios (dispara a atualização do Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Excluir um domínio |

## Usuário-Igreja

Caminho base: `/membership/userchurch`

Gerencia a associação entre usuários e igrejas.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/userid/:userId` | JWT | — | Obter o registro usuário-igreja pelo ID do usuário |
| GET | `/personid/:personId` | JWT | — | Obter o e-mail do usuário vinculado a uma pessoa |
| GET | `/user/:userId` | JWT | Server.Admin | Carregar todas as igrejas de um usuário |
| POST | `/` | JWT | — | Criar uma associação usuário-igreja |
| PATCH | `/:userId` | JWT | — | Atualizar a data do último acesso e registrar o acesso |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Excluir um registro usuário-igreja |

## Preferências de Visibilidade

Caminho base: `/membership/visibilityPreferences`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | Obter as preferências de visibilidade do usuário atual |
| POST | `/` | JWT | — | Salvar preferências de visibilidade (visibilidade de endereço, telefone e e-mail) |

## Consulta

Caminho base: `/membership/query`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| POST | `/members` | JWT | — | Pesquisa de membros em linguagem natural usando IA. Corpo: `{ text, subDomain, siteUrl }` |

## Erros do Cliente

Caminho base: `/membership/clientErrors`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| POST | `/` | JWT | — | Registrar um erro do lado do cliente |

## Páginas Relacionadas

- [Autenticação e Permissões](./authentication) — Fluxo de login, JWT, OAuth, modelo de permissões
- [Endpoints de Attendance](./attendance) — Rastreamento de cultos e visitas
- [Estrutura do Módulo](../module-structure) — Padrões de organização do código
