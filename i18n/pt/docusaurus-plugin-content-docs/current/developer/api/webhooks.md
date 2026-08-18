---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks permitem que uma igreja envie notificações em tempo real para ferramentas de terceiros — plataformas de automação (Zapier, Make, n8n), CRMs, sistemas de contabilidade ou qualquer coisa que aceite um POST HTTP. Quando uma pessoa, grupo ou família muda em B1, B1 envia um payload JSON assinado para cada URL inscrita naquele evento.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Um administrador da igreja com permissão **Editar Configurações da Igreja** registra e gerencia webhooks
- Seu endpoint receptivo deve estar acessível sobre **HTTPS** em um endereço público
- Tenha uma maneira de armazenar o segredo de assinatura com segurança — ele é mostrado apenas uma vez

</div>

## Visão Geral

Webhooks são **apenas saída**: B1 chama seu endpoint, você não chama B1. Cada webhook é uma inscrição por igreja consistindo em uma URL de destino, um segredo de assinatura e uma lista de eventos inscritos.

A entrega usa uma **caixa de saída durável**: quando um evento inscrito ocorre, B1 registra uma linha de entrega e um worker de fundo POSTs dentro de cerca de um minuto. Entregas falhadas são retentadas com backoff exponencial. Nada é perdido se uma entrega é lenta ou seu endpoint está brevemente inativo.

## Registrando um Webhook

### Em B1Admin

Vá para **Configurações → Desenvolvedor → Webhooks → Novo Webhook**. Digite um nome, a URL de payload e selecione os eventos para inscrever. Ao salvar, o **segredo de assinatura é exibido uma vez** — copie-o imediatamente e armazene-o com sua integração. Nunca é mostrado novamente (você pode girá-lo mais tarde, mas não pode recuperar o original).

### Via a API

Todos os endpoints estão sob o caminho base do módulo Membership `/membership/webhooks` e requerem ou um JWT de um administrador da igreja com permissão `Settings / Edit`, **ou uma [chave de API](./api-keys) criada com escopo `settings:write`**. As mesmas rotas aceitam ambas. Isso é o que permite Zapier e Make registrem webhooks em nome da igreja quando um Zap ou cenário é ligado.

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — novos membros",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

