---
title: "Webhooks"
description: "Thiết lập webhook thời gian thực từ B1 Admin: đăng ký endpoint, chọn sự kiện, xác minh chữ ký HMAC, xử lý thử lại và gửi lại dữ liệu bị lỗi."
---

# Webhooks

<div class="article-intro">

Webhook cho phép nhà thờ gửi thông báo theo thời gian thực đến các công cụ bên thứ ba, chẳng hạn như nền tảng tự động hóa (Zapier, Make, n8n), CRM, hệ thống kế toán, hoặc bất kỳ dịch vụ nào chấp nhận HTTP POST. Khi một người, nhóm hoặc hộ gia đình thay đổi trong B1, B1 sẽ gửi một payload JSON đã được ký đến mọi URL đã đăng ký nhận sự kiện đó.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Quản trị viên nhà thờ có quyền **Edit Church Settings** mới có thể đăng ký và quản lý webhook
- Endpoint nhận dữ liệu của bạn phải truy cập được qua **HTTPS** tại một địa chỉ công khai
- Chuẩn bị sẵn cách lưu trữ an toàn khóa bí mật dùng để ký, vì khóa này chỉ được hiển thị một lần

</div>

## Tổng quan

Webhook chỉ hoạt động theo chiều **đi ra**: B1 gọi đến endpoint của bạn, còn bạn không gọi ngược lại B1. Mỗi webhook là một đăng ký riêng cho từng nhà thờ, gồm URL đích, khóa bí mật dùng để ký và danh sách các sự kiện đã đăng ký.

Việc gửi dữ liệu sử dụng **hàng đợi bền vững (durable outbox)**: khi một sự kiện đã đăng ký xảy ra, B1 ghi một bản ghi gửi, và một tiến trình nền sẽ POST dữ liệu đó trong vòng khoảng một phút. Các lần gửi thất bại sẽ được thử lại với độ trễ tăng dần theo cấp số nhân. Dữ liệu không bị mất nếu việc gửi chậm hoặc endpoint của bạn tạm thời ngừng hoạt động.

## Đăng ký webhook

### Trong B1Admin

Vào **Settings → Developer → Webhooks → New Webhook**. Nhập tên, URL nhận payload và chọn các sự kiện cần đăng ký. Khi lưu, **khóa bí mật dùng để ký sẽ được hiển thị một lần**. Hãy sao chép ngay và lưu cùng với tích hợp của bạn. Khóa này sẽ không bao giờ được hiển thị lại. Bạn có thể tạo lại khóa sau này, nhưng không thể lấy lại khóa ban đầu.

### Qua API

Mọi endpoint nằm dưới đường dẫn gốc của module Membership là `/membership/webhooks`, và yêu cầu một trong hai thứ: JWT từ quản trị viên nhà thờ có quyền `Settings / Edit`, **hoặc một [API key](./api-keys.md) được tạo với phạm vi `settings:write`**. Các route này chấp nhận cả hai. Nhờ vậy, Zapier và Make có thể đăng ký webhook thay mặt nhà thờ khi một Zap hoặc scenario được bật.

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

Phản hồi khi tạo, và **chỉ** phản hồi khi tạo, mới bao gồm `secret`:

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

