---
title: "Administração do Servidor"
---

# Administração do Servidor

<div class="article-intro">

Os recursos de administração do servidor em ChurchApps estão disponíveis apenas para usuários com permissão **Server.Admin**. Essas ferramentas são usadas para operações de plataforma, suporte e resolução de problemas em todas as igrejas do sistema.

</div>

:::warning Acesso Restrito
Os recursos descritos nesta página requerem permissão **Server.Admin** e não estão disponíveis para administradores regulares de chiesa. Destinam-se apenas aos operadores de plataforma e pessoal de suporte.
:::

## Acessando o Server Admin

Usuários com permissão Server.Admin podem acessar o painel de administração do servidor a partir de B1 Admin:

1. Faça login em [admin.b1.church](https://admin.b1.church)
2. Abra o [menu Jump](../b1-admin/introduction.md#getting-around-with-the-jump-menu), expanda **Settings** e clique em **Server Admin**. (Você também pode ir direto para `admin.b1.church/admin`.)
3. O painel Server Admin possui seções para Churches, Users, Impersonate User, Background Jobs, Commons, Usage Trends, Translation Lookups, Server Health e Database Migrations

## Representação de Usuário

O recurso de representação permite que administradores do servidor façam login como outro usuário para fins de suporte e resolução de problemas. Isto é útil ao investigar problemas relatados pelo usuário ou ao ajudar igrejas a configurar seus sistemas.

### Como Representar um Usuário

1. Abra a seção **Impersonate User** do painel Server Admin
2. Insira o nome ou endereço de email do usuário no campo de busca
3. Clique em **Search** ou pressione Enter
4. Nos resultados da busca, clique no usuário que deseja representar
5. Confirme a representação na caixa de diálogo que aparece
6. Você será conectado como esse usuário e redirecionado para sua conta

### Notas Importantes

- A representação cria uma nova sessão com as permissões e acesso de chiesa do usuário alvo
- Sua sessão de admin original termina quando você representa outro usuário
- Todas as ações realizadas enquanto representado são registradas no histórico de auditoria
- Para retornar à sua conta de admin, faça logout e faça login novamente com suas credenciais
- Use a representação apenas quando necessário para fins de suporte e sempre informe aos usuários ao acessar suas contas para suporte

### Endpoint API

O recurso de representação é apoiado pelo endpoint `/users/:userId/impersonate` na Membership API. Veja [Membership Endpoints](/docs/developer/api/endpoints/membership#users) para detalhes técnicos.

### Considerações de Segurança

- A representação requer permissão Server.Admin - essa permissão deve ser concedida com parcimônia e apenas para operadores de plataforma confiáveis
- Todos os eventos de representação são registrados com o ID do usuário admin e ID do usuário alvo
- As igrejas não são notificadas quando a representação ocorre, então estabeleça políticas claras para quando e como esse recurso deve ser usado
- Considere documentar eventos de representação em seu sistema de tickets de suporte para responsabilidade

## Moderação de Commons

Commons é a fila de moderação compartilhada para conteúdo enviado pelo usuário entre produtos — WorshipCommons songs, Lessons.church lessons, FreeShow templates e B1 website builder templates tudo flui através da mesma fila em vez de ferramentas de revisão por-produto separadas.

### Acessando Commons

1. Navegue até a aba **Commons** no painel Server Admin.
2. Você verá três sub-abas: **Queue**, **Reports** e **Assets**.

Uma função limitada de **music editor** também pode ver a aba Queue, mas é bloqueada de aprovar submissões que mudam os direitos ou licenciamento de uma música.

### Fila

A Fila lista cada submissão pendente entre todos os produtos, filtrável por produto e tipo de ativo. Cada linha mostra se a submissão é um ativo novo, uma edição pelo seu autor original ou uma edição por um terceiro, junto com o histórico de aprovação do remetente e há quanto tempo a submissão está esperando (sinalizado uma vez que passa 72 horas).

Clique em **Review** para abrir um painel com diffs em nível de campo, visualizações de arquivo e uma visualização incorporada somente leitura do item. Use os atalhos de teclado **a**/**r** para aprovar ou rejeitar, e **j**/**k** para mover para a próxima ou submissão anterior sem deixar o painel. Rejeitar requer selecionar um motivo (por exemplo qualidade, duplicata, licenciamento, ccli, ia ou fora do tópico) e uma nota.

### Relatórios

A aba Reports lida com relatórios de direitos autorais e política/qualidade contra ativos já publicados, divididos em filas Copyright e Policy & Other separadas mais um histórico Resolved. Reivindique um relatório para começar a trabalhar nele, então resolva-o com uma resolução (sustentado, descartado ou duplicata) e uma ação (nenhuma, despublicar ou remover).

### Ativos

A aba Assets é um navegador pesquisável de conteúdo publicado com ações para **Feature** um ativo (destaca-o na página inicial do produto), **Despublicar**/**Republicar** ou **Remover** (com motivo de direito autoral ou política).

Para músicas especificamente, este é também o lugar onde uma música torna-se **Sunday-ready** e elegível para aparecer na busca de música B1 Admin de uma chiesa: um revisor abre o ativo e marca cada chave publicada como **Listened** uma vez que a tenha ouvido e confirmado que a partitura, acordes e slides estejam todos presentes. Uma música apenas torna-se Sunday-ready uma vez que cada chave é verificada.

:::info
A moderação Commons é apenas para equipe — igrejas individuais nunca veem esta fila. O único lugar onde o B1 Admin de uma chiesa individual toca dados Commons é a seção "WorshipCommons — free" da [busca de música](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), que apenas superfícializa músicas que já passaram por este processo de revisão.
:::

Veja a página [Content Commons architecture](/docs/developer/architecture/commons) para o modelo de dados subjacente e ciclo de vida da submissão.

## Aprovação de Email de Grupo

As igrejas não podem enviar email escrito por igreja (email de grupo, acompanhamentos de formulário, emails de workflow e convites de conta) até que um administrador do servidor aprove. Isto evita que igrejas registradas por bot usem o endereço compartilhado de envio de ChurchApps para spam.

1. Abra a aba **Churches** no painel Server Admin.
2. Cada chiesa mostra um chip **Group Email**: **Approved** (verde) ou **Not approved** (contornado).
3. Clique no chip e confirme para aprovar a chiesa, ou para revogar uma aprovação.

Pessoal de chiesa solicita aprovação com o botão **Request review** no diálogo Send Email do B1Admin. O pedido é enviado para o endereço de suporte e lista o nome, ID, data de registro, local e quem pediu da chiesa. Uma chiesa pode enviar um pedido por semana. Veja [Church-authored email limits](/docs/developer/architecture/notifications#church-authored-email-limits) para a abonação diária e a pausa automática em rejeições e reclamações.

## Migrações de Banco de Dados

As implantações não mudam o banco de dados. Os bancos de dados hospedados apenas aceitam conexões de dentro da rede da Api, então após um lançamento que adiciona uma migração, um administrador do servidor a aplica na aba **Database Migrations**. (Instalações Docker auto-hospedadas ainda executam migrações automaticamente quando o container Api inicia.)

A aba mostra o ambiente atual e uma linha por módulo (membership, attendance, giving e assim por diante) com seu status, o número de migrações aplicadas e pendentes, e a última aplicada.

- **Run Pending Migrations** aplica cada migração pendente, um módulo por vez, em ordem. Ele para na primeira falha e mostra o que foi aplicado para cada módulo.
- Um módulo marcado **No history** tem um banco de dados que antecede o rastreamento de migração. Nunca é executado automaticamente, porque isso reproduziria antigas migrações de dados sobre tabelas ao vivo. Clique em **Check Schema** naquele módulo em vez disto. A Api compara as tabelas, colunas e índices que cada migração cria com o banco de dados ao vivo e marca cada migração **Already applied**, **Missing**, **Partly applied** ou **Data only**. Nada é alterado pela verificação.
- Nos resultados da verificação, **Record as Already Applied** escreve as migrações detectadas no histórico de migração sem executá-las (após uma confirmação). Tudo até a última migração **Already applied** é registrado, incluindo as **Data only** naquele intervalo; as **Missing** permanecem pendentes e podem então ser executadas normalmente com **Run Pending Migrations**.
- Uma migração **Partly applied** bloqueia gravação. Se a migração é segura de executar novamente (leia primeiro), marque **Re-run** para que ele permaneça pendente e execute novamente do início.

O painel Server Admin e o CLI (`yarn migrate:up`) usam o mesmo migrador Kysely e tabela `kysely_migration`, então sempre concordam no que foi aplicado. Os endpoints de apoio são `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` e `POST .../:module/baseline`, todos apenas Server.Admin.

## Páginas Relacionadas

- [Authentication & Permissions](/docs/developer/api/endpoints/authentication) — Modelo de permissão e autenticação JWT
- [Membership Endpoints](/docs/developer/api/endpoints/membership) — API de gerenciamento de usuário e chiesa
- [Audit Log](/docs/b1-admin/reports/audit-log) — Ver registros de atividade de uma chiesa
- [Content Commons Architecture](/docs/developer/architecture/commons) — Modelo de ativo compartilhado e ciclo de vida da moderação
