---
title: "Exportar dados"
---

# Exportar dados

<div class="article-intro">

O B1 Admin permite exportar os dados da sua igreja para que você possa usá-los em planilhas, compartilhá-los com sua equipe ou manter um backup. Se você precisa de uma lista rápida de nomes e e-mails ou de uma exportação completa do banco de dados, há opções para atender às suas necessidades.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de uma conta B1 Admin ativa com permissão para visualizar os dados que deseja exportar. Consulte [Funções e permissões](roles-permissions.md) se não tiver certeza sobre seu nível de acesso.
- Para uma exportação completa do banco de dados, você precisa de acesso à área de **Configurações**.

</div>

## Exportando da página Pessoas

A maneira mais rápida de exportar seu diretório é diretamente da página **Pessoas**:

1. Navegue até **Pessoas** na barra lateral esquerda.
2. Use a barra de pesquisa ou filtros para restringir os resultados que deseja exportar (ou deixe sem filtro para exportar todos). Consulte [Pesquisar pessoas](searching-people.md) para dicas de filtragem.
3. Use o **seletor de colunas** para escolher quais colunas incluir na exportação (por exemplo, Nome, E-mail, Telefone, Endereço).
4. Clique no botão **Exportar**.
5. Um arquivo CSV será baixado no seu computador com os dados atualmente exibidos na tabela.

:::tip
Personalize suas colunas antes de exportar. O arquivo CSV incluirá exatamente as colunas que você tem visíveis, para que possa adaptar a exportação às suas necessidades sem editar o arquivo depois.
:::

## Exportação completa de dados pelas Configurações

Para uma exportação completa de todos os seus dados do B1 (não apenas pessoas), use a ferramenta de exportação nas Configurações:

1. Clique em **Configurações** na barra lateral esquerda.
2. Clique em **Importar/Exportar** na navegação superior.
3. Selecione **B1 Database** no menu suspenso **Fonte de dados**.
4. Revise a prévia dos dados e clique em **Continuar para destino**.
5. Selecione **B1 Export Zip** como destino de exportação.
6. Monitore o progresso da exportação até que todos os itens mostrem marcas de verificação verdes.
7. O arquivo de exportação será baixado automaticamente. Procure o arquivo `B1Export` na sua pasta de downloads.
8. Descompacte o arquivo para acessar arquivos CSV individuais (como `people.csv`) que você pode abrir no Excel, Google Sheets ou Numbers.

:::info
Exportações completas de dados incluem pessoas, grupos, doações, presença e mais -- tudo no seu banco de dados B1. Esta também é uma ótima maneira de criar um backup periódico dos registros da sua igreja.
:::

## Exportando dados de grupos

Você também pode exportar listas de membros para grupos individuais. Na página **Grupos**, abra um grupo e clique no **ícone de download** para exportar a lista de membros desse grupo. Consulte [Membros do grupo](../groups/group-members.md) para mais detalhes.

:::info
Arquivos CSV exportados funcionam com todos os principais aplicativos de planilha, incluindo Microsoft Excel, Google Sheets e Apple Numbers.
:::
