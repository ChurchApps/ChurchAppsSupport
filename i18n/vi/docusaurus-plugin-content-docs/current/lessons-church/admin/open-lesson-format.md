---
title: "Định dạng Bài học Mở"
---

# Định dạng Bài học Mở

<div class="article-intro">

Định dạng Bài học Mở là một lược đồ JSON chuẩn hóa, cho phép các nhà cung cấp nội dung bên thứ ba xuất bản chương trình giảng dạy lên Lessons.church. Bất kỳ tổ chức nào lưu trữ một nguồn cấp dữ liệu theo định dạng này đều có thể được thêm làm nhà cung cấp bên ngoài, giúp nội dung của họ có thể duyệt và phát cùng với thư viện có sẵn.

</div>

## Cách hoạt động

Nhà cung cấp lưu trữ hai loại điểm cuối:

1. **Cây Nhà cung cấp** -- Một URL duy nhất trả về toàn bộ danh mục chương trình, khóa học, bài học và địa điểm. Mỗi địa điểm có một URL nguồn cấp dữ liệu trỏ đến nội dung bài học chi tiết.
2. **Nguồn cấp Địa điểm** -- Mỗi địa điểm có một URL, trả về toàn bộ nội dung bài học (các phần, hành động và tệp đa phương tiện).

Khi một hội thánh thêm URL nhà cung cấp của bạn vào Lessons.church, nền tảng sẽ tải cây nội dung để khám phá các nội dung có sẵn, sau đó tải từng nguồn cấp dữ liệu địa điểm khi cần.

## Cây Nhà cung cấp

URL nhà cung cấp của bạn phải trả về một đối tượng JSON có cấu trúc như sau:

```json
{
  "programs": [
    {
      "id": "program-1",
      "name": "Gospel of Mark",
      "slug": "gospel-of-mark",
      "image": "https://example.com/images/mark.jpg",
      "about": "A 12-week study through the Gospel of Mark.",
      "studies": [
        {
          "id": "study-1",
          "name": "The Beginning",
          "slug": "the-beginning",
          "image": "https://example.com/images/study1.jpg",
          "lessons": [
            {
              "id": "lesson-1",
              "name": "The Baptism of Jesus",
              "slug": "baptism-of-jesus",
              "title": "The Baptism of Jesus",
              "image": "https://example.com/images/lesson1.jpg",
              "description": "An introduction to Jesus' ministry.",
              "bottomLine": "God keeps His promises.",
              "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
              "parentQuestion": "What is one promise God has kept in our family?",
              "parentNote": "Pray together thanking God for keeping His promises.",
              "venues": [
                {
                  "id": "venue-1",
                  "name": "Kids",
                  "apiUrl": "https://example.com/feed/venues/venue-1"
                },
                {
                  "id": "venue-2",
                  "name": "Adults",
                  "apiUrl": "https://example.com/feed/venues/venue-2"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### Các trường của cây

| Trường | Kiểu | Mô tả |
|-------|------|-------------|
| `programs[].id` | chuỗi | Mã định danh duy nhất của chương trình |
| `programs[].name` | chuỗi | Tên hiển thị |
| `programs[].slug` | chuỗi | Tên thân thiện với URL |
| `programs[].image` | chuỗi | URL hình ảnh của chương trình (tùy chọn) |
| `programs[].about` | chuỗi | Mô tả (tùy chọn) |
| `studies[].id` | chuỗi | Mã định danh duy nhất của khóa học |
| `studies[].name` | chuỗi | Tên hiển thị |
| `studies[].slug` | chuỗi | Tên thân thiện với URL |
| `studies[].image` | chuỗi | URL hình ảnh của khóa học (tùy chọn) |
| `lessons[].id` | chuỗi | Mã định danh duy nhất của bài học |
| `lessons[].name` | chuỗi | Tên hiển thị |
| `lessons[].slug` | chuỗi | Tên thân thiện với URL |
| `lessons[].title` | chuỗi | Tiêu đề đầy đủ |
| `lessons[].image` | chuỗi | URL hình ảnh của bài học (tùy chọn) |
| `lessons[].description` | chuỗi | Tóm tắt bài học (tùy chọn). Nội dung danh mục dành cho giáo viên khi duyệt thư viện, không phải phần dành cho phụ huynh mang về nhà. |
| `lessons[].bottomLine` | chuỗi | Thông điệp chính một câu dành cho phụ huynh mang về nhà (tùy chọn) |
| `lessons[].verse` | chuỗi | Tham chiếu câu Kinh Thánh cần ghi nhớ và đoạn ngắn (tùy chọn) |
| `lessons[].parentQuestion` | chuỗi | Một câu hỏi để phụ huynh hỏi con ở nhà (tùy chọn) |
| `lessons[].parentNote` | chuỗi | Ghi chú thêm dành cho phụ huynh (tùy chọn, dạng markdown) |
| `venues[].id` | chuỗi | Mã định danh duy nhất của địa điểm |
| `venues[].name` | chuỗi | Tên địa điểm (ví dụ: "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | chuỗi | URL trả về nguồn cấp dữ liệu của địa điểm (xem bên dưới) |

Bốn trường thông điệp dành cho phụ huynh (`bottomLine`, `verse`, `parentQuestion`, `parentNote`) là tùy chọn, có thể bỏ trống ở cả cây và nguồn cấp dữ liệu địa điểm. Nếu bỏ qua, chúng sẽ được coi là trống. Không sao chép `description` vào các trường này.

**Địa điểm** đại diện cho các phiên bản khác nhau của cùng một bài học, được điều chỉnh cho các đối tượng khác nhau (nhóm tuổi, môi trường, v.v.).

## Nguồn cấp Địa điểm

`apiUrl` của mỗi địa điểm phải trả về một đối tượng JSON khớp với lược đồ sau:

```json
{
  "id": "venue-1",
  "name": "Kids",
  "lessonId": "lesson-1",
  "lessonName": "The Baptism of Jesus",
  "lessonImage": "https://example.com/images/lesson1.jpg",
  "lessonDescription": "An introduction to Jesus' ministry.",
  "bottomLine": "God keeps His promises.",
  "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
  "parentQuestion": "What is one promise God has kept in our family?",
  "parentNote": "Pray together thanking God for keeping His promises.",
  "studyName": "The Beginning",
  "studySlug": "the-beginning",
  "programName": "Gospel of Mark",
  "programSlug": "gospel-of-mark",
  "programAbout": "A 12-week study through the Gospel of Mark.",
  "downloads": [],
  "sections": [
    {
      "id": "section-1",
      "name": "Opening Discussion",
      "sort": 1,
      "materials": "Whiteboard and markers",
      "actions": [
        {
          "id": "action-1",
          "actionType": "text",
          "content": "**Key Verse:** Mark 1:9-11",
          "sort": 1
        },
        {
          "id": "action-2",
          "actionType": "question",
          "content": "What do you know about baptism?",
          "sort": 2,
          "role": "Leader"
        },
        {
          "id": "action-3",
          "actionType": "play",
          "content": "Intro Video",
          "sort": 3,
          "files": [
            {
              "id": "file-1",
              "name": "intro-video.mp4",
              "url": "https://example.com/media/intro.mp4",
              "streamUrl": "https://vimeo.com/123456789",
              "fileType": "video/mp4",
              "seconds": 180,
              "bytes": 52428800,
              "thumbnail": "https://example.com/media/intro-thumb.jpg",
              "loop": false
            }
          ]
        }
      ]
    }
  ]
}
```

### Các trường của nguồn cấp Địa điểm

#### Đối tượng gốc

| Trường | Kiểu | Mô tả |
|-------|------|-------------|
| `id` | chuỗi | Mã định danh địa điểm |
| `name` | chuỗi | Tên địa điểm |
| `lessonId` | chuỗi | Mã định danh bài học |
| `lessonName` | chuỗi | Tên hiển thị của bài học |
| `lessonImage` | chuỗi | URL hình ảnh của bài học |
| `lessonDescription` | chuỗi | Tóm tắt bài học (nội dung danh mục) |
| `bottomLine` | chuỗi | Thông điệp chính một câu dành cho phụ huynh mang về nhà (tùy chọn) |
| `verse` | chuỗi | Tham chiếu câu Kinh Thánh cần ghi nhớ và đoạn ngắn (tùy chọn) |
| `parentQuestion` | chuỗi | Một câu hỏi để phụ huynh hỏi con ở nhà (tùy chọn) |
| `parentNote` | chuỗi | Ghi chú thêm dành cho phụ huynh, dạng markdown (tùy chọn) |
| `studyName` | chuỗi | Tên khóa học cha |
| `studySlug` | chuỗi | Slug của khóa học cha |
| `programName` | chuỗi | Tên chương trình cha |
| `programSlug` | chuỗi | Slug của chương trình cha |
| `programAbout` | chuỗi | Mô tả chương trình |
| `downloads` | mảng | Các gói tệp có thể tải xuống |
| `sections` | mảng | Các phần bài học theo thứ tự |

#### Phần (Section)

| Trường | Kiểu | Mô tả |
|-------|------|-------------|
| `id` | chuỗi | Mã định danh phần |
| `name` | chuỗi | Tiêu đề phần |
| `sort` | số | Thứ tự hiển thị |
| `materials` | chuỗi | Ghi chú về tài liệu hoặc chuẩn bị (tùy chọn) |
| `actions` | mảng | Các hành động theo thứ tự trong phần này |

#### Hành động (Action)

| Trường | Kiểu | Mô tả |
|-------|------|-------------|
| `id` | chuỗi | Mã định danh hành động |
| `actionType` | chuỗi | Một trong các giá trị: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | chuỗi | Nội dung văn bản hoặc nhãn đa phương tiện |
| `sort` | số | Thứ tự hiển thị |
| `role` | chuỗi | Tên vai trò, ví dụ "Leader", "Kids" (tùy chọn) |
| `roleId` | chuỗi | Mã định danh vai trò (tùy chọn) |
| `files` | mảng | Các tệp đa phương tiện cho hành động `play` (tùy chọn) |

#### Tệp (File)

| Trường | Kiểu | Mô tả |
|-------|------|-------------|
| `id` | chuỗi | Mã định danh tệp |
| `name` | chuỗi | Tên tệp |
| `url` | chuỗi | URL tải xuống trực tiếp |
| `streamUrl` | chuỗi | URL phát trực tuyến, ví dụ liên kết Vimeo (tùy chọn) |
| `fileType` | chuỗi | Loại MIME (ví dụ `video/mp4`, `image/jpeg`) |
| `seconds` | số | Thời lượng tính bằng giây đối với âm thanh/video (tùy chọn) |
| `bytes` | số | Kích thước tệp tính bằng byte (tùy chọn) |
| `thumbnail` | chuỗi | URL ảnh thu nhỏ (tùy chọn) |
| `loop` | boolean | Có lặp lại đa phương tiện hay không (tùy chọn, mặc định là false) |

#### Tải xuống (Download)

| Trường | Kiểu | Mô tả |
|-------|------|-------------|
| `name` | chuỗi | Tên gói tải xuống (ví dụ "Printable Materials") |
| `files` | mảng | Các tệp trong gói tải xuống này (cùng các trường như File ở trên) |

## Các loại hành động

| Loại | Mục đích |
|------|---------|
| `play` | Phát đa phương tiện -- video, âm thanh hoặc trình chiếu. Bắt buộc phải có `files`. |
| `text` | Nội dung văn bản tĩnh. Hỗ trợ in đậm kiểu markdown (`**text**`). |
| `question` | Câu hỏi thảo luận hoặc suy ngẫm dành cho người tham gia. |
| `quote` | Một trích dẫn nổi bật hoặc đoạn Kinh Thánh. |
| `subhead` | Tiêu đề hoặc đường phân cách trong một phần. |

:::tip
Để xem ví dụ hoạt động của nguồn cấp dữ liệu, bạn có thể xem cây nội dung Lessons.church có sẵn tại `https://api.lessons.church/lessons/public/tree` và tải bất kỳ URL nguồn cấp dữ liệu địa điểm nào từ đó.
:::
