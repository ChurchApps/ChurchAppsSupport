---
title: "Log de Auditoria"
---

# Log de Auditoria

<div class="article-intro">

O log de auditoria rastreia todas as ações e alterações significativas em todo o seu sistema de gerenciamento de igrejas. Use-o para revisar atividades de login, rastrear quem fez alterações em registros de pessoas, monitorar atualizações de permissões e manter responsabilidade em toda a sua equipe.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Conta B1 Admin com acesso de administrador de servidor
- Navegue até **Configurações** para encontrar o Log de Auditoria

</div>

## Visualizando o Log de Auditoria

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin) e expanda **Configurações**.
2. Clique em **Log de Auditoria**.
3. O log exibe entradas recentes em uma tabela com as seguintes colunas:
   - **Data** -- Quando a ação ocorreu.
   - **Categoria** -- O tipo de ação (codificado por cores para varredura rápida).
   - **Ação** -- O que foi feito (por exemplo, criar, atualizar, excluir, sucesso_login).
   - **Entidade** -- O tipo e ID do registro que foi afetado.
   - **Endereço IP** -- O endereço IP do usuário que realizou a ação.
   - **Detalhes** -- Um resumo das alterações específicas feitas.

## Filtrando o Log

Use os filtros na parte superior da página para reduzir os resultados:

- **Categoria** -- Filtrar por tipo de ação:
  - **Todas as Categorias** -- Mostrar tudo.
  - **Login** -- Sucessos e falhas de login.
  - **Pessoas** -- Criação, atualização ou exclusão de registros de pessoa.
  - **Permissões** -- Concessões e revogações de permissões.
  - **Doações** -- Alterações de registro de doação.
  - **Grupos** -- Ações de gerenciamento de grupo.
  - **Formulários** -- Atividade de envio de formulário.
  - **Configurações** -- Alterações de configuração.
- **Data de Início** -- Mostrar entradas a partir desta data em diante.
- **Data de Término** -- Mostrar entradas até esta data.

Clique em **Pesquisar** após definir seus filtros para atualizar os resultados.

## Compreendendo Categorias

Cada categoria é codificada por cores para identificação rápida:

- **Login** -- Chip azul. Rastreia tentativas de login bem-sucedidas e falhadas.
- **Pessoas** -- Chip roxo. Rastreia criações, atualizações e exclusões de registros de pessoa.
- **Permissões** -- Chip vermelho. Rastreia quando direitos de acesso são concedidos ou revogados.
- **Doações** -- Chip verde. Rastreia alterações de registro de doação.
- **Grupos** -- Chip cinza. Rastreia operações de gerenciamento de grupo.
- **Formulários** -- Chip laranja. Rastreia atividade de envio de formulário.
- **Configurações** -- Chip amarelo. Rastreia alterações de configuração.

## Exportando o Log

Quando as entradas do log são exibidas, um botão **download de CSV** aparece. Clique nele para exportar os resultados filtrados atuais para uma planilha para revisão offline ou manutenção de registros.

## Paginação

Use os controles de paginação na parte inferior da tabela para navegar pelos resultados. Você pode exibir 25, 50 ou 100 entradas por página.

:::info
As entradas de log de auditoria são automaticamente retidas por um ano. Entradas com mais de 365 dias são removidas para manter o sistema performático.
:::

:::tip
Revise o log de auditoria regularmente, especialmente após integrar novos membros da equipe ou fazer alterações significativas de configuração. Isso ajuda a identificar atividades inesperadas no início.
:::

## Artigos Relacionados

- [Funções e Permissões](../settings/roles-permissions) -- Gerenciar quem tem acesso ao quê
- [Segurança de Dados](../settings/data-security) -- Entender como seus dados são protegidos
- [Visão Geral de Relatórios](./index.md) -- Veja todos os relatórios disponíveis
