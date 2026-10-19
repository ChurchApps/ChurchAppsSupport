---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

O B1 Mobile é o principal app móvel dos ChurchApps voltado para membros, criado com React Native e Expo. Ele permite que os membros da igreja vejam diretórios, acessem doações, consultem a presença, recebam notificações e interajam com a comunidade da igreja.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale o **Node.js** e o **Expo CLI** — consulte [Pré-requisitos](../setup/prerequisites)
- Instale o **Android Studio** (para o emulador Android) ou o **Xcode** (para o simulador iOS)
- Configure o alvo da sua API (demonstração ou local) — consulte [Variáveis de Ambiente](../setup/environment-variables)

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

3. Configure as variáveis de ambiente — copie o arquivo de exemplo e atualize os endpoints da API:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Inicie o servidor de desenvolvimento do Expo:

   ```bash
   npm start
   ```

:::tip
Você pode usar o app **Expo Go** em um dispositivo físico para testes rápidos, sem precisar configurar o Android Studio ou o Xcode.
:::

## Variáveis de Ambiente

| Variável | Descrição |
|----------|-------------|
| `STAGE` | Estágio do ambiente (por exemplo, `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | URL raiz para a entrega de conteúdo |
| `MEMBERSHIP_API` | Endpoint da API Membership |
| `MESSAGING_API` | Endpoint da API Messaging |
| `ATTENDANCE_API` | Endpoint da API Attendance |
| `GIVING_API` | Endpoint da API Giving |
| `DOING_API` | Endpoint da API Doing |
| `CONTENT_API` | Endpoint da API Content |
| `LESSONS_ROOT` | URL raiz para o conteúdo de lições |

## Comandos Principais

| Comando | Descrição |
|---------|-------------|
| `npm start` | Inicia o servidor de desenvolvimento do Expo |
| `npm run android` | Executa no emulador Android |
| `npm run ios` | Executa no simulador iOS |
| `npm run test` | Executa os testes (Jest) |

## Builds de Produção

Antes de criar um build de produção, atualize os números de versão em todos os arquivos a seguir:

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

Para enviar uma atualização over-the-air (sem passar pela análise da loja de apps):

```bash
npm run update:production
```

:::info
As atualizações OTA são ideais para alterações apenas em JavaScript. Se você modificar código nativo ou dependências, será necessário enviar um build completo para a loja.
:::

## Artigos Relacionados

- **[Deploy Mobile](../deployment/mobile)** — Guia completo para criar, enviar e publicar apps móveis
- **[Variáveis de Ambiente](../setup/environment-variables)** — Referência completa da configuração de ambiente mobile
