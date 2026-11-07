---
title: "Campus"
---

# Campus

<div class="article-intro">

Om din församling har fler än en plats kan du med **Campus** följa vilken plats varje person och grupp tillhör. När campus är konfigurerade visas de som ett alternativ i personprofiler, i närvarouppsättningen och på instrumentpanelen för demografi. Flerplatsförsamlingar kan filtrera, söka och skapa rapporter efter campus i hela B1 Admin.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver behörigheten **Redigera kyrkoinställningar** för att hantera campus. Se [Roller och behörigheter](./roles-permissions.md).

</div>

## Öppna campusinställningarna

I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster), väljer **Inställningar > Inställningar** och klickar på **Campus** i listan till vänster för att rulla till avsnittet **Campus**. Du kan också gå direkt dit via **/settings/campuses**. Du ser en lista över alla konfigurerade campus med namn, plats och tidszon.

## Lägga till ett campus

1. Klicka på **Lägg till campus**.
2. Fyll i uppgifterna om campuset:
   - **Namn** *(obligatoriskt)* — det visningsnamn som visas i hela B1 Admin (till exempel "Huvudcampus" eller "Norra campus").
   - **Adress** — campusets gatuadress (används för information; den är inte samma som församlingens huvudadress i kyrkoinställningarna).
   - **Ort / Län / Postnummer** — campusets läge.
   - **Tidszon** — campusets IANA-tidszon (till exempel *Europe/Stockholm*). [Incheckningsscheman](../attendance/setup.md#setting-a-check-in-schedule) för gudstjänster på detta campus öppnar och stänger i denna tidszon. Om den är inställd på **Ingen** används i stället din församlings [Tidszon](./church-settings.md#time-zone). Det är användbart när campus ligger i olika tidszoner.
   - **Webbplats** — en valfri webbadress till campusets egen webbnärvaro.
3. Klicka på **Spara**.

## Redigera ett campus

Klicka på en campusrad i listan för att öppna redigeraren i panelen till höger. Uppdatera fälten och klicka på **Spara**.

## Ta bort ett campus

Öppna ett campus för redigering och klicka på **Ta bort**. Du får en fråga om att bekräfta. Om du tar bort ett campus tas inte de personer som är kopplade till det bort. Deras campusfält blir bara tomt.

## Koppla personer till ett campus

När campus har skapats kan personal koppla en person till ett campus från personens profil:

1. Öppna en persons post under **Personer**.
2. Klicka på **Redigera**.
3. Välj campuset i rullgardinsmenyn **Campus**.
4. Klicka på **Spara**.

Du kan också uppdatera campus för flera personer samtidigt från sidan Personer. Markera flera personer, använd **Massredigering** och ange fältet Campus för alla på en gång.

## Filtrera efter campus

När campus är konfigurerade kan du filtrera i hela B1 Admin efter campus:

- **Personsökning** — lägg till ett villkor för Campus i den avancerade sökningen, eller öppna en [sparad lista](../people/lists.md) som är avgränsad till ett campus.
- **Demografi** — [instrumentpanelen för demografi](../people/demographics.md) visar ett cirkeldiagram för Campus när minst en person har ett campus tilldelat.
- **Närvarouppsättning** — varje gudstjänsttid i Närvaro kan kopplas till ett campus.

:::tip
Församlingar med en enda plats behöver inte konfigurera campus. Alla campusfunktioner är valfria. Om inga campus finns visas inte campusfält och diagram.
:::

## Relaterade artiklar

- [Kyrkoinställningar](./church-settings.md) — din församlings huvudadress och grafiska profil (separat från campusadresserna)
- [Demografi](../people/demographics.md) — diagrammet som visar fördelning per campus
- [Närvaroinställningar](../attendance/setup.md) — koppla gudstjänsttider till ett campus
- [Massredigering](../people/bulk-editing.md) — tilldela campus till många personer samtidigt
