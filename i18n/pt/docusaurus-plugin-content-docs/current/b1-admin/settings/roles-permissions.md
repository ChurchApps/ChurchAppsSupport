---
title: "Funções e Permissões"
---

# Funções e Permissões

<div class="article-intro">

As funções permitem controlar o que cada usuário pode acessar dentro da sua conta ChurchApps. Você pode criar funções personalizadas para a equipe, voluntários e outros membros da equipe, cada uma com seu próprio nível de acesso, para manter seus dados seguros.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de acesso de Administrador de Domínio ou de uma função com permissão para gerenciar funções
- Tenha uma lista dos membros da equipe e das áreas a que eles precisam ter acesso
- Revise as categorias de permissões disponíveis abaixo para planejar as suas funções

</div>

## Acessando Funções

1. No B1 Admin, abra o [Menu de atalho](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Configurações**.
2. Clique em **Funções**.
3. A página de Funções exibe todas as funções definidas atualmente para a sua igreja.

## Entendendo a Página de Funções

A página de Funções é dividida em dois painéis:

- **Lado esquerdo** -- Mostra a lista de membros atribuídos à função selecionada.
- **Lado direito** -- Exibe as configurações de permissão que você pode definir para essa função.

Clique em qualquer nome de função para ver e gerenciar os seus membros e permissões.

## Adicionando Usuários a uma Função

1. Selecione a função à qual você quer adicionar membros.
2. Use o **campo de busca** do lado esquerdo para encontrar a pessoa que você quer adicionar.
3. Selecione a pessoa nos resultados da busca.
4. Ela será adicionada à função imediatamente.

## Removendo Usuários de uma Função

1. Selecione a função que contém o usuário que você quer remover.
2. Encontre a pessoa na lista de membros do lado esquerdo.
3. Clique no **botão remover** ao lado do nome dela.

## Configurando Permissões

Cada função pode receber acesso a áreas específicas do B1 Admin. No painel **Editar Permissões**, as permissões são agrupadas em seções que você pode expandir, como **Frequência**, **Conteúdo**, **Doações**, **Formulários e Planos**, **Lições**, **Mensagens**, **Pessoas e Grupos** e **Tarefas**. Digite na caixa **Filtrar permissões** para mostrar apenas as permissões correspondentes.

Marque ou desmarque uma permissão para conceder ou remover o acesso para a função.

### Permissões de Doações

A seção **Doações** tem estas permissões:

- **Ver Resumos de Doações** -- ver a seção de Doações, incluindo as páginas de Resumo, Lotes, Fundos, Campanhas e Extratos de Contribuição.
- **Ver Doações** -- ver doações individuais, como as contribuições dentro de um lote.
- **Editar Doações** -- controle total: adicionar, editar e excluir doações e lotes, e [fechar e reabrir lotes](../donations/batches.md#closing-and-reopening-a-batch).
- **Inserir Doações** -- adicionar lotes e inserir, editar ou excluir doações, mas somente em lotes que ainda estejam abertos. Quem tem apenas esta permissão não pode excluir lotes, fechá-los ou reabri-los, nem alterar contribuições recebidas pela oferta online.
- **Editar Configurações** -- gerenciar as configurações de doações.

Quem tem **Inserir Doações**, mas não **Ver Resumos de Doações**, vê apenas a página **Lotes** em **Doações**. Dê a uma função de equipe de contagem as permissões **Inserir Doações** e **Ver Doações**, para que possam abrir um lote e ver as contribuições que lançaram. Veja [Quem Pode Alterar um Lote](../donations/batches.md#who-can-change-a-batch) para mais detalhes.

### Apenas Nomes de Pessoas

A seção **Pessoas e Grupos** inclui **Ver Apenas Nomes de Pessoas**. Use-a para voluntários que precisam pesquisar pessoas pelo nome -- por exemplo, para escolher alguém em uma caixa de busca -- sem acesso ao diretório completo. Somente com essa permissão, a pessoa:

- Pode pesquisar pessoas pelo nome e ver a lista de pessoas adicionadas recentemente, mas vê apenas o nome, a foto e a situação de membro de cada pessoa
- Não pode pesquisar por e-mail, ver dados de contato nem abrir o diretório de **Pessoas**

O B1 Admin oculta links e botões que exigem permissões que uma função não tem. Por exemplo, a lista **Todos os grupos** só está disponível para pessoas que podem editar grupos, ver membros de grupos ou ver pessoas (as demais são enviadas de volta ao Painel); a configuração de frequência só aparece com **Ver Frequência** ou **Editar Cultos**; o botão **E-mail** de um grupo só aparece para quem tem **Editar Membros do Grupo** (a permissão necessária para enviar e-mails do grupo); imprimir a lista de um grupo exige **Ver Membros do Grupo** ou ser líder desse grupo; e excluir um evento do calendário exige **Editar Conteúdo** (ou retirar a sua própria solicitação pendente).

:::warning
Os **Administradores de Domínio** têm acesso total a todas as áreas da sua conta ChurchApps. As permissões deles não podem ser alteradas nem restringidas. Use essa função apenas para os seus administradores de maior confiança.
:::

:::tip
Crie funções específicas, como "Tesoureiro" apenas com acesso a **Doações**, "Equipe de Contagem" com **Inserir Doações** e **Ver Doações**, ou "Voluntário de Check-in" apenas com acesso a **Frequência**. Isso segue o princípio do menor privilégio e mantém os seus dados seguros. Veja [Segurança de Dados](./data-security.md) para saber mais sobre como a ChurchApps protege as suas informações.
:::
