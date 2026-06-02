---
title: "Connected Apps & OAuth"
---

# Connected Apps & OAuth

<div class="article-intro">

Die B1 API unterstützt OAuth 2.0, damit eine Drittanbieter-Anwendung jeden Kirchenadmin um Erlaubnis bitten kann, auf seine Daten zuzugreifen -- ohne dass die Kirche jemals ein Passwort oder einen API-Schlüssel freigibt. Eine **Connected App** ist ein OAuth-Token, das ein Kirchenadmin genehmigt hat; das Widerrufen davon unterbricht den Zugriff der Drittanbieter-App mit einem Klick.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein OAuth-**Client** muss registriert sein, bevor Kirchen ihm Zugriff gewähren können
- Alle OAuth-Endpunkte befinden sich unter dem Mitgliedschaftsmodul: `/membership/oauth/...`
- Zugriffstoken sind JWTs -- sie tragen die Berechtigungen des Benutzers, gefiltert durch die gewährten Umfänge

</div>

## Konzepte

| Begriff | Bedeutung |
|---|---|
| **OAuth-Client** | Die Drittanbieter-App selbst -- identifiziert durch `client_id`, gesichert durch `client_secret` |
| **Connected App** | Ein spezifisches `(Client, Kirchenadmin)`-Paar, bei dem der Admin dem Client Zugriff gewährt hat |
| **Zugriffstoken** | Ein kurzlebiges JWT (≈ 7 Tage), das der Client für API-Aufrufe verwendet |
| **Refresh-Token** | Ein langlebiges undurchsichtiges String (≈ 90 Tage) |
| **Umfang** | Begrenzt, was das Zugriffstoken tun kann |

## Grant-Flüsse

B1 unterstützt drei OAuth-Flüsse, alle definiert durch RFC 6749 + RFC 8628.

### Authentifizierungscode (Web-Apps)

Verwenden Sie, wenn Ihre App eine serverseitige Komponente hat.

1. **Autorisieren**

2. **Code gegen Token austauschen**

3. **Aktualisieren**, wenn das Zugriffstoken bald abläuft

### Device Code (TVs, kiosks, CLI)

Verwenden Sie, wenn das Gerät keinen Browser hat.

### Refresh Token

Immer als eigenständige Anfrage verfügbar.

## Token-Form

Ein Zugriffstoken ist ein B1-ausgegebenes JWT, identisch mit einem, das ein Benutzer von `POST /membership/users/login` bekommen würde.

## Connected Apps (User-Facing)

In B1Admin: **Einstellungen → Entwickler → Connected Apps** zeigt:

- Den Namen des Clients
- Die Umfänge, die der Admin genehmigt hat
- Das Datum, an dem Zugriff gewährt wurde
- Eine **Widerruf**-Schaltfläche

## SDK-Unterstützung

Das Paket `@churchapps/integration-sdk` umhüllt jeden OAuth-Fluss mit typisierten Helfern.
