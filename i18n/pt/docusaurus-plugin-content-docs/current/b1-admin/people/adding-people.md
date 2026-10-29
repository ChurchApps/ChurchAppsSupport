---
title: "Adicionando Pessoas"
---

# Adicionando Pessoas

<div class="article-intro">

A seção Pessoas é a base do B1 Admin -- é o banco de dados de membros da sua igreja. Todos os outros recursos (grupos, presença, doações, formulários) estão ligados aos registros de pessoas. Este guia mostra como adicionar alguém ao seu banco de dados, editar os dados dessa pessoa e vincular os membros de uma família em domicílios.

</div>

## Vídeo de Treinamento

<YouTube id="NTL1UDQpx8s" title="Adding People and Households in B1" next="Importing Your People Database in B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta ativa no B1 Admin com permissão para gerenciar pessoas. Consulte [Funções e Permissões](roles-permissions.md) se não tiver certeza do seu nível de acesso.
- Se você estiver adicionando mais do que algumas pessoas, considere usar a ferramenta de [Importação CSV](importing-data.md).

</div>

## Adicionando uma Pessoa

1. Acesse o painel do B1.church Admin.
2. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Pessoas** e clique em **Pessoas**.
3. Clique no botão **Adicionar Pessoa** no cabeçalho da página. A página rola até o formulário **Adicionar Nova Pessoa** abaixo do diretório.
4. Preencha o **Nome**, o **Sobrenome** e o **E-mail** da pessoa e clique em **Adicionar**.

A página de perfil da pessoa será aberta, pronta para você adicionar mais detalhes.

:::tip
Se você está migrando de outro sistema de gestão de igrejas, o recurso [Importar Dados](importing-data.md) permite trazer todo o seu diretório a partir de um arquivo CSV -- muito mais rápido do que adicionar pessoas uma a uma.
:::

### Alertas de Duplicidade

Se o endereço de e-mail (ou, ao criar uma pessoa pelo formulário completo de Edição, o telefone ou a combinação de primeiro nome + sobrenome + data de nascimento) corresponder a alguém que já está no seu banco de dados, uma caixa de diálogo **Possível duplicata** aparece antes de o novo registro ser salvo. Ela lista cada pessoa correspondente com o e-mail, o telefone e a data de nascimento dela, para que você possa comparar.

- Clique em **Usar existente** ao lado de uma correspondência para usar o registro dessa pessoa em vez de criar um novo.
- Clique em **Criar mesmo assim** para adicionar a nova pessoa mesmo que uma possível correspondência tenha sido encontrada.

A verificação de duplicidade só acontece ao criar um registro totalmente novo -- editar um registro existente nunca a dispara. Ela evita apenas novas duplicatas; não mescla dois registros que já existem.

## Editando os Dados

1. Na página de perfil da pessoa, clique no botão **Editar** abaixo dos dados de contato, à esquerda.
2. No formulário **Dados Pessoais**, preencha informações adicionais, como o segundo nome, o status de membro (**Visitante**, **Convidado**, **Frequentador Regular**, **Membro**, **Equipe**, **Inativo** ou **Falecido**), datas, endereço, telefones e (para crianças e estudantes) série e escola.
3. Clique em **Salvar** para guardar as informações pessoais.

O lado esquerdo do perfil mostra a foto, o nome, o status de membro, os dados de contato, os valores de quaisquer [campos personalizados](../settings/custom-fields.md) e a família. Abaixo da família, **Adicionado** mostra a data em que o registro foi criado (somente para pessoas adicionadas desde o final de outubro de 2026). Clique na foto para alterá-la. Abaixo do botão **Editar** há mais algumas ações: **Fluxo de trabalho** (adiciona a pessoa a um [fluxo de trabalho](../serving/workflows.md)), **Mesclar**, **Exportar** e **Exportar dados**.

O restante do perfil mostra uma seção de resumo para cada tipo de informação relacionada:

