---
title: "Połączone usługi"
description: "Połącz B1 Admin z Mailchimp, Donorbox, Subsplash, VOMO, Clearstream i innymi narzędziami przez przepisy Zapier lub Make, z przewodnikami dla każdego."
---

# Połączone usługi

<div class="article-intro">

Najszybszym sposobem na połączenie B1 z innym narzędziem technicznym dla kościołów jest zazwyczaj przepis w Zapier lub Make. Nie potrzebujesz nowej infrastruktury B1, a workflow jest hostowany przez zewnętrznego dostawcę. Ta strona to wyselekcjonowana lista usług, które sprawdziliśmy i które można dziś połączyć, z krótkim przewodnikiem konfiguracji do skopiowania dla każdej z nich.

</div>

## Przegląd

| Usługa | Kategoria | Most | Co można połączyć |
|---|---|---|---|
| [Mailchimp](./mailchimp.md) | E-mail | Zapier lub Make | Synchronizacja nowych osób i darczyńców z B1 do odbiorców Mailchimp |
| [Donorbox](./donorbox.md) | Darowizny | Zapier | Przesyłanie darowizn i darczyńców z Donorbox z powrotem do B1 |
| [Subsplash](./subsplash.md) | Aplikacja / darowizny | Zapier | Pobieranie darowizn i osób z Subsplash do B1 |
| [VOMO](./vomo.md) | Wolontariat | Zapier | Synchronizacja zapisów wolontariuszy między grupami B1 a projektami VOMO |
| [Clearstream](./clearstream.md) | SMS | Zapier | Wywoływanie wiadomości tekstowej Clearstream ze zdarzeń B1; zapisywanie odpowiedzi jako rekordów B1 |
| [Text In Church](./text-in-church.md) | SMS / procesy | Zapier | Wywoływanie procesów Text In Church z B1; odbieranie danych z Connect Card |
| [Mobile Message](./mobile-message.md) | SMS (AU) | Webhooks by Zapier lub Make | Wysyłanie SMS-ów z dowolnego zdarzenia B1 |
| [Checkr](./checkr.md) | Sprawdzenia w tle | Make | Uruchamianie sprawdzenia w tle, gdy ktoś dołącza do zespołu służebnego |

## Co łączy wszystkie te usługi

1. **Strona B1 konfiguracji jest identyczna**: utwórz klucz API z odpowiednimi zakresami w **B1Admin → Settings → Developer → API Keys**, a następnie pozwól mostowi zarejestrować webhook dla wyzwalacza (Zapier i Make robią to automatycznie, wymaga `settings:write`) albo wywołaj endpointy REST B1 z kolejnego kroku.
2. **Opłaty za most pobiera dostawca mostu, nie my.** ChurchApps jest bezpłatne. Zapier i Make mają darmowe plany obejmujące kilka przepisów.
3. **Możesz przetestować konfigurację bez uruchamiania na żywo.** Oba mosty mają przycisk „Test step”, który raz uruchamia wyzwalacz względem B1 i pokazuje strukturę danych, zanim włączysz przepis.

## Wybór mostu

- **Zapier** jest przyjaźniejszy i ma większy katalog aplikacji. Używaj go jako domyślnego, chyba że koszt jest problemem.
- **Make** jest tańszy przy dużej skali i ma bardziej elastyczną logikę routingu i filtrów. Używaj go, gdy jeden workflow ma rozgałęzienia, warunki lub wiele kroków.
- **Webhooks by Zapier** (używane w dokumentacji Mobile Message) to ogólny adapter, który pozwala wysyłać POST do dowolnego endpointu HTTP z Zap, gdy miejsce docelowe nie jest natywną aplikacją Zapier.

Jeśli szukasz czegoś, czego nie ma na tej liście, [REST API](/docs/developer/api) i [webhooks](/docs/developer/api/webhooks) B1 są otwarte. Możesz zbudować jednorazowy most za pomocą [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) w kilka godzin.

## Czego tu nie ma (i dlaczego)

Kilka popularnych narzędzi technicznych dla kościołów (Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe) nie ma obecnie opublikowanej aplikacji Zapier ani modułu Make. Mają własne API, ale połączenie ich z B1 to zadanie wymagające własnego kodu, a nie przepisu, więc nie pasują do tej listy. Jeśli dostawca doda aplikację Zapier lub moduł Make, dodamy dokumentację.

Celowo pominęliśmy też narzędzia specyficzne dla Planning Center Services (muzyka, prezentacje), konkurencyjne produkty ChMS, konsultantów ds. migracji oraz narzędzia, które jedynie porządkują dane specyficzne dla PCO. Żadne z nich nie ma użytecznej ścieżki połączenia z B1.

## Zobacz także

- [Zapier (przegląd)](../zapier.md): strona B1 każdego przepisu Zapier jest identyczna, więc ta dokumentacja omawia ją raz
- [Make (przegląd)](../make.md): to samo dotyczy scenariuszy Make
- [Slack i Discord](../slack-discord.md): powiadomienia na czacie bez żadnego mostu
- [Arkusze Google](../google-sheets.md): eksporty na żądanie
- [Webhooks (dokumentacja deweloperska)](/docs/developer/api/webhooks): katalog zdarzeń, na którym opierają się wszystkie przepisy
