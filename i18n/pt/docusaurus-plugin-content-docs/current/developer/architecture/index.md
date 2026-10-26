---
title: "Arquitetura"
---

# Arquitetura

<div class="article-intro">

Estas páginas são mapas de sistemas entre repositórios: elas documentam como um sistema central da ChurchApps funciona de ponta a ponta — pelos aplicativos, pelos módulos da API e pelas bibliotecas compartilhadas — e não como um único projeto é configurado. Leia-as antes de alterar o comportamento de um sistema; leia [Configuração](../setup/) para colocar um projeto em execução e a [seção de API](../api/) para a referência de endpoints.

</div>

## O ecossistema em resumo

A ChurchApps é formada por cerca de 20 repositórios independentes (não é um monorepo). Os aplicativos clientes conversam com um pequeno conjunto de APIs de backend por HTTPS e WebSocket, e compartilham código por meio de pacotes npm publicados no escopo `@churchapps`.

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

Duas regras estruturais moldam tudo o que é documentado nesta seção:

1. **Os módulos são isolados.** Cada módulo da Api é dono do seu banco de dados e das suas tabelas; outros módulos e aplicativos acessam os dados dele somente pelos seus endpoints REST. Veja [Estrutura de Módulos](../api/module-structure).
2. **O código compartilhado é distribuído como pacotes npm.** Os aplicativos nunca importam o código-fonte uns dos outros; qualquer coisa reutilizada atravessa os limites dos repositórios por meio de `@churchapps/helpers`, `@churchapps/apphelper` ou `@churchapps/apihelper`. Veja [Bibliotecas Compartilhadas](../shared-libraries/).

## Mapas de sistema

| Página | O que aborda | Abrange |
|------|----------------|-------|
| [Notificações e Lembretes](./notifications) | Como qualquer coisa avisa uma pessoa: as duas portas de envio, a cadeia de escalonamento de canais e o motor de lembretes | Api (messaging), B1Admin, B1App |
| [Comunicação em Tempo Real](../realtime) | A estrutura de entrega por WebSocket por trás do chat, da presença e da entrega dentro do aplicativo | Api (messaging), todos os aplicativos web |
| [Notificações Push na Web](../web-push) | O canal de push do navegador: chaves VAPID, armazenamento de inscrições, entrega | Api (messaging), todos os aplicativos web |
| [Doações](./giving) | Provedores e gateways de pagamento, fluxos de doação, fundos/lotes, webhooks dos gateways | Api (giving), apphelper, B1App, B1Admin |
| [Inscrições em Eventos](./registrations) | O modelo comercial de inscrições: tipos de participante, seleções, códigos de desconto, pagamentos pelo gateway de doações e a lista de espera | Api (content + giving), B1App, B1Admin |
| [Check-ins](./check-ins) | Check-in em quiosque e self check-in, o modelo de dados de presença, roteamento de salas, a camada de segurança infantil, impressão de etiquetas | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Construtor de Sites](./website-builder) | A árvore de páginas/seções/elementos, o contrato dos tipos de elemento e seus renderizadores, blog, páginas com controle de acesso, SEO e geração com IA | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Roteamento de Sites e Multi-Site](./websites) | Como uma requisição é resolvida para uma igreja e um site específico, o modelo de dados multi-site com `siteId` e a borda de domínios personalizados no Caddy | B1App, Api (membership + content), B1Admin |
| [Integrações](./integrations) | A superfície de extensão: OAuth, chaves de API, webhooks, provedores de conteúdo, MCP | Api, bibliotecas compartilhadas, aplicativos externos |
| [Log de Auditoria e Lotes Reversíveis](./audit-log) | Auditoria ativada por padrão de toda mutação no ponto de controle dos controladores, e a camada de lotes que torna importações e ações em massa reversíveis | Api (todos os módulos), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | O serviço pago de armazenamento e créditos de mensagens de texto: identidade por JWT compartilhado, S2S por chave de serviço, os pontos de provedores de texto e armazenamento, cobrança pelo Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), pacotes texting/apihelper, B1Admin |
| [Armazenamento Próprio (BYOS)](./byos-storage) | Igrejas vinculam Google Drive, Dropbox, OneDrive ou um bucket compatível com S3 para uploads acima dos 100 MB gratuitos: conexão OAuth, formatos de upload por provedor, redirecionamento público de download | Api (content + membership), pacotes helpers/apphelper, B1Admin, B1App |
| [Conteúdo Comunitário](./commons) | A espinha compartilhada de ativos e submissões por trás de conteúdo gerado por usuários entre produtos, e a fila de moderação única, somente para a equipe, no Server Admin do B1Admin | Api (módulo commons), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Quando uma mudança altera o funcionamento de um desses sistemas — e não apenas uma página dentro de um aplicativo — o mapa de sistema correspondente aqui deve ser atualizado no mesmo esforço. Isso mantém esta seção confiável como o primeiro ponto de consulta para novos colaboradores.
:::

## Propostas

Estes documentos descrevem trabalho proposto para revisão, e não comportamento disponível do produto.

| Proposta | O que aborda |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal) | Conta, chaves, serviço e número de telefone de propriedade da igreja; escopo da integração, consentimento, entrega, estimativas e verificações de lançamento |
| [Rascunho de onboarding do Twilio para igrejas](./twilio-byok-onboarding-draft) | Configurações propostas do formulário de cadastro do B1, exemplos de campanhas específicas para igrejas e listas de verificação de aprovação e operação |
