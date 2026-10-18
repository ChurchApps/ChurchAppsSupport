---
title: "Adicionando Pessoas"
---

# Adicionando Pessoas

<div class="article-intro">

A seção Pessoas é a base do B1 Admin -- é o banco de dados de membros da sua igreja. Todos os outros recursos (grupos, presença, doações, formulários) se conectam aos registros de pessoas. Este guia mostra como adicionar alguém ao seu banco de dados, editar seus dados e vincular membros da família em domicílios.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta ativa no B1 Admin com permissão para gerenciar pessoas. Consulte [Funções e Permissões](roles-permissions.md) se não tiver certeza do seu nível de acesso.
- Se você estiver adicionando mais do que algumas poucas pessoas, considere usar a ferramenta de [Importação CSV](importing-data.md).

</div>

## Adicionando uma Pessoa

1. Acesse o painel de administração do B1.church.
2. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Pessoas** e clique em **Pessoas**.
3. Clique no botão **Adicionar Pessoa** no cabeçalho da página. A página rola até o formulário **Adicionar Nova Pessoa** abaixo do diretório.
4. Preencha o **Nome**, o **Sobrenome** e o **E-mail** da pessoa e clique em **Adicionar**.

A página de perfil da pessoa será aberta, pronta para você adicionar mais detalhes.

:::tip
Se você estiver migrando de outro sistema de gestão de igrejas, o recurso [Importar Dados](importing-data.md) permite trazer todo o seu diretório a partir de um arquivo CSV -- muito mais rápido do que adicionar pessoas uma a uma.
:::

### Alertas de Duplicidade

Se o endereço de e-mail (ou, ao criar uma pessoa pelo formulário completo de Edição, o número de telefone ou a combinação de mesmo nome, sobrenome e data de nascimento) corresponder a alguém que já está no seu banco de dados, um diálogo de **Possível Duplicata** aparece antes que o novo registro seja salvo. Ele lista cada pessoa correspondente com seu e-mail, telefone e data de nascimento para que você possa comparar.

- Clique em **Usar Existente** ao lado de uma correspondência para usar o registro dessa pessoa, em vez de criar um novo.
- Clique em **Criar Mesmo Assim** para adicionar a nova pessoa, mesmo que tenha sido encontrada uma possível correspondência.

A verificação de duplicidade só acontece ao criar uma pessoa totalmente nova -- editar um registro existente nunca a aciona. Ela impede apenas novas duplicatas; não mescla dois registros que já existam.

## Editando Detalhes

1. Na página de perfil da pessoa, clique no botão **Editar** abaixo das informações de contato, à esquerda.
2. No formulário **Dados Pessoais**, preencha informações adicionais, como nome do meio, situação de membresia (**Visitante**, **Convidado**, **Frequentador Regular**, **Membro**, **Equipe**, **Inativo** ou **Falecido**), datas, endereço, telefones e (para crianças e estudantes) série e escola.
3. Clique em **Salvar** para armazenar as informações pessoais.

A lateral esquerda do perfil mostra a foto, o nome, a situação de membresia, as informações de contato, quaisquer valores de [campo personalizado](../settings/custom-fields.md) e o domicílio da pessoa. Clique na foto para alterá-la. Abaixo do botão **Editar** há mais algumas ações: **Fluxo de Trabalho** (adicionar a pessoa a um [fluxo de trabalho](../serving/workflows.md)), **Mesclar**, **Exportar** e **Exportar Dados**.

O restante do perfil mostra uma seção de resumo para cada tipo de informação relacionada:

