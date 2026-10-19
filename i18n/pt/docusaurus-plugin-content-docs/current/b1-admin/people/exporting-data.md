---
title: "Exportando Dados"
---

# Exportando Dados

<div class="article-intro">

O B1 Admin permite exportar os dados da sua igreja para usá-los em planilhas, compartilhá-los com a sua equipe ou manter um backup. Seja para uma lista rápida de nomes e e-mails ou para uma exportação completa do banco de dados, há opções para atender às suas necessidades.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta ativa no B1 Admin com permissão para visualizar os dados que deseja exportar. Veja [Funções e Permissões](roles-permissions.md) se não tiver certeza do seu nível de acesso.
- Para uma exportação completa do banco de dados, você precisa de acesso à área de **Configurações**.

</div>

## Exportando a Partir da Página de Pessoas

A forma mais rápida de exportar o seu diretório é diretamente pela página de **Pessoas**:

1. Abra o [Menu de atalho](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin), expanda **Pessoas** e clique em **Pessoas**.
2. Use a barra de pesquisa ou os filtros para restringir os resultados que deseja exportar (ou deixe sem filtro para exportar todos). Veja [Pesquisando Pessoas](searching-people.md) para dicas de filtragem.
3. Clique no botão **Exportar** no cabeçalho da página de Pessoas.
4. Um arquivo CSV será baixado para o seu computador com as pessoas que estão nos resultados atuais, incluindo nome, dados de contato, endereço e outros campos padrão.

:::tip
A exportação inclui todas as pessoas dos seus resultados atuais. Faça uma pesquisa, carregue uma [Lista Salva](./lists.md) ou use a busca **Avançada** primeiro para exportar apenas as pessoas de que você precisa.
:::

## Exportação Completa de Dados em Configurações {#full-data-export-from-settings}

Para uma exportação completa de todos os seus dados do B1 (não apenas de pessoas), use a ferramenta de exportação em Configurações:

1. No Menu de atalho, escolha **Configurações > Configurações**.
2. Clique no link **Importar/Exportar** abaixo do nome da sua igreja, no topo do menu lateral de configurações.
3. Selecione **Banco de Dados B1** na lista suspensa **Fonte de Dados**.
4. Revise a prévia dos dados e clique em **Continuar para o Destino**.
5. Selecione **Zip de Exportação B1** como destino da exportação.
6. Acompanhe o progresso da exportação até que todos os itens mostrem marcas de verificação verdes.
7. O arquivo de exportação será baixado automaticamente. Procure o arquivo `B1Export` na sua pasta de downloads.
8. Descompacte o arquivo para acessar os arquivos CSV individuais (como `people.csv`), que você pode abrir no Excel, no Google Sheets ou no Numbers.

:::info
O Zip de Exportação B1 é um backup completo dos dados da sua igreja. Ele contém:

- pessoas (com fotos) e famílias, incluindo os contatos de retirada da família
- campus, cultos e horários de culto
- grupos e membros de grupos
- fundos e doações, incluindo contribuições divididas entre vários fundos
- frequência
- formulários, perguntas, envios e respostas
- campos personalizados e seus valores
- listas de pessoas salvas

Se a foto de uma pessoa não puder ser baixada ou lida durante a exportação, essa foto é ignorada e a exportação continua sem ela.

Para restaurar os dados, escolha **Zip de Importação B1** como fonte e **Banco de Dados B1** como destino (veja [Importando Dados](./importing-data.md)). Famílias, contatos de retirada e listas salvas são reconstruídos junto com as pessoas. Os filtros das listas salvas passam a apontar para os grupos, fundos, campus e campos personalizados restaurados.
:::

## Exportando Dados de Grupos

Você também pode exportar as listas de membros de grupos individuais. Na página de **Grupos**, abra um grupo e clique no **ícone de download** para exportar a lista de membros desse grupo. Veja [Membros do Grupo](../groups/group-members.md) para mais detalhes.

:::info
Os arquivos CSV exportados funcionam com os principais aplicativos de planilha, incluindo Microsoft Excel, Google Sheets e Apple Numbers.
:::
