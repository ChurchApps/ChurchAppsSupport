---
title: "Online givergang oppsett"
---

# Online givergang oppsett

<div class="article-intro">

B1 Admin integreres med Stripe, PayPal, Kingdom Funding og Paystack (for kirker i Afrika) slik at medlemmer kan gi online gjennom B1.church siden. Når konfigurert, vises online donasjoner automatisk i donasjons postene dine sammen med manuelt innskrevne gaver, noe som holder alt på ett sted.

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- Sett opp donasjons fondene dine slik at donorer kan bestemme gavene
- Opprett Stripe konto og aktiver den
- Ha B1 Admin innloggings legitimasjon klar

</div>

## Oppsett av Stripe

1. Opprett konto på stripe.com hvis du ikke allerede har en. Kontroller at du aktiverer kontoen og tar den ut av test modus.
2. I Stripe, gå til Utviklere > API nøkler.
3. Kopier din offentlige nøkkel.
4. Logg inn på B1 Admin.
5. Klikk kirke i øvre navigasjon, og klikk deretter rediger kirke innstillinger.
6. Klikk redigeringsikonet ved siden av kirke innstillinger.
7. Bla ned til givergang delen.
8. Sett leverandøren til Stripe.
9. Lim inn den offentlige nøkkelen inn i offentlig nøkkel feltet.
10. Gå tilbake til Stripe og avsløre din hemmelighets nøkkel.
11. Lim hemmelighets nøkkelen inn i hemmelighets nøkkel feltet og klikk Lagre.

## Valg av din valuta

Etter valg av Stripe som leverandør, vises en valuta rullegardinliste ved siden av API nøklene.

