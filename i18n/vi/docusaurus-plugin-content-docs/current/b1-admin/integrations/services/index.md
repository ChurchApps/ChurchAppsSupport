---
title: "Dịch vụ được kết nối"
description: "Kết nối B1 Admin với Mailchimp, Donorbox, Subsplash, VOMO, Clearstream và các công cụ khác bằng công thức Zapier hoặc Make, kèm hướng dẫn cho từng công cụ."
---

# Dịch vụ được kết nối

<div class="article-intro">

Cách nhanh nhất để kết nối B1 với một công cụ công nghệ nhà thờ khác thường là dùng công thức Zapier hoặc Make. Bạn không cần hạ tầng mới cho B1, và bên thứ ba sẽ lưu trữ quy trình làm việc. Trang này là danh sách các dịch vụ chúng tôi đã xác nhận có thể kết nối được hiện nay, kèm hướng dẫn thiết lập ngắn gọn, có thể sao chép và dán cho từng dịch vụ.

</div>

## Tổng quan

| Dịch vụ | Danh mục | Cầu nối | Bạn có thể kết nối những gì |
|---|---|---|---|
| [Mailchimp](./mailchimp.md) | Email | Zapier hoặc Make | Đồng bộ người và người quyên góp mới trong B1 sang một danh sách khán giả Mailchimp |
| [Donorbox](./donorbox.md) | Quyên góp | Zapier | Đưa các khoản quyên góp và người quyên góp từ Donorbox trở lại B1 |
| [Subsplash](./subsplash.md) | Ứng dụng / Quyên góp | Zapier | Kéo dữ liệu quyên góp và người từ Subsplash vào B1 |
| [VOMO](./vomo.md) | Tình nguyện | Zapier | Đồng bộ đăng ký tình nguyện viên giữa các nhóm B1 và dự án VOMO |
| [Clearstream](./clearstream.md) | SMS | Zapier | Kích hoạt tin nhắn Clearstream từ sự kiện B1; nhận phản hồi dưới dạng bản ghi B1 |
| [Text In Church](./text-in-church.md) | SMS / Quy trình làm việc | Zapier | Kích hoạt quy trình Text In Church từ B1; nhận dữ liệu Connect Card |
| [Mobile Message](./mobile-message.md) | SMS (Úc) | Webhooks by Zapier hoặc Make | Gửi SMS từ bất kỳ sự kiện B1 nào |
| [Checkr](./checkr.md) | Kiểm tra lý lịch | Make | Bắt đầu kiểm tra lý lịch khi có người tham gia một nhóm phục vụ |

## Điểm chung của tất cả các dịch vụ này

1. **Phía B1 của việc kết nối hoàn toàn giống nhau.** Tạo khóa API với đúng phạm vi trong **B1Admin → Settings → Developer → API Keys**. Sau đó, hoặc để cầu nối tự đăng ký webhook cho trigger (Zapier và Make làm việc này tự động, yêu cầu `settings:write`), hoặc gọi các endpoint REST của B1 từ một hành động phía sau.
2. **Cầu nối tính phí bạn, không phải chúng tôi.** ChurchApps miễn phí. Zapier và Make đều có gói miễn phí đủ cho một số ít công thức.
3. **Bạn có thể kiểm tra việc kết nối mà không cần đưa vào hoạt động.** Cả hai cầu nối đều có nút "Test step", kích hoạt trigger một lần với B1 và cho bạn thấy cấu trúc dữ liệu trước khi bạn bật công thức.

## Chọn cầu nối

- **Zapier** thân thiện hơn và có danh mục ứng dụng lớn hơn. Hãy dùng làm mặc định trừ khi chi phí là vấn đề.
- **Make** rẻ hơn khi quy mô lớn và có logic định tuyến/bộ lọc linh hoạt hơn. Hãy dùng khi một quy trình có nhiều nhánh đầu ra, điều kiện rẽ nhánh hoặc nhiều bước.
- **Webhooks by Zapier** (dùng cho tài liệu Mobile Message) là bộ chuyển đổi chung, cho phép bạn gửi POST đến bất kỳ endpoint HTTP nào từ một Zap khi đích đến không phải là ứng dụng Zapier chính thức.

Nếu bạn muốn một thứ không có trong danh sách này, [REST API](/docs/developer/api) và [webhooks](/docs/developer/api/webhooks) của B1 đều mở. Bạn có thể xây dựng một cầu nối riêng bằng [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) trong vài giờ.

## Những gì không có ở đây (và lý do)

Một số công cụ công nghệ nhà thờ phổ biến, gồm Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck và MinistrySafe, hiện không có ứng dụng Zapier hoặc mô-đun Make được công bố. Chúng có API riêng, nhưng kết nối chúng với B1 là công việc lập trình tùy chỉnh chứ không phải một công thức có sẵn, nên chúng không nằm trong danh sách này. Nếu một nhà cung cấp thêm ứng dụng Zapier hoặc mô-đun Make, chúng tôi sẽ thêm tài liệu.

Chúng tôi cũng cố ý bỏ qua các công cụ dành riêng cho Planning Center Services (âm nhạc, trình chiếu), các sản phẩm ChMS cạnh tranh, các chuyên gia tư vấn di chuyển dữ liệu, và các công cụ chỉ dọn dẹp dữ liệu riêng của PCO. Không có công cụ nào trong số đó có đường kết nối hữu ích với B1.

## Xem thêm

- [Zapier (tổng quan)](../zapier.md): phía B1 của mọi công thức Zapier đều giống nhau. Tài liệu này trình bày phần đó một lần.
- [Make (tổng quan)](../make.md): tương tự với các kịch bản Make.
- [Slack & Discord](../slack-discord.md): thông báo trò chuyện mà không cần cầu nối nào.
- [Google Sheets](../google-sheets.md): xuất dữ liệu theo yêu cầu.
- [Webhooks (tài liệu tham khảo cho nhà phát triển)](/docs/developer/api/webhooks): danh mục sự kiện mà mọi công thức đều dựa vào.
