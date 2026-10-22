---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Conecte o ChatGPT aos dados do B1 da sua igreja e faça perguntas em linguagem simples — ele responde a partir dos registros da sua igreja em tempo real. Você também pode pedir ajuda com tarefas que levariam vários passos no B1 Admin.

**Algumas coisas que você pode perguntar:**
- *"Mostre-me todos que compareceram na semana passada mas não foram designados a um pequeno grupo"*
- *"Resuma as doações deste mês por fundo"*
- *"Quem são nossos membros mais novos e já fizemos acompanhamento com eles?"*
- *"Não consigo descobrir como fazer X no B1 — pode me guiar?"*

</div>

<div class="prereqs">
<h4>O Que Você Precisa</h4>

- **O aplicativo ChatGPT para desktop** para Mac ou Windows
- **Um plano pago do ChatGPT** (Plus ou superior). Contas gratuitas do ChatGPT não podem se conectar ao B1.
- **Seu login do B1** com permissão para gerenciar as configurações da igreja (necessária para criar uma chave). Não tem? Peça ao administrador do B1 da sua igreja.

</div>

:::tip Recomendado: experimente o Claude primeiro — é grátis
O [Claude](./claude) se conecta ao B1 no **plano gratuito** e é configurado em menos de 3 minutos — basta adicionar o B1 como conector e fazer login com sua conta do B1. Nenhuma chave necessária. É a forma mais fácil de sua igreja experimentar a IA com o B1 antes de pagar por qualquer coisa.
:::

## Configuração

As telas podem parecer ligeiramente diferentes na sua versão do ChatGPT.

---

**Etapa 1 — Crie sua chave do B1**

A chave é o que permite ao ChatGPT entrar no B1 da *sua* igreja — pense nela como uma senha só para o ChatGPT.

