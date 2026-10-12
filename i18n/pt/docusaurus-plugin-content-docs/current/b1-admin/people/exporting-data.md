---
title: "Exportando Dados"
---

# Exportando Dados

<div class="article-intro">

B1 Admin permite que você exporte os dados da sua igreja para que você possa usá-los em planilhas, compartilhá-los com seu time ou manter um backup. Se você precisar de uma lista rápida de nomes e emails ou uma exportação de banco de dados completa, há opções para atender suas necessidades.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta B1 Admin ativa com permissão para visualizar os dados que deseja exportar. Veja [Funções e Permissões](roles-permissions.md) se não tiver certeza sobre seu nível de acesso.
- Para uma exportação de banco de dados completa, você precisa ter acesso à área de **Settings**.

</div>

## Exportando da Página de Pessoas

A maneira mais rápida de exportar seu diretório é diretamente da página **People**:

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin), expanda **People** e clique em **People**.
2. Use a barra de pesquisa ou filtros para estreitar os resultados que você deseja exportar (ou deixe sem filtro para exportar todos). Veja [Pesquisando Pessoas](searching-people.md) para dicas sobre filtragem.
3. Clique no botão **Export** no cabeçalho da página Pessoas.
4. Um arquivo CSV será baixado para seu computador com as pessoas atualmente presentes nos seus resultados, incluindo nome, informações de contato, endereço e outros campos padrão.

:::tip
A exportação inclui todas as pessoas nos seus resultados atuais. Faça uma pesquisa, carregue uma [Lista Salva](./lists.md) ou use a pesquisa **Avançada** antes para exportar apenas as pessoas de que você precisa.
:::

## Exportação Completa de Dados das Configurações

Para uma exportação completa de todos os seus dados B1 (não apenas pessoas), use a ferramenta de exportação em Configurações:

1. No menu Jump, escolha **Settings > Settings**.
2. Clique no link **Import/Export** abaixo do nome da sua igreja, no topo do menu de configurações à esquerda.
3. Selecione **B1 Database** do dropdown **Data Source**.
4. Revise a visualização de dados e clique em **Continue to Destination**.
5. Selecione **B1 Export Zip** como destino de exportação.
6. Monitore o progresso da exportação até que todos os itens mostrem marcas de seleção verdes.
7. O arquivo de exportação será baixado automaticamente. Procure pelo arquivo `B1Export` em sua pasta de downloads.
8. Descompacte o arquivo para acessar arquivos CSV individuais (como `people.csv`) que você pode abrir em Excel, Google Sheets ou Numbers.

:::info
Exportações completas de dados incluem pessoas, grupos, doações, frequência e muito mais — tudo em seu banco de dados B1. Esta também é uma ótima maneira de criar um backup periódico dos registros da sua igreja.
:::

## Exportando Dados do Grupo

Você também pode exportar listas de membros para grupos individuais. A partir da página **Groups**, abra um grupo e clique em **Exportar** acima da lista de membros do grupo para baixá-la. Veja [Membros do Grupo](../groups/group-members.md) para mais detalhes.

:::info
Arquivos CSV exportados funcionam com todos os principais aplicativos de planilha, incluindo Microsoft Excel, Google Sheets e Apple Numbers.
:::
