---
title: "Slack e Discord"
description: "Publique eventos do B1 Admin, como novas pessoas, doações e envios de formulários, em um canal do Slack ou do Discord com um webhook de entrada, sem precisar do Zapier."
---

# Slack e Discord

<div class="article-intro">

Publique notificações legíveis do B1 diretamente em um canal do Slack ou do Discord -- novas pessoas, doações, inscrições em grupos, envios de formulários, eventos de calendário e muito mais. Sem conta de terceiros e sem Zap para manter: o próprio B1 formata os eventos em mensagens de chat e as envia por POST para a URL de webhook do canal.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa da permissão **Editar configurações** no B1Admin
- Um administrador do seu workspace do Slack ou do seu servidor do Discord para criar o Webhook de entrada do canal
- Decida em qual canal quer as notificações (você pode usar o mesmo canal para vários tipos de evento ou separá-los em canais diferentes)

</div>

## Como funciona {#how-it-works}

O B1 tem um **Tipo de conector** integrado para plataformas de chat. Quando você cria um webhook do tipo **Slack** ou **Discord**, o mecanismo de webhooks continua fazendo o envio, as tentativas e os cabeçalhos assinados de sempre, mas o corpo enviado é reformatado: deixa o envelope habitual do B1 `{event,churchId,data}` e passa a ser a pequena mensagem `{text}` (Slack) ou `{content}` (Discord) que esses serviços esperam.

Nenhum servidor do B1 entra em contato com o Slack por igreja, além do fluxo de webhooks de saída já existente -- não há nada novo para hospedar nem nada extra a pagar.

## Slack -- passo a passo {#slack--step-by-step}

### 1. Obtenha uma URL de Webhook de entrada do Slack {#1-get-a-slack-incoming-webhook-url}

