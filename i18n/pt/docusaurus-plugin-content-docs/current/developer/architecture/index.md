---
title: "Arquitetura"
---

# Arquitetura

<div class="article-intro">

Estas páginas são mapas de sistema cross-repo: documentam como um sistema ChurchApps principal funciona fim-a-fim — através dos apps, os módulos de API e as bibliotecas compartilhadas — em vez de como qualquer projeto único está configurado. Leia-as antes de alterar o comportamento de um sistema; leia [Setup](../setup/) para obter um projeto rodando e a seção [API](../api/) para referência em nível de endpoint.

</div>

## O ecossistema num relance

ChurchApps é ~20 repositórios independentes (não um monorepo). Apps de cliente falam a um pequeno conjunto de APIs de backend sobre HTTPS e WebSocket e compartilham código através de pacotes npm publicados sob o escopo `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│  B1Mobile   (maintenance-only) │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Duas regras estruturais moldam tudo documentado nesta seção:

1. **Módulos estão isolados.** Cada módulo Api possui seu banco de dados e suas tabelas; outros módulos e apps alcançam seus dados apenas através de seus endpoints REST. Consulte [Estrutura de Módulo](../api/module-structure).
2. **Código compartilhado envia como pacotes npm.** Apps nunca importam código de um do outro; qualquer coisa reutilizada cruza limites de repositório através de `@churchapps/helpers`, `@churchapps/apphelper` ou `@churchapps/apihelper`. Consulte [Bibliotecas Compartilhadas](../shared-libraries/).

## Mapas de sistema

| Página | O que cobre | Abrange |
|------|----------------|-------|
| [Notificações e Lembretes](./notifications) | Como qualquer coisa diz a uma pessoa algo: as duas portas de despacho, a cadeia de escalação de canal e o mecanismo de lembrete | Api (messaging), B1Admin, B1App |
| [Arquitetura de Tempo Real](../realtime) | O framework de entrega WebSocket por trás de chat, presença e entrega in-app | Api (messaging), todos os web apps |
| [Notificações de Push Web](../web-push) | O canal de push de navegador: chaves VAPID, armazenamento de subscrição, entrega | Api (messaging), todos os web apps |
| [Giving](./giving) | Provedores e gateways de pagamento, fluxos de doação, fundos/lotes, webhooks de gateway | Api (giving), apphelper, B1App, B1Admin |
| [Registros de Evento](./registrations) | O modelo de comércio de inscrição: tipos de participante, seleções, códigos de desconto, pagamentos através gateway de dádiva e a lista de espera | Api (content + giving), B1App, B1Admin |
| [Check-Ins](./check-ins) | Quiosque e self check-in, modelo de dados de presença, roteamento de sala, camada de segurança pediátrica, impressão de etiqueta | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Construtor de Website](./website-builder) | A árvore página/seção/elemento, contrato de tipo de elemento e renderizadores, blog, páginas de acesso-gated, SEO e geração de IA | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Roteamento de Website e Multi-Site](./websites) | Como uma solicitação resolve para uma igreja e um site específico, modelo de dados `siteId` multi-site e a borda de domínio personalizado Caddy | B1App, Api (membership + content), B1Admin |
| [Integrações](./integrations) | A superfície de extensão: OAuth, chaves de API, webhooks, provedores de conteúdo, MCP | Api, bibliotecas compartilhadas, apps externos |
| [Audit Log & Batch Undoable](./audit-log) | Auditoria padrão-ligada de cada mutação no ponto de estrangulamento de controlador e a camada de lote que torna importações e ações em massa desfazer-áveis | Api (todos os módulos), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | O serviço de armazenamento e crédito de texting pago: identidade JWT compartilhada, S2S de chave de serviço, seams de provedor de texting/armazenamento, faturamento Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), pacotes texting/apihelper, B1Admin |
| [Trazer Seu Próprio Armazenamento](./byos-storage) | Igrejas vinculam Google Drive, Dropbox, OneDrive ou um bucket compatível com S3 para uploads passado o 100MB gratuito: conexão OAuth, formas de upload por-provedor, redirecionamento de download público | Api (content + membership), pacotes helpers/apphelper, B1Admin, B1App |
| [Content Commons](./commons) | A espinha compartilhada de ativos/submissão por trás do conteúdo gerado por usuário cross-produto e a fila de moderação única somente-staff em B1Admin Server Admin | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Quando uma alteração altera como um destes sistemas funciona — não apenas uma página dentro de um app — o mapa de sistema correspondente aqui deve ser atualizado no mesmo esforço. Isto mantém esta seção confiável como o primeiro parada para novos colaboradores.
:::
