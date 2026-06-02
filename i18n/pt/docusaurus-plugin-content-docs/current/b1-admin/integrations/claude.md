---
title: "Claude"
---

# Claude

<div class="article-intro">

Conecte o Claude da Anthropic aos dados da sua igreja no B1. Com uma chave de API e alguns minutos de configuração, você pode fazer perguntas ao Claude como "quantos visitantes pela primeira vez vieram no domingo?" ou "rascunhe um email de agradecimento para as pessoas que contribuíram para o fundo de construção este mês" — e Claude lerá as respostas diretamente dos registros da sua igreja, limitado às suas permissões.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Um administrador da igreja com permissão para **Editar Configurações** (para criar uma chave de API)
- Um de: **Claude Code** (CLI / extensão IDE), **Claude Desktop** (Mac/Windows), ou uma conta **Claude Pro/Max/Team**
- A URL completa da sua API B1 — geralmente `https://api.churchapps.org` para igrejas hospedadas, ou seu host da Api auto-hospedada

</div>

## O Que Claude Pode Ver

Claude se comunica com B1 através do **servidor Model Context Protocol (MCP)** incorporado à API B1. Cada chamada que Claude faz passa pelas mesmas regras de autenticação, permissão e escopo da igreja que uma solicitação do B1Admin — significando que Claude:

- Apenas vê dados da **sua** igreja
- É limitado por quaisquer **permissões e escopos** que a chave de API que você lhe dá possui
- Não pode alcançar webhooks, endpoints de administrador OAuth ou outros caminhos reservados ao operador (aqueles estão na lista de bloqueio)

Uma chave `donations:read` permite ao Claude resumir doações mas não pode registrar um presente. Uma chave `people:write` pode adicionar uma pessoa mas não pode ver doações. Escolha os escopos que correspondem ao trabalho.

## Configuração

### 1. Criar uma chave de API

1. Em B1Admin vá para **Configurações → Desenvolvedor → Chaves de API**.
2. Clique em **Nova Chave de API**, nomeie como `Claude`, e selecione os escopos que Claude deve ter. Conjuntos iniciais comuns:
   - **Assistente apenas leitura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
   - **Leitura + adicionar notas / tarefas:** adicione `people:write`
   - **Assistente operacional completo:** adicione os escopos `:write` correspondentes que você deseja
3. Salve. A chave completa `cak_…` é mostrada **uma vez** — copie-a.

Veja [Chaves de API](/docs/developer/api/api-keys) para saber o que cada escopo permite.

### 2. Conectar Claude

Escolha o cliente Claude que você usa:

#### Claude Code (CLI)

Em um terminal:

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Pronto. Dentro de qualquer sessão do Claude Code, digite `/mcp` para confirmar que o servidor `b1` está conectado, então faça ao Claude qualquer pergunta sobre sua igreja.

#### Claude Desktop

Edite o arquivo de configuração do Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Adicione uma entrada de servidor `b1`. Versões mais recentes do Claude Desktop falam HTTP MCP nativamente:

```json
{
  "mcpServers": {
    "b1": {
      "url": "https://api.churchapps.org/mcp",
      "headers": {
        "Authorization": "Bearer cak_<prefix>.<secret>"
      }
    }
  }
}
```

Se sua versão do Claude Desktop apenas suportar servidores stdio, faça bridge através de `mcp-remote`:

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

Reinicie o Claude Desktop. O ícone do conector no compositor de chat mostrará `b1` com três ferramentas (`list_endpoints`, `describe_endpoint`, `api_call`).

#### Claude.ai (web) — Conector Personalizado

O recurso "Adicionar conector personalizado" do Claude.ai requer OAuth, que o servidor MCP B1 não suporta hoje. Use Claude Code ou Claude Desktop.

### 3. Pergunte algo ao Claude

Uma vez conectado, nenhuma sintaxe especial é necessária — Claude descobre o que está disponível dinamicamente. Exemplos:

- *"Quantas pessoas estão na minha igreja e quais são os grupos ativos?"*
- *"Resuma as doações deste mês por fundo."*
- *"Liste as pessoas que compareceram ao serviço de 10h no domingo passado mas não foram a um grupo de quarta-feira nos últimos 60 dias."*
- *"Rascunhe um email de boas-vindas para as quatro pessoas adicionadas esta semana, dirigindo-se pelo nome."*

Nos bastidores, Claude chamará as ferramentas MCP — primeiro para descobrir o endpoint correto, depois para buscar os dados — e responder em linguagem natural.

## Como Funciona

A API B1 expõe um único endpoint MCP em `/mcp`. Claude se conecta a ele, autentica com sua chave `cak_…`, e ganha acesso a três ferramentas:

| Ferramenta | O que faz |
|---|---|
| `list_endpoints` | Lista os endpoints REST que Claude pode chamar, filtrável por caminho. Usado para descoberta. |
| `describe_endpoint` | Retorna um resumo curto e um exemplo de solicitação/resposta para um endpoint específico. |
| `api_call` | Realmente invoca um endpoint REST como o usuário autenticado. |

Esta é a mesma superfície `/membership/people`, `/giving/donations`, `/attendance/visits` etc. que seu B1Admin usa — cada regra de autorização se aplica identicamente.

## Segurança e Limites

- **Isolamento por igreja.** A chave de API resolve para uma igreja. Claude não tem forma de ver dados de outras igrejas.
- **Escopo de permissão.** Se você remover uma permissão de uma pessoa que criou a chave em B1Admin, Claude a perde na próxima chamada — instantaneamente.
- **Revogável.** Exclua a chave em **Configurações → Desenvolvedor → Chaves de API** e o acesso do Claude termina imediatamente.
- **Lista de bloqueio.** Webhooks de provedor, endpoints de administrador de cliente OAuth, e a rota `apiEmails` reservada ao operador não são chamáveis via MCP.
- **Limite de tamanho de resposta.** Uma resposta de ferramenta única é limitada a 64 KB para que listas longas não explodam o contexto de Claude — Claude estreitará a consulta com filtros quando isso acontecer.
- **Trilha de auditoria.** Mutações passam pelo mesmo log de auditoria que ações de B1Admin; você pode revisá-las em **Relatórios → Log de Auditoria**.

## Custo

ChurchApps é gratuito e de código aberto — o servidor MCP faz parte da API que sua igreja já executa. Anthropic cobra pelo uso de Claude de acordo com seus planos. Não há custo por chamada da ChurchApps.

## Solução de Problemas

**Claude relata "Não autorizado" ou 401:** o token bearer está faltando, malformado, ou a chave foi revogada. Recheck o cabeçalho `Authorization: Bearer cak_…` (note o espaço e o literal `Bearer`).

**Uma chamada de ferramenta retorna 403:** a chave de API não tem o escopo para esse endpoint. Adicione o escopo em **Configurações → Desenvolvedor → Chaves de API** (você precisará criar uma nova chave — escopos não podem ser alterados no local) e atualize a configuração do Claude.

**Claude não consegue encontrar um endpoint:** peça que ele chame `list_endpoints` com um filtro, por ex. *"use list_endpoints com filtro 'donations' para encontrar o caminho certo"*. O inventário de rotas é gerado a partir da API ao vivo, então qualquer coisa que você possa acertar com `curl` está lá.

**Desenvolvimento local:** substitua `https://api.churchapps.org/mcp` por `http://localhost:8084/mcp` — mesma autenticação, mesmas ferramentas.

## Relacionado

- [Chaves de API](/docs/developer/api/api-keys) — referência completa de escopo
- [Servidor MCP (referência de desenvolvedor)](/docs/developer/api/mcp) — detalhes de protocolo e esquemas de ferramenta
- [ChatGPT](./chatgpt) — mesma ideia, para modelos da OpenAI
