---
title: "Stripe Import"
---

# Stripe Import

<div class="article-intro">

Hvis du accepterer onlinedonationer gennem Stripe, kan du bruge værktøjet Stripe Import til at trække disse transaktioner ind i B1 Admin, så alle dine giverdata er på et sted. Dette er særlig nyttigt til at fange transaktioner, der ikke blev automatisk synkroniseret.

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- Udfør [Online Giving Setup](online-giving-setup.md) for at forbinde din Stripe-konto til B1 Admin
- Bekræft, at du har donationer i dit Stripe-dashboard til det datointervallo, du vil importere

</div>

## Sådan virker det

Importprocessen bruger et trin-arbejdsflow: først læser du en forhåndsvisning af, hvad der ville blive importeret, og derefter bekræfter du importen. Denne dry-run tilgang lader dig gennemgå alt, før nogle data oprettes.

## Importering af transaktioner

1. I **B1 Admin**, gå til **Donationer > Batcher**.
2. Klik linket **Stripe Import** nederst på siden Batcher.
3. Vælg et **datointervaller** for de transaktioner, du vil importere.
4. Klik **Forhåndsvisning** for at køre et dry-run tjek.

## Gennemgang af forhåndsvisningen

Forhåndsvisningen viser hver transaktion fra Stripe sammen med en statusindikator:

- **Ny** -- denne transaktion er ikke blevet importeret endnu og vil blive inkluderet, hvis du fortsætter.
- **Allerede importeret** -- denne transaktion eksisterer allerede i B1 Admin og vil blive sprunget over.
- **Sprunget over** -- denne transaktion blev udelukket af en anden grund (f.eks. refundering eller mislykket opladning).

En opsummeringssektionen øverst viser det samlede antal transaktioner i hver kategori og de involverede dollarbeløb.

:::info
Forhåndsvisningstrinet opretter ingen records. Det er et skrivebeskyttet tjek, så du kan bekræfte, hvad der vil ske, før du forpligter dig.
:::

## Afslutning af importen

1. Gennemgå forhåndsvisningsresultaterne og opsummeringstotalerne.
2. Klik **Importér manglende** for at importere alle transaktioner markeret som **Ny**.
3. Når importen er afsluttet, opdateres statuspjeterne ved siden af hver transaktion for at vise resultatet.

## Tips til brug af Stripe Import

- Kør importen regelmæssigt (ugentlig eller månedlig) for at holde dine records aktuelle.
- Hvis en transaktion vises som **Allerede importeret**, betyder det, at B1 Admin allerede har en matchende record -- ingen handling er nødvendig.
- Brug datointervalpiltret til at fokusere på en bestemt periode, hvis du leder efter bestemte transaktioner.

:::tip
Efter import skal du besøge siden [Batcher](batches.md) for at bekræfte, at de importerede donationer vises korrekt, og totalerne passer med det, du ser i dit Stripe-dashboard.
:::

## Næste trin

- Kontroller [Donationsrapporter](donation-reports.md) for at gennemgå de importerede transaktioner sammen med dine øvrige giverdata
- Sikr dig, at importerede donationer er tildelt de korrekte [fonde](funds.md) for nøjagtige [giverbekendtelser](giving-statements.md)
