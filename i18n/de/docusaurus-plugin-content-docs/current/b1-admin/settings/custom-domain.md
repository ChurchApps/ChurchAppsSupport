---
title: "Eigene Domain"
---

# Eigene Domain

<div class="article-intro">

Sie können Ihre eigene Domain (zum Beispiel **`www.ihregemeinde.org`**) auf Ihre B1-Website verweisen lassen, sodass Besucher Ihre echte Internetadresse der Gemeinde erreichen statt der Standardadresse ihregemeinde.b1.church.

</div>

## Schritt 1 — Zuerst den DNS-Eintrag anlegen

Bevor Sie Ihre Domain in B1 hinzufügen, müssen Sie sie bei Ihrem Domain-Registrar (GoDaddy, Namecheap, Cloudflare usw.) auf die Server von B1 zeigen lassen.

Fügen Sie einen dieser Einträge hinzu – CNAME wird bevorzugt:

| Typ | Host | Wert |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `ihregemeinde.org` | `3.23.251.61` |

Verwenden Sie den **CNAME** für Ihre `www`-Adresse. Verwenden Sie den **A-Eintrag**, wenn Ihr Registrar CNAME für eine Root-Domain (ohne www) nicht unterstützt oder wenn auch die Root-Domain funktionieren soll.

Änderungen am DNS können einige Minuten bis einige Stunden dauern, bis sie wirksam sind.

## Schritt 2 — Die Domain in B1 hinzufügen

Sobald das DNS auf B1 zeigt:

1. Gehen Sie in B1 Admin zu **Einstellungen**.
2. Klicken Sie in der linken Liste auf **Domains** und dann im Abschnitt **Domains** auf **Bearbeiten**.
3. Geben Sie Ihre Domain in das Feld ein und klicken Sie auf **Speichern**.

Sie müssen nicht zuerst auf die Schaltfläche **+** klicken – eine Domain, die im Feld steht, wird beim Speichern hinzugefügt. Verwenden Sie **+** (oder drücken Sie die **Eingabetaste**), wenn Sie vor dem Speichern mehrere Domains zur Liste hinzufügen möchten.

B1 übernimmt das SSL-Zertifikat automatisch – Sie müssen kein Zertifikat kaufen.

:::warning
Wenn Sie die Domain in B1 hinzufügen, bevor die DNS-Einträge vorhanden sind, wird sie nicht gespeichert. Richten Sie das DNS daher immer zuerst ein.
:::

## Prüfen, ob es funktioniert

Besuchen Sie nach dem Speichern Ihre Domain in einem Browser. Wenn Ihre B1-Website geladen wird, sind Sie fertig. Wenn Sie eine Fehlermeldung sehen, wird das DNS möglicherweise noch übernommen – warten Sie einige Minuten und versuchen Sie es erneut.

Sie können die Ausbreitung des DNS auch auf [dnschecker.org](https://dnschecker.org) prüfen – suchen Sie nach Ihrer Domain und achten Sie darauf, dass Ihr CNAME- bzw. A-Eintrag angezeigt wird.
