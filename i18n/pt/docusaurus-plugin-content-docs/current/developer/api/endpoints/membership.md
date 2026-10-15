---
title: "Endpoints de Membresia"
---

# Endpoints de Membresia

<div class="article-intro">

O módulo de Membresia gerencia pessoas, igrejas, grupos, domicílios, funções, permissões, formulários e configurações. É o maior módulo e fornece a camada central de identidade e autorização para todos os outros módulos.

</div>

**Caminho base:** `/membership`

## Pessoas

Caminho base: `/membership/people`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View ou Member | Lista todas as pessoas da igreja |
| GET | `/:id` | JWT | People.View ou o próprio registro | Obtém uma pessoa pelo ID (inclui respostas de formulários) |
| GET | `/ids?ids=` | JWT | People.View ou Member | Obtém várias pessoas pelos IDs separados por vírgula |
| GET | `/basic?ids=` | JWT | — | Obtém informações básicas (somente nome) de várias pessoas |
| GET | `/names?ids=` | JWT | Qualquer permissão da igreja | `[{ id, name: { display }, photo }]` para os IDs separados por vírgula que o chamador já tem acesso, para que funções sem People.View (ofertas, presença) possam identificar pessoas. Sem busca, sem filtro de diretório |
| POST | `/names` | JWT | Qualquer permissão da igreja | Igual a `GET /names`. Corpo: `{ peopleIds }` (ou `{ ids }`) |
| GET | `/recent` | JWT | People.View ou Member | Pessoas adicionadas recentemente |
| GET | `/search?term=&email=` | JWT | People.View ou Member | Pesquisa pessoas por nome ou e-mail |
| GET | `/search/phone?number=` | JWT | People.View ou Member | Pesquisa por número de telefone |
| GET | `/search/group?groupId=` | JWT | People.View ou Member | Obtém as pessoas de um grupo específico |
| GET | `/household/:householdId` | JWT | — | Obtém todas as pessoas de um domicílio |
| GET | `/attendance` | JWT | People.Edit | Carrega os participantes com filtros (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Carrega os dados da linha do tempo de pessoas e grupos |
| GET | `/directory/:id` | JWT | — | Obtém a pessoa para a visualização do diretório (respeita as preferências de visibilidade) |
| GET | `/claim/:churchId` | JWT | — | Reivindica um registro de pessoa para o usuário atual em uma igreja |
| POST | `/` | JWT | People.Edit ou EditSelf | Cria ou atualiza pessoas (em lote) |
| POST | `/search` | JWT | People.View ou Member | Pesquisa pessoas (variante POST) |
| POST | `/advancedSearch` | JWT | People.View ou Member | Pesquisa com múltiplas condições (idade, birthMonth, membershipStatus etc.) |
| POST | `/loadOrCreate` | Público | — | Localiza ou cria uma pessoa pelo e-mail. Corpo: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Atualiza as atribuições de membros do domicílio |
| POST | `/public/email` | Público | — | Envia um e-mail para uma pessoa. Corpo: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interno | — | Carrega os e-mails das pessoas pelos IDs (servidor para servidor, requer jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Exclui uma pessoa |

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

## Usuários

Caminho base: `/membership/users`

Consulte [Autenticação e Permissões](./authentication) para os endpoints de login, cadastro e gerenciamento de senhas.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| POST | `/login` | Público | — | Faz login (e-mail/senha, renovação de JWT ou authGuid) |
| POST | `/register` | Público | — | Cadastra um novo usuário |
| POST | `/forgot` | Público | — | Envia o e-mail de redefinição de senha |
| POST | `/setPasswordGuid` | Público | — | Define a senha usando o GUID de autenticação do link do e-mail |
| POST | `/verifyCredentials` | Público | — | Verifica e-mail/senha e retorna as igrejas associadas |
| POST | `/loadOrCreate` | JWT | — | Localiza ou cria um usuário pelo e-mail/userId |
| POST | `/setDisplayName` | JWT | — | Atualiza o nome e o sobrenome do usuário |
| POST | `/updateEmail` | JWT | — | Altera o endereço de e-mail do usuário |
| POST | `/updatePassword` | JWT | — | Altera a senha do usuário (mínimo de 6 caracteres) |
| POST | `/updateOptedOut` | JWT | — | Define o status de descadastro de uma pessoa |
| POST | `/sendInviteEmail` | JWT | People.Edit | Envia por e-mail um convite a uma pessoa desta igreja (`email`, `personName`, `contextName`). O botão mostra **Cadastrar-se** para quem não tem conta e **Entrar** para um usuário existente. Um usuário que nunca entrou recebe, em vez disso, um link **Definir sua senha** que expira em 7 dias. Conta para o limite diário de e-mails da igreja (`429` quando atingido) |
| GET | `/search?term=` | JWT | Server.Admin | Pesquisa todos os usuários por nome/e-mail |
| DELETE | `/` | JWT | — | Exclui a conta do usuário atual |

## Igrejas

Caminho base: `/membership/churches`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carrega todas as igrejas do usuário atual |
| GET | `/:id` | JWT | — | Obtém a igreja pelo ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obtém o usuário administrador de domínio de uma igreja |
| GET | `/:id/impersonate` | JWT | Server.Admin | Personifica uma igreja (somente administradores do servidor) |
| GET | `/all?term=` | JWT | Server.Admin | Pesquisa todas as igrejas (administrador) |
| GET | `/search/?name=` | Público | — | Pesquisa igrejas pelo nome |
| GET | `/lookup/?subDomain=&id=` | Público | — | Localiza uma igreja pelo subdomínio ou ID |
| POST | `/` | JWT | Settings.Edit | Atualiza os dados da igreja |
| POST | `/add` | JWT | — | Cadastra uma nova igreja. Campos obrigatórios: name, address1, city, state, zip, country |
| POST | `/search` | Público | — | Pesquisa igrejas pelo nome (variante POST) |
| POST | `/select` | JWT | — | Seleciona/troca para uma igreja. Corpo: `{ churchId }` ou `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Arquiva ou desarquiva uma igreja |
| POST | `/byIds` | Público | — | Carrega várias igrejas pelos IDs |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Exclui igrejas abandonadas há 7 dias ou mais |

## Grupos

Caminho base: `/membership/groups`

Estende o CRUD padrão (GET `/`, GET `/:id` da classe base).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista todos os grupos |
| GET | `/:id` | JWT | — | Obtém um grupo pelo ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Pesquisa grupos pelos filtros de culto |
| GET | `/my` | JWT | — | Obtém os grupos do usuário atual |
| GET | `/my/:tag` | JWT | — | Obtém os grupos do usuário atual filtrados por etiqueta |
| GET | `/tag/:tag` | JWT | — | Obtém todos os grupos com uma etiqueta específica |
| GET | `/public/:churchId/:id` | Público | — | Obtém um grupo público pela igreja e pelo ID |
| GET | `/public/:churchId/tag/:tag` | Público | — | Obtém grupos públicos pela etiqueta |
| GET | `/public/:churchId/label?label=` | Público | — | Obtém grupos públicos pelo rótulo |
| GET | `/public/:churchId/slug/:slug` | Público | — | Obtém um grupo público pelo slug |
| POST | `/` | JWT | Groups.Edit | Cria ou atualiza grupos (gera o slug automaticamente) |
| DELETE | `/:id` | JWT | Groups.Edit | Exclui um grupo (também exclui as equipes filhas nos grupos de ministério) |

## Membros do Grupo

Caminho base: `/membership/groupmembers`

Estende o CRUD padrão (GET `/:id`, DELETE `/:id` da classe base).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Obtém um membro do grupo pelo ID |
| GET | `/` | JWT | GroupMembers.View* | Lista os membros dos grupos. Filtra por `?groupId=`, `?groupIds=` ou `?personId=`. *Também permitido se o usuário estiver no grupo ou consultar o próprio personId |
| GET | `/my` | JWT | — | Obtém as participações em grupos do usuário atual |
| GET | `/basic/:groupId` | JWT | — | Obtém a lista básica de membros de um grupo |
| GET | `/public/leaders/:churchId/:groupId` | Público | — | Obtém os líderes de um grupo (público) |
| GET | `/public/:churchId/:groupId` | Público | — | Obtém a lista pública de um grupo (campos mínimos: `personId`, `displayName`, `leader`, foto). Somente quando o grupo opta por `publicRoster`; alimenta o elemento `staffGrid` do construtor de sites |
| POST | `/` | JWT | GroupMembers.Edit | Adiciona ou atualiza membros de grupos |
| DELETE | `/:id` | JWT | GroupMembers.View | Remove um membro do grupo |

## Domicílios

Caminho base: `/membership/households`

Controlador CRUD padrão.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista todos os domicílios |
| GET | `/:id` | JWT | — | Obtém um domicílio pelo ID |
| POST | `/` | JWT | People.Edit | Cria ou atualiza domicílios |
| DELETE | `/:id` | JWT | People.Edit | Exclui um domicílio |

## Funções

Caminho base: `/membership/roles`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Obtém uma função pelo ID |
| GET | `/church/:churchId` | JWT | Roles.View | Obtém todas as funções de uma igreja |
| POST | `/` | JWT | Roles.Edit | Cria ou atualiza funções |
| DELETE | `/:id` | JWT | Roles.Edit | Exclui uma função (também remove suas permissões e membros) |

## Membros de Função

Caminho base: `/membership/rolemembers`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtém os membros de uma função. Adicione `?include=users` para incluir os dados dos usuários |
| POST | `/` | JWT | Roles.Edit | Adiciona membros a uma função (cria o usuário se o e-mail não existir) |
| DELETE | `/:id` | JWT | Roles.View | Remove um membro da função |
| DELETE | `/self/:churchId/:userId` | JWT | — | Remove você mesmo de uma igreja |

## Permissões de Função

Caminho base: `/membership/rolepermissions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtém as permissões de uma função (use `null` como ID para a função "Todos") |
| POST | `/` | JWT | Roles.Edit | Cria ou atualiza permissões de função |
| DELETE | `/:id` | JWT | Roles.Edit | Exclui uma permissão de função |

## Permissões

Caminho base: `/membership/permissions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Obtém a lista completa de permissões disponíveis |

## Formulários

Caminho base: `/membership/forms`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lista todos os formulários (o administrador vê todos; editores veem os atribuídos e os formulários de não membros) |
| GET | `/:id` | JWT | Acesso ao formulário | Obtém um formulário pelo ID |
| GET | `/archived` | JWT | Forms.Admin ou Forms.Edit | Lista os formulários arquivados |
| GET | `/standalone/:id?churchId=` | JWT | — | Obtém um formulário independente (formulários restritos exigem autenticação) |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Cria ou atualiza formulários |
| DELETE | `/:id` | JWT | Acesso ao formulário | Exclui um formulário |

## Respostas de Formulários

Caminho base: `/membership/formsubmissions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lista as respostas. Filtra por `?personId=` ou `?formId=` |
| GET | `/:id` | JWT | Forms.Admin ou Forms.Edit | Obtém uma resposta pelo ID. Adicione `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Acesso ao formulário | Obtém todas as respostas de um formulário (inclui formulário, perguntas e respostas) |
| POST | `/` | JWT | — | Envia as respostas do formulário (trata formulários restritos/não restritos e envia notificações por e-mail). Quando o formulário tem `autoCreatePerson`, localiza ou cria uma pessoa Visitante pelo e-mail e vincula a resposta; quando `followUpSubject`/`followUpBody` estão definidos, envia um e-mail de acompanhamento com modelo ao remetente |
| DELETE | `/:id` | JWT | Forms.Admin ou Forms.Edit | Exclui uma resposta e suas respostas às perguntas |

## Perguntas

Caminho base: `/membership/questions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Acesso ao formulário | Lista as perguntas de um formulário. Requer `?formId=` |
| GET | `/:id` | JWT | Acesso ao formulário | Obtém uma pergunta pelo ID |
| GET | `/unrestricted?formId=` | JWT | — | Obtém as perguntas de um formulário não restrito |
| GET | `/sort/:id/up` | JWT | — | Move uma pergunta para cima na ordenação |
| GET | `/sort/:id/down` | JWT | — | Move uma pergunta para baixo na ordenação |
| POST | `/` | JWT | Acesso ao formulário | Cria ou atualiza perguntas (atribui a ordem automaticamente) |
| DELETE | `/:id?formId=` | JWT | Acesso ao formulário | Exclui uma pergunta |

## Respostas

Caminho base: `/membership/answers`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lista as respostas. Filtra por `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Cria ou atualiza respostas |

## Permissões de Membro

Caminho base: `/membership/memberpermissions`

Controla o acesso individual de cada membro a formulários específicos.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
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
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Obtém todas as configurações da igreja |
| GET | `/public/:churchId` | Público | — | Obtém as configurações públicas de uma igreja |
| POST | `/` | JWT | Settings.Edit | Salva as configurações (aceita upload de imagem em base64) |

## Domínios

Caminho base: `/membership/domains`

Estende o CRUD padrão (GET `/:id`, GET `/`, DELETE `/:id` da classe base).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista todos os domínios |
| GET | `/:id` | JWT | — | Obtém um domínio pelo ID |
| GET | `/lookup/:domainName` | JWT | — | Localiza um domínio pelo nome |
| GET | `/public/lookup/:domainName` | Público | — | Localização pública de domínio pelo nome |
| GET | `/health/check` | Público | — | Executa a verificação de integridade dos domínios não verificados |
| POST | `/` | JWT | Settings.Edit | Cria ou atualiza domínios (aciona a atualização do Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Exclui um domínio |

## Usuário-Igreja

Caminho base: `/membership/userchurch`

Gerencia a associação entre usuários e igrejas.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Obtém o registro usuário-igreja pelo ID do usuário |
| GET | `/personid/:personId` | JWT | — | Obtém o e-mail do usuário vinculado a uma pessoa |
| GET | `/user/:userId` | JWT | Server.Admin | Carrega todas as igrejas de um usuário |
| POST | `/` | JWT | — | Cria uma associação usuário-igreja |
| PATCH | `/:userId` | JWT | — | Atualiza o horário do último acesso e registra o acesso |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Exclui um registro usuário-igreja |

## Preferências de Visibilidade

Caminho base: `/membership/visibilityPreferences`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obtém as preferências de visibilidade do usuário atual |
| POST | `/` | JWT | — | Salva as preferências de visibilidade (visibilidade de endereço, telefone e e-mail) |

## Consulta

Caminho base: `/membership/query`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Pesquisa de membros em linguagem natural usando IA. Corpo: `{ text, subDomain, siteUrl }` |

## Erros do Cliente

Caminho base: `/membership/clientErrors`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Registra um erro do lado do cliente |

## Páginas Relacionadas

- [Autenticação e Permissões](./authentication) — Fluxo de login, JWT, OAuth, modelo de permissões
- [Endpoints de Presença](./attendance) — Rastreamento de cultos e visitas
- [Estrutura de Módulos](../module-structure) — Padrões de organização do código
