---
title: "Zapytania o dołączenie do grupy"
description: "Przeglądaj, zatwierdzaj lub odrzucaj prośby o dołączenie do grupy w B1 Admin, znajdź oczekujące wnioski jako lider lub administrator i podaj powód odrzucenia."
---

# Zapytania o dołączenie do grupy

<div class="article-intro">

Gdy grupa jest skonfigurowana z zasadą dołączania opartą na zatwierdzaniu, osoby mogą składać zapytania o dołączenie. Liderzy grup i administratorzy przeglądają te zapytania i je zatwierdzają lub odrzucają. Dzięki temu Twój kościół zachowuje kontrolę nad członkostwem w grupach, a osobom, które chcą dołączyć, łatwo jest wyrazić swoje zainteresowanie.

</div>

## Film szkoleniowy

<YouTube id="1vj-suCiIsE" title="Zapytania o dołączenie do grupy i kalendarze grup w B1" next="Konfigurowanie nabożeństw i obecności w B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz uprawnień do zarządzania grupami lub musisz być liderem konkretnej grupy. Szczegóły znajdziesz w artykule [Role i uprawnienia](../people/roles-permissions.md).
- Grupa musi mieć zasadę dołączania ustawioną na **Zapytanie** (wymagane zatwierdzenie). Informacje o tym, jak skonfigurować zasady dołączania, znajdziesz w artykule [Tworzenie grup](./creating-groups.md).

</div>

## Zasady dołączania

Grupy mogą mieć trzy różne zasady dołączania:

- **Otwarta** -- Każdy może dołączyć od razu, bez zatwierdzenia
- **Zapytanie** -- Osoby składają zapytanie o dołączenie, które wymaga zatwierdzenia
- **Zamknięta** -- Nikt nie może składać zapytań o dołączenie (członków trzeba dodawać ręcznie)

Gdy grupa korzysta z zasady **Zapytanie**, wszystkie próby dołączenia przechodzą przez proces zatwierdzania opisany na tej stronie.

## Przeglądanie oczekujących zapytań

### Dla liderów grup

1. W B1 Admin otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) i wybierz **Osoby > Grupy**
2. Kliknij nazwę grupy
3. Sekcja **Członkowie** pokazuje, ile zapytań czeka na rozpatrzenie. Kliknij **Wszyscy członkowie** -- oczekujące zapytania dotyczące tej grupy pojawią się na górze listy członków

### Dla administratorów

Administratorzy z uprawnieniami do zarządzania grupami mogą przeglądać oczekujące zapytania we wszystkich grupach:

