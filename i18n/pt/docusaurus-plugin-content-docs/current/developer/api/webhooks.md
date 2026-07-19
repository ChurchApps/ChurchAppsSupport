---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks permitem que uma igreja envie notificações em tempo real para ferramentas de terceiros -- plataformas de automação (Zapier, Make, n8n), CRMs, sistemas de contabilidade ou qualquer coisa que aceite um POST HTTP. Quando uma pessoa, grupo ou residência muda no B1, o B1 envia um payload JSON assinado para cada URL inscrita naquele evento.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Um administrador da igreja com a permissão **Editar Configurações da Igreja** registra e gerencia webhooks
- Seu endpoint de recebimento deve estar acessível via **HTTPS** em um endereço público
- Tenha uma maneira de armazenar o segredo de assinatura com segurança -- ele é mostrado apenas uma vez

</div>

## Visão Geral

Webhooks são **apenas saída**: B1 chama seu endpoint, você não chama B1. Cada webhook é uma assinatura por-igreja consistindo em uma URL de destino, um segredo de assinatura e uma lista de eventos inscritos.

A entrega usa uma **caixa de saída durável**: quando um evento inscrito ocorre, B1 registra uma linha de entrega e um worker de fundo POSTs dentro de cerca de um minuto. As entregas com falha são retentadas com backoff exponencial. Nada é perdido se uma entrega for lenta ou seu endpoint ficar brevemente indisponível.

## Registrando um Webhook

### No B1Admin

Vá para **Configurações → Webhooks → Novo Webhook**. Digite um nome, a URL do payload e selecione os eventos para se inscrever. Ao salvar, o **segredo de assinatura é exibido uma vez** -- copie-o imediatamente e armazene-o com sua integração. Nunca é mostrado novamente (você pode rotacioná-lo depois, mas não pode recuperar o original).

### Via a API

Todos os endpoints estão sob o caminho de base do módulo de Membership `/membership/webhooks` e exigem um JWT de um administrador da igreja com a permissão `Settings / Edit`, **ou uma [chave de API](./api-keys) cunhada com escopo `settings:write`**. As mesmas rotas aceitam ambas. Isso é o que permite que Zapier e Make registrem webhooks em nome da igreja quando um Zap ou cenário é ativado.

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

