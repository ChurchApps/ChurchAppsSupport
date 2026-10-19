---
title: "Ajouter des personnes"
---

# Ajouter des personnes

<div class="article-intro">

La section Personnes est la base de B1 Admin : c'est la base de données des membres de votre église. Toutes les autres fonctionnalités (groupes, présence, dons, formulaires) se rattachent aux fiches de personnes. Ce guide vous explique comment ajouter une personne à votre base de données, modifier ses informations et relier les membres de sa famille à un foyer.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Vous avez besoin d'un compte B1 Admin actif avec la permission de gérer les personnes. Consultez [Rôles et permissions](roles-permissions.md) si vous ne savez pas quel est votre niveau d'accès.
- Si vous ajoutez plus d'une poignée de personnes, pensez à utiliser plutôt l'outil d'[importation CSV](importing-data.md).

</div>

## Ajouter une personne

1. Accédez au tableau de bord B1.church Admin.
2. Ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Personnes** et cliquez sur **Personnes**.
3. Cliquez sur le bouton **Ajouter une personne** dans l'en-tête de la page. La page défile vers le formulaire **Ajouter une nouvelle personne** situé sous l'annuaire.
4. Renseignez le **Prénom**, le **Nom** et l'**E-mail** de la personne, puis cliquez sur **Ajouter**.

La fiche de la personne s'ouvre, prête à recevoir d'autres informations.

:::tip
Si vous migrez depuis un autre logiciel de gestion d'église, la fonctionnalité [Importer des données](importing-data.md) vous permet de transférer tout votre annuaire depuis un fichier CSV -- bien plus rapide que d'ajouter les personnes une à une.
:::

### Avertissements de doublon

Si l'adresse e-mail (ou, lorsque vous créez une personne depuis le formulaire complet de modification, le numéro de téléphone ou la combinaison prénom + nom + date de naissance identique) correspond à une personne déjà présente dans votre base, une boîte de dialogue **Doublon possible** apparaît avant l'enregistrement de la nouvelle fiche. Elle liste chaque personne correspondante avec son e-mail, son téléphone et sa date de naissance afin que vous puissiez comparer.

- Cliquez sur **Utiliser l'existant** à côté d'une correspondance pour utiliser la fiche de cette personne au lieu d'en créer une nouvelle.
- Cliquez sur **Créer quand même** pour ajouter la nouvelle personne malgré la correspondance possible.

Cette vérification ne s'effectue que lorsque vous créez une personne tout à fait nouvelle : la modification d'une fiche existante ne la déclenche jamais. Elle empêche seulement la création de nouveaux doublons ; elle ne fusionne pas deux fiches déjà existantes.

## Modifier les informations {#editing-details}

1. Sur la fiche de la personne, cliquez sur le bouton **Modifier** sous ses coordonnées, à gauche.
2. Dans le formulaire **Détails personnels**, renseignez les informations complémentaires telles que le deuxième prénom, le statut de membre (**Visiteur**, **Invité**, **Participant régulier**, **Membre**, **Personnel**, **Inactif** ou **Décédé**), les dates, l'adresse, les numéros de téléphone et, pour les enfants et les étudiants, la classe et l'école.
3. Cliquez sur **Enregistrer** pour conserver les informations personnelles.

La partie gauche de la fiche affiche la photo, le nom, le statut de membre, les coordonnées, les valeurs des [champs personnalisés](../settings/custom-fields.md) et le foyer de la personne. Cliquez sur la photo pour la modifier. Sous le bouton **Modifier**, plusieurs autres actions sont disponibles : **Workflow** (ajouter la personne à un [workflow](../serving/workflows.md)), **Fusionner**, **Exporter** et **Exporter les données**.

Le reste de la fiche affiche une section récapitulative pour chaque type d'information associée :

