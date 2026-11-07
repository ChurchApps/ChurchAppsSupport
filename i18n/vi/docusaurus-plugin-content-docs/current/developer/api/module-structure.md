---
title: "Cấu trúc module"
description: "Giải thích cách bố trí các module API: controller, repository, gateway, kiểm tra xác thực, và sáu hàm Lambda chạy mã trong môi trường phát triển B1."
---

# Cấu trúc module

<div class="article-intro">

Mỗi module API đều tuân theo một cấu trúc nội bộ nhất quán gồm controller, repository, model và helper. Hiểu được cách bố trí này sẽ giúp bạn dễ dàng tìm đường trong mã nguồn và thêm chức năng mới vào bất kỳ module nào.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Thiết lập API trên máy cục bộ -- xem [Thiết lập API cục bộ](./local-setup.md)
- Xem qua kiến trúc [Cơ sở dữ liệu](./database.md) để hiểu lớp truy cập dữ liệu

</div>

## Bố cục thư mục

Các module nằm trong `src/modules/{name}/`. Một module điển hình gồm bốn thư mục:

```
src/modules/{name}/
├── controllers/    ← Route handlers (Express endpoints)
├── repositories/   ← Data access layer (typed SQL queries)
├── models/         ← TypeScript interfaces and types
└── helpers/        ← Module-specific business logic
```

Ví dụ, module membership:

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepo.ts
│   ├── GroupRepo.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

Sáu module dữ liệu cốt lõi -- membership, attendance, content, giving, messaging và doing -- đều theo cách bố trí này. Một số module chuyên biệt (chẳng hạn reporting, phục vụ các báo cáo liên module và không sở hữu dữ liệu riêng) nằm cùng với chúng trong `src/modules/`.

## Một ứng dụng, nhiều module

API là một **monolith có cấu trúc module**: các module đánh dấu ranh giới về tổ chức mã nguồn và quyền sở hữu dữ liệu, chứ không phải các dịch vụ riêng biệt. Khi khởi động, controller của mọi module được đăng ký vào một container dependency injection duy nhất, nằm sau một ứng dụng Express, nên toàn bộ API được build, chạy và triển khai như một khối thống nhất -- các hàm được triển khai mô tả bên dưới đều là điểm vào của cùng một ứng dụng này.

Mọi route của module nằm dưới tiền tố URL trùng với tên module:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Cách này giữ cho bề mặt API của mỗi module độc lập, trong khi các client vẫn giao tiếp với một máy chủ duy nhất.

## Controller

Controller định nghĩa các route API của một module. Mỗi module có một base controller riêng (ví dụ `MembershipBaseController`), kế thừa từ `BaseController` dùng chung -- bản thân lớp này được xây dựng trên `CustomBaseController` từ `@churchapps/apihelper`. Các route được đăng ký bằng decorator của Inversify.

```typescript
import express from "express";
import { controller, httpGet } from "inversify-express-utils";
import { MembershipBaseController } from "./MembershipBaseController.js";
import { Permissions } from "../helpers/index.js";

@controller("/membership/people")
export class PersonController extends MembershipBaseController {

  @httpGet("/recent")
  public async getRecent(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      // au = authenticated user context
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

`actionWrapper` xác thực yêu cầu và nạp các repository của module vào `this.repos` trước khi chạy hành động của bạn.

### Decorator định tuyến

| Decorator | Phương thức HTTP |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Decorator `@controller("/base")` đặt đường dẫn gốc cho tất cả các route trong controller.

## Repository

Repository xử lý mọi thao tác với cơ sở dữ liệu. Không sử dụng ORM -- các truy vấn được viết bằng bộ xây dựng truy vấn Kysely, có kiểu dữ liệu theo schema cơ sở dữ liệu của module. File `db/index.ts` của mỗi module cung cấp hàm `getDb()`, trả về instance Kysely có kiểu dữ liệu của module đó.

```typescript
import { injectable } from "inversify";
import { getDb } from "../db/index.js";

@injectable()
export class PersonRepo {
  public async load(churchId: string, id: string) {
    return getDb().selectFrom("people").selectAll()
      .where("id", "=", id)
      .where("churchId", "=", churchId)
      .executeTakeFirst();
  }
}
```

Bên trong controller, các repository của module có thể truy cập qua `this.repos`. Bên ngoài controller, lấy chúng thông qua `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Giao tiếp giữa các module