- **Presença** — Mostra em quais das últimas semanas a pessoa esteve presente e suas visitas mais recentes. Clique em **Todos os anos** para ver o histórico completo de visitas, incluindo o campus, o culto, o horário de serviço, o grupo e uma coluna **Check-in** com o horário do check-in no quiosque (exibido como um traço para visitas registradas sem check-in no quiosque), ou em **Imprimir** para imprimi-lo (a impressão tem o logotipo e o nome da sua igreja centralizados no topo, acima do nome da pessoa). Para tendências de toda a igreja, em vez do histórico de uma pessoa, consulte [Rastreamento de Presença](../attendance/tracking-attendance.md)
- **Doações** — Mostra as contribuições deste ano, incluindo as feitas a fundos não dedutíveis. Clique em **Todos os anos** para ver o [histórico completo de doações](../donations/recording-donations.md), ou em **Registrar uma contribuição** para lançar uma nova. Se a sua igreja ativou a [Privacidade das Contribuições](../settings/church-settings.md#giving-privacy), os valores ficam ocultos até que você clique em **Mostrar contribuições**
- **Grupos** — Lista as [participações em grupos](../groups/group-members.md) da pessoa, com **Entrou** e a data de entrada em cada grupo quando essa informação está registrada
- **Anotações** — Mostra anotações recentes sobre a pessoa (cuidado pastoral, acompanhamentos etc.). Clique em **Todas as anotações** para ler e adicionar anotações. Cada anotação mostra quem a escreveu e a data e hora em que foi publicada. Para ver as anotações recentes de todas as pessoas de uma vez, use a página [Anotações](./notes.md)
- **Formulários** — Lista os formulários da pessoa e se cada um foi enviado (consulte [Trabalhando com Formulários](#working-with-forms) abaixo)

Ao abrir uma dessas visualizações completas, clique no link **Voltar para** com o nome da pessoa, no topo, para retornar ao perfil.

## Enviando E-mail para uma Pessoa

Se a pessoa tiver um endereço de e-mail cadastrado, um botão **E-mail** aparece abaixo dos dados de contato, à esquerda do perfil.

1. No perfil da pessoa, clique em **E-mail**.
2. Uma caixa de diálogo **E-mail**, com o nome da pessoa no título, é aberta, mostrando **Enviando para** com o endereço dela.
3. Opcionalmente, escolha um modelo salvo em **Carregar modelo (opcional)**.
4. Digite um **Assunto** e escreva a mensagem.
5. Clique em **Enviar e-mail**.

Para escrever a mensagem no seu próprio programa de e-mail, clique em **Abrir no meu aplicativo de e-mail**.

:::info
O envio a partir do B1 segue os mesmos limites diários e de aprovação do e-mail de grupo. Se a sua igreja ainda não foi aprovada, a caixa de diálogo pede que você solicite uma revisão -- você ainda pode clicar em **Abrir no meu aplicativo de e-mail** enquanto isso. Consulte [Ativando o E-mail de Grupo para a Sua Igreja](../groups/group-members.md#turning-on-group-email-for-your-church). Usuários sem permissão para editar membros de grupos vão direto para o aplicativo de e-mail ao clicar em **E-mail**.
:::

## Trabalhando com Formulários

Você pode preencher formulários personalizados diretamente a partir do perfil de uma pessoa. São formulários definidos pelo usuário que você pode criar seguindo o guia [Criando Formulários](../forms/creating-forms.md).

1. No perfil da pessoa, localize a seção **Formulários**. Ela lista cada formulário, com a indicação de **Enviado** ou **Não enviado**.
2. Clique no nome de um formulário para abri-lo (ou clique em **Todos os formulários** para ver a lista completa).
3. Clique no **ícone de edição** (lápis) do formulário, preencha os dados e clique em **Salvar**.

Depois que um formulário for enviado, clique no **ícone de impressão** ao lado dele para imprimir as respostas preenchidas daquela pessoa. Quando a pessoa tem um único envio de um formulário, o formulário mostra **Enviado** com a data acima das respostas.

Se um envio foi registrado para a pessoa errada, clique no ícone **Alterar pessoa** (duas setas) ao lado dele para movê-lo para outra pessoa ou desvinculá-lo. Consulte [Alterando a Pessoa de um Envio](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formulários vinculados ao perfil de uma pessoa usam o tipo de formulário **Pessoas**. Se você precisar de um formulário independente (como uma inscrição em evento), consulte a opção [Formulário Independente](../forms/creating-forms.md) no guia de formulários.
:::

:::tip
Se você só precisa acompanhar uma ou duas informações extras sobre as pessoas -- uma data, um número, uma resposta sim/não -- use os [Campos Personalizados](../settings/custom-fields.md) em vez de um formulário. Eles são mais rápidos de preencher e podem ser pesquisados diretamente na Pesquisa Avançada.
:::

## Gerenciando Famílias {#managing-households}

As famílias permitem vincular os membros de uma mesma família. Isso é especialmente útil para o [check-in](../attendance/check-in.md), em que um dos pais pode fazer o check-in de todos os filhos de uma vez.

1. No perfil de uma pessoa, clique em **Editar** ao lado do título **Família**, à esquerda.
2. O editor de família será aberto. Selecione o **papel na família** da pessoa atual (por exemplo, Chefe, Cônjuge, Filho, Outro).
3. Clique no ícone **Adicionar** para incluir outro membro da família.
4. Em **Adicionar membro da família**, digite o nome da pessoa na caixa de pesquisa e pressione **Enter** ou clique no ícone de pesquisa. (Antes de digitar, aparece uma pequena lista de **Pessoas recentes**.)
5. Quando a pessoa aparecer nos resultados, clique no nome dela ou no ícone de adicionar ao lado.
6. Escolha o papel dela na família e clique em **Salvar** para concluir a configuração da família.
