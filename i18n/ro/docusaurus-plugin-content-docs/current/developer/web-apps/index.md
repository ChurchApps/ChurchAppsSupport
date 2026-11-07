---
title: "Aplicații web"
---

# Aplicații web

<div class="article-intro">

ChurchApps include trei aplicații web, fiecare destinată unui public și unui scop diferit. Toate au o bază tehnologică comună, formată din React 19, TypeScript și Material-UI 7, dar diferă prin instrumentele de build și țintele de implementare.

</div>

## Aplicațiile pe scurt

| Aplicație | Scop | Framework | Port de dezvoltare |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | Panou de administrare a bisericii | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Aplicație publică pentru membrii bisericii | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Gestionarea conținutului lecțiilor | Next.js 16 + React 19 | 3501 |

## Stiva tehnologică comună

Toate cele trei aplicații web sunt construite cu:

- **TypeScript** -- Siguranță a tipurilor de la un capăt la altul
- **React 19** -- Bibliotecă de componente UI
- **Material-UI 7** -- Sistem de design și set de instrumente pentru componente
- **React Query 5** -- Gestionarea stării serverului

## Componente comune

Aplicațiile partajează componente UI și utilitare prin familia de pachete `@churchapps/apphelper*`:

| Pachet | Scop |
|---------|---------|
| `@churchapps/apphelper` | Componente React partajate de bază |
| `@churchapps/apphelper-login` | Componente UI pentru autentificare |
| `@churchapps/apphelper-donations` | Formulare pentru donații și contribuții |
| `@churchapps/apphelper-forms` | Componente pentru constructorul de formulare |
| `@churchapps/apphelper-markdown` | Redarea conținutului Markdown |
| `@churchapps/apphelper-website` | Componente pentru site-uri web și CMS |

:::tip
Pentru detalii despre dezvoltarea locală a acestor pachete partajate, consultați documentația [AppHelper](../shared-libraries/app-helper).
:::

## Script postinstall

Fiecare aplicație web are un script `postinstall` care copiază fișierele de localizare și resursele CSS din `@churchapps/apphelper` în proiect. Acesta rulează automat după `npm install`.

:::info
Dacă componentele apar fără stiluri după instalarea dependențelor, es posibil ca scriptul `postinstall` să nu fi rulat corect. Îl puteți porni manual cu `npm run postinstall`.
:::

## Instrumente de build

Aplicațiile folosesc două instrumente de build diferite:

- **B1Admin** folosește **Vite** -- un bundler rapid și modern, ideal pentru aplicațiile cu o singură pagină
- **B1App** și **LessonsApp** folosesc **Next.js** -- oferind randare pe server, rutare bazată pe fișiere și build-uri optimizate pentru producție
