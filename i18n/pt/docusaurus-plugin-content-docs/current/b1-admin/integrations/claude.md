---
title: "Claude"
description: "Conecte o B1 Admin ao Claude para perguntar sobre presença, doações e grupos em linguagem natural, com opção de login e chave de permissão limitada."
---

# Claude

<div class="article-intro">

Pergunte ao Claude sobre a sua igreja em linguagem simples e ele responde com base nos seus dados do B1 — incluindo suas lições do FreePlay e as salas de aula. Perguntas como *"quantos visitantes de primeira vez vieram no domingo?"* ou *"quem entrou em um grupo pequeno este mês?"* — ou peça para ele fazer coisas, como *"adicione uma nova página ao nosso site chamada Eventos."* A configuração leva menos de 3 minutos e você não precisa de conhecimentos técnicos nem de software para instalar.

</div>

<div class="prereqs">
<h4>O que você precisa</h4>

- **Uma conta do Claude.** O **plano gratuito funciona** — uma boa forma de testar. Contas gratuitas têm um limite diário de mensagens, porém consultar informações no B1 consome mensagens rapidamente, então, se você for usar com regularidade, recomendamos o **Claude Pro** (cerca de US$ 20/mês).
- **Seu login do B1** — o mesmo que você usa no B1 Admin.

</div>

:::tip Recomendado — gratuito para testar
O Claude é a forma mais fácil de conectar o B1 à IA, e funciona no **plano gratuito** do Claude — uma ótima maneira de a sua igreja experimentar antes de pagar por qualquer coisa.
:::

Existem duas formas de conectar. **A Opção 1 é a mais fácil** — sem chave e sem instalar nada.

## Opção 1 — Entrar com o B1 (mais fácil)

Funciona no site do Claude, no aplicativo de desktop do Claude e no aplicativo de celular do Claude — configure uma vez e ele funciona em todos.

### Passo 1 — Abra as configurações de conectores do Claude

