---
title: "Aplicativos Móveis"
description: "Visão geral dos aplicativos móveis da ChurchApps desenvolvidos com Expo e React Native, B1 Checkin e LessonsScreen, além das etapas de configuração local do kit de ferramentas Expo que eles compartilham."
---

# Aplicativos Móveis

<div class="article-intro">

Os aplicativos móveis da ChurchApps são desenvolvidos com **React Native** e **Expo**, oferecendo experiências nativas no Android, no iOS e na Android TV. Todos os aplicativos móveis compartilham o mesmo kit de ferramentas baseado em Expo, então, se você consegue criar um, consegue criar todos.

</div>

## Aplicativos

| Aplicativo | Finalidade | Plataforma |
|-----|---------|----------|
| B1 Checkin | Aplicativo de quiosque para estações de check-in | Android, iOS |
| LessonsScreen | Aplicativo para Android TV que exibe lições em salas de aula | Android TV |

:::info
O aplicativo voltado para membros é o B1 App -- a seção `/mobile` do B1App, que os membros instalam como um Aplicativo Web Progressivo. Trata-se de um aplicativo web, não de um projeto Expo; consulte [Aplicativos Web](../web-apps/index.md) para executá-lo localmente.
:::

### B1 Checkin

Um aplicativo de quiosque desenvolvido especificamente para as estações de check-in das igrejas. Ele oferece uma interface simples e fácil de usar por toque, para que os membros façam o check-in de crianças e registrem a presença em cultos e eventos.

### LessonsScreen

Um aplicativo para Android TV que exibe conteúdo de lições em salas de aula. Os professores podem enviar slides de lições, vídeos e atividades para a tela da TV, facilitando a apresentação do material curricular durante as aulas.

## Configuração Local

Todos os aplicativos móveis compartilham o mesmo kit de ferramentas baseado em Expo e seguem padrões de configuração semelhantes. Usando o B1 Checkin como exemplo:

1. Instale o **Node.js**, o Android Studio (para o emulador Android) e o Xcode (para o simulador iOS, somente no macOS) -- consulte [Pré-requisitos](../setup/prerequisites.md).
2. Clone o repositório e instale as dependências (o B1 Checkin usa o Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Copie `dotenv.sample.txt` para `.env` e defina o ambiente ao qual o aplicativo deve se conectar (`dev` para uma API local) -- consulte [Variáveis de Ambiente](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Inicie o servidor de desenvolvimento do Expo com `yarn start` e, em seguida, execute `yarn android` ou `yarn ios` para abrir o aplicativo em um emulador ou dispositivo.

Consulte [Implantação de Aplicativos Móveis](../deployment/mobile.md) para builds de lançamento e atualizações over-the-air.
