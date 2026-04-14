---
title: "Log de Auditoria"
---

# Log de Auditoria

<div class="article-intro">

O log de auditoria rastreia todas as ações significativas e mudanças em todo seu sistema de gerenciamento de igreja. Use-o para revisar atividade de login, rastrear quem fez mudanças em registros de pessoas, monitorar atualizações de permissão e manter responsabilidade em toda sua equipe.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Conta B1 Admin com acesso de server admin
- Navegue até **Settings** para encontrar o Audit Log

</div>

## Visualizando o Log de Auditoria

1. Vá para **Settings** no B1 Admin.
2. Selecione **Audit Log**.
3. O log exibe entradas recentes em uma tabela com as seguintes colunas:
   - **Date** -- Quando a ação ocorreu.
   - **Category** -- O tipo de ação (código de cores para varredura rápida).
   - **Action** -- O que foi feito (por exemplo, create, update, delete, login_success).
   - **Entity** -- O tipo e ID do registro que foi afetado.
   - **IP Address** -- O endereço IP do usuário que realizou a ação.
   - **Details** -- Um resumo das mudanças específicas feitas.

## Filtrando o Log

Use os filtros no topo da página para estreitar os resultados:

- **Category** -- Filtro por tipo de ação:
  - **All Categories** -- Mostre tudo.
  - **Login** -- Sucessos e falhas de login.
  - **People** -- Criando, atualizando ou deletando registros de pessoa.
  - **Permissions** -- Concessões e revogações de permissão.
  - **Donations** -- Mudanças de registros de doação.
  - **Groups** -- Ações de gerenciamento de grupo.
  - **Forms** -- Atividade de submissão de formulário.
  - **Settings** -- Mudanças de configuração.
- **Start Date** -- Mostre entradas a partir desta data.
- **End Date** -- Mostre entradas até esta data.

Clique em **Search** após definir seus filtros para atualizar os resultados.

## Entendendo Categorias

Cada categoria é código de cores para identificação rápida:

- **Login** -- Chip azul. Rastreia tentativas de login bem-sucedidas e falhadas.
- **People** -- Chip roxo. Rastreia cria, atualiza e deleta de registros de pessoa.
- **Permissions** -- Chip vermelho. Rastreia quando direitos de acesso são concedidos ou revogados.
- **Donations** -- Chip verde. Rastreia mudanças de registros de doação.
- **Groups** -- Chip cinzento. Rastreia operações de gerenciamento de grupo.
- **Forms** -- Chip laranja. Rastreia atividade de submissão de formulário.
- **Settings** -- Chip amarelo. Rastreia mudanças de configuração.

## Exportando o Log

Quando as entradas de log são exibidas, um botão **CSV download** aparece. Clique nele para exportar os resultados filtrados atuais para uma planilha para revisão offline ou manutenção de registros.

## Paginação

Use os controles de paginação na parte inferior da tabela para navegar através dos resultados. Você pode exibir 25, 50 ou 100 entradas por página.

:::info
As entradas de log de auditoria são automaticamente retidas por um ano. Entradas mais antigas que 365 dias são removidas para manter o sistema performático.
:::

:::tip
Revise o log de auditoria regularmente, especialmente depois de integrar novos membros da equipe ou fazer mudanças significativas de configuração. Ajuda a identificar atividade inesperada cedo.
:::

## Artigos Relacionados

- [Roles & Permissions](../settings/roles-permissions) -- Gerencie quem tem acesso ao quê
- [Data Security](../settings/data-security) -- Entenda como seus dados são protegidos
- [Reports Overview](./index) -- Veja todos os relatórios disponíveis
