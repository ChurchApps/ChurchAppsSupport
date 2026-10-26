---
title: "Ajouter des personnes"
---

# Ajouter des personnes

<div class="article-intro">

La section Personnes est la base de B1 Admin : c'est la base de données des membres de votre église. Toutes les autres fonctionnalités (groupes, présence, dons, formulaires) sont liées aux fiches des personnes. Ce guide vous explique comment ajouter une personne à votre base de données, modifier ses informations et rattacher les membres de la famille à un foyer.

</div>

## Vidéo de formation

<YouTube id="NTL1UDQpx8s" title="Adding People and Households in B1" next="Importing Your People Database in B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer d'un compte B1 Admin actif avec l'autorisation de gérer les personnes. Consultez [Rôles et autorisations](roles-permissions.md) si vous ne savez pas quel est votre niveau d'accès.
- Si vous ajoutez plus d'une poignée de personnes, pensez à utiliser plutôt l'outil [import CSV](importing-data.md).

</div>

## Ajouter une personne

1. Accédez au tableau de bord B1.church Admin.
2. Ouvrez le [menu Aller à](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Personnes**, puis cliquez sur **Personnes**.
3. Cliquez sur le bouton **Ajouter une personne** dans l'en-tête de la page. La page défile jusqu'au formulaire **Ajouter une nouvelle personne**, situé sous l'annuaire.
4. Renseignez le **prénom**, le **nom** et l'**e-mail** de la personne, puis cliquez sur **Ajouter**.

La fiche de la personne s'ouvrira, prête à recevoir d'autres informations.

:::tip
Si vous migrez depuis un autre logiciel de gestion d'église, la fonctionnalité [Importer des données](importing-data.md) vous permet d'importer tout votre annuaire à partir d'un fichier CSV, ce qui est beaucoup plus rapide que d'ajouter les personnes une à une.
:::

### Avertissements de doublons

Si l'adresse e-mail (ou, lorsque vous créez une personne depuis le formulaire complet de modification, le numéro de téléphone ou la combinaison prénom + nom + date de naissance identiques) correspond à une personne déjà présente dans votre base de données, une boîte de dialogue **Doublon possible** apparaît avant l'enregistrement de la nouvelle fiche. Elle répertorie chaque personne correspondante avec son e-mail, son téléphone et sa date de naissance afin que vous puissiez comparer.

- Cliquez sur **Utiliser l'existant** à côté d'une correspondance pour utiliser la fiche de cette personne au lieu d'en créer une nouvelle.
- Cliquez sur **Créer quand même** pour ajouter la nouvelle personne malgré la correspondance possible.

Cette vérification ne s'effectue que lors de la création d'une toute nouvelle personne : la modification d'une fiche existante ne la déclenche jamais. Elle empêche seulement la création de nouveaux doublons ; elle ne fusionne pas deux fiches déjà existantes.

## Modifier les informations

1. Sur la fiche de la personne, cliquez sur le bouton **Modifier** situé sous ses coordonnées, à gauche.
2. Dans le formulaire **Informations personnelles**, renseignez les informations complémentaires telles que le deuxième prénom, le statut d'adhésion (**Visiteur**, **Invité**, **Participant régulier**, **Membre**, **Personnel**, **Inactif** ou **Décédé**), les dates, l'adresse, les numéros de téléphone et, pour les enfants et les élèves, le niveau scolaire et l'école.
3. Cliquez sur **Enregistrer** pour conserver les informations personnelles.

Le côté gauche de la fiche affiche la photo de la personne, son nom, son statut d'adhésion, ses coordonnées, les valeurs des [champs personnalisés](../settings/custom-fields.md) et son foyer. Cliquez sur la photo pour la modifier. Sous le bouton **Modifier**, plusieurs autres actions sont disponibles : **Flux de travail** (ajouter la personne à un [flux de travail](../serving/workflows.md)), **Fusionner**, **Exporter** et **Exporter les données**.

Le reste de la fiche présente une section récapitulative pour chaque type d'information associée :

- **Présence** : indique les semaines récentes auxquelles la personne a participé et ses dernières visites. Cliquez sur **Toutes les années** pour afficher son historique complet des visites, avec le campus, le service, l'heure du service, le groupe et une colonne **Pointé** indiquant l'heure du pointage sur borne (un tiret apparaît pour les visites enregistrées sans pointage sur borne), ou sur **Imprimer** pour l'imprimer (l'impression affiche le logo et le nom de votre église centrés en haut, au-dessus du nom de la personne). Pour les tendances de présence à l'échelle de l'église plutôt que l'historique d'une seule personne, consultez [Suivi de la présence](../attendance/tracking-attendance.md).
- **Dons** : affiche les dons de cette année, y compris ceux faits à des fonds non déductibles. Cliquez sur **Toutes les années** pour accéder à son [historique complet des dons](../donations/recording-donations.md), ou sur **Enregistrer un don** pour en saisir un nouveau. Si votre église a activé la [confidentialité des dons](../settings/church-settings.md#giving-privacy), les montants restent masqués jusqu'à ce que vous cliquiez sur **Afficher les dons**.
- **Groupes** : répertorie les [adhésions aux groupes](../groups/group-members.md) de la personne.
- **Notes** : affiche les notes récentes concernant la personne (soins pastoraux, suivis, etc.). Cliquez sur **Toutes les notes** pour les lire et en ajouter. Chaque note indique son auteur ainsi que la date et l'heure de publication. Pour voir les notes récentes de toutes les personnes en même temps, utilisez la page [Notes](./notes.md).
- **Formulaires** : répertorie les formulaires de la personne et indique si chacun a été soumis (voir [Utiliser les formulaires](#working-with-forms) ci-dessous).

Lorsque vous ouvrez l'une de ces vues complètes, cliquez sur le lien **Retour à** suivi du nom de la personne, en haut, pour revenir à la fiche.

## Envoyer un e-mail à une personne

Si la personne a une adresse e-mail enregistrée, un bouton **E-mail** apparaît sous ses coordonnées, à gauche de la fiche.

1. Sur la fiche de la personne, cliquez sur **E-mail**.
2. Une boîte de dialogue **E-mail** portant le nom de la personne s'ouvre et affiche **Destinataire** avec son adresse.
3. Vous pouvez éventuellement choisir un modèle enregistré dans **Charger un modèle (facultatif)**.
4. Saisissez un **Objet** et rédigez le message.
5. Cliquez sur **Envoyer l'e-mail**.

Pour rédiger le message dans votre propre logiciel de messagerie, cliquez plutôt sur **Ouvrir dans mon application de messagerie**.

:::info
L'envoi depuis B1 est soumis aux mêmes règles d'approbation et aux mêmes limites quotidiennes que les e-mails de groupe. Si votre église n'a pas encore été approuvée, la boîte de dialogue vous invite à demander un examen. Vous pouvez toujours cliquer sur **Ouvrir dans mon application de messagerie** en attendant. Consultez [Activer les e-mails de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church). Les utilisateurs qui n'ont pas l'autorisation de modifier les membres des groupes passent directement à leur application de messagerie lorsqu'ils cliquent sur **E-mail**.
:::

## Utiliser les formulaires

Vous pouvez remplir des formulaires personnalisés directement depuis la fiche d'une personne. Il s'agit de formulaires définis par l'utilisateur, que vous pouvez créer en suivant le guide [Créer des formulaires](../forms/creating-forms.md).

1. Sur la fiche de la personne, repérez la section **Formulaires**. Elle répertorie chaque formulaire et indique s'il a été **Soumis** ou **Non soumis**.
2. Cliquez sur le nom d'un formulaire pour l'ouvrir (ou cliquez sur **Tous les formulaires** pour afficher la liste complète).
3. Cliquez sur l'**icône de modification** (crayon) du formulaire, remplissez les informations et cliquez sur **Enregistrer**.

Une fois un formulaire soumis, cliquez sur l'**icône d'impression** à côté pour imprimer les réponses saisies par cette personne.

Si une réponse a été rattachée à la mauvaise personne, cliquez sur l'icône **Changer de personne** (deux flèches) à côté de celle-ci pour la transférer à quelqu'un d'autre ou la dissocier. Consultez [Changer la personne d'une réponse](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Les formulaires liés à la fiche d'une personne utilisent le type de formulaire **Personnes**. Si vous avez besoin d'un formulaire autonome (par exemple, une inscription à un événement), consultez l'option [Formulaire autonome](../forms/creating-forms.md) dans le guide des formulaires.
:::

:::tip
Si vous ne devez suivre qu'une ou deux informations supplémentaires sur les personnes (une date, un nombre, une réponse oui/non), utilisez plutôt les [Champs personnalisés](../settings/custom-fields.md) au lieu d'un formulaire. Ils se remplissent plus rapidement et sont directement consultables dans la recherche avancée.
:::

## Gérer les foyers {#managing-households}

Les foyers permettent de relier les membres d'une même famille. Cette fonctionnalité est particulièrement utile pour le [pointage](../attendance/check-in.md), car un parent peut pointer tous ses enfants en une seule fois.

1. Sur la fiche d'une personne, cliquez sur **Modifier** à côté du titre **Foyer**, à gauche.
2. L'éditeur de foyer s'ouvre. Sélectionnez le **rôle dans le foyer** de la personne actuelle (par exemple, Chef de famille, Conjoint, Enfant, Autre).
3. Cliquez sur l'icône **Ajouter** pour ajouter un autre membre du foyer.
4. Sous **Ajouter un membre du foyer**, saisissez le nom de la personne dans la zone de recherche, puis appuyez sur **Entrée** ou cliquez sur l'icône de recherche. (Avant de saisir quoi que ce soit, une courte liste des **Personnes récentes** s'affiche.)
5. Lorsque la personne apparaît dans les résultats, cliquez sur son nom ou sur l'icône d'ajout à côté.
6. Choisissez son rôle dans le foyer, puis cliquez sur **Enregistrer** pour terminer la configuration du foyer.
