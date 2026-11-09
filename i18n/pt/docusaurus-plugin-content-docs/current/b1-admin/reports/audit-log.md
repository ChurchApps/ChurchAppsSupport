---
title: "Log de auditoria"
description: "Revise o log de auditoria no B1 Admin para ver quem entrou, quem editou registros de pessoas ou alterou permissões, e exporte as entradas filtradas em CSV."
---

# Log de auditoria

<div class="article-intro">

O log de auditoria registra todas as ações e alterações significativas no seu sistema de gestão da igreja. Use-o para revisar a atividade de login, acompanhar quem fez alterações nos registros de pessoas, monitorar as mudanças de permissões e manter a responsabilidade em toda a sua equipe.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Conta do B1 Admin com acesso de administrador do servidor
- Acesse **Configurações** para encontrar o Log de auditoria

</div>

## Visualizando o log de auditoria

1. Abra o [menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin) e expanda **Configurações**.
2. Clique em **Log de auditoria**.
3. O log exibe as entradas recentes em uma tabela com as seguintes colunas:
   - **Data** -- Quando a ação ocorreu.
   - **Categoria** -- O tipo de ação (com cores para facilitar a leitura).
   - **Ação** -- O que foi feito (por exemplo, create, update, delete, login_success).
   - **Entidade** -- O tipo e o ID do registro afetado.
   - **Endereço IP** -- O endereço IP do usuário que realizou a ação.
   - **Detalhes** -- Um resumo das alterações específicas feitas.

## Filtrando o log

Use os filtros no topo da página para reduzir os resultados:

- **Categoria** -- Filtra por tipo de ação:
  - **Todas as categorias** -- Mostra tudo.
  - **Login** -- Logins bem-sucedidos e com falha.
  - **Pessoas** -- Criação, atualização ou exclusão de registros de pessoas.
  - **Permissões** -- Concessões e revogações de permissões.
  - **Doações** -- Alterações nos registros de doações.
  - **Grupos** -- Ações de gestão de grupos.
  - **Formulários** -- Atividade de envio de formulários.
  - **Configurações** -- Alterações de configuração.
- **Data de início** -- Mostra as entradas a partir desta data.
- **Data de término** -- Mostra as entradas até esta data.

Clique em **Pesquisar** depois de definir os filtros para atualizar os resultados.

## Entendendo as categorias

Cada categoria tem uma cor para facilitar a identificação:

- **Login** -- Etiqueta azul. Registra as tentativas de login bem-sucedidas e com falha.
- **Pessoas** -- Etiqueta roxa. Registra a criação, a atualização e a exclusão de registros de pessoas.
- **Permissões** -- Etiqueta vermelha. Registra quando direitos de acesso são concedidos ou revogados.
- **Doações** -- Etiqueta verde. Registra alterações nos registros de doações.
- **Grupos** -- Etiqueta cinza. Registra as operações de gestão de grupos.
- **Formulários** -- Etiqueta laranja. Registra a atividade de envio de formulários.
- **Configurações** -- Etiqueta amarela. Registra as alterações de configuração.

## Histórico de anotações em pessoas e grupos

Se você puder abrir o log de auditoria, também verá o registro das anotações alteradas diretamente onde elas estão, na aba **Anotações** de uma pessoa ou de um grupo:

1. Uma anotação editada mostra **(editada · ver histórico)** ao lado da data. Clique nesse texto para abrir o log de auditoria filtrado pelo histórico de anotações dessa pessoa ou desse grupo.
2. Uma anotação excluída deixa, no lugar, um marcador esmaecido **Anotação excluída**, com quem a escreveu, quando foi publicada e quando foi excluída. Clique em **Ver histórico** para abrir o mesmo log filtrado.
3. No log filtrado, expanda uma entrada **Anotação atualizada** ou **Anotação excluída** para ver o texto antigo e a conta que fez a alteração. Clique em **Mostrar tudo** para limpar o filtro.
4. Na coluna **Entidade**, o ID de uma anotação de pessoa ou de grupo fica vinculado de volta às anotações dessa pessoa ou desse grupo.

Quem não pode abrir o log de auditoria vê a lista de anotações sem esses marcadores.

## Exportando o log

Quando as entradas do log estão exibidas, aparece um botão de **download em CSV**. Clique nele para exportar os resultados filtrados atuais para uma planilha, para revisão offline ou para manter registros.

## Paginação

Use os controles de paginação na parte inferior da tabela para navegar pelos resultados. Você pode exibir 25, 50 ou 100 entradas por página.

:::info
As entradas do log de auditoria são retidas automaticamente por um ano. As entradas com mais de 365 dias são removidas para manter o sistema ágil.
:::

:::tip
Revise o log de auditoria regularmente, especialmente depois de integrar novos membros da equipe ou fazer alterações significativas de configuração. Isso ajuda a identificar atividades inesperadas logo no início.
:::

## Artigos relacionados

- [Funções e permissões](../settings/roles-permissions.md) -- gerencie quem tem acesso a quê
- [Segurança de dados](../settings/data-security.md) -- entenda como os seus dados são protegidos
- [Visão geral de relatórios](./index.md) -- veja todos os relatórios disponíveis
