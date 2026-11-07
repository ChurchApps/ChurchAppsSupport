---
title: "Thông báo đẩy trên web"
---

# Thông báo đẩy trên web

<div class="article-intro">

Các ứng dụng web của ChurchApps gửi thông báo đẩy qua W3C Web Push API, cùng cơ chế mà Firebase Cloud Messaging dùng ở phía máy chủ, nhưng được gửi qua `PushManager` gốc của trình duyệt thay vì FCM. Một cặp khóa VAPID duy nhất trên MessagingApi phục vụ mọi ứng dụng sử dụng nó (B1Admin, B1App và các PWA trong tương lai).

</div>

## Khi nào thông báo đẩy được gửi

Thông báo đẩy là một tầng trong một lượt gửi duy nhất bên trong `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): trước tiên là cổng kiểm tra tùy chọn trong ứng dụng, sau đó gửi qua socket và thông báo đẩy được thử trong cùng một lượt (mỗi loại có cổng kiểm tra tùy chọn riêng), cuối cùng là email. Người nhận đã tắt thông báo cho một danh mục sẽ không bao giờ nhận được thông báo đẩy. Việc gửi qua socket thành công không còn ngăn thông báo đẩy được gửi nữa. Mọi loại thông báo giờ đều hoạt động như tin nhắn riêng vẫn hoạt động từ trước, nên một PWA đã cài đặt và đang chạy nền vẫn hiển thị thông báo ở cấp hệ điều hành ngay cả khi thông báo qua socket đã đến nơi. Thay vào đó, service worker ở phía client sẽ ẩn các banner trùng lặp (xem [Yêu cầu về service worker](#service-worker-requirement)). Các nhắc nhở đã lên lịch và các thông báo hàng loạt do nhân viên kích hoạt bắt đầu trực tiếp ở tầng thông báo đẩy, bỏ qua bước socket. Email vẫn do bộ hẹn giờ điều khiển, leo thang các hàng chưa đọc theo lịch riêng thay vì là một phần của lượt gửi này.

Các đường dẫn phổ biến nhất đến tầng thông báo đẩy:

1. **Thông báo nội dung**: phản hồi trong một cuộc trò chuyện mà người dùng đang theo dõi, lượt nhắc tên, hoặc một sự kiện khác được định tuyến qua `NotificationHelper.createNotifications()`.
2. **Tin nhắn riêng**: tin nhắn trực tiếp đi qua cùng hàm gửi và luôn thử gửi thông báo đẩy song song với socket.
3. **Nhắc nhở đã lên lịch**: nhắc nhở về sự kiện, công việc và phân công phục vụ được bộ máy nhắc nhở mở rộng và gửi đi. Bộ máy này bắt đầu các lần xuất hiện mới trực tiếp ở tầng thông báo đẩy.
4. **Thông báo đẩy do nhân viên kích hoạt**: `POST /messaging/notifications/create`, `/ping` và `/group/send` dùng cho các thông báo gửi một lần hoặc gửi theo nhóm.

## Luồng xử lý phía máy chủ

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ cổng kiểm tra tùy chọn trong ứng dụng    ← người nhận đã tắt thông báo sẽ dừng tại đây, không gửi đẩy
       ├─ cùng một lượt, cả hai đều được thử (không cái nào chặn cái nào):
       │    ├─ gửi qua socket bằng DeliveryHelper  ← bỏ qua với nhắc nhở/thông báo hàng loạt (chúng bắt đầu ở tầng đẩy)
       │    └─ cổng kiểm tra tùy chọn thông báo đẩy
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ thư viện web-push → POST có chữ ký VAPID → dịch vụ đẩy của trình duyệt
       └─ cổng kiểm tra tùy chọn email → do bộ hẹn giờ điều khiển, leo thang các hàng chưa đọc riêng
```

### Biến môi trường bắt buộc

Các khóa VAPID được lưu trong `Environment` và phải có mặt thì thông báo đẩy mới được bật:

| Biến môi trường | Thiết lập trong `Environment` | Mô tả |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Khóa công khai VAPID (base64url). Được trả về cho client qua `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Khóa riêng tư VAPID. Dùng để ký mọi thông báo đẩy gửi đi |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI `mailto:` được báo cho dịch vụ đẩy. Mặc định là `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` trả về `false` khi thiếu một trong hai khóa. Mô-đun messaging vẫn hoạt động bình thường, chỉ là các lần gửi thông báo đẩy không làm gì cả. Trang web di động B1App khi đó sẽ thông báo cho thành viên rằng thông báo đẩy chưa được bật, thay vì đề nghị thiết lập.

### Tạo cặp khóa VAPID

```bash
npx web-push generate-vapid-keys
```

Thêm kết quả vào tệp `.env` của bạn (môi trường cục bộ) hoặc AWS SSM Parameter Store (môi trường đã triển khai). Việc thay khóa sẽ làm mất hiệu lực mọi đăng ký hiện có. Client phải đăng ký lại vào lần tải trang tiếp theo.

## Mô hình lưu trữ

Đăng ký Web Push được lưu trong bảng `devices` sẵn có, cùng với các bản ghi thiết bị FCM. Chúng được phân biệt bằng tiền tố `webpush:` trên cột `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Nhờ vậy, một lệnh gọi `loadByPersonId` duy nhất trả về mọi thiết bị mà người dùng đã đăng ký, bất kể nền tảng. `WebPushHelper.isWebPushToken(token)` và `decodeSubscription(token)` xử lý phần tiền tố.

## Các endpoint

Đường dẫn gốc: `/messaging/webpush`

| Phương thức | Đường dẫn | Xác thực | Mô tả |
|--------|------|------|-------------|
| GET | `/publicKey` | Công khai | Trả về `{ publicKey, enabled }`. Client truyền `publicKey` vào `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Đăng ký (hoặc cập nhật nếu đã tồn tại) cho người dùng đã xác thực. Nội dung: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Công khai | Xóa mọi dòng thiết bị có `fcmToken` chứa endpoint được cung cấp. Nội dung: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Xóa một dòng thiết bị cụ thể theo id phía máy chủ |

## Thành phần client: `WebPushHelper`

`WebPushHelper` trong `@churchapps/apphelper` là điểm truy cập duy nhất phía client. Ứng dụng host cấu hình nó một lần khi khởi động và gọi `subscribe()` sau khi đăng nhập.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// Trong phần khởi tạo của ứng dụng (ví dụ: _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // phạm vi service worker; khớp với đăng ký sw.js
  appName: "B1AppPwa"        // được lưu trên dòng thiết bị, hữu ích để lọc theo bề mặt sử dụng
});

// Sau khi đăng nhập (và sau mỗi lần userChurch thay đổi)
await WebPushHelper.subscribe();
```

Các hành vi mà ứng dụng sử dụng nhận được miễn phí:

- **Kiểm tra khả năng hỗ trợ**: `isSupported()` trả về `false` trên các trình duyệt không có `serviceWorker` / `PushManager` / `Notification`.
- **Thời gian chờ**: `canPromptNow()` áp dụng thời gian chờ 7 ngày giữa các lần hỏi thông qua `localStorage`, để người dùng đã từ chối hộp thoại của hệ điều hành không bị hỏi lại ở mỗi phiên.
- **Từ chối nhận**: `setOptedOut(true)` và `unsubscribe()` ngăn việc hỏi lại và xóa dòng thiết bị phía máy chủ.
- **Phát hiện PWA độc lập**: `isStandalone()` cho phép ứng dụng host chỉ hiển thị lời nhắc thông báo đẩy trên iOS sau khi người dùng đã cài PWA vào màn hình chính (iOS chỉ cho phép thông báo đẩy từ PWA đã cài đặt).
- **Đăng ký lại khi chuyển giáo hội**: `refreshEnrollment()` gửi lại đăng ký trình duyệt hiện có cho `userChurch` mới mà không hỏi lại người dùng. Hãy gọi hàm này từ trình xử lý thay đổi `userChurch`.

