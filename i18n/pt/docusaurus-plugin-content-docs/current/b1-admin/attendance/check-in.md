---
title: "Check-In"
---

# Check-In

<div class="article-intro">

O B1 Admin suporta check-in autônomo nos cultos por meio do aplicativo complementar **B1 Checkin**. Os membros podem fazer o check-in de si mesmos e de suas famílias em quiosques ou dispositivos dedicados ao chegarem, tornando o processo rápido e reduzindo a carga de trabalho dos seus voluntários. Cada check-in é automaticamente registrado como presença.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Seus campi, horários de culto e grupos devem estar configurados em [Configuração de Presença](setup.md).
- Você precisa de [pessoas no seu banco de dados](../people/adding-people.md) com [famílias](../people/adding-people.md#managing-households) configuradas para que as famílias possam fazer check-in juntas.
- Você precisará de um tablet e, opcionalmente, de uma impressora de etiquetas Brother (veja as [recomendações de hardware](#recommended-hardware) abaixo).

</div>

## Como Funciona

O aplicativo B1 Checkin se conecta à sua configuração de presença do B1 Admin. Quando um membro faz check-in, a presença é automaticamente registrada no campus, horário de culto e grupo corretos. Você não precisa inserir a presença manualmente para ninguém que use o sistema de check-in.

## Configurando o Check-In

1. **Configure sua estrutura de presença primeiro.** No B1 Admin, vá em **Presença > Configuração** e certifique-se de que seus campi, horários de culto e grupos estejam definidos. O aplicativo de check-in depende dessa configuração. Consulte [Configuração de Presença](setup.md) para detalhes.
2. **Instale o aplicativo B1 Checkin** nos dispositivos que pretende usar. O aplicativo está disponível nas seguintes plataformas:
   - **Tablets Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablets Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Faça login no aplicativo B1 Checkin** usando as credenciais da conta da sua igreja.
4. **Selecione o campus e o horário do culto** para a reunião atual.
5. Os membros agora podem pesquisar seu nome no dispositivo e fazer check-in.

:::tip
Coloque os dispositivos de check-in em locais visíveis e de fácil acesso, como entradas do lobby ou mesas de recepção. Um breve anúncio durante os cultos ajuda os membros a saberem que essa opção está disponível.
:::

:::tip
Se sua igreja tem vários campi, você precisará repetir a configuração para cada campus em [Configuração de Presença](setup.md). Cada dispositivo de check-in pode ser configurado para um campus diferente.
:::

## Hardware Recomendado

**Tablets** — qualquer um destes funciona bem com o aplicativo:

- **Compacto:** Samsung Galaxy Tab A7 Lite 8.7"
- **Tela Grande:** Samsung Galaxy Tab A8 10.5"
- **Econômico:** Amazon Fire HD 10

**Impressoras** — os check-ins funcionam com impressoras de etiquetas Brother para impressão de crachás:

- **Melhor:** Brother QL-1110NWB (suporta vários tablets via Bluetooth e WiFi)
- **Bom:** Brother QL-810W (suporta vários tablets via WiFi)
- **Econômico:** Brother QL-1100 (apenas WiFi)

**Etiquetas:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Apenas impressoras de etiquetas Brother são compatíveis com o aplicativo B1 Checkin. Outras marcas de impressoras não funcionarão para a impressão de crachás.
:::

:::info
Siga as instruções de configuração da sua impressora para conectá-la à mesma rede WiFi do seu tablet. Você pode encontrar drivers e guias de configuração de impressoras Brother no [site de suporte da Brother](https://support.brother.com).
:::

## Personalizando a Aparência do Quiosque

Você pode personalizar a aparência do aplicativo B1 Checkin para combinar com a identidade visual da sua igreja. No B1 Admin, vá em **Presença > Tema do Quiosque** para configurar:

### Cores

Personalize oito configurações de cores para combinar com a identidade visual da sua igreja:

- **Primária** e **Contraste Primário** -- Cor principal da marca e sua cor de texto.
- **Secundária** e **Contraste Secundário** -- Cor de destaque e sua cor de texto.
- **Fundo do Cabeçalho** e **Fundo do Subcabeçalho** -- Cores para as áreas de cabeçalho do quiosque.
- **Fundo do Botão** e **Texto do Botão** -- Cores para os botões interativos.

### Imagem de Fundo

Faça upload de uma imagem de fundo opcional para as telas de boas-vindas e busca do quiosque. O tamanho recomendado é 1920x1080 pixels.

### Tela de Espera / Proteção de Tela

Configure uma proteção de tela que é ativada após um período de inatividade:

1. Ative ou desative a tela de espera.
2. Defina o **tempo limite** (quantos segundos de inatividade antes da proteção de tela iniciar, mínimo de 10 segundos).
3. Adicione um ou mais **slides** -- cada slide tem uma imagem e uma duração de exibição (mínimo de 3 segundos).

:::tip
Use a tela de espera para exibir anúncios, próximos eventos ou mensagens de boas-vindas quando o quiosque não estiver sendo usado ativamente.
:::

## Registro de Visitantes via QR Code

O quiosque de check-in pode exibir um QR code que os visitantes escaneiam para se registrarem e registrar suas famílias em seus próprios celulares. Isso agiliza o processo de check-in para visitantes de primeira vez.

Quando um visitante escaneia o QR code, ele é direcionado a uma [página de registro de visitantes](../../b1-church/checkin/guest-registration) onde insere seu nome, e-mail e membros da família. Um voluntário pode então procurá-lo no quiosque e fazer o check-in.

### Ativando o Registro de Visitantes por QR Code

Para ativar a exibição do QR code:

1. No B1 Admin, vá em **Celular** na barra lateral esquerda (ícone de telefone).
2. Selecione a aba **Check-In**.
3. Ative o **Registro de Visitantes por QR**.

:::note
Esta configuração está em **Celular**, não em Presença > Tema do Quiosque.
:::

## O Que É Registrado

Cada check-in cria um registro de presença no B1 Admin. Você pode visualizar esses registros nas abas de [Presença](tracking-attendance.md) e [Grupos](../groups/group-members.md) da mesma forma que a presença inserida manualmente. Não há diferença na forma como os dados aparecem — ambos os métodos alimentam os mesmos relatórios.
