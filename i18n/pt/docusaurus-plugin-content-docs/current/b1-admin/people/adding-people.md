---
title: "Como adicionar pessoas"
description: "Adicione uma pessoa ao banco de dados da sua igreja no B1 Admin, preencha os dados dela e vincule os membros da família a domicílios para check-in e relatórios."
---

# Como adicionar pessoas

<div class="article-intro">

A seção Pessoas é a base do B1 Admin -- é o banco de dados de membros da sua igreja. Todos os outros recursos (grupos, presença, doações, formulários) se relacionam aos registros de pessoas. Este guia mostra como adicionar alguém ao seu banco de dados, editar os dados dessa pessoa e vincular os membros da família a domicílios.

</div>

## Vídeo de treinamento {#training-video}

<YouTube id="GtsczJ8JPio" title="Como adicionar pessoas e domicílios no B1" next="Como importar seu banco de dados de pessoas no B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de uma conta ativa no B1 Admin com permissão para gerenciar pessoas. Veja [Funções e permissões](roles-permissions.md) se não tiver certeza do seu nível de acesso.
- Se você for adicionar mais de algumas pessoas, considere usar a ferramenta de [Importação CSV](importing-data.md).

</div>

## Adicionando uma pessoa {#adding-a-person}

1. Acesse o painel do B1.church Admin.
2. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Pessoas** e clique em **Pessoas**.
3. Clique no botão **Adicionar pessoa** no cabeçalho da página. A página rola até o formulário **Adicionar uma nova pessoa**, abaixo do diretório.
4. Preencha o **Nome** e o **Sobrenome** da pessoa (ambos obrigatórios). Opcionalmente, adicione um **Título**, o **E-mail** e o **Celular**, e clique em **Adicionar** (ou pressione **Enter**).

O B1 cria um novo domicílio para a pessoa, com o nome da família (sobrenome).

A página de perfil da pessoa será aberta, pronta para você incluir mais detalhes.

:::tip
Se você estiver migrando de outro sistema de gestão de igrejas, o recurso [Importar dados](importing-data.md) permite trazer todo o seu diretório a partir de um arquivo CSV -- bem mais rápido do que adicionar pessoas uma a uma.
:::

### Alertas de duplicidade {#duplicate-warnings}

Ao digitar um endereço de e-mail no formulário **Adicionar uma nova pessoa**, o B1 verifica se há duplicidades antes de salvar. Se o endereço de e-mail (ou, ao criar uma pessoa pelo formulário completo de edição, o telefone ou a combinação de nome, sobrenome e data de nascimento) corresponder a alguém que já está no seu banco de dados, uma caixa de diálogo **Possível duplicidade** aparece antes de o novo registro ser salvo. Ela lista cada pessoa correspondente com o e-mail, o telefone e a data de nascimento, para que você possa comparar.

- Clique em **Usar existente** ao lado de uma correspondência para usar o registro dessa pessoa, em vez de criar um novo.
- Clique em **Criar mesmo assim** para adicionar a nova pessoa, mesmo que uma possível correspondência tenha sido encontrada.

A verificação só acontece quando você está criando uma pessoa nova -- editar um registro existente nunca a aciona. Ela só impede novas duplicidades; não mescla dois registros que já existem.

## Editando os dados {#editing-details}

1. Na página de perfil da pessoa, clique no botão **Editar**, à esquerda, abaixo da seção **Domicílio**.
2. No formulário **Dados pessoais**, preencha informações adicionais como **Título** (escolha Sr., Sra., Srta., Dr., Prof., Rev. ou Pastor na lista, ou digite o seu próprio, com até 10 caracteres), nome do meio, apelido, **Observações para crachá** (impressas nos crachás de check-in e exibidas como uma etiqueta de alerta no perfil), **Número de doador**, situação de membro (**Visitante**, **Convidado**, **Frequentador regular**, **Membro**, **Equipe**, **Inativo** ou **Falecido**), gênero, estado civil, data de nascimento e de casamento, campus, endereço, telefones com ramal e (para crianças e estudantes) série e escola. Marque **Ocultar-me do diretório de membros** para deixar a pessoa fora do [diretório impresso](./print-directory.md) e do diretório de membros do aplicativo. Os [campos personalizados](../settings/custom-fields.md) aparecem em **Campos personalizados**.
3. Clique em **Salvar** para guardar os dados pessoais, ou em **Cancelar** para fechar o formulário sem salvar.

