---
title: "Integrações"
description: "Conecte o B1 Admin ao Slack, Discord, Zapier, Make, Google Sheets e assistentes de IA como Claude, com os passos de configuração e os escopos de chave de API de cada um."
---

# Integrações

<div class="article-intro">

O B1 se conecta às ferramentas que a sua equipe já usa. Conecte o Slack ou o Discord para notificações da equipe, automatize fluxos no Zapier ou no Make, ou exporte dados sob demanda para o Google Sheets -- sem pagar por uma plataforma de integração separada e sem que a ChurchApps hospede nada a mais. Cada integração roda na infraestrutura do próprio terceiro e se comunica com a sua igreja por meio dos webhooks ou da API REST do B1.

</div>

## O que está disponível {#whats-available}

| Integração | O que faz | Direção | Esforço para configurar |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | Publica notificações legíveis (novas pessoas, doações, inscrições, …) em um canal do Slack | B1 → Slack | 2 minutos |
| **[Discord](./slack-discord.md)** | O mesmo, em um canal do Discord | B1 → Discord | 2 minutos |
| **[Zapier](./zapier.md)** | Use eventos do B1 como gatilhos e ações do B1 em qualquer um dos mais de 7.000 apps do Zapier (aguardando a aprovação do Zapier) | Ambas | 5 a 10 min por Zap |
| **[Make](./make.md)** | A mesma ideia do Zapier, no construtor visual de cenários do Make (ainda não lançado) | Ambas | 5 a 10 min por cenário |
| **[Google Sheets](./google-sheets.md)** | Exporta Pessoas / Doações / Grupos / Presença para uma planilha, sob demanda (ainda não lançado) | B1 → Planilha | 5 minutos |
| **[Claude](./claude.md)** | Faça perguntas ao Claude, da Anthropic, sobre os dados da sua igreja, limitadas às suas permissões -- gratuito para experimentar, recomendado | Ambas | Menos de 3 minutos |
| **[ChatGPT](./chatgpt.md)** | A mesma ideia, com o ChatGPT da OpenAI (exige um plano pago do ChatGPT) | Ambas | 10 minutos |
| **[Mailchimp](./services/mailchimp.md)** | Mantém um público do Mailchimp sincronizado com suas pessoas, grupos e listas salvas -- integrado ao B1 | B1 → Mailchimp | 5 minutos |
| **[Serviços conectados](./services/index.md)** | Receitas prontas para Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varia | 5 a 10 min cada |

## Como escolher {#how-to-pick}

- **Quer apenas uma notificação no chat?** Use o **Slack** ou o **Discord** -- sem conta de terceiros e sem Zap para manter. Tudo é configurado dentro do B1Admin.
- **Quer automatizar algo entre aplicativos** (por exemplo, "quando alguém doar, adicione essa pessoa à minha lista do Mailchimp e ao canal #doacoes do Slack")? Use o **Zapier** ou o **Make**. O Zapier é mais amigável; o Make é mais barato em grande escala e tem uma lógica mais flexível.
- **Precisa de uma extração pontual de dados ou de um relatório agendado?** Use o **Google Sheets** -- cole uma chave de API na barra lateral do complemento e clique em Exportar.
- **Quer fazer perguntas em linguagem simples** ("quantos visitantes de primeira vez vieram no último domingo?", "resuma as doações deste mês")? Comece pelo **[Claude](./claude.md)** -- é gratuito para experimentar e é configurado em menos de 3 minutos. O **[ChatGPT](./chatgpt.md)** também funciona, com um plano pago. O Claude se conecta fazendo login com a sua conta do B1; o ChatGPT usa uma chave de API do B1.
- **Está construindo sua própria integração personalizada?** Nenhuma das opções acima -- fale diretamente com a [API REST](/docs/developer/api) usando uma [chave de API](/docs/developer/api/api-keys), ou inscreva um servidor seu em [webhooks](/docs/developer/api/webhooks).

## O que todas têm em comum {#what-they-have-in-common}

Tudo é configurado no B1Admin, em **Configurações → Desenvolvedor**, que tem três abas: **Chaves de API**, **Webhooks** e **Aplicativos conectados**.

- **Slack, Discord e Mailchimp** são webhooks que você mesmo cria na aba **Webhooks** (escolha o **Tipo de conector** correspondente). Eles não precisam de chave de API.
- **Claude** (ao fazer login com a sua conta do B1) aparece na aba **Aplicativos conectados**, onde você pode revogá-lo.
- **Zapier, Make, Google Sheets, ChatGPT e Claude com chave** se autenticam com uma **chave de API do B1**, criada na aba **Chaves de API**. A chave:

  - Está vinculada à pessoa que a criou e herda as permissões dessa pessoa
  - Pode ser restringida com **escopos** -- por exemplo, uma exportação para o Google Sheets só precisa de `people:read`, não de `settings:write`
  - Pode ser excluída a qualquer momento, cortando instantaneamente o acesso da integração sem afetar mais nada

Algumas integrações (Zapier, Make) também registram um [webhook](/docs/developer/api/webhooks) em seu nome quando o Zap ou o cenário é ativado, e o removem quando você desliga o Zap -- você não gerencia a URL do webhook manualmente.

:::tip
Para que o Zapier e o Make registrem webhooks automaticamente, a chave de API precisa do escopo **`settings:write`** (além dos escopos de recursos que a integração usa). Uma chave somente de leitura funciona para ações e exportações, mas não para gatilhos.
:::

## Custo {#cost}

A ChurchApps é gratuita e de código aberto. Slack/Discord, o [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) e os conectores oficiais do Zapier, do Make e do Google Sheets também são gratuitos do nosso lado. Os terceiros podem cobrar pelas próprias plataformas (Zapier e Make têm planos gratuitos generosos; Slack, Discord e Google Sheets são gratuitos para esse fim).

## Crie a sua própria {#building-your-own}

Se nenhuma das opções acima atender, todas as superfícies do B1 estão abertas:

- **[API REST](/docs/developer/api)** -- chame o B1 em qualquer linguagem com um cabeçalho `Authorization: Bearer cak_…`
- **[Webhooks](/docs/developer/api/webhooks)** -- inscreva um endpoint HTTPS público em um ou mais tipos de evento e receba payloads JSON assinados
- **[OAuth + Aplicativos conectados](/docs/developer/api/connected-apps)** -- se você estiver criando um produto SaaS usado por muitas igrejas

## Próximos passos {#next-steps}

- [Slack e Discord](./slack-discord.md) -- publique notificações no chat
- [Zapier](./zapier.md) -- conecte-se a mais de 7.000 apps
- [Make](./make.md) -- automação visual de fluxos de trabalho
- [Google Sheets](./google-sheets.md) -- exporte para planilhas
- [Claude](./claude.md) -- pergunte ao Claude, da Anthropic, sobre os dados da sua igreja
- [ChatGPT](./chatgpt.md) -- pergunte ao ChatGPT, da OpenAI, sobre os dados da sua igreja
- [Serviços conectados](./services/index.md) -- receitas por serviço (Mailchimp, Donorbox, Clearstream, …)
