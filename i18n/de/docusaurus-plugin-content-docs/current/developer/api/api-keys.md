---
title: "API-Schlüssel"
---

# API-Schlüssel

<div class="article-intro">

API-Schlüssel (persönliche Zugriffstoken) sind die einfachste Möglichkeit, sich aus einem serverseitigen Skript, einem Drittanbieter-Konnektor (Zapier, Make, Google Sheets) oder überall dort, wo ein vollständiger OAuth-Fluss übertrieben ist, gegen die B1 API zu authentifizieren. Ein Schlüssel ist an eine bestimmte Person in einer bestimmten Kirche gebunden und erbt die Berechtigungen dieser Person, begrenzt durch einen optionalen Satz von Umfängen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein Kirchenadmin mit der Berechtigung **Einstellungen bearbeiten** erstellt und verwaltet Schlüssel
- Der rohe Schlüssel wird **einmalig** bei der Erstellung angezeigt -- speichern Sie ihn sofort an einem sicheren Ort
- Alle API-Anfragen müssen **HTTPS** verwenden

</div>

## Schlüsselformat

Ein B1 API-Schlüssel sieht wie folgt aus:

```
cak_<prefix>.<secret>
```

- `cak_` -- Festbezeichner (das API-Schlüsselpräfix, das die Auth-Schicht abgleicht)
- `<prefix>` -- 8-stelliger öffentlicher Nachschlageteil
- `<secret>` -- 48-stelliges Geheimnis; serverseitig wird nur ein SHA-256-Hash gespeichert

## Creating a Key (B1Admin)

1. Melden Sie sich bei B1Admin als Benutzer mit **Einstellungen bearbeiten** an.
2. Öffnen Sie **Einstellungen → Entwickler → API-Schlüssel**.
3. Klicken Sie auf **Neuer API-Schlüssel**, geben Sie einen erkennbaren Namen ein und speichern Sie.
4. Der vollständige `cak_…`-Schlüssel wird **einmalig** angezeigt.

## Umfänge

Ein Umfang **begrenzt**, was ein Schlüssel tun kann.

| Umfang | Ermöglicht |
|---|---|
| `people:read` / `people:write` | Ansicht / Bearbeitung von Personen, Haushalten, Gruppenmitgliedern |
| `groups:read` / `groups:write` | Ansicht / Bearbeitung von Gruppen |
| `donations:read` / `donations:write` | Ansicht / Aufzeichnung von Spenden |
| `attendance:read` / `attendance:write` | Ansicht / Aufzeichnung von Teilnahme |
| `forms:write` | Verwaltung von Formularen |
| `content:read` / `content:write` | Ansicht / Bearbeitung von Website-Inhalten |
| `messaging:read` / `messaging:write` | Lesen von Nachrichten; Schreiben ermöglicht auch SMS-Versand |
| `roles:read` / `roles:write` | Ansicht / Bearbeitung von Rollendefinitionen |
| `settings:read` / `settings:write` | Ansicht / Bearbeitung von Kircheneinstellungen |
| `offline_access` | Ermöglichung langlebiger Refresh-Token |

## Best Practices

- **Ein Schlüssel pro Integration.**
- **Prägen Sie die engsten Umfänge, die funktionieren.**
- **Binden Sie den Schlüssel an ein Dienstkonto.**
- **Speichern Sie Schlüssel in einem Secret Manager.**
- **Rotieren Sie Schlüssel**, wenn Sie einen Verdacht haben.

## How It Differs from OAuth

API-Schlüssel sind angemessen, wenn **Ihre Kirche die einzige ist, die die Integration nutzt**.

| | API-Schlüssel | OAuth |
|---|---|---|
| Wer installiert es | Ein Kirchenadmin | Jeder Kirchenadmin autorisiert die App |
| Auth-Header | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Token-Lebensdauer | Bis widerrufen | Zugriff ≈ 7 Tage |
| Ideal für | Interne Skripte, Zapier/Make | Multi-Tenant-Drittanbieter-Apps |
