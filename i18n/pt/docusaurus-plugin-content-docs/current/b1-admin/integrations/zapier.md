---
title: "Zapier"
---

# Zapier

<div class="article-intro">

O aplicativo oficial do B1.church no Zapier permite que um Zap reaja a eventos da sua igreja (nova pessoa, nova doação, novo membro de grupo, …) e grave registros de volta no B1. Sem programação, sem infraestrutura — você monta tudo no editor de arrastar e soltar do Zapier, cola uma chave de API e liga o Zap.

</div>

:::caution Aguardando a aprovação do Zapier
O aplicativo B1.church está pronto e funcionando, mas ainda aguarda a revisão do Zapier antes de aparecer publicamente no diretório de aplicativos do editor de Zaps. Até ser aprovado, somente contas convidadas podem usá-lo. Tudo o que está abaixo descreve como ele vai funcionar após a aprovação.
:::

<div class="prereqs">
<h4>Antes de começar</h4>

- Uma conta no [Zapier](https://zapier.com) (o plano gratuito é suficiente para alguns Zaps)
- Um administrador da igreja com a permissão **Editar configurações** no B1Admin (você vai criar uma chave de API)
- Uma ideia do que você quer fazer — por exemplo, "quando uma pessoa for adicionada no B1, incluí-la na minha lista do Mailchimp"

</div>

## Gatilhos e ações

| Tipo | O quê | Evento / endpoint do B1 |
|---|---|---|
| **Gatilho** | Nova pessoa | `person.created` |
| **Gatilho** | Pessoa atualizada | `person.updated` |
| **Gatilho** | Nova doação | `donation.created` |
| **Gatilho** | Novo membro de grupo | `group.member.added` |
| **Gatilho** | Nova resposta de formulário | `form.submission.created` |
| **Ação** | Criar pessoa | adiciona uma nova pessoa |
| **Ação** | Adicionar doação | registra uma doação |
| **Ação** | Adicionar membro ao grupo | adiciona uma pessoa a um grupo |
| **Ação** | Localizar pessoa | busca uma pessoa por id, e-mail ou nome; falha a tarefa se ninguém corresponder |

Combine esses itens livremente com qualquer um dos mais de 7.000 aplicativos suportados pelo Zapier.

## Configuração

### 1. Crie uma chave de API do B1

1. No B1Admin, acesse **Configurações → Desenvolvedor → Chaves de API**.
2. Clique em **Nova chave de API**, dê um nome como "Zapier" e selecione os escopos de que o Zap precisa.
3. **Importante:** os gatilhos do Zapier registram um webhook em seu nome quando o Zap é ligado, o que exige o escopo **`settings:write`**. Inclua sempre `settings:write` se algum dos seus Zaps usar um gatilho do B1.
4. Conceda também os escopos que as ações exigem — por exemplo, a ação "Adicionar doação" precisa de `donations:write`, e "Criar pessoa" precisa de `people:write`.
5. Salve. A chave completa `cak_…` é exibida **uma única vez** — copie-a.

### 2. Conecte o Zapier ao B1

1. No Zapier, crie um novo Zap.
2. Quando você escolher pela primeira vez um gatilho ou uma ação do B1, o Zapier pedirá para você **Entrar no B1.church**.
3. Cole a chave de API do passo 1 e clique em **Sim, continuar**. O Zapier valida a chave com a sua igreja.

A conexão fica salva no Zapier e é reutilizada por todos os Zaps da sua conta.

### 3. Monte o Zap

Escolha um gatilho e depois adicione uma ou mais etapas de ação. Exemplos abaixo.

## Receitas comuns

### Adicionar novas pessoas do B1 ao Mailchimp

- **Gatilho** — B1: Nova pessoa
- **Ação** — Mailchimp: Adicionar/atualizar assinante. Mapeie `name__first`, `name__last` e `contactInfo__email` do B1 para os campos Nome / Sobrenome / E-mail do Mailchimp.

### Publicar doações em um canal do Slack com um cartão mais rico que o conector nativo

- **Gatilho** — B1: Nova doação
- **Ação** — Slack: Enviar mensagem ao canal. Monte qualquer layout — botões, anexos etc. — que o [conector nativo do Slack](./slack-discord) não consegue fazer.

### Adicionar novos membros de grupo a um Google Group

- **Gatilho** — B1: Novo membro de grupo (filtrado para um `groupId` específico)
- **Ação** — Filtro do Zapier: continuar somente se o grupo do B1 for o que interessa
- **Ação** — B1: Localizar pessoa (use o `personId` do gatilho para buscar o e-mail)
- **Ação** — Google Groups: Adicionar membro

### Encaminhar respostas de formulário para um gerenciador de projetos

- **Gatilho** — B1: Nova resposta de formulário
- **Ação** — Notion / Linear / Asana / Trello: Criar página / issue / tarefa

## Como os gatilhos funcionam por dentro

Os gatilhos são **REST hooks**, não consultas periódicas — o Zapier não consulta o B1 a cada 15 minutos. Quando você liga o Zap, o Zapier pede ao B1 que registre um webhook apontando para uma URL privada do Zapier; quando o evento acontece, o B1 envia o envelope ao Zapier e o seu Zap começa **em poucos segundos**. Ao desligar o Zap, o Zapier pede ao B1 que exclua o webhook — sem assinaturas órfãs.

Isso significa que o gatilho só dispara para eventos que acontecem **depois** de o Zap ser ligado. Não há preenchimento retroativo — ligar um Zap não reproduz as doações de ontem.

## Limites e observações

- **Vários Zaps com o mesmo gatilho** registram cada um o seu próprio webhook no B1 — não há conflito, mas vale saber caso você esteja vendo **Configurações → Desenvolvedor → Webhooks** e se pergunte por que há três linhas idênticas "Zapier — donation.created".
- **Dados de teste na configuração do Zap** — ao montar um Zap, o Zapier pede dados de exemplo para mapear os campos. Ele busca o evento correspondente mais recente do B1, se houver; caso contrário, usa um exemplo sintético da definição do aplicativo.
- **Falhas de ação aparecem como erros do Zap** no histórico de tarefas do Zapier. Causa comum: uma chave de API sem o escopo certo (por exemplo, a ação "Adicionar doação" precisa de `donations:write`). Gere a chave novamente com os escopos corretos e reconecte no Zapier.
- **Cotas de chamadas de API de saída** — cada chamada da API do B1 feita por uma ação conta para a sua cota de tarefas do Zapier, e não para nada do lado do B1.

## Solução de problemas

- **"Authentication failed"** ao conectar — a chave de API está errada, foi revogada ou não tem os escopos que o Zap precisa. Gere-a novamente no B1Admin com pelo menos `settings:write` mais os escopos de recursos que o Zap utiliza e depois atualize a conexão.
- **O gatilho nunca dispara** — confirme se o webhook foi registrado: no B1Admin, **Configurações → Desenvolvedor → Webhooks** deve mostrar agora uma linha chamada "Zapier — &lt;evento&gt;". Se ela não estiver lá, a chave de API provavelmente não tinha `settings:write` quando você ligou o Zap. Corrija a chave, desligue o Zap e ligue-o novamente.
- **O gatilho dispara duas vezes** — o Zapier às vezes reenvia a entrega se a confirmação dele se perdeu. Use uma etapa "Filtro do Zapier" em um id único (por exemplo, o `id` da pessoa) se precisar de deduplicação rigorosa.

## Veja também

- [Make](./make) — o mesmo padrão, em outra plataforma
- [Slack e Discord](./slack-discord) — notificações de chat mais simples, sem o Zapier
- [Webhooks (referência do desenvolvedor)](/docs/developer/api/webhooks)
