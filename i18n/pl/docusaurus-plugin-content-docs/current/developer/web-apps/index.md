---
title: "Aplikacje internetowe"
description: "Przegląd trzech aplikacji webowych ChurchApps (B1 Admin, B1.church, Lessons.church), wspólnego stosu React i MUI, pakietów apphelper i narzędzi budowania."
---

# Aplikacje internetowe

<div class="article-intro">

ChurchApps zawiera trzy aplikacje internetowe, z których każda służy innym odbiorcom i innemu celowi. Wszystkie opierają się na wspólnej podstawie technologicznej: React 19, TypeScript i Material-UI 7. Różnią się jednak narzędziami do budowania i miejscami wdrożenia.

</div>

## Przegląd aplikacji

| Aplikacja | Przeznaczenie | Framework | Port deweloperski |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | Panel administracyjny kościoła | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Publiczna aplikacja dla członków kościoła | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Zarządzanie treściami lekcji | Next.js 16 + React 19 | 3501 |

## Wspólny stos technologiczny

Wszystkie trzy aplikacje internetowe są zbudowane z użyciem:

- **TypeScript** -- pełne bezpieczeństwo typów od początku do końca
- **React 19** -- biblioteka komponentów interfejsu
- **Material-UI 7** -- system projektowania i zestaw komponentów
- **React Query 5** -- zarządzanie stanem danych po stronie serwera

## Wspólne komponenty

Aplikacje współdzielą komponenty interfejsu i narzędzia za pośrednictwem rodziny pakietów `@churchapps/apphelper*`:

| Pakiet | Przeznaczenie |
|---------|---------|
| `@churchapps/apphelper` | Podstawowe wspólne komponenty React |
| `@churchapps/apphelper-login` | Komponenty interfejsu uwierzytelniania |
| `@churchapps/apphelper-donations` | Formularze darowizn i składek |
| `@churchapps/apphelper-forms` | Komponenty kreatora formularzy |
| `@churchapps/apphelper-markdown` | Renderowanie Markdown |
| `@churchapps/apphelper-website` | Komponenty witryny i systemu zarządzania treścią |

:::tip
Szczegółowe informacje o lokalnym rozwijaniu tych pakietów współdzielonych znajdziesz w dokumentacji [AppHelper](../shared-libraries/app-helper.md).
:::

## Skrypt postinstall

Każda aplikacja internetowa ma skrypt `postinstall`, który kopiuje pliki lokalizacji i zasoby CSS z `@churchapps/apphelper` do projektu. Uruchamia się on automatycznie po wykonaniu `npm install`.

:::info
Jeśli komponenty wyglądają na nieostylowane po instalacji zależności, skrypt `postinstall` mógł nie zostać uruchomiony poprawnie. Możesz go uruchomić ręcznie poleceniem `npm run postinstall`.
:::

## Narzędzia do budowania

Aplikacje korzystają z dwóch różnych narzędzi do budowania:

- **B1Admin** używa **Vite** -- szybkiego, nowoczesnego bundlera idealnego dla aplikacji jednostronicowych
- **B1App** i **LessonsApp** używają **Next.js** -- zapewniającego renderowanie po stronie serwera, routing oparty na plikach oraz zoptymalizowane buildy produkcyjne
