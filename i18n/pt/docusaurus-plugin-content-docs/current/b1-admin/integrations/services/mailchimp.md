---
title: "Mailchimp"
description: "Sincronize pessoas e a participação em grupos ou listas salvas do B1 Admin com um público do Mailchimp, como tags, com etapas de configuração, importação inicial e solução de problemas."
---

# Mailchimp

<div class="article-intro">

Mantenha um público do Mailchimp sincronizado com o B1 automaticamente: as pessoas entram com nome, e-mail e telefone; a participação em grupos e listas vira tags do Mailchimp; e as pessoas excluídas são arquivadas. A sincronização é integrada ao B1 -- sem serviço de terceiros, sem cobrança por tarefa, e as alterações chegam em quase tempo real, e não em uma programação noturna.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Uma conta no [Mailchimp](https://mailchimp.com) com o público que você deseja que o B1 gerencie
- Uma **chave de API** do Mailchimp (Mailchimp: ícone de perfil → **Conta e faturamento → Extras → Chaves de API**)
- Seu **ID do público** (Mailchimp: **Público → Configurações → Nome do público e padrões**)
- Um usuário do B1Admin com a permissão **Editar configurações**

</div>

## O que é sincronizado {#what-syncs}

| Alteração no B1 | Efeito no Mailchimp |
|---|---|
| Pessoa adicionada ou atualizada | Assinante adicionado/atualizado (nome, sobrenome, telefone; novos assinantes entram como `subscribed`) |
| Pessoa excluída (ou apagada por LGPD/GDPR) | Assinante arquivado |
| Pessoa entra em um grupo | Tag com o nome do grupo adicionada |
| Pessoa sai de um grupo | Essa tag é removida |
| Pessoa entra em uma lista salva | Tag com o nome da lista adicionada |
| Pessoa sai de uma lista salva | Essa tag é removida |

**As listas salvas costumam ser a melhor fonte de tags.** Uma [lista salva](/docs/b1-admin/people/lists) do B1 é um público baseado em regras que se reavalia sozinho -- "todos do campus Norte", "membros que aceitaram receber e-mails pastorais". Direcione seus segmentos do Mailchimp para as tags das listas e a sincronização os mantém atualizados; use as tags de grupo para os envios às equipes ministeriais.

A sincronização é **unidirecional** (B1 → Mailchimp) e altera apenas os campos padrão do Mailchimp, por isso não entra em conflito com os campos de mesclagem ou os segmentos que você gerencia dentro do Mailchimp.

## Configuração {#setup}

1. No B1Admin, acesse **Configurações → Desenvolvedor → Webhooks → Novo webhook**.
2. Defina o **Tipo de conector** como **Mailchimp**.
3. Cole a sua **Chave de API do Mailchimp** e o **ID do público**. A chave é armazenada criptografada e nunca é exibida novamente.
4. Os eventos relevantes já vêm selecionados; desmarque os que não quiser (por exemplo, mantenha os eventos de pessoas, mas ignore as tags de grupo).
5. Salve. O B1 verifica a chave e o público no Mailchimp antes de aceitar -- um erro de digitação falha imediatamente, com o motivo.

Reabra o webhook e clique em **Enviar evento de teste** a qualquer momento para verificar novamente a conexão (no caso do Mailchimp, ele verifica a sua chave e o público, em vez de enviar um assinante de exemplo). Cada tentativa de sincronização é registrada no histórico de entregas do webhook, com a resposta real do Mailchimp, e as entregas com falha são repetidas automaticamente, com intervalos crescentes, por cerca de cinco dias.

## Importação inicial {#initial-import}

O conector sincroniza as *alterações* a partir do momento em que é ativado; ele não preenche retroativamente o seu diretório existente. No dia da configuração:

1. No B1Admin, acesse **Pessoas**, pesquise as pessoas que deseja (ou execute uma lista salva) e clique em **Exportar** para baixar um CSV.
2. No Mailchimp, use **Público → Importar contatos** para carregar o CSV, aplicando as tags durante a importação.

Fazer a carga inicial pelo importador do Mailchimp mantém o controle sobre a questão do consentimento -- importe apenas pessoas que de fato concordaram em receber os seus e-mails. Importar um diretório inteiro como contatos assinados pode violar os termos do Mailchimp e a legislação antispam (CAN-SPAM/GDPR).

## Limites e observações {#limits--notes}

- **Sincronização unidirecional.** Cancelamentos de inscrição, devoluções e edições feitas no Mailchimp não voltam ao B1. Quem cancela a inscrição no Mailchimp ainda pode receber e-mails enviados diretamente pelo B1 -- trate o Mailchimp como a fonte de verdade para o consentimento em envios em massa.
- **Pessoas sem endereço de e-mail são ignoradas** (registradas como tal no histórico de entregas), pois os assinantes do Mailchimp são identificados pelo e-mail.
- **Alterações de endereço de e-mail criam um novo assinante.** O Mailchimp identifica as pessoas pelo e-mail; por isso, ao alterar o e-mail de alguém no B1, a pessoa é adicionada com o novo endereço, e o assinante antigo permanece até você arquivá-lo no Mailchimp.
- **Somente os campos padrão são sincronizados** -- nome, sobrenome e telefone. Situação de membro, campus e campos personalizados do B1 não são mapeados para os campos de mesclagem do Mailchimp nesta versão; use tags de lista para segmentar.
- **Os nomes das tags são os nomes dos grupos/listas.** Ao renomear um grupo ou uma lista, a marcação passa a usar o novo nome; a tag antiga permanece nos assinantes existentes até ser removida no Mailchimp.
- **Os limites de contatos do Mailchimp continuam valendo** -- uma sincronização que leve um público do plano gratuito além do limite registrará erros `Member limit reached` no histórico de entregas.

## Outras receitas (Zapier / Make) {#other-recipes-zapier--make}

Tudo o que vai além da sincronização do público -- marcar doadores em `donation.created`, uma direção inversa Mailchimp → B1 ou a sincronização com outra plataforma de e-mail (Constant Contact, Brevo etc.) -- continua disponível pelo [Zapier](../zapier.md) ou pelo [Make](../make.md), que disparam com os mesmos eventos de webhook:

- **Marcar doadores:** B1 *Nova doação* → B1 *Encontrar pessoa* → Mailchimp *Adicionar assinante à tag* (`Gave-2026`)
- **Bidirecional:** Mailchimp *Novo assinante* → B1 *Criar pessoa*

Se você já tinha configurado a sincronização de pessoas e grupos pelo Zapier, desative esses Zaps depois de ativar o conector nativo -- executar os dois processa cada evento em duplicidade e consome tarefas do Zapier sem necessidade.

## Solução de problemas {#troubleshooting}

- **O salvamento falha com "Mailchimp rejected the API key"** -- a chave foi revogada ou digitada incorretamente. As chaves devem terminar com um sufixo de data center, como `-us21`.
- **O salvamento falha com "audience not found"** -- o ID do público não existe nessa conta. Copie-o em **Público → Configurações → Nome do público e padrões** (não é o nome do público).
- **Uma pessoa nunca apareceu no Mailchimp** -- verifique o histórico de entregas do webhook. "Skipped: person has no email address" significa exatamente isso; um erro `4xx` do Mailchimp mostra o motivo no corpo da resposta.
- **As entregas pararam completamente** -- depois de repetidas entregas esgotadas, o webhook é desativado automaticamente. Corrija a causa (normalmente uma chave revogada), reative-o e use **Enviar evento de teste** para confirmar.

## Veja também {#see-also}

- [Webhooks (referência para desenvolvedores)](/docs/developer/api/webhooks) -- o mecanismo por trás, o catálogo de eventos e a semântica de entrega e repetição
- [Listas salvas](/docs/b1-admin/people/lists) -- públicos baseados em regras que se encaixam naturalmente nas tags do Mailchimp
- [Zapier (visão geral)](../zapier.md) -- para receitas além da sincronização de públicos
