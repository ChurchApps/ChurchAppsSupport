---
title: "Zapier"
description: "Conecte o B1 Admin ao Zapier para iniciar automações com novas pessoas, doações e membros de grupos, e gravar registros de volta no B1 sem programar."
---

# Zapier

<div class="article-intro">

O aplicativo oficial do B1.church no Zapier permite que um Zap reaja a eventos da sua igreja (nova pessoa, nova doação, novo membro de grupo, …) e grave registros de volta no B1. Sem programação, sem infraestrutura -- você monta tudo no editor de arrastar e soltar do Zapier, cola uma chave de API e ativa o Zap.

</div>

:::caution Aguardando a aprovação do Zapier
O aplicativo B1.church está pronto e funcionando, mas ainda aguarda a revisão do Zapier antes de aparecer publicamente no diretório de apps do editor de Zaps. Até ser aprovado, somente contas convidadas podem usá-lo. Tudo o que está abaixo descreve como ele funcionará depois da aprovação.
:::

<div class="prereqs">
<h4>Antes de começar</h4>

- Uma conta no [Zapier](https://zapier.com) (o plano gratuito basta para alguns Zaps)
- Um administrador da igreja com a permissão **Editar configurações** no B1Admin (você criará uma chave de API)
- Uma ideia do que você quer fazer -- por exemplo, "quando uma pessoa for adicionada no B1, incluí-la na minha lista do Mailchimp"

</div>

## Gatilhos e ações {#triggers-and-actions}

| Tipo | O que faz | Evento / endpoint do B1 |
|---|---|---|
| **Gatilho** | Nova pessoa | `person.created` |
| **Gatilho** | Pessoa atualizada | `person.updated` |
| **Gatilho** | Nova doação | `donation.created` |
| **Gatilho** | Novo membro de grupo | `group.member.added` |
| **Gatilho** | Novo envio de formulário | `form.submission.created` |
| **Ação** | Criar pessoa | adiciona uma nova pessoa |
| **Ação** | Adicionar doação | registra uma doação |
| **Ação** | Adicionar membro ao grupo | adiciona uma pessoa a um grupo |
| **Ação** | Encontrar pessoa | busca uma pessoa por ID, e-mail ou nome; interrompe a tarefa se ninguém corresponder |

Combine-os livremente com qualquer um dos mais de 7.000 apps compatíveis com o Zapier.

## Configuração {#setup}

### 1. Crie uma chave de API do B1 {#1-create-a-b1-api-key}

1. No B1Admin, acesse **Configurações → Desenvolvedor → Chaves de API**.
2. Clique em **Nova chave de API**, dê um nome como "Zapier" e selecione os escopos de que o Zap precisa.
3. **Importante:** inclua sempre o escopo **`settings:write`**. O Zapier verifica a chave contra a lista de webhooks do B1 quando você a conecta, e os gatilhos do B1 registram um webhook em seu nome quando o Zap é ativado -- ambos exigem `settings:write`. Uma chave sem ele falha no teste de conexão, mesmo que os seus Zaps usem apenas ações do B1.
4. Conceda também os escopos que as ações precisam -- por exemplo, a ação "Adicionar doação" precisa de `donations:write`, e "Criar pessoa" precisa de `people:write`.
5. Salve. A chave completa `cak_…` é exibida **uma única vez** -- copie-a.

### 2. Conecte o Zapier ao B1 {#2-connect-zapier-to-b1}

1. No Zapier, crie um novo Zap.
2. Quando você escolher um gatilho ou uma ação do B1 pela primeira vez, o Zapier pedirá que você **faça login no B1.church**.
3. Cole a chave de API da etapa 1 no campo **API Key** (deixe **API URL** em branco) e clique em **Yes, Continue**. O Zapier valida a chave com a sua igreja.

A conexão fica salva no Zapier e é reutilizada por todos os Zaps da sua conta.

### 3. Monte o Zap {#3-build-the-zap}

Escolha um gatilho e depois adicione uma ou mais etapas de ação. Os exemplos abaixo mostram como.

## Receitas comuns {#common-recipes}

### Adicionar novas pessoas do B1 ao Mailchimp {#add-new-b1-people-to-mailchimp}

- **Gatilho** -- B1: Nova pessoa
- **Ação** -- Mailchimp: Adicionar/atualizar assinante. Mapeie `name__first`, `name__last` e `contactInfo__email` do B1 para os campos Nome, Sobrenome e E-mail do Mailchimp.

### Publicar doações em um canal do Slack com um cartão mais completo do que o conector integrado {#post-donations-to-a-slack-channel-with-a-richer-card-than-the-built-in-connector}

- **Gatilho** -- B1: Nova doação
- **Ação** -- Slack: Enviar mensagem no canal. Componha qualquer layout -- botões, anexos etc. -- que o [conector Slack integrado](./slack-discord.md) não consegue fazer.

### Adicionar novos membros de grupos a um Grupo do Google {#add-new-group-members-to-a-google-group}

- **Gatilho** -- B1: Novo membro de grupo
- **Ação** -- Filtro pelo Zapier: continue somente se o `groupId` do gatilho for o grupo do B1 que você deseja
- **Ação** -- B1: Encontrar pessoa (use o `personId` do gatilho para buscar o e-mail)
- **Ação** -- Grupos do Google: Adicionar membro

### Encaminhar envios de formulários para um gerenciador de projetos {#forward-form-submissions-to-a-project-tracker}

- **Gatilho** -- B1: Novo envio de formulário
- **Ação** -- Notion / Linear / Asana / Trello: Criar página / issue / tarefa

## Como os gatilhos funcionam por dentro {#how-triggers-work-under-the-hood}

Os gatilhos são **REST hooks**, e não consultas periódicas -- o Zapier não consulta o B1 a cada 15 minutos. Quando você ativa o Zap, o Zapier pede ao B1 que registre um webhook apontando para uma URL privada do Zapier; quando o evento acontece, o B1 envia o envelope para o Zapier e o seu Zap começa **em poucos segundos**. Ao desativar o Zap, o Zapier pede ao B1 que exclua o webhook -- sem assinaturas órfãs.

Isso significa que o gatilho só dispara para eventos que acontecem **depois** de o Zap ser ativado. Não há retroação: ativar um Zap não reprocessa as doações de ontem.

## Limites e observações {#limits--notes}

- **Vários Zaps com o mesmo gatilho** registram, cada um, o seu próprio webhook no B1 -- não há conflito, mas vale saber caso você esteja olhando **Configurações → Desenvolvedor → Webhooks** e estranhe as três linhas idênticas `Zapier — donation.created`.
- **Dados de teste na configuração do Zap** -- ao montar um Zap, o Zapier pede dados de exemplo para mapear os campos. Ele busca o evento correspondente mais recente no B1, se houver; caso contrário, usa um exemplo sintético da definição do app.
- **Falhas de ação aparecem como erros do Zap** no histórico de tarefas do Zapier. Causa comum: uma chave de API sem o escopo certo (por exemplo, a ação "Adicionar doação" precisa de `donations:write`). Gere a chave novamente com os escopos corretos e reconecte no Zapier.
- **Cotas de chamadas de API de saída** -- cada chamada à API do B1 feita por uma ação conta para a sua cota de tarefas do Zapier, e não para nada do lado do B1.

## Solução de problemas {#troubleshooting}

- **"Authentication failed"** ao conectar -- a chave de API está errada, foi excluída ou não tem `settings:write`. Crie uma nova chave no B1Admin com `settings:write` e os escopos de recursos que o Zap usa (os escopos não podem ser alterados em uma chave existente) e, em seguida, atualize a conexão.
- **O gatilho nunca dispara** -- confirme se o webhook foi realmente registrado: no B1Admin, **Configurações → Desenvolvedor → Webhooks** deve mostrar uma linha chamada "Zapier — &lt;evento&gt;". Se ela não aparecer, a chave de API provavelmente não tinha `settings:write` quando você ativou o Zap. Corrija a chave, desligue o Zap e ligue-o novamente.
- **O gatilho dispara duas vezes** -- o Zapier ocasionalmente reenvia um evento se a confirmação de recebimento foi perdida. Use uma etapa "Filter by Zapier" sobre um ID exclusivo (por exemplo, o `id` da pessoa) se precisar de deduplicação estrita.

## Veja também {#see-also}

- [Make](./make.md) -- o mesmo padrão, em outra plataforma
- [Slack e Discord](./slack-discord.md) -- notificações de chat mais simples, sem o Zapier
- [Webhooks (referência para desenvolvedores)](/docs/developer/api/webhooks)
