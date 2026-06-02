---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Canalize novas pessoas B1, doadores ou membros do grupo em uma audiência Mailchimp para que a próxima série de boas-vindas, apelo de fim de ano, ou newsletter de voluntário puxe de uma lista que está sempre atualizada. A fiação vive inteiramente em Zapier (ou Make) — B1 dispara o evento, Mailchimp ingere o assinante.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Uma conta [Mailchimp](https://mailchimp.com) com pelo menos uma audiência em que você deseja que pessoas B1 sejam empurradas
- Uma conta [Zapier](https://zapier.com) (o nível gratuito cobre pequenas igrejas)
- Um usuário B1Admin com permissão para **Editar Configurações** para poder cunhar uma chave de API

</div>

## O Que Você Pode Conectar

| Direção | Gatilho B1 | Ação Mailchimp |
|---|---|---|
| B1 → Mailchimp | `person.created` | Adicionar/Atualizar Assinante |
| B1 → Mailchimp | `donation.created` | Adicionar Assinante à Tag (por ex. "Deu em 2026") |
| B1 → Mailchimp | `group.member.added` | Adicionar Assinante à Tag escopo para esse grupo |
| Mailchimp → B1 | Novo Assinante | B1 *Criar Pessoa* |

O lado Mailchimp expõe muito mais (campanhas, segmentos, automações) — veja [gatilhos Zapier Mailchimp](https://zapier.com/apps/mailchimp/integrations) para a lista completa. Qualquer coisa mapeável do envelope B1 está aberto.

## Configuração

### 1. Cunhar uma chave de API B1

Em B1Admin vá para **Configurações → Desenvolvedor → Chaves de API → Nova Chave de API**. Dê-lhe os escopos que o Zap precisa:

- `settings:write` — obrigatório para o gatilho registrar seu webhook
- `people:read` — para que o Zap possa ler primeiro/último nome, email, etc.
- (Opcional) `people:write` se você também planejar uma direção Mailchimp → B1

Salve e copie a string `cak_…` — é mostrada apenas uma vez.

### 2. Construir o Zap

1. **Gatilho:** `B1.church — Nova Pessoa`. No primeiro uso Zapier pede para você *Entrar em B1.church*; cole a chave de API.
2. **Ação:** `Mailchimp — Adicionar/Atualizar Assinante`. Mapeie a saída do gatilho:
   - `data.contactInfo.email` → Endereço de Email
   - `data.name.first` → Primeiro Nome
   - `data.name.last` → Sobrenome
   - (Opcional) `data.id` → um campo de mesclagem Mailchimp se você deseja manter o id de pessoa B1 junto.
3. Ative o Zap. Zapier registra um webhook `person.created` em B1 — verifique em **Configurações → Desenvolvedor → Webhooks** que uma linha chamada "Zapier — person.created" aparece.

Pronto. Adicione uma pessoa em B1Admin para confirmar — o novo assinante aparece em Mailchimp em segundos.

## Receitas Comuns

### Tag doadores automaticamente

- **Gatilho** — B1: Nova Doação
- **Ação** — B1: Procurar Pessoa (busca por `personId`) para obter o email
- **Ação** — Mailchimp: Adicionar Assinante à Tag (tag `Gave-2026`)

### Soltar uma série de boas-vindas específica do grupo

- **Gatilho** — B1: Novo Membro do Grupo, filtrado por `data.groupId`
- **Ação** — Mailchimp: Adicionar Assinante à Tag nomeada após o grupo; dispare sua automação existente em cima dessa tag

### Bidirecional: novas inscrições Mailchimp se tornam contatos B1

- **Gatilho** — Mailchimp: Novo Assinante
- **Ação** — B1: Criar Pessoa (mapeie Primeiro/Último/Email)

## Alternativa Make

O [aplicativo Mailchimp do Make](https://www.make.com/en/integrations/mailchimp) cobre 44 módulos — a fiação é idêntica, com o gatilho B1 *Assistir Eventos* substituindo o Zapier. Veja o [doc de visão geral Make](../make) para o lado B1.

## Limites e Notas

- **O nível gratuito Mailchimp capa contatos e audiências** — um Zap que inunda uma audiência gratuita passada seu limite começará a dar erro com `4xx Member limit reached`. Os logs Mailchimp tornam isso óbvio.
- **Mailchimp desduplicates por email**, então executar um Zap novamente na mesma pessoa B1 os atualiza no local; não cria duplicatas.
- **Desinscrições de Mailchimp não fluem de volta em B1.** Se você quer que desinscrições Mailchimp limpem a preferência "Enviar Mail" de B1, construa o Zap reverso explicitamente.

## Solução de Problemas

- **Zap nunca dispara** — verifique `Configurações → Desenvolvedor → Webhooks` para a linha `Zapier — person.created`. Se ausente, a chave de API estava faltando `settings:write` quando o Zap ativou. Re-cunhe, re-conecte, alterne o Zap desligado e ligado.
- **aviso `Member exists` em Adicionar/Atualizar** — mude a ação de *Adicionar Assinante* para *Adicionar/Atualizar Assinante* (o verbo importa). A variante upsert é idempotente.
- **Primeiro nome / sobrenome vêm em branco** — o `data.name.first` e `data.name.last` B1 são apenas preenchidos se esses campos forem definidos na pessoa. Mapeie `data.name.display` como fallback.

## Veja Também

- [Zapier (visão geral)](../zapier) — o lado B1 de cada receita Zapier
- [Make (visão geral)](../make) — mesma ideia, construtor visual
- [Webhooks (referência de desenvolvedor)](/docs/developer/api/webhooks#event-catalog)
