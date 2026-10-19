---
title: "Implantação"
---

# Implantação

<div class="article-intro">

O ChurchApps usa estratégias de implantação diferentes conforme o tipo de projeto: as APIs são implantadas no AWS Lambda, os aplicativos web são implantados como sites estáticos no S3 com CloudFront, e os aplicativos móveis são compilados e distribuídos pelo Expo EAS e pelas lojas de aplicativos.

</div>

## Implantação por tipo de projeto

| Tipo de projeto | Destino da implantação | Ferramentas |
|-------------|-------------------|---------|
| [APIs](./apis) | AWS Lambda | Serverless Framework v3 (runtime Node.js 22.x) |
| [Aplicativos web](./web-apps) | S3 + CloudFront | Build estático, sincronização com S3, invalidação do CloudFront |
| [Aplicativos móveis](./mobile) | Lojas de aplicativos | Expo EAS Build + atualizações OTA |
| [Auto-hospedagem (Railway)](./railway-template) | Railway | Modelo de um clique: MySQL + Api + B1Admin + B1App |
| [Auto-hospedagem (Docker)](./docker) | Qualquer host Docker | Instalador de uma linha; imagens GHCR pré-compiladas + Caddy, `./deploy/b1` para atualização/backup/rollback |
| [Proxy Caddy para domínio personalizado](./caddy-proxy) | EC2 Windows (IP elástico `3.23.251.61`) | Caddyfile estático + serviço WinSW + sincronização agendada de mapas |
| FreeShow | Download direto | Electron Builder (binários multiplataforma) |

## Ambientes

| Ambiente | Finalidade |
|-------------|---------|
| `dev` | Desenvolvimento local |
| `demo` | Instância pública de demonstração; implantada a cada push na `main`, por isso também serve como pré-produção para testes |
| `prod` | Produção |

:::info
Cada ambiente tem seu próprio conjunto de endpoints de API, bancos de dados e configurações. As configurações específicas de cada ambiente são gerenciadas por arquivos `.env` localmente e pelo AWS SSM Parameter Store nos ambientes implantados.
:::