| Method & Path | Mục đích |
|---|---|
| `GET /membership/webhooks` | Liệt kê các webhook của nhà thờ (không có secret) |
| `GET /membership/webhooks/events` | Danh mục tên sự kiện hợp lệ |
| `GET /membership/webhooks/:id` | Tải một webhook |
| `POST /membership/webhooks` | Tạo mới (không có `id`) hoặc cập nhật (có `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Đổi khóa bí mật dùng để ký; trả về giá trị mới một lần |
| `DELETE /membership/webhooks/:id` | Xóa một webhook |
| `GET /membership/webhooks/:id/deliveries` | Các lần thử gửi gần đây của một webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Toàn bộ payload và phản hồi của một lần gửi |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Đưa lại một lần gửi vào hàng đợi |

## Danh mục sự kiện

Tên sự kiện theo mẫu `{entity}.{action}`. Lấy danh sách mới nhất từ `GET /membership/webhooks/events`.

| Sự kiện | Kích hoạt khi |
|---|---|
| `person.created` | Một người được thêm vào |
| `person.updated` | Hồ sơ một người được thay đổi |
| `person.destroyed` | Một người bị xóa |
| `household.created` | Một hộ gia đình được thêm vào |
| `household.updated` | Một hộ gia đình được thay đổi |
| `household.destroyed` | Một hộ gia đình bị xóa |
| `group.created` | Một nhóm được thêm vào |
| `group.updated` | Một nhóm được thay đổi |
| `group.destroyed` | Một nhóm bị xóa |
| `group.member.added` | Một người được thêm vào nhóm |
| `group.member.removed` | Một người bị xóa khỏi nhóm |
| `donation.created` | Một khoản quyên góp được ghi nhận: nhập thủ công, trực tuyến, hoặc khi chuyển từ đang chờ sang hoàn tất |
| `donation.updated` | Một bản ghi quyên góp được chỉnh sửa |
| `attendance.recorded` | Một lượt tham dự được ghi lại (nhập thủ công hoặc check-in) |
| `session.created` | Một phiên điểm danh mới được tạo (thủ công hoặc tự động ở lần check-in đầu tiên) |
| `form.submission.created` | Một biểu mẫu được gửi |
| `event.created` | Một sự kiện trên lịch được thêm vào |
| `event.updated` | Một sự kiện trên lịch được chỉnh sửa |
| `event.destroyed` | Một sự kiện trên lịch bị xóa |

## Định dạng payload

Mỗi lần gửi là một HTTP `POST` với body JSON và các header sau:

| Header | Mô tả |
|---|---|
| `Content-Type` | Luôn là `application/json` |
| `X-B1-Event` | Tên sự kiện, ví dụ `person.created` |
| `X-B1-Delivery-Id` | Id duy nhất của lần thử gửi này, dùng để loại bỏ trùng lặp |
| `X-B1-Signature` | Chữ ký HMAC-SHA256 của raw body (xem bên dưới) |
| `X-B1-Timestamp` | Số giây Unix epoch tại thời điểm request được gửi |
| `User-Agent` | `B1-Webhooks/1.0` |

Body bao bọc tài nguyên đã thay đổi trong một envelope nhỏ:

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

Với các sự kiện `*.destroyed`, `data` chỉ chứa `id` và `churchId` của bản ghi đã xóa.

Các sự kiện có payload tham chiếu đến bản ghi khác bằng id cũng mang theo tên dễ đọc, được xác định tại thời điểm gửi: `personName` và `groupName` ở các sự kiện thành viên nhóm, `personName` ở các sự kiện điểm danh, quyên góp và thành viên danh sách, `groupName` ở `session.created`, và `formName` (cùng với `personName` khi bản gửi biểu mẫu được liên kết với một người) ở `form.submission.created`.

## Loại connector

Định dạng gửi mặc định là JSON envelope ở trên, tức `connectorType: "standard"`. Đối với [Slack và Discord](/docs/b1-admin/integrations/slack-discord), cùng một engine webhook sẽ thay vào đó gửi một tin nhắn dạng chat mà các dịch vụ này chấp nhận trực tiếp:

| `connectorType` | Body được gửi | Dùng khi |
|---|---|---|
| `"standard"` (mặc định) | Envelope `{event, churchId, occurredAt, data}`, có ký | Bạn đang tự viết tích hợp, hoặc trỏ đến Zapier / Make / một máy chủ tùy chỉnh |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Bạn gửi trực tiếp đến URL Slack Incoming Webhook |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Bạn gửi trực tiếp đến URL webhook của kênh Discord |
| `"mailchimp"` | Không áp dụng. Connector tự gọi API của Mailchimp | Bạn muốn [đồng bộ danh sách khán giả](/docs/b1-admin/integrations/services/mailchimp) mà không cần máy chủ để lưu URL |

Loại connector được đặt trong dropdown **Connector Type** trên trình chỉnh sửa webhook, hoặc qua `connectorType` trong body của `POST /membership/webhooks`. Header `X-B1-Signature` có ký vẫn được gửi cho các lần gửi Slack/Discord (chúng bỏ qua header này mà không gây lỗi), nên việc chuyển webhook về `standard` sau này không cần ký lại.

Slack và Discord chỉ là việc định dạng lại body. Engine vẫn POST đến URL do nhà thờ cung cấp. `mailchimp` là connector đầu tiên tự quản lý trao đổi HTTP của chính nó: với mỗi sự kiện, nó gửi các yêu cầu upsert, archive hoặc tag đã xác thực đến API của Mailchimp (`MailchimpConnector.deliver`). Thông tin xác thực của nó (`{apiKey, audienceId}`) được lưu dưới dạng mã hóa AES trong `webhooks.connectorConfig`, và chỉ có thể ghi qua API. Webhook Mailchimp chỉ chấp nhận các sự kiện person, group-member và list-member. Route lưu sẽ xác minh khóa và audience với Mailchimp trước khi chấp nhận. Các bản ghi gửi lưu envelope chuẩn, nên nhật ký gửi cho thấy những gì B1 đã nhận được cùng với phản hồi từ Mailchimp. Các trường hợp không có ánh xạ (người không có email, sự kiện không có ánh xạ) sẽ được đánh dấu là thành công với nội dung phản hồi `Skipped:` thay vì tiêu tốn các lần thử lại.

## Gửi thử

Mọi trình chỉnh sửa webhook đều có nút **Send Test Event**. Lệnh API tương ứng là `POST /membership/webhooks/:id/test`. Route thử nghiệm tạo một payload giả cho sự kiện đầu tiên đã đăng ký, gửi nó đồng bộ qua đường gửi có ký thật (và qua `formatForConnector` đối với Slack/Discord), rồi trả về bản ghi gửi kết quả, bao gồm `responseStatus` và `responseBody`. Hãy dùng nó để xác nhận kết nối và việc xử lý chữ ký trước khi bật tích hợp thật sự. Với webhook `mailchimp`, thử nghiệm sẽ thay vào đó xác minh thông tin xác thực đã lưu với API của Mailchimp (một sự kiện giả sẽ ghi một người đăng ký giả vào audience thật của nhà thờ), và trả về kết quả có dạng như một lần gửi mà không tạo bản ghi.

## Xác minh chữ ký

Luôn xác minh `X-B1-Signature` trước khi tin tưởng một payload. Chữ ký có dạng `sha256=` theo sau bởi chuỗi hex HMAC-SHA256 của **raw request body**, được tính với khóa bí mật của bạn. Hãy tính trên các byte bạn đã nhận được, không serialize lại JSON đã parse.

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

Từ chối mọi request có chữ ký không khớp. Tùy chọn, bạn cũng có thể từ chối các request có `X-B1-Timestamp` cũ hơn vài phút để hạn chế thời gian có thể bị phát lại (replay).

## Hỗ trợ SDK

Với Node.js, `@churchapps/integration-sdk` cung cấp một bộ xác minh có kiểu dữ liệu và middleware Express. Middleware này xử lý việc thu raw body, kiểm tra chữ ký và phân tích envelope cho bạn:

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

SDK cũng cung cấp `WebhookVerifier.verify(secret, rawBody, signatureHeader)` cho các runtime không dùng Express (serverless functions, Fastify, v.v.). Xem thêm gói trên npm.

## Gửi lại và thử lại

Endpoint của bạn nên phản hồi với mã `2xx` càng nhanh càng tốt, lý tưởng là chỉ sau khi đưa công việc vào hàng đợi, chứ không phải sau khi xử lý xong. Bất kỳ phản hồi nào không phải `2xx`, lỗi kết nối, hoặc phản hồi chậm hơn **10 giây** đều được tính là một lần gửi thất bại.

Các lần gửi thất bại được thử lại với độ trễ tăng dần theo cấp số nhân: **tối đa 16 lần thử trong khoảng 5 ngày**. Khoảng cách bắt đầu từ 1 phút, tăng dần lên hàng giờ, và đến khoảng cách 3 ngày cho các lần thử cuối. Sau lần thử thứ 16 thất bại, bản ghi gửi được đánh dấu `exhausted` và bị bỏ.

Việc gửi theo nguyên tắc **at-least-once**: một lần gửi có thể đến nhiều hơn một lần (chẳng hạn, nếu endpoint của bạn xử lý thành công nhưng phản hồi bị thất lạc). Hãy dùng header `X-B1-Delivery-Id` để loại bỏ trùng lặp: xử lý mỗi id một lần duy nhất và coi các lần lặp lại là không có tác dụng.

### Tự động vô hiệu hóa

Nếu một webhook tạo ra **ba lần gửi `exhausted` liên tiếp**, B1 sẽ tự động vô hiệu hóa nó. Hãy sửa endpoint, sau đó bật lại webhook trong B1Admin (hoặc qua `POST /membership/webhooks` với `"active": true`).

## Kiểm tra và gửi lại

Trình chỉnh sửa webhook trong B1Admin hiển thị bảng **Recent Deliveries**, gồm sự kiện, trạng thái, số lần thử, mã phản hồi và thời gian. Chọn một hàng sẽ hiển thị toàn bộ payload đã gửi và phản hồi nhận về.

Dùng **Redeliver** để đưa lại vào hàng đợi bất kỳ lần gửi nào trước đó với payload gốc. Điều này hữu ích sau khi bạn sửa lỗi trong endpoint, hoặc để bù đắp các sự kiện mà endpoint đã bỏ lỡ trong thời gian ngừng hoạt động.

## Yêu cầu về URL

Vì URL webhook do nhà thờ cung cấp, B1 áp dụng các biện pháp bảo vệ chống giả mạo yêu cầu phía máy chủ (SSRF). Một URL webhook sẽ bị từ chối khi đăng ký và được kiểm tra lại trước mỗi lần gửi nếu nó:

- không dùng **`https`**
- trỏ đến `localhost`, một hostname `.local` / `.internal`, hoặc
- phân giải thành một địa chỉ IP **private, loopback, link-local hoặc cloud-metadata**

Endpoint của bạn phải là một dịch vụ HTTPS có thể truy cập công khai.
