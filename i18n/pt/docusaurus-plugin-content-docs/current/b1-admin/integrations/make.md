---
title: "Make"
description: "Conecte o B1 Admin ao Make para automatizar fluxos de trabalho: crie uma chave de API, configure o gatilho e as ações do B1.church e resolva erros comuns."
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (antes conhecido como Integromat) é uma plataforma visual de automação de fluxos de trabalho -- parecida com o Zapier na proposta, com lógica mais flexível e custo menor em grande escala. O aplicativo oficial do B1.church para o Make permite criar "cenários" que reagem instantaneamente a eventos do B1 e gravam registros de volta no B1.

</div>

:::caution Ainda não disponível
O aplicativo do B1.church para o Make ainda não foi publicado no diretório de apps do Make, então você não pode adicionar os módulos **B1.church** descritos abaixo a um cenário hoje. Até lá, use o [Zapier](./zapier.md) ou chame a [API REST](/docs/developer/api) do B1 pelo módulo **HTTP -- Fazer uma requisição** do Make, com uma [chave de API](/docs/developer/api/api-keys). Tudo o que está abaixo descreve como o aplicativo funcionará depois do lançamento.
:::

<div class="prereqs">
<h4>Antes de começar</h4>

- Uma conta no [Make](https://www.make.com) (o plano gratuito cobre fluxos pequenos)
- Um administrador da igreja com a permissão **Editar configurações** no B1Admin
- Uma ideia geral do cenário que você quer criar

</div>

## Módulos {#modules}

| Tipo | O que faz | Evento / endpoint do B1 |
|---|---|---|
| **Gatilho instantâneo** | Observar eventos | qualquer evento do B1 inscrito (`person.created`, `donation.created`, …) |
| **Ação** | Criar pessoa | adiciona uma nova pessoa |
| **Ação** | Adicionar doação | registra uma doação |
| **Ação** | Adicionar membro ao grupo | adiciona uma pessoa a um grupo |
| **Pesquisa** | Pesquisar pessoas | encontra pessoas pelo nome ou e-mail |

O gatilho instantâneo permite escolher qual evento escutar -- um módulo de gatilho por cenário, configurado para cada evento.

## Configuração {#setup}

### 1. Crie uma chave de API do B1 {#1-create-a-b1-api-key}

1. No B1Admin, acesse **Configurações → Desenvolvedor → Chaves de API**.
2. Clique em **Nova chave de API**, dê o nome "Make" e conceda os escopos de que você precisa.
3. **Inclua `settings:write`** se algum dos seus cenários usar o gatilho instantâneo -- o Make registra um webhook em seu nome quando o cenário é ativado.
4. Conceda também os escopos que os módulos de ação precisam (por exemplo, `donations:write` para o módulo Adicionar doação).
5. Salve e copie a chave `cak_…`.

### 2. Instale a conexão {#2-install-the-connection}

1. No Make, crie um novo cenário e arraste o módulo de gatilho **B1.church** para a área de trabalho.
2. Quando solicitado, clique em **Criar uma conexão**. Cole a chave de API no campo *API Key* e deixe *API Base URL* como `https://api.churchapps.org` (a menos que você esteja testando no ambiente de homologação).
3. Clique em **Salvar** -- o Make testa a chave lendo o perfil da sua igreja.

A conexão fica salva na sua conta do Make e é reutilizada em todos os cenários.

### 3. Configure o gatilho {#3-configure-the-trigger}

1. Abra as configurações do módulo **Observar eventos**.
2. Escolha o evento desejado -- por exemplo, `donation.created`.
3. Salve. O Make gera uma URL de webhook exclusiva e a armazena internamente.

### 4. Adicione os módulos seguintes {#4-add-downstream-modules}

Arraste qualquer um dos centenas de módulos de apps do Make para a área de trabalho -- Mailchimp, Google Sheets, Slack, HubSpot, seu próprio endpoint HTTP etc. Mapeie a saída do gatilho (`event`, `churchId`, `data.id`, `data.amount`, …) para os campos de entrada deles. Os módulos de achatamento, iterador, roteador e agregador do Make permitem criar fluxos com ramificações e paralelismo que seriam difíceis no Zapier.

### 5. Ative o cenário {#5-turn-the-scenario-on}

Ative a opção **Ativo** no cabeçalho do cenário. O Make chama `POST /membership/webhooks` do B1 para registrar a URL. A partir desse momento, cada evento correspondente do B1 passa pelo cenário em tempo real.

Desativar o cenário chama `DELETE /membership/webhooks/{id}`, para que não sobrem assinaturas órfãs.

## Receitas comuns {#common-recipes}

### Enviar doações para uma planilha do Google para revisão financeira {#sync-donations-to-a-google-sheet-for-finance-review}

- **Gatilho** -- B1: Observar eventos (`donation.created`)
- **Ação** -- Google Sheets: Adicionar uma linha. Mapeie `data.donationDate`, `data.amount`, `data.personId`, `data.method` e `data.batchId` para as colunas da planilha.

### Notificação condicional no Slack de acordo com o valor da doação {#conditional-slack-notification-by-donation-amount}

- **Gatilho** -- B1: Observar eventos (`donation.created`)
- **Roteador**:
  - Ramo A -- Filtro: `data.amount >= 1000` → Slack: publicar em `#major-gifts`
  - Ramo B -- caso contrário → Slack: publicar em `#donations`

### Nova pessoa → CRM + e-mail de boas-vindas + Slack {#new-person--crm--welcome-email--slack}

- **Gatilho** -- B1: Observar eventos (`person.created`)
- **Ação** -- HubSpot: Criar contato
- **Ação** -- Mailgun: Enviar e-mail de boas-vindas
- **Ação** -- Slack: Notificar `#new-people` (em paralelo -- use o roteador do Make)

## Como funciona o gatilho instantâneo {#how-the-instant-trigger-works}

O gatilho instantâneo é baseado em webhook, e não em consulta periódica: quando ativado, o Make chama `POST /membership/webhooks` com a URL gerada e o evento escolhido. Quando o evento ocorre no B1, o B1 envia o envelope para a URL do Make, e o seu cenário é executado em poucos segundos. Desativar o cenário remove o webhook.

O gatilho só dispara para eventos que acontecem **enquanto o cenário estiver ativo**. Não há retroação de eventos anteriores.

## Limites e observações {#limits--notes}

- **Um evento por módulo Observar eventos.** Para escutar vários eventos, crie um cenário para cada evento.
- **A verificação de assinatura não é exposta** -- o Make não repassa o `X-B1-Signature` para o cenário; a limitação de confiança é a URL de webhook de cada cenário, que não pode ser adivinhada. Essa é a prática normal do Make. Se você precisar de verificações explícitas de assinatura, crie uma integração personalizada com o [SDK](/docs/developer/api/webhooks#sdk-support).
- **Número de operações** -- cada chamada à API feita por um módulo de ação conta na sua cota de operações do Make, não em nada do lado do B1.

## Solução de problemas {#troubleshooting}

- **O teste da conexão falha** -- na maioria das vezes, é um erro de digitação na chave de API. Copie-a novamente do B1Admin (a chave completa só é exibida uma vez; se você a perdeu, crie uma nova).
- **O módulo de gatilho não é ativado** -- verifique **Configurações → Desenvolvedor → Webhooks** no B1Admin. Se não aparecer uma linha "Make -- &lt;evento&gt;" depois que você ativar o cenário, a chave não tem `settings:write`. Atualize a chave e reative o cenário.
- **A ação retorna `403 Forbidden`** -- a chave de API não tem o escopo para aquele endpoint. Por exemplo, Adicionar doação precisa de `donations:write`. Atualize a chave no B1Admin e teste novamente.

## Está faltando um módulo? {#missing-a-module}

Se você precisar de um módulo que não existe (por exemplo, uma nova ação para um endpoint que ainda não cobrimos), envie um e-mail para [support@churchapps.org](mailto:support@churchapps.org). Enquanto isso, o módulo **HTTP -- Fazer uma requisição** do Make pode chamar qualquer endpoint do B1 com um cabeçalho `Authorization: Bearer cak_…`.

## Veja também {#see-also}

- [Zapier](./zapier.md) -- mesmo padrão, com uma interface mais simples e um catálogo maior de apps
- [Slack e Discord](./slack-discord.md) -- notificações de chat integradas, sem o Make
- [Webhooks (referência para desenvolvedores)](/docs/developer/api/webhooks)
