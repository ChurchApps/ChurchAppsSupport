---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Mantenha uma audiência do Mailchimp sincronizada com o B1 automaticamente: as pessoas entram com nome, e-mail e telefone; a participação em grupos e listas se torna tags do Mailchimp; pessoas excluídas são arquivadas. A sincronização faz parte do B1 — sem serviço de terceiros, sem cobrança por tarefa, e as mudanças chegam quase em tempo real em vez de em um cronograma noturno.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Uma conta do [Mailchimp](https://mailchimp.com) com a audiência que você deseja que o B1 gerencie
- Uma **chave de API** do Mailchimp (Mailchimp: ícone de perfil → **Account & billing → Extras → API keys**)
- Seu **Audience ID** (Mailchimp: **Audience → Settings → Audience name and defaults**)
- Um usuário do B1Admin com permissão **Edit Settings**

</div>

## O Que Sincroniza

| Mudança no B1 | Efeito no Mailchimp |
|---|---|
| Pessoa adicionada ou atualizada | Assinante adicionado/atualizado (nome, sobrenome, telefone; novos assinantes entram como `subscribed`) |
| Pessoa excluída (ou apagada por LGPD/GDPR) | Assinante arquivado |
| Pessoa entra em um grupo | Tag com o nome do grupo adicionada |
| Pessoa sai de um grupo | Essa tag removida |
| Pessoa entra em uma lista salva | Tag com o nome da lista adicionada |
| Pessoa sai de uma lista salva | Essa tag removida |

**Listas salvas costumam ser a melhor fonte de tags.** Uma [lista salva](/docs/b1-admin/people/lists) do B1 é uma audiência baseada em regras que se reavalia sozinha — "todos do campus Norte", "membros que aceitaram e-mails pastorais". Aponte seus segmentos do Mailchimp para as tags das listas e a sincronização os mantém atualizados; use as tags de grupo para envios a equipes de ministério.

A sincronização é **unidirecional** (B1 → Mailchimp) e altera apenas os campos padrão do Mailchimp, então não entra em conflito com campos de mesclagem ou segmentos que você gerencia dentro do Mailchimp.

## Configuração

1. No B1Admin, vá para **Settings → Developer → Webhooks → New Webhook**.
2. Defina **Connector Type** como **Mailchimp**.
3. Cole sua **Mailchimp API Key** e seu **Audience ID**. A chave é armazenada criptografada e nunca é mostrada novamente.
4. Os eventos relevantes já vêm selecionados; desmarque os que não quiser (por exemplo, mantenha os eventos de pessoa, mas desligue as tags de grupo).
5. Salve. O B1 verifica a chave e a audiência no Mailchimp antes de aceitar — um erro de digitação falha imediatamente, com o motivo.

Use **Send Test** a qualquer momento para verificar novamente a conexão. Cada tentativa de sincronização é registrada no histórico de entregas do webhook, com a resposta real do Mailchimp, e entregas com falha são repetidas automaticamente, com intervalos crescentes, por cerca de cinco dias.

## Importação Inicial

O conector sincroniza *mudanças* a partir do momento em que é ativado; ele não preenche retroativamente o seu diretório existente. Para o dia da configuração:

1. No B1Admin, vá para **People**, pesquise as pessoas que deseja (ou execute uma lista salva) e clique em **Export** para baixar um CSV.
2. No Mailchimp, use **Audience → Import contacts** para carregar o CSV, aplicando as tags que desejar durante a importação.

Fazer a carga inicial pelo importador do Mailchimp mantém o controle sobre a questão do consentimento — importe apenas pessoas que de fato concordaram em receber seus e-mails. Importar em massa um diretório inteiro como contatos assinantes pode violar os termos do Mailchimp e as leis antispam (CAN-SPAM/GDPR).

## Limites e Observações

- **Sincronização unidirecional.** Cancelamentos de assinatura, devoluções (bounces) e edições feitas no Mailchimp não voltam para o B1. Quem cancela a assinatura no Mailchimp ainda pode receber e-mails enviados diretamente pelo B1 — trate o Mailchimp como a fonte da verdade para o consentimento de e-mails em massa.
- **Pessoas sem endereço de e-mail são ignoradas** (registradas como tal no histórico de entregas) — os assinantes do Mailchimp são identificados pelo e-mail.
- **Mudanças de endereço de e-mail criam um novo assinante.** O Mailchimp identifica as pessoas pelo e-mail, então alterar o e-mail de alguém no B1 a adiciona com o novo endereço; o assinante antigo permanece até você arquivá-lo no Mailchimp.
- **Apenas os campos padrão são sincronizados** — nome, sobrenome e telefone. Status de membro, campus e campos personalizados do B1 não são mapeados para campos de mesclagem do Mailchimp nesta versão; use tags de lista para segmentar.
- **Os nomes das tags são os nomes dos grupos/listas.** Renomear um grupo ou lista faz a marcação começar com o novo nome; a tag antiga permanece nos assinantes existentes até ser removida no Mailchimp.
- **Os limites de contatos do Mailchimp continuam valendo** — uma sincronização que leve uma audiência do plano gratuito além do limite registrará erros `Member limit reached` no histórico de entregas.

## Outras Receitas (Zapier / Make)

Qualquer coisa além da sincronização de audiência — marcar doadores em `donation.created`, o sentido inverso do Mailchimp → B1, ou sincronizar com outra plataforma de e-mail (Constant Contact, Brevo etc.) — ainda está disponível pelo [Zapier](../zapier) ou pelo [Make](../make), que disparam com os mesmos eventos de webhook:

- **Marcar doadores:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Duas vias:** Mailchimp *New Subscriber* → B1 *Create Person*

Se você já tinha configurado a sincronização de pessoas/grupos pelo Zapier, desligue esses Zaps depois de ativar o conector nativo — executar os dois processa cada evento duas vezes e gasta tarefas do Zapier à toa.

## Solução de Problemas

- **Salvar falha com "Mailchimp rejected the API key"** — a chave foi revogada ou digitada incorretamente. As chaves devem terminar com um sufixo de data center, como `-us21`.
- **Salvar falha com "audience not found"** — o Audience ID não existe nessa conta. Copie-o em **Audience → Settings → Audience name and defaults** (não é o nome da audiência).
- **Uma pessoa nunca apareceu no Mailchimp** — verifique o histórico de entregas do webhook. "Skipped: person has no email address" significa exatamente isso; um `4xx` do Mailchimp mostra o motivo no corpo da resposta.
- **As entregas pararam completamente** — após falhas repetidas esgotarem as tentativas, o webhook se desativa automaticamente. Corrija a causa (geralmente uma chave revogada), reative-o e use **Send Test** para confirmar.

## Veja Também

- [Webhooks (referência do desenvolvedor)](/docs/developer/api/webhooks) — o motor por trás disso, o catálogo de eventos e a semântica de entrega/repetição
- [Listas Salvas](/docs/b1-admin/people/lists) — audiências baseadas em regras que se encaixam naturalmente nas tags do Mailchimp
- [Zapier (visão geral)](../zapier) — para receitas além da sincronização de audiência
