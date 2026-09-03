---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Conecte ChatGPT da OpenAI aos dados de B1 de sua igreja e deixe-o fazer o trabalho pesado. Uma vez conectado, o ChatGPT pode ver seus registros de igreja em tempo real e ajudá-lo a realizar tarefas que de outra forma levariam vários passos no B1 Admin — ou que você não conseguiria descobrir como fazer.

**Algumas coisas que você pode pedir para fazer:**
- *"Configure salas de aula de Escola Bíblica Dominical e coloque cada professor na sala certa com base em seu grupo"*
- *"Mostre-me todos que compareceram na semana passada mas não foram designados a um pequeno grupo"*
- *"Resuma as doações deste mês por fundo"*
- *"Quem são nossos membros mais novos e fizemos acompanhamento com eles?"*
- *"Não consigo descobrir como fazer X em B1 — pode me guiar ou fazer para mim?"*

ChatGPT extrai as respostas e realiza as ações diretamente de seus dados de B1, com escopo apenas para sua igreja.

:::tip Recomendado: Claude Code
Para a experiência mais suave com MCP, [Claude Code](./claude) é o cliente recomendado — a configuração leva um comando e funciona fora da caixa. O ChatGPT também funciona e é uma ótima escolha se sua equipe já está usando.
:::

Dois caminhos são suportados: o **Conector MCP** (integrado no ChatGPT) e um **GPT personalizado** para equipes que querem um assistente compartilhável.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Um administrador de igreja com a permissão **Editar configurações** no B1 Admin (necessária para criar uma chave API)
- Uma conta **ChatGPT Plus, Pro, Team ou Enterprise**

</div>

## Guia de configuração rápida

Siga essas etapas no **aplicativo de desktop do ChatGPT** (Mac/Windows). As telas podem parecer ligeiramente diferentes em outras versões.

---

**Etapa 1 — Obtenha sua chave API do B1 Admin primeiro**

Antes de tocar no ChatGPT, crie uma chave API no B1 Admin para tê-la pronta para colar:

1. Vá para **Configurações → Desenvolvedor → Chaves API** no B1 Admin
2. Clique em **Nova chave API**, nomeie como `ChatGPT`, escolha seus escopos (comece com `people:read`, `groups:read`, `attendance:read`, `donations:read`) e clique em **Salvar**
3. Copie a chave `cak_…` — é mostrada apenas uma vez

---

**Etapa 2 — Clique em seu nome no canto inferior esquerdo do ChatGPT**

![Clique em seu nome de perfil](/img/guides/chatgpt-mcp/01.png)

---

**Etapa 3 — Clique em Configurações**

![Clique em Configurações do menu](/img/guides/chatgpt-mcp/02.png)

---

**Etapa 4 — Clique em Plugins na barra lateral esquerda**

![Clique em Plugins em Integrações](/img/guides/chatgpt-mcp/03.png)

---

**Etapa 5 — Clique na guia MCPs**

![Clique na guia MCPs](/img/guides/chatgpt-mcp/04.png)

Você verá qualquer servidor MCP que já adicionou aqui.

---

**Etapa 6 — Clique em Adicionar → Adicionar servidor MCP**

![Clique em Adicionar e depois em Adicionar servidor MCP](/img/guides/chatgpt-mcp/06.png)

---

**Etapa 7 — Preencha o formulário e clique em Salvar**

![Conectar a um formulário MCP personalizado](/img/guides/chatgpt-mcp/07.png)

Clique em **HTTP Transmissível**, depois preencha:

| Campo | O que inserir |
|---|---|
| **Nome** | `B1 Church` (ou qualquer nome que você goste) |
| **Tipo** | Clique em **HTTP Transmissível** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Variável de env do token portador** | Deixe em branco |
| **Headers** | Clique em **+ Adicionar header** → Chave: `Authorization` → Valor: veja abaixo |

