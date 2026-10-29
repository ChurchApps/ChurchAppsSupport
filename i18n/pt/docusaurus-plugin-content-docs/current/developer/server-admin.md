---
title: "Administração do Servidor"
---

# Administração do Servidor

<div class="article-intro">

Os recursos de administração do servidor do ChurchApps estão disponíveis somente para usuários com a permissão **Server.Admin**. Essas ferramentas são usadas para operações da plataforma, suporte e solução de problemas em todas as igrejas do sistema.

</div>

:::warning Acesso Restrito
Os recursos descritos nesta página exigem a permissão **Server.Admin** e não estão disponíveis para administradores comuns das igrejas. Eles são destinados apenas a operadores da plataforma e à equipe de suporte.
:::

## Acessando a Administração do Servidor

Usuários com a permissão Server.Admin podem acessar o painel de administração do servidor pelo B1 Admin:

1. Faça login em [admin.b1.church](https://admin.b1.church)
2. Abra o [menu Jump](../b1-admin/introduction.md#getting-around-with-the-jump-menu), expanda **Configurações** e clique em **Server Admin**. (Você também pode acessar diretamente `admin.b1.church/admin`.)
3. O painel Server Admin lista suas seções no lado esquerdo, em três grupos: **Diretório** (Igrejas, Usuários, Personificar Usuário), **Operações** (Tarefas em Segundo Plano, Commons, Tendências de Uso) e **Sistema** (Consultas de Tradução, Saúde do Servidor, Migrações de Banco de Dados)

## Redefinindo a Verificação em Duas Etapas

Se um usuário tiver a [verificação em duas etapas](../b1-admin/profile/managing-profile.md#two-factor-sign-in) ativada e tiver perdido o celular e os códigos de backup, um administrador do servidor pode desativá-la:

1. Abra a seção **Usuários** do painel Server Admin e procure o usuário.
2. Usuários com verificação em duas etapas exibem o selo **Two-factor on**. Clique em **Reset 2FA** ao lado dele.
3. Confirme o aviso. Faça isso somente depois de confirmar com quem você está falando.

O usuário pode então entrar apenas com a senha e configurar novamente a verificação em duas etapas pelo próprio perfil. As redefinições são registradas no log de auditoria como `mfa_reset`. O endpoint é `POST /membership/users/mfa/reset/:userId` e exige Server.Admin.

## Personificação de Usuários

O recurso de personificação permite que administradores do servidor entrem como outro usuário para fins de suporte e solução de problemas. Isso é útil ao investigar problemas relatados por usuários ou ao ajudar igrejas a configurar seus sistemas.

### Como Personificar um Usuário

1. Abra a seção **Personificar Usuário** do painel Server Admin
2. Digite o nome ou o e-mail do usuário no campo de busca
3. Clique em **Pesquisar** ou pressione Enter
4. Nos resultados da busca, clique no usuário que deseja personificar
5. Confirme a personificação na caixa de diálogo que aparecer
6. Você entrará como esse usuário e será redirecionado para a conta dele

### Observações Importantes

- A personificação cria uma nova sessão com as permissões e o acesso às igrejas do usuário-alvo
- Sua sessão de administrador original termina quando você personifica outro usuário
- Todas as ações realizadas durante a personificação são registradas na trilha de auditoria
- Para voltar à sua conta de administrador, saia e entre novamente com suas credenciais
- Use a personificação somente quando for necessário para suporte e sempre informe os usuários quando acessar as contas deles para dar suporte

### Endpoint da API

O recurso de personificação é suportado pelo endpoint `/users/:userId/impersonate` da API de Membership. Consulte [Endpoints de Membership](/docs/developer/api/endpoints/membership#users) para detalhes técnicos.

### Considerações de Segurança

- A personificação exige a permissão Server.Admin -- essa permissão deve ser concedida com moderação e somente a operadores da plataforma de confiança
- Todos os eventos de personificação são registrados com o ID do administrador e o ID do usuário-alvo
- As igrejas não são notificadas quando ocorre uma personificação, então estabeleça políticas claras sobre quando e como esse recurso deve ser usado
- Considere documentar os eventos de personificação no seu sistema de tickets de suporte para fins de responsabilização

## Moderação do Commons

O Commons é a fila de moderação compartilhada para conteúdos enviados por usuários entre os produtos -- músicas do WorshipCommons, lições do Lessons.church, modelos do FreeShow e modelos do criador de sites do B1 passam todos pela mesma fila, em vez de ferramentas de revisão separadas por produto.

### Acessando o Commons

1. Acesse a aba **Commons** no painel Server Admin.
2. Você verá três subabas: **Fila**, **Denúncias** e **Recursos**.

Uma função limitada de **editor de músicas** também pode ver a aba Fila, mas é impedida de aprovar envios que alterem os direitos ou o licenciamento de uma música.

### Fila

A Fila lista todos os envios pendentes de todos os produtos, filtráveis por produto e tipo de recurso. Cada linha mostra se o envio é um novo recurso, uma edição feita pelo autor original ou uma edição feita por terceiro, além do histórico de aprovações de quem enviou e há quanto tempo o envio está aguardando (sinalizado após 72 horas).

Clique em **Revisar** para abrir um painel com as diferenças campo a campo, as prévias dos arquivos e uma visualização somente leitura do item. Use os atalhos de teclado **a** / **r** para aprovar ou rejeitar, e **j** / **k** para ir ao envio seguinte ou anterior sem sair do painel. Para rejeitar, é preciso escolher um motivo (por exemplo, qualidade, duplicado, licenciamento, ccli, ia ou fora do tema) e escrever uma observação.

### Denúncias

A aba Denúncias trata denúncias de direitos autorais e de política/qualidade feitas contra recursos já publicados, divididas em duas filas separadas, Direitos Autorais e Política e Outros, além de um histórico de Resolvidas. Assuma uma denúncia para começar a trabalhar nela e, em seguida, resolva-a com uma resolução (mantida, arquivada ou duplicada) e uma ação (nenhuma, despublicar ou remover).

### Recursos

A aba Recursos é um navegador pesquisável de conteúdos publicados, com ações para **Destacar** um recurso (exibi-lo na página inicial do produto), **Despublicar**/**Republicar** ou **Remover** (com um motivo de direitos autorais ou de política).

Especificamente para músicas, é também aqui que uma música se torna **pronta para o domingo** e passa a poder aparecer na busca de músicas do B1 Admin de uma igreja: um revisor abre o recurso e marca cada tom publicado como **Ouvido** depois de ouvi-lo por completo e confirmar que a partitura, os acordes e os slides estão todos presentes. Uma música só fica pronta para o domingo quando todos os tons estiverem marcados.

:::info
A moderação do Commons é exclusiva da equipe -- igrejas individuais nunca veem essa fila. O único ponto em que o B1 Admin de uma igreja acessa dados do Commons é a seção "WorshipCommons — gratuito" da [busca de músicas](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), que mostra apenas músicas que já passaram por esse processo de revisão.
:::

Consulte a página [Arquitetura do Content Commons](/docs/developer/architecture/commons) para ver o modelo de dados subjacente e o ciclo de vida dos envios.

## Aprovação de E-mail para Grupos

As igrejas não podem enviar e-mails escritos pela igreja (e-mails para grupos, acompanhamentos de formulários, e-mails de fluxos de trabalho e convites de conta) até que um administrador do servidor aprove. Isso impede que igrejas cadastradas por bots usem o endereço de envio compartilhado do ChurchApps para spam.

1. Abra a aba **Igrejas** no painel Server Admin.
2. Cada igreja exibe um selo **Group Email**: **Approved** (verde) ou **Not approved** (contorno).
3. Clique no selo e confirme para aprovar a igreja ou para revogar uma aprovação.

A equipe da igreja solicita a aprovação pelo botão **Request review**, na caixa de diálogo de envio de e-mail do B1 Admin. A solicitação é enviada por e-mail ao endereço de suporte e lista o nome da igreja, o ID, a data de cadastro, a localização e quem fez o pedido. Uma igreja pode enviar um pedido por semana. Consulte [Limites de e-mails escritos pela igreja](/docs/developer/architecture/notifications#church-authored-email-limits) para ver a cota diária e a pausa automática em caso de rejeições e reclamações.

## Migrações de Banco de Dados

O fluxo de trabalho **Deploy Prod** aplica as migrações pendentes por conta própria. Os bancos de dados hospedados só aceitam conexões de dentro da rede da Api, então um runner do GitHub não consegue alcançá-los; em vez disso, logo após o `serverless deploy`, o fluxo de trabalho invoca a função Lambda `migrate` da Api (`api-Prod-migrate`), que executa as migrações pendentes de todos os módulos com o mesmo executor desta aba e falha a implantação se algum módulo apresentar erro ou for recusado. **Rollback Prod** reverte apenas o código da Lambda; as migrações já aplicadas permanecem aplicadas. A aba **Migrações de Banco de Dados** serve para verificar o status, executar qualquer migração que a implantação não tenha executado (por exemplo, no ambiente de demonstração, cuja implantação não faz migrações) e registrar a linha de base de módulos sem histórico. (Instalações Docker auto-hospedadas ainda executam as migrações automaticamente quando o contêiner da Api é iniciado.)

A aba mostra o ambiente atual e uma linha por módulo (membership, attendance, giving etc.), com o status, o número de migrações aplicadas e pendentes e a última migração aplicada.

- **Executar Migrações Pendentes** aplica todas as migrações pendentes, um módulo por vez, em ordem. Ele para na primeira falha e mostra o que foi aplicado em cada módulo.
- Um módulo marcado como **Sem histórico** tem um banco de dados anterior ao controle de migrações. Ele nunca é executado automaticamente, pois isso reexecutaria migrações antigas de dados sobre tabelas em produção. Clique em **Verificar Esquema** nesse módulo. A Api compara as tabelas, colunas e índices criados por cada migração com o banco de dados em produção e marca cada migração como **Já aplicada**, **Ausente**, **Parcialmente aplicada** ou **Somente dados**. A verificação não altera nada.
- Nos resultados da verificação, **Registrar como Já Aplicada** grava as migrações detectadas no histórico de migrações sem executá-las (após confirmação). Tudo até a última migração **Já aplicada** é registrado, incluindo as **Somente dados** nesse intervalo; as **Ausentes** continuam pendentes e podem ser executadas normalmente com **Executar Migrações Pendentes**.
- Uma migração **Parcialmente aplicada** impede o registro. Se a migração puder ser executada novamente com segurança (leia-a antes), marque **Executar novamente** para que ela permaneça pendente e seja executada desde o início.

O painel Server Admin e a CLI (`yarn migrate:up`) usam o mesmo migrador Kysely e a mesma tabela `kysely_migration`, então sempre concordam sobre o que já foi aplicado. Os endpoints correspondentes são `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` e `POST .../:module/baseline`, todos exclusivos de Server.Admin.

## Páginas Relacionadas

- [Autenticação e Permissões](/docs/developer/api/endpoints/authentication) — Modelo de permissões e autenticação JWT
- [Endpoints de Membership](/docs/developer/api/endpoints/membership) — API de gerenciamento de usuários e igrejas
- [Log de Auditoria](/docs/b1-admin/reports/audit-log) — Visualize os logs de atividade de uma igreja
- [Arquitetura do Content Commons](/docs/developer/architecture/commons) — Modelo de recursos compartilhados e ciclo de moderação
