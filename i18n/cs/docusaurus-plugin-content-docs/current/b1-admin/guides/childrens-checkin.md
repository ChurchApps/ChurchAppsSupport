---
title: "Podrobný návod: Nastavení dětské check-in služby"
description: "Nastavte v B1 Admin odbavení dětí: propojte rodiny, vytvořte skupiny podle věku, nastavte bohoslužby a vytiskněte jmenovky pro kiosek B1 Checkin."
---

# Nastavení dětské check-in služby

<div class="article-intro">

Tento návod vás provede vším, co je potřeba k tomu, aby v tom vašem sboru fungoval systém pro přihlašování dětí — od zadání rodin do databáze, přes nastavení skupin podle věku, až po tisk jmenovek v neděli ráno. Na konci budou rodiče moci přihlásit své děti na dotykovém tabletu a obdrží odpovídající bezpečnostní štítek.

</div>

## Video k tomuto tématu

<YouTube id="Ep9CBUcJwPI" title="Nastavení dětského check-inu v B1" next="Zaznamenávání a sledování docházky v B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Než začnete</h4>

- Vytvořte si účet vašeho sboru na [admin.b1.church](https://admin.b1.church)
- Ujistěte se, že máte administrátorský přístup — v případě potřeby viz [Role a oprávnění](../people/roles-permissions.md)
- Volitelné: Pokud přecházíte z jiného systému, připravte si soubor CSV se seznamem rodin

</div>

## Krok 1: Přidejte rodiny do databáze

Aby check-in mohl fungovat, systém musí znát vaše rodiny. Každé dítě musí být propojeno s rodičem pomocí funkce domácností.

Podle návodu [Přidávání osob](../people/adding-people.md) přidejte alespoň jednu rodinu. Dbejte na to, abyste:

- Nejprve přidali rodiče
- Přidali každé dítě
- Propojili je ve stejné domácnosti pomocí [editoru domácností](../people/adding-people.md#managing-households)

:::tip
Pokud máte k přidání víc než pár rodin, použijte místo ručního zadávání nástroj [import CSV](../people/importing-data.md). Celý adresář můžete naimportovat během několika minut.
:::

## Krok 2: Vytvořte skupiny pro děti

Skupiny určují třídy, do kterých se děti přihlašují. Obvykle budete chtít mít jednu skupinu pro každé věkové rozmezí.

Podle návodu [Vytváření skupin](../groups/creating-groups.md) vytvořte skupiny jako například:

- **Nejmenší** (věk 0–2 roky)
- **Předškoláci** (věk 3–5 let)
- **Školáci** (věk 6–10 let)

Názvy a věkové rozmezí si můžete upravit tak, aby odpovídaly struktuře vaší služby dětem.

## Krok 3: Nastavte sbory a bohoslužby

Check-in je vázán na konkrétní časy bohoslužeb. Potřebujete mít nastaven alespoň jeden sbor a jednu bohoslužbu.

Podle návodu [Nastavení docházky](../attendance/setup.md) proveďte tyto kroky:

1. Přidejte svůj sbor (např. „Hlavní sbor")
2. Přidejte bohoslužbu (např. „Nedělní dopoledne")
3. Nastavte čas bohoslužby (např. „9:00") a volitelně [harmonogram check-inu](../attendance/setup.md#setting-a-check-in-schedule), aby se check-in před každou bohoslužbou automaticky otevřel a po ní zavřel
4. Přiřaďte skupiny dětí k dané bohoslužbě

## Krok 4: Nastavte aplikaci pro check-in

Nyní vše propojte instalací aplikace pro check-in na tablet.

1. Nainstalujte aplikaci **B1 Checkin** — odkazy ke stažení najdete v článku [Check-In](../attendance/check-in.md)
2. Přihlaste se pomocí svých přihlašovacích údajů do B1 Admin
3. Vyberte svůj sbor a čas bohoslužby

Podrobné kroky nastavení najdete v celém článku [Check-In](../attendance/check-in.md).

## Krok 5: Zajistěte hardware

Pro kiosek potřebujete tablet a volitelně štítkovou tiskárnu Brother pro jmenovky.

Minimálně:
- **Jeden tablet s Androidem nebo Amazon Fire** — viz [doporučené tablety](../attendance/check-in.md#recommended-hardware)
- **Jednu štítkovou tiskárnu Brother** — model QL-1110NWB doporučujeme pro podporu Bluetooth a WiFi
- **Štítky Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Aplikace B1 Checkin je kompatibilní pouze se štítkovými tiskárnami Brother. Tiskárny jiných značek nebudou fungovat.
:::

## Krok 6: Proveďte zkušební check-in

Před nedělním ránem proveďte zkušební chod:

1. Otevřete na tabletu aplikaci B1 Checkin
2. Vyberte svůj sbor a správný čas bohoslužby
3. Vyhledejte jednu z rodin, které jste přidali
4. Přihlaste dítě a ověřte:
   - Že se docházka zobrazí v B1 Admin v sekci **Docházka**
   - Pokud používáte tiskárnu, že se jmenovka vytiskla správně

:::tip
Před spuštěním zaškolte dobrovolníky z uvítacího týmu do procesu check-inu. Obvykle stačí krátké pětiminutové vysvětlení.
:::

## Hotovo!

Dětská check-in služba vašeho sboru je připravena. Rodiče mohou vyhledat svou rodinu, vybrat své děti a přihlásit je na kiosku. Docházka se v B1 Admin zaznamenává automaticky.

## Související články

- [Přidávání osob](../people/adding-people.md) — přidejte další rodiny, jakmile přijdou na návštěvu
- [Vytváření skupin](../groups/creating-groups.md) — správa skupin dětí
- [Nastavení docházky](../attendance/setup.md) — konfigurace sborů a bohoslužeb
- [Check-In](../attendance/check-in.md) — podrobné nastavení aplikace pro check-in a hardwaru
- [Sledování docházky](../attendance/tracking-attendance.md) — zobrazení přehledů check-inu
