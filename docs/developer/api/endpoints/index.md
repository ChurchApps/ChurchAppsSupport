---
title: "Endpoint Reference"
---

# Endpoint Reference

<div class="article-intro">

This section documents all REST endpoints exposed by the ChurchApps API. Each module page lists every route with its HTTP method, path, authentication requirements, and required permissions.

</div>

## Base URL

| Environment | URL |
|-------------|-----|
| Local development | `http://localhost:8084` |
| Production | `https://api.churchapps.org` |

## Request Conventions

- **Content-Type:** All request and response bodies use `application/json`
- **Multi-tenant:** Every authenticated request is scoped to a `churchId` extracted from the JWT token — you do not pass `churchId` in the URL
- **Batch saves:** Most `POST` endpoints accept an **array of objects**. The API will insert new records (no `id` field) and update existing ones (with `id` field) in a single call
- **IDs:** All entity IDs are UUIDs

### Example: Batch Save

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

The first object is created (new); the second is updated (has `id`).

## Response Format

Successful responses return JSON — either a single object or an array. Error responses use standard HTTP status codes:

| Code | Meaning |
|------|---------|
| `200` | Success |
| `400` | Bad request (validation errors) |
| `401` | Unauthorized (missing/invalid token or insufficient permissions) |
| `404` | Not found |
| `500` | Server error |

Validation errors return:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## How to Read Endpoint Tables

Each module page organizes endpoints by controller. The tables use these columns:

| Column | Description |
|--------|-------------|
| **Method** | HTTP method (`GET`, `POST`, `DELETE`) |
| **Path** | Route path relative to the controller's base path |
| **Auth** | **JWT** = requires Bearer token, **Public** = no auth required |
| **Permission** | Required permission (e.g. `People.Edit`). `—` means any authenticated user |
| **Description** | What the endpoint does |

Controllers that extend the standard CRUD base class provide four endpoints automatically: `GET /` (list all), `GET /:id` (get by ID), `POST /` (create/update), and `DELETE /:id` (delete).

## Reporting Module

The Reporting module works differently from the other modules. Instead of database-backed CRUD, it loads report definitions from JSON files on disk and executes parameterized SQL queries.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | Load a report definition by key name |
| GET | `/reporting/reports/:keyName/run` | JWT | Execute a report and return results |

Report parameters are passed as query string values (e.g. `?startDate=2024-01-01&endDate=2024-12-31`). The `churchId` parameter is injected automatically from the JWT token. Each report definition can specify its own permission requirements.

## Module Index

| Module | Base Path | Description |
|--------|-----------|-------------|
| [Authentication](./authentication) | `/membership/users`, `/membership/oauth` | Login, registration, JWT tokens, OAuth, permissions |
| [Membership](./membership) | `/membership/*` | People, churches, groups, households, roles, forms, settings |
| [Attendance](./attendance) | `/attendance/*` | Campuses, services, sessions, visits, check-in records |
| [Content](./content) | `/content/*` | Pages, sermons, events, files, galleries, Bible, streaming |
| [Giving](./giving) | `/giving/*` | Donations, funds, payment gateways, subscriptions |
| [Messaging](./messaging) | `/messaging/*` | Conversations, notifications, devices, SMS |
| [Doing](./doing) | `/doing/*` | Plans, tasks, assignments, automations, scheduling |