### Yêu cầu về service worker

`PushManager` của trình duyệt chỉ trả về một đăng ký khi có service worker được đăng ký ở phạm vi đã cấu hình. Các PWA của ChurchApps dùng [Serwist](https://serwist.dev/) (ứng dụng Next.js) hoặc workbox để tạo service worker. Vì máy chủ giờ luôn thử gửi thông báo đẩy song song với socket (xem [Khi nào thông báo đẩy được gửi](#when-push-fires)), service worker là điểm loại trùng. Trình xử lý `push` của nó phải ẩn `showNotification` khi một client đang focus hoặc hiển thị đã ở đúng đích deep-link của thông báo, nhưng luôn phải cập nhật huy hiệu ứng dụng bất kể banner có được hiển thị hay không:

```javascript
// public/sw.js (hoặc tệp mà Serwist/workbox tạo ra)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // luôn chạy, kể cả khi banner bị ẩn

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Cùng pathname; với tin nhắn riêng, cũng phải cùng conversationId.
    const alreadyViewing = clients.some((client) => (client.focused || client.visibilityState === "visible") && clientMatchesTarget(client.url, target));
    if (alreadyViewing) return;

    await self.registration.showNotification(title, {
      body: data.body,
      data: { type: data.type, contentId: data.contentId, url: target },
      icon: "/icons/icon-192.png"
    });
  })());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const { url: target } = event.notification.data || {};
  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });

    const exact = clients.find((client) => clientMatchesTarget(client.url, target));
    if (exact) return exact.focus(); // đã ở đúng đích: focus, không điều hướng

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` và `clientMatchesTarget` phụ thuộc vào từng ứng dụng cụ thể. Xem `B1App/src/app/sw.ts` để biết cách triển khai tham chiếu. B1App định tuyến `privateMessage` đến `/mobile/messages/:personId`, B1Admin định tuyến `notification` đến bảng cảnh báo của mình, v.v.

## Ghi chú vận hành

- **Kết quả `gone: true`**: `WebPushHelper.sendBulk` trả về `{ token, success, gone, errorMessage }` cho từng người nhận. Kết quả `gone: true` (dịch vụ đẩy trả về `404` hoặc `410`) có nghĩa là đăng ký đã vĩnh viễn không hợp lệ. Mã phía sau trong `NotificationHelper` sẽ xóa các dòng thiết bị đó để không thử lại nữa.
- **TTL**: thông báo đẩy được gửi với `TTL: 86400` (24 giờ). Nếu trình duyệt của người dùng không kết nối được với dịch vụ đẩy trong 24 giờ, thông báo sẽ bị hủy.
- **Không thử lại**: lỗi tạm thời (hết thời gian chờ, 5xx) được ghi log và không thử lại. Thông báo đẩy là dạng nỗ lực tốt nhất. Socket trong trang và tầng email đảm nhiệm việc đảm bảo thông báo không bị mất.
- **Môi trường không bật**: các môi trường phát triển có thể để trống khóa VAPID. Khi đó `WebPushHelper.isEnabled()` trả về `false` và thông báo đẩy sẽ bị bỏ qua ngay. Đây là hành vi được thiết kế cho các môi trường không có danh tính VAPID riêng.

## Trang liên quan

- [Kiến trúc thông báo](./architecture/notifications): Toàn bộ phễu leo thang thông báo trong ứng dụng/đẩy/email và bộ máy nhắc nhở
- [Kiến trúc thời gian thực](./realtime): Gửi qua WebSocket. Thông báo đẩy giờ được kích hoạt từ cùng phễu trong ứng dụng song song với socket trong cùng một lượt, không chỉ là phương án dự phòng khi gửi qua socket thất bại
- [Endpoint messaging](./api/endpoints/messaging): Thông báo, thiết bị và phần còn lại của bề mặt messaging
- [AppHelper](./shared-libraries/app-helper): Gói npm cung cấp `WebPushHelper`
