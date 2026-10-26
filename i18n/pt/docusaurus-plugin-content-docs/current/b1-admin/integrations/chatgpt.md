---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Conecte o ChatGPT aos dados da sua igreja no B1 e faça perguntas em linguagem simples — ele responde com base nos registros atualizados da sua igreja. Você também pode pedir ajuda para tarefas que exigiriam vários passos no B1 Admin.

**Algumas coisas que você pode perguntar:**
- *"Mostre todas as pessoas que vieram no culto da semana passada, mas ainda não foram designadas a um pequeno grupo"*
- *"Resuma as doações deste mês por fundo"*
- *"Quem são nossos membros mais recentes e já fizemos algum acompanhamento com eles?"*
- *"Não consigo descobrir como fazer X no B1 — pode me explicar passo a passo?"*

</div>

<div class="prereqs">
<h4>O que você precisa</h4>

- **O aplicativo de computador do ChatGPT** para Mac ou Windows
- **Um plano pago do ChatGPT** (Plus ou superior). Contas gratuitas do ChatGPT não podem se conectar ao B1.
- **Seu login do B1** com permissão para gerenciar as configurações da igreja (necessário para criar uma chave). Não tem? Peça ao administrador do B1 da sua igreja.

</div>

:::tip Recomendado: experimente o Claude primeiro — é gratuito
[Claude](./claude) se conecta ao B1 no **plano gratuito** e leva menos de 3 minutos para configurar — basta adicionar o B1 como conector e entrar com sua conta do B1. Não é preciso chave. É a forma mais fácil de sua igreja experimentar a IA com o B1 antes de pagar por qualquer coisa.
:::

## Configurando

As telas podem parecer um pouco diferentes na sua versão do ChatGPT.

---

**Passo 1 — Crie sua chave do B1**

A chave é o que permite ao ChatGPT acessar o B1 *da sua igreja* — pense nela como uma senha exclusiva para o ChatGPT.

