---
title: "Ajouter des personnes"
description: "Ajoutez une personne à la base de données de votre église dans B1 Admin, renseignez ses coordonnées et reliez les membres de sa famille en foyers pour le pointage et les rapports."
---

# Ajouter des personnes {#adding-people}

<div class="article-intro">

La section Personnes est la base de B1 Admin : c'est la base de données des membres de votre église. Toutes les autres fonctionnalités (groupes, fréquentation, dons, formulaires) se rattachent aux fiches de personnes. Ce guide vous accompagne pour ajouter quelqu'un à votre base de données, modifier ses coordonnées et relier les membres d'une même famille en foyers.

</div>

## Vidéo de formation {#training-video}

<YouTube id="GtsczJ8JPio" title="Ajouter des personnes et des foyers dans B1" next="Importer votre base de données de personnes dans B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec l'autorisation de gérer les personnes. Consultez [Rôles et autorisations](roles-permissions.md) si vous ne savez pas à quel niveau d'accès vous vous trouvez.
- Si vous ajoutez plus de quelques personnes, pensez à utiliser plutôt l'outil [Importation CSV](importing-data.md).

</div>

## Ajouter une personne {#adding-a-person}

1. Accédez au tableau de bord de B1.church Admin.
2. Ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Personnes**, puis cliquez sur **Personnes**.
3. Cliquez sur le bouton **Ajouter une personne** dans l'en-tête de la page. La page défile jusqu'au formulaire **Ajouter une nouvelle personne**, sous l'annuaire.
4. Renseignez le **Prénom** et le **Nom** (tous deux obligatoires). Vous pouvez aussi ajouter un **Titre**, un **Courriel** et un **Téléphone mobile**, puis cliquer sur **Ajouter** (ou appuyer sur **Entrée**).

B1 crée un nouveau foyer pour la personne, portant le nom de famille.

La fiche de la personne s'ouvre, prête à recevoir d'autres informations.

:::tip
Si vous migrez depuis un autre système de gestion d'église, la fonctionnalité [Importer des données](importing-data.md) vous permet d'importer tout votre annuaire depuis un fichier CSV — beaucoup plus rapide que d'ajouter les personnes une à une.
:::

### Avertissements de doublon {#duplicate-warnings}

Lorsque vous saisissez une adresse courriel dans le formulaire **Ajouter une nouvelle personne**, B1 vérifie l'existence de doublons avant d'enregistrer. Si l'adresse courriel (ou, lors de la création d'une personne depuis le formulaire complet de modification, le numéro de téléphone ou la combinaison prénom + nom + date de naissance) correspond à quelqu'un déjà présent dans votre base, une boîte de dialogue **Doublon possible** apparaît avant l'enregistrement de la nouvelle fiche. Elle répertorie chaque personne correspondante avec son courriel, son téléphone et sa date de naissance afin que vous puissiez comparer.

- Cliquez sur **Utiliser l'existant** à côté d'une correspondance pour utiliser la fiche de cette personne au lieu d'en créer une nouvelle.
- Cliquez sur **Créer quand même** pour ajouter la nouvelle personne malgré la correspondance possible.

Cette vérification ne s'effectue que lors de la création d'une personne ; la modification d'une fiche existante ne la déclenche jamais. Elle empêche la création de nouveaux doublons, mais ne fusionne pas deux fiches déjà existantes.

## Modifier les détails {#editing-details}

1. Sur la fiche de la personne, cliquez sur le bouton **Modifier** à gauche, sous la section **Foyer**.
2. Dans le formulaire **Détails personnels**, renseignez des informations supplémentaires telles qu'un **Titre** (choisissez M., Mme, Mlle, Ms, Dr, Pr, Rév. ou Pasteur dans la liste, ou saisissez le vôtre, jusqu'à 10 caractères), le deuxième prénom, le surnom, les **Notes pour badge** (imprimées sur les badges de pointage et affichées sous forme d'étiquette d'avertissement sur la fiche), le **Numéro de donateur**, le statut d'appartenance (**Visiteur**, **Invité**, **Participant régulier**, **Membre**, **Personnel**, **Inactif** ou **Décédé**), le genre, la situation matrimoniale, la date de naissance et d'anniversaire de mariage, le campus, l'adresse, les numéros de téléphone avec leurs postes, et (pour les enfants et les jeunes) le niveau scolaire et l'école. Cochez **Me masquer de l'annuaire des membres** pour exclure la personne de l'[annuaire imprimé](./print-directory.md) et de l'annuaire des membres de l'application. Les [champs personnalisés](../settings/custom-fields.md) éventuels apparaissent sous **Champs personnalisés**.
3. Cliquez sur **Enregistrer** pour conserver les informations personnelles, ou sur **Annuler** pour fermer le formulaire sans enregistrer.

Si vous modifiez l'adresse d'une personne qui partage son foyer avec d'autres, B1 demande s'il faut appliquer la nouvelle adresse à l'ensemble du foyer. Le formulaire comporte aussi un bouton **Supprimer** (pour supprimer la personne) et une section **Gestion des données** pour exporter ou anonymiser les données de la personne (voir [Sécurité des données](../settings/data-security.md#using-the-data-management-tools)).

