---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Conecte o ChatGPT da OpenAI aos dados da sua igreja no B1 e deixe-o fazer o trabalho pesado. Depois de conectado, o ChatGPT pode ver os registros ativos da sua igreja e ajudar você a realizar tarefas que, de outra forma, exigiriam várias etapas no B1 Admin — ou que você nem sabia como fazer.

**Algumas coisas que você pode pedir a ele para fazer:**
- *"Configure as salas da Escola Dominical e coloque cada professor na sala certa com base no seu grupo"*
- *"Mostre-me todos que compareceram na semana passada mas ainda não foram atribuídos a um pequeno grupo"*
- *"Resuma as doações deste mês por fundo"*
- *"Quem são nossos membros mais novos e já entramos em contato com eles?"*
- *"Não consigo descobrir como fazer X no B1 — você pode me guiar ou fazer isso por mim?"*

O ChatGPT busca as respostas e realiza as ações diretamente a partir dos dados do seu B1, restritos apenas à sua igreja.

:::tip Recomendado: Claude Code
Para a experiência MCP mais tranquila, o [Claude Code](./claude) é o cliente recomendado — a configuração leva um único comando e funciona imediatamente. O ChatGPT também funciona e é uma ótima escolha se sua equipe já o utiliza.
:::

Dois caminhos são suportados: o **Conector MCP** (integrado ao ChatGPT) e um **GPT Personalizado** para equipes que desejam um assistente compartilhável.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Um administrador da igreja com a permissão **Edit Settings** no B1 Admin (necessária para criar uma chave de API)
- Uma conta **ChatGPT Plus, Pro, Team ou Enterprise**

</div>

## Guia de Configuração Rápida

Siga estas etapas no **aplicativo desktop do ChatGPT** (Mac/Windows). As telas podem parecer um pouco diferentes em outras versões.

---

**Etapa 1 — Obtenha primeiro sua chave de API no B1 Admin**

Antes de mexer no ChatGPT, crie uma chave de API no B1 Admin para tê-la pronta para colar:

1. Vá para **Settings → Developer → API Keys** no B1 Admin
2. Clique em **New API Key**, nomeie como `ChatGPT`, escolha seus escopos (comece com `people:read`, `groups:read`, `attendance:read`, `donations:read`) e clique em **Save**
3. Copie a chave `cak_…` — ela só é exibida uma vez

---

**Etapa 2 — Clique no seu nome no canto inferior esquerdo do ChatGPT**

![Clique no nome do seu perfil](/img/guides/chatgpt-mcp/01.png)

---

**Etapa 3 — Clique em Settings**

![Clique em Settings no menu](/img/guides/chatgpt-mcp/02.png)

---

**Etapa 4 — Clique em Plugins na barra lateral esquerda**

