---
title: "Twilio BYOK (Đề xuất)"
description: "Đề xuất tích hợp Twilio do nhà thờ sở hữu, mô hình đồng ý, phạm vi triển khai và tiêu chí phát hành."
---

# Đề xuất tích hợp Twilio BYOK

:::caution Đề xuất — chưa phải tích hợp có sẵn
Đây là bản thiết kế để người bảo trì xem xét, dựa trên mã nguồn công khai và tài liệu Twilio đã được xem xét vào ngày 22 tháng 10 năm 2026. Kể từ đó, một nhà cung cấp Twilio cơ bản đã được phát hành (`@churchapps/texting` 0.6.0 và **Cài đặt > Nhắn tin** trong B1 Admin): nhà thờ nhập Account SID, Auth Token và số From (nhà cung cấp cũng chấp nhận Messaging Service SID bắt đầu bằng `MG`, nhưng cột `fromNumber` vẫn là `varchar(20)`, quá ngắn cho SID dài 34 ký tự), tin nhắn được gửi theo từng yêu cầu cho mỗi người nhận qua Messages API của Twilio, và các phản hồi STOP được chuyển đến B1 thông qua webhook đến hiện có. Xem [Cài đặt nhà thờ: Nhắn tin](../../b1-admin/settings/church-settings.md#texting). Mô hình đồng ý, xử lý Advanced Opt-Out, trạng thái gửi và các kiểm tra mức độ sẵn sàng thiết lập dưới đây vẫn là đề xuất, chưa phải hành vi đã được phát hành. [Bản nháp hướng dẫn thiết lập cho nhà thờ](./twilio-byok-onboarding-draft) chứa hướng dẫn thiết lập đề xuất và ví dụ dành riêng cho nhà thờ.
:::

## Hướng đi được khuyến nghị

Bổ sung Twilio vào hệ thống nhà cung cấp nhắn tin hiện có của B1, sử dụng **tài khoản Twilio do nhà thờ sở hữu, thông tin xác thực API, Messaging Service và số điện thoại hỗ trợ SMS**. Nhà thờ đăng ký pháp nhân và chiến dịch nhắn tin của riêng mình, thanh toán trực tiếp cho Twilio, duy trì sự đồng ý của người nhận và quản lý việc phê duyệt trong Twilio Console. ChurchApps cung cấp tích hợp và tài liệu.

Bắt đầu với một chương trình nhắn tin, một Messaging Service và một số điện thoại 10DLC địa phương tại Hoa Kỳ cho mỗi nhà thờ B1. Hỗ trợ tin nhắn cá nhân, tin nhắn nhóm, tin nhắn quy trình làm việc và nhắc nhở đăng ký thông qua các màn hình B1 hiện có. Một chương trình đầu tiên hợp lý bao gồm thông báo thay đổi buổi lễ, nhắc nhở sự kiện và lịch phân công tình nguyện viên, khi cả ba đều được mô tả trong sự đồng ý và chiến dịch đã được phê duyệt của nhà thờ đó. Tin nhắn quảng bá hoặc gây quỹ yêu cầu phạm vi và sự đồng ý được đánh giá riêng; không được âm thầm thêm vào chương trình này.

| Trách nhiệm | Nhà thờ | B1 / ChurchApps |
|---|---|---|
| Tài khoản Twilio, thanh toán, quyền sở hữu số điện thoại | Sở hữu và quản trị | Không cung cấp tài khoản nền tảng hoặc bán lại tín dụng |
| Đăng ký thương hiệu, chiến dịch, số điện thoại | Gửi thông tin nhà thờ chính xác; xử lý quá trình xem xét và chỉnh sửa | Giải thích các điều kiện tiên quyết và đọc thông tin mức độ sẵn sàng hiện có |
| Trang đăng ký, chính sách, mục đích tin nhắn | Xuất bản và duy trì | Cung cấp các điều khiển biểu mẫu tương thích, ví dụ và hồ sơ đồng ý |
| Xác định người nhận đủ điều kiện và xử lý STOP | Xem xét bằng chứng đồng ý và yêu cầu các bằng chứng nhận được bên ngoài SMS | Thực thi việc đồng ý, chặn gửi, quyền và webhook có chữ ký |
| Gửi tin và hỗ trợ | Theo dõi lỗi Twilio, tình trạng tài khoản và các phản hồi đến | Hiển thị trạng thái gửi và phân phối mà không hứa hẹn bảo đảm về việc phê duyệt |

Hoãn việc tạo tài khoản mẹ Twilio do ChurchApps sở hữu, tài khoản con cho khách hàng, mua số điện thoại, gửi hồ sơ Trust Hub, thanh toán, hộp thư hội thoại, MMS/WhatsApp, gửi tin quốc tế và đăng ký số miễn phí (toll-free). Số miễn phí là một con đường xác minh người gửi riêng biệt, không phải là cách bỏ qua quy trình đăng ký. Những ranh giới này giúp bản phát hành đầu tiên phù hợp với mô hình tự mang nhà cung cấp (bring-your-own-provider) hiện có của B1.

## Nền tảng hiện có và các khoảng trống

Các quan sát sau đây gắn với các ảnh chụp mã nguồn cụ thể, chứ không dựa trên giả định về những gì đang được triển khai hiện tại:

| Thành phần | Hành vi hiện có | Hệ quả |
|---|---|---|
| [Đăng ký nhà cung cấp và hợp đồng](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` hỗ trợ gửi đơn lẻ/hàng loạt, kiểm tra hợp lệ, các khả năng tùy chọn về người đăng ký/danh sách, và mã tin nhắn của nhà cung cấp trong kết quả. Chưa có bộ điều hợp Twilio nào được đăng ký. | Thêm Twilio vào `@churchapps/texting`; không cần tạo người đăng ký hay danh sách do nhà cung cấp quản lý. |
| [Cài đặt nhắn tin](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Clearstream, Text In Church và Nalo có thể chọn; MinistryStuff được kiểm soát bằng tính năng. Việc chỉnh sửa và lưu người gửi hiện chỉ dành riêng cho Nalo. | Thêm các trường Twilio rõ ràng, kiểm tra hợp lệ, lưu người gửi và hướng dẫn thiết lập. Chỉ thêm một mục trong danh sách thả xuống là không đủ. |
| [Controller](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) và [cổng module](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Thông tin xác thực được mã hóa và che giấu; việc gửi thủ công và tự động đều xác định nhà cung cấp của nhà thờ. Gửi nhóm loại bỏ các số điện thoại trùng lặp. | Tái sử dụng các đường dẫn này và giữ nguyên việc phân quyền. Đặt các cổng kiểm tra đồng ý/mức độ sẵn sàng mới trong một đường dẫn máy chủ chung để quy trình làm việc không thể bỏ qua. |
| [Hàm hỗ trợ STOP](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Phân tích `From`/`Body` theo kiểu Twilio; xác thực token URL của nhà thờ; đặt `person.optedOut` và tắt nhắc nhở SMS. Các phản hồi khác bị bỏ qua. | Đây là điểm khởi đầu hữu ích, nhưng chưa phải là webhook Twilio hoàn chỉnh. Cần bổ sung chữ ký Twilio và trạng thái đăng ký SMS độc lập. |
| [Lược đồ tin nhắn](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Lưu `apiKey`, `apiSecret` và `fromNumber` 20 ký tự; nhật ký gửi chỉ lưu thành công/lỗi ngay lập tức, không lưu mã nhà cung cấp hay trạng thái phân phối cuối cùng. | Số E.164 phù hợp; Messaging Service SID dài 34 ký tự cần có trường riêng. Cần thêm lưu trữ bền vững cho mã và trạng thái tin nhắn của nhà cung cấp. |
| [Trang biểu mẫu công khai](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [bộ hiển thị biểu mẫu dùng chung](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx) và [controller gửi biểu mẫu](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Có biểu mẫu không giới hạn và ô đánh dấu tùy chọn. Mô tả chỉ là văn bản thuần. Bài nộp lưu lại câu trả lời, nhưng luồng nhắn tin không có sổ cái đồng ý riêng cho từng chiến dịch. | Thêm một điều khiển đồng ý SMS được cấu hình với liên kết chính sách thực tế và ghi nhận bằng chứng ở phía máy chủ; một ô đánh dấu chung hoặc việc là thành viên nhóm không được tự động cấp quyền gửi SMS. |

[Tài liệu cài đặt nhà thờ dành cho người dùng](../../b1-admin/settings/church-settings#texting) cũng giải thích rằng cờ từ chối nhận tin hiện tại đang được dùng chung với quyền riêng tư của thư mục. Sự liên kết này là một vấn đề cần lưu ý khi phát hành: việc trả lời START tuyệt đối không được thay đổi khả năng hiển thị trong thư mục.

## Thiết kế cấu hình và thông tin xác thực

Sử dụng các trường cấu hình rõ ràng, bổ sung thay vì ghi đè `fromNumber` hoặc lưu dữ liệu có cấu trúc trong chuỗi API key:

| Trường | Mục đích đề xuất |
|---|---|
| `accountSid` | Mã định danh tài khoản/dự án Twilio do nhà thờ sở hữu (`AC…`) |
| `apiKey`, `apiSecret` | API Key SID (`SK…`) và secret chuyên dụng của Twilio để truy cập API gửi tin; được mã hóa và che giấu |
| `webhookAuthToken` | Auth Token của tài khoản dùng bởi Twilio SDK để xác thực chữ ký đến; được mã hóa và che giấu riêng biệt |
| `messagingServiceSid` | Messaging Service của nhà thờ (`MG…`, 34 ký tự) |
| `fromNumber` | Số điện thoại hỗ trợ SMS đã chọn theo định dạng E.164, đã được xác minh là người gửi trong tài khoản/dịch vụ đó |
| Cấu hình chương trình | ID chương trình ổn định, tên, mục đích được phép, URL đăng ký/chính sách và phiên bản thông báo |

Twilio [ưu tiên API key để xác thực REST](https://www.twilio.com/docs/iam/api-keys). Sử dụng quyền API key hẹp nhất đã được kiểm thử, đủ để gửi tin và thực hiện các kiểm tra thiết lập chỉ đọc cần thiết. Auth Token của tài khoản vẫn cần thiết cho [kiểm tra chữ ký webhook chuẩn của Twilio](https://www.twilio.com/docs/usage/security). Hãy giải thích sự khác biệt này trong giao diện; API secret không phải là Auth Token của webhook. Chỉ lưu thông tin xác thực trong kho cài đặt phía máy chủ, không bao giờ đặt trên trang công khai, trong câu trả lời biểu mẫu, trong yêu cầu gửi từ trình duyệt hoặc trong các vấn đề hỗ trợ.

Nhà thờ tạo và quản lý các tài nguyên này trong Console. Hành động xác thực của B1 chỉ được đọc dịch vụ, người gửi và thông tin đăng ký đã cấu hình. Không được mua số, tạo chiến dịch, thay đổi cài đặt Twilio hoặc gửi tin nhắn thử như một tác dụng phụ. Cung cấp một hành động gửi thử riêng, rõ ràng, chỉ giới hạn cho một người nhận đủ điều kiện và đã đồng ý.

Chỉ giữ lại thông tin xác thực đã che giấu khi chỉnh sửa cùng một nhà cung cấp đã lưu. Khi chuyển sang Twilio, phải yêu cầu thông tin xác thực riêng và xóa các giá trị cũ dành riêng cho nhà cung cấp; không được mang API key đã che giấu của Clearstream hoặc Nalo sang cấu hình Twilio.

Giới hạn mọi thao tác tải/cập nhật trong phạm vi nhà thờ B1 đã xác thực. Gắn các callback với tích hợp đã lưu và tài khoản/dịch vụ/người gửi Twilio mong đợi, đồng thời từ chối các gán nhà thờ chéo xung đột. Việc xoay vòng thông tin xác thực hoặc ngắt kết nối nhà cung cấp phải làm mất hiệu lực trạng thái sẵn sàng và tạm dừng các tin nhắn đang chờ, nhưng không được xóa dữ liệu đồng ý hoặc lịch sử gửi.

## Sự đồng ý và chặn gửi là công việc bắt buộc trước khi phát hành

Giới thiệu các bản ghi đăng ký gắn với số điện thoại cho chương trình Twilio, cùng với các sự kiện đồng ý/chặn gửi chỉ được thêm vào (append-only). Bằng chứng tối thiểu được đề xuất gồm: ID nhà thờ, ID chương trình, số điện thoại đã chuẩn hóa, liên kết tùy chọn với người đã xác minh, hành động khẳng định, ID bài nộp hoặc biểu mẫu nguồn hoặc bằng chứng bên ngoài đã được xem xét, dấu thời gian từ máy chủ, nội dung và phiên bản thông báo, URL nguồn, URL chính sách và các sự kiện rút lại/đăng ký lại. Giới hạn quyền truy cập và thời gian lưu giữ theo chính sách bảo mật dữ liệu hiện có của nhà thờ.

Sử dụng các trạng thái như `unknown` (chưa rõ), `pending` (đang chờ), `active` (đang hoạt động) và `suppressed` (đã chặn). Số điện thoại di động hiện có, danh bạ nhập vào, dữ liệu điểm danh, quyên góp, tư cách thành viên nhóm, `person.optedOut = false` và `allowSms` đều không phải là sự đồng ý khẳng định cho chương trình. Việc nhập sự đồng ý đã được ghi nhận phải là một hành động có phân quyền, có kiểm toán và có nguồn được ghi lại; quá trình di chuyển dữ liệu không được tự động đăng ký tất cả mọi người.

Với luồng web ban đầu, sử dụng chế độ biểu mẫu công khai tiêu chuẩn của B1. Thêm một câu hỏi về đồng ý SMS được cấu hình rõ ràng, mặc định không được chọn, không bắt buộc, hiển thị các liên kết chính sách có thể nhấp và ánh xạ tới một chương trình và một trường di động. Xác thực ánh xạ đó ở phía máy chủ và lưu lại ảnh chụp nội dung thông báo đã hiển thị khi ghi nhận phản hồi khẳng định. Không bao giờ suy ra sự đồng ý từ nhãn câu hỏi tùy ý, trợ lý AI hội thoại hoặc tư cách thành viên quy trình làm việc. Chỉ bật tương đương hội thoại sau khi hành động khẳng định rõ ràng và việc ghi nhận bằng chứng đã được kiểm thử.

Một bài nộp không đánh dấu sẽ không tạo đăng ký nào và không được rút lại sự đồng ý hiện có của người khác. Gắn sự đồng ý với số điện thoại đã nộp; nhân viên có thể giải quyết các liên kết người không rõ ràng mà không cần gộp hồ sơ hộ gia đình. Số di động đã thay đổi cần có sự đồng ý riêng. Với biểu mẫu ẩn danh, áp dụng các biện pháp kiểm soát lạm dụng và làm rõ mọi bước xác minh quyền sở hữu số điện thoại hoặc xác nhận hai lớp; một ô đánh dấu đơn thuần không chứng minh ai là chủ số điện thoại. Nếu sử dụng xác nhận, giữ đăng ký ở trạng thái chờ cho đến khi hoàn tất và mô tả đúng luồng đó trong tài liệu đăng ký.

Với Twilio, tách việc chặn SMS khỏi khả năng hiển thị trong thư mục. Chuyển thận trọng mọi lựa chọn từ chối nhận tin cũ thành một bản ghi chặn SMS; các người nhận cũ khác để ở trạng thái `unknown`. Một đăng ký mới rõ ràng, có tài liệu, có thể thiết lập sự đồng ý SMS trong khi quyền riêng tư của thư mục giữ nguyên. Giữ nguyên hành vi của các nhà cung cấp khác cho đến khi việc di chuyển dữ liệu của họ được xem xét riêng.

Tại mỗi lần gửi thực tế, yêu cầu tích hợp của nhà thờ đã được bật/sẵn sàng, có sự đồng ý hiện hành của chương trình cho đúng số điện thoại, không bị chặn ở cấp số điện thoại, và quyền của người gọi hiện có. Nhắc nhở còn phải tuân theo `allowSms`, tùy chọn theo danh mục và giờ yên tĩnh. Kiểm tra lại sau khi đưa vào hàng đợi, thay thế các trường ghép, chuẩn hóa và xác thực số điện thoại, đồng thời loại bỏ trùng lặp theo số điện thoại. STOP chặn mọi lần gửi cho dịch vụ/chương trình, bao gồm cả tin nhắn thủ công và quy trình làm việc; việc này cũng phải áp dụng cho mọi người dùng chung số điện thoại đó.

Hiển thị nhất quán thông tin nhận diện nhà thờ và hướng dẫn STOP trong đường dẫn gửi Twilio chung, đồng thời xem trước số lượng SMS/đoạn cuối cùng. Việc mở rộng trường ghép và xử lý độ dài phải giữ nguyên các thành phần này; không được cắt ngắn hướng dẫn từ chối nhận tin một cách âm thầm. Giữ các ví dụ và mẫu nhắc nhở/quy trình thực tế đồng bộ với nhau.

## Gửi, phản hồi và trạng thái phân phối của Twilio

Triển khai `TwilioProvider.sendMessage` thông qua Messages API với Messaging Service và người gửi đã chọn. Trả về mã SID tin nhắn của nhà cung cấp và kết quả đã được chấp nhận/gửi đi; việc HTTP chấp nhận không đồng nghĩa với việc tin nhắn đã đến thiết bị cầm tay. Một lần gửi nhóm sử dụng kết quả cho từng người nhận theo đúng thứ tự đầu vào.

Giới hạn đồng thời gửi đi cho **cả** `sendBulk` và các lần gửi riêng lẻ: nhánh trường ghép hiện tại đang phân nhánh các lệnh gọi `sendMessage`. Lưu trữ bền vững ý định gửi và các công việc có thể nhận cho các nhóm không thể nằm trong giới hạn của một yêu cầu; tái sử dụng mô hình triển khai hiện có thay vì yêu cầu nhà thờ chạy thêm một dịch vụ khác. Thử lại các lỗi tạm thời đã biết hoặc lỗi giới hạn tốc độ với cơ chế lùi thời gian. Coi các lần hết thời gian chờ không rõ ràng là kết quả chưa xác định cần đối soát, không phải là lệnh gửi lại mù quáng, vì có nguy cơ gửi trùng tin nhắn và bị tính phí trùng.

Cấu hình URL callback đến và URL callback trạng thái riêng cho từng nhà thờ. Xác thực `X-Twilio-Signature` bằng SDK, với đúng URL bên ngoài đã cấu hình, các tham số biểu mẫu gốc và Auth Token của tài khoản tương ứng. Chỉ có URL bí mật thì không đủ. Ghép callback với các bản ghi nhà thờ/tài khoản/tin nhắn đã lưu, xử lý các sự kiện trùng lặp và callback đến trước khi kết quả gửi được ghi nhận, đồng thời ngăn các sự kiện cũ ghi đè trạng thái cuối cùng. Trả về TwiML rỗng để xác nhận tin đến và phản hồi thành công phù hợp cho các sự kiện trạng thái. [Bảo mật Twilio](https://www.twilio.com/docs/usage/security), [callback trạng thái](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Khuyến nghị sử dụng **Advanced Opt-Out** của Messaging Service. Twilio chịu trách nhiệm xác nhận STOP/START/HELP; B1 tiếp nhận các sự kiện `OptOutType` đã được xác thực mà không gửi xác nhận trùng lặp. STOP ghi nhận chặn gửi ngay lập tức. START chỉ khôi phục một đăng ký đã biết cho đúng chương trình đã được thông báo, kèm một sự kiện đăng ký lại mới; không được đưa một số điện thoại mới vào các tin nhắn không liên quan hoặc bật tùy chọn nhắc nhở. HELP không đăng ký ai. Các phản hồi đến khác nằm ngoài phạm vi hộp thư của B1; nhà thờ cần có cách được ghi chép rõ ràng để theo dõi chúng trong Twilio. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Lưu mã SID tin nhắn của Twilio, sự liên kết tài khoản/dịch vụ, thời điểm gửi, trạng thái/mã lỗi cuối cùng và thời điểm callback cùng với nhật ký gửi. Hiển thị chính xác các trạng thái: đã xếp hàng/đã chấp nhận, đã phân phối, thất bại, không phân phối được hoặc chưa xác định. Giữ nguyên hợp đồng phản hồi hiện có cho các nhà cung cấp khác và xác định rõ số liệu thành công tổng hợp là đại diện cho việc gửi đi hay việc phân phối.

## Kiểm tra mức độ sẵn sàng thiết lập và xác thực phê duyệt

Hiển thị các mốc kiểm tra riêng biệt cho thông tin xác thực, quyền sở hữu dịch vụ/người gửi, xác minh chiến dịch, đăng ký số điện thoại, kiểm tra webhook và một tin nhắn thử nghiệm đã được phân phối thành công. Không bao giờ hiển thị một huy hiệu "đã phê duyệt" màu xanh chỉ vì thông tin xác thực hoạt động.

Với số điện thoại địa phương tại Hoa Kỳ, đọc [tài nguyên chiến dịch Usa2p](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) của dịch vụ và yêu cầu chiến dịch liên quan ở trạng thái `VERIFIED`. Đồng thời xác minh số điện thoại đã chọn được liên kết với dịch vụ đó và đã hoàn tất đăng ký số: một chiến dịch đã được phê duyệt vẫn có thể có số điện thoại đang chờ xử lý. Khi API đọc được hỗ trợ không cung cấp tín hiệu cần thiết, hiển thị **cần xác minh thủ công trong Console** và ghi lại xác nhận có ngày tháng của quản trị viên nhà thờ dưới dạng như vậy; không gắn nhãn là đã xác minh qua API. Các sự kiện đăng ký số tự động có thể là công việc tiếp theo. [Lỗi đăng ký số](https://www.twilio.com/docs/api/errors/30035), [sự kiện đăng ký A2P](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Yêu cầu kiểm tra hiện hành trước khi bật gửi tin; ghi lại thời điểm và cách thức kiểm tra mức độ sẵn sàng, cho hết hạn các kiểm tra đã cũ, và tạm dừng khi thông tin xác thực bị thu hồi, người gửi thay đổi, đăng ký thất bại hoặc tài khoản gặp lỗi dai dẳng. Việc một tin nhắn thử nghiệm được phân phối chỉ xác nhận đường dẫn đã được kiểm tra, không khẳng định sự phê duyệt phổ quát của nhà mạng hay sự đồng ý của người nhận. Bản nháp hướng dẫn đi kèm quy định các kiểm tra vận hành của nhà thờ trước khi nộp hồ sơ, trước khi ra mắt và định kỳ.

## Kế hoạch kho mã và phát hành

[Hướng dẫn đóng góp của tổ chức](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) chỉ định rằng yêu cầu tính năng B1 được gửi đến ChurchAppsSupport và các PR triển khai được gửi đến kho mã phụ trách. Sử dụng một yêu cầu tính năng tập trung và liên kết các PR triển khai có phạm vi rõ ràng với yêu cầu đó:

1. **ChurchAppsSupport:** xem xét thiết kế này và bản nháp hướng dẫn thiết lập trước khi giới thiệu Twilio như một tính năng có sẵn cho người dùng.
2. **Packages:** thêm bộ điều hợp Twilio, cấu hình/giao diện dùng chung rõ ràng, và hiển thị biểu mẫu đồng ý SMS ở những nơi B1Admin/B1App dùng chung. Bao gồm changeset và phát hành qua quy trình phát hành hiện có trước khi cập nhật các thành phần tiêu thụ.
3. **Api:** thêm các migration bổ sung cho metadata tích hợp, đồng ý/chặn gửi và trạng thái gửi; triển khai xác thực cấu hình, các cổng gửi dùng chung, ghi nhận bằng chứng từ biểu mẫu, xử lý webhook và lưu trữ quá trình gửi.
4. **B1Admin:** thêm giao diện cấu hình/mức độ sẵn sàng của Twilio, quản lý chương trình/đồng ý, lưu người gửi có nhận biết nhà cung cấp, và báo cáo phân phối chính xác. Không cung cấp khả năng ghi đè đồng ý SMS qua các chỉnh sửa thông tin người dùng thông thường.
5. **B1App:** xác minh trải nghiệm trang/biểu mẫu công khai và liên kết chính sách so với các điều khiển dùng chung, bao gồm khách truy cập ẩn danh và trên thiết bị di động. Không cần một ứng dụng khách Twilio riêng trên trình duyệt.
6. **ChurchAppsSupport:** sau khi phát hành, biến bản nháp hướng dẫn thiết lập thành các trang cài đặt/trợ giúp được hỗ trợ chính thức, thêm ảnh chụp màn hình thực tế, liên kết từ cài đặt Nhắn tin, và sắp xếp bản dịch.

Triển khai schema và các gói dùng chung trước các thành phần tiêu thụ. Giữ Twilio được kiểm soát bằng tính năng cho một đợt thử nghiệm nhỏ tự nguyện; các nhà cung cấp hiện có phải tiếp tục hoạt động. Khi rollback, tắt việc gửi qua Twilio và hủy các công việc chưa được gửi, đồng thời giữ nguyên các yêu cầu từ chối nhận tin và bằng chứng; không được tự động chuyển người nhận sang nhà cung cấp hoặc người gửi khác.

## Ước tính công sức

Ước tính lập kế hoạch cho một người đóng góp quen thuộc với hệ sinh thái; không sử dụng thông tin xác thực sản xuất hay gửi SMS thực tế trong đánh giá này:

| Công việc | Số ngày phát triển |
|---|---|
| Bộ điều hợp, mở rộng cấu hình/schema, giao diện cài đặt | 2–3 |
| Đồng ý theo số điện thoại/chương trình, chặn gửi độc lập, các cổng gửi dùng chung, tích hợp biểu mẫu công khai | 3–5 |
| Callback có chữ ký, lưu trữ phân phối, điều phối có giới hạn và bền vững | 2–3 |
| Giao diện mức độ sẵn sàng, hướng dẫn nhà thờ, kiểm thử tích hợp và hồi quy, sửa lỗi trong đợt thử nghiệm | 3–4 |
| **Phạm vi ra mắt được khuyến nghị** | **10–15 ngày tổng cộng** |

Một bản thử nghiệm khái niệm (proof of concept) cơ bản cho bộ điều hợp/cài đặt khoảng 1–2 ngày. Ước tính chỉ gửi tin không bao gồm công việc đồng ý và hướng dẫn thiết lập cần thiết cho khuyến nghị này. Thời gian xem xét bên ngoài của Twilio và nhà mạng là riêng biệt và có thể thay đổi; dự án không nên hứa hẹn về ngày phê duyệt hay kết quả phê duyệt.

## Tiêu chí chấp nhận

- [ ] Nhà thờ sở hữu và thanh toán cho tài khoản, dịch vụ, người gửi đã đăng ký và chiến dịch; không yêu cầu tài khoản Twilio do ChurchApps quản lý.
- [ ] Thông tin xác thực được mã hóa/che giấu, giới hạn theo nhà thờ, có thể xoay vòng và không xuất hiện trong nhật ký/nội dung công khai; việc xác thực chỉ đọc.
- [ ] Ô đồng ý tùy chọn không được đánh dấu hiển thị liên kết chính sách thực tế và lưu bằng chứng chương trình/số điện thoại/thông báo ở phía máy chủ; việc từ chối vẫn cho phép hoàn tất hành động chính của biểu mẫu.
- [ ] Tất cả các đường dẫn thủ công, nhóm, trường ghép, quy trình làm việc và nhắc nhở đều áp dụng cùng một cổng kiểm tra đủ điều kiện Twilio. Người nhận chưa rõ, chưa đồng ý, đã đổi số điện thoại hoặc đã bị chặn sẽ bị bỏ qua kèm lý do hữu ích; việc hiển thị vẫn giữ nguyên thông tin nhận diện nhà thờ/hướng dẫn STOP sau khi mở rộng và xử lý độ dài.
- [ ] Quyền riêng tư thư mục cũ không tự động đăng ký người nhận; STOP/START không bao giờ thay đổi khả năng hiển thị trong thư mục hoặc các tùy chọn không liên quan. Các trường hợp số điện thoại dùng chung và liên kết chéo nhà thờ đều được kiểm thử.
- [ ] STOP/START/HELP có chữ ký, chữ ký không hợp lệ, sai tài khoản/dịch vụ, sự kiện trùng lặp, bài nộp biểu mẫu bị phát lại và ánh xạ đồng ý bị giả mạo đều được kiểm thử.
- [ ] Quy mô nhóm/thời gian chờ, giới hạn tốc độ, lỗi một phần, kết quả chưa xác định, xung đột callback và các sự kiện phân phối không theo thứ tự đều được kiểm thử mà không gửi trùng lặp.
- [ ] Phê duyệt chiến dịch và đăng ký số điện thoại đã hoàn tất được tách biệt với xác thực thông tin xác thực. Xác minh thủ công được gắn nhãn rõ ràng; mức độ sẵn sàng đã cũ hoặc bị thu hồi sẽ chặn gửi tin.
- [ ] Một nhà thờ thử nghiệm kiểm tra trang đăng ký, các luồng biểu mẫu đã từ chối và đã chấp nhận, các URL chính sách chính xác, và một người nhận thử nghiệm đã đồng ý qua quá trình gửi, phân phối, chặn bằng STOP và đăng ký lại được cho phép.
- [ ] Cài đặt và hành vi gửi hiện có của Clearstream, Text In Church và Nalo vượt qua kiểm tra hồi quy; nội dung trợ giúp phân biệt rõ đề xuất với tính năng đã phát hành.
