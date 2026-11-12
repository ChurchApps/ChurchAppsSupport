---
title: "Exportando dados"
description: "Exporte pessoas para CSV, listas de membros de grupos ou um backup completo do banco de dados do B1 pelo B1 Admin, e veja o conteúdo do arquivo ZIP de exportação do B1."
---

# Exportando dados

<div class="article-intro">

O B1 Admin permite exportar os dados da sua igreja para usá-los em planilhas, compartilhá-los com a equipe ou manter um backup. Seja para uma lista rápida de nomes e e-mails ou para uma exportação completa do banco de dados, há opções para cada necessidade.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de uma conta ativa no B1 Admin com permissão para visualizar os dados que deseja exportar. Veja [Funções e permissões](roles-permissions.md) se não tiver certeza do seu nível de acesso.
- Para uma exportação completa do banco de dados, você precisa de acesso à área **Configurações**.

</div>

## Exportando a partir da página Pessoas {#exporting-from-the-people-page}

A forma mais rápida de exportar o seu diretório é diretamente na página **Pessoas**:

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin), expanda **Pessoas** e clique em **Pessoas**.
2. Use a barra de pesquisa ou os filtros para restringir os resultados que deseja exportar (ou deixe sem filtro para exportar todas as pessoas). Veja [Pesquisando pessoas](searching-people.md) para dicas de filtragem.
3. Clique no botão **Exportar** no cabeçalho da página Pessoas.
4. Um arquivo CSV chamado `people.csv` será baixado para o seu computador, com as pessoas que estiverem nos resultados atuais, incluindo nome, dados de contato, endereço e outros campos padrão. Se você não tiver feito nenhuma pesquisa, a exportação inclui todo o diretório, mesmo que a página mostre apenas a primeira parte dele.

:::tip
A exportação inclui todas as pessoas dos seus resultados atuais. Faça uma pesquisa, carregue uma [Lista salva](./lists.md) ou use primeiro a pesquisa **Avançada** para exportar apenas as pessoas de que você precisa.
:::

## Exportação completa de dados em Configurações {#full-data-export-from-settings}

Para uma exportação completa de todos os dados do B1 (não apenas das pessoas), use a ferramenta de exportação em Configurações:

1. No menu Jump, escolha **Configurações > Configurações**.
2. Clique no link **Importar/Exportar** abaixo do nome da sua igreja, no topo do menu de configurações à esquerda.
3. Selecione **Banco de dados do B1** na lista suspensa **Fonte de dados**.
4. Revise a prévia dos dados e clique em **Continuar para o destino**.
5. Selecione **B1 Export Zip** como destino da exportação.
6. Acompanhe o andamento da exportação até que todos os itens mostrem marcas de verificação verdes.
7. O arquivo de exportação será baixado automaticamente. Procure o arquivo `B1Export` na pasta de downloads.
8. Descompacte o arquivo para acessar os arquivos CSV individuais (como `people.csv`), que podem ser abertos no Excel, no Google Sheets ou no Numbers.

:::info
O B1 Export Zip é um backup completo dos dados da sua igreja. Ele contém:

- pessoas (com fotos) e domicílios, incluindo os contatos de retirada dos domicílios
- campi, cultos e horários de culto
- grupos e membros dos grupos
- fundos e doações, incluindo contribuições divididas entre vários fundos
- presença
- formulários, perguntas, envios e respostas
- campos personalizados e seus valores
- listas salvas de pessoas

Se a foto de uma pessoa não puder ser baixada ou lida durante a exportação, essa foto é ignorada e a exportação continua sem ela.

Para restaurá-lo, escolha **B1 Import Zip** como origem e **Banco de dados do B1** como destino (veja [Importando dados](./importing-data.md)). Domicílios, contatos de retirada e listas salvas são recriados junto com as pessoas. Os filtros das listas salvas passam a apontar para os grupos, fundos, campi e campos personalizados restaurados.
:::

## Exportando dados de grupos {#exporting-group-data}

Você também pode exportar as listas de membros de grupos individuais. Na página **Grupos**, abra um grupo e clique no **ícone de download** para exportar a lista de membros desse grupo. Veja [Membros do grupo](../groups/group-members.md) para mais detalhes.

:::info
Os arquivos CSV exportados funcionam com os principais aplicativos de planilha, incluindo Microsoft Excel, Google Sheets e Apple Numbers.
:::
