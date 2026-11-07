---
title: "Claude"
---

# Claude

<div class="article-intro">

Claude に教会について平易な英語（日本語でも可）で質問すると、B1 のデータから回答します。FreePlay のレッスンやクラスルームのデータも対象です。「日曜日に初めて来た来訪者は何人でしたか？」や「今月、小グループに参加した人は誰ですか？」といった質問や、「ウェブサイトに Events という新しいページを追加して」のような操作の依頼もできます。設定には 3 分もかからず、ソフトウェアのインストールや専門的な知識も必要ありません。

</div>

<div class="prereqs">
<h4>必要なもの</h4>

- **Claude のアカウント。** **無料プランでも利用できます**。試してみるのに適しています。ただし無料アカウントには 1 日のメッセージ数の上限があり、B1 でデータを調べると上限を早く使い切ってしまいます。定期的に使う場合は **Claude Pro**（月額約 20 ドル）をおすすめします。
- **B1 のログイン情報。** B1 Admin で使っているものと同じです。

</div>

:::tip おすすめ — 無料で試せます
Claude は B1 を AI に接続する最も簡単な方法で、Claude の**無料プラン**で利用できます。教会で有料プランを契約する前に試してみるのに最適です。
:::

接続方法は 2 つあります。**方法 1 が最も簡単**です。キーは不要で、何もインストールする必要もありません。

## 方法 1 — B1 でサインイン（最も簡単）

Claude のウェブサイト、デスクトップアプリ、スマートフォンアプリで利用できます。一度設定すれば、すべてのデバイスで使えます。

### 手順 1 — Claude のコネクタ設定を開く

