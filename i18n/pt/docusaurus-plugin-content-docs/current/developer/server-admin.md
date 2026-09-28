---
title: "Administração do Servidor"
---

# Administração do Servidor

<div class="article-intro">

As funcionalidades de administração do servidor em ChurchApps estão disponíveis apenas para usuários com a permissão **Server.Admin**. Essas ferramentas são usadas para operações de plataforma, suporte e resolução de problemas em todas as igrejas do sistema.

</div>

:::warning Acesso Restrito
As funcionalidades descritas nesta página requerem permissão **Server.Admin** e não estão disponíveis para administradores regulares de igrejas. Elas se destinam apenas a operadores de plataforma e pessoal de suporte.
:::

## Acessando Administração do Servidor

Usuários com permissão Server.Admin podem acessar o painel de administração do servidor a partir do B1 Admin:

1. Faça login em [admin.b1.church](https://admin.b1.church)
2. Abra **Configurações**, depois clique em **Administração do Servidor** no menu Configurações. (Você também pode ir diretamente para `admin.b1.church/admin`.)
3. O painel de Administração do Servidor tem seções para Igrejas, Usuários, Impersonar Usuário, Trabalhos em Segundo Plano, Commons, Tendências de Uso, Pesquisas de Tradução, Integridade do Servidor e Migrações de Banco de Dados

## Representação de Usuário

O recurso de representação permite que administradores do servidor façam login como outro usuário para fins de suporte e resolução de problemas. Isso é útil ao investigar problemas relatados por usuários ou ajudar igrejas a configurar seus sistemas.

### Como Representar um Usuário

1. Abra a seção **Impersonar Usuário** do painel de Administração do Servidor
2. Digite o nome ou endereço de email do usuário no campo de pesquisa
3. Clique em **Pesquisar** ou pressione Enter
4. Nos resultados da pesquisa, clique no usuário que você deseja representar
5. Confirme a representação no diálogo que aparece
6. Você será conectado como esse usuário e redirecionado para sua conta

### Notas Importantes

- A representação cria uma nova sessão com as permissões do usuário alvo e acesso à igreja
- Sua sessão de admin original termina quando você representa outro usuário
- Todas as ações tomadas enquanto representado são registradas no rastro de auditoria
- Para retornar à sua conta de admin, faça logout e faça login novamente com suas credenciais
- Use representação apenas quando necessário para fins de suporte e sempre informe os usuários ao acessar suas contas para suporte

### Endpoint da API

O recurso de representação é apoiado pelo endpoint `/users/:userId/impersonate` na API de Associação. Veja [Endpoints de Associação](/docs/developer/api/endpoints/membership#users) para detalhes técnicos.

### Considerações de Segurança

- A representação requer permissão Server.Admin - essa permissão deve ser concedida com moderação e apenas a operadores de plataforma confiáveis
- Todos os eventos de representação são registrados com a ID de usuário admin e a ID de usuário alvo
- As igrejas não são notificadas quando ocorre representação, portanto estabeleça políticas claras para quando e como esse recurso deve ser usado
- Considere documentar eventos de representação em seu sistema de tíquete de suporte para responsabilidade

## Moderação de Commons

Commons é a fila de moderação compartilhada para conteúdo enviado por usuários em todos os produtos — músicas WorshipCommons, lições Lessons.church, modelos FreeShow e modelos de construtor de sites B1 — todos fluem através da mesma fila em vez de ferramentas de revisão separadas por produto.

### Acessando Commons

1. Navegue até a guia **Commons** no painel de Administração do Servidor.
2. Você verá três subabas: **Fila**, **Relatórios** e **Ativos**.

Um papel limitado de **editor de música** também pode ver a guia Fila, mas é bloqueado de aprovar envios que alterem os direitos ou licenciamento de uma música.

### Fila

A Fila lista cada envio pendente em todos os produtos, filtrável por produto e tipo de ativo. Cada linha mostra se o envio é um novo ativo, uma edição pelo seu autor original, ou uma edição por um terceiro, junto com o histórico de aprovação do remetente e há quanto tempo o envio está aguardando (sinalizado uma vez que passa 72 horas).

Clique em **Revisar** para abrir um painel com diffs no nível do campo, visualizações de arquivo e uma visualização incorporada somente leitura do item. Use os atalhos de teclado **a**/**r** para aprovar ou rejeitar, e **j**/**k** para passar para o próximo ou envio anterior sem sair do painel. Rejeitar requer seleção de uma razão (por exemplo, qualidade, duplicado, licenciamento, ccli, ia, ou fora do tópico) e uma nota.

### Relatórios

A guia Relatórios lida com relatórios de direitos autorais e política/qualidade arquivados contra ativos já publicados, divididos em filas separadas de Direitos Autorais e Política & Outro mais um histórico Resolvido. Reivindique um relatório para começar a trabalhar nele, depois resolva-o com uma resolução (mantido, descartado ou duplicado) e uma ação (nenhum, despublicar ou remover).

### Ativos

A guia Ativos é um navegador pesquisável de conteúdo publicado com ações para **Destacar** um ativo (destaca-o na página inicial do produto), **Despublicar**/**Republica** ou **Remover** (com um direito autoral ou razão de política).

Para músicas especificamente, este é também onde uma música se torna **Pronta para Domingo** e elegível para aparecer em uma pesquisa de música do B1 Admin de uma igreja: um revisor abre o ativo e marca cada chave publicada como **Ouvida** uma vez que a tenha ouvido e confirmado a partitura, acordes e slides estão todos presentes. Uma música só se torna Pronta para Domingo uma vez que cada chave está marcada.

:::info
A moderação de Commons é apenas para equipe — igrejas individuais nunca veem essa fila. O único lugar onde o B1 Admin de uma igreja individual toca dados de Commons é a seção "WorshipCommons — gratuito" da [pesquisa de música](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), que apenas exibe músicas que já passaram por este processo de revisão.
:::

Veja a página [Arquitetura de Content Commons](/docs/developer/architecture/commons) para o modelo de dados subjacente e ciclo de vida de envio.

## Aprovação de Email em Grupo

As igrejas não podem enviar email escrito por Igreja (email em grupo, acompanhamentos de formulário, emails de fluxo de trabalho e convites de conta) até que um administrador do servidor aprove-os. Isso evita que igrejas registradas por bot usem o endereço de envio ChurchApps compartilhado para spam.

1. Abra a guia **Igrejas** no painel de Administração do Servidor.
2. Cada Igreja mostra um chip **Email em Grupo**: **Aprovado** (verde) ou **Não aprovado** (esboço).
3. Clique no chip e confirme para aprovar a Igreja, ou para revogar uma aprovação.

O pessoal da Igreja pede aprovação com o botão **Solicitar revisão** no diálogo Enviar Email do B1 Admin. A solicitação é enviada por email para o endereço de suporte e lista o nome da Igreja, ID, data de registro, localização e quem pediu. Uma Igreja pode enviar um pedido por semana. Veja [Limites de email escrito por Igreja](/docs/developer/architecture/notifications#church-authored-email-limits) para a permissão diária e a pausa automática em devoluções e reclamações.

## Migrações de Banco de Dados

Os deploys não alteram o banco de dados. Os bancos de dados hospedados apenas aceitam conexões de dentro da rede da Api, portanto após um release que adiciona uma migração, um administrador do servidor a aplica a partir da guia **Migrações de Banco de Dados**. (Instalações Docker auto-hospedadas ainda executam migrações automaticamente quando o contêiner da Api inicia.)

A guia mostra o ambiente atual e uma linha por módulo (associação, presença, doação, e assim por diante) com seu status, o número de migrações aplicadas e pendentes, e a última aplicada.

- **Executar Migrações Pendentes** aplica cada migração pendente, um módulo de cada vez, em ordem. Para na primeira falha e mostra o que foi aplicado para cada módulo.
- Um módulo marcado como **Sem histórico** tem um banco de dados que antecede o rastreamento de migração. Ele nunca é executado automaticamente, porque isso reproduziria antigas migrações de dados em tabelas ativas. Clique em **Verificar Esquema** naquele módulo em vez disso. A Api compara as tabelas, colunas e índices que cada migração cria com o banco de dados ativo e marca cada migração **Já aplicada**, **Ausente**, **Parcialmente aplicada** ou **Apenas dados**. Nada é alterado pela verificação.
- Nos resultados da verificação, **Registrar como Já Aplicada** escreve as migrações detectadas no histórico de migração sem executá-las. As que faltam permanecem pendentes e podem então ser executadas normalmente.
- Uma migração **Parcialmente aplicada** bloqueia o registro. Se a migração for segura para executar novamente (leia-a primeiro), marque **Re-executar** para que permaneça pendente e seja executada novamente do início.

O painel de Administração do Servidor e a CLI (`yarn migrate:up`) usam o mesmo migrador Kysely e tabela `kysely_migration`, então sempre concordam sobre o que foi aplicado. Os endpoints de apoio são `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` e `POST .../:module/baseline`, todos apenas Server.Admin.

## Páginas Relacionadas

- [Authentication & Permissions](/docs/developer/api/endpoints/authentication) — Modelo de permissão e autenticação JWT
- [Membership Endpoints](/docs/developer/api/endpoints/membership) — API de gerenciamento de usuário e Igreja
- [Audit Log](/docs/b1-admin/reports/audit-log) — Ver logs de atividade para uma Igreja
- [Content Commons Architecture](/docs/developer/architecture/commons) — Modelo de ativo compartilhado e ciclo de vida de moderação