1. Entre no [B1 Admin](https://admin.b1.church) e acesse [Configurações → Desenvolvedor](https://admin.b1.church/settings/developer).
2. Na aba **API Keys**, clique em **New API Key** e dê o nome `ChatGPT`.
3. **Escopos:** marque o que o ChatGPT pode fazer. Cada área tem uma caixa **read** (somente leitura) e uma caixa **write** (fazer alterações). Não tem certeza? Marque apenas as caixas **read** para começar.
4. Clique em **Save**, depois em **Copy** para copiar a chave (ela começa com `cak_`). Ela só é mostrada uma vez.

---

**Passo 2 — Clique no seu nome no canto inferior esquerdo do ChatGPT**

![Clique no nome do seu perfil](/img/guides/chatgpt-mcp/01.png)

---

**Passo 3 — Clique em Settings**

![Clique em Settings no menu](/img/guides/chatgpt-mcp/02.png)

---

**Passo 4 — Clique em Plugins na barra lateral esquerda**

![Clique em Plugins em Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Passo 5 — Clique na aba MCPs**

![Clique na aba MCPs](/img/guides/chatgpt-mcp/04.png)

Você verá aqui quaisquer servidores MCP que já tiver adicionado.

---

**Passo 6 — Clique em Add → Add MCP server**

![Clique em Add e depois em Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Passo 7 — Preencha o formulário e clique em Save**

![Formulário para conectar um MCP personalizado](/img/guides/chatgpt-mcp/07.png)

Clique em **Streamable HTTP** e depois preencha:

| Campo | O que informar |
|---|---|
| **Name** | `B1 Church` (ou qualquer nome que preferir) |
| **Type** | Clique em **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Deixe em branco |
| **Headers** | Clique em **+ Add header** → Key: `Authorization` → Value: veja abaixo |

![Exemplo preenchido mostrando Authorization na Key e a chave Bearer no Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_suachave` — a palavra Bearer, um espaço e a sua chave

Clique em **Save**.

Pronto! Volte a um chat e pergunte algo como *"Quantas pessoas fazem parte da nossa igreja?"* e o ChatGPT buscará a resposta diretamente no B1.

---

## É seguro?

- O ChatGPT só consegue ver os dados **da sua igreja**.
- Ele só pode fazer o que a sua chave permite — uma chave com apenas as caixas **read** marcadas pode consultar, mas nunca alterar nada.
- Para desativar o acesso, exclua a chave no B1 Admin em **Configurações → Desenvolvedor**. O acesso para imediatamente.

## Quanto custa?

A conexão com o B1 é gratuita — faz parte da ChurchApps. O ChatGPT exige um plano pago (Plus ou superior) para se conectar; veja os preços da OpenAI.

## Detalhes técnicos

O restante desta página é para usuários técnicos e assistentes de IA. O servidor MCP do B1 fica em `https://api.churchapps.org/mcp` (Streamable HTTP) e recebe a chave de API como um cabeçalho `Authorization: Bearer cak_…`. Veja a [referência do servidor MCP para desenvolvedores](/docs/developer/api/mcp).

### GPT personalizado com Actions

Um GPT personalizado permite criar um assistente dedicado que toda a sua equipe pode compartilhar — as pessoas abrem um link e começam a fazer perguntas sem nenhuma configuração do lado delas. Ele exige uma conta ChatGPT Plus, Team ou Enterprise e cerca de 10 minutos.

#### 1. Crie uma chave de API

Siga o Passo 1 de Configurando acima, caso ainda não tenha feito isso.

#### 2. Crie o GPT personalizado

1. No ChatGPT, clique no seu perfil → **My GPTs** → **Create a GPT**.
2. Acesse a aba **Configure**, dê um nome ao GPT (por exemplo, "Assistente B1") e adicione as instruções:

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

4. Na caixa **Schema**, cole esta especificação OpenAPI inicial:

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

5. Salve a action. Teste perguntando: *"quantas pessoas há na igreja?"* — o ChatGPT chama `listPeople` e responde.
6. **Publique** o GPT (Somente eu / Qualquer pessoa com o link / Organização) e compartilhe o link com a sua equipe.

#### 3. Use

Qualquer pessoa com o link pode fazer perguntas em linguagem natural. Os escopos da chave continuam valendo — uma chave somente leitura recusa gravações, independentemente do que o schema da action diga.

---

### Segurança e limites

- **Isolamento por igreja.** A chave de API corresponde a uma única igreja. O ChatGPT não consegue ver os dados de outras igrejas.
- **Restrito por permissões.** A chave só carrega os escopos que você concedeu. Remover um escopo (excluindo e recriando a chave) corta esse acesso na próxima chamada.
- **Revogável a qualquer momento.** Exclua a chave em **Configurações → Desenvolvedor → API Keys** e o acesso termina imediatamente.
- **Compartilhar um GPT personalizado compartilha os dados.** Todos com acesso ao GPT podem ver o que os escopos da chave permitirem. Prefira escopos mais restritos (por exemplo, omita `donations:read`) para GPTs compartilhados amplamente.
- **Trilha de auditoria.** Quaisquer alterações feitas pelo ChatGPT passam pelo mesmo log de auditoria das ações do B1 Admin — encontre-as em **Configurações → Log de auditoria**.

### Solução de problemas

**O conector MCP mostra "Unauthorized" ou exibe um erro 401:** sua chave de API está ausente ou incorreta. Abra as configurações do conector e verifique o cabeçalho **Authorization**: o valor deve ser a palavra `Bearer`, um espaço e a chave `cak_…` completa, sem espaços extras.

**O ChatGPT diz que não consegue encontrar determinados dados:** a chave pode não ter os escopos corretos. Crie uma nova chave em **Configurações → Desenvolvedor → API Keys** com os escopos adicionais e atualize o conector.

**A action do GPT personalizado retorna 401:** no painel de autenticação da action, confirme que **Auth Type: Bearer** está selecionado e que a chave não inclui a palavra `Bearer` (o ChatGPT a adiciona automaticamente).

**A action do GPT personalizado retorna 403:** a chave não tem o escopo necessário para aquele endpoint. Crie uma nova chave com os escopos corretos e atualize o GPT.

**O schema da action é rejeitado:** o ChatGPT exige OpenAPI 3.1 com pelo menos uma entrada em `paths` e uma URL em `servers`. Valide o YAML em [editor.swagger.io](https://editor.swagger.io) antes de colar.

## Relacionados

- [Chaves de API](/docs/developer/api/api-keys) — referência completa de escopos
- [Servidor MCP (referência para desenvolvedores)](/docs/developer/api/mcp) — detalhes do protocolo e esquemas das ferramentas
- [Claude](./claude) — a mesma ideia, para os modelos da Anthropic
- [Referência da API REST](/docs/developer/api/endpoints) — todos os endpoints que uma action de GPT personalizado pode chamar
