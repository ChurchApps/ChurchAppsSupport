---
title: "Quy trình làm việc"
description: "Xây dựng bảng kiểu Kanban trong B1 Admin để đưa người qua các bước theo dõi bằng email, tin nhắn và trình kích hoạt tự động, tự thêm người vào."
---

# Quy trình làm việc

<div class="article-intro">

Quy trình làm việc đưa mọi người qua một loạt các bước trên một bảng trực quan. Mỗi người trở thành một thẻ di chuyển từ bước này sang bước tiếp theo -- từ việc theo dõi khách lần đầu đến, đến quy trình trở thành thành viên, đến lời cảm ơn dành cho người dâng lần đầu, và bất cứ việc gì khác mà bạn cần theo dõi nhiều người qua cùng một chuỗi giai đoạn. Một bước có thể yêu cầu tình nguyện viên thực hiện một việc (gọi điện, trò chuyện) **và** tự động chạy các hành động -- gửi email hoặc tin nhắn, chờ vài ngày, thêm người đó vào một nhóm -- nên Quy trình làm việc đảm nhận cả việc theo dõi thủ công lẫn những công việc lặt vặt xung quanh đó. Quy trình làm việc mở rộng [Nhiệm vụ](./tasks.md) thành một bảng Kanban kéo-thả để không ai bị bỏ sót.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Đảm bảo những người bạn muốn theo dõi đã tồn tại trong B1 Admin
- Làm quen với cách [Nhiệm vụ](./tasks.md) hoạt động, vì mỗi thẻ trên bảng là một nhiệm vụ
- Để sử dụng hành động **Gửi email**, hãy tạo trước các mẫu email bạn muốn gửi (được quản lý trong **Cài đặt → Mẫu email**)
- Để sử dụng hành động **Gửi tin nhắn**, trước tiên hãy kết nối một [nhà cung cấp dịch vụ nhắn tin](../settings/church-settings.md#texting)
- Bạn cần quyền Nhiệm vụ phù hợp. Quyền xem, chỉnh sửa thẻ và quản lý quy trình làm việc là các mức quyền riêng biệt (xem [Vai trò & Quyền](../settings/roles-permissions.md))

</div>

## Xem quy trình làm việc

Mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái của B1 Admin), mở rộng **Phục vụ**, rồi nhấp **Quy trình làm việc**. Các quy trình của bạn được liệt kê trong một bảng, hiển thị **Danh mục** và **Trạng thái** (**Đang hoạt động** hoặc **Không hoạt động**) của từng quy trình. Nếu bạn sử dụng danh mục, các tab phía trên danh sách cho phép lọc theo danh mục. Nhấp vào bất kỳ quy trình nào để mở bảng của nó.

## Tạo quy trình làm việc

