---
title: "Funções e Permissões"
---

# Funções e Permissões

<div class="article-intro">

As funções permitem controlar o que diferentes usuários podem acessar na sua conta do ChurchApps. Você pode criar funções personalizadas para a equipe, voluntários e outros membros da equipe, cada uma com seu próprio nível de acesso para manter os dados seguros.

</div>

## Vídeo de Treinamento

<YouTube id="ZzCIkinVMnE" title="Roles, Permissions, and Inviting Your Team in B1" next="Setting Up Services and Attendance in B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de acesso de Administrador de domínio ou de uma função com permissão para gerenciar funções
- Tenha uma lista dos membros da equipe e das áreas que eles precisam acessar
- Revise as categorias de permissão disponíveis abaixo para planejar as suas funções

</div>

## Acessando as Funções

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Configurações**.
2. Clique em **Funções**.
3. A página Funções exibe todas as funções definidas atualmente para a sua igreja. A coluna **Membros** mostra quantos usuários há em cada função, e a linha **(Todos)** mostra **Todos os usuários**.

## Entendendo a Página de Funções

A página Funções está dividida em dois painéis:

- **Lado esquerdo** -- Mostra a lista de membros atribuídos à função selecionada.
- **Lado direito** -- Exibe as configurações de permissão que você pode definir para essa função.

Clique no nome de qualquer função para ver e gerenciar os membros e as permissões dela.

## Adicionando Usuários a uma Função

1. Selecione a função à qual deseja adicionar membros.
2. Use o **campo de pesquisa** do lado esquerdo para encontrar a pessoa que deseja adicionar.
3. Selecione a pessoa nos resultados da pesquisa.
4. Ela será adicionada à função imediatamente.

## Removendo Usuários de uma Função

1. Selecione a função que contém o usuário que deseja remover.
2. Encontre a pessoa na lista de membros do lado esquerdo.
3. Clique no **botão de remover** ao lado do nome dela.

## Configurando Permissões

Cada função pode receber acesso a áreas específicas do B1 Admin. No painel **Editar permissões**, as permissões estão agrupadas em seções que você pode expandir, como **Presença**, **Conteúdo**, **Doações**, **Formulários e Planos**, **Liturgia**, **Mensagens**, **Pessoas e Grupos** e **Tarefas**. Digite na caixa **Filtrar permissões** para mostrar somente as permissões correspondentes.

Marque ou desmarque uma permissão para conceder ou remover essa permissão da função. O título de cada seção mostra quantas das suas permissões a função tem, como **2 de 5**, e a contagem é atualizada conforme você marca e desmarca as caixas.

### Permissões de Doações

A seção **Doações** tem estas permissões:

- **Ver resumos de doações** -- ver a seção Doações, incluindo as páginas de Resumo, Lotes, Fundos, Campanhas e Declarações de contribuição.
- **Ver doações** -- ver doações individuais, como as contribuições dentro de um lote.
- **Editar doações** -- controle total: adicionar, editar e excluir doações e lotes, e [fechar e reabrir lotes](../donations/batches.md#closing-and-reopening-a-batch).
- **Lançar doações** -- adicionar lotes e lançar, editar ou excluir doações, mas somente em lotes que ainda estejam abertos. Quem tem somente esta permissão não pode excluir lotes, fechá-los ou reabri-los, nem alterar contribuições recebidas pela doação online.
- **Editar configurações** -- gerenciar as configurações de doações.

Quem tem **Lançar doações**, mas não **Ver resumos de doações**, vê apenas a página **Lotes** em **Doações**. Dê a uma função de equipe de contagem as permissões **Lançar doações** e **Ver doações**, para que possa abrir um lote e ver as contribuições que lançou. Consulte [Quem Pode Alterar um Lote](../donations/batches.md#who-can-change-a-batch) para detalhes.

### Somente Nomes de Pessoas

A seção **Pessoas e Grupos** inclui **Ver somente nomes de pessoas**. Use-a para voluntários que precisam procurar pessoas pelo nome -- por exemplo, para escolher alguém em uma caixa de busca -- sem acesso ao diretório completo. Somente com essa permissão, uma pessoa:

- Pode pesquisar pessoas pelo nome e ver a lista das pessoas adicionadas recentemente, mas vê apenas o nome, a foto e o status de membro de cada uma
- Não pode pesquisar por e-mail, ver dados de contato nem abrir o diretório de **Pessoas**

Combine **Ver somente nomes de pessoas** com **Ver presença** ou **Editar presença** para voluntários que registram a presença das turmas. Assim, **Pessoas** no menu deles abre **Grupos**, onde podem abrir a lista **Todos os grupos** e ver os nomes dos membros e as sessões de cada turma. Com **Editar presença**, eles também podem [registrar a presença](../attendance/recording-attendance.md) e adicionar visitantes pesquisando seus nomes. Os nomes não são links para os registros das pessoas, e grupos confidenciais continuam ocultos, a menos que o voluntário seja membro.

O B1 Admin oculta links e botões que exigem permissões que uma função não possui. Por exemplo, a lista **Todos os grupos** só fica disponível para quem pode editar grupos, ver membros de grupos ou ver pessoas, ou para quem tem **Ver somente nomes de pessoas** junto com **Ver presença** ou **Editar presença** (os demais são levados de volta ao Painel). A configuração de presença só aparece com **Ver presença** ou **Editar serviços**; o botão **E-mail** de um grupo só aparece para quem tem **Editar membros do grupo** (a permissão necessária para enviar e-mails de grupo); imprimir a lista de um grupo exige **Ver membros do grupo** ou ser líder desse grupo; e excluir um evento do calendário exige **Editar conteúdo** (ou retirar o seu próprio pedido pendente).

:::warning
Os **Administradores de domínio** têm acesso total a todas as áreas da sua conta do ChurchApps. As permissões deles não podem ser alteradas nem restringidas. Use essa função somente para os seus administradores de maior confiança.
:::

:::tip
Crie funções específicas, como "Tesoureiro" com acesso somente a **Doações**, "Equipe de Contagem" com **Lançar doações** e **Ver doações**, ou "Voluntário de Check-in" com acesso somente a **Presença**. Isso segue o princípio do menor privilégio e mantém os seus dados seguros. Consulte [Segurança de Dados](./data-security.md) para saber mais sobre como o ChurchApps protege as suas informações.
:::
