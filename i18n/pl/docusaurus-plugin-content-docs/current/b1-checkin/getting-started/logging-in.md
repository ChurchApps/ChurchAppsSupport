---
title: "Logowanie do B1 Church Checkin"
sidebar_label: "Logowanie"
description: "Zaloguj się do aplikacji kiosku B1 Church Checkin, wybierz swój kościół i poznaj automatyczne logowanie, ustawienia administratora oraz wylogowywanie na tablecie do zameldowania."
---

# Logowanie

<div class="article-intro">

Zanim kiosk będzie mógł być używany do zameldowania, musisz zalogować się na konto ChurchApps, które ma dostęp do Twojego kościoła. Ta strona opisuje proces pierwszego logowania, wybór kościoła, zachowanie automatycznego logowania oraz sposób wylogowania.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Zainstaluj B1 Church Checkin na swoim tablecie z Androidem (zob. [Pierwsze kroki](./index.md))
- Przygotuj adres e-mail i hasło do konta ChurchApps
- Konto musi mieć uprawnienie **Checkin** (lub **Edit Attendance**) w Twoim kościele. Administrator dodaje je w B1 Admin w sekcji **Ustawienia > Role** — zob. [Konta kiosku zameldowania](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Pierwsze logowanie

1. Otwórz aplikację B1 Church Checkin. Po ekranie powitalnym zobaczysz ekran logowania z logo B1 Church Checkin.
2. Wpisz swój **adres e-mail** w pierwszym polu.
3. Wpisz swoje **hasło** w drugim polu.
4. Naciśnij przycisk **Zaloguj**.

Aplikacja sprawdza dane logowania i loguje Cię. Jeśli e-mail lub hasło są nieprawidłowe, na dole ekranu pojawi się komunikat o błędzie.

Jeśli na koncie włączono [logowanie dwuskładnikowe](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), aplikacja poprosi następnie o kod. Wpisz 6-cyfrowy kod z aplikacji uwierzytelniającej właściciela konta lub jeden z jego kodów zapasowych, a następnie ponownie naciśnij **Zaloguj**. Kod jest potrzebny tylko przy pierwszym logowaniu; później kiosk pozostaje zalogowany.

:::info
To ten sam adres e-mail i hasło, których używasz w B1 Admin lub w innym produkcie ChurchApps. Nie potrzebujesz osobnego konta do kiosku zameldowania.
:::

## Wybór kościoła

Po udanym logowaniu aplikacja wczytuje kościoły, w których Twoje konto ma uprawnienie **Checkin** lub **Edit Attendance**. Kościoły, w których masz tylko inne uprawnienia, są pomijane. Jeśli nie pozostanie żaden, aplikacja wyświetli komunikat **Brak dostępu do zameldowania** i poprosi, aby administrator kościoła dodał uprawnienie Checkin do jednej z Twoich ról. Każdy kościół jest wyświetlany jako karta z nazwą i logo kościoła (jeśli zostało skonfigurowane w B1 Admin).

- Jeśli Twoje konto jest powiązane **tylko z jednym kościołem**, i tak zobaczysz ekran wyboru. Naciśnij kartę swojego kościoła, aby kontynuować.
- Jeśli Twoje konto jest powiązane **z wieloma kościołami**, naciśnij ten, który ma obsługiwać ten kiosk.

Po wybraniu kościoła aplikacja wczytuje ustawienia wyglądu i marki tego kościoła. Logo kościoła pojawi się w nagłówku na wszystkich kolejnych ekranach.

## Automatyczne logowanie przy kolejnych wizytach

Po pierwszym udanym logowaniu aplikacja zapisuje na tablecie bezpieczny token logowania oraz wybrany kościół. Nie przechowuje hasła. Przy kolejnych uruchomieniach:

- Aplikacja loguje Cię ponownie, używając zapisanego tokenu.
- Jeśli wcześniej wybrano kościół, przywraca ten wybór i przechodzi bezpośrednio do **ekranu usług**.
- Jeśli zapisane logowanie nie jest już ważne, aplikacja wraca do ekranu logowania, abyś mógł zalogować się ponownie.

:::tip
Ponieważ kiosk loguje się automatycznie, dane logowania wpisujesz tylko raz, podczas wstępnej konfiguracji. Potem wystarczy włączyć tablet, a będzie gotowy do pracy.
:::

## Ustawienia administratora

Ustawienia administratora są celowo ukryte, aby członkowie kościoła korzystający z kiosku nie mogli przypadkowo zmienić konfiguracji. Aby je otworzyć:

1. Naciśnij **logo kościoła** w nagłówku **siedem razy** szybko z rzędu (w ciągu dwóch sekund).
2. Jeśli ustawiono PIN kiosku, wpisz go po wyświetleniu monitu.
3. Otworzy się ekran **Ustawienia administratora** z następującymi opcjami:
   - **Zmień usługę** — zmiana wybranej godziny usługi
   - **Zmień drukarkę** — otwarcie [ustawień drukarki](./printer-setup.md), aby wyszukać i wybrać drukarkę
   - **Ustaw PIN administratora** (lub **Zmień PIN administratora**, gdy PIN jest już ustawiony) — ustawienie lub zmiana PIN-u kiosku chroniącego dostęp administratora
   - **Powiadomienie alarmowe** — wysłanie SMS-a do opiekunów wszystkich zameldowanych gospodarstw domowych (zob. [Emergency Broadcast](../check-in/checking-out.md#emergency-broadcast))
   - **Tryb stanowiska obsługiwanego przez personel** — przełącznik, który dodaje do tego stanowiska wymeldowanie, wywoływanie, ponowne drukowanie i edycję profili (zob. [Wymeldowanie](../check-in/checking-out.md))
   - **Wyloguj** — wylogowanie i powrót do ekranu logowania

   Naciśnij **Powrót do kiosku**, aby wrócić do zameldowania.

:::warning
Wylogowanie usuwa wszystkie zapisane dane logowania oraz wybór kościoła. Aby ponownie korzystać z kiosku, musisz wpisać adres e-mail i hasło. Wylogowuj się tylko wtedy, gdy chcesz przełączyć konto lub ponownie skonfigurować kiosk.
:::

## Następne kroki

Po zalogowaniu możesz [skonfigurować drukarkę](./printer-setup.md) lub od razu przejść do [procesu zameldowania](../check-in/index.md).
