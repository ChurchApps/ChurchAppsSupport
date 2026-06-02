---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Dispare uma mensagem de texto [Clearstream](https://clearstream.io) de qualquer evento B1 — nova pessoa, novo presente, envio de formulário, atualização de calendário — e puxe respostas de volta como registros B1. O aplicativo Zapier do Clearstream expõe ambas as direções, então toda a fiação é uma receita e não código personalizado.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Uma conta [Clearstream](https://clearstream.io) com pelo menos uma lista e uma alocação de SMS
- Uma conta [Zapier](https://zapier.com)
- Um usuário B1Admin com permissão para **Editar Configurações**

</div>

## O Que Você Pode Conectar

| Direção | Gatilho | Ação |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Criar/Atualizar Assinante + Enviar Texto para Número |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Enviar Texto para Lista (por ex. notificar a equipe de finanças) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Enviar Texto para uma lista de roteamento (por ex. equipe de pedido de oração) |
| Clearstream → B1 | Novo Texto Recebido | B1: Criar Pessoa; tag com a palavra-chave que eles texaram |

Ações Clearstream do Zapier: *Enviar Texto para Número*, *Enviar Texto para Lista*, *Criar/Atualizar Assinante*, *Adicionar Assinante a Fluxo de Trabalho Automatizado*, *Adicionar Tag a Assinante*, *Remover Assinante da Lista*.

## Configuração

### 1. Cunhar uma chave de API B1

**Configurações → Desenvolvedor → Chaves de API → Nova Chave de API**:

- `settings:write` — obrigatório para B1 registrar o webhook do gatilho
- `people:read` — necessário para procurar a pessoa do evento (`personId` → nome/telefone/email)
- (Opcional) `people:write` se respostas Clearstream devem criar contatos B1

### 2. Construir o Zap "texto em novo presente"

1. **Gatilho** — B1.church: Nova Doação
2. **Ação** — B1.church: Procurar Pessoa (o `personId` da doação)
3. **Ação** — Clearstream: Enviar Texto para Número. Use o telefone da pessoa do passo 2 como destinatário, componha a mensagem (`"Obrigado por seu presente, {first}! …"`).

Ative o Zap. B1 registra o webhook de doação ao ativar; você verá `Zapier — donation.created` aparecer em **Configurações → Desenvolvedor → Webhooks**.

### 3. (Opcional) Puxe respostas de volta como registros B1

1. **Gatilho** — Clearstream: Novo Texto Recebido
2. **Ação** — Filtrar por Zapier na palavra-chave — por ex. apenas continuar se o corpo do texto começar com `PRAY`
3. **Ação** — B1.church: Procurar Pessoa (por telefone)
4. **Ação** — Filtro / Caminho — se não encontrado, crie-o; qualquer forma, arquive o corpo do texto em algum lugar (Slack, Google Sheet, ou um envio de formulário B1 via Webhooks por Zapier).

## Receitas Comuns

### Paging de equipe de voluntários

- **Gatilho** — B1.church: Nova Envio de Formulário (filtrado no id do formulário de pedido de oração)
- **Ação** — Clearstream: Enviar Texto para Lista, onde a lista é sua equipe pastoral de plantão. Componha o corpo como `Novo pedido de oração: {data.questions.0.answer}`.

### Sequência de follow-up de visitante pela primeira vez

- **Gatilho** — B1.church: Nova Pessoa, filtrada em uma tag de pessoa B1 "Visitante pela primeira vez"
- **Ação** — Clearstream: Adicionar Assinante a Fluxo de Trabalho Automatizado. Mapeie o id do fluxo de trabalho para um drip de texto de 7 dias pré-construído.

### Adesão de grupo impulsionada por palavra-chave

- **Gatilho** — Clearstream: Novo Texto Recebido (filtrar para palavra-chave `MENS`)
- **Ação** — B1.church: Procurar Pessoa (por telefone); fork em não-encontrado → Criar Pessoa
- **Ação** — B1.church: Adicionar Membro do Grupo ao grupo Ministério dos Homens

## Limites e Notas

- **Clearstream mede SMS por mensagem.** Cada ação Enviar Texto consome um ou mais créditos dependendo do comprimento e número de destinatários — verifique a alocação do seu plano.
- **Telefone deve estar em formato E.164** (por ex. `+15555550199`) para *Enviar Texto para Número*. O registro de pessoa B1 armazena o que foi inserido; use um passo *Formatter by Zapier — Números → Formatar Número de Telefone* se você não puder garantir o formato.
- **Nenhum cabeçalho é obrigatório do lado B1** — a autenticação Clearstream vive inteiramente dentro de sua conexão Zapier.

## Solução de Problemas

- **Gatilho nunca dispara** — `Configurações → Desenvolvedor → Webhooks` deve mostrar uma linha `Zapier — <event>` após o Zap ser ativado. Se não, a chave de API B1 está faltando `settings:write`. Re-cunha e re-conecte.
- **Clearstream retorna "Número de telefone inválido"** — o campo destinatário não está em E.164. Adicione um passo Formatar Número de Telefone.
- **Enviar Texto para Lista falha com `403`** — o usuário de API Clearstream carece de permissão para essa lista, ou o id da lista está errado. Ids da lista são visíveis na página de detalhe da lista Clearstream.

## Veja Também

- [Text In Church](./text-in-church) — plataforma SMS alternativa, forma de fiação semelhante
- [Mobile Message](./mobile-message) — para igrejas fora dos EUA
- [Zapier (visão geral)](../zapier) — lado B1 de cada receita Zapier
- [Documentos da API Clearstream](https://api-docs.clearstream.io/) — para integrações personalizado além do aplicativo Zapier
