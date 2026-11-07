---
title: "Phân trang web & Nhiều trang web"
---

# Phân trang web & Nhiều trang web

<div class="article-intro">

Một nhà thờ giờ đây có thể vận hành nhiều hơn một trang web riêng biệt, và mỗi trang có thể nằm trên tên miền phụ `*.b1.church` hoặc trên một tên miền tùy chỉnh hoàn toàn do nhà thờ sở hữu. Trang này mô tả lớp định tuyến nằm *bên dưới* trình xây dựng trang web: cách một yêu cầu đến được ánh xạ tới một nhà thờ **và** tới một trang web cụ thể, mô hình dữ liệu nhiều trang web (giá trị canh gác `siteId` giúp mọi trang web đã có từ trước vẫn hiển thị như cũ), và tầng tên miền tùy chỉnh — một proxy Caddy tự quản lý trên EC2, chịu trách nhiệm kết thúc TLS và viết lại từng tên miền của nhà thờ thành upstream `*.b1.church` tương ứng. Về những gì thực sự được hiển thị sau khi yêu cầu đã được phân giải — cây trang/phần/phần tử — xem [Trình xây dựng trang web](./website-builder).

</div>

## Tổng quan

```
   grace.b1.church              www.gracechurch.org  (tên miền tùy chỉnh)
   (tên miền phụ b1.church)               │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Biên Caddy — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • kết thúc TLS (chứng chỉ LE cho từng    │
          │             │    tên miền)                              │
          │             │  • viết lại Host → {sub}.b1.church        │
          │             │  • reverse-proxy tới B1App                │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • luôn luôn: xóa mọi x-site do client gửi (chống giả mạo)  │
   │  • Host *.b1.church nội bộ ⇒ tra cứu tên miền không hoạt động│
   │  • Host tùy chỉnh thô (bỏ qua Caddy) ⇒ tra cứu → đặt x-site │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → nhãn đầu của host → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   truyền ?siteId= vào mọi lệnh gọi nội dung:      │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  lưu/xóa tên miền (B1Admin Cài đặt→Tên miền → POST /membership/domains)
        └─ CaddyHelper.updateCaddy() theo nỗ lực tốt nhất (được bao bọc, không gây lỗi, timeout 10 giây)
  Caddy tự đọc bảng domains qua hai endpoint ẩn danh:
        GET /membership/domains/authorize  — `ask` cho on-demand-TLS (200 nếu biết / 404 nếu không)
        GET /membership/domains/hostmap    — bản đồ host→{sub}.b1.church (làm mới mỗi 5 phút)
```

Ba quy tắc áp dụng xuyên suốt tầng này:

1. **Một giá trị canh gác giữ cho mọi thứ tương thích ngược.** `siteId = ''` là trang web chính. Mọi trang, khối, liên kết, kiểu toàn cục và dòng tên miền đã tồn tại trước tính năng này đều mang giá trị `''` và hiển thị đúng như trước. Một trang web *thứ hai* đơn giản chỉ là một tập các dòng có `siteId` khác rỗng, và mọi endpoint nội dung được gọi mà không có `?siteId=` sẽ trả về trang web chính — chính xác từng byte như yêu cầu cũ.
2. **Việc phân giải dựa trên nhãn host và hội tụ về một điểm.** Tên miền phụ `*.b1.church` được định tuyến trực tiếp theo nhãn host; tên miền tùy chỉnh được viết lại thành nhãn `{sub}.b1.church` ở biên Caddy trước khi B1App nhận được (kèm một tra cứu CSDL trong middleware đóng dấu header `x-site` làm phương án dự phòng cho bất kỳ `Host` tùy chỉnh thô nào). Cả hai nhánh đều đi tới cùng một route `[sdSlug]` và cùng một lệnh gọi `churches/lookup`, nên việc hiển thị phía sau hoàn toàn giống nhau.
3. **Biên Caddy không lưu trạng thái, dựa trên một nguồn sự thật duy nhất.** Tên miền tùy chỉnh được kết thúc tại một proxy Caddy tự quản lý trên EC2, proxy này viết lại từng tên miền thành upstream `{sub}.b1.church`. Khi lưu tên miền, một lệnh `CaddyHelper.updateCaddy()` được gọi theo nỗ lực tốt nhất; Caddy cũng đọc trực tiếp bảng `domains` (các endpoint `authorize` và `hostmap` bên dưới). Bảng này là nguồn có thẩm quyền — một Caddy không phản hồi không bao giờ có thể làm hỏng việc lưu.