La partie gauche de la fiche affiche la photo, le nom, l'âge, le genre, la situation matrimoniale, le campus, le statut d'appartenance, les coordonnées, les valeurs de tout [champ personnalisé](../settings/custom-fields.md) et le foyer. Les étiquettes sous le nom indiquent si la personne **A un accès** (un compte B1), si elle est **Masquée de l'annuaire**, ou si elle a des notes pour badge. Au-dessus du foyer, **Ajouté** indique la date de création de la fiche (uniquement pour les personnes ajoutées depuis fin octobre 2026). Cliquez sur la photo pour la modifier. Sous le foyer se trouvent les boutons **Modifier**, **Courriel** et **SMS** (voir ci-dessous), ainsi que quelques actions supplémentaires : **Flux de travail** (ajouter la personne à un [flux de travail](../serving/workflows.md)), **Fusionner**, **Exporter** et **Exporter les données**. Si la personne appartient à un foyer, une section **Récupération** répertorie les personnes autorisées à venir chercher les enfants au [pointage](../attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people).

Le reste de la fiche présente une section récapitulative pour chaque type d'information liée :

- **Fréquentation** — Indique, parmi les dernières semaines, celles où la personne était présente, ainsi que ses visites les plus récentes. Cliquez sur **Toutes les années** pour voir l'historique complet de ses visites, incluant le campus, le culte, l'horaire du culte, le groupe et une colonne **Pointé** avec l'heure du pointage en borne (affichée par un tiret pour les visites enregistrées sans pointage en borne), ou sur **Imprimer** pour l'imprimer (l'impression comporte le logo et le nom de votre église centrés en haut, au-dessus du nom de la personne). Pour les tendances de toute l'église plutôt que l'historique d'une seule personne, consultez [Suivre la fréquentation](../attendance/tracking-attendance.md)
- **Dons** — Affiche les dons de cette année, y compris les dons aux fonds non déductibles d'impôt. Cliquez sur **Toutes les années** pour voir l'[historique complet des dons](../donations/recording-donations.md), ou sur **Enregistrer un don** pour en saisir un nouveau. Si votre église a activé la [confidentialité des dons](../settings/church-settings.md#giving-privacy), les montants restent masqués jusqu'à ce que vous cliquiez sur **Afficher les dons**
- **Groupes** — Répertorie les [appartenances aux groupes](../groups/group-members.md) de la personne, avec **Rejoint le** et la date d'adhésion à chaque groupe lorsqu'elle est enregistrée
- **Notes** — Affiche les notes récentes concernant la personne (soins pastoraux, suivis, etc.). Cliquez sur **Toutes les notes** pour lire et ajouter des notes. Chaque note indique son auteur ainsi que la date et l'heure de publication. Pour mettre en forme une note, cliquez dans la zone de note — une rangée de boutons **Gras**, **Italique**, **Liste à puces** et **Liste numérotée** apparaît sous celle-ci tant qu'elle est sélectionnée — puis sélectionnez du texte et cliquez sur un bouton (ou appuyez sur **Ctrl+B** / **Ctrl+I**, **Cmd** sur Mac). Dans une liste, appuyer sur **Entrée** crée l'élément suivant ; appuyer sur **Entrée** dans un élément vide termine la liste. La note affiche sa mise en forme, y compris ses puces et ses numéros, une fois publiée. La suppression d'une note demande d'abord une confirmation, car elle est irréversible. Pour voir les notes récentes de toutes les personnes à la fois, utilisez la page [Notes](./notes.md)
- **Formulaires** — Répertorie les formulaires de la personne et indique si chacun a été soumis (voir [Travailler avec les formulaires](#working-with-forms) ci-dessous)
- **Demandes et inscriptions** — Répertorie les [demandes d'événement](../calendars/approvals.md) de salles et de ressources de la personne (avec la description fournie, les salles ou ressources demandées, et **En attente**, **Approuvée** ou **Refusée**) ainsi que ses [inscriptions à des événements](../calendars/paid-registrations.md) (avec le nombre de personnes inscrites et **Inscrit**, **En attente**, **Sur liste d'attente** ou **Annulé**), les plus récentes en premier. Les cinq dernières sont affichées ; cliquez sur **Toutes les demandes** pour la liste complète. Vous voyez les demandes d'événement si vous pouvez utiliser la page [Approbations](../calendars/approvals.md), et les inscriptions si vous pouvez consulter les inscriptions ; sans l'un ou l'autre, la section est masquée

Lorsque vous ouvrez l'une de ces vues complètes, cliquez sur le lien **Retour à** suivi du nom de la personne, en haut, pour revenir à la fiche.

## Envoyer un courriel à une personne {#emailing-a-person}

Si la personne a une adresse courriel enregistrée, un bouton **Courriel** apparaît à côté de **Modifier**, sous le foyer, à gauche de la fiche.

1. Sur la fiche de la personne, cliquez sur **Courriel**.
2. Une boîte de dialogue **Courriel** portant le nom de la personne s'ouvre et affiche **Destinataire** avec son adresse.
3. Vous pouvez choisir un modèle enregistré dans **Charger un modèle (facultatif)**.
4. Saisissez un **Objet** et rédigez le message.
5. Cliquez sur **Envoyer le courriel**.

Pour rédiger le message dans votre propre logiciel de messagerie, cliquez plutôt sur **Ouvrir dans mon application de courriel**.

:::info
L'envoi depuis B1 applique les mêmes approbations et limites quotidiennes que le courriel de groupe. Si votre église n'a pas encore été approuvée, la boîte de dialogue vous invite à demander un examen — vous pouvez toujours cliquer sur **Ouvrir dans mon application de courriel** entre-temps. Voir [Activer le courriel de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church). Les utilisateurs qui n'ont pas l'autorisation de modifier les membres des groupes passent directement à leur application de courriel lorsqu'ils cliquent sur **Courriel**.
:::

## Envoyer un SMS à une personne {#texting-a-person}

Si votre église a connecté un [fournisseur de SMS](../settings/church-settings.md#texting), que vous êtes autorisé à envoyer des SMS et que la personne a un numéro de téléphone mobile, un bouton **SMS** apparaît à côté de **Courriel**. Cliquez dessus, saisissez votre **Message**, puis cliquez sur **Envoyer**. La boîte de dialogue indique le numéro qui recevra le SMS. Voir [Envoyer des SMS aux membres des groupes](../groups/group-members.md#texting-group-members) pour le fonctionnement de la messagerie texte.

## Travailler avec les formulaires {#working-with-forms}

Vous pouvez remplir des formulaires personnalisés directement depuis la fiche d'une personne. Il s'agit de formulaires définis par l'utilisateur que vous pouvez créer en suivant le guide [Créer des formulaires](../forms/creating-forms.md).

1. Sur la fiche de la personne, repérez la section **Formulaires**. Elle répertorie chaque formulaire avec la mention **Soumis** ou **Non soumis**.
2. Cliquez sur le nom d'un formulaire pour l'ouvrir (ou cliquez sur **Tous les formulaires** pour voir la liste complète).
3. Cliquez sur l'**icône de modification** (crayon) du formulaire, remplissez les informations, puis cliquez sur **Enregistrer**.

Une fois un formulaire soumis, cliquez sur l'**icône d'impression** à côté pour imprimer les réponses saisies par cette personne. Lorsque la personne n'a qu'une seule soumission d'un formulaire, celui-ci affiche **Soumis** avec la date au-dessus des réponses.

Si une soumission a été rattachée à la mauvaise personne, cliquez sur l'icône **Changer de personne** (deux flèches) à côté pour la transférer à quelqu'un d'autre ou la dissocier. Voir [Changer la personne associée à une soumission](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Les formulaires reliés à la fiche d'une personne utilisent le type de formulaire **Personnes**. Si vous avez besoin d'un formulaire autonome (comme une inscription à un événement), consultez l'option [Formulaire autonome](../forms/creating-forms.md) dans le guide des formulaires.
:::

:::tip
Si vous avez seulement besoin de suivre une ou deux informations supplémentaires sur les personnes — une date, un nombre, une réponse oui/non — utilisez plutôt les [champs personnalisés](../settings/custom-fields.md) au lieu d'un formulaire. Ils se remplissent plus vite et sont directement consultables dans la recherche avancée.
:::

## Gérer les foyers {#managing-households}

Les foyers permettent de relier les membres d'une même famille. C'est particulièrement utile pour le [pointage](../attendance/check-in.md), où un parent peut pointer tous ses enfants en une seule fois.

1. Sur la fiche d'une personne, cliquez sur **Modifier** à côté du titre **Foyer**, à gauche.
2. L'éditeur de foyer s'ouvre. Sélectionnez le **rôle dans le foyer** de la personne actuelle (par exemple, Chef de famille, Conjoint, Enfant, Autre).
3. Cliquez sur l'icône **Ajouter** pour ajouter un autre membre du foyer.
4. Sous **Ajouter un membre du foyer**, saisissez le nom de la personne dans la zone de recherche, puis appuyez sur **Entrée** ou cliquez sur l'icône de recherche. (Avant de taper, une courte liste de **Personnes récentes** s'affiche -- les personnes que vous avez choisies le plus récemment dans n'importe quelle recherche de personne, puis les personnes les plus récemment ajoutées dans B1.)
5. Lorsque la personne apparaît dans les résultats, cliquez sur son nom ou sur l'icône d'ajout à côté.
6. Choisissez son rôle dans le foyer, puis cliquez sur **Enregistrer** pour finaliser la configuration du foyer.

Si la personne n'est pas encore dans B1, cliquez plutôt sur **Ajouter une nouvelle personne** sous la recherche. En plus du nom, du titre, du courriel et du téléphone mobile, la boîte de dialogue demande son **Rôle dans le foyer** (Chef de famille, Conjoint, Enfant ou Autre). La nouvelle personne est créée et placée dans ce foyer avec ce rôle ; cliquez sur **Enregistrer** pour terminer.
