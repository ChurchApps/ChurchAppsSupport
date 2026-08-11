---
title: "Arquitetura"
---

# Arquitetura

<div class="article-intro">

Essas páginas são mapas de sistema entre repositórios: elas documentam como um sistema ChurchApps essencial funciona end-to-end — através dos aplicativos, módulos de API e bibliotecas compartilhadas — em vez de como qualquer projeto único é configurado. Leia-as antes de alterar o comportamento de um sistema; leia [Configuração](../setup/) para executar um projeto e a [seção de API](../api/) para referência em nível de endpoint.

</div>

## O ecossistema de uma olhada

ChurchApps é ~20 repositórios independentes (não um monorepo). Aplicativos cliente falam para um pequeno conjunto de APIs backend por HTTPS e WebSocket e compartilham código através de pacotes npm publicados sob o escopo `@churchapps`.

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

1. **Módulos são isolados.** Cada módulo de Api possui seu banco de dados e suas tabelas; outros módulos e aplicativos alcançam seus dados apenas através de seus endpoints REST. Consulte [Estrutura de Módulo](../api/module-structure).
2. **Código compartilhado é enviado como pacotes npm.** Os aplicativos nunca importam o código-fonte um do outro; qualquer coisa reutilizada atravessa limites do repositório através de `@churchapps/helpers`, `@churchapps/apphelper` ou `@churchapps/apihelper`. Consulte [Bibliotecas Compartilhadas](../shared-libraries/).

## Mapas de Sistema

| Página | O que cobre | Abrange |
|--------|-------------|---------|
| [Notificações e Lembretes](./notifications) | Como qualquer coisa diz a uma pessoa algo: as duas portas de despacho, a cadeia de escalação de canal e o mecanismo de lembrete | Api (messaging), B1Admin, B1App |
| [Arquitetura de Tempo Real](../realtime) | O framework de entrega WebSocket por trás de chat, presença e entrega no aplicativo | Api (messaging), todos os aplicativos web |
| [Notificações Web Push](../web-push) | O canal de push do navegador: chaves VAPID, armazenamento de inscrição, entrega | Api (messaging), todos os aplicativos web |
| [Doação](./giving) | Provedores de pagamento e gateways, fluxos de doação, fundos/lotes, webhooks de gateway | Api (giving), apphelper, B1App, B1Admin |
| [Registros de Evento](./registrations) | O modelo de comércio de registro: tipos de participante, seleções, códigos de desconto, pagamentos através do gateway de doação e a lista de espera | Api (content + giving), B1App, B1Admin |
| [Check-Ins](./check-ins) | Quiosque e autoatendimento, modelo de dados de participação, roteamento de sala, camada de segurança infantil, impressão de etiqueta | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Construtor de Website](./website-builder) | A árvore página/seção/elemento, o contrato de tipo de elemento e renderizadores, blog, páginas com acesso barrado, SEO e geração de IA | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Roteamento de Website e Multi-Site](./websites) | Como uma solicitação resolve para uma igreja e um site específico, o modelo de dados multi-site `siteId`, e a borda Caddy de domínio personalizado | B1App, Api (membership + content), B1Admin |
| [Integrações](./integrations) | A superfície de extensão: OAuth, chaves de API, webhooks, provedores de conteúdo, MCP | Api, bibliotecas compartilhadas, aplicativos externos |
| [Log de Auditoria e Lotes Desfazer](./audit-log) | Auditoria padrão de cada mutação no ponto de estrangulamento do controlador e a camada de lote que torna importações e ações em massa desfazer | Api (all modules), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | O serviço pago de armazenamento e créditos de envio de mensagens: identidade JWT compartilhada, serviço-chave S2S, costura de provedor de envio de mensagens e armazenamento, cobrança Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), pacotes texting/apihelper, B1Admin |
| [Armazenamento Traga seu Próprio](./byos-storage) | Igrejas vinculam Google Drive, Dropbox, OneDrive ou um balde compatível com S3 para uploads além do livre 100MB: conectar OAuth, formas de upload por provedor, redirecionamento de download público | Api (content + membership), pacotes helpers/apphelper, B1Admin, B1App |

:::tip
Quando uma mudança altera como um desses sistemas funciona — não apenas uma página dentro de um aplicativo — o mapa de sistema correspondente aqui deve ser atualizado no mesmo esforço. Isso mantém essa seção confiável como a primeira parada para novos contribuidores.
:::
