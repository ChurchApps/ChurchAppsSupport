---
title: "Check-In"
---

# Check-In

<div class="article-intro">

B1 Admin permite o auto check-in em serviços através do aplicativo companheiro **B1 Checkin**. Os membros podem se registrar e suas famílias em quiosques ou dispositivos dedicados quando chegam, tornando o processo rápido e reduzindo a carga de trabalho dos seus voluntários. Cada check-in é automaticamente registrado como presença.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Seus campi, horários de serviço e grupos devem ser configurados em [Configuração de Presença](setup.md).
- Você precisa de [pessoas em seu banco de dados](../people/adding-people.md) com [famílias](../people/adding-people.md#managing-households) configuradas para que as famílias possam se registrar juntas.
- Você precisará de um tablet e, opcionalmente, uma impressora de etiquetas Brother (consulte [recomendações de hardware](#recommended-hardware) abaixo).

</div>

## Como Funciona

O aplicativo B1 Checkin se conecta à sua configuração de presença B1 Admin. Quando um membro faz check-in, sua presença é automaticamente registrada contra o campus correto, horário de serviço e grupo. Você não precisa inserir presença manualmente para ninguém que usa o sistema de check-in.

## Configurando Check-In

1. **Configure sua estrutura de presença primeiro.** No B1 Admin, vá para **Presença > Configuração** e certifique-se de que seus campi, horários de serviço e grupos estão no lugar. O aplicativo de check-in depende dessa configuração. Consulte [Configuração de Presença](setup.md) para detalhes.
2. **Instale o aplicativo B1 Checkin** nos dispositivos que você planeja usar. O aplicativo está disponível nas seguintes plataformas:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Entre no aplicativo B1 Checkin** usando as credenciais da conta da sua igreja.
4. **Selecione o campus e o horário de serviço** para o evento atual.
5. Os membros agora podem procurar seu nome no dispositivo e fazer check-in.

:::tip
Coloque dispositivos de check-in em locais visíveis e de fácil acesso, como entradas do saguão ou mesas de boas-vindas. Um breve anúncio durante os serviços ajuda os membros a saber que a opção está disponível.
:::

:::tip
Se sua igreja tem vários campi, você precisará repetir a configuração para cada campus em [Configuração de Presença](setup.md). Cada dispositivo de check-in pode ser configurado para um campus diferente.
:::

## Hardware Recomendado

**Tablets** — qualquer um desses funciona bem com o aplicativo:

- **Compacto:** Samsung Galaxy Tab A7 Lite 8.7"
- **Tela Grande:** Samsung Galaxy Tab A8 10.5"
- **Orçamento:** Amazon Fire HD 10

**Impressoras** — check-ins funcionam com impressoras de etiquetas Brother para imprimir etiquetas de nomes:

- **Melhor:** Brother QL-1110NWB (suporta vários tablets via Bluetooth e WiFi)
- **Bom:** Brother QL-810W (suporta vários tablets via WiFi)
- **Orçamento:** Brother QL-1100 (somente WiFi)

**Etiquetas:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Apenas impressoras de etiquetas Brother são compatíveis com o aplicativo B1 Checkin. Outras marcas de impressoras não funcionarão para imprimir etiquetas de nomes.
:::

:::info
Siga as instruções de configuração da sua impressora para conectá-la à mesma rede WiFi do seu tablet. Você pode encontrar drivers e guias de configuração da Brother no [site de suporte Brother](https://support.brother.com).
:::

## Personalizando a Aparência do Quiosque

Você pode personalizar a aparência do aplicativo B1 Checkin para corresponder à marca da sua igreja. No B1 Admin, vá para **Presença > Tema do Quiosque** para configurar:

### Cores

Personalize oito configurações de cor para corresponder à marca da sua igreja:

- **Principal** e **Contraste Principal** -- Cor de marca principal e sua cor de texto.
- **Secundária** e **Contraste Secundário** -- Cor de sotaque e sua cor de texto.
- **Fundo do Cabeçalho** e **Fundo do Subcabeçalho** -- Cores para as áreas de cabeçalho do quiosque.
- **Fundo do Botão** e **Texto do Botão** -- Cores para botões interativos.

### Imagem de Fundo

Carregue uma imagem de fundo opcional para as telas de boas-vindas e pesquisa do quiosque. O tamanho recomendado é 1920x1080 pixels.

### Tela Ociosa / Proteção de Tela

Configure uma proteção de tela que se ativa após um período de inatividade:

1. Ative ou desative a tela ociosa.
2. Defina o **tempo limite** (quantos segundos de inatividade antes de a proteção de tela iniciar, mínimo 10 segundos).
3. Adicione um ou mais **slides** -- cada slide tem uma imagem e uma duração de exibição (mínimo 3 segundos).

:::tip
Use a tela ociosa para exibir anúncios, eventos futuros ou mensagens de boas-vindas quando o quiosque não está sendo usado ativamente.
:::

## Registro de Convidados via Código QR

O quiosque de check-in pode exibir um código QR que os visitantes esaneiam para se registrarem e suas famílias em seu próprio telefone. Isso acelera o processo de check-in para convidados pela primeira vez.

Quando um convidado escaneia o código QR, ele é levado a uma [página de registro de convidados](../../b1-church/checkin/guest-registration) onde ele insere seu nome, email e membros da família. Um voluntário pode então procurá-lo no quiosque e fazer seu check-in.

### Ativando Registro de Convidados por QR

Para ativar a exibição do código QR:

1. No B1 Admin, abra o **menu de seção** no canto superior esquerdo (o nome da seção com a pequena seta) e escolha **Móvel**.
2. Selecione a aba **B1 CheckIn**.
3. Ative o **Registro de Convidados por QR** e clique em **Salvar**.

:::note
Esta configuração está em **Móvel**, não em Presença > Tema do Quiosque.
:::

### Compartilhando o Link de Registro

Depois que o Registro de Convidados por QR estiver ativado, uma seção **Compartilhar código QR de registro** aparece abaixo do alternar. Isso oferece duas maneiras para os convidados chegarem ao formulário de registro além do código QR do quiosque:

- **Copiar link** — copia a URL de registro para que você possa colá-la em seu site, emails ou qualquer lugar online.
- **Baixar PNG** — baixa o código QR como uma imagem que você pode imprimir em panfletos, boletins ou sinalizações.

:::tip
Adicione o link de registro à página "Planeje Sua Visita" ou "Sou Novo" do seu site para que os convidados possam se registrar antes mesmo de chegar.
:::

## O Que Fica Registrado

Cada check-in cria um registro de presença no B1 Admin. Você pode visualizar esses registros nas abas [Presença](tracking-attendance.md) e [Grupos](../groups/group-members.md) assim como a presença inserida manualmente. Não há diferença em como os dados aparecem — ambos os métodos alimentam os mesmos relatórios.
