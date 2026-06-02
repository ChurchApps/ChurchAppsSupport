---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Conecte o ChatGPT da OpenAI aos dados de sua B1 da igreja para poder fazer perguntas como "quem não esteve em um grupo este trimestre?" ou "resuma as doações para o fundo de construção este mês" e ter ChatGPT extrair as respostas diretamente de B1. Dois caminhos são suportados: um **GPT Personalizado** que funciona em qualquer plano ChatGPT Plus e o **servidor MCP** para ferramentas de desenvolvedor que o suportam.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Um administrador de igreja com a permissão **Editar Configurações** (para criar uma chave de API)
- Uma conta **ChatGPT Plus, Pro, Team ou Enterprise** (o plano gratuito não pode usar GPTs Personalizados ou Conectores)
- A URL completa de sua API B1 — geralmente `https://api.churchapps.org` para igrejas hospedadas, ou seu host Api auto-hospedado

</div>

## Escolha o Caminho Correto

| Caminho | Plano necessário | Esforço | O que você obtém |
|---|---|---|---|
| **GPT Personalizado com Ações** | ChatGPT Plus / Team / Enterprise | 10 minutos | Um GPT compartilhável que chama a API REST de B1 para qualquer membro da equipe usar |
| **MCP via ferramentas OpenAI** | Developer / Agent SDK / Pro Connectors | Mais | Descoberta completa via servidor MCP, adequado para ferramentas de codificação e plataformas de agentes |

Para a maioria das igrejas, o caminho **GPT Personalizado** é a resposta certa — não requer configuração de desenvolvedor, funciona dentro do aplicativo ChatGPT regular e clientes móveis, e pode ser compartilhado com sua equipe. O caminho MCP é documentado abaixo para equipes técnicas usando ferramentas de desenvolvedor OpenAI ou plataformas de agentes.

## Caminho A — GPT Personalizado com Ações

Isso conecta ChatGPT diretamente à API REST de B1. Seu GPT Personalizado será capaz de ler e (opcionalmente) escrever registros B1 em nome de qualquer pessoa que o usar.

### 1. Crie uma chave de API

