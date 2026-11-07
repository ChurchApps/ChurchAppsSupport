---
title: "Ajouter des personnes"
description: "Ajoutez une personne à la base de données de votre église dans B1 Admin, renseignez ses coordonnées et reliez les membres de la famille en foyers pour l'enregistrement et les rapports."
---

# Ajouter des personnes

<div class="article-intro">

La section Personnes est le fondement de B1 Admin -- c'est la base de données des membres de votre église. Toutes les autres fonctionnalités (groupes, présences, dons, formulaires) se rattachent aux fiches de personnes. Ce guide vous explique comment ajouter quelqu'un à votre base de données, modifier ses renseignements et relier les membres d'une famille dans des foyers.

</div>

## Vidéo de formation

<YouTube id="NTL1UDQpx8s" title="Ajouter des personnes et des foyers dans B1" next="Importer votre base de données de personnes dans B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec l'autorisation de gérer les personnes. Voir [Rôles et autorisations](roles-permissions.md) si vous ne savez pas quel est votre niveau d'accès.
- Si vous ajoutez plus d'une poignée de personnes, envisagez plutôt l'outil [Importation CSV](importing-data.md).

</div>

## Ajouter une personne

1. Accédez au tableau de bord de B1.church Admin.
2. Ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Personnes**, puis cliquez sur **Personnes**.
3. Cliquez sur le bouton **Ajouter une personne** dans l'en-tête de la page. La page défile jusqu'au formulaire **Ajouter une nouvelle personne** situé sous le répertoire.
4. Saisissez le **prénom**, le **nom** et le **courriel** de la personne, puis cliquez sur **Ajouter**.

La page de profil de la personne s'ouvre, prête à recevoir d'autres renseignements.

:::tip
Si vous migrez depuis un autre système de gestion d'église, la fonctionnalité [Importer des données](importing-data.md) vous permet d'importer tout votre répertoire à partir d'un fichier CSV -- beaucoup plus rapide que d'ajouter les personnes une à une.
:::

### Avertissements de doublons

Si l'adresse courriel (ou, lorsque vous créez une personne depuis le formulaire Modifier complet, le numéro de téléphone ou la correspondance prénom + nom + date de naissance) correspond à une personne déjà présente dans votre base de données, une boîte de dialogue **Doublon possible** apparaît avant l'enregistrement de la nouvelle fiche. Elle énumère chaque personne correspondante avec son courriel, son téléphone et sa date de naissance, afin que vous puissiez comparer.

- Cliquez sur **Utiliser l'existant** à côté d'une correspondance pour utiliser la fiche de cette personne au lieu d'en créer une nouvelle.
- Cliquez sur **Créer quand même** pour ajouter la nouvelle personne même si une correspondance possible a été trouvée.

Cette vérification ne s'effectue que lorsque vous créez une toute nouvelle personne -- la modification d'une fiche existante ne la déclenche jamais. Elle empêche seulement la création de nouveaux doublons ; elle ne fusionne pas deux fiches déjà existantes.

## Modifier les détails {#editing-details}

1. Sur la page de profil de la personne, cliquez sur le bouton **Modifier** sous ses coordonnées, à gauche.
2. Dans le formulaire **Renseignements personnels**, saisissez des renseignements supplémentaires tels qu'un **titre** (choisissez M., Mme, Mlle, Dr, Pr, Rév. ou Pasteur dans la liste, ou saisissez le vôtre, jusqu'à 10 caractères), le deuxième prénom, le statut de membre (**Visiteur**, **Invité**, **Participant régulier**, **Membre**, **Personnel**, **Inactif** ou **Décédé**), les dates, l'adresse, les numéros de téléphone et (pour les enfants et les étudiants) le niveau scolaire et l'école.
3. Cliquez sur **Enregistrer** pour conserver les renseignements personnels.

Le côté gauche du profil affiche la photo de la personne, son nom, son statut de membre, ses coordonnées, les valeurs de tout [champ personnalisé](../settings/custom-fields.md) et son foyer. Sous le foyer, **Ajouté** indique la date de création de la fiche (uniquement pour les personnes ajoutées depuis fin octobre 2026). Cliquez sur la photo pour la modifier. Sous le bouton **Modifier**, quelques autres actions sont disponibles : **Flux de travail** (ajouter la personne à un [flux de travail](../serving/workflows.md)), **Fusionner**, **Exporter** et **Exporter les données**.

Le reste du profil affiche une section récapitulative pour chaque type de renseignement associé :

