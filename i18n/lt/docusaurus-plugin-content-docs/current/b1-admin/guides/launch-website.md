---
title: "Vadovas: paleiskite savo bažnyčios svetainę"
description: "Nustatykite bažnyčios svetainę B1 Admin: pagrindinis puslapis, spalvos ir logotipas, svarbūs puslapiai, savas domenas ir aukojimo formos."
---

# Paleiskite savo bažnyčios svetainę

<div class="article-intro">

B1.church įtraukia visavertį svetainių kūrėją be papildomo mokesčio. Šiame vadove žingsnis po žingsnio parodoma, kaip sukurti bažnyčios svetainę nuo nulio: nustatyti pagrindinį puslapį, sukonfigūruoti išvaizdą, pridėti svarbiausius puslapius ir, jei norite, prijungti internetinių aukų bei renginių registracijos formas.

</div>

## Mokomasis vaizdo įrašas

<YouTube id="aA4UahZpmXg" title="Bažnyčios svetainės paleidimas B1 sistemoje" next="Puslapių ir navigacijos redagavimas B1 sistemoje" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Turėkite paruoštą bažnyčios logotipą (geriausiai tinka PNG su skaidriu fonu)
- Pasirinkite 2–3 firminės spalvas savo svetainei
- Jei naudosite savo domeno vardą (pvz., jusubaznycia.lt), turėkite prieigą prie savo DNS teikėjo (GoDaddy, Cloudflare ir kt.)
- Jei norite internetinių aukų savo svetainėje, pirmiausia atlikite [Internetinių aukų nustatymą](../donations/online-giving-setup.md) (Stripe)

</div>

## 1 žingsnis: Pradinis svetainės nustatymas

Pradėkite nuo pagrindinio puslapio ir bazinės svetainės struktūros sukūrimo.

Vadovaukitės [Pradinio svetainės nustatymo](../website/initial-setup.md) vadovu, kad:

1. Eitumėte į **Website** B1 Admin sistemoje
2. Sukurtumėte pagrindinį puslapį su pagrindiniu skyriumi, sveikinimo žinute ir svarbia informacija
3. Pridėtumėte savo bažnyčios pavadinimą ir šūkį

## 2 žingsnis: Sukonfigūruokite išvaizdą

Nustatykite savo svetainės vizualinę tapatybę: spalvas, šriftus, logotipą ir poraštę.

Vadovaukitės [Išvaizdos](../website/appearance.md) vadovu, kad:

1. Įkeltumėte bažnyčios logotipą
2. Nustatytumėte pagrindinę ir akcentinę spalvas
3. Sukonfigūruotumėte navigacijos juostą ir poraštę
4. Peržiūrėtumėte pakeitimus

:::tip
Palaikykite paprastą spalvų paletę: pagrindinės spalvos ir vienos akcentinės paprastai pakanka. Svetainių kūrėjas pasirūpins likusiu.
:::

## 3 žingsnis: Pridėkite turinio puslapius

Sukurkite puslapius, kurių lankytojams labiausiai reikia.

Vadovaukitės [Puslapių valdymo](../website/managing-pages.md) vadovu, kad sukurtumėte tokius puslapius kaip:

- **Apie mus** — Jūsų bažnyčios istorija, įsitikinimai ir vadovystė
- **Pamokslai** — Nuoroda į jūsų [pamokslų biblioteką](../sermons/managing-sermons.md)
- **Renginiai** — Artėjantys renginiai ir registracija
- **Aukoti** — Internetinių aukų puslapis (reikia [Stripe nustatymo](../donations/online-giving-setup.md))
- **Kontaktai** — Vieta, pamaldų laikai ir kontaktinė informacija

## 4 žingsnis: Prijunkite savo domeną

Jei norite naudoti savo domeno vardą (pvz., jusubaznycia.lt), o ne numatytąjį B1 adresą:

1. Eikite į **Settings** B1 Admin sistemoje ir atidarykite skyrių **Domains**
2. Įveskite savo pasirinktinį domeną
3. Atnaujinkite DNS įrašus savo domeno teikėjo sistemoje, kad jie rodytų į B1

:::info
DNS pakeitimų įsigaliojimas gali užtrukti iki 48 valandų. Jūsų svetainė gali nebūti pasiekiama iš pasirinktinio domeno iš karto. Numatytasis B1 adresas per tą laiką ir toliau veiks.
:::

## 5 žingsnis: Pridėkite aukas ir formas

Papildykite savo svetainę interaktyviais elementais:

- **Internetinės aukos** — Pridėkite aukų skyrių, kad nariai galėtų aukoti tiesiai iš jūsų svetainės. Pirmiausia sukonfigūruokite Stripe pagal [Internetinių aukų nustatymo](../donations/online-giving-setup.md) vadovą.
- **Registracijos formos** — Įdėkite [savarankiškas formas](../forms/creating-forms.md) renginių registracijai, lankytojų kortelėms ar savanorių paraiškoms. Kaip pridėti formos elementą bet kuriam puslapiui, žr. [Puslapių valdymo](../website/managing-pages.md) vadove.

## Viskas paruošta!

Jūsų bažnyčios svetainė veikia. Pasidalykite adresu su bendruomene ir socialiniuose tinkluose. Turinį galite atnaujinti, pridėti naujų puslapių ir keisti išvaizdą bet kada iš B1 Admin valdymo skydelio.

## Susiję straipsniai

- [Pradinis svetainės nustatymas](../website/initial-setup.md) — išsamus nustatymo vadovas
- [Puslapių valdymas](../website/managing-pages.md) — pridėkite ir redaguokite puslapius
- [Išvaizda](../website/appearance.md) — spalvos, logotipas ir maketas
- [Failų valdymas](../website/files.md) — įkelkite vaizdus ir dokumentus
- [Internetinių aukų nustatymas](../donations/online-giving-setup.md) — sukonfigūruokite Stripe
- [Formų kūrimas](../forms/creating-forms.md) — sukurkite registracijos ir apklausos formas
