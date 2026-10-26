---
title: "Bibliotecas compartilhadas"
---

# Bibliotecas compartilhadas

<div class="article-intro">

O código compartilhado da ChurchApps é publicado no npm sob o escopo `@churchapps/*`. Todos os pacotes compartilhados vivem em um único repositório — [Packages](https://github.com/ChurchApps/Packages) — gerenciado como um workspace Yarn (Berry) e versionado com [changesets](https://github.com/changesets/changesets).

</div>

## Pacotes

| Pacote | Descrição | Usado por |
|--------|-----------|-----------|
| [`@churchapps/helpers`](./helpers) | Camada base: funções auxiliares independentes de framework e as interfaces TypeScript compartilhadas que formam o contrato de dados entre os aplicativos | Todos os projetos |
| [`@churchapps/apihelper`](./api-helper) | Utilitários Express do lado do servidor: autenticação, controladores base, acesso ao banco de dados, integrações com AWS e e-mail | Todas as APIs |
| [`@churchapps/apphelper`](./app-helper) | Componentes React compartilhados e módulos de funcionalidades (login, doações, formulários, markdown, site) | Todos os apps web |
| `@churchapps/content-providers` | Abstração sobre provedores de conteúdo de terceiros (Lessons.church, Planning Center, Dropbox e outros) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Kit de ferramentas para criar integrações com o B1.church: verificação de webhooks, cliente REST tipado, auxiliares de OAuth | Desenvolvedores de integrações externas |
| `@churchapps/texting` | Abstração de provedores de SMS (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

A direção das dependências é estritamente descendente: os apps dependem de `apihelper` e `apphelper`, que declaram `@churchapps/helpers` como **dependência de pares (peer dependency)**, para que cada app resolva exatamente uma cópia dele.

## Configuração do workspace

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

O repositório usa Yarn Berry (o campo `packageManager` da raiz é a referência) com um único lockfile. `yarn build` compila todos os pacotes na ordem de dependência; `yarn test` executa os testes de todos os pacotes.

## Publicação com Changesets

Toda mudança em um pacote é entregue com um changeset:

1. Execute `yarn changeset` na raiz do workspace. Escolha o(s) pacote(s) que você alterou, o tipo de incremento (patch = correção, minor = nova exportação ou funcionalidade, major = mudança incompatível) e escreva um resumo de uma linha — ele vira a entrada do CHANGELOG.
2. Faça commit do arquivo `.changeset/*.md` gerado junto com a sua mudança de código. Um hook de pré-commit bloqueia commits que alteram o código-fonte de um pacote sem um changeset em stage.
3. Quando estiver pronto para publicar, execute `yarn publish-all` na raiz. Isso consome os changesets pendentes (incrementando versões, escrevendo CHANGELOGs, sincronizando os intervalos de dependências internas), compila tudo na ordem de dependência e publica os pacotes incrementados no npm. Depois, faça commit e push dos incrementos de versão.

:::warning
Nunca execute um `npm publish` direto dentro de um pacote individual — ele pula a ordem de compilação e a contabilidade de versões que o script de release cuida. Publicar exige uma conta npm com permissão de publicação no escopo `@churchapps`.
:::

## Desenvolvimento local com um app consumidor

Dentro do workspace, os pacotes compilam diretamente contra os seus irmãos — sem necessidade de link. Para testar uma build de pacote não publicada dentro de um app consumidor (B1Admin, B1App, etc.), adicione um portal Yarn temporário no consumidor:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Compile o pacote primeiro (`yarn build` na raiz do workspace) — o consumidor lê a saída compilada `dist/`, não o código-fonte.

:::warning
`yarn link` grava uma resolução de portal no `package.json` do consumidor. Nunca faça commit disso — sempre execute `yarn unlink` e reinstale quando terminar.
:::
