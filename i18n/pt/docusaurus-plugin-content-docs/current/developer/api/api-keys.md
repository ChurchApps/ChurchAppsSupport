---
title: "Chaves de API"
---

# Chaves de API

<div class="article-intro">

Chaves de API (tokens de acesso pessoal) são a maneira mais simples de autenticar contra a API B1 a partir de um script do lado do servidor, um conector de terceiros (Zapier, Make, Google Sheets), ou em qualquer lugar onde um fluxo OAuth completo é excessivo. Uma chave é vinculada a uma pessoa específica em uma igreja específica e herda as permissões dessa pessoa, estreitadas por um conjunto opcional de escopos.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Um administrador da igreja com a permissão **Editar Configurações** cria e gerencia chaves
- A chave bruta é mostrada **uma vez** na criação -- armazene-a em um lugar seguro imediatamente
- Todas as solicitações de API devem usar **HTTPS**

</div>

## Formato de Chave

Uma chave de API B1 se parece com:

```
cak_<prefix>.<secret>
```

- `cak_` -- identificador fixo (o prefixo de chave de API que a camada de autenticação corresponde)
- `<prefix>` -- segmento de lookup público de 8 caracteres
- `<secret>` -- segredo de 48 caracteres; apenas um hash SHA-256 é armazenado no lado do servidor

A chave completa é apresentada ao servidor no header de portador padrão:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

A camada de autenticação de API roteia qualquer token começando com `cak_` para o caminho de chave de API, faz hash do segredo, o procura por prefixo e resolve as permissões atuais da pessoa da chave -- então revogar uma permissão em B1Admin entra em vigor na próxima solicitação, e a chave nunca fica fora de sincronia com a função.

## Criando uma Chave (B1Admin)

1. Entre no B1Admin como um usuário com **Editar Configurações**.
2. Abra **Configurações → Desenvolvedor → Chaves de API**.
3. Clique em **Nova Chave de API**, dê um nome reconhecível (por ex. "Zapier — donations sync"), selecione os escopos que a chave deve ter, e **Salve**.
4. A chave `cak_…` completa é mostrada **uma vez** em um diálogo. Copie-a na configuração da sua integração antes de fechar -- não há maneira de recuperá-la depois. Você sempre pode criar uma nova chave.

## Escopos

Um escopo **estreita** o que uma chave pode fazer -- nunca pode conceder uma permissão que a pessoa subjacente não tem. Escopos vazios / sem escopos significa que a chave carrega o conjunto de permissão completo da pessoa.

| Escopo | Permite |
|---|---|
| `people:read` / `people:write` | Ver / editar pessoas, residências, membros do grupo |
| `groups:read` / `groups:write` | Ver / editar grupos e sua membressia |
| `donations:read` / `donations:write` | Ver / registrar doações |
| `attendance:read` / `attendance:write` | Ver / registrar attendance, sessões, check-ins |
| `forms:write` | Gerenciar formulários (acesso de leitura é implícito na escrita) |
| `content:read` / `content:write` | Ver / editar conteúdo do website, registros, streaming |
| `messaging:read` / `messaging:write` | Ler messaging; escrever também permite enviar SMS |
| `roles:read` / `roles:write` | Ver / editar definições de função |
| `settings:read` / `settings:write` | Ver / editar configurações da igreja (**necessário** para registrar webhooks programaticamente) |
| `offline_access` | Permitir tokens de atualização de longa vida (apenas fluxos OAuth -- não tem efeito em chaves de API) |

Escopos `write` implicitamente incluem o `read` correspondente. Permissões de administrador de servidor e domínio deliberadamente não são expostas como escopos -- uma credencial com escopo nunca pode elevar para administração do site.

:::tip
Se você usar a chave para registrar webhooks (por ex. para uma integração Zapier ou Make), a chave precisa de `settings:write`. Uma chave apenas `people:read` silenciosamente 403s em `POST /membership/webhooks`.
:::

## Usando uma Chave

Igual a qualquer token portador -- cada endpoint autenticado aceita chaves de API exatamente como aceita JWTs:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Uma solicitação cuja chave não tem escopos suficientes responde **403 Forbidden** com a mesma forma que qualquer erro de acesso negado usa.

## Gerenciando Chaves via a API

Todos os endpoints estão sob o caminho `/membership/apiKeys` do módulo de Membership e requerem um JWT (não uma chave de API) de um administrador da igreja com **Editar Configurações**.

| Método & Caminho | Propósito |
|---|---|
| `GET /membership/apiKeys` | Liste as chaves da igreja (sem segredo -- apenas `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Lista de todos os nomes de escopo disponíveis -- para uma UI de criação de chave |
| `POST /membership/apiKeys` | Crie uma nova chave. Corpo: `{ "name": "...", "scopes": ["people:read"] }`. A resposta inclui a chave `cak_…` bruta **uma vez**. |
| `DELETE /membership/apiKeys/:id` | Revogue uma chave -- entra em vigor na próxima solicitação |

Uma chave revogada é removida imediatamente -- não há período de carência.

## Melhores Práticas

- **Uma chave por integração.** Se algo é comprometido você revoga uma única chave sem quebrar as outras.
- **Cunhe os escopos mais estreitos que funcionam.** Uma exportação do Google Sheets precisa apenas de `people:read`, não de `settings:write`.
- **Vinculando a chave a uma conta de serviço, não a um membro de equipe real.** Se um membro de equipe sai, seu acesso B1 termina -- e assim fazem quaisquer chaves cunhadas sob sua identidade.
- **Armazene as chaves em um gerenciador de segredos** (variáveis de ambiente do seu provedor de hospedagem, AWS Secrets Manager, etc.) -- nunca em controle de código-fonte.
- **Rode chaves** se você suspeitar de exposição: crie uma nova chave, atualize a integração, então delete a antiga.

## Como Difere do OAuth

Chaves de API são apropriadas quando **sua igreja é a única usando a integração**. Para um conector que precisa acessar muitas igrejas com consentimento explícito de cada uma -- como uma app SaaS compartilhada entre a comunidade B1 -- use [OAuth e Aplicativos Conectados](./connected-apps) ao invés.

| | Chave de API | OAuth |
|---|---|---|
| Quem a instala | Um administrador da igreja | Cada administrador da igreja autoriza a app |
| Header de autenticação | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Vida útil do token | Até ser revogado | Acesso ≈ 7 dias, atualização ≈ 90 dias |
| Melhor para | Scripts internos, conectores Zapier/Make/Sheets | Apps de terceiros multi-locatários |
