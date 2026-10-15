---
title: "Ajout de personnes"
---

# Ajout de personnes

<div class="article-intro">

La section Personnes est la base de B1 Admin -- c'est la base de données des membres de votre église. Toutes les autres fonctionnalités (groupes, présence, dons, formulaires) se rattachent aux fiches de personnes. Ce guide vous explique comment ajouter quelqu'un à votre base de données, modifier ses informations et relier les membres d'une même famille dans des foyers.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer d'un compte B1 Admin actif avec l'autorisation de gérer les personnes. Voir [Rôles et autorisations](roles-permissions.md) si vous ne connaissez pas votre niveau d'accès.
- Si vous ajoutez plus d'une poignée de personnes, pensez à utiliser plutôt l'outil [Importation CSV](importing-data.md).

</div>

## Ajouter une personne

1. Accédez au tableau de bord B1.church Admin.
2. Ouvrez le [menu de saut](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Personnes**, et cliquez sur **Personnes**.
3. Cliquez sur le bouton **Ajouter une personne** dans l'en-tête de la page. La page défile jusqu'au formulaire **Ajouter une nouvelle personne** situé sous l'annuaire.
4. Renseignez le **Prénom**, le **Nom** et l'**E-mail** de la personne, puis cliquez sur **Ajouter**.

La fiche de la personne s'ouvre, prête pour l'ajout de détails supplémentaires.

:::tip
Si vous migrez depuis un autre système de gestion d'église, la fonctionnalité [Importer des données](importing-data.md) vous permet de transférer tout votre annuaire depuis un fichier CSV -- bien plus rapide que d'ajouter les personnes une par une.
:::

### Avertissements de doublons

Si l'adresse e-mail (ou, lors de la création d'une personne depuis le formulaire de modification complet, le numéro de téléphone ou la correspondance prénom + nom + date de naissance) correspond à une personne déjà présente dans votre base de données, une boîte de dialogue **Doublon possible** apparaît avant l'enregistrement de la nouvelle fiche. Elle répertorie chaque personne correspondante avec son e-mail, son téléphone et sa date de naissance pour que vous puissiez comparer.

- Cliquez sur **Utiliser l'existant** à côté d'une correspondance pour utiliser la fiche de cette personne au lieu d'en créer une nouvelle.
- Cliquez sur **Créer quand même** pour ajouter la nouvelle personne même si une correspondance possible a été trouvée.

Cette vérification ne s'effectue que lors de la création d'une toute nouvelle personne -- la modification d'une fiche existante ne la déclenche jamais. Elle empêche seulement la création de nouveaux doublons ; elle ne fusionne pas deux fiches déjà existantes.

## Modifier les détails

1. Sur la fiche de la personne, cliquez sur le bouton **Modifier** sous ses coordonnées, à gauche.
2. Dans le formulaire **Informations personnelles**, renseignez les informations complémentaires telles que le deuxième prénom, le statut de membre (**Visiteur**, **Invité**, **Participant régulier**, **Membre**, **Personnel**, **Inactif** ou **Décédé**), les dates, l'adresse, les numéros de téléphone et (pour les enfants et les étudiants) le niveau scolaire et l'école.
3. Cliquez sur **Enregistrer** pour sauvegarder les informations personnelles.

Le côté gauche de la fiche affiche la photo, le nom, le statut de membre, les coordonnées, les valeurs de tout [champ personnalisé](../settings/custom-fields.md) et le foyer de la personne. Cliquez sur la photo pour la modifier. Sous le bouton **Modifier** se trouvent quelques autres actions : **Flux de travail** (ajouter la personne à un [flux de travail](../serving/workflows.md)), **Fusionner**, **Exporter** et **Exporter les données**.

Le reste de la fiche affiche une section récapitulative pour chaque type d'information associée :

