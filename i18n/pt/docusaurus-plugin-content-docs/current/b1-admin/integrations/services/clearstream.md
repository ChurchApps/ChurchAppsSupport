---
title: "Clearstream"
description: "Conecte o SMS da Clearstream ao B1 Admin pelo Zapier: envie mensagens de texto para novas doações ou envios de formulários e traga as respostas recebidas de volta como pessoas."
---

# Clearstream

<div class="article-intro">

Dispare uma mensagem de texto da [Clearstream](https://clearstream.io) a partir de qualquer evento do B1 -- nova pessoa, nova doação, envio de formulário, atualização de calendário -- e traga as respostas de volta como registros do B1. O app da Clearstream no Zapier oferece as duas direções, então toda a integração é uma receita, e não código personalizado.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Uma conta na [Clearstream](https://clearstream.io) com pelo menos uma lista e uma cota de SMS
- Uma conta no [Zapier](https://zapier.com)
- Um usuário do B1Admin com a permissão **Editar configurações**

</div>

## O que você pode conectar {#what-you-can-wire-up}

| Direção | Gatilho | Ação |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Criar/atualizar assinante + Enviar texto para número |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Enviar texto para lista (por exemplo, avisar a equipe financeira) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Enviar texto para uma lista de encaminhamento (por exemplo, a equipe de pedidos de oração) |
| Clearstream → B1 | Nova mensagem de texto recebida | B1: Criar pessoa; marcar com a palavra-chave enviada no texto |

Ações da Clearstream no Zapier: *Enviar texto para número*, *Enviar texto para lista*, *Criar/atualizar assinante*, *Adicionar assinante a fluxo de trabalho automatizado*, *Adicionar marcação ao assinante*, *Remover assinante da lista*.

## Configuração {#setup}

### 1. Crie uma chave de API do B1 {#1-mint-a-b1-api-key}

**Configurações → Desenvolvedor → Chaves de API → Nova chave de API**:

- `settings:write` -- necessário para conectar a chave ao Zapier e para o B1 registrar o webhook do gatilho
- `people:read` -- necessário para buscar a pessoa a partir do evento (`personId` → nome/telefone/e-mail)
- (Opcional) `people:write`, se as respostas da Clearstream devem criar contatos no B1

### 2. Monte o Zap "enviar texto para nova doação" {#2-build-the-text-on-new-gift-zap}

1. **Gatilho** -- B1.church: Nova doação
2. **Ação** -- B1.church: Encontrar pessoa (o `personId` da doação)
3. **Ação** -- Clearstream: Enviar texto para número. Use o telefone da pessoa obtido na etapa 2 como destinatário e componha a mensagem (`"Thanks for your gift, {first}! …"`).

Ative o Zap. O B1 registra o webhook de doações na ativação; você verá `Zapier — donation.created` aparecer em **Configurações → Desenvolvedor → Webhooks**.

### 3. (Opcional) Traga as respostas de volta como registros do B1 {#3-optional-pull-replies-back-as-b1-records}

1. **Gatilho** -- Clearstream: Nova mensagem de texto recebida
2. **Ação** -- Filtro pelo Zapier com a palavra-chave -- por exemplo, continue somente se o texto começar com `PRAY`
3. **Ação** -- registre o conteúdo da mensagem em um local que a sua equipe verá (Slack, uma planilha do Google ou uma tarefa do B1). O *Encontrar pessoa* do B1 busca pessoas somente por ID, e-mail ou nome, e não por telefone; por isso, associe a resposta a uma pessoa do B1 manualmente (ou adicione uma requisição GET do Webhooks by Zapier ao endpoint `/membership/people/search/phone?number=…` do B1).

## Receitas comuns {#common-recipes}

### Acionar a equipe de voluntários {#volunteer-team-paging}

- **Gatilho** -- B1.church: Novo envio de formulário (filtrado pelo ID do formulário de pedido de oração)
- **Ação** -- Clearstream: Enviar texto para lista, em que a lista é a sua equipe pastoral de plantão. Componha o corpo da mensagem como `New prayer request: {data.questions.0.answer}`.

### Sequência de acompanhamento para visitantes de primeira vez {#first-time-visitor-follow-up-sequence}

- **Gatilho** -- B1.church: Nova pessoa, filtrada pela situação de membro da pessoa (por exemplo, *Visitante*)
- **Ação** -- Clearstream: Adicionar assinante a fluxo de trabalho automatizado. Associe o ID do fluxo a uma sequência pronta de textos de 7 dias.

### Participação em grupo por palavra-chave {#keyword-driven-group-join}

- **Gatilho** -- Clearstream: Nova mensagem de texto recebida (filtrada pela palavra-chave `MENS`)
- **Ação** -- B1.church: Criar pessoa com o nome e o telefone de quem enviou a mensagem (o *Encontrar pessoa* do B1 não consegue buscar pessoas por telefone, então verifique duplicidades depois em **Pessoas**)
- **Ação** -- B1.church: Adicionar membro ao grupo Ministério masculino

## Limites e observações {#limits--notes}

- **A Clearstream cobra os SMS por mensagem.** Cada ação de Enviar texto consome um ou mais créditos, dependendo do tamanho e do número de destinatários -- confira a cota do seu plano.
- **O telefone precisa estar no formato E.164** (por exemplo, `+15555550199`) para *Enviar texto para número*. O cadastro da pessoa no B1 armazena o que foi digitado; use uma etapa *Formatter by Zapier -- Numbers → Format Phone Number* caso não consiga garantir o formato.
- **Não é necessário nenhum cabeçalho do lado do B1** -- a autenticação da Clearstream fica totalmente dentro da conexão dela no Zapier.

## Solução de problemas {#troubleshooting}

- **O gatilho nunca dispara** -- `Settings → Developer → Webhooks` deve mostrar uma linha `Zapier — <event>` depois que o Zap for ativado. Se não aparecer, a chave de API do B1 não tem `settings:write`. Gere a chave novamente e reconecte.
- **A Clearstream retorna "Invalid phone number"** -- o campo de destinatário não está em E.164. Adicione uma etapa Format Phone Number.
- **Enviar texto para lista falha com `403`** -- o usuário da API da Clearstream não tem permissão para aquela lista, ou o ID da lista está errado. Os IDs das listas aparecem na página de detalhes da lista na Clearstream.

## Veja também {#see-also}

- [Text In Church](./text-in-church.md) -- plataforma alternativa de SMS, com estrutura de integração semelhante
- [Mobile Message](./mobile-message.md) -- para igrejas fora dos EUA
- [Zapier (visão geral)](../zapier.md) -- o lado do B1 de todas as receitas do Zapier
- [Documentação da API da Clearstream](https://api-docs.clearstream.io/) -- para integrações personalizadas além do app do Zapier