## Phân giải trang web

### Tên miền phụ `*.b1.church`

`B1App/next.config.mjs` viết lại các yêu cầu đến dựa theo host. Một quy tắc host với mẫu `(?<subdomain>.*?)\..*` lấy **nhãn đầu tiên** của host và viết lại `/` và `/:path*` thành `/{subdomain}` — đoạn App Router `[sdSlug]`. Vì vậy `grace.b1.church/about` trở thành `/grace/about`.

Bên trong `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) gọi `GET /membership/churches/lookup/?subDomain={sdSlug}`. Phản hồi của `ChurchController.getBySubDomain` giờ có hai nhánh:

| Slug khớp | Phản hồi | Ý nghĩa |
|-----------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Trang web chính của nhà thờ đó |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Một **trang web phụ** — controller chuyển sang tra cứu `sites`, xác định nhà thờ sở hữu, và trả lại slug đã truy vấn cùng với `siteId` bổ sung |

`siteId` bổ sung đó là thứ duy nhất phân biệt yêu cầu tới trang web phụ với yêu cầu tới trang web chính; mọi thứ khác trong quy trình đều dùng chung.

Một slug không khớp bảng nào sẽ trả về `{}` với mã `200`. `ConfigHelper.load` coi phản hồi không có `id` là một trang web không xác định và gọi `notFound()` của Next, nên một tên miền phụ không tồn tại sẽ nhận được lỗi 404 thực sự thay vì để mọi lệnh gọi sau đó hỏi `/…/undefined`. Route trang builder cũng xây dựng đường dẫn cây với `pageTreePath()` (`src/helpers/pageTreePath.ts`), hàm này mã hóa slug dưới dạng URL, nên một slug sai định dạng (dấu gạch chéo ngược, khoảng trắng) sẽ trả về 404 thay vì để lỗi `400` từ API thành lỗi 500.

### Tên miền tùy chỉnh

Một tên miền do nhà thờ sở hữu kết thúc tại **biên Caddy** (chi tiết bên dưới), nơi viết lại header `Host` thành `{sub}.b1.church` của trang web trước khi chuyển tiếp tới B1App. Vì vậy trên đường đi bình thường, B1App nhận được một host `*.b1.church` *nội bộ* và phân giải nó theo nhãn host y hệt như một tên miền phụ gốc — tra cứu CSDL của middleware không bao giờ được kích hoạt. `src/middleware.ts` vẫn chạy trên mọi yêu cầu, nhưng với một nhiệm vụ luôn bật và một phương án dự phòng:

1. **Luôn luôn** — nó **xóa mọi header `x-site` do client gửi**. Header đó là đầu vào viết lại có thể bị giả mạo và chỉ được tin cậy khi chính middleware đặt nó; việc loại bỏ nó là nhiệm vụ thực sự của middleware phía sau Caddy.
2. **Dự phòng, chỉ với `Host` không phải nội bộ** — với một `Host` tên miền tùy chỉnh thô đến B1App *mà không qua* bước viết lại của Caddy, nó gọi `GET /membership/domains/public/lookup/{host}` và, nếu kết quả trả về một `subDomain`, đặt `x-site: {subDomain}.b1.church`. Phía sau Caddy, nhánh này không hoạt động vì `Host` đã là `*.b1.church`.

Các host nội bộ — `localhost`, `b1.church`, và các hậu tố `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — bỏ qua hoàn toàn bước tra cứu (chúng đã được phân giải bằng quy tắc viết lại nhãn host, hoặc là các host xem trước/triển khai).

