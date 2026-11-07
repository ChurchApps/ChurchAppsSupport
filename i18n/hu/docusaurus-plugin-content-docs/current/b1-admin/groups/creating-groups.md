---
title: "Grupper oprettes"
---

# Grupper oprettes

<div class="article-intro">

Det er ligetil at oprette en gruppe i B1 Admin. Du opretter en kategori, giver gruppen et navn og konfigurerer derefter dens indstillinger. Grupper hjælper dig med at organisere din kirke i meningsfulde enheder som smågrupper, udvalg og klasser.

</div>

## Introduktionsvideo

<YouTube id="uG93pXVreNo" title="Oprettelse af grupper og tilføjelse af medlemmer i B1" next="Gruppeanmodninger og gruppekalendere i B1" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Før du begynder</h4>

- Du skal have en aktiv B1 Admin-konto med tilladelse til at administrere grupper. Se [Roller og tilladelser](../people/roles-permissions.md), hvis du er i tvivl om dit adgangsniveau.
- Beslut en kategoristruktur for dine grupper (for eksempel "Smågrupper", "Tjenester", "Udvalg"). Kategorier hjælper med at holde relaterede grupper organiseret.

</div>

## Tilføjelse af en ny gruppe

1. Åbn [Hoppemenuen](../introduction.md#getting-around-with-the-jump-menu) (søgefeltet øverst til venstre i B1 Admin), udvid **People**, og klik på **Groups**.
2. Klik på **Add Group** i sidehovedet. En formular **New Group** åbnes under listen. Indtast et **Category Name**. Kategorier hjælper dig med at organisere relaterede grupper sammen (for eksempel "Smågrupper", "Tjenester" eller "Udvalg"). Hvis en kategori allerede findes, kan du vælge den fra listen.
3. Indtast gruppens **Name**.
4. Klik på **Add**. Din nye gruppe vises på listen, med sin kategori vist under navnet.

## Konfiguration af gruppeindstillinger

Når din gruppe er oprettet, kan du udfylde yderligere oplysninger:

1. Klik på **gruppens navn** på listen for at åbne den.
2. Klik på knappen **Edit** i venstre side af gruppesiden, under gruppens oplysninger.
3. Konfigurer følgende indstillinger:
   - **Description** -- En kort oversigt over, hvad gruppen handler om. Dette er synligt for medlemmerne.
   - **Meeting Times** -- Hvornår gruppen typisk mødes (for eksempel "Onsdage kl. 19").
   - **Join Policy** -- Vælg, hvem der kan deltage i denne gruppe:
     - **Open** -- Alle kan deltage med det samme uden godkendelse
     - **Request** -- Personer skal indsende en anmodning om deltagelse, som kræver godkendelse (se [Gruppeanmodninger](./group-join-requests.md))
     - **Closed** -- Medlemmer skal tilføjes manuelt af ledere eller administratorer
   - **Labels** -- Tildel en eller flere beskrivende etiketter til gruppen (for eksempel "Fysisk til stede", "Online", "Nye medlemmer velkomne"). Etiketter er frie tags, du selv definerer; markér alle, der passer. Etiketter kan bruges til at filtrere grupper i webelementet Groups Browser.
   - **Confidential group** -- Skjul denne gruppe og dens medlemsliste fra offentlige sider, gruppesøgningen og ikke-medlemmer. Brug dette til følsomme grupper som afhængighedsgrupper eller rådgivningsarbejde; kun gruppens medlemmer og kirkens personale kan se den.
   - **Discussions** -- Slår gruppens chatfeed til eller fra, hvor ethvert medlem kan skrive. Er til som standard.
   - **Announcements** -- Slår et andet chatfeed til, kun for ledere -- medlemmer kan læse og reagere, men kun ledere kan skrive. Er til som standard.
   - **Attendance Tracking** -- Aktivér dette, hvis du vil registrere [fremmøde](../attendance/tracking-attendance.md) for denne gruppe.
   - **Service Times** -- Knyt gruppen til bestemte gudstjenestetider, hvis det er relevant. Se [Opsætning af fremmøde](../attendance/setup.md) for detaljer om gudstjenestetider.
4. Klik på **Save** for at anvende dine ændringer.

:::tip
En tydelig beskrivelse og et klart mødetidspunkt hjælper medlemmerne med at vide, hvad de kan forvente, når de deltager i en gruppe.
:::

:::info
Hvis du slår både Discussions og Announcements fra, fjernes fanen Messages fra gruppen helt i medlemsportalen. Slår du kun den ene fra, skjules dens fane, og medlemmerne flyttes til det feed, der stadig er aktivt. Eksisterende beskeder bevares under alle omstændigheder -- indstillingerne styrer kun, hvem der kan skrive nye beskeder.
:::

## Duplikering af en gruppe

Starter du en ny omgang af en tilbagevendende klasse eller tjeneste? I stedet for at indtaste alle indstillinger igen, kan du duplikere en eksisterende gruppe:

1. Åbn gruppen og klik på **Duplicate** (under knappen **Edit** i venstre side af gruppesiden).
2. Bekræft duplikeringen.

Kopien overtager den oprindelige gruppes indstillinger -- kategori, beskrivelse, mødetidspunkt/-sted, deltagelsespolitik, etiketter og campus -- men **ikke** dens medlemmer. Den nye gruppe får samme navn som den oprindelige med " (Copy)" tilføjet; omdøb den under gruppeindstillingerne.

## Arkivering af en gruppe

Når en gruppe ikke længere er aktiv, men du vil bevare dens historik i stedet for at slette den:

1. Åbn gruppen og klik på **Edit** for at redigere dens indstillinger.
2. Klik på **Archive** og bekræft.

Arkiverede grupper forsvinder fra hovedlisten over grupper. For at finde en igen skal du klikke på knappen **Show archived** ved siden af kategoriknapperne øverst på siden Groups og derefter klikke på **Restore** ud for gruppen for at gendanne den.

:::info
Arkivering af en gruppe sletter ikke dens medlemmer, fremmødehistorik eller kalenderbegivenheder -- den skjuler kun gruppen fra standardlisten, indtil du gendanner den.
:::

## Næste skridt

Når du har oprettet og konfigureret din gruppe, kan du:

- **Tilføje medlemmer** -- Søg efter personer og tilføj dem til gruppen. Brug stjerneikonet (**Make Leader**) til at udpege gruppeledere. Se [Gruppemedlemmer](./group-members.md).
- **Opsætte en kalender** -- Opret begivenheder og tilbagevendende møder for gruppen. Se [Gruppekalender](./group-calendar.md).
- **Kommunikere** -- Send beskeder direkte til alle gruppens medlemmer fra gruppesiden.
- **Eksportere data** -- Klik på **Export** over gruppens medlemsliste for at downloade den.

:::info
Hver gruppe hører til en kategori, og hovedsiden Groups lader dig filtrere listen efter kategori. Du kan til enhver tid omarrangere eller omdøbe kategorier, efterhånden som din kirke vokser.
:::
