---
title: "Integracje"
---

# Integracje

<div class="article-intro">

B1 łączy się z narzędziami, których Twój zespół już używa. Połącz Slack lub Discord, aby otrzymywać powiadomienia dla personelu, automatyzuj procesy w Zapier lub Make albo na żądanie eksportuj dane do Arkuszy Google. Nie musisz płacić za osobną platformę integracyjną ani korzystać z dodatkowego hostingu ChurchApps. Każda integracja działa na infrastrukturze zewnętrznego dostawcy i komunikuje się z Twoim kościołem za pośrednictwem webhooków B1 lub REST API.

</div>

## Co jest dostępne

| Integracja | Co robi | Kierunek | Nakład pracy na konfigurację |
|---|---|---|---|
| **[Slack](./slack-discord)** | Publikuje czytelne powiadomienia (nowe osoby, darowizny, zapisy, …) w kanale Slack | B1 → Slack | 2 minuty |
| **[Discord](./slack-discord)** | To samo, w kanale Discord | B1 → Discord | 2 minuty |
| **[Zapier](./zapier)** | Używa zdarzeń B1 jako wyzwalaczy i akcji B1 w dowolnej z ponad 7000 aplikacji Zapier | Oba kierunki | 5–10 min na Zap |
| **[Make](./make)** | Ta sama idea co Zapier, w wizualnym kreatorze scenariuszy Make | Oba kierunki | 5–10 min na scenariusz |
| **[Arkusze Google](./google-sheets)** | Na żądanie eksportuje osoby, darowizny, grupy i frekwencję do arkusza kalkulacyjnego | B1 → Arkusz | 5 minut |
| **[Claude](./claude)** | Zadawaj pytania Claude firmy Anthropic o dane swojego kościoła, w zakresie Twoich uprawnień. Można wypróbować za darmo, polecane | Oba kierunki | Poniżej 3 minut |
| **[ChatGPT](./chatgpt)** | Ta sama idea z ChatGPT firmy OpenAI (wymaga płatnego planu ChatGPT) | Oba kierunki | 10 minut |
| **[Usługi połączone](./services/)** | Wyselekcjonowane przepisy dla Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Zależnie od usługi | 5–10 min każda |

## Jak wybrać

- **Chcesz tylko powiadomienie na czacie?** Użyj **Slack** lub **Discord**. Nie potrzebujesz zewnętrznego konta ani Zap do utrzymania. Konfigurujesz je w całości w B1Admin.
- **Chcesz zautomatyzować coś między aplikacjami** (np. „gdy ktoś złoży darowiznę, dodaj go do mojej listy w Mailchimp i na kanał Slack #donations")? Użyj **Zapier** lub **Make**. Zapier jest przyjaźniejszy w obsłudze, a Make jest tańszy przy dużej skali i oferuje bardziej elastyczną logikę.
- **Potrzebujesz jednorazowego pobrania danych lub zaplanowanego raportu?** Użyj **Arkuszy Google**. Wklej klucz API w panelu bocznym dodatku i kliknij Eksportuj.
- **Chcesz zadawać pytania zwykłym językiem** („ilu było pierwszych gości w zeszłą niedzielę?", „podsumuj darowizny w tym miesiącu")? Zacznij od **[Claude](./claude)**. Można go wypróbować za darmo, a konfiguracja zajmuje mniej niż 3 minuty. **[ChatGPT](./chatgpt)** również działa, w ramach płatnego planu. Claude łączy się przez logowanie kontem B1, a ChatGPT używa klucza API B1.
- **Budujesz własną integrację?** Żadna z powyższych opcji nie będzie odpowiednia. Komunikuj się bezpośrednio z [REST API](/docs/developer/api), używając [klucza API](/docs/developer/api/api-keys), albo zasubskrybuj do [webhooków](/docs/developer/api/webhooks) serwer, który kontrolujesz.

## Wspólne cechy

Każda integracja uwierzytelnia się **kluczem API B1**, utworzonym w B1Admin w sekcji **Ustawienia → Deweloper → Klucze API**. Klucz:

- Jest przypisany do konkretnej osoby w Twoim kościele i dziedziczy jej uprawnienia
- Można go zawęzić za pomocą **zakresów**. Na przykład eksport do Arkuszy Google potrzebuje tylko `people:read`, a nie `settings:write`
- Można go unieważnić w dowolnym momencie, natychmiast odcinając dostęp integracji, bez wpływu na cokolwiek innego

Kilka łączników (Zapier, Make) także rejestruje [webhook](/docs/developer/api/webhooks) w Twoim imieniu, gdy Zap lub scenariusz zostanie włączony, i usuwa go po wyłączeniu Zap. Nie musisz samodzielnie zarządzać adresem URL webhooka.

:::tip
Aby Zapier i Make automatycznie rejestrowały webhooki, klucz API musi mieć zakres **`settings:write`** (oraz zakresy zasobów dla tego, czego dotyczy integracja). Klucz tylko do odczytu działa przy akcjach i eksporcie, ale nie przy wyzwalaczach.
:::

## Koszty

ChurchApps jest bezpłatny i open-source. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) oraz oficjalne łączniki Zapier, Make i Arkuszy Google są po naszej stronie również bezpłatne. Zewnętrzni dostawcy mogą pobierać opłaty za swoje platformy. Zapier i Make mają hojne darmowe plany, a Slack, Discord i Arkusze Google są w tym zastosowaniu bezpłatne.

## Tworzenie własnych rozwiązań

Jeśli żadna z powyższych opcji nie pasuje, każda powierzchnia B1 jest otwarta:

- **[REST API](/docs/developer/api)**: wywołuj B1 z dowolnego języka, używając nagłówka `Authorization: Bearer cak_…`
- **[Webhooki](/docs/developer/api/webhooks)**: zasubskrybuj publiczny endpoint HTTPS do jednego lub kilku typów zdarzeń i otrzymuj podpisane payloady JSON
- **[OAuth + połączone aplikacje](/docs/developer/api/connected-apps)**: jeśli budujesz produkt SaaS używany przez wiele kościołów

## Następne kroki

- [Slack i Discord](./slack-discord): publikuj powiadomienia na czacie
- [Zapier](./zapier): połącz się z ponad 7000 aplikacji
- [Make](./make): wizualna automatyzacja procesów
- [Arkusze Google](./google-sheets): eksport do arkuszy kalkulacyjnych
- [Claude](./claude): pytaj Claude firmy Anthropic o dane swojego kościoła
- [ChatGPT](./chatgpt): pytaj ChatGPT firmy OpenAI o dane swojego kościoła
- [Usługi połączone](./services/): przepisy dla poszczególnych usług (Mailchimp, Donorbox, Clearstream, …)
