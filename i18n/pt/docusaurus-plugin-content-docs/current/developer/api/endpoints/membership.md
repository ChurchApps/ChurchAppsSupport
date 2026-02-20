---
title: "Endpoints de Membros"
---

# Endpoints de Membros

<div class="article-intro">

O módulo de Membros gerencia pessoas, igrejas, grupos, domicílios, papéis, permissões, formulários e configurações. É o maior módulo e fornece a camada central de identidade e autorização para todos os outros módulos.

</div>

**Caminho base:** `/membership`

## Pessoas

Caminho base: `/membership/people`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | People.View ou Membro | Listar todas as pessoas da igreja |
| GET | `/:id` | JWT | People.View ou próprio registro | Obter uma pessoa por ID (inclui envios de formulários) |
| GET | `/ids?ids=` | JWT | People.View ou Membro | Obter múltiplas pessoas por IDs separados por vírgula |
| GET | `/basic?ids=` | JWT | — | Obter informações básicas (apenas nome) de múltiplas pessoas |
| GET | `/recent` | JWT | People.View ou Membro | Pessoas adicionadas recentemente |
| GET | `/search?term=&email=` | JWT | People.View ou Membro | Buscar pessoas por nome ou email |
| GET | `/search/phone?number=` | JWT | People.View ou Membro | Buscar por número de telefone |
| GET | `/search/group?groupId=` | JWT | People.View ou Membro | Obter pessoas em um grupo específico |
| GET | `/household/:householdId` | JWT | — | Obter todas as pessoas de um domicílio |
| GET | `/attendance` | JWT | People.Edit | Carregar participantes com filtros (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Carregar dados de linha do tempo para pessoas e grupos |
| GET | `/directory/:id` | JWT | — | Obter pessoa para visualização de diretório (respeita preferências de visibilidade) |
| GET | `/claim/:churchId` | JWT | — | Reivindicar um registro de pessoa para o usuário atual em uma igreja |
| POST | `/` | JWT | People.Edit ou EditSelf | Criar ou atualizar pessoas (lote) |
| POST | `/search` | JWT | People.View ou Membro | Buscar pessoas (variante POST) |
| POST | `/advancedSearch` | JWT | People.View ou Membro | Busca multi-condição (idade, mês de nascimento, status de membro, etc.) |
| POST | `/loadOrCreate` | Público | — | Encontrar ou criar uma pessoa por email. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Atualizar atribuições de membros do domicílio |
| POST | `/public/email` | Público | — | Enviar um email para uma pessoa. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interno | — | Carregar emails de pessoas por IDs (servidor-a-servidor, requer jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Excluir uma pessoa |

### Exemplo: Buscar Pessoas

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

## Usuários

Caminho base: `/membership/users`

Veja [Autenticação e Permissões](./authentication) para endpoints de login, registro e gerenciamento de senha.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| POST | `/login` | Público | — | Login (email/senha, renovação JWT ou authGuid) |
| POST | `/register` | Público | — | Registrar um novo usuário |
| POST | `/forgot` | Público | — | Enviar email de redefinição de senha |
| POST | `/setPasswordGuid` | Público | — | Definir senha usando GUID de autenticação do link do email |
| POST | `/verifyCredentials` | Público | — | Verificar email/senha e retornar igrejas associadas |
| POST | `/loadOrCreate` | JWT | — | Encontrar ou criar um usuário por email/userId |
| POST | `/setDisplayName` | JWT | — | Atualizar nome e sobrenome do usuário |
| POST | `/updateEmail` | JWT | — | Alterar endereço de email do usuário |
| POST | `/updatePassword` | JWT | — | Alterar senha do usuário (mín. 6 caracteres) |
| POST | `/updateOptedOut` | JWT | — | Definir status de opt-out de uma pessoa |
| GET | `/search?term=` | JWT | Server.Admin | Buscar todos os usuários por nome/email |
| DELETE | `/` | JWT | — | Excluir a conta do usuário atual |

## Igrejas

Caminho base: `/membership/churches`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Carregar todas as igrejas do usuário atual |
| GET | `/:id` | JWT | — | Obter igreja por ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obter o usuário administrador do domínio de uma igreja |
| GET | `/:id/impersonate` | JWT | Server.Admin | Personificar uma igreja (apenas admin do servidor) |
| GET | `/all?term=` | JWT | Server.Admin | Buscar todas as igrejas (admin) |
| GET | `/search/?name=` | Público | — | Buscar igrejas por nome |
| GET | `/lookup/?subDomain=&id=` | Público | — | Consultar uma igreja por subdomínio ou ID |
| POST | `/` | JWT | Settings.Edit | Atualizar detalhes da igreja |
| POST | `/add` | JWT | — | Registrar uma nova igreja. Campos obrigatórios: name, address1, city, state, zip, country |
| POST | `/search` | Público | — | Buscar igrejas por nome (variante POST) |
| POST | `/select` | JWT | — | Selecionar/trocar para uma igreja. Body: `{ churchId }` ou `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Arquivar ou desarquivar uma igreja |
| POST | `/byIds` | Público | — | Carregar múltiplas igrejas por IDs |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Excluir igrejas abandonadas por 7+ dias |

## Grupos

Caminho base: `/membership/groups`

Estende CRUD padrão (GET `/`, GET `/:id` da classe base).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os grupos |
| GET | `/:id` | JWT | — | Obter grupo por ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Buscar grupos por filtros de culto |
| GET | `/my` | JWT | — | Obter grupos do usuário atual |
| GET | `/my/:tag` | JWT | — | Obter grupos do usuário atual filtrados por tag |
| GET | `/tag/:tag` | JWT | — | Obter todos os grupos com uma tag específica |
| GET | `/public/:churchId/:id` | Público | — | Obter um grupo público por igreja e ID |
| GET | `/public/:churchId/tag/:tag` | Público | — | Obter grupos públicos por tag |
| GET | `/public/:churchId/label?label=` | Público | — | Obter grupos públicos por rótulo |
| GET | `/public/:churchId/slug/:slug` | Público | — | Obter um grupo público por slug |
| POST | `/` | JWT | Groups.Edit | Criar ou atualizar grupos (gera slug automaticamente) |
| DELETE | `/:id` | JWT | Groups.Edit | Excluir um grupo (também exclui equipes filhas para grupos de ministério) |

## Membros de Grupos

Caminho base: `/membership/groupmembers`

Estende CRUD padrão (GET `/:id`, DELETE `/:id` da classe base).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | GroupMembers.View | Obter membro de grupo por ID |
| GET | `/` | JWT | GroupMembers.View* | Listar membros de grupos. Filtrar por `?groupId=`, `?groupIds=` ou `?personId=`. *Também permitido se o usuário estiver no grupo ou consultando próprio personId |
| GET | `/my` | JWT | — | Obter associações de grupo do usuário atual |
| GET | `/basic/:groupId` | JWT | — | Obter lista básica de membros de um grupo |
| GET | `/public/leaders/:churchId/:groupId` | Público | — | Obter líderes do grupo (público) |
| POST | `/` | JWT | GroupMembers.Edit | Adicionar ou atualizar membros de grupos |
| DELETE | `/:id` | JWT | GroupMembers.View | Remover um membro de grupo |

## Domicílios

Caminho base: `/membership/households`

Controller CRUD padrão.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os domicílios |
| GET | `/:id` | JWT | — | Obter domicílio por ID |
| POST | `/` | JWT | People.Edit | Criar ou atualizar domicílios |
| DELETE | `/:id` | JWT | People.Edit | Excluir um domicílio |

## Papéis

Caminho base: `/membership/roles`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | Roles.View | Obter papel por ID |
| GET | `/church/:churchId` | JWT | Roles.View | Obter todos os papéis de uma igreja |
| POST | `/` | JWT | Roles.Edit | Criar ou atualizar papéis |
| DELETE | `/:id` | JWT | Roles.Edit | Excluir um papel (também remove suas permissões e membros) |

## Membros de Papéis

Caminho base: `/membership/rolemembers`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/roles/:id` | JWT | Roles.View | Obter membros de um papel. Adicione `?include=users` para incluir detalhes do usuário |
| POST | `/` | JWT | Roles.Edit | Adicionar membros a um papel (cria usuário se email não existir) |
| DELETE | `/:id` | JWT | Roles.View | Remover um membro de papel |
| DELETE | `/self/:churchId/:userId` | JWT | — | Remover-se de uma igreja |

## Permissões de Papéis

Caminho base: `/membership/rolepermissions`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/roles/:id` | JWT | Roles.View | Obter permissões de um papel (use `null` como ID para o papel "Todos") |
| POST | `/` | JWT | Roles.Edit | Criar ou atualizar permissões de papéis |
| DELETE | `/:id` | JWT | Roles.Edit | Excluir uma permissão de papel |

## Permissões

Caminho base: `/membership/permissions`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Obter a lista completa de permissões disponíveis |

## Formulários

Caminho base: `/membership/forms`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Listar todos os formulários (admin vê todos; editores veem atribuídos + formulários de não-membros) |
| GET | `/:id` | JWT | Acesso ao formulário | Obter um formulário por ID |
| GET | `/archived` | JWT | Forms.Admin ou Forms.Edit | Listar formulários arquivados |
| GET | `/standalone/:id?churchId=` | JWT | — | Obter um formulário autônomo (formulários restritos requerem autenticação) |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Criar ou atualizar formulários |
| DELETE | `/:id` | JWT | Acesso ao formulário | Excluir um formulário |

## Envios de Formulários

Caminho base: `/membership/formsubmissions`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Listar envios. Filtrar por `?personId=` ou `?formId=` |
| GET | `/:id` | JWT | Forms.Admin ou Forms.Edit | Obter envio por ID. Adicione `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Acesso ao formulário | Obter todos os envios de um formulário (inclui formulário, perguntas, respostas) |
| POST | `/` | JWT | — | Enviar respostas do formulário (trata formulários restritos/não restritos, envia notificações por email) |
| DELETE | `/:id` | JWT | Forms.Admin ou Forms.Edit | Excluir um envio e suas respostas |

## Perguntas

Caminho base: `/membership/questions`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Acesso ao formulário | Listar perguntas de um formulário. Requer `?formId=` |
| GET | `/:id` | JWT | Acesso ao formulário | Obter uma pergunta por ID |
| GET | `/unrestricted?formId=` | JWT | — | Obter perguntas de um formulário não restrito |
| GET | `/sort/:id/up` | JWT | — | Mover uma pergunta para cima na ordem |
| GET | `/sort/:id/down` | JWT | — | Mover uma pergunta para baixo na ordem |
| POST | `/` | JWT | Acesso ao formulário | Criar ou atualizar perguntas (atribui ordem automaticamente) |
| DELETE | `/:id?formId=` | JWT | Acesso ao formulário | Excluir uma pergunta |

## Respostas

Caminho base: `/membership/answers`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Listar respostas. Filtrar por `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Criar ou atualizar respostas |

## Permissões de Membros

Caminho base: `/membership/memberpermissions`

Controla o acesso por membro a formulários específicos.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | Acesso ao formulário | Obter uma permissão de membro por ID |
| GET | `/member/:id` | JWT | Acesso ao formulário | Obter todas as permissões de formulário de um membro |
| GET | `/form/:id` | JWT | Acesso ao formulário | Obter todas as permissões de membros de um formulário |
| GET | `/form/:id/my` | JWT | Acesso ao formulário | Obter permissão do usuário atual para um formulário |
| POST | `/` | JWT | Acesso ao formulário | Criar ou atualizar permissões de membros |
| DELETE | `/:id?formId=` | JWT | Acesso ao formulário | Excluir uma permissão de membro |
| DELETE | `/member/:id?formId=` | JWT | Acesso ao formulário | Excluir todas as permissões de um membro em um formulário |

## Configurações

Caminho base: `/membership/settings`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Settings.Edit | Obter todas as configurações da igreja |
| GET | `/public/:churchId` | Público | — | Obter configurações públicas de uma igreja |
| POST | `/` | JWT | Settings.Edit | Salvar configurações (suporta upload de imagem em base64) |

## Domínios

Caminho base: `/membership/domains`

Estende CRUD padrão (GET `/:id`, GET `/`, DELETE `/:id` da classe base).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os domínios |
| GET | `/:id` | JWT | — | Obter domínio por ID |
| GET | `/lookup/:domainName` | JWT | — | Consultar um domínio por nome |
| GET | `/public/lookup/:domainName` | Público | — | Consulta pública de domínio por nome |
| GET | `/health/check` | Público | — | Executar verificação de saúde em domínios não verificados |
| POST | `/` | JWT | Settings.Edit | Criar ou atualizar domínios (aciona atualização do Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Excluir um domínio |

## Igreja do Usuário

Caminho base: `/membership/userchurch`

Gerencia a associação entre usuários e igrejas.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/userid/:userId` | JWT | — | Obter registro usuário-igreja por ID do usuário |
| GET | `/personid/:personId` | JWT | — | Obter email do usuário vinculado a uma pessoa |
| GET | `/user/:userId` | JWT | Server.Admin | Carregar todas as igrejas de um usuário |
| POST | `/` | JWT | — | Criar uma associação usuário-igreja |
| PATCH | `/:userId` | JWT | — | Atualizar hora do último acesso e registrar acesso |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Excluir um registro usuário-igreja |

## Preferências de Visibilidade

Caminho base: `/membership/visibilityPreferences`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/my` | JWT | — | Obter preferências de visibilidade do usuário atual |
| POST | `/` | JWT | — | Salvar preferências de visibilidade (visibilidade de endereço, telefone, email) |

## Consulta

Caminho base: `/membership/query`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| POST | `/members` | JWT | — | Busca de membros em linguagem natural usando IA. Body: `{ text, subDomain, siteUrl }` |

## Erros do Cliente

Caminho base: `/membership/clientErrors`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| POST | `/` | JWT | — | Registrar um erro do lado do cliente |

## Páginas Relacionadas

- [Autenticação e Permissões](./authentication) — Fluxo de login, JWT, OAuth, modelo de permissões
- [Endpoints de Presença](./attendance) — Rastreamento de cultos e visitas
- [Estrutura do Módulo](../module-structure) — Padrões de organização de código
