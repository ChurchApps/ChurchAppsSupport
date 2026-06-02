---
title: "Serveradministrasjon"
---

# Serveradministrasjon

<div class="article-intro">

Serveradministrasjonsfunksjoner i ChurchApps er bare tilgjengelig for brukere med **Server.Admin**-tillatelsen. Disse verktøyene brukes for plattformoperasjoner, support og feilsøking på tvers av alle kirker i systemet.

</div>

:::warning Tilgang begrenset
Funksjonene beskrevet på denne siden krever **Server.Admin**-tillatelse og er ikke tilgjengelige for vanlige kirkeadministratorer. De er ment for plattformoperatører og supportpersonell bare.
:::

## Tilgang til serveradmin

Brukere med Server.Admin-tillatelse kan få tilgang til serveradmin-panelet fra B1 Admin:

1. Logg på [admin.b1.church](https://admin.b1.church)
2. Klikk på **Admin**-fanen i hoved-navigasjonen
3. Serveradmin-panelet inkluderer faner for administrasjon av kirker, brukere og systemoperasjoner

## Bruker-personifiering

Personifiserings-funksjonen lar server-admins logge på som en annen bruker for support- og feilsøkingsformål.

### Hvordan personifisere en bruker

1. Naviger til **Personifiser**-fanen i Server Admin-panelet
2. Skriv inn brukerens navn eller e-postadresse i søkefeltet
3. Klikk på **Søk** eller trykk Enter
4. Fra søkresultatene klikker du på brukeren du ønsker å personifisere
5. Bekreft personifiseringen i dialogen som vises
6. Du logger på som den brukeren

### Viktige merknader

- Personifisering oppretter en ny sesjon med målbrukerens tillatelser
- Din opprinnelige admin-sesjon slutter når du personifiserer
- Alle handlinger mens personifisert blir loggert i revisjonslogg
- For å returnere til admin-kontoen, logg ut og logg inn igjen

### API-sluttpunkt

Personifiserings-funksjonen er støttet av `/users/:userId/impersonate`-sluttpunktet.

### Sikkerhetsvurderinger

- Personifisering krever Server.Admin-tillatelse
- Alle personifiserings-hendelser blir logget
- Kirker blir ikke varslet når personifisering oppstår

## Relaterte sider

- [Godkjenning og tillatelser](/docs/developer/api/endpoints/authentication)
- [Medlemskaps-sluttpunkter](/docs/developer/api/endpoints/membership)
- [Revisjonslogg](/docs/b1-admin/reports/audit-log)