- **Presença** — Mostra em quais das últimas semanas a pessoa esteve presente e suas visitas mais recentes. Clique em **Todos os anos** para ver o histórico completo de visitas, incluindo campus, culto, horário de culto, grupo e uma coluna **Check-in** com o horário do check-in no totem (exibido como um traço para visitas registradas sem check-in no totem), ou em **Imprimir** para imprimi-lo. Para tendências da igreja como um todo, em vez do histórico de uma pessoa, consulte [Acompanhando a Presença](../attendance/tracking-attendance.md)
- **Doações** — Mostra as ofertas deste ano, incluindo ofertas para fundos não dedutíveis. Clique em **Todos os anos** para ver o [histórico completo de doações](../donations/recording-donations.md), ou em **Registrar uma oferta** para lançar uma nova. Se sua igreja ativou a [Privacidade das Ofertas](../settings/church-settings.md#giving-privacy), os valores permanecem ocultos até você clicar em **Mostrar ofertas**
- **Grupos** — Lista as [participações em grupos](../groups/group-members.md) da pessoa
- **Anotações** — Mostra anotações recentes sobre a pessoa (cuidado pastoral, acompanhamentos etc.). Clique em **Todas as anotações** para ler e adicionar anotações
- **Formulários** — Lista os formulários da pessoa e se cada um foi enviado (consulte [Trabalhando com Formulários](#working-with-forms) abaixo)

Ao abrir uma dessas visualizações completas, clique no link **Voltar para** com o nome da pessoa no topo para retornar ao perfil.

## Enviando um E-mail para uma Pessoa

Se a pessoa tiver um endereço de e-mail cadastrado, um botão **E-mail** aparece abaixo das informações de contato, à esquerda do perfil.

1. No perfil da pessoa, clique em **E-mail**.
2. Abre-se um diálogo **E-mail** com o nome da pessoa no título, mostrando **Enviando para** com o endereço dela.
3. Opcionalmente, escolha um modelo salvo em **Carregar Modelo (opcional)**.
4. Digite um **Assunto** e escreva a mensagem.
5. Clique em **Enviar E-mail**.

Para escrever a mensagem no seu próprio programa de e-mail, clique em **Abrir no meu aplicativo de e-mail**.

:::info
O envio pelo B1 segue as mesmas aprovações e limites diários do e-mail de grupo. Se sua igreja ainda não tiver sido aprovada, o diálogo pede que você solicite uma análise -- enquanto isso, você ainda pode clicar em **Abrir no meu aplicativo de e-mail**. Consulte [Ativando o E-mail de Grupo para Sua Igreja](../groups/group-members.md#turning-on-group-email-for-your-church). Usuários sem permissão para editar membros de grupos vão direto para o aplicativo de e-mail ao clicar em **E-mail**.
:::

## Trabalhando com Formulários

Você pode preencher formulários personalizados diretamente a partir do perfil de uma pessoa. São formulários definidos pelo usuário, que você pode criar seguindo o guia [Criando Formulários](../forms/creating-forms.md).

1. No perfil da pessoa, localize a seção **Formulários**. Ela lista cada formulário junto com a indicação de **Enviado** ou **Não enviado**.
2. Clique no nome de um formulário para abri-lo (ou clique em **Todos os formulários** para ver a lista completa).
3. Clique no **ícone de edição** (lápis) do formulário, preencha os dados e clique em **Salvar**.

Depois que um formulário for enviado, clique no **ícone de impressora** ao lado dele para imprimir as respostas preenchidas daquela pessoa.

Se uma resposta foi associada à pessoa errada, clique no ícone **Alterar pessoa** (duas setas) ao lado dela para movê-la para outra pessoa ou desvinculá-la. Consulte [Alterando a Pessoa de uma Resposta](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formulários vinculados ao perfil de uma pessoa usam o tipo de formulário **Pessoas**. Se você precisar de um formulário independente (como uma inscrição em evento), consulte a opção [Formulário Independente](../forms/creating-forms.md) no guia de formulários.
:::

:::tip
Se você só precisa registrar uma ou duas informações extras sobre as pessoas -- uma data, um número, uma resposta sim/não -- use [Campos Personalizados](../settings/custom-fields.md) em vez de um formulário. Eles são mais rápidos de preencher e podem ser pesquisados diretamente na Pesquisa Avançada.
:::

## Gerenciando Domicílios {#managing-households}

Os domicílios permitem vincular membros da família entre si. Isso é especialmente útil para o [check-in](../attendance/check-in.md), em que um dos pais pode fazer o check-in de todos os filhos de uma só vez.

1. No perfil de uma pessoa, clique em **Editar** ao lado do título **Domicílio**, à esquerda.
2. O editor de domicílio será aberto. Selecione a **função no domicílio** da pessoa atual (por exemplo, Responsável, Cônjuge, Filho, Outro).
3. Clique no ícone **Adicionar** para incluir outro membro do domicílio.
4. Em **Adicionar Membro do Domicílio**, digite o nome da pessoa na caixa de pesquisa e pressione **Enter** ou clique no ícone de busca. (Antes de digitar, é exibida uma lista curta de **Pessoas recentes**.)
5. Quando a pessoa aparecer nos resultados, clique no nome dela ou no ícone de adicionar ao lado.
6. Escolha a função dela no domicílio e clique em **Salvar** para concluir a configuração do domicílio.
