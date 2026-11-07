---
title: "ChatGPT"
description: "API キーを使って ChatGPT を教会の B1 データに接続し、B1 Admin の人、献金、出席について平易な言葉で質問できるようにします。"
---

# ChatGPT

<div class="article-intro">

ChatGPT を教会の B1 データに接続し、ふつうの言葉で質問できます。回答は教会の最新の記録に基づきます。B1 Admin で複数の手順が必要になる作業についても、手伝ってもらえます。

**質問の例:**
- *「先週出席したのに、小グループに割り当てられていない人を全員見せて」*
- *「今月の献金をファンド別にまとめて」*
- *「最近入会した人は誰か、そしてフォローアップは済んでいるか」*
- *「B1 で X をする方法がわからないのですが、手順を教えてもらえますか」*

</div>

<div class="prereqs">
<h4>必要なもの</h4>

- **ChatGPT デスクトップアプリ**（Mac または Windows 版）
- **有料の ChatGPT プラン**（Plus 以上）。無料の ChatGPT アカウントでは B1 に接続できません。
- **B1 のログイン情報**（教会の設定を管理する権限が必要です。キーを作成するために必要です）。持っていない場合は、教会の B1 管理者に確認してください。

</div>

:::tip 推奨：まずは Claude を試してください。無料です
[Claude](./claude.md) は**無料プラン**で B1 に接続でき、3 分以内に設定できます。B1 のコネクターとして追加し、B1 のアカウントでサインインするだけです。キーは不要です。料金を払う前に、教会で B1 と AI を試す最も簡単な方法です。
:::

## セットアップ

ChatGPT のバージョンによって、画面の表示が少し異なる場合があります。

---

**手順 1 — B1 キーを作成する**

キーは、ChatGPT が*お使いの教会の* B1 にアクセスするためのものです。ChatGPT 専用のパスワードのようなものと考えてください。

