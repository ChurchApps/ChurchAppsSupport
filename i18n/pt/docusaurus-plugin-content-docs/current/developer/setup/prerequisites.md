---
title: "Pré-requisitos"
---

# Pré-requisitos

<div class="article-intro">

As ferramentas de que você precisa dependem dos projetos em que pretende trabalhar. Esta página lista todos os softwares necessários, organizados por área de desenvolvimento, desde os requisitos universais até as cadeias de ferramentas específicas de cada plataforma.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Revise a [Visão Geral do Projeto](./project-overview) para determinar em quais projetos você quer trabalhar
- Tenha acesso de administrador na sua máquina de desenvolvimento para instalar softwares

</div>

## Todos os Projetos

Estes são necessários independentemente do projeto em que você trabalhar:

| Ferramenta | Versão | Observações |
|------|------|------|
| **Node.js** | 20+ | Versão 22+ exigida para o B1App e o LessonsApp (Next.js 16) |
| **npm** | Vem com o Node.js | Usado como gerenciador de pacotes em todos os projetos |
| **Git** | Mais recente | Cada projeto é um repositório separado |

:::tip
Use um gerenciador de versões do Node como o [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) ou o [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) para alternar facilmente entre versões do Node.
:::

## Desenvolvimento da API Backend

Se você pretende executar a API localmente (em vez de apontar para as APIs de demonstração):

| Ferramenta | Versão | Observações |
|------|------|------|
| **MySQL** | 8.0+ | Cada módulo da API usa seu próprio banco de dados |

Você precisará de seis bancos de dados para a API principal: `membership`, `attendance`, `content`, `giving`, `messaging` e `doing`. A API inclui scripts para inicializar o schema — consulte o guia de [configuração local da API](../api/local-setup).

## Desenvolvimento de Aplicativos Mobile

Para o B1Mobile, o B1Checkin, o LessonsScreen ou outros apps React Native / Expo:

| Ferramenta | Versão | Observações |
|------|------|------|
| **Expo CLI** | Mais recente | Instale globalmente: `npm install -g expo-cli` |
| **Android Studio** | Mais recente | Necessário para desenvolvimento Android (inclui o Android SDK) |
| **Xcode** | Mais recente | Necessário para desenvolvimento iOS (somente macOS) |

:::info
Você pode usar o app Expo Go em um dispositivo físico para testes rápidos sem o Android Studio ou o Xcode. No entanto, gerar binários de produção exige as cadeias de ferramentas nativas.
:::

## Desktop App do FreeShow (Desenvolvimento)

O FreeShow tem dependências nativas de compilação adicionais, pois compila módulos Node nativos (como o `canvas`):

### Todas as Plataformas

| Ferramenta | Versão | Observações |
|------|------|------|
| **Python** | 3.12 | Exigido pelo `node-gyp` para compilar módulos nativos |
| **setuptools** | Mais recente | Instale via `pip install setuptools` |

### Windows

| Ferramenta | Observações |
|------|------|
| **Visual Studio** | A edição Community é suficiente |
| **Carga de trabalho "Desktop development with C++"** | Selecione durante a instalação do Visual Studio |
| **Windows 10 SDK** | Incluído na carga de trabalho C++; certifique-se de que está marcado |

Você pode instalar as ferramentas de compilação do Visual Studio pela linha de comando:

```bash
npm install --global windows-build-tools
```

Ou instale o Visual Studio Community e selecione a carga de trabalho "Desktop development with C++" durante a instalação.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

As Ferramentas de Linha de Comando do Xcode normalmente bastam:

```bash
xcode-select --install
```

## Verifique sua Instalação

Execute estes comandos para confirmar que tudo está instalado:

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## Próximos Passos

- **[Visão Geral do Projeto](./project-overview)** — Veja todos os projetos e o que cada um faz
- **[Variáveis de Ambiente](./environment-variables)** — Configure seus arquivos `.env`
