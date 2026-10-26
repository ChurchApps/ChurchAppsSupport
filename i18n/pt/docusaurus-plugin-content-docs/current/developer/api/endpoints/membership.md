---
title: "Endpoints de Membresia"
---

# Endpoints de Membresia

<div class="article-intro">

O módulo Membership gerencia pessoas, igrejas, grupos, domicílios, funções, permissões, formulários e configurações. É o maior módulo e fornece a camada central de identidade e autorização para todos os outros módulos.

</div>

**Caminho base:** `/membership`

## Pessoas

Caminho base: `/membership/people`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | People.View ou Member | Listar todas as pessoas da igreja |
| GET | `/:id` | JWT | People.View ou registro próprio | Obter uma pessoa pelo ID (inclui respostas de formulários) |
| GET | `/ids?ids=` | JWT | People.View, Member ou People.ViewNames | Obter várias pessoas por IDs separados por vírgula. Chamadores com People.ViewNames, mas sem People.View, recebem o modelo básico, sem as pessoas que optaram por não aparecer (exceto o próprio chamador) |
| GET | `/basic?ids=` | JWT | — | Obter informações básicas (somente nome) de várias pessoas |
| GET | `/names?ids=` | JWT | Qualquer permissão da igreja | `[{ id, name: { display, first, last }, photo }]`, ordenado por sobrenome e depois por primeiro nome, para IDs separados por vírgula que o chamador já possui, para que funções sem People.View (doações, presença) possam identificar pessoas. Sem busca, sem filtro de diretório |
| POST | `/names` | JWT | Qualquer permissão da igreja | Igual a `GET /names`. Corpo: `{ peopleIds }` (ou `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member ou People.ViewNames | Pessoas adicionadas recentemente. Chamadores com People.ViewNames, mas sem People.View (mesmo membros com acesso ao diretório), recebem o modelo básico (`id`, `name.display`, `photo`, `membershipStatus`), sem as pessoas que optaram por não aparecer |
| GET | `/guest-register/options?churchId=` | Público | — | Lista de verificação do cadastro de visitantes por QR: retorna `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, cada um com `"off"`, `"optional"` ou `"required"` (lido da configuração pública `guestRegistrationFields`; valores ausentes ou malformados usam o padrão: e-mail e telefone opcionais, o restante desativado). Exige `enableQRGuestRegistration`, a menos que a requisição traga um token correspondente de site/igreja; limitado por taxa (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member ou People.ViewNames | Pesquisar pessoas por nome ou e-mail (até 100, ordenadas por sobrenome e depois por primeiro nome). Chamadores com People.ViewNames, mas sem People.View (mesmo membros com acesso ao diretório), recebem uma pesquisa por nome que retorna o modelo básico; uma pesquisa por `email` retorna `[]` |
| GET | `/search/phone?number=` | JWT | People.View ou Member | Pesquisar por número de telefone |
| GET | `/search/group?groupId=` | JWT | People.View ou Member | Obter as pessoas de um grupo específico |
| GET | `/household/:householdId` | JWT | — | Obter todas as pessoas de um domicílio |
| GET | `/attendance` | JWT | People.Edit | Carregar participantes com filtros (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Carregar dados da linha do tempo de pessoas e grupos |
| GET | `/directory/:id` | JWT | — | Obter a pessoa para a visualização do diretório (respeita as preferências de visibilidade) |
| GET | `/claim/:churchId` | JWT | — | Vincular um registro de pessoa ao usuário atual em uma igreja |
| POST | `/` | JWT | People.Edit ou EditSelf | Criar ou atualizar pessoas (em lote) |
| POST | `/search` | JWT | People.View, Member ou People.ViewNames | Pesquisar pessoas (variante POST). Corpo: `{ term }` ou `{ email }`; mesmas regras de somente nomes de `GET /search` |
| POST | `/advancedSearch` | JWT | People.View ou Member | Pesquisa com múltiplas condições (idade, birthMonth, membershipStatus etc.). O corpo é um array de condições; um corpo vazio significa nenhuma condição, e qualquer outro corpo que não seja um array retorna 400 |
| POST | `/loadOrCreate` | Público | — | Localizar ou criar uma pessoa pelo e-mail. Corpo: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Público | — | Cadastro de visitantes por QR. Corpo: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (de 1 a 10 membros; email, phone e maritalStatus se aplicam somente ao primeiro membro). Campos desativados pela igreja são descartados; campos obrigatórios ausentes ou valores inválidos retornam 400. Cria um novo domicílio (com o sobrenome do primeiro membro) com todos os membros como `membershipStatus: "Visitor"`, compartilha `address` entre todos os membros, salva `comments` como uma nota no responsável pelo domicílio, adiciona todos ao grupo privado `guestRegistrationGroupId`, se definido, e, quando `guestRegistrationRecordAttendance` for `"true"`, registra a presença nos horários de culto programados desse grupo cuja janela de check-in esteja aberta neste momento. Retorna `{ householdId, people: [{ id, name }] }`. Mesmas regras de opt-in/token e de limite de taxa da chamada de opções |
| POST | `/household/:householdId` | JWT | People.Edit | Atualizar as atribuições de membros do domicílio |
| POST | `/public/email` | Público | — | Enviar um e-mail para uma pessoa. Corpo: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interno | — | Carregar e-mails de pessoas por IDs (servidor para servidor, requer jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Excluir uma pessoa |

### Exemplo: pesquisar pessoas

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

### Exemplo: criar uma pessoa

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Usuários

Caminho base: `/membership/users`

Consulte [Autenticação e Permissões](./authentication) para os endpoints de login, cadastro e gerenciamento de senha.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| POST | `/login` | Público | — | Fazer login (e-mail/senha, renovação de JWT ou authGuid) |
| POST | `/register` | Público | — | Cadastrar um novo usuário |
| POST | `/forgot` | Público | — | Enviar e-mail de redefinição de senha |
| POST | `/setPasswordGuid` | Público | — | Definir a senha usando o GUID de autenticação do link do e-mail |
| POST | `/verifyCredentials` | Público | — | Verificar e-mail/senha e retornar as igrejas associadas |
| POST | `/loadOrCreate` | JWT | — | Localizar ou criar um usuário pelo e-mail/userId |
| POST | `/setDisplayName` | JWT | — | Atualizar o nome e o sobrenome do usuário |
| POST | `/updateEmail` | JWT | — | Alterar o endereço de e-mail do usuário |
| POST | `/updatePassword` | JWT | — | Alterar a senha do usuário (mínimo de 6 caracteres) |
| POST | `/updateOptedOut` | JWT | — | Definir o status de descadastro de uma pessoa |
| POST | `/sendInviteEmail` | JWT | People.Edit | Enviar por e-mail um convite a uma pessoa desta igreja (`email`, `personName`, `contextName`). O botão mostra **Cadastre-se** para quem não tem conta e **Entrar** para um usuário existente. Um usuário que nunca fez login recebe, em vez disso, um link **Definir sua senha** que expira em 7 dias. É um modelo fixo, portanto não conta para o limite diário de e-mails da igreja |
| GET | `/search?term=` | JWT | Server.Admin | Pesquisar todos os usuários por nome/e-mail |
| DELETE | `/` | JWT | — | Excluir a conta do usuário atual |

## Igrejas

Caminho base: `/membership/churches`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Carregar todas as igrejas do usuário atual |
| GET | `/:id` | JWT | — | Obter igreja pelo ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obter o usuário administrador de domínio de uma igreja |
| GET | `/:id/impersonate` | JWT | Server.Admin | Personificar uma igreja (somente administradores do servidor) |
| GET | `/all?term=` | JWT | Server.Admin | Pesquisar todas as igrejas (administrador) |
| GET | `/search/?name=` | Público | — | Pesquisar igrejas pelo nome |
| GET | `/lookup/?subDomain=&id=` | Público | — | Localizar uma igreja pelo subdomínio ou ID |
| POST | `/` | JWT | Settings.Edit | Atualizar os dados da igreja |
| POST | `/add` | JWT | — | Cadastrar uma nova igreja. Campos obrigatórios: name, address1, city, state, zip, country |
| POST | `/search` | Público | — | Pesquisar igrejas pelo nome (variante POST) |
| POST | `/select` | JWT | — | Selecionar ou alternar para uma igreja. Corpo: `{ churchId }` ou `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Arquivar ou desarquivar uma igreja |
| POST | `/byIds` | Público | — | Carregar várias igrejas pelos IDs |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Excluir igrejas abandonadas há 7 dias ou mais |

## Grupos

Caminho base: `/membership/groups`

Estende o CRUD padrão (GET `/`, GET `/:id` da classe base).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os grupos |
| GET | `/:id` | JWT | — | Obter grupo pelo ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Pesquisar grupos por filtros de culto |
| GET | `/my` | JWT | — | Obter os grupos do usuário atual |
| GET | `/my/:tag` | JWT | — | Obter os grupos do usuário atual filtrados por tag |
| GET | `/tag/:tag` | JWT | — | Obter todos os grupos com uma tag específica |
| GET | `/public/:churchId/:id` | Público | — | Obter um grupo público pela igreja e pelo ID |
| GET | `/public/:churchId/tag/:tag` | Público | — | Obter grupos públicos pela tag |
| GET | `/public/:churchId/label?label=` | Público | — | Obter grupos públicos pelo rótulo |
| GET | `/public/:churchId/slug/:slug` | Público | — | Obter um grupo público pelo slug |
| POST | `/` | JWT | Groups.Edit | Criar ou atualizar grupos (gera o slug automaticamente) |
| DELETE | `/:id` | JWT | Groups.Edit | Excluir um grupo (também exclui as equipes filhas de grupos de ministério) |

## Membros de grupos

Caminho base: `/membership/groupmembers`

Estende o CRUD padrão (GET `/:id`, DELETE `/:id` da classe base).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | GroupMembers.View | Obter membro do grupo pelo ID |
| GET | `/` | JWT | GroupMembers.View* | Listar membros do grupo. Filtre por `?groupId=`, `?groupIds=` ou `?personId=`. *Também permitido se o usuário estiver no grupo ou consultar o próprio personId, e para `?groupId=` de qualquer grupo não confidencial quando o usuário tiver Attendance.View ou Attendance.Edit (membros com menos de 13 anos são incluídos para eles) |
| GET | `/my` | JWT | — | Obter as participações em grupos do usuário atual |
| GET | `/basic/:groupId` | JWT | — | Obter a lista básica de membros de um grupo |
| GET | `/public/leaders/:churchId/:groupId` | Público | — | Obter os líderes do grupo (público) |
| GET | `/public/:churchId/:groupId` | Público | — | Obter a lista pública de um grupo (campos mínimos: `personId`, `displayName`, `leader`, foto). Disponível somente quando o grupo opta por `publicRoster`; alimenta o elemento `staffGrid` do construtor de sites |
| POST | `/` | JWT | GroupMembers.Edit | Adicionar ou atualizar membros do grupo |
| DELETE | `/:id` | JWT | GroupMembers.View | Remover um membro do grupo |

## Domicílios

Caminho base: `/membership/households`

Controlador CRUD padrão.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os domicílios |
| GET | `/:id` | JWT | — | Obter domicílio pelo ID |
| POST | `/` | JWT | People.Edit | Criar ou atualizar domicílios |
| DELETE | `/:id` | JWT | People.Edit | Excluir um domicílio |

## Funções

Caminho base: `/membership/roles`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | Roles.View | Obter função pelo ID |
| GET | `/church/:churchId` | JWT | Roles.View | Obter todas as funções de uma igreja. Cada função inclui `memberCount`, o número de usuários distintos nela |
| POST | `/` | JWT | Roles.Edit | Criar ou atualizar funções |
| DELETE | `/:id` | JWT | Roles.Edit | Excluir uma função (também remove suas permissões e membros) |

## Membros de funções

Caminho base: `/membership/rolemembers`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/roles/:id` | JWT | Roles.View | Obter os membros de uma função. Adicione `?include=users` para incluir os detalhes dos usuários |
| POST | `/` | JWT | Roles.Edit | Adicionar membros a uma função (cria o usuário se o e-mail não existir) |
| DELETE | `/:id` | JWT | Roles.View | Remover um membro da função |
| DELETE | `/self/:churchId/:userId` | JWT | — | Remover a si mesmo de uma igreja |

## Permissões de funções

Caminho base: `/membership/rolepermissions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/roles/:id` | JWT | Roles.View | Obter as permissões de uma função (use `null` como ID para a função "Everyone") |
| POST | `/` | JWT | Roles.Edit | Criar ou atualizar permissões de funções |
| DELETE | `/:id` | JWT | Roles.Edit | Excluir uma permissão de função |

## Permissões

Caminho base: `/membership/permissions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Obter a lista completa de permissões disponíveis |

Cada item tem `apiName`, `section` (tipo de conteúdo), `action` e os rótulos `displaySection` / `displayAction` que o editor de funções do B1Admin exibe. Adições recentes: `MembershipApi` / `People` / `View Names` (**Ver somente nomes de pessoas**, em Pessoas e Grupos) e `GivingApi` / `Donations` / `Enter` (**Informar doações**, em Doações; consulte [Lotes de doações](./giving.md#donation-batches)).

## Formulários

Caminho base: `/membership/forms`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Listar todos os formulários (administradores veem todos; editores veem os atribuídos e os formulários de não membros) |
| GET | `/:id` | JWT | Acesso ao formulário | Obter um formulário pelo ID |
| GET | `/archived` | JWT | Forms.Admin ou Forms.Edit | Listar formulários arquivados |
| GET | `/group/:groupId` | JWT | Membro do grupo, líder do grupo ou Forms.Admin | Formulários independentes vinculados ao grupo (`forms.groupId`), excluindo os arquivados, ordenados por nome. Retorna `id`, `name`, `description` e `open` (dentro da janela de disponibilidade). Membros recebem apenas formulários abertos; líderes e administradores de formulários também recebem os fechados. Alimenta os formulários vinculados na página do grupo |
| GET | `/standalone/:id?churchId=` | JWT | — | Obter um formulário independente (formulários restritos exigem autenticação) |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Criar ou atualizar formulários. Formulários independentes aceitam um `photoUrl` opcional (foto de cabeçalho exibida acima do formulário) e um `groupId` (grupo vinculado) |
| DELETE | `/:id` | JWT | Acesso ao formulário | Excluir um formulário |

## Envios de formulários

Caminho base: `/membership/formsubmissions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Listar envios. Filtre por `?personId=` ou `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Escopo do próprio usuário: até 50 envios de formulários independentes (não formulários de pessoa) feitos pelo membro autenticado ou vinculados à sua pessoa (`contentType` `person`, `contentId` = o ID da sua pessoa -- por exemplo, após a alteração de uma pessoa por um administrador), do mais recente para o mais antigo, cada um com `form.name`. `include` anexa as perguntas de cada formulário e as respostas do envio. Retorna `401` se o usuário não estiver vinculado a uma pessoa. Alimenta a seção **Meus formulários** da página B1 Me |
| GET | `/group/:groupId` | JWT | Líder do grupo | Respostas para os líderes do grupo: uma entrada por formulário vinculado e por evento do grupo com formulário de inscrição, cada uma com `form`, `event` (`id`, `title`, `start`; somente nas entradas de evento), `questions` e `submissions` (com `answers` e `personName`, `null` quando anônimo) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit ou acesso de visualização | Obter envio pelo ID. Adicione `?include=form,questions,answers`. Líderes do grupo vinculado ao formulário e líderes do grupo ao qual uma inscrição em evento pertence também podem lê-lo |
| GET | `/formId/:formId` | JWT | Acesso ao formulário (visualização) | Obter todos os envios de um formulário (inclui formulário, perguntas e respostas). Líderes do grupo vinculado ao formulário têm acesso de visualização |
| POST | `/` | JWT | — | Enviar respostas de formulário (trata formulários restritos e não restritos, e envia notificações por e-mail). Quando o formulário tem `autoCreatePerson`, localiza ou cria uma pessoa Guest pelo e-mail e vincula o envio; quando o formulário também tem `groupId`, adiciona essa pessoa ao grupo; quando `followUpSubject`/`followUpBody` estão definidos, envia ao remetente um e-mail de acompanhamento com modelo. A menos que quem chama possa gerenciar o formulário, `submittedBy` é sempre definido como a pessoa do membro autenticado (ou fica vazio em envios anônimos) |
| DELETE | `/:id` | JWT | Forms.Admin ou Forms.Edit | Excluir um envio e suas respostas |

## Perguntas

Caminho base: `/membership/questions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
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
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Listar respostas. Filtre por `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Criar ou atualizar respostas |

## Permissões de membros

Caminho base: `/membership/memberpermissions`

Controla o acesso individual de cada membro a formulários específicos.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | Acesso ao formulário | Obter uma permissão de membro pelo ID |
| GET | `/member/:id` | JWT | Acesso ao formulário | Obter todas as permissões de formulário de um membro |
| GET | `/form/:id` | JWT | Acesso ao formulário | Obter todas as permissões de membros de um formulário |
| GET | `/form/:id/my` | JWT | Acesso ao formulário | Obter a permissão do usuário atual para um formulário |
| POST | `/` | JWT | Acesso ao formulário | Criar ou atualizar permissões de membros |
| DELETE | `/:id?formId=` | JWT | Acesso ao formulário | Excluir uma permissão de membro |
| DELETE | `/member/:id?formId=` | JWT | Acesso ao formulário | Excluir todas as permissões de um membro em um formulário |

## Configurações

Caminho base: `/membership/settings`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Settings.Edit | Obter todas as configurações da igreja |
| GET | `/public/:churchId` | Público | — | Obter as configurações públicas de uma igreja |
| POST | `/` | JWT | Settings.Edit | Salvar configurações (aceita upload de imagem em base64) |

## Domínios

Caminho base: `/membership/domains`

Estende o CRUD padrão (GET `/:id`, GET `/`, DELETE `/:id` da classe base).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os domínios |
| GET | `/:id` | JWT | — | Obter domínio pelo ID |
| GET | `/lookup/:domainName` | JWT | — | Localizar um domínio pelo nome |
| GET | `/public/lookup/:domainName` | Público | — | Consulta pública de domínio pelo nome |
| GET | `/health/check` | Público | — | Executar verificação de integridade nos domínios não verificados |
| POST | `/` | JWT | Settings.Edit | Criar ou atualizar domínios (aciona a atualização do Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Excluir um domínio |

## Usuário e igreja

Caminho base: `/membership/userchurch`

Gerencia a associação entre usuários e igrejas.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/userid/:userId` | JWT | — | Obter o registro usuário-igreja pelo ID do usuário |
| GET | `/personid/:personId` | JWT | — | Obter o e-mail do usuário vinculado a uma pessoa |
| GET | `/user/:userId` | JWT | Server.Admin | Carregar todas as igrejas de um usuário |
| POST | `/` | JWT | — | Criar uma associação usuário-igreja |
| PATCH | `/:userId` | JWT | — | Atualizar a data do último acesso e registrar o acesso |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Excluir um registro usuário-igreja |

## Preferências de visibilidade

Caminho base: `/membership/visibilityPreferences`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/my` | JWT | — | Obter as preferências de visibilidade do usuário atual |
| POST | `/` | JWT | — | Salvar preferências de visibilidade (visibilidade de endereço, telefone e e-mail) |

## Consulta

Caminho base: `/membership/query`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| POST | `/members` | JWT | — | Pesquisa de membros em linguagem natural usando IA. Corpo: `{ text, subDomain, siteUrl }` |

## Erros do cliente

Caminho base: `/membership/clientErrors`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| POST | `/` | JWT | — | Registrar um erro do lado do cliente |

## Páginas relacionadas

- [Autenticação e Permissões](./authentication) — Fluxo de login, JWT, OAuth, modelo de permissões
- [Endpoints de Presença](./attendance) — Rastreamento de cultos e visitas
- [Estrutura do módulo](../module-structure) — Padrões de organização do código
