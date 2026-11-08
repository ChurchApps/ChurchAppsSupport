---
title: "Configuração de Auto Check-In com B1 Checkin e B1 Admin"
sidebar_label: "Check-in"
description: "Configure o auto check-in para cultos com o aplicativo B1 Checkin no B1 Admin, incluindo dispositivos, contas de quiosque, agendamentos, identidade visual e cadastro de visitantes por QR code."
---

# Check-in

<div class="article-intro">

O B1 Admin oferece suporte ao auto check-in nos cultos por meio do aplicativo complementar **B1 Checkin**. Os membros podem fazer o próprio check-in e o de suas famílias em quiosques ou dispositivos dedicados ao chegar, o que torna o processo mais rápido e reduz a carga de trabalho dos voluntários. Cada check-in é registrado automaticamente como presença.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Suas unidades, horários de culto e grupos precisam estar configurados em [Configuração de Presença](setup.md).
- Você precisa de [pessoas cadastradas no seu banco de dados](../people/adding-people.md) com [famílias](../people/adding-people.md#managing-households) configuradas, para que as famílias possam fazer check-in juntas.
- Você vai precisar de um tablet e, opcionalmente, de uma impressora de etiquetas Brother (veja as [recomendações de hardware](#recommended-hardware) abaixo).

</div>

## Como funciona

O aplicativo B1 Checkin se conecta à sua configuração de presença no B1 Admin. Quando um membro faz check-in, a presença é registrada automaticamente na unidade, no horário de culto e no grupo corretos. Você não precisa lançar a presença manualmente para quem usa o sistema de check-in.

## Configurando o check-in

1. **Configure primeiro a estrutura de presença.** No B1 Admin, acesse **Pessoas > Presença** e clique em **Configurar** para garantir que suas unidades, horários de culto e grupos estejam definidos. O aplicativo de check-in depende dessa configuração. Opcionalmente, defina um [agendamento de check-in](setup.md#setting-a-check-in-schedule) para cada horário de culto, para que o check-in abra e feche automaticamente a cada semana. Os agendamentos usam o fuso horário da unidade do culto ou, se a unidade não tiver um definido, o fuso horário da sua igreja. O quiosque mostra como **Encerrado** os horários de culto cuja janela está fechada e informa às famílias quando o check-in será aberto. Consulte [Configuração de Presença](setup.md) para mais detalhes.
2. **Instale o aplicativo B1 Checkin** nos dispositivos que você pretende usar. O aplicativo está disponível nas seguintes plataformas:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablets Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablets Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Entre no aplicativo B1 Checkin** usando uma conta que tenha a permissão de presença **Checkin** (ou **Editar Presença**). Consulte [Contas de quiosque de check-in](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Selecione a unidade e o horário de culto** do encontro atual.
5. Agora os membros podem pesquisar o próprio nome no dispositivo e fazer check-in.

:::tip
Posicione os dispositivos de check-in em locais visíveis e de fácil acesso, como entradas do saguão ou balcões de recepção. Um breve anúncio durante os cultos ajuda os membros a saber que essa opção está disponível.
:::

:::tip
Se sua igreja tiver várias unidades, será preciso repetir a configuração para cada uma em [Configuração de Presença](setup.md). Cada dispositivo de check-in pode ser configurado para uma unidade diferente.
:::

## Hardware recomendado

**Tablets** — qualquer um destes funciona bem com o aplicativo:

- **Compacto:** Samsung Galaxy Tab A7 Lite 8,7"
- **Tela grande:** Samsung Galaxy Tab A8 10,5"
- **Econômico:** Amazon Fire HD 10

**Impressoras** — os check-ins funcionam com impressoras de etiquetas Brother para imprimir crachás:

- **Melhor opção:** Brother QL-1110NWB (suporta vários tablets via Bluetooth e Wi-Fi)
- **Boa opção:** Brother QL-810W (suporta vários tablets via Wi-Fi)
- **Econômica:** Brother QL-1100 (somente Wi-Fi)

**Etiquetas:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Somente impressoras de etiquetas Brother são compatíveis com o aplicativo B1 Checkin. Outras marcas de impressora não funcionarão para imprimir crachás.
:::

:::info
Siga as instruções de configuração da sua impressora para conectá-la à mesma rede Wi-Fi do seu tablet. Você pode encontrar drivers e guias de configuração das impressoras Brother no [site de suporte da Brother](https://support.brother.com).
:::

## Personalizando a aparência do quiosque

Você pode personalizar a aparência do aplicativo B1 Checkin para combinar com a identidade visual da sua igreja. No B1 Admin, acesse **Mobile > B1 CheckIn** e use o cartão **Tema do Quiosque** para configurar:

### Cores

Personalize oito configurações de cor para combinar com a identidade visual da sua igreja:

- **Primária** e **Contraste Primário** -- Cor principal da marca e a cor do seu texto.
- **Secundária** e **Contraste Secundário** -- Cor de destaque e a cor do seu texto.
- **Fundo do Cabeçalho** e **Fundo do Subcabeçalho** -- Cores das áreas de cabeçalho do quiosque.
- **Fundo do Botão** e **Texto do Botão** -- Cores dos botões interativos.

### Imagem de fundo

Envie uma imagem de fundo opcional para as telas de boas-vindas e de busca do quiosque. O tamanho recomendado é 1920x1080 pixels.

### Tela de espera / Protetor de tela

Configure um protetor de tela que seja ativado após um período de inatividade:

1. Ative ou desative a tela de espera.
2. Defina o **tempo limite** (quantos segundos de inatividade antes de o protetor de tela iniciar; mínimo de 10 segundos).
3. Adicione um ou mais **slides** -- cada slide tem uma imagem e uma duração de exibição (mínimo de 3 segundos).

:::tip
Use a tela de espera para exibir anúncios, eventos próximos ou mensagens de boas-vindas quando o quiosque não estiver em uso.
:::

## Cadastro de visitantes por QR code

O quiosque de check-in pode exibir um QR code que os visitantes escaneiam para se cadastrar, junto com sua família, no próprio celular. Isso agiliza o check-in de visitantes que vêm pela primeira vez.

Quando um visitante escaneia o QR code, ele é levado a uma [página de cadastro de visitantes](../../b1-church/checkin/guest-registration.md), onde informa os nomes da família e quaisquer outros dados que você decidir solicitar. Um voluntário pode então localizá-lo no quiosque e fazer o check-in.

### Ativando o cadastro por QR code

Para ativar a exibição do QR code:

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Mobile**.
2. Clique em **B1 CheckIn**.
3. Ative **Cadastro de visitantes por QR** e clique em **Salvar**.

:::note
Essa configuração fica em **Mobile > B1 CheckIn** (na mesma página do cartão **Tema do Quiosque**), e não em Presença. A ação **Quiosque** na página de Presença tem um link para esta página.
:::

Depois que a opção estiver ativada, as demais opções abaixo aparecem no mesmo cartão **Cadastro de visitantes por QR**. Clique em **Salvar** no cartão após alterar qualquer uma delas.

### Escolhendo os campos do cadastro

A lista **Campos do cadastro** controla o que o formulário de cadastro solicita. **Nome** e **Sobrenome** estão sempre no formulário e são sempre obrigatórios para cada membro da família. Para os demais campos, ative **Incluir** para adicioná-lo ao formulário e, em seguida, ative **Obrigatório** se os visitantes precisarem preenchê-lo. **Obrigatório** só pode ser ativado para um campo incluído, e desativar **Incluir** remove também essa obrigatoriedade.

| Campo | Solicitado para | Incluído por padrão |
|-------|-----------------|---------------------|
| **Título** | Cada membro da família, como uma lista suspensa antes do nome (Sr., Sra., Srta., Ms, Dr., Prof., Rev., Pastor) | Não |
| **E-mail** | Apenas o contato principal | Sim (opcional) |
| **Telefone** | Cada membro da família. Quando obrigatório, somente o contato principal precisa preenchê-lo. | Sim (opcional) |
| **Papel na família** | Cada membro da família após o contato principal -- Cônjuge, Filho(a) ou Outro. O contato principal é o chefe de uma nova família. Quem não tiver um papel é salvo como Outro. | Sim (opcional) |
| **Endereço residencial** | Uma vez para a família -- rua, complemento, cidade, estado e CEP. Quando obrigatório, todos os campos, exceto o complemento, precisam ser preenchidos. O endereço é salvo em todos os membros da família. | Não |
| **Data de nascimento** | Cada membro da família | Não |
| **Gênero** | Cada membro da família | Não |
| **Estado civil** | Apenas o contato principal | Não |
| **Série** | Cada membro da família (do Pré-escolar ao 12º ano, ou Formado) | Não |
| **Comentários** | Uma vez, em uma caixa abaixo dos membros da família (até 1.000 caracteres) | Não |

Campos desativados nunca são salvos, mesmo que alguém os envie ao cadastro de outra forma. Os comentários são salvos como uma nota no registro do contato principal (publicada como "Cadastro de visitante"), para que você possa lê-los na seção **Notas** do perfil dele.

### Adicionando visitantes a um grupo

Use **Adicionar novos visitantes ao grupo** para colocar automaticamente todos que se cadastrarem em um dos seus grupos -- por exemplo, um grupo "Recém-chegados" ou um grupo para o evento deste fim de semana. Escolha **Nenhum** (o padrão) para pular essa etapa. Os visitantes nunca veem nem escolhem o grupo; ele é definido apenas aqui. Altere-o antes de cada evento para que você possa acompanhar em conjunto os visitantes daquele evento.

### Registrando a presença

Quando um grupo é selecionado, aparece a opção **Também registrar presença**. Ative-a para marcar os visitantes como presentes no momento em que se cadastram, para que você não precise fazer o check-in deles separadamente.

A presença só é registrada quando o cadastro acontece durante um dos horários de culto **agendados** do grupo selecionado:

- O grupo deve estar vinculado a um ou mais horários de culto, e esses horários devem ter um [agendamento de check-in](setup.md#setting-a-check-in-schedule) (um **Dia** e um **Horário de início**).
- "Durante" significa dentro da janela de check-in desse horário de culto -- desde os minutos de **Abrir check-in** antes do início até os minutos de **Fechar check-in** depois do término (ou depois do início, se não houver horário de término; sem horário de término nem minutos de fechamento, até o fim desse dia), no mesmo fuso horário usado pelo agendamento de check-in.
- Cada membro da família é marcado como presente no grupo para cada um dos horários de culto que estiver aberto naquele momento, na data de hoje.
- Cadastros feitos em outro momento, ou para um grupo cujos horários de culto não têm agendamento, são adicionados ao grupo, mas não são contabilizados como presença.

### Foto do cabeçalho

Em **Foto do cabeçalho**, clique em **Alterar foto** para escolher ou enviar uma imagem (recortada no formato 16:9) que será exibida no topo da página de cadastro, no lugar do ícone padrão. Clique em **Remover** para voltar ao ícone.

### Compartilhando o link de cadastro

Depois que o cadastro por QR code for ativado, uma seção **Compartilhar QR code de cadastro** aparece na parte inferior do cartão. Ela oferece duas formas de levar os visitantes ao formulário de cadastro, além do QR code do quiosque:

- **Copiar link** — copia a URL de cadastro para que você possa colá-la no site da igreja, em e-mails ou em qualquer outro lugar on-line.
- **Baixar PNG** — baixa o QR code como uma imagem que você pode imprimir em panfletos, boletins ou sinalizações.

:::tip
Adicione o link de cadastro à página "Planeje sua visita" ou "Sou novo" do site da sua igreja para que os visitantes possam se cadastrar antes mesmo de chegar.
:::

### O que acontece depois que um visitante se cadastra

O B1 primeiro procura pessoas que já estejam em **Pessoas**. Um membro da família é associado a uma pessoa existente quando exatamente uma pessoa tem o mesmo primeiro nome e o mesmo e-mail ou telefone. Uma criança cadastrada sem e-mail nem telefone é associada pelo primeiro nome dentro da família que foi associada. As pessoas associadas são reaproveitadas como estão -- o cadastro nunca altera seus dados nem seu status de membro -- e quem for novo entra na família associada.

Quando ninguém corresponde, o cadastro cria uma nova família com o sobrenome do contato principal, com um registro de pessoa para cada membro. Todos os novos são adicionados a **Pessoas** com o status de membro **Visitante**, tendo o contato principal como chefe da família.

Pessoas associadas e novas são adicionadas ao grupo escolhido (caso ainda não estejam nele) e têm a presença registrada quando essa opção está ativada. Os comentários são salvos como uma nota no contato principal.

Para fazer um acompanhamento automático, adicione um [gatilho de fluxo de trabalho](../serving/workflows.md#triggers), como **Pessoa · Criada** com a condição *Status de membro é Visitante*, ou **Grupo · Membro entrou** para o grupo que você escolheu acima.

## O que é registrado

Cada check-in cria um registro de presença no B1 Admin. Você pode ver esses registros na página de [Presença](tracking-attendance.md) e nas sessões de cada [grupo](../groups/group-members.md), exatamente como a presença lançada manualmente. Não há diferença na forma como os dados aparecem -- ambos os métodos alimentam os mesmos relatórios.
