---
title: "Implantação"
---

# Implantação

<div class="article-intro">

O ChurchApps usa diferentes estratégias de implantação dependendo do tipo de projeto. APIs são implantadas no AWS Lambda, aplicações web são implantadas como sites estáticos no S3 com CloudFront, e aplicações móveis são construídas e distribuídas através do Expo EAS e das lojas de aplicativos.

</div>

## Implantação por Tipo de Projeto

| Tipo de Projeto | Destino de Implantação | Ferramentas |
|----------------|------------------------|-------------|
| [APIs](./apis) | AWS Lambda | Serverless Framework v3 (runtime Node.js 22.x) |
| [Aplicações Web](./web-apps) | S3 + CloudFront | Build estático, sincronização S3, invalidação CloudFront |
| [Aplicações Móveis](./mobile) | Lojas de Aplicativos | Expo EAS Build + Atualizações OTA |
| FreeShow | Download direto | Electron Builder (binários multiplataforma) |

## Ambientes

| Ambiente | Propósito |
|----------|-----------|
| `dev` | Desenvolvimento local |
| `demo` | Instância de demonstração pública |
| `staging` | Testes pré-produção |
| `prod` | Produção |

:::info
Cada ambiente possui seu próprio conjunto de endpoints de API, bancos de dados e configuração. Configurações específicas de ambiente são gerenciadas através de arquivos `.env` localmente e AWS SSM Parameter Store em ambientes implantados.
:::
