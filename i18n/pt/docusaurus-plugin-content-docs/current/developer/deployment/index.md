---
title: "Implantação"
---

# Implantação

<div class="article-intro">

Os projetos do ChurchApps usam estratégias de implantação diferentes, dependendo do tipo de projeto. As APIs são implantadas no AWS Lambda, os aplicativos web são implantados como sites estáticos no S3 com CloudFront, e os aplicativos mobile são compilados e distribuídos pelo Expo EAS e pelas lojas de aplicativos.

</div>

## Implantação por Tipo de Projeto

| Tipo de Projeto | Destino da Implantação | Ferramentas |
|-----------------|------------------------|-------------|
| [APIs](./apis) | AWS Lambda | Serverless Framework v3 (runtime Node.js 24.x) |
| [Aplicativos Web](./web-apps) | S3 + CloudFront | Build estático, sincronização com S3, invalidação do CloudFront |
| [Aplicativos Mobile](./mobile) | Lojas de Aplicativos | Expo EAS Build + atualizações OTA |
| [Hospedagem Própria (Railway)](./railway-template) | Railway | Modelo de um clique: MySQL + Api + B1Admin + B1App |
| [Hospedagem Própria (Docker)](./docker) | Qualquer host Docker | Instalador de uma linha; imagens pré-compiladas no GHCR + Caddy, `./deploy/b1` para atualização/backup/reversão |
| [Proxy Caddy para Domínio Personalizado](./caddy-proxy) | EC2 Windows (IP elástico `3.23.251.61`) | Caddyfile estático + serviço WinSW + sincronização agendada do mapa |
| FreeShow | Download direto | Electron Builder (binários multiplataforma) |

## Ambientes

| Ambiente | Finalidade |
|----------|------------|
| `dev` | Desenvolvimento local |
| `demo` | Instância pública de demonstração; implantada a cada push para a `main`, então também serve como teste de pré-produção |
| `prod` | Produção |

:::info
Cada ambiente tem seu próprio conjunto de endpoints de API, bancos de dados e configurações. As configurações específicas de cada ambiente são gerenciadas por arquivos `.env` localmente e pelo AWS SSM Parameter Store nos ambientes implantados.
:::
