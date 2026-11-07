---
title: "Tạo biểu mẫu"
---

# Tạo biểu mẫu

<div class="article-intro">

Tạo các biểu mẫu tùy chỉnh để thu thập thông tin từ cộng đoàn của bạn. Bạn có thể tạo biểu mẫu để đăng ký sự kiện, khảo sát, thẻ khách thăm, đơn xin gia nhập và nhiều mục đích khác. Biểu mẫu có thể được liên kết với hồ sơ người trong cơ sở dữ liệu của bạn, hoặc dùng như trang độc lập với URL công khai riêng.

</div>

## Video hướng dẫn

<YouTube id="sr9wxEj9ghQ" title="Tạo biểu mẫu và quản lý các bản gửi trong B1" next="Ra mắt trang web nhà thờ của bạn trong B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Với biểu mẫu **Người** (liên kết với hồ sơ người), trước tiên bạn cần có [người trong cơ sở dữ liệu](../people/adding-people.md).
- Với biểu mẫu thu **thanh toán**, bạn phải đã cấu hình [Stripe để quyên góp trực tuyến](../donations/online-giving-setup.md).

</div>

## Tạo biểu mẫu mới

1. Mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái của B1 Admin), mở rộng **People**, rồi nhấp **Forms**.
2. Nhấp **Add Form**.
3. Nhập **tên** cho biểu mẫu của bạn.
4. Chọn loại biểu mẫu từ danh sách thả xuống **Associate With**:
   - **People** — Liên kết các bản gửi với [hồ sơ người](../people/adding-people.md) trong cơ sở dữ liệu của bạn. Biểu mẫu Người được điền từ hồ sơ của một người, nên chúng không có liên kết để chia sẻ.
   - **Stand Alone** — Tạo một biểu mẫu độc lập với URL công khai riêng, rất phù hợp cho việc đăng ký từ bên ngoài. Chỉ biểu mẫu Stand Alone mới có [ảnh tiêu đề](#adding-a-header-photo), [mã QR](#sharing-a-form-with-a-qr-code), [nhóm liên kết](#linking-a-form-to-a-group) và **Create a person record from submissions**.
5. Nhấp **Save** để tạo biểu mẫu.

Biểu mẫu mới của bạn sẽ xuất hiện trong danh sách. Nhấp vào biểu mẫu đó để bắt đầu thêm câu hỏi.

## In biểu mẫu trống {#printing-a-blank-form}

Cần một bản giấy để phát cho mọi người? Chẳng hạn như thẻ khách thăm tại bàn chào đón, hoặc một biểu mẫu để người không có internet có thể điền tay? Nhấp **Print** bên cạnh một biểu mẫu trong danh sách Forms chính để mở bản xem trước, rồi nhấp **Print**. Các trường trống sẽ được in kèm gạch chân hoặc ô vuông cho mỗi câu hỏi để mọi người có thể điền tay; các câu hỏi bắt buộc được đánh dấu bằng dấu hoa thị. Phía trên cùng của trang hiển thị logo nhà thờ (**Light Background Logo** từ [Website > Appearance](../website/appearance.md), nếu bạn đã tải lên), với tên nhà thờ bên dưới, rồi đến tên biểu mẫu. Không có tùy chọn in nào khác — hoặc in toàn bộ biểu mẫu, hoặc không in gì cả.

## Chia sẻ biểu mẫu bằng mã QR {#sharing-a-form-with-a-qr-code}

Các biểu mẫu Stand Alone có liên kết **QR Code** bên cạnh trong danh sách Forms chính (biểu mẫu đã lưu trữ thì không có). Nhấp vào đó để mở mã QR cho URL công khai của biểu mẫu, với liên kết hiển thị bên dưới. Nhấp **Download PNG** để lưu mã dưới dạng hình ảnh mà bạn có thể in trên bản tin hoặc hiển thị trên slide. Ai quét mã sẽ mở biểu mẫu trên điện thoại của họ.

## Thêm câu hỏi {#adding-questions}

1. Mở biểu mẫu của bạn và chuyển đến tab **Questions**.
2. Nhấp **Add Question**.
3. Chọn **loại trường** từ danh sách thả xuống Provider. Các loại có sẵn bao gồm:
   - **Textbox** — Dành cho câu trả lời văn bản ngắn
   - **Date** — Dành cho việc chọn ngày
   - **Email** — Dành cho địa chỉ email
   - **Phone Number** — Dành cho nhập số điện thoại
   - **Multiple Choice** — Dành cho việc chọn từ các lựa chọn định sẵn
   - **Payment** — Dành cho việc thu thanh toán
4. Nhập **Title** và **Description** (không bắt buộc) cho câu hỏi. Mô tả sẽ hiển thị bên dưới câu hỏi khi mọi người điền biểu mẫu, vì vậy hãy dùng nó cho các gợi ý như "Ghi rõ mọi dị ứng cần chúng tôi biết."
5. Chọn **Require an answer** nếu trường này bắt buộc.
6. Nhấp **Save**.
7. Lặp lại để thêm nhiều câu hỏi hơn.

:::warning
Loại trường **Payment** yêu cầu Stripe phải được cấu hình. Nếu bạn chưa thiết lập quyên góp trực tuyến, hãy xem [Thiết lập quyên góp trực tuyến](../donations/online-giving-setup.md) trước khi thêm các trường thanh toán. Những người thanh toán trên biểu mẫu mà không đăng nhập phải đánh dấu ô **I'm not a robot** trước khi thẻ được chấp nhận.
:::

## Quản lý thành viên biểu mẫu {#managing-form-members}

1. Mở biểu mẫu của bạn và chuyển đến tab **Form Members**.
2. Tìm một người và thêm họ với một vai trò:
   - **Admin** — Có thể chỉnh sửa biểu mẫu và xem tất cả các bản gửi.
   - **View Only** — Có thể xem các bản gửi nhưng không thể chỉnh sửa biểu mẫu.

## Liên kết biểu mẫu với nhóm {#linking-a-form-to-a-group}

Bạn có thể liên kết bất kỳ biểu mẫu Stand Alone nào với một nhóm — chẳng hạn như biểu mẫu yêu cầu cầu nguyện cho một nhóm nhỏ, hoặc giấy đồng ý y tế cho một chuyến đi của thanh thiếu niên:

1. Mở **Details** của biểu mẫu.
2. Trong mục **Linked group**, chọn nhóm, hoặc để là **None**.
3. Nhấp **Save**.

Khi một biểu mẫu đã được liên kết:

- **Thành viên nhóm** sẽ thấy biểu mẫu trong mục **Forms** trên trang của nhóm tại B1.church khi biểu mẫu đang mở, kèm nút **Fill out** để mở biểu mẫu (xem [Chi tiết nhóm](../../b1-church/groups/group-details.md#linked-forms)).
- **Trưởng nhóm** cũng thấy các biểu mẫu đã đóng, và có thể đọc câu trả lời của mọi bản gửi cũng như in chúng (một bản gửi hoặc **Print all**). Trưởng nhóm chỉ có thể xem câu trả lời — họ không thể chỉnh sửa biểu mẫu trừ khi họ cũng là [thành viên biểu mẫu](#managing-form-members).
- **Trong B1 Admin**, trang của nhóm hiển thị mục **Linked forms** liệt kê từng biểu mẫu được liên kết với trạng thái **Open** hoặc **Closed**. Mục này xuất hiện đối với trưởng nhóm và những người có quyền quản trị biểu mẫu. Xem [Thành viên nhóm](../groups/group-members.md#linked-forms).

Một biểu mẫu được đóng khi nằm ngoài khoảng thời gian có thể sử dụng. Biểu mẫu đã lưu trữ sẽ không hiển thị trên trang nhóm.

### Tự động thêm người gửi vào nhóm {#automatically-adding-submitters-to-a-group}

Việc liên kết biểu mẫu với một nhóm không tự động thêm ai vào nhóm. Để thêm mọi người gửi biểu mẫu vào danh sách của nhóm được liên kết, hãy bật thêm **Create a person record from submissions** trong phần chi tiết của biểu mẫu và nhấp **Save**.

Mỗi khi có người gửi biểu mẫu, người được khớp hoặc vừa được tạo mới sẽ được thêm vào nhóm (các thành viên đã có trong nhóm sẽ được bỏ qua). Điều này hữu ích cho những trường hợp như biểu mẫu đăng ký trại hè cần tự động xây dựng danh sách nhóm của trại.

### Gửi email theo dõi

Khi đã bật **Create a person record from submissions**, bạn cũng có thể gửi email cho từng người gửi biểu mẫu. Điền **Follow-up Email Subject** và **Follow-up Email Body** trong phần chi tiết của biểu mẫu. Bạn có thể dùng các thẻ `{firstName}` và `{churchName}` trong cả hai. Email chỉ được gửi khi cả hai trường đều được điền.

:::info
Email theo dõi chỉ được gửi sau khi nhà thờ của bạn được phê duyệt để gửi email nhóm, và chúng được tính vào giới hạn email hằng ngày của nhà thờ. Xem [Bật email nhóm cho nhà thờ của bạn](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Nhân bản biểu mẫu

Để dùng lại một biểu mẫu làm điểm khởi đầu cho biểu mẫu mới, nhấp **Duplicate** bên cạnh biểu mẫu trong danh sách Forms và xác nhận. B1 sẽ tạo một bản sao y hệt của biểu mẫu — bao gồm tất cả các câu hỏi — mà bạn có thể đổi tên và chỉnh sửa độc lập.

:::tip
Nhân bản rất tiện cho các sự kiện định kỳ mà các câu hỏi đăng ký không thay đổi qua từng năm. Nhân bản biểu mẫu của năm ngoái, cập nhật tên và ngày, và bạn đã sẵn sàng.
:::

## Cấu hình thuộc tính biểu mẫu

Bạn có thể cập nhật tên và cài đặt của biểu mẫu bất cứ lúc nào. Với biểu mẫu Stand Alone, bạn cũng sẽ thấy một **URL công khai** duy nhất mà bạn có thể chia sẻ với bất kỳ ai, cùng với trường **Description** — văn bản hiển thị phía trên các câu hỏi trên trang biểu mẫu công khai, hữu ích để cho người ta biết biểu mẫu dùng để làm gì trước khi họ bắt đầu điền.

### Thêm ảnh tiêu đề {#adding-a-header-photo}

Biểu mẫu Stand Alone có thể hiển thị **Header Photo** ở phía trên cùng của biểu mẫu. Trong phần chi tiết của biểu mẫu, nhấp vào ô ảnh hoặc **Add Photo**, rồi chọn hoặc tải lên một hình ảnh (ảnh sẽ được cắt theo tỷ lệ 16:9). Nhấp **Save**. Ảnh sẽ xuất hiện bên dưới tên biểu mẫu, phía trên mô tả, trên trang URL công khai của biểu mẫu và ở bất kỳ nơi nào biểu mẫu được nhúng bằng phần tử **Form** của website. Dùng **Change Photo** để thay thế hoặc **Remove** để gỡ bỏ.

Dùng trường **Thank You Message** để đặt nội dung mà mọi người thấy sau khi gửi biểu mẫu, bao gồm cả trên trang URL công khai của biểu mẫu. Nếu để trống, họ sẽ thấy "Thank you for submitting the form!"

:::tip
Biểu mẫu Stand Alone rất phù hợp cho việc đăng ký sự kiện. Hãy chia sẻ URL công khai qua email, mạng xã hội, hoặc nhúng trực tiếp biểu mẫu lên trang web nhà thờ của bạn.
:::

:::info
Để nhúng biểu mẫu lên trang web B1 của bạn, hãy vào trình chỉnh sửa website, thêm một phần mới và chọn phần tử **Form**. Sau đó chọn biểu mẫu bạn muốn hiển thị. Xem [Quản lý trang](../website/managing-pages.md) để biết chi tiết về việc chỉnh sửa website của bạn.
:::
