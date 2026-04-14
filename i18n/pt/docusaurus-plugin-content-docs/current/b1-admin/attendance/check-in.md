---
title: "Check-In"
---

# Check-In

<div class="article-intro">

O B1 Admin suporta auto check-in nos serviços através do aplicativo complementar **B1 Checkin**. Os membros podem se registrar a si mesmos e suas famílias em quiosques ou dispositivos dedicados quando chegam, tornando o processo rápido e reduzindo a carga de trabalho dos seus voluntários. Cada check-in é automaticamente registrado como presença.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Seus campi, horários de serviço e grupos devem estar configurados em [Configuração de Presença](setup.md).
- Você precisa [ter pessoas em seu banco de dados](../people/adding-people.md) com [famílias](../people/adding-people.md#managing-households) configuradas para que as famílias possam se registrar juntas.
- Você precisará de um tablet e opcionalmente uma impressora de etiquetas Brother (veja [recomendações de hardware](#recommended-hardware) abaixo).

</div>

## Como Funciona

O aplicativo B1 Checkin se conecta à sua configuração de presença do B1 Admin. Quando um membro se registra, sua presença é automaticamente registrada para o campus, horário de serviço e grupo corretos. Você não precisa inserir presença manualmente para ninguém que usa o sistema de check-in.

## Configurando o Check-In

1. **Configure sua estrutura de presença primeiro.** No B1 Admin, vá para **Attendance > Setup** e certifique-se de que seus campi, horários de serviço e grupos estão em vigor. O aplicativo de check-in depende dessa configuração. Veja [Configuração de Presença](setup.md) para detalhes.
2. **Instale o aplicativo B1 Checkin** nos dispositivos que você planeja usar. O aplicativo está disponível nas seguintes plataformas:
   - **Tablets Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablets Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Entre no aplicativo B1 Checkin** usando as credenciais da conta de sua igreja.
4. **Selecione o campus e o horário de serviço** para a reunião atual.
5. Os membros agora podem procurar seu nome no dispositivo e se registrar.

:::tip
Coloque os dispositivos de check-in em locais visíveis e de fácil acesso, como entradas do saguão ou mesas de boas-vindas. Um breve aviso durante os serviços ajuda os membros a saber que a opção está disponível.
:::

:::tip
Se sua igreja tem vários campi, você precisará repetir a configuração para cada campus em [Configuração de Presença](setup.md). Cada dispositivo de check-in pode ser configurado para um campus diferente.
:::

## Hardware Recomendado

**Tablets** — qualquer um desses funciona bem com o aplicativo:

- **Compacto:** Samsung Galaxy Tab A7 Lite 8.7"
- **Tela Grande:** Samsung Galaxy Tab A8 10.5"
- **Orçamento:** Amazon Fire HD 10

**Impressoras** — check-ins funcionam com impressoras de etiquetas Brother para imprimir crachás:

- **Melhor:** Brother QL-1110NWB (suporta vários tablets via Bluetooth e WiFi)
- **Bom:** Brother QL-810W (suporta vários tablets via WiFi)
- **Orçamento:** Brother QL-1100 (apenas WiFi)

**Etiquetas:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Apenas impressoras de etiquetas Brother são compatíveis com o aplicativo B1 Checkin. Outras marcas de impressoras não funcionarão para imprimir crachás.
:::

:::info
Siga as instruções de configuração de sua impressora para conectá-la à mesma rede WiFi de seu tablet. Você pode encontrar drivers e guias de configuração do Brother no [site de suporte do Brother](https://support.brother.com).
:::

## Personalizando a Aparência do Quiosque

Você pode personalizar a aparência e o funcionamento do aplicativo B1 Checkin para combinar com a marca de sua igreja. No B1 Admin, vá para **Attendance > Kiosk Theme** para configurar:

### Cores

Personalize oito configurações de cor para combinar com a marca de sua igreja:

- **Primary** e **Primary Contrast** -- Cor da marca principal e sua cor de texto.
- **Secondary** e **Secondary Contrast** -- Cor de destaque e sua cor de texto.
- **Header Background** e **Subheader Background** -- Cores para as áreas de cabeçalho do quiosque.
- **Button Background** e **Button Text** -- Cores para botões interativos.

### Imagem de Fundo

Envie uma imagem de fundo opcional para as telas de boas-vindas e pesquisa do quiosque. O tamanho recomendado é de 1920x1080 pixels.

### Tela Ociosa / Protetor de Tela

Configure um protetor de tela que é ativado após um período de inatividade:

1. Ative ou desative a tela ociosa **ligado** ou **desligado**.
2. Defina o **timeout** (quantos segundos de inatividade antes que o protetor de tela inicie, mínimo 10 segundos).
3. Adicione um ou mais **slides** -- cada slide tem uma imagem e uma duração de exibição (mínimo 3 segundos).

:::tip
Use a tela ociosa para exibir anúncios, eventos próximos ou mensagens de boas-vindas quando o quiosque não está sendo usado ativamente.
:::

## Registro de Hóspedes via Código QR

O quiosque de check-in pode exibir um código QR que os visitantes digitalizam para se registrarem a si mesmos e suas famílias em seu próprio telefone. Isso acelera o processo de check-in para novos visitantes.

Quando um hóspede digitaliza o código QR, ele é levado para uma [página de registro de hóspedes](../../b1-church/checkin/guest-registration) onde entra com seu nome, email e membros da família. Um voluntário pode então procurá-lo no quiosque e registrá-lo.

### Ativando Registro de Hóspedes por Código QR

Para ativar a exibição do código QR:

1. No B1 Admin, vá para **Mobile** na barra lateral esquerda (ícone de telefone).
2. Selecione a aba **Check-In**.
3. Ative **QR Guest Registration**.

:::note
Esta configuração está em **Mobile**, não em Attendance > Kiosk Theme.
:::

## O Que é Registrado

Cada check-in cria um registro de presença no B1 Admin. Você pode visualizar esses registros nas abas [Attendance](tracking-attendance.md) e [Groups](../groups/group-members.md) assim como a presença inserida manualmente. Não há diferença em como os dados aparecem — ambos os métodos alimentam os mesmos relatórios.