Bản thân việc tra cứu (`DomainRepo.loadByName`) thực hiện left join `domains → churches` và `domains → sites`, và trả về `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — tên miền phụ của trang web phụ được gán nếu tên miền trỏ tới một trang web phụ, nếu không thì là của nhà thờ. Nó khớp host chính xác trước; nếu host đó bắt đầu bằng `www.` và không khớp, nó thử lại **một lần** với apex trần.

Quay lại `next.config.mjs`, các quy tắc viết lại `x-site` được đặt **trước** các quy tắc host chung, nên chúng được ưu tiên. `x-site: grace.b1.church` → nhãn đầu `grace` → `[sdSlug] = grace`, và từ đó việc phân giải hoàn toàn giống đường tên miền phụ (cùng `churches/lookup`, cùng `siteId`).

:::info
Header `x-site` không đáng tin cậy khi đến từ bên ngoài. Middleware vô điều kiện loại bỏ mọi `x-site` đến trước khi tùy ý đặt giá trị của chính nó, và các quy tắc viết lại chỉ thấy giá trị do middleware đặt — một client không thể tự gán mình vào nội dung của nhà thờ khác chỉ bằng cách gửi một header.
:::

Hai chi tiết vận hành về middleware:

- **Bộ nhớ đệm.** Kết quả của mỗi host (một lần khớp *hoặc* một lần xác nhận không tìm thấy — không bao giờ là lỗi mạng) được lưu đệm trong **10 phút** trong một `Map` trong bộ nhớ, theo từng isolate serverless.
- **Matcher.** Matcher cố ý đưa lại `/sitemap.xml`, `/robots.txt` và `/manifest.webmanifest`. Mẫu đầu tiên loại trừ các đường dẫn có dấu chấm, nếu không sẽ làm rơi các tệp này; chúng được thêm lại để các tệp SEO/PWA riêng của nhà thờ trên tên miền tùy chỉnh cũng nhận được header `x-site`.
- **Header canonical.** Với các trang của nhà thờ, middleware thêm một header phản hồi `Link: <{proto}://{host}{path}>; rel="canonical"`, nêu tên host mà trang thực sự được phục vụ — tên miền phụ hoặc tên miền tùy chỉnh (`helpers/canonicalLink.ts`). Khi một tên miền tùy chỉnh tới B1App qua [proxy Caddy](../deployment/caddy-proxy.md), host của yêu cầu là tên miền phụ `{sub}.b1.church`, nên middleware thay vào đó dùng tên miền của khách truy cập từ `X-Church-Host` — nhưng chỉ sau khi `/domains/public/lookup/{host}` xác nhận rằng tên miền đó ánh xạ tới cùng tên miền phụ (`ownsSubdomain()`). Khi đó, liên kết canonical, `robots.txt` và `sitemap.xml` sẽ nêu tên miền tùy chỉnh thay vì tên miền phụ `b1.church`. Bước này bị bỏ qua trên các host không phải của nhà thờ (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) và trên `/mobile`, `/login`, `/logout`, cùng các tệp robots/sitemap/manifest được tạo tự động.

### Trang web công khai bị tắt

Một nhà thờ có thể bật **Disable Public Website** trong B1Admin (cài đặt nội dung cấp nhà thờ `hidePublicSite = "true"`). Khi đó trang web chỉ phục vụ các route dành cho thành viên:

