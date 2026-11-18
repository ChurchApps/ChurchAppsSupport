---
title: "Claude"
description: "Conecte o B1 Admin ao Claude para perguntar sobre presença, doações e grupos em linguagem simples, com opção de login e opção de chave com permissões limitadas."
---

# Claude

<div class="article-intro">

Pergunte ao Claude sobre a sua igreja em linguagem simples e ele responderá com base nos seus dados do B1 -- incluindo suas lições e salas de aula do FreePlay. Perguntas como *"quantos visitantes de primeira vez vieram no domingo?"* ou *"quem entrou em um pequeno grupo neste mês?"* -- ou peça que ele faça coisas, como *"adicione uma nova página ao nosso site chamada Eventos."* A configuração leva menos de 3 minutos, e você não precisa de conhecimentos técnicos nem de nenhum software para instalar.

</div>

<div class="prereqs">
<h4>O que você precisa</h4>

- **Uma conta no Claude.** O **plano gratuito funciona** -- uma boa forma de experimentar. Contas gratuitas, porém, têm um limite diário de mensagens, e consultar informações no B1 consome mensagens rapidamente; por isso, se você for usar com regularidade, recomendamos o **Claude Pro** (cerca de US$ 20/mês).
- **Seu login do B1** -- o mesmo que você usa no B1 Admin.

</div>

:::tip Recomendado -- gratuito para experimentar
O Claude é a forma mais fácil de conectar o B1 à IA, e funciona no **plano gratuito** do Claude -- uma maneira perfeita de a sua igreja experimentar antes de pagar por qualquer coisa.
:::

Há duas formas de conectar. A **Opção 1 é a mais fácil** -- sem chave e sem nada para instalar.

## Opção 1 -- Entrar com o B1 (mais fácil) {#option-1--sign-in-with-b1-easiest}

Funciona no site do Claude, no aplicativo de desktop do Claude e no aplicativo de celular do Claude -- configure uma vez e ele estará em todos eles.

### Etapa 1 -- Abra as configurações de conectores do Claude {#step-1--open-claudes-connector-settings}