1. Na B1Admin vá para **Configurações → Desenvolvedor → Chaves de API**.
2. Clique em **Nova Chave de API**, nomeie-a `ChatGPT` e escolha escopos. Conjuntos iniciais comuns:
   - **Assistente somente leitura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`
   - **Leitura + escrita:** adicione os escopos correspondentes `:write`
3. Salve e copie a chave completa `cak_…`.

Consulte [Chaves de API](/docs/developer/api/api-keys) para a lista completa de escopos.

### 2. Construa o GPT Personalizado

1. No ChatGPT, clique em seu perfil → **Meus GPTs** → **Criar um GPT**.
2. Alterne para a aba **Configurar** e dê ao GPT um nome (por exemplo, "Assistente B1") e instruções como:

   Você ajuda o pessoal da igreja a consultar seus registros B1. Use as ações da API B1 para procurar pessoas, grupos, presença, doações e conteúdo. Sempre escopo as respostas aos dados que o usuário tem permissão para ver. Seja conciso.

3. Role até **Ações** → **Criar nova ação** → **Autenticação**.
   - **Tipo de autenticação:** Chave de API
   - **Chave de API:** `cak_<prefixo>.<segredo>`
   - **Tipo de Autenticação:** Bearer
   - Salve.
4. Na caixa **Schema**, cole uma especificação OpenAPI mínima descrevendo os endpoints que você deseja que o GPT use. Um iniciante que cobre as leituras mais comuns:

5. Salve a ação. Teste-a com uma solicitação como "quantas pessoas estão na igreja?" — ChatGPT chamará `listPeople` e responderá.
6. **Publique** o GPT (Apenas eu / Qualquer um com link / Organização) e compartilhe com sua equipe.

### 3. Use-o

Qualquer pessoa com quem você compartilhar o GPT pode fazer perguntas em linguagem natural — ChatGPT escolhe a ação certa, chama B1 e responde. Os escopos da chave ainda se aplicam: uma chave somente leitura recusará gravações independentemente da ação definida no schema.

## Caminho B — MCP via ferramentas OpenAI

A API B1 inclui um servidor MCP em `/mcp` que qualquer ferramenta OpenAI consciente de MCP pode usar — por exemplo o OpenAI Agents SDK, a ferramenta MCP da Responses API ou plataformas de agentes de terceiros que consomem servidores MCP.

Autentique com a mesma chave `cak_…` no cabeçalho `Authorization: Bearer`. Três ferramentas são expostas: `list_endpoints`, `describe_endpoint` e `api_call`. Consulte a [referência de desenvolvedor do Servidor MCP](/docs/developer/api/mcp) para o protocolo, transporte e schemas de ferramentas.

Os "Conectores" integrados do ChatGPT (Pro/Business/Enterprise) atualmente esperam servidores MCP com formas específicas de ferramentas `search` e `fetch` e autenticação baseada em OAuth, que o servidor MCP B1 não anuncia. Para ChatGPT dentro do aplicativo de consumidor, o caminho GPT Personalizado acima é a escolha prática.

## Segurança e Limites

- **Isolamento por igreja.** A chave de API resolve para uma igreja. ChatGPT não pode ver dados de outras igrejas.
- **Com escopo de permissão.** Se você remover uma permissão da pessoa que criou a chave, ChatGPT a perde na próxima chamada — instantaneamente.
- **Revogável.** Exclua a chave em **Configurações → Desenvolvedor → Chaves de API** e o acesso do ChatGPT termina imediatamente.
- **Compartilhar um GPT Personalizado compartilha os dados.** Qualquer pessoa com acesso ao GPT pode fazer perguntas e ver qualquer coisa para a qual a chave tem escopos. Limite o compartilhamento ao pessoal que deveria ver esses dados e prefira escopos mais estreitos (por exemplo, omita `donations:read` para um GPT compartilhado amplamente).
- **Trilha de auditoria.** As mutações passam pelo mesmo log de auditoria que ações B1Admin; revise-as sob **Relatórios → Log de Auditoria**.

## Custo

ChurchApps é gratuito e de código aberto — a API que seu GPT Personalizado chama faz parte da API que sua igreja já executa. OpenAI cobra pelo uso do ChatGPT de acordo com seus planos. Não há custo por chamada do ChurchApps.

## Solução de Problemas

**A ação retorna 401:** o cabeçalho do portador não está definido corretamente. No painel de autenticação da ação, certifique-se de que **Auth Type: Bearer** está selecionado e o valor da chave não inclui a palavra `Bearer` (ChatGPT o antecede para você).

**A ação retorna 403:** a chave não tem o escopo para esse endpoint. Crie uma nova chave com os escopos certos e atualize o GPT.

**ChatGPT chama a ação errada:** aperte os campos `summary` e `description` em seu schema OpenAPI para que o modelo escolha o certo. Adicionar consultas de exemplo às instruções do GPT também ajuda.

**O painel de ação rejeita o schema:** ChatGPT requer OpenAPI 3.1 com pelo menos uma entrada `paths` e uma URL `servers`. Valide o YAML em qualquer validador OpenAPI online antes de colar.

**Desenvolvimento local:** aponte a URL `servers` da ação para sua Api local (por exemplo, `http://localhost:8084`) — mas observe que as ações do ChatGPT apenas chamam URLs públicas, então para testes locais use um túnel como `ngrok` ou acesse a API diretamente com `curl` para confirmar a chave primeiro.

## Relacionado

- [Chaves de API](/docs/developer/api/api-keys) — referência completa de escopo
- [Servidor MCP (referência de desenvolvedor)](/docs/developer/api/mcp) — detalhes de protocolo e schemas de ferramentas
- [Claude](./claude) — mesma ideia, para os modelos de Anthropic
- [Referência da API REST](/docs/developer/api/endpoints) — cada endpoint que uma ação GPT Personalizado pode alcançar
