---
title: "Claude"
---

# Claude

<div class="article-intro">

Pergunte ao Claude sobre a sua igreja em linguagem simples, e ele responde a partir dos seus dados do B1. Perguntas como *"quantos visitantes pela primeira vez vieram no domingo?"* ou *"quem entrou em um pequeno grupo este mês?"* — ou peça para ele fazer coisas, como *"adicione uma nova página ao nosso site chamada Eventos."* A configuração leva menos de 3 minutos e você não precisa de nenhuma habilidade técnica nem instalar nenhum software.

</div>

<div class="prereqs">
<h4>O Que Você Precisa</h4>

- **Uma conta do Claude.** O **plano gratuito funciona** — uma boa forma de experimentar. Contas gratuitas têm um limite diário de mensagens, porém, e consultar o B1 consome mensagens rapidamente; por isso, se você usar com frequência, recomendamos o **Claude Pro** (cerca de $20/mês).
- **Seu login do B1** — o mesmo que você usa no B1 Admin.

</div>

:::tip Recomendado — grátis para experimentar
O Claude é a forma mais fácil de conectar o B1 à IA, e funciona no **plano gratuito** do Claude — uma ótima maneira de sua igreja experimentar antes de pagar por qualquer coisa.
:::

Há duas formas de conectar. **A Opção 1 é a mais fácil** — sem chave e sem nada para instalar.

## Opção 1 — Entrar com o B1 (mais fácil)

Funciona no site do Claude, no aplicativo Claude para desktop e no aplicativo Claude para celular — configure uma vez e estará em todos eles.

### Passo 1 — Abra as configurações de conectores do Claude

