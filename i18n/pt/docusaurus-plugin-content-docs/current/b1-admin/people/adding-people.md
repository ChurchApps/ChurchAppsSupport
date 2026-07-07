---
title: "Adicionando Pessoas"
---

# Adicionando Pessoas

<div class="article-intro">

A seção Pessoas é a base do B1 Admin — é o banco de dados de membros da sua igreja. Todos os outros recursos (grupos, presença, doações, formulários) se conectam a registros de pessoas. Este guia o leva através de adicionar alguém ao seu banco de dados, editar seus detalhes e vincular membros da família em famílias.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta ativa do B1 Admin com permissão para gerenciar pessoas. Consulte [Funções e Permissões](roles-permissions.md) se não tiver certeza sobre seu nível de acesso.
- Se você está adicionando mais de algumas pessoas, considere usar a ferramenta [Importar CSV](importing-data.md) em vez disso.

</div>

## Adicionando uma Pessoa

1. Navegue até o painel de controle B1.church Admin.
2. Clique em **Pessoas** na barra lateral esquerda.
3. Clique no botão **Adicionar Pessoa** no canto superior direito.
4. Preencha o primeiro nome, sobrenome e endereço de email da pessoa, depois clique em **Adicionar**.

A página de perfil da pessoa será aberta, pronta para você adicionar mais detalhes.

:::tip
Se você está migrando de outro sistema de gerenciamento de igreja, o recurso [Importar Dados](importing-data.md) permite que você traga todo o seu diretório de um arquivo CSV — muito mais rápido do que adicionar pessoas uma de cada vez.
:::

## Editando Detalhes

1. Na página de perfil da pessoa, clique no **lápis de edição** ao lado do seu nome.
2. Preencha informações adicionais como nome do meio, status de membro, datas, endereço e números de telefone.
3. Clique em **Salvar** para armazenar as informações pessoais.

O perfil também inclui várias abas para informações relacionadas:

- **Notas** — Adicione notas sobre a pessoa (cuidados pastorais, acompanhamentos, etc.)
- **Grupos** — Visualize e gerencie [associações a grupos](../groups/group-members.md)
- **Presença** — Visualize [registros de presença](../attendance/tracking-attendance.md)
- **Doações** — Visualize [histórico de doações](../donations/recording-donations.md)

## Trabalhando com Formulários

Você pode preencher formulários personalizados diretamente do perfil de uma pessoa. Estes são formulários definidos pelo usuário que você pode construir seguindo o guia [Criando Formulários](../forms/creating-forms.md).

1. No perfil da pessoa, clique no menu suspenso **Formulários** para selecionar um formulário.
2. Clique em **Adicionar Formulário** para abri-lo.
3. Preencha os detalhes do formulário e clique em **Salvar**.

:::info
Formulários vinculados ao perfil de uma pessoa usam o tipo de formulário **Pessoas**. Se você precisar de um formulário independente (como um registro de evento), consulte a opção [Formulário Independente](../forms/creating-forms.md) no guia de formulários.
:::

:::tip
Se você só precisa rastrear uma ou duas informações extras em pessoas — uma data, um número, uma resposta sim/não — use [Campos Personalizados](../settings/custom-fields.md) em vez de um formulário. Eles são mais rápidos de preencher e são pesquisáveis diretamente na Pesquisa Avançada.
:::

## Gerenciando Famílias

Famílias permitem que você vincule membros da família juntos. Isso é especialmente útil para [entrada automática](../attendance/check-in.md), onde um pai pode fazer entrada de todos os seus filhos de uma vez.

1. No perfil de uma pessoa, clique no **lápis de edição** ao lado do nome da família.
2. O editor de famílias será aberto. Selecione o **papel da família** para a pessoa atual (por exemplo, Chefe, Cônjuge, Filho).
3. Clique em **Adicionar** para adicionar outro membro da família.
4. Digite o nome da pessoa na caixa de pesquisa e clique em **Pesquisar**.
5. Quando a pessoa aparecer nos resultados da pesquisa, clique em **Selecionar**.
6. Escolha seu papel na família e clique em **Salvar** para concluir a configuração da família.
