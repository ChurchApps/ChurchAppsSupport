---
title: "Integrações"
---

# Integrações

<div class="article-intro">

O B1 se conecta às ferramentas que a sua equipe já usa. Conecte o Slack ou o Discord para notificações da equipe, automatize fluxos de trabalho no Zapier ou no Make, ou exporte dados sob demanda para o Google Sheets — sem pagar por uma plataforma de integração separada e sem que a ChurchApps hospede nada extra. Cada integração roda na infraestrutura do próprio terceiro e se comunica com a sua igreja por meio dos webhooks ou da API REST do B1.

</div>

## O que está disponível

| Integração | O que faz | Direção | Esforço para configurar |
|---|---|---|---|
| **[Slack](./slack-discord)** | Publica notificações legíveis (novas pessoas, doações, inscrições, …) em um canal do Slack | B1 → Slack | 2 minutos |
| **[Discord](./slack-discord)** | O mesmo, em um canal do Discord | B1 → Discord | 2 minutos |
| **[Zapier](./zapier)** | Use eventos do B1 como gatilhos e ações do B1 em qualquer um dos mais de 7.000 aplicativos do Zapier | Ambos | 5–10 min por Zap |
| **[Make](./make)** | A mesma ideia do Zapier, no construtor visual de cenários do Make | Ambos | 5–10 min por cenário |
| **[Google Sheets](./google-sheets)** | Exporta Pessoas / Doações / Grupos / Presença para uma planilha sob demanda | B1 → Planilha | 5 minutos |
| **[Claude](./claude)** | Faça perguntas ao Claude, da Anthropic, sobre os dados da sua igreja, limitadas às suas permissões — gratuito para testar, recomendado | Ambos | Menos de 3 minutos |
| **[ChatGPT](./chatgpt)** | A mesma ideia com o ChatGPT, da OpenAI (requer um plano pago do ChatGPT) | Ambos | 10 minutos |
| **[Serviços conectados](./services/)** | Receitas selecionadas para Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varia | 5–10 min cada |

## Como escolher

- **Quer apenas uma notificação no chat?** Use o **Slack** ou o **Discord** — sem conta de terceiros, sem Zap para manter. Configurado inteiramente dentro do B1Admin.
- **Quer automatizar algo entre aplicativos** (por exemplo, "quando alguém doar, adicione-o à minha lista do Mailchimp e ao canal #doacoes do Slack")? Use o **Zapier** ou o **Make**. O Zapier é mais amigável; o Make é mais barato em escala e tem uma lógica mais flexível.
- **Precisa de uma extração de dados pontual ou de um relatório programado?** Use o **Google Sheets** — cole uma chave de API na barra lateral do complemento e clique em Exportar.
- **Quer fazer perguntas em linguagem simples** ("quantos visitantes de primeira vez vieram no domingo passado?", "resuma as doações deste mês")? Comece com o **[Claude](./claude)** — é gratuito para testar e leva menos de 3 minutos para configurar. O **[ChatGPT](./chatgpt)** também funciona com um plano pago. O Claude se conecta fazendo login com a sua conta do B1; o ChatGPT usa uma chave de API do B1.
- **Quer criar a sua própria integração personalizada?** Nenhuma das opções acima — fale diretamente com a [API REST](/docs/developer/api) usando uma [chave de API](/docs/developer/api/api-keys), ou assine um servidor que você controla nos [webhooks](/docs/developer/api/webhooks).

## O que todas têm em comum

Toda integração se autentica com uma **chave de API do B1**, criada no B1Admin em **Configurações → Desenvolvedor → Chaves de API**. A chave:

- Está vinculada a uma pessoa específica da sua igreja e herda as permissões dessa pessoa
- Pode ser restringida com **escopos** — por exemplo, uma exportação para o Google Sheets só precisa de `people:read`, não de `settings:write`
- Pode ser revogada a qualquer momento, cortando imediatamente o acesso da integração sem afetar mais nada

Alguns conectores (Zapier, Make) também registram um [webhook](/docs/developer/api/webhooks) em seu nome quando o Zap ou o cenário é ativado, e o removem quando você desativa o Zap — você não precisa gerenciar a URL do webhook.

:::tip
Para que o Zapier e o Make registrem webhooks automaticamente, a chave de API precisa do escopo **`settings:write`** (além dos escopos de recurso para o que a integração utiliza). Uma chave somente leitura funciona para ações e exportações, mas não para gatilhos.
:::

## Custo

A ChurchApps é gratuita e de código aberto. O Slack/Discord, o [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), e os conectores oficiais do Zapier / Make / Google Sheets também são gratuitos do nosso lado. Os terceiros podem cobrar pelas próprias plataformas (o Zapier e o Make têm planos gratuitos generosos; o Slack, o Discord e o Google Sheets são gratuitos para essa finalidade).

## Criando a sua própria

Se nada acima se encaixar, toda a superfície do B1 está aberta:

- **[API REST](/docs/developer/api)** — chame o B1 a partir de qualquer linguagem com um cabeçalho `Authorization: Bearer cak_…`
- **[Webhooks](/docs/developer/api/webhooks)** — assine um endpoint HTTPS público para um ou mais tipos de evento e receba payloads JSON assinados
- **[OAuth + Aplicativos Conectados](/docs/developer/api/connected-apps)** — se você estiver criando um produto SaaS usado por muitas igrejas

## Próximos passos

- [Slack e Discord](./slack-discord) — publique notificações no chat
- [Zapier](./zapier) — conecte-se a mais de 7.000 aplicativos
- [Make](./make) — automação visual de fluxos de trabalho
- [Google Sheets](./google-sheets) — exporte para planilhas
- [Claude](./claude) — pergunte ao Claude sobre os dados da sua igreja
- [ChatGPT](./chatgpt) — pergunte ao ChatGPT da OpenAI sobre os dados da sua igreja
- [Serviços conectados](./services/) — receitas por serviço (Mailchimp, Donorbox, Clearstream, …)
