---
title: "Eksportér data"
---

# Eksportér data

<div class="article-intro">

B1 Admin lader dig eksportere dine kirkesdata så du kan bruge dem i regneark, dele dem med dit hold eller beholde en backup. Uanset om du skal have en hurtigt liste over navne og e-mails eller en komplet database eksport, der er muligheder for at passe til dine behov.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Du har brug for en aktiv B1 Admin-konto med tilladelse til at se de data du vil eksportere. Se [Roller og tilladelser](roles-permissions.md) hvis du er usikker på dit adgangsniveau.
- For en fuld database eksport, du har brug for adgang til **Indstillinger** område.

</div>

## Eksportér fra folk siden

Den hurtigste måde at eksportere dit katalog er direkte fra **Folk** siden:

1. Gå til **Folk** i venstre sidebar.
2. Brug søgelinjen eller filtre for at indsnævre de resultater du ønsker at eksportere (eller lad det være ufiltreret for at eksportere alle). Se [Søg folk](searching-people.md) for tips på filtrering.
3. Brug **søjle vælger** for at vælge hvilke søjler du ønsker inkluderet i eksportens (for eksempel navn, e-mail, telefon, adresse).
4. Klik **Eksportér** knap.
5. En CSV fil downloaderer til din computer med dataene som vises i tabellen.

:::tip
Tilpas dine søjler før eksport. CSV filen vil inkludere præcis de søjler som du har synlige, så du kan skræddersy eksporten til dine behov uden at redigere filen bagefter.
:::

## Fuld data eksport fra indstillinger

For en komplet eksport af alle dine B1 data (ikke bare folk), brug eksport værktøjet i indstillinger:

1. Klik **Indstillinger** i venstre sidebar.
2. Klik **Import/eksport** i øverste navigation.
3. Vælg **B1 database** fra **datakilde** dropdown.
4. Gennemgå datadata forhåndsvisning og klik **Fortsæt til destination**.
5. Vælg **B1 eksport ZIP** som eksport destination.
6. Overvåg eksport progres indtil alle elementer viser grønne flueben.
7. Eksport filen downloaderer automatisk. Se efter `B1Export` filen i dine downloads folder.
8. Pak filen ud for at få adgang til individuelle CSV filer (såsom `people.csv`) som du kan åbne i Excel, Google regneark eller numre.

:::info
Fuld data eksporter inkluderer folk, grupper, donationer, tilstedeværelse og mere -- alt i din B1 database. Dette er også en god måde at opbygge en periodisk backup af dine kirke registreringer.
:::

## Eksportér gruppesdata

Du kan også eksportere medlemmer lister for individuelle grupper. Fra **Grupper** siden, åbn en gruppe og klik **download ikon** for at eksportere den gruppes medlems liste. Se [Gruppedlemmer](../groups/group-members.md) for mere detaljer.

:::info
Eksporterede CSV filer fungerer med alle store regneark applikationer inkluderet Microsoft Excel, Google regneark og Apple numre.
:::
