---
title: "出席エンドポイント"
---

# 出席エンドポイント

<div class="article-intro">

出席モジュールでは、キャンパスの場所、礼拝、礼拝時間、出席セッション、訪問、訪問セッションを管理します。どの人がどの礼拝やグループの集まりに出席したかを記録する基盤を提供し、チェックインの流れをサポートするとともに、出席の傾向や集計のレポート機能も備えています。

</div>

**ベースパス:** `/attendance`

## キャンパス

ベースパス: `/attendance/campuses`

標準的な CRUD コントローラー（GenericCrudController を継承）です。CRUD の基底クラスを通じて `getById`、`getAll`、`post`、`delete` のルートを提供します。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 教会のすべてのキャンパスを一覧表示 |
| GET | `/:id` | JWT | — | ID でキャンパスを取得 |
| POST | `/` | JWT | Services.Edit | キャンパスを作成または更新 |
| DELETE | `/:id` | JWT | Services.Edit | キャンパスを削除 |

## 礼拝

ベースパス: `/attendance/services`

GenericCrudController を継承し、CRUD ルートの `getById`、`getAll`、`post`、`delete` を備えています。`getAll`（`GET /`）と `search` エンドポイントは独自の実装で上書きされています。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | すべての礼拝を一覧表示（キャンパス情報を含む） |
| GET | `/:id` | JWT | — | ID で礼拝を取得 |
| GET | `/search?campusId=` | JWT | — | キャンパス ID で礼拝を検索 |
| POST | `/` | JWT | Services.Edit | 礼拝を作成または更新 |
| DELETE | `/:id` | JWT | Services.Edit | 礼拝を削除 |

### 例: キャンパスで礼拝を検索

```
GET /attendance/services/search?campusId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "svc-001",
    "churchId": "church-123",
    "campusId": "abc-123",
    "name": "Sunday Morning"
  }
]
```

## 礼拝時間

ベースパス: `/attendance/servicetimes`

GenericCrudController を継承し、CRUD ルートの `getById`、`post`、`delete` を備えています。`getAll` と `search` エンドポイントは独自の実装です。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | すべての礼拝時間を一覧表示。`?serviceId=` で絞り込み可能。`?include=groups` を追加するとグループのデータを付加。各行には計算済みの `checkinOpen` ブール値が含まれます（礼拝時間にチェックインのスケジュールがあり、そのウィンドウが現在閉じている場合にのみ false）。ウィンドウは、礼拝のキャンパスのタイムゾーン、次に教会のタイムゾーン、次にタイムゾーンを持つ最初のキャンパス、最後に `America/New_York` の順に基づいて計算されます |
| GET | `/:id` | JWT | — | ID で礼拝時間を取得 |
| GET | `/search?campusId=&serviceId=` | JWT | — | キャンパスと礼拝で礼拝時間を検索 |
| GET | `/public/:churchId` | 公開 | — | 教会のキャンパス → 礼拝 → 礼拝時間のツリーを取得。ウェブサイトビルダーの `serviceTimes` 要素で使用されます |
| POST | `/` | JWT | Services.Edit | 礼拝時間を作成または更新。任意のスケジュール項目: `dayOfWeek`（0 = 日曜日 … 6）、`startTime` / `endTime`（`HH:mm`）、`checkinOpenMinutes`（開始前）、`checkinCloseMinutes`（終了後）。チェックインは `dayOfWeek` と `startTime` の両方が設定されている場合にのみ時間で制限されます |
| DELETE | `/:id` | JWT | Services.Edit | 礼拝時間を削除 |

## グループの礼拝時間

ベースパス: `/attendance/groupservicetimes`

グループを特定の礼拝時間に関連付けます。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | すべてのグループと礼拝時間の関連付けを一覧表示。`?groupId=` で絞り込むと、礼拝名付きの関連付けを取得 |
| GET | `/:id` | JWT | — | ID でグループと礼拝時間の関連付けを取得 |
| POST | `/` | JWT | Services.Edit | グループと礼拝時間の関連付けを作成または更新 |
| DELETE | `/:id` | JWT | Services.Edit | グループと礼拝時間の関連付けを削除 |

## 出席記録

ベースパス: `/attendance/attendancerecords`

レポートや表示のために、出席データの読み取り専用の集計ビューを提供します。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/` | JWT | Attendance.View | 個人の出席記録を読み込み。`?personId=` が必要 |
| GET | `/my` | JWT | — | 自分専用: サインインしているメンバー本人の過去 12 か月の出席記録を、新しい順に返します。ユーザーが個人に紐付いていない場合は `401` を返します。B1 Me ページの **My Attendance** セクションを支えています |
| GET | `/tree` | JWT | — | 出席の全ツリー（キャンパス、礼拝、礼拝時間、グループ）を読み込み |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | 任意の絞り込み条件付きで出席の傾向データを読み込み |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | 特定の週の礼拝におけるグループの出席を読み込み |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | 礼拝時間に割り当てられたすべてのグループについて、その日付の `{ groupId, sessionId, attendanceCount }` を返します（`date` は `YYYY-MM-DD` 形式。グループにセッションがない場合 `sessionId` は null）。B1Admin の **まだ出席記録が必要な人** ダイアログを支えています |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | 絞り込み条件（キャンパス、礼拝、礼拝時間、グループ、日付範囲）で出席記録を検索 |

### 例: 出席の傾向

```
GET /attendance/attendancerecords/trend?serviceId=svc-001
Authorization: Bearer <token>
```

```json
[
  { "week": "2025-01-05", "count": 142 },
  { "week": "2025-01-12", "count": 156 },
  { "week": "2025-01-19", "count": 138 }
]
```

## セッション

ベースパス: `/attendance/sessions`

GenericCrudController を継承し、CRUD ルートの `getById` と `delete` を備えています。`getAll` と `save` エンドポイントは独自の実装で、グループリーダーが自分のグループのセッションを管理することも許可しています。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/` | JWT | Attendance.View またはグループリーダー | すべてのセッションを一覧表示。`?groupId=` で絞り込み（名前を含む）。グループリーダーは自分のグループのセッションを閲覧可能 |
| GET | `/:id` | JWT | Attendance.View | ID でセッションを取得 |
| POST | `/` | JWT | Attendance.Edit またはグループリーダー | セッションを作成または更新。グループリーダーは自分のグループのセッションを保存可能 |
| DELETE | `/:id` | JWT | Attendance.Edit | セッションを削除 |

