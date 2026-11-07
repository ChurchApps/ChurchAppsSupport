---
title: "Claude"
---

# Claude

<div class="article-intro">

Hãy hỏi Claude về nhà thờ của bạn bằng ngôn ngữ đời thường, và Claude sẽ trả lời dựa trên dữ liệu B1 của bạn, bao gồm các bài học và lớp học FreePlay. Bạn có thể hỏi những câu như *"Chủ nhật vừa rồi có bao nhiêu khách lần đầu đến?"* hoặc *"Tháng này có ai tham gia nhóm nhỏ không?"*, hoặc yêu cầu Claude thực hiện việc gì đó, chẳng hạn *"thêm một trang mới cho website của chúng tôi có tên Sự kiện."* Việc thiết lập mất chưa đến 3 phút, và bạn không cần kỹ năng kỹ thuật hay phần mềm cài đặt nào.

</div>

<div class="prereqs">
<h4>Những gì bạn cần</h4>

- **Một tài khoản Claude.** **Gói miễn phí vẫn dùng được**, và là cách tốt để thử nghiệm. Tuy nhiên, tài khoản miễn phí có giới hạn số tin nhắn mỗi ngày, và việc tra cứu dữ liệu trong B1 tiêu tốn tin nhắn khá nhanh, vì vậy nếu bạn sử dụng thường xuyên, chúng tôi khuyên bạn nên dùng **Claude Pro** (khoảng 20 USD/tháng).
- **Tài khoản đăng nhập B1 của bạn**, cùng tài khoản bạn dùng cho B1 Admin.

</div>

:::tip Được khuyến nghị — dùng thử miễn phí
Claude là cách dễ nhất để kết nối B1 với AI, và nó hoạt động với **gói miễn phí** của Claude, một cách hoàn hảo để nhà thờ của bạn dùng thử trước khi trả tiền cho bất kỳ điều gì.
:::

Có hai cách để kết nối. **Cách 1 là dễ nhất**, không cần khóa và không cần cài đặt gì.

## Cách 1 — Đăng nhập bằng B1 (dễ nhất)

Hoạt động trên trang web Claude, ứng dụng Claude trên máy tính và ứng dụng Claude trên điện thoại. Chỉ cần thiết lập một lần là dùng được trên tất cả.

### Bước 1 — Mở cài đặt kết nối của Claude

