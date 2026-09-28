---
title: "Adicionando Pessoas"
---

# Adicionando Pessoas

<div class="article-intro">

A seção Pessoas é a base de B1 Admin -- é o banco de dados de membros da sua Igreja. Cada outro recurso (grupos, presença, doações, formulários) está vinculado a registros de pessoas. Este guia o conduz pela adição de alguém ao seu banco de dados, edição de seus detalhes e vinculação de membros da família em famílias.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta B1 Admin ativa com permissão para gerenciar pessoas. Consulte [Funções e Permissões](roles-permissions.md) se não tiver certeza sobre seu nível de acesso.
- Se você estiver adicionando mais do que um punhado de pessoas, considere usar a ferramenta [Importação CSV](importing-data.md).

</div>

## Adicionando uma Pessoa

1. Navegue até o painel B1.church Admin.
2. Abra o **menu de seção** no canto superior esquerdo e escolha **Pessoas**.
3. Clique no botão **Adicionar Pessoa** no canto superior direito.
4. Preencha o nome, sobrenome e endereço de e-mail da pessoa e clique em **Adicionar**.

A página de perfil da pessoa será aberta, pronta para você adicionar mais detalhes.

:::tip
Se você está migrando de outro sistema de gerenciamento de Igreja, o recurso [Importar Dados](importing-data.md) permite trazer seu diretório inteiro de um arquivo CSV -- muito mais rápido do que adicionar pessoas uma por uma.
:::

### Avisos de Duplicatas

Se o endereço de e-mail (ou, ao criar uma pessoa a partir do formulário Editar completo, o número de telefone ou correspondência de nome + sobrenome + data de nascimento) corresponder a alguém já em seu banco de dados, um diálogo **Possível Duplicata** aparece antes do novo registro ser salvo. Ele lista cada pessoa correspondente junto com seu e-mail, telefone e data de nascimento para que você possa comparar.

- Clique em **Usar Existente** ao lado de uma correspondência para usar o registro dessa pessoa em vez de criar um novo.
- Clique em **Criar Mesmo Assim** para adicionar a nova pessoa mesmo que uma possível correspondência tenha sido encontrada.

Isso apenas verifica duplicatas quando você está criando uma pessoa totalmente nova -- editar um registro existente nunca o aciona. Ele apenas evita novas duplicatas; não mescla dois registros que já existem.

## Editando Detalhes

1. Na página de perfil da pessoa, clique no **lápis de edição** ao lado de seu nome.
2. Preencha informações adicionais, como nome do meio, status de adesão, datas, endereço, números de telefone e (para crianças e alunos) série e escola.
3. Clique em **Salvar** para armazenar as informações pessoais.

O perfil também inclui várias abas para informações relacionadas:

- **Notas** -- Adicione notas sobre a pessoa (cuidado pastoral, acompanhamentos, etc.)
- **Grupos** -- Visualize e gerencie [associações de grupo](../groups/group-members.md)
- **Presença** -- Visualize o histórico de visitas individual desta pessoa, incluindo o campus, serviço, horário do serviço, grupo e uma coluna **Verificado** com a hora de verificação do quiosque (mostrada como hífen para visitas registradas sem verificação do quiosque). Para tendências de nível de Igreja em vez do histórico de uma pessoa, consulte [Rastreando Presença](../attendance/tracking-attendance.md)
- **Doações** -- Visualize o [histórico de doações](../donations/recording-donations.md)

## Trabalhando com Formulários

Você pode preencher formulários personalizados diretamente do perfil de uma pessoa. Estes são formulários definidos pelo usuário que você pode construir seguindo o guia [Criando Formulários](../forms/creating-forms.md).

1. No perfil da pessoa, clique na lista suspensa **Formulários** para selecionar um formulário.
2. Clique em **Adicionar Formulário** para abri-lo.
3. Preencha os detalhes do formulário e clique em **Salvar**.

Após um formulário ser enviado, clique no **ícone de impressão** ao lado dele para imprimir as respostas preenchidas dessa pessoa.

:::info
Formulários vinculados ao perfil de uma pessoa usam o tipo de formulário **Pessoas**. Se você precisar de um formulário independente (como um registro de evento), consulte a opção [formulário Independente](../forms/creating-forms.md) no guia de formulários.
:::

:::tip
Se você apenas precisar rastrear uma ou duas peças extras de informação em pessoas -- uma data, um número, uma resposta sim/não -- use [Campos Personalizados](../settings/custom-fields.md) em vez de um formulário. Eles são mais rápidos de preencher e são pesquisáveis diretamente na Pesquisa Avançada.
:::

## Gerenciando Famílias

As famílias permitem que você vincule membros da família. Isso é especialmente útil para [verificação](../attendance/check-in.md), onde um pai pode verificar todos os seus filhos de uma vez.

1. No perfil de uma pessoa, clique no **lápis de edição** ao lado do nome da família.
2. O editor de família será aberto. Selecione o **papel de família** para a pessoa atual (por exemplo, Chefe, Cônjuge, Filho).
3. Clique em **Adicionar** para adicionar outro membro da família.
4. Digite o nome da pessoa na caixa de pesquisa e clique em **Pesquisar**.
5. Quando a pessoa aparecer nos resultados da pesquisa, clique em **Selecionar**.
6. Escolha seu papel de família e clique em **Salvar** para concluir a configuração da família.