A resposta de criação — e **apenas** a resposta de criação — inclui o `secret`:

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — novos membros",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| Método e Caminho | Propósito |
|---|---|
| `GET /membership/webhooks` | Listar os webhooks da igreja (segredo omitido) |
| `GET /membership/webhooks/events` | O catálogo de nomes de eventos válidos |
| `GET /membership/webhooks/:id` | Carregue um webhook |
| `POST /membership/webhooks` | Criar (sem `id`) ou atualizar (com `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Girar o segredo de assinatura; retorna o novo valor uma vez |
| `DELETE /membership/webhooks/:id` | Deletar um webhook |
| `GET /membership/webhooks/:id/deliveries` | Tentativas de entrega recentes para um webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Payload completo e resposta para uma entrega |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Re-fila uma entrega |

## Catálogo de Eventos

Nomes de eventos seguem o padrão `{entity}.{action}`. Busque a lista ao vivo de `GET /membership/webhooks/events`.

| Evento | Dispara quando |
|---|---|
| `person.created` | Uma pessoa é adicionada |
| `person.updated` | Um registro de pessoa é mudado |
| `person.destroyed` | Uma pessoa é deletada |
| `household.created` | Uma família é adicionada |
| `household.updated` | Uma família é mudada |
| `household.destroyed` | Uma família é deletada |
| `group.created` | Um grupo é adicionado |
| `group.updated` | Um grupo é mudado |
| `group.destroyed` | Um grupo é deletado |
| `group.member.added` | Uma pessoa é adicionada a um grupo |
| `group.member.removed` | Uma pessoa é removida de um grupo |
| `donation.created` | Um presente é registrado — entrada manual, online ou a transição pendente → completo |
| `donation.updated` | Um registro de doação é editado |
| `attendance.recorded` | Uma visita é registrada (entrada manual ou check-in) |
| `session.created` | Uma nova sessão de frequência é criada (manualmente ou automática no primeiro check-in) |
| `form.submission.created` | Um formulário é enviado |
| `event.created` | Um evento de calendário é adicionado |
| `event.updated` | Um evento de calendário é editado |
| `event.destroyed` | Um evento de calendário é deletado |

## Formato de Payload

Cada entrega é um HTTP `POST` com um corpo JSON e esses cabeçalhos:

| Cabeçalho | Descrição |
|---|---|
| `Content-Type` | Sempre `application/json` |
| `X-B1-Event` | O nome do evento, por ex. `person.created` |
| `X-B1-Delivery-Id` | Id único para esta tentativa de entrega — use para deduplicar |
| `X-B1-Signature` | Assinatura HMAC-SHA256 do corpo bruto (veja abaixo) |
| `X-B1-Timestamp` | Segundos de época Unix quando o pedido foi enviado |
| `User-Agent` | `B1-Webhooks/1.0` |

O corpo envolve o recurso mudado em um pequeno envelope:

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

Eventos cujos payloads referenciam outros registros por id também carregam nomes legíveis para humanos, resolvidos no tempo de entrega: `personName` e `groupName` nos eventos de associação de grupo, `personName` em frequência, doação e eventos de associação de lista, `groupName` em `session.created` e `formName` (mais `personName` quando o envio é vinculado a uma pessoa) em `form.submission.created`.

## Tipos de Conector

O formato de entrega padrão é o envelope JSON acima — `connectorType: "standard"`. Para [Slack e Discord](/docs/b1-admin/integrations/slack-discord) o mecanismo de webhook em vez disso posta uma mensagem em formato de chat que esses serviços aceitam diretamente:

| `connectorType` | Corpo enviado | Use quando |
|---|---|---|
| `"standard"` (padrão) | `{event, churchId, occurredAt, data}` envelope, assinado | Você está escrevendo sua própria integração, ou apontando para Zapier / Make / um servidor customizado |
| `"slack"` | `{ "text": "💝 Nova doação: $50.00" }` | Você está postando direto para uma URL de Webhook Incoming do Slack |
| `"discord"` | `{ "content": "💝 Nova doação: $50.00" }` | Você está postando direto para uma URL webhook de canal Discord |
| `"mailchimp"` | n/a — o conector chama a API do Mailchimp em si | Você quer [sincronização de público](/docs/b1-admin/integrations/services/mailchimp) sem URL para hospedar |

O tipo de conector é definido no dropdown **Tipo de Conector** no editor webhook, ou via `connectorType` no corpo `POST /membership/webhooks`. O cabeçalho assinado `X-B1-Signature` ainda é enviado para entregas Slack/Discord (eles o ignoram inofensivamente), então voltar um webhook para `standard` mais tarde não requer re-assinatura.

Slack e Discord são puras reformulações de corpo — o mecanismo ainda POSTs para a URL fornecida pela igreja. `mailchimp` é o primeiro conector que em vez disso possui sua troca HTTP: por evento ele emite pedidos de upsert/archive/tag autenticados contra a API do Mailchimp (`MailchimpConnector.deliver`), e suas credenciais (`{apiKey, audienceId}`) são armazenadas AES-criptografadas em `webhooks.connectorConfig`, apenas escrita através da API. Webhooks Mailchimp aceitam apenas eventos de pessoa, membro de grupo e membro de lista; a rota de salvamento verifica a chave e público contra Mailchimp antes de aceitar. Linhas de entrega armazenam o envelope padrão, para que o log de entrega mostre o que B1 viu ao lado da resposta do Mailchimp. Situações não mapeadas (pessoa sem email, evento sem mapeamento) são concluídas como bem-sucedidas com um corpo de resposta `Skipped:` em vez de queimar retentativas.

## Entregas de Teste

Cada editor de webhook tem um botão **Enviar Evento de Teste** — a chamada de API correspondente é `POST /membership/webhooks/:id/test`. A rota de teste constrói um payload sintético para o primeiro evento inscrito, despacha-o sincronamente através do caminho de entrega real assinado (e através de `formatForConnector` para Slack/Discord) e retorna a linha de entrega resultante incluindo `responseStatus` e `responseBody`. Use-a para confirmar conectividade e manipulação de assinatura antes de ligar a integração para real. Para webhooks `mailchimp` o teste em vez disso verifica as credenciais armazenadas contra a API do Mailchimp (um evento sintético escreveria um assinante falso no público real da igreja) e retorna um resultado em formato de entrega sem criar uma linha.

## Verificando Assinaturas

Sempre verifique `X-B1-Signature` antes de confiar um payload. A assinatura é `sha256=` seguido pelo hex HMAC-SHA256 do **corpo da solicitação bruta** codificado com seu segredo de assinatura. Compute-a sobre os bytes que você recebeu — não re-serialize o JSON analisado.

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

Rejeite qualquer solicitação cuja assinatura não corresponda. Opcionalmente também rejeite solicitações cujo `X-B1-Timestamp` tem mais de alguns minutos para limitar janelas de reprodução.

## Suporte a SDK

Para Node.js, `@churchapps/integration-sdk` envia um verificador digitado e um middleware Express que manipula a captura de corpo bruto, verificação de assinatura e análise de envelope para você:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Capture o corpo bruto antes do parse JSON — necessário para que a assinatura ainda se verifique.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("novo presente", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

O SDK também expõe `WebhookVerifier.verify(secret, rawBody, signatureHeader)` para runtimes não-Express (funções serverless, Fastify, etc.). Veja o pacote no npm.

## Entrega e Retentativas

Seu endpoint deve responder com um status `2xx` o mais rápido possível — idealmente depois de apenas filar o trabalho, não depois de processá-lo. Qualquer resposta não-`2xx`, uma falha de conexão ou uma resposta mais lenta que **10 segundos** conta como uma entrega falhada.

Entregas falhadas são retentadas com backoff exponencial — **16 tentativas ao longo de aproximadamente 5 dias**. O intervalo cresce de 1 minuto, através de horas, até gaps de 3 dias para as tentativas finais. Após a 16ª tentativa falhada a entrega é marcada `exhausted` e abandonada.

A entrega é **pelo menos uma vez**: uma entrega pode chegar mais de uma vez (por exemplo, se seu endpoint tem êxito mas a resposta é perdida). Use o cabeçalho `X-B1-Delivery-Id` para deduplicar — processe cada id apenas uma vez e trate repeats como no-ops.

### Auto-desativação

Se um webhook produzir **três entregas consecutivas esgotadas**, B1 o desativa automaticamente. Corrija seu endpoint, então reative o webhook em B1Admin (ou via `POST /membership/webhooks` com `"active": true`).

## Inspecionando e Re-entregando

O editor de webhook em B1Admin mostra uma tabela de **Entregas Recentes** — evento, status, contagem de tentativa, código de resposta e timestamp. Selecionar uma linha revela o payload completo que foi enviado e a resposta que voltou.

Use **Re-entregar** para re-fila qualquer entrega passada com seu payload original — útil após corrigir um bug em seu endpoint, ou para preencher retroativamente eventos que seu endpoint perdeu enquanto estava inativo.

## Requisitos de URL

Porque URLs de webhook são fornecidas pela igreja, B1 aplica guardas contra falsificação de solicitação do lado do servidor. Uma URL de webhook é rejeitada — no registro e re-verificada antes de cada entrega — se:

- não usa **`https`**
- aponta para `localhost`, um hostname `.local` / `.internal`, ou
- resolve para um IP **privado, loopback, link-local ou cloud-metadata**

Seu endpoint deve ser um serviço HTTPS publicamente acessível.
