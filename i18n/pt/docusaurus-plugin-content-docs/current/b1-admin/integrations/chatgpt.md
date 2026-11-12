---
title: "ChatGPT"
description: "Conecte o ChatGPT aos dados do B1 da sua igreja com uma chave de API para fazer perguntas em linguagem simples sobre pessoas, doações e presença no B1 Admin."
---

# ChatGPT

<div class="article-intro">

Conecte o ChatGPT aos dados do B1 da sua igreja e faça perguntas em linguagem simples -- ele responde com base nos registros atualizados da sua igreja. Você também pode pedir ajuda para tarefas que exigiriam várias etapas no B1 Admin.

**Algumas coisas que você pode perguntar:**
- *"Mostre todas as pessoas que estiveram presentes na semana passada, mas ainda não foram incluídas em um pequeno grupo"*
- *"Resuma as doações deste mês por fundo"*
- *"Quem são nossos membros mais novos e já fizemos algum acompanhamento com eles?"*
- *"Não consigo descobrir como fazer X no B1 -- pode me explicar passo a passo?"*

</div>

<div class="prereqs">
<h4>O que você precisa</h4>

- **O aplicativo de desktop do ChatGPT** para Mac ou Windows
- **Um plano pago do ChatGPT** (Plus ou superior). Contas gratuitas do ChatGPT não podem se conectar ao B1.
- **Seu login do B1** com permissão para gerenciar as configurações da igreja (necessária para criar uma chave). Não tem essa permissão? Peça ao administrador do B1 da sua igreja.

</div>

:::tip Recomendado: experimente o Claude primeiro -- é gratuito
[Claude](./claude.md) se conecta ao B1 no **plano gratuito** e é configurado em menos de 3 minutos -- basta adicionar o B1 como conector e entrar com sua conta do B1. Não é preciso chave. É a forma mais fácil de a sua igreja experimentar a IA com o B1 antes de pagar por qualquer coisa.
:::

## Como configurar {#set-it-up}

As telas podem parecer um pouco diferentes na sua versão do ChatGPT.

---

**Etapa 1 -- Crie sua chave do B1**

A chave é o que permite que o ChatGPT acesse o B1 *da sua* igreja -- pense nela como uma senha exclusiva para o ChatGPT.

