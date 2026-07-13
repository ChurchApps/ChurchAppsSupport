---
title: "Kufakwa"
---

# Kufakwa

<div class="article-intro">

I-ChurchApps isebentisa emaqhinga (strategies) ekufaka lahlukene kuya ngelusito loluhlobo lweliphrojekthi. Ema-API afakwa ku-AWS Lambda, tinhlelo te-web tifakwa njengemasayithi lamile ku-S3 ne-CloudFront, kanye netinhlelo teselula takhiwa futsi tisatjalaliswe ngekusebentisa i-Expo EAS kanye netitolo tetinhlelo (app stores).

</div>

## Kufakwa Ngeluhlobo Lweliphrojekthi

| Luhlobo Lweliphrojekthi | Legi Lekufakwa | Tinsimbi |
|-------------|-------------------|---------|
| [Ema-API](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 22.x runtime) |
| [Tinhlelo Te-Web](./web-apps) | S3 + CloudFront | Static build, S3 sync, CloudFront invalidation |
| [Tinhlelo Teselula](./mobile) | Titolo Tetinhlelo | Expo EAS Build + OTA Updates |
| [Kutingenisela (Railway)](./railway-template) | Railway | Ithempuleti yekucindzetela kanyekanye: MySQL + Api + B1Admin + B1App |
| [Kutingenisela (Docker)](./docker) | Nome yimuphi umsingathi (host) we-Docker | `docker compose up` kusuka ku-repository ye-B1Admin |
| [I-Caddy Custom-Domain Proxy](./caddy-proxy) | Windows EC2 (Elastic IP `3.23.251.61`) | Static Caddyfile + WinSW service + kuhlanganiswa kwemephu lokuhlelekile |
| FreeShow | Kulanda Ngco (direct download) | Electron Builder (ema-binary la-cross-platform) |

## Tindzawo Tekusebenta (Environments)

| Indzawo | Injongo |
|-------------|---------|
| `dev` | Kutfutfukiswa kwasekhaya |
| `demo` | I-instance ye-demo lebonwa ngumphakatsi |
| `staging` | Kuhlolwa ngaphambi kwe-production |
| `prod` | I-Production |

:::info
Ngayinye indzawo yekusebenta inema-endpoint ayo, ema-database, kanye nekuhlelwa. Kuhlelwa lokukhetsekile ngendzawo kuphatfwa ngemafayela e-`.env` ngasekhaya kanye ne-AWS SSM Parameter Store etindzaweni letifakiwe.
:::
