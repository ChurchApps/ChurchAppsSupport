---
title: "Kiến trúc thời gian thực"
---

# Kiến trúc thời gian thực

<div class="article-intro">

ChurchApps sử dụng một khung truyền dữ liệu dựa trên WebSocket duy nhất cho mọi tính năng thời gian thực, bao gồm trò chuyện nhóm, tin nhắn riêng, ghi chú nội dung, trò chuyện trong luồng trực tiếp và trạng thái hiện diện/điểm danh. Trang này mô tả giao thức, máy chủ và các thành phần nguyên thủy phía máy khách mà các ứng dụng sử dụng.

</div>

## Tổng quan

```
┌────────────────────┐                ┌────────────────────────────┐
│ Browser / B1Admin  │                │  MessagingApi (Lambda)     │
│ Browser / B1App    │ ─── WS ─────▶  │  ┌───────────────────────┐ │
│  - SocketHelper    │                │  │ SocketHelper (server) │ │
│  - SubscriptionMgr │   POST /msg ──▶│  │ MessageController     │ │
│  - ConversationStore│  POST /conn ─▶│  │ ConnectionController  │ │
│  - PresenceStore   │ ◀── action ──  │  │ DeliveryHelper        │ │
└────────────────────┘                │  └───────────────────────┘ │
                                      └────────────────────────────┘
```

Giao thức gồm ba phần chính:

1. **Một WebSocket liên tục** cho mỗi thẻ trình duyệt, do `SocketHelper` mở.
2. **Các bản ghi kết nối** (`POST /messaging/connections`) được lưu trong bảng `connections`. Mỗi bản ghi đánh dấu một bộ `(socketId, churchId, conversationId)` là người đăng ký nhận thông tin của một phòng.
3. **Phân phối phía máy chủ** qua `DeliveryHelper.sendConversationMessages()`. Khi một tin nhắn được lưu (`POST /messaging/messages/send`), máy chủ đọc các bản ghi kết nối tương ứng và đẩy một payload có kiểu dữ liệu xác định đến từng socket đang mở.

Không có Socket.IO, không có cơ chế dự phòng long-polling và không có microservice riêng biệt. WebSocket chạy trong cùng tiến trình với REST API (Lambda `web` cho HTTP, Lambda `socket` cho WebSocket trên AWS; một tiến trình kết hợp khi chạy cục bộ và trên Railway).

## Cổng và giao thức truyền tải

| Môi trường | HTTP | WebSocket |
|-------------|------|-----------|
| Phát triển cục bộ | `8084` | `ws://localhost:8087` (`WebSocketServer` riêng biệt) |
| Railway / Docker / máy chủ chỉ có một cổng (khi đặt `RAILWAY_ENVIRONMENT` hoặc `SELF_HOSTED`) | dùng chung | máy chủ HTTP dùng chung (`SocketHelper.attachToServer()`) |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket (các route `$connect` / `$disconnect` / `$default`) |

Cấu hình `deliveryProvider` quyết định giao thức truyền tải được sử dụng:

- `local`: dùng thư viện `ws` thuần; máy khách kết nối đến `MessagingApiSocket` từ `CommonEnvironmentHelper`.
- `aws`: dùng API Gateway WebSocket; máy chủ gửi payload đến các kết nối đang hoạt động thông qua `@aws-sdk/client-apigatewaymanagementapi`.

Máy khách không cần biết đang dùng giao thức nào, vì cả hai đều sử dụng cùng một giao thức JSON.

## Giao thức truyền dữ liệu

Mỗi khung dữ liệu là một JSON có cấu trúc `PayloadInterface`:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // the "room" — usually a UUID, sometimes "alerts" or "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // server → client, after connect, carries the socketId to use for room joins
  | "message"             // server → client, new message
  | "deleteMessage"       // server → client, message removed
  | "privateMessage"      // server → client, badge-count ping to the recipient's "alerts" room when a direct message escalates; the message body itself arrives via the ordinary "message" action inside the open conversation
  | "reaction"            // server → client, emoji reaction toggled on a message; data is { messageId, conversationId, personId, emoji, added } (added=false means removed). Broadcast to the conversation room by POST /messaging/messages/:messageId/reactions
  | "conversationActivity"// server → client, secondary "something happened" signal for content-room subscribers
  | "attendance"          // server → client, viewer list / presence snapshot
  | "notification"        // server → client, generic notification (counts, etc.)
  | "reconnect"           // client-internal, dispatched locally by SocketHelper after a new socketId handshake completes following a drop — either an exponential-backoff reconnect after an unexpected close, or an immediate reconnect triggered by the resume probe (tab focus/visibility/online); never sent by the server
  | "alert" | "callout";  // legacy, see Connections endpoint reference
