---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) empacotar SMS mais fluxos de trabalho de drip e automações de cartão de conexão. Seu aplicativo Zapier expõe ambas as direções — canalizar eventos B1 em um fluxo de trabalho Text In Church, e puxar gatilhos de cartão de conexão ou novo-contato do outro lado em B1.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Uma conta [Text In Church](https://textinchurch.com) em um plano que inclua a integração Zapier
- Uma conta [Zapier](https://zapier.com)
- Um usuário B1Admin com permissão para **Editar Configurações**

</div>

## O Que Você Pode Conectar

| Direção | Gatilho | Ação |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Criar/Atualizar Pessoa + Adicionar ao Grupo |
| B1 → Text In Church | B1 `form.submission.created` | Enviar Mensagem de Texto via a equipe relevante |
| B1 → Text In Church | B1 `group.member.added` | Adicionar ao Grupo (espelhar membros do grupo) |
| Text In Church → B1 | Cartão de Conexão Enviado | B1: Criar Pessoa + Adicionar Membro do Grupo |
| Text In Church → B1 | Pessoa Criada | B1: Criar Pessoa |
| Text In Church → B1 | Pessoa Aderiu ao Grupo | B1: Adicionar Membro do Grupo |

Ações Text In Church também incluem *Enviar Mensagem de Texto*, *Enviar Broadcast de Voz*, *Criar Tarefa*, *Procurar Pessoa/Grupo*, e adição/remoção de membros do grupo.

## Configuração

### 1. Cunhar uma chave de API B1

**Configurações → Desenvolvedor → Chaves de API → Nova Chave de API**:

- `settings:write` — obrigatório para Zaps acionados por B1
- `people:read`, `people:write` — para procurar ou criar a pessoa
- `groups:write` — para sincronização de grupo
- (Opcional) `donations:write` se você conectar confirmações de presente em TIC

### 2. Conectar Text In Church ao Zapier

Siga [guia de integração Zapier Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Eles geram um token de API dentro do painel TIC.

### 3. Construir o Zap cartão-de-conexão-para-B1

A direção mais comum. Cartões de conexão disparados do TIC se tornam novas pessoas B1 automaticamente.

1. **Gatilho** — Text In Church: Cartão de Conexão Enviado.
2. **Ação** — B1.church: Procurar Pessoa (por email).
3. **Caminho** — ramificação em encontrado / não encontrado:
   - Não encontrado → B1.church: Criar Pessoa.
   - Encontrado → continuar.
4. **Ação** — B1.church: Adicionar Membro do Grupo a um grupo "Novo Contato".

Ative o Zap. O próximo cartão de conexão enviado através de TIC aparece em **B1Admin → Pessoas** automaticamente.

## Receitas Comuns

### Disparar um fluxo de trabalho estilo cartão-de-conexão de um formulário B1

- **Gatilho** — B1.church: Nova Envio de Formulário (filtro no id do formulário "Sou novo aqui")
- **Ação** — Text In Church: Criar/Atualizar Pessoa, mapeando respostas de email / telefone / nome do formulário
- **Ação** — Text In Church: Adicionar ao Grupo, onde o grupo tem um fluxo de trabalho de boas-vindas pré-construído anexado

### Espelhar membros do grupo

- **Gatilho** — B1.church: Novo Membro do Grupo, filtrado em um `groupId` específico
- **Ação** — Text In Church: Adicionar ao Grupo (mesma pessoa, grupo espelho). Emparelhe com um Zap `group.member.removed` se você quiser sincronização completa.

### Paging de líder quando alguém adere

- **Gatilho** — B1.church: Novo Membro do Grupo
- **Ação** — Text In Church: Enviar Mensagem de Texto, destinatário = telefone do líder do grupo, corpo = `"{first} {last} just joined {group}"`.

## Limites e Notas

- **O aplicativo Zapier TIC portão atrás do nível de plano.** Se a integração Zapier fica acinzentada no painel TIC, entre em contato com suporte TIC para habilitá-la em seu plano.
- **Ids de grupo são TIC, não B1.** Ao espelhar, você manterá uma tabela de mapeamento em algum lugar (uma *Tabela de Busca* Zapier, ou codificado por Zap).
- **Enviar Mensagem de Texto custa créditos.** Cada Zap que dispara *Enviar Texto* consome da sua alocação de SMS TIC.

## Solução de Problemas

- **Gatilho Cartão de Conexão não dispara** — TIC precisa da toggle de integração Zapier ativada. Também verifique que o formulário que você testou está configurado como um "Cartão de Conexão", não um levantamento genérico.
- **Criar Pessoa em B1 falha com 401** — a chave de API está errada, revogada, ou falta `people:write`. Re-cunhe.
- **Pessoas B1 duplicadas** — TIC envia ambos *Pessoa Criada* e *Cartão de Conexão Enviado* para o mesmo evento. Escolha um como sua fonte de verdade e adicione um Filtro Zapier no outro.

## Veja Também

- [Clearstream](./clearstream) — plataforma SMS alternativa com forma Zapier semelhante
- [Zapier (visão geral)](../zapier) — lado B1 de cada receita Zapier
- [Guia Zapier Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (docs TIC)
