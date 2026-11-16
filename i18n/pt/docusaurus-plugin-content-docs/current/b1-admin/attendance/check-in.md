---
title: "Configuração do Autoatendimento com B1 Checkin e B1 Admin"
sidebar_label: "Check-In"
description: "Configure o autoatendimento nos cultos com o aplicativo B1 Checkin no B1 Admin, incluindo dispositivos, contas de quiosque, horários, personalização visual e cadastro de visitantes por QR code."
---

# Check-In {#check-in}

<div class="article-intro">

O B1 Admin oferece autoatendimento nos cultos por meio do aplicativo complementar **B1 Checkin**. Os membros podem fazer o check-in deles e de suas famílias em quiosques ou em dispositivos dedicados ao chegar, o que torna o processo mais rápido e reduz o trabalho dos voluntários. Cada check-in é registrado automaticamente como presença.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Suas unidades, horários de culto e grupos precisam estar configurados em [Configuração de Presença](setup.md).
- Você precisa de [pessoas cadastradas no banco de dados](../people/adding-people.md) com [famílias](../people/adding-people.md#managing-households) configuradas para que as famílias possam fazer o check-in juntas.
- Você vai precisar de um tablet e, opcionalmente, de uma impressora de etiquetas Brother (veja [recomendações de hardware](#recommended-hardware) abaixo).

</div>

## Como Funciona {#how-it-works}

O aplicativo B1 Checkin se conecta à sua configuração de presença no B1 Admin. Quando um membro faz o check-in, a presença dele é registrada automaticamente na unidade, no horário de culto e no grupo corretos. Você não precisa lançar a presença manualmente para quem usa o sistema de check-in.

## Configurando o Check-In {#setting-up-check-in}

1. **Configure primeiro a estrutura de presença.** No B1 Admin, vá em **Pessoas > Presença** e clique em **Configuração** para garantir que suas unidades, horários de culto e grupos estejam definidos. O aplicativo de check-in depende dessa configuração. Opcionalmente, defina para cada horário de culto um [horário de check-in](setup.md#setting-a-check-in-schedule), para que o check-in abra e feche automaticamente a cada semana. Os horários usam o fuso horário da unidade do culto ou, se a unidade não tiver um definido, o fuso horário da sua igreja; o quiosque lista como **Fechado** os horários cuja janela está encerrada e informa às famílias quando o check-in abrirá. Veja [Configuração de Presença](setup.md) para mais detalhes.
2. **Instale o aplicativo B1 Checkin** nos dispositivos que você pretende usar. O aplicativo está disponível nas seguintes plataformas:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablets Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablets Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Entre no aplicativo B1 Checkin** usando uma conta que tenha a permissão de presença **Checkin** (ou **Editar Presença**). Veja [Contas de Quiosque para Check-In](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Selecione a unidade e o horário de culto** do encontro atual.
5. Os membros já podem pesquisar o próprio nome no dispositivo e fazer o check-in.

:::tip
Posicione os dispositivos de check-in em locais visíveis e de fácil acesso, como entradas do saguão ou balcões de recepção. Um breve aviso durante os cultos ajuda os membros a saber que essa opção existe.
:::

:::tip
Se sua igreja tiver várias unidades, você precisará repetir a configuração para cada unidade em [Configuração de Presença](setup.md). Cada dispositivo de check-in pode ser configurado para uma unidade diferente.
:::

## Hardware Recomendado {#recommended-hardware}

**Tablets** — qualquer um destes funciona bem com o aplicativo:

- **Compacto:** Samsung Galaxy Tab A7 Lite 8.7"
- **Tela grande:** Samsung Galaxy Tab A8 10.5"
- **Econômico:** Amazon Fire HD 10

**Impressoras** — o check-in funciona com impressoras de etiquetas Brother para imprimir crachás de identificação:

- **Melhor opção:** Brother QL-1110NWB (oferece suporte a vários tablets via Bluetooth e Wi-Fi)
- **Boa opção:** Brother QL-810W (oferece suporte a vários tablets via Wi-Fi)
- **Econômica:** Brother QL-1100 (somente Wi-Fi)

**Etiquetas:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Somente impressoras de etiquetas Brother são compatíveis com o aplicativo B1 Checkin. Outras marcas de impressora não funcionarão para imprimir crachás.
:::

:::info
Siga as instruções de configuração da sua impressora para conectá-la à mesma rede Wi-Fi do seu tablet. Você pode encontrar drivers e guias de configuração das impressoras Brother no [site de suporte da Brother](https://support.brother.com).
:::

## Personalizando a Aparência do Quiosque {#customizing-the-kiosk-appearance}

Você pode personalizar a aparência do aplicativo B1 Checkin para combinar com a identidade visual da sua igreja. No B1 Admin, vá em **Mobile > B1 CheckIn** (ou clique em **Quiosque** na página de Presença) e use o cartão **Tema do Quiosque**. Clique em **Salvar** no cartão depois de fazer alterações.

### Cores {#colors}

O quiosque usa as mesmas cores do aplicativo da sua igreja. Defina-as em **Mobile > Tema do Aplicativo**; o cartão Tema do Quiosque não tem configurações de cor próprias.

### Imagem de Fundo {#background-image}

Em **Imagem de Fundo**, clique em **Enviar Imagem** para adicionar um fundo opcional às telas de boas-vindas e de busca do quiosque. O tamanho recomendado é 1920x1080 pixels. Use **Trocar Imagem** ou **Remover** para substituir ou limpar a imagem.

### Tela Ociosa / Protetor de Tela {#idle-screen--screensaver}

Configure um protetor de tela que seja ativado após um período de inatividade:

1. Abra **Tela Ociosa / Protetor de Tela** e ative **Habilitar tela ociosa**.
2. Defina **Tempo limite (segundos)** -- quantos segundos de inatividade devem passar até o protetor de tela iniciar (mínimo de 10).
3. Clique em **Adicionar Slide** para cada slide, clique em **Enviar** para escolher a imagem e defina a **Duração (s)** (mínimo de 3 segundos).

:::tip
Use a tela ociosa para exibir avisos, próximos eventos ou mensagens de boas-vindas quando o quiosque não estiver em uso.
:::

## Cadastro de Visitantes por QR Code {#guest-registration-via-qr-code}

O quiosque de check-in pode exibir um QR code que os visitantes escaneiam para se cadastrar, junto com a família, no próprio celular. Isso agiliza o check-in de visitantes que vêm pela primeira vez.

Quando um visitante escaneia o QR code, ele é levado a uma [página de cadastro de visitantes](../../b1-church/checkin/guest-registration.md), onde informa os nomes da família e os outros dados que você decidir solicitar. Um voluntário pode então localizar o visitante no quiosque e fazer o check-in.

### Ativando o Cadastro por QR Code {#enabling-qr-guest-registration}

Para ativar a exibição do QR code:

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo) e expanda **Mobile**.
2. Clique em **B1 CheckIn**.
3. Ative **Cadastro de Visitantes por QR** e clique em **Salvar**.

:::note
Esta configuração fica em **Mobile > B1 CheckIn** (na mesma página do cartão **Tema do Quiosque**), e não em Presença. A ação **Quiosque** na página de Presença tem um link para esta página.
:::

Depois que a opção estiver ativada, as demais opções abaixo aparecem no mesmo cartão **Cadastro de Visitantes por QR**. Clique em **Salvar** no cartão depois de alterar qualquer uma delas.

### Escolhendo os Campos do Cadastro {#choosing-sign-up-fields}

A lista **Campos do cadastro** controla o que o formulário de cadastro solicita. **Nome** e **Sobrenome** estão sempre no formulário e são sempre obrigatórios para cada integrante da família. Para os demais campos, ative **Incluir** para adicioná-lo ao formulário e, em seguida, ative **Obrigatório** se os visitantes precisarem preenchê-lo. **Obrigatório** só pode ser ativado para um campo incluído, e desativar **Incluir** também desmarca essa opção.

| Campo | Solicitado | Incluído por padrão |
|-------|-----------|---------------------|
| **Título** | Para cada integrante da família, como uma lista suspensa antes do nome (Sr., Sra., Srta., Ms., Dr., Prof., Rev., Pastor) | Não |
| **E-mail** | Para cada integrante da família. Quando obrigatório, somente o contato principal precisa preenchê-lo. | Sim (opcional) |
| **Telefone** | Para cada integrante da família. Quando obrigatório, somente o contato principal precisa preenchê-lo. | Sim (opcional) |
| **Papel na família** | Para cada integrante da família após o contato principal -- Cônjuge, Filho(a) ou Outro. O contato principal é o responsável pelo novo domicílio. Quem não tiver um papel é salvo como Outro. | Sim (opcional) |
| **Endereço residencial** | Uma vez para a família -- rua, complemento, cidade, estado e CEP. Quando obrigatório, tudo exceto o complemento precisa ser preenchido. O endereço é salvo em cada integrante da família. | Não |
| **Data de nascimento** | Para cada integrante da família | Não |
| **Gênero** | Para cada integrante da família | Não |
| **Estado civil** | Somente para o contato principal | Não |
| **Série** | Para cada integrante da família (do Pré-escolar ao 12º ano, ou Formado) | Não |
| **Comentários** | Uma vez, em uma caixa abaixo dos integrantes da família (até 1.000 caracteres) | Não |
| **Foto** | Para cada integrante da família, com um botão **Adicionar Foto** que abre um recorte de imagem. A foto se torna a foto de perfil da nova pessoa. Quando obrigatório, somente o contato principal precisa adicionar uma. | Não |

Os campos desativados nunca são salvos, mesmo que alguém os envie ao cadastro por outro meio. Os comentários são salvos como uma anotação no registro do contato principal (publicada como "Cadastro de visitante"), para que você possa lê-los na seção **Anotações** do perfil dele.

### Adicionando Visitantes a um Grupo {#adding-guests-to-a-group}

Use **Adicionar novos visitantes ao grupo** para incluir automaticamente todos que se cadastrarem em um dos seus grupos -- por exemplo, um grupo "Recém-chegados" ou um grupo para o evento deste fim de semana. Escolha **Nenhum** (o padrão) para não fazer isso. Os visitantes nunca veem nem escolhem o grupo; ele é definido somente aqui. Altere-o antes de cada evento para acompanhar os visitantes daquele evento em conjunto.

### Registrando a Presença {#recording-attendance}

Quando um grupo é selecionado, aparece a opção **Também registrar presença**. Ative-a para marcar os visitantes como presentes no momento em que se cadastram, sem que você precise fazer o check-in deles separadamente.

A presença só é registrada quando o cadastro acontece durante um dos horários **agendados** do grupo selecionado:

- O grupo precisa estar vinculado a um ou mais horários de culto, e esses horários precisam ter um [horário de check-in](setup.md#setting-a-check-in-schedule) (um **Dia** e uma **Hora de início**).
- "Durante" significa dentro da janela de check-in daquele horário de culto -- desde os minutos de **Abrir check-in** antes do início até os minutos de **Fechar check-in** depois do término (ou depois do início, se não houver horário de término; sem horário de término e sem minutos de fechamento, até o fim daquele dia), no mesmo fuso horário usado pelo horário de check-in.
- Cada integrante da família é marcado como presente no grupo em todos os seus horários de culto que estiverem abertos naquele momento, na data de hoje.
- Cadastros feitos em outros horários, ou para um grupo cujos horários de culto não têm horário de check-in, são adicionados ao grupo, mas não são contados como presença.

### Foto do Cabeçalho {#header-photo}

Em **Foto do cabeçalho**, clique em **Trocar foto** para escolher ou enviar uma imagem (recortada no formato 16:9) que será exibida no topo da página de cadastro, no lugar do ícone padrão. Clique em **Remover** para voltar ao ícone.

### Compartilhando o Link de Cadastro {#sharing-the-registration-link}

Depois que o Cadastro de Visitantes por QR estiver ativado, uma seção **Compartilhar QR code de cadastro** aparece na parte inferior do cartão. Ela oferece duas formas de levar os visitantes ao formulário de cadastro, além do QR code do quiosque:

- **Copiar link** -- copia a URL do cadastro para que você possa colá-la no site da igreja, em e-mails ou em qualquer lugar da internet.
- **Baixar PNG** -- baixa o QR code como uma imagem que você pode imprimir em panfletos, boletins ou placas de sinalização.

:::tip
Adicione o link de cadastro às páginas "Planeje sua visita" ou "Sou novo" do site da sua igreja para que os visitantes possam se cadastrar antes mesmo de chegar.
:::

### O Que Acontece Depois que um Visitante se Cadastra {#what-happens-after-a-guest-signs-up}

O B1 primeiro procura pessoas que já estão em **Pessoas**. Um integrante da família é associado a uma pessoa existente quando exatamente uma pessoa tem o mesmo primeiro nome e o mesmo e-mail ou telefone. Uma criança informada sem e-mail ou telefone é associada pelo primeiro nome dentro do domicílio que foi associado. As pessoas associadas são reutilizadas como estão -- o cadastro nunca altera os dados nem a situação de membro delas -- e qualquer pessoa nova passa a fazer parte do domicílio associado.

Quando ninguém é associado, o cadastro cria um novo domicílio com o nome do sobrenome do contato principal, com um registro de pessoa para cada integrante da família. Todas as pessoas novas são adicionadas em **Pessoas** com a situação de membro **Visitante**, tendo o contato principal como responsável pelo domicílio.

Tanto as pessoas associadas quanto as novas são adicionadas ao grupo que você escolheu (se ainda não estiverem nele) e têm a presença registrada quando essa opção estiver ativada. Os comentários são salvos como uma anotação no contato principal.

Para fazer um acompanhamento automático, adicione um [gatilho de fluxo de trabalho](../serving/workflows.md#triggers), como **Pessoa · Criada** com a condição *Situação de membro é Visitante*, ou **Grupo · Membro Entrou** para o grupo que você escolheu acima.

## O Que É Registrado {#what-gets-recorded}

Cada check-in cria um registro de presença no B1 Admin. Você pode ver esses registros na página de [Presença](tracking-attendance.md) e nas sessões de cada [grupo](../groups/group-members.md), exatamente como a presença lançada manualmente. Não há diferença na forma como os dados aparecem -- os dois métodos alimentam os mesmos relatórios.
