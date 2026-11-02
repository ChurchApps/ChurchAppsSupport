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
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | People.View ou Member | Lista todas as pessoas da igreja |
| GET | `/:id` | JWT | People.View ou o próprio registro | Obtém uma pessoa pelo ID (inclui envios de formulários) |
| GET | `/ids?ids=` | JWT | People.View, Member ou People.ViewNames | Obtém várias pessoas por IDs separados por vírgula. Quem chama com People.ViewNames sem People.View recebe o modelo básico, deixando de fora as pessoas que cancelaram a exibição (exceto quem chama) |
| GET | `/basic?ids=` | JWT | — | Obtém informações básicas (somente o nome) de várias pessoas |
| GET | `/names?ids=` | JWT | Qualquer permissão da igreja | `[{ id, name: { display, first, last }, photo }]`, ordenado por sobrenome e depois nome, para IDs separados por vírgula que quem chama já possui, para que funções sem People.View (doações, presença) possam identificar pessoas. Sem busca, sem filtro de diretório |
| POST | `/names` | JWT | Qualquer permissão da igreja | Igual a `GET /names`. Corpo: `{ peopleIds }` (ou `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member ou People.ViewNames | Pessoas adicionadas recentemente. Quem chama com People.ViewNames sem People.View (mesmo membros com acesso ao diretório) recebe o modelo básico (`id`, `name.display`, `photo`, `membershipStatus`), deixando de fora as pessoas que cancelaram a exibição |
| GET | `/guest-register/options?churchId=` | Pública | — | Lista de verificação do cadastro de visitantes por QR: retorna `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, cada um com `"off"`, `"optional"` ou `"required"` (lido da configuração pública `guestRegistrationFields`; valores ausentes ou malformados caem para e-mail/telefone opcionais e o restante desativado). Exige `enableQRGuestRegistration`, a menos que a requisição traga um token de site/igreja correspondente; com limite de taxa (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member ou People.ViewNames | Busca pessoas por nome ou e-mail (até 100, ordenado por sobrenome e depois nome). Quem chama com People.ViewNames sem People.View (mesmo membros com acesso ao diretório) recebe uma busca por nome que retorna o modelo básico; uma busca por `email` retorna `[]` |
| GET | `/search/phone?number=` | JWT | People.View ou Member | Busca por número de telefone |
| GET | `/search/group?groupId=` | JWT | People.View ou Member | Obtém as pessoas de um grupo específico |
| GET | `/household/:householdId` | JWT | — | Obtém todas as pessoas de um domicílio |
| GET | `/attendance` | JWT | People.Edit | Carrega os participantes com filtros (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Carrega os dados de linha do tempo de pessoas e grupos |
| GET | `/directory/:id` | JWT | — | Obtém a pessoa para a visão de diretório (respeita as preferências de visibilidade) |
| GET | `/claim/:churchId` | JWT | — | Reivindica um registro de pessoa para o usuário atual em uma igreja |
| POST | `/` | JWT | People.Edit ou EditSelf | Cria ou atualiza pessoas (em lote) |
| POST | `/search` | JWT | People.View, Member ou People.ViewNames | Busca pessoas (variante POST). Corpo: `{ term }` ou `{ email }`; mesmas regras de nomes apenas de `GET /search` |
| POST | `/advancedSearch` | JWT | People.View ou Member | Busca com múltiplas condições (idade, birthMonth, membershipStatus etc.). O corpo é uma lista de condições; um corpo vazio significa nenhuma condição, e qualquer outro corpo que não seja uma lista retorna 400 |
| POST | `/loadOrCreate` | Pública | — | Encontra ou cria uma pessoa pelo e-mail. Corpo: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Pública | — | Cadastro de visitantes por QR. Corpo: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (de 1 a 10 membros; email/phone/maritalStatus se aplicam somente ao primeiro membro). Campos que a igreja desativou são descartados; campos obrigatórios ausentes ou valores inválidos retornam 400. Primeiro reutiliza pessoas existentes: um membro corresponde quando exatamente uma pessoa não removida tem o mesmo primeiro nome (sem diferenciar maiúsculas) e o mesmo e-mail ou os mesmos dígitos de telefone (residencial, comercial ou celular); um membro sem e-mail ou telefone corresponde pelo primeiro nome dentro do domicílio correspondido. Pessoas correspondidas nunca são editadas. Membros não correspondidos entram no domicílio correspondido ou, caso contrário, em um novo domicílio (com o sobrenome do primeiro membro), como `membershipStatus: "Visitor"` com o `address` compartilhado. Salva `comments` como uma nota no primeiro membro, adiciona todos ao grupo privado `guestRegistrationGroupId`, se definido, e — quando `guestRegistrationRecordAttendance` é `"true"` — registra a presença nos horários de culto agendados desse grupo cuja janela de check-in esteja aberta agora. Retorna `{ householdId, people: [{ id, name }] }`, repetindo os nomes enviados em vez dos armazenados. Mesmas regras de consentimento/token e de limite de taxa da chamada de opções |
| POST | `/household/:householdId` | JWT | People.Edit | Atualiza as atribuições de membros do domicílio |
| POST | `/public/email` | Pública | — | Envia um e-mail a uma pessoa. Corpo: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interna | — | Carrega os e-mails de pessoas por IDs (servidor a servidor, exige jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Exclui uma pessoa |

### Exemplo: buscar pessoas

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

## Usuários {#users}

Caminho base: `/membership/users`

Consulte [Autenticação e permissões](./authentication) para os endpoints de login, registro e gerenciamento de senhas.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| POST | `/login` | Pública | — | Faz login (e-mail/senha, renovação de JWT ou authGuid) |
| POST | `/register` | Pública | — | Registra um novo usuário |
| POST | `/forgot` | Pública | — | Envia e-mail de redefinição de senha |
| POST | `/setPasswordGuid` | Pública | — | Define a senha usando o GUID de autenticação do link do e-mail |
| POST | `/verifyCredentials` | Pública | — | Verifica e-mail/senha e retorna as igrejas associadas |
| POST | `/loadOrCreate` | JWT | — | Encontra ou cria um usuário pelo e-mail/userId |
| POST | `/setDisplayName` | JWT | — | Atualiza o nome e o sobrenome do usuário |
| POST | `/updateEmail` | JWT | — | Altera o endereço de e-mail do usuário |
| POST | `/updatePassword` | JWT | — | Altera a senha do usuário (mínimo de 6 caracteres) |
| POST | `/updateOptedOut` | JWT | — | Define a situação de cancelamento de exibição de uma pessoa |
| POST | `/sendInviteEmail` | JWT | People.Edit | Envia por e-mail um convite a uma pessoa desta igreja (`email`, `personName`, `contextName`). O botão mostra **Cadastrar-se** para quem não tem conta e **Entrar** para um usuário existente. Um usuário que nunca entrou recebe, em vez disso, um link **Definir sua senha** que expira em 7 dias. Modelo fixo, então não conta no limite diário de e-mails da igreja |
| GET | `/search?term=` | JWT | Server.Admin | Busca todos os usuários por nome/e-mail |
| DELETE | `/` | JWT | — | Exclui a conta do usuário atual |

## Igrejas

Caminho base: `/membership/churches`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Carrega todas as igrejas do usuário atual |
| GET | `/:id` | JWT | — | Obtém uma igreja pelo ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obtém o usuário administrador de domínio de uma igreja |
| GET | `/:id/impersonate` | JWT | Server.Admin | Assume a identidade de uma igreja (somente administrador do servidor) |
| GET | `/all?term=` | JWT | Server.Admin | Busca todas as igrejas (administrador) |
| GET | `/search/?name=` | Pública | — | Busca igrejas pelo nome |
| GET | `/lookup/?subDomain=&id=` | Pública | — | Localiza uma igreja pelo subdomínio ou ID |
| POST | `/` | JWT | Settings.Edit | Atualiza os dados da igreja |
| POST | `/add` | JWT | — | Registra uma nova igreja. Campos obrigatórios: name, address1, city, state, zip, country |
| POST | `/search` | Pública | — | Busca igrejas pelo nome (variante POST) |
| POST | `/select` | JWT | — | Seleciona/troca para uma igreja. Corpo: `{ churchId }` ou `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Arquiva ou desarquiva uma igreja |
| POST | `/byIds` | Pública | — | Carrega várias igrejas pelos IDs |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Exclui igrejas abandonadas há 7 dias ou mais |

## Grupos

Caminho base: `/membership/groups`

Estende o CRUD padrão (GET `/`, GET `/:id` da classe base).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Lista todos os grupos |
| GET | `/:id` | JWT | — | Obtém um grupo pelo ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Busca grupos por filtros de culto |
| GET | `/my` | JWT | — | Obtém os grupos do usuário atual |
| GET | `/my/:tag` | JWT | — | Obtém os grupos do usuário atual filtrados por tag |
| GET | `/tag/:tag` | JWT | — | Obtém todos os grupos com uma tag específica |
| GET | `/public/:churchId/:id` | Pública | — | Obtém um grupo público pela igreja e pelo ID |
| GET | `/public/:churchId/tag/:tag` | Pública | — | Obtém grupos públicos por tag |
| GET | `/public/:churchId/label?label=` | Pública | — | Obtém grupos públicos por etiqueta |
| GET | `/public/:churchId/slug/:slug` | Pública | — | Obtém um grupo público pelo slug |
| POST | `/` | JWT | Groups.Edit | Cria ou atualiza grupos (gera o slug automaticamente) |
| DELETE | `/:id` | JWT | Groups.Edit | Exclui um grupo (também exclui as equipes filhas de grupos de ministério) |

## Membros de grupos

Caminho base: `/membership/groupmembers`

Estende o CRUD padrão (GET `/:id`, DELETE `/:id` da classe base).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | GroupMembers.View | Obtém um membro de grupo pelo ID |
| GET | `/` | JWT | GroupMembers.View* | Lista os membros de grupos. Filtre por `?groupId=`, `?groupIds=` ou `?personId=`. *Também permitido se o usuário estiver no grupo ou consultar o próprio personId, e para `?groupId=` de qualquer grupo não confidencial quando o usuário tem Attendance.View ou Attendance.Edit (membros com menos de 13 anos são incluídos para eles) |
| GET | `/my` | JWT | — | Obtém as participações em grupos do usuário atual |
| GET | `/basic/:groupId` | JWT | — | Obtém a lista básica de membros de um grupo |
| GET | `/public/leaders/:churchId/:groupId` | Pública | — | Obtém os líderes de um grupo (público) |
| GET | `/public/:churchId/:groupId` | Pública | — | Obtém a lista pública de um grupo (campos mínimos: `personId`, `displayName`, `leader`, foto). Somente quando o grupo aceita via `publicRoster`; alimenta o elemento `staffGrid` do criador de sites |
| POST | `/` | JWT | GroupMembers.Edit | Adiciona ou atualiza membros de grupos |
| DELETE | `/:id` | JWT | GroupMembers.View | Remove um membro de grupo |

## Domicílios

Caminho base: `/membership/households`

Controller CRUD padrão.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Lista todos os domicílios |
| GET | `/:id` | JWT | — | Obtém um domicílio pelo ID |
| POST | `/` | JWT | People.Edit | Cria ou atualiza domicílios |
| DELETE | `/:id` | JWT | People.Edit | Exclui um domicílio |

## Funções

Caminho base: `/membership/roles`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | Roles.View | Obtém uma função pelo ID |
| GET | `/church/:churchId` | JWT | Roles.View | Obtém todas as funções de uma igreja. Cada função inclui `memberCount`, o número de usuários distintos nela |
| POST | `/` | JWT | Roles.Edit | Cria ou atualiza funções |
| DELETE | `/:id` | JWT | Roles.Edit | Exclui uma função (também remove suas permissões e membros) |

## Membros de funções

Caminho base: `/membership/rolemembers`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/roles/:id` | JWT | Roles.View | Obtém os membros de uma função. Adicione `?include=users` para incluir os dados dos usuários |
| POST | `/` | JWT | Roles.Edit | Adiciona membros a uma função (cria o usuário se o e-mail não existir) |
| DELETE | `/:id` | JWT | Roles.View | Remove um membro de função |
| DELETE | `/self/:churchId/:userId` | JWT | — | Remove a si mesmo de uma igreja |

## Permissões de funções

Caminho base: `/membership/rolepermissions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/roles/:id` | JWT | Roles.View | Obtém as permissões de uma função (use `null` como ID para a função "Todos") |
| POST | `/` | JWT | Roles.Edit | Cria ou atualiza permissões de funções |
| DELETE | `/:id` | JWT | Roles.Edit | Exclui uma permissão de função |

## Permissões

Caminho base: `/membership/permissions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Obtém a lista completa de permissões disponíveis |

Cada entrada tem `apiName`, `section` (tipo de conteúdo), `action` e os rótulos `displaySection` / `displayAction` que o editor de funções do B1Admin exibe. Adições recentes: `MembershipApi` / `People` / `View Names` (**Ver nomes de pessoas apenas**, em Pessoas e grupos) e `GivingApi` / `Donations` / `Enter` (**Lançar doações**, em Doações; veja [Lotes de doações](./giving.md#donation-batches)).

## Formulários

Caminho base: `/membership/forms`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lista todos os formulários (o administrador vê todos; editores veem os atribuídos + os formulários que não são de membros) |
| GET | `/:id` | JWT | Acesso ao formulário | Obtém um formulário pelo ID |
| GET | `/archived` | JWT | Forms.Admin ou Forms.Edit | Lista os formulários arquivados |
| GET | `/group/:groupId` | JWT | Membro do grupo, líder do grupo ou Forms.Admin | Formulários independentes vinculados ao grupo (`forms.groupId`), excluindo os arquivados, ordenados por nome. Retorna `id`, `name`, `description` e `open` (dentro da janela de disponibilidade). Membros recebem somente formulários abertos; líderes e administradores de formulários também recebem os encerrados. Alimenta os formulários vinculados da página do grupo |
| GET | `/standalone/:id?churchId=` | JWT | — | Obtém um formulário independente (formulários restritos exigem autenticação) |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Cria ou atualiza formulários. Formulários independentes aceitam `photoUrl` opcional (foto de cabeçalho exibida acima do formulário) e `groupId` (grupo vinculado) |
| DELETE | `/:id` | JWT | Acesso ao formulário | Exclui um formulário |

## Envios de formulários

Caminho base: `/membership/formsubmissions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lista os envios. Filtre por `?personId=` ou `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Restrito ao próprio usuário: até 50 envios de formulários independentes (não de formulários de pessoas) enviados pelo membro conectado ou vinculados à sua pessoa (`contentType` `person`, `contentId` = o ID da pessoa — por exemplo, após uma troca de pessoa feita por um administrador), do mais recente para o mais antigo, cada um com `form.name`. `include` anexa as perguntas de cada formulário e as respostas do envio. Retorna `401` se o usuário não estiver vinculado a uma pessoa. Alimenta a seção **Meus formulários** da página Eu do B1 |
| GET | `/group/:groupId` | JWT | Líder do grupo | Respostas para os líderes do grupo: uma entrada por formulário vinculado e por evento do grupo com formulário de inscrição, cada uma com `form`, `event` (`id`, `title`, `start`; somente nas entradas de evento), `questions` e `submissions` (com `answers` e `personName`, `null` quando anônimo) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit ou acesso de visualização | Obtém um envio pelo ID. Adicione `?include=form,questions,answers`. Líderes do grupo vinculado ao formulário e líderes do grupo ao qual uma inscrição de evento pertence também podem lê-lo |
| GET | `/formId/:formId` | JWT | Acesso ao formulário (visualização) | Obtém todos os envios de um formulário (inclui form, questions, answers). Líderes do grupo vinculado ao formulário têm acesso de visualização |
| POST | `/` | JWT | — | Envia as respostas do formulário (trata formulários restritos/não restritos, envia notificações por e-mail). Quando o formulário tem `autoCreatePerson`, encontra ou cria uma pessoa Convidada pelo e-mail e vincula o envio; quando o formulário também tem `groupId`, adiciona essa pessoa ao grupo; quando `followUpSubject`/`followUpBody` estão definidos, envia um e-mail de acompanhamento com modelo para quem enviou. A menos que quem chama possa administrar o formulário, `submittedBy` é sempre definido como a pessoa do membro conectado (ou fica vazio para envios anônimos) |
| DELETE | `/:id` | JWT | Forms.Admin ou Forms.Edit | Exclui um envio e suas respostas |

## Perguntas

Caminho base: `/membership/questions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Acesso ao formulário | Lista as perguntas de um formulário. Exige `?formId=` |
| GET | `/:id` | JWT | Acesso ao formulário | Obtém uma pergunta pelo ID |
| GET | `/unrestricted?formId=` | JWT | — | Obtém as perguntas de um formulário não restrito |
| GET | `/sort/:id/up` | JWT | — | Move uma pergunta para cima na ordem |
| GET | `/sort/:id/down` | JWT | — | Move uma pergunta para baixo na ordem |
| POST | `/` | JWT | Acesso ao formulário | Cria ou atualiza perguntas (atribui a ordem automaticamente) |
| DELETE | `/:id?formId=` | JWT | Acesso ao formulário | Exclui uma pergunta |

## Respostas

Caminho base: `/membership/answers`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lista as respostas. Filtre por `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Cria ou atualiza respostas |

## Permissões de membros

Caminho base: `/membership/memberpermissions`

Controla o acesso por membro a formulários específicos.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | Acesso ao formulário | Obtém uma permissão de membro pelo ID |
| GET | `/member/:id` | JWT | Acesso ao formulário | Obtém todas as permissões de formulário de um membro |
| GET | `/form/:id` | JWT | Acesso ao formulário | Obtém todas as permissões de membros de um formulário |
| GET | `/form/:id/my` | JWT | Acesso ao formulário | Obtém a permissão do usuário atual para um formulário |
| POST | `/` | JWT | Acesso ao formulário | Cria ou atualiza permissões de membros |
| DELETE | `/:id?formId=` | JWT | Acesso ao formulário | Exclui uma permissão de membro |
| DELETE | `/member/:id?formId=` | JWT | Acesso ao formulário | Exclui todas as permissões de um membro em um formulário |

## Configurações

Caminho base: `/membership/settings`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Settings.Edit | Obtém todas as configurações da igreja |
| GET | `/public/:churchId` | Pública | — | Obtém as configurações públicas de uma igreja |
| POST | `/` | JWT | Settings.Edit | Salva configurações (aceita upload de imagem em base64) |

## Domínios

Caminho base: `/membership/domains`

Estende o CRUD padrão (GET `/:id`, GET `/`, DELETE `/:id` da classe base).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Lista todos os domínios |
| GET | `/:id` | JWT | — | Obtém um domínio pelo ID |
| GET | `/lookup/:domainName` | JWT | — | Localiza um domínio pelo nome |
| GET | `/public/lookup/:domainName` | Pública | — | Localização pública de domínio pelo nome |
| GET | `/health/check` | Pública | — | Executa a verificação de integridade dos domínios não verificados |
| POST | `/` | JWT | Settings.Edit | Cria ou atualiza domínios (aciona a atualização do Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Exclui um domínio |

## Userchurch

Caminho base: `/membership/userchurch`

Gerencia a associação entre usuários e igrejas.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/userid/:userId` | JWT | — | Obtém o registro usuário-igreja pelo ID do usuário |
| GET | `/personid/:personId` | JWT | — | Obtém o e-mail do usuário vinculado a uma pessoa |
| GET | `/user/:userId` | JWT | Server.Admin | Carrega todas as igrejas de um usuário |
| POST | `/` | JWT | — | Cria uma associação usuário-igreja |
| PATCH | `/:userId` | JWT | — | Atualiza a data do último acesso e registra o acesso |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Exclui um registro usuário-igreja |

## Preferências de visibilidade

Caminho base: `/membership/visibilityPreferences`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/my` | JWT | — | Obtém as preferências de visibilidade do usuário atual |
| POST | `/` | JWT | — | Salva as preferências de visibilidade (visibilidade de endereço, telefone e e-mail) |

## Consulta

Caminho base: `/membership/query`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| POST | `/members` | JWT | — | Busca de membros em linguagem natural com IA. Corpo: `{ text, subDomain, siteUrl }` |

## Erros do cliente

Caminho base: `/membership/clientErrors`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| POST | `/` | JWT | — | Registra um erro do lado do cliente |

## Páginas relacionadas

- [Autenticação e permissões](./authentication) — Fluxo de login, JWT, OAuth, modelo de permissões
- [Endpoints de Attendance](./attendance) — Rastreamento de cultos e visitas
- [Estrutura do módulo](../module-structure) — Padrões de organização do código
