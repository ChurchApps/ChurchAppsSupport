---
title: "VOMO"
---

# VOMO

<div class="article-intro">

VOMO é uma plataforma de engajamento de voluntários — pessoas se inscrevem em projetos, checam no quiosque, e acumulam horas. Se você usa VOMO para agendamento de voluntários mas B1 para registros de pessoas, Zapier pode sincronizar membros e check-ins entre eles para que nenhum lado se desvie.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Uma conta [VOMO](https://vomo.org) em um plano que expõe Zapier (verifique com suporte VOMO se incerto)
- Uma conta [Zapier](https://zapier.com)
- Um usuário B1Admin com permissão para **Editar Configurações**

</div>

## O Que Você Pode Conectar

O aplicativo Zapier VOMO expõe quatro gatilhos instantâneos e quatro ações. As receitas que a maioria das igrejas quer:

| Direção | Gatilho | Ação |
|---|---|---|
| VOMO → B1 | Membros VOMO (criados) | B1: Procurar Pessoa → Criar Pessoa (se novo) |
| VOMO → B1 | Check-in VOMO Quiosque | B1: Adicionar Membro do Grupo a um grupo "Atualmente Servindo", ou registrar como frequência |
| B1 → VOMO | B1 `person.created` | VOMO: Procurar Organizador (por email); senão passo personalizado |
| Qualquer | Participação VOMO (inscrições) | B1: Adicionar Membro do Grupo a um grupo específico de projeto |

As ações VOMO são limitadas a **projetos de rascunho** e **encontrar** organizadores/projetos existentes — não há ação "adicionar essa pessoa a um projeto VOMO" hoje. A fiação interessante é na maioria das vezes VOMO → B1.

## Configuração

### 1. Cunhar uma chave de API B1

**Configurações → Desenvolvedor → Chaves de API → Nova Chave de API**. Escopos:

- `people:read`, `people:write` — para procurar e criar voluntários como pessoas B1
- `groups:write` — para adicioná-los a grupos de time de serviço
- (Opcional) `attendance:write` se você tratar check-ins de quiosque como frequência

### 2. Construir o Zap de sincronização de membros

1. **Gatilho** — VOMO: Membros (evento = `created`).
2. **Ação** — B1.church: Procurar Pessoa, correspondido em email.
3. **Filtro / Caminho** — fork em encontrado vs. não encontrado:
   - Não encontrado → B1.church: Criar Pessoa, depois Adicionar Membro do Grupo ao grupo de voluntários apropriado.
   - Encontrado → B1.church: Adicionar Membro do Grupo diretamente.
4. Ative. Novos voluntários VOMO agora aparecem em B1 com a membros do grupo corretos.

### 3. (Opcional) Construir o Zap de check-in de quiosque

1. **Gatilho** — VOMO: Quiosque
2. **Ação** — B1.church: Procurar Pessoa (por email)
3. **Ação** — sua escolha:
   - *Se tratando como frequência* — Webhooks by Zapier POST para endpoint `/attendance/visits` B1 (o aplicativo Zapier B1 ainda não tem uma ação *Registrar Frequência* de primeira classe). A [chave de API](/docs/developer/api/api-keys) B1 entra no cabeçalho `Authorization: Bearer cak_…`.
   - *Se tratando como membros do grupo* — B1.church: Adicionar Membro do Grupo com um grupo "Atualmente Servindo (Hoje)", e um segundo Zap mais tarde no dia remove-os via limpeza agendada.

## Receitas Comuns

### Sincronização de grupo por projeto

- **Gatilho** — VOMO: Participação (criada)
- **Ação** — Filtro by Zapier em id do projeto, então
- **Ação** — B1.church: Adicionar Membro do Grupo a um grupo B1 cujo nome espelha o projeto VOMO.

Quando o projeto VOMO termina, limpe manualmente o grupo B1 (ou emparelhe isso com um gatilho *Participação deletada* que remove-os).

### Enviar um "obrigado por se inscrever" texto via SMS

Cadeia VOMO Participação → Clearstream Enviar Texto ou Text In Church Enviar Mensagem no mesmo Zap. Ambos têm ações Zapier de primeira classe — veja [Clearstream](./clearstream) e [Text In Church](./text-in-church).

### Detectar desistência

Execute um gatilho Zapier diário de *Cronograma* que chama Procurar Organizador em VOMO para uma lista de pessoas B1 que aderiram ao time de serviço este mês — se VOMO retorna "não encontrado", eles não ativaram VOMO e precisam de um empurrão.

## Limites e Notas

- **Email é a chave de junção.** Os payloads VOMO expõem um email de usuário mas nenhum id de pessoa B1. Doadores que usam emails diferentes em cada sistema criarão duplicatas.
- **Sem ação "Adicionar a Projeto" no aplicativo Zapier VOMO hoje.** Se você precisa de inscrição de projeto B1 → VOMO, você POSTaria para a API REST VOMO de um passo *Webhooks by Zapier*, que é uma integração personalizada.
- **Níveis gratuitos / inferiores VOMO podem não incluir Zapier.** Confirme com suporte VOMO antes de prometer uma data de fiação.

## Solução de Problemas

- **Gatilho nunca dispara** — os gatilhos instantâneos VOMO requerem que o token de API permaneça válido. Re-teste o Zap; reconecte VOMO se o token foi rotacionado.
- **B1 *Adicionar Membro do Grupo* falha com 422** — o id do grupo na ação não existe. Abra **B1Admin → Grupos**, clique no grupo, e copie o segmento de id da URL no passo Zap.
- **Pessoas B1 duplicadas de um único voluntário VOMO** — eles provavelmente se inscreveram em um email diferente do que já tinham em B1. Ou padronize emails, ou adicione um *Caminho* Zapier que também procura por telefone antes de criar.

## Veja Também

- [Zapier (visão geral)](../zapier) — lado B1 de cada receita Zapier
- [Clearstream](./clearstream), [Text In Church](./text-in-church) — emparelhe inscrições de voluntários com confirmações de SMS
- [Webhooks (referência de desenvolvedor)](/docs/developer/api/webhooks) — os eventos em que VOMO pode disparar
