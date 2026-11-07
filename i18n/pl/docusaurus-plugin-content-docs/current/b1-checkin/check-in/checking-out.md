---
title: "Odjava i bezpieczeństwo dzieci"
description: "Wymeldowuj dzieci na obsługiwanym stanowisku B1 Checkin: kody bezpieczeństwa, sprawdzone osoby odbierające, wywoływanie rodziców i ponowny druk etykiet."
---

# Odjava i bezpieczeństwo dzieci

<div class="article-intro">

Odjazd kończy proces zameldowania dzieci: rodzic okazuje kod bezpieczeństwa z etykiety odbioru, kiosk weryfikuje, kto odbiera dziecko, i dzieci zostają wymeldowane. Stanowiska obsługiwane przez personel mają także narzędzia bezpieczeństwa — weryfikację zaufanej osoby odbierającej, wiadomości do rodzica, ponowne drukowanie etykiet i komunikat alarmowy.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Odjazd jest dostępny na stanowiskach ustawionych w tryb **obsługiwany przez personel** w ustawieniach administratora kiosku
- Dzieci muszą być wcześniej [zameldowane](./completing-checkin.md) z wydrukowaną etykietą odbioru zawierającą kod bezpieczeństwa
- Wywoływanie rodziców i alarmy wymagają podłączenia dostawcy usług SMS w B1 Admin

</div>

## Rozpoczynanie odjazdu

1. Na stanowisku obsługiwanym przez personel dotknij **Wymelduj** na ekranie wyszukiwania.
2. Wpisz 4-znakowy **kod bezpieczeństwa** z etykiety odbioru rodziny. Możesz go wpisać ręcznie, użyć klawiatury na ekranie lub zeskanować kod kreskowy na etykiecie skanerem USB lub Bluetooth — kod zostanie wysłany automatycznie po wprowadzeniu wszystkich 4 znaków.
   - Brak skanera? Dotknij **Skanuj** pod polem kodu, aby użyć aparatu tabletu. Przytrzymaj kod QR lub kreskowy z etykiety przed aparatem w oknie **Skanuj kod odbioru**, a kod zostanie wpisany za Ciebie. Domyślnie używany jest tylny aparat; dotknij przycisku przełączania, aby zmienić kamerę, lub dotknij **Anuluj**, aby wrócić do wpisywania ręcznego.
3. Kiosk pokaże dzieci zameldowane pod tym kodem.

## Weryfikacja osoby odbierającej

Ekran odjazdu pyta, kto odbiera dzieci:

- **Zaufane osoby odbierające** przypisane do rodziny pojawiają się jako karty ze zdjęciem i informacją o pokrewieństwie — dotknij osoby stojącej przed Tobą.
- **Dorośli członkowie rodziny** są również wyświetlani w siatce zdjęć.
- **Inne** pozwala wpisać imię osoby, która nie znajduje się na liście.

Jeśli wpisane imię odpowiada osobie oznaczonej jako **Brak zgody** dla danej rodziny, kiosk zablokuje odjazd i wyświetli ostrzeżenie. Pracownik może wybrać **Zastąp**, aby mimo to kontynuować — zastąpienie zostaje zapisane w rekordzie obecności wraz z imieniem tej osoby.

Po potwierdzeniu osoby odbierającej dotknij przycisku odjazdu. Imię osoby odbierającej zostaje zapisane w rekordzie obecności.

:::info
Zaufane osoby odbierające i osoby z zakazem odbioru są zarządzane przez personel kościoła na stronie każdej osoby w B1 Admin — zobacz [Bezpieczeństwo meldowania](../../b1-admin/attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people).
:::

## Wywoływanie rodzica

Potrzebujesz rodzica podczas nabożeństwa — zmiana pieluchy, płaczące dziecko? Z ekranu odjazdu na stanowisku obsługiwanym przez personel pracownik może wysłać **wezwanie**: wiadomość SMS do rodziców lub opiekunów dziecka za pośrednictwem dostawcy usług SMS kościoła. Rodzice, którzy zrezygnowali z wiadomości tekstowych lub nie mają numeru komórkowego, są pomijani, a kiosk pokazuje, ile wiadomości zostało wysłanych.

## Ponowne drukowanie etykiet

Jeśli plakietka lub etykieta odbioru zostanie zgubiona lub uszkodzona, pracownik na stanowisku obsługiwanym przez personel może **ponownie wydrukować** etykiety rodziny z ekranu odjazdu po wpisaniu kodu bezpieczeństwa. Ponowny wydruk korzysta z tej samej drukarki i szablonów etykiet co oryginalne meldowanie.

## Komunikat alarmowy

W sytuacji awaryjnej pracownik może jednocześnie wysłać SMS do opiekunów **każdego zameldowanego dziecka** na bieżące nabożeństwo:

1. Otwórz **ustawienia administratora** kiosku (7 szybkich dotknięć logo w nagłówku oraz kod PIN, jeśli jest ustawiony).
2. Dotknij **Komunikat alarmowy**.
3. Wpisz treść wiadomości, a następnie wpisz **EMERGENCY** w polu potwierdzenia — przycisk **Wyślij komunikat** pozostaje nieaktywny, dopóki tego nie zrobisz.
4. Kiosk poinformuje, ile telefonów otrzymało wiadomość i ile osób zostało pominiętych (zrezygnowały lub nie mają numeru komórkowego).

:::warning
Komunikat trafia do każdej zameldowanej rodziny na wybrane nabożeństwo. Używaj go tylko w prawdziwych sytuacjach awaryjnych — ewakuacje, zamknięcia obiektu, silne burze.
:::

## Powiązane artykuły

- [Kończenie meldowania](./completing-checkin.md) — skąd pochodzą kody bezpieczeństwa i etykiety odbioru
- [Bezpieczeństwo meldowania](../../b1-admin/attendance/checkin-safety.md) — konfiguracja pojemności, proporcji, osób odbierających i wymagań dostawcy usług SMS
- [Konfiguracja drukarki](../getting-started/printer-setup.md) — konfiguracja drukarki etykiet
