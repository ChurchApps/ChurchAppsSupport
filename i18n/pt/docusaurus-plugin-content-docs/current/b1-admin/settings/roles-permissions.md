---
title: "Funções e permissões"
description: "Configure funções no B1 Admin para controlar o que a equipe e os voluntários podem ver e alterar, desde doações e presença até pessoas e grupos."
---

# Funções e permissões

<div class="article-intro">

As funções permitem controlar o que cada usuário pode acessar dentro da sua conta da ChurchApps. Você pode criar funções personalizadas para a equipe, os voluntários e outros membros do time, cada uma com seu próprio nível de acesso, para manter os seus dados seguros.

</div>

## Vídeo de treinamento {#training-video}

<YouTube id="ZzCIkinVMnE" title="Funções, permissões e convidando sua equipe no B1" next="Configurando cultos e presença no B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de acesso de Administrador do domínio ou de uma função com permissão para gerenciar funções
- Tenha uma lista dos membros da equipe e das áreas às quais eles precisam de acesso
- Revise as categorias de permissão disponíveis abaixo para planejar as suas funções

</div>

## Acessando as funções {#accessing-roles}

1. No B1 Admin, abra o [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo) e expanda **Configurações**.
2. Clique em **Funções**.
3. A página Funções exibe todas as funções definidas atualmente para a sua igreja. A coluna **Membros** mostra quantos usuários há em cada função, e a linha **(Todos)** mostra **Todos os usuários**.

## Criando uma função {#creating-a-role}

Clique em **Adicionar função** no topo da página Funções. O menu oferece:

- **Adicionar função personalizada** -- Abre um formulário **Editar função** acima da lista. Digite um **Nome da função** e clique em **Salvar**. A nova função começa sem permissões.
- **Adicionar função "Contabilidade"**, **Adicionar função "Equipe da igreja"**, **Adicionar função "Administrador de conteúdo"** e **Adicionar função "Administrador de lições"** -- Funções prontas, com um conjunto sensato de permissões já marcadas. O B1 pede confirmação e depois cria a função. Você pode alterar as permissões dela depois, como qualquer outra função.

## Renomeando ou excluindo uma função {#renaming-or-deleting-a-role}

Passe o mouse sobre a linha de uma função e clique em **Editar**. No formulário **Editar função**, altere o **Nome da função** e clique em **Salvar**, ou clique em **Excluir** e confirme para remover a função. A função **Administradores do domínio** não pode ser excluída.

## Entendendo a página de uma função {#understanding-a-roles-page}

Clique no nome de uma função para abrir a página dela. Ela tem dois painéis:

- **Membros** (à esquerda) -- As pessoas da função, com nome e e-mail.
- **Editar permissões** (à direita) -- As permissões que você pode conceder à função.

A linha **(Todos)** abre uma página para as permissões que se aplicam a todos os usuários da sua igreja; ela não tem lista de membros.

## Adicionando usuários a uma função {#adding-users-to-a-role}

1. Abra a função e clique em **Adicionar** no painel **Membros**. Abre-se um formulário **Adicionar a** para essa função.
2. Digite um nome ou e-mail na caixa de pesquisa e clique no botão de pesquisa.
3. Clique no botão de adicionar ao lado da pessoa. Ela é incluída na função imediatamente, e o B1 oferece enviar a ela um e-mail de convite para que possa fazer login.
4. Se a pessoa ainda não estiver na sua igreja, clique em **Criar novo usuário** abaixo dos resultados da pesquisa, informe o **Nome**, o **Sobrenome** e o **E-mail**, e clique em **Salvar**.

Para alterar o nome ou o e-mail de um membro, clique no ícone de editar na linha dele.

## Removendo usuários de uma função {#removing-users-from-a-role}

1. Abra a função que contém o usuário que você deseja remover.
2. Localize a pessoa na lista **Membros**.
3. Clique no ícone de excluir na linha dela e confirme.

A sua igreja precisa ter sempre pelo menos um Administrador do domínio, por isso o último membro de **Administradores do domínio** não pode ser removido.

## Configurando permissões {#configuring-permissions}

Cada função pode receber acesso a áreas específicas do B1 Admin. No painel **Editar permissões**, as permissões são agrupadas em seções que você pode expandir, como **Presença**, **Conteúdo**, **Doações**, **Formulários e planos**, **Lições**, **Mensagens**, **Pessoas e grupos** e **Tarefas**. Digite na caixa **Filtrar permissões** para mostrar apenas as permissões correspondentes.

