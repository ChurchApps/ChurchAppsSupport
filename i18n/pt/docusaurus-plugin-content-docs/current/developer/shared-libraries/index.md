---
title: "Bibliotecas Compartilhadas"
---

# Bibliotecas Compartilhadas

<div class="article-intro">

O código compartilhado de ChurchApps é publicado no npm sob o escopo `@churchapps/*`. Todos os pacotes compartilhados vivem em um único repositório -- [Packages](https://github.com/ChurchApps/Packages) -- gerenciado como um espaço de trabalho Yarn (Berry) e versionado com [changesets](https://github.com/changesets/changesets).

</div>

## Pacotes

| Pacote | Descrição | Usado Por |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Camada de fundação: funções auxiliares independentes de framework e as interfaces TypeScript compartilhadas que formam o contrato de dados entre aplicativos | Todos os projetos |
| [`@churchapps/apihelper`](./api-helper) | Utilitários Express no lado do servidor: autenticação, controladores base, acesso ao banco de dados, integrações AWS e email | Todas as APIs |
| [`@churchapps/apphelper`](./app-helper) | Componentes React compartilhados e módulos de recursos (login, doações, formulários, markdown, website) | Todos os aplicativos web |
| `@churchapps/content-providers` | Abstração sobre provedores de conteúdo de terceiros (Lessons.church, Planning Center, Dropbox e outros) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Toolkit para construir integrações B1.church: verificação de webhook, cliente REST tipado, auxiliares OAuth | Desenvolvedores de integração externa |
| `@churchapps/texting` | Abstração de provedor de SMS (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions) | Api |

A direção de dependência é estritamente para baixo: os aplicativos dependem de `apihelper` e `apphelper`, que declaram `@churchapps/helpers` como uma **peer dependency** para que cada aplicativo resolva exatamente uma cópia dela.

## Configuração do Espaço de Trabalho

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

O repositório usa Yarn Berry (o campo `packageManager` da raiz é autoritário) com um único lockfile. `yarn build` compila cada pacote em ordem de dependência; `yarn test` executa todos os testes do pacote.

## Lançamento com Changesets

Cada mudança em um pacote é enviada com um changeset:

1. Execute `yarn changeset` na raiz do espaço de trabalho. Escolha o(s) pacote(s) que você tocou, o tipo de bump (patch = correção, minor = nova exportação ou recurso, major = breaking) e escreva um resumo de uma linha -- torna-se a entrada CHANGELOG.
2. Commit o arquivo `.changeset/*.md` gerado junto com sua mudança de código. Um hook de pre-commit bloqueia commits que alteram o source de um pacote sem um changeset encenado.
3. Quando pronto para publicar, execute `yarn publish-all` na raiz. Isto consome changesets pendentes (aumentando versões, escrevendo CHANGELOGs, sincronizando intervalos de dependência interna), compila tudo em ordem de dependência e publica os pacotes aumentados no npm. Depois commit e push os aumentos de versão.

:::warning
Nunca execute um `npm publish` bruto dentro de um único pacote -- isso pula a ordem de construção e a contabilidade de versão que o script de lançamento manipula. A publicação requer uma conta npm com direitos de publicação no escopo `@churchapps`.
:::

## Desenvolvimento Local Contra um Aplicativo Consumidor

Dentro do espaço de trabalho, os pacotes compilam diretamente contra seus irmãos -- nenhuma ligação necessária. Para testar uma construção de pacote não publicado dentro de um aplicativo consumidor (B1Admin, B1App, etc.), adicione um portal Yarn temporário no consumidor:

```bash
# no projeto consumidor
yarn link ../Packages/helpers
# ... teste ...
yarn unlink ../Packages/helpers && yarn install
```

Compile o pacote primeiro (`yarn build` na raiz do espaço de trabalho) -- o consumidor lê a saída compilada `dist/`, não a source.

:::warning
`yarn link` escreve uma resolução de portal no `package.json` do consumidor. Nunca o faça commit -- sempre `yarn unlink` e reinstale quando terminar.
:::
