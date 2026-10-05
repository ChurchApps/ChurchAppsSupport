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
3. Clique no botão **Add Person** no canto superior direito.
4. Preencha o primeiro nome, sobrenome e endereço de email da pessoa, depois clique em **Add**.

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

1. Na página de perfil da pessoa, clique no **lápis de edição** ao lado do nome dela.
2. Preencha informações adicionais como nome do meio, status de afiliação, datas, endereço, números de telefone e (para crianças e alunos) série e escola.
3. Clique em **Save** para armazenar as informações pessoais.

O perfil também inclui várias abas para informações relacionadas:

- **Notes** — Adicionar notas sobre a pessoa (cuidado pastoral, acompanhamentos, etc.)
- **Groups** — Ver e gerenciar [filiações de grupo](../groups/group-members.md)
- **Attendance** — Ver histórico individual de visitas dessa pessoa, incluindo campi, serviço, horário de serviço, grupo e uma coluna **Checked In** com a hora do check-in do quiosque (mostrada como um travessão para visitas registradas sem check-in de quiosque). Para tendências em toda a igreja em vez do histórico de uma pessoa, veja [Acompanhando Frequência](../attendance/tracking-attendance.md)
- **Donations** — Ver [histórico de doações](../donations/recording-donations.md)

## Enviando um E-mail para uma Pessoa

Se a pessoa tiver um endereço de email registrado, um botão **Email this person** (ícone de envelope) aparece no cabeçalho do perfil.

1. No perfil da pessoa, clique no **ícone de envelope**.
2. Um diálogo de **Email** intitulado com o nome da pessoa abre, mostrando **Sending to** com o endereço da pessoa.
3. Opcionalmente escolha um modelo salvo de **Load Template (optional)**.
4. Digite um **Subject** e componha a mensagem.
5. Clique em **Send Email**.

Para escrever a mensagem em seu próprio programa de correio, clique em **Open in my email app**.

:::info
Enviar do B1 usa os mesmos limites de aprovação e diários que email de grupo. Se sua igreja ainda não foi aprovada, o diálogo pede para você solicitar uma revisão — você ainda pode clicar em **Open in my email app** enquanto isso. Veja [Ativando Email de Grupo para Sua Igreja](../groups/group-members.md#turning-on-group-email-for-your-church). Usuários sem permissão para editar membros de grupo vão direto para seu aplicativo de email quando clicam no ícone de envelope.
:::

## Trabalhando com Formulários

Você pode preencher formulários personalizados diretamente do perfil de uma pessoa. Estes são formulários definidos pelo usuário que você pode construir seguindo o guia de [Criando Formulários](../forms/creating-forms.md).

1. No perfil da pessoa, clique no dropdown **Forms** para selecionar um formulário.
2. Clique em **Add Form** para abri-lo.
3. Preencha os detalhes do formulário e clique em **Save**.

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

1. No perfil de uma pessoa, clique no **lápis de edição** ao lado do nome da família.
2. O editor de família abrirá. Selecione o **household role** para a pessoa atual (ex., Cabeça, Cônjuge, Filho).
3. Clique em **Add** para adicionar outro membro da família.
4. Digite o nome da pessoa na caixa de pesquisa e clique em **Search**.
5. Quando a pessoa aparecer nos resultados de pesquisa, clique em **Select**.
6. Escolha seu household role e clique em **Save** para completar a configuração de família.
