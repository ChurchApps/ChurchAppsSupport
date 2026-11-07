---
title: "Administracja serwerem"
description: "Tylko Server.Admin: reset dwuetapowego logowania, logowanie jako inny użytkownik, moderacja Commons i zatwierdzanie e-maila kościoła w B1 Admin."
---

# Administracja serwerem

<div class="article-intro">

Funkcje administracji serwerem w ChurchApps są dostępne tylko dla użytkowników z uprawnieniem **Server.Admin**. Te narzędzia służą do obsługi platformy, wsparcia technicznego i rozwiązywania problemów we wszystkich kościołach w systemie.

</div>

:::warning Dostęp ograniczony
Funkcje opisane na tej stronie wymagają uprawnienia **Server.Admin** i nie są dostępne dla zwykłych administratorów kościołów. Są przeznaczone wyłącznie dla operatorów platformy i pracowników wsparcia technicznego.
:::

## Dostęp do administracji serwerem

Użytkownicy z uprawnieniem Server.Admin mogą otworzyć panel administracji serwerem z poziomu B1 Admin:

1. Zaloguj się na stronie [admin.b1.church](https://admin.b1.church)
2. Otwórz [menu Jump](../b1-admin/introduction.md#getting-around-with-the-jump-menu), rozwiń **Ustawienia** i kliknij **Server Admin**. (Możesz też od razu przejść pod adres `admin.b1.church/admin`).
3. Panel Server Admin wyświetla swoje sekcje w lewej części ekranu, w trzech grupach: **Katalog** (Kościoły, Użytkownicy, Podszywanie się pod użytkownika), **Operacje** (Zadania w tle, Commons, Trendy wykorzystania) oraz **System** (Tłumaczenia, Stan serwera, Migracje bazy danych)

## Resetowanie logowania dwuskładnikowego

Jeśli użytkownik ma włączone [logowanie dwuskładnikowe](../b1-admin/profile/managing-profile.md#two-factor-sign-in) i stracił zarówno telefon, jak i kody zapasowe, administrator serwera może je wyłączyć:

1. Otwórz sekcję **Użytkownicy** w panelu Server Admin i wyszukaj użytkownika.
2. Użytkownicy z włączonym logowaniem dwuskładnikowym mają odznakę **Dwuskładnikowe włączone**. Kliknij obok niej **Resetuj 2FA**.
3. Potwierdź monit. Zrób to dopiero po upewnieniu się, z kim rozmawiasz.

Użytkownik może wtedy zalogować się samym hasłem i ponownie skonfigurować logowanie dwuskładnikowe w swoim profilu. Resetowania są zapisywane w dzienniku audytu jako `mfa_reset`. Punkt końcowy to `POST /membership/users/mfa/reset/:userId` i wymaga uprawnienia Server.Admin.

## Podszywanie się pod użytkownika

Funkcja podszywania się pozwala administratorom serwera zalogować się jako inny użytkownik w celu wsparcia technicznego i rozwiązywania problemów. Jest to przydatne przy badaniu problemów zgłaszanych przez użytkowników lub przy pomocy kościołom w konfiguracji systemu.

### Jak podszyć się pod użytkownika

1. Otwórz sekcję **Podszywanie się pod użytkownika** w panelu Server Admin.
2. Wpisz imię i nazwisko lub adres e-mail użytkownika w polu wyszukiwania.
3. Kliknij **Szukaj** lub naciśnij Enter.
4. Z wyników wyszukiwania kliknij użytkownika, pod którego chcesz się podszyć.
5. Potwierdź podszywanie się w wyświetlonym oknie dialogowym.
6. Zostaniesz zalogowany jako ten użytkownik i przekierowany na jego konto.

### Ważne uwagi

- Podszywanie się tworzy nową sesję z uprawnieniami docelowego użytkownika i dostępem do jego kościołów.
- Twoja oryginalna sesja administratora kończy się w momencie podszycia się pod innego użytkownika.
- Wszystkie działania wykonane podczas podszywania się są rejestrowane w dzienniku audytu.
- Aby wrócić do swojego konta administratora, wyloguj się i zaloguj ponownie swoimi danymi.
- Korzystaj z podszywania się tylko wtedy, gdy jest to konieczne do wsparcia technicznego, i zawsze informuj użytkowników, gdy uzyskujesz dostęp do ich kont w celu udzielenia pomocy.

### Punkt końcowy API

Funkcja podszywania się opiera się na punkcie końcowym `/users/:userId/impersonate` w API Membership. Szczegóły techniczne znajdziesz w sekcji [Punkty końcowe Membership](/docs/developer/api/endpoints/membership#users).

### Kwestie bezpieczeństwa

- Podszywanie się wymaga uprawnienia Server.Admin. Uprawnienie to należy przydzielać oszczędnie i tylko zaufanym operatorom platformy.
- Wszystkie zdarzenia podszywania się są rejestrowane wraz z identyfikatorem administratora i identyfikatorem docelowego użytkownika.
- Kościoły nie są powiadamiane o podszywaniu się, dlatego warto ustalić jasne zasady, kiedy i w jaki sposób ta funkcja powinna być używana.
- Rozważ dokumentowanie zdarzeń podszywania się w swoim systemie zgłoszeń wsparcia, aby zapewnić rozliczalność.

## Moderacja Commons

Commons to wspólna kolejka moderacji treści przesyłanych przez użytkowników w różnych produktach. Pieśni WorshipCommons, lekcje Lessons.church, szablony FreeShow i szablony kreatora stron B1 trafiają do tej samej kolejki, zamiast do osobnych narzędzi do recenzji dla każdego produktu.

### Dostęp do Commons

1. Przejdź do zakładki **Commons** w panelu Server Admin.
2. Zobaczysz trzy podzakładki: **Kolejka**, **Zgłoszenia** i **Zasoby**.

Ograniczona rola **edytora muzyki** także może zobaczyć zakładkę Kolejka, ale nie może zatwierdzać zgłoszeń zmieniających prawa lub licencję utworu.

### Kolejka

Kolejka zawiera wszystkie oczekujące zgłoszenia ze wszystkich produktów, które można filtrować według produktu i typu zasobu. Każdy wiersz pokazuje, czy zgłoszenie dotyczy nowego zasobu, edycji wprowadzonej przez jego autora, czy edycji wprowadzonej przez osobę trzecią. Pokazuje również historię zatwierdzeń osoby zgłaszającej oraz czas oczekiwania zgłoszenia (po przekroczeniu 72 godzin jest oznaczane).

Kliknij **Sprawdź**, aby otworzyć panel z różnicami w poszczególnych polach, podglądem plików i osadzonym, tylko do odczytu, podglądem elementu. Użyj skrótów klawiszowych **a**/**r**, aby zatwierdzić lub odrzucić zgłoszenie, oraz **j**/**k**, aby przejść do następnego lub poprzedniego zgłoszenia bez zamykania panelu. Odrzucenie wymaga wybrania powodu (na przykład jakość, duplikat, licencja, CCLI, AI lub niezwiązane z tematem) oraz dodania notatki.

### Zgłoszenia

Zakładka Zgłoszenia obsługuje zgłoszenia dotyczące praw autorskich oraz zgłoszenia dotyczące polityki i jakości opublikowanych już zasobów. Są podzielone na osobne kolejki: Prawa autorskie oraz Polityka i inne, a także historię Rozpatrzonych. Przypisz sobie zgłoszenie, aby zacząć nad nim pracować, a następnie rozstrzygnij je, wybierając rozstrzygnięcie (podtrzymane, odrzucone lub duplikat) oraz działanie (brak, cofnięcie publikacji lub usunięcie).

### Zasoby

Zakładka Zasoby to przeszukiwalna lista opublikowanych treści z działaniami: **Wyróżnij** zasób (pokazuje go na stronie głównej produktu), **Cofnij publikację** lub **Ponownie opublikuj** oraz **Usuń** (z podaniem powodu związanego z prawami autorskimi lub polityką).

W przypadku pieśni to właśnie tutaj utwór staje się **gotowy na niedzielę** i może pojawić się w wyszukiwarce pieśni B1 Admin danego kościoła. Recenzent otwiera zasób i zaznacza każdą opublikowaną tonację jako **Odsłuchane**, gdy przesłucha utwór i potwierdzi, że nuty, akordy i slajdy są kompletne. Utwór staje się gotowy na niedzielę dopiero wtedy, gdy wszystkie tonacje są zaznaczone.

:::info
Moderacja Commons jest dostępna wyłącznie dla personelu. Poszczególne kościoły nigdy nie widzą tej kolejki. Jedynym miejscem, w którym B1 Admin danego kościoła korzysta z danych Commons, jest sekcja „WorshipCommons — za darmo” w [wyszukiwarce pieśni](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons). Pokazuje ona wyłącznie pieśni, które przeszły już ten proces recenzji.
:::

Zobacz stronę [architektura Content Commons](/docs/developer/architecture/commons), aby poznać model danych i cykl życia zgłoszeń.

## Zatwierdzanie e-maili grupowych

Kościoły nie mogą wysyłać e-maili tworzonych przez kościół (e-maile grupowe, kontynuacje formularzy, e-maile z przepływów pracy i zaproszenia do kont), dopóki administrator serwera ich nie zatwierdzi. Dzięki temu kościoły zarejestrowane przez boty nie mogą używać wspólnego adresu wysyłkowego ChurchApps do rozsyłania spamu.

1. Otwórz zakładkę **Kościoły** w panelu Server Admin.
2. Przy każdym kościele widoczny jest znacznik **E-mail grupowy**: **Zatwierdzony** (zielony) lub **Niezatwierdzony** (z obramowaniem).
3. Kliknij znacznik i potwierdź, aby zatwierdzić kościół lub cofnąć zatwierdzenie.

Personel kościoła prosi o zatwierdzenie za pomocą przycisku **Poproś o weryfikację** w oknie Wyślij e-mail w B1 Admin. Prośba jest wysyłana e-mailem na adres wsparcia i zawiera nazwę kościoła, jego identyfikator, datę rejestracji, lokalizację oraz osobę, która złożyła prośbę. Kościół może wysłać jedną prośbę w tygodniu. Dzienny limit oraz automatyczne wstrzymanie po odbiciach i skargach opisano w sekcji [Limity e-maili tworzonych przez kościół](/docs/developer/architecture/notifications#church-authored-email-limits).

## Migracje bazy danych

Workflow **Deploy Prod** sam stosuje oczekujące migracje. Hostowane bazy danych akceptują połączenia wyłącznie z sieci Api, więc runner GitHub nie ma do nich dostępu. Zamiast tego, zaraz po `serverless deploy`, workflow wywołuje funkcję Lambda `migrate` Api (`api-Prod-migrate`). Uruchamia ona oczekujące migracje każdego modułu tym samym mechanizmem, co ta zakładka, i przerywa wdrożenie, jeśli którykolwiek moduł zgłosi błąd lub zostanie odrzucony. **Rollback Prod** cofa wyłącznie kod Lambdy. Zastosowane migracje pozostają zastosowane. Zakładka **Migracje bazy danych** służy do sprawdzania stanu, uruchamiania migracji, których wdrożenie nie uruchomiło (na przykład w środowisku demo, którego wdrożenie nie wykonuje migracji), oraz do oznaczania jako bazowe modułów bez historii. (Instalacje self-hosted w Dockerze nadal uruchamiają migracje automatycznie po starcie kontenera Api).

Zakładka pokazuje bieżące środowisko oraz po jednym wierszu dla każdego modułu (membership, attendance, giving i inne), wraz ze statusem, liczbą zastosowanych i oczekujących migracji oraz ostatnio zastosowaną migracją.

- **Uruchom oczekujące migracje** stosuje wszystkie oczekujące migracje, po jednym module naraz, w kolejności. Zatrzymuje się przy pierwszym błędzie i pokazuje, co zostało zastosowane dla każdego modułu.
- Moduł oznaczony jako **Brak historii** ma bazę danych sprzed śledzenia migracji. Nigdy nie jest uruchamiany automatycznie, ponieważ odtworzyłoby to stare migracje danych na działających tabelach. Zamiast tego kliknij przy tym module **Sprawdź schemat**. Api porówna tabele, kolumny i indeksy tworzone przez każdą migrację z aktywną bazą danych i oznaczy każdą migrację jako **Już zastosowana**, **Brakuje**, **Częściowo zastosowana** lub **Tylko dane**. Samo sprawdzenie niczego nie zmienia.
- W wynikach sprawdzenia **Zapisz jako już zastosowane** wpisuje wykryte migracje do historii migracji bez ich uruchamiania (po potwierdzeniu). Zapisane zostaje wszystko aż do ostatniej migracji oznaczonej jako **Już zastosowana**, łącznie z migracjami **Tylko dane** w tym zakresie. Migracje **Brakuje** pozostają oczekujące i można je następnie uruchomić zwykłą metodą, przyciskiem **Uruchom oczekujące migracje**.
- Migracja **Częściowo zastosowana** blokuje zapisywanie. Jeśli migrację można bezpiecznie uruchomić ponownie (najpierw ją przeczytaj), zaznacz **Uruchom ponownie**, aby pozostała oczekująca i została wykonana od początku.

Panel Server Admin i CLI (`yarn migrate:up`) korzystają z tego samego migratora Kysely i tabeli `kysely_migration`, dzięki czemu zawsze zgadzają się co do tego, które migracje zostały zastosowane. Obsługujące je punkty końcowe to `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` oraz `POST .../:module/baseline`. Wszystkie są dostępne wyłącznie dla Server.Admin.

## Powiązane strony

- [Uwierzytelnianie i uprawnienia](/docs/developer/api/endpoints/authentication) — model uprawnień i uwierzytelnianie JWT
- [Punkty końcowe Membership](/docs/developer/api/endpoints/membership) — API zarządzania użytkownikami i kościołami
- [Dziennik audytu](/docs/b1-admin/reports/audit-log) — przeglądanie dziennika aktywności kościoła
- [Architektura Content Commons](/docs/developer/architecture/commons) — wspólny model zasobów i cykl życia moderacji
