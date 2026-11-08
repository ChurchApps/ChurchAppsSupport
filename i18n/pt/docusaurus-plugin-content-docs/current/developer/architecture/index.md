---
title: "Arquitetura"
description: "Mapas do sistema entre repositórios que mostram como doações, check-ins, notificações e sites funcionam em B1 Admin, B1.church e na Api, antes de você fazer alterações."
---

# Arquitetura

<div class="article-intro">

Estas páginas são mapas do sistema entre repositórios: elas documentam, de ponta a ponta, como um sistema central da ChurchApps funciona, passando pelos aplicativos, pelos módulos da API e pelas bibliotecas compartilhadas, em vez de explicar como configurar um projeto específico. Leia-as antes de alterar o comportamento de um sistema. Para colocar um projeto em funcionamento, leia [Configuração](../setup/index.md), e para a referência de endpoints, consulte a [seção da API](../api/index.md).

</div>

## O ecossistema em resumo

A ChurchApps tem cerca de 20 repositórios independentes (não é um monorepo). Os aplicativos clientes se comunicam com um pequeno conjunto de APIs de backend por HTTPS e WebSocket, e compartilham código por meio de pacotes npm publicados no escopo `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clientes                      │            │  Api — monólito modular central (AWS Lambda) │
│                                │            │                                              │
│  B1Admin    painel da equipe   │   HTTPS    │   membership    attendance    content        │
│  B1App      portal do membro + │ ─────────▶ │   giving        messaging     doing          │
│             sites das igrejas  │            │                                              │
│  B1Checkin  quiosque de check-in│ ◀───WS───▶ │   um banco MySQL por módulo (6 no total)     │
│                                │            └──────────────────────────────────────────────┘
│  FreePlay   player de conteúdo │            ┌──────────────────────────────────────────────┐
│             para TV            │            │  LessonsApi — backend do Lessons.church      │
└───────────────┬────────────────┘            └──────────────────────────────────────────────┘
                │
                │  código compartilhado via npm (@churchapps/*)
                ▼
   helpers (interfaces entre aplicativos) · apphelper (componentes React) · apihelper (utilitários Express/servidor)
```

Duas regras estruturais definem tudo o que é documentado nesta seção:

1. **Os módulos são isolados.** Cada módulo da Api é dono do seu banco de dados e das suas tabelas. Outros módulos e aplicativos acessam seus dados somente por meio dos endpoints REST. Veja [Estrutura de módulos](../api/module-structure.md).
2. **O código compartilhado é distribuído como pacotes npm.** Os aplicativos nunca importam o código-fonte uns dos outros. Tudo o que é reutilizado atravessa os limites entre repositórios por meio de `@churchapps/helpers`, `@churchapps/apphelper` ou `@churchapps/apihelper`. Veja [Bibliotecas compartilhadas](../shared-libraries/index.md).

## Mapas do sistema

| Página | O que aborda | Abrange |
|------|----------------|-------|
| [Notificações e lembretes](./notifications.md) | Como qualquer parte do sistema comunica algo a uma pessoa: as duas portas de envio, a cadeia de escalonamento entre canais e o mecanismo de lembretes | Api (messaging), B1Admin, B1App |
| [Arquitetura em tempo real](../realtime.md) | A estrutura de entrega por WebSocket que sustenta o chat, a presença e a entrega dentro do aplicativo | Api (messaging), todos os aplicativos web |
| [Notificações push na web](../web-push.md) | O canal de push do navegador: chaves VAPID, armazenamento de inscrições e entrega | Api (messaging), todos os aplicativos web |
| [Doações](./giving.md) | Provedores e gateways de pagamento, fluxos de doação, fundos e lotes, webhooks dos gateways | Api (giving), apphelper, B1App, B1Admin |
| [Inscrições em eventos](./registrations.md) | O modelo comercial das inscrições: tipos de participante, seleções, códigos de desconto, pagamentos pelo gateway de doações e a lista de espera | Api (content + giving), B1App, B1Admin |
| [Check-ins](./check-ins.md) | Check-in em quiosque e autoatendimento, modelo de dados de presença, roteamento de salas, camada de segurança infantil, impressão de etiquetas | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Construtor de sites](./website-builder.md) | A árvore de páginas, seções e elementos, o contrato dos tipos de elemento e seus renderizadores, blog, páginas com acesso restrito, SEO e geração com IA | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Roteamento de sites e multissite](./websites.md) | Como uma requisição é associada a uma igreja e a um site específico, o modelo de dados multissite com `siteId` e a borda Caddy para domínios personalizados | B1App, Api (membership + content), B1Admin |
| [Integrações](./integrations.md) | A superfície de extensão: OAuth, chaves de API, webhooks, provedores de conteúdo, MCP | Api, bibliotecas compartilhadas, aplicativos externos |
| [Log de auditoria e lotes desfazíveis](./audit-log.md) | Auditoria ativada por padrão de toda alteração no ponto de controle dos controladores, e a camada de lotes que torna desfazíveis as importações e as ações em massa | Api (todos os módulos), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | O serviço pago de armazenamento e créditos de mensagens de texto: identidade por JWT compartilhado, S2S com chave de serviço, os pontos de integração dos provedores de SMS e armazenamento, cobrança pelo Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), pacotes texting/apihelper, B1Admin |
| [Armazenamento próprio (BYOS)](./byos-storage.md) | As igrejas vinculam Google Drive, Dropbox, OneDrive ou um bucket compatível com S3 para envios acima dos 100 MB gratuitos: conexão OAuth, formatos de envio por provedor, redirecionamento público de download | Api (content + membership), pacotes helpers/apphelper, B1Admin, B1App |
| [Content Commons](./commons.md) | A base compartilhada de ativos e envios que sustenta o conteúdo gerado por usuários entre produtos, e a fila única de moderação, restrita à equipe, em Administração do Servidor do B1Admin | Api (módulo commons), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Quando uma alteração muda o funcionamento de um destes sistemas, e não apenas de uma página dentro de um aplicativo, o mapa do sistema correspondente aqui também deve ser atualizado no mesmo trabalho. Isso mantém esta seção confiável como primeiro ponto de consulta para novos colaboradores.
:::

## Propostas

Estes documentos descrevem trabalhos propostos para revisão, e não comportamentos já disponíveis no produto.

| Proposta | O que aborda |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Conta, chaves, serviço e número de telefone de propriedade da igreja; escopo da integração, consentimento, entrega, estimativas e verificações de lançamento |
| [Rascunho de integração de igrejas ao Twilio](./twilio-byok-onboarding-draft.md) | Configurações propostas para o formulário de cadastro do B1, exemplos de campanhas específicas para igrejas e listas de verificação de aprovação e operação |
