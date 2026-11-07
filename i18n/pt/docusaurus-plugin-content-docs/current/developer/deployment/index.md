---
title: "Implantação"
description: "Veja onde cada projeto ChurchApps é implantado: APIs no AWS Lambda, apps web no S3, builds móveis com Expo e B1 Admin no Railway ou Docker."
---

# Implantação

<div class="article-intro">

O ChurchApps usa estratégias de implantação diferentes conforme o tipo de projeto: as APIs são implantadas no AWS Lambda, os aplicativos web são implantados como sites estáticos no S3 com CloudFront, e os aplicativos móveis são compilados e distribuídos pelo Expo EAS e pelas lojas de aplicativos.

</div>

## Implantação por tipo de projeto

| Tipo de projeto | Destino da implantação | Ferramentas |
|-----------------|------------------------|-------------|
| [APIs](./apis.md) | AWS Lambda | Serverless Framework v3 (runtime Node.js 24.x) |
| [Aplicativos web](./web-apps.md) | S3 + CloudFront | Build estático, sincronização com o S3, invalidação do CloudFront |
| [Aplicativos móveis](./mobile.md) | Lojas de aplicativos | Expo EAS Build + atualizações OTA |
| [Auto-hospedagem (Railway)](./railway-template.md) | Railway | Modelo de um clique: MySQL + Api + B1Admin + B1App |
| [Auto-hospedagem (Docker)](./docker.md) | Qualquer host Docker | Instalador de uma linha; imagens prontas do GHCR + Caddy, atualização/backup/rollback com `./deploy/b1` |
| [Proxy de domínio personalizado com Caddy](./caddy-proxy.md) | EC2 Windows (Elastic IP `3.23.251.61`) | Caddyfile estático + serviço WinSW + sincronização agendada do mapa |
| FreeShow | Download direto | Electron Builder (binários multiplataforma) |

## Ambientes

| Ambiente | Finalidade |
|----------|------------|
| `dev` | Desenvolvimento local |
| `demo` | Instância pública de demonstração; implantada a cada push para `main`, então serve também como pré-produção para testes |
| `prod` | Produção |

:::info
Cada ambiente tem o seu próprio conjunto de endpoints de API, bancos de dados e configuração. As configurações específicas de cada ambiente são gerenciadas por arquivos `.env` localmente e pelo AWS SSM Parameter Store nos ambientes implantados.
:::
