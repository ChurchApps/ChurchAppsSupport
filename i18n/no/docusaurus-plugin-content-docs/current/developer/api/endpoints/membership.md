---
title: "Medlemskapsendepunkter"
---

# Medlemskapsendepunkter

<div class="article-intro">

Medlemskapsmodulen håndterer personer, kirker, grupper, husholdninger, roller, tillatelser, skjemaer og innstillinger. Det er den største modulen, og den gir det sentrale identitets- og autorisasjonslaget for alle andre moduler.

</div>

**Basissti:** `/membership`

## Personer

Basissti: `/membership/people`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | People.View eller Member | Liste alle personer for kirken |
| GET | `/:id` | JWT | People.View eller egen post | Hent en person etter ID (inkluderer skjemainnsendinger) |
| GET | `/ids?ids=` | JWT | People.View, Member eller People.ViewNames | Hent flere personer etter kommaseparerte ID-er. Kallere med People.ViewNames uten People.View får grunnmodellen, der personer som har reservert seg er utelatt (unntatt kalleren selv) |
| GET | `/basic?ids=` | JWT | — | Hent grunnleggende informasjon (kun navn) for flere personer |
| GET | `/names?ids=` | JWT | Enhver kirketillatelse | `[{ id, name: { display, first, last }, photo }]`, sortert etter etternavn og deretter fornavn, for kommaseparerte ID-er som kalleren allerede har tilgang til, slik at roller uten People.View (gaver, oppmøte) kan vise navn på personer. Ingen søk, ingen katalogfilter |
| POST | `/names` | JWT | Enhver kirketillatelse | Samme som `GET /names`. Body: `{ peopleIds }` (eller `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member eller People.ViewNames | Nylig lagt til personer. Kallere med People.ViewNames uten People.View (selv medlemmer med katalogtilgang) får grunnmodellen (`id`, `name.display`, `photo`, `membershipStatus`), der personer som har reservert seg er utelatt |
| GET | `/guest-register/options?churchId=` | Offentlig | — | Sjekkliste for QR-gjesteregistrering: returnerer `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, hver med `"off"`, `"optional"` eller `"required"` (tolkes fra den offentlige innstillingen `guestRegistrationFields`. Manglende eller ugyldige verdier faller tilbake til at e-post og telefon er valgfrie, og resten er av). Krever `enableQRGuestRegistration`, med mindre forespørselen har et samsvarende nettsted- eller kirketoken. Hastighetsbegrenset (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member eller People.ViewNames | Søk etter personer på navn eller e-post (opptil 100, sortert etter etternavn og deretter fornavn). Kallere med People.ViewNames uten People.View (selv medlemmer med katalogtilgang) får et navnesøk som returnerer grunnmodellen. Et `email`-søk returnerer `[]` |
| GET | `/search/phone?number=` | JWT | People.View eller Member | Søk etter telefonnummer |
| GET | `/search/group?groupId=` | JWT | People.View eller Member | Hent personer i en bestemt gruppe |
| GET | `/household/:householdId` | JWT | — | Hent alle personer i en husstand |
| GET | `/attendance` | JWT | People.Edit | Last deltakere med filtre (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Last tidslinjedata for personer og grupper |
| GET | `/directory/:id` | JWT | — | Hent person for katalogvisning (respekterer synlighetsinnstillinger) |
| GET | `/claim/:churchId` | JWT | — | Knytt en personpost til den innloggede brukeren i en kirke |
| POST | `/` | JWT | People.Edit eller EditSelf | Opprett eller oppdater personer (batch) |
| POST | `/search` | JWT | People.View, Member eller People.ViewNames | Søk etter personer (POST-variant). Body: `{ term }` eller `{ email }`. Samme regler for navnevisning som `GET /search` |
| POST | `/advancedSearch` | JWT | People.View eller Member | Søk med flere betingelser (alder, birthMonth, membershipStatus osv.). Body er en matrise med betingelser. En tom body betyr ingen betingelser, og enhver annen body som ikke er en matrise gir 400 |
| POST | `/loadOrCreate` | Offentlig | — | Finn eller opprett en person etter e-post. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Offentlig | — | QR-gjesteregistrering. Body: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 medlemmer; email, phone og maritalStatus gjelder kun for det første medlemmet). Felter som kirken har slått av, fjernes. Manglende påkrevde eller ugyldige verdier gir 400. Oppretter en ny husstand (oppkalt etter det første medlemmets etternavn) med alle medlemmer som `membershipStatus: "Visitor"`, deler `address` på tvers av alle medlemmer, lagrer `comments` som et notat på hovedpersonen, legger alle til i den private gruppen `guestRegistrationGroupId` hvis den er satt, og, når `guestRegistrationRecordAttendance` er `"true"`, registrerer oppmøte for gruppens planlagte gudstjenestetider der påmeldingsvinduet er åpent akkurat nå. Returnerer `{ householdId, people: [{ id, name }] }`. Samme regler for samtykke/token og hastighetsbegrensning som for alternativkallet |
| POST | `/household/:householdId` | JWT | People.Edit | Oppdater medlemstilordninger i husstanden |
| POST | `/public/email` | Offentlig | — | Send en e-post til en person. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Intern | — | Last e-postadresser for personer etter ID (server-til-server, krever jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Slett en person |

### Eksempel: Søk etter personer

```
GET /membership/people/search?term=John
Authorization: Bearer <token>
```

```json
[
  {
    "id": "abc-123",
    "name": { "first": "John", "last": "Smith" },
    "contactInfo": { "email": "john@example.com" },
    "membershipStatus": "Member"
  }
]
```

### Eksempel: Opprett en person

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Brukere

Basissti: `/membership/users`

Se [Autentisering og tillatelser](./authentication) for endepunkter for innlogging, registrering og passordhåndtering.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| POST | `/login` | Offentlig | — | Logg inn (e-post/passord, JWT-fornyelse eller authGuid) |
| POST | `/register` | Offentlig | — | Registrer en ny bruker |
| POST | `/forgot` | Offentlig | — | Send e-post for tilbakestilling av passord |
| POST | `/setPasswordGuid` | Offentlig | — | Sett passord ved hjelp av auth-GUID fra e-postlenken |
| POST | `/verifyCredentials` | Offentlig | — | Bekreft e-post/passord og returner tilknyttede kirker |
| POST | `/loadOrCreate` | JWT | — | Finn eller opprett en bruker etter e-post/userId |
| POST | `/setDisplayName` | JWT | — | Oppdater brukerens for- og etternavn |
| POST | `/updateEmail` | JWT | — | Endre brukerens e-postadresse |
| POST | `/updatePassword` | JWT | — | Endre brukerens passord (minst 6 tegn) |
| POST | `/updateOptedOut` | JWT | — | Sett en persons status for reservasjon |
| POST | `/sendInviteEmail` | JWT | People.Edit | Send en invitasjon på e-post til en person i denne kirken (`email`, `personName`, `contextName`). Knappen viser **Sign Up** for noen uten konto og **Log In** for en eksisterende bruker. En bruker som aldri har logget inn, får i stedet en lenke **Set Your Password** som utløper etter 7 dager. Dette er en fast mal, så den telles ikke mot kirkens daglige grense for e-post |
| GET | `/search?term=` | JWT | Server.Admin | Søk etter alle brukere på navn/e-post |
| DELETE | `/` | JWT | — | Slett den nåværende brukerkontoen |

## Kirker

Basissti: `/membership/churches`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | — | Last alle kirker for den nåværende brukeren |
| GET | `/:id` | JWT | — | Hent kirke etter ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Hent domeneadministratoren for en kirke |
| GET | `/:id/impersonate` | JWT | Server.Admin | Utgi deg for en kirke (kun serveradministrator) |
| GET | `/all?term=` | JWT | Server.Admin | Søk i alle kirker (administrator) |
| GET | `/search/?name=` | Offentlig | — | Søk etter kirker på navn |
| GET | `/lookup/?subDomain=&id=` | Offentlig | — | Slå opp en kirke etter underdomene eller ID |
| POST | `/` | JWT | Settings.Edit | Oppdater kirkeopplysninger |
| POST | `/add` | JWT | — | Registrer en ny kirke. Påkrevde felt: name, address1, city, state, zip, country |
| POST | `/search` | Offentlig | — | Søk etter kirker på navn (POST-variant) |
| POST | `/select` | JWT | — | Velg/bytt til en kirke. Body: `{ churchId }` eller `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Arkiver eller gjenopprett en kirke fra arkiv |
| POST | `/byIds` | Offentlig | — | Last flere kirker etter ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Slett kirker som har vært forlatt i 7 dager eller mer |

## Grupper

Basissti: `/membership/groups`

Utvider standard CRUD (GET `/`, GET `/:id` fra basisklassen).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | — | Liste alle grupper |
| GET | `/:id` | JWT | — | Hent gruppe etter ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Søk etter grupper med gudstjenestefilter |
| GET | `/my` | JWT | — | Hent grupper for den nåværende brukeren |
| GET | `/my/:tag` | JWT | — | Hent den nåværende brukerens grupper filtrert etter tagg |
| GET | `/tag/:tag` | JWT | — | Hent alle grupper med en bestemt tagg |
| GET | `/public/:churchId/:id` | Offentlig | — | Hent en offentlig gruppe etter kirke og ID |
| GET | `/public/:churchId/tag/:tag` | Offentlig | — | Hent offentlige grupper etter tagg |
| GET | `/public/:churchId/label?label=` | Offentlig | — | Hent offentlige grupper etter etikett |
| GET | `/public/:churchId/slug/:slug` | Offentlig | — | Hent en offentlig gruppe etter slug |
| POST | `/` | JWT | Groups.Edit | Opprett eller oppdater grupper (genererer slug automatisk) |
| DELETE | `/:id` | JWT | Groups.Edit | Slett en gruppe (sletter også underordnede team for tjenestegrupper) |

## Gruppemedlemmer

Basissti: `/membership/groupmembers`

Utvider standard CRUD (GET `/:id`, DELETE `/:id` fra basisklassen).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Hent gruppemedlem etter ID |
| GET | `/` | JWT | GroupMembers.View* | Liste gruppemedlemmer. Filtrer med `?groupId=`, `?groupIds=` eller `?personId=`. *Også tillatt hvis brukeren er med i gruppen eller spør etter sin egen personId, og for `?groupId=` i en hvilken som helst ikke-konfidensiell gruppe når brukeren har Attendance.View eller Attendance.Edit (medlemmer under 13 år inkluderes for dem) |
| GET | `/my` | JWT | — | Hent den nåværende brukerens gruppemedlemskap |
| GET | `/basic/:groupId` | JWT | — | Hent grunnleggende medlemsliste for en gruppe |
| GET | `/public/leaders/:churchId/:groupId` | Offentlig | — | Hent gruppeledere (offentlig) |
| GET | `/public/:churchId/:groupId` | Offentlig | — | Hent en gruppes offentlige liste (minimale felt: `personId`, `displayName`, `leader`, bilde). Kun når gruppen velger å delta via `publicRoster`. Brukes av elementet `staffGrid` i nettsidebyggeren |
| POST | `/` | JWT | GroupMembers.Edit | Legg til eller oppdater gruppemedlemmer |
| DELETE | `/:id` | JWT | GroupMembers.View | Fjern et gruppemedlem |

## Husholdninger

Basissti: `/membership/households`

Standard CRUD-kontroller.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | — | Liste alle husholdninger |
| GET | `/:id` | JWT | — | Hent husholdning etter ID |
| POST | `/` | JWT | People.Edit | Opprett eller oppdater husholdninger |
| DELETE | `/:id` | JWT | People.Edit | Slett en husholdning |

## Roller

Basissti: `/membership/roles`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Hent rolle etter ID |
| GET | `/church/:churchId` | JWT | Roles.View | Hent alle roller for en kirke. Hver rolle inkluderer `memberCount`, antall unike brukere i den |
| POST | `/` | JWT | Roles.Edit | Opprett eller oppdater roller |
| DELETE | `/:id` | JWT | Roles.Edit | Slett en rolle (fjerner også tillatelsene og medlemmene) |

## Rollemedlemmer

Basissti: `/membership/rolemembers`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Hent medlemmer for en rolle. Legg til `?include=users` for å inkludere brukerdetaljer |
| POST | `/` | JWT | Roles.Edit | Legg til medlemmer i en rolle (oppretter bruker hvis e-posten ikke finnes) |
| DELETE | `/:id` | JWT | Roles.View | Fjern et rollemedlem |
| DELETE | `/self/:churchId/:userId` | JWT | — | Fjern deg selv fra en kirke |

## Rolletillatelser

Basissti: `/membership/rolepermissions`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Hent tillatelser for en rolle (bruk `null` som ID for rollen «Everyone») |
| POST | `/` | JWT | Roles.Edit | Opprett eller oppdater rolletillatelser |
| DELETE | `/:id` | JWT | Roles.Edit | Slett en rolletillatelse |

## Tillatelser

Basissti: `/membership/permissions`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | — | Hent hele listen over tilgjengelige tillatelser |

Hver oppføring har `apiName`, `section` (innholdstype), `action` og etikettene `displaySection` / `displayAction` som B1Admins rolleredigering viser. Nylige tillegg: `MembershipApi` / `People` / `View Names` (**View People Names Only**, under People and Groups) og `GivingApi` / `Donations` / `Enter` (**Enter Donations**, under Donations; se [Gavebatcher](./giving.md#donation-batches)).

## Skjemaer

Basissti: `/membership/forms`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | Liste alle skjemaer (administrator ser alle, redigerere ser tildelte og ikke-medlemsskjemaer) |
| GET | `/:id` | JWT | Skjematilgang | Hent et skjema etter ID |
| GET | `/archived` | JWT | Forms.Admin eller Forms.Edit | Liste arkiverte skjemaer |
| GET | `/group/:groupId` | JWT | Gruppemedlem, gruppeleder eller Forms.Admin | Frittstående skjemaer knyttet til gruppen (`forms.groupId`), unntatt arkiverte, sortert etter navn. Returnerer `id`, `name`, `description` og `open` (innenfor tilgjengelighetsperioden). Medlemmer får kun åpne skjemaer. Ledere og skjemaadministratorer får også lukkede. Brukes til å vise koblede skjemaer på gruppesiden |
| GET | `/standalone/:id?churchId=` | JWT | — | Hent et frittstående skjema (begrensede skjemaer krever autentisering) |
| POST | `/` | JWT | Forms.Admin eller Forms.Edit | Opprett eller oppdater skjemaer. Frittstående skjemaer godtar valgfri `photoUrl` (overskriftsbilde vist over skjemaet) og `groupId` (koblet gruppe) |
| DELETE | `/:id` | JWT | Skjematilgang | Slett et skjema |

## Skjemainnsendinger

Basissti: `/membership/formsubmissions`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | Liste innsendinger. Filtrer med `?personId=` eller `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Kun for egne data: opptil 50 frittstående skjemainnsendinger (ikke personskjemaer) som innlogget medlem har sendt inn, eller som er knyttet til deres person (`contentType` `person`, `contentId` = deres person-ID, for eksempel etter at en administrator har endret person), nyeste først, hver med `form.name`. `include` legger til hvert skjemas spørsmål og innsendingens svar. Returnerer `401` hvis brukeren ikke er knyttet til en person. Brukes av seksjonen **My Forms** på B1 Me-siden |
| GET | `/group/:groupId` | JWT | Leder av gruppen | Svar for gruppens ledere: én oppføring per koblet skjema og per gruppearrangement med et påmeldingsskjema, hver med `form`, `event` (`id`, `title`, `start`; kun arrangementsoppføringer), `questions` og `submissions` (med `answers` og `personName`, `null` når innsendingen er anonym) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit eller visningstilgang | Hent innsending etter ID. Legg til `?include=form,questions,answers`. Ledere av skjemaets koblede gruppe og ledere av gruppen en arrangementspåmelding tilhører, kan også lese den |
| GET | `/formId/:formId` | JWT | Skjematilgang (visning) | Hent alle innsendinger for et skjema (inkluderer form, questions, answers). Ledere av skjemaets koblede gruppe har visningstilgang |
| POST | `/` | JWT | — | Send inn skjemasvar (håndterer begrensede/ubegrensede skjemaer, sender e-postvarsler). Når skjemaet har `autoCreatePerson`, finner eller oppretter det en gjesteperson etter e-post og kobler innsendingen; når skjemaet også har en `groupId`, legges personen til i gruppen; når `followUpSubject`/`followUpBody` er satt, sendes en mal-basert oppfølgings-e-post til avsenderen. Med mindre kalleren kan administrere skjemaet, settes `submittedBy` alltid til den innloggede medlemmets person (eller lar stå tomt for anonyme innsendinger) |
| DELETE | `/:id` | JWT | Forms.Admin eller Forms.Edit | Slett en innsending og dens svar |

## Spørsmål

Basissti: `/membership/questions`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | Skjematilgang | Liste spørsmål for et skjema. Krever `?formId=` |
| GET | `/:id` | JWT | Skjematilgang | Hent et spørsmål etter ID |
| GET | `/unrestricted?formId=` | JWT | — | Hent spørsmål for et ubegrenset skjema |
| GET | `/sort/:id/up` | JWT | — | Flytt et spørsmål opp i sorteringsrekkefølgen |
| GET | `/sort/:id/down` | JWT | — | Flytt et spørsmål ned i sorteringsrekkefølgen |
| POST | `/` | JWT | Skjematilgang | Opprett eller oppdater spørsmål (tildeler sorteringsrekkefølge automatisk) |
| DELETE | `/:id?formId=` | JWT | Skjematilgang | Slett et spørsmål |

## Svar

Basissti: `/membership/answers`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | Liste svar. Filtrer med `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin eller Forms.Edit | Opprett eller oppdater svar |

## Medlemstillatelser

Basissti: `/membership/memberpermissions`

Styrer hvert medlems tilgang til bestemte skjemaer.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/:id` | JWT | Skjematilgang | Hent en medlemstillatelse etter ID |
| GET | `/member/:id` | JWT | Skjematilgang | Hent alle skjematillatelser for et medlem |
| GET | `/form/:id` | JWT | Skjematilgang | Hent alle medlemstillatelser for et skjema |
| GET | `/form/:id/my` | JWT | Skjematilgang | Hent den nåværende brukerens tillatelse for et skjema |
| POST | `/` | JWT | Skjematilgang | Opprett eller oppdater medlemstillatelser |
| DELETE | `/:id?formId=` | JWT | Skjematilgang | Slett en medlemstillatelse |
| DELETE | `/member/:id?formId=` | JWT | Skjematilgang | Slett alle tillatelser for et medlem på et skjema |

## Innstillinger

Basissti: `/membership/settings`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Hent alle innstillinger for kirken |
| GET | `/public/:churchId` | Offentlig | — | Hent offentlige innstillinger for en kirke |
| POST | `/` | JWT | Settings.Edit | Lagre innstillinger (støtter opplasting av bilde i base64) |

## Domener

Basissti: `/membership/domains`

Utvider standard CRUD (GET `/:id`, GET `/`, DELETE `/:id` fra basisklassen).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | — | Liste alle domener |
| GET | `/:id` | JWT | — | Hent domene etter ID |
| GET | `/lookup/:domainName` | JWT | — | Slå opp et domene etter navn |
| GET | `/public/lookup/:domainName` | Offentlig | — | Offentlig domenesøk etter navn |
| GET | `/health/check` | Offentlig | — | Kjør helsesjekk på ukontrollerte domener |
| POST | `/` | JWT | Settings.Edit | Opprett eller oppdater domener (utløser oppdatering av Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Slett et domene |

## Bruker–kirke

Basissti: `/membership/userchurch`

Håndterer koblingen mellom brukere og kirker.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Hent bruker–kirke-post etter bruker-ID |
| GET | `/personid/:personId` | JWT | — | Hent e-post for en persons koblede bruker |
| GET | `/user/:userId` | JWT | Server.Admin | Last alle kirker for en bruker |
| POST | `/` | JWT | — | Opprett en kobling mellom bruker og kirke |
| PATCH | `/:userId` | JWT | — | Oppdater sist brukt-tidspunkt og logg tilgang |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Slett en bruker–kirke-post |

## Synlighetsinnstillinger

Basissti: `/membership/visibilityPreferences`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/my` | JWT | — | Hent den nåværende brukerens synlighetsinnstillinger |
| POST | `/` | JWT | — | Lagre synlighetsinnstillinger (synlighet for adresse, telefon og e-post) |

## Spørring

Basissti: `/membership/query`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| POST | `/members` | JWT | — | Søk etter medlemmer med naturlig språk ved hjelp av KI. Body: `{ text, subDomain, siteUrl }` |

## Klientfeil

Basissti: `/membership/clientErrors`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| POST | `/` | JWT | — | Logg en feil på klientsiden |

## Relaterte sider

- [Autentisering og tillatelser](./authentication) — Innloggingsflyt, JWT, OAuth, tillatelsesmodell
- [Endepunkter for oppmøte](./attendance) — Sporing av gudstjenester og besøk
- [Modulstruktur](../module-structure) — Mønstre for kodeorganisering
