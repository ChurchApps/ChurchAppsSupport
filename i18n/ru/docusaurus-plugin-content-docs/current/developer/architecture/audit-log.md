---
title: "Журнал аудита и батчи, которые можно отменить"
---

# Журнал аудита и батчи, которые можно отменить

<div class="article-intro">

Каждая инициированная пользователем мутация в Api записывается -- кто, что, когда и откуда -- по всем модулям без каких-либо проводов для каждого контроллера. На вершину этого реестра сидит слой батча: импорт или массовое действие может быть отмечено как батч и позже **отменено** строка за строкой, Planning-Center-style. Оба живут в одной таблице `auditLogs` в базе данных членства и управляются полностью из одной точки удушения, `BaseController.actionWrapper`. Эта страница отображает, что подлежит аудиту, где живут данные, компромиссы производительности, которые их формируют, и как отмена обращает батч в безопасности без кросс-база транзакций.

</div>

## Overview

```
каждый запрос на мутацию (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ derive {module, entityType, category, action}
        │                         from req.baseUrl + method  (AUDIT_REGISTRY = overrides/opt-outs only)
        │
        ├─ normal mode ─────────▶ run action ─▶ await AuditLogHelper.log(after-values)  ──┐
        │                                        (deletes also capture a before-image)     │
        │                                                                                  ▼
        └─ X-Batch-Id present ──▶ snapshot before-images (strict) ─▶ run action ─▶ audit rows tagged batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (membership DB, one table, all modules)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ walk rows reverse, per entity ┘
                                          conflict guard → restore / delete / re-insert
```

Две структурные факты влияют на все ниже:

1. **Слой контроллера - единственное место, которое знает актера.** Repositories никогда не видят `AuthenticatedUser`; только контроллеры держат `au`. Контроллеры каждого модуля уже проходят через `BaseController.actionWrapper`, поэтому это то, где подключается аудит -- сигнатуры repo не изменяются нигде.
2. **Одна таблица обслуживает все модули.** Строки аудита для пожертвований, посещаемости, контента и т.д. все написаны в `auditLogs` базы данных членства через `RepoManager.getRepos("membership")`, даже из контроллера, не являющегося членством. "Все, что изменила Jane сегодня" остается одним запросом.

## Что подлежит аудиту