Mỗi module sở hữu cơ sở dữ liệu riêng (xem [Cơ sở dữ liệu](./database.md)), và một module không bao giờ truy vấn trực tiếp các bảng của module khác. Khi một module cần dữ liệu thuộc về module khác -- ví dụ, module doing cần lấy thông tin người từ membership -- nó đi qua **gateway** của module sở hữu trong `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Mỗi gateway (`MembershipModuleGateway`, `GivingModuleGateway`, v.v.) là một interface TypeScript, quy định chính xác những thao tác nào module sở hữu cung cấp cho phần còn lại của API. Interface chính là hợp đồng: các triển khai hiện tại đọc cơ sở dữ liệu của module sở hữu trong cùng tiến trình, nhưng vì bên gọi chỉ phụ thuộc vào interface, một triển khai có thể được thay thế -- chẳng hạn một triển khai thực hiện các lệnh gọi HTTP -- nếu một module nào đó được tách thành dịch vụ riêng.

:::info
Nếu dữ liệu bạn cần nằm trong module khác và gateway của module đó chưa cung cấp thao tác tương ứng, hãy mở rộng interface của gateway thay vì truy cập trực tiếp vào repository hoặc cơ sở dữ liệu của module kia.
:::

## Xác thực và phân quyền

### Xác thực JWT

Mọi yêu cầu đều được xác thực bằng token JWT do `CustomAuthProvider` xử lý. Token được kiểm tra tự động và ngữ cảnh người dùng đã xác thực (`au`) có sẵn trong mọi hành động của controller.

### Kiểm tra quyền

Sử dụng `au.checkAccess()` để xác minh người dùng hiện tại có quyền cần thiết. Quyền là các hằng số được định nghĩa sẵn, kết hợp một loại nội dung và một hành động:

```typescript
au.checkAccess(Permissions.people.view);    // Read access
au.checkAccess(Permissions.people.edit);    // Write access
```

Nếu người dùng không có quyền cần thiết, một phản hồi lỗi sẽ tự động được trả về.

:::warning
Luôn gọi `au.checkAccess()` trước khi thực hiện bất kỳ thao tác dữ liệu nào. Không bao giờ bỏ qua kiểm tra quyền, kể cả với các endpoint có vẻ chỉ đọc.
:::

## Cấu hình môi trường

Lớp `Environment` xử lý cấu hình cho các môi trường khác nhau:

- **Phát triển cục bộ:** Đọc từ file `.env` ở thư mục gốc của dự án
- **Môi trường đã triển khai:** Đọc từ AWS SSM Parameter Store

```typescript
// Access environment variables
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Lớp trừu tượng này có nghĩa là mã của bạn không cần biết cấu hình được lấy từ đâu.

## Hàm Lambda

Khi được triển khai lên AWS, API chạy dưới dạng sáu hàm Lambda:

| Hàm | Mục đích |
|----------|---------|
| `web` | Xử lý tất cả yêu cầu HTTP REST API |
| `socket` | Quản lý kết nối WebSocket cho các tính năng thời gian thực |
| `timer15Min` | Chạy theo lịch mỗi 30 phút để gửi email thông báo (tên gọi là lịch sử, không phản ánh đúng tần suất) |
| `timerMidnight` | Chạy theo lịch hằng ngày để gửi email tổng hợp và thực hiện bảo trì |
| `timerScheduledTasks` | Chạy theo lịch hằng ngày để xử lý các tự động hóa đến hạn và quy trình làm việc quá hạn |
| `timerWebhooks` | Chạy theo lịch mỗi phút để gửi các webhook đi đang chờ trong hàng đợi |

:::info
Trên máy cục bộ, hàm `web` chạy ở cổng 8084 và hàm `socket` chạy ở cổng 8087. Các hàm timer có thể được kích hoạt thủ công trong quá trình phát triển.
:::

## Bài viết liên quan

- **[Cơ sở dữ liệu](./database.md)** -- Chuỗi kết nối, script schema và các mẫu truy cập dữ liệu
- **[Thiết lập API cục bộ](./local-setup.md)** -- Hướng dẫn thiết lập đầy đủ từng bước
- **[ApiHelper](../shared-libraries/api-helper.md)** -- Thư viện dùng chung cung cấp `CustomBaseController` và middleware xác thực
