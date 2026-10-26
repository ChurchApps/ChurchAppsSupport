---
title: "Funções e permissões"
---

# Funções e permissões

<div class="article-intro">

As funções permitem controlar o que cada usuário pode acessar na sua conta do ChurchApps. Você pode criar funções personalizadas para a equipe, os voluntários e outros membros da equipe, cada uma com seu próprio nível de acesso, para manter seus dados seguros.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de acesso de Administrador do domínio ou de uma função com permissão para gerenciar funções
- Tenha uma lista dos membros da equipe e das áreas às quais eles precisam de acesso
- Revise as categorias de permissão disponíveis abaixo para planejar suas funções

</div>

## Acessando as funções

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Configurações**.
2. Clique em **Funções**.
3. A página Funções exibe todas as funções definidas atualmente para a sua igreja. A coluna **Membros** mostra quantos usuários estão em cada função, e a linha **(Todos)** mostra **Todos os usuários**.

## Entendendo a página Funções

A página Funções é dividida em dois painéis:

- **Lado esquerdo**: mostra a lista de membros atribuídos à função selecionada.
- **Lado direito**: exibe as configurações de permissão que você pode definir para essa função.

Clique em qualquer nome de função para visualizar e gerenciar seus membros e permissões.

## Adicionando usuários a uma função

1. Selecione a função à qual deseja adicionar membros.
2. Use o **campo de pesquisa** no lado esquerdo para encontrar a pessoa que deseja adicionar.
3. Selecione a pessoa nos resultados da pesquisa.
4. Ela será adicionada à função imediatamente.

## Removendo usuários de uma função

1. Selecione a função que contém o usuário que deseja remover.
2. Localize a pessoa na lista de membros, no lado esquerdo.
3. Clique no **botão remover** ao lado do nome dela.

## Configurando permissões

Cada função pode receber acesso a áreas específicas do B1 Admin. No painel **Editar permissões**, as permissões são agrupadas em seções que você pode expandir, como **Presença**, **Conteúdo**, **Doações**, **Formulários e planos**, **Lições**, **Mensagens**, **Pessoas e grupos** e **Tarefas**. Digite na caixa **Filtrar permissões** para mostrar apenas as permissões que correspondem ao texto.

Marque ou desmarque uma permissão para concedê-la ou removê-la da função. O título de cada seção mostra quantas das suas permissões a função possui, como **2 de 5**, e essa contagem é atualizada conforme você marca e desmarca as caixas.

### Permissões de doações

A seção **Doações** tem estas permissões:

- **Ver resumos de doações**: acesse a seção Doações, incluindo as páginas Resumo, Lotes, Fundos, Campanhas e Extratos de contribuição.
- **Ver doações**: veja doações individuais, como as ofertas dentro de um lote.
- **Editar doações**: controle total, incluindo adicionar, editar e excluir doações e lotes, além de [fechar e reabrir lotes](../donations/batches.md#closing-and-reopening-a-batch).
- **Lançar doações**: adicione lotes e lance, edite ou exclua doações, mas somente em lotes que ainda estejam abertos. Quem tem apenas esta permissão não pode excluir lotes, fechá-los ou reabri-los, nem alterar ofertas que chegaram pela contribuição online.
- **Editar configurações**: gerencie as configurações de doações.

Quem tem **Lançar doações**, mas não **Ver resumos de doações**, vê apenas a página **Lotes** em **Doações**. Dê a uma equipe de contagem as permissões **Lançar doações** e **Ver doações**, para que possam abrir um lote e ver as ofertas que lançaram. Consulte [Quem pode alterar um lote](../donations/batches.md#who-can-change-a-batch) para mais detalhes.

### Somente nomes de pessoas

A seção **Pessoas e grupos** inclui **Ver somente nomes de pessoas**. Use essa permissão para voluntários que precisam pesquisar pessoas pelo nome, por exemplo para escolher alguém em uma caixa de pesquisa, sem acesso ao diretório completo. Com essa permissão isoladamente, a pessoa:

- Pode pesquisar pessoas pelo nome e ver a lista de pessoas cadastradas recentemente, mas vê apenas o nome, a foto e o status de membresia de cada pessoa
- Não pode pesquisar por e-mail, ver dados de contato nem abrir o diretório de **Pessoas**

Combine **Ver somente nomes de pessoas** com **Ver presença** ou **Editar presença** para voluntários que registram a presença nas classes. O item **Pessoas** do menu deles passa a abrir **Grupos**, onde podem abrir a lista **Todos os grupos** e ver os nomes dos membros e as sessões de cada classe. Com **Editar presença**, também podem [registrar a presença](../attendance/recording-attendance.md) e adicionar visitantes pesquisando seus nomes. Os nomes não são links para registros de pessoas, e grupos confidenciais continuam ocultos, a menos que o voluntário seja membro.

O B1 Admin oculta links e botões que exigem permissões que a função não possui. Por exemplo, a lista **Todos os grupos** só está disponível para quem pode editar grupos, ver membros de grupos ou ver pessoas, ou para quem tem **Ver somente nomes de pessoas** combinado com **Ver presença** ou **Editar presença** (os demais são redirecionados para o Painel). A configuração de presença só aparece com **Ver presença** ou **Editar serviços**. O botão **E-mail** de um grupo só aparece para quem tem **Editar membros do grupo** (a permissão necessária para enviar e-mails ao grupo). Imprimir a lista de um grupo exige **Ver membros do grupo** ou liderar esse grupo. Excluir um evento do calendário exige **Editar conteúdo** (ou cancelar a sua própria solicitação pendente).

:::warning
Os **Administradores do domínio** têm acesso total a todas as áreas da sua conta do ChurchApps. As permissões deles não podem ser modificadas nem restringidas. Use esta função apenas para os administradores mais confiáveis.
:::

:::tip
Crie funções específicas, como "Tesoureiro" com acesso apenas a **Doações**, "Equipe de contagem" com **Lançar doações** e **Ver doações**, ou "Voluntário do check-in" com acesso apenas a **Presença**. Isso segue o princípio do menor privilégio e mantém seus dados seguros. Consulte [Segurança de dados](./data-security.md) para saber mais sobre como os ChurchApps protegem suas informações.
:::
