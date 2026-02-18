---
title: "Enregistrement"
---

# Enregistrement

<div class="article-intro">

B1 Admin prend en charge l'enregistrement en libre-service lors des cultes grâce à l'application compagnon **B1 Checkin**. Les membres peuvent s'enregistrer eux-mêmes ainsi que leur famille sur des bornes ou des appareils dédiés à leur arrivée, rendant le processus rapide et réduisant la charge de travail de vos bénévoles. Chaque enregistrement est automatiquement comptabilisé comme une présence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vos lieux de culte, horaires de culte et groupes doivent être configurés dans [Configuration des présences](setup.md).
- Vous devez avoir des [personnes dans votre base de données](../people/adding-people.md) avec des [foyers](../people/adding-people.md#gérer-les-foyers) configurés afin que les familles puissent s'enregistrer ensemble.
- Vous aurez besoin d'une tablette et éventuellement d'une imprimante d'étiquettes Brother (voir les [recommandations matérielles](#matériel-recommandé) ci-dessous).

</div>

## Comment ça fonctionne

L'application B1 Checkin se connecte à la configuration des présences de votre B1 Admin. Lorsqu'un membre s'enregistre, sa présence est automatiquement enregistrée pour le bon lieu de culte, l'horaire de culte et le groupe correspondant. Vous n'avez pas besoin de saisir manuellement la présence pour quiconque utilise le système d'enregistrement.

## Configurer l'enregistrement

1. **Configurez d'abord votre structure de présences.** Dans B1 Admin, allez dans **Présences > Configuration** et assurez-vous que vos lieux de culte, horaires de culte et groupes sont en place. L'application d'enregistrement repose sur cette configuration. Voir [Configuration des présences](setup.md) pour plus de détails.
2. **Installez l'application B1 Checkin** sur les appareils que vous prévoyez d'utiliser. L'application est disponible sur les plateformes suivantes :
   - **Tablettes Android/Samsung :** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablettes Amazon Fire :** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Connectez-vous à l'application B1 Checkin** en utilisant les identifiants du compte de votre église.
4. **Sélectionnez le lieu de culte et l'horaire de culte** pour le rassemblement en cours.
5. Les membres peuvent maintenant rechercher leur nom sur l'appareil et s'enregistrer.

:::tip
Placez les appareils d'enregistrement dans des endroits visibles et facilement accessibles, comme les entrées du hall ou les comptoirs d'accueil. Une brève annonce pendant les cultes aide les membres à savoir que cette option est disponible.
:::

:::tip
Si votre église a plusieurs lieux de culte, vous devrez répéter la configuration pour chaque lieu dans [Configuration des présences](setup.md). Chaque appareil d'enregistrement peut être configuré pour un lieu différent.
:::

## Matériel recommandé

**Tablettes** -- les suivantes fonctionnent bien avec l'application :

- **Compact :** Samsung Galaxy Tab A7 Lite 8.7"
- **Grand écran :** Samsung Galaxy Tab A8 10.5"
- **Économique :** Amazon Fire HD 10

**Imprimantes** -- les enregistrements fonctionnent avec les imprimantes d'étiquettes Brother pour l'impression de badges nominatifs :

- **Meilleur choix :** Brother QL-1110NWB (prend en charge plusieurs tablettes via Bluetooth et WiFi)
- **Bon choix :** Brother QL-810W (prend en charge plusieurs tablettes via WiFi)
- **Économique :** Brother QL-1100 (WiFi uniquement)

**Étiquettes :** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Seules les imprimantes d'étiquettes Brother sont compatibles avec l'application B1 Checkin. Les autres marques d'imprimantes ne fonctionneront pas pour l'impression de badges nominatifs.
:::

:::info
Suivez les instructions de configuration de votre imprimante pour la connecter au même réseau WiFi que votre tablette. Vous pouvez trouver les pilotes et les guides de configuration des imprimantes Brother sur le [site de support Brother](https://support.brother.com).
:::

## Ce qui est enregistré

Chaque enregistrement crée un enregistrement de présence dans B1 Admin. Vous pouvez consulter ces enregistrements dans les onglets [Présences](tracking-attendance.md) et [Groupes](../groups/group-members.md) exactement comme les présences saisies manuellement. Il n'y a aucune différence dans l'affichage des données -- les deux méthodes alimentent les mêmes rapports.
