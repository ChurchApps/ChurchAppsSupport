---
title: "Server-Administration"
---

# Server-Administration

<div class="article-intro">

Server-Administration-Funktionen in ChurchApps sind nur für Benutzer mit der **Server.Admin**-Berechtigung verfügbar.

</div>

:::warning Zugriff Eingeschränkt
Die auf dieser Seite beschriebenen Funktionen erfordern die Berechtigung **Server.Admin** und sind für normale Kirchenadministratoren nicht verfügbar.
:::

## Accessing Server Admin

Benutzer mit Server.Admin-Berechtigung können auf das Server-Admin-Panel von B1 Admin zugreifen:

1. Melden Sie sich bei [admin.b1.church](https://admin.b1.church) an
2. Klicken Sie auf die Registerkarte **Admin** in der Hauptnavigation
3. Das Server-Admin-Panel enthält Registerkarten zur Verwaltung von Kirchen, Benutzern und Systemoperationen

## User Impersonation

Die Impersonation-Funktion ermöglicht es Server-Admins, sich als anderer Benutzer anzumelden.

### How to Impersonate a User

1. Navigieren Sie zur Registerkarte **Impersonate** im Server-Admin-Panel
2. Geben Sie den Namen oder die E-Mail-Adresse des Benutzers ein
3. Klicken Sie auf **Search**
4. Klicken Sie auf den Benutzer, den Sie impersonieren möchten
5. Bestätigen Sie die Impersonation im angezeigten Dialog
6. Sie werden als dieser Benutzer angemeldet

### Wichtige Anmerkungen

- Die Impersonation erstellt eine neue Sitzung mit den Berechtigungen des Zielbenutzers
- Ihre ursprüngliche Admin-Sitzung endet, wenn Sie einen anderen Benutzer impersonieren
- Alle Aktionen werden im Audit-Trail protokolliert
- Um zu Ihrem Admin-Konto zurückzukehren, melden Sie sich ab und melden Sie sich wieder mit Ihren Anmeldedaten an

### Security Considerations

- Die Impersonation erfordert die Berechtigung Server.Admin
- Alle Impersonation-Ereignisse werden mit der Admin-Benutzer-ID und der Zielbenutzer-ID protokolliert
- Kirchen werden nicht benachrichtigt, wenn eine Impersonation auftritt

## Related Pages

- [Authentication & Permissions](./api/endpoints/authentication)
- [Membership Endpoints](./api/endpoints/membership)
- [Audit Log](./b1-admin/reports/audit-log)