![Exemplo preenchido mostrando Autorização em Chave e chave Portador em Valor](/img/guides/chatgpt-mcp/08.png)

- **Chave:** `Authorization`
- **Valor:** `Bearer cak_suachave` — a palavra Bearer, um espaço, depois sua chave

Clique em **Salvar**.

Pronto! Volte para um chat e pergunte algo como *"Quantas pessoas estão em nossa igreja?"* e ChatGPT extrairá a resposta direto de B1.

---

## Etapa 1 — Crie uma chave API no B1 Admin

Cada conexão com B1 usa uma chave API que você cria. Esta chave identifica sua igreja, controla o que ChatGPT pode ver e pode ser revogada a qualquer momento.

1. Abra **B1 Admin** e vá para **Configurações → Desenvolvedor → Chaves API**.
2. Clique em **Nova chave API**.
3. Dê à chave um nome — `ChatGPT` funciona bem.
4. Selecione os escopos (permissões) que ChatGPT deve ter. Um bom conjunto inicial para um assistente somente leitura:
   - `people:read`
   - `groups:read`
   - `attendance:read`
   - `donations:read`
5. Clique em **Salvar**.
6. Copie a chave completa que aparece — começa com `cak_` e é mostrada **apenas uma vez**. Cole em algum lugar seguro.

:::tip
Se você precisar revogar o acesso do ChatGPT, volte para **Configurações → Desenvolvedor → Chaves API** e delete a chave. O acesso termina imediatamente.
:::

---

## Caminho A — Conector MCP ChatGPT (Recomendado)

Esta é a maneira mais simples de conectar. ChatGPT tem um diálogo "Conectar a um MCP personalizado" integrado que funciona diretamente com o servidor MCP de B1 — sem necessidade de GPT personalizado.

### O que você precisa

- Sua chave `cak_…` da etapa 1

### Abra o conector MCP no ChatGPT

No ChatGPT, vá para **Configurações → Plugins → MCPs** e clique em **Adicionar → Adicionar servidor MCP**.

### Preencha o diálogo

Clique em **HTTP Transmissível**, depois use estes valores:

| Campo | Valor |
|---|---|
| **Nome** | `B1 Church` (ou qualquer nome que você goste) |
| **Tipo** | **HTTP Transmissível** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Variável de env do token portador** | Deixe em branco |
| **Headers** | Chave: `Authorization` / Valor: `Bearer cak_seuprefixo.seusegredo` |

No campo Valor, digite a palavra `Bearer`, um espaço, depois cole sua chave — tudo na mesma caixa. Exemplo: `Bearer cak_prefixo.segredo`.

Clique em **Salvar**.

### Pergunte algo ao ChatGPT

Uma vez conectado, apenas pergunte em linguagem natural — nenhum comando especial necessário:

- *"Quantas pessoas estão em nossa igreja?"*
- *"Quem se inscreveu nos últimos 30 dias?"*
- *"Quais grupos estão ativos agora?"*
- *"Resuma as doações deste mês por fundo."*

ChatGPT chamará B1 nos bastidores e responderá de seus dados ao vivo.

---

## Caminho B — GPT personalizado com ações

Um GPT personalizado permite que você crie um assistente dedicado que toda sua equipe pode compartilhar — eles abrem um link e começam a fazer perguntas sem nenhuma configuração. Requer uma conta ChatGPT Plus, Team ou Enterprise e cerca de 10 minutos.

### 1. Crie uma chave API

Siga a Etapa 1 acima se ainda não o fez.

### 2. Construa o GPT personalizado

1. No ChatGPT, clique no seu perfil → **Meus GPTs** → **Criar um GPT**.
2. Alterne para a guia **Configurar**, dê ao GPT um nome (p.ex. "Assistente B1") e adicione instruções:

   ```
   Você ajuda a equipe da igreja a consultar seus registros B1. Use as ações da API B1 para
   procurar pessoas, grupos, presença, doações e conteúdo. Sempre respeite dados que o usuário tem permissão para ver. Seja conciso.
   ```