1. W menu Jump wybierz **Osoby > Grupy**
2. Kliknij przycisk **oczekujące zapytania** w nagłówku strony (na przykład „3 oczekujące zapytania"). Pojawia się on tylko wtedy, gdy czekają zapytania.
3. Przejrzyj wszystkie oczekujące zapytania w całym kościele

## Rozpatrywanie zapytania o dołączenie

Każde zapytanie o dołączenie zawiera:

- **Imię i nazwisko oraz zdjęcie osoby** -- Osoba, która chce dołączyć
- **Opcjonalną wiadomość** -- Osobistą wiadomość wyjaśniającą, dlaczego chce dołączyć (jeśli została podana)
- **Datę zapytania** -- Kiedy zapytanie zostało złożone

Aby rozpatrzyć zapytanie:

1. Przeczytaj wiadomość od osoby, jeśli ją podała
2. W razie potrzeby kliknij nazwisko osoby, aby zobaczyć jej profil
3. Zdecyduj, czy zatwierdzić, czy odrzucić zapytanie

## Zatwierdzanie zapytania

1. Kliknij **Zatwierdź** przy zapytaniu o dołączenie
2. Osoba zostaje od razu dodana do grupy jako członek
3. Osoba składająca zapytanie otrzymuje powiadomienie o zatwierdzeniu
4. Zapytanie zostaje oznaczone w systemie jako zatwierdzone

:::tip
Po zatwierdzeniu zapytania osoba staje się zwykłym członkiem grupy. Później, w razie potrzeby, możesz awansować ją na lidera grupy na stronie [Członkowie grupy](./group-members.md).
:::

## Odrzucanie zapytania

1. Kliknij **Odrzuć** przy zapytaniu o dołączenie
2. Opcjonalnie podaj powód odrzucenia (maksymalnie 500 znaków)
3. Kliknij **Potwierdź**
4. Osoba składająca zapytanie otrzymuje powiadomienie z podanym powodem odrzucenia (jeśli go podano)
5. Zapytanie zostaje oznaczone w systemie jako odrzucone

:::info
Podanie powodu odrzucenia pomaga osobie zrozumieć, dlaczego jej zapytanie nie zostało zatwierdzone, i może zachęcić ją do ponownej próby w przyszłości lub do poszukania innych grup.
:::

## Zatwierdzanie na stronie zadań

Każde zapytanie o dołączenie tworzy również zadanie w sekcji **Służba &rarr; Moja praca**, zatytułowane „*Osoba* poprosiła o dołączenie do *Grupa*". Zadanie jest przypisane do liderów grupy. Jeśli grupa nie ma jeszcze lidera, trafia ono do pracowników z uprawnieniem **Członkowie grupy &gt; Edycja**, a jeśli nikt takiego uprawnienia nie ma, do administratorów domeny Twojego kościoła. Pracownicy i administratorzy, którzy otrzymają zadanie w ten sposób, dostają też powiadomienie z bezpośrednim linkiem do niego.

Po otwarciu zadania widać imię i nazwisko osoby składającej zapytanie, nazwę grupy oraz jej opcjonalną wiadomość, a na karcie zadania znajdują się przyciski **Zatwierdź** i **Odrzuć** (przycisk Odrzuć otwiera to samo opcjonalne pole na powód, o którym mowa wyżej). Dzięki temu liderzy mogą reagować na zapytania również na podstawie powiadomień, bez otwierania listy członków grupy.

Rozpatrzenie zapytania w dowolnym z tych miejsc -- na liście członków grupy lub na karcie zadania -- zamyka je wszędzie, dzięki czemu liderzy nie zobaczą nieaktualnego zadania dla zapytania, które ktoś już obsłużył.

## Powiadomienia

System zapytań o dołączenie automatycznie wysyła powiadomienia:

- **Gdy zapytanie zostaje złożone** -- Wszyscy liderzy grupy otrzymują powiadomienie. Jeśli grupa nie ma lidera, zamiast tego powiadamiani są pracownicy lub administratorzy przypisani do zadania (patrz wyżej).
- **Gdy zapytanie zostaje zatwierdzone** -- Osoba składająca zapytanie otrzymuje potwierdzenie
- **Gdy zapytanie zostaje odrzucone** -- Osoba składająca zapytanie otrzymuje powiadomienie z ewentualnym powodem odrzucenia

Powiadomienia pojawiają się w centrum powiadomień użytkownika na B1.church oraz w aplikacji mobilnej. W dzwonku powiadomień w B1 Admin kliknięcie powiadomienia o zapytaniu o dołączenie (lub przycisku **Zobacz szczegóły**) otwiera grupę na stronie B1.church Twojego kościoła w nowej karcie.

## Zarządzanie zapytaniami od strony członka

Osoby mogą zarządzać własnymi zapytaniami o dołączenie na B1.church:

- Sprawdzać status swoich oczekujących zapytań na stronie szczegółów grupy
- Anulować oczekujące zapytanie, jeśli zmienią zdanie
- Sprawdzić, czy ich zapytanie zostało zatwierdzone, czy odrzucone

## Dobre praktyki

- **Reaguj szybko** -- Staraj się rozpatrywać zapytania w ciągu 24-48 godzin, aby nikt nie musiał długo czekać
- **Jasno uzasadniaj odrzucenia** -- Pomóż osobom zrozumieć kolejne kroki lub alternatywne możliwości
- **Sprawdzaj profile** -- Przejrzyj profil osoby, aby ocenić, czy pasuje do grupy
- **Komunikuj oczekiwania** -- Upewnij się, że opis grupy jasno określa, dla kogo grupa jest przeznaczona

## Powiązane artykuły

- [Tworzenie grup](./creating-groups.md) -- Dowiedz się, jak tworzyć grupy i konfigurować zasady dołączania
- [Członkowie grupy](./group-members.md) -- Zarządzaj istniejącymi członkami grupy
- [Kalendarz grupy](./group-calendar.md) -- Planuj spotkania i wydarzenia grupy
