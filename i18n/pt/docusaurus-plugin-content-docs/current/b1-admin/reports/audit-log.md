---
title: "Log de Auditoria"
---

# Log de Auditoria

<div class="article-intro">

O log de auditoria rastreia todas as ações e alterações significativas em seu sistema de gerenciamento de igreja. Use-o para revisar atividade de login, rastrear quem fez alterações em registros de pessoas, monitorar atualizações de permissões e manter responsabilidade em toda sua equipe.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Conta da B1 Admin com acesso de administrador do servidor
- Navegue até **Configurações** para encontrar o Log de Auditoria

</div>

## Visualizando o Log de Auditoria

1. Vá para **Configurações** na B1 Admin.
2. Selecione **Log de Auditoria**.
3. O log exibe entradas recentes em uma tabela com as seguintes colunas:
   - **Data** -- Quando a ação ocorreu.
   - **Categoria** -- O tipo de ação (codificada por cores para varredura rápida).
   - **Ação** -- O que foi feito (por exemplo, criar, atualizar, excluir, login_success).
   - **Entidade** -- O tipo e ID do registro que foi afetado.
   - **Endereço IP** -- O endereço IP do usuário que realizou a ação.
   - **Detalhes** -- Um resumo das alterações específicas feitas.

## Filtrando o Log

Use os filtros no topo da página para restringir os resultados:

- **Categoria** -- Filtrar por tipo de ação:
  - **Todas as Categorias** -- Mostrar tudo.
  - **Login** -- Sucessos e falhas de login.
  - **Pessoas** -- Criação, atualização ou exclusão de registros de pessoas.
  - **Permissões** -- Concessões e revogações de permissões.
  - **Doações** -- Alterações de registros de doações.
  - **Grupos** -- Ações de gerenciamento de grupos.
  - **Formulários** -- Atividade de envio de formulários.
  - **Configurações** -- Alterações de configuração.
- **Data de Início** -- Mostrar entradas desta data em diante.
- **Data de Término** -- Mostrar entradas até esta data.

Clique em **Pesquisar** depois de definir seus filtros para atualizar os resultados.

## Compreendendo Categorias

Cada categoria é codificada por cores para identificação rápida:

- **Login** -- Chip azul. Rastreia tentativas de login bem-sucedidas e falhadas.
- **Pessoas** -- Chip roxo. Rastreia criações, atualizações e exclusões de registros de pessoas.
- **Permissões** -- Chip vermelho. Rastreia quando direitos de acesso são concedidos ou revogados.
- **Doações** -- Chip verde. Rastreia alterações de registros de doações.
- **Grupos** -- Chip cinza. Rastreia operações de gerenciamento de grupos.
- **Formulários** -- Chip laranja. Rastreia atividade de envio de formulários.
- **Configurações** -- Chip amarelo. Rastreia alterações de configuração.

## Exportando o Log

Quando as entradas do log são exibidas, um botão **Download CSV** aparece. Clique nele para exportar os resultados filtrados atuais para uma planilha para análise offline ou manutenção de registros.

## Paginação

Use os controles de paginação na parte inferior da tabela para navegar pelos resultados. Você pode exibir 25, 50 ou 100 entradas por página.

:::info
As entradas do log de auditoria são automaticamente retidas por um ano. As entradas com mais de 365 dias são removidas para manter o sistema eficiente.
:::

:::tip
Revise o log de auditoria regularmente, especialmente depois de integrar novos membros da equipe ou fazer alterações significativas de configuração. Ajuda a identificar atividades inesperadas cedo.
:::

## Artigos Relacionados

- [Papéis e Permissões](../settings/roles-permissions) -- Gerencie quem tem acesso ao quê
- [Segurança de Dados](../settings/data-security) -- Compreenda como seus dados são protegidos
- [Visão Geral de Relatórios](./index.md) -- Veja todos os relatórios disponíveis
