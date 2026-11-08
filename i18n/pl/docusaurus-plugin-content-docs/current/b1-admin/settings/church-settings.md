---
title: "Ustawienia kościoła"
description: "Ustaw nazwę, adres, subdomenę, strefę czasową, format regionalny, dostawcę wiadomości tekstowych i przechowywanie plików dla swojego kościoła na stronie Ustawienia kościoła w B1 Admin."
---

# Ustawienia kościoła

<div class="article-intro">

Strona Ustawienia kościoła służy do konfigurowania podstawowych informacji o kościele, danych kontaktowych i wyglądu marki. Te dane są wykorzystywane we wszystkich narzędziach ChurchApps, w tym na Twojej stronie B1.church i w aplikacji B1 App.

</div>

## Film szkoleniowy

<YouTube id="634zSbzDkYA" title="Konfigurowanie informacji o kościele i wyglądu marki w B1" next="Role, uprawnienia i zapraszanie zespołu w B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz uprawnienia „Edycja ustawień kościoła”. Jeśli nie masz dostępu, zobacz [Role i uprawnienia](./roles-permissions.md).
- Przygotuj adres kościoła, dane kontaktowe i logo

</div>

## Edycja informacji o kościele

1. W B1 Admin otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu), rozwiń **Settings** (Ustawienia) i kliknij **Settings**.
2. W sekcji **Church Information** (Informacje o kościele), na górze strony, kliknij **Edit** (Edytuj).
3. Zaktualizuj dowolne z poniższych pól:
   - **Church Name** (Nazwa kościoła) -- nazwa wyświetlana we wszystkich produktach ChurchApps.
   - **Address** (Adres) -- fizyczny adres Twojego kościoła.
   - **Contact Information** (Dane kontaktowe) -- numer telefonu, adres e-mail i inne dane kontaktowe.
   - **Time Zone** (Strefa czasowa) -- strefa czasowa Twojego kościoła. Zobacz [Strefa czasowa](#time-zone) poniżej.
4. Kliknij **Save** (Zapisz), aby zastosować zmiany.

## Konfigurowanie subdomeny

Twój kościół otrzymuje bezpłatną subdomenę **yourchurch.1.church**. To adres internetowy, pod którym członkowie i goście mogą odwiedzić obecność kościoła w sieci.

1. Na stronie Settings kliknij **Edit** w sekcji **Church Information** i znajdź pole **Subdomain** (Subdomena).
2. Wpisz wybraną subdomenę (na przykład „gracechurch” dla gracechurch.1.church).
3. Zapisz zmiany.

:::info
Subdomena musi być unikalna wśród wszystkich kościołów ChurchApps. Jeśli wybrana nazwa jest zajęta, spróbuj dodać nazwę miasta lub stanu (na przykład „gracechurch-dallas”).
:::

Jeśli chcesz, aby odwiedzający trafiali na Twoją stronę pod własną domeną (na przykład **`www.gracechurch.org`**), zobacz [Domena niestandardowa](./custom-domain.md).

## Konfigurowanie wyglądu marki

Dostosuj sposób prezentacji kościoła we wszystkich narzędziach ChurchApps:

1. Prześlij **logo kościoła**, klikając obszar logo i wybierając plik graficzny.
2. Dodaj dodatkowe **zdjęcia kościoła**, używane na Twojej stronie internetowej i w [aplikacji mobilnej](./mobile-app.md).

:::tip
Najlepsze efekty daje logo w formacie PNG z przezroczystym tłem. Dzięki temu wygląda dobrze zarówno na jasnym, jak i ciemnym tle.
:::

## Pierwszy dzień tygodnia

Wybierz, od którego dnia zaczynają się Twoje kalendarze. Lista **First Day of Week** (Pierwszy dzień tygodnia) w sekcji Church Information domyślnie ustawiona jest na **Sunday** (niedziela), ale możesz wybrać dowolny dzień. Po zmianie jest ona uwzględniana w siatkach kalendarzy w B1 Admin i w portalu członków B1.church -- kalendarze grup, kalendarze z wybranymi wydarzeniami i edytor wydarzeń wyświetlają tygodnie zaczynające się od wybranego dnia.

## Strefa czasowa

Lista **Time Zone** w sekcji **Church Information** ustawia strefę czasową Twojego kościoła (na przykład *America/Chicago*). Wybierz **None** (Brak), aby pozostawić pole puste. Po zapisaniu strefa pojawi się w podsumowaniu Informacji o kościele.

B1 używa tej strefy czasowej do godzin obowiązujących w całym kościele, na przykład do przypomnień o wydarzeniach i harmonogramów wyświetlanych na telewizorach [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). [Harmonogramy zameldowania](../attendance/setup.md#setting-a-check-in-schedule) są najpierw liczone w strefie czasowej [kampusu](./campuses.md), w którym odbywa się nabożeństwo, a strefę czasową kościoła stosuje się tylko wtedy, gdy kampus jej nie ma. Jeśli wszystkie Twoje kampusy znajdują się w jednej strefie czasowej, ustaw ją zarówno dla kościoła, jak i dla każdego kampusu.

## Region (format daty i telefonu)

Ustawienie **Region** określa, jak daty i godziny są zapisywane w całym B1. Domyślnie daty używają formatu amerykańskiego (na przykład „Sep 28, 2026” i „9/28/2026”). Kościoły spoza USA mogą przełączyć się na własny format -- na przykład wybór English (United Kingdom) spowoduje wyświetlanie „28 Sept 2026” i „28/09/2026”.

1. Na stronie Settings kliknij **Region** na liście po lewej stronie, a następnie kliknij **Edit** w sekcji **Region**.
2. Wybierz region z listy **Region**. Każda opcja pokazuje przykładową datę, dzięki czemu widzisz dokładnie, jak będą wyglądać daty.
3. Kliknij **Save**.

Sekcja Region pokaże wtedy wybrany region, przykład **Date format** (Format daty) oraz format **Phone numbers** (Numery telefonów).

### Format numerów telefonów

Ta sama sekcja Region zawiera ustawienie **Phone numbers**, które określa sposób wprowadzania numerów telefonów w karcie osoby:

- **International (with country code)** (Międzynarodowy, z kodem kraju) -- opcja domyślna. Pola telefonu pokazują selektor flagi kraju i zapisują numery z kodem kraju (na przykład +1 918 555 1234).
- **Local (as typed)** (Lokalny, zgodnie z wpisem) -- pola telefonu stają się zwykłymi polami tekstowymi i zapisują numery dokładnie tak, jak je wpiszesz, bez dodawania kodu kraju (na przykład 0701 234 5678). Wybierz tę opcję, jeśli Twój kościół zapisuje numery w lokalnym formacie i nie chcesz, aby B1 dodawał kod kraju.

Gdy wybrana jest opcja **Local**, sekcja Region pokazuje też „Local phone numbers” obok wybranego regionu.

:::tip
Wysyłanie wiadomości działa najlepiej, gdy numery zawierają kod kraju. Jeśli wysyłasz wiadomości z B1, zostaw format **International** albo upewnij się, że numery wpisywane w trybie Local zawierają kod kraju.
:::

Region obowiązuje dla dat i godzin w B1 Admin oraz na Twojej stronie B1.church i w portalu członków, w tym w kazaniach, wpisach na blogu, kalendarzach grup i planach służby, dzięki czemu członkowie widzą daty w tym samym formacie co personel.

## Wiadomości tekstowe {#texting}

Połącz dostawcę wiadomości, aby wysyłać SMS-y do osoby lub całej grupy z poziomu B1 Admin. Wiadomości są wysyłane przez Twoje własne konto u dostawcy, więc obowiązują jego ceny i limity.

1. Na stronie Settings kliknij **Texting** na liście po lewej stronie, a następnie kliknij **Edit** w sekcji **Texting**.
2. Wybierz **Provider** (Dostawca):
   - **Clearstream** -- wpisz **API Key** (Klucz API). Utwórz go w ustawieniach konta Clearstream w sekcji API Keys.
   - **Text In Church** -- wpisz **API Key** (Klucz API). Najpierw poproś Text In Church Support o dostęp do API dla deweloperów, a następnie utwórz klucz w sekcji Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) -- wpisz klucz autoryzacyjny z konta Nalo Solutions jako **API Key** oraz **Sender ID** (identyfikator nadawcy, do 11 znaków) zatwierdzony dla Ciebie przez Nalo.
   - **Twilio** -- użyj własnego konta Twilio kościoła; Twilio nalicza opłaty bezpośrednio Tobie. Skopiuj **Account SID** i **Auth Token** z [Konsoli Twilio](https://console.twilio.com) i wpisz **From Number** (Numer nadawcy) -- numer telefonu Twilio zarejestrowany dla A2P 10DLC, w formacie takim jak `+15551234567`. Po zapisaniu wklej adres webhooka dla wiadomości przychodzących (patrz poniżej) w polu **A message comes in** (Gdy przychodzi wiadomość) danego numeru w Twilio, aby odpowiedzi STOP były rejestrowane także w B1.
3. Kliknij **Save**.

Aby zakończyć wysyłanie wiadomości, ustaw **Provider** na **None** (Brak) i zapisz. Spowoduje to usunięcie zapisanego dostawcy.

### Wypisywanie osób, które odpowiedzą STOP

Gdy dostawca jest zapisany, otwórz ponownie sekcję Texting przyciskiem **Edit**. Poniżej ustawień dostawcy pole tylko do odczytu **Inbound (STOP) webhook URL** pokazuje adres internetowy przypisany wyłącznie do Twojego kościoła. Kliknij pole, aby zaznaczyć adres, skopiuj go i wklej w ustawieniach webhooka wiadomości przychodzących (odpowiedzi) u swojego dostawcy. Działa to z każdym z wymienionych dostawców, którzy potrafią przekazywać odpowiedzi do webhooka.

Od tego momentu, gdy ktoś odpowie **STOP** (lub STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT albo REVOKE) na Twoją wiadomość, B1 znajduje wszystkie osoby z pasującym numerem komórkowym, oznacza je jako wypisane i wyłącza ich przypomnienia tekstowe. Są one następnie pomijane w wiadomościach grupowych. Inne odpowiedzi są ignorowane.

:::info
Ta opcja korzysta z tego samego ustawienia rezygnacji co **Hide me from the member directory** (Ukryj mnie w katalogu członków), więc osoby, które odpowiedziały STOP, pojawiają się też jako **Hidden from directory** (Ukryte w katalogu) w swoim profilu. Pole pojawia się tylko wtedy, gdy wybrany jest zapisany dostawca -- jeśli zmienisz dostawcę na inny, najpierw zapisz zmiany, aby ponownie zobaczyć adres.
:::

Gdy dostawca jest połączony, osoby z uprawnieniami do wysyłania wiadomości widzą przycisk **Text** na stronie grupy (**Text this group** -- Wyślij wiadomość do tej grupy) oraz osoby z numerem komórkowym (**Send text message** -- Wyślij wiadomość). Wpisz treść i kliknij **Send**. Okno liczy znaki i segmenty SMS. W przypadku grupy przed wysłaniem pokazuje, ilu członków otrzyma wiadomość:

- Członkowie bez zapisanego numeru komórkowego są pomijani.
- Członkowie, którzy wybrali **Hide me from the member directory**, są liczeni jako wypisani i pomijani.
- Członkowie rodziny, którzy współdzielą numer komórkowy, otrzymują wiadomość tylko raz.

### Personalizowanie wiadomości za pomocą pól scalania {#personalizing-texts-with-merge-fields}

Pod polem wiadomości okno Text pokazuje znaczniki symboli zastępczych: **First Name** (Imię), **Last Name** (Nazwisko), **Display Name** (Nazwa wyświetlana) i **Church Name** (Nazwa kościoła). Kliknij znacznik, aby wstawić jego symbol zastępczy (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` lub `{{churchName}}`) w miejscu kursora. Po wysłaniu wiadomości każdy symbol zastępczy zostanie zamieniony na dane danego odbiorcy, więc wiadomość grupowa w rodzaju `Hi {{firstName}}, see you Sunday!` trafi do każdego członka z jego imieniem. Symbole zastępcze działają zarówno w wiadomościach grupowych, jak i w wiadomościach do pojedynczej osoby. W wiadomościach do grupy dostępny jest też znacznik **Group Name** (Nazwa grupy) (`{{groupName}}`), który zostaje zastąpiony nazwą grupy.

Aby ponownie użyć wiadomości, zapisz ją jako [szablon wiadomości](./email-templates.md#text-templates) (szablon e-mail z kategorią **Text**) i wybierz go z listy **Load Template (optional)** (Wczytaj szablon, opcjonalnie) na górze okna Text.

:::info
Limit 1600 znaków dotyczy wiadomości w trakcie pisania. Po wypełnieniu symboli zastępczych każdy tekst dłuższy niż 1600 znaków zostanie przycięty do tej długości.
:::

Wiadomości mogą być też wysyłane automatycznie w ramach kroku [procesu](../serving/workflows.md#sending-a-text) z akcją **Send Text**, która korzysta z tego samego dostawcy i symboli zastępczych.

## Przechowywanie plików

Domyślnie pliki, które przesyłasz na swoją stronę internetową (za pomocą [Files](../website/files.md)) i do innych obszarów treści, korzystają z bezpłatnej hostowanej pamięci B1, do 100 MB. Jeśli potrzebujesz więcej miejsca, możesz zamiast tego połączyć własną pamięć w chmurze -- nowe pliki będą wtedy trafiać bezpośrednio na Twoje konto, bez limitu platformy.

1. Na stronie Settings kliknij **File Storage** na liście po lewej stronie, a następnie kliknij **Edit** w sekcji **File Storage**.
2. Wybierz dostawcę: **Google Drive**, **Dropbox**, **OneDrive** lub **zasobnik zgodny z S3** (AWS S3, Cloudflare R2, Backblaze B2 itp.).
3. W przypadku Google Drive, Dropbox lub OneDrive kliknij **Connect** i zaloguj się, aby autoryzować dostęp. W przypadku zasobnika zgodnego z S3 wpisz klucz dostępu, klucz tajny, nazwę zasobnika i bazowy publiczny adres URL.
4. Kliknij **Save**.

:::info
Dotyczy to tylko nowych plików przesyłanych na pliki Twojej strony internetowej i do podobnych obszarów treści. Zdjęcia z galerii, miniatury, logo i zdjęcia osób zawsze pozostają w domyślnej pamięci B1.
:::

## Awans do wyższej klasy

Jeśli śledzisz **Grade** (Klasę) dzieci i uczniów, B1 może automatycznie przenieść wszystkich do wyższej klasy w wybranym przez Ciebie dniu (na przykład 1 sierpnia), zamiast wymagać ręcznej edycji każdego profilu.

1. Na stronie Settings kliknij **Grade Promotion** na liście po lewej stronie, a następnie kliknij **Edit** w sekcji **Grade Promotion**.
2. Włącz przełącznik (ma pokazywać **Enabled** -- Włączone) i wybierz **Month** (Miesiąc) oraz **Day** (Dzień), w których klasy będą awansować co roku. Tego dnia każdy z przypisaną klasą przechodzi do następnej, a uczniowie ostatniej klasy otrzymują status **Graduated** (Ukończył).
3. Zapisz zmiany.

Aby zatrzymać automatyczny awans, wyłącz przełącznik, tak aby pokazywał **Disabled** (Wyłączone), i zapisz. Data awansu zostanie usunięta, a klasy nie będą już zmieniać się samoczynnie.

## Zapisy na wolontariat {#volunteer-signup}

Domyślnie członkowie przeglądający [zapisy na wolontariat](../../b1-church/serving/volunteer-signup.md) widzą wszystkie nadchodzące tygodnie z wolnymi miejscami. Jeśli lista jest długa, możesz pokazywać tylko najbliższy tydzień dla każdego typu planu.

1. Na stronie Settings kliknij **Volunteer Signup** na liście po lewej stronie, a następnie kliknij **Edit** w sekcji **Volunteer Signup**.
2. Włącz opcję **Show only the next week of each plan type** (Pokazuj tylko następny tydzień dla każdego typu planu).
3. Zapisz zmiany.

Po włączeniu tej opcji każdy typ planu pokazuje tylko swój najbliższy plan. Kolejny tydzień pojawi się po upływie tej daty. Wiersz **Weeks shown** (Wyświetlane tygodnie) w tej sekcji pokazuje **Only the next week of each plan type** (Tylko następny tydzień każdego typu planu) lub **All upcoming weeks** (Wszystkie nadchodzące tygodnie).

## Prywatność darowizn {#giving-privacy}

Osoby z dostępem do darowizn zwykle widzą sumy darowizn danej osoby w jej [karcie osoby](../people/adding-people.md#editing-details). Jeśli nie chcesz, aby kwoty były widoczne za każdym razem, gdy otwierana jest karta, możesz je ukryć, dopóki ktoś o nie nie poprosi.

1. Na stronie Settings kliknij **Giving privacy** na liście po lewej stronie, a następnie kliknij **Edit** w sekcji **Giving privacy**.
2. Włącz opcję **Hide giving on person records until clicked** (Ukryj darowizny na kartach osób do momentu kliknięcia).
3. Zapisz zmiany.

Po włączeniu tej opcji karta darowizn na karcie osoby wyświetla komunikat „Giving is hidden on person records” (Darowizny są ukryte na kartach osób). Kliknij **Show giving** (Pokaż darowizny), aby wczytać i wyświetlić darowizny danej osoby. Ukryją się ponownie po otwarciu karty innej osoby. Zakres dostępu do darowizn się nie zmienia: kartę widzą tylko osoby z dostępem do darowizn.

## Import i eksport

Link **Import/Export** pod nazwą Twojego kościoła na stronie Settings otwiera dedykowane narzędzie w nowym oknie przeglądarki. Użyj go, aby:

- Zaimportować dane członków z innego systemu zarządzania kościołem.
- Wyeksportować dane ChurchApps w celu wykonania kopii zapasowej lub migracji.

Jest to szczególnie przydatne, gdy dopiero konfigurujesz kościół i musisz przenieść istniejące rekordy do ChurchApps.

:::warning
Przed importem danych zawsze najpierw wykonaj kopię zapasową istniejących rekordów. Operacje importu dodają dane do systemu i mogą tworzyć zduplikowane wpisy, jeśli zostaną uruchomione wielokrotnie.
:::
