---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks permitem que uma igreja envie notificações em tempo real para ferramentas de terceiros — plataformas de automação (Zapier, Make, n8n), CRMs, sistemas de contabilidade ou qualquer coisa que aceite um POST HTTP. Quando uma pessoa, grupo ou família muda no B1, o B1 envia um payload JSON assinado para cada URL inscrita naquele evento.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Um administrador da igreja com a permissão **Editar Configurações da Igreja** registra e gerencia webhooks
- Seu endpoint receptor deve ser acessível via **HTTPS** em um endereço público
- Tenha uma forma de armazenar o segredo de assinatura com segurança — ele é mostrado apenas uma vez

</div>

## Visão Geral

Webhooks são **apenas de saída**: B1 chama seu endpoint, você não chama o B1. Cada webhook é uma inscrição por igreja consistindo de uma URL de destino, um segredo de assinatura e uma lista de eventos inscritos.

A entrega usa uma **outbox durável**: quando um evento inscrito ocorre, o B1 registra uma linha de entrega e um worker em segundo plano faz POST dela em cerca de um minuto. Entregas falhadas são reexecutadas com backoff exponencial. Nada é perdido se uma entrega está lenta ou seu endpoint está temporariamente fora do ar.

## Registrando um Webhook

### No B1Admin

Vá para **Configurações → Webhooks → Novo Webhook**. Digite um nome, a URL do payload e selecione os eventos para se inscrever. Ao salvar, o **segredo de assinatura é exibido uma vez** — copie-o imediatamente e armazene-o com sua integração. Ele nunca é mostrado novamente (você pode rotacioná-lo mais tarde, mas não pode recuperar o original).

### Via API

Todos os endpoints estão sob o caminho base do módulo Membership `/membership/webhooks` e requerem um JWT de um administrador da igreja com a permissão `Settings / Edit`.

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
| `GET /membership/webhooks/:id` | Carregar um webhook |
| `POST /membership/webhooks` | Criar (sem `id`) ou atualizar (com `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Rotacionar o segredo de assinatura; retorna o novo valor uma vez |
| `DELETE /membership/webhooks/:id` | Excluir um webhook |
| `GET /membership/webhooks/:id/deliveries` | Tentativas de entrega recentes para um webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Payload completo e resposta para uma entrega |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Reenfileirar uma entrega |

## Catálogo de Eventos

Nomes de eventos seguem o padrão `{entidade}.{ação}`. Busque a lista ao vivo de `GET /membership/webhooks/events`.

| Evento | Dispara quando |
|---|---|
| `person.created` | Uma pessoa é adicionada |
| `person.updated` | Um registro de pessoa é alterado |
| `person.destroyed` | Uma pessoa é excluída |
| `household.created` | Uma família é adicionada |
| `household.updated` | Uma família é alterada |
| `household.destroyed` | Uma família é excluída |
| `group.created` | Um grupo é adicionado |
| `group.updated` | Um grupo é alterado |
| `group.destroyed` | Um grupo é excluído |
| `group.member.added` | Uma pessoa é adicionada a um grupo |
| `group.member.removed` | Uma pessoa é removida de um grupo |

## Formato do Payload

Cada entrega é um `POST` HTTP com um corpo JSON e estes cabeçalhos:

| Cabeçalho | Descrição |
|---|---|
| `Content-Type` | Sempre `application/json` |
| `X-B1-Event` | O nome do evento, por exemplo `person.created` |
| `X-B1-Delivery-Id` | Id único para esta tentativa de entrega — use-o para deduplicar |
| `X-B1-Signature` | Assinatura HMAC-SHA256 do corpo bruto (veja abaixo) |
| `X-B1-Timestamp` | Segundos epoch Unix quando a solicitação foi enviada |
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

Para eventos `*.destroyed`, `data` contém apenas o `id` e `churchId` do registro excluído.

## Verificando Assinaturas

Sempre verifique `X-B1-Signature` antes de confiar em um payload. A assinatura é `sha256=` seguida do hex HMAC-SHA256 do **corpo bruto da solicitação** com chave do seu segredo de assinatura. Calcule-o sobre os bytes que você recebeu — não serialize novamente o JSON analisado.

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

Rejeite qualquer solicitação cuja assinatura não corresponda. Opcionalmente, também rejeite solicitações cujo `X-B1-Timestamp` tem mais de alguns minutos para limitar janelas de replay.

## Entrega e Reexecuções

Seu endpoint deve responder com um status `2xx` o mais rápido possível — idealmente após apenas enfileirar o trabalho, não após processá-lo. Qualquer resposta não `2xx`, uma falha de conexão ou uma resposta mais lenta que **10 segundos** conta como uma entrega falha.

Entregas falhadas são reexecutadas com backoff exponencial — **16 tentativas ao longo de aproximadamente 5 dias**. O intervalo cresce de 1 minuto, passando por horas, até lacunas de 3 dias para as tentativas finais. Após a 16ª tentativa falhada, a entrega é marcada como `exhausted` e abandonada.

A entrega é **no mínimo uma vez**: uma entrega pode chegar mais de uma vez (por exemplo, se seu endpoint tiver sucesso mas a resposta for perdida). Use o cabeçalho `X-B1-Delivery-Id` para deduplicar — processe cada id apenas uma vez e trate repetições como no-ops.

### Desativação Automática

Se um webhook produzir **três entregas esgotadas consecutivas**, o B1 o desativa automaticamente. Corrija seu endpoint, depois reative o webhook no B1Admin (ou via `POST /membership/webhooks` com `"active": true`).

## Inspecionando e Reenviando

O editor de webhook no B1Admin mostra uma tabela de **Entregas Recentes** — evento, status, contagem de tentativas, código de resposta e timestamp. Selecionar uma linha revela o payload completo que foi enviado e a resposta que voltou.

Use **Reenviar** para reenfileirar qualquer entrega passada com seu payload original — útil após corrigir um bug no seu endpoint, ou para preencher eventos que seu endpoint perdeu enquanto estava fora do ar.

## Requisitos de URL

Como as URLs de webhook são fornecidas pela igreja, o B1 aplica proteções contra falsificação de solicitação do lado do servidor. Uma URL de webhook é rejeitada — no registro e reverificada antes de cada entrega — se ela:

- não usa **`https`**
- aponta para `localhost`, um nome de host `.local` / `.internal`, ou
- resolve para um endereço IP **privado, loopback, link-local ou de metadados de nuvem**

Seu endpoint deve ser um serviço HTTPS publicamente acessível.
