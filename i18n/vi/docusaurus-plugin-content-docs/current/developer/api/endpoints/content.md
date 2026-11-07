---
title: "Điểm cuối Nội dung"
description: "Tài liệu endpoint của Content API ChurchApps: trang web, bài blog, chuyển hướng, bài giảng, sự kiện, tệp, tra cứu Kinh Thánh và bài hát trong B1 Admin."
---

# Điểm cuối Nội dung

<div class="article-intro">

Mô-đun Nội dung quản lý các trang web, phần, thành phần, khối, bài viết blog, chuyển hướng, bài giảng, danh sách phát, dịch vụ phát trực tuyến, sự kiện, lịch được tuyển chọn, tệp, thư viện ảnh, bản dịch Kinh Thánh và tra cứu câu, bài hát, cách phối khí, kiểu chung, ảnh stock và cài đặt. Đây là mô-đun lớn nhất trong API và hỗ trợ CMS, tính năng phương tiện/phát trực tuyến, lập kế hoạch thờ phượng và các tính năng Kinh Thánh trên tất cả ứng dụng ChurchApps.

</div>

**Đường dẫn gốc:** `/content`

## Trang

Đường dẫn gốc: `/content/pages`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/:churchId/tree?url=&id=` | Công khai | — | Tải toàn bộ cây trang (phần, thành phần, khối) theo URL hoặc ID. Loại bỏ ID nội bộ khi lấy theo URL. Các yêu cầu theo URL áp dụng `pages.visibility` — trang bị giới hạn sẽ trả về `{ restricted: true, visibility }` trừ khi JWT (tùy chọn) đáp ứng điều kiện giới hạn |
| GET | `/public/:churchId` | Công khai | — | Liệt kê các trang công khai (`url`, `title`, `metaDescription`); chỉ lấy `visibility = everyone` |
| GET | `/:id` | JWT | — | Lấy một trang theo ID |
| GET | `/` | JWT | — | Liệt kê tất cả trang của nhà thờ |
| POST | `/duplicate/:id` | JWT | Content.Edit | Nhân bản một trang cùng tất cả phần và thành phần |
| POST | `/temp/ai` | JWT | Content.Edit | Lưu trang do AI tạo (trang, phần và thành phần trong một lần gọi) |
| POST | `/importTree` | JWT | Content.Edit | Tạo trang từ cây lồng nhau (`title`, `url`, `sections[].elements[]…`). Luôn chèn dưới nhà thờ của người gọi; các ID trong nội dung yêu cầu bị bỏ qua. Các hàng phải bao gồm các mục con `column`. Tối đa 30 phần / 500 thành phần |
| POST | `/` | JWT | Content.Edit | Tạo hoặc cập nhật trang (theo lô) |
| DELETE | `/:id` | JWT | Content.Edit | Xóa một trang |

### Ví dụ: Tải cây trang

```
GET /content/pages/abc-church-id/tree?url=/about
```

```json
{
  "name": "About",
  "url": "/about",
  "sections": [
    {
      "background": "#FFFFFF",
      "textColor": "dark",
      "elements": [
        { "elementType": "textWithPhoto", "answers": { "text": "Welcome" } }
      ]
    }
  ]
}
```

## Phần

Đường dẫn gốc: `/content/sections`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Lấy một phần theo ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Nhân bản một phần hoặc chuyển thành khối có thể tái sử dụng |
| POST | `/` | JWT | Content.Edit | Tạo hoặc cập nhật phần (theo lô). Tự động cập nhật thứ tự sắp xếp |
| DELETE | `/:id` | JWT | Content.Edit | Xóa một phần (tự động cập nhật thứ tự sắp xếp) |

## Thành phần

Đường dẫn gốc: `/content/elements`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Lấy một thành phần theo ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Nhân bản một thành phần cùng tất cả thành phần con |
| POST | `/` | JWT | Content.Edit | Tạo hoặc cập nhật thành phần (theo lô). Tự động quản lý cột của hàng và slide của carousel |
| DELETE | `/:id` | JWT | Content.Edit | Xóa một thành phần |

## Khối

Đường dẫn gốc: `/content/blocks`

Kế thừa CRUD chuẩn (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` từ lớp cơ sở, với quyền Content.Edit cho các thao tác ghi).

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Lấy một khối theo ID |
| GET | `/` | JWT | — | Liệt kê tất cả khối |
| GET | `/:churchId/tree/:id` | Công khai | — | Tải toàn bộ cây khối với các phần và thành phần |
| GET | `/blockType/:blockType` | JWT | — | Tải khối theo loại (ví dụ: footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Công khai | — | Tải cây khối chân trang của một nhà thờ |
| POST | `/` | JWT | Content.Edit | Tạo hoặc cập nhật khối |
| DELETE | `/:id` | JWT | Content.Edit | Xóa một khối |

## Liên kết

Đường dẫn gốc: `/content/links`

Kế thừa CRUD chuẩn (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` từ lớp cơ sở, với quyền Content.Edit cho các thao tác ghi).

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Lấy một liên kết theo ID |
| GET | `/` | JWT | — | Liệt kê tất cả liên kết. Có thể lọc tùy chọn bằng `?category=`. Tự động sắp xếp sau khi lưu |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Tải liên kết được lọc theo khả năng hiển thị (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Công khai | — | Tải liên kết của một nhà thờ theo danh mục (công khai) |
| POST | `/` | JWT | Content.Edit | Tạo hoặc cập nhật liên kết (theo lô). Tự động sắp xếp theo danh mục |
| DELETE | `/:id` | JWT | Content.Edit | Xóa một liên kết |

## Kiểu chung

Đường dẫn gốc: `/content/globalStyles`

Kế thừa CRUD chuẩn (POST `/`, DELETE `/:id` từ lớp cơ sở, với quyền Content.Edit cho các thao tác ghi).

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/church/:churchId` | Công khai | — | Tải kiểu chung của một nhà thờ (trả về giá trị mặc định nếu chưa thiết lập) |
| GET | `/` | JWT | — | Tải kiểu chung của nhà thờ đã xác thực |
| POST | `/` | JWT | Content.Edit | Tạo hoặc cập nhật kiểu chung |
| DELETE | `/:id` | JWT | Content.Edit | Xóa kiểu chung |

## Lịch sử trang

Đường dẫn gốc: `/content/pageHistory`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/page/:pageId` | JWT | Content.Edit | Liệt kê các mục lịch sử của một trang |
| GET | `/block/:blockId` | JWT | Content.Edit | Liệt kê các mục lịch sử của một khối |
| GET | `/:id` | JWT | Content.Edit | Lấy một mục lịch sử theo ID |
| POST | `/` | JWT | Content.Edit | Lưu ảnh chụp trang/khối. Định kỳ dọn dẹp các mục cũ hơn 30 ngày |
| POST | `/restore/:id` | JWT | Content.Edit | Khôi phục trang/khối từ ảnh chụp lịch sử (xóa nội dung hiện tại và tạo lại từ ảnh chụp) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Khôi phục từ một đối tượng ảnh chụp nội tuyến. Nội dung yêu cầu: `{ pageId, blockId, snapshot }` |

## Bài viết (Blog)

Đường dẫn gốc: `/content/posts`

Bài viết blog là các hàng độc lập: `title`, `slug` (duy nhất trong mỗi nhà thờ), `excerpt`, `content` (nội dung markdown), `authorId`, `photoUrl`, `publishDate`, `category` và `tags`. Bài viết được xuất bản khi `publishDate` đã được thiết lập và nằm trong quá khứ. Các điểm cuối đọc sẽ bổ sung `authorName` cho mỗi bài viết, được lấy từ `authorId`. Xem [Kiến trúc Trình xây dựng Website](../../architecture/website-builder.md#blog).

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Công khai | — | Liệt kê các bài viết đã xuất bản, có phân trang (tối đa 50 bài mỗi trang) |
| GET | `/public/:churchId/categories` | Công khai | — | Các danh mục khác nhau trong số bài viết đã xuất bản |
| GET | `/public/:churchId/slug/:slug` | Công khai | — | Lấy một bài viết đã xuất bản theo slug |
| GET | `/rss/:churchId?siteUrl=` | Công khai | — | Nguồn cấp RSS 2.0 của các bài viết đã xuất bản (liên kết được tạo dạng `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Lấy một bài viết theo ID |
| GET | `/` | JWT | — | Liệt kê tất cả bài viết của nhà thờ |
| POST | `/` | JWT | Content.Edit | Tạo hoặc cập nhật bài viết (theo lô) |
| DELETE | `/:id` | JWT | Content.Edit | Xóa một bài viết |

## Chuyển hướng

Đường dẫn gốc: `/content/redirects`

Chuyển hướng URL theo từng nhà thờ (`fromPath` → `toPath`), giới hạn tối đa 200 cho mỗi nhà thờ. Đường dẫn được chuẩn hóa (chữ thường, có dấu gạch chéo đầu, không có dấu gạch chéo cuối) và `fromPath` là duy nhất trong mỗi nhà thờ. B1App xử lý các chuyển hướng này khi gặp lỗi 404 và trả về HTTP 308.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/public/:churchId?path=` | Công khai | — | Phân giải một đường dẫn (hoặc liệt kê tất cả chuyển hướng khi bỏ qua `path`) |
| GET | `/:id` | JWT | — | Lấy một chuyển hướng theo ID |
| GET | `/` | JWT | — | Liệt kê tất cả chuyển hướng của nhà thờ |
| POST | `/` | JWT | Content.Edit | Tạo hoặc cập nhật chuyển hướng. Từ chối `fromPath = toPath` và áp dụng giới hạn 200 hàng |
| DELETE | `/:id` | JWT | Content.Edit | Xóa một chuyển hướng |

## Bài giảng

Đường dẫn gốc: `/content/sermons`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/public/freeshowSample` | JWT | — | Lấy cấu trúc danh sách phát FreeShow mẫu |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Lấy wrapper ứng dụng TV với nguồn bài giảng, bài học và FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Công khai | — | Lấy một bài giảng dưới dạng danh sách phát nguồn TV |
| GET | `/public/tvFeed/:churchId` | Công khai | — | Lấy tất cả danh sách phát/bài giảng công khai dưới dạng nguồn TV |
| GET | `/public/:churchId` | Công khai | — | Liệt kê tất cả bài giảng công khai của một nhà thờ |
| GET | `/timeline?sermonIds=` | JWT | — | Tải dữ liệu dòng thời gian cho các bài giảng |
| GET | `/lookup?videoType=&videoData=` | Công khai | — | Tra cứu siêu dữ liệu bài giảng từ YouTube hoặc Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Tạo gợi ý bài đăng mạng xã hội bằng AI từ phụ đề bài giảng |
| GET | `/outline?url=&title=&author=` | JWT | — | Tạo dàn ý bài học bằng AI từ một URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Nhập video từ kênh YouTube. Các thực thể HTML mà API tìm kiếm của YouTube đưa vào tiêu đề và mô tả (như `&amp;` và `&#39;`) sẽ được giải mã |
| GET | `/vimeoImport/:channelId` | JWT | — | Nhập video từ kênh Vimeo |
| GET | `/:id` | JWT | — | Lấy một bài giảng theo ID |
| GET | `/` | JWT | — | Liệt kê tất cả bài giảng |
| POST | `/` | JWT | StreamingServices.Edit | Tạo hoặc cập nhật bài giảng. Chấp nhận một mảng hoặc một đối tượng bài giảng đơn (luôn trả về mảng); nội dung rỗng trả về 400. Hỗ trợ tải lên ảnh thu nhỏ dạng base64 |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Xóa một bài giảng |

### Ví dụ: Tra cứu bài giảng YouTube

```
GET /content/sermons/lookup?videoType=youtube&videoData=dQw4w9WgXcQ
```

```json
{
  "title": "Sunday Service - Faith in Action",
  "description": "Pastor John speaks about faith...",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
  "duration": 2400,
  "publishDate": "2025-01-15T10:00:00Z"
}
```

## Danh sách phát

Đường dẫn gốc: `/content/playlists`

Kế thừa CRUD chuẩn (GET `/:id`, GET `/`, DELETE `/:id` từ lớp cơ sở, với quyền StreamingServices.Edit cho các thao tác ghi).

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Lấy một danh sách phát theo ID |
| GET | `/` | JWT | — | Liệt kê tất cả danh sách phát |
| GET | `/public/:churchId` | Công khai | — | Liệt kê tất cả danh sách phát công khai của một nhà thờ |
| POST | `/` | JWT | StreamingServices.Edit | Tạo hoặc cập nhật danh sách phát (theo lô, hỗ trợ tải lên ảnh thu nhỏ dạng base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Xóa một danh sách phát |

## Dịch vụ phát trực tuyến

Đường dẫn gốc: `/content/streamingServices`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Lấy ID phòng trò chuyện của người dẫn được mã hóa cho một dịch vụ |
| GET | `/` | JWT | — | Liệt kê tất cả dịch vụ phát trực tuyến. Tự động dọn các dịch vụ không lặp lại đã hết hạn và chuyển các dịch vụ lặp lại sang kỳ tiếp theo |
| POST | `/` | JWT | StreamingServices.Edit | Tạo hoặc cập nhật dịch vụ phát trực tuyến (theo lô) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Xóa một dịch vụ phát trực tuyến (cũng xóa các IP bị chặn) |

## Sự kiện

Đường dẫn gốc: `/content/events`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Tải các sự kiện dòng thời gian của một nhóm (bao gồm ngày ngoại lệ, để có thể bỏ qua các lần xuất hiện đã xóa) |
| GET | `/timeline?eventIds=` | JWT | — | Tải các sự kiện dòng thời gian cho các nhóm của người dùng hiện tại (bao gồm ngày ngoại lệ) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Công khai | — | Đăng ký sự kiện qua nguồn lịch ICS |
| GET | `/group/:groupId` | JWT | — | Lấy các sự kiện của một nhóm (bao gồm ngày ngoại lệ) |
| GET | `/public/group/:churchId/:groupId` | Công khai | — | Lấy các sự kiện công khai của một nhóm |
| GET | `/public/:churchId/:id` | Công khai | — | Lấy một sự kiện cho trang công khai của sự kiện, kèm `roomNames` (các phòng từ những đặt chỗ chưa bị từ chối). Trả về `null` đối với sự kiện đang chờ duyệt hoặc đã bị từ chối, và đối với sự kiện riêng tư không nhận đăng ký |
| GET | `/public/:churchId/:id/ical` | Công khai | — | Tải sự kiện đơn này dưới dạng tệp `.ics` (`text/calendar`, đã áp dụng ngày ngoại lệ). Trả về `404` khi sự kiện bị ẩn theo cùng quy tắc |
| GET | `/:id` | JWT | — | Lấy một sự kiện theo ID |
| POST | `/` | JWT | — | Tạo hoặc cập nhật sự kiện (theo lô) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin, hoặc trưởng nhóm | Xóa một sự kiện và các đặt chỗ của nó. Trưởng nhóm của nhóm sự kiện có thể xóa, và người yêu cầu có thể rút yêu cầu đang chờ của chính mình |

Bản ghi sự kiện bao gồm `photoUrl` (ảnh sự kiện tỉ lệ 16:9 hiển thị trên trang sự kiện công khai và các ô sự kiện sắp diễn ra), `tags` (phân cách bằng dấu phẩy, được thành phần Lịch của website dùng để lọc theo thẻ), và `notesViewRole` / `notesPostRole` (`staff` khi là `null`, `leaders` hoặc `members`), các trường này kiểm soát cuộc trò chuyện `eventNote` của sự kiện. Xem [Kiểm soát quyền truy cập ghi chú nhóm và sự kiện](./messaging.md#group-and-event-notes-access-control). Phản hồi sự kiện công khai theo lịch tuyển chọn cũng mang theo `photoUrl` và `tags` của từng sự kiện.

## Ngoại lệ sự kiện

Đường dẫn gốc: `/content/eventExceptions`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Lấy một ngoại lệ sự kiện theo ID |
| POST | `/` | JWT | Content.Edit, Calendars.Admin, hoặc trưởng nhóm | Tạo hoặc cập nhật ngoại lệ sự kiện (theo lô). Trưởng nhóm chỉ được thêm ngoại lệ cho các sự kiện thuộc nhóm họ dẫn dắt |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin, hoặc trưởng nhóm | Xóa một ngoại lệ sự kiện |

## Lịch được tuyển chọn

Đường dẫn gốc: `/content/curatedCalendars`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Lấy một lịch được tuyển chọn theo ID |
| GET | `/` | JWT | — | Liệt kê tất cả lịch được tuyển chọn |
| POST | `/` | JWT | Content.Edit | Tạo hoặc cập nhật lịch được tuyển chọn (theo lô) |
| DELETE | `/:id` | JWT | Content.Edit | Xóa một lịch được tuyển chọn |

## Sự kiện được tuyển chọn

Đường dẫn gốc: `/content/curatedEvents`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Lấy các sự kiện được tuyển chọn của một lịch (bao gồm chi tiết sự kiện và ngày ngoại lệ, trừ khi có `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Công khai | — | Lấy các sự kiện công khai được tuyển chọn của một lịch |
| GET | `/:id` | JWT | — | Lấy một sự kiện được tuyển chọn theo ID |
| GET | `/` | JWT | — | Liệt kê tất cả sự kiện được tuyển chọn |
| POST | `/` | JWT | Content.Edit | Tạo hoặc cập nhật sự kiện được tuyển chọn. Hỗ trợ mảng `eventIds` để thêm các sự kiện cụ thể của nhóm |
| DELETE | `/:id` | JWT | Content.Edit | Xóa một sự kiện được tuyển chọn |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Gỡ một sự kiện cụ thể khỏi lịch được tuyển chọn |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Gỡ tất cả sự kiện của một nhóm khỏi lịch được tuyển chọn |

## Tệp

Đường dẫn gốc: `/content/files`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/:contentType/:contentId` | JWT | — | Lấy tệp theo loại nội dung và ID nội dung |
| GET | `/` | JWT | — | Liệt kê tất cả tệp của website nhà thờ |
| GET | `/:id` | JWT | — | Lấy một tệp theo ID |
| POST | `/` | JWT | Content.Edit* | Tải lên tệp (base64). *Cũng được phép nếu người dùng là thành viên của nhóm khớp với `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Lấy URL tải lên S3 được ký trước. *Cũng được phép đối với thành viên nhóm. Tối đa 100MB cho mỗi mục nội dung |
| DELETE | `/:id` | JWT | Content.Edit* | Xóa một tệp và gỡ khỏi bộ nhớ. *Cũng được phép đối với thành viên nhóm |

## Thư viện ảnh

Đường dẫn gốc: `/content/gallery`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/stock/:folder` | Công khai | — | Liệt kê ảnh stock trong một thư mục |
| GET | `/:folder` | JWT | Content.Edit | Liệt kê ảnh trong thư viện thuộc một thư mục |
| POST | `/requestUpload` | JWT | Content.Edit | Lấy URL tải lên S3 được ký trước cho ảnh thư viện |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Xóa một ảnh thư viện |

## Kinh Thánh

Đường dẫn gốc: `/content/bibles`

Tất cả điểm cuối Kinh Thánh đều công khai (không yêu cầu xác thực). Dữ liệu được lấy từ nguồn bên ngoài và lưu đệm cục bộ. Các yêu cầu tới api.bible hết thời gian chờ sau 15 giây; khi hết thời gian chờ sẽ trả về **504**.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/` | Công khai | — | Liệt kê tất cả bản dịch Kinh Thánh (lấy từ nguồn nếu bộ nhớ đệm trống) |
| GET | `/stats?startDate=&endDate=` | Công khai | — | Lấy thống kê tra cứu Kinh Thánh trong một khoảng thời gian |
| GET | `/availableTranslations/:source` | Công khai | — | Liệt kê các bản dịch có sẵn từ một nguồn (ví dụ: api.bible) |
| GET | `/updateTranslations` | Công khai | — | Đồng bộ tất cả bản dịch từ mọi nguồn |
| GET | `/updateTranslations/:source` | Công khai | — | Đồng bộ bản dịch từ một nguồn cụ thể |
| GET | `/updateCopyrights` | Công khai | — | Cập nhật thông tin bản quyền cho các bản dịch còn thiếu |
| GET | `/:translationKey/updateCopyright` | Công khai | — | Cập nhật bản quyền cho một bản dịch cụ thể |
| GET | `/:translationKey/search?query=&limit=` | Công khai | — | Tìm kiếm câu trong một bản dịch |
| GET | `/:translationKey/books` | Công khai | — | Lấy danh sách sách của một bản dịch (lưu đệm cục bộ) |
| GET | `/:translationKey/:bookKey/chapters` | Công khai | — | Lấy danh sách chương của một sách (lưu đệm cục bộ) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Công khai | — | Lấy danh sách câu của một chương (lưu đệm cục bộ) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Công khai | — | Lấy nội dung câu trong một khoảng. Ghi nhật ký các lần tra cứu. Một số bản dịch bỏ qua bộ nhớ đệm vì lý do bản quyền |

### Ví dụ: Lấy nội dung câu

```
GET /content/bibles/de4e12af7f28f599-02/verses/GEN.1.1-GEN.1.3
```

```json
[
  { "verseKey": "GEN.1.1", "content": "In the beginning God created the heavens and the earth.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 1 },
  { "verseKey": "GEN.1.2", "content": "Now the earth was formless and empty...", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 2 },
  { "verseKey": "GEN.1.3", "content": "And God said, \"Let there be light,\" and there was light.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 3 }
]
```

## Bài hát

Đường dẫn gốc: `/content/songs`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/search?q=` | JWT | — | Tìm bài hát theo truy vấn |
| GET | `/:id` | JWT | — | Lấy một bài hát theo ID |
| GET | `/` | JWT | Content.Edit | Liệt kê tất cả bài hát |
| POST | `/` | JWT | Content.Edit | Tạo hoặc cập nhật bài hát (theo lô) |
| POST | `/import` | JWT | — | Nhập bài hát từ FreeShow (theo lô) |
| DELETE | `/:id` | JWT | Content.Edit | Xóa một bài hát |

## Chi tiết bài hát

Đường dẫn gốc: `/content/songDetails`

Chi tiết bài hát mang tính toàn cục (không giới hạn theo nhà thờ). Chúng đại diện cho siêu dữ liệu bài hát chuẩn được chia sẻ giữa các nhà thờ.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Lấy chi tiết bài hát theo ID (toàn cục) |
| GET | `/` | JWT | — | Liệt kê chi tiết bài hát của nhà thờ |
| POST | `/create` | JWT | — | Tạo chi tiết bài hát từ ID PraiseCharts (trả về bản đã có nếu đã tạo). Tự động lấy siêu dữ liệu từ PraiseCharts và MusicBrainz |
| POST | `/` | JWT | — | Tạo hoặc cập nhật chi tiết bài hát (theo lô) |

## Liên kết chi tiết bài hát

Đường dẫn gốc: `/content/songDetailLinks`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Lấy một liên kết chi tiết bài hát theo ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Lấy tất cả liên kết của một chi tiết bài hát |
| POST | `/` | JWT | — | Tạo hoặc cập nhật liên kết chi tiết bài hát (theo lô). Tự động lấy dữ liệu MusicBrainz nếu có liên kết |
| DELETE | `/:id` | JWT | — | Xóa một liên kết chi tiết bài hát |

## Cách phối khí

Đường dẫn gốc: `/content/arrangements`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Lấy một cách phối khí theo ID |
| GET | `/song/:songId` | JWT | Content.Edit | Lấy các cách phối khí của một bài hát |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Lấy các cách phối khí của một chi tiết bài hát |
| GET | `/` | JWT | Content.Edit | Liệt kê tất cả cách phối khí |
| POST | `/` | JWT | Content.Edit | Tạo hoặc cập nhật cách phối khí (theo lô) |
| POST | `/freeShow/missing` | JWT | — | Tìm các ID FreeShow không tồn tại trong nhà thờ. Nội dung yêu cầu: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Xóa một cách phối khí (cũng xóa các khóa; xóa bài hát nếu không còn cách phối khí nào) |

## Khóa cách phối khí

Đường dẫn gốc: `/content/arrangementKeys`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/presenter/:churchId/:id` | Công khai | — | Lấy khóa cách phối khí kèm dữ liệu bài hát đầy đủ cho chế độ trình chiếu |
| GET | `/:id` | JWT | — | Lấy một khóa cách phối khí theo ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Lấy các khóa của một cách phối khí |
| GET | `/` | JWT | Content.Edit | Liệt kê tất cả khóa cách phối khí |
| POST | `/` | JWT | Content.Edit | Tạo hoặc cập nhật khóa cách phối khí (theo lô) |
| DELETE | `/:id` | JWT | Content.Edit | Xóa một khóa cách phối khí |

## Cài đặt

Đường dẫn gốc: `/content/settings`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | Lấy cài đặt của người dùng hiện tại |
| GET | `/` | JWT | Settings.Edit | Lấy tất cả cài đặt của nhà thờ |
| GET | `/public/:churchId` | Công khai | — | Lấy cài đặt công khai của một nhà thờ (trả về dạng cặp khóa-giá trị) |
| POST | `/my` | JWT | — | Lưu cài đặt cấp người dùng (hỗ trợ tải lên ảnh dạng base64) |
| POST | `/` | JWT | Settings.Edit | Lưu cài đặt cấp nhà thờ (hỗ trợ tải lên ảnh dạng base64) |
| DELETE | `/my/:id` | JWT | — | Xóa một cài đặt của người dùng |

## Xem trước

Đường dẫn gốc: `/content/preview`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/data/:key` | Công khai | — | Tải dữ liệu xem trước phát trực tuyến của một nhà thờ theo khóa tên miền phụ (tab, liên kết, dịch vụ, bài giảng) |

## Thư viện ảnh (Ảnh stock)

Đường dẫn gốc: `/content/stock`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| POST | `/search` | Công khai | — | Tìm ảnh stock trên Pexels. Nội dung yêu cầu: `{ term: "church" }` |

## PraiseCharts

Đường dẫn gốc: `/content/praiseCharts`

Tích hợp với PraiseCharts để khám phá bài hát thờ phượng và tải bản nhạc.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| GET | `/raw/:id` | JWT | — | Lấy dữ liệu PraiseCharts thô của một bài hát |
| GET | `/hasAccount` | JWT | — | Kiểm tra xem người dùng đã liên kết tài khoản PraiseCharts hay chưa |
| GET | `/search?q=` | JWT | — | Tìm kiếm trong danh mục PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Lấy các sản phẩm cho một bài hát (từ thư viện nếu đã xác thực, nếu không thì từ danh mục) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Lấy dữ liệu cách phối khí thô từ thư viện |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Tải một tệp từ PraiseCharts (PDF hoặc ZIP). Trả về `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Công khai | — | Lấy URL ủy quyền OAuth cho PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Đổi mã xác minh OAuth lấy mã truy cập và lưu vào cài đặt người dùng |
| GET | `/library` | JWT | — | Duyệt thư viện PraiseCharts của người dùng |

## Hỗ trợ

Đường dẫn gốc: `/content/support`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------|------|
| POST | `/createAudio` | Công khai | — | Chuyển đổi SSML thành âm thanh MP3 bằng AWS Polly. Nội dung yêu cầu: `{ ssml: "<speak>...</speak>" }` |

## Trang liên quan

- [Kiến trúc Trình xây dựng Website](../../architecture/website-builder.md) -- Cách các trang, phần, thành phần, bài viết và chuyển hướng kết nối với nhau trên các ứng dụng
- [Điểm cuối Thành viên](./membership.md) -- Người, nhà thờ, nhóm, vai trò, quyền
- [Điểm cuối Điểm danh](./attendance.md) -- Theo dõi buổi nhóm và lượt viếng thăm
- [Xác thực & Quyền](./authentication.md) -- Luồng đăng nhập, JWT, mô hình quyền
- [Cấu trúc Mô-đun](../module-structure.md) -- Các mẫu tổ chức mã nguồn