1. Acesse [claude.ai](https://claude.ai) e entre (ou crie uma conta gratuita).
2. Clique no seu nome no canto inferior esquerdo e depois em **Configurações** → **Conectores**.

### Passo 2 — Adicione o B1

1. Clique em **Adicionar** e depois em **Adicionar conector personalizado**.
2. **Nome:** digite `B1`.
3. **URL:** cole `https://api.churchapps.org/mcp`
4. Deixe as outras opções como estão e clique em **Adicionar**.

### Passo 3 — Entre no B1

1. Clique em **Conectar**. Abre-se uma página de login do B1.
2. Entre com a sua conta do B1. Se você fizer parte de mais de uma igreja, confira se a igreja correta aparece no topo.
3. O B1 lista o que o Claude está pedindo para fazer e confirma que você voltará para o **claude.ai**. Clique em **Permitir**.

Você voltará ao Claude, e o B1 aparecerá como conectado.

### Passo 4 — Faça uma pergunta

Inicie um **novo chat** e experimente:

- *"Quantas pessoas há na nossa igreja?"*
- *"Liste nossos grupos ativos."*
- *"Resuma as doações deste mês por fundo."*
- *"Quem entrou na igreja nos últimos 30 dias?"*

Na primeira vez, o Claude pede permissão para usar o B1 — clique em **Permitir**.

## Opção 2 — Extensão de desktop com uma chave do B1

Use esta opção se preferir dar ao Claude uma chave com permissões limitadas (por exemplo, somente leitura). Funciona no aplicativo de desktop do Claude para Mac ou Windows, e você precisa de permissão para gerenciar as configurações da igreja no B1 para criar uma chave.

### Passo 1 — Obtenha o aplicativo do Claude

Baixe o aplicativo do Claude em [claude.com/download](https://claude.com/download), instale, abra e entre.

### Passo 2 — Crie sua chave do B1

A chave é o que permite que o Claude acesse o B1 *da sua* igreja — pense nela como uma senha exclusiva para o Claude.

1. Entre no [B1 Admin](https://admin.b1.church) e acesse [Configurações → Desenvolvedor](https://admin.b1.church/settings/developer).
2. Na aba **Chaves de API**, clique em **Nova chave de API**.
3. **Nome:** digite `Claude`.
4. **Escopos:** marque o que o Claude pode fazer. Cada área tem uma caixa de **leitura** (somente visualizar) e uma caixa de **escrita** (fazer alterações). Não tem certeza? Marque apenas as caixas de **leitura** para começar — você pode criar uma nova chave com mais permissões depois.
5. Clique em **Salvar** e depois em **Copiar** a chave. Ela só é exibida uma vez, então vá direto para o Passo 3.

### Passo 3 — Adicione o B1 ao Claude

1. [Baixe a extensão do B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. Dê **duplo clique** no arquivo baixado (`b1-churchapps.mcpb`). O Claude abre e mostra **B1 (ChurchApps)**.
3. Clique em **Instalar**.
4. Quando ele pedir a sua **chave de API do B1**, cole a chave do Passo 2 e salve.
5. **Feche o Claude completamente** (Mac: **Cmd+Q** · Windows: clique com o botão direito no ícone do Claude na barra de tarefas → **Sair**) e abra-o novamente.

Se o duplo clique não abrir o Claude, acesse **Configurações → Extensões → Configurações avançadas → Instalar extensão…** no Claude e escolha o arquivo baixado. Depois, inicie um novo chat e faça uma pergunta.

:::tip Já instalou a extensão?
Não há nada a fazer — o FreePlay funciona pela mesma conexão. A única exceção é a versão 1.1.0, que pedia um e-mail e uma senha do B1: baixe e instale a extensão novamente para atualizá-la. Sua chave continua válida.
:::

## Isso é seguro?

- O Claude só enxerga os dados **da sua igreja**.
- **Com login (Opção 1):** o Claude nunca pode fazer mais do que o seu próprio login do B1 permite. A página de login do B1 lista tudo o que o Claude pode fazer antes de você clicar em **Permitir**.
- **Com chave (Opção 2):** o Claude só pode fazer o que a chave permite no B1 — uma chave com apenas as caixas de **leitura** marcadas pode consultar, mas nunca alterar nada. O FreePlay funciona da mesma forma, com a mesma chave.
- **Para desligar:** no B1 Admin, acesse **Configurações → Desenvolvedor** e revogue o aplicativo em **Aplicativos conectados** (Opção 1) ou exclua a chave em **Chaves de API** (Opção 2). O acesso para imediatamente. Você também pode clicar em **Desconectar** no conector do B1 no Claude.

## Quanto custa?

A conexão com o B1 é gratuita — faz parte da ChurchApps. O Claude tem um plano gratuito; o Claude Pro (cerca de US$ 20/mês) oferece bem mais uso. Veja [claude.com/pricing](https://claude.com/pricing).

## Detalhes técnicos

O restante desta página é para usuários técnicos e assistentes de IA: escopos, outras formas de conexão e como funciona.

### Escopos {#scopes}

O Claude se comunica com o B1 pelo **servidor Model Context Protocol (MCP)** integrado à API do B1 (`https://api.churchapps.org/mcp`). Cada chamada passa pelas mesmas regras de autenticação, permissão e isolamento por igreja de uma solicitação feita pelo B1 Admin. O Claude fica limitado às **permissões e escopos** da chave de API e não consegue acessar webhooks, endpoints administrativos de OAuth nem outros caminhos reservados ao operador.

Conjuntos comuns de escopos iniciais:

- **Assistente somente leitura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Leitura + adicionar notas / tarefas:** acrescente `people:write`
- **Assistente operacional completo:** acrescente os escopos `:write` correspondentes que você quiser

Uma chave com `donations:read` permite que o Claude resuma as doações, mas não registrar uma oferta. Uma chave com `people:write` pode adicionar uma pessoa, mas não consegue ver as doações. Veja [Chaves de API](/docs/developer/api/api-keys) para saber o que cada escopo permite.

### Outras formas de conectar

#### Claude Code (CLI)

Em um terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

É isso. Em qualquer sessão do Claude Code, digite `/mcp` para confirmar que o servidor `b1` está conectado e depois faça qualquer pergunta sobre a sua igreja.

#### Claude Desktop — configuração manual (avançado)

Se preferir não usar a extensão, edite o arquivo de configuração do Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Adicione uma entrada de servidor `b1` que faça a ponte com o B1 por meio do `mcp-remote` (requer [Node.js](https://nodejs.org)):

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

Reinicie o Claude Desktop. O menu de conectores no campo de mensagem do chat mostrará `b1` com as suas ferramentas.

#### Claude.ai (web) — Conector personalizado

Veja a **Opção 1** acima. O conector usa OAuth 2.1: o Claude descobre o servidor de autorização do B1 a partir de `https://api.churchapps.org/.well-known/oauth-protected-resource`, se registra com Dynamic Client Registration e entra usando PKCE. Nos planos Team e Enterprise, um proprietário pode precisar adicionar o conector para a organização primeiro. O Claude não solicita escopos específicos, então a página de consentimento oferece tudo o que a conta do B1 conectada pode acessar. Revogue-o em **Configurações → Desenvolvedor → Aplicativos conectados** no B1 Admin.

### Como funciona

A API do B1 expõe um único endpoint MCP em `/mcp`. O Claude se conecta a ele, se autentica com a sua chave `cak_…` e recebe acesso a quatro ferramentas:

| Ferramenta | O que faz |
|---|---|
| `list_endpoints` | Lista os endpoints REST que o Claude pode chamar, filtráveis por caminho. Usada para descoberta. |
| `describe_endpoint` | Retorna um resumo curto e um exemplo de requisição/resposta para um endpoint específico. |
| `api_call` | De fato invoca um endpoint REST como o usuário autenticado. |
| `describe_page_builder` | Um guia para criar e editar as páginas do site da sua igreja, que o Claude lê antes de trabalhar com o conteúdo do site. |

É a mesma superfície `/membership/people`, `/giving/donations`, `/attendance/visits` etc. que o seu B1 Admin usa — todas as regras de autorização se aplicam de forma idêntica. Os endpoints do FreePlay (lessons.church) estão listados em `/lessons/*`; as chamadas do Claude a eles são encaminhadas ao FreePlay como o mesmo usuário, com as mesmas permissões.

### Segurança e limites

- **Isolamento por igreja.** A chave de API corresponde a uma única igreja. O Claude não tem como ver os dados de outras igrejas.
- **Limitado por permissões.** Se você remover uma permissão da pessoa que criou a chave no B1 Admin, o Claude a perde na próxima chamada — imediatamente.
- **Revogável.** Exclua a chave em **Configurações → Desenvolvedor → Chaves de API** e o acesso do Claude termina imediatamente.
- **Lista de bloqueio.** Webhooks de provedores, endpoints de administração de clientes OAuth e a rota `apiEmails`, reservada ao operador, não podem ser chamados via MCP.
- **Limite de tamanho de resposta.** Uma única resposta de ferramenta é limitada a 64 KB para que listas longas não estourem o contexto do Claude — quando isso acontece, o Claude restringe a consulta com filtros.
- **Trilha de auditoria.** As alterações passam pelo mesmo registro de auditoria das ações do B1 Admin; você pode revisá-las em **Configurações → Registro de auditoria**.

### Solução de problemas

**O Claude pede um e-mail e uma senha do B1 para usar o FreePlay:** você tem a versão 1.1.0 da extensão de desktop. Baixe e instale-a novamente para atualizar — as versões mais novas usam apenas a sua chave.

**O Claude informa "Unauthorized" ou 401:** o token de autorização está ausente, malformado ou a chave foi revogada. Se você usou a extensão, abra **Configurações → Extensões → B1 (ChurchApps)** no Claude e cole a chave novamente. Caso contrário, confira o cabeçalho `Authorization: Bearer cak_…` (atenção ao espaço e à palavra `Bearer` exatamente como está).

**Uma chamada de ferramenta retorna 403:** a chave de API não tem o escopo para esse endpoint. Adicione o escopo em **Configurações → Desenvolvedor → Chaves de API** (você precisará criar uma nova chave — os escopos não podem ser alterados em uma chave existente) e cole a nova chave nas configurações da extensão ou na configuração do Claude.

**O Claude não encontra um endpoint:** peça para ele chamar `list_endpoints` com um filtro, por exemplo, *"use list_endpoints com o filtro 'donations' para encontrar o caminho certo"*. O inventário de rotas é gerado a partir da API em execução, então tudo o que você consegue acessar com `curl` está ali.

**Desenvolvimento local:** troque `https://api.churchapps.org/mcp` por `http://localhost:8084/mcp` — mesma autenticação, mesmas ferramentas.

## Relacionados

- [Chaves de API](/docs/developer/api/api-keys) — referência completa de escopos
- [Servidor MCP (referência do desenvolvedor)](/docs/developer/api/mcp) — detalhes do protocolo e esquemas das ferramentas
- [ChatGPT](./chatgpt.md) — a mesma ideia, para os modelos da OpenAI
