---
title: "Arkusze Google"
description: "Połącz B1 Admin z Google Sheets dzięki dodatkowi B1 Export, aby na żądanie pobierać osoby, darowizny, grupy i frekwencję do zakładek arkusza."
---

# Arkusze Google

<div class="article-intro">

**B1 Export** to oficjalny dodatek do Arkuszy Google dla B1.church. Dodaje panel boczny do dowolnego arkusza kalkulacyjnego, który eksportuje osoby, darowizny, grupy lub frekwencję z Twojego kościoła B1 do nazwanych kart. Eksport uruchamiasz na żądanie, jednym kliknięciem. Dodatek działa w całości na koncie Google użytkownika. Poza odczytowymi wywołaniami API, które wykonuje każdy eksport, nie łączy się z serwerami ChurchApps.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Konto Google z uprawnieniami edycji do arkusza, do którego chcesz eksportować dane
- Administrator kościoła (lub osoba z dostępem do odczytu danych, które chcesz eksportować), która może utworzyć klucz API B1
- Dodatek B1 Export zainstalowany z Google Workspace Marketplace

</div>

## Co jest eksportowane

| Pozycja menu | Karta arkusza | Dane |
|---|---|---|
| Export People | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Export Donations | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Export Groups | `B1 Groups` | ID, Name, Category, Member Count |
| Export Attendance | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

Każdy eksport **zastępuje** zawartość swojej nazwanej karty. Ponowne uruchomienie eksportu daje świeżą migawkę danych, a nie dopisane wiersze. Pozostałe karty w arkuszu pozostają nietknięte.

## Konfiguracja

### 1. Utwórz klucz API B1 z odpowiednimi zakresami

1. W B1Admin przejdź do **Ustawienia → Deweloper → Klucze API**.
2. Kliknij **Nowy klucz API**, nazwij go „Sheets Export” i przyznaj uprawnienia **odczytu** dla danych, które zamierzasz eksportować:
   - `people:read` dla eksportu osób
   - `donations:read` dla darowizn
   - `groups:read` dla grup
   - `attendance:read` dla frekwencji
3. Klucz służący wyłącznie do eksportów **nie** potrzebuje zakresu `settings:write`. Ten zakres jest przeznaczony tylko dla łączników rejestrujących webhooki (Zapier / Make). Trzymaj ten klucz jak najwęższy.
4. Zapisz i skopiuj klucz `cak_…`.

### 2. Zainstaluj dodatek

1. Otwórz arkusz, do którego chcesz eksportować dane.
2. **Rozszerzenia → Dodatki → Pobierz dodatki**.
3. Wyszukaj **B1 Export** i zainstaluj go. Google poprosi o zgodę na dostęp do Twoich arkuszy oraz do zewnętrznych żądań HTTP, aby dodatek mógł wywoływać API B1.

Po instalacji wpis **B1 Export** pojawi się w menu **Rozszerzenia** każdego arkusza otwartego na tym koncie Google.

### 3. Połącz klucz

1. **Rozszerzenia → B1 Export → Connect…** (lub **B1 Export → Connect…** z paska menu po pierwszym otwarciu).
2. Wklej klucz API do panelu bocznego, pozostaw Base URL jako `https://api.churchapps.org` (chyba że testujesz na środowisku staging) i kliknij **Save**.
3. Kliknij **Test Connection**. Zielony komunikat „Connection OK” potwierdza, że klucz działa.

Klucz jest przechowywany we **właściwościach użytkownika** (`PropertiesService.getUserProperties()`). Jest powiązany z Twoim kontem Google, nigdy nie jest zapisywany w arkuszu i nie jest widoczny dla innych edytorów arkusza.

## Uruchamianie eksportu

Możesz to zrobić na dwa sposoby:

- **Z menu**: **Rozszerzenia → B1 Export → Export People** (lub Donations / Groups / Attendance)
- **Z panelu bocznego**: otwórz panel (Connect…) i kliknij odpowiedni przycisk zbioru danych