1. [claude.ai](https://claude.ai) にアクセスし、サインインします（無料アカウントを作成することもできます）。
2. 左下隅にある自分の名前をクリックし、**Settings**（設定）→ **Connectors**（コネクタ）を選びます。

### 手順 2 — B1 を追加する

1. **Add**（追加）をクリックし、続けて **Add custom connector**（カスタムコネクタを追加）をクリックします。
2. **Name**（名前）に `B1` と入力します。
3. **URL** に `https://api.churchapps.org/mcp` を貼り付けます。
4. ほかの項目はそのままにして、**Add**（追加）をクリックします。

### 手順 3 — B1 にサインインする

1. **Connect**（接続）をクリックします。B1 のサインインページが開きます。
2. B1 のアカウントでログインします。複数の教会に所属している場合は、画面上部に正しい教会が表示されているか確認してください。
3. B1 に、Claude が実行しようとしている操作の一覧が表示され、**claude.ai** に戻ることが示されます。**Allow**（許可）をクリックします。

Claude に戻り、B1 が接続済みと表示されれば完了です。

### 手順 4 — 質問してみる

**新しいチャット**を開き、次のような質問を試してみてください。

- 「教会には何人いますか？」
- 「アクティブなグループを一覧にしてください。」
- 「今月の献金を基金別に要約してください。」
- 「過去 30 日間に教会に加わった人は誰ですか？」

初回は、Claude が B1 の利用許可を求めてきます。**Allow**（許可）をクリックしてください。

## 方法 2 — B1 キーを使うデスクトップ拡張機能

Claude に権限を限定したキー（たとえば閲覧のみ）を渡したい場合に使ってください。Mac または Windows 版の Claude デスクトップアプリで利用できます。キーを作成するには、B1 で教会の設定を管理する権限が必要です。

### 手順 1 — Claude アプリを入手する

[claude.com/download](https://claude.com/download) から Claude アプリをダウンロードし、インストールして開き、サインインします。

### 手順 2 — B1 キーを作成する

キーは、Claude が *あなたの* 教会の B1 にアクセスするためのものです。Claude 専用のパスワードのようなものと考えてください。

1. [B1 Admin](https://admin.b1.church) にログインし、[Settings → Developer](https://admin.b1.church/settings/developer)（設定 → 開発者）を開きます。
2. **API Keys**（API キー）タブで **New API Key**（新しい API キー）をクリックします。
3. **Name**（名前）に `Claude` と入力します。
4. **Scopes**（スコープ）で、Claude に許可する操作を選びます。各領域には **read**（読み取り）のチェックボックスと **write**（書き込み）のチェックボックスがあります。読み取りは参照のみ、書き込みは変更ができる権限です。よくわからない場合は、まず **read** のチェックボックスだけをオンにしてください。後から、より多くの権限を持つ新しいキーを作成することもできます。
5. **Save**（保存）をクリックし、**Copy**（コピー）でキーをコピーします。キーは一度しか表示されないので、すぐに手順 3 に進んでください。

### 手順 3 — Claude に B1 を追加する

1. [B1 拡張機能をダウンロード](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb)します。
2. ダウンロードしたファイル（`b1-churchapps.mcpb`）を**ダブルクリック**します。Claude が開き、**B1 (ChurchApps)** と表示されます。
3. **Install**（インストール）をクリックします。
4. **B1 API key**（B1 API キー）を求められたら、手順 2 のキーを貼り付けて保存します。
5. **Claude を完全に終了します**（Mac: **Cmd+Q** · Windows: タスクバーの Claude アイコンを右クリック → **Quit**（終了））。その後、もう一度開きます。

ダブルクリックで Claude が開かない場合は、Claude の **Settings → Extensions → Advanced settings → Install Extension…**（設定 → 拡張機能 → 詳細設定 → 拡張機能をインストール…）を開き、ダウンロードしたファイルを選択してください。その後、新しいチャットを開いて質問してみてください。

:::tip すでに拡張機能をインストール済みの場合
特に何もする必要はありません。FreePlay も同じ接続を通じて利用できます。例外はバージョン 1.1.0 で、B1 のメールアドレスとパスワードを求められました。更新するには拡張機能をもう一度ダウンロードしてインストールしてください。キーはそのまま使えます。
:::

## 安全性について

- Claude が見られるのは **あなたの教会の** データだけです。
- **サインイン方式（方法 1）**：Claude が実行できるのは、あなた自身の B1 ログインでできることの範囲までです。B1 のサインインページでは、**Allow**（許可）をクリックする前に、Claude ができる操作がすべて表示されます。
- **キー方式（方法 2）**：Claude は、そのキーで許可された操作しか実行できません。**read** だけをオンにしたキーでは、参照はできても変更は一切できません。FreePlay も同じキーで、同じ仕組みで動作します。
- **接続を解除する方法**：B1 Admin で **Settings → Developer**（設定 → 開発者）を開き、方法 1 の場合は **Connected Apps**（接続済みアプリ）でアプリを取り消し、方法 2 の場合は **API Keys**（API キー）でキーを削除します。アクセスはすぐに停止します。また、Claude の B1 コネクタで **Disconnect**（切断）をクリックすることもできます。

## 料金

B1 との接続は無料です。ChurchApps の一部として提供されています。Claude にも無料プランがあります。Claude Pro（月額約 20 ドル）にすると、利用量が大幅に増えます。詳しくは [claude.com/pricing](https://claude.com/pricing) をご覧ください。

## 技術的な詳細

このページの残りの部分は、技術的な知識のあるユーザーや AI アシスタント向けです。スコープ、ほかの接続方法、仕組みについて説明します。

### スコープ

Claude は、B1 API に組み込まれた **Model Context Protocol (MCP) サーバー**（`https://api.churchapps.org/mcp`）を通じて B1 と通信します。すべての呼び出しは、B1 Admin からのリクエストと同じ認証、権限、教会ごとの範囲制限のルールを経由します。Claude が使えるのは API キーの**権限とスコープ**に限られ、Webhook、OAuth の管理用エンドポイント、その他の運営者専用の経路にはアクセスできません。

よく使われる基本的なスコープの組み合わせは次のとおりです。

- **閲覧専用のアシスタント**：`people:read`、`groups:read`、`attendance:read`、`donations:read`、`content:read`
- **閲覧に加えてメモやタスクを追加**：`people:write` を追加します
- **運営全般を支援するアシスタント**：必要な `:write` スコープを追加します

`donations:read` のキーを使うと、Claude は献金を集計できますが、献金を記録することはできません。`people:write` のキーを使うと、人を追加できますが、献金は閲覧できません。各スコープで何ができるかは [API Keys](/docs/developer/api/api-keys) をご覧ください。

### ほかの接続方法

#### Claude Code（CLI）

ターミナルで次のように入力します。

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

これで完了です。Claude Code のどのセッションでも `/mcp` と入力すると、`b1` サーバーに接続されているか確認できます。その後、教会について何でも質問できます。

#### Claude Desktop — 手動設定（上級者向け）

拡張機能を使いたくない場合は、Claude Desktop の設定ファイルを編集します。

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

`mcp-remote` を使って B1 に接続する `b1` サーバーの項目を追加します（[Node.js](https://nodejs.org) が必要です）。

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

Claude Desktop を再起動します。チャット入力欄のコネクタメニューに、`b1` とそのツールが表示されます。

#### Claude.ai（ウェブ）— カスタムコネクタ

上記の**方法 1**を参照してください。このコネクタは OAuth 2.1 を使用します。Claude は `https://api.churchapps.org/.well-known/oauth-protected-resource` から B1 の認可サーバーを見つけ、Dynamic Client Registration で自身を登録し、PKCE を使ってサインインします。Team プランおよび Enterprise プランでは、組織の所有者が先に組織としてコネクタを追加する必要がある場合があります。Claude は特定のスコープを要求しないため、同意画面には、サインイン中の B1 アカウントがアクセスできるすべての項目が表示されます。取り消すには、B1 Admin の **Settings → Developer → Connected Apps**（設定 → 開発者 → 接続済みアプリ）を開きます。

### 仕組み

B1 API は、単一の MCP エンドポイント `/mcp` を公開しています。Claude はこのエンドポイントに接続し、`cak_…` キーで認証して、次の 4 つのツールを利用できるようになります。

| ツール | 機能 |
|---|---|
| `list_endpoints` | Claude が呼び出せる REST エンドポイントを一覧表示します。パスで絞り込めます。探索に使います。 |
| `describe_endpoint` | 特定のエンドポイントの簡単な概要と、リクエストおよびレスポンスの例を返します。 |
| `api_call` | 認証されたユーザーとして、REST エンドポイントを実際に呼び出します。 |
| `describe_page_builder` | 教会のウェブサイトのページを作成および編集するためのガイドです。Claude はウェブサイトのコンテンツを扱う前にこれを読みます。 |

これは B1 Admin が使っている `/membership/people`、`/giving/donations`、`/attendance/visits` などと同じ API です。すべての認可ルールがそのまま適用されます。FreePlay（lessons.church）のエンドポイントは `/lessons/*` の下に一覧表示されます。これらに対する Claude の呼び出しは、同じユーザーの権限で FreePlay に転送されます。

### 安全性と制限

- **教会ごとの分離。** API キーは 1 つの教会に紐づきます。Claude は他の教会のデータを見ることができません。
- **権限ごとの制御。** キーを発行した人の権限を B1 Admin で削除すると、Claude は次の呼び出しからすぐにその権限を失います。
- **取り消し可能。** **Settings → Developer → API Keys**（設定 → 開発者 → API キー）でキーを削除すると、Claude のアクセスはすぐに終了します。
- **ブロックリスト。** プロバイダーの Webhook、OAuth クライアントの管理用エンドポイント、運営者専用の `apiEmails` ルートは、MCP から呼び出すことができません。
- **レスポンスサイズの上限。** 1 回のツールレスポンスは 64 KB に制限されています。長いリストで Claude のコンテキストがあふれないようにするためです。この上限に達した場合、Claude はフィルターを使ってクエリを絞り込みます。
- **監査ログ。** 変更操作は、B1 Admin の操作と同じ監査ログに記録されます。**Settings → Audit Log**（設定 → 監査ログ）で確認できます。

### トラブルシューティング

**Claude が FreePlay を使うために B1 のメールアドレスとパスワードを求める：** デスクトップ拡張機能のバージョン 1.1.0 を使っています。拡張機能をダウンロードし、インストールし直してください。新しいバージョンでは、キーだけを使用します。

**Claude が「Unauthorized」または 401 と報告する：** Bearer トークンがないか、形式が正しくないか、キーが取り消されています。拡張機能を使っている場合は、Claude の **Settings → Extensions → B1 (ChurchApps)**（設定 → 拡張機能 → B1 (ChurchApps)）を開き、キーをもう一度貼り付けてください。そうでない場合は、`Authorization: Bearer cak_…` ヘッダーを確認してください（`Bearer` という文字列と、その後のスペースに注意してください）。

**ツール呼び出しが 403 を返す：** API キーに、そのエンドポイント用のスコープがありません。**Settings → Developer → API Keys**（設定 → 開発者 → API キー）でスコープを追加してください。スコープは既存のキーで変更できないため、新しいキーを作成する必要があります。その後、新しいキーを拡張機能の設定、または Claude の設定に貼り付けてください。

**Claude がエンドポイントを見つけられない：** `list_endpoints` をフィルター付きで呼び出すよう依頼してください。例：*「list_endpoints をフィルター 'donations' で使って、正しいパスを探して」*。ルートの一覧はライブ API から生成されるため、`curl` でアクセスできるものはすべて含まれています。

**ローカル開発：** `https://api.churchapps.org/mcp` を `http://localhost:8084/mcp` に置き換えてください。認証もツールも同じです。

## 関連項目

- [API Keys](/docs/developer/api/api-keys) — スコープの完全なリファレンス
- [MCP Server (developer reference)](/docs/developer/api/mcp) — プロトコルの詳細とツールのスキーマ
- [ChatGPT](./chatgpt) — 同じ考え方で、OpenAI のモデルを使う方法