## 訪問

ベースパス: `/attendance/visits`

個々の訪問記録（特定の日付に出席した人）を管理し、チェックインの流れを提供します。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/` | JWT | Attendance.View | すべての訪問を一覧表示。`?personId=` で絞り込み |
| GET | `/:id` | JWT | Attendance.View | ID で訪問を取得 |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View または Attendance.Checkin | 礼拝に参加する人のチェックインデータを読み込み。最後に記録された日付の訪問セッションを含む訪問を返します |
| POST | `/` | JWT | Attendance.Edit | 訪問を作成または更新 |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit または Attendance.Checkin | チェックインデータを送信。訪問と訪問セッションを作成・更新し、古い記録を削除 |
| DELETE | `/:id` | JWT | Attendance.Edit | 訪問を削除 |

### 例: チェックインの流れ

**ステップ 1 — 既存のチェックインデータを読み込む:**

```
GET /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>
```

```json
[
  {
    "id": "visit-001",
    "personId": "person-1",
    "visitDate": "2025-01-19T00:00:00.000Z",
    "visitSessions": [
      {
        "id": "vs-001",
        "sessionId": "sess-001",
        "visitId": "visit-001",
        "session": {
          "id": "sess-001",
          "groupId": "group-001",
          "serviceTimeId": "st-001",
          "sessionDate": "2025-01-19T00:00:00.000Z"
        }
      }
    ]
  }
]
```

**ステップ 2 — チェックインを送信:**

```
POST /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>

[
  {
    "personId": "person-1",
    "visitSessions": [
      {
        "session": { "serviceTimeId": "st-001", "groupId": "group-001" }
      }
    ]
  }
]
```

対象の礼拝時間にチェックインのスケジュールがあり、そのウィンドウが閉じている場合（`checkinOpen` と同じキャンパス優先のタイムゾーン順で計算）、何も保存されず、レスポンスは `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }` になります。定員や奉仕者の比率の違反も 409 を返します（`error: "capacity"` または `"ratio"`）。ある人が今日すでに持っているセッション（チェックインのたびに再送信される）はウィンドウの確認をスキップするため、世帯は先の礼拝時間のウィンドウが閉じた後でも、まだ開いている礼拝時間を追加できます。

## 訪問セッション

ベースパス: `/attendance/visitsessions`

訪問とセッションの関連付け（訪問中に人がどの特定のセッションに出席したか）を管理します。また、簡易記録のエンドポイントと、ダウンロード/エクスポートのエンドポイントも提供します。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/` | JWT | Attendance.View またはグループリーダー | 訪問セッションを一覧表示。`?sessionId=` で絞り込み。グループリーダーは自分のグループの訪問セッションを閲覧可能 |
| GET | `/:id` | JWT | Attendance.View | ID で訪問セッションを取得 |
| GET | `/download/:sessionId` | JWT | Attendance.View | セッションの出席をダウンロード（出席・欠席の状態付きで人の名前を返す） |
| POST | `/` | JWT | Attendance.Edit | 訪問セッションを作成または更新 |
| POST | `/log` | JWT | Attendance.Edit またはグループリーダー | 人の出席をセッションに簡易記録。必要に応じて訪問を自動作成。グループリーダーは自分のグループの出席を記録可能 |
| DELETE | `/:id` | JWT | Attendance.Edit | ID で訪問セッションを削除 |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit またはグループリーダー | 人をセッションから削除。訪問セッションを削除し、残りのセッションがなければ親の訪問も削除。グループリーダーは自分のグループの出席を削除可能 |

### 例: 出席を簡易記録

```
POST /attendance/visitsessions/log
Authorization: Bearer <token>

{
  "personId": "person-001",
  "visitSessions": [
    { "sessionId": "sess-001" }
  ]
}
```

```json
{}
```

### 例: セッションの出席をダウンロード

```
GET /attendance/visitsessions/download/sess-001
Authorization: Bearer <token>
```

```json
[
  {
    "id": "vs-001",
    "personId": "person-001",
    "visitId": "visit-001",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "John Smith",
    "status": "present"
  },
  {
    "id": "",
    "personId": "person-002",
    "visitId": "",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "Jane Doe",
    "status": "absent"
  }
]
```

## 連続出席

ベースパス: `/attendance/streaks`

個人の出席の連続記録（人が連続して出席した週数）を追跡します。エンゲージメントの指標やゲーミフィケーションに役立ちます。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/person/:personId` | JWT | — | 個人の出席の連続記録を読み込み |

## 関連ページ

- [メンバーシップのエンドポイント](./membership) — 個人、グループ、役割、教会の管理
- [認証と権限](./authentication) — ログインの流れ、JWT、権限モデル
- [モジュール構造](../module-structure) — コード構成のパターン