- **Présence** -- Indique à quelles semaines parmi les dernières la personne a participé, ainsi que ses visites les plus récentes. Cliquez sur **Toutes les années** pour voir l'historique complet de ses visites, avec le campus, le service, l'horaire du culte, le groupe et une colonne **Enregistré** indiquant l'heure d'enregistrement au kiosque (un tiret pour les visites enregistrées sans passage au kiosque), ou sur **Imprimer** pour l'imprimer. Pour les tendances de l'église dans son ensemble plutôt que l'historique d'une seule personne, voir [Suivre la présence](../attendance/tracking-attendance.md).
- **Dons** -- Affiche les dons de cette année, y compris ceux destinés à des fonds non déductibles. Cliquez sur **Toutes les années** pour voir l'[historique complet des dons](../donations/recording-donations.md), ou sur **Enregistrer un don** pour en saisir un nouveau. Si votre église a activé la [confidentialité des dons](../settings/church-settings.md#giving-privacy), les montants restent masqués jusqu'à ce que vous cliquiez sur **Afficher les dons**.
- **Groupes** -- Liste les [appartenances aux groupes](../groups/group-members.md) de la personne
- **Notes** -- Affiche les notes récentes concernant la personne (accompagnement pastoral, suivis, etc.). Cliquez sur **Toutes les notes** pour les lire et en ajouter.
- **Formulaires** -- Liste les formulaires de la personne et indique si chacun a été soumis ou non (voir [Travailler avec les formulaires](#working-with-forms) ci-dessous)

Lorsque vous ouvrez l'une de ces vues complètes, cliquez sur le lien **Retour à** suivi du nom de la personne, en haut, pour revenir à la fiche.

## Envoyer un e-mail à une personne

Si la personne a une adresse e-mail enregistrée, un bouton **E-mail** apparaît sous ses coordonnées, à gauche de la fiche.

1. Sur la fiche de la personne, cliquez sur **E-mail**.
2. Une boîte de dialogue **E-mail** portant le nom de la personne s'ouvre, affichant **Envoi à** avec son adresse.
3. Choisissez éventuellement un modèle enregistré dans **Charger un modèle (facultatif)**.
4. Saisissez un **Objet** et rédigez le message.
5. Cliquez sur **Envoyer l'e-mail**.

Pour rédiger le message dans votre propre messagerie, cliquez plutôt sur **Ouvrir dans mon application de messagerie**.

:::info
L'envoi depuis B1 suit les mêmes approbations et limites quotidiennes que l'e-mail de groupe. Si votre église n'a pas encore été approuvée, la boîte de dialogue vous invite à demander un examen -- vous pouvez toutefois cliquer sur **Ouvrir dans mon application de messagerie** entre-temps. Voir [Activer l'e-mail de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church). Les utilisateurs sans permission de modifier les membres de groupes passent directement à leur application de messagerie lorsqu'ils cliquent sur **E-mail**.
:::

## Travailler avec les formulaires {#working-with-forms}

Vous pouvez remplir des formulaires personnalisés directement depuis la fiche d'une personne. Il s'agit de formulaires définis par l'utilisateur, que vous pouvez créer en suivant le guide [Créer des formulaires](../forms/creating-forms.md).

1. Sur la fiche de la personne, repérez la section **Formulaires**. Elle liste chaque formulaire avec la mention **Soumis** ou **Non soumis**.
2. Cliquez sur le nom d'un formulaire pour l'ouvrir (ou cliquez sur **Tous les formulaires** pour voir la liste complète).
3. Cliquez sur l'**icône de modification** (crayon) du formulaire, renseignez les informations, puis cliquez sur **Enregistrer**.

Une fois un formulaire soumis, cliquez sur l'**icône d'impression** à côté pour imprimer les réponses saisies de cette personne.

Si une soumission a été rattachée à la mauvaise personne, cliquez sur l'icône **Changer la personne** (deux flèches) à côté, pour la transférer à quelqu'un d'autre ou la dissocier. Voir [Changer la personne d'une soumission](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Les formulaires liés à la fiche d'une personne utilisent le type de formulaire **Personnes**. Si vous avez besoin d'un formulaire autonome (comme une inscription à un événement), consultez l'option [Formulaire autonome](../forms/creating-forms.md) dans le guide des formulaires.
:::

:::tip
Si vous voulez seulement suivre une ou deux informations supplémentaires sur les personnes -- une date, un nombre, une réponse oui/non -- utilisez plutôt des [champs personnalisés](../settings/custom-fields.md) que des formulaires. Ils se remplissent plus vite et sont directement consultables dans la recherche avancée.
:::

## Gérer les foyers {#managing-households}

Les foyers permettent de relier les membres d'une même famille. C'est particulièrement utile pour l'[enregistrement à l'arrivée](../attendance/check-in.md), lorsqu'un parent peut enregistrer tous ses enfants en une seule fois.

1. Sur la fiche d'une personne, cliquez sur **Modifier** à côté du titre **Foyer**, à gauche.
2. L'éditeur de foyer s'ouvre. Sélectionnez le **rôle dans le foyer** de la personne actuelle (par ex. Chef de famille, Conjoint, Enfant, Autre).
3. Cliquez sur l'icône **Ajouter** pour ajouter un autre membre du foyer.
4. Sous **Ajouter un membre du foyer**, saisissez le nom de la personne dans la zone de recherche, puis appuyez sur **Entrée** ou cliquez sur l'icône de recherche. (Avant toute saisie, une courte liste de **Personnes récentes** s'affiche.)
5. Lorsque la personne apparaît dans les résultats, cliquez sur son nom ou sur l'icône d'ajout à côté.
6. Choisissez son rôle dans le foyer et cliquez sur **Enregistrer** pour terminer la configuration du foyer.
