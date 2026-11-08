---
title: "Planvalidatie & meldingen"
description: "Controleer dienstplannen in B1 Admin op onbezette posities, planningsconflicten en geblokkeerde vrijwilligers, en stuur daarna met één klik een pushmelding naar je hele team."
---

# Planvalidatie & vrijwilligersmeldingen

<div class="article-intro">

B1 Admin controleert je plannen automatisch op problemen vóór zondag: onbezette posities, planningsconflicten en vrijwilligers die de datum hebben geblokkeerd. Als alles in orde is, kun je met één klik je hele team een melding sturen.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Maak een [dienstplan](./plans.md) aan en wijs vrijwilligers toe aan posities
- Voeg [dienstijden](./plans.md) toe aan het plan, zodat de conflictdetectie overlappingen kan controleren
- Zorg dat vrijwilligers de [B1 App hebben geïnstalleerd](../../b1-church/getting-started/installing-pwa.md) om pushmeldingen te kunnen ontvangen

</div>

## Het validatiepaneel

Elk plan heeft een **Validatie**-paneel dat automatisch wordt uitgevoerd terwijl je het plan opbouwt. Het controleert drie dingen:

### Onbezette posities
Als een positie meer mensen vereist dan er momenteel zijn toegewezen, vermeldt het validatiepaneel precies wat er nog nodig is, bijvoorbeeld *"Geluidstechnicus: 1 persoon meer nodig."* Je ziet in één oogopslag of je plan volledig bezet is voordat de week begint.

### Planningsconflicten
Als een vrijwilliger is toegewezen aan twee posities die in tijd overlappen binnen hetzelfde plan, markeert het validatiepaneel het conflict, bijvoorbeeld *"Jane Smith: tijdconflict tussen Worship Leader en Kinderen-check-in tijdens Zondagsdienst."* Zo worden dubbele boekingen opgevangen voordat ze een probleem worden op zondagochtend.

### Blokkeerdata
Vrijwilligers kunnen in de B1 App data instellen waarop ze niet beschikbaar zijn. Als iemand is ingepland voor een plan dat binnen een van zijn of haar blokkeerdata valt, toont het validatiepaneel het conflict automatisch zodat je een vervanger kunt zoeken.

### Conflicten tussen plannen
De validatie controleert ook al je plannen tegelijk. Als dezelfde vrijwilliger is toegewezen aan twee verschillende plannen die in tijd overlappen, bijvoorbeeld een dienst van 9 uur en een dienst van 10 uur die beide tot 10:30 uur duren, markeert B1 Admin die persoon als dubbel geboekt over plannen heen.

:::tip
Je hoeft niets te doen om de validatie te starten. Ze wordt automatisch bijgewerkt telkens wanneer je een toewijzing toevoegt of wijzigt. Houd het paneel gewoon in de gaten terwijl je het plan opbouwt.
:::

## Vrijwilligers informeren

Zodra je plan klaar is, kun je alle toegewezen vrijwilligers in één keer informeren vanuit het validatiepaneel.

1. Open het plan en scrol naar het **Validatie**-paneel
2. Als er vrijwilligers zijn die nog niet zijn geïnformeerd, zie je een link met het aantal dat geïnformeerd moet worden (bijv. *"8 vrijwilligers informeren"*)
3. Klik op de link om pushmeldingen te sturen naar iedereen die nog niet is geïnformeerd
4. Vrijwilligers ontvangen een melding op hun telefoon waarin staat dat ze zijn ingepland, met het verzoek hun toewijzing te bevestigen

:::info
Alleen vrijwilligers die nog niet zijn geïnformeerd, worden meegenomen. Als je later iemand aan het plan toevoegt, verschijnt de link opnieuw zodat je die nieuwe persoon kunt informeren zonder het hele team opnieuw een melding te sturen.
:::

### Plannen met een bevestigingsworkflow

Als de instellingen van het plan een [bevestigingsworkflow](./workflows.md#serving-assignment-confirmations) aanwijzen, toont het paneel *"Nieuwe verzoeken gebruiken de bevestigingsworkflow. App-meldingen blijven ingeschakeld. Opvolgingsberichten stoppen zodra elk verzoek is geaccepteerd of afgewezen."* In dat geval geldt het volgende:

- De meldingslink telt alleen vrijwilligers die nog niet zijn geïnformeerd en nog niet hebben gereageerd.
- Als je erop klikt, wordt de gebruikelijke melding in de app verstuurd en wordt per verzoek een kaart aangemaakt op het bord van de workflow. De workflow stuurt vervolgens de e-mail- en sms-opvolging en, indien nodig, draagt hij het verzoek over aan iemand die moet bellen.
- Het plan moet gepubliceerd zijn (niet alleen voorlopig) en de workflow moet actief zijn. Anders toont het paneel *"Verzoeken konden niet worden verstuurd. Controleer of de geselecteerde workflow actief is en of het plan is gepubliceerd, en probeer het daarna opnieuw."*

:::warning
Vrijwilligers moeten de B1 App op hun beginscherm hebben geïnstalleerd en meldingen hebben ingeschakeld om pushmeldingen te ontvangen. Zie [Installeren als app (PWA)](../../b1-church/getting-started/installing-pwa.md) voor installatie-instructies.
:::

## Gerelateerde artikelen

- [Dienstplannen](./plans.md)
- [Workflows](./workflows.md)
- [De B1.church-PWA installeren](/docs/b1-church/getting-started/installing-pwa)
