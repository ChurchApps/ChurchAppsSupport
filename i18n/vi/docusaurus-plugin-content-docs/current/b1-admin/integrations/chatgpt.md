---
title: "ChatGPT"
description: "Kết nối ChatGPT với dữ liệu B1 của hội thánh bằng khóa API để hỏi bằng ngôn ngữ đời thường về người, dâng hiến và điểm danh trong B1 Admin."
---

# ChatGPT

<div class="article-intro">

Kết nối ChatGPT với dữ liệu B1 của hội thánh bạn và đặt câu hỏi bằng tiếng Việt đơn giản — ChatGPT sẽ trả lời dựa trên hồ sơ trực tiếp của hội thánh. Bạn cũng có thể nhờ nó giúp những việc cần nhiều bước thực hiện trong B1 Admin.

**Một số câu hỏi bạn có thể hỏi:**
- *"Cho tôi xem danh sách những người đã tham dự tuần trước nhưng chưa được phân vào nhóm nhỏ nào"*
- *"Tóm tắt tiền quyên góp trong tháng này theo quỹ"*
- *"Những thành viên mới nhất của chúng ta là ai, và chúng ta đã liên hệ với họ chưa?"*
- *"Tôi không biết làm thế nào để làm X trong B1 — bạn có thể hướng dẫn tôi từng bước không?"*

</div>

<div class="prereqs">
<h4>Bạn cần chuẩn bị</h4>

- **Ứng dụng ChatGPT trên máy tính** dành cho Mac hoặc Windows
- **Gói ChatGPT trả phí** (Plus hoặc cao hơn). Tài khoản ChatGPT miễn phí không thể kết nối với B1.
- **Tài khoản đăng nhập B1** có quyền quản lý cài đặt hội thánh (cần thiết để tạo khóa). Chưa có? Hãy hỏi quản trị viên B1 của hội thánh.

</div>

:::tip Khuyến nghị: hãy thử Claude trước — miễn phí
[Claude](./claude.md) kết nối với B1 trên **gói miễn phí** và thiết lập chỉ trong chưa đến 3 phút — chỉ cần thêm B1 làm connector và đăng nhập bằng tài khoản B1 của bạn. Không cần khóa. Đây là cách dễ nhất để hội thánh bạn thử AI với B1 trước khi trả tiền cho bất kỳ dịch vụ nào.
:::

## Thiết lập

Giao diện trên phiên bản ChatGPT của bạn có thể hơi khác một chút.

---

**Bước 1 — Tạo khóa B1 của bạn**

Khóa này cho phép ChatGPT truy cập B1 của *hội thánh bạn* — hãy xem nó như một mật khẩu chỉ dành riêng cho ChatGPT.

