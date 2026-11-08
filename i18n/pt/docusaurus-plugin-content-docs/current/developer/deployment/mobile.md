---
title: "Implantação móvel"
description: "Guia para criar versões Android e iOS de aplicativos Expo, como o B1 Checkin, enviá-las às lojas de aplicativos e publicar atualizações OTA com o EAS."
---

# Implantação móvel

<div class="article-intro">

Os aplicativos móveis Expo da ChurchApps, como o B1 Checkin, são criados com o **Expo EAS Build** ou com um build local usando Gradle, e distribuídos pelas lojas de aplicativos. Esta página aborda a criação, o envio e a publicação de atualizações over-the-air (OTA) para Android e iOS, usando o B1 Checkin como exemplo.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Configure o aplicativo localmente -- consulte [Aplicativos móveis](../mobile/index.md#local-setup)
- Instale e configure a [EAS CLI](https://docs.expo.dev/eas/)
- Tenha acesso ao Google Play Console (Android) e/ou ao Apple App Store Connect (iOS)

</div>

## Criação

### Android

As versões de lançamento para Android são criadas localmente e assinadas com o keystore de lançamento do EAS. Baixe-o uma vez com `npx eas-cli credentials -p android` (escolha **credentials.json: Download credentials from EAS**) e, em seguida, execute:

```bash
yarn build:android
```

O pacote do Google Play é gerado em `android/app/build/outputs/bundle/release/app-release.aab`. Para criar o build no EAS, execute `yarn build:android:eas`.

### iOS

As versões para iOS são sempre criadas no EAS:

```bash
yarn build:ios
```

## Envio às lojas de aplicativos

### Android -- Google Play Store

Envie o AAB pelo Play Console ou envie-o com o EAS:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

Envie a versão para iOS diretamente pelo EAS:

```bash
eas submit --platform ios
```

## Atualizações OTA

Para alterações apenas em JavaScript que não exigem análise pela loja de aplicativos, use atualizações over-the-air (OTA):

```bash
yarn update
```

Isso usa o EAS Update para enviar as alterações diretamente aos usuários, sem a necessidade de um envio completo à loja.

:::tip
As atualizações OTA são significativamente mais rápidas que os builds para as lojas -- as alterações podem chegar aos usuários em minutos, e não em dias. Use-as para correções de bugs, alterações de texto e pequenos ajustes de interface que não envolvam alterações de código nativo.
:::

## Números de versão

Antes de criar um build para a loja, os números de versão precisam ser atualizados em vários arquivos:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` e `versionCode`)

O número do build para iOS é incrementado automaticamente pelo EAS.

:::warning
Esquecer de atualizar os números de versão em todos os arquivos causará falhas no build ou a rejeição pela loja de aplicativos. Revise cada arquivo listado acima antes de iniciar um build de produção.
:::

## Artigos relacionados

- **[Aplicativos móveis](../mobile/index.md)** -- Guia de configuração local e desenvolvimento
- **[Implantação de APIs](./apis.md)** -- Implantação das APIs do backend
- **[Implantação de aplicativos web](./web-apps.md)** -- Implantação dos aplicativos web de frontend
