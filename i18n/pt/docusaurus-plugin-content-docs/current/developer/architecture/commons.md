---
title: "Content Commons"
description: "Como músicas, lições e modelos enviados por usuários passam pela fila de moderação compartilhada no Server Admin do B1 Admin, do envio à publicação."
---

# Content Commons — Biblioteca de Recursos Compartilhados e Moderação

O conteúdo enviado por usuários e compartilhado entre produtos (músicas do WorshipCommons, lições do Lessons.church, modelos do FreeShow, modelos de site do B1) passa por uma única fila de moderação, e não por um fluxo de revisão separado para cada produto. Esta página aborda o ciclo de envio e aprovação, o modelo de dados compartilhado dos recursos e onde fica a moderação.

## A espinha dorsal dos recursos

Duas tabelas armazenam todos os itens do commons, independentemente do produto:

- **`assets`** — o registro público de identidade. `status`: `pending` | `published` | `unpublished` | `removed`. Os dados específicos de cada tipo (detalhes da música, autores) ficam em tabelas satélite, unidas por `assetId`.
- **`assetFiles`** — todos os arquivos anexados a um recurso (áudio, imagens, documentos), substituindo as antigas colunas `path` e `files` (separadas por vírgula) das tabelas de conteúdo individuais.
- **`submissions`** — a unidade de moderação. Ciclo de vida: `draft → pending → approved | rejected | withdrawn`. Um envio pode ser um recurso totalmente novo ou uma edição de um recurso já publicado, feita pelo autor original ou por terceiros.

Ao aprovar um envio, é executado um **gancho de publicação** específico do produto (`Api/src/modules/commons/helpers/publishHooks/`, por exemplo `song.ts`), que transforma o envio em registros próprios do produto.

## Fluxo de envio

`CommonsSubmissionController` (`Api/src/modules/commons/`) é a API voltada para o usuário final: criar um rascunho, gerar URLs pré-assinadas e anexar arquivos, enviar para revisão ou retirar o envio. Seus clientes reais são sites produtores externos (o site do WorshipCommons, o Lessons.church, o FreeShow e a galeria de modelos de site do B1), e não o B1Admin.

## Consumo voltado para as igrejas

Além da moderação, o B1Admin também lê diretamente a espinha dorsal do commons. Na busca "Add Song" de Serving → Songs, ele consulta `GET /songs?sundayReady=true` junto com o banco de músicas externo já existente, exibindo as músicas publicadas do WorshipCommons que a equipe marcou como prontas para o domingo (veja o portão de audição abaixo), com um selo de licença. Ao selecionar uma delas, o novo `SongDetail` é vinculado à sua origem por meio de `songDetailLinks`. Este é o único caminho em que o B1Admin de uma igreja individual acessa dados do commons diretamente, em vez de passar pelas ferramentas exclusivas da equipe em Server Admin. Para a descrição voltada para as igrejas, consulte a seção [Free Songs from WorshipCommons](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons) da documentação de suporte.

## Fila de moderação

A fila fica em **B1Admin → Server Admin → Commons** (`B1Admin/src/serverAdmin/components/CommonsTab.tsx`) e é protegida pela permissão `Permissions.server.admin`, a mesma que controla o acesso a Churches/Impersonate/Jobs nessa página. Trata-se de uma ferramenta interna, exclusiva da equipe da ChurchApps, e não algo que as igrejas individuais veem.

Três abas:

- **Queue** — todos os envios pendentes de todos os produtos, com filtros por produto ou tipo de recurso. Cada linha mostra um selo de novo recurso, edição pelo autor ou edição por terceiro, o histórico de aprovações do remetente, um resumo das diferenças nos campos e arquivos, e a idade do envio (sinalizada após 72 horas). **Review** abre uma gaveta com as diferenças campo a campo, pré-visualizações dos arquivos e uma pré-visualização somente leitura do produto incorporada. Approve/Reject aceitam atalhos de teclado (j/k para navegar, a/r para agir).
- **Reports** — denúncias de direitos autorais e de política/qualidade sobre recursos publicados, divididas em duas filas e um histórico de resolvidas. Um membro da equipe assume uma denúncia e a resolve com uma decisão (mantida/descartada/duplicada) e uma ação (nenhuma/despublicar/remover).
- **Assets** — um navegador pesquisável de conteúdo publicado, com ações por recurso: destacar, despublicar/republicar ou remover (motivo: direitos autorais/política). Para músicas, o **portão de audição** nesta aba é o que torna uma música "pronta para o domingo": a equipe a marca depois de ouvir todas as tonalidades publicadas e confirmar que a partitura, os acordes e os slides estão todos presentes.

Todo endpoint em `/commons/admin/*` (`CommonsAdminController.ts`) verifica novamente, de forma independente, a permissão de administrador do servidor.

:::info
Este modelo tem intencionalmente uma única fila: a interface de moderação `/admin` do próprio WorshipCommons foi desativada, e os envios de todos os produtos passaram a ser direcionados para as ferramentas Server Admin do B1Admin.
:::

## Abrangência

Api (módulo commons), B1Admin (Server Admin) e os sites produtores externos: WorshipCommons, Lessons.church, FreeShow e os modelos do construtor de sites do B1.
