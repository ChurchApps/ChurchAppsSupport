---
title: "Claude"
---

# Claude

<div class="article-intro">

Pergunte ao Claude sobre a sua igreja em linguagem simples e ele responderá com base nos seus dados do B1. Perguntas como *"quantos visitantes de primeira vez vieram no domingo?"* ou *"quem entrou em um grupo pequeno este mês?"* — ou peça para ele fazer coisas, como *"adicione uma nova página ao nosso site chamada Eventos."* A configuração leva menos de 3 minutos e você não precisa de conhecimentos técnicos nem de nenhum software para instalar.

</div>

<div class="prereqs">
<h4>O que você precisa</h4>

- **Uma conta do Claude.** O **plano gratuito funciona** — uma boa forma de experimentar. Contas gratuitas têm um limite diário de mensagens, porém consultar informações no B1 gasta mensagens rapidamente, então, se você usar com regularidade, recomendamos o **Claude Pro** (cerca de US$ 20/mês).
- **O seu login do B1** — o mesmo que você usa no B1 Admin.

</div>

:::tip Recomendado — gratuito para testar
O Claude é a forma mais fácil de conectar o B1 à IA, e funciona no **plano gratuito** do Claude — uma maneira perfeita para a sua igreja experimentar antes de pagar por qualquer coisa.
:::

Há duas formas de conectar. A **Opção 1 é a mais fácil** — não precisa de chave nem de instalar nada.

## Opção 1 — Entrar com o B1 (mais fácil)

Funciona no site do Claude, no aplicativo de desktop do Claude e no aplicativo de celular do Claude — configure uma vez e ele estará em todos eles.

### Passo 1 — Abra as configurações de conectores do Claude