1. Trên trang Quy trình làm việc, nhấp **Thêm quy trình**.
2. Chọn cách bắt đầu:
   - **Quy trình trống** -- bắt đầu từ đầu và tự xây dựng các bước.
   - **Từ mẫu** -- bắt đầu với một bộ bước có sẵn mà bạn có thể chỉnh sửa. Các mẫu có sẵn bao gồm:
     - **Theo dõi khách mới** -- Gửi email chào mừng → Gọi điện cá nhân → Mời đến bước tiếp theo → Đã kết nối
     - **Lớp thành viên** -- Bày tỏ quan tâm → Đăng ký lớp → Tham dự lớp → Hoàn tất thành viên
     - **Cảm ơn người dâng lần đầu** -- Gửi thư cảm ơn → Chia sẻ tác động của việc dâng hiến → Đã quản lý
     - **Xác nhận phân công phục vụ** -- Gửi yêu cầu và chờ phản hồi → Gọi tình nguyện viên về yêu cầu chưa được trả lời (xem [Xác nhận phân công phục vụ](#serving-assignment-confirmations))

   Việc tạo các bước của mẫu có thể mất một lúc. Trong khi đang xử lý, nút **Thêm quy trình** hiển thị **Đang tạo...** và không thể nhấp lại, nên bạn sẽ không bị tạo trùng. Nếu có lỗi, trang sẽ hiển thị thông báo *"Không thể tạo quy trình làm việc. Vui lòng thử lại."*
3. Đặt **Tên** cho quy trình.
4. Tùy chọn gán **Danh mục** để nhóm các quy trình liên quan lại với nhau. Bạn có thể tạo danh mục mới ngay từ danh sách thả xuống.
   Đối với quy trình trống, bạn cũng chọn **Mục đích quy trình**: **Theo dõi người** (loại thông thường) hoặc **Xác nhận phân công phục vụ**. Mục đích không thể thay đổi sau khi quy trình được tạo.
5. Giữ quy trình ở trạng thái **Đang hoạt động** để có thể thêm người vào, hoặc đặt thành **Không hoạt động** để ẩn khỏi danh sách thêm vào quy trình.
6. Nhấp **Lưu**.

:::tip
Sử dụng nút **Nhân bản** trên danh sách Quy trình làm việc để sao chép một quy trình hiện có -- bao gồm các bước, hành động tự động và định tuyến -- làm điểm khởi đầu cho quy trình mới.
:::

## Xây dựng bảng với các bước

Mỗi bảng quy trình được tạo thành từ các **bước**, hiển thị dưới dạng các cột từ trái sang phải. Mở một quy trình và sử dụng **Thêm bước** để tạo từng giai đoạn của quy trình.

Khi thêm hoặc chỉnh sửa một bước, bạn có thể cấu hình:

- **Tên bước** -- tiêu đề cột (ví dụ: "Cuộc gọi chào mừng" hoặc "Chờ đăng ký").
- **Hạn trong (ngày)** -- tự động đặt ngày đến hạn khi một thẻ đi vào bước này. Các thẻ quá hạn sẽ được đánh dấu **Quá hạn**.
- **Người được giao mặc định** -- người hoặc nhóm mà các thẻ mới ở bước này được tự động giao cho. Khi người được giao mặc định là một cá nhân, họ sẽ nhận được thông báo rằng một thẻ đã được giao cho họ.
- **Hành động tự động** -- những việc hệ thống tự làm khi một thẻ đến (xem bên dưới).
- **Định tuyến** -- nơi thẻ sẽ chuyển đến khi rời khỏi bước (xem [Định tuyến](#routing-cards-with-outcomes-and-conditions)).

Kéo các cột bước theo thứ tự phù hợp với quy trình của bạn. Thứ tự cũng xác định đường đi mặc định mà thẻ sẽ theo khi không có định tuyến nào khác được áp dụng.

:::info
Lưu bước mới trước. Các hành động tự động và định tuyến được gắn vào bước, nên trình chỉnh sửa chỉ mở các phần đó sau khi bước đã tồn tại.
:::

## Hành động tự động

Mỗi bước có thể chứa một danh sách **hành động tự động** tự chạy ngay khi một thẻ **đi vào** bước -- trước khi bất kỳ ai tác động đến thẻ. Đây là cách một bước vừa nhắc nhở tình nguyện viên *vừa* xử lý các công việc thường nhật xung quanh việc theo dõi.

Trong trình chỉnh sửa bước, mở **Hành động tự động**, nhấp **Thêm hành động**, chọn loại và điền các cài đặt. Thêm bao nhiêu tùy ý; chúng chạy **từ trên xuống dưới theo thứ tự**. Nhấp **Lưu** trên bước để lưu bước cùng tất cả các hành động của nó. Xóa một hành động bằng biểu tượng thùng rác sẽ có hiệu lực ngay lập tức.

| Hành động | Chức năng |
|---|---|
| **Gửi email** | Gửi cho người đó một mẫu email bạn chọn. Bạn có thể ghi đè tiêu đề email. |
| **Gửi tin nhắn** | Gửi cho người đó một tin nhắn bạn soạn, thông qua [nhà cung cấp dịch vụ nhắn tin](../settings/church-settings.md#texting) của nhà thờ bạn. |
| **Chờ** | Tạm dừng thẻ trong một số ngày trước khi tiếp tục (xem bên dưới). |
| **Thêm vào nhóm** | Thêm người đó vào một [nhóm](../groups/index.md) bạn chọn. |
| **Xóa khỏi nhóm** | Xóa người đó khỏi một nhóm bạn chọn. |
| **Ghi nhận tham dự** | Đánh dấu người đó có mặt trong buổi nhóm đang diễn ra (xem bên dưới). |
| **Thêm vào quy trình** | Chuyển người đó sang một quy trình khác -- hữu ích để chuyển giao giữa các quy trình. |
| **Thêm ghi chú** | Ghi một ghi chú vào lịch sử của thẻ. |
| **Đặt trường** | Cập nhật một trường trong hồ sơ người đó: Tình trạng thành viên, Tình trạng hôn nhân, Giới tính, Thành phố, Tiểu bang hoặc Mã bưu điện. |
| **Webhook** | Gửi thông tin chi tiết của thẻ đến một địa chỉ web bên ngoài (URL) bạn cung cấp, để kết nối với các hệ thống khác. |
| **Tạo nhiệm vụ** | Tạo một [nhiệm vụ](./tasks.md) với tiêu đề và mô tả bạn nhập, được giao cho người bạn chọn. |
| **Thông báo cho người** | Gửi cho một nhân viên hoặc tình nguyện viên bạn chọn một email và một thông báo B1 về thẻ (xem bên dưới). |

Sau khi tất cả hành động của bước hoàn tất, thẻ **dừng lại ở bước đó** để một người có thể xử lý -- trừ khi bước có tuyến tự động đưa thẻ đi tiếp (xem [Bước hoàn toàn tự động](#fully-automated-steps)).

:::info
Các hành động tự động chỉ chạy khi thẻ đến qua luồng thông thường -- khi lần đầu được thêm vào, khi một kết quả hoặc tuyến tự động đưa thẻ đến, hoặc sau khi một bước Chờ kết thúc. Chúng **không** chạy lại khi nhân viên kéo thẻ thủ công vào bước hoặc gửi thẻ quay lại, nên người đó sẽ không nhận cùng một email hai lần.
:::

### Gửi email

Chọn **Gửi email**, chọn một trong các mẫu email của bạn và tùy chọn nhập tiêu đề tùy chỉnh. Khi một thẻ đi vào bước, người đó sẽ tự động nhận email đó. (Nếu người đó không có địa chỉ email trong hồ sơ, bước này sẽ bỏ qua hành động.) Các [trường ghép](../settings/email-templates.md#merge-fields) trong mẫu, chẳng hạn như `{{firstName}}`, sẽ được điền bằng thông tin riêng của người đó.

Khi email được gửi đi, lịch sử thẻ ghi **Đã gửi email**. Nếu không thể gửi -- ví dụ, vì email của nhà thờ bạn chưa được phê duyệt hoặc đã đạt giới hạn hằng ngày -- thì sẽ không có mục "Đã gửi email" nào được thêm vào.

:::info
Email của quy trình chỉ được gửi sau khi nhà thờ của bạn được phê duyệt gửi email nhóm, và chúng được tính vào giới hạn email hằng ngày của nhà thờ. Xem [Bật email nhóm cho nhà thờ của bạn](../groups/group-members.md#turning-on-group-email-for-your-church). Hành động **Gửi email** sẽ cảnh báo bạn trong trình chỉnh sửa bước khi các email này sẽ không được gửi: *"Email của nhà thờ bạn chưa được phê duyệt..."* nếu việc phê duyệt vẫn đang chờ, hoặc *"Email của nhà thờ bạn đang bị tạm dừng..."* nếu các thư gần đây bị trả lại hoặc bị báo cáo là thư rác.
:::

### Ghi nhận tham dự

Chọn **Ghi nhận tham dự** và nhấp **Chọn nhóm** để chọn nhóm mà việc tham dự cần được ghi nhận. Khi hành động chạy, người đó được đánh dấu có mặt trong buổi nhóm đang diễn ra -- giống như khi họ đã check-in. Điều này hữu ích với một trigger thêm người vào quy trình khi họ đến, để họ được tính mà không cần check-in riêng.

- Việc tham dự được tính tại thời điểm thẻ được **tạo**, vì vậy một bước **Chờ** trước đó trong quy trình sẽ không đẩy thời điểm đó ra sau buổi nhóm.
- Chỉ các giờ nhóm có ngày và giờ bắt đầu mới được tính. Nếu không có giờ nào của nhóm đang diễn ra tại thời điểm đó, sẽ không có gì được ghi nhận và lịch sử thẻ ghi **Không có buổi nhóm nào đang diễn ra — chưa ghi nhận tham dự**.
- Khi việc tham dự được ghi nhận, lịch sử thẻ hiển thị **Đã ghi nhận tham dự** kèm theo tên nhóm. Chạy lại hành động cho cùng một buổi sẽ không tính người đó thêm lần nữa.

### Thông báo cho một người

Chọn **Thông báo cho người**, nhấp **Chọn người**, và tùy chọn nhập một **Tin nhắn**. Khi một thẻ đi vào bước, người được chọn sẽ nhận một email và một thông báo B1 có tên của người trên thẻ, tên quy trình và bước, tin nhắn của bạn, cùng một liên kết để mở thẻ. Hãy dùng tính năng này để thông báo trước cho nhân viên hoặc người lãnh đạo mục vụ -- ví dụ: *"Thông báo cho mục sư khi có người đến bước Phỏng vấn thành viên."* Lịch sử thẻ ghi **Đã thông báo** kèm theo tên của người đó.

### Gửi tin nhắn

Chọn **Gửi tin nhắn** và nhập **Nội dung tin nhắn** (tối đa 1.600 ký tự). Khi một thẻ đi vào bước, người đó sẽ nhận tin nhắn đó trên điện thoại di động. Để cá nhân hóa tin nhắn, nhấp vào một nút bên dưới ô tin nhắn -- **Tên**, **Họ**, **Tên hiển thị** hoặc **Tên nhà thờ** -- để chèn `{{firstName}}`, `{{lastName}}`, `{{displayName}}` hoặc `{{churchName}}` vào vị trí con trỏ. Mỗi trường sẽ được điền bằng thông tin của người đó khi tin nhắn được gửi.

- Nếu người đó không có số điện thoại di động trong hồ sơ, sẽ không có tin nhắn nào được gửi và lịch sử thẻ ghi **Bỏ qua tin nhắn: không có số di động**.
- Nếu người đó đã từ chối nhận tin, sẽ không có tin nhắn nào được gửi và lịch sử thẻ ghi **Bỏ qua tin nhắn: đã từ chối**.
- Khi tin nhắn được gửi đi, lịch sử thẻ ghi **Đã gửi tin nhắn**. Nếu việc gửi thất bại -- ví dụ, vì chưa kết nối nhà cung cấp dịch vụ nhắn tin hoặc nhà thờ đã hết tín dụng nhắn tin -- lỗi sẽ được ghi vào lịch sử thẻ và các hành động còn lại của bước vẫn tiếp tục chạy.

:::warning
Tin nhắn được gửi qua [nhà cung cấp dịch vụ nhắn tin](../settings/church-settings.md#texting) riêng của nhà thờ bạn. Nếu chưa kết nối nhà cung cấp nào, trình chỉnh sửa hành động sẽ cảnh báo *"Chưa thiết lập nhà cung cấp dịch vụ nhắn tin"* và tin nhắn sẽ không được gửi.
:::

### Chờ vài ngày (chuỗi nhỏ giọt)

Hành động **Chờ** giữ thẻ trong số ngày bạn đã đặt. Trong thời gian chờ, thẻ hiển thị là **Đang tạm ẩn**. B1 kiểm tra các lần chờ đã kết thúc mỗi 30 phút, nên thẻ sẽ tiếp tục trong vòng khoảng nửa giờ sau khi thời gian chờ kết thúc. Khi thời gian chờ kết thúc:

1. Mọi **hành động còn lại trong cùng bước** sẽ chạy -- nhờ đó bạn có thể xây dựng một chuỗi nhỏ giọt như **Gửi email → Chờ 3 ngày → Gửi email nhắc nhở**.
2. Sau đó, nếu bước có tuyến tự động, thẻ sẽ chuyển tiếp; nếu không, thẻ sẽ dừng ở bước để một người xử lý.

:::tip
Đặt **Chờ** ngay từ đầu một bước là cách đơn giản để "giữ" thẻ trước khi nó hiển thị cho tình nguyện viên -- ví dụ: *Chờ 7 ngày, sau đó một huấn luyện viên liên hệ*.
:::

## Thêm người như thẻ

Có nhiều cách để đưa người vào bảng:

- **Từ bảng** -- Nhấp **Thêm thẻ** ở cuối một cột bước và chọn một người. Bạn cũng có thể chọn một nhóm, và mọi thành viên của nhóm đó sẽ được thêm như thẻ.
- **Từ hồ sơ của một người** -- Sử dụng **Thêm vào quy trình** trên trang của người đó để đưa họ vào một quy trình.
- **Từ tìm kiếm Người** -- Chọn nhiều người và sử dụng hành động hàng loạt **Thêm vào quy trình** để thêm tất cả cùng lúc.
- **Tự động với trigger** -- Thêm người khi có sự kiện xảy ra, chẳng hạn như gửi biểu mẫu hoặc lần dâng hiến đầu tiên (xem [Trigger](#triggers) bên dưới).

Việc thêm một người thủ công, hoặc bằng hành động **Thêm vào quy trình** của bước, sẽ không bao giờ cho họ thêm một thẻ mở thứ hai trên cùng một quy trình. Nếu họ đã có thẻ đang mở, họ sẽ bị bỏ qua (khi thêm hàng loạt, chỉ những người chưa có thẻ mới được tạo thẻ mới). Khi thẻ của họ đã đóng, bạn có thể thêm lại họ. Các trigger thay vào đó tuân theo cài đặt **Chỉ một lần cho mỗi người** riêng của chúng.

## Làm việc trên bảng

Mở một quy trình để xem bảng của nó. Mỗi thẻ hiển thị tên người, người được giao, và một nhãn ngày đến hạn hoặc trạng thái (**Quá hạn** hoặc **Đang tạm ẩn**). Một cột bước cũng hiển thị các huy hiệu nhỏ cho bất kỳ hành động tự động nào nó chạy và chú thích cho định tuyến của nó, giúp bạn nắm bắt nhanh cách các thẻ di chuyển.

- **Di chuyển thẻ** -- Kéo một thẻ từ cột này sang cột tiếp theo khi người đó tiến triển.
- **Mở thẻ** -- Nhấp đúp vào thẻ (hoặc nhấp vào thẻ) để mở ngăn chi tiết, nơi bạn có thể đổi bước, giao lại, thêm ghi chú và xem những gì đã xảy ra.

Từ ngăn thẻ, bạn có thể:

- **Giao** thẻ cho một người hoặc nhóm khác.
- **Tạm ẩn** thẻ trong 1 ngày, 3 ngày hoặc 1 tuần để tạm thời ẩn ngày đến hạn.
- **Gửi lại** về bước trước hoặc **Bỏ qua** để chuyển sang bước tiếp theo.
- **Ghim người phụ trách** -- giữ nguyên người phụ trách trên thẻ ngay cả khi thẻ di chuyển giữa các bước. Mặc định, khi chuyển thẻ sang bước mới, thẻ sẽ được giao lại cho người được giao mặc định của bước đó; ghim sẽ giữ người hiện tại chịu trách nhiệm xuyên suốt.
- **Hoàn tất** thẻ để kết thúc, hoặc chọn một nút **Kết quả** nếu bước đã được cấu hình kết quả (xem [Định tuyến](#routing-cards-with-outcomes-and-conditions)).
- **Xóa thẻ** -- Gỡ thẻ khỏi bảng mà không hoàn thành, ví dụ khi một người được thêm nhầm. Sau khi bạn xác nhận, thẻ sẽ được đóng và bị gỡ khỏi danh sách của mọi người. Không có kết quả, tuyến hay hành động bước nào được chạy, và lịch sử của thẻ được giữ lại với mục **Đã xóa**. Đối với thẻ [xác nhận phân công phục vụ](#serving-assignment-confirmations), việc xóa thẻ sẽ đóng yêu cầu theo cùng cách.
- **Thêm ghi chú** và xem **Hoạt động** của thẻ -- nhật ký các hành động tự động đã chạy (email đã gửi, thời gian chờ, v.v.), mỗi mục kèm ngày giờ xảy ra.

Với thẻ liên quan đến một người, ngăn chi tiết cũng hiển thị số điện thoại di động và email của người đó dưới dạng liên kết để bạn có thể nhấn gọi hoặc gửi email, cùng liên kết **Xem hồ sơ** nếu bạn có quyền xem người. Người được giao thẻ có thể thấy số điện thoại và email ngay cả khi họ không có quyền truy cập Người.

Ghi chú được lưu cùng với thẻ. Bất kỳ ai có thể mở thẻ -- bao gồm người hoặc nhóm được giao -- đều có thể đọc ghi chú và thêm ghi chú của riêng mình. Những người không thể mở thẻ sẽ không thấy ghi chú của thẻ.

### Thao tác hàng loạt

Chọn các ô đánh dấu trên nhiều thẻ để thao tác cùng lúc. Để chọn toàn bộ thẻ trong một bước, đánh dấu ô **Chọn tất cả** trong tiêu đề cột của bước đó; đánh dấu lại để bỏ chọn. Một thanh công cụ sẽ xuất hiện, cho phép bạn **Hoàn tất**, **Tạm ẩn**, **Giao** (giao lại) hoặc **Chuyển đến…** một bước khác cho tất cả các thẻ đã chọn cùng lúc.

## Định tuyến thẻ bằng kết quả và điều kiện

Định tuyến kiểm soát nơi một thẻ sẽ đến khi rời khỏi một bước. Mở trình chỉnh sửa bước để cấu hình hai loại định tuyến.

### Nút kết quả

Kết quả là các nút hiển thị trên ngăn thẻ khi bạn hoàn tất một thẻ ở bước đó. Thay vì một nút **Hoàn tất** duy nhất, bạn có thể đưa ra các lựa chọn như "Đã tham gia nhóm" hoặc "Không quan tâm". Mỗi kết quả có thể:

- Chuyển thẻ đến **một bước khác** trong quy trình này,
- **Chuyển giao** thẻ sang một quy trình khác hoàn toàn, hoặc
- **Đóng** thẻ.

Điều này cho phép một quyết định rẽ nhánh người đó sang các con đường khác nhau.

### Định tuyến tự động (có điều kiện)

Tuyến tự động đưa thẻ đi tiếp **ngay khi thẻ đi vào một bước** (và sau khi các hành động tự động hoàn tất), mà không cần ai nhấp, nếu người đó đáp ứng một tập hợp điều kiện. Thêm một tuyến, chọn bước đích và xác định một hoặc nhiều **điều kiện** (ví dụ: cơ sở, độ tuổi hoặc tình trạng thành viên của một người). Các trường văn bản có thể được khớp chính xác hoặc bằng **chứa**, **bắt đầu bằng** hoặc **kết thúc bằng**. Một tuyến không có điều kiện sẽ khớp với mọi người.

Các điều kiện ngày (Ngày hôm nay, Ngày sinh hoặc Ngày kỷ niệm) có thể so sánh toàn bộ ngày hoặc chỉ một phần -- thứ trong tuần, **Ngày trong tháng**, **Tháng**, hoặc số năm đã trôi qua. Với Ngày sinh hoặc Ngày kỷ niệm của một người, **Ngày trong tháng** có tùy chọn tương đối **Hôm nay**, nên một điều kiện như *Ngày sinh · Ngày trong tháng = Hôm nay* sẽ khớp với những người có sinh nhật rơi vào ngày trong tháng hiện tại. **Tháng** có các tùy chọn **Tháng trước**, **Tháng này** và **Tháng sau**. Các giá trị tương đối như vậy được tính theo múi giờ của nhà thờ bạn, nên khớp với ngày lịch của nhà thờ thay vì của máy chủ.

Nhóm điều kiện **Dâng hiến** có **Người dâng đều đặn đã ngừng**, tìm những người từng dâng đều đặn và sau đó ngừng. Đặt ba con số: *Đã dâng ít nhất* **3** *trong* **12** *tuần gần nhất, rồi không dâng trong* **3** *tuần gần nhất* (đây là mặc định). Các tuần được đếm ngược từ hôm nay theo múi giờ của nhà thờ, và một khoản dâng đã hoàn tiền sẽ không được tính. Tính năng này hữu ích nhất với một [trigger theo lịch](#schedule-triggers) -- ví dụ, một quy tắc hằng tuần thêm những người đã ngừng dâng vào bảng theo dõi chăm sóc mục vụ. Điều kiện này chỉ xét ngày dâng, không xét số tiền, và thẻ cùng cảnh báo không bao giờ hiển thị số tiền. Vì tính năng này tiết lộ ai đã ngừng dâng, chỉ những người có quyền xem khoản dâng mới thấy tùy chọn này và có thể thêm, thay đổi hoặc xóa nó.

Nếu các điều kiện của một tuyến không thể được kiểm tra vì lý do nào đó, tuyến đó được coi là không khớp. Thẻ sẽ ở lại bước (hoặc theo một tuyến khác đang khớp) thay vì bị kẹt.

:::info
Trên bảng, mỗi cột bước hiển thị các chú thích nhỏ mô tả định tuyến của nó -- ví dụ, nhãn kết quả hoặc "nếu khớp" kèm mũi tên đến bước hoặc quy trình đích.
:::

## Bước hoàn toàn tự động

Bạn có thể làm cho một bước chạy hoàn toàn tự động, không cần ai xử lý. Đặt cho bước các **hành động tự động** và thêm một **tuyến tự động** (không có điều kiện) trỏ đến bước tiếp theo. Khi một thẻ đi vào, các hành động sẽ chạy, rồi tuyến đưa thẻ đi tiếp ngay lập tức -- thẻ đi thẳng qua.

:::tip
Kết hợp điều này với **Chờ**: *Gửi email chào mừng → Chờ 3 ngày → tự động chuyển sang bước "Gọi cá nhân".* Email và thời gian được xử lý cho bạn, và tình nguyện viên chỉ thấy thẻ khi đến lúc cần một cuộc tiếp xúc trực tiếp.
:::

## Trigger

Trigger thêm người vào quy trình một cách tự động khi có sự kiện xảy ra, nên bạn không bao giờ phải thêm thẻ thủ công. Trên bảng quy trình, nhấp tab **Trigger**, rồi **Thêm trigger**. Có hai loại:

### Trigger sự kiện

Kích hoạt ngay khi một bản ghi thay đổi trong B1. Chọn sự kiện, sau đó tùy chọn thêm **điều kiện** để chỉ những người phù hợp mới được thêm vào:

- **Người · Đã tạo / Đã cập nhật** -- ví dụ: thêm bất kỳ ai có trạng thái trở thành *Khách thăm* hoặc *Khách mời* (trạng thái dành cho những người tự đăng ký).
- **Khoản dâng · Đã tạo** -- ví dụ: thêm một khoản dâng lần đầu hoặc lớn vào quy trình cảm ơn (khớp theo số tiền, quỹ hoặc phương thức).
- **Nhóm · Thành viên đã tham gia** / **Nhóm · Đã tạo**.
- **Biểu mẫu · Đã gửi** -- thêm bất kỳ ai gửi một biểu mẫu đã chọn (rất phù hợp cho thẻ "Tôi là người mới" hoặc "Kết nối").

### Trigger theo lịch

Chạy định kỳ -- hằng ngày, hằng tuần, hằng tháng, hoặc hằng năm -- theo một tập hợp điều kiện. Dùng các trigger này cho việc tiếp cận theo thời gian, chẳng hạn *tất cả mọi người có sinh nhật hôm nay* (Ngày sinh · Ngày trong tháng = **Hôm nay**, với tháng khớp với **Tháng này**) hoặc một lần kiểm tra *hằng tháng*. Ngay cả khi không bật **Chỉ một lần cho mỗi người**, một trigger theo lịch cũng sẽ không thêm cùng một người lần nữa trong cùng một chu kỳ lặp lại (một ngày, tuần, tháng hoặc năm, tùy theo tần suất chạy).

Với bất kỳ trigger nào, bạn cũng có thể đặt:

- **Bước bắt đầu** mà thẻ mới sẽ đến (mặc định là bước đầu tiên).
- **Chỉ một lần cho mỗi người** -- để cùng một người không bị trigger thêm vào quy trình hai lần. Khi bật, bất kỳ ai đã có thẻ trên quy trình này sẽ bị bỏ qua.
  - **Thêm lại sau khi thẻ của họ đã đóng** -- xuất hiện khi bật **Chỉ một lần cho mỗi người**. Chọn ô này để cho phép trigger thêm lại một người sau khi thẻ trước đó của họ trên quy trình này đã đóng. Một người vẫn không bao giờ có hai thẻ mở trên quy trình cùng lúc. Dùng tùy chọn này cho những việc có thể xảy ra nhiều lần, như khách quay lại hoặc quy trình hằng năm.
- **Đang hoạt động** -- bật hoặc tắt trigger mà không cần xóa.

:::tip
Kết hợp trigger **Biểu mẫu · Đã gửi** với mẫu **Theo dõi khách mới** để biến biểu mẫu "Thẻ kết nối" hoặc "Tôi là người mới" của bạn thành một quy trình theo dõi tự động.
:::

## Xác nhận phân công phục vụ

Một loại quy trình đặc biệt có thể theo dõi [yêu cầu phục vụ](./plans.md#assigning-team-members) cho đến khi mỗi tình nguyện viên chấp nhận hoặc từ chối. Thay vì người, mỗi thẻ trên bảng này theo dõi **một phân công** -- một người ở một vị trí trong một kế hoạch. Hai vai trò hoặc hai buổi phục vụ cho cùng một người sẽ có các thẻ riêng. Đây là tính năng tùy chọn: không có gì thay đổi đối với một kế hoạch cho đến khi bạn chọn một quy trình xác nhận trong cài đặt của kế hoạch đó.

### Thiết lập

1. Trên trang Quy trình làm việc, nhấp **Thêm quy trình** và chọn mẫu **Xác nhận phân công phục vụ**. (Hoặc bắt đầu một **Quy trình trống** và đặt **Mục đích quy trình** thành **Xác nhận phân công phục vụ**.) Tạo từ mẫu yêu cầu quyền gửi tin nhắn, vì mẫu có bao gồm một bước tin nhắn.
2. Xem lại các bước. Mẫu bắt đầu với:
   - **Gửi yêu cầu và chờ phản hồi** -- gửi yêu cầu phục vụ qua email và tin nhắn, chờ 2 ngày, gửi email nhắc nhở, chờ thêm 1 ngày, rồi tự động chuyển thẻ đi tiếp.
   - **Gọi tình nguyện viên về yêu cầu chưa được trả lời** -- một bước để một người gọi tình nguyện viên, hạn trong 1 ngày. Đặt **Người được giao mặc định** cho bước này. Nếu không có, thẻ sẽ được chuyển đến người lãnh đạo của mục vụ, hoặc đến nhóm mục vụ nếu không có người lãnh đạo.
3. Chỉnh sửa thời gian chờ, tin nhắn và các bước để phù hợp với nhà thờ của bạn.
4. Mở [cài đặt kế hoạch](./plans.md#plan-settings) và chọn quy trình này trong mục **Quy trình xác nhận**.

Các quy trình này sử dụng hành động **Gửi yêu cầu phục vụ** thay vì **Gửi email** và **Gửi tin nhắn**. Chọn **Email** hoặc **Tin nhắn văn bản** và, tùy chọn, viết **Nội dung yêu cầu**. Yêu cầu luôn bao gồm vai trò, kế hoạch, ngày phục vụ và một liên kết để phản hồi; bạn có thể dùng `{{planName}}`, `{{positionName}}` và `{{serviceDate}}` trong nội dung. Để trống nội dung để dùng yêu cầu mặc định. Tùy chọn nhận thông báo của tình nguyện viên, sự đồng ý nhận tin nhắn, nhà cung cấp dịch vụ nhắn tin và việc nhà thờ được phê duyệt email đều được áp dụng, và mọi lần thử bị bỏ qua hoặc bị chặn đều được ghi lại trên thẻ. **Gửi email**, **Gửi tin nhắn** và **Thêm vào quy trình** không có sẵn trên các bảng này.

Tab **Trigger** của quy trình xác nhận giải thích cách các thẻ được bắt đầu thay vì cung cấp trigger, và các quy trình này không xuất hiện trong danh sách **Thêm vào quy trình** của người.

### Cách thẻ được bắt đầu và đóng

- Thẻ bắt đầu khi bạn **Thông báo** cho tình nguyện viên trên một kế hoạch đã xuất bản (xem [Thông báo cho tình nguyện viên](./plan-validation.md#notifying-volunteers)). Mỗi phân công mới, chưa được trả lời sẽ có một thẻ. Lưu, xuất bản, sao chép hoặc tự động điền một kế hoạch không liên hệ với ai; các kế hoạch ở trạng thái tạm (bút chì) không gửi gì cả.
- Tình nguyện viên vẫn nhận thông báo thông thường trong ứng dụng. Email và tin nhắn theo dõi đến từ quy trình.
- Khi tình nguyện viên **chấp nhận hoặc từ chối**, thẻ của họ tự động đóng, cùng với mọi nhiệm vụ theo dõi được liên kết với thẻ đó.
- Ngăn thẻ hiển thị vị trí, ngày phục vụ và liên kết đến kế hoạch. Thay vì **Hoàn tất**, nút hiển thị **Ghi nhận đã theo dõi**. Khi nhấp, hệ thống ghi nhận rằng ai đó đã theo dõi, nhưng thẻ vẫn mở và được giao (hiển thị là **Chờ phản hồi**) cho đến khi tình nguyện viên trả lời hoặc hết hạn phản hồi.
- Hạn phản hồi là cuối của giờ phục vụ cuối cùng mà đội của vị trí đó phục vụ. Nếu kế hoạch không có giờ phù hợp, hạn là cuối ngày phục vụ. Nếu đến lúc đó vẫn chưa có ai trả lời, thẻ sẽ đóng với **Đã quá hạn phản hồi** và một nhiệm vụ **Xem lại yêu cầu phục vụ chưa được trả lời** được chuyển đến người phụ trách hiện tại của thẻ hoặc người lãnh đạo mục vụ để ai đó quyết định cách lấp chỗ trống. Phân công vẫn ở trạng thái **Chưa xác nhận**.
- Xóa phân công, thay đổi người, vị trí hoặc ngày của kế hoạch, đưa kế hoạch về trạng thái tạm, hoặc chuyển kế hoạch sang một quy trình xác nhận khác đều sẽ đóng thẻ. Một thẻ đã đóng không bao giờ được mở lại bởi lần **Thông báo** khác; hãy thêm một phân công mới để gửi yêu cầu mới.

:::info
Đối với các yêu cầu được gửi qua quy trình xác nhận, [nhắc nhở tình nguyện viên](./plans.md#volunteer-reminders) chỉ được gửi đến những tình nguyện viên đã **chấp nhận**, để những người đang chờ phản hồi không nhận thêm nhắc nhở chồng lên các bước theo dõi của quy trình.
:::

## Thẻ của tôi

Tình nguyện viên và nhân viên không cần tìm kiếm qua từng bảng để tìm công việc của mình. Danh sách **Thẻ của tôi** trên trang **Công việc của tôi** hiển thị mọi thẻ được giao cho người dùng hiện tại trên tất cả các quy trình. Để truy cập, nhấp **Thẻ của tôi** ở đầu trang Quy trình làm việc, hoặc mở **Phục vụ > Công việc của tôi** trong menu Jump. Nhấp một thẻ sẽ mở ngăn chi tiết ngay trên trang Công việc của tôi, nơi bạn có thể xử lý thẻ hoặc xóa thẻ mà không rời trang. Nếu bạn có quyền xem quy trình, ngăn này cũng có liên kết **Mở bảng quy trình** đến bảng mà thẻ thuộc về.

## Báo cáo

Mở một quy trình và nhấp **Báo cáo** để xem phân tích cho quy trình đó:

- **Quá hạn** -- số thẻ đã vượt quá ngày đến hạn.
- **Thẻ theo bước** -- hiện có bao nhiêu thẻ ở mỗi bước, hiển thị dưới dạng biểu đồ cột.
- **Đã hoàn thành (30 ngày)** -- thông lượng trong 30 ngày gần nhất, hiển thị dưới dạng biểu đồ đường.

Dùng các báo cáo này để phát hiện điểm nghẽn -- ví dụ, một bước nơi các thẻ bị tồn đọng và không bao giờ tiến lên.

## Bài viết liên quan

- [Nhiệm vụ](./tasks.md) -- các mục hành động riêng lẻ mà thẻ quy trình được xây dựng trên đó
- [Biểu mẫu](../forms/index.md) -- tạo các biểu mẫu có thể kích hoạt quy trình
- [Nhóm](../groups/index.md) -- các nhóm mà hành động "Thêm vào nhóm" có thể đưa người vào
- [Kế hoạch phục vụ](./plans.md) -- chọn quy trình xác nhận cho các yêu cầu phục vụ của một kế hoạch
- [Vai trò & Quyền](../settings/roles-permissions.md) -- kiểm soát ai có thể xem, chỉnh sửa và quản lý quy trình làm việc
