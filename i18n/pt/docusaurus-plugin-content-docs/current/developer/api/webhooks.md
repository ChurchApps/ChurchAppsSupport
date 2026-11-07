---
title: "Webhooks"
description: "Configure webhooks em tempo real no B1 Admin: registre endpoints, escolha eventos, verifique assinaturas HMAC, trate retentativas e reenvie falhas."
---

# Webhooks

<div class="article-intro">

Os webhooks permitem que uma igreja envie notificações em tempo real para ferramentas de terceiros — plataformas de automação (Zapier, Make, n8n), CRMs, sistemas contábeis ou qualquer serviço que aceite um HTTP POST. Quando uma pessoa, um grupo ou uma família é alterado no B1, o B1 envia um payload JSON assinado para cada URL inscrita nesse evento.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Um administrador da igreja com a permissão **Editar Configurações da Igreja** registra e gerencia os webhooks
- Seu endpoint de recebimento precisa estar acessível por **HTTPS** em um endereço público
- Tenha uma forma segura de armazenar o segredo de assinatura — ele é exibido apenas uma vez

</div>

## Visão geral

Os webhooks são somente de **saída**: o B1 chama o seu endpoint, e você não chama o B1. Cada webhook é uma assinatura por igreja, composta por uma URL de destino, um segredo de assinatura e uma lista de eventos inscritos.

A entrega usa uma **fila de saída durável**: quando um evento inscrito ocorre, o B1 registra uma linha de entrega e um worker em segundo plano envia o POST em até cerca de um minuto. Entregas com falha são repetidas com backoff exponencial. Nada é perdido se uma entrega estiver lenta ou se o seu endpoint estiver temporariamente indisponível.

## Registrando um webhook

### No B1Admin

Acesse **Configurações → Desenvolvedor → Webhooks → Novo Webhook**. Informe um nome, a URL do payload e selecione os eventos para assinar. Ao salvar, o **segredo de assinatura é exibido uma única vez** — copie-o imediatamente e armazene-o junto com a sua integração. Ele nunca mais será exibido (você pode gerar um novo depois, mas não pode recuperar o original).

### Via API

Todos os endpoints ficam sob o caminho base do módulo Membership `/membership/webhooks` e exigem um JWT de um administrador da igreja com a permissão `Settings / Edit`, **ou uma [chave de API](./api-keys.md) gerada com o escopo `settings:write`**. As mesmas rotas aceitam ambos. É isso que permite ao Zapier e ao Make registrar webhooks em nome da igreja quando um Zap ou cenário é ativado.

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

A resposta de criação — e **somente** a resposta de criação — inclui o `secret`:

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

