---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

O B1 Mobile é o principal aplicativo móvel voltado para membros do ChurchApps, construído com React Native e Expo. Ele permite que membros da igreja visualizem diretórios, acessem doações, verifiquem presença, recebam notificações e interajam com sua comunidade eclesial.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale **Node.js** e **Expo CLI** -- veja [Pré-requisitos](../setup/prerequisites)
- Instale **Android Studio** (para emulador Android) ou **Xcode** (para simulador iOS)
- Configure seu alvo de API (staging ou local) -- veja [Variáveis de Ambiente](../setup/environment-variables)

</div>

## Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Instale as dependências:

   ```bash
   cd B1Mobile && npm install
   ```

3. Configure as variáveis de ambiente -- copie o arquivo de exemplo e atualize os endpoints da API:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Inicie o servidor de desenvolvimento Expo:

   ```bash
   npm start
   ```

:::tip
Você pode usar o app **Expo Go** em um dispositivo físico para testes rápidos sem configurar o Android Studio ou Xcode.
:::

## Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `STAGE` | Estágio do ambiente (ex: `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | URL raiz para entrega de conteúdo |
| `MEMBERSHIP_API` | Endpoint da API de Membros |
| `MESSAGING_API` | Endpoint da API de Mensagens |
| `ATTENDANCE_API` | Endpoint da API de Presença |
| `GIVING_API` | Endpoint da API de Doações |
| `DOING_API` | Endpoint da API de Tarefas |
| `CONTENT_API` | Endpoint da API de Conteúdo |
| `LESSONS_ROOT` | URL raiz para conteúdo de lições |

## Comandos Principais

| Comando | Descrição |
|---------|-----------|
| `npm start` | Iniciar servidor de desenvolvimento Expo |
| `npm run android` | Executar no emulador Android |
| `npm run ios` | Executar no simulador iOS |
| `npm run test` | Executar testes (Jest) |

## Builds de Produção

Antes de criar um build de produção, atualize os números de versão em todos os seguintes arquivos:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Isso usa o EAS Build para criar o binário Android.

### iOS

```bash
eas build --platform ios --profile production
```

### Atualizações OTA

Para enviar uma atualização over-the-air (sem passar pela revisão da loja de aplicativos):

```bash
npm run update:production
```

:::info
As atualizações OTA são ideais para alterações apenas em JavaScript. Se você modificar código nativo ou dependências, deve enviar um build completo para a loja.
:::

## Artigos Relacionados

- **[Implantação Móvel](../deployment/mobile)** -- Guia completo para construir, enviar e implantar aplicações móveis
- **[Variáveis de Ambiente](../setup/environment-variables)** -- Referência completa para configuração de ambiente móvel