Se você alterar o endereço de alguém que mora com outras pessoas no mesmo domicílio, o B1 perguntará se deve usar o novo endereço para todo o domicílio. O formulário também tem um botão **Excluir** (para excluir a pessoa) e uma seção **Gerenciamento de dados** para exportar ou anonimizar os dados da pessoa (veja [Segurança de dados](../settings/data-security.md#using-the-data-management-tools)).

O lado esquerdo do perfil mostra a foto, o nome, a idade, o gênero, o estado civil, o campus, a situação de membro, os dados de contato, os valores de quaisquer [campos personalizados](../settings/custom-fields.md) e o domicílio da pessoa. As etiquetas abaixo do nome indicam quando a pessoa **Tem login** (uma conta do B1), está **Oculta do diretório** ou tem observações para crachá. Acima do domicílio, **Adicionado** mostra a data em que o registro foi criado (apenas para pessoas adicionadas desde o final de outubro de 2026). Clique na foto para alterá-la. Abaixo do domicílio estão os botões **Editar**, **E-mail** e **Texto** (veja abaixo), além de algumas outras ações: **Fluxo de trabalho** (adiciona a pessoa a um [fluxo de trabalho](../serving/workflows.md)), **Mesclar**, **Exportar** e **Exportar dados**. Se a pessoa pertencer a um domicílio, a seção **Retirada** lista as pessoas autorizadas a buscar crianças no [check-in](../attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people).

O restante do perfil mostra uma seção de resumo para cada tipo de informação relacionada:

- **Presença** -- Mostra em quais das últimas semanas a pessoa esteve presente e as visitas mais recentes. Clique em **Todos os anos** para ver o histórico completo de visitas, com campus, culto, horário do culto, grupo e uma coluna **Check-in** com o horário do check-in no quiosque (exibido como um traço nas visitas registradas sem check-in no quiosque), ou em **Imprimir** para imprimi-lo (a impressão tem o logotipo e o nome da sua igreja centralizados no topo, acima do nome da pessoa). Para tendências da igreja como um todo, em vez do histórico de uma pessoa, veja [Acompanhando a presença](../attendance/tracking-attendance.md)
- **Doações** -- Mostra as contribuições deste ano, inclusive as destinadas a fundos não dedutíveis. Clique em **Todos os anos** para ver o [histórico completo de doações](../donations/recording-donations.md), ou em **Registrar uma oferta** para lançar uma nova. Se a sua igreja ativou a [Privacidade de doações](../settings/church-settings.md#giving-privacy), os valores permanecem ocultos até você clicar em **Mostrar doações**
- **Grupos** -- Lista as [participações em grupos](../groups/group-members.md) da pessoa, com **Entrou em** e a data de entrada em cada grupo, quando registrada
- **Anotações** -- Mostra as anotações recentes sobre a pessoa (cuidado pastoral, acompanhamentos etc.). Clique em **Todas as anotações** para ler e adicionar anotações. Cada anotação mostra quem a escreveu e a data e a hora da publicação. Para formatar uma anotação, selecione o texto na caixa da anotação e escolha **Negrito**, **Itálico**, **Lista com marcadores** ou **Lista numerada** no pequeno menu que aparece (ou pressione **Ctrl+B** / **Ctrl+I**, ou **Cmd** em um Mac); a anotação mostra a formatação depois de publicada. Ao excluir uma anotação, o sistema pede confirmação antes, porque ela não pode ser desfeita. Para ver as anotações recentes de todas as pessoas de uma vez, use a página [Anotações](./notes.md)
- **Formulários** -- Lista os formulários da pessoa e se cada um foi enviado ou não (veja [Trabalhando com formulários](#working-with-forms) abaixo)
- **Solicitações e inscrições** -- Lista as [solicitações de eventos](../calendars/approvals.md) de salas e recursos da pessoa (com as salas ou recursos pedidos e **Pendente**, **Aprovada** ou **Recusada**) e as suas [inscrições em eventos](../calendars/paid-registrations.md) (com o número de pessoas inscritas e **Inscrito**, **Pendente**, **Em lista de espera** ou **Cancelado**), das mais recentes para as mais antigas. São exibidas as cinco últimas; clique em **Todas as solicitações** para a lista completa. Você vê as solicitações de eventos se puder usar a página [Aprovações](../calendars/approvals.md), e as inscrições se puder ver inscrições; sem nenhuma das duas permissões, a seção fica oculta

Ao abrir uma dessas visualizações completas, clique no link **Voltar para** com o nome da pessoa, no topo, para retornar ao perfil.

## Enviando e-mail para uma pessoa {#emailing-a-person}

Se a pessoa tiver um endereço de e-mail cadastrado, um botão **E-mail** aparece ao lado de **Editar**, abaixo do domicílio, à esquerda do perfil.

1. No perfil da pessoa, clique em **E-mail**.
2. Abre-se a caixa de diálogo **E-mail**, com o nome da pessoa no título, mostrando **Enviando para** com o endereço da pessoa.
3. Opcionalmente, escolha um modelo salvo em **Carregar modelo (opcional)**.
4. Digite o **Assunto** e escreva a mensagem.
5. Clique em **Enviar e-mail**.

Para escrever a mensagem no seu próprio programa de e-mail, clique em **Abrir no meu aplicativo de e-mail**.

:::info
O envio pelo B1 usa as mesmas aprovações e os mesmos limites diários do e-mail para grupos. Se a sua igreja ainda não foi aprovada, a caixa de diálogo pede que você solicite uma análise -- enquanto isso, você ainda pode clicar em **Abrir no meu aplicativo de e-mail**. Veja [Ativando o e-mail para grupos na sua igreja](../groups/group-members.md#turning-on-group-email-for-your-church). Usuários sem permissão para editar membros de grupos vão direto para o aplicativo de e-mail ao clicar em **E-mail**.
:::

## Enviando mensagem de texto para uma pessoa {#texting-a-person}

Se a sua igreja tiver um [provedor de mensagens de texto](../settings/church-settings.md#texting) conectado, você tiver permissão para enviar mensagens e a pessoa tiver um número de celular, um botão **Texto** aparece ao lado de **E-mail**. Clique nele, digite a sua **Mensagem** e clique em **Enviar**. A caixa de diálogo mostra o número para o qual a mensagem será enviada. Veja [Enviando mensagens de texto aos membros do grupo](../groups/group-members.md#texting-group-members) para saber como o envio de mensagens de texto funciona.

## Trabalhando com formulários {#working-with-forms}

Você pode preencher formulários personalizados diretamente no perfil de uma pessoa. São formulários definidos pelo usuário, que você pode criar seguindo o guia [Criando formulários](../forms/creating-forms.md).

1. No perfil da pessoa, localize a seção **Formulários**. Ela lista cada formulário, com a indicação **Enviado** ou **Não enviado**.
2. Clique no nome de um formulário para abri-lo (ou clique em **Todos os formulários** para ver a lista completa).
3. Clique no **ícone de edição** (lápis) do formulário, preencha os dados e clique em **Salvar**.

Depois que um formulário for enviado, clique no **ícone de impressão** ao lado dele para imprimir as respostas preenchidas daquela pessoa. Quando a pessoa tiver um único envio de um formulário, o formulário mostra **Enviado** com a data acima das respostas.

Se um envio tiver sido associado à pessoa errada, clique no ícone **Alterar pessoa** (duas setas) ao lado dele para transferi-lo para outra pessoa ou desvinculá-lo. Veja [Alterando a pessoa de um envio](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Os formulários vinculados ao perfil de uma pessoa usam o tipo de formulário **Pessoas**. Se você precisar de um formulário independente (como uma inscrição em evento), veja a opção [Formulário independente](../forms/creating-forms.md) no guia de formulários.
:::

:::tip
Se você só precisar registrar uma ou duas informações extras sobre as pessoas -- uma data, um número, uma resposta sim/não --, use [Campos personalizados](../settings/custom-fields.md) em vez de um formulário. Eles são mais rápidos de preencher e podem ser pesquisados diretamente na Pesquisa avançada.
:::

## Gerenciando domicílios {#managing-households}

Os domicílios permitem vincular os membros de uma família. Isso é especialmente útil no [check-in](../attendance/check-in.md), em que um dos pais pode fazer o check-in de todos os filhos de uma vez.

1. No perfil de uma pessoa, clique em **Editar** ao lado do título **Domicílio**, à esquerda.
2. O editor de domicílio será aberto. Selecione a **função no domicílio** da pessoa atual (por exemplo, Responsável, Cônjuge, Filho, Outro).
3. Clique no ícone **Adicionar** para incluir outro membro do domicílio.
4. Em **Adicionar membro do domicílio**, digite o nome da pessoa na caixa de pesquisa e pressione **Enter** ou clique no ícone de pesquisa. (Antes de você digitar, é exibida uma pequena lista de **Pessoas recentes** -- as pessoas que você escolheu mais recentemente em qualquer pesquisa de pessoas, seguidas das pessoas mais novas no B1.)
5. Quando a pessoa aparecer nos resultados, clique no nome dela ou no ícone de adicionar ao lado.
6. Escolha a função dela no domicílio e clique em **Salvar** para concluir a configuração do domicílio.

Se a pessoa ainda não estiver no B1, clique em **Adicionar nova pessoa** abaixo da pesquisa. Além de nome, título, e-mail e celular, a caixa de diálogo pede a **Função no domicílio** (Responsável, Cônjuge, Filho ou Outro). A nova pessoa é criada e colocada nesse domicílio com a função escolhida; clique em **Salvar** para concluir.
