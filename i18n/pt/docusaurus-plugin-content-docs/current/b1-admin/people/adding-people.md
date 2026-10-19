---
title: "Adicionando Pessoas"
---

# Adicionando Pessoas

<div class="article-intro">

A seção Pessoas é a base do B1 Admin -- é o banco de dados de membros da sua igreja. Todos os outros recursos (grupos, presença, doações, formulários) se conectam aos registros de pessoas. Este guia mostra como adicionar alguém ao seu banco de dados, editar seus dados e vincular familiares em domicílios.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta ativa no B1 Admin com permissão para gerenciar pessoas. Consulte [Funções e Permissões](roles-permissions.md) se não tiver certeza do seu nível de acesso.
- Se você estiver adicionando mais do que algumas pessoas, considere usar a ferramenta de [Importação CSV](importing-data.md) em vez disso.

</div>

## Adicionando uma pessoa

1. Acesse o painel do B1.church Admin.
2. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Pessoas** e clique em **Pessoas**.
3. Clique no botão **Adicionar Pessoa** no cabeçalho da página. A página rola para baixo até o formulário **Adicionar Nova Pessoa**, abaixo do diretório.
4. Preencha o **Nome**, o **Sobrenome** e o **E-mail** da pessoa, depois clique em **Adicionar**.

A página de perfil da pessoa será aberta, pronta para você acrescentar mais detalhes.

:::tip
Se você estiver migrando de outro sistema de gestão de igrejas, o recurso [Importar Dados](importing-data.md) permite trazer todo o seu diretório a partir de um arquivo CSV -- muito mais rápido do que adicionar pessoas uma a uma.
:::

### Avisos de duplicidade

Se o endereço de e-mail (ou, ao criar uma pessoa pelo formulário completo de Edição, o telefone ou a combinação de nome, sobrenome e data de nascimento) corresponder a alguém que já está no seu banco de dados, uma caixa de diálogo **Possível Duplicidade** aparece antes que o novo registro seja salvo. Ela lista cada pessoa correspondente, com o e-mail, o telefone e a data de nascimento, para que você possa comparar.

- Clique em **Usar Existente** ao lado de uma correspondência para usar o registro dessa pessoa em vez de criar um novo.
- Clique em **Criar Mesmo Assim** para adicionar a nova pessoa, mesmo que tenha sido encontrada uma possível correspondência.

A verificação de duplicidade só acontece ao criar uma pessoa totalmente nova -- editar um registro existente nunca a dispara. Ela impede novas duplicidades; não mescla dois registros que já existem.

## Editando os dados {#editing-details}

1. Na página de perfil da pessoa, clique no botão **Editar** abaixo dos dados de contato, no lado esquerdo.
2. No formulário **Dados Pessoais**, preencha informações adicionais, como nome do meio, situação de membro (**Visitante**, **Convidado**, **Frequentador Regular**, **Membro**, **Equipe**, **Inativo** ou **Falecido**), datas, endereço, telefones e (para crianças e estudantes) série e escola.
3. Clique em **Salvar** para guardar as informações pessoais.

O lado esquerdo do perfil mostra a foto, o nome, a situação de membro, os dados de contato, os valores de quaisquer [campos personalizados](../settings/custom-fields.md) e o domicílio da pessoa. Clique na foto para alterá-la. Abaixo do botão **Editar** há mais algumas ações: **Fluxo de Trabalho** (adicionar a pessoa a um [fluxo de trabalho](../serving/workflows.md)), **Mesclar**, **Exportar** e **Exportar Dados**.

O restante do perfil mostra uma seção de resumo para cada tipo de informação relacionada:

