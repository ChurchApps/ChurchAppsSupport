---
title: "Adicionando Pessoas"
---

# Adicionando Pessoas

<div class="article-intro">

A seção Pessoas é a fundação do B1 Admin — é o banco de dados de membros da sua igreja. Todos os outros recursos (grupos, frequência, doações, formulários) se conectam de volta aos registros de pessoas. Este guia o orienta através de adicionar alguém ao seu banco de dados, editar seus detalhes e vincular membros da família em famílias.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta B1 Admin ativa com permissão para gerenciar pessoas. Veja [Funções e Permissões](roles-permissions.md) se não tiver certeza sobre seu nível de acesso.
- Se você estiver adicionando mais do que alguns poucos pessoas, considere usar a ferramenta de [Importação CSV](importing-data.md).

</div>

## Adicionando uma Pessoa

1. Navegue até o painel do B1.church Admin.
2. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **People** e clique em **People**.
3. Clique no botão **Add Person** no cabeçalho da página. A página rola para baixo até o formulário **Add New Person** abaixo do diretório.
4. Preencha o **First Name**, o **Last Name** e o **Email** da pessoa, depois clique em **Add**.

A página de perfil da pessoa será aberta, pronta para você adicionar mais detalhes.

:::tip
Se você está migrando de outro sistema de gerenciamento de igreja, o recurso de [Importar Dados](importing-data.md) permite trazer seu diretório completo de um arquivo CSV — muito mais rápido do que adicionar pessoas uma por uma.
:::

### Avisos de Duplicatas

Se o endereço de email (ou, ao criar uma pessoa do formulário de Edição completo, o número de telefone ou primeira e última name + data de nascimento combinados) corresponde a alguém já em seu banco de dados, um diálogo **Possible Duplicate** aparece antes do novo registro ser salvo. Ele lista cada pessoa correspondente junto com seu email, telefone e data de nascimento para que você possa comparar.

- Clique em **Use Existing** ao lado de uma correspondência para usar o registro dessa pessoa em vez de criar um novo.
- Clique em **Create Anyway** para adicionar a nova pessoa mesmo que uma correspondência possível tenha sido encontrada.

Isso apenas verifica duplicatas quando você está criando uma pessoa completamente nova — editar um registro existente nunca o dispara. Apenas impede novas duplicatas; não mescla dois registros que já existem.

## Editando Detalhes

1. Na página de perfil da pessoa, clique no botão **Edit** abaixo dos dados de contato dela, à esquerda.
2. No formulário **Personal Details**, preencha informações adicionais como nome do meio, status de afiliação (**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive** ou **Deceased**), datas, endereço, números de telefone e (para crianças e alunos) série e escola.
3. Clique em **Save** para armazenar as informações pessoais.

O lado esquerdo do perfil mostra a foto, o nome, o status de afiliação, os dados de contato, os valores de quaisquer [campos personalizados](../settings/custom-fields.md) e a família da pessoa. Clique na foto para alterá-la. Abaixo do botão **Edit** há algumas ações a mais: **Workflow** (adicionar a pessoa a um [fluxo de trabalho](../serving/workflows.md)), **Merge**, **Export** e **Export Data**.

O restante do perfil mostra uma seção de resumo para cada tipo de informação relacionada:

