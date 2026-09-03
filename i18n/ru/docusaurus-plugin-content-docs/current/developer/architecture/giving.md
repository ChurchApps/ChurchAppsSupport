---
title: "Архитектура благотворительности"
---

# Архитектура благотворительности

<div class="article-intro">

ChurchApps запускает пожертвования на модели рельсов шлюза: церковь сохраняет свою учетную запись Stripe (или PayPal, Kingdom Funding, или Paystack), и B1 никогда не сидит в пути денег как обработчик платформы. Данные карты токенизируются в браузере и никогда не достигают сервера ChurchApps. Эта страница отображает весь стек -- реестр поставщиков на клиентской стороне в `@churchapps/apphelper`, абстракцию шлюза GivingApi, модель данных пожертвований и то, как webhook шлюза согласовывается обратно в базу данных.

</div>

## Overview

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / KF / Paystack)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ card entry in the │  Stripe Elements · KF tokenizer ·     │
│  │ Payment provider      │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ registry              │  │◀── token / nonce ─│  (card never reaches a B1 server)     │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ signed webhook
┌─────────────────────────────────────────────┐ (secret key) │                │ event
