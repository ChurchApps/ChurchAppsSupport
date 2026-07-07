---
title: "Anwesenheits-Endpunkte"
---

# Anwesenheits-Endpunkte

<div class="article-intro">

Das Anwesenheitsmodul verwaltet Campus-Standorte, Dienste, Dienstzeiten, Anwesenheitssitzungen, Besuche und Besuchssitzungen. Es bietet die Infrastruktur zum Verfolgen, wer welchen Dienst oder welche Gruppentreffen besucht hat, unterstützt Check-in-Workflows und bietet Anwesenheitstrend- und Zusammenfassungsberichte.

</div>

**Basispfad:** `/attendance`

## Campusse

Basispfad: `/attendance/campuses`

Standard-CRUD-Controller (erweitert GenericCrudController). Stellt `getById`, `getAll`, `post` und `delete` Routen über die CRUD-Basisklasse bereit.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/` | JWT | — | Alle Campusse für die Kirche auflisten |
| GET | `/:id` | JWT | — | Campus nach ID abrufen |
| POST | `/` | JWT | Services.Edit | Campusse erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Campus löschen |

## Dienste

Basispfad: `/attendance/services`

Erweitert GenericCrudController mit CRUD-Routen `getById`, `getAll`, `post` und `delete`. Die Endpunkte `getAll` (`GET /`) und `search` werden mit benutzerdefinierten Implementierungen außer Kraft gesetzt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/` | JWT | — | Alle Dienste auflisten (enthält Campus-Info) |
| GET | `/:id` | JWT | — | Dienst nach ID abrufen |
| GET | `/search?campusId=` | JWT | — | Dienste nach Campus-ID durchsuchen |
| POST | `/` | JWT | Services.Edit | Dienste erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Dienst löschen |

## Verwandte Seiten

- [Mitgliedschafts-Endpunkte](./membership) — Personen, Gruppen, Rollen und Kirchenverwaltung
- [Authentifizierung & Berechtigungen](./authentication) — Login-Ablauf, JWT, Berechtigungsmodell
- [Modulstruktur](../module-structure) — Code-Organisationsmuster
