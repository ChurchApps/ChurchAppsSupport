---
title: "Eigene Domain"
description: "Eigene Domain wie www.ihre-gemeinde.org in B1 Admin über DNS-Einträge und das Hinzufügen unter Einstellungen mit Ihrer B1-Website verbinden."
---

# Eigene Domain

<div class="article-intro">

Sie können Ihre eigene Domain (zum Beispiel **`www.ihrekirche.org`**) auf Ihre B1-Website verweisen lassen, damit Besucher sie unter der echten Webadresse Ihrer Kirche erreichen statt unter der Standardadresse ihrekirche.b1.church.

</div>

## Schritt 1 – Zuerst den DNS-Eintrag anlegen

Bevor Sie Ihre Domain in B1 hinzufügen, müssen Sie sie bei Ihrem Domain-Registrar (GoDaddy, Namecheap, Cloudflare usw.) auf die Server von B1 zeigen lassen.

Legen Sie einen dieser Einträge an – CNAME wird bevorzugt:

| Typ | Host | Wert |
|------|------|------|
| CNAME | `www` | `proxy.b1.church` |
| A | `ihrekirche.org` | `3.23.251.61` |

Verwenden Sie für Ihre `www`-Adresse den **CNAME**. Verwenden Sie den **A-Eintrag**, wenn Ihr Registrar CNAME für eine Root- bzw. Apex-Domain (ohne www) nicht unterstützt oder wenn auch die Root-Domain funktionieren soll.

Änderungen am DNS können einige Minuten bis einige Stunden brauchen, bis sie wirksam sind.

## Schritt 2 – Die Domain in B1 hinzufügen

Sobald das DNS auf B1 zeigt:

1. Gehen Sie in B1 Admin zu **Einstellungen**.
2. Klicken Sie in der Liste links auf **Domains** und dann im Abschnitt **Domains** auf **Bearbeiten**.
3. Geben Sie Ihre Domain in das Feld ein und klicken Sie auf **Speichern**.

Sie müssen nicht zuerst auf die Schaltfläche **+** klicken – eine Domain, die im Feld steht, wird beim Speichern hinzugefügt. Verwenden Sie **+** (oder drücken Sie **Eingabe**), wenn Sie vor dem Speichern mehrere Domains in die Liste aufnehmen möchten.

B1 übernimmt SSL automatisch – Sie müssen kein Zertifikat kaufen.

:::warning
Wenn Sie die Domain in B1 hinzufügen, bevor die DNS-Einträge bestehen, wird sie nicht gespeichert. Richten Sie das DNS immer zuerst ein.
:::

## Prüfen, ob es funktioniert

Rufen Sie Ihre Domain nach dem Speichern in einem Browser auf. Lädt sie Ihre B1-Website, sind Sie fertig. Erscheint ein Fehler, hat sich das DNS vielleicht noch nicht verbreitet – warten Sie ein paar Minuten und versuchen Sie es erneut.

Die Verbreitung des DNS können Sie außerdem auf [dnschecker.org](https://dnschecker.org) prüfen – suchen Sie nach Ihrer Domain und achten Sie darauf, dass Ihr CNAME- oder A-Eintrag angezeigt wird.
