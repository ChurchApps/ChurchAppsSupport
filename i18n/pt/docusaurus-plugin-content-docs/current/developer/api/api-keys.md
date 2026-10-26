---
title: "Chaves de API"
---

# Chaves de API

<div class="article-intro">

As chaves de API (tokens de acesso pessoal) são a forma mais simples de se autenticar na API do B1 a partir de um script do lado do servidor, de um conector de terceiros (Zapier, Make, Google Sheets) ou em qualquer situação em que um fluxo OAuth completo seja excessivo. Uma chave é vinculada a uma pessoa específica em uma igreja específica e herda as permissões dessa pessoa, restringidas por um conjunto opcional de escopos.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Um administrador da igreja com a permissão **Editar configurações** cria e gerencia as chaves
- A chave completa é exibida **uma única vez** na criação -- armazene-a em um lugar seguro imediatamente
- Todas as requisições à API devem usar **HTTPS**

</div>

## Formato da chave

Uma chave de API do B1 tem a seguinte aparência:

```
cak_<prefix>.<secret>
```

- `cak_` -- identificador fixo (o prefixo da chave de API que a camada de autenticação reconhece)
- `<prefix>` -- segmento público de busca de 8 caracteres
- `<secret>` -- segredo de 48 caracteres; apenas um hash SHA-256 é armazenado no servidor

A chave completa é apresentada ao servidor no cabeçalho bearer padrão:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

A camada de autenticação da API direciona qualquer token que comece com `cak_` para o fluxo de chave de API, gera o hash do segredo, busca a chave pelo prefixo e resolve as permissões atuais da pessoa dona da chave -- portanto, revogar uma permissão no B1Admin tem efeito na próxima requisição, e a chave nunca fica fora de sincronia com a função.

## Criando uma chave (B1Admin)

1. Entre no B1Admin com um usuário que tenha a permissão **Editar configurações**.
2. Abra **Configurações → Desenvolvedor → Chaves de API**.
3. Clique em **Nova chave de API**, dê a ela um nome reconhecível (por exemplo, "Zapier -- sincronização de doações"), selecione os escopos que a chave deve ter e clique em **Salvar**.
4. A chave `cak_…` completa é exibida **uma única vez** em uma caixa de diálogo. Copie-a para a configuração da sua integração antes de fechar -- não há como recuperá-la depois. Você sempre pode criar uma nova chave.

## Escopos {#scopes}

Um escopo **restringe** o que uma chave pode fazer -- ele nunca pode conceder uma permissão que a pessoa subjacente não tenha. Sem escopos (ou com a lista vazia), a chave tem o conjunto completo de permissões da pessoa.

| Escopo | Permite |
|---|---|
| `people:read` / `people:write` | Ver / editar pessoas, famílias, membros de grupos |
| `groups:read` / `groups:write` | Ver / editar grupos e sua participação |
| `donations:read` / `donations:write` | Ver / registrar doações |
| `attendance:read` / `attendance:write` | Ver / registrar presença, sessões, check-ins |
| `forms:write` | Gerenciar formulários (o acesso de leitura está implícito na escrita) |
| `content:read` / `content:write` | Ver / editar conteúdo do site, inscrições, transmissões |
| `messaging:read` / `messaging:write` | Ler mensagens; a escrita também permite enviar SMS |
| `roles:read` / `roles:write` | Ver / editar definições de funções |
| `settings:read` / `settings:write` | Ver / editar configurações da igreja (**necessário** para registrar webhooks programaticamente) |
| `workflows:read` / `workflows:write` | Ver fluxos de trabalho e tarefas / executar e editar fluxos. Executar um fluxo pode enviar e-mails e mensagens de texto, disparar webhooks e alterar a participação em grupos |
| `offline_access` | Permite tokens de atualização de longa duração (somente fluxos OAuth -- não tem efeito em chaves de API) |

Os escopos de `write` incluem implicitamente o `read` correspondente. Permissões de administrador do servidor e do domínio são deliberadamente não expostas como escopos -- uma credencial com escopo nunca pode ser elevada à administração do site.

:::tip
Se você for usar a chave para registrar webhooks (por exemplo, para uma integração com Zapier ou Make), a chave precisa de `settings:write`. Uma chave apenas com `people:read` recebe um 403 silencioso em `POST /membership/webhooks`.
:::

## Usando uma chave

Igual a qualquer token bearer -- todo endpoint autenticado aceita chaves de API exatamente como aceita JWTs:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Uma requisição cuja chave tenha escopos insuficientes recebe **403 Forbidden**, com o mesmo formato usado em qualquer erro de permissão negada.

## Gerenciando chaves pela API

Todos os endpoints ficam sob o caminho `/membership/apiKeys` do módulo Membership e exigem um JWT (não uma chave de API) de um administrador da igreja com a permissão **Editar configurações**.

| Método e caminho | Finalidade |
|---|---|
| `GET /membership/apiKeys` | Lista as chaves da igreja (sem o segredo -- apenas `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Lista de todos os nomes de escopos disponíveis -- para uma interface de criação de chaves |
| `POST /membership/apiKeys` | Cria uma nova chave. Corpo: `{ "name": "...", "scopes": ["people:read"] }`. A resposta inclui a chave `cak_…` completa **uma única vez**. |
| `DELETE /membership/apiKeys/:id` | Revoga uma chave -- tem efeito na próxima requisição |

Uma chave revogada deixa de funcionar imediatamente -- não há período de carência.

## Boas práticas

- **Uma chave por integração.** Se algo for comprometido, você revoga uma única chave sem quebrar as outras.
- **Crie os escopos mais restritos que funcionem.** Uma exportação para o Google Sheets precisa apenas de `people:read`, não de `settings:write`.
- **Vincule a chave a uma conta de serviço, não a um membro real da equipe.** Se um membro da equipe sair, o acesso dele ao B1 termina -- e também terminam as chaves criadas sob a identidade dele.
- **Armazene as chaves em um gerenciador de segredos** (variáveis de ambiente do seu provedor de hospedagem, AWS Secrets Manager etc.) -- nunca no controle de versão.
- **Rotacione as chaves** se suspeitar de exposição: crie uma nova chave, atualize a integração e depois exclua a antiga.

## Como ela difere do OAuth

As chaves de API são adequadas quando **a sua igreja é a única que usa a integração**. Para um conector que precisa acessar muitas igrejas, cada uma com consentimento explícito -- como um aplicativo SaaS compartilhado pela comunidade do B1 --, use [OAuth e aplicativos conectados](./connected-apps) em vez disso.

| | Chave de API | OAuth |
|---|---|---|
| Quem instala | Um administrador da igreja | Cada administrador da igreja autoriza o aplicativo |
| Cabeçalho de autenticação | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Validade do token | Até ser revogado | Acesso ≈ 7 dias, atualização ≈ 90 dias |
| Ideal para | Scripts internos, conectores Zapier/Make/Sheets | Aplicativos de terceiros multi-inquilino |
