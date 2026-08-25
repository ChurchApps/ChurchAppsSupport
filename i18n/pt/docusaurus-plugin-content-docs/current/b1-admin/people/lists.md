---
title: "Listas Salvas"
---

# Listas Salvas

<div class="article-intro">

**Listas Salvas** permitem você armazenar uma consulta de busca sob um nome e executá-la com um clique a qualquer momento. Construa uma lista uma vez — "Membros Ativos no Campus Norte," "Visitantes nos últimos 90 dias," ou qualquer filtro avançado — e fica no painel **Listas Salvas** na página Pessoas para que você nunca tenha que reconstruir a consulta novamente.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Execute pelo menos uma busca na seção Pessoas para ter resultados para salvar. Consulte [Buscando Pessoas](./searching-people.md) ou [Busca de IA](./ai-search.md).

</div>

## Salvando uma Busca como uma Lista

1. Execute uma busca na página **Pessoas** — uma busca rápida, uma busca de IA ou uma busca de filtro avançado.
2. Quando os resultados aparecem, um botão **Salvar como Lista** (ícone de marcador) aparece no cabeçalho da página Pessoas.
3. Clique em **Salvar como Lista**.
4. Digite um **Nome** para a lista (obrigatório).
5. Opcionalmente digite uma **Categoria** para agrupar listas relacionadas juntas no painel **Listas Salvas** (por exemplo, "Alcance" ou "Associação").
6. Clique em **Salvar**.

A lista agora está salva na conta de sua igreja e aparecerá no painel **Listas Salvas** no lado esquerdo da página Pessoas.

:::info
Listas são compartilhadas entre sua igreja — qualquer um com acesso a Pessoas pode vê-las e carregá-las. Apenas staff com permissão apropriada pode renomear ou deletar listas.
:::

## Carregando uma Lista Salva

No painel **Listas Salvas** no lado esquerdo da página Pessoas, clique em qualquer nome de lista. A busca se re-executa instantaneamente com a consulta armazenada, atualizando a tabela de resultados.

Listas são agrupadas por categoria (se você atribuiu uma), com listas sem categoria aparecendo por último.

:::tip
Listas são **consultas ao vivo**, não snapshots. Cada vez que você carrega uma lista, a busca se executa fresca contra seus dados atuais, para que pessoas novas que agora correspondem aos critérios apareçam.
:::

## Renomeando e Deletando Listas

Staff com permissão de gerenciar pode renomear ou deletar qualquer lista diretamente do painel Listas Salvas.

- Clique no **ícone de lápis** próximo a um nome de lista para renomeá-la.
- Clique no **ícone de lixo** para deletá-la (você será pedido para confirmar).

## Casos de Uso

| Cenário | Como construir a lista |
|---|---|
| Todos os visitantes | Busca avançada: Membership Status = Visitor |
| Membros em um campus específico | Busca avançada: Campus = [seu campus] |
| Pessoas sem endereço de email | Busca avançada: Email is empty |
| Voluntários com verificação de antecedentes expirada | Busca avançada: [Campo Personalizado](../settings/custom-fields.md) "Background check expires" is before today |
| Resultados de uma pergunta de IA | Faça uma pergunta em Busca de IA, depois salve |

## Artigos Relacionados

- [Buscando Pessoas](./searching-people.md) — busca rápida e customização de coluna
- [Busca de IA](./ai-search.md) — consultas em linguagem natural que você pode salvar como listas
- [Campos Personalizados](../settings/custom-fields.md) — defina seus próprios campos de pessoa, depois filtre e salve listas neles
- [Dados Demográficos](./demographics.md) — detalhe um gráfico demográfico em um filtro de Pessoas, depois salve como uma lista
- [Edição em Massa](./bulk-editing.md) — após carregar uma lista, atualizar em massa todos os seus membros de uma vez
