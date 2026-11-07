---
title: "Administração do servidor"
description: "Apenas para usuários Server.Admin: redefinir o login em duas etapas, personificar contas, moderar a Commons e aprovar e-mails da igreja no B1 Admin."
---

# Administração do servidor

<div class="article-intro">

Os recursos de administração do servidor no ChurchApps estão disponíveis somente para usuários com a permissão **Server.Admin**. Essas ferramentas são usadas para operações da plataforma, suporte e solução de problemas em todas as igrejas do sistema.

</div>

:::warning Acesso restrito
Os recursos descritos nesta página exigem a permissão **Server.Admin** e não estão disponíveis para os administradores comuns das igrejas. Eles são destinados apenas a operadores da plataforma e à equipe de suporte.
:::

## Acessando a administração do servidor

Usuários com a permissão Server.Admin podem acessar o painel de administração do servidor a partir do B1 Admin:

1. Entre em [admin.b1.church](https://admin.b1.church)
2. Abra o [menu Jump](../b1-admin/introduction.md#getting-around-with-the-jump-menu), expanda **Configurações** e clique em **Administração do servidor**. (Você também pode ir direto para `admin.b1.church/admin`.)
3. O painel de Administração do servidor lista suas seções do lado esquerdo, em três grupos: **Diretório** (Igrejas, Usuários, Assumir usuário), **Operações** (Tarefas em segundo plano, Commons, Tendências de uso) e **Sistema** (Consultas de tradução, Saúde do servidor, Migrações do banco de dados)

## Redefinindo a verificação em duas etapas

Se um usuário tiver a [verificação em duas etapas](../b1-admin/profile/managing-profile.md#two-factor-sign-in) ativada e tiver perdido o celular e os códigos de backup, um administrador do servidor pode desativá-la:

1. Abra a seção **Usuários** do painel de Administração do servidor e procure o usuário.
2. Usuários com a verificação em duas etapas mostram um selo **Verificação em duas etapas ativada**. Clique em **Redefinir 2FA** ao lado dele.
3. Confirme o aviso. Faça isso somente depois de confirmar com quem você está falando.

Depois disso, o usuário pode entrar apenas com a senha e configurar a verificação em duas etapas novamente pelo perfil. As redefinições são gravadas no log de auditoria como `mfa_reset`. O endpoint é `POST /membership/users/mfa/reset/:userId` e exige Server.Admin.

## Assumindo a identidade de um usuário (impersonação)

O recurso de impersonação permite que administradores do servidor entrem como outro usuário para fins de suporte e solução de problemas. É útil ao investigar problemas relatados por usuários ou ao ajudar igrejas a configurar seus sistemas.

### Como assumir a identidade de um usuário

1. Abra a seção **Assumir usuário** do painel de Administração do servidor
2. Digite o nome ou o e-mail do usuário no campo de busca
3. Clique em **Pesquisar** ou pressione Enter
4. Nos resultados da busca, clique no usuário que você quer impersonar
5. Confirme a impersonação na janela que aparecer
6. Você será conectado como esse usuário e redirecionado para a conta dele

### Observações importantes

- A impersonação cria uma nova sessão com as permissões e o acesso às igrejas do usuário-alvo
- Sua sessão administrativa original termina quando você assume a identidade de outro usuário
- Todas as ações feitas durante a impersonação são registradas na trilha de auditoria
- Para voltar à sua conta de administrador, saia e entre novamente com as suas credenciais
- Use a impersonação somente quando necessário para suporte e sempre informe os usuários quando acessar as contas deles para suporte

### Endpoint da API

O recurso de impersonação é sustentado pelo endpoint `/users/:userId/impersonate` da API de Membership. Veja [Endpoints de Membership](/docs/developer/api/endpoints/membership#users) para os detalhes técnicos.

### Considerações de segurança

- A impersonação exige a permissão Server.Admin — essa permissão deve ser concedida com moderação e somente a operadores da plataforma de confiança
- Todos os eventos de impersonação são registrados com o ID do administrador e o ID do usuário-alvo
- As igrejas não são notificadas quando a impersonação ocorre, então estabeleça políticas claras sobre quando e como esse recurso deve ser usado
- Considere registrar os eventos de impersonação no seu sistema de chamados de suporte para garantir a responsabilização

## Moderação do Commons

O Commons é a fila de moderação compartilhada para conteúdo enviado por usuários em vários produtos — músicas do WorshipCommons, lições do Lessons.church, modelos do FreeShow e modelos do criador de sites do B1 passam todos pela mesma fila, em vez de ferramentas de revisão separadas por produto.

### Acessando o Commons

1. Acesse a aba **Commons** no painel de Administração do servidor.
2. Você verá três subabas: **Fila**, **Denúncias** e **Recursos**.

Uma função limitada de **editor de músicas** também pode ver a aba Fila, mas fica impedida de aprovar envios que alterem os direitos ou o licenciamento de uma música.

### Fila

A Fila lista todos os envios pendentes de todos os produtos, filtráveis por produto e tipo de recurso. Cada linha mostra se o envio é um recurso novo, uma edição feita pelo autor original ou uma edição feita por terceiros, além do histórico de aprovações de quem enviou e há quanto tempo o envio está esperando (sinalizado quando passa de 72 horas).

Clique em **Revisar** para abrir uma gaveta com as diferenças campo a campo, as prévias dos arquivos e uma prévia somente leitura do item. Use os atalhos de teclado **a**/**r** para aprovar ou rejeitar, e **j**/**k** para ir ao envio seguinte ou anterior sem sair da gaveta. Para rejeitar, é preciso selecionar um motivo (por exemplo, qualidade, duplicata, licenciamento, ccli, ia ou fora do tema) e escrever uma observação.

### Denúncias

A aba Denúncias trata das denúncias de direitos autorais e de política/qualidade feitas contra recursos já publicados, divididas em filas separadas de Direitos autorais e de Política e outros, além de um histórico de Resolvidas. Assuma uma denúncia para começar a trabalhar nela e depois a resolva com um desfecho (mantida, arquivada ou duplicata) e uma ação (nenhuma, despublicar ou remover).

### Recursos

A aba Recursos é um navegador pesquisável de conteúdo publicado, com ações para **Destacar** um recurso (ele aparece em destaque na página inicial do produto), **Despublicar**/**Republicar** ou **Remover** (com um motivo de direitos autorais ou de política).

No caso específico das músicas, é também aqui que uma música se torna **pronta para o domingo** e passa a poder aparecer na busca de músicas do B1 Admin de uma igreja: o revisor abre o recurso e marca cada tom publicado como **Ouvido** depois de ouvi-lo por completo e confirmar que a partitura, os acordes e os slides estão todos presentes. Uma música só fica pronta para o domingo quando todos os tons estiverem marcados.

:::info
A moderação do Commons é restrita à equipe — as igrejas individuais nunca veem essa fila. O único lugar em que o B1 Admin de uma igreja toca nos dados do Commons é a seção "WorshipCommons — gratuitas" da [busca de músicas](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), que só mostra músicas que já passaram por esse processo de revisão.
:::

Veja a página [Arquitetura de conteúdo do Commons](/docs/developer/architecture/commons) para o modelo de dados subjacente e o ciclo de vida dos envios.

## Aprovação de e-mail de grupo

As igrejas não podem enviar e-mails escritos por elas (e-mail de grupo, acompanhamentos de formulários, e-mails de fluxos de trabalho e convites de contas) até que um administrador do servidor as aprove. Isso impede que igrejas cadastradas por robôs usem o endereço de envio compartilhado do ChurchApps para spam.

1. Abra a aba **Igrejas** no painel de Administração do servidor.
2. Cada igreja mostra um selo **E-mail de grupo**: **Aprovado** (verde) ou **Não aprovado** (contorno).
3. Clique no selo e confirme para aprovar a igreja ou para revogar uma aprovação.

A equipe da igreja pede a aprovação com o botão **Solicitar análise** na janela Enviar e-mail do B1 Admin. A solicitação é enviada por e-mail ao endereço de suporte e lista o nome da igreja, o ID, a data de cadastro, a localização e quem fez o pedido. Uma igreja pode enviar um pedido por semana. Veja [Limites de e-mail escrito pela igreja](/docs/developer/architecture/notifications#church-authored-email-limits) para a cota diária e a pausa automática em caso de devoluções e reclamações.

## Migrações do banco de dados {#database-migrations}

O fluxo de trabalho **Deploy Prod** aplica as migrações pendentes por conta própria. Os bancos de dados hospedados só aceitam conexões de dentro da rede da Api, então um runner do GitHub não consegue alcançá-los; em vez disso, logo após o `serverless deploy`, o fluxo invoca a função Lambda `migrate` da Api (`api-Prod-migrate`), que executa as migrações pendentes de cada módulo com o mesmo runner desta aba e faz a implantação falhar se algum módulo der erro ou for recusado. **Rollback Prod** reverte apenas o código da Lambda; as migrações já aplicadas continuam aplicadas. A aba **Migrações do banco de dados** serve para verificar a situação, executar o que uma implantação não executou (por exemplo, no ambiente de demonstração, cuja implantação não migra) e fazer a linha de base de módulos sem histórico. (Instalações Docker auto-hospedadas ainda executam as migrações automaticamente quando o contêiner da Api inicia.)

A aba mostra o ambiente atual e uma linha por módulo (membership, attendance, giving etc.), com a situação, o número de migrações aplicadas e pendentes e a última aplicada.

- **Executar migrações pendentes** aplica todas as migrações pendentes, um módulo por vez, em ordem. Ele para na primeira falha e mostra o que foi aplicado em cada módulo.
- Um módulo marcado como **Sem histórico** tem um banco de dados anterior ao acompanhamento de migrações. Ele nunca é executado automaticamente, porque isso reexecutaria migrações antigas de dados sobre tabelas em produção. Clique em **Verificar esquema** nesse módulo. A Api compara as tabelas, colunas e índices que cada migração cria com o banco de dados ativo e marca cada migração como **Já aplicada**, **Ausente**, **Parcialmente aplicada** ou **Somente dados**. A verificação não altera nada.
- Nos resultados da verificação, **Registrar como já aplicada** grava as migrações detectadas no histórico de migrações sem executá-las (após uma confirmação). Tudo até a última migração **Já aplicada** é registrado, incluindo as **Somente dados** nesse intervalo; as **Ausentes** continuam pendentes e podem então ser executadas normalmente com **Executar migrações pendentes**.
- Uma migração **Parcialmente aplicada** bloqueia o registro. Se for seguro executá-la novamente (leia-a antes), marque **Executar novamente** para que ela fique pendente e rode de novo desde o início.

O painel de Administração do servidor e a CLI (`yarn migrate:up`) usam o mesmo migrador Kysely e a mesma tabela `kysely_migration`, então sempre concordam sobre o que foi aplicado. Os endpoints de apoio são `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` e `POST .../:module/baseline`, todos somente para Server.Admin.

## Páginas relacionadas

- [Autenticação e permissões](/docs/developer/api/endpoints/authentication) — Modelo de permissões e autenticação JWT
- [Endpoints de Membership](/docs/developer/api/endpoints/membership) — API de gerenciamento de usuários e igrejas
- [Log de auditoria](/docs/b1-admin/reports/audit-log) — Veja os registros de atividade de uma igreja
- [Arquitetura de conteúdo do Commons](/docs/developer/architecture/commons) — Modelo de recursos compartilhados e ciclo de vida da moderação
