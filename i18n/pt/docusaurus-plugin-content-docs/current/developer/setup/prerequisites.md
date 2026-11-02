---
title: "Pré-requisitos"
---

# Pré-requisitos

<div class="article-intro">

As ferramentas de que você precisa dependem dos projetos em que pretende trabalhar. Esta página lista todo o software necessário, organizado por área de desenvolvimento, desde os requisitos universais até as cadeias de ferramentas específicas de cada plataforma.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Revise a [Visão geral do projeto](./project-overview) para decidir em quais projetos você quer trabalhar
- Tenha acesso de administrador no seu computador de desenvolvimento para instalar software

</div>

## Todos os projetos

Estes são obrigatórios, independentemente do projeto em que você trabalhar:

| Ferramenta | Versão | Observações |
|------------|--------|-------------|
| **Node.js** | 20+ | Versão 22+ exigida para o B1App e o LessonsApp (Next.js 16); 24+ exigida para a Api |
| **npm** | Vem com o Node.js | Usado como gerenciador de pacotes em todos os projetos |
| **Git** | Mais recente | Cada projeto é um repositório separado |

:::tip
Use um gerenciador de versões do Node, como o [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) ou o [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows), para trocar de versão do Node com facilidade.
:::

## Desenvolvimento da API backend

Se você pretende executar a API localmente (em vez de apontar para as APIs de demonstração):

| Ferramenta | Versão | Observações |
|------------|--------|-------------|
| **MySQL** | 8.0+ | Cada módulo da API usa o seu próprio banco de dados |

Você vai precisar de seis bancos de dados para a API principal: `membership`, `attendance`, `content`, `giving`, `messaging` e `doing`. A API inclui scripts para inicializar o esquema — veja o guia de [configuração local da API](../api/local-setup).

## Desenvolvimento de aplicativos móveis

Para o B1Mobile, o B1Checkin, o LessonsScreen ou outros aplicativos React Native / Expo:

| Ferramenta | Versão | Observações |
|------------|--------|-------------|
| **Expo CLI** | Mais recente | Instale globalmente: `npm install -g expo-cli` |
| **Android Studio** | Mais recente | Necessário para o desenvolvimento Android (inclui o SDK Android) |
| **Xcode** | Mais recente | Necessário para o desenvolvimento iOS (somente macOS) |

:::info
Você pode usar o aplicativo Expo Go em um dispositivo físico para testes rápidos, sem o Android Studio ou o Xcode. No entanto, gerar binários de produção exige as cadeias de ferramentas nativas.
:::

## Desenvolvimento do FreeShow (aplicativo de desktop)

O FreeShow tem dependências nativas adicionais de build, porque compila módulos nativos do Node (como o `canvas`):

### Todas as plataformas

| Ferramenta | Versão | Observações |
|------------|--------|-------------|
| **Python** | 3.12 | Exigido pelo `node-gyp` para compilar os módulos nativos |
| **setuptools** | Mais recente | Instale com `pip install setuptools` |

### Windows

| Ferramenta | Observações |
|------------|-------------|
| **Visual Studio** | A edição Community é suficiente |
| **Carga de trabalho "Desenvolvimento para desktop com C++"** | Selecione durante a instalação do Visual Studio |
| **Windows 10 SDK** | Incluído na carga de trabalho C++; certifique-se de que esteja marcado |

Você pode instalar as ferramentas de build do Visual Studio pela linha de comando:

```bash
npm install --global windows-build-tools
```

Ou instale o Visual Studio Community e selecione a carga de trabalho "Desenvolvimento para desktop com C++" durante a instalação.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Normalmente, as Ferramentas de Linha de Comando do Xcode são suficientes:

```bash
xcode-select --install
```

## Verifique a sua instalação

Execute estes comandos para confirmar que tudo está instalado:

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## Próximos passos

- **[Visão geral do projeto](./project-overview)** -- Veja todos os projetos e o que cada um faz
- **[Variáveis de ambiente](./environment-variables)** -- Configure os seus arquivos `.env`