3. Desça para **Ações** → **Criar nova ação** → **Autenticação**.
   - **Tipo de autenticação:** Chave API
   - **Chave API:** cole sua chave `cak_…`
   - **Tipo de autenticação:** Portador
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
         summary: Listar pessoas na igreja
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
         summary: Obter uma única pessoa por id
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
         summary: Listar grupos na igreja
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: Listar doações
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
         summary: Listar registros de presença
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

5. Salve a ação. Teste: *"quantas pessoas estão na igreja?"* — ChatGPT chama `listPeople` e responde.
6. **Publique** o GPT (Apenas eu / Qualquer um com link / Organização) e compartilhe o link com sua equipe.

### 3. Use-o

Qualquer pessoa com o link pode fazer perguntas em linguagem natural. Os escopos da chave ainda se aplicam — uma chave somente leitura recusa gravações independentemente do que o schema de ação diz.

---

## Segurança e limites

- **Isolamento por iglesia.** A chave API resolve para uma única iglesia. ChatGPT não pode ver dados de outras igrejas.
- **Escopo de permissão.** A chave apenas carrega os escopos que você concedeu. Remover um escopo (deletando e recriando a chave) corta aquele acesso na próxima chamada.
- **Revogável instantaneamente.** Delete a chave em **Configurações → Desenvolvedor → Chaves API** e o acesso termina imediatamente.
- **Compartilhar um GPT personalizado compartilha os dados.** Todos com acesso ao GPT podem ver o que os escopos da chave permitem. Prefira escopos mais estreitos (p.ex. omita `donations:read`) para GPTs compartilhados amplamente.
- **Trilha de auditoria.** Quaisquer alterações feitas através do ChatGPT vão através do mesmo log de auditoria que as ações do B1 Admin — encontre-as em **Relatórios → Log de auditoria**.

## Custo

ChurchApps é gratuito e de código aberto — a API que ChatGPT chama faz parte do que sua chiesa já executa. OpenAI cobra o uso do ChatGPT de acordo com seus próprios planos. Não há custo por chamada de ChurchApps.

## Solução de problemas

**O conector MCP diz "Não autorizado" ou mostra um erro 401:** sua chave API está faltando ou incorreta. Abra as configurações do conector e verifique se a chave no argumento `Authorization:Bearer` é o valor completo `cak_…` sem espaços extras.

**ChatGPT diz que não consegue encontrar certos dados:** a chave pode não ter os escopos certos. Crie uma nova chave em **Configurações → Desenvolvedor → Chaves API** com os escopos adicionais e atualize o conector.

**O comando `npx` falha:** Node.js pode não estar instalado. Baixe e instale de [nodejs.org](https://nodejs.org), depois tente salvar o conector novamente.

**Ação de GPT personalizado retorna 401:** no painel de autenticação da ação, confirme que **Tipo de autenticação: Portador** está selecionado e a chave não inclui a palavra `Bearer` (ChatGPT adiciona automaticamente).

**Ação de GPT personalizado retorna 403:** a chave não tem o escopo para esse endpoint. Crie uma nova chave com os escopos corretos e atualize o GPT.

**O schema de ação é rejeitado:** ChatGPT requer OpenAPI 3.1 com pelo menos um `paths` entrada e uma URL de `servers`. Valide o YAML em [editor.swagger.io](https://editor.swagger.io) antes de colar.

## Relacionado

- [Chaves de API](/docs/developer/api/api-keys) — referência completa do escopo
- [Servidor MCP (referência do desenvolvedor)](/docs/developer/api/mcp) — detalhes do protocolo e esquemas de ferramentas
- [Claude](./claude) — mesma ideia, para modelos do Anthropic
- [Referência de API REST](/docs/developer/api/endpoints) — cada endpoint que uma ação de GPT personalizado pode chamar
