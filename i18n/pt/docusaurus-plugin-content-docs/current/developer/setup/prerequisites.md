---
title: "Pré-requisitos"
---

# Pré-requisitos

<div class="article-intro">

As ferramentas que você precisa dependem dos projetos nos quais planeja trabalhar. Esta página lista todo o software necessário organizado por área de desenvolvimento, desde os requisitos universais até toolchains específicas de plataforma.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Revise a [Visão geral dos projetos](./project-overview) para determinar em quais projetos deseja trabalhar
- Tenha acesso de administrador na sua máquina de desenvolvimento para instalar software

</div>

## Todos os projetos

Estes são necessários independentemente do projeto no qual você trabalha:

| Ferramenta | Versão | Notas |
|------|---------|-------|
| **Node.js** | 20+ | Versão 22+ necessária para B1App e LessonsApp (Next.js 16) |
| **npm** | Incluído com Node.js | Usado como gerenciador de pacotes em todos os projetos |
| **Git** | Mais recente | Cada projeto é um repositório separado |

:::tip
Use um gerenciador de versões do Node como [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) ou [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) para alternar facilmente entre versões do Node.
:::

## Desenvolvimento de API backend

Se você planeja executar a API localmente (em vez de apontar para staging):

| Ferramenta | Versão | Notas |
|------|---------|-------|
| **MySQL** | 8.0+ | Cada módulo de API usa seu próprio banco de dados |

Você precisará de seis bancos de dados para a API principal: `membership`, `attendance`, `content`, `giving`, `messaging` e `doing`. A API inclui scripts para inicializar o esquema -- consulte o guia de [Configuração local da API](../api/local-setup).

## Desenvolvimento de aplicativos móveis

Para B1Mobile, B1Checkin, LessonsScreen ou outros aplicativos React Native / Expo:

| Ferramenta | Versão | Notas |
|------|---------|-------|
| **Expo CLI** | Mais recente | Instale globalmente: `npm install -g expo-cli` |
| **Android Studio** | Mais recente | Necessário para desenvolvimento Android (inclui Android SDK) |
| **Xcode** | Mais recente | Necessário para desenvolvimento iOS (apenas macOS) |

:::info
Você pode usar o aplicativo Expo Go em um dispositivo físico para testes rápidos sem Android Studio ou Xcode. No entanto, a criação de binários de produção requer as toolchains nativas.
:::

## Desenvolvimento do FreeShow (aplicativo desktop)

FreeShow tem dependências de build nativas adicionais porque compila módulos Node nativos (como `canvas`):

### Todas as plataformas

| Ferramenta | Versão | Notas |
|------|---------|-------|
| **Python** | 3.12 | Necessário pelo `node-gyp` para compilação de módulos nativos |
| **setuptools** | Mais recente | Instale via `pip install setuptools` |

### Windows

| Ferramenta | Notas |
|------|-------|
| **Visual Studio** | A edição Community é suficiente |
| **Carga de trabalho "Desktop development with C++"** | Selecione durante a instalação do Visual Studio |
| **Windows 10 SDK** | Incluído na carga de trabalho C++; certifique-se de que está marcado |

Você pode instalar as ferramentas de build do Visual Studio via linha de comando:

```bash
npm install --global windows-build-tools
```

Ou instale o Visual Studio Community e selecione a carga de trabalho "Desktop development with C++" durante a instalação.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

As Xcode Command Line Tools geralmente são suficientes:

```bash
xcode-select --install
```

## Verifique sua instalação

Execute estes comandos para confirmar que tudo está instalado:

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## Próximos passos

- **[Visão geral dos projetos](./project-overview)** -- Veja todos os projetos e o que fazem
- **[Variáveis de ambiente](./environment-variables)** -- Configure seus arquivos `.env`
