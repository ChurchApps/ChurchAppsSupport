---
title: "Endpoints de Membros"
---

# Endpoints de Membros

<div class="article-intro">

O módulo de Membros gerencia pessoas, igrejas, grupos, famílias, funções, permissões, formulários e configurações. É o maior módulo e fornece a camada de identidade e autorização principal para todos os outros módulos.

</div>

**Caminho base:** `/membership`

## Pessoas

Caminho base: `/membership/people`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | People.View ou Member | Listar todas as pessoas da igreja |
| GET | `/:id` | JWT | People.View ou registro próprio | Obter uma pessoa por ID (inclui envios de formulário) |
| GET | `/ids?ids=` | JWT | People.View ou Member | Obter múltiplas pessoas por IDs separados por vírgula |
| GET | `/basic?ids=` | JWT | — | Obter informações básicas (apenas nome) para múltiplas pessoas |
| GET | `/recent` | JWT | People.View ou Member | Pessoas adicionadas recentemente |
| GET | `/search?term=&email=` | JWT | People.View ou Member | Procurar pessoas por nome ou email |
| GET | `/search/phone?number=` | JWT | People.View ou Member | Procurar por número de telefone |
| GET | `/search/group?groupId=` | JWT | People.View ou Member | Obter pessoas em um grupo específico |
| GET | `/household/:householdId` | JWT | — | Obter todas as pessoas em uma família |
| GET | `/attendance` | JWT | People.Edit | Carregar participantes com filtros (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Carregar dados de linha do tempo para pessoas e grupos |
| GET | `/directory/:id` | JWT | — | Obter pessoa para visualização de diretório (respeita preferências de visibilidade) |
| GET | `/claim/:churchId` | JWT | — | Reivindicar um registro de pessoa para o usuário atual em uma igreja |
| POST | `/` | JWT | People.Edit ou EditSelf | Criar ou atualizar pessoas (lote) |
| POST | `/search` | JWT | People.View ou Member | Procurar pessoas (variante POST) |
| POST | `/advancedSearch` | JWT | People.View ou Member | Busca multi-condição (idade, mês de nascimento, status de membros, etc.) |
| POST | `/loadOrCreate` | Public | — | Encontrar ou criar uma pessoa por email. Corpo: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Atualizar atribuições de membros da família |
| POST | `/public/email` | Public | — | Enviar um email para uma pessoa. Corpo: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | Carregar emails de pessoa por IDs (servidor para servidor, requer jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Deletar uma pessoa |

### Exemplo: Procurar Pessoas

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
| POST | `/login` | Public | — | Conectar (email/senha, atualização JWT ou authGuid) |
| POST | `/register` | Public | — | Registrar um novo usuário |
| POST | `/forgot` | Public | — | Enviar email de reconfiguração de senha |
| POST | `/setPasswordGuid` | Public | — | Definir senha usando GUID de auth do link de email |
| POST | `/verifyCredentials` | Public | — | Verificar email/senha e retornar igrejas associadas |
| POST | `/loadOrCreate` | JWT | — | Encontrar ou criar um usuário por email/userId |
| POST | `/setDisplayName` | JWT | — | Atualizar nome e sobrenome do usuário |
| POST | `/updateEmail` | JWT | — | Alterar email do usuário |
| POST | `/updatePassword` | JWT | — | Alterar senha do usuário (mín. 6 caracteres) |
| POST | `/updateOptedOut` | JWT | — | Definir status de opção de saída de uma pessoa |
| GET | `/search?term=` | JWT | Server.Admin | Procurar todos os usuários por nome/email |
| DELETE | `/` | JWT | — | Deletar a conta do usuário atual |

## Igrejas

Caminho base: `/membership/churches`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Carregar todas as igrejas para o usuário atual |
| GET | `/:id` | JWT | — | Obter igreja por ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obter o usuário administrador de domínio para uma igreja |
| GET | `/:id/impersonate` | JWT | Server.Admin | Representar uma igreja (apenas admin de servidor) |
| GET | `/all?term=` | JWT | Server.Admin | Procurar todas as igrejas (admin) |
| GET | `/search/?name=` | Public | — | Procurar igrejas por nome |
| GET | `/lookup/?subDomain=&id=` | Public | — | Procurar uma igreja por subdomínio ou ID |
| POST | `/` | JWT | Settings.Edit | Atualizar detalhes da igreja |
| POST | `/add` | JWT | — | Registrar uma nova igreja. Campos obrigatórios: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | Procurar igrejas por nome (variante POST) |
| POST | `/select` | JWT | — | Selecionar/mudar para uma igreja. Corpo: `{ churchId }` ou `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Arquivar ou desarquivar uma igreja |
| POST | `/byIds` | Public | — | Carregar múltiplas igrejas por IDs |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Deletar igrejas abandonadas por 7+ dias |

## Grupos

Caminho base: `/membership/groups`

Estende CRUD padrão (GET `/`, GET `/:id` da classe base).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os grupos |
| GET | `/:id` | JWT | — | Obter grupo por ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Procurar grupos por filtros de serviço |
| GET | `/my` | JWT | — | Obter grupos do usuário atual |
| GET | `/my/:tag` | JWT | — | Obter grupos do usuário atual filtrados por tag |
| GET | `/tag/:tag` | JWT | — | Obter todos os grupos com uma tag específica |
| GET | `/public/:churchId/:id` | Public | — | Obter um grupo público por igreja e ID |
| GET | `/public/:churchId/tag/:tag` | Public | — | Obter grupos públicos por tag |
| GET | `/public/:churchId/label?label=` | Public | — | Obter grupos públicos por rótulo |
| GET | `/public/:churchId/slug/:slug` | Public | — | Obter um grupo público por slug |
| POST | `/` | JWT | Groups.Edit | Criar ou atualizar grupos (gera automaticamente slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Deletar um grupo (também deleta equipes filhas para grupos de ministério) |

## Membros do Grupo

Caminho base: `/membership/groupmembers`

Estende CRUD padrão (GET `/:id`, DELETE `/:id` da classe base).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | GroupMembers.View | Obter membro do grupo por ID |
| GET | `/` | JWT | GroupMembers.View* | Listar membros do grupo. Filtrar por `?groupId=`, `?groupIds=` ou `?personId=`. *Também permitido se o usuário estiver no grupo ou consultando personId próprio |
| GET | `/my` | JWT | — | Obter membros de grupo do usuário atual |
| GET | `/basic/:groupId` | JWT | — | Obter lista de membros básica para um grupo |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Obter líderes do grupo (público) |
| GET | `/public/:churchId/:groupId` | Public | — | Obter a lista pública de um grupo (campos mínimos: `personId`, `displayName`, `leader`, foto). Apenas quando o grupo escolhe via `publicRoster`; alimenta o elemento `staffGrid` do construtor de sites |
| POST | `/` | JWT | GroupMembers.Edit | Adicionar ou atualizar membros do grupo |
| DELETE | `/:id` | JWT | GroupMembers.View | Remover um membro do grupo |

## Famílias

Caminho base: `/membership/households`

Controlador CRUD padrão.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Listar todas as famílias |
| GET | `/:id` | JWT | — | Obter família por ID |
| POST | `/` | JWT | People.Edit | Criar ou atualizar famílias |
| DELETE | `/:id` | JWT | People.Edit | Deletar uma família |

## Funções

Caminho base: `/membership/roles`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | Roles.View | Obter função por ID |
| GET | `/church/:churchId` | JWT | Roles.View | Obter todas as funções de uma igreja |
| POST | `/` | JWT | Roles.Edit | Criar ou atualizar funções |
| DELETE | `/:id` | JWT | Roles.Edit | Deletar uma função (também remove suas permissões e membros) |

## Membros da Função

Caminho base: `/membership/rolemembers`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/roles/:id` | JWT | Roles.View | Obter membros de uma função. Adicionar `?include=users` para incluir detalhes de usuários |
| POST | `/` | JWT | Roles.Edit | Adicionar membros a uma função (cria usuário se email não existir) |
| DELETE | `/:id` | JWT | Roles.View | Remover um membro da função |
| DELETE | `/self/:churchId/:userId` | JWT | — | Remover a si mesmo de uma igreja |

## Permissões da Função

Caminho base: `/membership/rolepermissions`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/roles/:id` | JWT | Roles.View | Obter permissões de uma função (use `null` como ID para a função "Todos") |
| POST | `/` | JWT | Roles.Edit | Criar ou atualizar permissões da função |
| DELETE | `/:id` | JWT | Roles.Edit | Deletar uma permissão da função |

## Permissões

Caminho base: `/membership/permissions`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Obter a lista completa de permissões disponíveis |

## Formulários

Caminho base: `/membership/forms`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Listar todos os formulários (admin vê todos; editores veem atribuídos + formulários para não membros) |
| GET | `/:id` | JWT | Acesso ao formulário | Obter um formulário por ID |
| GET | `/archived` | JWT | Forms.Admin ou Forms.Edit | Listar formulários arquivados |
| GET | `/standalone/:id?churchId=` | JWT | — | Obter um formulário autônomo (formulários restritos requerem autenticação) |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Criar ou atualizar formulários |
| DELETE | `/:id` | JWT | Acesso ao formulário | Deletar um formulário |

## Envios de Formulário

Caminho base: `/membership/formsubmissions`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Listar envios. Filtrar por `?personId=` ou `?formId=` |
| GET | `/:id` | JWT | Forms.Admin ou Forms.Edit | Obter envio por ID. Adicionar `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Acesso ao formulário | Obter todos os envios para um formulário (inclui formulário, perguntas, respostas) |
| POST | `/` | JWT | — | Enviar respostas de formulário (lida com formulários restritos/irrestritivos, envia notificações por email). Quando o formulário tem `autoCreatePerson`, encontra-ou-cria uma pessoa Guest por email e vincula o envio; quando `followUpSubject`/`followUpBody` estão definidos, envia um email de acompanhamento modelado para o enviador |
| DELETE | `/:id` | JWT | Forms.Admin ou Forms.Edit | Deletar um envio e suas respostas |

## Perguntas

Caminho base: `/membership/questions`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Acesso ao formulário | Listar perguntas de um formulário. Requer `?formId=` |
| GET | `/:id` | JWT | Acesso ao formulário | Obter uma pergunta por ID |
| GET | `/unrestricted?formId=` | JWT | — | Obter perguntas de um formulário irrestritivo |
| GET | `/sort/:id/up` | JWT | — | Mover uma pergunta para cima na ordem de classificação |
| GET | `/sort/:id/down` | JWT | — | Mover uma pergunta para baixo na ordem de classificação |
| POST | `/` | JWT | Acesso ao formulário | Criar ou atualizar perguntas (atribui automaticamente ordem de classificação) |
| DELETE | `/:id?formId=` | JWT | Acesso ao formulário | Deletar uma pergunta |

## Respostas

Caminho base: `/membership/answers`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Listar respostas. Filtrar por `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Criar ou atualizar respostas |

## Permissões de Membro

Caminho base: `/membership/memberpermissions`

Controla acesso por membro a formulários específicos.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | Acesso ao formulário | Obter uma permissão de membro por ID |
| GET | `/member/:id` | JWT | Acesso ao formulário | Obter todas as permissões de formulário para um membro |
| GET | `/form/:id` | JWT | Acesso ao formulário | Obter todas as permissões de membro para um formulário |
| GET | `/form/:id/my` | JWT | Acesso ao formulário | Obter permissão do usuário atual para um formulário |
| POST | `/` | JWT | Acesso ao formulário | Criar ou atualizar permissões de membro |
| DELETE | `/:id?formId=` | JWT | Acesso ao formulário | Deletar uma permissão de membro |
| DELETE | `/member/:id?formId=` | JWT | Acesso ao formulário | Deletar todas as permissões de um membro em um formulário |

## Configurações

Caminho base: `/membership/settings`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Settings.Edit | Obter todas as configurações da igreja |
| GET | `/public/:churchId` | Public | — | Obter configurações públicas para uma igreja |
| POST | `/` | JWT | Settings.Edit | Salvar configurações (suporta upload de imagem em base64) |

## Domínios

Caminho base: `/membership/domains`

Estende CRUD padrão (GET `/:id`, GET `/`, DELETE `/:id` da classe base).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os domínios |
| GET | `/:id` | JWT | — | Obter domínio por ID |
| GET | `/lookup/:domainName` | JWT | — | Procurar um domínio por nome |
| GET | `/public/lookup/:domainName` | Public | — | Busca de domínio público por nome |
| GET | `/health/check` | Public | — | Executar verificação de saúde em domínios não verificados |
| POST | `/` | JWT | Settings.Edit | Criar ou atualizar domínios (dispara atualização Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Deletar um domínio |

## Igreja do Usuário

Caminho base: `/membership/userchurch`

Gerencia a associação entre usuários e igrejas.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/userid/:userId` | JWT | — | Obter registro de usuário-igreja por ID de usuário |
| GET | `/personid/:personId` | JWT | — | Obter email para um usuário vinculado de uma pessoa |
| GET | `/user/:userId` | JWT | Server.Admin | Carregar todas as igrejas de um usuário |
| POST | `/` | JWT | — | Criar uma associação de usuário-igreja |
| PATCH | `/:userId` | JWT | — | Atualizar hora do último acesso e registrar acesso |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Deletar um registro de usuário-igreja |

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
| POST | `/members` | JWT | — | Busca de membro em linguagem natural usando IA. Corpo: `{ text, subDomain, siteUrl }` |

## Erros do Cliente

Caminho base: `/membership/clientErrors`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| POST | `/` | JWT | — | Registrar um erro do lado do cliente |

## Páginas Relacionadas

- [Autenticação e Permissões](./authentication) — Fluxo de login, JWT, OAuth, modelo de permissões
- [Endpoints de Presença](./attendance) -- Rastreamento de serviço e visita
- [Estrutura de Módulo](../module-structure) -- Padrões de organização de código
