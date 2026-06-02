---
title: "Slack & Discord"
---

# Slack & Discord

<div class="article-intro">

Postar notificações legíveis de B1 diretamente em um canal Slack ou Discord — novas pessoas, doações, inscrições em grupo, envios de formulário, eventos de calendário e mais. Sem conta de terceiro, sem Zap para manter: B1 reformata eventos em mensagens de chat e as POSTs para a URL do webhook do canal em si.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão **Editar Configurações** em B1Admin
- Um admin em seu espaço de trabalho Slack ou servidor Discord para criar o webhook de entrada do canal
- Decida qual canal você quer notificações em (você pode usar o mesmo canal para vários tipos de eventos, ou dividi-los em canais)

</div>

## Como Funciona

B1 tem um **Tipo de Conector** incorporado para plataformas de chat. Quando você cria um webhook com tipo **Slack** ou **Discord**, o mecanismo de webhook ainda faz sua entrega habitual + retry + dança de cabeçalho assinado, mas o corpo que envia é reformatado do envelope normal B1 `{event,churchId,data}` para a pequena mensagem `{text}` (Slack) ou `{content}` (Discord) que esses serviços esperam.

Nenhum servidor B1 alcança Slack em base por-igreja além do fluxo de webhook de saída existente — não há nada novo para hospedar, nada extra para pagar.

## Slack — Passo a Passo

### 1. Obter uma URL de Webhook de Entrada Slack