- **Middleware của B1App** tra cứu tên miền phụ (`/membership/churches/lookup` rồi đến `/content/settings/public/:churchId`) và chuyển hướng các yêu cầu ẩn danh tới bất kỳ đường dẫn nào nằm ngoài danh sách cho phép sang `/login?returnUrl={path}{query}`. Danh sách cho phép (`helpers/publicSite.ts`) gồm `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, và các tệp manifest/robots/sitemap. Chỉ các câu trả lời đã xác nhận mới được lưu đệm (60 giây trong môi trường production, vì lệnh revalidate của quản trị viên không thể xóa bản đồ theo từng instance này; không lưu đệm trong dev/test). Lỗi API sẽ phục vụ trang web thay vì khóa mọi người ra ngoài.
- **Thành viên đã đăng nhập thấy toàn bộ trang web.** Một yêu cầu mang cookie `jwt` còn hạn (hàm `hasSession()` của middleware giải mã trường `exp` trong payload mà *không* xác minh chữ ký — đây chỉ là cổng mềm, không phải kiểm soát truy cập) sẽ bỏ qua chuyển hướng, nên sau khi đăng nhập, thành viên quay lại trang họ đã yêu cầu và thấy các trang bình thường, các trang tích hợp sẵn (Nhóm, Bài giảng, v.v.) và điều hướng header. Các thành phần trang và `Header` không còn tự kiểm tra `hidePublicSite` nữa.
- **`robots.txt`** cấm mọi thứ, như trên các host noindex.
- **API.** `GET /content/pages/public/:churchId` (danh sách trang của sitemap) trả về `[]`, nên người gọi ẩn danh không thể liệt kê các trang.

### Truyền `siteId`

`ConfigHelper` lưu `siteId` đã phân giải trên `ConfigurationInterface` theo từng yêu cầu của nó (được ghi nhớ bằng `cache()` của React) và nối thêm `?siteId=` vào các lệnh gọi nội dung mà nó cùng các thành phần trang thực hiện — **có điều kiện**: một `siteId` rỗng (tên miền phụ của nhà thờ chính) sẽ bỏ hoàn toàn tham số. Các endpoint được truyền là cây trang (`/content/pages/:id/tree`), danh sách trang công khai dùng cho sitemap (`/content/pages/public/:id`), kiểu toàn cục (`/content/globalStyles/church/:id`), liên kết điều hướng (`/content/links/church/:id`), và khối chân trang độc lập (`/content/blocks/public/footer/:id`). Trên đường hiển thị bình thường, chân trang nằm sẵn trong cây trang (các phần được gắn `zone: "siteFooter"`), đã được lấy với `siteId`, nên không có khoảng trống chân trang không được giới hạn.

Portal thành viên (B1App `mobile`) cố ý nằm ngoài cơ chế này: `loadChurchAppearance.ts` phân giải nhà thờ qua `churches/lookup` nhưng chỉ đọc `/settings/public/{id}` ở cấp nhà thờ và không bao giờ truyền `siteId` — portal là toàn nhà thờ trong v1 (xem bên dưới).

## Nhiều trang web cho mỗi nhà thờ

### Mô hình dữ liệu

Bảng mới `membership.sites` được thiết kế cố ý rất gọn:

| Cột | Kiểu | Ghi chú |
|-----|------|---------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Nhà thờ sở hữu |
| `name` | `varchar(255)` | Tên hiển thị (ví dụ "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Chỉ mục duy nhất** — không gian tên toàn cục (xem bên dưới) |

Việc phân phạm vi trang web khi đó chỉ là một cột duy nhất không rỗng được thêm vào các bảng nội dung và tên miền:

| Bảng (module) | Cột | `''` nghĩa là |
|---------------|-----|---------------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Tên miền phục vụ trang web chính |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Trang web chính — và trên **`blocks`**, `''` còn có nghĩa là *dùng chung cho tất cả trang web* |

Hai migration thêm toàn bộ nội dung này (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Vì cột mặc định là `''`, mọi dòng hiện có giữ nguyên hành vi hôm nay mà không cần backfill.

**Không gian tên tên miền phụ toàn cục.** `sites.subDomain` dùng *chung một* không gian tên với `churches.subDomain` — tên miền phụ của một trang web không bao giờ có thể trùng với tên miền phụ của nhà thờ hoặc của trang web khác. Điều này được thực thi trên **cả hai** đường lưu: `SiteController.save` từ chối slug trùng với `churches` hoặc `sites`, và `ChurchController.validateSave` làm điều tương tự theo chiều ngược lại. Một chỉ mục duy nhất trên `sites.subDomain` đảm bảo điều này ở cấp cơ sở dữ liệu.

**Tính duy nhất của trang** được mở rộng từ `(churchId, url)` thành `(churchId, siteId, url)`, nên hai trang web của cùng một nhà thờ mỗi trang có thể sở hữu `/about` riêng.

### Nội dung theo từng trang web, có phương án dự phòng

Mọi endpoint **danh sách/cây** nội dung có phạm vi trang web đều nhận `?siteId=` tùy chọn (vắng mặt ⇒ `''` = chính): danh sách/cây/công khai của trang, danh sách/theo loại/chân trang của khối, liên kết (ẩn danh / đã lọc / tất cả), và kiểu toàn cục. Các phần và phần tử không được phân phạm vi trực tiếp — chúng kế thừa thông qua trang hoặc khối cha.

Hai chuỗi phân giải làm nên phần thú vị:

- **Kiểu toàn cục — `trang web → chính → mặc định`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` trả về dòng riêng của trang web; nếu một trang web phụ không có dòng nào, nó trả về **dòng chính (`''`) nguyên trạng** (giữ nguyên `id`/`siteId` của dòng chính, mà client dùng để sao chép khi ghi), và nếu cũng không có dòng chính, `GlobalStyleController` trả về một bảng màu/phông chữ mặc định được mã cứng. 
- **Khối chân trang — chân trang riêng của trang web được ưu tiên, dùng chung làm dự phòng.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` trả về cả dòng dùng chung (`''`) *lẫn* dòng riêng của trang web; bộ phân giải chọn chân trang riêng của trang web nếu có, nếu không thì dùng chân trang dùng chung. Cùng logic này chạy cả trong `TreeHelper.insertBlocks` (cây trang) và trong endpoint độc lập `/content/blocks/public/footer/:churchId`.

### Xóa trang web (xóa dây chuyền)

`SiteController.delete` (được kiểm soát bởi quyền Cài đặt→Chỉnh sửa của membership) gỡ bỏ một trang web phụ qua ba bước:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` xóa dây chuyền mọi nội dung mà trang web sở hữu: các **trang** của nó → các phần, phần tử, `pageHistory` và `posts` của chúng; các **khối** riêng của nó → các phần, phần tử và `pageHistory` của chúng; các **liên kết** và **globalStyles** của nó. Một chốt bảo vệ từ chối chạy với `''` — giá trị canh gác chính/dùng chung không bao giờ bị xóa dây chuyền.
2. `DomainRepo.clearSiteId` **gán lại** các tên miền của trang web về chính (`siteId → ''`) thay vì xóa chúng, nên tên miền tùy chỉnh vẫn tồn tại sau khi xóa trang web.
3. Dòng `sites` bị xóa và các route Caddy được đồng bộ lại (theo nỗ lực tốt nhất).