```

### Bắt tay kết nối

1. Máy khách mở socket và gửi chuỗi `"getId"`.
2. Máy chủ phản hồi bằng `{ action: "socketId", data: "<id>" }`.
3. Máy khách lưu `socketId` và dùng nó làm tọa độ thứ ba trong mọi đăng ký phòng.

### Tham gia phòng

"Phòng" chỉ là một bộ `(churchId, conversationId)`. Để đăng ký nhận thông tin, máy khách gửi một bản ghi `Connection`:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // optional; null for anonymous live stream viewers
    "displayName": "Anonymous4823"
  }
]
```

Việc gửi bản ghi này cũng kích hoạt một thông báo `attendance` trong cuộc trò chuyện, để những người đăng ký hiện có biết có người xem mới tham gia.

### Gửi tin nhắn

`POST /messaging/messages/send` (cho phép ẩn danh) hoặc `POST /messaging/messages/` (yêu cầu xác thực):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Máy chủ lưu tin nhắn, sau đó `DeliveryHelper.sendConversationMessages()` tìm mọi bản ghi kết nối của `conversationId` đó và gửi cho mỗi socket một khung `{ action: "message", data: <message> }`.

Với các cuộc trò chuyện gắn với nội dung (ví dụ: ghi chú đính kèm cho một người), một thông báo thứ hai với `action: "conversationActivity"` được phát trên phòng ảo `"content-{type}-{id}"`, để các thành phần hiển thị danh sách biết cần làm mới mà không cần giữ cuộc trò chuyện gốc luôn mở.

### Rời khỏi phòng

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Thao tác này xóa bản ghi kết nối và kích hoạt một thông báo điểm danh cuối cùng.

## Thành phần phía máy chủ