1. Acesse [claude.ai](https://claude.ai) e entre (ou crie uma conta gratuita).
2. Clique no seu nome, no canto inferior esquerdo, e depois em **Personalizar** → **Conectores**.

### Etapa 2 -- Adicione o B1 {#step-2--add-b1}

1. Clique em **Adicionar** e depois em **Adicionar conector personalizado**.
2. **Nome:** digite `B1`.
3. **URL:** cole `https://api.churchapps.org/mcp`
4. Deixe as outras opções como estão e clique em **Adicionar**.

### Etapa 3 -- Entre no B1 {#step-3--sign-in-to-b1}

1. Clique em **Conectar**. Abrirá uma página de login do B1.
2. Entre com sua conta do B1. Se você fizer parte de mais de uma igreja, confira se a página indica a igreja certa ("Você gostaria de acessar os seguintes dados da *sua igreja*…").
3. O B1 lista o que o Claude está solicitando (**Tudo o que a sua conta do B1 pode acessar**), informa que o aplicativo se registrou no B1 e confirma que você será levado de volta ao **claude.ai**. Clique em **Permitir**.

Você voltará ao Claude, e o B1 aparecerá como conectado.

### Etapa 4 -- Faça uma pergunta {#step-4--ask-it-something}

Inicie um **novo chat** e experimente:

- *"Quantas pessoas fazem parte da nossa igreja?"*
- *"Liste nossos grupos ativos."*
- *"Resuma as doações deste mês por fundo."*
- *"Quem entrou na igreja nos últimos 30 dias?"*

Na primeira vez, o Claude pedirá permissão para usar o B1 -- clique em **Permitir**.

## Opção 2 -- Extensão de desktop com uma chave do B1 {#option-2--desktop-extension-with-a-b1-key}

Use esta opção se preferir dar ao Claude uma chave com permissões limitadas (por exemplo, apenas consulta). Ela funciona no aplicativo de desktop do Claude para Mac ou Windows, e você precisa da permissão para gerenciar as configurações da igreja no B1 para criar uma chave.

### Etapa 1 -- Obtenha o aplicativo do Claude {#step-1--get-the-claude-app}

Baixe o aplicativo do Claude em [claude.com/download](https://claude.com/download), instale-o, abra-o e entre.

### Etapa 2 -- Crie sua chave do B1 {#step-2--make-your-b1-key}

A chave é o que permite que o Claude acesse o B1 *da sua* igreja -- pense nela como uma senha exclusiva para o Claude.

1. Entre no [B1 Admin](https://admin.b1.church) e acesse [Configurações → Desenvolvedor](https://admin.b1.church/settings/developer).
2. Na aba **Chaves de API**, clique em **Nova chave de API**.
3. **Nome:** digite `Claude`.
4. **Escopos:** marque o que o Claude poderá fazer. A maioria das áreas tem uma caixa **leitura** (apenas consultar) e uma caixa **escrita** (fazer alterações); formulários tem apenas **forms:write**. Não tem certeza? Para começar, marque apenas as caixas de **leitura** -- você poderá criar uma nova chave com mais permissões depois.
5. Clique em **Salvar** e depois em **Copiar** a chave. Ela é exibida apenas uma vez, então vá direto para a Etapa 3.

### Etapa 3 -- Adicione o B1 ao Claude {#step-3--add-b1-to-claude}

1. [Baixe a extensão do B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Clique duas vezes** no arquivo baixado (`b1-churchapps.mcpb`). O Claude abrirá e mostrará **B1 (ChurchApps)**.
3. Clique em **Instalar**.
4. Quando pedir a sua **chave de API do B1**, cole a chave da Etapa 2 e salve.
5. **Feche o Claude completamente** (Mac: **Cmd+Q** · Windows: clique com o botão direito no ícone do Claude na barra de tarefas → **Sair**) e abra-o novamente.

Se clicar duas vezes não abrir o Claude, vá em **Configurações → Extensões → Configurações avançadas → Instalar extensão…** no Claude e escolha o arquivo baixado. Depois, inicie um novo chat e faça uma pergunta.

:::tip Já instalou a extensão?
Não há nada a fazer -- o FreePlay funciona pela mesma conexão. A única exceção é a versão 1.1.0, que pedia um e-mail e uma senha do B1: baixe e instale a extensão novamente para atualizá-la. Sua chave continua válida.
:::

## É seguro? {#is-it-safe}

- O Claude só consegue ver os dados **da sua igreja**.
- **Com login (Opção 1):** o Claude nunca pode fazer mais do que o seu próprio login do B1 permite. A página de login do B1 mostra o que o Claude está solicitando antes de você clicar em **Permitir**.
- **Com chave (Opção 2):** o Claude só pode fazer o que a chave permite no B1 -- uma chave com apenas as caixas de **leitura** marcadas pode consultar, mas nunca alterar nada. O FreePlay funciona da mesma forma, com a mesma chave.
- **Para desativar:** no B1 Admin, vá em **Configurações → Desenvolvedor** e revogue o aplicativo em **Aplicativos conectados** (Opção 1) ou exclua a chave em **Chaves de API** (Opção 2). O acesso é interrompido imediatamente. Você também pode clicar em **Desconectar** no conector do B1 no Claude.

## Quanto custa? {#what-does-it-cost}

A conexão com o B1 é gratuita -- ela faz parte do ChurchApps. O próprio Claude tem um plano gratuito; o Claude Pro (cerca de US$ 20/mês) oferece muito mais uso. Veja [claude.com/pricing](https://claude.com/pricing).

## Detalhes técnicos {#technical-details}

O restante desta página é destinado a usuários técnicos e assistentes de IA: escopos, outras formas de conexão e como tudo funciona.

### Escopos {#scopes}

O Claude se comunica com o B1 pelo **servidor do Model Context Protocol (MCP)** integrado à API do B1 (`https://api.churchapps.org/mcp`). Cada chamada passa pelas mesmas regras de autenticação, permissão e isolamento por igreja de uma requisição feita pelo B1 Admin. O Claude fica limitado às **permissões e escopos** da chave de API e não consegue acessar webhooks de provedores de pagamento, endpoints de administração de clientes OAuth nem endpoints de login e de senha.

Conjuntos de escopos iniciais comuns:

- **Assistente somente de leitura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Leitura + adicionar notas / tarefas:** adicione `people:write`
- **Assistente operacional completo:** adicione os escopos `:write` correspondentes que você desejar

Uma chave com `donations:read` permite que o Claude resuma as doações, mas não registra uma oferta. Uma chave com `people:write` pode adicionar uma pessoa, mas não consegue ver as doações. Veja [Chaves de API](/docs/developer/api/api-keys) para saber o que cada escopo permite.

### Outras formas de conectar {#other-ways-to-connect}

#### Claude Code (CLI) {#claude-code-cli}

Em um terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Pronto. Em qualquer sessão do Claude Code, digite `/mcp` para confirmar que o servidor `b1` está conectado e, em seguida, faça qualquer pergunta sobre a sua igreja.

#### Claude Desktop -- configuração manual (avançado) {#claude-desktop--manual-config-advanced}

Se preferir não usar a extensão, edite o arquivo de configuração do Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Adicione uma entrada de servidor `b1` que faça a ponte com o B1 por meio do `mcp-remote` (exige o [Node.js](https://nodejs.org)):

```json
{
  "mcpServers": {
    "b1": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://api.churchapps.org/mcp",
        "--header", "Authorization:Bearer cak_<prefix>.<secret>"
      ]
    }
  }
}
```

Reinicie o Claude Desktop. O menu de conectores na caixa de mensagem do chat mostrará `b1` com as suas ferramentas.

#### Claude.ai (web) -- conector personalizado {#claudeai-web--custom-connector}

Veja a **Opção 1** acima. O conector usa OAuth 2.1: o Claude descobre o servidor de autorização do B1 em `https://api.churchapps.org/.well-known/oauth-protected-resource`, registra-se com o Dynamic Client Registration e entra com PKCE. Nos planos Team e Enterprise, um proprietário pode precisar adicionar o conector para a organização primeiro. O Claude não solicita escopos específicos, então a página de consentimento oferece tudo o que a conta do B1 conectada pode acessar. Revogue-o em **Configurações → Desenvolvedor → Aplicativos conectados** no B1 Admin.

### Como funciona {#how-it-works}

A API do B1 expõe um único endpoint MCP em `/mcp`. O Claude se conecta a ele, autentica-se com a sua chave `cak_…` e recebe acesso a quatro ferramentas:

| Ferramenta | O que faz |
|---|---|
| `list_endpoints` | Lista os endpoints REST que o Claude pode chamar, com filtro por caminho. Usada para descoberta. |
| `describe_endpoint` | Retorna um resumo curto e um exemplo de requisição/resposta de um endpoint específico. |
| `api_call` | De fato invoca um endpoint REST como o usuário autenticado. |
| `describe_page_builder` | Um guia para criar e editar as páginas do site da sua igreja, que o Claude lê antes de trabalhar no conteúdo do site. |

É a mesma superfície `/membership/people`, `/giving/donations`, `/attendance/visits` etc. que o seu B1 Admin usa -- todas as regras de autorização se aplicam de forma idêntica. Os endpoints do FreePlay (lessons.church) aparecem em `/lessons/*`; as chamadas do Claude a eles são encaminhadas ao FreePlay como o mesmo usuário, com as mesmas permissões.

### Segurança e limites {#safety-and-limits}

- **Isolamento por igreja.** A chave de API corresponde a uma única igreja. O Claude não tem como ver os dados de outras igrejas.
- **Restrita por permissões.** Se você remover uma permissão da pessoa que criou a chave no B1 Admin, o Claude a perde na chamada seguinte -- instantaneamente.
- **Revogável.** Exclua a chave em **Configurações → Desenvolvedor → Chaves de API** e o acesso do Claude termina imediatamente.
- **Lista de bloqueio.** Endpoints de webhooks de provedores de pagamento, endpoints de administração de clientes OAuth e endpoints de login, cadastro, senha e verificação em duas etapas não podem ser chamados pelo MCP.
- **Limite de tamanho da resposta.** Cada resposta de ferramenta é limitada a 64 KB, para que listas longas não estourem o contexto do Claude -- quando isso acontece, o Claude restringe a consulta com filtros.
- **Trilha de auditoria.** As alterações passam pelo mesmo registro de auditoria das ações do B1 Admin; você pode revisá-las em **Configurações → Registro de auditoria**.

### Solução de problemas {#troubleshooting}

**O Claude pede um e-mail e uma senha do B1 para usar o FreePlay:** você tem a versão 1.1.0 da extensão de desktop. Baixe e instale-a novamente para atualizar -- as versões mais recentes usam apenas a sua chave.

**O Claude informa "Unauthorized" ou 401:** o token bearer está ausente, malformado, ou a chave foi revogada. Se você usou a extensão, abra **Configurações → Extensões → B1 (ChurchApps)** no Claude e cole a chave novamente. Caso contrário, confira o cabeçalho `Authorization: Bearer cak_…` (atenção ao espaço e à palavra `Bearer`, escrita exatamente assim).

**Uma chamada de ferramenta retorna 403:** a chave de API não tem o escopo para aquele endpoint. Adicione o escopo em **Configurações → Desenvolvedor → Chaves de API** (será preciso criar uma nova chave -- os escopos não podem ser alterados em uma chave existente) e cole a nova chave nas configurações da extensão ou na configuração do Claude.

**O Claude não encontra um endpoint:** peça que ele chame `list_endpoints` com um filtro, por exemplo, *"use list_endpoints com o filtro 'donations' para encontrar o caminho certo"*. O inventário de rotas é gerado a partir da API ativa, então tudo o que você consegue acessar com `curl` está disponível.

**Desenvolvimento local:** troque `https://api.churchapps.org/mcp` por `http://localhost:8084/mcp` -- mesma autenticação, mesmas ferramentas.

## Relacionados {#related}

- [Chaves de API](/docs/developer/api/api-keys) -- referência completa de escopos
- [Servidor MCP (referência para desenvolvedores)](/docs/developer/api/mcp) -- detalhes do protocolo e esquemas das ferramentas
- [ChatGPT](./chatgpt.md) -- a mesma ideia, para os modelos da OpenAI
