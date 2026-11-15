---
title: "Text In Church"
description: "Conecte o B1 Admin e o Text In Church com o Zapier: gere uma chave de API, monte um Zap que leva o cartão de conexão ao B1 e espelhe a participação em grupos."
---

# Text In Church

<div class="article-intro">

O [Text In Church](https://textinchurch.com) reúne SMS, fluxos de trabalho de acompanhamento e automações de cartões de conexão. Seu app no Zapier oferece as duas direções -- envia eventos do B1 para um fluxo de trabalho do Text In Church e traz os gatilhos de cartão de conexão ou de novo contato de volta para o B1.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Uma conta no [Text In Church](https://textinchurch.com) em um plano que inclua a integração com o Zapier
- Uma conta no [Zapier](https://zapier.com)
- Um usuário do B1Admin com a permissão **Editar configurações**

</div>

## O que você pode conectar {#what-you-can-wire-up}

| Direção | Gatilho | Ação |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Criar/atualizar pessoa + Adicionar ao grupo |
| B1 → Text In Church | B1 `form.submission.created` | Enviar mensagem de texto pela equipe responsável |
| B1 → Text In Church | B1 `group.member.added` | Adicionar ao grupo (espelhar a participação no grupo) |
| Text In Church → B1 | Cartão de conexão enviado | B1: Criar pessoa + Adicionar membro ao grupo |
| Text In Church → B1 | Pessoa criada | B1: Criar pessoa |
| Text In Church → B1 | Pessoa entrou no grupo | B1: Adicionar membro ao grupo |

As ações do Text In Church também incluem *Enviar mensagem de texto*, *Enviar transmissão de voz*, *Criar tarefa*, *Encontrar pessoa/grupo* e a inclusão e a remoção de membros de grupos.

## Configuração {#setup}

### 1. Crie uma chave de API do B1 {#1-mint-a-b1-api-key}

**Configurações → Desenvolvedor → Chaves de API → Nova chave de API**:

- `settings:write` -- necessário para conectar a chave ao Zapier e para os Zaps disparados pelo B1
- `people:read`, `people:write` -- para encontrar ou criar a pessoa
- `groups:write` -- para a sincronização de grupos
- (Opcional) `donations:write`, se você quiser enviar as confirmações de doação para o TIC

### 2. Conecte o Text In Church ao Zapier {#2-connect-text-in-church-to-zapier}

Siga o [guia de integração do Text In Church com o Zapier](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Eles geram um token de API dentro do painel do TIC.

### 3. Monte o Zap do cartão de conexão para o B1 {#3-build-the-connect-card-to-b1-zap}

É a direção mais comum. Os cartões de conexão enviados pelo TIC se tornam automaticamente novas pessoas no B1.

1. **Gatilho** -- Text In Church: Cartão de conexão enviado.
2. **Ação** -- B1.church: Encontrar pessoa (por e-mail).
3. **Ação** -- B1.church: Adicionar membro ao grupo "Novo contato", usando o ID da pessoa obtido na etapa 2.

O *Encontrar pessoa* do B1 interrompe o Zap com o erro "No person found" quando ninguém corresponde, então um Path não consegue ramificar por isso. Para novos contatos, ative o tratamento de erros do Zapier na etapa Encontrar pessoa e, no caminho de erro, execute B1.church: Criar pessoa e, em seguida, Adicionar membro ao grupo.

Ative o Zap. O próximo cartão de conexão enviado pelo TIC aparecerá automaticamente em **B1Admin → Pessoas**.

## Receitas comuns {#common-recipes}

### Disparar um fluxo no estilo de cartão de conexão a partir de um formulário do B1 {#trigger-a-connect-card-style-workflow-from-a-b1-form}

- **Gatilho** -- B1.church: Novo envio de formulário (filtrado pelo ID do formulário "Sou novo aqui")
- **Ação** -- Text In Church: Criar/atualizar pessoa, mapeando as respostas de e-mail, telefone e nome do formulário
- **Ação** -- Text In Church: Adicionar ao grupo, em que o grupo tem um fluxo de boas-vindas pronto anexado

### Espelhar a participação em grupos {#mirror-group-membership}

- **Gatilho** -- B1.church: Novo membro do grupo, filtrado por um `groupId` específico
- **Ação** -- Text In Church: Adicionar ao grupo (mesma pessoa, grupo espelhado). Combine com um Zap de `group.member.removed` se quiser uma sincronização completa.

### Avisar um líder quando alguém entrar {#page-a-leader-when-someone-joins}

- **Gatilho** -- B1.church: Novo membro do grupo
- **Ação** -- Text In Church: Enviar mensagem de texto, destinatário = o telefone do líder do grupo, corpo = `"{first} {last} just joined {group}"`.

## Limites e observações {#limits--notes}

- **O app do TIC no Zapier depende do plano.** Se a integração com o Zapier estiver desabilitada no painel do TIC, entre em contato com o suporte do TIC para habilitá-la no seu plano.
- **Os IDs de grupos são do TIC, e não do B1.** Ao espelhar, você precisará manter uma tabela de mapeamento em algum lugar (uma *Tabela de consulta* do Zapier ou valores fixos em cada Zap).
- **Enviar mensagem de texto consome créditos.** Cada Zap que dispara *Enviar texto* consome da sua cota de SMS do TIC.

## Solução de problemas {#troubleshooting}

- **O gatilho de cartão de conexão não dispara** -- o TIC precisa que a opção de integração com o Zapier esteja ativada. Confirme também se o formulário que você testou está configurado como "Cartão de conexão", e não como uma pesquisa genérica.
- **Criar pessoa no B1 falha com 401** -- a chave de API está errada, foi revogada ou não tem `people:write`. Gere uma nova.
- **Pessoas duplicadas no B1** -- o TIC envia tanto *Pessoa criada* quanto *Cartão de conexão enviado* para o mesmo evento. Escolha um como fonte de verdade e adicione um Filtro do Zapier no outro.

## Veja também {#see-also}

- [Clearstream](./clearstream.md) -- plataforma alternativa de SMS com estrutura semelhante no Zapier
- [Zapier (visão geral)](../zapier.md) -- o lado do B1 de todas as receitas do Zapier
- [Guia do Text In Church com o Zapier](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (documentação do TIC)