- **Attendance** — Mostra em quais das últimas semanas a pessoa compareceu e suas visitas mais recentes. Clique em **All years** para ver o histórico completo de visitas, incluindo campus, serviço, horário de serviço, grupo e uma coluna **Checked In** com a hora do check-in no quiosque (mostrada como um travessão para visitas registradas sem check-in no quiosque), ou em **Print** para imprimi-lo. Para tendências da igreja como um todo em vez do histórico de uma pessoa, veja [Acompanhando Frequência](../attendance/tracking-attendance.md)
- **Donations** — Mostra as doações deste ano. Clique em **All years** para ver o [histórico de doações](../donations/recording-donations.md) completo, ou em **Log a gift** para registrar uma nova
- **Groups** — Lista as [filiações de grupo](../groups/group-members.md) da pessoa
- **Notes** — Mostra notas recentes sobre a pessoa (cuidado pastoral, acompanhamentos, etc.). Clique em **All notes** para ler e adicionar notas
- **Forms** — Lista os formulários da pessoa e se cada um foi enviado (veja [Trabalhando com Formulários](#working-with-forms) abaixo)

Ao abrir uma dessas visualizações completas, clique no link **Back to** com o nome da pessoa no topo para voltar ao perfil.

## Enviando um E-mail para uma Pessoa

Se a pessoa tiver um endereço de email registrado, um botão **Email** aparece abaixo dos dados de contato dela, à esquerda do perfil.

1. No perfil da pessoa, clique em **Email**.
2. Um diálogo de **Email** intitulado com o nome da pessoa abre, mostrando **Sending to** com o endereço da pessoa.
3. Opcionalmente escolha um modelo salvo de **Load Template (optional)**.
4. Digite um **Subject** e componha a mensagem.
5. Clique em **Send Email**.

Para escrever a mensagem em seu próprio programa de correio, clique em **Open in my email app**.

:::info
Enviar do B1 usa os mesmos limites de aprovação e diários que email de grupo. Se sua igreja ainda não foi aprovada, o diálogo pede para você solicitar uma revisão — você ainda pode clicar em **Open in my email app** enquanto isso. Veja [Ativando Email de Grupo para Sua Igreja](../groups/group-members.md#turning-on-group-email-for-your-church). Usuários sem permissão para editar membros de grupo vão direto para seu aplicativo de email quando clicam em **Email**.
:::

## Trabalhando com Formulários {#working-with-forms}

Você pode preencher formulários personalizados diretamente do perfil de uma pessoa. Estes são formulários definidos pelo usuário que você pode construir seguindo o guia de [Criando Formulários](../forms/creating-forms.md).

1. No perfil da pessoa, localize a seção **Forms**. Ela lista cada formulário junto com o indicativo **Submitted** ou **Not submitted**.
2. Clique no nome de um formulário para abri-lo (ou clique em **All forms** para ver a lista completa).
3. Clique no **ícone de edição** (lápis) do formulário, preencha os detalhes e clique em **Save**.

Uma vez que um formulário é submetido, clique no **ícone de impressão** ao lado dele para imprimir as respostas preenchidas dessa pessoa.

Se uma submissão caiu na pessoa errada, clique no **ícone Change person** (duas setas) ao lado dele para movê-lo para outra pessoa ou desvinculá-lo. Veja [Mudando a Pessoa em uma Submissão](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formulários vinculados ao perfil de uma pessoa usam o tipo de formulário **People**. Se você precisar de um formulário independente (como um registro de evento), veja a opção [Stand Alone form](../forms/creating-forms.md) no guia de formulários.
:::

:::tip
Se você apenas precisar rastrear uma ou duas informações extras em pessoas — uma data, um número, uma resposta sim/não — use [Custom Fields](../settings/custom-fields.md) em vez de um formulário. São mais rápidas de preencher e são pesquisáveis diretamente na Busca Avançada.
:::

## Gerenciando Famílias

Famílias permitem que você vincule membros da família juntos. Isso é especialmente útil para [check-in](../attendance/check-in.md), onde um pai pode fazer check-in de todos seus filhos de uma vez.

1. No perfil de uma pessoa, clique em **Edit** ao lado do título **Household** à esquerda.
2. O editor de família abrirá. Selecione o **household role** para a pessoa atual (ex., Cabeça, Cônjuge, Filho, Outro).
3. Clique no ícone **Add** para adicionar outro membro da família.
4. Em **Add Household Member**, digite o nome da pessoa na caixa de pesquisa e pressione **Enter** ou clique no ícone de pesquisa. (Antes de digitar, aparece uma pequena lista de **Pessoas recentes**.)
5. Quando a pessoa aparecer nos resultados, clique no nome dela ou no ícone de adicionar ao lado dele.
6. Escolha seu household role e clique em **Save** para completar a configuração de família.
