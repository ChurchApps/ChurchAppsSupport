---
title: "Guía: Configurar el registro de entrada para el ministerio infantil"
description: "Skonfiguruj meldowanie dzieci w B1 Admin: połącz rodziny, utwórz grupy wiekowe, ustaw nabożeństwa i drukuj identyfikatory dla kiosku B1 Checkin."
---

Esta guía no tiene la traducción solicitada. Lo siguiente sí corresponde a la tarea: el archivo en polaco.

---
title: "Przewodnik: Konfiguracja meldowania dzieci w ministerstwie dziecięcym"
---

# Konfiguracja meldowania dzieci w ministerstwie dziecięcym

<div class="article-intro">

Ten przewodnik przeprowadzi Cię przez wszystkie kroki potrzebne do uruchomienia systemu meldowania dzieci w Twoim kościele — od dodania rodzin do bazy danych, przez konfigurację grup dostosowanych do wieku, po drukowanie plakietek z imionami w niedzielny poranek. Po zakończeniu rodzice będą mogli zameldować swoje dzieci na tablecie-kiosku i otrzymać pasujący zabezpieczający identyfikator.

</div>

## Film szkoleniowy

<YouTube id="Ep9CBUcJwPI" title="Konfiguracja meldowania dzieci w B1" next="Rejestrowanie i śledzenie obecności w B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Utwórz konto swojego kościoła na stronie [admin.b1.church](https://admin.b1.church)
- Upewnij się, że masz dostęp administratora — w razie potrzeby zobacz [Role i uprawnienia](../people/roles-permissions.md)
- Opcjonalnie: przygotuj plik CSV z rodzinami, jeśli przenosisz dane z innego systemu

</div>

## Krok 1: Dodaj rodziny do bazy danych

Zanim meldowanie będzie mogło działać, system musi znać Twoje rodziny. Każde dziecko musi być powiązane z rodzicem za pomocą funkcji gospodarstwa domowego.

Skorzystaj z przewodnika [Dodawanie osób](../people/adding-people.md), aby dodać co najmniej jedną rodzinę. Pamiętaj, aby:

- Najpierw dodać rodzica (rodziców)
- Dodać każde dziecko
- Powiązać ich w tym samym gospodarstwie domowym za pomocą [edytora gospodarstw domowych](../people/adding-people.md#managing-households)

:::tip
Jeśli masz więcej niż kilka rodzin do dodania, zamiast dodawać je pojedynczo, skorzystaj z narzędzia [Import CSV](../people/importing-data.md). Cały katalog możesz zaimportować w kilka minut.
:::

## Krok 2: Utwórz grupy dziecięce

Grupy określają zajęcia, na które dzieci się melduje. Zazwyczaj warto mieć jedną grupę dla każdego przedziału wiekowego.

Skorzystaj z przewodnika [Tworzenie grup](../groups/creating-groups.md), aby utworzyć grupy takie jak:

- **Żłobek** (wiek 0–2)
- **Przedszkole** (wiek 3–5)
- **Szkoła podstawowa** (wiek 6–10)

Nazwy i przedziały wiekowe możesz dostosować do struktury swojej służby.

## Krok 3: Skonfiguruj zbory i nabożeństwa

Meldowanie jest powiązane z konkretnymi godzinami nabożeństw. Potrzebujesz co najmniej jednego zboru i jednego nabożeństwa.

Skorzystaj z przewodnika [Konfiguracja obecności](../attendance/setup.md), aby:

1. Dodać swój zbór (np. „Zbór główny")
2. Dodać nabożeństwo (np. „Niedzielny poranek")
3. Ustawić godzinę nabożeństwa (np. „9:00") oraz, opcjonalnie, [harmonogram meldowania](../attendance/setup.md#setting-a-check-in-schedule), dzięki czemu meldowanie otworzy się automatycznie przed każdym nabożeństwem i zamknie po nim
4. Przypisać grupy dziecięce do nabożeństwa

## Krok 4: Skonfiguruj aplikację do meldowania

Teraz połącz wszystko, instalując aplikację do meldowania na tablecie.

1. Zainstaluj aplikację **B1 Checkin** — linki do pobrania znajdziesz w artykule [Meldowanie](../attendance/check-in.md)
2. Zaloguj się, używając swoich danych dostępowych do B1 Admin
3. Wybierz swój zbór i godzinę nabożeństwa

Pełne kroki konfiguracji znajdziesz w artykule [Meldowanie](../attendance/check-in.md).

## Krok 5: Przygotuj sprzęt

Potrzebujesz tabletu jako kiosku oraz, opcjonalnie, drukarki etykiet Brother do plakietek.

Co najmniej:
- **Jeden tablet z Androidem lub Amazon Fire** — zobacz [zalecane tablety](../attendance/check-in.md#recommended-hardware)
- **Jedna drukarka etykiet Brother** — model QL-1110NWB jest zalecany ze względu na obsługę Bluetooth i Wi-Fi
- **Etykiety Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Z aplikacją B1 Checkin są kompatybilne wyłącznie drukarki etykiet Brother. Drukarki innych marek nie będą działać.
:::

## Krok 6: Wykonaj próbne meldowanie

Przed niedzielnym porankiem przeprowadź próbę:

1. Otwórz aplikację B1 Checkin na tablecie
2. Wybierz swój zbór i właściwą godzinę nabożeństwa
3. Wyszukaj jedną z dodanych rodzin
4. Zamelduj dziecko i sprawdź:
   - Czy obecność pojawia się w B1 Admin w sekcji **Obecność**
   - Jeśli używasz drukarki, czy plakietka drukuje się poprawnie

:::tip
Przed uruchomieniem przeszkol wolontariuszy z zespołu powitalnego w procesie meldowania. Zazwyczaj wystarczy krótkie 5-minutowe omówienie.
:::

## Gotowe!

Meldowanie dzieci w ministerstwie dziecięcym jest gotowe. Rodzice mogą wyszukać swoją rodzinę, wybrać swoje dzieci i zameldować je na kiosku. Obecność jest automatycznie zapisywana w B1 Admin.

## Powiązane artykuły

- [Dodawanie osób](../people/adding-people.md) — dodawaj kolejne rodziny w miarę ich odwiedzin
- [Tworzenie grup](../groups/creating-groups.md) — zarządzaj grupami dziecięcymi
- [Konfiguracja obecności](../attendance/setup.md) — konfiguruj zbory i nabożeństwa
- [Meldowanie](../attendance/check-in.md) — szczegółowa konfiguracja aplikacji i sprzętu do meldowania
- [Śledzenie obecności](../attendance/tracking-attendance.md) — przeglądaj raporty z meldowania