| Tệp | Vai trò |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Quản lý `WebSocketServer`. Gán `socketId` khi kết nối. Chạy cơ chế heartbeat ping/pong 30 giây (`startHeartbeat`), gọi `terminate()` và dọn dẹp mọi kết nối không phản hồi pong. Dọn dẹp các socket đã chết và phát lại thông báo điểm danh khi ngắt kết nối. Cung cấp `getLiveSocketIds()` và `reapStaleConnections()`, được bộ hẹn giờ 30 phút dùng để xóa các dòng `connections` cũ. Cục bộ, nó kiểm tra socketId nào vẫn còn hoạt động trong tiến trình; trên AWS, nó đóng vai trò dự phòng với TTL 24 giờ cho các sự kiện `$disconnect` bị bỏ sót (API Gateway giới hạn kết nối khoảng 2 giờ nên cơ chế này không thể xóa nhầm một kết nối đang hoạt động) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` đọc các kết nối của phòng và chuyển từng khung đến socket cục bộ hoặc kết nối API Gateway trên AWS. `sendAttendance(churchId, conversationId)` tạo và phát snapshot người xem |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` để tham gia, `DELETE /:churchId/:conversationId/:socketId` để rời phòng, `POST /setName` để cập nhật tên hiển thị |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (ẩn danh) và `POST /` (đã xác thực) lưu tin nhắn rồi phân phối |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` là nguồn dữ liệu chính xác về những ai đang đăng ký |

## Thành phần nguyên thủy phía máy khách (`@churchapps/apphelper`)

Cả năm thành phần nguyên thủy đều là singleton tĩnh trong `apphelper/src/helpers/`. Chúng phối hợp với nhau để mỗi thẻ trình duyệt chỉ mở **một** WebSocket, bất kể có bao nhiêu thành phần được gắn trên trang.

### `SocketHelper`

Quản lý kết nối WebSocket duy nhất. Lệnh gọi `init()` lặp lại là an toàn (idempotent): nhiều thành phần có thể gọi mà không mở thêm socket. Cung cấp:

- `init()`: mở (hoặc tái sử dụng) socket và hoàn tất bắt tay `getId`. Hàm này hoàn thành khi bắt tay xong, hoặc sau thời gian chờ 5 giây thì khi vòng lặp thử lại nền đã tiếp quản. Hàm không bao giờ reject, nên người gọi không cần xử lý riêng trường hợp kết nối lần đầu thất bại.
- `addHandler(action, id, fn)` / `removeHandler(id)`: đăng ký hoặc hủy đăng ký listener theo `action`. Nhiều handler có thể lắng nghe cùng một action.
- `setPersonChurch({ personId, churchId })`: dành cho người gọi đã xác thực; kích hoạt đăng ký phòng `"alerts"` để thông báo đẩy được gửi đến socket này.
- `onSocketIdReady(fn)`: kích hoạt với mọi socketId mới, không chỉ lần đầu. Gồm cả bắt tay ban đầu và mọi lần kết nối lại sau đó. `SubscriptionManager` dùng hàm này để gửi các yêu cầu tham gia đang chờ.
- `checkConnection()`: được các listener khôi phục bên dưới gọi; kết nối lại ngay nếu socket đã đóng, hoặc gửi một thăm dò còn sống nếu socket có vẻ vẫn mở.

**Vòng đời kết nối lại.** Khi kết nối bị đóng bất ngờ, một lần kết nối lại được lên lịch với thời gian chờ lũy thừa (1 giây, tăng gấp đôi đến tối đa 30 giây). `SocketHelper` cũng lắng nghe các sự kiện `online`, `focus`, `pageshow` và `visibilitychange` trên `window`/`document` để phát hiện khi thẻ được kích hoạt lại. Nếu socket đã đóng, nó kết nối lại ngay và đặt lại thời gian chờ. Nếu socket có vẻ vẫn mở, nó gửi một thăm dò `"getId"` và buộc kết nối lại nếu không nhận được khung nào trong vòng 3 giây. Cơ chế này bắt được các socket "nửa mở" còn sót lại sau khi hệ điều hành di động tạm dừng ứng dụng. Khi bắt tay lại thành công, `SocketHelper` phát action cục bộ `"reconnect"` (xem [Giao thức truyền dữ liệu](#wire-protocol)) đến mọi handler đã đăng ký cho action đó.

### `SubscriptionManager`

Quản lý tư cách thành viên phòng bằng đếm tham chiếu. Nhiều thành phần cùng đăng ký một cuộc trò chuyện chỉ tạo một bản ghi kết nối phía máy chủ.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Ba hành vi mà các ứng dụng nhận được miễn phí:

- **Trì hoãn khi rời phòng (300 ms)**: giúp vượt qua cơ chế mount/unmount kép của React StrictMode và các chu kỳ remount ngắn mà không làm mất đăng ký phía máy chủ. `reset()` cũng hủy mọi lệnh rời phòng đang chờ.
- **Tham gia lại khi kết nối lại**: `SubscriptionManager` ghi nhớ `personId`/`displayName` đã dùng để tham gia mỗi phòng. Khi sự kiện `"reconnect"` của `SocketHelper` xảy ra (và mỗi lần gọi `onSocketIdReady`), nó gửi lại mọi bản ghi kết nối đang hoạt động với danh tính đầy đủ. Các lần tham gia lại được loại trùng theo socketId, nên cùng một lần kết nối lại không gửi lại một phòng hai lần.
- **Gắn socketId muộn**: `joinRoom` ghi nhận ý định trước khi socket hoàn tất bắt tay. Yêu cầu `POST /connections` thực sự được gửi khi `onSocketIdReady` kích hoạt.

### `ConversationStore`

Bộ nhớ đệm trong bộ nhớ, được khóa theo `conversationId`. Đăng ký các handler socket `message` / `deleteMessage` / `privateMessage` đúng một lần và áp dụng các khung nhận được vào những cuộc trò chuyện đang mở.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ uses /messages/conversation/:id when authenticated, /messages/catchup/:churchId/:id when anonymous

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // re-render with the latest snapshot
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // optional explicit cleanup
```

Người gọi đã xác thực còn được **tải thông tin người dùng**: các `personId` trong tin nhắn đến được chuyển thành đối tượng `PersonInterface` thông qua truy vấn `GET /people/ids` có bộ nhớ đệm. Người gọi ẩn danh bỏ qua bước này.

Khi sự kiện `"reconnect"` của `SocketHelper` xảy ra, `ConversationStore` tải lại mọi cuộc trò chuyện đang có listener `subscribe` hoạt động, để khôi phục các tin nhắn bị bỏ lỡ trong lúc socket ngắt. Các cuộc trò chuyện ẩn danh không có `churchId` được ghi nhận sẽ bỏ qua bước đồng bộ này, vì endpoint đồng bộ yêu cầu có `churchId`.

### `PresenceStore`

