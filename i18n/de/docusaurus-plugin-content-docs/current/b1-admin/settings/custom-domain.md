---
title: "Custom Domain"
---

# Custom Domain

<div class="article-intro">

Sie können Ihre eigene Domain (z. B. **www.yourchurch.org**) auf Ihre B1-Website verweisen, damit Besucher diese unter der echten Web-Adresse Ihrer Kirche aufrufen, anstatt die Standard-Adresse yourchurch.1.church zu verwenden.

</div>

## Schritt 1 — Zunächst den DNS-Datensatz hinzufügen

Bevor Sie Ihre Domain in B1 hinzufügen, müssen Sie sie bei Ihrer Domain-Registrierungsstelle (GoDaddy, Namecheap, Cloudflare usw.) auf die Server von B1 verweisen.

Fügen Sie einen dieser Datensätze hinzu – CNAME wird bevorzugt:

| Type | Host | Value |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Verwenden Sie das **CNAME** für Ihre `www`-Adresse. Verwenden Sie den **A-Datensatz**, wenn Ihre Registrierungsstelle CNAME auf einer Root/Apex-Domain (ohne www) nicht unterstützt, oder wenn Sie möchten, dass die Root-Domain auch funktioniert.

DNS-Änderungen können von wenigen Minuten bis zu einigen Stunden dauern.

## Schritt 2 — Fügen Sie die Domain in B1 hinzu

Sobald DNS auf B1 verweist:

1. Gehen Sie zu **Settings** in B1 Admin.
2. Klicken Sie auf **Domains**.
3. Geben Sie Ihre Domain in das Feld ein und klicken Sie auf **Save**.

Sie müssen nicht zuerst auf die **+**-Schaltfläche klicken – eine Domain, die im Feld eingegeben wird, wird hinzugefügt, wenn Sie speichern. Verwenden Sie **+** (oder drücken Sie **Enter**), wenn Sie mehrere Domains zur Liste hinzufügen möchten, bevor Sie speichern.

B1 verwaltet SSL automatisch – es ist keine Zertifikatskauf erforderlich.

:::warning
Wenn Sie die Domain in B1 hinzufügen, bevor Ihre DNS-Datensätze eingerichtet sind, wird sie nicht gespeichert. Stellen Sie immer DNS zuerst ein.
:::

## Überprüfung, ob es funktioniert

Besuchen Sie nach dem Speichern Ihre Domain in einem Browser. Wenn es Ihre B1-Website lädt, sind Sie fertig. Wenn Sie einen Fehler sehen, läuft DNS möglicherweise noch – warten Sie ein paar Minuten und versuchen Sie es erneut.

Sie können auch die DNS-Verbreitung unter [dnschecker.org](https://dnschecker.org) überprüfen – suchen Sie nach Ihrer Domain und achten Sie darauf, dass Ihr CNAME- oder A-Datensatz angezeigt wird.