1. Acesse [claude.ai](https://claude.ai) e faça login (ou crie uma conta gratuita).
2. Clique no seu nome no canto inferior esquerdo e depois em **Settings** (Configurações) → **Connectors** (Conectores).

### Passo 2 — Adicione o B1

1. Clique em **Add** (Adicionar) e depois em **Add custom connector** (Adicionar conector personalizado).
2. **Name** (Nome): digite `B1`.
3. **URL:** cole `https://api.churchapps.org/mcp`
4. Deixe as outras opções como estão e clique em **Add** (Adicionar).

### Passo 3 — Entre no B1

1. Clique em **Connect** (Conectar). Uma página de login do B1 será aberta.
2. Faça login com sua conta do B1. Se você pertence a mais de uma igreja, confira se a igreja certa aparece no topo.
3. O B1 lista o que o Claude está pedindo para fazer e confirma que você será enviado de volta ao **claude.ai**. Clique em **Allow** (Permitir).

Você está de volta ao Claude, e o B1 aparece como conectado.

### Passo 4 — Pergunte algo

Inicie um **novo chat** e experimente:

- *"Quantas pessoas há na nossa igreja?"*
- *"Liste nossos grupos ativos."*
- *"Resuma as doações deste mês por fundo."*
- *"Quem entrou na igreja nos últimos 30 dias?"*

Na primeira vez, o Claude pede permissão para usar o B1 — clique em **Allow** (Permitir).

## Opção 2 — Extensão para desktop com uma chave do B1

Use esta opção se preferir dar ao Claude uma chave com permissões limitadas (por exemplo, apenas para ver). Ela funciona no aplicativo Claude para desktop no Mac ou Windows, e você precisa de permissão para gerenciar as configurações da igreja no B1 para criar uma chave.

### Passo 1 — Obtenha o aplicativo do Claude

Baixe o aplicativo do Claude em [claude.com/download](https://claude.com/download), instale, abra e faça login.

### Passo 2 — Crie sua chave do B1

A chave é o que permite ao Claude entrar no B1 da *sua* igreja — pense nela como uma senha só para o Claude.

1. Faça login no [B1 Admin](https://admin.b1.church) e vá para [Configurações → Desenvolvedor](https://admin.b1.church/settings/developer).
2. Na aba **Chaves de API**, clique em **Nova Chave de API**.
3. **Nome:** digite `Claude`.
4. **Escopos:** marque o que o Claude pode fazer. Cada área tem uma caixa **read** (apenas ver) e uma caixa **write** (fazer alterações). Não tem certeza? Marque apenas as caixas **read** para começar — você pode criar uma nova chave com mais permissões depois.
5. Clique em **Salvar** e depois em **Copiar** a chave. Ela é mostrada apenas uma vez, então vá direto para o Passo 3.

### Passo 3 — Adicione o B1 ao Claude

1. [Baixe a extensão B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Clique duas vezes** no arquivo baixado (`b1-churchapps.mcpb`). O Claude abre e mostra **B1 (ChurchApps)**.
3. Clique em **Install**.
4. Quando ele pedir sua **B1 API key** (chave de API do B1), cole a chave do Passo 2 e salve.
5. **Feche o Claude completamente** (Mac: **Cmd+Q** · Windows: clique com o botão direito no ícone do Claude na barra de tarefas → **Quit**) e abra-o novamente.

Se clicar duas vezes não abrir o Claude, vá em **Settings → Extensions → Advanced settings → Install Extension…** no Claude e escolha o arquivo baixado. Depois, inicie um novo chat e pergunte algo.

## É Seguro?

- O Claude só pode ver os dados da **sua igreja**.
- **Conectado com login (Opção 1):** o Claude nunca pode fazer mais do que o seu próprio login do B1 permite. A página de login do B1 lista tudo o que o Claude poderá fazer antes de você clicar em **Allow** (Permitir).
- **Com uma chave (Opção 2):** o Claude só pode fazer o que a chave permite — uma chave com apenas as caixas **read** marcadas pode ver, mas nunca alterar nada.
- **Para desligar:** no B1 Admin, vá em **Configurações → Desenvolvedor** e revogue o aplicativo em **Aplicativos Conectados** (Opção 1) ou exclua a chave em **Chaves de API** (Opção 2). O acesso para na hora. Você também pode clicar em **Disconnect** (Desconectar) no conector do B1 no Claude.

## Quanto Custa?

A conexão com o B1 é gratuita — faz parte do ChurchApps. O próprio Claude tem um plano gratuito; o Claude Pro (cerca de $20/mês) oferece muito mais uso. Veja [claude.com/pricing](https://claude.com/pricing).

## Detalhes Técnicos

O restante desta página é para usuários técnicos e assistentes de IA: escopos, outras formas de conectar e como funciona.

### Escopos

O Claude se comunica com o B1 através do **servidor Model Context Protocol (MCP)** incorporado à API B1 (`https://api.churchapps.org/mcp`). Cada chamada passa pelas mesmas regras de autenticação, permissão e escopo da igreja que uma solicitação do B1 Admin. O Claude é limitado às **permissões e escopos** da chave de API, e não pode alcançar webhooks, endpoints de administrador OAuth ou outros caminhos reservados ao operador.

Conjuntos iniciais comuns de escopos:

- **Assistente apenas leitura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Leitura + adicionar notas / tarefas:** adicione `people:write`
- **Assistente operacional completo:** adicione os escopos `:write` correspondentes que você deseja

Uma chave `donations:read` permite ao Claude resumir doações, mas não pode registrar uma doação. Uma chave `people:write` pode adicionar uma pessoa, mas não pode ver doações. Veja [Chaves de API](/docs/developer/api/api-keys) para saber o que cada escopo permite.

### Outras formas de conectar

#### Claude Code (CLI)

Em um terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Pronto. Dentro de qualquer sessão do Claude Code, digite `/mcp` para confirmar que o servidor `b1` está conectado, então faça ao Claude qualquer pergunta sobre sua igreja.

#### Claude Desktop — configuração manual (avançado)

Se preferir não usar a extensão, edite o arquivo de configuração do Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Adicione uma entrada de servidor `b1` que faz a ponte com o B1 através de `mcp-remote` (requer [Node.js](https://nodejs.org)):

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

Reinicie o Claude Desktop. O menu de conectores no compositor de chat mostrará `b1` com suas ferramentas.

#### Claude.ai (web) — Conector Personalizado

Veja a **Opção 1** acima. O conector usa OAuth 2.1: o Claude descobre o servidor de autorização do B1 a partir de `https://api.churchapps.org/.well-known/oauth-protected-resource`, registra-se com Dynamic Client Registration (registro dinâmico de cliente) e faz login com PKCE. Nos planos Team e Enterprise, um proprietário pode precisar adicionar o conector para a organização primeiro. O Claude não solicita escopos específicos, então a página de consentimento oferece tudo o que a conta do B1 conectada pode acessar. Revogue-o em **Configurações → Desenvolvedor → Aplicativos Conectados** no B1 Admin.

### Como Funciona

A API B1 expõe um único endpoint MCP em `/mcp`. O Claude se conecta a ele, autentica com sua chave `cak_…` e ganha acesso a quatro ferramentas:

| Ferramenta | O que faz |
|---|---|
| `list_endpoints` | Lista os endpoints REST que o Claude pode chamar, filtrável por caminho. Usado para descoberta. |
| `describe_endpoint` | Retorna um resumo curto e um exemplo de solicitação/resposta para um endpoint específico. |
| `api_call` | Realmente invoca um endpoint REST como o usuário autenticado. |
| `describe_page_builder` | Um guia para criar e editar as páginas do site da sua igreja, que o Claude lê antes de trabalhar no conteúdo do site. |

Esta é a mesma superfície `/membership/people`, `/giving/donations`, `/attendance/visits` etc. que seu B1Admin usa — cada regra de autorização se aplica de forma idêntica.

### Segurança e Limites

- **Isolamento por igreja.** A chave de API corresponde a uma única igreja. O Claude não tem como ver dados de outras igrejas.
- **Escopo de permissão.** Se você remover uma permissão da pessoa que criou a chave no B1Admin, o Claude a perde na próxima chamada — instantaneamente.
- **Revogável.** Exclua a chave em **Configurações → Desenvolvedor → Chaves de API** e o acesso do Claude termina imediatamente.
- **Lista de bloqueio.** Webhooks de provedor, endpoints de administrador de cliente OAuth e a rota `apiEmails` reservada ao operador não podem ser chamados via MCP.
- **Limite de tamanho de resposta.** Uma única resposta de ferramenta é limitada a 64 KB para que listas longas não estourem o contexto do Claude — o Claude restringirá a consulta com filtros quando isso acontecer.
- **Trilha de auditoria.** Alterações passam pelo mesmo log de auditoria que as ações do B1Admin; você pode revisá-las em **Configurações → Log de Auditoria**.

### Solução de Problemas

**O Claude relata "Unauthorized" ou 401:** o token bearer está faltando, malformado, ou a chave foi revogada. Se você usou a extensão, abra **Settings → Extensions → B1 (ChurchApps)** no Claude e cole a chave novamente. Caso contrário, verifique o cabeçalho `Authorization: Bearer cak_…` (note o espaço e o literal `Bearer`).

**Uma chamada de ferramenta retorna 403:** a chave de API não tem o escopo para esse endpoint. Adicione o escopo em **Configurações → Desenvolvedor → Chaves de API** (você precisará criar uma nova chave — escopos não podem ser alterados no local) e cole a nova chave nas configurações da extensão ou na configuração do Claude.

**O Claude não consegue encontrar um endpoint:** peça que ele chame `list_endpoints` com um filtro, por ex. *"use list_endpoints com o filtro 'donations' para encontrar o caminho certo"*. O inventário de rotas é gerado a partir da API ao vivo, então qualquer coisa que você consiga acessar com `curl` está lá.

**Desenvolvimento local:** substitua `https://api.churchapps.org/mcp` por `http://localhost:8084/mcp` — mesma autenticação, mesmas ferramentas.

## Relacionado

- [Chaves de API](/docs/developer/api/api-keys) — referência completa de escopos
- [Servidor MCP (referência de desenvolvedor)](/docs/developer/api/mcp) — detalhes de protocolo e esquemas de ferramentas
- [ChatGPT](./chatgpt) — mesma ideia, para os modelos da OpenAI
