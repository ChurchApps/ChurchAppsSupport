---
title: "Benutzerdefinierte Domäne"
---

# Benutzerdefinierte Domäne

<div class="article-intro">

Du kannst deine eigene Domäne (z. B. **www.deinkirche.de**) auf deine B1-Website verweisen, damit Besucher sie unter der echten Webadresse deiner Kirche erreichen, anstatt unter der Standardadresse deinkirche.1.church.

</div>

## Schritt 1 -- Füge zuerst den DNS-Datensatz hinzu

Bevor du deine Domäne in B1 hinzufügst, musst du sie in deinem Domänenregistrar (GoDaddy, Namecheap, Cloudflare usw.) auf B1-Server verweisen.

Füge einen dieser Datensätze hinzu -- CNAME wird bevorzugt:

| Typ | Host | Wert |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `deinkirche.de` | `3.23.251.61` |

Verwende den **CNAME** für deine `www`-Adresse. Verwende den **A-Datensatz**, wenn dein Registrar CNAME auf einer Root/Apex-Domäne (ohne www) nicht unterstützt oder wenn du möchtest, dass die Root-Domäne auch funktioniert.

DNS-Änderungen können von ein paar Minuten bis zu ein paar Stunden dauern.

## Schritt 2 -- Füge die Domäne in B1 hinzu

Sobald DNS auf B1 verweist:

1. Gehe zu **Einstellungen** in B1 Admin.
2. Klicke auf **Domänen**.
3. Gib deine Domäne in das Feld ein und klicke auf **Speichern**.

B1 handhabt SSL automatisch -- kein Zertifikatskauf notwendig.

:::warning
Wenn du die Domäne in B1 hinzufügst, bevor deine DNS-Datensätze vorhanden sind, wird sie nicht gespeichert. Richte immer zuerst DNS ein.
:::

## Überprüfe, ob es funktioniert

Nach dem Speichern, besuche deine Domäne in einem Browser. Wenn sie deine B1-Website lädt, bist du fertig. Wenn du einen Fehler siehst, kann sein, dass DNS noch sich ausbreitet -- warte ein paar Minuten und versuche es erneut.

Du kannst die DNS-Ausbreitung auch unter [dnschecker.org](https://dnschecker.org) überprüfen -- suche deine Domäne und überprüfe, ob dein CNAME- oder A-Datensatz angezeigt wird.
