---
title: "Ajouter des personnes"
---

# Ajouter des personnes

<div class="article-intro">

La section Personnes est le fondement de B1 Admin -- c'est la base de données des membres de votre église. Toutes les autres fonctionnalités (groupes, présence, dons, formulaires) reposent sur les fiches de personnes. Ce guide vous accompagne dans l'ajout d'une personne à votre base de données, la modification de ses renseignements et le regroupement des membres de la famille en foyers.

</div>

## Vidéo de formation

<YouTube id="NTL1UDQpx8s" title="Ajouter des personnes et des foyers dans B1" next="Importer votre base de données de personnes dans B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec l'autorisation de gérer les personnes. Consultez [Rôles et autorisations](roles-permissions.md) si vous ne savez pas quel est votre niveau d'accès.
- Si vous ajoutez plus d'une poignée de personnes, pensez à utiliser l'outil [Importation CSV](importing-data.md).

</div>

## Ajouter une personne

1. Rendez-vous sur le tableau de bord de B1.church Admin.
2. Ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Personnes**, et cliquez sur **Personnes**.
3. Cliquez sur le bouton **Ajouter une personne** dans l'en-tête de la page. La page défile vers le bas jusqu'au formulaire **Ajouter une nouvelle personne** situé sous le répertoire.
4. Remplissez le **prénom**, le **nom de famille** et le **e-mail** de la personne, puis cliquez sur **Ajouter**.

La page de profil de la personne s'ouvre, prête à recevoir d'autres renseignements.

:::tip
Si vous migrez depuis un autre système de gestion d'église, la fonctionnalité [Importer des données](importing-data.md) vous permet d'importer tout votre répertoire depuis un fichier CSV -- beaucoup plus rapide que d'ajouter les personnes une à une.
:::

### Avertissements de doublons

Si l'adresse e-mail (ou, lors de la création d'une personne depuis le formulaire de modification complet, le numéro de téléphone ou la correspondance prénom + nom + date de naissance) correspond à quelqu'un déjà présent dans votre base de données, une boîte de dialogue **Doublon possible** apparaît avant l'enregistrement de la nouvelle fiche. Elle liste chaque personne correspondante avec son e-mail, son téléphone et sa date de naissance afin que vous puissiez comparer.

- Cliquez sur **Utiliser l'existant** à côté d'une correspondance pour utiliser la fiche de cette personne au lieu d'en créer une nouvelle.
- Cliquez sur **Créer quand même** pour ajouter la nouvelle personne même si une correspondance possible a été trouvée.

Cette vérification ne se fait que lors de la création d'une toute nouvelle personne -- la modification d'une fiche existante ne la déclenche jamais. Elle empêche seulement de nouveaux doublons ; elle ne fusionne pas deux fiches déjà existantes.

## Modifier les détails {#editing-details}

1. Sur la page de profil de la personne, cliquez sur le bouton **Modifier** sous ses coordonnées, à gauche.
2. Dans le formulaire **Détails personnels**, saisissez des renseignements supplémentaires comme le deuxième prénom, le statut de membre (**Visiteur**, **Invité**, **Participant régulier**, **Membre**, **Personnel**, **Inactif** ou **Décédé**), les dates, l'adresse, les numéros de téléphone et (pour les enfants et les étudiants) le niveau scolaire et l'école.
3. Cliquez sur **Enregistrer** pour conserver les renseignements personnels.

La partie gauche du profil affiche la photo, le nom, le statut de membre, les coordonnées de la personne, les valeurs de tout [champ personnalisé](../settings/custom-fields.md) et son foyer. Sous le foyer, **Ajouté** indique la date de création de la fiche (uniquement pour les personnes ajoutées depuis fin octobre 2026). Cliquez sur la photo pour la modifier. Sous le bouton **Modifier** figurent quelques autres actions : **Flux de travail** (ajouter la personne à un [flux de travail](../serving/workflows.md)), **Fusionner**, **Exporter** et **Exporter les données**.

Le reste du profil affiche une section de résumé pour chaque type de renseignements associés :