- **Présences** — Indique lesquelles des dernières semaines la personne a fréquentées et ses visites les plus récentes. Cliquez sur **Toutes les années** pour voir l'historique complet de ses visites, y compris le campus, le service, l'horaire de service, le groupe et une colonne **Pointé** avec l'heure du pointage à la borne (affichée sous forme de tiret pour les visites enregistrées sans pointage à la borne), ou sur **Imprimer** pour l'imprimer (l'impression comporte le logo et le nom de votre église centrés en haut, au-dessus du nom de la personne). Pour les tendances de toute l'église plutôt que l'historique d'une seule personne, voir [Suivi des présences](../attendance/tracking-attendance.md)
- **Dons** — Affiche les dons de cette année, y compris les dons aux fonds non déductibles. Cliquez sur **Toutes les années** pour voir l'[historique complet des dons](../donations/recording-donations.md), ou sur **Enregistrer un don** pour en saisir un nouveau. Si votre église a activé la [confidentialité des dons](../settings/church-settings.md#giving-privacy), les montants restent masqués jusqu'à ce que vous cliquiez sur **Afficher les dons**
- **Groupes** — Liste les [appartenances aux groupes](../groups/group-members.md) de la personne, avec **Joint** et la date d'adhésion à chaque groupe lorsqu'elle est enregistrée
- **Notes** — Affiche les notes récentes concernant la personne (soins pastoraux, suivis, etc.). Cliquez sur **Toutes les notes** pour lire et ajouter des notes. Chaque note indique son auteur ainsi que la date et l'heure de publication. Pour voir les notes récentes de toutes les personnes à la fois, utilisez la page [Notes](./notes.md)
- **Formulaires** — Liste les formulaires de la personne et indique si chacun a été soumis (voir [Utiliser les formulaires](#working-with-forms) ci-dessous)

Lorsque vous ouvrez l'une de ces vues complètes, cliquez sur le lien **Retour à** avec le nom de la personne en haut pour revenir au profil.

## Écrire à une personne

Si la personne a une adresse courriel au dossier, un bouton **Courriel** apparaît sous ses coordonnées, à gauche du profil.

1. Sur le profil de la personne, cliquez sur **Courriel**.
2. Une boîte de dialogue **Courriel**, intitulée du nom de la personne, s'ouvre et affiche **Envoyer à** avec son adresse.
3. Facultativement, choisissez un modèle enregistré dans **Charger un modèle (facultatif)**.
4. Saisissez un **objet** et rédigez le message.
5. Cliquez sur **Envoyer le courriel**.

Pour rédiger le message dans votre propre logiciel de courriel à la place, cliquez sur **Ouvrir dans mon application de courriel**.

:::info
L'envoi depuis B1 suit les mêmes approbations et limites quotidiennes que les courriels de groupe. Si votre église n'a pas encore été approuvée, la boîte de dialogue vous invite à demander un examen -- vous pouvez entre-temps cliquer sur **Ouvrir dans mon application de courriel**. Voir [Activer les courriels de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church). Les utilisateurs sans l'autorisation de modifier les membres des groupes passent directement à leur application de courriel lorsqu'ils cliquent sur **Courriel**.
:::

## Utiliser les formulaires {#working-with-forms}

Vous pouvez remplir des formulaires personnalisés directement depuis le profil d'une personne. Il s'agit de formulaires définis par l'utilisateur que vous pouvez créer en suivant le guide [Créer des formulaires](../forms/creating-forms.md).

1. Sur le profil de la personne, repérez la section **Formulaires**. Elle liste chaque formulaire ainsi que la mention **Soumis** ou **Non soumis**.
2. Cliquez sur le nom d'un formulaire pour l'ouvrir (ou cliquez sur **Tous les formulaires** pour voir la liste complète).
3. Cliquez sur l'**icône de modification** (crayon) du formulaire, remplissez les détails, puis cliquez sur **Enregistrer**.

Une fois un formulaire soumis, cliquez sur l'**icône d'impression** à côté pour imprimer les réponses remplies de cette personne. Lorsque la personne n'a qu'une seule soumission d'un formulaire, celui-ci affiche **Soumis** avec la date au-dessus des réponses.

Si une soumission a été rattachée à la mauvaise personne, cliquez sur l'icône **Changer de personne** (deux flèches) à côté pour la transférer à quelqu'un d'autre ou la dissocier. Voir [Changer la personne associée à une soumission](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Les formulaires liés au profil d'une personne utilisent le type de formulaire **Personnes**. Si vous avez besoin d'un formulaire autonome (comme une inscription à un événement), consultez l'option [formulaire autonome](../forms/creating-forms.md) dans le guide des formulaires.
:::

:::tip
Si vous n'avez besoin de suivre qu'un ou deux renseignements supplémentaires sur les personnes -- une date, un nombre, une réponse oui/non -- utilisez plutôt les [champs personnalisés](../settings/custom-fields.md) qu'un formulaire. Ils se remplissent plus rapidement et sont directement consultables dans la recherche avancée.
:::

## Gérer les foyers {#managing-households}

Les foyers vous permettent de relier les membres d'une même famille. C'est particulièrement utile pour le [pointage](../attendance/check-in.md), où un parent peut pointer tous ses enfants en une seule fois.

1. Sur le profil d'une personne, cliquez sur **Modifier** à côté de l'en-tête **Foyer**, à gauche.
2. L'éditeur de foyer s'ouvre. Sélectionnez le **rôle dans le foyer** de la personne actuelle (par exemple Chef, Conjoint, Enfant, Autre).
3. Cliquez sur l'icône **Ajouter** pour ajouter un autre membre du foyer.
4. Sous **Ajouter un membre du foyer**, saisissez le nom de la personne dans la zone de recherche et appuyez sur **Entrée** ou cliquez sur l'icône de recherche. (Avant de taper quoi que ce soit, une courte liste de **Personnes récentes** s'affiche.)
5. Lorsque la personne apparaît dans les résultats, cliquez sur son nom ou sur l'icône d'ajout à côté.
6. Choisissez son rôle dans le foyer et cliquez sur **Enregistrer** pour terminer la configuration du foyer.
