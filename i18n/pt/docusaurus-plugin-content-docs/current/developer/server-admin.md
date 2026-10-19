---
title: "Administração do Servidor"
---

# Administração do Servidor

<div class="article-intro">

Os recursos de administração do servidor nos ChurchApps estão disponíveis somente para usuários com a permissão **Server.Admin**. Essas ferramentas são usadas para operações da plataforma, suporte e solução de problemas em todas as igrejas do sistema.

</div>

:::warning Acesso Restrito
Os recursos descritos nesta página exigem a permissão **Server.Admin** e não estão disponíveis para administradores comuns das igrejas. Eles são destinados apenas a operadores da plataforma e à equipe de suporte.
:::

## Acessando a Administração do Servidor

Usuários com a permissão Server.Admin podem acessar o painel de administração do servidor pelo B1 Admin:

1. Faça login em [admin.b1.church](https://admin.b1.church)
2. Abra o [menu Jump](../b1-admin/introduction.md#getting-around-with-the-jump-menu), expanda **Configurações** e clique em **Administração do Servidor**. (Você também pode ir diretamente para `admin.b1.church/admin`.)
3. O painel de Administração do Servidor lista suas seções na lateral esquerda, em três grupos: **Diretório** (Igrejas, Usuários, Personificar Usuário), **Operações** (Tarefas em Segundo Plano, Commons, Tendências de Uso) e **Sistema** (Consultas de Tradução, Saúde do Servidor, Migrações de Banco de Dados)

## Personificação de Usuário

O recurso de personificação permite que administradores do servidor façam login como outro usuário para fins de suporte e solução de problemas. Isso é útil ao investigar problemas relatados por usuários ou ao ajudar igrejas a configurar seus sistemas.

### Como Personificar um Usuário

1. Abra a seção **Personificar Usuário** do painel de Administração do Servidor
2. Digite o nome ou o endereço de e-mail do usuário no campo de busca
3. Clique em **Pesquisar** ou pressione Enter
4. Nos resultados da busca, clique no usuário que você deseja personificar
5. Confirme a personificação na caixa de diálogo que aparece
6. Você será conectado como esse usuário e redirecionado para a conta dele

### Observações Importantes

- A personificação cria uma nova sessão com as permissões e o acesso às igrejas do usuário de destino
- Sua sessão administrativa original termina ao personificar outro usuário
- Todas as ações realizadas durante a personificação são registradas na trilha de auditoria
- Para voltar à sua conta de administrador, saia e faça login novamente com suas credenciais
- Use a personificação somente quando for necessário para o suporte e sempre informe os usuários quando acessar as contas deles para fins de suporte

### Endpoint da API

O recurso de personificação é suportado pelo endpoint `/users/:userId/impersonate` na API de Membership. Veja [Endpoints de Membership](/docs/developer/api/endpoints/membership#users) para detalhes técnicos.

### Considerações de Segurança

- A personificação exige a permissão Server.Admin -- essa permissão deve ser concedida com moderação e somente a operadores de plataforma de confiança
- Todos os eventos de personificação são registrados com o ID do usuário administrador e o ID do usuário de destino
- As igrejas não são notificadas quando a personificação ocorre, por isso estabeleça políticas claras sobre quando e como esse recurso deve ser usado
- Considere documentar os eventos de personificação no seu sistema de tickets de suporte para fins de responsabilização

## Moderação do Commons

O Commons é a fila de moderação compartilhada para conteúdos enviados pelos usuários em diversos produtos -- músicas do WorshipCommons, lições do Lessons.church, modelos do FreeShow e modelos do construtor de sites do B1 passam todos pela mesma fila, em vez de ferramentas de revisão separadas para cada produto.

### Acessando o Commons

1. Acesse a aba **Commons** no painel de Administração do Servidor.
2. Você verá três subabas: **Fila**, **Denúncias** e **Recursos**.

Um papel limitado de **editor de música** também pode ver a aba Fila, mas é impedido de aprovar envios que alterem os direitos ou o licenciamento de uma música.

### Fila

A Fila lista todos os envios pendentes de todos os produtos, com filtros por produto e tipo de recurso. Cada linha mostra se o envio é um novo recurso, uma edição feita pelo autor original ou uma edição feita por terceiros, além do histórico de aprovações do remetente e há quanto tempo o envio está aguardando (sinalizado quando passa de 72 horas).

Clique em **Revisar** para abrir uma gaveta com as diferenças campo a campo, as prévias dos arquivos e uma prévia somente leitura do item. Use os atalhos de teclado **a**/**r** para aprovar ou rejeitar, e **j**/**k** para passar para o envio seguinte ou anterior sem sair da gaveta. Para rejeitar, é preciso selecionar um motivo (por exemplo, qualidade, duplicado, licenciamento, ccli, ia ou fora do tema) e escrever uma observação.

### Denúncias

A aba Denúncias trata denúncias de direitos autorais e de política/qualidade feitas contra recursos já publicados, divididas em filas separadas de Direitos Autorais e de Política e Outros, além de um histórico de Resolvidas. Assuma uma denúncia para começar a trabalhar nela e depois resolva-a com uma resolução (mantida, descartada ou duplicada) e uma ação (nenhuma, despublicar ou remover).

### Recursos

A aba Recursos é um navegador pesquisável de conteúdos publicados, com ações para **Destacar** um recurso (ele passa a aparecer na página inicial do produto), **Despublicar**/**Republicar** ou **Remover** (com um motivo de direitos autorais ou de política).

No caso específico das músicas, é também aqui que uma música se torna **pronta para o domingo** e passa a poder aparecer na busca de músicas do B1 Admin de uma igreja: um revisor abre o recurso e marca cada tom publicado como **Ouvido** depois de ouvi-lo por completo e confirmar que a partitura, os acordes e os slides estão todos presentes. Uma música só fica pronta para o domingo quando todos os tons estiverem marcados.

:::info
A moderação do Commons é exclusiva da equipe -- igrejas individuais nunca veem essa fila. O único ponto em que o B1 Admin de uma igreja acessa dados do Commons é a seção "WorshipCommons -- gratuito" da [busca de músicas](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), que mostra apenas músicas que já passaram por esse processo de revisão.
:::

Veja a página [Arquitetura do Content Commons](/docs/developer/architecture/commons) para o modelo de dados subjacente e o ciclo de vida dos envios.

## Aprovação de E-mail de Grupo

As igrejas não podem enviar e-mails escritos pela própria igreja (e-mails de grupo, acompanhamentos de formulários, e-mails de fluxos de trabalho e convites de conta) até que um administrador do servidor aprove. Isso impede que igrejas registradas por bots usem o endereço de envio compartilhado da ChurchApps para spam.

1. Abra a aba **Igrejas** no painel de Administração do Servidor.
2. Cada igreja mostra um marcador **Group Email**: **Aprovado** (verde) ou **Não aprovado** (contorno).
3. Clique no marcador e confirme para aprovar a igreja ou para revogar uma aprovação.

A equipe da igreja solicita a aprovação com o botão **Solicitar revisão** na caixa de diálogo Enviar E-mail do B1 Admin. A solicitação é enviada por e-mail ao endereço de suporte e lista o nome da igreja, o ID, a data de registro, a localização e quem fez o pedido. Uma igreja pode enviar uma solicitação por semana. Veja [Limites de e-mail escrito pela igreja](/docs/developer/architecture/notifications#church-authored-email-limits) para a cota diária e a pausa automática em caso de devoluções e reclamações.

## Migrações de Banco de Dados {#database-migrations}

O fluxo de trabalho **Deploy Prod** aplica as migrações pendentes por conta própria. Os bancos de dados hospedados aceitam conexões apenas de dentro da rede da Api, então um runner do GitHub não consegue alcançá-los; em vez disso, logo após o `serverless deploy`, o fluxo de trabalho invoca a Lambda `migrate` da Api (`api-Prod-migrate`), que executa as migrações pendentes de cada módulo com o mesmo runner desta aba e falha a implantação se algum módulo apresentar erro ou for recusado. O **Rollback Prod** reverte apenas o código da Lambda; as migrações já aplicadas permanecem aplicadas. A aba **Migrações de Banco de Dados** serve para verificar o status, executar o que uma implantação não executou (por exemplo, no ambiente de demonstração, cuja implantação não faz migrações) e registrar a linha de base de módulos sem histórico. (Instalações Docker self-hosted ainda executam as migrações automaticamente quando o contêiner da Api inicia.)

A aba mostra o ambiente atual e uma linha por módulo (membership, attendance, giving e assim por diante), com seu status, o número de migrações aplicadas e pendentes e a última aplicada.

- **Executar Migrações Pendentes** aplica todas as migrações pendentes, um módulo por vez, em ordem. Ele para na primeira falha e mostra o que foi aplicado em cada módulo.
- Um módulo marcado como **Sem histórico** tem um banco de dados anterior ao rastreamento de migrações. Ele nunca é executado automaticamente, porque isso reexecutaria antigas migrações de dados sobre tabelas em produção. Clique em **Verificar Esquema** nesse módulo. A API compara as tabelas, colunas e índices que cada migração cria com o banco de dados em produção e marca cada migração como **Já aplicada**, **Ausente**, **Parcialmente aplicada** ou **Somente dados**. A verificação não altera nada.
- Nos resultados da verificação, **Registrar como Já Aplicada** grava as migrações detectadas no histórico de migrações sem executá-las (após confirmação). Tudo até a última migração **Já aplicada** é registrado, incluindo as **Somente dados** dentro desse intervalo; as **Ausentes** permanecem pendentes e podem então ser executadas normalmente com **Executar Migrações Pendentes**.
- Uma migração **Parcialmente aplicada** bloqueia o registro. Se a migração for segura para ser executada novamente (leia-a antes), marque **Reexecutar** para que ela permaneça pendente e seja executada novamente desde o início.

O painel de Administração do Servidor e a CLI (`yarn migrate:up`) usam o mesmo migrador do Kysely e a mesma tabela `kysely_migration`, por isso sempre concordam sobre o que já foi aplicado. Os endpoints correspondentes são `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` e `POST .../:module/baseline`, todos exclusivos para Server.Admin.

## Páginas Relacionadas

- [Autenticação e Permissões](/docs/developer/api/endpoints/authentication) — Modelo de permissões e autenticação JWT
- [Endpoints de Membership](/docs/developer/api/endpoints/membership) — API de gerenciamento de usuários e igrejas
- [Log de Auditoria](/docs/b1-admin/reports/audit-log) — Visualize os logs de atividade de uma igreja
- [Arquitetura do Content Commons](/docs/developer/architecture/commons) — Modelo de recursos compartilhados e ciclo de vida da moderação