1. Entre no [B1 Admin](https://admin.b1.church) e acesse [Configurações → Desenvolvedor](https://admin.b1.church/settings/developer).
2. Na aba **Chaves de API**, clique em **Nova chave de API** e dê a ela o nome `ChatGPT`.
3. **Escopos:** marque o que o ChatGPT poderá fazer. Cada área tem uma caixa **leitura** (apenas consultar) e uma caixa **escrita** (fazer alterações). Não tem certeza? Para começar, marque apenas as caixas de **leitura**.
4. Clique em **Salvar** e depois em **Copiar** a chave (ela começa com `cak_`). Ela é exibida apenas uma vez.

---

**Etapa 2 -- Clique no seu nome, no canto inferior esquerdo do ChatGPT**

![Clique no nome do seu perfil](/img/guides/chatgpt-mcp/01.png)

---

**Etapa 3 -- Clique em Configurações**

![Clique em Configurações no menu](/img/guides/chatgpt-mcp/02.png)

---

**Etapa 4 -- Clique em Plugins na barra lateral esquerda**

![Clique em Plugins em Integrações](/img/guides/chatgpt-mcp/03.png)

---

**Etapa 5 -- Clique na aba MCPs**

![Clique na aba MCPs](/img/guides/chatgpt-mcp/04.png)

Aqui você verá os servidores MCP que já tiver adicionado.

---

**Etapa 6 -- Clique em Adicionar → Adicionar servidor MCP**

![Clique em Adicionar e depois em Adicionar servidor MCP](/img/guides/chatgpt-mcp/06.png)

---

**Etapa 7 -- Preencha o formulário e clique em Salvar**

![Formulário para conectar a um MCP personalizado](/img/guides/chatgpt-mcp/07.png)

Clique em **Streamable HTTP** e preencha:

| Campo | O que informar |
|---|---|
| **Nome** | `B1 Church` (ou qualquer nome de sua preferência) |
| **Tipo** | Clique em **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Variável de ambiente do token Bearer** | Deixe em branco |
| **Cabeçalhos** | Clique em **+ Adicionar cabeçalho** → Chave: `Authorization` → Valor: veja abaixo |

![Exemplo preenchido mostrando Authorization na chave e a chave Bearer no valor](/img/guides/chatgpt-mcp/08.png)

- **Chave:** `Authorization`
- **Valor:** `Bearer cak_yourkey` -- a palavra Bearer, um espaço e a sua chave

Clique em **Salvar**.

Pronto! Volte a um chat e pergunte algo como *"Quantas pessoas fazem parte da nossa igreja?"* e o ChatGPT buscará a resposta diretamente no B1.

---

## É seguro? {#is-it-safe}

- O ChatGPT só consegue ver os dados **da sua igreja**.
- Ele só pode fazer o que a sua chave permite -- uma chave com apenas as caixas de **leitura** marcadas pode consultar, mas nunca alterar nada.
- Para desativar o acesso, exclua a chave no B1 Admin em **Configurações → Desenvolvedor**. O acesso é interrompido imediatamente.

## Quanto custa? {#what-does-it-cost}

A conexão com o B1 é gratuita -- ela faz parte do ChurchApps. O ChatGPT precisa de um plano pago (Plus ou superior) para se conectar; veja os preços da OpenAI.

## Detalhes técnicos {#technical-details}

O restante desta página é destinado a usuários técnicos e assistentes de IA. O servidor MCP do B1 está em `https://api.churchapps.org/mcp` (Streamable HTTP) e recebe a chave de API como cabeçalho `Authorization: Bearer cak_…`. Veja a [referência do servidor MCP para desenvolvedores](/docs/developer/api/mcp).

### GPT personalizado com Ações {#custom-gpt-with-actions}

Um GPT personalizado permite criar um assistente dedicado que toda a sua equipe pode compartilhar -- basta abrir um link e começar a fazer perguntas, sem nenhuma configuração do lado deles. Ele exige uma conta ChatGPT Plus, Team ou Enterprise e cerca de 10 minutos.

#### 1. Crie uma chave de API {#1-create-an-api-key}

Siga a Etapa 1 de Como configurar, acima, se ainda não tiver feito isso.

#### 2. Crie o GPT personalizado {#2-build-the-custom-gpt}

1. No ChatGPT, clique no seu perfil → **Meus GPTs** → **Criar um GPT**.
2. Acesse a aba **Configurar**, dê um nome ao GPT (por exemplo, "Assistente B1") e adicione as instruções:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Role até **Ações** → **Criar nova ação** → **Autenticação**.
   - **Tipo de autenticação:** Chave de API
   - **Chave de API:** cole a sua chave `cak_…`
   - **Tipo de autenticação:** Bearer
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
         summary: List everyone in the church
         responses:
           "200":
             description: OK
     /membership/people/search:
       get:
         operationId: searchPeople
         summary: Find people by name, or by exact email
         parameters:
           - in: query
             name: term
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
         summary: List donations for one person, or between two dates (send both startDate and endDate as YYYY-MM-DD)
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
     /attendance/attendancerecords/search:
       get:
         operationId: listAttendance
         summary: List attendance records between two dates, optionally for one campus, service, service time, or group
         parameters:
           - in: query
             name: startDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: endDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: campusId
             schema: { type: string }
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: groupId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. Salve a ação. Teste: *"quantas pessoas fazem parte da igreja?"* -- o ChatGPT chama `listPeople` e responde.
6. **Publique** o GPT (Somente eu / Qualquer pessoa com o link / Organização) e compartilhe o link com a sua equipe.

#### 3. Use o GPT {#3-use-it}

Qualquer pessoa com o link pode fazer perguntas em linguagem natural. Os escopos da chave continuam valendo -- uma chave somente de leitura recusa gravações, independentemente do que o schema da ação disser.

---

### Segurança e limites {#safety-and-limits}

- **Isolamento por igreja.** A chave de API corresponde a uma única igreja. O ChatGPT não consegue ver os dados de outras igrejas.
- **Restrita por permissões.** A chave só tem os escopos que você concedeu. Remover um escopo (excluindo e recriando a chave) corta esse acesso na próxima chamada.
- **Revogável instantaneamente.** Exclua a chave em **Configurações → Desenvolvedor → Chaves de API** e o acesso termina imediatamente.
- **Compartilhar um GPT personalizado compartilha os dados.** Todos com acesso ao GPT podem ver o que os escopos da chave permitirem. Prefira escopos mais restritos (por exemplo, omita `donations:read`) para GPTs compartilhados amplamente.
- **Trilha de auditoria.** Quaisquer alterações feitas pelo ChatGPT passam pelo mesmo registro de auditoria das ações do B1 Admin -- encontre-as em **Configurações → Registro de auditoria**.

### Solução de problemas {#troubleshooting}

**O conector MCP mostra "Unauthorized" ou um erro 401:** sua chave de API está ausente ou incorreta. Abra as configurações do conector e verifique o cabeçalho **Authorization**: o valor deve ser a palavra `Bearer`, um espaço e, em seguida, a chave `cak_…` completa, sem espaços extras.

**O ChatGPT diz que não consegue encontrar determinados dados:** a chave pode não ter os escopos corretos. Crie uma nova chave em **Configurações → Desenvolvedor → Chaves de API** com os escopos adicionais e atualize o conector.

**A ação do GPT personalizado retorna 401:** no painel de autenticação da ação, confirme que **Tipo de autenticação: Bearer** está selecionado e que a chave não inclui a palavra `Bearer` (o ChatGPT a adiciona automaticamente).

**A ação do GPT personalizado retorna 403:** a chave não tem o escopo para aquele endpoint. Crie uma nova chave com os escopos corretos e atualize o GPT.

**O schema da ação é rejeitado:** o ChatGPT exige OpenAPI 3.1 com pelo menos uma entrada em `paths` e uma URL em `servers`. Valide o YAML em [editor.swagger.io](https://editor.swagger.io) antes de colar.

## Relacionados {#related}

- [Chaves de API](/docs/developer/api/api-keys) -- referência completa de escopos
- [Servidor MCP (referência para desenvolvedores)](/docs/developer/api/mcp) -- detalhes do protocolo e esquemas das ferramentas
- [Claude](./claude.md) -- a mesma ideia, para os modelos da Anthropic
- [Referência da API REST](/docs/developer/api/endpoints) -- todos os endpoints que uma ação de GPT personalizado pode chamar
