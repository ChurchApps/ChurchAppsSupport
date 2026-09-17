---
title: "Revisando Solicitações de Exclusão de Conta"
---

# Revisando Solicitações de Exclusão de Conta

<div class="article-intro">

Quando uma igreja tem um Grupo de Aprovação de Diretório configurado, a exclusão de conta não acontece mais instantaneamente - a solicitação de um membro se torna uma tarefa que seu grupo de aprovação revisa antes de qualquer coisa ser removida. Esta página explica como a solicitação é feita, como aprovar ou recusar e o que acontece em cada caso.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Um **Grupo de Aprovação de Diretório** deve ser configurado em **Mobile → Portal do Membro**. Sem um, clicar em **Deletar minha conta** na página Perfil ainda exclui a conta imediatamente, sem etapa de revisão. Consulte [Configurações do Aplicativo Móvel](../settings/mobile-app.md).
- Aprovar ou recusar uma solicitação requer a permissão **Pessoas > Editar**.

</div>

## Como um Membro Solicita Exclusão

A exclusão de conta é solicitada na página **Meu Perfil** - a mesma página de conta compartilhada abordada em [Gerenciando Seu Perfil](./managing-profile.md) - sob sua seção **Exclusão de Conta**. Quando um grupo de aprovação está configurado, confirmar a solicitação não exclui nada imediatamente. Em vez disso:

1. Cria uma tarefa aberta intitulada **"Solicitação de exclusão de conta"**, atribuída ao Grupo de Aprovação de Diretório, em **Servindo → Tarefas**.
2. Desabilita o botão **Deletar minha conta** para essa pessoa e mostra um aviso de que a solicitação está aguardando revisão.

Enviar uma segunda solicitação enquanto uma já está aberta apenas reabre a mesma tarefa - uma pessoa pode ter apenas uma solicitação de exclusão pendente por vez.

## Revisando uma Solicitação

1. Vá para **Servindo → Tarefas** (ou **Atribuído aos Meus Grupos** no seu painel de controle, o mesmo lugar que [solicitações de mudança de perfil](./approving-profile-changes.md) aparecem).
2. Abra a tarefa intitulada **"Solicitação de exclusão de conta de *Nome*"**.
3. Você verá duas ações: **Aprovar exclusão** e **Recusar**.

### Aprovando

Confirme **"Anonimizar permanentemente o registro desta pessoa e remover seu login? Isto não pode ser desfeito."** Isto substitui as informações pessoais da pessoa por valores genéricos (a mesma anonimização usada pela ação **Gerenciamento de Dados > Anonimizar** no registro de uma pessoa - consulte [Segurança de Dados](../settings/data-security.md)) e remove seu login. A tarefa fecha automaticamente e o membro é notificado de que sua solicitação foi aprovada.

### Recusando

Recusar requer um motivo, porque o GDPR permite apenas recusar uma solicitação de exclusão por uma exceção legal:

- **Retenção legal** (doações, impostos ou registros de emprego)
- **Necessário para uma reivindicação legal**
- **Outro** - explicar na caixa de texto (pelo menos 10 caracteres)

O membro é notificado da decisão junto com o motivo que você forneceu, e pode reenviar sua solicitação ou escalar para uma autoridade supervisora se discordar.

:::info
As igrejas têm 30 dias para responder a uma solicitação de exclusão. A tarefa vence em 28 dias, e o grupo de aprovação recebe lembretes automáticos se ainda estiver aberta após 21 e 27 dias.
:::

:::tip
Solicitações de exclusão e mudança de perfil usam o mesmo Grupo de Aprovação de Diretório e o mesmo fluxo de revisão baseado em Tarefas - consulte [Aprovando Mudanças de Perfil](./approving-profile-changes.md) se você também precisar revisar solicitações de atualização de diretório.
:::

## Artigos Relacionados

- [Gerenciando Seu Perfil](./managing-profile.md) - Onde os membros solicitam exclusão de sua própria conta
- [Aprovando Mudanças de Perfil](./approving-profile-changes.md) - O fluxo de revisão semelhante para solicitações de atualização de diretório
- [Segurança de Dados](../settings/data-security.md) - Conformidade com GDPR e anonimização iniciada por admin
- [Configurações do Aplicativo Móvel](../settings/mobile-app.md) - Configurando o Grupo de Aprovação de Diretório
