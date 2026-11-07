---
title: "Traga o seu próprio armazenamento"
---

# Traga o seu próprio armazenamento (BYOS)

As igrejas recebem cerca de 100MB de armazenamento gratuito de arquivos hospedado (as superfícies `/content/files`: Arquivos do site e recursos de grupos). O BYOS permite que a igreja conecte o próprio armazenamento em nuvem, seja **Google Drive, Dropbox, OneDrive ou qualquer bucket compatível com S3** (AWS S3, Cloudflare R2, Backblaze B2), para que os novos envios sejam gravados na conta da própria igreja, sem limite imposto pela plataforma. A ChurchApps continua gratuita; o limite passa a ser a conta da própria igreja.

## A camada de provedores

O BYOS reutiliza a camada de armazenamento criada para o [MinistryStuff](./ministrystuff): `IStorageProvider` (`Packages/apihelper`), resolvido para cada igreja pelo `StorageResolver` a partir da tabela `content.storageProviders`. Diferentemente dos provedores singleton `churchapps` e `ministrystuff`, os provedores BYOS mantêm credenciais por igreja; por isso, `StorageResolver.forChurch` cria uma instância por requisição, a partir do registro da igreja. As implementações ficam ao lado do resolvedor, em `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, além de `ByosAuth` (troca de tokens OAuth e renovação com instância única, pois o Dropbox rotaciona os refresh tokens; por isso as renovações são deduplicadas da mesma forma que o `ProviderProxyController` faz).

`storageProviders` guarda as credenciais: `accessToken`/`refreshToken`/`tokenExpiresAt` (criptografados, o trio OAuth) ou `apiKey`/`apiSecret` + JSON em `settings` (`{endpoint, region, bucket, publicBase}`, para S3). Os tokens nunca chegam ao cliente: `GET /content/storage/providers` mascara os segredos e retorna um booleano `connected`.

## Fluxo de envio

É o mesmo contrato de três etapas de antes, com um formato de pré-assinatura (presign) estendido. `POST /content/files/postUrl` retorna `PresignedPostData`, que agora pode conter, opcionalmente, `method`, `rawBody`, `headers`, `chunkSize` e `externalIdField`:

| Provedor | Pré-assinatura | Cliente envia os bytes |
|---|---|---|
| churchapps (padrão) | POST pré-assinado do S3 | formulário multipart (legado) |
| Google Drive | sessão de upload retomável (escopo `drive.file`) | um único PUT para a URI da sessão |
| Dropbox | `files/get_temporary_upload_link` (4h) | POST bruto |
| OneDrive | `createUploadSession` (approot) | PUT em partes (20MiB, múltiplos de 320KiB do Graph) |
| Compatível com S3 | PUT pré-assinado (o B2 não tem políticas de POST) | PUT bruto |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) trata todos os formatos e retorna o id do arquivo no provedor quando a resposta o inclui (Drive). O cliente o envia como `externalId` no registro `POST /content/files`. `files.provider` e `files.externalId` registram onde os bytes estão (o id do arquivo no Drive; o caminho nos demais provedores). A verificação da cota de 100MB só se aplica quando o provedor resolvido é `churchapps`.

## Downloads públicos

Nuvens de consumo não podem ser acessadas por hotlink (os links do Drive atingem a cota, e os links do Dropbox e do OneDrive expiram). Por isso, para o trio OAuth, `contentPath` aponta para uma rota estável da Api: `GET /content/files/download/:id` (anônima) carrega o registro do arquivo, gera um link direto de curta duração pelo `getDownloadUrl` do provedor (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), armazena-o em cache na memória por 30 minutos e faz um redirecionamento 302 com `Cache-Control: max-age=300`. O tráfego flui entre o navegador e o provedor, nunca pela Api. O provedor compatível com S3 ignora o redirecionamento: `contentPath` é a URL estável `publicBase + key` (o bucket precisa permitir leitura pública e CORS PUT).

Exclusões e downloads são roteados por `files.provider` (`StorageResolver.forFile`). Registros antigos sem esse campo recorrem ao roteamento por prefixo de URL. Renomeações afetam apenas o banco de dados para arquivos BYOS, pois os bytes são endereçados por `externalId`, não pelo nome. Ao desconectar um provedor que ainda possui arquivos, o registro é desativado sem ser apagado (os tokens são mantidos para que downloads e exclusões continuem funcionando).

## Conexão (B1Admin → Configurações → Armazenamento de arquivos)

O trio OAuth usa o mesmo fluxo de relé dos provedores de conteúdo: pop-up → consentimento do provedor → `{membershipApi}/oauth/relay/callback` → o B1Admin consulta a sessão do relé → `POST /content/storage/exchange` realiza a troca de código por token no servidor. Os segredos de cliente nunca saem do servidor: `GOOGLE_DRIVE_CLIENT_SECRET` para o Google e `ONEDRIVE_CLIENT_SECRET` para o OneDrive; o Dropbox é um cliente público com PKCE. Os ids de cliente ficam em `B1Admin/src/settings/components/byosProviders.ts` e `Api .../ByosAuth.ts`. Os escopos são deliberadamente mínimos: `drive.file` do Google (somente arquivos criados pelo aplicativo, sem verificação de escopo restrito), `Files.ReadWrite.AppFolder` do OneDrive e acesso à pasta do aplicativo no Dropbox. O S3 usa um formulário simples de credenciais.

Nota sobre o escopo: o BYOS cobre apenas as superfícies `/content/files`. Imagens de galeria, miniaturas, logotipos e fotos de pessoas permanecem no provedor padrão (são arquivos pequenos, servidos por CDN e otimizados para imagem). Um cliente também pode enviar `platformStorage: true` no corpo do `postUrl` para fixar um envio no provedor churchapps padrão, independentemente da configuração BYOS da igreja. O FreeShow usa isso para o estado de sincronização em `files/group/{teamId}/current.zip`, que é lido diretamente do host público de conteúdo e nunca é registrado como linha de arquivo.
