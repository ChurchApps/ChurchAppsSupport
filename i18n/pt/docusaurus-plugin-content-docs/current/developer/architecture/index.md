---
title: "Arquitetura"
---

# Arquitetura

<div class="article-intro">

Estas páginas são mapas de sistema entre repositórios: elas documentam como um sistema central ChurchApps funciona ponta a ponta — através dos aplicativos, dos módulos API e das bibliotecas compartilhadas — em vez de como qualquer projeto único é configurado. Leia-as antes de alterar o comportamento de um sistema; leia [Configuração](../setup/) para colocar um projeto em execução e a [seção API](../api/) para referência em nível de ponto de extremidade.

</div>

## O ecossistema em um relance

ChurchApps é ~20 repositórios independentes (não um monorepo). Os aplicativos clientes falam com um pequeno conjunto de APIs de backend sobre HTTPS e WebSocket, e compartilham código através de pacotes npm publicados sob o escopo `@churchapps`.

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

Duas regras estruturais formam tudo documentado nesta seção:

1. **Módulos são isolados.** Cada módulo Api possui seu banco de dados e suas tabelas; outros módulos e aplicativos alcançam seus dados apenas através de seus pontos de extremidade REST. Veja [Estrutura de Módulo](../api/module-structure).
2. **Código compartilhado envia como pacotes npm.** Os aplicativos nunca importam o fonte uns dos outros; qualquer coisa reutilizada cruza limites de repositório através de `@churchapps/helpers`, `@churchapps/apphelper` ou `@churchapps/apihelper`. Veja [Bibliotecas Compartilhadas](../shared-libraries/).

## Mapas de sistema

| Página | O que cobre | Abrange |
|------|----------------|-------|
| [Notificações e Lembretes](./notifications) | Como qualquer coisa diz a uma pessoa algo: as duas portas de envio, a cadeia de escalação de canal e o mecanismo de lembrete | Api (messaging), B1Admin, B1App |
| [Arquitetura em Tempo Real](../realtime) | O framework de entrega WebSocket atrás de chat, presença e entrega no aplicativo | Api (messaging), todos os aplicativos web |
| [Notificações de Push da Web](../web-push) | O canal de push do navegador: chaves VAPID, armazenamento de assinatura, entrega | Api (messaging), todos os aplicativos web |
| [Doações](./giving) | Provedores e gateways de pagamento, fluxos de doação, fundos/lotes, webhooks de gateway | Api (giving), apphelper, B1App, B1Admin |
| [Registros de Evento](./registrations) | O modelo de comércio de registro: tipos de participante, seleções, códigos de desconto, pagamentos através do gateway de doação e a lista de espera | Api (content + giving), B1App, B1Admin |
| [Registros de Entrada](./check-ins) | Check-in de quiosque e auto, o modelo de dados de presença, roteamento de sala, a camada de segurança infantil, impressão de rótulos | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Website Builder](./website-builder) | A árvore de página/seção/elemento, o contrato de tipo de elemento e renderizadores, blog, páginas com acesso controlado, SEO e geração por IA | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Roteamento de Website e Multi-Site](./websites) | Como uma solicitação se resolve para uma igreja e um site específico, o modelo de dados multi-site `siteId` e a borda de domínio personalizado Caddy | B1App, Api (membership + content), B1Admin |
| [Integrações](./integrations) | A superfície de extensão: OAuth, chaves API, webhooks, provedores de conteúdo, MCP | Api, bibliotecas compartilhadas, aplicativos externos |
| [Registro de Auditoria e Lotes Reversíveis](./audit-log) | Auditoria ativada por padrão de cada mutação no ponto de estrangulamento do controlador e a camada de lote que torna importações e ações em massa reversíveis | Api (all modules), B1Admin, B1Transfer |

:::tip
Quando uma mudança altera como um desses sistemas funciona — não apenas uma página dentro de um aplicativo — o mapa de sistema correspondente aqui deve ser atualizado no mesmo esforço. Isso mantém esta seção confiável como a primeira parada para novos colaboradores.
:::
