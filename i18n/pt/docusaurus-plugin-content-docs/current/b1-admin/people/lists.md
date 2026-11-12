---
title: "Listas salvas"
description: "Salve uma pesquisa de Pessoas no B1 Admin como uma lista com nome e recarregue-a com um clique. As listas continuam atualizadas, então novos membros que se encaixam aparecem automaticamente."
---

# Listas salvas

<div class="article-intro">

As **Listas salvas** permitem guardar uma consulta de pesquisa com um nome e executá-la novamente com um clique, a qualquer momento. Crie uma lista uma vez -- "Membros ativos no campus Norte", "Visitantes nos últimos 90 dias" ou qualquer filtro avançado -- e ela ficará no topo da página Pessoas, para que você nunca precise montar a consulta de novo.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Faça pelo menos uma pesquisa na seção Pessoas para ter resultados a salvar. Veja [Pesquisando pessoas](./searching-people.md) ou [Pesquisa com IA](./ai-search.md).
- Salvar, alterar e excluir listas exige a permissão **Editar pessoas**. Veja [Atribuindo funções](./roles-permissions.md).

</div>

## Salvando uma pesquisa como lista {#saving-a-search-as-a-list}

1. Faça uma pesquisa na página **Pessoas** -- uma pesquisa rápida, uma pesquisa com IA ou uma pesquisa com filtros avançados.
2. Quando a pesquisa encontrar pelo menos uma pessoa, um botão **Salvar como lista** aparece no cabeçalho da página Pessoas.
3. Clique em **Salvar como lista**.
4. Digite um **Nome da lista** (obrigatório).
5. Opcionalmente, digite uma **Categoria** para agrupar listas relacionadas (por exemplo, "Alcance" ou "Membresia").
6. Em **Quem pode ver esta lista**, escolha **Toda a equipe** ou **Somente eu**.
7. Em **Correspondência**, escolha **Todos os filtros** (as pessoas precisam atender a todos os filtros) ou **Qualquer filtro** (pessoas que atendem a pelo menos um filtro).
8. Em **Incluir domicílio**, escolha **Somente correspondências**, **Filhos das correspondências** (também adiciona os filhos de cada pessoa correspondente) ou **Domicílio inteiro** (adiciona todas as pessoas do domicílio de cada pessoa correspondente).
9. Opcionalmente, marque **Atualizar todas as noites** (veja [Atualização noturna](#nightly-refresh) abaixo). Quando essa opção estiver marcada, você também pode marcar **Enviar e-mail para mim quando a participação mudar**.
10. Clique em **Salvar**.

A lista fica salva e aparece como um botão na linha de listas salvas, no topo da página Pessoas, ao lado de **Todos**. As listas marcadas como **Somente eu** exibem um pequeno ícone de cadeado.

:::info
As listas definidas como **Toda a equipe** são compartilhadas com toda a sua igreja -- qualquer pessoa com acesso a Pessoas pode vê-las e carregá-las. Somente a equipe com a permissão adequada pode alterar ou excluir listas.
:::

## Carregando uma lista salva {#loading-a-saved-list}

No topo da página Pessoas, clique em qualquer nome de lista. A pesquisa é executada novamente de imediato com a consulta armazenada e atualiza os resultados. Clique em **Todos** para voltar a todo o seu diretório.

As listas são agrupadas por categoria (se você tiver atribuído uma), e as listas sem categoria aparecem por último.

:::tip
As listas são **consultas dinâmicas**, e não instantâneos. Cada vez que você carrega uma lista, a pesquisa é executada de novo sobre os seus dados atuais, então as novas pessoas que passarem a atender aos critérios vão aparecer.
:::

## Renomeando e excluindo listas {#renaming-and-deleting-lists}

A equipe com permissão de gerenciamento pode renomear ou excluir qualquer lista na página Pessoas. Primeiro clique na lista para carregá-la -- dois ícones aparecerão ao lado do nome dela:

- Clique no ícone **Configurações da lista** (engrenagem) para renomeá-la ou alterar a categoria e o compartilhamento. Listas salvas com essas opções também podem alterar **Incluir domicílio**, **Atualizar todas as noites** e **Enviar e-mail para mim quando a participação mudar** aqui. A configuração **Correspondência** não pode ser alterada depois que a lista é salva.
- Clique no ícone **Excluir** (lixeira) para excluí-la (você será solicitado a confirmar).

## Atualização noturna {#nightly-refresh}

Carregar uma lista sempre executa a pesquisa novamente, esteja ou não marcada a opção **Atualizar todas as noites**. A opção **Atualizar todas as noites** faz com que o B1 execute a lista de novo todas as noites e registre quem entrou ou saiu dela. Se você marcou **Enviar e-mail para mim quando a participação mudar**, o B1 envia um e-mail para você (a pessoa que salvou a lista) após uma atualização noturna que tenha adicionado ou removido alguém, informando quantas pessoas foram incluídas e removidas. A atualização noturna também envia as mudanças de participação na lista para as suas [integrações](../integrations/index.md), como as tags do Mailchimp.

## Casos de uso {#use-cases}

| Cenário | Como montar a lista |
|---|---|
| Todos os visitantes | Pesquisa avançada: Situação de membro = Visitante |
| Membros de um campus específico | Pesquisa avançada: Campus = [seu campus] |
| Voluntários com verificação de antecedentes vencida | Pesquisa avançada: [Campo personalizado](../settings/custom-fields.md) "Verificação de antecedentes vence" é anterior a hoje |
| Resultados de uma pergunta feita à IA | Faça uma pergunta na Pesquisa com IA e depois salve |

## Artigos relacionados {#related-articles}

- [Pesquisando pessoas](./searching-people.md) -- pesquisa rápida e personalização de colunas
- [Pesquisa com IA](./ai-search.md) -- consultas em linguagem natural que você pode salvar como listas
- [Campos personalizados](../settings/custom-fields.md) -- defina seus próprios campos de pessoa e depois filtre e salve listas com base neles
- [Demografia](./demographics.md) -- transforme um gráfico demográfico em um filtro de Pessoas e depois salve-o como lista
- [Edição em massa](./bulk-editing.md) -- depois de carregar uma lista, atualize em massa todos os membros dela de uma vez