### Bề mặt B1Admin

| Khả năng | Vị trí | Cơ chế |
|----------|--------|--------|
| Bộ chuyển trang web | `useSiteSelection` + `SiteSwitcher` (rỗng = "Main Website") | Đọc tham số URL `?site=` và truyền nó dưới dạng `?siteId=` vào các lệnh gọi ContentApi. Có trên ba **danh sách** trang web — **Pages**, **Blocks**, **Appearance** — nhưng *không* có trên trình chỉnh sửa trang/khối, vốn mang `siteId` trên bản ghi |
| Tạo/xóa trang web | `SitesDialog`, mở từ mục "Manage websites…" của bộ chuyển | `POST /membership/sites` / `DELETE /membership/sites/:id` (tên và subDomain). Được kiểm soát bởi quyền Cài đặt→Chỉnh sửa của membership (`Permissions.settings.edit` phía server; `Permissions.membershipApi.settings.edit` trong B1Admin). **Chỉ tạo/xóa — không có giao diện đổi tên trong v1** |
| Gán trang web cho từng tên miền | `DomainSettingsEdit` trong Cài đặt→Tên miền | Một menu thả xuống trang web trên mỗi dòng gửi `siteId` cho từng tên miền tới `/membership/domains`. Cột này bị ẩn nếu API không trả về trang web nào (backend cũ) |
| Kiểu sao chép khi ghi | `StylesManager.prepareForSave` | Khi dòng kiểu toàn cục đã tải có `siteId` không khớp với trang web đã chọn (tức là API đã trả về dòng chính được kế thừa làm dự phòng), nó bỏ `id` của dòng chính và đóng dấu `siteId` hiện tại, buộc **chèn** một dòng mới riêng cho trang web thay vì ghi đè dòng chính. Cùng cơ chế rẽ nhánh khi không khớp áp dụng cho khối chân trang của trang web |

