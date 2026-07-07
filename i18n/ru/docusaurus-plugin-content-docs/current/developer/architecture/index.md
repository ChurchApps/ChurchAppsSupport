---
title: "Архитектура"
---

# Архитектура

<div class="article-intro">

Эти страницы это cross-repo системные карты: они документируют как core ChurchApps система works end-to-end — across приложения, API модули и shared libraries — rather чем как any одиночный проект установлен. Прочитайте их перед изменением системы's поведение; прочитайте [Setup](../setup/) к get проект running и [API раздел](../api/) для endpoint-level справочник.

</div>

## Экосистема с первого взгляда

ChurchApps это ~20 независимых репозиториев (не monorepo). Клиент приложения talk к small set backend APIs through HTTPS и WebSocket и share код through npm packages published under `@churchapps` scope.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Клиенты                       │            │  Api — core модульный монолит (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   одна MySQL база данных per модуль (6 всего) │
│  B1Mobile   (maintenance-only) │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared код через npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React компоненты) · apihelper (Express/server utilities)
```

Два структурных правила shape все документированное в этом раздела:

1. **Модули это isolated.** Каждый Api модуль owns его база данных и его таблицы; other модули и apps reach его данные только через его REST конечные точки. See [Module Structure](../api/module-structure).
2. **Shared код ships как npm packages.** Apps никогда не import каждого other's source; anything переиспользованное crosses repo границы через `@churchapps/helpers`, `@churchapps/apphelper` или `@churchapps/apihelper`. See [Shared Libraries](../shared-libraries/).

## Системные карты

| Страница | Что это covers | Spans |
|------|----------------|-------|
| [Notifications & Reminders](./notifications) | Как anything tells person something: two dispatch двери channel escalation цепь и reminder движок | Api (messaging) B1Admin B1App |
| [Real-time Architecture](../realtime) | WebSocket delivery framework behind чат presence и in-app доставка | Api (messaging) все web apps |
| [Web Push Notifications](../web-push) | Browser push канал: VAPID ключи subscription storage доставка | Api (messaging) все web apps |
| [Giving](./giving) | Payment providers и gateways donation потоки funds/batches gateway webhooks | Api (giving) apphelper B1App B1Admin |
| [Event Registrations](./registrations) | Registration commerce модель: attendee типы selections discount коды платежи через giving gateway и waitlist | Api (content + giving) B1App B1Admin |
| [Check-Ins](./check-ins) | Киоск и self check-in attendance модель данных room routing child-safety слой label printing | B1Checkin B1App B1Admin Api (attendance + membership) |
| [Website Builder](./website-builder) | Page/section/element дерево element-type contract и renderers blog access-gated страницы SEO и AI generation | Api (content) AskApi helpers/apphelper B1Admin B1App |
| [Website Routing & Multi-Site](./websites) | Как request разрешает к church и specific сайт multi-site `siteId` модель данных и Caddy custom-domain edge | B1App Api (membership + content) B1Admin |
| [Integrations](./integrations) | Extension поверхность: OAuth API ключи webhooks content providers MCP | Api shared libraries external apps |
| [Audit Log & Undoable Batches](./audit-log) | Default-on auditing каждого mutation в контроллер choke point и batch слой это makes imports и bulk действия undoable | Api (все модули) B1Admin B1Transfer |

:::tip
Когда изменение alters как один из этих систем works — не только page внутри one приложение — matching система карта здесь должна быть обновлена в same effort. This keeps этот раздел trustworthy как первый stop для new contributors.
:::
