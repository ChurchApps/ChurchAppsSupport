---
title: "Архитектура уведомлений и напоминаний"
---

# Архитектура уведомлений и напоминаний

<div class="article-intro">

Каждое сообщение, которое видит член церкви, находится вне страницы, которую они смотрят -- значок значка, push-уведомление, еженедельный email -- проходит через одну из двух дверей в MessagingApi. Эта страница документирует воронку, двигатель напоминаний, который питает его по расписанию, и модель предпочтений, которая решает, что фактически достигает человека.

</div>

## Overview -- две двери

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```
