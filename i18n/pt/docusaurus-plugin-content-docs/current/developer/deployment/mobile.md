---
title: "Implantação Móvel"
---

# Implantação Móvel

<div class="article-intro">

As aplicações móveis do ChurchApps são construídas e implantadas usando o **Expo EAS Build** e distribuídas através das lojas de aplicativos. Esta página cobre a construção, envio e publicação de atualizações over-the-air para Android e iOS.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure a aplicação móvel localmente -- veja [B1 Mobile](../mobile/b1-mobile)
- Instale e configure o [EAS CLI](https://docs.expo.dev/eas/)
- Tenha acesso ao Google Play Console (Android) e/ou Apple App Store Connect (iOS)

</div>

## Construção

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Envio para as Lojas de Aplicativos

### Android -- Google Play Store

Após um build EAS bem-sucedido, o binário Android (AAB) é enviado para a Google Play Store através do Play Console.

### iOS -- Apple App Store

Envie o build iOS diretamente via EAS:

```bash
eas submit --platform ios
```

## Atualizações OTA

Para alterações apenas em JavaScript que não requerem revisão da loja de aplicativos, use atualizações over-the-air (OTA):

```bash
npm run update:production
```

Isso usa o EAS Update para enviar alterações diretamente aos usuários sem um envio completo para a loja.

:::tip
As atualizações OTA são significativamente mais rápidas que builds de loja -- as alterações podem chegar aos usuários em minutos em vez de dias. Use-as para correções de bugs, alterações de texto e atualizações menores de UI que não envolvam alterações de código nativo.
:::

## Números de Versão

Antes de criar um build para loja, os números de versão devem ser atualizados em múltiplos arquivos:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Esquecer de atualizar os números de versão em todos os arquivos causará falhas no build ou rejeição pela loja de aplicativos. Verifique cada arquivo listado acima antes de iniciar um build de produção.
:::

## Artigos Relacionados

- **[B1 Mobile](../mobile/b1-mobile)** -- Guia de configuração local e desenvolvimento
- **[Implantação de APIs](./apis)** -- Implantando as APIs do backend
- **[Implantação de Aplicações Web](./web-apps)** -- Implantando as aplicações web frontend
