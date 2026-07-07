---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Direcione novos contatos B1, doadores ou membros de grupos para um público Mailchimp para que a próxima série de boas-vindas, apelo de final de ano ou boletim de voluntários puxe de uma lista que está sempre atualizada. B1 não possui sincronização integrada do Mailchimp — a conexão vive inteiramente no Zapier (ou Make): B1 dispara o evento, Mailchimp absorve o inscrito.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Uma conta [Mailchimp](https://mailchimp.com) com pelo menos um público para o qual você deseja que as pessoas B1 sejam direcionadas
- Uma conta [Zapier](https://zapier.com) (o nível gratuito cobre igrejas pequenas)
- Um usuário B1Admin com permissão **Editar Configurações** para que você possa gerar uma chave API

</div>

## O que Você Pode Conectar

| Direção | Gatilho B1 | Ação Mailchimp |
|---|---|---|
| B1 → Mailchimp | `person.created` | Adicionar/Atualizar Inscrito |
| B1 → Mailchimp | `donation.created` | Adicionar Inscrito à Tag (por exemplo, "Doado em 2026") |
| B1 → Mailchimp | `group.member.added` | Adicionar Inscrito à Tag com escopo para esse grupo |
| Mailchimp → B1 | Novo Inscrito | B1 *Criar Pessoa* |

O lado Mailchimp expõe muito mais (campanhas, segmentos, automações) — consulte [Gatilhos Mailchimp Zapier](https://zapier.com/apps/mailchimp/integrations) para a lista completa. Qualquer coisa mapeável do envelope B1 é permitida.

## Configuração

### 1. Gere uma chave API B1

No B1Admin vá para **Configurações → Desenvolvedor → Chaves de API → Nova Chave de API**. Dê a ele os escopos que o Zap precisa:

- `settings:write` — necessário para o gatilho registrar seu webhook
- `people:read` — para que o Zap possa ler nome/sobrenome, email, etc.
- (Opcional) `people:write` se você também planejar uma direção Mailchimp → B1

Salve e copie a string `cak_…` — ela é mostrada apenas uma vez.

### 2. Construa o Zap

1. **Gatilho:** `B1.church — Nova Pessoa`. No primeiro uso, o Zapier pede para você *Fazer login no B1.church*; cole a chave API.
2. **Ação:** `Mailchimp — Adicionar/Atualizar Inscrito`. Mapeie a saída do gatilho:
   - `data.contactInfo.email` → Endereço de Email
   - `data.name.first` → Primeiro Nome
   - `data.name.last` → Sobrenome
   - (Opcional) `data.id` → um campo de mesclagem Mailchimp se você quiser manter o id da pessoa B1 ao lado.
3. Ligue o Zap. Zapier registra um webhook `person.created` no B1 — verifique em **Configurações → Desenvolvedor → Webhooks** que uma linha nomeada "Zapier — person.created" aparece.

Pronto. Adicione uma pessoa no B1Admin para confirmar — o novo inscrito aparece no Mailchimp em segundos.

## Receitas Comuns

### Etiquetar doadores automaticamente

- **Gatilho** — B1: Nova Doação
- **Ação** — B1: Encontrar Pessoa (pesquisa por `personId`) para obter o email
- **Ação** — Mailchimp: Adicionar Inscrito à Tag (tag `Gave-2026`)

### Soltar uma série de boas-vindas específica do grupo

- **Gatilho** — B1: Novo Membro do Grupo, filtrado por `data.groupId`
- **Ação** — Mailchimp: Adicionar Inscrito à Tag nomeada após o grupo; dispare sua automação existente dessa tag

### Bidirecional: novos inscritos Mailchimp se tornam contatos B1

- **Gatilho** — Mailchimp: Novo Inscrito
- **Ação** — B1: Criar Pessoa (mapeie Primeiro Nome/Sobrenome/Email)

## Alternativa Make

O [aplicativo Mailchimp](https://www.make.com/en/integrations/mailchimp) do Make cobre 44 módulos — a conexão é idêntica, com o gatilho B1 *Assistir Eventos* substituindo o do Zapier. Consulte o [documento de visão geral Make](../make) para o lado B1.

## Limites e Notas

- **O nível gratuito do Mailchimp limita contatos e públicos** — um Zap que inunda um público gratuito além de seu limite começará a errar com `4xx Member limit reached`. Os logs do Mailchimp tornam isso óbvio.
- **Mailchimp desidentifica por email**, então executar um Zap novamente na mesma pessoa B1 a atualiza no lugar; não cria duplicatas.
- **Cancelamentos de inscrição do Mailchimp não fluem de volta para B1.** Se você quiser que cancelamentos de inscrição do Mailchimp limpem a preferência "Enviar Email" de B1, construa o Zap reverso explicitamente.

## Solução de Problemas

- **Zap nunca dispara** — verifique `Configurações → Desenvolvedor → Webhooks` para a linha `Zapier — person.created`. Se ausente, a chave API estava faltando `settings:write` quando o Zap ligou. Regerine, reconecte, alterne o Zap desligado e ligado.
- **Aviso `Member exists` em Adicionar/Atualizar** — mude a ação de *Adicionar Inscrito* para *Adicionar/Atualizar Inscrito* (o verbo importa). A variante de upsert é idempotente.
- **Primeiro nome / sobrenome aparecem em branco** — `data.name.first` e `data.name.last` de B1 são preenchidos apenas se esses campos forem definidos na pessoa. Mapeie `data.name.display` como fallback.

## Veja Também

- [Zapier (visão geral)](../zapier) — o lado B1 de cada receita Zapier
- [Make (visão geral)](../make) — mesma ideia, construtor visual
- [Webhooks (referência do desenvolvedor)](/docs/developer/api/webhooks#event-catalog)