| Método e caminho | Finalidade |
|---|---|
| `GET /membership/webhooks` | Lista os webhooks da igreja (sem o segredo) |
| `GET /membership/webhooks/events` | O catálogo de nomes de eventos válidos |
| `GET /membership/webhooks/:id` | Carrega um webhook |
| `POST /membership/webhooks` | Cria (sem `id`) ou atualiza (com `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Gera um novo segredo de assinatura; retorna o novo valor uma única vez |
| `DELETE /membership/webhooks/:id` | Exclui um webhook |
| `GET /membership/webhooks/:id/deliveries` | Tentativas de entrega recentes de um webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Payload e resposta completos de uma entrega |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Coloca uma entrega novamente na fila |

## Catálogo de eventos

Os nomes dos eventos seguem o padrão `{entity}.{action}`. Obtenha a lista atualizada em `GET /membership/webhooks/events`.

| Evento | Disparado quando |
|---|---|
| `person.created` | Uma pessoa é adicionada |
| `person.updated` | O registro de uma pessoa é alterado |
| `person.destroyed` | Uma pessoa é excluída |
| `household.created` | Uma família é adicionada |
| `household.updated` | Uma família é alterada |
| `household.destroyed` | Uma família é excluída |
| `group.created` | Um grupo é adicionado |
| `group.updated` | Um grupo é alterado |
| `group.destroyed` | Um grupo é excluído |
| `group.member.added` | Uma pessoa é adicionada a um grupo |
| `group.member.removed` | Uma pessoa é removida de um grupo |
| `donation.created` | Uma doação é registrada — lançamento manual, online ou a transição de pendente → concluída |
| `donation.updated` | Um registro de doação é editado |
| `attendance.recorded` | Uma presença é registrada (lançamento manual ou check-in) |
| `session.created` | Uma nova sessão de presença é criada (manualmente ou automaticamente no primeiro check-in) |
| `form.submission.created` | Um formulário é enviado |
| `event.created` | Um evento do calendário é adicionado |
| `event.updated` | Um evento do calendário é editado |
| `event.destroyed` | Um evento do calendário é excluído |

## Formato do payload

Cada entrega é um `POST` HTTP com um corpo JSON e estes cabeçalhos:

| Cabeçalho | Descrição |
|---|---|
| `Content-Type` | Sempre `application/json` |
| `X-B1-Event` | O nome do evento, por exemplo `person.created` |
| `X-B1-Delivery-Id` | Identificador único desta tentativa de entrega — use-o para deduplicar |
| `X-B1-Signature` | Assinatura HMAC-SHA256 do corpo bruto (veja abaixo) |
| `X-B1-Timestamp` | Segundos desde a época Unix em que a requisição foi enviada |
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

Para eventos `*.destroyed`, `data` contém apenas o `id` e o `churchId` do registro excluído.

Eventos cujos payloads referenciam outros registros por id também incluem nomes legíveis, resolvidos no momento da entrega: `personName` e `groupName` nos eventos de associação a grupos, `personName` nos eventos de presença, doação e associação a listas, `groupName` em `session.created`, e `formName` (além de `personName`, quando o envio está vinculado a uma pessoa) em `form.submission.created`.

## Tipos de conector

O formato de entrega padrão é o envelope JSON acima — `connectorType: "standard"`. Para o [Slack e o Discord](/docs/b1-admin/integrations/slack-discord), o mesmo mecanismo de webhook envia uma mensagem no formato de chat, que esses serviços aceitam diretamente:

| `connectorType` | Corpo enviado | Use quando |
|---|---|---|
| `"standard"` (padrão) | Envelope `{event, churchId, occurredAt, data}`, assinado | Você está criando a sua própria integração, ou apontando para Zapier / Make / um servidor personalizado |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Você está enviando diretamente para uma URL de Incoming Webhook do Slack |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Você está enviando diretamente para uma URL de webhook de canal do Discord |
| `"mailchimp"` | n/a — o conector chama a própria API do Mailchimp | Você quer [sincronização de audiência](/docs/b1-admin/integrations/services/mailchimp) sem nenhuma URL para hospedar |

O tipo de conector é definido na lista suspensa **Tipo de conector** no editor de webhooks, ou pelo `connectorType` no corpo de `POST /membership/webhooks`. O cabeçalho `X-B1-Signature` assinado continua sendo enviado nas entregas para Slack/Discord (eles o ignoram sem problemas), então voltar um webhook para `standard` depois não exige nova assinatura.

Slack e Discord são apenas reformatações do corpo — o mecanismo ainda envia o POST para a URL fornecida pela igreja. `mailchimp` é o primeiro conector que gerencia a própria troca HTTP: para cada evento, ele faz requisições autenticadas de upsert/arquivamento/tag na API do Mailchimp (`MailchimpConnector.deliver`), e suas credenciais (`{apiKey, audienceId}`) são armazenadas criptografadas com AES em `webhooks.connectorConfig`, somente gravação pela API. Webhooks do Mailchimp aceitam apenas eventos de pessoa, de membro de grupo e de membro de lista; a rota de salvamento verifica a chave e a audiência no Mailchimp antes de aceitá-las. As linhas de entrega armazenam o envelope padrão, então o log de entregas mostra o que o B1 recebeu junto com a resposta do Mailchimp. Situações sem mapeamento (pessoa sem e-mail, evento sem mapeamento) são concluídas como bem-sucedidas com um corpo de resposta `Skipped:`, em vez de consumir novas tentativas.

## Entregas de teste

Todo editor de webhook tem um botão **Enviar evento de teste** — a chamada de API correspondente é `POST /membership/webhooks/:id/test`. A rota de teste monta um payload sintético para o primeiro evento inscrito, despacha-o de forma síncrona pelo caminho real de entrega assinada (e pelo `formatForConnector` para Slack/Discord), e retorna a linha de entrega resultante, incluindo `responseStatus` e `responseBody`. Use-a para confirmar a conectividade e o tratamento da assinatura antes de ativar a integração de verdade. Para webhooks `mailchimp`, o teste verifica as credenciais armazenadas na API do Mailchimp (um evento sintético gravaria um assinante falso na audiência real da igreja) e retorna um resultado no formato de entrega, sem criar uma linha.

## Verificando assinaturas

Sempre verifique o `X-B1-Signature` antes de confiar em um payload. A assinatura é `sha256=` seguido do HMAC-SHA256 em hexadecimal do **corpo bruto da requisição**, usando o seu segredo de assinatura como chave. Calcule-a sobre os bytes recebidos — não serialize novamente o JSON já analisado.

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

Rejeite qualquer requisição cuja assinatura não corresponda. Opcionalmente, rejeite também requisições cujo `X-B1-Timestamp` tenha mais de alguns minutos, para limitar a janela de reenvio malicioso (replay).

## Suporte ao SDK

Para Node.js, o `@churchapps/integration-sdk` inclui um verificador tipado e um middleware para Express que cuida, para você, da captura do corpo bruto, da verificação da assinatura e da análise do envelope:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Capture the raw body before JSON parsing — required so the signature still verifies.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

O SDK também expõe `WebhookVerifier.verify(secret, rawBody, signatureHeader)` para runtimes que não são Express (funções serverless, Fastify, etc.). Consulte o pacote no npm.

## Entrega e novas tentativas

Seu endpoint deve responder com status `2xx` o mais rápido possível — idealmente depois de apenas enfileirar o trabalho, e não depois de processá-lo. Qualquer resposta que não seja `2xx`, falha de conexão ou resposta mais lenta que **10 segundos** conta como entrega com falha.

Entregas com falha são repetidas com backoff exponencial — **16 tentativas em cerca de 5 dias**. O intervalo começa em 1 minuto, passa por horas e chega a intervalos de até 3 dias nas últimas tentativas. Após a 16ª tentativa falha, a entrega é marcada como `exhausted` (esgotada) e abandonada.

A entrega é **pelo menos uma vez**: uma entrega pode chegar mais de uma vez (por exemplo, se o seu endpoint tiver sucesso mas a resposta se perder). Use o cabeçalho `X-B1-Delivery-Id` para deduplicar — processe cada id apenas uma vez e trate as repetições como operações sem efeito.

### Desativação automática

Se um webhook produzir **três entregas esgotadas consecutivas**, o B1 o desativa automaticamente. Corrija o seu endpoint e, em seguida, reative o webhook no B1Admin (ou via `POST /membership/webhooks` com `"active": true`).

## Inspecionando e reenviando

O editor de webhooks no B1Admin mostra uma tabela de **Entregas recentes** — evento, status, número de tentativas, código de resposta e data/hora. Ao selecionar uma linha, você vê o payload completo que foi enviado e a resposta recebida.

Use **Reenviar** para colocar novamente na fila qualquer entrega anterior com o payload original — útil após corrigir um bug no seu endpoint, ou para reprocessar eventos que o seu endpoint deixou de receber enquanto estava indisponível.

## Requisitos de URL

Como as URLs de webhook são fornecidas pela igreja, o B1 aplica proteções contra falsificação de requisições do lado do servidor (SSRF). Uma URL de webhook é rejeitada — no registro e novamente verificada antes de cada entrega — se:

- não usar **`https`**
- apontar para `localhost`, um nome de host `.local` / `.internal`, ou
- resolver para um endereço IP **privado, de loopback, link-local ou de metadados de nuvem**

Seu endpoint precisa ser um serviço HTTPS acessível publicamente.