1. Acesse [claude.ai](https://claude.ai) e entre na sua conta (ou crie uma conta gratuita).
2. Clique no seu nome no canto inferior esquerdo e depois em **Configurações** → **Conectores**.

### Passo 2 — Adicione o B1

1. Clique em **Adicionar** e depois em **Adicionar conector personalizado**.
2. **Nome:** digite `B1`.
3. **URL:** cole `https://api.churchapps.org/mcp`
4. Deixe as outras opções como estão e clique em **Adicionar**.

### Passo 3 — Entre no B1

1. Clique em **Conectar**. Abrirá uma página de login do B1.
2. Entre com a sua conta do B1. Se você fizer parte de mais de uma igreja, confira se a igreja correta aparece no topo.
3. O B1 lista o que o Claude está pedindo para fazer e confirma que você será redirecionado de volta para o **claude.ai**. Clique em **Permitir**.

Você voltará ao Claude, e o B1 aparecerá como conectado.

### Passo 4 — Faça uma pergunta

Inicie um **novo chat** e experimente:

- *"Quantas pessoas há na nossa igreja?"*
- *"Liste nossos grupos ativos."*
- *"Resuma as contribuições deste mês por fundo."*
- *"Quem entrou na igreja nos últimos 30 dias?"*

Na primeira vez, o Claude pedirá permissão para usar o B1 — clique em **Permitir**.

## Opção 2 — Extensão de desktop com uma chave do B1

Use esta opção se preferir dar ao Claude uma chave com permissões limitadas (por exemplo, apenas leitura). Funciona no aplicativo de desktop do Claude para Mac ou Windows, e você precisa de permissão para gerenciar as configurações da igreja no B1 para criar uma chave.

### Passo 1 — Obtenha o aplicativo do Claude

Baixe o aplicativo do Claude em [claude.com/download](https://claude.com/download), instale, abra e entre na sua conta.

### Passo 2 — Crie a sua chave do B1

A chave é o que permite que o Claude acesse o B1 da *sua* igreja — pense nela como uma senha exclusiva para o Claude.

1. Entre no [B1 Admin](https://admin.b1.church) e acesse [Configurações → Desenvolvedor](https://admin.b1.church/settings/developer).
2. Na aba **Chaves de API**, clique em **Nova Chave de API**.
3. **Nome:** digite `Claude`.
4. **Escopos:** marque o que o Claude pode fazer. Cada área tem uma caixa de **leitura** (apenas consultar) e uma caixa de **escrita** (fazer alterações). Não tem certeza? Marque apenas as caixas de **leitura** para começar — você pode criar uma nova chave com mais permissões depois.
5. Clique em **Salvar** e depois em **Copiar** a chave. Ela só é mostrada uma vez, então vá direto para o Passo 3.

### Passo 3 — Adicione o B1 ao Claude

1. [Baixe a extensão do B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. Dê **dois cliques** no arquivo baixado (`b1-churchapps.mcpb`). O Claude abrirá e mostrará **B1 (ChurchApps)**.
3. Clique em **Instalar**.
4. Quando pedir a sua **chave de API do B1**, cole a chave do Passo 2 e salve.
5. **Feche o Claude completamente** (Mac: **Cmd+Q** · Windows: clique com o botão direito no ícone do Claude na barra de tarefas → **Sair**) e abra-o novamente.

Se o duplo clique não abrir o Claude, acesse **Configurações → Extensões → Configurações avançadas → Instalar Extensão…** no Claude e escolha o arquivo baixado. Depois, inicie um novo chat e faça uma pergunta.

## É seguro?

- O Claude só consegue ver os dados **da sua igreja**.
- **Com login (Opção 1):** o Claude nunca pode fazer mais do que o seu próprio login do B1 pode. A página de login do B1 lista tudo o que o Claude pode fazer antes de você clicar em **Permitir**.
- **Com chave (Opção 2):** o Claude só pode fazer o que a chave permite — uma chave com apenas as caixas de **leitura** marcadas pode consultar, mas nunca alterar nada.
- **Para desativar:** no B1 Admin, acesse **Configurações → Desenvolvedor** e revogue o aplicativo em **Aplicativos Conectados** (Opção 1) ou exclua a chave em **Chaves de API** (Opção 2). O acesso é interrompido imediatamente. Você também pode clicar em **Desconectar** no conector do B1 no Claude.

## Quanto custa?

A conexão com o B1 é gratuita — ela faz parte da ChurchApps. O próprio Claude tem um plano gratuito; o Claude Pro (cerca de US$ 20/mês) oferece bem mais uso. Veja [claude.com/pricing](https://claude.com/pricing).

## Detalhes técnicos

O restante desta página é para usuários técnicos e assistentes de IA: escopos, outras formas de conexão e como tudo funciona.

### Escopos

O Claude se comunica com o B1 pelo **servidor Model Context Protocol (MCP)** integrado à API do B1 (`https://api.churchapps.org/mcp`). Cada chamada passa pelas mesmas regras de autenticação, permissão e isolamento por igreja de uma requisição feita pelo B1 Admin. O Claude fica limitado às **permissões e escopos** da chave de API e não pode acessar webhooks, endpoints administrativos de OAuth nem outros caminhos exclusivos do operador.

Conjuntos de escopos iniciais comuns:

- **Assistente somente leitura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Leitura + adicionar notas / tarefas:** adicione `people:write`
- **Assistente operacional completo:** adicione os escopos `:write` correspondentes que você desejar

Uma chave com `donations:read` permite que o Claude resuma as contribuições, mas não consegue registrar uma doação. Uma chave com `people:write` pode adicionar uma pessoa, mas não consegue ver as doações. Veja [Chaves de API](/docs/developer/api/api-keys) para saber o que cada escopo permite.

### Outras formas de conectar

#### Claude Code (CLI)

Em um terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Só isso. Dentro de qualquer sessão do Claude Code, digite `/mcp` para confirmar que o servidor `b1` está conectado e depois faça qualquer pergunta sobre a sua igreja.

#### Claude Desktop — configuração manual (avançado)

Se preferir não usar a extensão, edite o arquivo de configuração do Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Adicione uma entrada de servidor `b1` que faz a ponte com o B1 por meio do `mcp-remote` (requer o [Node.js](https://nodejs.org)):

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

Reinicie o Claude Desktop. O menu de conectores na caixa de mensagens do chat mostrará `b1` com as suas ferramentas.

#### Claude.ai (web) — conector personalizado

Veja a **Opção 1** acima. O conector usa OAuth 2.1: o Claude descobre o servidor de autorização do B1 em `https://api.churchapps.org/.well-known/oauth-protected-resource`, registra-se com Dynamic Client Registration e entra com PKCE. Nos planos Team e Enterprise, um proprietário pode precisar adicionar o conector para a organização primeiro. O Claude não solicita escopos específicos, então a página de consentimento oferece tudo o que a conta do B1 conectada pode acessar. Revogue em **Configurações → Desenvolvedor → Aplicativos Conectados** no B1 Admin.

### Como funciona

A API do B1 expõe um único endpoint MCP em `/mcp`. O Claude se conecta a ele, autentica-se com a sua chave `cak_…` e recebe acesso a quatro ferramentas:

| Ferramenta | O que faz |
|---|---|
| `list_endpoints` | Lista os endpoints REST que o Claude pode chamar, com filtro por caminho. Usada para descoberta. |
| `describe_endpoint` | Retorna um resumo curto e um exemplo de requisição/resposta de um endpoint específico. |
| `api_call` | De fato invoca um endpoint REST como o usuário autenticado. |
| `describe_page_builder` | Um guia para criar e editar as páginas do site da sua igreja, que o Claude lê antes de trabalhar com o conteúdo do site. |

Esta é a mesma superfície `/membership/people`, `/giving/donations`, `/attendance/visits` etc. que o seu B1Admin usa — todas as regras de autorização se aplicam da mesma forma.

### Segurança e limites

- **Isolamento por igreja.** A chave de API corresponde a uma única igreja. O Claude não tem como ver os dados de outras igrejas.
- **Limitado por permissões.** Se você remover uma permissão da pessoa que criou a chave no B1Admin, o Claude a perde na próxima chamada — imediatamente.
- **Revogável.** Exclua a chave em **Configurações → Desenvolvedor → Chaves de API** e o acesso do Claude termina imediatamente.
- **Lista de bloqueio.** Webhooks de provedores, endpoints administrativos de clientes OAuth e a rota exclusiva do operador `apiEmails` não podem ser chamados via MCP.
- **Limite de tamanho de resposta.** Cada resposta de ferramenta é limitada a 64 KB para que listas longas não sobrecarreguem o contexto do Claude — quando isso acontecer, o Claude restringirá a consulta com filtros.
- **Trilha de auditoria.** As alterações passam pelo mesmo log de auditoria das ações do B1Admin; você pode revisá-las em **Configurações → Log de Auditoria**.

### Solução de problemas

**O Claude informa "Unauthorized" ou erro 401:** o token de portador está ausente, malformado, ou a chave foi revogada. Se você usou a extensão, abra **Configurações → Extensões → B1 (ChurchApps)** no Claude e cole a chave novamente. Caso contrário, verifique novamente o cabeçalho `Authorization: Bearer cak_…` (atenção ao espaço e à palavra `Bearer` exatamente como está).

**Uma chamada de ferramenta retorna 403:** a chave de API não tem o escopo para aquele endpoint. Adicione o escopo em **Configurações → Desenvolvedor → Chaves de API** (você precisará criar uma nova chave — os escopos não podem ser alterados em uma chave existente) e cole a nova chave nas configurações da extensão ou na configuração do Claude.

**O Claude não encontra um endpoint:** peça para ele chamar `list_endpoints` com um filtro, por exemplo, *"use list_endpoints com o filtro 'donations' para encontrar o caminho certo"*. O inventário de rotas é gerado a partir da API em execução, então tudo o que você consegue acessar com `curl` está lá.

**Desenvolvimento local:** troque `https://api.churchapps.org/mcp` por `http://localhost:8084/mcp` — mesma autenticação, mesmas ferramentas.

## Relacionados

- [Chaves de API](/docs/developer/api/api-keys) — referência completa de escopos
- [Servidor MCP (referência do desenvolvedor)](/docs/developer/api/mcp) — detalhes do protocolo e esquemas das ferramentas
- [ChatGPT](./chatgpt) — a mesma ideia, para os modelos da OpenAI
