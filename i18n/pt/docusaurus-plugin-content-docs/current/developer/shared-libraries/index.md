---
title: "Bibliotecas Compartilhadas"
---

# Bibliotecas Compartilhadas

<div class="article-intro">

O código compartilhado do ChurchApps é publicado no npm sob o escopo `@churchapps/*`. Todos os pacotes compartilhados vivem em um único repositório -- [Packages](https://github.com/ChurchApps/Packages) -- gerenciado como um workspace Yarn (Berry) e versionado com [changesets](https://github.com/changesets/changesets).

</div>

## Pacotes

| Pacote | Descrição | Usado Por |
|--------|-----------|-----------|
| [`@churchapps/helpers`](./helpers) | Camada de fundação: funções helper sem framework e as interfaces TypeScript compartilhadas que formam o contrato de dados entre aplicações | Todos os projetos |
| [`@churchapps/apihelper`](./api-helper) | Utilitários Express do lado do servidor: auth, controllers base, acesso a banco de dados, integrações AWS e email | Todas as APIs |
| [`@churchapps/apphelper`](./app-helper) | Componentes React compartilhados e módulos de funcionalidade (login, doações, formulários, markdown, website) | Todas as aplicações web |
| `@churchapps/content-providers` | Abstração sobre provedores de conteúdo de terceiros (Lessons.church, Planning Center, Dropbox e outros) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Kit de ferramentas para construir integrações B1.church: verificação de webhook, cliente REST tipado, helpers OAuth | Desenvolvedores de integração externa |
| `@churchapps/texting` | Abstração de provedor SMS (Text In Church, Clearstream, Mutual Ministry) | Api |

A direção de dependência é estritamente para baixo: aplicações dependem de `apihelper` e `apphelper`, que declaram `@churchapps/helpers` como uma **dependência de pares** para que cada aplicação resolva exatamente uma cópia disso.

## Configuração do Workspace

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

O repo usa Yarn Berry (o campo `packageManager` raiz é autoritário) com um único lockfile. `yarn build` constrói cada pacote em ordem de dependência; `yarn test` executa todos os testes de pacote.

## Publicando com Changesets

Cada mudança em um pacote acompanha um changeset:

1. Execute `yarn changeset` na raiz do workspace. Escolha o(s) pacote(s) que você tocou, o tipo de bump (patch = fix, minor = nova exportação ou funcionalidade, major = quebra), e escreva um resumo de uma linha -- ele se torna a entrada CHANGELOG.
2. Faça commit do arquivo `.changeset/*.md` gerado junto com sua mudança de código. Um hook de pre-commit bloqueia commits que alteram a fonte de um pacote sem um changeset em stage.
3. Quando pronto para publicar, execute `yarn publish-all` na raiz. Isto consome changesets pendentes (fazendo bump de versões, escrevendo CHANGELOGs, sincronizando intervalos de dependência interna), constrói tudo em ordem de dependência e publica os pacotes com bump no npm. Depois faça commit e push dos bumps de versão.

:::warning
Nunca execute um raw `npm publish` dentro de um único pacote -- ele pula a ordem de construção e a contabilidade de versão que o script de lançamento manipula. Publicar requer uma conta npm com direitos de publicação para o escopo `@churchapps`.
:::

## Desenvolvimento Local Contra uma Aplicação Consumidora

Dentro do workspace, pacotes constroem diretamente contra seus irmãos -- nenhuma vinculação necessária. Para testar uma construção de pacote não publicado dentro de uma aplicação consumidora (B1Admin, B1App, etc.), adicione um portal Yarn temporário no consumidor:

```bash
# no projeto consumidor
yarn link ../Packages/helpers
# ... teste ...
yarn unlink ../Packages/helpers && yarn install
```

Construa o pacote primeiro (`yarn build` na raiz do workspace) -- o consumidor lê a saída `dist/` compilada, não a fonte.

:::warning
`yarn link` escreve uma resolução de portal no `package.json` do consumidor. Nunca faça commit disso -- sempre `yarn unlink` e reinstale quando feito.
:::
