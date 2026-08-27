---
title: "Caddy Прокси"
---

# Caddy Прокси

Caddy используется в качестве обратного прокси для маршрутизации запросов к микросервисам B1.

## Конфигурация

```
api.b1.church {
    reverse_proxy localhost:3000
}

admin.b1.church {
    reverse_proxy localhost:3001
}
```

## SSL/TLS

Caddy автоматически управляет сертификатами SSL:

- Автоматически получает сертификаты Let's Encrypt
- Автоматически обновляет сертификаты перед истечением
- Перенаправляет HTTP на HTTPS

## Мониторинг

- Проверьте лог: `journalctl -u caddy`
- Статус: `systemctl status caddy`
- Перезагрузка: `systemctl reload caddy`

## Связанные документы

- [Docker](docker.md) — развертывание в контейнерах
