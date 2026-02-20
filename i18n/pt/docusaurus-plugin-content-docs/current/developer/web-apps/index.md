---
title: "Aplicações Web"
---

# Aplicações Web

<div class="article-intro">

O ChurchApps inclui três aplicações web, cada uma servindo um público e propósito diferentes. Elas compartilham uma base tecnológica comum de React 19, TypeScript e Material-UI 7, mas diferem em suas ferramentas de build e alvos de implantação.

</div>

## Aplicações em Resumo

| App | Propósito | Framework | Porta de Dev |
|-----|-----------|-----------|-------------|
| [**B1Admin**](./b1-admin.md) | Painel de administração da igreja | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Aplicação pública para membros da igreja | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Gerenciamento de conteúdo de lições | Next.js 16 + React 19 | 3501 |

## Stack Tecnológica Compartilhada

Todas as três aplicações web são construídas com:

- **TypeScript** -- Segurança de tipos de ponta a ponta
- **React 19** -- Biblioteca de componentes de UI
- **Material-UI 7** -- Sistema de design e kit de componentes
- **React Query 5** -- Gerenciamento de estado do servidor

## Componentes Compartilhados

As aplicações compartilham componentes de UI e utilitários através da família de pacotes `@churchapps/apphelper*`:

| Pacote | Propósito |
|--------|-----------|
| `@churchapps/apphelper` | Componentes React compartilhados principais |
| `@churchapps/apphelper-login` | Componentes de UI de autenticação |
| `@churchapps/apphelper-donations` | Formulários de doação e ofertas |
| `@churchapps/apphelper-forms` | Componentes de construtor de formulários |
| `@churchapps/apphelper-markdown` | Renderização de markdown |
| `@churchapps/apphelper-website` | Componentes de website/CMS |

:::tip
Para detalhes sobre o desenvolvimento desses pacotes compartilhados localmente, veja a documentação do [AppHelper](../shared-libraries/app-helper).
:::

## Script Postinstall

Cada aplicação web tem um script `postinstall` que copia arquivos de localização e assets CSS do `@churchapps/apphelper` para o projeto. Isso é executado automaticamente após `npm install`.

:::info
Se os componentes aparecerem sem estilo após instalar dependências, o script `postinstall` pode não ter sido executado corretamente. Você pode acioná-lo manualmente com `npm run postinstall`.
:::

## Ferramentas de Build

As aplicações usam duas ferramentas de build diferentes:

- **B1Admin** usa **Vite** -- um bundler rápido e moderno ideal para aplicações de página única
- **B1App** e **LessonsApp** usam **Next.js** -- fornecendo renderização do lado do servidor, roteamento baseado em arquivos e builds de produção otimizados