Powiadomienie potwierdza zakończenie eksportu, np. „Zapisano wierszy: _N_ w 'B1 People'.”

## Budowanie raportów na bazie eksportów

Eksportowane karty to zwykłe dane Arkuszy Google. Twórz własne analizy, odwołując się do tych kart:

- **Karta podsumowania** z formułą `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)`, aby zsumować darowizny kartą
- **Filtrowany widok** tylko członków: `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- **Wykres** trendów frekwencji na podstawie karty `B1 Attendance`

Ponowne uruchomienie eksportu odświeża bazową kartę, a Twoje formuły aktualizują się automatycznie.

## Planowanie cyklicznych eksportów

Dodatek działa domyślnie na żądanie. W przypadku eksportów tygodniowych lub miesięcznych użyj wbudowanych wyzwalaczy czasowych Apps Script:

1. **Rozszerzenia → Apps Script** w arkuszu (otworzy się skrypt powiązany z dodatkiem).
2. Kliknij ikonę **⏰ Triggers** (Wyzwalacze) w lewym panelu.
3. Kliknij **Add Trigger** dla `exportPeople` (lub dowolnej innej funkcji eksportu). Wybierz *Oparty na czasie*, *Timer tygodniowy*, np. *Każdy poniedziałek o 6:00*.

Eksport działa w tle na Twoim koncie Google. Jeśli klucz API zostanie zmieniony lub unieważniony, wyzwalacz wyśle Ci wiadomość e-mail przy następnej awarii.

## Uprawnienia i prywatność

- Dodatek żąda wyłącznie zakresu `spreadsheets.currentonly` (może działać tylko na arkuszu, w którym jest otwarty) oraz `script.external_request` (aby `UrlFetchApp` mógł wywoływać API B1). **Nie** ma dostępu do Twojego Dysku, Gmaila ani innych danych Google.
- Klucz API B1 jest przechowywany osobno dla każdego użytkownika. Inni edytorzy tego samego arkusza nie mogą go zobaczyć.
- Wszystkie wywołania API B1 są wykonywane przez HTTPS z nagłówkiem `Authorization: Bearer cak_…`.

## Rozwiązywanie problemów

- **"No API key set"**: otwórz **Rozszerzenia → B1 Export → Connect…** i wklej klucz.
- **"B1 rejected the API key (401)"**: klucz został unieważniony lub jest błędny. Utwórz nowy klucz i wklej go ponownie.
- **"This API key lacks permission for /giving/donations (403)"**: klucz nie ma uprawnienia `donations:read`. Zaktualizuj zakresy klucza w B1Admin.
- **Arkusz się nie odświeża** po uruchomieniu: upewnij się, że patrzysz na *właściwą* nazwę karty (np. `B1 People`). Eksport tworzy kartę, jeśli jeszcze nie istnieje.
- **"Quota exceeded"**: Apps Script narzuca dzienne limity wywołań `UrlFetchApp` na użytkownika (zazwyczaj kilka tysięcy dziennie). Duży kościół z wieloma rekordami może potrzebować rozłożyć eksporty na kilka dni lub użyć [Make](./make.md) albo własnej integracji do synchronizacji o dużej objętości.

## Dostosowywanie dodatku

Dodatek jest open source. Projekt Apps Script znajduje się w repozytorium `B1Integrations/GoogleSheetsAddon/`. Jeśli potrzebujesz kolumny, której nie eksportujemy, dodatkowego zbioru danych lub innego formatu wyjściowego, otwórz zgłoszenie (issue) lub pull request w tym repozytorium.

## Zobacz także

- [Zapier](./zapier.md): synchronizacja w czasie rzeczywistym zamiast eksportu na żądanie
- [Make](./make.md): synchronizacja z bardziej złożonymi przekształceniami
- [Klucze API (dokumentacja dla deweloperów)](/docs/developer/api/api-keys)