:::info
**Những gì vẫn thuộc toàn nhà thờ trong v1 (một lựa chọn phạm vi có chủ đích, không phải giới hạn mô hình dữ liệu):** **blog** (`BlogPage` không có bộ chuyển và tải `/posts` mà không có `siteId`), **tiện ích trang web** (biểu ngữ thông báo + nút khởi chạy), **chuyển hướng**, **logo / GA4 / cài đặt nhà thờ**, và **portal thành viên** (B1App mobile). Lưu ý đây *không* phải là "toàn bộ Appearance" — kiểu toàn cục của trang web phụ (bảng màu, phông chữ, kiểu chữ, khoảng cách, điều hướng, CSS tùy chỉnh) **đều** theo từng trang web qua đường sao chép khi ghi nêu trên; chỉ các mục con biểu ngữ/nút khởi chạy/chuyển hướng/logo của trang Appearance vẫn thuộc toàn nhà thờ.
:::

## Tên miền tùy chỉnh: biên Caddy (kế hoạch cấu hình tĩnh)

:::info
**Hướng đi đã điều chỉnh ngày 2026-07-02.** Một kế hoạch trước đó nhằm chuyển việc lưu trữ tên miền tùy chỉnh sang các tên miền do Vercel quản lý đã **bị hủy**, và toàn bộ mã đăng ký tên miền Vercel (`VercelHelper`, các biến môi trường `vercelToken`/`vercelProjectId`/`vercelTeamId`, các tham số SSM và mục kiểm tra sức khỏe) đã bị gỡ khỏi Api. Proxy Caddy tự quản lý trên EC2 **vẫn được giữ** làm biên tên miền tùy chỉnh lâu dài. Công việc còn lại chỉ mang tính nội bộ: thay cấu hình *runtime* qua admin API của Caddy bằng một cấu hình *tĩnh* tồn tại sau khi khởi động lại.
:::

### Biên

Mọi tên miền tùy chỉnh của nhà thờ đều trỏ DNS về một máy EC2 duy nhất — `3.23.251.61`, cũng có thể truy cập qua `proxy.b1.church`. Màn hình Cài đặt→Tên miền của B1Admin hướng dẫn nhà thờ thêm một bản ghi apex `A → 3.23.251.61` hoặc `CNAME → proxy.b1.church`. Caddy kết thúc TLS bằng chứng chỉ Let's Encrypt riêng cho từng tên miền, viết lại header `Host` thành upstream `{sub}.b1.church` của tên miền đó, và reverse-proxy tới B1App — nơi định tuyến theo nhãn host như bất kỳ tên miền phụ gốc nào (xem [Tên miền tùy chỉnh](#tên-miền-tùy-chỉnh) ở trên).

Ánh xạ upstream đến từ `DomainRepo.loadPairs`, và phần dial của nó dùng COALESCE **tên miền phụ của trang web được gán**, để một tên miền proxy tới đúng *trang web phụ*, và quay về nhà thờ chính nếu không có:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Các dòng `www.*` bị loại khỏi bản đồ; Caddy phục vụ `www.{host}` bằng chuyển hướng `302` về apex.

### Hai endpoint ẩn danh cung cấp dữ liệu cho biên

`DomainController` cung cấp hai endpoint chỉ đọc, không xác thực mà máy chủ biên sử dụng trực tiếp — ẩn danh là điều bắt buộc, vì biên truy vấn chúng trước khi có bất kỳ ngữ cảnh nhà thờ nào:

| Endpoint | Trả về | Vai trò |
|----------|--------|---------|
| `GET /membership/domains/authorize?domain=` | `200` nếu tên miền — hoặc, với lần trượt `www.`, apex trần của nó — tồn tại trong `domains`; `404` nếu không (kể cả khi `domain` rỗng) | `ask` của on-demand-TLS trong Caddy: biện pháp kiểm soát lạm dụng quyết định có cấp chứng chỉ cho SNI đến hay không |
| `GET /membership/domains/hostmap` | `text/plain`, mỗi tên miền có thể định tuyến một dòng `{domain} {sub}.b1.church`, đã sắp xếp | Tệp bản đồ host→upstream mà máy chủ làm mới theo bộ hẹn giờ |

