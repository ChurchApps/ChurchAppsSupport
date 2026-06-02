---
title: "Zapier"
---

# Zapier

<div class="article-intro">

O aplicativo oficial B1.church no Zapier permite que um Zap reaja aos eventos em sua igreja (nova pessoa, nova doação, novo membro do grupo, …) e escreva registros de volta ao B1. Sem código, sem infraestrutura — você conecta tudo no editor de arrastar e soltar do Zapier, cola uma chave de API e ativa o Zap.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Uma conta no [Zapier](https://zapier.com) (o nível gratuito é suficiente para alguns Zaps)
- Um administrador da igreja com a permissão **Editar Configurações** no B1Admin (você criará uma chave de API)
- Uma ideia do que você quer fazer — por exemplo, "quando uma pessoa é adicionada no B1, adicioná-la à minha lista de Mailchimp"

</div>

## Gatilhos e Ações

| Tipo | O Quê | Evento / endpoint B1 |
|---|---|---|
| **Gatilho** | Nova Pessoa | `person.created` |
| **Gatilho** | Pessoa Atualizada | `person.updated` |
| **Gatilho** | Nova Doação | `donation.created` |
| **Gatilho** | Novo Membro do Grupo | `group.member.added` |
| **Gatilho** | Novo Envio de Formulário | `form.submission.created` |
| **Ação** | Criar Pessoa | adiciona uma nova pessoa |
| **Ação** | Adicionar Doação | registra uma doação |
| **Ação** | Adicionar Membro do Grupo | adiciona uma pessoa a um grupo |
| **Pesquisa** | Encontrar Pessoa | procura uma pessoa por nome ou e-mail |

Combine livremente com qualquer um dos 7.000+ aplicativos suportados do Zapier.

## Configuração

### 1. Criar uma chave de API B1

1. No B1Admin, vá para **Configurações → Desenvolvedor → Chaves de API**.
2. Clique em **Nova Chave de API**, dê um nome como "Zapier" e selecione os escopos que o Zap precisa.
3. **Importante:** Os gatilhos do Zapier registram um webhook em seu nome quando o Zap é ativado, o que requer o escopo **`settings:write`**. Sempre inclua `settings:write` se algum de seus Zaps usar um gatilho B1.
4. Também conceda os escopos que as ações precisam — por exemplo, uma ação "Adicionar Doação" precisa `donations:write`, "Criar Pessoa" precisa `people:write`.
5. Salve. A chave `cak_…` completa é mostrada **uma única vez** — copie-a.

### 2. Conectar o Zapier ao B1

1. No Zapier, construa um novo Zap.
2. Quando você escolhe um gatilho ou ação B1 pela primeira vez, o Zapier pede que você **Entre em B1.church**.
3. Cole a chave de API do passo 1 e clique em **Sim, Continuar**. O Zapier a valida em relação à sua igreja.

A conexão é salva no Zapier e reutilizada por cada Zap em sua conta.

### 3. Construir o Zap

Escolha um gatilho e adicione uma ou mais etapas de ação. Exemplos abaixo.

## Receitas Comuns

### Adicionar novas pessoas B1 ao Mailchimp

- **Gatilho** — B1: Nova Pessoa
- **Ação** — Mailchimp: Adicionar/Atualizar Assinante. Mapeie `name__first`, `name__last`, `contactInfo__email` do B1 para os campos Nome/Sobrenome/E-mail do Mailchimp.

### Postar doações em um canal do Slack com um cartão mais rico que o conector integrado

- **Gatilho** — B1: Nova Doação
- **Ação** — Slack: Enviar Mensagem de Canal. Componha qualquer layout — botões, anexos, etc. — que o [conector Slack](./slack-discord) integrado não possa.

### Adicionar novos membros do grupo a um Google Group

- **Gatilho** — B1: Novo Membro do Grupo (filtrado para um `groupId` específico)
- **Ação** — Filtro por Zapier: continuar apenas se o grupo B1 for aquele que você se importa
- **Ação** — B1: Encontrar Pessoa (use o `personId` do gatilho para buscar o e-mail)
- **Ação** — Google Groups: Adicionar Membro

### Encaminhar envios de formulário para um rastreador de projeto

- **Gatilho** — B1: Novo Envio de Formulário
- **Ação** — Notion / Linear / Asana / Trello: Criar página / issue / tarefa

## Como os Gatilhos Funcionam nos Bastidores

Os gatilhos são **REST hooks**, não polling — o Zapier não faz ping no B1 a cada 15 minutos. Quando você ativa o Zap, o Zapier pede ao B1 que registre um webhook apontando para uma URL privada do Zapier; quando o evento é disparado, o B1 envia um POST do envelope para o Zapier e seu Zap é acionado **em segundos**. Desative o Zap e o Zapier pede ao B1 que delete o webhook — sem subscrições órfãs.

Isso significa que o gatilho só é disparado para eventos que acontecem **depois** que o Zap é ativado. Não há preenchimento — ativar um Zap não reproduz as doações de ontem.

## Limites e Notas

- **Múltiplos Zaps com o mesmo gatilho** cada um registra seu próprio webhook B1 — não há conflito, mas é útil saber se você está inspecionando **Configurações → Desenvolvedor → Webhooks** e se perguntando por que três linhas idênticas de `Zapier — donation.created` estão lá.
- **Dados de teste na configuração do Zap** — quando você constrói um Zap, o Zapier pede dados de amostra para mapear campos. Ele puxará o evento correspondente mais recente do B1 se houver um; caso contrário, usa uma amostra sintética da definição do aplicativo.
- **Falhas de ação aparecem como erros de Zap** no histórico de tarefas do Zapier. Causa comum: uma chave de API sem o escopo correto (por exemplo, uma ação "Adicionar Doação" precisa `donations:write`). Recrie a chave com os escopos corretos e reconecte no Zapier.
- **Quotas de chamadas de API de saída** — cada chamada de API B1 de uma ação conta para sua quota de tarefas do Zapier, não para nada do lado do B1.

## Solução de Problemas

- **"Autenticação falhou"** ao conectar — a chave de API está incorreta, revogada ou faltam os escopos que o Zap precisa. Recrie-a no B1Admin com pelo menos `settings:write` mais quaisquer escopos de recurso que o Zap toque, depois atualize a conexão.
- **Gatilho nunca dispara** — confirme que o webhook foi realmente registrado: no B1Admin, **Configurações → Desenvolvedor → Webhooks** deve agora mostrar uma linha chamada "Zapier — &lt;event&gt;". Se não estiver lá, a chave de API provavelmente não tinha `settings:write` quando você ativou o Zap. Corrija a chave, alterne o Zap desligado e ligado novamente.
- **Gatilho dispara duas vezes** — o Zapier ocasionalmente reentrega se seu reconhecimento foi perdido. Use uma etapa "Filtro por Zapier" em um id único (por exemplo, o `id` da pessoa) se você precisar de desduplicação estrita.

## Veja Também

- [Make](./make) — o mesmo padrão, plataforma diferente
- [Slack & Discord](./slack-discord) — notificações de chat mais simples sem Zapier
- [Webhooks (referência de desenvolvedor)](/docs/developer/api/webhooks)
