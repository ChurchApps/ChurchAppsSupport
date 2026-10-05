---
title: "Check-In"
---

# Check-In

<div class="article-intro">

O B1 Admin oferece suporte para check-in automático em serviços através do aplicativo acompanhante **B1 Checkin**. Os membros podem fazer check-in de si mesmos e suas famílias em quiosques ou dispositivos dedicados quando chegam, tornando o processo rápido e reduzindo o trabalho dos seus voluntários. Cada check-in é registrado automaticamente como presença.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Seus campi, horários de serviço e grupos devem ser configurados em [Configuração de Presença](setup.md).
- Você precisa [adicionar pessoas ao seu banco de dados](../people/adding-people.md) com [núcleos familiares](../people/adding-people.md#managing-households) configurados para que as famílias possam fazer check-in juntas.
- Você precisará de um tablet e, opcionalmente, uma impressora de etiquetas Brother (veja [recomendações de hardware](#recommended-hardware) abaixo).

</div>

## Como Funciona

O aplicativo B1 Checkin se conecta à sua configuração de presença no B1 Admin. Quando um membro faz check-in, sua presença é registrada automaticamente no campus correto, horário de serviço e grupo. Você não precisa registrar a presença manualmente para ninguém que use o sistema de check-in.

## Configurando Check-In

1. **Configure sua estrutura de presença primeiro.** No B1 Admin, vá para **Presença > Configuração** e certifique-se de que seus campi, horários de serviço e grupos estão em vigor. O aplicativo de check-in depende dessa configuração. Veja [Configuração de Presença](setup.md) para mais detalhes.
2. **Instale o aplicativo B1 Checkin** nos dispositivos que você planeja usar. O aplicativo está disponível nas seguintes plataformas:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Faça login no aplicativo B1 Checkin** usando as credenciais da conta da sua igreja.
4. **Selecione o campus e o horário do serviço** para a reunião atual.
5. Os membros agora podem procurar seu nome no dispositivo e fazer check-in.

:::tip
Coloque os dispositivos de check-in em locais visíveis e de fácil acesso, como entradas do saguão ou mesas de boas-vindas. Um breve anúncio durante os serviços ajuda os membros a saber que a opção está disponível.
:::

:::tip
Se sua igreja tem múltiplos campi, você precisará repetir a configuração para cada campus em [Configuração de Presença](setup.md). Cada dispositivo de check-in pode ser configurado para um campus diferente.
:::

## Hardware Recomendado

**Tablets** — qualquer um destes funciona bem com o aplicativo:

- **Compacto:** Samsung Galaxy Tab A7 Lite 8.7"
- **Tela Grande:** Samsung Galaxy Tab A8 10.5"
- **Econômico:** Amazon Fire HD 10

**Impressoras** — check-ins funcionam com impressoras de etiquetas Brother para imprimir crachás de nome:

- **Melhor:** Brother QL-1110NWB (oferece suporte a múltiplos tablets via Bluetooth e WiFi)
- **Bom:** Brother QL-810W (oferece suporte a múltiplos tablets via WiFi)
- **Econômico:** Brother QL-1100 (apenas WiFi)

**Etiquetas:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Apenas impressoras de etiquetas Brother são compatíveis com o aplicativo B1 Checkin. Outras marcas de impressoras não funcionarão para imprimir crachás de nome.
:::

:::info
Siga as instruções de configuração da sua impressora para conectá-la à mesma rede WiFi que seu tablet. Você pode encontrar drivers de impressoras Brother e guias de configuração no [site de suporte da Brother](https://support.brother.com).
:::

## Personalizando a Aparência do Quiosque

Você pode personalizar a aparência e o comportamento do aplicativo B1 Checkin para corresponder à marca da sua igreja. No B1 Admin, vá para **Celular > B1 CheckIn** e use o card **Tema do Quiosque** para configurar:

### Cores

Personalize oito configurações de cor para corresponder à marca da sua igreja:

- **Primária** e **Contraste Primário** -- Cor da marca principal e sua cor de texto.
- **Secundária** e **Contraste Secundário** -- Cor de destaque e sua cor de texto.
- **Fundo do Cabeçalho** e **Fundo do Subcabeçalho** -- Cores para as áreas de cabeçalho do quiosque.
- **Fundo do Botão** e **Texto do Botão** -- Cores para botões interativos.

### Imagem de Fundo

Carregue uma imagem de fundo opcional para as telas de bem-vindo e pesquisa do quiosque. O tamanho recomendado é 1920x1080 pixels.

### Tela Inativa / Proteção de Tela

Configure uma proteção de tela que ativa após um período de inatividade:

1. Ative ou desative a tela inativa **on** ou **off**.
2. Defina o **tempo limite** (quantos segundos de inatividade antes de a proteção de tela iniciar, mínimo 10 segundos).
3. Adicione um ou mais **slides** -- cada slide tem uma imagem e uma duração de exibição (mínimo 3 segundos).

:::tip
Use a tela inativa para exibir anúncios, eventos futuros ou mensagens de boas-vindas quando o quiosque não está sendo usado ativamente.
:::

## Registro de Hóspedes via Código QR

O quiosque de check-in pode exibir um código QR que visitantes escaneiam para se registrarem a si mesmos e suas famílias no próprio telefone. Isso acelera o processo de check-in para hóspedes de primeira viagem.

Quando um hóspede escaneia o código QR, ele é levado a uma [página de registro de hóspedes](../../b1-church/checkin/guest-registration) onde ele insere seu nome, email e membros da família. Um voluntário pode então procurá-lo no quiosque e fazer check-in.

### Habilitando o Registro de Hóspedes por QR

Para ativar a exibição do código QR:

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Celular**.
2. Clique em **B1 CheckIn**.
3. Ative **Registro de Hóspedes por QR** e clique em **Salvar**.

:::note
Esta configuração está em **Celular > B1 CheckIn** (a mesma página que o card **Tema do Quiosque**), não em Presença.
:::

### Compartilhando o Link de Registro

Depois que o Registro de Hóspedes por QR é habilitado, uma seção **Compartilhar código QR de registro** aparece abaixo da alternância. Isso oferece duas maneiras de levar hóspedes ao formulário de registro além do código QR do quiosque:

- **Copiar link** — copia a URL de registro para que você possa colá-la no site da sua igreja, em emails ou em qualquer lugar online.
- **Baixar PNG** — baixa o código QR como uma imagem que você pode imprimir em folhetos, boletins ou sinalização.

:::tip
Adicione o link de registro à página "Planeje Sua Visita" ou "Sou Novo" do site da sua igreja para que os hóspedes possam se registrar antes mesmo de chegarem.
:::

## O que é Registrado

Cada check-in cria um registro de presença no B1 Admin. Você pode visualizar esses registros nas abas [Presença](tracking-attendance.md) e [Grupos](../groups/group-members.md) como qualquer presença registrada manualmente. Não há diferença em como os dados aparecem -- ambos os métodos alimentam os mesmos relatórios.