A resposta de criar -- e **apenas** a resposta de criar -- inclui o `secret`:

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| Método & Caminho | Propósito |
|---|---|
| `GET /membership/webhooks` | Liste os webhooks da igreja (segredo omitido) |
| `GET /membership/webhooks/events` | O catálogo de nomes de eventos válidos |
| `GET /membership/webhooks/:id` | Carregue um webhook |
| `POST /membership/webhooks` | Criar (sem `id`) ou atualizar (com `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Rode o segredo de assinatura; retorna o novo valor uma vez |
| `DELETE /membership/webhooks/:id` | Delete um webhook |
| `GET /membership/webhooks/:id/deliveries` | Tentativas de entrega recentes para um webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Payload completo e resposta para uma entrega |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Re-fila uma entrega |

## Catálogo de Eventos

Os nomes dos eventos seguem o padrão `{entity}.{action}`. Busque a lista ao vivo em `GET /membership/webhooks/events`.

| Evento | Dispara quando |
|---|---|
| `person.created` | Uma pessoa é adicionada |
| `person.updated` | Um registro de pessoa é alterado |
| `person.destroyed` | Uma pessoa é deletada |
| `household.created` | Uma residência é adicionada |
| `household.updated` | Uma residência é alterada |
| `household.destroyed` | Uma residência é deletada |
| `group.created` | Um grupo é adicionado |
| `group.updated` | Um grupo é alterado |
| `group.destroyed` | Um grupo é deletado |
| `group.member.added` | Uma pessoa é adicionada a um grupo |
| `group.member.removed` | Uma pessoa é removida de um grupo |
| `donation.created` | Um presente é registrado -- entrada manual, online ou transição pendente → completa |
| `donation.updated` | Um registro de doação é editado |
| `attendance.recorded` | Uma visita é registrada (entrada manual ou check-in) |
| `session.created` | Uma nova sessão de attendance é criada (manualmente ou auto no primeiro check-in) |
| `form.submission.created` | Um formulário é enviado |
| `event.created` | Um evento de calendário é adicionado |
| `event.updated` | Um evento de calendário é editado |
| `event.destroyed` | Um evento de calendário é deletado |

## Formato de Payload

Cada entrega é um `POST` HTTP com um corpo JSON e estes headers:

| Header | Descrição |
|---|---|
| `Content-Type` | Sempre `application/json` |
| `X-B1-Event` | O nome do evento, por ex. `person.created` |
| `X-B1-Delivery-Id` | ID único para esta tentativa de entrega -- use-o para desduplicar |
| `X-B1-Signature` | Assinatura HMAC-SHA256 do corpo bruto (veja abaixo) |
| `X-B1-Timestamp` | Segundos de época Unix quando a solicitação foi enviada |
| `User-Agent` | `B1-Webhooks/1.0` |

O corpo envolve o recurso alterado em um pequeno envelope:

```json
{
  "event": "person.created",
  "churchId": "AbC123XyZ90",
  "occurredAt": "2026-05-17T14:32:08.114Z",
  "data": {
    "id": "Pq7Rs2Tu4Vw",
    "churchId": "AbC123XyZ90",
    "name": { "display": "Jordan Rivera", "first": "Jordan", "last": "Rivera" },
    "contactInfo": { "email": "jordan@example.com" }
  }
}
```

Para eventos `*.destroyed`, `data` contém apenas o `id` e `churchId` do registro deletado.

## Tipos de Conector

O formato de entrega padrão é o envelope JSON acima -- `connectorType: "standard"`. Para [Slack e Discord](/docs/b1-admin/integrations/slack-discord) o mesmo mecanismo de webhook ao invés posta uma mensagem em forma de chat que esses serviços aceitam diretamente:

| `connectorType` | Corpo enviado | Use quando |
|---|---|---|
| `"standard"` (padrão) | `{event, churchId, occurredAt, data}` envelope, assinado | Você está escrevendo sua própria integração, ou apontando para Zapier / Make / um servidor customizado |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Você está postando diretamente para uma URL de Incoming Webhook do Slack |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Você está postando diretamente para uma URL de webhook de canal do Discord |

O tipo de conector é definido no dropdown **Connector Type** no editor de webhook, ou via `connectorType` no corpo `POST /membership/webhooks`. O header `X-B1-Signature` assinado ainda é enviado para entregas Slack/Discord (eles o ignoram inofensivamente), então mudar um webhook de volta para `standard` depois não requer ressignação.

## Entregas de Teste

Cada editor de webhook tem um botão **Send Test Event** -- a chamada de API correspondente é `POST /membership/webhooks/:id/test`. A rota de teste constrói um payload sintético para o primeiro evento inscrito, o envia sincronamente através do caminho de entrega real assinado (e através de `formatForConnector` para Slack/Discord), e retorna a linha de entrega resultante incluindo `responseStatus` e `responseBody`. Use-o para confirmar conectividade e manipulação de assinatura antes de ativar a integração para valer.

## Verificando Assinações

Sempre verifique `X-B1-Signature` antes de confiar em um payload. A assinatura é `sha256=` seguida pelo HMAC-SHA256 hex do **corpo de solicitação bruto** chaveado com seu segredo de assinatura. Compute-o sobre os bytes que você recebeu -- não ressearialize o JSON analisado.

**Node.js**

```js
const crypto = require("crypto");

function isValid(rawBody, signatureHeader, secret) {
  const expected = "sha256=" + crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
```

**Python**

```python
import hashlib, hmac

def is_valid(raw_body: bytes, signature_header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature_header or "")
```

**PHP**

```php
function isValid(string $rawBody, string $signatureHeader, string $secret): bool {
    $expected = "sha256=" . hash_hmac("sha256", $rawBody, $secret);
    return hash_equals($expected, $signatureHeader ?? "");
}
```

Rejeite qualquer solicitação cuja assinatura não corresponda. Opcionalmente, também rejeite solicitações cujo `X-B1-Timestamp` seja mais de alguns minutos para limitar janelas de reprodução.

## Suporte a SDK

Para Node.js, `@churchapps/integration-sdk` envia um verificador digitado e um middleware Express que lida com a captura de corpo bruto, verificação de assinatura e análise de envelope para você:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Capture o corpo bruto antes da análise JSON -- necessário para que a assinatura ainda verifique.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

O SDK também expõe `WebhookVerifier.verify(secret, rawBody, signatureHeader)` para runtimes não-Express (funções serverless, Fastify, etc.). Veja o pacote em npm.

## Entrega & Retentativas

Seu endpoint deve responder com um status `2xx` o mais rápido possível -- idealmente após apenas enfileirar o trabalho, não após processá-lo. Qualquer resposta não-`2xx`, uma falha de conexão, ou uma resposta mais lenta que **10 segundos** conta como uma entrega com falha.

As entregas com falha são retentadas com backoff exponencial -- **16 tentativas em aproximadamente 5 dias**. O intervalo cresce de 1 minuto, através de horas, até lacunas de 3 dias para as tentativas finais. Após a 16ª tentativa com falha, a entrega é marcada como `exhausted` e abandonada.

A entrega é **pelo menos uma vez**: uma entrega pode chegar mais de uma vez (por exemplo, se seu endpoint suceder mas a resposta for perdida). Use o header `X-B1-Delivery-Id` para desduplicar -- processe cada id apenas uma vez e trate repetições como sem operação.

### Auto-desabilitação

Se um webhook produz **três entregas consecutivas exhaustas**, B1 o desabilita automaticamente. Corrija seu endpoint, então re-habilite o webhook em B1Admin (ou via `POST /membership/webhooks` com `"active": true`).

## Inspecionando & Reentregando

O editor de webhook em B1Admin mostra uma tabela **Recent Deliveries** -- evento, status, contagem de tentativa, código de resposta e timestamp. Selecionar uma linha revela o payload completo que foi enviado e a resposta que voltou.

Use **Redeliver** para re-fila qualquer entrega anterior com seu payload original -- útil após corrigir um bug em seu endpoint, ou para preencher eventos que seu endpoint perdeu enquanto estava inativo.

## Requisitos de URL

Como webhooks URLs são fornecidas pela igreja, B1 impõe proteções contra falsificação de solicitação do lado do servidor. Uma webhook URL é rejeitada -- no registro e re-verificada antes de cada entrega -- se:

- não usar **`https`**
- aponta para `localhost`, um nome de host `.local` / `.internal`, ou
- resolve para um **privado, loopback, link-local, ou metadados de nuvem** endereço IP

Seu endpoint deve ser um serviço HTTPS publicamente acessível.
