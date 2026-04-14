---
title: "Inhalts-Endpunkte"
---

# Inhalts-Endpunkte

<div class="article-intro">

Das Inhalts-Modul verwaltet Website-Seiten, Abschnitte, Elemente, Blöcke, Predigten, Playlisten, Streaming-Dienste, Ereignisse, kuratierte Kalender, Dateien, Galerien, Bibel-Übersetzungen und Vers-Nachschlag, Lieder, Arrangements, globale Stile, Stock-Fotos und Einstellungen. Es ist das größte Modul in der API und unterstützt das CMS, Medien/Streaming, Lob-Planung und Bibel-Funktionen in allen ChurchApps-Anwendungen.

</div>

**Basis-Pfad:** `/content`

## Seiten

Basis-Pfad: `/content/pages`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Öffentlich | — | Laden Sie vollständigen Seiten-Baum (Abschnitte, Elemente, Blöcke) nach URL oder ID |
| GET | `/:id` | JWT | — | Holen Sie eine Seite nach ID |
| GET | `/` | JWT | — | Alle Seiten für die Kirche auflisten |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplizieren Sie eine Seite mit allen Abschnitten und Elementen |
| POST | `/` | JWT | Content.Edit | Erstellen oder aktualisieren Sie Seiten (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Löschen Sie eine Seite |

## Songs

Basis-Pfad: `/content/songs`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Suchen Sie Lieder nach Anfrage |
| GET | `/:id` | JWT | — | Holen Sie ein Lied nach ID |
| GET | `/` | JWT | Content.Edit | Alle Lieder auflisten |
| POST | `/` | JWT | Content.Edit | Erstellen oder aktualisieren Sie Lieder (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Löschen Sie ein Lied |

## Bibles

Basis-Pfad: `/content/bibles`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|------------|-------------|
| GET | `/` | Öffentlich | — | Alle Bibel-Übersetzungen auflisten |
| GET | `/:translationKey/search?query=&limit=` | Öffentlich | — | Verse in einer Übersetzung suchen |
| GET | `/:translationKey/books` | Öffentlich | — | Bücher für eine Übersetzung abrufen |

## Verwandte Seiten

- [Membership-Endpunkte](./membership) — Personen, Kirchen, Gruppen, Rollen, Berechtigungen
- [Anwesenheits-Endpunkte](./attendance) — Dienst- und Besuchs-Verfolgung
- [Authentifizierung & Berechtigungen](./authentication) — Anmelde-Fluss, JWT, OAuth, Berechtigungs-Modell
