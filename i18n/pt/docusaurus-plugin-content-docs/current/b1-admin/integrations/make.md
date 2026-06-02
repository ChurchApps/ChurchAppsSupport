---
title: "Make"
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (anteriormente Integromat) é uma plataforma de automação de fluxo de trabalho visual — similar em espírito ao Zapier, com lógica mais flexível e uma conta mais barata em escala. O aplicativo oficial B1.church Make permite construir "cenários" que reagem instantaneamente a eventos B1 e gravam registros de volta em B1.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Uma conta [Make](https://www.make.com) (o nível gratuito cobre fluxos de trabalho pequenos)
- Um administrador da igreja com permissão para **Editar Configurações** em B1Admin
- Uma ideia aproximada do cenário que você quer construir

</div>

## Módulos

| Tipo | O que | Evento / endpoint B1 |
|---|---|---|
| **Gatilho Instantâneo** | Assistir Eventos | qualquer evento B1 subscrito (`person.created`, `donation.created`, …) |
| **Ação** | Criar Pessoa | adiciona uma nova pessoa |
| **Ação** | Adicionar Doação | registra uma doação |
| **Ação** | Adicionar Membro do Grupo | adiciona uma pessoa a um grupo |
| **Busca** | Procurar Pessoas | encontra pessoas por nome ou email |

O gatilho instantâneo permite escolher qual evento ouvir — um módulo de gatilho por cenário, configurado por evento.

## Configuração

### 1. Criar uma chave de API B1

1. Em B1Admin vá para **Configurações → Desenvolvedor → Chaves de API**.
2. Clique em **Nova Chave de API**, nomeie como "Make", e conceda os escopos que você precisa.
3. **Inclua `settings:write`** se algum de seus cenários usar o gatilho instantâneo — Make registra um webhook em seu nome quando o cenário ativa.
4. Também conceda os escopos que os módulos de ação precisam (por ex. `donations:write` para o módulo Adicionar Doação).
5. Salve e copie a chave `cak_…`.

### 2. Instalar a conexão

1. Em Make, construa um novo cenário e solte o módulo de gatilho **B1.church** na tela.
2. Quando solicitado, **Crie uma conexão**. Cole a chave de API no campo *Chave de API* e deixe *URL Base de API* como `https://api.churchapps.org` (a menos que você esteja testando contra staging).
3. Clique em **Salvar** — Make testa a chave lendo seu perfil de igreja.

A conexão é salva em sua conta Make e reutilizada em cenários.

### 3. Configurar o gatilho

1. Abra as configurações do módulo **Assistir Eventos**.
2. Escolha o evento que você quer — por ex. `donation.created`.
3. Salve. Make gera uma URL de webhook única e a armazena internamente.

### 4. Adicionar módulos a jusante

Solte qualquer um dos centenas de módulos de aplicativo do Make na tela — Mailchimp, Google Sheets, Slack, HubSpot, seu próprio endpoint HTTP, etc. Mapeie a saída do gatilho (`event`, `churchId`, `data.id`, `data.amount`, …) nos campos de entrada deles. Os módulos flatten / iterator / router / aggregator do Make permitem construir fluxos de ramificação e paralelos que seriam difíceis em Zapier.

### 5. Ativar o cenário

Ative **Active** no cabeçalho do cenário. Make chama `POST /membership/webhooks` de B1 para registrar a URL. Daquele momento em diante, cada evento B1 correspondente flui através do cenário em tempo real.

Desativar o cenário chama `DELETE /membership/webhooks/{id}` para não haver subscrições órfãs.

## Receitas Comuns

### Sincronizar doações com um Google Sheet para análise de finanças

- **Gatilho** — B1: Assistir Eventos (`donation.created`)
- **Ação** — Google Sheets: Adicionar uma Linha. Mapeie `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` nas colunas da planilha.

### Notificação Slack condicional por valor de doação

- **Gatilho** — B1: Assistir Eventos (`donation.created`)
- **Roteador**:
  - Branch A — Filtro: `data.amount >= 1000` → Slack: postar em `#major-gifts`
  - Branch B — passagem — Slack: postar em `#donations`

### Nova pessoa → CRM + email de boas-vindas + Slack

- **Gatilho** — B1: Assistir Eventos (`person.created`)
- **Ação** — HubSpot: Criar Contato
- **Ação** — Mailgun: Enviar Email de Boas-vindas
- **Ação** — Slack: Notificar `#new-people` (em paralelo — use o roteador do Make)

## Como Funciona o Gatilho Instantâneo

O gatilho instantâneo é apoiado por webhook, não polling — quando ativado, Make chama `POST /membership/webhooks` com sua URL gerada e o evento que você escolheu. Quando o evento dispara em B1, B1 POSTs o envelope para a URL de Make e seu cenário funciona dentro de segundos. Desativar o cenário remove o webhook.

O gatilho apenas dispara para eventos que acontecem **enquanto o cenário está ativo**. Não há preenchimento retroativo.

## Limites e Notas

- **Um evento por módulo Assistir Eventos.** Para ouvir vários eventos em um cenário, solte vários módulos de gatilho em cenários separados (ou use um único módulo com a lista de eventos unida — veja abaixo).
- **Verificação de assinatura não é exposta** — Make não passa `X-B1-Signature` através do cenário; o limite de confiança é a URL de webhook inadivinhável por cenário do Make. Esta é a prática normal do Make. Se você precisa de verificações de assinatura explícitas, construa uma integração personalizada com o [SDK](/docs/developer/api/webhooks#sdk-support).
- **Contagem de operação** — cada chamada de API de um módulo de ação conta contra sua cota de operações do Make, não contra nada no lado de B1.

## Solução de Problemas

- **Teste de conexão falha** — na maioria das vezes um erro de digitação na chave de API. Re-copie de B1Admin (a chave completa é mostrada apenas uma vez; se você a perdeu, crie uma nova chave).
- **Módulo de gatilho não ativa** — verifique **Configurações → Desenvolvedor → Webhooks** em B1Admin. Se você não vir uma linha "Make — &lt;event&gt;" após ativar o cenário, a chave está faltando `settings:write`. Atualize a chave e reative.
- **Ação retorna `403 Forbidden`** — a chave de API carece do escopo para esse endpoint. Por exemplo, Adicionar Doação precisa de `donations:write`. Atualize a chave em B1Admin e re-teste.

## Personalizar o Aplicativo

O aplicativo Make B1.church é de código aberto — as definições JSON vivem no repositório `B1Integrations/Make/`. Se você precisar de um módulo que não existe (por ex. uma nova ação para um endpoint que não cobrimos), abra uma issue ou PR lá.

## Veja Também

- [Zapier](./zapier) — mesmo padrão com uma UI mais simples e um catálogo de aplicativo maior
- [Slack & Discord](./slack-discord) — notificações de chat incorporadas sem Make
- [Webhooks (referência de desenvolvedor)](/docs/developer/api/webhooks)
