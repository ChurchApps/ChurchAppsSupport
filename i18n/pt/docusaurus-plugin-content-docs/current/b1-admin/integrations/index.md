---
title: "Integrações"
---

# Integrações

<div class="article-intro">

B1 se conecta às ferramentas que sua equipe já usa. Conecte Slack ou Discord para notificações da equipe, automatize fluxos de trabalho no Zapier ou Make, ou exporte dados sob demanda para o Google Sheets — sem pagar por uma plataforma de integração separada e sem ChurchApps hospedar nada extras. Cada integração funciona na infraestrutura própria do terceiro e se comunica com sua igreja através dos webhooks ou API REST de B1.

</div>

## O Que Está Disponível

| Integração | O que faz | Direção | Esforço para configurar |
|---|---|---|---|
| **[Slack](./slack-discord)** | Postar notificações legíveis (novas pessoas, doações, inscrições, …) em um canal Slack | B1 → Slack | 2 minutos |
| **[Discord](./slack-discord)** | Mesmo, em um canal Discord | B1 → Discord | 2 minutos |
| **[Zapier](./zapier)** | Use eventos B1 como gatilhos e ações B1 em qualquer um dos 7.000+ aplicativos do Zapier | Ambas | 5–10 min por Zap |
| **[Make](./make)** | Mesma ideia do Zapier, no construtor de cenários visual do Make | Ambas | 5–10 min por cenário |
| **[Google Sheets](./google-sheets)** | Exportar Pessoas / Doações / Grupos / Frequência para uma planilha sob demanda | B1 → Sheet | 5 minutos |
| **[Claude](./claude)** | Faça perguntas ao Claude da Anthropic sobre os dados da sua igreja, limitado às suas permissões | Ambas | 5 minutos |
| **[ChatGPT](./chatgpt)** | Mesma ideia com ChatGPT da OpenAI, via um GPT personalizado ou ferramentas do OpenAI conscientes de MCP | Ambas | 10 minutos |
| **[Serviços Conectados](./services/)** | Receitas selecionadas para Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varia | 5–10 min cada |

## Como Escolher

- **Quer apenas uma notificação em chat?** Use **Slack** ou **Discord** — sem conta de terceiro, sem Zap para manter. Configurado inteiramente dentro de B1Admin.
- **Quer automatizar algo entre aplicativos** (por ex. "quando alguém doa, adicione à minha lista Mailchimp e Slack #donations")? Use **Zapier** ou **Make**. Zapier é mais amigável; Make é mais barato em escala e tem lógica mais flexível.
- **Precisa de um pull de dados único ou relatório agendado?** Use **Google Sheets** — cole uma chave de API na barra lateral do complemento e clique em Exportar.
- **Quer fazer perguntas em inglês comum** ("quantos visitantes pela primeira vez no domingo passado?", "resuma doações este mês")? Use **[Claude](./claude)** ou **[ChatGPT](./chatgpt)** — ambos se conectam a B1 com uma única chave de API.
- **Criando sua própria integração personalizada?** Nenhuma das acima — fale com a [API REST](/docs/developer/api) diretamente com uma [chave de API](/docs/developer/api/api-keys), ou inscreva um servidor que você controla em [webhooks](/docs/developer/api/webhooks).

## O Que Eles Têm em Comum

Cada integração autentica com uma **chave de API B1**, criada em B1Admin em **Configurações → Desenvolvedor → Chaves de API**. A chave:

- É vinculada a uma pessoa específica na sua igreja e herda as permissões dessa pessoa
- Pode ser estreitada com **escopos** — por exemplo uma exportação Google Sheets apenas precisa de `people:read`, não `settings:write`
- Pode ser revogada a qualquer momento, cortando instantaneamente o acesso da integração sem afetar nada mais

Alguns conectores (Zapier, Make) também registram um [webhook](/docs/developer/api/webhooks) em seu nome quando o Zap ou cenário é ativado, e o removem quando você desativa — você não gerencia a URL do webhook.

:::tip
Para Zapier e Make registrarem webhooks automaticamente, a chave de API precisa do escopo **`settings:write`** (mais os escopos de recurso para o que a integração toca). Uma chave apenas leitura funciona para ações e exportações mas não para gatilhos.
:::

## Custo

ChurchApps é gratuito e de código aberto. Slack/Discord, o [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), e os conectores oficiais Zapier / Make / Google Sheets são também gratuitos do nosso lado. Terceiros podem cobrar por suas próprias plataformas (Zapier e Make ambos têm níveis gratuitos generosos; Slack, Discord, e Google Sheets são gratuitos para este propósito).

## Construir o Seu Próprio

Se nenhuma das acima se encaixa, cada superfície B1 está aberta:

- **[API REST](/docs/developer/api)** — chame B1 de qualquer linguagem com um cabeçalho `Authorization: Bearer cak_…`
- **[Webhooks](/docs/developer/api/webhooks)** — inscreva um endpoint HTTPS público a um ou mais tipos de evento e receba payloads JSON assinados
- **[OAuth + Aplicativos Conectados](/docs/developer/api/connected-apps)** — se você estiver construindo um produto SaaS usado por muitas igrejas

## Próximos Passos

- [Slack & Discord](./slack-discord) — postar notificações de chat
- [Zapier](./zapier) — conectar a 7.000+ aplicativos
- [Make](./make) — automação de fluxo de trabalho visual
- [Google Sheets](./google-sheets) — exportar para planilhas
- [Claude](./claude) — peça ao Claude da Anthropic sobre os dados da sua igreja
- [ChatGPT](./chatgpt) — peça ao ChatGPT da OpenAI sobre os dados da sua igreja
- [Serviços Conectados](./services/) — receitas por serviço (Mailchimp, Donorbox, Clearstream, …)
