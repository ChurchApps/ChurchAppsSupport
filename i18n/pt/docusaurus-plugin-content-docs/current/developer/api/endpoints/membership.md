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
| GET | `/:id` | JWT | People.View ou o próprio registro | Obtém uma pessoa pelo ID (inclui respostas de formulários) |
| GET | `/ids?ids=` | JWT | People.View, Member ou People.ViewNames | Obtém várias pessoas por IDs separados por vírgula. Quem chama com People.ViewNames, mas sem People.View, recebe o modelo básico, com as pessoas que optaram por sair excluídas (exceto o próprio chamador) |
| GET | `/basic?ids=` | JWT | — | Obtém informações básicas (somente o nome) de várias pessoas |
| GET | `/names?ids=` | JWT | Qualquer permissão da igreja | `[{ id, name: { display, first, last }, photo }]`, ordenado por sobrenome e depois por nome, para os IDs separados por vírgula que o chamador já tem acesso, para que funções sem People.View (doações, presença) possam identificar as pessoas. Sem busca e sem filtro do diretório |
| POST | `/names` | JWT | Qualquer permissão da igreja | Igual a `GET /names`. Corpo: `{ peopleIds }` (ou `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member ou People.ViewNames | Pessoas adicionadas recentemente. Quem chama com People.ViewNames, sem People.View (mesmo membros com acesso ao diretório), recebe o modelo básico (`id`, `name.display`, `photo`, `membershipStatus`), com as pessoas que optaram por sair excluídas |
| GET | `/guest-register/options?churchId=` | Pública | — | Lista de verificação do cadastro de visitantes por QR code: retorna `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, cada um com `"off"`, `"optional"` ou `"required"` (lido da configuração pública `guestRegistrationFields`; valores ausentes ou malformados usam o padrão: e-mail/telefone opcionais, o restante desativado). Exige `enableQRGuestRegistration`, a menos que a requisição traga um token de site/igreja correspondente; com limite de taxa (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member ou People.ViewNames | Busca pessoas por nome ou e-mail (até 100, ordenadas por sobrenome e depois por nome). Quem chama com People.ViewNames, sem People.View (mesmo membros com acesso ao diretório), recebe uma busca por nome que retorna o modelo básico; uma busca por `email` retorna `[]` |
| GET | `/search/phone?number=` | JWT | People.View ou Member | Busca por número de telefone |
| GET | `/search/group?groupId=` | JWT | People.View ou Member | Obtém as pessoas de um grupo específico |
| GET | `/household/:householdId` | JWT | — | Obtém todas as pessoas de um domicílio |
| GET | `/attendance` | JWT | People.Edit | Carrega os participantes com filtros (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Carrega os dados de linha do tempo de pessoas e grupos |
| GET | `/directory/:id` | JWT | — | Obtém a pessoa para a visualização do diretório (respeita as preferências de visibilidade) |
| GET | `/claim/:churchId` | JWT | — | Vincula um registro de pessoa ao usuário atual em uma igreja |
| POST | `/` | JWT | People.Edit ou EditSelf | Cria ou atualiza pessoas (em lote) |
| POST | `/search` | JWT | People.View, Member ou People.ViewNames | Busca pessoas (variante POST). Corpo: `{ term }` ou `{ email }`; mesmas regras de somente nomes de `GET /search` |
| POST | `/advancedSearch` | JWT | People.View ou Member | Busca com múltiplas condições (idade, birthMonth, membershipStatus etc.). O corpo é um array de condições; um corpo vazio significa nenhuma condição, e qualquer outro corpo que não seja um array retorna 400 |
| POST | `/loadOrCreate` | Pública | — | Localiza ou cria uma pessoa pelo e-mail. Corpo: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Pública | — | Cadastro de visitantes por QR code. Corpo: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (de 1 a 10 membros; email/phone/maritalStatus se aplicam somente ao primeiro membro). Campos desativados pela igreja são descartados; valores obrigatórios ausentes ou inválidos retornam 400. Primeiro reutiliza pessoas existentes: um membro corresponde quando exatamente uma pessoa não removida tem o mesmo primeiro nome (sem diferenciar maiúsculas) e o mesmo e-mail ou os mesmos dígitos de telefone (residencial, comercial ou celular); um membro sem e-mail nem telefone corresponde pelo primeiro nome dentro do domicílio encontrado. Pessoas correspondentes nunca são editadas. Membros não correspondentes entram no domicílio encontrado ou, na falta dele, em um novo domicílio (com o sobrenome do primeiro membro), como `membershipStatus: "Visitor"` com o `address` compartilhado. Salva `comments` como uma nota no primeiro membro, adiciona todos ao grupo privado `guestRegistrationGroupId`, se definido, e -- quando `guestRegistrationRecordAttendance` é `"true"` -- registra a presença nos horários de culto agendados desse grupo cuja janela de check-in esteja aberta agora. Retorna `{ householdId, people: [{ id, name }] }`, repetindo os nomes enviados em vez dos armazenados. As mesmas regras de opt-in/token e de limite de taxa da chamada de opções se aplicam |
| POST | `/household/:householdId` | JWT | People.Edit | Atualiza as atribuições de membros do domicílio |
| POST | `/public/email` | Pública | — | Envia um e-mail a uma pessoa. Corpo: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interna | — | Carrega os e-mails de pessoas por IDs (servidor a servidor, exige jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Exclui uma pessoa |

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

Consulte [Autenticação e Permissões](./authentication) para os endpoints de login, registro e gerenciamento de senha.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| POST | `/login` | Pública | — | Faz login (e-mail/senha, renovação de JWT ou authGuid) |
| POST | `/register` | Pública | — | Registra um novo usuário |
| POST | `/forgot` | Pública | — | Envia e-mail de redefinição de senha |
| POST | `/setPasswordGuid` | Pública | — | Define a senha usando o GUID de autenticação do link do e-mail |
| POST | `/verifyCredentials` | Pública | — | Verifica e-mail/senha e retorna as igrejas associadas |
| POST | `/loadOrCreate` | JWT | — | Localiza ou cria um usuário pelo e-mail/userId |
| POST | `/setDisplayName` | JWT | — | Atualiza o nome e o sobrenome do usuário |
| POST | `/updateEmail` | JWT | — | Altera o endereço de e-mail do usuário |
| POST | `/updatePassword` | JWT | — | Altera a senha do usuário (mínimo de 6 caracteres) |
| POST | `/updateOptedOut` | JWT | — | Define o status de opt-out de uma pessoa |
| POST | `/sendInviteEmail` | JWT | People.Edit | Envia por e-mail um convite a uma pessoa desta igreja (`email`, `personName`, `contextName`). O botão exibe **Cadastrar-se** para quem não tem conta e **Entrar** para um usuário existente. Um usuário que nunca fez login recebe, em vez disso, um link **Definir Sua Senha** que expira em 7 dias. É um modelo fixo, então não conta para o limite diário de e-mails da igreja |
| GET | `/search?term=` | JWT | Server.Admin | Busca todos os usuários por nome/e-mail |
| DELETE | `/` | JWT | — | Exclui a conta do usuário atual |

## Igrejas

Caminho base: `/membership/churches`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Carrega todas as igrejas do usuário atual |
| GET | `/:id` | JWT | — | Obtém uma igreja pelo ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obtém o usuário administrador de domínio de uma igreja |
| GET | `/:id/impersonate` | JWT | Server.Admin | Personifica uma igreja (somente administrador do servidor) |
| GET | `/all?term=` | JWT | Server.Admin | Busca todas as igrejas (administrador) |
| GET | `/search/?name=` | Pública | — | Busca igrejas pelo nome |
| GET | `/lookup/?subDomain=&id=` | Pública | — | Localiza uma igreja pelo subdomínio ou ID |
| POST | `/` | JWT | Settings.Edit | Atualiza os dados da igreja |
| POST | `/add` | JWT | — | Registra uma nova igreja. Campos obrigatórios: name, address1, city, state, zip, country |
| POST | `/search` | Pública | — | Busca igrejas pelo nome (variante POST) |
| POST | `/select` | JWT | — | Seleciona/troca para uma igreja. Corpo: `{ churchId }` ou `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Arquiva ou desarquiva uma igreja |
| POST | `/byIds` | Pública | — | Carrega várias igrejas por IDs |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Exclui igrejas abandonadas há 7 dias ou mais |

## Grupos

Caminho base: `/membership/groups`

Estende o CRUD padrão (GET `/`, GET `/:id` da classe base).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Lista todos os grupos |
| GET | `/:id` | JWT | — | Obtém um grupo pelo ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Busca grupos pelos filtros de culto |
| GET | `/my` | JWT | — | Obtém os grupos do usuário atual |
| GET | `/my/:tag` | JWT | — | Obtém os grupos do usuário atual filtrados por tag |
| GET | `/tag/:tag` | JWT | — | Obtém todos os grupos com uma tag específica |
| GET | `/public/:churchId/:id` | Pública | — | Obtém um grupo público pela igreja e pelo ID |
| GET | `/public/:churchId/tag/:tag` | Pública | — | Obtém grupos públicos por tag |
| GET | `/public/:churchId/label?label=` | Pública | — | Obtém grupos públicos por rótulo |
| GET | `/public/:churchId/slug/:slug` | Pública | — | Obtém um grupo público pelo slug |
| POST | `/` | JWT | Groups.Edit | Cria ou atualiza grupos (gera o slug automaticamente) |
| DELETE | `/:id` | JWT | Groups.Edit | Exclui um grupo (também exclui as equipes filhas de grupos de ministério) |

## Membros de Grupos

Caminho base: `/membership/groupmembers`

Estende o CRUD padrão (GET `/:id`, DELETE `/:id` da classe base).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | GroupMembers.View | Obtém um membro de grupo pelo ID |
| GET | `/` | JWT | GroupMembers.View* | Lista membros de grupos. Filtre por `?groupId=`, `?groupIds=` ou `?personId=`. *Também permitido se o usuário estiver no grupo ou consultar o próprio personId, e para `?groupId=` de qualquer grupo não confidencial quando o usuário tem Attendance.View ou Attendance.Edit (membros com menos de 13 anos são incluídos para esses usuários) |
| GET | `/my` | JWT | — | Obtém as participações em grupos do usuário atual |
| GET | `/basic/:groupId` | JWT | — | Obtém a lista básica de membros de um grupo |
| GET | `/public/leaders/:churchId/:groupId` | Pública | — | Obtém os líderes de um grupo (público) |
| GET | `/public/:churchId/:groupId` | Pública | — | Obtém a lista pública de um grupo (campos mínimos: `personId`, `displayName`, `leader`, foto). Somente quando o grupo aderiu por `publicRoster`; alimenta o elemento `staffGrid` do criador de sites |
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

## Membros de Funções

Caminho base: `/membership/rolemembers`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/roles/:id` | JWT | Roles.View | Obtém os membros de uma função. Adicione `?include=users` para incluir os detalhes do usuário |
| POST | `/` | JWT | Roles.Edit | Adiciona membros a uma função (cria o usuário se o e-mail não existir) |
| DELETE | `/:id` | JWT | Roles.View | Remove um membro de função |
| DELETE | `/self/:churchId/:userId` | JWT | — | Remove você mesmo de uma igreja |

## Permissões de Funções

Caminho base: `/membership/rolepermissions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/roles/:id` | JWT | Roles.View | Obtém as permissões de uma função (use `null` como ID para a função "Everyone") |
| POST | `/` | JWT | Roles.Edit | Cria ou atualiza permissões de funções |
| DELETE | `/:id` | JWT | Roles.Edit | Exclui uma permissão de função |

## Permissões

Caminho base: `/membership/permissions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Obtém a lista completa de permissões disponíveis |

Cada entrada tem `apiName`, `section` (tipo de conteúdo), `action` e os rótulos `displaySection` / `displayAction` exibidos pelo editor de funções do B1Admin. Adições recentes: `MembershipApi` / `People` / `View Names` (**Ver Somente os Nomes de Pessoas**, em Pessoas e Grupos) e `GivingApi` / `Donations` / `Enter` (**Lançar Doações**, em Doações; veja [Lotes de Doações](./giving.md#donation-batches)).

## Formulários

Caminho base: `/membership/forms`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lista todos os formulários (o administrador vê todos; editores veem os atribuídos e os formulários sem membro) |
| GET | `/:id` | JWT | Acesso ao formulário | Obtém um formulário pelo ID |
| GET | `/archived` | JWT | Forms.Admin ou Forms.Edit | Lista os formulários arquivados |
| GET | `/group/:groupId` | JWT | Membro do grupo, líder do grupo ou Forms.Admin | Formulários independentes vinculados ao grupo (`forms.groupId`), excluindo os arquivados, ordenados por nome. Retorna `id`, `name`, `description` e `open` (dentro da janela de disponibilidade). Membros recebem apenas formulários abertos; líderes e administradores de formulários também recebem os fechados. Alimenta os formulários vinculados na página do grupo |
| GET | `/standalone/:id?churchId=` | JWT | — | Obtém um formulário independente (formulários restritos exigem autenticação) |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Cria ou atualiza formulários. Formulários independentes aceitam um `photoUrl` opcional (foto de cabeçalho exibida acima do formulário) e um `groupId` (grupo vinculado) |
| DELETE | `/:id` | JWT | Acesso ao formulário | Exclui um formulário |

## Respostas de Formulários

Caminho base: `/membership/formsubmissions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lista as respostas. Filtre por `?personId=` ou `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Restrito ao próprio usuário: até 50 respostas de formulários independentes (não de formulários de pessoa) enviadas pelo membro autenticado ou vinculadas à pessoa dele (`contentType` `person`, `contentId` = o ID da pessoa -- por exemplo, após uma alteração feita por um administrador), das mais recentes para as mais antigas, cada uma com `form.name`. `include` anexa as perguntas de cada formulário e as respostas da submissão. Retorna `401` se o usuário não estiver vinculado a uma pessoa. Alimenta a seção **Meus Formulários** da página Eu do B1 |
| GET | `/group/:groupId` | JWT | Líder do grupo | Respostas para os líderes do grupo: uma entrada por formulário vinculado e por evento do grupo com formulário de inscrição, cada uma com `form`, `event` (`id`, `title`, `start`; somente nas entradas de eventos), `questions` e `submissions` (com `answers` e `personName`, `null` quando anônimo) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit ou acesso de visualização | Obtém uma resposta pelo ID. Adicione `?include=form,questions,answers`. Líderes do grupo vinculado ao formulário, e líderes do grupo ao qual uma inscrição de evento pertence, também podem lê-la |
| GET | `/formId/:formId` | JWT | Acesso ao formulário (visualização) | Obtém todas as respostas de um formulário (inclui form, questions, answers). Líderes do grupo vinculado ao formulário têm acesso de visualização |
| POST | `/` | JWT | — | Envia respostas de formulário (trata formulários restritos/não restritos, envia notificações por e-mail). Quando o formulário tem `autoCreatePerson`, localiza ou cria uma pessoa Guest pelo e-mail e vincula a resposta; quando o formulário também tem um `groupId`, adiciona essa pessoa ao grupo; quando `followUpSubject`/`followUpBody` estão definidos, envia um e-mail de acompanhamento com modelo ao remetente. A menos que quem chama possa gerenciar o formulário, `submittedBy` é sempre definido como a pessoa do membro autenticado (ou deixado vazio para respostas anônimas) |
| DELETE | `/:id` | JWT | Forms.Admin ou Forms.Edit | Exclui uma resposta e suas respostas às perguntas |

## Perguntas

Caminho base: `/membership/questions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Acesso ao formulário | Lista as perguntas de um formulário. Exige `?formId=` |
| GET | `/:id` | JWT | Acesso ao formulário | Obtém uma pergunta pelo ID |
| GET | `/unrestricted?formId=` | JWT | — | Obtém as perguntas de um formulário não restrito |
| GET | `/sort/:id/up` | JWT | — | Move uma pergunta para cima na ordenação |
| GET | `/sort/:id/down` | JWT | — | Move uma pergunta para baixo na ordenação |
| POST | `/` | JWT | Acesso ao formulário | Cria ou atualiza perguntas (atribui a ordenação automaticamente) |
| DELETE | `/:id?formId=` | JWT | Acesso ao formulário | Exclui uma pergunta |

## Respostas às Perguntas

Caminho base: `/membership/answers`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lista as respostas. Filtre por `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Cria ou atualiza respostas |

## Permissões de Membros

Caminho base: `/membership/memberpermissions`

Controla o acesso de cada membro a formulários específicos.

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
| GET | `/public/lookup/:domainName` | Pública | — | Consulta pública de domínio pelo nome |
| GET | `/health/check` | Pública | — | Executa a verificação de integridade dos domínios não verificados |
| POST | `/` | JWT | Settings.Edit | Cria ou atualiza domínios (aciona a atualização do Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Exclui um domínio |

## Usuário-Igreja

Caminho base: `/membership/userchurch`

Gerencia a associação entre usuários e igrejas.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/userid/:userId` | JWT | — | Obtém o registro usuário-igreja pelo ID do usuário |
| GET | `/personid/:personId` | JWT | — | Obtém o e-mail do usuário vinculado a uma pessoa |
| GET | `/user/:userId` | JWT | Server.Admin | Carrega todas as igrejas de um usuário |
| POST | `/` | JWT | — | Cria uma associação usuário-igreja |
| PATCH | `/:userId` | JWT | — | Atualiza o último acesso e registra o acesso |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Exclui um registro usuário-igreja |

## Preferências de Visibilidade

Caminho base: `/membership/visibilityPreferences`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/my` | JWT | — | Obtém as preferências de visibilidade do usuário atual |
| POST | `/` | JWT | — | Salva as preferências de visibilidade (visibilidade de endereço, telefone e e-mail) |

## Consulta

Caminho base: `/membership/query`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| POST | `/members` | JWT | — | Busca de membros em linguagem natural usando IA. Corpo: `{ text, subDomain, siteUrl }` |

## Erros do Cliente

Caminho base: `/membership/clientErrors`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| POST | `/` | JWT | — | Registra um erro do lado do cliente |

## Páginas Relacionadas

- [Autenticação e Permissões](./authentication) — Fluxo de login, JWT, OAuth, modelo de permissões
- [Endpoints de Attendance](./attendance) — Registro de cultos e visitas
- [Estrutura de Módulos](../module-structure) — Padrões de organização do código
