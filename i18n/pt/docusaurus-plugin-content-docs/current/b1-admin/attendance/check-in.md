---
title: "Check-in"
---

# Check-in

<div class="article-intro">

O B1 Admin oferece check-in de autoatendimento nos cultos por meio do aplicativo complementar **B1 Checkin**. Os membros podem fazer o check-in de si mesmos e de suas famílias em quiosques ou dispositivos dedicados ao chegar, o que torna o processo rápido e reduz a carga de trabalho dos seus voluntários. Cada check-in é registrado automaticamente como presença.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Seus campi, horários de culto e grupos precisam estar configurados em [Configuração de Presença](setup.md).
- Você precisa de [pessoas cadastradas no seu banco de dados](../people/adding-people.md) com [famílias](../people/adding-people.md#managing-households) configuradas para que as famílias possam fazer check-in juntas.
- Você vai precisar de um tablet e, opcionalmente, de uma impressora de etiquetas Brother (veja as [recomendações de hardware](#recommended-hardware) abaixo).

</div>

## Como funciona

O aplicativo B1 Checkin se conecta à sua configuração de presença no B1 Admin. Quando um membro faz o check-in, a presença dele é registrada automaticamente no campus, horário de culto e grupo corretos. Você não precisa lançar presenças manualmente para quem usa o sistema de check-in.

## Configurando o check-in

1. **Configure primeiro a estrutura de presença.** No B1 Admin, acesse **Pessoas > Presença** e clique em **Configuração** para garantir que seus campi, horários de culto e grupos estejam definidos. O aplicativo de check-in depende dessa configuração. Opcionalmente, dê a cada horário de culto um [cronograma de check-in](setup.md#setting-a-check-in-schedule) para que o check-in abra e feche automaticamente a cada semana. Os cronogramas usam o fuso horário da sua igreja ou, se a igreja não tiver um definido, o fuso horário do seu campus; o quiosque oculta os horários de culto cuja janela está fechada e informa às famílias quando o check-in ainda não está aberto. Veja [Configuração de Presença](setup.md) para mais detalhes.
2. **Instale o aplicativo B1 Checkin** nos dispositivos que você pretende usar. O aplicativo está disponível nas seguintes plataformas:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablets Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablets Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Entre no aplicativo B1 Checkin** usando as credenciais da conta da sua igreja.
4. **Selecione o campus e o horário de culto** do encontro atual.
5. Os membros já podem buscar o próprio nome no dispositivo e fazer o check-in.

:::tip
Coloque os dispositivos de check-in em locais visíveis e de fácil acesso, como entradas do saguão ou balcões de recepção. Um breve anúncio durante os cultos ajuda os membros a saber que essa opção está disponível.
:::

:::tip
Se a sua igreja tiver vários campi, você precisará repetir a configuração para cada campus em [Configuração de Presença](setup.md). Cada dispositivo de check-in pode ser configurado para um campus diferente.
:::

## Hardware recomendado {#recommended-hardware}

**Tablets** — qualquer um destes funciona bem com o aplicativo:

- **Compacto:** Samsung Galaxy Tab A7 Lite 8,7"
- **Tela grande:** Samsung Galaxy Tab A8 10,5"
- **Econômico:** Amazon Fire HD 10

**Impressoras** — o check-in funciona com impressoras de etiquetas Brother para imprimir crachás:

- **Melhor opção:** Brother QL-1110NWB (suporta vários tablets via Bluetooth e Wi-Fi)
- **Boa opção:** Brother QL-810W (suporta vários tablets via Wi-Fi)
- **Econômica:** Brother QL-1100 (somente Wi-Fi)

**Etiquetas:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Somente impressoras de etiquetas Brother são compatíveis com o aplicativo B1 Checkin. Outras marcas de impressora não funcionarão para imprimir crachás.
:::

:::info
Siga as instruções de configuração da sua impressora para conectá-la à mesma rede Wi-Fi do seu tablet. Você pode encontrar os drivers e os guias de configuração das impressoras Brother no [site de suporte da Brother](https://support.brother.com).
:::

## Personalizando a aparência do quiosque

Você pode personalizar a aparência do aplicativo B1 Checkin para combinar com a identidade visual da sua igreja. No B1 Admin, acesse **Mobile > B1 CheckIn** e use o cartão **Tema do Quiosque** para configurar:

### Cores

Personalize oito configurações de cor para combinar com a identidade da sua igreja:

- **Primária** e **Contraste da primária** -- Cor principal da marca e a cor do seu texto.
- **Secundária** e **Contraste da secundária** -- Cor de destaque e a cor do seu texto.
- **Fundo do cabeçalho** e **Fundo do subcabeçalho** -- Cores das áreas de cabeçalho do quiosque.
- **Fundo dos botões** e **Texto dos botões** -- Cores dos botões interativos.

### Imagem de fundo

Envie uma imagem de fundo opcional para as telas de boas-vindas e de busca do quiosque. O tamanho recomendado é 1920x1080 pixels.

### Tela de espera / Protetor de tela

Configure um protetor de tela que é ativado após um período de inatividade:

1. Ative ou desative a tela de espera.
2. Defina o **tempo limite** (quantos segundos de inatividade antes que o protetor de tela comece; mínimo de 10 segundos).
3. Adicione um ou mais **slides** -- cada slide tem uma imagem e uma duração de exibição (mínimo de 3 segundos).

:::tip
Use a tela de espera para exibir avisos, eventos próximos ou mensagens de boas-vindas quando o quiosque não estiver em uso.
:::

## Cadastro de visitantes por QR Code

O quiosque de check-in pode exibir um QR Code que os visitantes escaneiam para se cadastrar, junto com sua família, pelo próprio celular. Isso agiliza o check-in de visitantes que vêm pela primeira vez.

Quando um visitante escaneia o QR Code, ele é levado a uma [página de cadastro de visitantes](../../b1-church/checkin/guest-registration), onde informa seu nome, e-mail e familiares. Um voluntário pode então localizá-lo no quiosque e fazer o check-in.

### Ativando o QR Code de cadastro

Para ativar a exibição do QR Code:

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Mobile**.
2. Clique em **B1 CheckIn**.
3. Ative **Cadastro de visitantes por QR Code** e clique em **Salvar**.

:::note
Esta configuração fica em **Mobile > B1 CheckIn** (na mesma página do cartão **Tema do Quiosque**), e não em Presença. A ação **Quiosque** na página de Presença tem um link para esta página.
:::

### Compartilhando o link de cadastro

Depois que o Cadastro de visitantes por QR Code estiver ativado, uma seção **Compartilhar QR code de cadastro** aparece abaixo do botão. Ela oferece duas formas de levar os visitantes ao formulário de cadastro, além do QR Code do quiosque:

- **Copiar link** — copia a URL de cadastro para que você possa colá-la no site da sua igreja, em e-mails ou em qualquer lugar online.
- **Baixar PNG** — baixa o QR Code como imagem, que você pode imprimir em panfletos, boletins ou sinalização.

:::tip
Adicione o link de cadastro à página "Planeje sua visita" ou "Sou novo" do site da sua igreja, para que os visitantes possam se cadastrar antes mesmo de chegar.
:::

## O que é registrado

Cada check-in cria um registro de presença no B1 Admin. Você pode ver esses registros na página de [Presença](tracking-attendance.md) e nas [sessões de cada grupo](../groups/group-members.md), exatamente como as presenças lançadas manualmente. Não há diferença na forma como os dados aparecem — os dois métodos alimentam os mesmos relatórios.