- **Présence** -- Indique à quelles semaines parmi les dernières la personne a assisté et ses visites les plus récentes. Cliquez sur **Toutes les années** pour voir l'historique complet de ses visites, y compris le campus, le service, l'horaire de service, le groupe et une colonne **Enregistré** avec l'heure d'enregistrement à la borne (affichée comme un tiret pour les visites enregistrées sans enregistrement à la borne), ou sur **Imprimer** pour l'imprimer (l'impression porte le logo et le nom de votre église centrés en haut, au-dessus du nom de la personne). Pour les tendances de toute l'église plutôt que l'historique d'une seule personne, consultez [Suivi de la présence](../attendance/tracking-attendance.md)
- **Dons** -- Affiche les dons de cette année, y compris les dons aux fonds non déductibles. Cliquez sur **Toutes les années** pour voir l'intégralité de son [historique de dons](../donations/recording-donations.md), ou sur **Consigner un don** pour en enregistrer un nouveau. Si votre église a activé la [Confidentialité des dons](../settings/church-settings.md#giving-privacy), les montants restent masqués jusqu'à ce que vous cliquiez sur **Afficher les dons**
- **Groupes** -- Liste les [adhésions aux groupes](../groups/group-members.md) de la personne, avec **Joint** et la date à laquelle elle a rejoint chaque groupe lorsqu'elle est consignée
- **Notes** -- Affiche les notes récentes concernant la personne (soins pastoraux, suivis, etc.). Cliquez sur **Toutes les notes** pour lire et ajouter des notes. Chaque note indique qui l'a écrite ainsi que la date et l'heure de publication. Pour voir les notes récentes de toutes les personnes à la fois, utilisez la page [Notes](./notes.md)
- **Formulaires** -- Liste les formulaires de la personne et indique si chacun a été soumis (voir [Travailler avec les formulaires](#working-with-forms) ci-dessous)

Lorsque vous ouvrez l'une de ces vues complètes, cliquez sur le lien **Retour à** portant le nom de la personne en haut pour revenir au profil.

## Envoyer un e-mail à une personne

Si la personne a une adresse e-mail enregistrée, un bouton **E-mail** apparaît sous ses coordonnées, à gauche du profil.

1. Sur le profil de la personne, cliquez sur **E-mail**.
2. Une boîte de dialogue **E-mail** portant le nom de la personne s'ouvre, affichant **Destinataire** avec l'adresse de la personne.
3. Choisissez facultativement un modèle enregistré dans **Charger un modèle (facultatif)**.
4. Saisissez un **Objet** et rédigez le message.
5. Cliquez sur **Envoyer l'e-mail**.

Pour rédiger le message dans votre propre logiciel d'e-mail, cliquez plutôt sur **Ouvrir dans mon application d'e-mail**.

:::info
L'envoi depuis B1 utilise les mêmes approbations et limites quotidiennes que l'e-mail de groupe. Si votre église n'a pas encore été approuvée, la boîte de dialogue vous demande de demander un examen -- vous pouvez tout de même cliquer sur **Ouvrir dans mon application d'e-mail** entre-temps. Consultez [Activer l'e-mail de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church). Les utilisateurs sans l'autorisation de modifier les membres des groupes passent directement à leur application d'e-mail lorsqu'ils cliquent sur **E-mail**.
:::

## Travailler avec les formulaires {#working-with-forms}

Vous pouvez remplir des formulaires personnalisés directement depuis le profil d'une personne. Ce sont des formulaires définis par l'utilisateur que vous pouvez créer en suivant le guide [Créer des formulaires](../forms/creating-forms.md).

1. Sur le profil de la personne, repérez la section **Formulaires**. Elle liste chaque formulaire avec la mention **Soumis** ou **Non soumis**.
2. Cliquez sur le nom d'un formulaire pour l'ouvrir (ou cliquez sur **Tous les formulaires** pour voir la liste complète).
3. Cliquez sur l'**icône de modification** (crayon) du formulaire, remplissez les détails et cliquez sur **Enregistrer**.

Une fois un formulaire soumis, cliquez sur l'**icône d'impression** à côté pour imprimer les réponses remplies de cette personne. Lorsque la personne n'a qu'une seule soumission d'un formulaire, celui-ci affiche **Soumis** avec la date au-dessus des réponses.

Si une soumission a été rattachée à la mauvaise personne, cliquez sur l'icône **Changer de personne** (deux flèches) à côté pour la transférer à quelqu'un d'autre ou la dissocier. Consultez [Changer la personne associée à une soumission](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Les formulaires liés au profil d'une personne utilisent le type de formulaire **Personnes**. Si vous avez besoin d'un formulaire autonome (comme une inscription à un événement), consultez l'[option Formulaire autonome](../forms/creating-forms.md) dans le guide des formulaires.
:::

:::tip
Si vous n'avez besoin de suivre qu'un ou deux renseignements supplémentaires sur les personnes -- une date, un nombre, une réponse oui/non -- utilisez plutôt les [Champs personnalisés](../settings/custom-fields.md) au lieu d'un formulaire. Ils sont plus rapides à remplir et sont consultables directement dans la recherche avancée.
:::

## Gérer les foyers {#managing-households}

Les foyers vous permettent de relier les membres d'une même famille. Cela est particulièrement utile pour l'[enregistrement](../attendance/check-in.md), où un parent peut enregistrer tous ses enfants en une seule fois.

1. Sur le profil d'une personne, cliquez sur **Modifier** à côté du titre **Foyer**, à gauche.
2. L'éditeur de foyer s'ouvre. Sélectionnez le **rôle dans le foyer** de la personne actuelle (par exemple Chef, Conjoint, Enfant, Autre).
3. Cliquez sur l'icône **Ajouter** pour ajouter un autre membre du foyer.
4. Sous **Ajouter un membre du foyer**, saisissez le nom de la personne dans la zone de recherche et appuyez sur **Entrée** ou cliquez sur l'icône de recherche. (Avant de saisir quoi que ce soit, une courte liste de **Personnes récentes** s'affiche.)
5. Lorsque la personne apparaît dans les résultats, cliquez sur son nom ou sur l'icône d'ajout à côté.
6. Choisissez son rôle dans le foyer et cliquez sur **Enregistrer** pour terminer la configuration du foyer.
