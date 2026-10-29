---
title: "Pré-requisitos"
---

# Pré-requisitos

<div class="article-intro">

As ferramentas de que você precisa dependem dos projetos em que pretende trabalhar. Esta página lista todos os softwares necessários, organizados por área de desenvolvimento, desde os requisitos universais até as cadeias de ferramentas específicas de cada plataforma.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Revise a [Visão Geral dos Projetos](./project-overview) para decidir em quais projetos você quer trabalhar
- Tenha acesso de administrador na sua máquina de desenvolvimento para instalar softwares

</div>

## Todos os Projetos

Estes são necessários independentemente do projeto em que você trabalhar:

| Ferramenta | Versão | Observações |
|------------|--------|-------------|
| **Node.js** | 20+ | Versão 22+ necessária para o B1App e o LessonsApp (Next.js 16); 24+ necessária para a Api |
| **npm** | Vem com o Node.js | Usado como gerenciador de pacotes em todos os projetos |
| **Git** | Mais recente | Cada projeto é um repositório separado |

:::tip
Use um gerenciador de versões do Node como o [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) ou o [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) para alternar facilmente entre versões do Node.
:::

## Desenvolvimento da API Backend

Se você pretende executar a API localmente (em vez de apontar para as APIs de demonstração):

| Ferramenta | Versão | Observações |
|------------|--------|-------------|
| **MySQL** | 8.0+ | Cada módulo da API usa o seu próprio banco de dados |

Você vai precisar de seis bancos de dados para a API principal: `membership`, `attendance`, `content`, `giving`, `messaging` e `doing`. A API inclui scripts para inicializar o esquema -- consulte o guia de [configuração local da API](../api/local-setup).

## Desenvolvimento do Aplicativo Mobile

Para o B1Mobile, B1Checkin, LessonsScreen ou outros aplicativos React Native / Expo:

| Ferramenta | Versão | Observações |
|------------|--------|-------------|
| **Expo CLI** | Mais recente | Instale globalmente: `npm install -g expo-cli` |
| **Android Studio** | Mais recente | Necessário para o desenvolvimento Android (inclui o Android SDK) |
| **Xcode** | Mais recente | Necessário para o desenvolvimento iOS (somente macOS) |

:::info
Você pode usar o aplicativo Expo Go em um dispositivo físico para testes rápidos, sem Android Studio ou Xcode. No entanto, compilar binários de produção exige as cadeias de ferramentas nativas.
:::

## Desenvolvimento do FreeShow (Aplicativo Desktop)

O FreeShow tem dependências nativas de build adicionais, porque compila módulos Node nativos (como o `canvas`):

### Todas as Plataformas

| Ferramenta | Versão | Observações |
|------------|--------|-------------|
| **Python** | 3.12 | Exigido pelo `node-gyp` para compilar módulos nativos |
| **setuptools** | Mais recente | Instale com `pip install setuptools` |

### Windows

| Ferramenta | Observações |
|------------|-------------|
| **Visual Studio** | A edição Community é suficiente |
| **Carga de trabalho "Desktop development with C++"** | Selecione durante a instalação do Visual Studio |
| **Windows 10 SDK** | Incluído na carga de trabalho C++; certifique-se de que está marcado |

Você pode instalar as ferramentas de build do Visual Studio pela linha de comando:

```bash
npm install --global windows-build-tools
```

Ou instale o Visual Studio Community e selecione a carga de trabalho "Desktop development with C++" durante a instalação.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

As Xcode Command Line Tools normalmente são suficientes:

```bash
xcode-select --install
```

## Verifique Sua Instalação

Execute estes comandos para confirmar que tudo está instalado:

```bash
node --version    # Deve exibir v20.x.x ou superior
npm --version     # Deve exibir 10.x.x ou superior
git --version     # Deve exibir git version 2.x.x
mysql --version   # Necessário apenas para o desenvolvimento local da API
```

## Próximos Passos

- **[Visão Geral dos Projetos](./project-overview)** -- Veja todos os projetos e o que cada um faz
- **[Variáveis de Ambiente](./environment-variables)** -- Configure seus arquivos `.env`