1. Đăng nhập vào [B1 Admin](https://admin.b1.church) và vào [Settings → Developer](https://admin.b1.church/settings/developer).
2. Trên tab **API Keys**, nhấn **New API Key** và đặt tên là `ChatGPT`.
3. **Phạm vi (Scopes):** chọn những gì ChatGPT được phép làm. Mỗi khu vực có một ô **read** (chỉ xem) và một ô **write** (thay đổi dữ liệu). Chưa chắc? Hãy chỉ chọn các ô **read** để bắt đầu.
4. Nhấn **Save**, sau đó nhấn **Copy** để sao chép khóa (khóa bắt đầu bằng `cak_`). Khóa chỉ hiển thị một lần.

---

**Bước 2 — Nhấn vào tên của bạn ở góc dưới bên trái ChatGPT**

![Nhấn vào tên hồ sơ của bạn](/img/guides/chatgpt-mcp/01.png)

---

**Bước 3 — Nhấn Settings**

![Nhấn Settings từ menu](/img/guides/chatgpt-mcp/02.png)

---

**Bước 4 — Nhấn Plugins ở thanh bên trái**

![Nhấn Plugins trong mục Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Bước 5 — Nhấn tab MCPs**

![Nhấn tab MCPs](/img/guides/chatgpt-mcp/04.png)

Bạn sẽ thấy các máy chủ MCP mà bạn đã thêm trước đó tại đây.

---

**Bước 6 — Nhấn Add → Add MCP server**

![Nhấn Add rồi Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Bước 7 — Điền biểu mẫu và nhấn Save**

![Biểu mẫu kết nối MCP tùy chỉnh](/img/guides/chatgpt-mcp/07.png)

Nhấn **Streamable HTTP**, sau đó điền:

| Trường | Nội dung cần nhập |
|---|---|
| **Name** | `B1 Church` (hoặc tên bất kỳ bạn muốn) |
| **Type** | Nhấn **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Để trống |
| **Headers** | Nhấn **+ Add header** → Key: `Authorization` → Value: xem bên dưới |

![Ví dụ đã điền, cho thấy Authorization ở ô Key và khóa Bearer ở ô Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_khoacuaban` — từ Bearer, một khoảng trắng, rồi đến khóa của bạn

Nhấn **Save**.

Vậy là xong! Quay lại một cuộc trò chuyện và hỏi điều gì đó như *"Hội thánh chúng tôi có bao nhiêu người?"*, ChatGPT sẽ lấy câu trả lời trực tiếp từ B1.

---

## Có an toàn không?

- ChatGPT chỉ có thể xem dữ liệu của **hội thánh bạn**.
- Nó chỉ có thể làm những gì khóa của bạn cho phép — khóa chỉ được chọn ô **read** sẽ chỉ có thể xem và không bao giờ thay đổi được gì.
- Để tắt, hãy xóa khóa trong B1 Admin tại **Settings → Developer**. Quyền truy cập sẽ dừng ngay lập tức.

## Chi phí là bao nhiêu?

Kết nối B1 miễn phí — đây là một phần của ChurchApps. ChatGPT cần gói trả phí (Plus hoặc cao hơn) để kết nối; xem bảng giá của OpenAI.

## Chi tiết kỹ thuật

Phần còn lại của trang này dành cho người dùng kỹ thuật và trợ lý AI. Máy chủ MCP của B1 nằm tại `https://api.churchapps.org/mcp` (Streamable HTTP) và nhận khóa API dưới dạng tiêu đề `Authorization: Bearer cak_…`. Xem [tài liệu tham khảo máy chủ MCP dành cho nhà phát triển](/docs/developer/api/mcp).

### Custom GPT với Actions

Custom GPT cho phép bạn tạo một trợ lý chuyên dụng mà cả nhóm có thể cùng sử dụng — họ mở một liên kết và bắt đầu đặt câu hỏi mà không cần thiết lập gì. Cần tài khoản ChatGPT Plus, Team hoặc Enterprise và khoảng 10 phút.

#### 1. Tạo khóa API

Làm theo Bước 1 trong phần Thiết lập ở trên nếu bạn chưa làm.

#### 2. Xây dựng Custom GPT

1. Trong ChatGPT, nhấn vào hồ sơ của bạn → **My GPTs** → **Create a GPT**.
2. Chuyển sang tab **Configure**, đặt tên cho GPT (ví dụ "B1 Assistant") và thêm hướng dẫn:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Cuộn xuống **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** dán khóa `cak_…` của bạn
   - **Auth Type:** Bearer
   - Lưu lại.

4. Trong ô **Schema**, dán đặc tả OpenAPI mẫu sau:

   ```yaml
   openapi: 3.1.0
   info:
     title: B1 API
     version: "1.0"
   servers:
     - url: https://api.churchapps.org
   paths:
     /membership/people:
       get:
         operationId: listPeople
         summary: List people in the church
         parameters:
           - in: query
             name: firstName
             schema: { type: string }
           - in: query
             name: lastName
             schema: { type: string }
           - in: query
             name: email
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/people/{id}:
       get:
         operationId: getPerson
         summary: Get a single person by id
         parameters:
           - in: path
             name: id
             required: true
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/groups:
       get:
         operationId: listGroups
         summary: List groups in the church
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: List donations
         parameters:
           - in: query
             name: personId
             schema: { type: string }
           - in: query
             name: startDate
             schema: { type: string, format: date }
           - in: query
             name: endDate
             schema: { type: string, format: date }
         responses:
           "200":
             description: OK
     /attendance/attendance:
       get:
         operationId: listAttendance
         summary: List attendance records
         parameters:
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: campusId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. Lưu action. Kiểm tra bằng cách hỏi: *"hội thánh có bao nhiêu người?"* — ChatGPT sẽ gọi `listPeople` và trả lời.
6. **Publish** GPT (Only me / Anyone with link / Organization) và chia sẻ liên kết với nhóm của bạn.

#### 3. Sử dụng

Bất kỳ ai có liên kết đều có thể đặt câu hỏi bằng ngôn ngữ tự nhiên. Các phạm vi của khóa vẫn được áp dụng — khóa chỉ đọc sẽ từ chối mọi thao tác ghi, bất kể lược đồ action nói gì.

---

### An toàn và giới hạn

- **Cô lập theo từng hội thánh.** Khóa API chỉ liên kết với một hội thánh. ChatGPT không thể xem dữ liệu của các hội thánh khác.
- **Giới hạn theo quyền.** Khóa chỉ mang các phạm vi bạn đã cấp. Xóa một phạm vi (bằng cách xóa và tạo lại khóa) sẽ cắt quyền truy cập đó ở lần gọi tiếp theo.
- **Thu hồi ngay lập tức.** Xóa khóa trong **Settings → Developer → API Keys** và quyền truy cập sẽ kết thúc ngay.
- **Chia sẻ Custom GPT là chia sẻ dữ liệu.** Mọi người có quyền truy cập GPT đều có thể xem bất cứ thứ gì phạm vi của khóa cho phép. Nên dùng phạm vi hẹp hơn (ví dụ bỏ `donations:read`) đối với GPT được chia sẻ rộng rãi.
- **Nhật ký kiểm tra.** Mọi thay đổi thực hiện qua ChatGPT đều đi qua cùng nhật ký kiểm tra như các thao tác trong B1 Admin — xem tại **Settings → Audit Log**.

### Khắc phục sự cố

**Trình kết nối MCP báo "Unauthorized" hoặc hiển thị lỗi 401:** khóa API của bạn bị thiếu hoặc không đúng. Mở cài đặt trình kết nối và kiểm tra tiêu đề **Authorization**: giá trị phải là từ `Bearer`, một khoảng trắng, rồi đến toàn bộ khóa `cak_…` không có khoảng trắng thừa.

**ChatGPT nói rằng không tìm thấy một số dữ liệu nhất định:** khóa có thể không có đúng phạm vi. Tạo khóa mới trong **Settings → Developer → API Keys** với các phạm vi bổ sung và cập nhật trình kết nối.

**Action của Custom GPT trả về 401:** trong bảng xác thực của action, hãy xác nhận **Auth Type: Bearer** đã được chọn và khóa không bao gồm từ `Bearer` (ChatGPT tự động thêm vào).

**Action của Custom GPT trả về 403:** khóa không có phạm vi cho endpoint đó. Tạo khóa mới với đúng phạm vi và cập nhật GPT.

**Lược đồ action bị từ chối:** ChatGPT yêu cầu OpenAPI 3.1 với ít nhất một mục `paths` và một URL `servers`. Hãy kiểm tra YAML tại [editor.swagger.io](https://editor.swagger.io) trước khi dán.

## Liên quan

- [API Keys](/docs/developer/api/api-keys) — tài liệu đầy đủ về phạm vi
- [MCP Server (tài liệu tham khảo cho nhà phát triển)](/docs/developer/api/mcp) — chi tiết giao thức và lược đồ công cụ
- [Claude](./claude.md) — tương tự, dành cho các mô hình của Anthropic
- [Tài liệu tham khảo REST API](/docs/developer/api/endpoints) — mọi endpoint mà một Custom GPT action có thể gọi