![Clique em Plugins em Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Etapa 5 — Clique na aba MCPs**

![Clique na aba MCPs](/img/guides/chatgpt-mcp/04.png)

Você verá aqui quaisquer servidores MCP que já tenha adicionado.

---

**Etapa 6 — Clique em Add → Add MCP server**

![Clique em Add e depois em Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Etapa 7 — Preencha o formulário e clique em Save**

![Formulário de conexão a um MCP personalizado](/img/guides/chatgpt-mcp/07.png)

Clique em **Streamable HTTP**, depois preencha:

| Campo | O que digitar |
|---|---|
| **Name** | `B1 Church` (ou qualquer nome de sua preferência) |
| **Type** | Clique em **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Deixe em branco |
| **Headers** | Clique em **+ Add header** → Key: `Authorization` → Value: veja abaixo |

![Exemplo preenchido mostrando Authorization no Key e a chave Bearer no Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_suachave` — a palavra Bearer, um espaço e depois sua chave

Clique em **Save**.

Pronto! Volte para uma conversa e pergunte algo como *"Quantas pessoas há em nossa igreja?"* e o ChatGPT buscará a resposta diretamente do B1.

---

## Etapa 1 — Criar uma Chave de API no B1 Admin

Toda conexão com o B1 usa uma chave de API que você cria. Essa chave identifica sua igreja, controla o que o ChatGPT pode ver e pode ser revogada a qualquer momento.

1. Abra o **B1 Admin** e vá para **Settings → Developer → API Keys**.
2. Clique em **New API Key**.
3. Dê um nome à chave — `ChatGPT` funciona bem.
4. Selecione os escopos (permissões) que o ChatGPT deve ter. Um bom conjunto inicial para um assistente somente leitura:
   - `people:read`
   - `groups:read`
   - `attendance:read`
   - `donations:read`
5. Clique em **Save**.
6. Copie a chave completa exibida — ela começa com `cak_` e é mostrada **apenas uma vez**. Cole-a em algum lugar seguro.

:::tip
Se você precisar revogar o acesso do ChatGPT, volte para **Settings → Developer → API Keys** e exclua a chave. O acesso termina imediatamente.
:::

---

## Caminho A — Conector MCP do ChatGPT (Recomendado)

Esta é a forma mais simples de conectar. O ChatGPT tem um diálogo integrado "Connect to a custom MCP" que funciona diretamente com o servidor MCP do B1 — sem necessidade de GPT Personalizado.

### O que você precisa

- Sua chave `cak_…` da Etapa 1

### Abra o conector MCP no ChatGPT

No ChatGPT, vá para **Settings → Plugins → MCPs** e clique em **Add → Add MCP server**.

### Preencha o diálogo

Clique em **Streamable HTTP**, depois use estes valores:

| Campo | Valor |
|---|---|
| **Name** | `B1 Church` (ou qualquer nome de sua preferência) |
| **Type** | **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Deixe em branco |
| **Headers** | Key: `Authorization` / Value: `Bearer cak_seuprefixo.seusegredo` |

No campo Value, digite a palavra `Bearer`, um espaço, depois cole sua chave — tudo na mesma caixa. Exemplo: `Bearer cak_prefixo.segredo`.

Clique em **Save**.

### Pergunte algo ao ChatGPT

Uma vez conectado, basta perguntar em linguagem natural — não são necessários comandos especiais:

- *"Quantas pessoas há em nossa igreja?"*
- *"Quem entrou nos últimos 30 dias?"*
- *"Quais grupos estão ativos no momento?"*
- *"Resuma as doações deste mês por fundo."*

O ChatGPT chamará o B1 nos bastidores e responderá com base nos seus dados ativos.

---

## Caminho B — GPT Personalizado com Actions

Um GPT Personalizado permite criar um assistente dedicado que toda a sua equipe pode compartilhar — eles abrem um link e começam a fazer perguntas sem nenhuma configuração de sua parte. Requer uma conta ChatGPT Plus, Team ou Enterprise e cerca de 10 minutos.

### 1. Crie uma chave de API

Siga a Etapa 1 acima se ainda não o fez.

### 2. Construa o GPT Personalizado

1. No ChatGPT, clique no seu perfil → **My GPTs** → **Create a GPT**.
2. Mude para a aba **Configure**, dê um nome ao GPT (por exemplo, "B1 Assistant") e adicione instruções:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Role até **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** cole sua chave `cak_…`
   - **Auth Type:** Bearer
   - Salve.

4. Na caixa **Schema**, cole este esquema OpenAPI inicial:

   ```yaml
   openapi: 3.1.0
   info:
     title: B1 API
     version: "1.0"
   servers:
     - url: https://api.churchapps.org
   paths:
     /membership/people:
       get:
         operationId: listPeople
         summary: List people in the church
         parameters:
           - in: query
             name: firstName
             schema: { type: string }
           - in: query
             name: lastName
             schema: { type: string }
           - in: query
             name: email
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/people/{id}:
       get:
         operationId: getPerson
         summary: Get a single person by id
         parameters:
           - in: path
             name: id
             required: true
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/groups:
       get:
         operationId: listGroups
         summary: List groups in the church
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: List donations
         parameters:
           - in: query
             name: personId
             schema: { type: string }
           - in: query
             name: startDate
             schema: { type: string, format: date }
           - in: query
             name: endDate
             schema: { type: string, format: date }
         responses:
           "200":
             description: OK
     /attendance/attendance:
       get:
         operationId: listAttendance
         summary: List attendance records
         parameters:
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: campusId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. Salve a action. Teste-a: *"quantas pessoas há na igreja?"* — o ChatGPT chama `listPeople` e responde.
6. **Publique** o GPT (Only me / Anyone with link / Organization) e compartilhe o link com sua equipe.

### 3. Use-o

Qualquer pessoa com o link pode fazer perguntas em linguagem natural. Os escopos da chave continuam se aplicando — uma chave somente leitura recusa gravações independentemente do que o esquema da action diga.

---

## Segurança e Limites

- **Isolamento por igreja.** A chave de API se resolve para uma única igreja. O ChatGPT não pode ver dados de outras igrejas.
- **Restrito por permissão.** A chave carrega apenas os escopos que você concedeu. Remover um escopo (excluindo e recriando a chave) corta esse acesso na próxima chamada.
- **Revogável instantaneamente.** Exclua a chave em **Settings → Developer → API Keys** e o acesso termina imediatamente.
- **Compartilhar um GPT Personalizado compartilha os dados.** Todos com acesso ao GPT podem ver o que os escopos da chave permitirem. Prefira escopos mais restritos (por exemplo, omita `donations:read`) para GPTs compartilhados amplamente.
- **Trilha de auditoria.** Quaisquer alterações feitas pelo ChatGPT passam pelo mesmo log de auditoria das ações do B1 Admin — encontre-as em **Reports → Audit Log**.

## Custo

O ChurchApps é gratuito e de código aberto — a API que o ChatGPT chama faz parte do que sua igreja já executa. A OpenAI cobra pelo uso do ChatGPT conforme seus próprios planos. Não há custo por chamada por parte do ChurchApps.

## Solução de Problemas

**O conector MCP diz "Unauthorized" ou mostra um erro 401:** sua chave de API está ausente ou incorreta. Abra as configurações do conector e verifique se a chave no argumento `Authorization:Bearer` é o valor `cak_…` completo, sem espaços extras.

**O ChatGPT diz que não consegue encontrar certos dados:** a chave pode não ter os escopos corretos. Crie uma nova chave em **Settings → Developer → API Keys** com os escopos adicionais e atualize o conector.

**O comando `npx` falha:** o Node.js pode não estar instalado. Baixe e instale-o em [nodejs.org](https://nodejs.org), depois tente salvar o conector novamente.

**A action do GPT Personalizado retorna 401:** no painel de autenticação da action, confirme que **Auth Type: Bearer** está selecionado e que a chave não inclui a palavra `Bearer` (o ChatGPT a adiciona automaticamente).

**A action do GPT Personalizado retorna 403:** a chave não tem o escopo para esse endpoint. Crie uma nova chave com os escopos corretos e atualize o GPT.

**O esquema da action é rejeitado:** o ChatGPT requer OpenAPI 3.1 com pelo menos uma entrada `paths` e uma URL `servers`. Valide o YAML em [editor.swagger.io](https://editor.swagger.io) antes de colar.

## Relacionados

- [API Keys](/docs/developer/api/api-keys) — referência completa de escopos
- [MCP Server (referência para desenvolvedores)](/docs/developer/api/mcp) — detalhes do protocolo e esquemas de ferramentas
- [Claude](./claude) — mesma ideia, para os modelos da Anthropic
- [Referência da API REST](/docs/developer/api/endpoints) — todo endpoint que uma action do GPT Personalizado pode chamar
