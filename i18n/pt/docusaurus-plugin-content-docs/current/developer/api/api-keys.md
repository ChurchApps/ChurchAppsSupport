---
title: "Chaves de API"
description: "Crie, delimite por escopos e revogue chaves de API do B1 no B1 Admin para scripts de servidor e conectores como Zapier, Make ou Google Sheets, sem um fluxo OAuth completo."
---

# Chaves de API

<div class="article-intro">

As chaves de API (tokens de acesso pessoais) são a forma mais simples de autenticar na API do B1 a partir de um script de servidor, de um conector de terceiros (Zapier, Make, Google Sheets) ou de qualquer situação em que um fluxo OAuth completo seria excessivo. Uma chave é vinculada a uma pessoa específica em uma igreja específica e herda as permissões dessa pessoa, restringidas por um conjunto opcional de escopos.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Um administrador da igreja com a permissão **Editar configurações** cria e gerencia as chaves
- A chave completa é mostrada **uma única vez** na criação -- armazene-a em um lugar seguro imediatamente
- Todas as requisições à API devem usar **HTTPS**

</div>

## Formato da chave {#key-format}

Uma chave de API do B1 tem esta aparência:

```
cak_<prefix>.<secret>
```

- `cak_` — identificador fixo (o prefixo de chave de API que a camada de autenticação reconhece)
- `<prefix>` — segmento público de busca com 8 caracteres
- `<secret>` — segredo com 48 caracteres; apenas um hash SHA-256 é armazenado no servidor

A chave completa é apresentada ao servidor no cabeçalho bearer padrão:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

A camada de autenticação da API encaminha qualquer token que comece com `cak_` para o caminho de chaves de API, calcula o hash do segredo, busca a chave pelo prefixo e resolve as permissões atuais da pessoa dona da chave -- por isso, revogar uma permissão no B1Admin tem efeito já na próxima requisição, e a chave nunca fica fora de sincronia com a função.

## Criando uma chave (B1Admin) {#creating-a-key-b1admin}

1. Entre no B1Admin com um usuário que tenha **Editar configurações**.
2. Abra **Configurações → Desenvolvedor → Chaves de API**.
3. Clique em **Nova chave de API**, dê a ela um **Nome** reconhecível (por exemplo, "Zapier — sincronização de doações"), selecione pelo menos um dos **Escopos** que a chave deve ter, opcionalmente escolha uma data em **Expira em** (deixe em branco para uma chave que nunca expira) e clique em **Salvar**.
4. A chave `cak_…` completa é mostrada **uma única vez** em uma caixa de diálogo. Copie-a para a configuração da sua integração antes de fechar -- não há como recuperá-la depois. Você sempre pode criar uma nova chave.

## Escopos {#scopes}

Um escopo **restringe** o que uma chave pode fazer -- ele nunca concede uma permissão que a pessoa subjacente não tenha. Sem escopos, a chave tem o conjunto completo de permissões da pessoa; o B1Admin sempre exige pelo menos um escopo, então uma chave sem escopos só pode ser criada pela API.

| Escopo | Permite |
|---|---|
| `people:read` / `people:write` | Ver / editar pessoas, famílias e membros de grupos |
| `groups:read` / `groups:write` | Ver / editar grupos e sua participação |
| `donations:read` / `donations:write` | Ver / registrar doações |
| `attendance:read` / `attendance:write` | Ver / registrar presença, sessões e check-ins |
| `forms:write` | Gerenciar formulários (o acesso de leitura é implícito na escrita) |
| `content:read` / `content:write` | Ver / editar conteúdo do site, inscrições e transmissões |
| `messaging:read` / `messaging:write` | Ler mensagens; a escrita também permite enviar SMS |
| `roles:read` / `roles:write` | Ver / editar definições de funções |
| `settings:read` / `settings:write` | Ver / editar configurações da igreja (**obrigatório** para registrar webhooks programaticamente) |
| `workflows:read` / `workflows:write` | Ver fluxos de trabalho e tarefas / executar e editar fluxos. Executar um fluxo pode enviar e-mails e textos, disparar webhooks e alterar a participação em grupos |
| `offline_access` | Permite tokens de atualização de longa duração (apenas fluxos OAuth — não tem efeito em chaves de API) |

Os escopos `write` incluem implicitamente o `read` correspondente. Permissões de administrador de servidor e de domínio não são expostas como escopos de propósito — uma credencial com escopo nunca pode ser elevada à administração do site.

:::tip
Se você for usar a chave para registrar webhooks (por exemplo, para uma integração com Zapier ou Make), a chave precisa de `settings:write`. Uma chave apenas com `people:read` retorna 403 silenciosamente em `POST /membership/webhooks`.
:::

## Usando uma chave {#using-a-key}

Igual a qualquer token bearer — todo endpoint autenticado aceita chaves de API exatamente como aceita JWTs:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Uma requisição cuja chave tenha escopos insuficientes recebe **403 Forbidden**, com o mesmo formato usado por qualquer erro de permissão negada.

## Gerenciando chaves pela API {#managing-keys-via-the-api}

Todos os endpoints ficam sob o caminho `/membership/apiKeys` do módulo Membership e exigem um JWT (não uma chave de API) de um administrador da igreja com **Editar configurações**.

| Método e caminho | Finalidade |
|---|---|
| `GET /membership/apiKeys` | Lista as chaves da igreja (sem o segredo — apenas `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Lista de todos os nomes de escopos disponíveis — para uma interface de criação de chaves |
| `POST /membership/apiKeys` | Cria uma nova chave. Corpo: `{ "name": "...", "scopes": ["people:read"] }`. A resposta inclui a chave `cak_…` completa **uma única vez**. |
| `DELETE /membership/apiKeys/:id` | Revoga uma chave — tem efeito na próxima requisição |

Uma chave revogada deixa de funcionar imediatamente — não há período de tolerância.

## Boas práticas {#best-practices}

- **Uma chave por integração.** Se algo for comprometido, você revoga uma única chave sem quebrar as outras.
- **Crie as permissões mais restritas que funcionem.** Uma exportação para Google Sheets precisa apenas de `people:read`, não de `settings:write`.
- **Vincule a chave a uma conta de serviço, e não a um membro real da equipe.** Se um membro da equipe sair, o acesso dele ao B1 termina — e com ele, as chaves criadas sob a identidade dele.
- **Guarde as chaves em um gerenciador de segredos** (variáveis de ambiente do seu provedor de hospedagem, AWS Secrets Manager etc.) — nunca no controle de versão.
- **Rotacione as chaves** se suspeitar de exposição: crie uma nova chave, atualize a integração e depois exclua a antiga.

## Como isso difere do OAuth {#how-it-differs-from-oauth}

Chaves de API são indicadas quando **sua igreja é a única que usa a integração**. Para um conector que precise acessar muitas igrejas, cada uma com consentimento explícito — como um aplicativo SaaS compartilhado pela comunidade B1 —, use [OAuth e aplicativos conectados](./connected-apps.md).

| | Chave de API | OAuth |
|---|---|---|
| Quem instala | Um administrador da igreja | Cada administrador da igreja autoriza o aplicativo |
| Cabeçalho de autenticação | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Duração do token | Até ser revogado | Acesso ≈ 7 dias, atualização ≈ 90 dias |
| Ideal para | Scripts internos, conectores Zapier/Make/Sheets | Aplicativos de terceiros multi-inquilino |