`authorize` tái sử dụng `DomainRepo.loadByName` (host chính xác, rồi thử lại một lần `www.`→apex); `hostmap` tái sử dụng `loadPairs` — nên nó nhận biết trang web và loại trừ `www.*`, giống hệt các route proxy — và chỉ bỏ hậu tố `:443`.

### Lưu/xóa tên miền — một lần đẩy theo nỗ lực tốt nhất

`DomainController.save` ghi các dòng `domains` rồi thực hiện **một lệnh** `CaddyHelper.updateCaddy()` theo nỗ lực tốt nhất, được bọc trong `try/catch` ghi log (`console.error`) và nuốt lỗi; `delete` cũng làm như vậy (điều này cũng đã sửa một lỗi cũ về route bị lỗi thời khi xóa), và việc xóa trang web phụ (`SiteController.delete`) cũng vậy. Bản thân `updateCaddy` bị giới hạn bởi timeout Axios **10 giây**, nên một Caddy không thể truy cập hoặc đã dừng không bao giờ làm lỗi `500` khi lưu tên miền — bảng `domains` là nguồn sự thật.

### Trạng thái hiện tại — cấu hình tĩnh, không có trạng thái runtime

Máy (EC2 Windows đứng sau Elastic IP cố định) chạy Caddy từ một **Caddyfile tĩnh**: TLS theo yêu cầu với `ask` trỏ tới `/membership/domains/authorize`, cùng một tệp bản đồ host→upstream được làm mới mỗi 5 phút từ `/membership/domains/hostmap` bởi một tác vụ đã lên lịch kết thúc bằng `caddy reload` êm ái. Cấu hình tồn tại qua các lần khởi động lại mà không có trạng thái runtime — không cần thao tác khởi tạo lại — và một SNI không xác định bị **từ chối TLS** (không cấp chứng chỉ cho host mà `authorize` từ chối), trong khi một host đã được cấp quyền nhưng chưa có trong bản đồ (một tên miền mới hoàn toàn trong khoảng thời gian đồng bộ) nhận được lỗi 404 sạch. Tên miền mới có thể định tuyến trong vòng ~5 phút sau khi lưu; chứng chỉ của chúng được cấp ở lần truy cập đầu tiên. Thiết lập/build, vận hành và các lưu ý đã kiểm chứng thực tế: [Proxy tên miền tùy chỉnh Caddy](../deployment/caddy-proxy).

### Đường đẩy runtime cũ — đường khôi phục, chờ xóa

`CaddyHelper` (module membership) vẫn có thể điều khiển Caddy qua **admin API** tại `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; không làm gì nếu chưa đặt; hiển thị trong nhóm Integrations của `ServerHealthController`): `updateCaddy()` PATCH toàn bộ mảng route, và `initializeCaddy()` cùng các endpoint `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` dựng lại một server cấu hình runtime từ đầu. Cấu hình của chế độ đó chỉ tồn tại trong bộ nhớ của Caddy — chính là tình trạng "quên sau khi khởi động lại" mà kiến trúc này đã thay thế. Cơ chế này chỉ còn lại như đường khôi phục và đã được lên lịch xóa khi máy tĩnh đã ổn định; lệnh đẩy `updateCaddy()` theo nỗ lực tốt nhất khi lưu/xóa tên miền là một thao tác vô hại đối với máy tĩnh (admin API của nó chỉ chạy trên localhost).

## Trang liên quan

- [Proxy tên miền tùy chỉnh Caddy](../deployment/caddy-proxy) — bản thân máy biên: thiết lập máy mới, dịch vụ WinSW, tác vụ đồng bộ bản đồ, và các lưu ý vận hành
- [Trình xây dựng trang web](./website-builder) — cây trang/phần/phần tử, bộ hiển thị, blog, SEO và tạo bằng AI (những gì được hiển thị sau khi yêu cầu đã phân giải tới nhà thờ/trang web)
- [Endpoint nội dung](../api/endpoints/content) — bề mặt REST cho trang, khối, liên kết và kiểu toàn cục, tất cả giờ đều nhận biết `?siteId=`
- [B1App](../web-apps/b1-app) — ứng dụng Next.js chứa middleware và định tuyến `[sdSlug]`
- [Triển khai ứng dụng web](../deployment/web-apps) — cách B1App được triển khai lên Vercel
