---
title: "Funções e permissões"
description: "Configure funções no B1 Admin para controlar o que equipe e voluntários podem ver e alterar, de doações e presença a pessoas e grupos."
---

# Funções e permissões

<div class="article-intro">

As funções permitem controlar o que cada usuário pode acessar na sua conta do ChurchApps. Você pode criar funções personalizadas para a equipe, os voluntários e os demais membros, cada uma com seu próprio nível de acesso, para manter os seus dados seguros.

</div>

## Vídeo de treinamento

<YouTube id="ZzCIkinVMnE" title="Funções, permissões e convite da sua equipe no B1" next="Configurando cultos e presença no B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de acesso de **Administrador de domínio** ou de uma função com permissão para gerenciar funções
- Tenha uma lista dos membros da equipe e das áreas a que cada um precisa ter acesso
- Revise as categorias de permissão disponíveis abaixo para planejar suas funções

</div>

## Acessando as funções

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Configurações**.
2. Clique em **Funções**.
3. A página Funções exibe todas as funções definidas atualmente para a sua igreja. A coluna **Membros** mostra quantos usuários há em cada função, e a linha **(Todos)** mostra **Todos os usuários**.

## Entendendo a página Funções

A página Funções é dividida em dois painéis:

- **Lado esquerdo** -- Mostra a lista de membros atribuídos à função selecionada.
- **Lado direito** -- Exibe as configurações de permissão que você pode definir para essa função.

Clique no nome de qualquer função para visualizar e gerenciar os seus membros e permissões.

## Adicionando usuários a uma função

1. Selecione a função à qual deseja adicionar membros.
2. Use o **campo de busca** do lado esquerdo para encontrar a pessoa que deseja adicionar.
3. Selecione a pessoa nos resultados da busca.
4. Ela será adicionada à função imediatamente.

## Removendo usuários de uma função

1. Selecione a função que contém o usuário que você deseja remover.
2. Localize a pessoa na lista de membros do lado esquerdo.
3. Clique no **botão de remover** ao lado do nome dela.

## Configurando permissões

Cada função pode receber acesso a áreas específicas do B1 Admin. No painel **Editar permissões**, as permissões são agrupadas em seções que você pode expandir, como **Presença**, **Conteúdo**, **Doações**, **Formulários e planos**, **Lições**, **Mensagens**, **Pessoas e grupos** e **Tarefas**. Digite na caixa **Filtrar permissões** para mostrar somente as permissões correspondentes.

Marque ou desmarque uma permissão para concedê-la ou removê-la da função. O cabeçalho de cada seção mostra quantas das suas permissões a função possui, como **2 de 5**, e essa contagem é atualizada conforme você marca e desmarca as caixas.

### Permissões de doações

A seção **Doações** tem estas permissões:

- **Ver resumos de doações** -- ver a seção Doações, incluindo as páginas Resumo, Lotes, Fundos, Campanhas e Extratos de doações.
- **Ver doações** -- ver as doações individuais, como as ofertas dentro de um lote.
- **Editar doações** -- controle total: adicionar, editar e excluir doações e lotes, e [fechar e reabrir lotes](../donations/batches.md#closing-and-reopening-a-batch).
- **Lançar doações** -- adicionar lotes e lançar, editar ou excluir doações, mas somente em lotes que ainda estejam abertos. Quem tem somente esta permissão não pode excluir lotes, fechá-los ou reabri-los, nem alterar ofertas recebidas pela doação online.
- **Editar configurações** -- gerenciar as configurações de doações.

Quem tem **Lançar doações**, mas não **Ver resumos de doações**, vê somente a página **Lotes** em **Doações**. Dê a uma função de equipe de contagem as permissões **Lançar doações** e **Ver doações**, para que possam abrir um lote e ver as ofertas que lançaram. Veja [Quem pode alterar um lote](../donations/batches.md#who-can-change-a-batch) para mais detalhes.

### Nomes de pessoas apenas {#people-names-only}

A seção **Pessoas e grupos** inclui **Ver nomes de pessoas apenas**. Use-a para voluntários que precisam procurar pessoas pelo nome — por exemplo, para escolher alguém em uma caixa de busca — sem acesso ao diretório completo. Somente com esta permissão, a pessoa:

- Pode pesquisar pessoas pelo nome e ver a lista de pessoas adicionadas recentemente, mas vê apenas o nome, a foto e a situação de membro de cada uma
- Não pode pesquisar por e-mail, ver dados de contato nem abrir o diretório de **Pessoas**

Combine **Ver nomes de pessoas apenas** com **Ver presença** ou **Editar presença** para voluntários que registram a presença das turmas. **Pessoas** no menu deles então abre **Grupos**, onde podem abrir a lista **Todos os grupos** e ver os nomes dos membros e as sessões de cada turma. Com **Editar presença**, eles também podem [registrar a presença](../attendance/recording-attendance.md) e adicionar visitantes pesquisando pelo nome. Os nomes não são links para registros de pessoas, e grupos confidenciais continuam ocultos, a menos que o voluntário seja membro.

O B1 Admin oculta links e botões que exigem permissões que a função não tem. Por exemplo, a lista **Todos os grupos** só está disponível para quem pode editar grupos, ver membros de grupos ou ver pessoas, ou para quem tem **Ver nomes de pessoas apenas** junto com **Ver presença** ou **Editar presença** (os demais são enviados de volta ao Painel). A configuração de cultos só aparece com **Editar cultos**; o botão **E-mail** de um grupo só aparece para quem tem **Editar membros do grupo** (a permissão necessária para enviar e-mail de grupo); imprimir a lista de um grupo exige **Ver membros do grupo** ou liderar esse grupo; e excluir um evento do calendário exige **Editar conteúdo** (ou retirar a sua própria solicitação pendente).

### Contas de quiosque de check-in {#check-in-kiosk-accounts}

A conta que entra em um quiosque do [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) precisa da permissão **Checkin** na seção **Presença** (ou **Editar presença**). Somente com **Checkin**, o quiosque pode procurar famílias pelo nome ou telefone, fazer o check-in e o check-out delas e mostrar quem pode buscar uma criança, sem acesso ao diretório de Pessoas.

O Checkin não é mais concedido pela linha **(Todos)**. Estar em uma função com outras permissões não permite que alguém opere o quiosque; adicione **Checkin** a uma função como "Voluntários de check-in" e coloque as contas dos quiosques nela.

:::warning
Os **Administradores de domínio** têm acesso total a todas as áreas da sua conta do ChurchApps. Suas permissões não podem ser alteradas nem restringidas. Use esta função somente para os seus administradores de maior confiança.
:::

:::tip
Crie funções específicas, como "Tesoureiro" com acesso somente a **Doações**, "Equipe de contagem" com **Lançar doações** e **Ver doações**, ou "Voluntário de check-in" com acesso somente a **Presença**. Isso segue o princípio do menor privilégio e mantém seus dados seguros. Veja [Segurança de dados](./data-security.md) para saber mais sobre como o ChurchApps protege as suas informações.
:::