1. Abra [api.slack.com/apps](https://api.slack.com/apps) no espaço de trabalho Slack onde você quer notificações.
2. Clique em **Criar Novo App → From scratch**, nomeie algo como "B1 Notificações", e escolha o espaço de trabalho.
3. Na nav esquerda escolha **Incoming Webhooks** e alterne **Ativar Webhooks De Entrada** para *Ativar*.
4. Clique em **Adicionar Novo Webhook ao Espaço de Trabalho**, escolha o canal (por ex. `#donations`), então **Permitir**.
5. Slack o coloca de volta na página com uma fresca **URL de Webhook** que se parece com `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Copie-a — esse é o único pedaço de informação que B1 precisa.

:::caution
Trate a URL de webhook Slack como um segredo. Qualquer pessoa com ela pode postar mensagens arbitrárias no canal. Se você acidentalmente a expõe, regenere-a da página do aplicativo Slack (regenerar apenas rotaciona a URL; atualize B1 para corresponder).
:::

### 2. Conectar em B1Admin

1. Em B1Admin vá para **Configurações → Desenvolvedor → Webhooks**.
2. Clique em **Novo Webhook**.
3. Preencha:
   - **Nome** — algo legível como "Doações → #donations". Apenas seu time vê.
   - **Tipo de Conector** — escolha **Slack**.
   - **URL de Payload** — cole a URL Slack do passo 1.
   - **Eventos** — marque os eventos que você deseja como mensagens. Para um canal de doações, apenas `donation.created`. Para um canal #people, tente `person.created` e `group.member.added`.
4. Clique em **Salvar**. Um diálogo "Segredo de Assinatura" aparece — você pode ignorá-lo para Slack (Slack não verifica assinaturas B1) e fechá-lo.

### 3. Testá-lo

Re-abra o webhook da lista e clique em **Enviar Evento de Teste**. Dentro de um ou dois segundos uma mensagem como

> 💝 Nova doação: $50.00

aparece em seu canal Slack, e uma nova linha aparece na tabela **Entregas Recentes** na mesma tela com status `succeeded`. Você terminou.

## Discord — Passo a Passo

### 1. Obter uma URL de Webhook Discord

1. Em seu servidor Discord, passe o mouse sobre o canal em que você quer notificações e clique na **⚙ engrenagem** (Editar Canal).
2. Abra **Integrações → Webhooks → Novo Webhook**.
3. Dê um nome e (opcionalmente) um avatar, então clique em **Copiar URL de Webhook** — se parece com `https://discord.com/api/webhooks/123…/abc…`.

### 2. Conectar em B1Admin

Idêntico ao fluxo Slack acima, exceto defina **Tipo de Conector** para **Discord**. Cole a URL Discord em **URL de Payload** e salve.

:::tip
Você **não** precisa adicionar `/slack` ao final da URL Discord — B1 envia payloads nativos Discord `{content}`, não compatíveis com Slack. Apenas cole a URL que Discord lhe deu.
:::

### 3. Testá-lo

Mesmo botão **Enviar Evento de Teste** — Discord mostra a mensagem no canal escolhido e o log de entrega vira `succeeded`.

## Como As Mensagens Parecem

| Evento | Exemplo de mensagem |
|---|---|
| `person.created` | 👤 Nova pessoa adicionada: Jordan Rivera |
| `person.updated` | 👤 Pessoa atualizada: Jordan Rivera |
| `group.created` | 👥 Novo grupo criado: Estudo Bíblico de Terça |
| `group.member.added` | ➕ Alguém foi adicionado a um grupo |
| `donation.created` | 💝 Nova doação: $50.00 |
| `donation.updated` | 💝 Doação atualizada: $75.00 |
| `attendance.recorded` | ✅ Frequência registrada |
| `form.submission.created` | 📝 Novo envio de formulário recebido |
| `event.created` | 📅 Novo evento: Serviço de Páscoa |

A lista completa vive no [catálogo de eventos webhook](/docs/developer/api/webhooks#event-catalog) — qualquer evento lá pode ser roteado para Slack/Discord.

## Um Canal Por Tópico

Você não precisa colocar cada evento em um lugar. A maioria das igrejas configura alguns webhooks:

- Um canal **#donations** que apenas escuta `donation.created`
- Um canal **#new-people** para `person.created` e `group.member.added`
- Um canal **#admin-alerts** para coisas de baixo volume como `form.submission.created`

Não há limite no número de webhooks por igreja. Cada um é independente — deletar ou desabilitar um não afeta os outros.

## Inspecionando Entregas

A tabela **Entregas Recentes** do editor de webhook mostra as últimas 50 tentativas. Clique uma linha para ver o payload exato que foi enviado e a resposta que voltou. Para um conector Slack o payload é `{"text":"💝 Nova doação: $50.00"}` — não o envelope bruto `{event,churchId,...}` — porque B1 o reformata antes da entrega.

Se algo falhou (badge `failed` ou `exhausted` vermelho), o diálogo mostra o status HTTP e corpo de resposta para que você possa ver exatamente o que Slack ou Discord não gostou — geralmente um erro de copiar-e-colar na URL.

## Solução de Problemas

- **Nenhuma mensagem aparece + status de entrega `400`** — geralmente o Tipo de Conector está definido para **Standard** mas a URL é uma Slack/Discord. Slack/Discord rejeitam o envelope bruto. Mude a dropdown para **Slack** ou **Discord** e resends o teste.
- **Webhook auto-desabilitado** — após 3 entregas falhas consecutivas B1 desliga o webhook. Corrija a URL (ou rotacione-a em Slack/Discord) e alterne **Active** de volta.
- **Mensagem chegou mas está faltando detalhe** — cada plataforma de chat limita tamanho de mensagem. As mensagens B1 são uma linha por design; para notificações mais ricas use [Zapier](./zapier) ou [Make](./make) para compor uma mensagem Slack mais completa via suas ações Slack.

## Trocar Tipos de Conector Depois

Você pode trocar o Tipo de Conector em um webhook existente — entra em efeito na próxima entrega. Se você trocar de Slack para Standard, aponte a URL no seu próprio endpoint HTTPS e o mesmo segredo de assinatura (foi emitido quando o webhook foi criado) começa a ser verificável como o envelope bruto.

## Veja Também

- [Zapier](./zapier) — para fluxos de trabalho de multi-passo disparados por eventos B1
- [Make](./make) — construtor de cenário visual
- [Webhooks (referência de desenvolvedor)](/docs/developer/api/webhooks) — o payload completo + formato de assinatura se você alguma vez apontar um webhook no seu próprio servidor
