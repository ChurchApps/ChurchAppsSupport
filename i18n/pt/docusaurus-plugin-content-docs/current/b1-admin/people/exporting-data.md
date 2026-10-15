---
title: "Exportando Dados"
---

# Exportando Dados

<div class="article-intro">

O B1 Admin permite exportar os dados da sua igreja para usar em planilhas, compartilhar com sua equipe ou manter como backup. Seja para uma lista rápida de nomes e e-mails ou uma exportação completa do banco de dados, há opções para atender às suas necessidades.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta ativa no B1 Admin com permissão para visualizar os dados que deseja exportar. Consulte [Funções e Permissões](roles-permissions.md) se não tiver certeza do seu nível de acesso.
- Para uma exportação completa do banco de dados, você precisa de acesso à área de **Configurações**.

</div>

## Exportando a Partir da Página de Pessoas

A forma mais rápida de exportar seu diretório é diretamente pela página **Pessoas**:

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin), expanda **Pessoas** e clique em **Pessoas**.
2. Use a barra de pesquisa ou os filtros para restringir os resultados que deseja exportar (ou deixe sem filtro para exportar todos). Consulte [Pesquisando Pessoas](searching-people.md) para dicas de filtragem.
3. Clique no botão **Exportar** no cabeçalho da página Pessoas.
4. Um arquivo CSV será baixado para o seu computador com as pessoas que estão atualmente nos seus resultados, incluindo nome, informações de contato, endereço e outros campos padrão.

:::tip
A exportação inclui todas as pessoas dos seus resultados atuais. Faça uma pesquisa, carregue uma [Lista Salva](./lists.md) ou use a pesquisa **Avançada** primeiro para exportar apenas as pessoas de que você precisa.
:::

## Exportação Completa de Dados em Configurações

Para uma exportação completa de todos os dados do seu B1 (não apenas pessoas), use a ferramenta de exportação em Configurações:

1. No menu Jump, escolha **Configurações > Configurações**.
2. Clique no link **Importar/Exportar** abaixo do nome da sua igreja, no topo do menu de configurações à esquerda.
3. Selecione **Banco de Dados B1** no menu suspenso **Fonte de Dados**.
4. Revise a prévia dos dados e clique em **Continuar para o Destino**.
5. Selecione **B1 Export Zip** como destino da exportação.
6. Acompanhe o progresso da exportação até que todos os itens mostrem marcas de verificação verdes.
7. O arquivo de exportação será baixado automaticamente. Procure o arquivo `B1Export` na sua pasta de downloads.
8. Descompacte o arquivo para acessar os arquivos CSV individuais (como `people.csv`), que você pode abrir no Excel, Google Planilhas ou Numbers.

:::info
O B1 Export Zip é um backup completo dos dados da sua igreja. Ele contém:

- pessoas (com fotos) e domicílios, incluindo os contatos de retirada dos domicílios
- campi, cultos e horários de culto
- grupos e membros de grupos
- fundos e doações, incluindo ofertas divididas entre vários fundos
- presença
- formulários, perguntas, respostas e respostas enviadas
- campos personalizados e seus valores
- listas salvas de pessoas

Para restaurá-lo, escolha **B1 Import Zip** como fonte e **Banco de Dados B1** como destino (consulte [Importando Dados](./importing-data.md)). Domicílios, contatos de retirada e listas salvas são recriados junto com as pessoas. Os filtros das listas salvas são direcionados para os grupos, fundos, campi e campos personalizados restaurados.
:::

## Exportando Dados de Grupos

Você também pode exportar as listas de membros de grupos individuais. Na página **Grupos**, abra um grupo e clique no **ícone de download** para exportar a lista de membros desse grupo. Consulte [Membros do Grupo](../groups/group-members.md) para mais detalhes.

:::info
Os arquivos CSV exportados funcionam com todos os principais aplicativos de planilhas, incluindo Microsoft Excel, Google Planilhas e Apple Numbers.
:::
