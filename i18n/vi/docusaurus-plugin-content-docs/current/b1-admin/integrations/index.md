---
title: "Tích hợp"
description: "Kết nối B1 Admin với Slack, Discord, Zapier, Make, Google Sheets và trợ lý AI như Claude, kèm các bước thiết lập và phạm vi khóa API cần thiết."
---

# Tích hợp

<div class="article-intro">

B1 kết nối với các công cụ mà nhóm của bạn đang dùng. Kết nối Slack hoặc Discord để nhận thông báo cho nhân sự, tự động hóa quy trình trong Zapier hoặc Make, hoặc xuất dữ liệu theo yêu cầu sang Google Sheets, mà không cần trả tiền cho một nền tảng tích hợp riêng và không cần ChurchApps lưu trữ thêm gì. Mỗi tích hợp chạy trên hạ tầng của bên thứ ba và trao đổi với hội thánh của bạn thông qua webhook hoặc REST API của B1.

</div>

## Những gì có sẵn

| Tích hợp | Chức năng | Hướng | Công sức thiết lập |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | Đăng thông báo dễ đọc (người mới, quyên góp, đăng ký, …) lên kênh Slack | B1 → Slack | 2 phút |
| **[Discord](./slack-discord.md)** | Tương tự, trên kênh Discord | B1 → Discord | 2 phút |
| **[Zapier](./zapier.md)** | Dùng sự kiện B1 làm trình kích hoạt và hành động B1 trong hơn 7.000 ứng dụng của Zapier | Cả hai | 5–10 phút mỗi Zap |
| **[Make](./make.md)** | Ý tưởng tương tự Zapier, trong trình xây dựng kịch bản trực quan của Make | Cả hai | 5–10 phút mỗi kịch bản |
| **[Google Sheets](./google-sheets.md)** | Xuất Người / Quyên góp / Nhóm / Điểm danh sang bảng tính theo yêu cầu | B1 → Bảng tính | 5 phút |
| **[Claude](./claude.md)** | Đặt câu hỏi cho Claude của Anthropic về dữ liệu hội thánh, giới hạn theo quyền của bạn. Dùng thử miễn phí và được khuyến nghị | Cả hai | Dưới 3 phút |
| **[ChatGPT](./chatgpt.md)** | Ý tưởng tương tự với ChatGPT của OpenAI (cần gói ChatGPT trả phí) | Cả hai | 10 phút |
| **[Dịch vụ đã kết nối](./services/index.md)** | Hướng dẫn được tuyển chọn cho Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Tùy dịch vụ | 5–10 phút mỗi dịch vụ |

## Cách chọn

- **Chỉ muốn nhận thông báo trong ứng dụng chat?** Dùng **Slack** hoặc **Discord**. Không cần tài khoản bên thứ ba, không cần Zap phải bảo trì. Cấu hình hoàn toàn trong B1Admin.
- **Muốn tự động hóa việc gì đó giữa nhiều ứng dụng** (ví dụ: "khi ai đó quyên góp, thêm họ vào danh sách Mailchimp và kênh Slack #donations")? Dùng **Zapier** hoặc **Make**. Zapier thân thiện hơn; Make rẻ hơn khi quy mô lớn và có logic linh hoạt hơn.
- **Cần lấy dữ liệu một lần hoặc báo cáo định kỳ?** Dùng **Google Sheets**. Dán khóa API vào thanh bên của tiện ích bổ sung rồi nhấn **Export**.
- **Muốn đặt câu hỏi bằng ngôn ngữ tự nhiên** ("có bao nhiêu khách lần đầu vào Chủ nhật trước?", "tóm tắt quyên góp tháng này")? Bắt đầu với **[Claude](./claude.md)**. Dùng thử miễn phí và thiết lập trong chưa đến 3 phút. **[ChatGPT](./chatgpt.md)** cũng hoạt động với gói trả phí. Claude kết nối bằng cách đăng nhập với tài khoản B1 của bạn; ChatGPT dùng khóa API của B1.
- **Xây dựng tích hợp tùy chỉnh riêng?** Không có gì ở trên phù hợp. Hãy trao đổi trực tiếp với [REST API](/docs/developer/api) bằng [khóa API](/docs/developer/api/api-keys), hoặc đăng ký một máy chủ bạn kiểm soát vào [webhook](/docs/developer/api/webhooks).

## Điểm chung

Mọi tích hợp đều xác thực bằng **khóa API của B1**, được tạo trong B1Admin tại **Settings → Developer → API Keys**. Khóa này:

- Gắn với một người cụ thể trong hội thánh và kế thừa quyền của người đó
- Có thể thu hẹp bằng **scope**. Ví dụ, xuất Google Sheets chỉ cần `people:read`, không cần `settings:write`
- Có thể thu hồi bất cứ lúc nào, ngay lập tức chặn quyền truy cập của tích hợp mà không ảnh hưởng gì khác

Một số trình kết nối (Zapier, Make) cũng đăng ký [webhook](/docs/developer/api/webhooks) thay bạn khi Zap hoặc kịch bản được bật, và gỡ bỏ khi bạn tắt Zap. Bạn không cần tự quản lý URL webhook.

:::tip
Để Zapier và Make tự đăng ký webhook, khóa API cần scope **`settings:write`** (cùng với các scope tài nguyên cho những gì tích hợp chạm tới). Khóa chỉ đọc hoạt động cho hành động và xuất dữ liệu nhưng không dùng được cho trình kích hoạt.
:::

## Chi phí

ChurchApps miễn phí và mã nguồn mở. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), và các trình kết nối chính thức cho Zapier / Make / Google Sheets cũng miễn phí từ phía chúng tôi. Các bên thứ ba có thể tính phí cho nền tảng riêng của họ (Zapier và Make đều có gói miễn phí rộng rãi; Slack, Discord và Google Sheets miễn phí cho mục đích này).

## Tự xây dựng

Nếu không có gì ở trên phù hợp, mọi bề mặt của B1 đều mở:

- **[REST API](/docs/developer/api)**: gọi B1 từ bất kỳ ngôn ngữ nào với header `Authorization: Bearer cak_…`
- **[Webhook](/docs/developer/api/webhooks)**: đăng ký một endpoint HTTPS công khai cho một hoặc nhiều loại sự kiện và nhận payload JSON có chữ ký
- **[OAuth + Ứng dụng đã kết nối](/docs/developer/api/connected-apps)**: nếu bạn đang xây dựng sản phẩm SaaS được nhiều hội thánh sử dụng

## Bước tiếp theo

- [Slack & Discord](./slack-discord.md): đăng thông báo chat
- [Zapier](./zapier.md): kết nối với hơn 7.000 ứng dụng
- [Make](./make.md): tự động hóa quy trình trực quan
- [Google Sheets](./google-sheets.md): xuất sang bảng tính
- [Claude](./claude.md): hỏi Claude của Anthropic về dữ liệu hội thánh
- [ChatGPT](./chatgpt.md): hỏi ChatGPT của OpenAI về dữ liệu hội thánh
- [Dịch vụ đã kết nối](./services/index.md): hướng dẫn theo từng dịch vụ (Mailchimp, Donorbox, Clearstream, …)
