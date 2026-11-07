---
title: "Kampusy"
---

# Kampusy

<div class="article-intro">

Jeśli Twój kościół spotyka się w więcej niż jednej lokalizacji, **Kampusy** pozwalają śledzić, do którego miejsca należy każda osoba i każda grupa. Po skonfigurowaniu kampusy pojawiają się jako opcja w profilach osób, w konfiguracji frekwencji oraz na pulpicie Demografia. Kościoły wieloskładnikowe mogą filtrować, wyszukiwać i tworzyć raporty według kampusu w całym B1 Admin.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Do zarządzania kampusami potrzebne jest uprawnienie **Edycja ustawień kościoła**. Zobacz [Role i uprawnienia](./roles-permissions.md).

</div>

## Otwieranie ustawień kampusów

W B1 Admin otwórz [Menu skoków](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu), wybierz **Ustawienia > Ustawienia** i kliknij **Kampusy** na liście po lewej stronie, aby przewinąć do sekcji **Kampusy**. Możesz też przejść bezpośrednio pod adres **/settings/campuses**. Zobaczysz listę wszystkich skonfigurowanych kampusów wraz z ich nazwą, lokalizacją i strefą czasową.

## Dodawanie kampusu

1. Kliknij **Dodaj kampus**.
2. Uzupełnij dane kampusu:
   - **Nazwa** *(wymagane)* — nazwa wyświetlana w całym B1 Admin (na przykład „Kampus główny” lub „Kampus północny”).
   - **Adres** — adres ulicy kampusu (używany wyłącznie do wyświetlania informacji; nie jest tym samym co główny adres kościoła w Ustawieniach kościoła).
   - **Miasto / Województwo / Kod pocztowy** — lokalizacja kampusu.
   - **Strefa czasowa** — strefa czasowa IANA dla tego kampusu (na przykład *Europe/Warsaw*). [Harmonogramy zameldowania](../attendance/setup.md#setting-a-check-in-schedule) nabożeństw w tym kampusie otwierają się i zamykają w tej strefie czasowej. Jeśli ustawiono **Brak**, zamiast niej używana jest [Strefa czasowa](./church-settings.md#time-zone) kościoła. Jest to przydatne, gdy kampusy znajdują się w różnych strefach czasowych.
   - **Strona internetowa** — opcjonalny adres URL własnej strony internetowej kampusu.
3. Kliknij **Zapisz**.

## Edytowanie kampusu

Kliknij dowolny wiersz kampusu na liście, aby otworzyć jego edytor w panelu po prawej stronie. Zaktualizuj pola i kliknij **Zapisz**.

## Usuwanie kampusu

Otwórz kampus do edycji i kliknij **Usuń**. Zostaniesz poproszony o potwierdzenie. Usunięcie kampusu nie usuwa przypisanych do niego osób — ich pole kampusu po prostu staje się puste.

## Przypisywanie osób do kampusu

Po utworzeniu kampusów personel może przypisać osobę do kampusu z jej profilu:

1. Otwórz kartotekę osoby w sekcji **Osoby**.
2. Kliknij **Edytuj**.
3. Wybierz kampus z listy rozwijanej **Kampus**.
4. Kliknij **Zapisz**.

Kampus możesz też zaktualizować zbiorczo na stronie Osoby. Zaznacz wiele osób, użyj **Edycja zbiorcza** i ustaw pole Kampus dla wszystkich naraz.

## Filtrowanie według kampusu

Po skonfigurowaniu kampusów możesz filtrować według nich w całym B1 Admin:

- **Wyszukiwanie osób** — dodaj warunek Kampus w zaawansowanym wyszukiwaniu lub wczytaj [zapisaną listę](../people/lists.md) ograniczoną do kampusu.
- **Demografia** — [pulpit Demografia](../people/demographics.md) wyświetla wykres kołowy Kampus, gdy co najmniej jednej osobie przypisano kampus.
- **Konfiguracja frekwencji** — każdy termin nabożeństwa we Frekwencji może być powiązany z kampusem.

:::tip
Kościoły z jedną lokalizacją nie muszą konfigurować kampusów. Wszystkie funkcje kampusów są opcjonalne — jeśli nie istnieją żadne kampusy, pola i wykresy związane z kampusami po prostu się nie wyświetlają.
:::

## Powiązane artykuły

- [Ustawienia kościoła](./church-settings.md) — główny adres kościoła i branding (oddzielnie od adresów kampusów)
- [Demografia](../people/demographics.md) — wykres podziału według kampusów
- [Konfiguracja frekwencji](../attendance/setup.md) — powiązanie terminów nabożeństw z kampusem
- [Edycja zbiorcza](../people/bulk-editing.md) — przypisywanie kampusu wielu osobom naraz
