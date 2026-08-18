---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Mantenha um público do Mailchimp sincronizado com B1 automaticamente: as pessoas fluem com seu nome, email e telefone; a associação a grupos e listas se torna tags do Mailchimp; as pessoas deletadas são arquivadas. A sincronização é integrada ao B1 — nenhum serviço de terceiros, sem medição por tarefa e as alterações chegam em tempo quase real em vez de em um cronograma noturno.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Uma conta [Mailchimp](https://mailchimp.com) com o público que você quer que B1 gerencie
- Uma **chave de API** do Mailchimp (Mailchimp: ícone de perfil → **Conta e faturamento → Extras → Chaves de API**)
- Seu **ID de Público** (Mailchimp: **Público → Configurações → Nome e padrões do público**)
- Um usuário de B1Admin com permissão **Editar Configurações**

</div>

## O Que É Sincronizado

| Alteração B1 | Efeito Mailchimp |
|---|---|
| Pessoa adicionada ou atualizada | Assinante adicionado/atualizado (nome, sobrenome, telefone; novos assinantes chegam como `subscribed`) |
| Pessoa deletada (ou apagada por GDPR) | Assinante arquivado |
| Pessoa entra em um grupo | Tag nomeada após o grupo adicionada |
| Pessoa sai de um grupo | Essa tag removida |
| Pessoa entra em uma lista salva | Tag nomeada após a lista adicionada |
| Pessoa sai de uma lista salva | Essa tag removida |

**Listas salvas são geralmente a melhor fonte de tags.** Uma [lista salva](/docs/b1-admin/people/lists) do B1 é um público baseado em regras que se reavalia — "todos no campus Norte", "membros que optaram por emails pastorais". Aponte seus segmentos do Mailchimp para tags de listas e a sincronização as mantém; use tags de grupo para envios de equipes de ministério.

A sincronização é **unidirecional** (B1 → Mailchimp) e toca apenas nos campos padrão do Mailchimp, então não pode conflitar com campos de mesclagem ou segmentos que você gerencia dentro do Mailchimp.

## Configuração

1. Em B1Admin vá para **Configurações → Desenvolvedor → Webhooks → Adicionar Webhook**.
2. Defina **Tipo de Conector** como **Mailchimp**.
3. Cole sua **Chave de API do Mailchimp** e **ID de Público**. A chave é armazenada criptografada e nunca é mostrada novamente.
4. Os eventos relevantes são pré-selecionados; desmarque quaisquer que você não queira (por exemplo, deixe os eventos de pessoa ativados mas ignore tags de grupo).
5. Salve. B1 verifica a chave e o público contra o Mailchimp antes de aceitar — um erro de digitação falha imediatamente com uma razão.

Use **Enviar Teste** a qualquer momento para reverificar a conexão. Todas as tentativas de sincronização são registradas no histórico de entrega do webhook com a resposta real do Mailchimp, e as entregas falhadas são repetidas automaticamente com backoff por cerca de cinco dias.

## Importação Inicial

O conector sincroniza *alterações* a partir do momento em que está ativo; não faz o preenchimento anterior de seu diretório existente. Para o dia da configuração:

1. Em B1Admin vá para **Pessoas**, procure pelas pessoas que você deseja (ou execute uma lista salva) e clique em **Exportar** para baixar um CSV.
2. No Mailchimp use **Público → Importar contatos** para carregar o CSV, aplicando quaisquer tags durante a importação.

Fazer o carregamento inicial através do importador do Mailchimp o mantém no controle da questão de consentimento — importe apenas pessoas que realmente concordaram em receber seus emails. A importação em massa de um diretório inteiro como contatos assinados pode violar os termos do Mailchimp e as leis anti-spam (CAN-SPAM/GDPR).

## Limites e Notas

- **Sincronização unidirecional.** Cancelamentos de inscrição, devoluções e edições feitas no Mailchimp não voltam ao B1. Alguém que se desinscrever no Mailchimp ainda pode receber emails enviados diretamente do B1 — trate o Mailchimp como a fonte de verdade para consentimento de email em massa.
- **Pessoas sem um endereço de email são puladas** (registradas como tal no histórico de entrega) — assinantes do Mailchimp são codificados por email.
- **Mudanças de endereço de email criam um novo assinante.** O Mailchimp identifica pessoas por email, então mudar o email de alguém em B1 os adiciona sob o novo endereço; o assinante antigo permanece até que você o arquive no Mailchimp.
- **Apenas campos padrão são sincronizados** — nome, sobrenome, telefone. Status de associação, campus e campos personalizados do B1 não mapeiam para campos de mesclagem do Mailchimp nesta versão; use tags de lista para segmentar em vez disso.
- **Nomes de tags são os nomes do grupo/lista.** Renomear um grupo ou lista começa a marcar com o novo nome; a tag antiga permanece nos assinantes existentes até ser removida no Mailchimp.
- **Os limites de contato do Mailchimp ainda se aplicam** — uma sincronização que ultrapassa o limite de um público de nível gratuito registrará erros `Limite de membros atingido` no histórico de entrega.

## Outras Receitas (Zapier / Make)

Qualquer coisa além da sincronização de público — marcar doadores em `donation.created`, uma direção inversa Mailchimp → B1, ou sincronizar com uma plataforma de email completamente diferente (Constant Contact, Brevo, etc.) — ainda está disponível através de [Zapier](../zapier) ou [Make](../make), que acionam os mesmos eventos de webhook:

- **Marcar doadores:** B1 *Nova Doação* → B1 *Encontrar Pessoa* → Mailchimp *Adicionar Assinante à Tag* (`Deu-2026`)
- **Bidirecional:** Mailchimp *Novo Assinante* → B1 *Criar Pessoa*

Se você estava anterior conectando sincronização de pessoa/grupo através do Zapier, desligue esses Zaps após ativar o conector nativo — executar ambos duplica o processamento de cada evento e queima tarefas do Zapier para nada.

## Solução de Problemas

- **O salvamento falha com "Mailchimp rejeitou a chave de API"** — a chave foi revogada ou digitada incorretamente. As chaves devem terminar com um sufixo de data-center como `-us21`.
- **O salvamento falha com "público não encontrado"** — o ID de Público não existe sob essa conta. Copie-o de **Público → Configurações → Nome e padrões do público** (não é o nome do público).
- **Uma pessoa nunca apareceu no Mailchimp** — verifique o histórico de entrega do webhook. "Pulado: pessoa não tem endereço de email" significa exatamente isso; um `4xx` do Mailchimp mostra a razão no corpo da resposta.
- **As entregas pararam completamente** — após entregas repetidas e esgotadas, o webhook se desativa automaticamente. Corrija a causa (geralmente uma chave revogada), reative-o e use **Enviar Teste** para confirmar.

## Ver Também

- [Webhooks (referência do desenvolvedor)](/docs/developer/api/webhooks) — o mecanismo subjacente, catálogo de eventos, semântica de entrega/retry
- [Listas Salvas](/docs/b1-admin/people/lists) — públicos baseados em regras que mapeiam naturalmente para tags do Mailchimp
- [Zapier (visão geral)](../zapier) — para receitas além da sincronização de público