Marque ou desmarque uma permissão para conceder ou remover o acesso da função. Cada alteração é salva imediatamente; não há botão Salvar. Observe que **Editar configurações da igreja**, que abre a página Configurações, fica na seção **Conteúdo**. O cabeçalho de cada seção mostra quantas das suas permissões a função possui, como **2 de 5**, e essa contagem é atualizada conforme você marca e desmarca as caixas.

### Permissões de doações {#donations-permissions}

A seção **Doações** tem estas permissões:

- **Visualizar resumos de doações** -- ver a seção Doações, incluindo as páginas Resumo, Lotes, Fundos, Campanhas e Extratos de contribuição.
- **Visualizar doações** -- ver doações individuais, como as contribuições dentro de um lote.
- **Editar doações** -- controle total: adicionar, editar e excluir doações e lotes, e [fechar e reabrir lotes](../donations/batches.md#closing-and-reopening-a-batch).
- **Lançar doações** -- adicionar lotes e lançar, editar ou excluir doações, mas somente em lotes que ainda estejam abertos. Quem tem somente esta permissão não pode excluir lotes, fechá-los ou reabri-los, nem alterar contribuições recebidas pelas doações online.
- **Editar configurações** -- gerenciar as configurações de doações.

Quem tem **Lançar doações**, mas não **Visualizar resumos de doações**, vê apenas a página **Lotes** em **Doações**. Dê a uma equipe de contagem as permissões **Lançar doações** e **Visualizar doações**, para que possam abrir um lote e ver as contribuições que lançaram. Veja [Quem pode alterar um lote](../donations/batches.md#who-can-change-a-batch) para mais detalhes.

### Somente nomes de pessoas {#people-names-only}

A seção **Pessoas e grupos** inclui **Visualizar somente nomes de pessoas**. Use-a para voluntários que precisam buscar pessoas pelo nome -- por exemplo, para escolher alguém em uma caixa de pesquisa -- sem acesso ao diretório completo. Com essa permissão isolada, a pessoa:

- Pode pesquisar pessoas pelo nome e ver a lista de pessoas cadastradas recentemente, mas vê apenas o nome, a foto e a situação de membro de cada pessoa
- Não pode pesquisar por e-mail, ver dados de contato nem abrir o diretório de **Pessoas**

Combine **Visualizar somente nomes de pessoas** com **Visualizar presença** ou **Editar presença** para voluntários que fazem a chamada das classes. **Pessoas** no menu deles então abre **Grupos**, onde podem abrir a lista **Todos os grupos** e ver os nomes dos membros e as sessões de cada classe. Com **Editar presença**, também podem [registrar a presença](../attendance/recording-attendance.md) e adicionar visitantes pesquisando pelos nomes. Os nomes não são links para os cadastros das pessoas, e os grupos confidenciais continuam ocultos, a menos que o voluntário seja membro.

O B1 Admin oculta links e botões que exigem permissões que a função não tem. Por exemplo, a lista **Todos os grupos** só está disponível para quem pode editar grupos, visualizar membros de grupos ou visualizar pessoas, ou para quem tem **Visualizar somente nomes de pessoas** junto com **Visualizar presença** ou **Editar presença** (os demais são enviados de volta ao Painel); a configuração de presença só aparece com **Editar cultos**; o botão **E-mail** de um grupo só aparece para quem tem **Editar membros do grupo** (a permissão necessária para enviar e-mails de grupo); imprimir a lista de um grupo exige **Visualizar membros do grupo** ou liderar esse grupo; e excluir um evento do calendário exige **Editar conteúdo** (ou retirar a sua própria solicitação pendente).

### Contas do quiosque de check-in {#check-in-kiosk-accounts}

A conta que faz login em um quiosque do [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) precisa da permissão **Check-in** na seção **Presença** (ou **Editar presença**). Somente com **Check-in**, o quiosque pode buscar famílias pelo nome ou telefone, fazer check-in e check-out e mostrar quem pode retirar uma criança, sem acesso ao diretório de Pessoas.

O check-in não é mais concedido pela linha **(Todos)**. Estar em uma função com outras permissões não permite que alguém use o quiosque; adicione **Check-in** a uma função como "Voluntários de check-in" e coloque nela as contas do quiosque.

:::warning
Os **Administradores do domínio** têm acesso total a todas as áreas da sua conta da ChurchApps. As permissões deles não podem ser alteradas nem restringidas. Use essa função somente para os seus administradores de maior confiança.
:::

:::tip
Crie funções específicas, como "Tesoureiro", apenas com acesso a **Doações**; "Equipe de contagem", com **Lançar doações** e **Visualizar doações**; ou "Voluntário de check-in", apenas com acesso a **Presença**. Isso segue o princípio do menor privilégio e mantém os seus dados seguros. Veja [Segurança de dados](./data-security.md) para saber mais sobre como a ChurchApps protege as suas informações.
:::
