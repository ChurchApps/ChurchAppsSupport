---
title: "Exportando Dados"
---

# Exportando Dados

<div class="article-intro">

B1 Admin permite que você exporte seus dados da igreja para que você possa usá-los em planilhas, compartilhá-los com sua equipe ou fazer uma cópia de segurança. Se você precisa de uma lista rápida de nomes e emails ou uma exportação completa do banco de dados, há opções para se adequar às suas necessidades.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta B1 Admin ativa com permissão para visualizar os dados que deseja exportar. Consulte [Funções e Permissões](roles-permissions.md) se não tiver certeza sobre seu nível de acesso.
- Para uma exportação completa do banco de dados, você precisa ter acesso à área **Configurações**.

</div>

## Exportando da Página de Pessoas

A maneira mais rápida de exportar seu diretório é diretamente da página **Pessoas**:

1. Abra o **menu de seção** no canto superior esquerdo e escolha **Pessoas**.
2. Use a barra de pesquisa ou filtros para estreitar os resultados que deseja exportar (ou deixe sem filtros para exportar todos). Consulte [Pesquisando Pessoas](searching-people.md) para dicas sobre filtragem.
3. Use o **seletor de coluna** para escolher quais colunas você quer incluir na exportação (por exemplo, Nome, Email, Telefone, Endereço).
4. Clique no botão **Exportar**.
5. Um arquivo CSV será baixado para seu computador com os dados atualmente mostrados na tabela.

:::tip
Personalize suas colunas antes de exportar. O arquivo CSV incluirá exatamente as colunas que você tem visíveis, para que você possa adaptar a exportação às suas necessidades sem editar o arquivo depois.
:::

## Exportação Completa de Dados de Configurações

Para uma exportação completa de todos os seus dados B1 (não apenas pessoas), use a ferramenta de exportação em Configurações:

1. Abra o **menu de seção** no canto superior esquerdo e escolha **Configurações**.
2. Clique em **Importar/Exportar** na navegação superior.
3. Selecione **Banco de Dados B1** no menu suspenso **Fonte de Dados**.
4. Revise a visualização de dados e clique em **Continuar para Destino**.
5. Selecione **B1 Export Zip** como destino de exportação.
6. Monitore o progresso da exportação até que todos os itens mostrem marcas de seleção verdes.
7. O arquivo de exportação será baixado automaticamente. Procure o arquivo `B1Export` em sua pasta de downloads.
8. Descompacte o arquivo para acessar arquivos CSV individuais (como `people.csv`) que você pode abrir no Excel, Google Sheets ou Numbers.

:::info
Exportações completas de dados incluem pessoas, grupos, doações, presença e muito mais -- tudo em seu banco de dados B1. Esta é também uma ótima maneira de criar uma cópia de segurança periódica dos registros da sua igreja.
:::

## Exportando Dados do Grupo

Você também pode exportar listas de membros de grupos individuais. Na página **Grupos**, abra um grupo e clique no **ícone de download** para exportar a lista de membros daquele grupo. Consulte [Membros do Grupo](../groups/group-members.md) para mais detalhes.

:::info
Arquivos CSV exportados funcionam com todos os principais aplicativos de planilhas, incluindo Microsoft Excel, Google Sheets e Apple Numbers.
:::
