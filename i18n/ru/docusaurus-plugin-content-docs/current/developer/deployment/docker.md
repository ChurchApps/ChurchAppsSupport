---
title: "Docker развертывание"
---

# Docker развертывание

B1 может быть развернута с использованием Docker контейнеров для упрощения управления и масштабирования.

## Docker Compose

```yaml
version: '3.8'
services:
  api:
    image: churchapps/b1-api:latest
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/b1
  
  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: b1
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

## Запуск

```bash
docker-compose up -d
```

## Управление

```bash
# Просмотр логов
docker-compose logs -f api

# Остановка
docker-compose down

# Обновление образа
docker-compose pull
docker-compose up -d
```

## Сетевая конфигурация

- Контейнеры связаны через сеть Docker
- Используйте имена сервисов для подключения (например, `db:5432`)

## Связанные документы

- [Caddy](caddy-proxy.md) — прокси конфигурация
