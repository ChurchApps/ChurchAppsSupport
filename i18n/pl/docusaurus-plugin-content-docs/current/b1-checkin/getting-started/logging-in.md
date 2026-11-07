---
title: "Logowanie do B1 Church Checkin"
sidebar_label: "Logowanie"
description: "Zaloguj się do aplikacji kiosku B1 Church Checkin, wybierz kościół i poznaj automatyczne logowanie, ustawienia administratora oraz wylogowanie na tablecie."
---

# Logowanie

<div class="article-intro">

Zanim kiosk będzie można używać do zameldowania, musisz zalogować się na konto ChurchApps, które ma dostęp do Twojego kościoła. Ta strona opisuje pierwsze logowanie, wybór kościoła, automatyczne logowanie oraz sposób wylogowania.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Zainstaluj aplikację B1 Church Checkin na tablecie z Androidem (zobacz [Pierwsze kroki](./index.md))
- Miej pod ręką adres e-mail i hasło do konta ChurchApps
- Konto musi mieć uprawnienie **Checkin** (lub **Edycja frekwencji**) w Twoim kościele. Administrator dodaje je w B1 Admin w sekcji **Ustawienia > Role** — zobacz [Konta kiosku zameldowania](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Pierwsze logowanie

1. Otwórz aplikację B1 Church Checkin. Po ekranie powitalnym zobaczysz ekran logowania z logo B1 Church Checkin.
2. Wpisz swój **adres e-mail** w pierwszym polu.
3. Wpisz swoje **hasło** w drugim polu.
4. Dotknij przycisku **Zaloguj**.

Aplikacja sprawdza dane logowania i loguje Cię. Jeśli adres e-mail lub hasło są niepoprawne, u dołu ekranu pojawi się komunikat o błędzie.

Jeśli dla konta włączono [logowanie dwuskładnikowe](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), aplikacja poprosi o kod. Wpisz 6-cyfrowy kod z aplikacji uwierzytelniającej właściciela konta lub jeden z jego kodów zapasowych, a następnie ponownie dotknij **Zaloguj**. Kod jest potrzebny tylko przy pierwszym logowaniu; potem kiosk pozostaje zalogowany.

:::info
To ten sam adres e-mail i hasło, których używasz w B1 Admin lub w innym produkcie ChurchApps. Nie potrzebujesz osobnego konta dla kiosku zameldowania.
:::

## Wybór kościoła

Po udanym logowaniu aplikacja wczytuje kościoły, w których Twoje konto ma uprawnienie **Checkin** lub **Edycja frekwencji**. Kościoły, w których masz tylko inne uprawnienia, są pomijane. Jeśli nie zostanie żaden, aplikacja wyświetli komunikat **Brak dostępu do zameldowania** i poprosi, aby administrator kościoła dodał uprawnienie Checkin do jednej z Twoich ról. Każdy kościół jest pokazany jako karta z nazwą i logo kościoła (jeśli zostało skonfigurowane w B1 Admin).

- Jeśli Twoje konto jest powiązane **tylko z jednym kościołem**, nadal zobaczysz ekran wyboru. Dotknij swojego kościoła, aby kontynuować.
- Jeśli Twoje konto jest powiązane **z kilkoma kościołami**, dotknij tego, który ma obsługiwać ten kiosk.

Po wybraniu kościoła aplikacja wczytuje ustawienia wyglądu i marki tego kościoła. Logo kościoła będzie się pojawiać w nagłówku na wszystkich kolejnych ekranach.

## Automatyczne logowanie przy kolejnych uruchomieniach

Po pierwszym udanym logowaniu aplikacja zapisuje na tablecie bezpieczny token logowania oraz wybrany kościół. Nie przechowuje hasła. Przy kolejnych uruchomieniach:

- Aplikacja loguje Cię ponownie, używając zapisanego tokenu.
- Jeśli wcześniej wybrano kościół, aplikacja przywraca ten wybór i przechodzi bezpośrednio do **ekranu usług**.
- Jeśli zapisane logowanie przestało być ważne, aplikacja wraca do ekranu logowania, abyś mógł zalogować się ponownie.

:::tip
Ponieważ kiosk loguje się automatycznie, dane logowania wpisujesz tylko raz, podczas wstępnej konfiguracji. Potem wystarczy włączyć tablet, a będzie gotowy do pracy.
:::

## Ustawienia administratora

Ustawienia administratora są celowo ukryte, aby członkowie kościoła korzystający z kiosku nie mogli przypadkowo zmienić konfiguracji. Aby je otworzyć:

1. Dotknij **logo kościoła** w nagłówku **siedem razy** z rzędu, szybko (w ciągu dwóch sekund).
2. Jeśli ustawiono PIN kiosku, wpisz go po wyświetleniu monitu.
3. Otworzy się ekran **Ustawienia administratora** z następującymi opcjami:
   - **Zmień usługę** — przełącz wybraną porę usługi
   - **Zmień drukarkę** — otwórz [ustawienia drukarki](./printer-setup.md), aby wyszukać i wybrać drukarkę
   - **Ustaw/zmień PIN** — ustaw lub zaktualizuj PIN kiosku, który chroni dostęp administratora
   - **Wyloguj** — wyloguj się i wróć do ekranu logowania

:::warning
Wylogowanie usuwa wszystkie zapisane dane logowania oraz wybór kościoła. Aby ponownie korzystać z kiosku, trzeba będzie wpisać adres e-mail i hasło. Wyloguj się tylko wtedy, gdy trzeba przełączyć konto lub ponownie skonfigurować kiosk.
:::

## Następne kroki

Po zalogowaniu możesz [skonfigurować drukarkę](./printer-setup.md) lub przejść od razu do [procesu zameldowania](../check-in/index.md).
