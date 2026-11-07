---
title: "Kiến trúc Trình xây dựng Website"
description: "Sơ đồ cho trình tạo trang web B1: cây nội dung, danh mục phần tử chung, quy trình hiển thị và tạo trang bằng AI trong B1 Admin và B1.church."
---

# Kiến trúc Trình xây dựng Website

<div class="article-intro">

Mọi trang web của nhà thờ do B1App phục vụ đều được hiển thị từ một cây nội dung gồm trang, section và phần tử (element), được lưu trong ContentApi và chỉnh sửa trực quan trong B1Admin. Một thư viện thành phần dùng chung render cả bản xem trước trong trình chỉnh sửa lẫn trang công khai, một danh mục loại phần tử xác định những gì có thể xuất hiện trên trang, và một dịch vụ AI riêng biệt có thể tạo hoặc viết lại cây nội dung đó. Trang này mô tả toàn bộ ngăn xếp: hợp đồng phần tử trong `@churchapps/helpers`, pipeline render, các phần tử dữ liệu nhà thờ, widget toàn site, lớp blog, các trang có giới hạn truy cập, SEO, tạo nội dung bằng AI và biểu mẫu hội thoại.

</div>

## Tổng quan

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — /content module (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        shared render pipeline                   ▼            (anon, JWT honored)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — public site (Next.js)  │
               │    ElementTypes.ts (catalog)  │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, renderers │   │    redirects, branded 404       │
               │    SectionDivider, widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ church-data elements
┌──────────────────────────────┐                                   ▼
│  AskApi — /website/* (AI)    │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  /giving/funds/public/…/total           │
│  generateAltText · metaDesc  │             │  /membership/groupmembers/public/…      │
│  returns JSON; B1Admin saves │             │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

Ba quy tắc áp dụng xuyên suốt ngăn xếp:

1. **Một cây, hai bộ render.** Mỗi trang là một cây `pages → sections → elements`, trong đó mỗi nút lưu cài đặt của nó dưới dạng một khối JSON `answers`. Cùng các thành phần apphelper render cả trình chỉnh sửa kéo-thả trong B1Admin lẫn trang công khai được render phía máy chủ trong B1App. Không tồn tại "định dạng xuất bản" riêng biệt.
2. **Hợp đồng nằm trong `@churchapps/helpers`.** `ElementTypes.ts` là danh mục duy nhất của các loại phần tử; bộ render được phân giải qua một registry trong apphelper; biểu mẫu chỉnh sửa nằm trong B1Admin. Thêm một loại phần tử nghĩa là phải chỉnh sửa cả ba nơi, theo đúng thứ tự đó.
3. **Trang công khai đọc các endpoint ẩn danh.** Mọi thứ B1App cần, gồm cây trang, cài đặt, bài blog, chuyển hướng, và các endpoint dữ liệu nhà thờ trong các module khác, đều công khai. Xác thực là tùy chọn: một JWT gửi kèm yêu cầu tới endpoint cây ẩn danh sẽ mở khóa các trang chỉ dành cho thành viên, còn lại không có gì thay đổi.

## Cây nội dung

Module content (`Api/src/modules/content`) quản lý dữ liệu của trình xây dựng:

| Bảng | Vai trò |
|------|---------|
| `pages` | Một trang cho mỗi URL: `url`, `title`, `layout`, cùng `visibility`/`groupIds` (giới hạn truy cập) và `metaDescription` (SEO) |
| `sections` | Các dải ngang trên trang (hoặc trong một khối): nền, màu chữ, và `answersJSON` chứa kiểu dáng cùng cấu hình đường phân chia hình dạng `dividerTop`/`dividerBottom` |
| `elements` | Các phần nội dung bên trong một section: `elementType` + `answersJSON`, có thể lồng nhau đối với các loại bố cục (hàng/cột, carousel) |
| `blocks` | Các nhóm section/phần tử có thể tái sử dụng (khối chân trang, khối phần tử) dùng chung giữa nhiều trang |
| `posts` | Bài blog độc lập (xem [Blog](#blog)) |
| `redirects` | Cặp `fromPath → toPath` theo từng nhà thờ, giới hạn 200 cặp (xem [SEO](#seo-and-discoverability)) |
| `settings` | Cài đặt nhà thờ dạng khóa-giá trị; các dòng được đánh dấu `public` được phục vụ ẩn danh và chứa cấu hình widget/phân tích |

Toàn bộ cây của một URL được trả về qua một lệnh gọi ẩn danh duy nhất: `GET /content/pages/:churchId/tree?url=/about`. Đây là dữ liệu mà B1App dùng để render phía máy chủ. Các yêu cầu từ trình chỉnh sửa thì lấy theo id và giữ nguyên các id nội bộ.

## Hợp đồng phần tử

### Danh mục (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` định nghĩa mọi loại phần tử dưới dạng một `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, và `answersSchema` theo kiểu JSON schema cho các câu trả lời của nó. `validateElementAnswers()` được thiết kế có chủ đích theo hướng khoan dung: loại không xác định và khóa thừa đều được chấp nhận, nên nội dung cũ không bị hỏng khi nâng cấp danh mục. **Hiện có 35 loại:**

| Danh mục | Loại phần tử |
|----------|--------------|
| bố cục (6) | row, column, box, carousel, whiteSpace, block |
| nội dung (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| đa phương tiện (4) | image, gallery, video, map |
| nhà thờ (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| nâng cao (2) | rawHTML, iframe |

Phần tử `sermons` là phần tử có nhiều cấu hình nhất trong nhóm loại dành cho nhà thờ: câu trả lời `layout` chọn một trong các kiểu `browse` (trình duyệt đầy đủ kiểu cũ), `grid`, `list` hoặc `featuredLatest`; các khóa `playlistId`, `itemCount`, `showTitles` và `showDates` tinh chỉnh các bố cục không phải `browse`.

Phần tử `rawHTML` có hai câu trả lời: `rawHTML` (mã đánh dấu) và `javascript`. Các script được chèn qua `innerHTML` sẽ không bao giờ thực thi, nên `RawHTMLElement` tạo lại mọi nút `<script>` trong mã đánh dấu thành một phần tử mới. Những nút không do parser chèn vào này được tin cậy theo `strict-dynamic` của CSP. Câu trả lời `javascript` bắt đầu bằng `<` (một đoạn mã của nhà cung cấp được dán kèm thẻ `<script>`) sẽ được phân tích như mã đánh dấu và được xử lý theo cùng cách. Ngược lại, nó chạy như một script inline thông thường. B1Admin sẽ cảnh báo khi có một URL trần trong ô JavaScript, vì một URL đơn lẻ chạy như một script không làm gì cả. Phần tử `map` không render gì và không tải script Google Maps khi chưa cấu hình khóa API Maps.

### Bộ render (`@churchapps/apphelper`)

Các bộ render nằm trong `Packages/apphelper/src/website/components/elementTypes/`, mỗi loại một component, được phân giải qua `ElementRegistry.ts`. Đây là một bản đồ hai lớp: `Element.tsx` đăng ký bộ render mặc định cho cả 35 loại (`registerDefaultElementRenderer`), và một ứng dụng chủ có thể ghi đè bất kỳ loại nào trong lúc chạy (`registerElementRenderer`) mà không cần fork gói.

### Biểu mẫu chỉnh sửa (B1Admin)

Các biểu mẫu cài đặt theo từng loại của trình chỉnh sửa nằm trong `B1Admin/src/site/admin/elements/`. `ElementEdit.tsx` chuyển tiếp đến một component riêng (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) hoặc một bộ xây dựng trường nội tuyến cho từng loại. Bản phản chiếu danh mục hướng tới AI là công cụ `describe_page_builder` của MCP trong API (xem [MCP Server](../api/mcp.md)).

Bản xem trước của trình chỉnh sửa gắn cùng một `Theme` với trang công khai, và theme này đặt các biến CSS `--headingFont` / `--bodyFont` từ kiểu dáng toàn cục của nhà thờ. B1App áp dụng các biến này qua `pages.css`, còn B1Admin không thể import file đó, nên `ContentEditor.tsx` chèn `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) để áp dụng chúng cho chữ nội dung `.page` và `h1`–`h6`. Nếu không có bước này, bản xem trước sẽ hiển thị tiêu đề bằng phông chữ của trang quản trị.

### Đường phân chia hình dạng của section

Section có thể mang các đường phân chia hình dạng trang trí ở một trong hai cạnh. Cấu hình nằm trong `answersJSON` của section dưới dạng các đối tượng `dividerTop` / `dividerBottom`: `{ shape, color, height, flip }`, với `shape` là một trong các giá trị `wave, waves, slant, curve, triangle, peaks`. Apphelper cung cấp component `SectionDivider` và hàm trợ giúp `parseDividerConfig()`. Bộ render Section của cả hai ứng dụng (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) đều phân tích câu trả lời và gắn đường phân chia vào, còn `SectionEdit.tsx` trong B1Admin cung cấp giao diện chọn. Các gói chỉ cung cấp khối xây dựng; việc kết nối ở cấp section là trách nhiệm của các ứng dụng sử dụng.

## Các phần tử dữ liệu nhà thờ

Ba loại phần tử render dữ liệu nhà thờ trực tiếp thay vì nội dung do người dùng soạn. Cách ly module vẫn được áp dụng: mỗi phần tử gọi endpoint công khai của chính module sở hữu nó từ trình duyệt.

| Phần tử | Endpoint | Ghi chú |
|---------|----------|---------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Trả về `{ fundId, totalAmount, donationCount }`, có thể thêm khoảng thời gian `?startDate=&endDate=`; phần tử so sánh kết quả với câu trả lời `goalAmount` của nó |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Chỉ bật khi chủ động chọn**: nhóm phải có `publicRoster` được đặt (mặc định là tắt). Phần dữ liệu trả về được thiết kế tối giản có chủ đích: `personId`, `displayName`, `leader`, ảnh, không có trường liên hệ hay nhân khẩu học |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Trả về cây chi nhánh → buổi nhóm → thời gian; bộ render apphelper tạo JSON-LD `Event` schema.org ở mức nỗ lực tốt nhất từ dữ liệu này (API chỉ trả về dữ liệu thuần) |

:::warning
`publicRoster` là cổng bảo vệ quyền riêng tư cho `staffGrid`. Không bao giờ mở rộng phần dữ liệu công khai của thành viên nhóm hoặc bỏ qua cờ này. Endpoint danh sách được thiết kế để ẩn danh, và danh sách trường tối giản chính là đặc tính an toàn.
:::

### Phần tử lịch và trang sự kiện

Các câu trả lời của phần tử `calendar` gồm `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, mặc định, hoặc `upcoming`) và `tag`. B1App ghi đè bộ render apphelper trong `src/components/Element.tsx` bằng `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** render `UpcomingEventsElement` của B1App: nó tải `GET /content/events/public/group/:churchId/:groupId` hoặc `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, mở rộng các lặp lại bằng `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, mỗi sự kiện một lần xuất hiện trong vòng một năm), và hiển thị 12 mục đầu tiên dưới dạng ô có ảnh (`events.photoUrl`, nếu không có thì dùng tiêu đề trên màu tối của theme), liên kết tới `/events/{id}`, kèm một menu Subscribe để đăng ký nguồn ICS của lịch.
- **`display: "month"`** render `CalendarElement` của apphelper với callback `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` khi nhấp sẽ chuyển hướng tới URL đó thay vì mở hộp thoại chi tiết (B1Admin không truyền `eventUrl`, nên lịch quản trị vẫn giữ hộp thoại).
- **`tag`** lọc cả hai kiểu hiển thị bằng `EventHelper.hasTag()` (`@churchapps/helpers`): so khớp không phân biệt hoa thường với `events.tags` được ngăn cách bằng dấu phẩy; nếu để trống thì hiển thị tất cả. Phép nối lịch được tuyển chọn có chọn `e.tags` để các sự kiện được tuyển chọn cũng mang thẻ này.

Các sự kiện được tuyển chọn liên kết theo `realEventId` (`eventPageId()`), nên URL luôn nêu đúng sự kiện gốc. `/{sdSlug}/events/[eventId]` là một route riêng (không thuộc pipeline builder): nó tải `GET /content/events/public/:churchId/:id`, endpoint này trả về `null` đối với sự kiện đang chờ hoặc bị từ chối, và đối với sự kiện riêng tư không có đăng ký; đồng thời bổ sung `roomNames` từ các lượt đặt phòng chưa bị từ chối. Trang render `EventPageContent` (ảnh tiêu đề lớn, mô tả markdown, khung bên về Thời gian/Địa điểm, nút **Register for this Event** khi `registrationEnabled` bật, và liên kết **Add to my calendar** tới `GET /content/events/public/:churchId/:id/ical`). Trang dùng ảnh sự kiện làm ảnh Open Graph và phát JSON-LD `Event` cho lần xuất hiện kế tiếp qua `EventPageJsonLd`. Sự kiện không tồn tại hoặc đã ẩn sẽ trả về lỗi 404 thực sự.

## Widget toàn site

Hai widget được render trên mọi trang công khai thay vì nằm trong cây nội dung: **AnnouncementBanner** (thanh thông báo đầu trang có thể đóng) và **Launcher** (trung tâm hành động nổi cho các liên kết kiểu cho đi/đến thăm/xem). Cả hai component cùng các hàm `parse*Config()` đều nằm trong apphelper. Cấu hình gồm hai dòng cài đặt công khai với khóa `announcementBanner` và `launcher`, được ghi bởi `SiteWidgetsEdit` của B1Admin (trên trang Appearance) và được đọc bởi layout công khai của B1App qua `GET /content/settings/public/:churchId`. API coi các mục này là cặp khóa-giá trị không cần diễn giải; tên khóa là một quy ước giữa hai ứng dụng.

## Blog

Blog là một loại nội dung độc lập, không phải là một lớp chồng lên các trang builder. Một dòng `posts` lưu toàn bộ bài viết: `title`, `slug`, `excerpt`, `content` (phần thân markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Bề mặt công khai (tất cả đều ẩn danh, `PostController`):

| Route | Mục đích |
|-------|----------|
| `GET /content/posts/public/:churchId` | Các bài đã xuất bản, có thể lọc theo `?category=&tag=`, có phân trang |
| `GET /content/posts/public/:churchId/categories` | Các danh mục khác nhau trong số bài đã xuất bản |
| `GET /content/posts/public/:churchId/slug/:slug` | Một bài đã xuất bản |
| `GET /content/posts/rss/:churchId?siteUrl=` | Nguồn cấp RSS 2.0, tiêu đề mang tên nhà thờ, với danh mục cho từng mục và mô tả là phần tóm tắt hoặc nội dung |

Một bài được coi là "đã xuất bản" khi `publishDate` đã được đặt và đã qua; nếu `publishDate` ở tương lai thì đó là bài đã lên lịch (ẩn với công chúng, hiển thị với nhãn Scheduled trong trang quản trị). Các endpoint đọc bổ sung cho mỗi bài `authorName`, được phân giải từ `authorId` thông qua gateway của module membership. Nếu thiếu phần tóm tắt, các thẻ danh sách, thẻ meta description và RSS sẽ dùng nội dung đã bỏ markdown (khoảng 160 ký tự). B1App phục vụ `/{sdSlug}/blog`, một trang danh sách mang phong cách biên tập (phần đầu căn giữa, khi đang lọc sẽ hiển thị tên danh mục/thẻ đang hoạt động; hàng lọc là các chip danh mục; các dòng bài viết có ảnh nhỏ bên trái cùng tên tác giả và phần tóm tắt), với nguồn RSS được quảng bá như một liên kết thay thế. Trang `/{sdSlug}/blog/[postSlug]` là một route riêng (không thuộc pipeline Zone/Section), có phần đầu căn giữa (nhãn danh mục, tiêu đề, tên tác giả, vạch nhấn màu chính), ảnh tiêu đề tỉ lệ 16:9 theo chiều rộng container, phần thân markdown trong một cột đọc khoảng 720px, các chip thẻ ở chân bài viết, dải "Thêm trong `{category}`" gồm các bài liên quan, và JSON-LD `BlogPosting` bao gồm tác giả. Cả hai trang đều tạo kiểu hoàn toàn từ token của theme nên kế thừa bảng màu của từng nhà thờ. Các URL blog được đưa vào sitemap của từng nhà thờ. Giao diện soạn thảo của B1Admin (**Site → Blog**) chỉnh sửa bài viết trong một hộp thoại: trình soạn markdown có nút chuyển sang xem trước, bộ chọn ảnh thư viện cắt 16:9, bộ chọn tác giả (mặc định là người đang chỉnh sửa), gợi ý danh mục tự động dựa trên các danh mục đã có, kiểm tra trùng slug, và công tắc xuất bản; các dòng đã xuất bản có liên kết đến bài trực tiếp, và trang sẽ nhắc quản trị viên thêm liên kết điều hướng `/blog`. Phần bình luận được giao cho các dịch vụ bên thứ ba: một cài đặt nội dung công khai trên toàn nhà thờ là `blogFooterHtml` (được chỉnh sửa trong **Below Every Post** trên trang Blog, chỉ hiển thị khi bật Settings→Edit) được render dưới mọi bài viết bởi `BlogFooterEmbed` của B1App. Thành phần này tạo lại các thẻ `<script>` để chúng thực thi dưới `'strict-dynamic'` và chạy theo thứ tự (một `src` bên ngoài tải xong trước khi script inline kế tiếp chạy), vì các đoạn mã của nhà cung cấp thường tải một thư viện rồi gọi nó.

## Trang chỉ dành cho thành viên

`pages.visibility` dùng lại enum của các liên kết điều hướng: `everyone` (mặc định), `visitors`, `members`, `staff`, `team`, `groups` (kèm `groupIds`). Tuy nhiên, đây là một **cổng truy cập cứng**, không phải bộ lọc điều hướng (`PageVisibilityHelper.canViewPage`). Luồng xử lý như sau:

1. Endpoint cây ẩn danh kiểm tra quyền hiển thị đối với các lượt lấy theo URL. Người gọi ẩn danh vào một trang bị giới hạn sẽ nhận `{ restricted: true, visibility }` thay vì nội dung, nên cây không bao giờ làm lộ nội dung.
2. Endpoint vẫn tôn trọng JWT: `CustomAuthProvider` xác minh header `Authorization` trên *mọi* yêu cầu, kể cả các route ẩn danh, nên việc một thành viên đã đăng nhập lấy cùng URL sẽ được xử lý bình thường.
3. Khi nhận phản hồi `restricted`, B1App render `RestrictedPage`: nó khôi phục phiên từ thông tin xác thực đã lưu, tải lại cây kèm JWT rồi render; nếu không có phiên, nó hiển thị cổng đăng nhập kèm `returnUrl`.

:::info
Mức độ chi tiết của cổng thay đổi theo từng cấp: `groups` kiểm tra `groupIds` trong token với danh sách của trang, và `staff` kiểm tra `membershipStatus`; còn `members` và `team` hiện chỉ cần bất kỳ người dùng đã xác thực nào của nhà thờ. Hãy xem `groups` là lựa chọn nghiêm ngặt nhất.
:::

## SEO và khả năng khám phá

Tất cả những điều này là việc render phía B1App trên dữ liệu ContentApi. API lưu trữ, còn ứng dụng phát ra:

| Nội dung | Cách hoạt động |
|----------|----------------|
| Meta description | `pages.metaDescription` (tối đa 300 ký tự) được chuyển qua `MetaHelper.getMetaData()` vào `Metadata` của Next.js (description + Open Graph) trên mọi route do builder render. Phần cài đặt trang của B1Admin có nút AI "Generate" (xem bên dưới) |
| Chuyển hướng | Các dòng `redirects` theo nhà thờ được quản lý tại `/content/redirects` (`content.edit`, giới hạn 200 dòng, đường dẫn đã chuẩn hóa). Khi sắp trả về 404, route trang của B1App sẽ đối chiếu đường dẫn với `GET /content/redirects/public/:churchId` và trả về HTTP 308 qua `permanentRedirect` của Next; đường dẫn không khớp sẽ chuyển tiếp tới `notFound()` |
| Trang 404 có thương hiệu | `not-found.tsx` render `BrandedNotFound` với logo, tên và theme của nhà thờ thay vì một thông báo lỗi chung chung. Các đường dẫn không tồn tại như `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` và `/volunteer/[planId]` trả về 404 thực sự, cũng như các subdomain không tồn tại và slug trang sai định dạng (xem [Website Routing & Multi-Site](./websites.md)) |
| Dữ liệu có cấu trúc | JSON-LD `BlogPosting` cho bài blog; `VideoObject` trên trang từng bài giảng (`/{sdSlug}/sermons/[sermonId]`) và trên các trang có phần tử `sermons`; `Event` từ các phần tử lịch/sự kiện trên trang builder và trên mỗi trang `/{sdSlug}/events/[eventId]` (lần xuất hiện kế tiếp, với ảnh sự kiện làm `image`); schema.org `Event` từ phần tử `serviceTimes` |
| Trang bài giảng | Mọi bài giảng công khai đều có một trang có thể được crawler lập chỉ mục tại `/sermons/[sermonId]` với đầy đủ metadata. Bài giảng không còn bị khóa bên trong trình duyệt phía client |
| Phân tích | Khóa cài đặt công khai `ga4MeasurementId` (được quản lý cùng chỗ với chuyển hướng trong B1Admin) chèn một gtag GA4 riêng cho từng nhà thờ qua `next/script`. Ứng dụng B1 (`/{sdSlug}/mobile`) cũng gửi lượt xem trang tới ID này, bên cạnh thẻ của chính ChurchApps, khi ID có dạng `G-` hợp lệ (các ID container GTM chỉ dành cho website). Mỗi `gtag('config')` mang `display_mode` là `installed` hoặc `browser`, dựa trên `navigator.standalone` hoặc truy vấn media `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap và nguồn cấp | Route `sitemap.xml` của từng nhà thờ bao gồm các trang builder, URL blog và 50 trang bài giảng mới nhất (có `<lastmod>` lấy từ ngày xuất bản của bài giảng). Nó cũng liệt kê các trang tích hợp sẵn `/sermons`, `/groups` và `/volunteer` khi chúng có nội dung (nhóm công khai, kế hoạch đăng ký), trừ khi một chuyển hướng đã lưu thay thế đường dẫn đó. `/` bị loại khi nhà thờ chưa có trang chủ, vì khi đó `/` sẽ chuyển hướng tới `/mobile` vốn không được phép. Trang danh sách blog quảng bá nguồn RSS |
| Khả năng tiếp cận | Phần khung công khai render một liên kết bỏ qua nội dung trỏ tới mốc `<main id="main-content">` trong mọi wrapper layout |

## Tạo nội dung bằng AI (AskApi)

Việc tạo trang và toàn bộ site chạy trong **AskApi**, một dịch vụ riêng biệt, dưới controller `/website`. Dịch vụ này xác thực bằng cùng JWT `CustomAuthProvider` như mọi thứ khác và **không lưu trạng thái đối với nội dung**: mọi endpoint đều trả về JSON, và bên gọi (B1Admin) là bên lưu kết quả qua ContentApi (`POST /content/pages/importTree` tạo một trang kèm toàn bộ cây section/phần tử lồng nhau trong một lần gọi; endpoint này luôn chèn dưới nhà thờ của người gọi và bỏ qua các id trong phần thân yêu cầu).

### Tạo trang (`planPage` → `writePage`)

Mẫu trang "AI" trong `AddPageModal` của B1Admin dùng một pipeline chi phí thấp (`AskApi/src/helpers/SiteGenHelper.ts`), dựa trên một quy tắc: **không mô hình nào xuất ra JSON của builder**. Hai mô hình chia nhau công việc qua Vercel AI Gateway (HTTP thuần, khóa SSM `/{env}/aiGatewayApiKey` hoặc `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) là mô hình ra quyết định có kiểu, trả về các lựa chọn, điểm số và giá trị logic kèm xác suất, nhưng không thể viết văn bản. Nó chọn từng section theo thứ tự từ một thư viện mẫu cố định, chấm điểm bố cục, kiểm tra thông tin trong nội dung, và chọn ảnh stock cùng biểu tượng. Chi phí đầu vào khoảng 0,04 USD cho mỗi triệu token và đầu ra miễn phí, nên khoảng 90 lệnh gọi cho một trang chỉ tốn một phần nhỏ của một xu.
- **Một mô hình chat nhỏ (GPT-4.1 mini theo mặc định)** điền các ô văn bản đã đặt tên, có giới hạn độ dài, của các mẫu đã chọn. Bộ viết là một hằng số duy nhất, có thể ghi đè bằng biến môi trường `SITEGEN_COPY_MODEL` (bất kỳ ID mô hình chat nào trên gateway, ví dụ `anthropic/claude-haiku-4.5`). Trong một thử nghiệm đối chiếu mù trên ba nhà thờ, Claude Haiku 4.5 cho văn phong ấm áp hơn đôi chút, nhưng GPT-4.1 mini khá sát, rẻ hơn khoảng 4 lần và nhanh hơn, nên được chọn làm mặc định. Một trang đầy đủ với cả ba bố cục tốn khoảng 1,3 xu, trong đó khoảng 80% là chi phí của bộ viết.

| Giai đoạn | Endpoint | Điều gì xảy ra |
|-----------|----------|----------------|
| 1 | `POST /website/planPage` | Phân loại loại trang (trang chủ, đến thăm, giới thiệu…), sau đó lấy mẫu 10 bố cục ứng viên từ xác suất theo vòng của JEV (phần mở đầu + số lượng section → từng section → phần kết), loại bỏ trùng lặp, nhờ JEV chấm điểm từng bố cục về mức độ phù hợp/mạch lạc/thiếu sót, và trả về 3 bố cục hàng đầu cùng một giọng văn viết và `suggestedStyle` (bảng màu + phông chữ). Các ứng viên có cùng section cho đến lúc đó sẽ hỏi JEV một câu giống hệt nhau, nên các vòng được ghi nhớ theo tiền tố. Điểm tốt nhất dưới 6 sẽ được ghi nhật ký là `lowLayoutScore`; nhật ký này chính là danh sách các mẫu cần bổ sung. Khoảng 2 giây |
| 2 | `POST /website/writePage` (một lệnh gọi cho mỗi ứng viên) | Bộ viết điền nội dung ô cho từng cặp section mỗi lần gọi, song song, và trả về năm tiêu đề hero để JEV lựa chọn; JEV kiểm tra thông tin của mọi section; các section không đạt, dùng cụm từ sáo rỗng, hoặc kể lại một section trước đó (trùng chuỗi 4 từ liên tiếp, kiểm tra bằng mã) sẽ được viết lại song song kèm lý do cụ thể; một bước lọc bằng mã loại bỏ các câu chứa cụm từ sáo rỗng của site nhà thờ (trừ khi mô tả của chính nhà thờ dùng chúng); JEV chọn chủ đề ảnh, biểu tượng và đường phân chia hình dạng của hero, rồi chấm điểm kết quả. Trả về một cây section sẵn sàng lưu và một điểm số. Khoảng 6–9 giây |
| 3 | `POST /content/pages/importTree` | B1Admin chỉ ghi bố cục được xếp hạng cao nhất (phương án dự phòng là bố cục đứng thứ hai nếu lần ghi đó thất bại), lưu và mở bản xem trước (khoảng 10 giây sau khi bấm Save) |

Mỗi giai đoạn là một yêu cầu riêng để mọi lệnh gọi đều nằm trong giới hạn 29 giây của API Gateway. Các mẫu trong `SiteGenHelper.buildTree` là cây section + phần tử cố định lấy từ danh mục (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) và tham chiếu đến token của theme (`var(--accent)`, `var(--lightAccent)`…), nên các trang được tạo sẽ kế thừa cài đặt giao diện hiện có của nhà thờ. Thêm một mẫu section nghĩa là thêm danh sách ô của nó vào `SECTIONS` và cây của nó vào `buildTree`; bài kiểm thử đơn vị duyệt qua mọi mẫu và kiểm tra tính hợp lệ của cây.

**Đầu vào.** Nội dung chỉ được phép nêu thông tin từ hai nguồn: những gì người dùng đã nhập, và `churchContext.facts`. Đây là các bản ghi mà B1Admin thu thập trước khi lập kế hoạch (giờ thờ phượng công khai và tên nhóm công khai, cùng tên và địa chỉ nhà thờ). Các cờ tương tự cũng kiểm soát các mẫu cần dữ liệu: `times` render phần tử `serviceTimes` trực tiếp khi nhà thờ lưu giờ thờ phượng trong B1 (nếu không thì là một bảng nhập tay), còn `groups` và `countdown` chỉ được đưa ra khi có dữ liệu đứng sau. Các lệnh gọi JEV được thực hiện theo cơ chế dự phòng: một lệnh trùng lặp sẽ được kích hoạt sau 1,5 giây và câu trả lời nào đến trước sẽ được dùng, vì gateway thỉnh thoảng bị chậm và các lệnh gọi gần như không tốn chi phí.

**Bám sát chủ đề.** Yêu cầu của người dùng là *chủ đề của trang*, không phải thông tin nền về nhà thờ. `planPage` phân loại yêu cầu (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`). Với trang `event` và `topic`, các mẫu chung về nhà thờ (ghi chú của mục sư, bài giảng, mục vụ, nhóm, tác động cộng đồng, giờ hàng tuần và đếm ngược, hero video) thậm chí không được đưa ra, trong khi `details` (khi nào / ở đâu / mang theo gì) và `eventCountdown` theo ngày thì có. Cả hai bộ đánh giá đều chấm điểm mức độ đúng chủ đề. B1Admin truyền `pageType` từ kế hoạch vào mỗi lệnh gọi `writePage`.

**Trang đầy đủ từ yêu cầu ngắn.** Trang có ba đến sáu section giữa, độ dài ô rộng rãi, một câu giới thiệu cho các section dạng thẻ và một FAQ năm câu hỏi; bước sửa chữa sẽ mở rộng bất kỳ section nào trả về quá mỏng. Việc tạo chỉ cần một cú nhấp: không có câu hỏi tiếp theo. Khi yêu cầu bỏ qua một chi tiết thông thường mà một trang hoàn chỉnh cần (giờ bắt đầu, phòng, thứ cần mang theo, cách đăng ký), bộ viết sẽ điền vào một lựa chọn hợp lý và khiêm tốn để nhà thờ chỉnh sửa. Vì các section được viết song song, những khoảng trống này được quyết định **một lần duy nhất**, trong `planPage` (`assumedDetails`, một lệnh gọi bộ viết nhỏ chạy cùng lúc với việc lấy mẫu bố cục), và được truyền lại vào mọi lệnh `writePage` qua `churchContext.assumedDetails`, nên một section không thể ghi 5:00 trong khi section khác ghi 5:30. JEV sửa mọi section mâu thuẫn với yêu cầu, với hồ sơ của nhà thờ, hoặc với các chi tiết đã được quyết định. Các chi tiết đã quyết định không hiển thị trên giao diện; nhà thờ xem lại và chỉnh sửa trang như bất kỳ trang nào khác. Một số thứ không bao giờ được bịa ra: tên người, số điện thoại, địa chỉ email và web, giá cả, số liệu thống kê, lịch sử của nhà thờ, trích dẫn gán cho người nào đó, và thứ trong tuần cho một ngày mà yêu cầu không đưa ra.

**Hình ảnh.** Các mẫu không đặt tên cho ảnh hay biểu tượng của chúng. Chúng để trống các ô, và một lượt xử lý chung (`visualSlots` → `pickVisuals` → `applyVisuals` trong `SiteGenHelper`) duyệt qua cây đã hoàn thành và điền vào mọi ô: nền section hoặc mục thư viện được đánh dấu `auto:photo`, một `auto:icon`, `auto:divider` của hero, và, khi không có dấu đánh dấu nào, mọi phần tử `textWithPhoto`, `card` hoặc `image` có `photo` để trống. JEV chọn từng ảnh dựa trên văn bản bên cạnh nó (ảnh của một thẻ lấy từ tiêu đề và nội dung của chính thẻ đó; ảnh nền lấy từ nội dung của section), và không chủ đề nào được lặp lại trên một trang. Vì vậy một mẫu mới sẽ tự động có ảnh. Ảnh là các từ khóa tìm kiếm Pexels, được xuất ra dưới dạng placeholder `pexels:<term>` mà B1Admin phân giải qua `POST /content/stock/search`; một client không gửi `resolvesPhotos` sẽ nhận một ảnh hero tích hợp sẵn, các dải màu phẳng và thẻ không có ảnh. Cố ý không dùng chủ đề chân dung, và mẫu mục sư không có ảnh: một người lạ từ kho ảnh không bao giờ được thay thế một người thật. Với nhà thờ chưa có trang nào, B1Admin áp dụng `suggestedStyle` vào kiểu dáng toàn cục; các site hiện có vẫn giữ giao diện của mình.

### Các endpoint khác

:::info
Nút rewrite trên `SectionToolbar` và nút "Generate Site" trong danh sách trang của B1Admin vẫn bị comment ở phía client. Các endpoint AskApi bên dưới vẫn phản hồi; chỉ giao diện là bị ẩn.
:::

| Endpoint | Mục đích |
|----------|----------|
| `POST /website/generatePageOutline` → `generateSection` | Luồng tạo trang hai bước ban đầu (dàn ý, rồi một lệnh gọi LLM cho mỗi section xuất ra JSON phần tử). Đã được `planPage`/`writePage` thay thế trong B1Admin vì chi phí; được giữ lại cho các bên tích hợp API |
| `POST /website/generateSite` | Tạo toàn bộ site. **Được thiết kế theo hai pha**: một lệnh gọi `planOnly: true` chỉ trả về kế hoạch đa trang (một lệnh gọi mô hình nhanh), sau đó client yêu cầu nội dung đầy đủ, nhờ vậy mọi yêu cầu nằm trong giới hạn thời gian của Lambda/API Gateway |
| `POST /website/rewriteSection` | Viết lại giữ nguyên cấu trúc: mô hình chỉ được thay đổi các câu trả lời mang văn bản. Một chữ ký cấu trúc đệ quy (id + loại + thứ tự) được so sánh trước và sau; nếu có bất kỳ sai khác nào, endpoint trả về section gốc kèm `fallback: true` thay vì cấu trúc bị hỏng |
| `POST /website/generateAltText` | Lệnh gọi thị giác trên tối đa 20 URL ảnh; trả về văn bản alt ngắn gọn (tối đa 125 ký tự, đã loại bỏ tiền tố "photo of") |
| `POST /website/generateMetaDescription` | Một meta description SEO (tối đa 155 ký tự) từ nội dung văn bản của trang, được gắn với nút Generate trong phần cài đặt trang của B1Admin |

Prompt của các endpoint này là các file markdown trong `AskApi/config/instructions/`, bao gồm danh mục phần tử mà mô hình dùng để tạo nội dung. Hai điểm thiết kế giữ cho danh mục đáng tin cậy: client truyền `availableElementTypes` trong mọi yêu cầu (prompt chỉ được dùng các loại có trong danh sách đó; máy chủ không cứng hóa toàn bộ tập hợp), và công cụ `describe_page_builder` của MCP trong API mang cùng hướng dẫn cho các tác nhân AI làm việc qua [MCP](../api/mcp.md). Các mô hình là Anthropic Claude qua OpenRouter: 3.5 Haiku cho nội dung section (độ trễ thấp), 3.5 Sonnet cho dàn ý, kế hoạch site và thị giác, với phương án dự phòng là OpenAI khi chưa cấu hình khóa OpenRouter.

## Biểu mẫu hội thoại

Biểu mẫu (module membership) có thêm chế độ hội thoại, nhắm đến các trang kiểu thẻ kết nối. Bốn cột của `forms` điều khiển chế độ này: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Hiển thị**: `FormSubmissionEdit` của apphelper chuyển sang component `ConversationalForm` (mỗi lần một câu hỏi) khi `displayMode` là `conversational`; trang biểu mẫu của B1App truyền chế độ này qua. Dữ liệu gửi đi đều giống nhau trong cả hai trường hợp.
- **Tự động tạo người**: khi gửi biểu mẫu với `autoCreatePerson` được bật, `ConversationalFormHelper.findOrCreatePerson` loại trùng theo email (không phân biệt hoa thường); nếu không tìm thấy, nó tạo một hộ gia đình và một người với `membershipStatus: "Guest"`, rồi liên kết bản gửi với người đó.
- **Email theo dõi**: khi đã đặt tiêu đề và nội dung, người gửi nhận một email theo mẫu (với các token `{firstName}` / `{churchName}`) qua luồng email giao dịch hiện có (`TransactionalEmailHelper`), không bao giờ qua kênh bản tin tổng hợp. Cả hai tác dụng phụ đều không gây lỗi nghiêm trọng: một thất bại sẽ không làm mất bản gửi.

Bốn trường này hiện được đặt qua API; trình chỉnh sửa biểu mẫu của B1Admin chưa cung cấp chúng.

## Bộ nhớ đệm trang công khai

Đường render công khai của B1App lưu đệm các lượt lấy có gắn thẻ nhà thờ (`next: { revalidate: 300, tags: [sdSlug] }` trên production; `0` khi phát triển), nên một trang trực tiếp có thể còn cũ đến năm phút sau một lần ghi ContentApi. `POST /api/revalidate/{sdSlug}` trên B1App gọi `revalidateTag(sdSlug)` và là cách duy nhất để xóa đệm đó sớm.

Có hai bên ghi vào đệm này:

1. **B1Admin**: `clearSiteCache()` trong `B1Admin/src/site/siteCache.ts` gửi POST sau mỗi lần lưu từ trình chỉnh sửa. Hàm này ưu tiên subdomain của site đang hoạt động (một site phụ phải xóa *đúng* tag của nó, không phải tag của nhà thờ mặc định).
2. **Api**: Các thay đổi nội dung không đi qua B1Admin (khóa API, MCP, AI) sẽ gọi `SiteCacheHelper.bump(churchId)` từ các controller nội dung. Helper này phân giải subdomain của nhà thờ qua `SubDomainHelper` và gửi POST tới `{b1AppRoot}/api/revalidate/{sd}`. Các lỗi bị nuốt đi, nên một B1App không thể truy cập sẽ không làm hỏng việc lưu.

Các controller gọi bump: pages (lưu, xóa, nhân bản, xuất bản, hủy, hủy xuất bản, bản tạm AI), sections, elements, blocks, links, global styles, posts và redirects. Địa chỉ `b1AppRoot` khi phát triển là `http://{subdomain}.localtest.me:3301`; bản demo và production dùng `https://{subdomain}.b1.church`.

## Trang liên quan

- [Website Routing & Multi-Site](./websites.md): cách một yêu cầu được phân giải thành nhà thờ/site và cách tên miền tùy chỉnh được định tuyến
- [Content Endpoints](../api/endpoints/content.md): toàn bộ REST cho trang, section, phần tử, khối, bài viết, chuyển hướng và cài đặt
- [AppHelper](../shared-libraries/app-helper.md): gói npm cung cấp bộ render, registry, đường phân chia và widget
- [MCP Server](../api/mcp.md): bao gồm công cụ hướng dẫn `describe_page_builder`
- [Page Editor (end-user)](/docs/b1-admin/website/page-editor): tài liệu cho trình chỉnh sửa dành cho nhân viên
