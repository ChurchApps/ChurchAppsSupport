---
title: "Thiết lập Twilio cho nhà thờ (Bản nháp)"
description: "Bản nháp thiết lập Twilio do nhà thờ sở hữu trên B1, hướng dẫn đăng ký công khai, ví dụ chiến dịch và danh sách kiểm tra phê duyệt."
---

# Bản nháp thiết lập Twilio do nhà thờ sở hữu

:::caution Bản nháp cho tích hợp đang được đề xuất
Đây là quy trình đang được đề xuất. Hiện tại B1 đã có một lựa chọn **Twilio** cơ bản trong **Cài đặt > Nhắn tin** (Account SID, Auth Token, From Number và webhook STOP đến). Xem [Cài đặt nhà thờ: Nhắn tin](../../b1-admin/settings/church-settings.md#texting). Các thiết lập bổ sung của B1, ánh xạ sự đồng ý và các bước kiểm tra bên dưới là yêu cầu cho một bản phát hành trong tương lai, không phải hướng dẫn để tìm các thiết lập hiện có. Đọc [đề xuất kỹ thuật](./twilio-byok-proposal.md) để biết phạm vi và các phụ thuộc. Các nguồn của Twilio được kiểm tra vào ngày 22 tháng 10 năm 2026; hãy xác minh các yêu cầu hiện hành trước khi gửi chiến dịch.
:::

## Cách sắp xếp được khuyến nghị

Nhà thờ của bạn sở hữu tài khoản Twilio trả phí, số điện thoại, Messaging Service, thanh toán và việc đăng ký chiến dịch. B1 sẽ gửi tin nhắn thông qua các tài nguyên đó, sử dụng thông tin xác thực được nhập riêng tư trong cài đặt nhà thờ. Hãy đảm bảo ít nhất hai quản trị viên nhà thờ phù hợp có thể truy cập tài khoản Twilio, bật bảo mật tài khoản và chỉ định một người chịu trách nhiệm về sự đồng ý, tin nhắn trả lời đến và thông báo từ chối.

Bản đề xuất đầu tiên này bao gồm một số điện thoại địa phương tại Hoa Kỳ và một chương trình tin nhắn của nhà thờ được mô tả rõ ràng. Các ví dụ dưới đây sử dụng nhà thờ hư cấu **Grace Community Church** với chương trình **Grace Church Updates** dành cho thay đổi lịch thờ phượng, nhắc nhở sự kiện và sắp xếp tình nguyện viên. Hãy thay thế mọi tên, tên miền, tần suất, thông tin liên hệ và mục đích bằng thực tế của nhà thờ bạn. Đây chỉ là ví dụ riêng cho nhà thờ về các quy định của Twilio, không phải là một chiến dịch đã được phê duyệt trước hay lời hứa về việc được chấp thuận.

## 1. Chuẩn bị trải nghiệm đăng ký B1 công khai

Đăng một trang như `https://www.example.org/text-updates` trên website B1 của nhà thờ, kèm biểu mẫu B1 công khai được nhúng hoặc đường liên kết rõ ràng đến biểu mẫu công khai độc lập. Đồng thời đăng `https://www.example.org/privacy` và `https://www.example.org/sms-terms`. Các địa chỉ này chỉ là placeholder; hãy gửi các URL thực tế, có thể truy cập được.

Đối với biểu mẫu đăng ký SMS được đề xuất:

| Thiết lập | Cấu hình khuyến nghị |
|---|---|
| Truy cập | Công khai/không hạn chế; hoạt động trong thời gian xét duyệt và đăng ký liên tục; không cần đăng nhập |
| Chế độ biểu mẫu | Ban đầu dùng chế độ tiêu chuẩn; chế độ hội thoại cần hỗ trợ sự đồng ý rõ ràng như mô tả trong đề xuất kỹ thuật |
| Di động | Ghi rõ mã quốc gia; chỉ bắt buộc khi chọn đăng ký SMS, nếu được sử dụng trong biểu mẫu kết nối/sự kiện chung |
| Lựa chọn SMS | Ô đánh dấu tùy chọn riêng biệt, mặc định không được chọn, được ánh xạ với chương trình cụ thể và trường di động |
| Thông tin công bố | Hiển thị cạnh lựa chọn SMS: nhà thờ/chương trình, mục đích và tần suất tin nhắn, cước phí có thể áp dụng, STOP, HELP, thông tin liên hệ hỗ trợ, và đường liên kết có thể nhấp được đến Chính sách bảo mật/Điều khoản SMS thực tế |
| Hành động khác | Khách có thể gửi thẻ kết nối, đăng ký sự kiện hoặc yêu cầu thông tin mà không cần đăng ký nhận SMS |
| Bằng chứng | Lưu chương trình, số điện thoại chính xác, sự đồng ý đã chọn, biểu mẫu gửi, thời gian máy chủ và phiên bản thông báo/chính sách; hiện tại, chỉ một câu trả lời biểu mẫu thông thường không đủ để đăng ký ai đó |
| Tự động hóa người/nhóm | Tắt tính năng tự động tạo người/gán nhóm trong giai đoạn thử nghiệm đăng ký SMS ban đầu, trừ khi đã được xem xét theo quy tắc khớp dữ liệu hiện có của nhà thờ. Việc gán nhóm không bao giờ là sự cho phép SMS. |
| Tự động hóa hiện có | Không đưa mọi người gửi biểu mẫu hoặc mọi thành viên nhóm vào quy trình nhắn tin. Chỉ ánh xạ sự đồng ý đã được xác minh và đề xuất mới có thể cho phép chương trình đó. |
| Tin nhắn cảm ơn | Xác nhận rằng biểu mẫu đã được nhận, nhưng không khẳng định người dùng đã đăng ký SMS khi họ bỏ chọn ô hoặc khi việc xác nhận/xét duyệt vẫn đang chờ. |

Một câu hỏi dạng ô đánh dấu hiện có có thể minh họa cho biểu mẫu, nhưng B1 vẫn cần sổ ghi sự đồng ý và các cổng kiểm soát gửi tin. Bộ hiển thị dùng chung hiện tại hiển thị mô tả dưới dạng văn bản thuần; việc nhập Markdown hoặc URL vào đó không đủ để bảo đảm các liên kết chính sách có thể nhấp được. Việc triển khai phải cung cấp một điều khiển đồng ý có thể truy cập, với các liên kết thực sự. Xem [tạo biểu mẫu B1](../../b1-admin/forms/creating-forms.md) và [đề xuất kỹ thuật](./twilio-byok-proposal.md#consent-and-suppression-are-required-release-work).

Twilio yêu cầu sự đồng ý (opt-in) tự nguyện và có thể xác minh. Không gộp SMS với các điều khoản thành viên bắt buộc, quyền nhận email/điện thoại, sự đồng ý quyên góp hoặc đăng ký sự kiện. Số di động trên thẻ khách không tự nó là sự đồng ý nhận SMS. Xem [yêu cầu về sự đồng ý tự nguyện](https://www.twilio.com/docs/api/errors/30923) và [khuyến nghị cho chiến dịch](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations) của Twilio.

### Ví dụ nội dung đăng ký

Chỉ sử dụng nội dung này sau khi nhà thờ đã chọn mục đích, người gửi và tần suất thực tế. Ô đánh dấu là tùy chọn và mặc định không được chọn; các tên chính sách dưới đây phải là liên kết trong biểu mẫu đã hiển thị.

> Có, tôi muốn Grace Community Church nhắn tin cho tôi qua Grace Church Updates về thay đổi lịch thờ phượng, sự kiện của nhà thờ và lịch tình nguyện từ [số điện thoại đã đăng ký của nhà thờ]. Dự kiến tối đa 4 tin nhắn mỗi tháng. Có thể áp dụng cước tin nhắn và dữ liệu. Trả lời STOP để hủy đăng ký hoặc HELP để nhận hỗ trợ. Đăng ký SMS là tùy chọn và không bắt buộc để tham dự, đăng ký hay quyên góp. Xem Chính sách bảo mật và Điều khoản SMS của chúng tôi. Câu hỏi: [email hoặc điện thoại hỗ trợ của nhà thờ].

"Tối đa 4" là một cam kết ví dụ, không phải giới hạn do Twilio quy định. Hãy thay thế bằng một tần suất mà nhà thờ thực sự có thể đáp ứng; nếu tần suất thay đổi, hãy công bố điều đó một cách trung thực và mô tả nhịp độ dự kiến. Đừng đưa các lời kêu gọi khuyến mãi hoặc các chương trình mục vụ bổ sung vào ô đánh dấu này, trừ khi mục đích và sự đồng ý của chúng đã được đánh giá riêng.

Đối với biểu mẫu khách truy cập/sự kiện chung, việc gửi biểu mẫu khi ô này không được chọn vẫn phải thành công. Một biểu mẫu chỉ dành cho SMS có thể giải thích rằng việc chọn ô sẽ yêu cầu đăng ký, nhưng tuyệt đối không được khiến các dịch vụ không liên quan của nhà thờ phụ thuộc vào việc đăng ký. Xác nhận hành vi thực tế trên cả điện thoại và máy tính để bàn.

### Nội dung chính sách cần chuẩn bị

Trang bảo mật của nhà thờ cần giải thích thông tin nào được thu thập cho việc nhắn tin, cách sử dụng và bảo vệ thông tin đó, cũng như các thông lệ lưu giữ và liên hệ. Trang này cần nêu rõ rằng số di động và sự đồng ý nhận tin nhắn không được bán hoặc chia sẻ cho bên thứ ba hoặc đơn vị liên kết để họ sử dụng cho mục đích tiếp thị hay quảng cáo. Giải thích chính xác việc xử lý dữ liệu cần thiết bởi nhà cung cấp dịch vụ; không khẳng định rằng nhà thờ không bao giờ sử dụng bên xử lý dữ liệu trong khi thực tế lại dùng B1 và Twilio. [Hướng dẫn chính sách bảo mật](https://www.twilio.com/docs/api/errors/30908) và [khuyến nghị cho chiến dịch](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations) của Twilio là tài liệu tham chiếu cho sự phân biệt này.

Điều khoản SMS cần xác định nhà thờ và chương trình, các mục đích, tần suất thực tế, cước tin nhắn có thể phát sinh, hướng dẫn STOP/HELP, thông tin liên hệ hỗ trợ và liên kết chính sách bảo mật; đồng thời bao gồm mọi thông tin bổ sung mà quy trình xem xét hiện hành của Twilio yêu cầu. Các liên kết chính sách trên trang đăng ký phải khớp chính xác với các URL đã gửi trong chiến dịch. Kể từ ngày 30 tháng 6 năm 2026, Twilio yêu cầu các URL công khai riêng cho chính sách bảo mật và điều khoản đối với các đăng ký chiến dịch API mới; quy trình trong Console cũng thu thập các URL này. [Yêu cầu của Twilio](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

Đây là các yêu cầu về nội dung cần áp dụng cho chính sách thực tế của nhà thờ, chứ không phải để thay thế các thông lệ bảo mật hiện có hoặc một chính sách chung chung được dán vào mà không kiểm tra.

## 2. Đăng ký nhà thờ và chương trình nhắn tin trong Twilio

1. Tạo hoặc sử dụng một **tài khoản trả phí thuộc sở hữu của nhà thờ** và một số điện thoại địa phương tại Hoa Kỳ hỗ trợ SMS. Sử dụng nhất quán tên pháp lý của nhà thờ, thông tin EIN/đăng ký kinh doanh, địa chỉ, website và người đại diện được ủy quyền. Không thay thế bằng thông tin của ChurchApps hoặc của nhà thờ khác.
2. Thực hiện quy trình đăng ký Thương hiệu (Brand) dành cho khách hàng trực tiếp của Twilio, phù hợp với loại hình pháp lý thực tế của nhà thờ. Đối với tổ chức phi lợi nhuận đủ điều kiện, hãy xem [hướng dẫn đăng ký phi lợi nhuận](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Trường hợp sử dụng từ thiện/501(c)(3) phụ thuộc vào điều kiện đủ tư cách; tên của nhà thờ không tự động đồng nghĩa với việc được Twilio phê duyệt hay miễn trừ.
3. Tạo một Messaging Service chuyên dụng và gửi chiến dịch A2P 10DLC liên quan. Chọn trường hợp sử dụng phản ánh đúng các tin nhắn thực tế và các tùy chọn có sẵn cho Thương hiệu đã được phê duyệt; các ví dụ ở đây không quy định một mã trường hợp sử dụng chung cho mọi nhà thờ.
4. Cung cấp URL đăng ký công khai, các URL chính sách, mô tả đầy đủ luồng opt-in/tin nhắn và các tin nhắn mẫu được yêu cầu. Bao gồm mọi phương thức đăng ký thực tế; đặt khai báo về liên kết nhúng/số điện thoại cho khớp với nội dung thực tế. Không liệt kê đăng ký bằng từ khóa hoặc xác nhận kép (double opt-in) trừ khi luồng đó đã tồn tại và đã được kiểm tra.
5. Gắn số gửi với Service và chiến dịch đã được phê duyệt. Chờ cả **xác minh chiến dịch** lẫn **hoàn tất đăng ký số** trước khi gửi tin.

Thực hiện các bước này trong Twilio Console của chính nhà thờ. Tích hợp B1 được đề xuất không gửi đăng ký thay cho nhà thờ. [Hướng dẫn nhanh đăng ký](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) và [tài nguyên chiến dịch](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) của Twilio giải thích các trường đăng ký và trạng thái. Một số đang chờ xử lý vẫn có thể chặn việc gửi tin sau khi chiến dịch đã được phê duyệt. [Đăng ký số](https://www.twilio.com/docs/api/errors/30035)

### Ví dụ mô tả chiến dịch

> Grace Community Church sử dụng Grace Church Updates để gửi thông báo thay đổi lịch thờ phượng, nhắc nhở các sự kiện của nhà thờ và thông báo sắp xếp tình nguyện cho những người chọn chương trình này trên website công khai của nhà thờ chúng tôi. Chúng tôi gửi không quá bốn tin nhắn mỗi tháng theo chương trình này. Người nhận có thể dừng nhận tin nhắn bất cứ lúc nào. Chương trình này không bao gồm danh sách liên hệ mua từ bên ngoài, quảng cáo của bên thứ ba hoặc lời kêu gọi gây quỹ.

Ví dụ này chỉ phù hợp với nhà thờ thực sự tuân thủ các giới hạn và loại trừ đó. Nếu riêng các nhắc nhở tình nguyện viên đã vượt quá tần suất đã cam kết, hãy thay đổi thiết kế chương trình và phần công bố trước khi gửi.

### Ví dụ mô tả luồng tin nhắn

> Khách truy cập mở [URL đăng ký thực tế của nhà thờ], nhập số di động và tự chọn ô đánh dấu Grace Church Updates không bắt buộc. Ô này không được chọn khi biểu mẫu mở ra. Phần công bố nêu tên Grace Community Church, mô tả các thông báo về thay đổi lịch thờ phượng, nhắc nhở sự kiện và lịch tình nguyện, nêu giới hạn hàng tháng và cước phí có thể áp dụng, đồng thời giải thích STOP và HELP. Liên kết Chính sách bảo mật và Điều khoản SMS hiển thị dẫn đến [URL bảo mật thực tế] và [URL điều khoản SMS thực tế]. Việc từ chối SMS không ngăn cản việc tham dự, đăng ký sự kiện, quyên góp hay sử dụng biểu mẫu kết nối chung. B1 ghi lại lựa chọn đồng ý rõ ràng, số điện thoại, thời gian gửi và phiên bản thông báo. Chúng tôi chỉ gửi chương trình này đến những người đăng ký đã được ghi nhận, và ngăn gửi tin cho những người đã rút đăng ký trước mọi lần gửi tiếp theo.

Hãy điều chỉnh đoạn này cho phù hợp với luồng đã triển khai. Nếu sử dụng xác nhận qua điện thoại hoặc xét duyệt bởi nhân viên, hãy mô tả trạng thái chờ và bước kích hoạt chính xác. Nếu sử dụng các phương thức khác, hãy liệt kê từng phương thức và bằng chứng tương ứng. Nếu việc đăng ký nằm sau đăng nhập hoặc diễn ra trên giấy, Twilio yêu cầu bằng chứng công khai, đã che thông tin nhạy cảm về trải nghiệm đăng ký thực tế; tuyệt đối không để lộ biểu mẫu đã điền hoặc dữ liệu thành viên. [Hướng dẫn về opt-in có thể xác minh](https://www.twilio.com/docs/api/errors/30923)

### Ví dụ tin nhắn gửi đi

Đây là các mẫu hư cấu để điều chỉnh; hãy dùng URL thực của nhà thờ và thay các giá trị trong ngoặc vuông trước khi gửi. API chiến dịch của Twilio chấp nhận từ hai đến năm mẫu. Các mẫu nên xác định nhà thờ, phản ánh đúng mục đích đã khai báo và bao gồm hướng dẫn hủy đăng ký. [Các trường mẫu của chiến dịch](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Buổi thờ phượng Chủ nhật sẽ bắt đầu lúc [time] do [reason]. Chi tiết: [church website URL]. Trả lời STOP để ngừng nhận tin nhắn.
```

```text
Grace Community Church: Nhắc nhở rằng [church event] diễn ra vào [date] lúc [time]. Thông tin: [church event URL]. Trả lời STOP để ngừng nhận tin nhắn.
```

```text
Grace Community Church: Bạn được phân công phục vụ tại [team] vào [day] này. Vui lòng xem lịch của bạn: [B1 church portal URL]. Trả lời STOP để ngừng nhận tin nhắn.
```

Các URL trong ngoặc vuông là biến mẫu; các ví dụ đã gửi nên hiển thị tên miền thực của nhà thờ và kiểu liên kết thực tế. Liên kết tới lịch trình có thể yêu cầu đăng nhập, nhưng trang đăng ký và các chính sách dùng để thẩm định phải có thể được xem công khai. Không đưa ghi chú nội bộ, thông tin trẻ em hoặc chi tiết nhận dạng thành viên vào các mẫu tin nhắn khi xin phê duyệt. Giữ nội dung mẫu nhất quán với những gì mẫu của B1 thực sự gửi; không hứa về hộp thư trả lời hay hành vi nhắc nhở cụ thể nếu tính năng đó chưa có.

### Phản hồi STOP, START và HELP

Sử dụng tính năng Advanced Opt-Out của Twilio Messaging Service cho các xác nhận này, và tùy chỉnh thông tin nhận diện nhà thờ/chương trình cùng thông tin hỗ trợ. Ý định phản hồi mẫu:

- **STOP:** Xác nhận rằng Grace Church Updates đã dừng gửi tin, và giải thích cách hỗ trợ để tiếp tục nhận tin.
- **START:** Xác nhận việc tiếp tục nhận tin cho đúng chương trình đó, bao gồm thông tin nhận diện, tần suất/cước phí và hướng dẫn trợ giúp/hủy theo yêu cầu của luồng đã cấu hình.
- **HELP:** Nêu rõ Grace Community Church và cung cấp thông tin hỗ trợ thực tế cùng hướng dẫn hủy đăng ký.

Không gửi xác nhận thứ hai từ B1 khi Twilio đã phản hồi. Tin nhắn HELP không đồng nghĩa với việc đăng ký. START không được đăng ký người dùng vào các chương trình khác của nhà thờ hay hiển thị họ trong danh bạ thành viên. [Advanced Opt-Out của Twilio](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Kiểm tra bộ hồ sơ phê duyệt trước khi gửi

- [ ] Thông tin pháp lý/Thương hiệu thực tế, danh tính website và mục đích chiến dịch của nhà thờ khớp nhau.
- [ ] Trang đăng ký và biểu mẫu đang hoạt động mở được mà không cần đăng nhập trong cửa sổ trình duyệt riêng tư, kể cả trên thiết bị di động.
- [ ] Ô SMS mặc định không được chọn và có thể bỏ qua trong khi hoàn thành hành động chính của khách truy cập/sự kiện.
- [ ] Mục đích chương trình, số gửi, tần suất thực tế, cước phí có thể áp dụng, STOP, HELP, thông tin liên hệ hỗ trợ và các liên kết chính sách có thể nhấp được đều hiển thị cạnh lựa chọn SMS.
- [ ] Các URL bảo mật/điều khoản chính xác đã gửi cho Twilio là công khai, hoạt động không cần thông tin đăng nhập và cùng xác định một nhà thờ/chương trình. Nội dung chính sách khớp với việc xử lý dữ liệu thực tế.
- [ ] Mỗi tin nhắn mẫu khớp với chương trình, danh tính người gửi thực tế và hành vi liên kết/số điện thoại dự kiến. Chiến dịch mô tả mọi phương thức đăng ký thực tế.
- [ ] Ảnh chụp màn hình đã che thông tin hiển thị biểu mẫu trống, ô đánh dấu/phần công bố và liên kết chính sách như người xét duyệt sẽ thấy. Bằng chứng không chứa hồ sơ thành viên hay khóa bảo mật nào.
- [ ] Nhà thờ có cách vận hành để lưu giữ bằng chứng đồng ý và xử lý yêu cầu rút đăng ký trước khi gửi tin, bao gồm cả các yêu cầu nhận qua điện thoại/email.

Các bước kiểm tra này giúp giảm thiểu những sai lệch có thể tránh được; quyết định phê duyệt thuộc về Twilio và đối tác xét duyệt của họ. Giữ các URL trang đăng ký và chính sách thực tế luôn có thể truy cập sau khi được phê duyệt, chứ không chỉ trong thời gian xét duyệt.

## 4. Kết nối và kiểm tra tích hợp B1 trong tương lai

Sau khi tích hợp được phát hành, phần thiết lập Nhắn tin được đề xuất sẽ thu thập Account SID của nhà thờ, API Key SID/secret chuyên dụng, Auth Token riêng cho webhook, Messaging Service SID và người gửi đã chọn. Chỉ tạo khóa trong Console của nhà thờ và chỉ nhập bí mật trong cài đặt B1 riêng tư. [Hướng dẫn API key của Twilio](https://www.twilio.com/docs/iam/api-keys)

Sao chép các URL webhook tin nhắn đến và trạng thái gửi dành riêng cho nhà thờ do B1 cung cấp vào cấu hình dịch vụ Twilio tương ứng. Bật Advanced Opt-Out và kiểm tra xem tin nhắn đến có được chuyển tới webhook đã cấu hình hay không. B1 cần hiển thị các kiểm tra riêng biệt cho: thông tin xác thực, quyền sở hữu dịch vụ/người gửi, chiến dịch đã xác minh, số đã hoàn tất đăng ký, xác minh tin nhắn đến và tin nhắn thử đã gửi thành công. Một thông tin xác thực đã lưu hoặc một yêu cầu API được chấp nhận không đồng nghĩa với việc tin nhắn đã được gửi đến người nhận.

Nếu B1 không thể kiểm tra tự động tín hiệu đăng ký, hãy xác nhận trực tiếp trong Console; giao diện phải ghi rõ kết quả kèm ngày là "quản trị viên đã xác nhận". Giải quyết trạng thái đang chờ hoặc thất bại trước khi bật tin nhắn thực tế. Sử dụng một tin nhắn thử riêng biệt, được yêu cầu rõ ràng, gửi đến một người nhận thử nghiệm là người lớn đã đồng ý, sau đó:

1. Xác nhận rằng một đăng ký tài liệu hóa khớp sẽ tạo đúng bản ghi đồng ý cho số điện thoại/chương trình; việc từ chối hoặc thay đổi số điện thoại không được âm thầm đăng ký người nhận.
2. Gửi một tin thử, xác nhận đã nhận, và đối chiếu trạng thái B1 với Message SID và kết quả gửi của Twilio.
3. Trả lời STOP và kiểm tra xem tin nhắn thủ công, tin nhắn nhóm, quy trình tự động và nhắc nhở có bỏ qua số điện thoại đó hay không. Việc hiển thị trong danh bạ không được thay đổi.
4. Thực hiện luồng đăng ký lại cho cùng chương trình như đã tài liệu hóa và phản hồi HELP; xác minh không có xác nhận trùng lặp và không có thay đổi tùy chọn nào không liên quan.

## 5. Duy trì chương trình

Chỉ định một người phụ trách của nhà thờ để theo dõi trạng thái chiến dịch/tài khoản, cảnh báo số dư và thanh toán, lỗi gửi tin và tin nhắn trả lời đến trong Twilio. Bản phát hành B1 đầu tiên được đề xuất không có hộp thư SMS hội thoại, vì vậy hãy công bố và theo dõi một thông tin liên hệ hỗ trợ thực tế, và kiểm tra các tin nhắn trả lời thay vì giả định nhân viên sẽ thấy chúng trong B1.

Lưu giữ lịch sử đồng ý và rút đăng ký, phiên bản thông báo/chính sách hiện tại, mã định danh chiến dịch và bằng chứng phê duyệt đã che thông tin trong hồ sơ do nhà thờ kiểm soát. Tuyệt đối không dán khóa hoặc danh sách người nhận vào các yêu cầu hỗ trợ công khai. Khi số điện thoại, dịch vụ, thông tin xác thực, luồng đăng ký, tần suất hoặc mục đích thay đổi, hãy kiểm tra lại tích hợp và cập nhật việc đăng ký/sự đồng ý nếu cần thiết trước khi tiếp tục gửi. Xem xét cẩn thận các số điện thoại dùng chung trong gia đình và các số đã thay đổi; tính đủ điều kiện nhận tin phụ thuộc vào số điện thoại đã đồng ý và chương trình, chứ không phải hồ sơ của từng thành viên trong gia đình.

Khi bị từ chối, hãy đọc mã lỗi thực tế của Twilio, sửa đúng điểm không nhất quán cụ thể trên cả website và hồ sơ gửi, rồi nộp lại qua Console của nhà thờ. Với người gửi chưa đăng ký hoặc đang chờ, hãy đợi hoàn tất đăng ký thay vì đổi số để lách quy trình. Sử dụng [hướng dẫn khắc phục sự cố đăng ký của Twilio](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) và tài liệu tra cứu mã lỗi được cung cấp. Không hứa về thời gian xử lý cố định.
