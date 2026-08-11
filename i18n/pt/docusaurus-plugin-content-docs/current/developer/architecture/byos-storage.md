---
title: "Armazenamento Traga seu Próprio"
---

# Armazenamento Traga seu Próprio (BYOS)

As igrejas recebem ~100MB de armazenamento de arquivo hospedado gratuito (as superfícies `/content/files`: Arquivos de Website, recursos de grupo). BYOS permite que uma igreja vincule seu próprio armazenamento em nuvem — **Google Drive, Dropbox, OneDrive ou qualquer balde compatível com S3 (AWS S3, Cloudflare R2, Backblaze B2)** — então novos uploads chegam na conta da própria chiesa sem limite de plataforma. ChurchApps permanece gratuito; a conta própria da chiesa é o limite.

## A costura de provedor

BYOS reutiliza a costura de armazenamento construída para [MinistryStuff](./ministrystuff): `IStorageProvider` (`Packages/apihelper`) resolvida por chiesa por `StorageResolver` da tabela `content.storageProviders`. Ao contrário dos provedores singleton `churchapps`/`ministrystuff`, os provedores BYOS mantêm credenciais por-chiesa, então `StorageResolver.forChurch` constrói uma instância por solicitação da linha da chiesa. Implementações vivem ao lado do resolver em `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, além de `ByosAuth` (troca de token OAuth + atualização de único voo — Dropbox rotaciona tokens de atualização, então atualizações são deduplicadas da mesma forma que `ProviderProxyController` faz).

`storageProviders` leva as credenciais: `accessToken`/`refreshToken`/`tokenExpiresAt` (criptografado, trio OAuth) ou `apiKey`/`apiSecret` + JSON `settings` (`{endpoint, region, bucket, publicBase}`, S3). Tokens nunca alcançam o cliente — `GET /content/storage/providers` mascara segredos e retorna um booleano `connected`.

## Fluxo de upload

Mesmo contrato de três passos que antes, com uma forma presigned estendida. `POST /content/files/postUrl` retorna `PresignedPostData` que agora opcionalmente carrega `method`, `rawBody`, `headers`, `chunkSize` e `externalIdField`:

| Provedor | Presign | Cliente envia bytes |
|---|---|---|
| churchapps (padrão) | POST pré-assinado S3 | form multipart (legado) |
| Google Drive | sessão de upload retomável (`drive.file` scope) | PUT único para o URI de sessão |
| Dropbox | `files/get_temporary_upload_link` (4h) | POST bruto |
| OneDrive | `createUploadSession` (approot) | PUT em chunk (20MiB, Graph múltiplo de 320KiB) |
| S3-compatible | PUT pré-assinado (B2 não tem políticas POST) | PUT bruto |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) trata todas as formas e retorna o id do arquivo do provedor quando a resposta carrega um (Drive). O cliente o passa como `externalId` no registro `POST /content/files`; `files.provider` + `files.externalId` registram onde os bytes vivem (id de arquivo Drive; caminho para os outros). A verificação de cota de 100MB só se aplica quando o provedor resolvido é `churchapps`.

## Downloads públicos

As nuvens do consumidor não podem ser vinculadas diretamente (links Drive quotam-out, links Dropbox/OneDrive expiram), então para o trio OAuth `contentPath` aponta a uma rota de Api estável: `GET /content/files/download/:id` (anônimo) carrega a linha de arquivo, cunha um link direto de curta vida via `getDownloadUrl` do provedor (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), armazena-o em cache na memória por 30 minutos e 302-redireciona com `Cache-Control: max-age=300`. A largura de banda fluxos navegador↔provedor, nunca através da Api. S3-compatible pula o redirecionamento inteiramente — `contentPath` é o URL estável `publicBase + key` (o balde deve permitir leitura pública e CORS PUT).

Deletes e downloads rota por `files.provider` (`StorageResolver.forFile`); linhas legado sem ele caem de volta a roteamento por prefixo de URL. As renomeações são DB-somente para arquivos BYOS (bytes são endereçados por `externalId`, não nome). Desconectar um provedor que ainda tem arquivos disabilita suave a linha (mantém tokens para que downloads/deletes continuem funcionando) em vez de deletá-la.

## Conectando (B1Admin → Configurações → Armazenamento de Arquivo)

O trio OAuth usa o mesmo fluxo de retransmissão que provedores de conteúdo: popup → consentimento do provedor → `{membershipApi}/oauth/relay/callback` → B1Admin sonda a sessão de retransmissão → `POST /content/storage/exchange` executa a troca de código→token do lado servidor (segredos do cliente nunca saem do servidor; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox é um cliente público PKCE). Os IDs do cliente vivem em `B1Admin/src/settings/components/byosProviders.ts` e `Api .../ByosAuth.ts`. Os escopos são intencionalmente mínimos: Google `drive.file` (apenas arquivos criados por app — sem verificação de escopo restrito), OneDrive `Files.ReadWrite.AppFolder`, acesso de pasta de app Dropbox. S3 é um formulário de credencial simples.

Nota de escopo: BYOS cobre as superfícies `/content/files` somente. Imagens de galeria, miniaturas, logotipos e fotos de pessoa permanecem no provedor padrão (pequeno, servido por CDN, otimizado para imagem).