Theo cùng mẫu thiết kế với `ConversationStore`, dùng cho action `attendance`. Người đăng ký nhận được một `PresenceSnapshot { conversationId, totalViewers, viewers }` mỗi khi máy chủ phát lại thông tin hiện diện. Các snapshot giống nhau được loại trùng trước khi thông báo, nên các đợt kết nối lại dồn dập không gây render lại không cần thiết.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Điểm khởi động cấp cao nhất cho người gọi **đã xác thực**. Bao bọc `SocketHelper.init()`, thiết lập ngữ cảnh người dùng và giáo hội (việc này tự động tham gia phòng `"alerts"`), và gọi `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` đúng một lần. Nó cũng đăng ký handler `"reconnect"` riêng để tải lại số lượng thông báo và tin nhắn riêng, giúp các huy hiệu được khôi phục sau khi kết nối bị gián đoạn.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Các luồng ẩn danh (trò chuyện trong luồng trực tiếp là ví dụ tiêu biểu) bỏ qua `NotificationService` và gọi trực tiếp các thành phần nguyên thủy. Xem `B1App/src/helpers/StreamChatManager.ts` để tham khảo cách triển khai.

## Trò chuyện trong luồng trực tiếp

Luồng trực tiếp là ứng dụng ẩn danh lớn nhất sử dụng khung này. Nó dùng hai `contentType` để phân vùng phòng:

- `streamingLive`: tab trò chuyện công khai trên `/stream` (mỗi `streamingService` có một phòng).
- `streamingLiveHost`: phòng riêng chỉ hiển thị cho nhân viên có quyền `contentApi.chat.host`. Mã phòng được mã hóa trên máy chủ (`GET /streamingServices/:id/hostChat`) để tránh việc thu thập dữ liệu tùy tiện làm lộ mã phòng.

`B1App/src/helpers/StreamChatManager.ts` khởi động cả hai phòng thông qua các thành phần nguyên thủy thống nhất. Hiện không còn mã socket riêng cho trò chuyện trong luồng trực tiếp.

## Mẫu thiết kế và các lỗi thường gặp

- **Đừng tự mở WebSocket riêng.** `SocketHelper` là singleton vì có lý do cụ thể. Nếu bạn cần lắng nghe một action tùy chỉnh, hãy đăng ký handler trên socket hiện có thông qua `SocketHelper.addHandler`.
- **Đừng bỏ qua `SubscriptionManager`.** Gọi trực tiếp `POST /connections` vẫn hoạt động, nhưng sẽ mất đếm tham chiếu, cơ chế trì hoãn khi rời phòng và tham gia lại khi kết nối lại. Các thành phần trò chuyện nhóm và tin nhắn riêng đều đi qua `SubscriptionManager`.
- **Mã handler phải là duy nhất trong mỗi action.** `SocketHelper.addHandler(action, id, fn)` khóa theo `(action, id)`. Nếu dùng lại cùng một id cho hai listener, listener thứ nhất sẽ bị thay thế. Các store thống nhất dùng các id như `"ConversationStore-Message"` và `"PresenceStore-Attendance"` để tránh trùng với id của ứng dụng.
- **Mã phòng là chuỗi không rõ cấu trúc.** Phần lớn là UUID của cuộc trò chuyện, nhưng hệ thống cũng hỗ trợ `"alerts"` (thông báo theo từng người), `"content-{type}-{id}"` (phòng hoạt động ảo) và các mã `streamingLiveHost` đã được mã hóa.
- **Xác thực được kiểm tra ở ranh giới REST, không phải ở socket.** Việc tham gia phòng bằng `POST /connections` cho phép ẩn danh. Kiểm soát truy cập diễn ra khi gửi tin nhắn (controller tin nhắn quyết định những `messageType` nào người gọi ẩn danh được phép gửi).

## Trang liên quan

- [Kiến trúc thông báo](./architecture/notifications) -- Phễu chuyển tiếp thông báo trong ứng dụng, đẩy và email mà lớp truyền tải này cung cấp dữ liệu cho
- [Endpoint nhắn tin](./api/endpoints/messaging) -- Toàn bộ REST API cho tin nhắn, cuộc trò chuyện, kết nối và thiết bị
- [Thông báo đẩy trên web](./web-push) -- Thông báo đẩy trên trình duyệt, tách biệt với việc truyền dữ liệu socket trong trang
- [AppHelper](./shared-libraries/app-helper) -- Gói npm chứa các thành phần nguyên thủy phía máy khách
- [Cấu trúc module](./api/module-structure) -- Cách tổ chức module nhắn tin phía máy chủ
