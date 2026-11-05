---
title: "Eigene Domain"
---

# Eigene Domain

<div class="article-intro">

Sie können Ihre eigene Domain (zum Beispiel **`www.ihrekirche.de`**) auf Ihre B1-Website verweisen lassen, damit Besucher unter der echten Webadresse Ihrer Kirche ankommen statt unter der Standardadresse ihrekirche.b1.church.

</div>

## Einführungsvideo

<YouTube id="L5yaDusHts8" title="Eine eigene Domain in B1 verbinden" next="Einrichtung von Livestreaming in B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Schritt 1 — Zuerst den DNS-Eintrag anlegen

Bevor Sie Ihre Domain in B1 hinzufügen, müssen Sie sie bei Ihrem Domainanbieter (GoDaddy, Namecheap, Cloudflare usw.) auf die Server von B1 verweisen lassen.

Legen Sie einen dieser Einträge an -- CNAME wird bevorzugt:

| Typ | Host | Wert |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `ihrekirche.de` | `3.23.251.61` |

Verwenden Sie für Ihre `www`-Adresse den **CNAME**. Verwenden Sie den **A-Eintrag**, wenn Ihr Anbieter CNAME für die Root-Domain (ohne www) nicht unterstützt oder wenn die Root-Domain ebenfalls funktionieren soll.

DNS-Änderungen können einige Minuten bis einige Stunden brauchen, bis sie wirksam sind.

## Schritt 2 — Die Domain in B1 hinzufügen

Sobald DNS auf B1 zeigt:

1. Öffnen Sie in B1 Admin **Einstellungen**.
2. Klicken Sie in der linken Liste auf **Domains** und dann im Abschnitt **Domains** auf **Bearbeiten**.
3. Geben Sie Ihre Domain in das Feld ein und klicken Sie auf **Speichern**.

Sie müssen nicht zuerst auf die Schaltfläche **+** klicken -- eine Domain, die im Feld steht, wird beim Speichern hinzugefügt. Verwenden Sie **+** (oder drücken Sie **Enter**), wenn Sie vor dem Speichern mehrere Domains zur Liste hinzufügen möchten.

B1 übernimmt das SSL-Zertifikat automatisch -- Sie müssen kein Zertifikat kaufen.

:::warning
Wenn Sie die Domain in B1 hinzufügen, bevor die DNS-Einträge bestehen, wird sie nicht gespeichert. Richten Sie DNS daher immer zuerst ein.
:::

## Prüfen, ob es funktioniert

Besuchen Sie nach dem Speichern Ihre Domain im Browser. Wenn Ihre B1-Website geladen wird, sind Sie fertig. Erscheint eine Fehlermeldung, ist DNS unter Umständen noch in der Verbreitung -- warten Sie einige Minuten und versuchen Sie es erneut.

Sie können die DNS-Verbreitung auch auf [dnschecker.org](https://dnschecker.org) prüfen -- suchen Sie nach Ihrer Domain und achten Sie darauf, dass Ihr CNAME- oder A-Eintrag dort erscheint.
