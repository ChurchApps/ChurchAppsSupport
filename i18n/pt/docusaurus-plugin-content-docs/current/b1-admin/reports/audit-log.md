---
title: "Log de auditoria"
description: "Revise o log de auditoria no B1 Admin para ver quem fez login, editou registros de pessoas ou alterou permissões, e exporte as entradas filtradas para CSV."
---

# Log de auditoria

<div class="article-intro">

O log de auditoria registra todas as ações e alterações relevantes em todo o seu sistema de gestão da igreja. Use-o para revisar a atividade de login, acompanhar quem fez alterações nos registros de pessoas, monitorar atualizações de permissões e manter a responsabilidade dentro da sua equipe.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Uma função com a permissão **Editar configurações da igreja** (na seção **Conteúdo** das permissões de uma função; é a mesma permissão que abre **Configurações**). Veja [Funções e permissões](../settings/roles-permissions.md).

</div>

## Visualizando o log de auditoria {#viewing-the-audit-log}

1. Abra o [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo do B1 Admin) e expanda **Configurações**.
2. Clique em **Log de auditoria**.
3. O log exibe as entradas recentes em uma tabela com as seguintes colunas:
   - **Data** -- Quando a ação ocorreu.
   - **Módulo** -- A parte do B1 em que a alteração foi feita (por exemplo, membros ou doações).
   - **Categoria** -- O tipo de registro ou ação (com cores para facilitar a leitura rápida).
   - **Ação** -- O que foi feito (por exemplo, Doação salva, Login realizado com sucesso, Anotação atualizada).
   - **Entidade** -- O tipo e o ID do registro afetado.
   - **Endereço IP** -- O endereço IP do usuário que realizou a ação.
4. Clique na seta no início de uma linha para ver os detalhes: uma tabela com cada campo alterado, com o **Valor anterior** e o **Novo valor**, ou o **Registro excluído** no caso de uma exclusão.

## Filtrando o log {#filtering-the-log}

Use os filtros no topo da página para refinar os resultados:

- **Módulo** -- Filtre por área: **Todos os módulos**, **Pessoas**, **Doações**, **Presença**, **Mensagens**, **Conteúdo**, **Escalas** ou **Lições**.
- **Categoria** -- Filtre por tipo de ação:
  - **Todas as categorias** -- Mostra tudo.
  - **Login** -- Logins bem-sucedidos e com falha.
  - **Pessoas** -- Criação, atualização ou exclusão de registros de pessoas.
  - **Permissões** -- Concessões e revogações de permissões.
  - **Doações** -- Alterações em registros de doações.
  - **Grupos** -- Ações de gestão de grupos.
  - **Formulários** -- Atividade de envio de formulários.
  - **Configurações** -- Alterações de configuração.
- **Data inicial** -- Mostra entradas a partir desta data.
- **Data final** -- Mostra entradas até esta data.

Clique em **Pesquisar** depois de definir os filtros para atualizar os resultados.

## Entendendo as categorias {#understanding-categories}

A categoria de cada entrada é mostrada como um marcador colorido, para identificação rápida:

- **login** -- Marcador azul. Registra tentativas de login bem-sucedidas e com falha.
- **person** -- Marcador azul. Registra a criação, atualização e exclusão de registros de pessoas.
- **permission** -- Marcador vermelho. Registra quando direitos de acesso são concedidos ou revogados.
- **donation** -- Marcador verde. Registra alterações em registros de doações.
- **form** -- Marcador laranja. Registra a atividade de envio de formulários.
- **group**, **settings** e outras categorias (como **userchurch**) -- Marcador cinza.

## Histórico de anotações de pessoas e grupos {#note-history-on-people-and-groups}

Se você pode abrir o log de auditoria, também verá um registro das anotações alteradas exatamente onde elas ficam, na aba **Anotações** de uma pessoa ou grupo:

1. Uma anotação editada mostra **(editada · ver histórico)** ao lado da data. Clique nesse texto para abrir o log de auditoria filtrado pelo histórico de anotações daquela pessoa ou grupo.
2. Uma anotação excluída deixa um marcador acinzentado **Anotação excluída** no lugar, mostrando quem a escreveu, quando foi publicada e quando foi excluída. Clique em **Ver histórico** para abrir o mesmo log filtrado.
3. No log filtrado, expanda uma entrada **Anotação atualizada** ou **Anotação excluída** para ver o texto antigo e a conta que fez a alteração. Clique em **Mostrar tudo** para limpar o filtro.
4. Na coluna **Entidade**, o ID de uma anotação de pessoa ou grupo leva de volta às anotações dessa pessoa ou grupo.

Membros da equipe que não podem abrir o log de auditoria veem a lista de anotações sem esses marcadores.

## Exportando o log {#exporting-the-log}

Quando as entradas do log estão exibidas, um botão **Exportar CSV** aparece no topo da página. Clique nele para exportar os resultados filtrados atuais para uma planilha, para revisão offline ou para manter registros.

## Paginação {#pagination}

Use os controles de paginação na parte inferior da tabela para navegar pelos resultados. Você pode exibir 25, 50 (o padrão) ou 100 entradas por página.

:::info
As entradas do log de auditoria são retidas automaticamente por um ano. Entradas com mais de 365 dias são removidas para manter o sistema com bom desempenho.
:::

:::tip
Revise o log de auditoria regularmente, especialmente depois de integrar novos membros da equipe ou fazer alterações significativas de configuração. Isso ajuda a identificar atividades inesperadas logo no início.
:::

## Artigos relacionados {#related-articles}

- [Funções e permissões](../settings/roles-permissions.md) -- Gerencie quem tem acesso a quê
- [Segurança de dados](../settings/data-security.md) -- Entenda como seus dados são protegidos
- [Visão geral de relatórios](./index.md) -- Veja todos os relatórios disponíveis