1. Truy cập [claude.ai](https://claude.ai) và đăng nhập (hoặc tạo tài khoản miễn phí).
2. Nhấp vào tên của bạn ở góc dưới bên trái, sau đó chọn **Cài đặt** → **Connectors**.

### Bước 2 — Thêm B1

1. Nhấp **Thêm**, sau đó chọn **Thêm connector tùy chỉnh**.
2. **Tên:** nhập `B1`.
3. **URL:** dán `https://api.churchapps.org/mcp`
4. Giữ nguyên các tùy chọn khác và nhấp **Thêm**.

### Bước 3 — Đăng nhập vào B1

1. Nhấp **Kết nối**. Một trang đăng nhập B1 sẽ mở ra.
2. Đăng nhập bằng tài khoản B1 của bạn. Nếu bạn thuộc nhiều hơn một nhà thờ, hãy kiểm tra xem nhà thờ đúng có được hiển thị ở đầu trang không.
3. B1 sẽ liệt kê những việc Claude đang yêu cầu thực hiện và xác nhận bạn sẽ được chuyển trở lại **claude.ai**. Nhấp **Cho phép**.

Bạn sẽ quay lại Claude, và B1 sẽ hiển thị là đã kết nối.

### Bước 4 — Thử hỏi điều gì đó

Bắt đầu một **cuộc trò chuyện mới** và thử:

- *"Nhà thờ chúng tôi có bao nhiêu người?"*
- *"Liệt kê các nhóm đang hoạt động của chúng tôi."*
- *"Tóm tắt số tiền dâng theo quỹ trong tháng này."*
- *"Ai đã gia nhập nhà thờ trong 30 ngày qua?"*

Lần đầu tiên, Claude sẽ xin phép sử dụng B1. Nhấp **Cho phép**.

## Cách 2 — Tiện ích máy tính với khóa B1

Dùng cách này nếu bạn muốn cấp cho Claude một khóa với quyền hạn giới hạn (ví dụ, chỉ được xem). Cách này hoạt động trong ứng dụng Claude trên máy tính Mac hoặc Windows, và bạn cần có quyền quản lý cài đặt nhà thờ trong B1 để tạo khóa.

### Bước 1 — Tải ứng dụng Claude

Tải ứng dụng Claude từ [claude.com/download](https://claude.com/download), cài đặt, mở ứng dụng và đăng nhập.

### Bước 2 — Tạo khóa B1 của bạn

Khóa này là thứ cho phép Claude truy cập B1 của *nhà thờ bạn*. Hãy hình dung nó như một mật khẩu dành riêng cho Claude.

1. Đăng nhập vào [B1 Admin](https://admin.b1.church) và truy cập [Cài đặt → Developer](https://admin.b1.church/settings/developer).
2. Trên tab **API Keys**, nhấp **New API Key**.
3. **Tên:** nhập `Claude`.
4. **Phạm vi (Scopes):** chọn những gì Claude được phép làm. Mỗi khu vực có một ô **read** (chỉ xem) và một ô **write** (thực hiện thay đổi). Chưa chắc? Hãy chỉ chọn các ô **read** để bắt đầu. Sau này bạn có thể tạo khóa mới với nhiều quyền hơn.
5. Nhấp **Save**, sau đó nhấp **Copy** để sao chép khóa. Khóa chỉ hiển thị một lần, vì vậy hãy chuyển ngay sang Bước 3.

### Bước 3 — Thêm B1 vào Claude

1. [Tải tiện ích B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Nhấp đúp** vào tệp đã tải về (`b1-churchapps.mcpb`). Claude sẽ mở ra và hiển thị **B1 (ChurchApps)**.
3. Nhấp **Install**.
4. Khi được hỏi **B1 API key**, hãy dán khóa từ Bước 2 và lưu lại.
5. **Thoát hoàn toàn Claude** (Mac: **Cmd+Q** · Windows: nhấp chuột phải vào biểu tượng Claude trên thanh tác vụ → **Quit**), rồi mở lại.

Nếu nhấp đúp không mở được Claude, hãy vào **Settings → Extensions → Advanced settings → Install Extension…** trong Claude và chọn tệp đã tải về. Sau đó bắt đầu một cuộc trò chuyện mới và hỏi thử một điều gì đó.

:::tip Đã cài đặt tiện ích rồi?
Bạn không cần làm gì thêm. FreePlay hoạt động qua cùng kết nối này. Ngoại lệ duy nhất là phiên bản 1.1.0, yêu cầu email và mật khẩu B1: hãy tải và cài đặt lại tiện ích để cập nhật. Khóa của bạn vẫn giữ nguyên.
:::

## Có an toàn không?

- Claude chỉ có thể xem dữ liệu của **nhà thờ bạn**.
- **Đăng nhập (Cách 1):** Claude không bao giờ có thể làm nhiều hơn những gì tài khoản đăng nhập B1 của bạn có thể làm. Trang đăng nhập B1 liệt kê mọi việc Claude có thể làm trước khi bạn nhấp **Cho phép**.
- **Với khóa (Cách 2):** Claude chỉ có thể làm những gì khóa cho phép trong B1. Khóa chỉ có ô **read** được chọn có thể xem nhưng không bao giờ thay đổi được gì. FreePlay hoạt động theo cách tương tự, dưới cùng một khóa.
- **Để tắt:** trong B1 Admin, vào **Cài đặt → Developer** và thu hồi ứng dụng trong mục **Connected Apps** (Cách 1) hoặc xóa khóa trong mục **API Keys** (Cách 2). Quyền truy cập sẽ dừng ngay lập tức. Bạn cũng có thể nhấp **Disconnect** trên connector B1 trong Claude.

## Chi phí là bao nhiêu?

Kết nối B1 miễn phí, vì nó là một phần của ChurchApps. Bản thân Claude có gói miễn phí; Claude Pro (khoảng 20 USD/tháng) cho phép bạn sử dụng nhiều hơn đáng kể. Xem [claude.com/pricing](https://claude.com/pricing).

## Chi tiết kỹ thuật

Phần còn lại của trang này dành cho người dùng kỹ thuật và trợ lý AI: phạm vi quyền, các cách kết nối khác và cách hoạt động.

### Phạm vi quyền (Scopes)

Claude giao tiếp với B1 thông qua **máy chủ Model Context Protocol (MCP)** được tích hợp trong API B1 (`https://api.churchapps.org/mcp`). Mọi lệnh gọi đều đi qua cùng các quy tắc xác thực, phân quyền và giới hạn theo nhà thờ như một yêu cầu từ B1 Admin. Claude bị giới hạn trong **quyền và phạm vi** của khóa API, và không thể truy cập webhook, các endpoint quản trị OAuth hoặc các đường dẫn chỉ dành cho nhà điều hành.

Các bộ phạm vi khởi đầu phổ biến:

- **Trợ lý chỉ đọc:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Đọc + thêm ghi chú / công việc:** thêm `people:write`
- **Trợ lý vận hành đầy đủ:** thêm các phạm vi `:write` tương ứng mà bạn muốn

Khóa `donations:read` cho phép Claude tóm tắt tiền dâng nhưng không thể ghi nhận một khoản quà tặng. Khóa `people:write` có thể thêm một người nhưng không thể xem tiền dâng. Xem [API Keys](/docs/developer/api/api-keys) để biết mỗi phạm vi cho phép những gì.

### Các cách kết nối khác

#### Claude Code (CLI)

Trong terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Vậy là xong. Trong bất kỳ phiên Claude Code nào, gõ `/mcp` để xác nhận máy chủ `b1` đã kết nối, sau đó hỏi Claude bất kỳ câu hỏi nào về nhà thờ của bạn.

#### Claude Desktop — cấu hình thủ công (nâng cao)

Nếu bạn không muốn dùng tiện ích, hãy chỉnh sửa tệp cấu hình của Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Thêm một mục máy chủ `b1` để kết nối với B1 thông qua `mcp-remote` (yêu cầu [Node.js](https://nodejs.org)):

```json
{
  "mcpServers": {
    "b1": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://api.churchapps.org/mcp",
        "--header", "Authorization:Bearer cak_<prefix>.<secret>"
      ]
    }
  }
}
```

Khởi động lại Claude Desktop. Menu connector trong khung soạn tin nhắn sẽ hiển thị `b1` cùng các công cụ của nó.

#### Claude.ai (web) — Custom Connector

Xem **Cách 1** ở trên. Connector sử dụng OAuth 2.1: Claude tìm máy chủ ủy quyền của B1 từ `https://api.churchapps.org/.well-known/oauth-protected-resource`, tự đăng ký bằng Dynamic Client Registration, và đăng nhập bằng PKCE. Với gói Team và Enterprise, chủ sở hữu có thể cần thêm connector cho tổ chức trước. Claude không yêu cầu phạm vi cụ thể nào, vì vậy trang đồng ý sẽ cấp mọi quyền mà tài khoản B1 đã đăng nhập có thể truy cập. Thu hồi trong **Settings → Developer → Connected Apps** trong B1 Admin.

### Cách hoạt động

API B1 cung cấp một endpoint MCP duy nhất tại `/mcp`. Claude kết nối với endpoint này, xác thực bằng khóa `cak_…` của bạn, và được cấp quyền truy cập bốn công cụ:

| Công cụ | Chức năng |
|---|---|
| `list_endpoints` | Liệt kê các endpoint REST mà Claude có thể gọi, có thể lọc theo đường dẫn. Dùng để khám phá. |
| `describe_endpoint` | Trả về một bản tóm tắt ngắn và ví dụ yêu cầu/phản hồi cho một endpoint cụ thể. |
| `api_call` | Thực sự gọi một endpoint REST với tư cách người dùng đã xác thực. |
| `describe_page_builder` | Hướng dẫn xây dựng và chỉnh sửa các trang website nhà thờ của bạn, mà Claude đọc trước khi làm việc với nội dung website. |

Đây chính là bề mặt `/membership/people`, `/giving/donations`, `/attendance/visits`, v.v. mà B1 Admin của bạn sử dụng. Mọi quy tắc phân quyền đều được áp dụng giống hệt nhau. Các endpoint của FreePlay (lessons.church) được liệt kê dưới `/lessons/*`; các lệnh gọi của Claude tới chúng sẽ được chuyển tiếp đến FreePlay với cùng người dùng và cùng quyền hạn.

### An toàn và giới hạn

- **Cách ly theo nhà thờ.** Khóa API chỉ tương ứng với một nhà thờ. Claude không có cách nào để xem dữ liệu của các nhà thờ khác.
- **Giới hạn theo quyền.** Nếu bạn gỡ bỏ một quyền khỏi người đã tạo khóa trong B1 Admin, Claude sẽ mất quyền đó ngay trong lần gọi tiếp theo.
- **Có thể thu hồi.** Xóa khóa trong **Settings → Developer → API Keys**, và quyền truy cập của Claude sẽ kết thúc ngay lập tức.
- **Danh sách chặn.** Webhook của nhà cung cấp, các endpoint quản trị client OAuth và tuyến `apiEmails` chỉ dành cho nhà điều hành không thể được gọi qua MCP.
- **Giới hạn kích thước phản hồi.** Một phản hồi công cụ đơn lẻ bị giới hạn ở 64 KB để các danh sách dài không làm đầy ngữ cảnh của Claude. Khi điều này xảy ra, Claude sẽ thu hẹp truy vấn bằng bộ lọc.
- **Nhật ký kiểm toán.** Các thay đổi dữ liệu đi qua cùng nhật ký kiểm toán như các hành động trong B1 Admin. Bạn có thể xem lại trong **Settings → Audit Log**.

### Khắc phục sự cố

**Claude yêu cầu email và mật khẩu B1 để dùng FreePlay:** bạn đang dùng phiên bản 1.1.0 của tiện ích máy tính. Tải và cài đặt lại để cập nhật. Các phiên bản mới hơn chỉ cần khóa của bạn.

**Claude báo lỗi "Unauthorized" hoặc 401:** token bearer bị thiếu, sai định dạng, hoặc khóa đã bị thu hồi. Nếu bạn dùng tiện ích, hãy mở **Settings → Extensions → B1 (ChurchApps)** trong Claude và dán lại khóa. Nếu không, hãy kiểm tra lại tiêu đề `Authorization: Bearer cak_…` (lưu ý dấu cách và từ `Bearer` viết đúng như vậy).

**Một lệnh gọi công cụ trả về 403:** khóa API không có phạm vi cho endpoint đó. Thêm phạm vi trong **Settings → Developer → API Keys** (bạn sẽ cần tạo khóa mới, vì không thể thay đổi phạm vi tại chỗ), rồi dán khóa mới vào cài đặt của tiện ích hoặc cấu hình của Claude.

**Claude không tìm thấy endpoint:** hãy yêu cầu Claude gọi `list_endpoints` với bộ lọc, ví dụ *"dùng list_endpoints với bộ lọc 'donations' để tìm đường dẫn đúng"*. Danh sách tuyến được tạo từ API đang hoạt động, vì vậy bất kỳ thứ gì bạn có thể gọi bằng `curl` đều có ở đó.

**Phát triển cục bộ:** thay `https://api.churchapps.org/mcp` bằng `http://localhost:8084/mcp`. Xác thực và công cụ vẫn giống nhau.

## Liên quan

- [API Keys](/docs/developer/api/api-keys) — tài liệu tham khảo đầy đủ về phạm vi
- [MCP Server (developer reference)](/docs/developer/api/mcp) — chi tiết giao thức và schema công cụ
- [ChatGPT](./chatgpt) — ý tưởng tương tự, dành cho các mô hình của OpenAI