1. Faça login no [B1 Admin](https://admin.b1.church) e vá para [Configurações → Desenvolvedor](https://admin.b1.church/settings/developer).
2. Na aba **Chaves de API**, clique em **Nova Chave de API** e dê a ela o nome `ChatGPT`.
3. **Escopos:** marque o que o ChatGPT pode fazer. Cada área tem uma caixa **read** (apenas ver) e uma caixa **write** (fazer alterações). Não tem certeza? Marque apenas as caixas **read** para começar.
4. Clique em **Salvar** e depois em **Copiar** a chave (ela começa com `cak_`). Ela é mostrada apenas uma vez.

---

**Etapa 2 — Clique em seu nome no canto inferior esquerdo do ChatGPT**

![Clique em seu nome de perfil](/img/guides/chatgpt-mcp/01.png)

---

**Etapa 3 — Clique em Settings (Configurações)**

![Clique em Settings no menu](/img/guides/chatgpt-mcp/02.png)

---

**Etapa 4 — Clique em Plugins na barra lateral esquerda**

![Clique em Plugins em Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Etapa 5 — Clique na guia MCPs**

![Clique na guia MCPs](/img/guides/chatgpt-mcp/04.png)

Aqui você verá qualquer servidor MCP que já tenha adicionado.

---

**Etapa 6 — Clique em Add → Add MCP server (Adicionar servidor MCP)**

![Clique em Add e depois em Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Etapa 7 — Preencha o formulário e clique em Save (Salvar)**

![Formulário para conectar a um MCP personalizado](/img/guides/chatgpt-mcp/07.png)

Clique em **Streamable HTTP** e depois preencha:

| Campo | O que inserir |
|---|---|
| **Name** | `B1 Church` (ou qualquer nome que você quiser) |
| **Type** | Clique em **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Deixe em branco |
| **Headers** | Clique em **+ Add header** → Key: `Authorization` → Value: veja abaixo |

![Exemplo preenchido mostrando Authorization em Key e a chave Bearer em Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — a palavra Bearer, um espaço, depois sua chave

Clique em **Save** (Salvar).

Pronto! Volte para um chat e pergunte algo como *"Quantas pessoas há em nossa igreja?"* e o ChatGPT buscará a resposta direto do B1.

---

## É Seguro?

- O ChatGPT só pode ver os dados da **sua igreja**.
- Ele só pode fazer o que sua chave permite — uma chave com apenas as caixas **read** marcadas pode ver, mas nunca alterar nada.
- Para desligar, exclua a chave no B1 Admin em **Configurações → Desenvolvedor**. O acesso para na hora.

## Quanto Custa?

A conexão com o B1 é gratuita — faz parte do ChurchApps. O ChatGPT precisa de um plano pago (Plus ou superior) para se conectar; veja os preços da OpenAI.

## Detalhes Técnicos

O restante desta página é para usuários técnicos e assistentes de IA. O servidor MCP do B1 fica em `https://api.churchapps.org/mcp` (Streamable HTTP) e recebe a chave de API como um cabeçalho `Authorization: Bearer cak_…`. Veja a [referência de desenvolvedor do Servidor MCP](/docs/developer/api/mcp).

### GPT personalizado com Actions

Um GPT personalizado permite que você crie um assistente dedicado que toda a sua equipe pode compartilhar — eles abrem um link e começam a fazer perguntas sem nenhuma configuração do lado deles. Requer uma conta ChatGPT Plus, Team ou Enterprise e cerca de 10 minutos.

#### 1. Crie uma chave de API

Siga a Etapa 1 de Configuração acima, se ainda não o fez.

#### 2. Construa o GPT personalizado

1. No ChatGPT, clique no seu perfil → **My GPTs** → **Create a GPT**.
2. Mude para a aba **Configure**, dê um nome ao GPT (p.ex. "B1 Assistant") e adicione instruções:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Desça até **Actions** → **Create new action** → **Authentication**.
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

5. Salve a ação. Teste: *"quantas pessoas há na igreja?"* — o ChatGPT chama `listPeople` e responde.
6. Use **Publish** (Publicar) no GPT (Only me / Anyone with link / Organization) e compartilhe o link com sua equipe.

#### 3. Use-o

Qualquer pessoa com o link pode fazer perguntas em linguagem natural. Os escopos da chave continuam valendo — uma chave somente leitura recusa gravações independentemente do que o schema da ação diga.

---

### Segurança e limites

- **Isolamento por igreja.** A chave de API corresponde a uma única igreja. O ChatGPT não pode ver dados de outras igrejas.
- **Escopo de permissão.** A chave carrega apenas os escopos que você concedeu. Remover um escopo (excluindo e recriando a chave) corta esse acesso na próxima chamada.
- **Revogável instantaneamente.** Exclua a chave em **Configurações → Desenvolvedor → Chaves de API** e o acesso termina imediatamente.
- **Compartilhar um GPT personalizado compartilha os dados.** Todos com acesso ao GPT podem ver o que os escopos da chave permitirem. Prefira escopos mais restritos (p.ex. omita `donations:read`) para GPTs compartilhados amplamente.
- **Trilha de auditoria.** Quaisquer alterações feitas através do ChatGPT passam pelo mesmo log de auditoria que as ações do B1 Admin — encontre-as em **Configurações → Log de Auditoria**.

### Solução de problemas

**O conector MCP diz "Unauthorized" ou mostra um erro 401:** sua chave de API está faltando ou incorreta. Abra as configurações do conector e verifique o cabeçalho **Authorization**: o valor deve ser a palavra `Bearer`, um espaço, depois a chave `cak_…` completa, sem espaços extras.

**O ChatGPT diz que não consegue encontrar certos dados:** a chave pode não ter os escopos certos. Crie uma nova chave em **Configurações → Desenvolvedor → Chaves de API** com os escopos adicionais e atualize o conector.

**A ação do GPT personalizado retorna 401:** no painel de autenticação da ação, confirme que **Auth Type: Bearer** está selecionado e que a chave não inclui a palavra `Bearer` (o ChatGPT a adiciona automaticamente).

**A ação do GPT personalizado retorna 403:** a chave não tem o escopo para esse endpoint. Crie uma nova chave com os escopos corretos e atualize o GPT.

**O schema da ação é rejeitado:** o ChatGPT exige OpenAPI 3.1 com pelo menos uma entrada em `paths` e uma URL em `servers`. Valide o YAML em [editor.swagger.io](https://editor.swagger.io) antes de colar.

## Relacionado

- [Chaves de API](/docs/developer/api/api-keys) — referência completa de escopos
- [Servidor MCP (referência de desenvolvedor)](/docs/developer/api/mcp) — detalhes do protocolo e esquemas de ferramentas
- [Claude](./claude) — mesma ideia, para os modelos da Anthropic
- [Referência da API REST](/docs/developer/api/endpoints) — cada endpoint que uma ação de GPT personalizado pode chamar
