---
title: "Server-Administration"
---

# Server-Administration

<div class="article-intro">

Server-Administrationsfunktionen in ChurchApps sind nur für Benutzer mit der Berechtigung **Server.Admin** verfügbar. Diese Tools werden für Plattformoperationen, Support und Fehlerbehebung über alle Kirchen im System verwendet.

</div>

:::warning Zugriff eingeschränkt
Die auf dieser Seite beschriebenen Funktionen erfordern die Berechtigung **Server.Admin** und sind für reguläre Kirchenadministratoren nicht verfügbar. Sie sind nur für Plattformbetreiber und Support-Mitarbeiter bestimmt.
:::

## Zugriff auf Server Admin

Benutzer mit Server.Admin-Berechtigung können auf das Server-Admin-Panel von B1 Admin aus zugreifen:

1. Melden Sie sich bei [admin.b1.church](https://admin.b1.church) an
2. Klicken Sie auf den Tab **Admin** in der Hauptnavigation
3. Das Server-Admin-Panel umfasst Tabs zur Verwaltung von Kirchen, Benutzern und Systemoperationen

## Benutzer-Impersonation

Die Impersonation-Funktion ermöglicht es Server-Admins, sich als anderer Benutzer für Support- und Fehlerbehebungszwecke anzumelden.

### So imitieren Sie einen Benutzer

1. Navigieren Sie zum Tab **Impersonate** im Server-Admin-Panel
2. Geben Sie den Namen oder die E-Mail-Adresse des Benutzers in das Suchfeld ein
3. Klicken Sie auf **Search** oder drücken Sie Enter
4. Klicken Sie in den Suchergebnissen auf den Benutzer, den Sie imitieren möchten
5. Bestätigen Sie die Impersonation im angezeigten Dialog

### Wichtige Hinweise

- Impersonation erstellt eine neue Sitzung mit den Berechtigungen des Zielbenutzers
- Alle während der Impersonation durchgeführten Aktionen werden im Audit-Trail protokolliert
- Verwenden Sie Impersonation nur bei Bedarf für Support-Zwecke

### Sicherheitsüberlegungen

- Impersonation erfordert Server.Admin-Berechtigung
- Alle Impersonation-Ereignisse werden protokolliert
- Kirchen werden nicht benachrichtigt, wenn Impersonation auftritt

## Verwandte Seiten

- [Authentication & Permissions](/docs/developer/api/endpoints/authentication)
- [Membership Endpoints](/docs/developer/api/endpoints/membership)
- [Audit Log](/docs/b1-admin/reports/audit-log)
