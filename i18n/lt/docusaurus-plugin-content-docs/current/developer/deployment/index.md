---
title: "Implementavimas"
---

# Implementavimas

<div class="article-intro">

ChurchApps taiko skirtingas diegimo strategijas, priklausomai nuo projekto tipo. API diegiami į AWS Lambda, žiniatinklio programos diegiamos kaip statinės svetainės į S3 su CloudFront, o mobiliosios programos kuriamos ir platinamos per Expo EAS bei programėlių parduotuves.

</div>

## Implementavimas pagal projekto tipą

| Projekto tipas | Diegimo tikslas | Įrankiai |
|-------------|-------------------|---------|
| [API](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 24.x vykdymo aplinka) |
| [Žiniatinklio programos](./web-apps) | S3 + CloudFront | Statinis sukūrimas, S3 sinchronizavimas, CloudFront talpyklos išvalymas |
| [Mobiliosios programos](./mobile) | Programėlių parduotuvės | Expo EAS Build + OTA atnaujinimai |
| [Savarankiškas talpinimas (Railway)](./railway-template) | Railway | Vieno paspaudimo šablonas: MySQL + Api + B1Admin + B1App |
| [Savarankiškas talpinimas (Docker)](./docker) | Bet koks Docker serveris | Vienos eilutės diegimo programa; iš anksto sukurti GHCR vaizdai + Caddy, `./deploy/b1` atnaujinimas/atsarginė kopija/atkūrimas |
| [Caddy pasirinktinio domeno tarpinis serveris](./caddy-proxy) | Windows EC2 (Elastic IP `3.23.251.61`) | Statinis Caddyfile + WinSW paslauga + suplanuotas žemėlapio sinchronizavimas |
| FreeShow | Tiesioginis atsisiuntimas | Electron Builder (įvairių platformų dvejetainiai failai) |

## Aplinkos

| Aplinka | Paskirtis |
|-------------|---------|
| `dev` | Vietinis kūrimas |
| `demo` | Viešas demonstracinis egzempliorius; diegiamas su kiekvienu įkėlimu į `main`, todėl tarnauja ir kaip prieš-gamybinis testavimas |
| `prod` | Gamyba |

:::info
Kiekviena aplinka turi savo API galinių taškų, duomenų bazių ir konfigūracijos rinkinį. Su aplinka susijusiais nustatymais vietoje valdomi per `.env` failus, o diegiamose aplinkose – per AWS SSM Parameter Store.
:::