- **Présence** — Indique lesquelles des dernières semaines la personne a suivies et ses visites les plus récentes. Cliquez sur **Toutes les années** pour consulter l'historique complet de ses visites, avec le campus, le service, l'horaire de service, le groupe et une colonne **Enregistré à la borne** indiquant l'heure d'enregistrement sur une borne (affichée sous forme de tiret pour les visites enregistrées sans borne), ou sur **Imprimer** pour l'imprimer. Pour les tendances à l'échelle de l'église plutôt que l'historique d'une seule personne, voir [Suivre la présence](../attendance/tracking-attendance.md)
- **Dons** — Affiche les dons de cette année, y compris les dons aux fonds non déductibles. Cliquez sur **Toutes les années** pour consulter l'[historique complet des dons](../donations/recording-donations.md), ou sur **Enregistrer un don** pour en saisir un nouveau. Si votre église a activé la [Confidentialité des dons](../settings/church-settings.md#giving-privacy), les montants restent masqués jusqu'à ce que vous cliquiez sur **Afficher les dons**
- **Groupes** — Liste les [adhésions aux groupes](../groups/group-members.md) de la personne
- **Notes** — Affiche les notes récentes concernant la personne (soins pastoraux, suivis, etc.). Cliquez sur **Toutes les notes** pour lire et ajouter des notes
- **Formulaires** — Liste les formulaires de la personne et indique si chacun a été envoyé (voir [Travailler avec les formulaires](#working-with-forms) ci-dessous)

Lorsque vous ouvrez l'une de ces vues complètes, cliquez sur le lien **Retour à** avec le nom de la personne en haut pour revenir à la fiche.

## Envoyer un e-mail à une personne

Si la personne a une adresse e-mail enregistrée, un bouton **E-mail** apparaît sous ses coordonnées, à gauche de la fiche.

1. Sur la fiche de la personne, cliquez sur **E-mail**.
2. Une boîte de dialogue **E-mail**, intitulée avec le nom de la personne, s'ouvre et affiche **Destinataire** avec son adresse.
3. Vous pouvez éventuellement choisir un modèle enregistré dans **Charger un modèle (facultatif)**.
4. Saisissez un **Objet** et rédigez le message.
5. Cliquez sur **Envoyer l'e-mail**.

Pour rédiger le message dans votre propre messagerie à la place, cliquez sur **Ouvrir dans mon application e-mail**.

:::info
L'envoi depuis B1 suit les mêmes approbations et limites quotidiennes que l'e-mail de groupe. Si votre église n'a pas encore été approuvée, la boîte de dialogue vous invite à demander un examen -- vous pouvez toujours cliquer sur **Ouvrir dans mon application e-mail** entre-temps. Voir [Activer l'e-mail de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church). Les utilisateurs sans autorisation de modifier les membres des groupes passent directement à leur application e-mail lorsqu'ils cliquent sur **E-mail**.
:::

## Travailler avec les formulaires

Vous pouvez remplir directement des formulaires personnalisés depuis la fiche d'une personne. Ce sont des formulaires définis par l'utilisateur que vous pouvez créer en suivant le guide [Créer des formulaires](../forms/creating-forms.md).

1. Sur la fiche de la personne, repérez la section **Formulaires**. Elle liste chaque formulaire avec l'indication **Envoyé** ou **Non envoyé**.
2. Cliquez sur le nom d'un formulaire pour l'ouvrir (ou cliquez sur **Tous les formulaires** pour voir la liste complète).
3. Cliquez sur l'**icône de modification** (crayon) du formulaire, remplissez les informations et cliquez sur **Enregistrer**.

Une fois un formulaire envoyé, cliquez sur l'**icône d'impression** à côté pour imprimer les réponses remplies de cette personne.

Si une réponse a été associée à la mauvaise personne, cliquez sur l'icône **Changer de personne** (deux flèches) à côté pour la déplacer vers une autre personne ou la dissocier. Voir [Changer la personne associée à une réponse](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Les formulaires liés à la fiche d'une personne utilisent le type de formulaire **Personnes**. Si vous avez besoin d'un formulaire autonome (comme une inscription à un événement), consultez l'option [Formulaire autonome](../forms/creating-forms.md) dans le guide des formulaires.
:::

:::tip
Si vous n'avez besoin de suivre qu'une ou deux informations supplémentaires sur les personnes -- une date, un nombre, une réponse oui/non -- utilisez plutôt les [Champs personnalisés](../settings/custom-fields.md) au lieu d'un formulaire. Ils sont plus rapides à remplir et sont directement consultables dans la recherche avancée.
:::

## Gérer les foyers

Les foyers vous permettent de relier les membres d'une même famille. C'est particulièrement utile pour l'[enregistrement à la borne](../attendance/check-in.md), où un parent peut enregistrer tous ses enfants en une seule fois.

1. Sur la fiche d'une personne, cliquez sur **Modifier** à côté du titre **Foyer**, à gauche.
2. L'éditeur de foyer s'ouvre. Sélectionnez le **rôle dans le foyer** de la personne actuelle (par exemple, Chef de famille, Conjoint, Enfant, Autre).
3. Cliquez sur l'icône **Ajouter** pour ajouter un autre membre du foyer.
4. Sous **Ajouter un membre du foyer**, saisissez le nom de la personne dans la zone de recherche et appuyez sur **Entrée** ou cliquez sur l'icône de recherche. (Avant de taper, une courte liste de **Personnes récentes** s'affiche.)
5. Lorsque la personne apparaît dans les résultats, cliquez sur son nom ou sur l'icône d'ajout à côté.
6. Choisissez son rôle dans le foyer et cliquez sur **Enregistrer** pour terminer la configuration du foyer.
