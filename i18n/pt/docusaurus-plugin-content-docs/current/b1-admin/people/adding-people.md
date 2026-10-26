---
title: "Adicionando pessoas"
---

# Adicionando pessoas

<div class="article-intro">

A seção Pessoas é a base do B1 Admin — é o banco de dados de membros da sua igreja. Todos os outros recursos (grupos, presença, doações, formulários) estão ligados aos registros de pessoas. Este guia mostra como adicionar alguém ao seu banco de dados, editar os dados dessa pessoa e vincular os membros da família em domicílios.

</div>

## Vídeo de treinamento

<YouTube id="NTL1UDQpx8s" title="Adding People and Households in B1" next="Importing Your People Database in B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de uma conta ativa no B1 Admin com permissão para gerenciar pessoas. Veja [Papéis e Permissões](roles-permissions.md) se não tiver certeza do seu nível de acesso.
- Se você estiver adicionando mais de algumas pessoas, considere usar a ferramenta de [Importação CSV](importing-data.md).

</div>

## Adicionando uma pessoa

1. Acesse o painel do B1.church Admin.
2. Abra o [menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Pessoas** e clique em **Pessoas**.
3. Clique no botão **Adicionar Pessoa** no cabeçalho da página. A página rola para baixo até o formulário **Adicionar Nova Pessoa**, abaixo do diretório.
4. Preencha o **Nome**, o **Sobrenome** e o **E-mail** da pessoa e clique em **Adicionar**.

A página de perfil da pessoa será aberta, pronta para você adicionar mais detalhes.

:::tip
Se você está migrando de outro sistema de gestão de igrejas, o recurso [Importar Dados](importing-data.md) permite trazer todo o seu diretório a partir de um arquivo CSV — muito mais rápido do que adicionar pessoas uma por uma.
:::

### Alertas de duplicidade

Se o endereço de e-mail (ou, ao criar uma pessoa pelo formulário completo de Edição, o número de telefone ou a combinação de nome + sobrenome + data de nascimento) corresponder a alguém que já está no seu banco de dados, uma caixa de diálogo **Possível Duplicata** aparece antes que o novo registro seja salvo. Ela lista cada pessoa correspondente com o e-mail, o telefone e a data de nascimento para que você possa comparar.

- Clique em **Usar Existente** ao lado de uma correspondência para usar o registro dessa pessoa em vez de criar um novo.
- Clique em **Criar Mesmo Assim** para adicionar a nova pessoa, mesmo que tenha sido encontrada uma possível correspondência.

A verificação de duplicidade só acontece quando você está criando uma pessoa totalmente nova — editar um registro existente nunca a dispara. Ela apenas evita novas duplicatas; não mescla dois registros que já existem.

## Editando os detalhes

1. No perfil da pessoa, clique no botão **Editar** abaixo das informações de contato, à esquerda.
2. No formulário **Dados Pessoais**, preencha informações adicionais, como o nome do meio, a situação de membro (**Visitante**, **Convidado**, **Frequentador Regular**, **Membro**, **Equipe**, **Inativo** ou **Falecido**), datas, endereço, telefones e (para crianças e estudantes) série e escola.
3. Clique em **Salvar** para armazenar as informações pessoais.

O lado esquerdo do perfil mostra a foto da pessoa, o nome, a situação de membro, as informações de contato, os valores de quaisquer [campos personalizados](../settings/custom-fields.md) e o seu domicílio. Clique na foto para alterá-la. Abaixo do botão **Editar** há mais algumas ações: **Fluxo de trabalho** (adicionar a pessoa a um [fluxo de trabalho](../serving/workflows.md)), **Mesclar**, **Exportar** e **Exportar Dados**.

O restante do perfil mostra uma seção de resumo para cada tipo de informação relacionada:

- **Presença** — Mostra em quais das últimas semanas a pessoa esteve presente e as visitas mais recentes. Clique em **Todos os anos** para ver o histórico completo de visitas, incluindo o campus, o culto, o horário do culto, o grupo e uma coluna **Check-in** com o horário do check-in no quiosque (exibido como um traço para visitas registradas sem check-in no quiosque), ou em **Imprimir** para imprimi-lo (a impressão tem o logotipo e o nome da sua igreja centralizados no topo, acima do nome da pessoa). Para tendências da igreja como um todo, em vez do histórico de uma pessoa, veja [Acompanhando a Presença](../attendance/tracking-attendance.md)
- **Doações** — Mostra as contribuições deste ano, incluindo as feitas a fundos não dedutíveis. Clique em **Todos os anos** para ver o [histórico completo de doações](../donations/recording-donations.md), ou em **Registrar uma contribuição** para registrar uma nova. Se a sua igreja ativou a [Privacidade de Doações](../settings/church-settings.md#giving-privacy), os valores ficam ocultos até que você clique em **Mostrar doações**
- **Grupos** — Lista as [participações em grupos](../groups/group-members.md) da pessoa
- **Notas** — Mostra as notas recentes sobre a pessoa (cuidado pastoral, acompanhamentos, etc.). Clique em **Todas as notas** para ler e adicionar notas. Cada nota mostra quem a escreveu e a data e hora em que foi publicada. Para ver as notas recentes de todas as pessoas de uma vez, use a página de [Notas](./notes.md)
- **Formulários** — Lista os formulários da pessoa e se cada um foi enviado ou não (veja [Trabalhando com formulários](#working-with-forms) abaixo)

Ao abrir uma dessas visualizações completas, clique no link **Voltar para** com o nome da pessoa no topo para retornar ao perfil.

## Enviando e-mail para uma pessoa

Se a pessoa tiver um endereço de e-mail cadastrado, um botão **E-mail** aparece abaixo das informações de contato, à esquerda do perfil.

1. No perfil da pessoa, clique em **E-mail**.
2. Abre-se uma caixa de diálogo **E-mail** com o nome da pessoa no título, mostrando **Enviando para** com o endereço dela.
3. Opcionalmente, escolha um modelo salvo em **Carregar modelo (opcional)**.
4. Digite um **Assunto** e escreva a mensagem.
5. Clique em **Enviar e-mail**.

Para escrever a mensagem no seu próprio programa de e-mail, clique em **Abrir no meu aplicativo de e-mail**.

:::info
O envio pelo B1 usa as mesmas aprovações e limites diários do e-mail para grupos. Se a sua igreja ainda não tiver sido aprovada, a caixa de diálogo pede que você solicite uma análise — enquanto isso, você ainda pode clicar em **Abrir no meu aplicativo de e-mail**. Veja [Ativando o e-mail para grupos na sua igreja](../groups/group-members.md#turning-on-group-email-for-your-church). Usuários sem permissão para editar membros de grupos vão direto para o aplicativo de e-mail quando clicam em **E-mail**.
:::

## Trabalhando com formulários

Você pode preencher formulários personalizados diretamente a partir do perfil de uma pessoa. São formulários definidos pelo usuário que podem ser criados seguindo o guia [Criando Formulários](../forms/creating-forms.md).

1. No perfil da pessoa, localize a seção **Formulários**. Ela lista cada formulário junto com a indicação de se foi **Enviado** ou **Não enviado**.
2. Clique no nome de um formulário para abri-lo (ou clique em **Todos os formulários** para ver a lista completa).
3. Clique no **ícone de edição** (lápis) no formulário, preencha os dados e clique em **Salvar**.

Depois que um formulário for enviado, clique no **ícone de impressão** ao lado dele para imprimir as respostas preenchidas daquela pessoa.

Se um envio foi associado à pessoa errada, clique no ícone **Alterar pessoa** (duas setas) ao lado dele para transferi-lo para outra pessoa ou desvinculá-lo. Veja [Alterando a pessoa em um envio](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formulários vinculados ao perfil de uma pessoa usam o tipo de formulário **Pessoas**. Se você precisar de um formulário independente (como uma inscrição em evento), veja a [opção de formulário Independente](../forms/creating-forms.md) no guia de formulários.
:::

:::tip
Se você só precisa acompanhar uma ou duas informações extras sobre as pessoas — uma data, um número, uma resposta sim/não — use [Campos Personalizados](../settings/custom-fields.md) em vez de um formulário. Eles são mais rápidos de preencher e podem ser pesquisados diretamente na Pesquisa Avançada.
:::

## Gerenciando domicílios {#managing-households}

Os domicílios permitem vincular os membros da família entre si. Isso é especialmente útil para o [check-in](../attendance/check-in.md), em que um dos pais pode fazer o check-in de todos os filhos de uma só vez.

1. No perfil de uma pessoa, clique em **Editar** ao lado do título **Domicílio**, à esquerda.
2. O editor de domicílio será aberto. Selecione o **papel no domicílio** da pessoa atual (por exemplo, Responsável, Cônjuge, Filho, Outro).
3. Clique no ícone **Adicionar** para incluir outro membro do domicílio.
4. Em **Adicionar membro do domicílio**, digite o nome da pessoa no campo de busca e pressione **Enter** ou clique no ícone de pesquisa. (Antes de digitar, aparece uma pequena lista de **Pessoas recentes**.)
5. Quando a pessoa aparecer nos resultados, clique no nome dela ou no ícone de adicionar ao lado.
6. Escolha o papel dela no domicílio e clique em **Salvar** para concluir a configuração do domicílio.