1. [B1 Admin](https://admin.b1.church) にログインし、[設定 → Developer](https://admin.b1.church/settings/developer) に移動します。
2. **API Keys** タブで **New API Key** をクリックし、名前を `ChatGPT` にします。
3. **スコープ:** ChatGPT に許可する操作を選択します。各領域には **read**（閲覧のみ）と **write**（変更）のチェックボックスがあります。迷ったら、まずは **read** だけにチェックを入れてください。
4. **Save** をクリックし、**Copy** でキーをコピーします（`cak_` で始まります）。キーは一度しか表示されません。

---

**手順 2 — ChatGPT の左下にあるお名前をクリックする**

![プロフィール名をクリック](/img/guides/chatgpt-mcp/01.png)

---

**手順 3 — 設定をクリックする**

![メニューから設定をクリック](/img/guides/chatgpt-mcp/02.png)

---

**手順 4 — 左のサイドバーにある Plugins をクリックする**

![Integrations の下の Plugins をクリック](/img/guides/chatgpt-mcp/03.png)

---

**手順 5 — MCPs タブをクリックする**

![MCPs タブをクリック](/img/guides/chatgpt-mcp/04.png)

すでに追加済みの MCP サーバーがここに表示されます。

---

**手順 6 — Add → Add MCP server をクリックする**

![Add をクリックしてから Add MCP server をクリック](/img/guides/chatgpt-mcp/06.png)

---

**手順 7 — フォームに入力して Save をクリックする**

![カスタム MCP への接続フォーム](/img/guides/chatgpt-mcp/07.png)

**Streamable HTTP** をクリックし、次の項目に入力します。

| 項目 | 入力内容 |
|---|---|
| **Name** | `B1 Church`（または任意の名前） |
| **Type** | **Streamable HTTP** をクリック |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | 空欄のまま |
| **Headers** | **+ Add header** をクリック → Key: `Authorization` → Value: 下記を参照 |

![Key に Authorization、Value に Bearer キーを入力した例](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — 「Bearer」という単語、スペース、その後にキーを入力します

**Save** をクリックします。

完了です！チャットに戻って、「教会には何人いますか？」などと聞いてみてください。ChatGPT が B1 から直接答えを取得します。

---

## 安全ですか？

- ChatGPT が見られるのは**お使いの教会の**データだけです。
- 許可されたスコープの範囲内でしか操作できません。**read** だけにチェックを入れたキーでは、閲覧はできても変更はできません。
- 無効にするには、B1 Admin の **設定 → Developer** でキーを削除します。すぐにアクセスが止まります。

## 料金はいくらですか？

B1 との接続は無料です。ChatGPT と接続するには有料プラン（Plus 以上）が必要です。詳しくは OpenAI の料金ページをご覧ください。

## 技術的な詳細

このページの残りは、技術に詳しい方と AI アシスタント向けです。B1 の MCP サーバーは `https://api.churchapps.org/mcp`（Streamable HTTP）にあり、API キーを `Authorization: Bearer cak_…` ヘッダーで受け付けます。[MCP Server 開発者向けリファレンス](/docs/developer/api/mcp)をご覧ください。

### アクション付きのカスタム GPT

カスタム GPT を使うと、チーム全体で共有できる専用のアシスタントを作成できます。メンバーはリンクを開くだけで、設定なしに質問を始められます。ChatGPT Plus、Team、または Enterprise アカウントが必要で、作業時間は約 10 分です。

#### 1. API キーを作成する

まだの場合は、上の「セットアップ」の手順 1 に従ってください。

#### 2. カスタム GPT を作成する

1. ChatGPT で、プロフィールをクリック → **My GPTs** → **Create a GPT** の順に選びます。
2. **Configure** タブに切り替え、GPT の名前（例：「B1 Assistant」）を入力し、指示文を追加します。

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. **Actions** までスクロールし、**Create new action** → **Authentication** の順にクリックします。
   - **Authentication type:** API Key
   - **API Key:** `cak_…` のキーを貼り付けます
   - **Auth Type:** Bearer
   - 保存します。

4. **Schema** のボックスに、次の OpenAPI の雛形を貼り付けます。

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

5. アクションを保存します。テストとして「教会には何人いますか？」と質問してみてください。ChatGPT が `listPeople` を呼び出して回答します。
6. GPT を**公開**（Only me / Anyone with link / Organization）し、リンクをチームに共有します。

#### 3. 使う

リンクを持っている人なら誰でも、自然な言葉で質問できます。キーのスコープは引き続き適用されます。読み取り専用のキーは、アクションのスキーマに関係なく書き込みを拒否します。

---

### 安全性と制限

- **教会ごとの分離。** API キーは 1 つの教会だけに紐付きます。ChatGPT は他の教会のデータを見ることはできません。
- **権限の範囲に限定。** キーには付与したスコープだけが含まれます。スコープを削除する（キーを削除して作り直す）と、次の呼び出しからそのアクセスは無効になります。
- **即時に取り消し可能。** **設定 → Developer → API Keys** でキーを削除すれば、すぐにアクセスが終了します。
- **カスタム GPT の共有はデータの共有になります。** GPT にアクセスできる全員が、キーのスコープで許可された範囲を見られます。広く共有する GPT では、より狭いスコープ（例：`donations:read` を省く）を選ぶことをおすすめします。
- **監査ログ。** ChatGPT 経由の変更は、B1 Admin の操作と同じ監査ログに記録されます。**設定 → Audit Log** で確認できます。

### トラブルシューティング

**MCP コネクターに「Unauthorized」と表示される、または 401 エラーが出る:** API キーが未入力か、間違っています。コネクターの設定を開いて **Authorization** ヘッダーを確認してください。値は、単語 `Bearer`、スペース 1 つ、そして `cak_…` で始まるキー全体で、余分なスペースがないようにします。

**ChatGPT が特定のデータを見つけられない:** キーに必要なスコープがない可能性があります。**設定 → Developer → API Keys** で、必要なスコープを追加した新しいキーを作成し、コネクターを更新してください。

**カスタム GPT のアクションが 401 を返す:** アクションの認証パネルで **Auth Type: Bearer** が選ばれていること、そしてキーに `Bearer` の文字を含めていないことを確認してください（ChatGPT が自動的に追加します）。

**カスタム GPT のアクションが 403 を返す:** そのエンドポイントに必要なスコープがキーにありません。正しいスコープで新しいキーを作成し、GPT を更新してください。

**アクションのスキーマが拒否される:** ChatGPT には、少なくとも 1 つの `paths` エントリと `servers` の URL を含む OpenAPI 3.1 が必要です。貼り付ける前に、YAML を [editor.swagger.io](https://editor.swagger.io) で検証してください。

## 関連項目

- [API Keys](/docs/developer/api/api-keys) — スコープの完全なリファレンス
- [MCP Server（開発者向けリファレンス）](/docs/developer/api/mcp) — プロトコルの詳細とツールのスキーマ
- [Claude](./claude.md) — 同じ考え方で、Anthropic のモデルを使う場合
- [REST API リファレンス](/docs/developer/api/endpoints) — カスタム GPT のアクションが呼び出せるすべてのエンドポイント