- **Presença** -- Mostra em quais das últimas semanas a pessoa esteve presente e suas visitas mais recentes. Clique em **Todos os anos** para ver o histórico completo de visitas, incluindo o campus, o culto, o horário do culto, o grupo e uma coluna **Check-in** com o horário do check-in no quiosque (exibido como um traço para visitas registradas sem check-in no quiosque), ou em **Imprimir** para imprimi-lo. Para tendências da igreja como um todo, em vez do histórico de uma pessoa, consulte [Registrando a Presença](../attendance/tracking-attendance.md)
- **Doações** -- Mostra as ofertas deste ano, incluindo as contribuições para fundos não dedutíveis. Clique em **Todos os anos** para ver o [histórico completo de doações](../donations/recording-donations.md), ou em **Registrar uma oferta** para lançar uma nova. Se a sua igreja ativou a [Privacidade das Ofertas](../settings/church-settings.md#giving-privacy), os valores ficam ocultos até você clicar em **Mostrar ofertas**
- **Grupos** -- Lista as [participações em grupos](../groups/group-members.md) da pessoa
- **Anotações** -- Mostra anotações recentes sobre a pessoa (cuidado pastoral, acompanhamentos etc.). Clique em **Todas as anotações** para ler e adicionar anotações
- **Formulários** -- Lista os formulários da pessoa e indica se cada um foi enviado (consulte [Trabalhando com formulários](#working-with-forms) abaixo)

Quando você abrir uma dessas visualizações completas, clique no link **Voltar para** com o nome da pessoa, no topo, para retornar ao perfil.

## Enviando e-mail para uma pessoa

Se a pessoa tiver um endereço de e-mail cadastrado, um botão **E-mail** aparece abaixo dos dados de contato, no lado esquerdo do perfil.

1. No perfil da pessoa, clique em **E-mail**.
2. Abre-se uma caixa de diálogo **E-mail**, com o nome da pessoa no título, mostrando **Enviando para** com o endereço dela.
3. Opcionalmente, escolha um modelo salvo em **Carregar Modelo (opcional)**.
4. Digite um **Assunto** e escreva a mensagem.
5. Clique em **Enviar E-mail**.

Para redigir a mensagem no seu próprio programa de e-mail, clique em **Abrir no meu app de e-mail**.

:::info
O envio pelo B1 usa as mesmas aprovações e limites diários do e-mail para grupos. Se a sua igreja ainda não foi aprovada, a caixa de diálogo pede que você solicite uma análise -- mesmo assim, você pode clicar em **Abrir no meu app de e-mail** enquanto isso. Consulte [Ativando o e-mail para grupos na sua igreja](../groups/group-members.md#turning-on-group-email-for-your-church). Usuários sem permissão para editar membros de grupos vão direto para o app de e-mail ao clicar em **E-mail**.
:::

## Trabalhando com formulários {#working-with-forms}

Você pode preencher formulários personalizados diretamente pelo perfil de uma pessoa. São formulários definidos pelo usuário, que você pode criar seguindo o guia [Criando Formulários](../forms/creating-forms.md).

1. No perfil da pessoa, localize a seção **Formulários**. Ela lista cada formulário, com a indicação de **Enviado** ou **Não enviado**.
2. Clique no nome de um formulário para abri-lo (ou clique em **Todos os formulários** para ver a lista completa).
3. Clique no **ícone de edição** (lápis) do formulário, preencha os dados e clique em **Salvar**.

Depois que um formulário for enviado, clique no **ícone de impressão** ao lado dele para imprimir as respostas preenchidas dessa pessoa.

Se um envio foi associado à pessoa errada, clique no ícone **Alterar pessoa** (duas setas) ao lado dele para movê-lo para outra pessoa ou desvinculá-lo. Consulte [Alterando a pessoa de um envio](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Os formulários vinculados ao perfil de uma pessoa usam o tipo de formulário **Pessoas**. Se você precisar de um formulário avulso (como uma inscrição em evento), consulte a [opção de formulário avulso](../forms/creating-forms.md) no guia de formulários.
:::

:::tip
Se você só precisar acompanhar uma ou duas informações extras sobre as pessoas -- uma data, um número, uma resposta sim/não -- use [Campos Personalizados](../settings/custom-fields.md) em vez de um formulário. Eles são mais rápidos de preencher e podem ser pesquisados diretamente na Pesquisa Avançada.
:::

## Gerenciando domicílios {#managing-households}

Domicílios permitem vincular os membros de uma família. Isso é especialmente útil para o [check-in](../attendance/check-in.md), em que um dos pais pode fazer o check-in de todos os filhos de uma só vez.

1. No perfil de uma pessoa, clique em **Editar** ao lado do título **Domicílio**, no lado esquerdo.
2. O editor de domicílio será aberto. Selecione a **função no domicílio** da pessoa atual (por exemplo, Responsável, Cônjuge, Filho, Outro).
3. Clique no ícone **Adicionar** para incluir outro membro do domicílio.
4. Em **Adicionar Membro do Domicílio**, digite o nome da pessoa no campo de pesquisa e pressione **Enter** ou clique no ícone de pesquisa. (Antes de digitar, é exibida uma pequena lista de **Pessoas recentes**.)
5. Quando a pessoa aparecer nos resultados, clique no nome dela ou no ícone de adicionar ao lado.
6. Escolha a função dela no domicílio e clique em **Salvar** para concluir a configuração do domicílio.
