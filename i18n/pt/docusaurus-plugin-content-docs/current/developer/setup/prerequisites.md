---
title: "Pré-requisitos"
description: "Configure Node.js, npm, Git e as ferramentas de cada plataforma antes de trabalhar localmente nos projetos da ChurchApps, como B1 Admin, Lessons.church, FreePlay ou a API."
---

# Pré-requisitos

<div class="article-intro">

As ferramentas de que você precisa dependem dos projetos em que pretende trabalhar. Esta página lista todos os softwares necessários, organizados por área de desenvolvimento, desde os requisitos universais até as ferramentas específicas de cada plataforma.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Consulte a [Visão geral dos projetos](./project-overview.md) para decidir em quais projetos você quer trabalhar
- Tenha acesso de administrador no seu computador de desenvolvimento para instalar os programas

</div>

## Todos os projetos

Estes itens são necessários independentemente do projeto em que você trabalhar:

| Ferramenta | Versão | Observações |
|------|---------|-------|
| **Node.js** | 20+ | Versão 22+ necessária para o B1App e o LessonsApp (Next.js 16); 24+ necessária para a API |
| **npm** | Incluído com o Node.js | Usado como gerenciador de pacotes em todos os projetos |
| **Git** | Mais recente | Cada projeto é um repositório separado |

:::tip
Use um gerenciador de versões do Node, como o [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) ou o [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows), para alternar facilmente entre as versões do Node.
:::

## Desenvolvimento da API (backend)

Se você pretende executar a API localmente (em vez de apontar para as APIs de demonstração):

| Ferramenta | Versão | Observações |
|------|---------|-------|
| **MySQL** | 8.0+ | Cada módulo da API usa o seu próprio banco de dados |

Você precisará de seis bancos de dados para a API principal: `membership`, `attendance`, `content`, `giving`, `messaging` e `doing`. A API inclui scripts para inicializar o esquema -- consulte o guia [Configuração local da API](../api/local-setup.md).

## Desenvolvimento de aplicativos móveis

Para o B1Checkin, o LessonsScreen ou outros aplicativos React Native / Expo:

| Ferramenta | Versão | Observações |
|------|---------|-------|
| **Expo CLI** | Mais recente | Instale globalmente: `npm install -g expo-cli` |
| **Android Studio** | Mais recente | Necessário para o desenvolvimento Android (inclui o Android SDK) |
| **Xcode** | Mais recente | Necessário para o desenvolvimento iOS (somente macOS) |

:::info
Você pode usar o aplicativo Expo Go em um dispositivo físico para testes rápidos, sem o Android Studio ou o Xcode. No entanto, para gerar binários de produção, são necessárias as ferramentas nativas.
:::

## Desenvolvimento do FreeShow (aplicativo para desktop)

O FreeShow tem dependências nativas adicionais de compilação, porque compila módulos nativos do Node (como o `canvas`):

### Todas as plataformas

| Ferramenta | Versão | Observações |
|------|---------|-------|
| **Python** | 3.12 | Exigido pelo `node-gyp` para compilar módulos nativos |
| **setuptools** | Mais recente | Instale com `pip install setuptools` |

### Windows

| Ferramenta | Observações |
|------|-------|
| **Visual Studio** | A edição Community é suficiente |
| **Carga de trabalho "Desenvolvimento para desktop com C++"** | Selecione durante a instalação do Visual Studio |
| **Windows 10 SDK** | Incluído na carga de trabalho C++; certifique-se de que está marcado |

Você pode instalar as ferramentas de compilação do Visual Studio pela linha de comando:

```bash
npm install --global windows-build-tools
```

Ou instale o Visual Studio Community e selecione a carga de trabalho "Desenvolvimento para desktop com C++" durante a instalação.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

As Ferramentas de Linha de Comando do Xcode normalmente são suficientes:

```bash
xcode-select --install
```

## Verifique sua instalação

Execute estes comandos para confirmar que tudo está instalado:

```bash
node --version    # Deve exibir v20.x.x ou superior
npm --version     # Deve exibir 10.x.x ou superior
git --version     # Deve exibir git version 2.x.x
mysql --version   # Necessário apenas para o desenvolvimento local da API
```

## Próximos passos

- **[Visão geral dos projetos](./project-overview.md)** -- Veja todos os projetos e o que cada um faz
- **[Variáveis de ambiente](./environment-variables.md)** -- Configure seus arquivos `.env`
