---
title: "Opprette grupper"
description: "Sett opp en ny gruppe i B1 Admin, fra valg av kategori og navn til innstillinger for påmelding, merkelapper, meldinger og oppmøte."
---

# Opprette grupper

<div class="article-intro">

Det er enkelt å opprette en gruppe i B1 Admin. Du setter opp en kategori, gir gruppen et navn, og konfigurerer deretter innstillingene. Grupper hjelper deg med å organisere menigheten i meningsfulle enheter som smågrupper, komiteer og klasser.

</div>

## Opplæringsvideo {#training-video}

<YouTube id="uG93pXVreNo" title="Creating Groups and Adding Members in B1" next="Group Join Requests and Group Calendars in B1" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv konto i B1 Admin med tillatelse til å administrere grupper. Se [Roller og tillatelser](../people/roles-permissions.md) hvis du er usikker på hvilket tilgangsnivå du har.
- Bestem en kategoristruktur for gruppene dine (for eksempel «Smågrupper», «Tjenester» eller «Komiteer»). Kategorier hjelper deg å holde beslektede grupper organisert.

</div>

## Legge til en ny gruppe {#adding-a-new-group}

1. Åpne [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **People** og klikk **Groups**.
2. Klikk **Add Group** i sidetoppen. Et skjema **New Group** åpnes under listen. Skriv inn et **Category Name**. Kategorier hjelper deg å samle beslektede grupper (for eksempel «Smågrupper», «Tjenester» eller «Komiteer»). Hvis en kategori allerede finnes, kan du velge den fra listen.
3. Skriv inn gruppens **Name**.
4. Klikk **Add** (eller **Cancel** for å lukke skjemaet). Den nye gruppen vises i listen, med kategorien vist under navnet.

## Konfigurere gruppeinnstillinger {#configuring-group-settings}

Når gruppen er opprettet, kan du fylle inn flere detaljer:

1. Klikk på **gruppenavnet** i listen for å åpne den.
2. Klikk knappen **Edit** på venstre side av gruppesiden, under gruppens detaljer. Skjemaet **Group Details** åpnes.
3. Konfigurer disse alternativene:
   - **Category Name** og **Group Name** – endre gruppens kategori eller gi den nytt navn.
   - **Meeting Time** og **Meeting Location** – når og hvor gruppen vanligvis møtes (for eksempel «Onsdager kl. 19.00» i «Rom 204»).
   - **Description** – en kort oppsummering av hva gruppen handler om, skrevet i formateringseditoren. Dette er synlig for medlemmene.
   - **Photo** – klikk på bildeboksen eller **Add Photo** for å velge eller laste opp et bilde til gruppen.
   - **Slug** – det korte nøkkelnavnet som brukes i gruppens nettadresse på menighetens nettsted.
   - **Labels** – tilordne én eller flere beskrivende merkelapper til gruppen (for eksempel «In-Person», «Online», «New Members Welcome»). Merkelapper er frie etiketter du definerer; kryss av for alle som passer, eller klikk **Add New Label** for å lage en ny. Merkelapper kan brukes til å filtrere grupper i nettstedselementet Groups Browser, og et nettstedselement for Group List kan vise bare grupper som har én bestemt merkelapp.
   - **Campus** – menigheten gruppen tilhører, hvis menigheten din har mer enn én.
   - **Enrollment** – velg hvem som kan bli med i denne gruppen:
     - **Open (members can join immediately)** – alle kan bli med uten godkjenning
     - **Request to Join (leader approval required)** – personer må sende inn en påmeldingsforespørsel som krever godkjenning (se [Forespørsler om å bli med i grupper](./group-join-requests.md))
     - **Closed (admin-add only)** – medlemmer må legges til manuelt av ledere eller administratorer
   - **Discussions** – slår gruppens chatstrøm av eller på, der alle medlemmer kan skrive. Er på (**Yes**) som standard.
   - **Announcements** – slår på en andre chatstrøm som bare ledere kan skrive i – medlemmene kan lese og reagere, men bare ledere kan legge ut innlegg. Er på (**Yes**) som standard.
   - **Show roster on website** – sett til **Yes** for å vise gruppens medlemmer på gruppens side på menighetens nettsted.
   - **Confidential group** – skjul denne gruppen og deltakerlisten fra offentlige sider, gruppesøket og ikke-medlemmer. Bruk dette for sensitive grupper, som rusomsorg eller veiledningstjeneste; bare gruppens medlemmer og menighetens ansatte kan se den.
4. For klasser og barnerom har skjemaet også disse seksjonene:
   - **Age & Grade** – **Minimum Age** og **Maximum Age** (i år og måneder) og **Minimum Grade** og **Maximum Grade**, som brukes til å foreslå riktig rom ved innsjekking. La dem stå tomme (eller **No limit**) for ingen grense. Se [Sikkerhet ved innsjekking](../attendance/checkin-safety.md#age-and-grade-room-guidance).
   - **Check-In Capacity** – **Capacity**, **Guest Capacity**, **Children per Volunteer**, **Minimum Volunteers** og **Closed for Check-In**. Se [Sikkerhet ved innsjekking](../attendance/checkin-safety.md#room-capacity-and-closing-a-room).
   - **Attendance** – **Track Attendance** (sett til **Yes** for å registrere [oppmøte](../attendance/tracking-attendance.md) for denne gruppen), **Attendance Reminder Emails** (minner gruppens ledere når en av gruppens kalenderhendelser fant sted i går, men ingen oppmøte ble registrert), **Parent Pickup** og **Print Nametag** (innsjekkingsalternativer for barnegrupper).
   - **Service Times (optional)** – velg et gudstjenestetidspunkt i **Add Service Time** og klikk plusknappen for å knytte gruppen til det; klikk fjern-ikonet ved siden av et gudstjenestetidspunkt for å ta det bort. Se [Oppmøteoppsett](../attendance/setup.md) for detaljer om gudstjenestetidspunkter.
5. Klikk **Save** for å lagre endringene, eller **Cancel** for å lukke skjemaet uten å lagre.

Venstre side av gruppesiden viser gruppens kategori, møtetid og -sted, beskrivelse, merkelapper og gudstjenestetidspunkter, pluss avkrysningsmerker for **Track Attendance**, **Print Nametag**, **Parent Pickup**, **Discussions** og **Announcements**, slik at du raskt ser hva som er slått på.

:::tip
En tydelig beskrivelse og møtetid hjelper medlemmene å vite hva de kan forvente når de blir med i en gruppe.
:::

:::info
Hvis du slår av både Discussions og Announcements, fjernes fanen Messages fra gruppen helt i medlemsportalen. Hvis du bare slår av den ene, skjules bare den fanen; medlemmene flyttes til den strømmen som fortsatt er på. Eksisterende meldinger beholdes uansett – bryterne styrer bare ny publisering.
:::

## Duplisere en gruppe {#duplicating-a-group}

Starter du en ny sesong av en gjentakende klasse eller tjeneste? I stedet for å skrive inn alle innstillingene på nytt, dupliser en eksisterende gruppe:

1. Åpne gruppen og klikk **Duplicate** (under knappen **Edit** på venstre side av gruppesiden).
2. Bekreft dupliseringen.

Kopien tar med seg innstillingene fra originalen – kategori, beskrivelse, bilde, møtetid/-sted, påmelding, merkelapper, campus, chatstrømmer, konfidensialitet, aldersgrenser og klassetrinn, innsjekkingskapasitet og oppmøteinnstillinger – men **ikke** medlemmene eller gudstjenestetidspunktene. Den nye gruppen åpnes med én gang; den får navnet til originalen med « (Copy)» lagt til, så gi den nytt navn i gruppeinnstillingene.

## Arkivere en gruppe {#archiving-a-group}

Når en gruppe ikke lenger er aktiv, men du vil beholde historikken i stedet for å slette den:

1. Åpne gruppen og klikk **Edit** for å redigere innstillingene.
2. Klikk **Archive** og bekreft.

Arkiverte grupper forsvinner fra hovedlisten over Groups. For å finne en igjen klikker du **Show archived**-knappen ved siden av kategoriknappene øverst på siden Groups, og deretter **Restore** ved siden av gruppen og bekrefter for å hente den tilbake.

:::info
Å arkivere en gruppe sletter ikke medlemmene, oppmøtehistorikken eller kalenderhendelsene – den skjuler bare gruppen fra standardlisten til du gjenoppretter den.
:::

## Slette en gruppe {#deleting-a-group}

For å fjerne en gruppe permanent åpner du den, klikker **Edit**, klikker **Delete** nederst i skjemaet **Group Details** og bekrefter. Sletting kan ikke angres – hvis du kanskje trenger gruppens historikk senere, [arkiver](#archiving-a-group) den i stedet.

## Neste steg {#next-steps}

Etter at du har opprettet og konfigurert gruppen, kan du:

- **Legge til medlemmer** – søk etter personer og legg dem til i gruppen. Bruk stjerneikonet (**Make Leader**) for å utpeke gruppeledere. Se [Gruppemedlemmer](./group-members.md).
- **Sette opp en kalender** – opprett hendelser og faste møter for gruppen. Se [Gruppekalender](./group-calendar.md).
- **Kommunisere** – send e-post, tekstmelding eller pushvarsel til gruppens medlemmer fra gruppesiden. Se [Gruppemedlemmer](./group-members.md#emailing-group-members).
- **Eksportere data** – klikk **Export** over gruppens medlemsliste for å laste den ned. For å laste ned hele listen over grupper klikker du **Export** i sidetoppen på Groups.

:::info
Hver gruppe tilhører en kategori, og hovedsiden Groups lar deg filtrere listen etter kategori. Du kan alltid omorganisere eller gi nytt navn til kategorier etter hvert som menigheten vokser.
:::
