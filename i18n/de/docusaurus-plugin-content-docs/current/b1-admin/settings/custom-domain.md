---
title: "Eigene Domain"
description: "Verbinden Sie Ihre eigene Domain, etwa www.yourchurch.org, mit Ihrer B1-Website, indem Sie DNS-Einträge setzen und die Domain in den Einstellungen in B1 Admin hinzufügen."
---

# Eigene Domain

<div class="article-intro">

Sie können Ihre eigene Domain (zum Beispiel **`www.yourchurch.org`**) auf Ihre B1-Website verweisen lassen, sodass Besucher sie unter der echten Webadresse Ihrer Gemeinde erreichen statt unter der Standardadresse yourchurch.b1.church.

</div>

## Schulungsvideo {#training-video}

<YouTube id="L5yaDusHts8" title="Verbinden einer eigenen Domain in B1" next="Einrichten von Livestreaming in B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Schritt 1 — Zuerst den DNS-Eintrag hinzufügen {#step-1--add-the-dns-record-first}

Bevor Sie Ihre Domain in B1 hinzufügen, müssen Sie sie bei Ihrem Domain-Registrar (GoDaddy, Namecheap, Cloudflare usw.) auf die Server von B1 verweisen.

Fügen Sie einen dieser Einträge hinzu – CNAME wird bevorzugt:

| Typ | Host | Wert |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Verwenden Sie den **CNAME** für Ihre `www`-Adresse. Verwenden Sie den **A-Eintrag**, wenn Ihr Registrar bei einer Root-Domain (ohne www) kein CNAME unterstützt oder wenn die Root-Domain ebenfalls funktionieren soll.

Änderungen an DNS-Einträgen können einige Minuten bis einige Stunden benötigen, bis sie wirksam werden.

## Schritt 2 — Die Domain in B1 hinzufügen {#step-2--add-the-domain-in-b1}

Sobald das DNS auf B1 zeigt:

1. Gehen Sie in B1 Admin zu **Einstellungen**.
2. Klicken Sie in der linken Liste auf **Domains** und dann im Abschnitt **Domains** auf **Bearbeiten**.
3. Geben Sie Ihre Domain in das Feld ein und klicken Sie auf **Speichern**.

Sie müssen nicht zuerst auf die Schaltfläche **+** klicken – eine Domain, die im Feld steht, wird beim Speichern hinzugefügt. Verwenden Sie **+** (oder drücken Sie **Eingabetaste**), wenn Sie vor dem Speichern mehrere Domains in die Liste aufnehmen möchten. Geben Sie nur die Domain ein, etwa `www.yourchurch.org` – nicht `https://` oder einen Seitenpfad.

Hat Ihre Gemeinde mehr als eine Website, erhält jede Domain außerdem ein Auswahlfeld **Website**. Belassen Sie es auf **Hauptwebsite** oder wählen Sie die Website, die diese Domain öffnen soll.

Um eine Domain zu entfernen, klicken Sie in ihrer Zeile auf das Löschsymbol und dann auf **Speichern**.

B1 übernimmt SSL automatisch – Sie müssen kein Zertifikat kaufen.

:::warning
B1 speichert die Domain auch dann, wenn Ihre DNS-Einträge noch nicht gesetzt sind. Die Domain lädt Ihre Website jedoch erst, und B1 kann das SSL-Zertifikat erst ausstellen, wenn das DNS auf B1 zeigt. Richten Sie daher zuerst das DNS ein. Eine Domain, die bereits eine andere Gemeinde verwendet, kann nicht hinzugefügt werden.
:::

## Prüfen, ob es funktioniert {#checking-if-its-working}

Besuchen Sie nach dem Speichern Ihre Domain in einem Browser. Lädt Ihre B1-Website, sind Sie fertig. Erscheint ein Fehler, ist das DNS möglicherweise noch nicht vollständig übernommen – warten Sie ein paar Minuten und versuchen Sie es erneut.

Sie können die DNS-Verbreitung auch auf [dnschecker.org](https://dnschecker.org) prüfen – suchen Sie nach Ihrer Domain und achten Sie darauf, dass Ihr CNAME- oder A-Eintrag angezeigt wird.
