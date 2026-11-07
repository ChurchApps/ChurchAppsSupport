---
title: "持ち込みストレージ（BYOS）"
---

# 持ち込みストレージ（BYOS）

教会には約100MBの無料のホスト型ファイルストレージが提供されています（`/content/files` の領域：ウェブサイトのファイルやグループ資料）。BYOSを使うと、教会独自のクラウドストレージを接続できます。対応しているのは **Google Drive、Dropbox、OneDrive、および任意のS3互換バケット（AWS S3、Cloudflare R2、Backblaze B2）** です。接続後は、新しいアップロードが教会自身のアカウントに保存されるため、プラットフォーム側の上限はありません。ChurchAppsは引き続き無料で、制限となるのは教会自身のアカウントの容量だけです。

## プロバイダーの接続点

BYOSは、[MinistryStuff](./ministrystuff) 向けに作られたストレージの接続点を再利用します。`Packages/apihelper` の `IStorageProvider` が、`content.storageProviders` テーブルをもとに `StorageResolver` によって教会ごとに解決されます。シングルトンの `churchapps` や `ministrystuff` プロバイダーとは異なり、BYOSプロバイダーは教会ごとの認証情報を保持するため、`StorageResolver.forChurch` はリクエストごとに、教会の行から実体を生成します。実装は `Api/src/modules/content/helpers/` にリゾルバーと並んで配置されています。`GoogleDriveStorageProvider`、`DropboxStorageProvider`、`OneDriveStorageProvider`、`S3CompatibleStorageProvider` のほか、OAuthトークン交換と単一実行のトークン更新（Dropboxはリフレッシュトークンを毎回ローテーションするため、`ProviderProxyController` と同じ方法で重複したリフレッシュを排除します）を担う `ByosAuth` があります。

`storageProviders` には認証情報が保存されます。OAuthの3点セット（`accessToken`、`refreshToken`、`tokenExpiresAt`）は暗号化されます。S3の場合は `apiKey`、`apiSecret`、そして `settings` のJSON（`{endpoint, region, bucket, publicBase}`）が使われます。トークンがクライアントに渡ることはありません。`GET /content/storage/providers` は機密情報を伏せ字にし、`connected` の真偽値を返します。

## アップロードの流れ

従来と同じ3ステップの仕組みですが、事前署名（presign）の形式が拡張されています。`POST /content/files/postUrl` は `PresignedPostData` を返します。この応答には、任意で `method`、`rawBody`、`headers`、`chunkSize`、`externalIdField` が含まれるようになりました。

| プロバイダー | 事前署名 | クライアントの送信方法 |
|---|---|---|
| churchapps（既定） | S3の事前署名POST | マルチパートフォーム（従来方式） |
| Google Drive | 再開可能なアップロードセッション（`drive.file` スコープ） | セッションURIへの単一のPUT |
| Dropbox | `files/get_temporary_upload_link`（4時間有効） | 生のPOST |
| OneDrive | `createUploadSession`（approot） | 分割PUT（20MiB単位、Graphの320KiBの倍数） |
| S3互換 | 事前署名PUT（B2はPOSTポリシーに非対応） | 生のPUT |

`FileHelper.uploadPresignedFile`（`@churchapps/helpers`）はすべての形式を処理します。応答にプロバイダーのファイルIDが含まれている場合（Driveの場合）はそれを返します。クライアントはそのIDを `POST /content/files` の登録時に `externalId` として渡します。`files.provider` と `files.externalId` によって、データの保存場所が記録されます（Driveならファイル ID、それ以外はパス）。100MBの容量チェックは、解決されたプロバイダーが `churchapps` の場合にのみ適用されます。

## 公開ダウンロード

コンシューマー向けクラウドは直接リンクできません。Driveのリンクは転送量の上限に達し、Dropbox や OneDrive のリンクは期限切れになります。そのため、OAuthの3点セットを使う場合は、`contentPath` が安定したAPIのルートを指すようにします。`GET /content/files/download/:id`（匿名アクセス可）はファイルの行を読み込み、プロバイダーの `getDownloadUrl`（`webContentLink`、`get_temporary_link`、`@microsoft.graph.downloadUrl`）を使って短時間有効な直接リンクを発行します。このリンクは30分間メモリにキャッシュされ、`Cache-Control: max-age=300` を付けて302リダイレクトで返されます。転送データはブラウザとプロバイダーの間で直接やり取りされ、APIを経由しません。S3互換の場合はリダイレクトを行わず、`contentPath` は安定した `publicBase + key` のURLになります（バケットで公開読み取りとCORSのPUTを許可しておく必要があります）。

削除とダウンロードは `files.provider` によってルーティングされます（`StorageResolver.forFile`）。この列を持たない従来の行は、URLのプレフィックスによるルーティングにフォールバックします。BYOSファイルの名前変更はデータベース上の操作のみです（バイト列は名前ではなく `externalId` で参照されるため）。ファイルが残っているプロバイダーを切断した場合、その行は削除されず、論理的に無効化されます。トークンは保持されるため、ダウンロードと削除は引き続き機能します。

## 接続方法（B1Admin → 設定 → ファイルストレージ）

OAuthの3点セットは、コンテンツプロバイダーと同じリレーの流れを使います。ポップアップ → プロバイダーの同意 → `{membershipApi}/oauth/relay/callback` → B1Adminがリレーのセッションを確認 → `POST /content/storage/exchange` がサーバー側でコードをトークンに交換します。クライアントシークレットはサーバーの外に出ません。シークレットは、Googleが `GOOGLE_DRIVE_CLIENT_SECRET`、OneDriveが `ONEDRIVE_CLIENT_SECRET`、Dropboxは PKCE を使うパブリッククライアントです。クライアントIDは `B1Admin/src/settings/components/byosProviders.ts` と `Api .../ByosAuth.ts` にあります。スコープは意図的に最小限にしています。Googleは `drive.file`（アプリが作成したファイルのみ。制限付きスコープの審査は不要）、OneDriveは `Files.ReadWrite.AppFolder`、Dropboxはアプリ専用フォルダへのアクセスです。S3は単純な認証情報のフォームです。

範囲に関する注意：BYOSの対象は `/content/files` の領域のみです。ギャラリー画像、サムネイル、ロゴ、人物の写真は、既定のプロバイダーに残ります（サイズが小さく、CDNで配信され、画像が最適化されているため）。クライアントは `postUrl` のリクエストボディに `platformStorage: true` を含めることもできます。これにより、教会のBYOS設定に関係なく、そのアップロードを既定のchurchappsプロバイダーに固定できます。FreeShowはこの仕組みを、`files/group/{teamId}/current.zip` の同期状態に使っています。この状態は公開のコンテンツホストから直接読み取られ、ファイルの行として登録されることはありません。