1. Abra [api.slack.com/apps](https://api.slack.com/apps) no workspace do Slack em que você quer as notificações.
2. Clique em **Create New App → From scratch**, dê um nome como "B1 Notifications" e escolha o workspace.
3. No menu lateral, escolha **Incoming Webhooks** e ative **Activate Incoming Webhooks**.
4. Clique em **Add New Webhook to Workspace**, escolha o canal (por exemplo, `#donations`) e depois clique em **Allow**.
5. O Slack o levará de volta à página com uma **Webhook URL** nova, parecida com `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Copie-a -- é a única informação de que o B1 precisa.

:::caution
Trate a URL de webhook do Slack como um segredo. Qualquer pessoa que a tenha pode publicar mensagens arbitrárias no canal. Se ela for exposta acidentalmente, gere uma nova na página do app no Slack (a regeneração apenas troca a URL; atualize o B1 para que ela corresponda).
:::

### 2. Conecte no B1Admin {#2-connect-it-in-b1admin}

1. No B1Admin, acesse **Configurações → Desenvolvedor → Webhooks**.
2. Clique em **Novo webhook**.
3. Preencha:
   - **Nome** -- algo legível, como "Doações → #donations". Somente a sua equipe vê esse nome.
   - **Tipo de conector** -- escolha **Slack**.
   - **URL do payload** -- cole a URL do Slack obtida na etapa 1.
   - **Eventos** -- marque os eventos que você quer como mensagens. Para um canal de doações, apenas `donation.created`. Para um canal de pessoas, experimente `person.created` e `group.member.added`.
4. Clique em **Salvar**. Aparecerá uma caixa de diálogo "Signing Secret" -- para o Slack você pode ignorá-la (o Slack não verifica as assinaturas do B1) e fechá-la.

### 3. Teste {#3-test-it}

Reabra o webhook na lista e clique em **Enviar evento de teste**. O B1 envia um exemplo do primeiro evento que você marcou, e em um ou dois segundos uma mensagem como

> 💝 Nova doação: $50.00

aparece no seu canal do Slack, e uma nova linha surge na tabela **Entregas recentes**, na mesma tela, com o status `succeeded`. Pronto.

## Discord -- passo a passo {#discord--step-by-step}

### 1. Obtenha uma URL de Webhook do Discord {#1-get-a-discord-webhook-url}

1. No seu servidor do Discord, passe o mouse sobre o canal em que quer as notificações e clique na **⚙ engrenagem** (Editar canal).
2. Abra **Integrações → Webhooks → Novo webhook**.
3. Dê um nome e, opcionalmente, um avatar, e clique em **Copiar URL do webhook** -- ela tem a forma `https://discord.com/api/webhooks/123…/abc…`.

### 2. Conecte no B1Admin {#2-connect-it-in-b1admin-1}

É idêntico ao fluxo do Slack acima, exceto que o **Tipo de conector** deve ser **Discord**. Cole a URL do Discord em **URL do payload** e salve.

:::tip
Você **não** precisa acrescentar `/slack` no final da URL do Discord -- o B1 envia payloads `{content}` nativos do Discord, e não payloads compatíveis com o Slack. Basta colar a URL que o Discord forneceu.
:::

### 3. Teste {#3-test-it-1}

Use o mesmo botão **Enviar evento de teste** -- o Discord mostra a mensagem no canal escolhido e o registro de entregas muda para `succeeded`.

## Como são as mensagens {#what-the-messages-look-like}

| Evento | Exemplo de mensagem |
|---|---|
| `person.created` | 👤 Nova pessoa adicionada: Jordan Rivera |
| `person.updated` | 👤 Pessoa atualizada: Jordan Rivera |
| `group.created` | 👥 Novo grupo criado: Estudo bíblico de terça |
| `group.member.added` | ➕ Alguém foi adicionado a um grupo |
| `donation.created` | 💝 Nova doação: $50.00 |
| `donation.updated` | 💝 Doação atualizada: $75.00 |
| `attendance.recorded` | ✅ Presença registrada |
| `form.submission.created` | 📝 Novo envio de formulário recebido |
| `event.created` | 📅 Novo evento: Culto de Páscoa |

A lista completa está no [catálogo de eventos de webhook](/docs/developer/api/webhooks#event-catalog) -- qualquer evento ali pode ser direcionado para o Slack/Discord.

## Um canal por assunto {#one-channel-per-topic}

Você não precisa colocar todos os eventos em um único lugar. A maioria das igrejas configura alguns webhooks:

- Um canal **#donations** que escuta apenas `donation.created`
- Um canal **#new-people** para `person.created` e `group.member.added`
- Um canal **#admin-alerts** para eventos de baixo volume, como `form.submission.created`

Não há limite de webhooks por igreja. Cada um é independente -- excluir ou desativar um não afeta os outros.

## Como acompanhar as entregas {#inspecting-deliveries}

A tabela **Entregas recentes** do editor de webhooks mostra as últimas 50 tentativas. Clique em uma linha para ver o payload exato que foi enviado e a resposta recebida. Para um conector do Slack, o payload é `{"text":"💝 New donation: $50.00"}` -- e não o envelope bruto `{event,churchId,...}` -- porque o B1 o reformata antes da entrega.

Se algo falhar (um selo âmbar `failed` enquanto o B1 ainda está tentando novamente, ou um selo vermelho `exhausted` quando ele desistir), a coluna **Resposta** mostra o status HTTP, e o diálogo da linha exibe o corpo da resposta, para que você veja exatamente o que o Slack ou o Discord rejeitou -- geralmente um erro de copiar e colar na URL. Clique em **Reenviar** para enviar essa entrega novamente.

## Solução de problemas {#troubleshooting}

- **Nenhuma mensagem aparece e o status da entrega é `400`** -- normalmente o Tipo de conector está como **Padrão**, mas a URL é do Slack ou do Discord. Esses serviços rejeitam o envelope bruto. Troque a lista suspensa para **Slack** ou **Discord** e reenvie o teste.
- **Webhook desativado automaticamente** -- o B1 tenta novamente cada entrega com falha por cerca de cinco dias. Se três entregas seguidas esgotarem as tentativas, o B1 desliga o webhook (o status fica **Desativado**). Corrija a URL (ou gere uma nova no Slack/Discord), ative novamente **Ativo** e salve.
- **A mensagem chegou, mas sem detalhes** -- todas as plataformas de chat limitam o tamanho das mensagens. As mensagens do B1 são de uma linha por design; para notificações mais completas, use o [Zapier](./zapier.md) ou o [Make](./make.md) para compor uma mensagem mais completa no Slack, pelas ações do Slack deles.

## Trocar o tipo de conector depois {#switching-connector-types-later}

Você pode alterar o Tipo de conector de um webhook existente -- a mudança vale a partir da próxima entrega. Se você trocar de Slack para Padrão, aponte a URL para o seu próprio endpoint HTTPS; o mesmo segredo de assinatura (emitido quando o webhook foi criado) passa a poder ser verificado no envelope bruto.

## Veja também {#see-also}

- [Zapier](./zapier.md) -- para fluxos de várias etapas disparados por eventos do B1
- [Make](./make.md) -- construtor visual de cenários
- [Webhooks (referência para desenvolvedores)](/docs/developer/api/webhooks) -- o formato completo do payload e da assinatura, caso você aponte um webhook para o seu próprio servidor
