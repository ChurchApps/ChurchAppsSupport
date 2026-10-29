---
title: "Eigene Domain"
---

# Eigene Domain

<div class="article-intro">

Sie können Ihre eigene Domain (zum Beispiel **`www.ihrekirche.org`**) auf Ihre B1-Website verweisen lassen, damit Besucher Ihre Website unter der echten Webadresse Ihrer Kirche erreichen statt unter der Standardadresse ihrekirche.b1.church.

</div>

## Schritt 1 -- Zuerst den DNS-Eintrag anlegen

Bevor Sie Ihre Domain in B1 hinzufügen, müssen Sie bei Ihrem Domainanbieter (GoDaddy, Namecheap, Cloudflare usw.) auf die Server von B1 verweisen.

Legen Sie einen dieser Einträge an -- CNAME wird bevorzugt:

| Typ | Host | Wert |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `ihrekirche.org` | `3.23.251.61` |

Verwenden Sie den **CNAME** für Ihre `www`-Adresse. Verwenden Sie den **A-Eintrag**, wenn Ihr Anbieter CNAME auf einer Root-Domain (ohne www) nicht unterstützt oder wenn auch die Root-Domain funktionieren soll.

DNS-Änderungen können einige Minuten bis einige Stunden brauchen, bis sie wirksam sind.

## Schritt 2 -- Die Domain in B1 hinzufügen

Sobald das DNS auf B1 zeigt:

1. Gehen Sie in B1 Admin zu **Einstellungen**.
2. Klicken Sie in der linken Liste auf **Domains** und dann im Abschnitt **Domains** auf **Bearbeiten**.
3. Geben Sie Ihre Domain in das Feld ein und klicken Sie auf **Speichern**.

Sie müssen nicht zuerst auf die Schaltfläche **+** klicken -- eine Domain, die im Feld steht, wird beim Speichern hinzugefügt. Verwenden Sie **+** (oder drücken Sie **Enter**), wenn Sie vor dem Speichern mehrere Domains in die Liste aufnehmen möchten.

B1 übernimmt SSL automatisch -- Sie müssen kein Zertifikat kaufen.

:::warning
Fügen Sie die Domain in B1 hinzu, bevor die DNS-Einträge bestehen, wird sie nicht gespeichert. Richten Sie das DNS immer zuerst ein.
:::

## Prüfen, ob es funktioniert

Besuchen Sie nach dem Speichern Ihre Domain in einem Browser. Wird Ihre B1-Website geladen, sind Sie fertig. Erscheint ein Fehler, ist das DNS möglicherweise noch in der Verbreitung -- warten Sie einige Minuten und versuchen Sie es erneut.

Den Stand der DNS-Verbreitung können Sie auch auf [dnschecker.org](https://dnschecker.org) prüfen -- suchen Sie Ihre Domain und sehen Sie nach, ob Ihr CNAME- oder A-Eintrag erscheint.
