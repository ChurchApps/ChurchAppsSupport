---
title: "Modifier votre profil"
---

# Modifier votre profil

<div class="article-intro">

Votre page de profil dans le portail des membres vous permet de mettre à jour vos coordonnées, de gérer votre foyer, de modifier l'adresse e-mail et le mot de passe de votre compte, et de contrôler qui peut voir votre adresse, votre numéro de téléphone et votre adresse e-mail.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez être [connecté](./logging-in.md) : la modification du profil nécessite un compte

</div>

## Ouvrir votre profil

Touchez votre photo de profil dans la barre supérieure de l'application, ou touchez **Modifier le profil** en haut de la page **Plus** ou sur votre [page Moi](./me-page.md), pour ouvrir **Votre profil** à l'adresse `/mobile/profileEdit`. La page se présente comme une seule feuille composée de sections -- **Photo et nom**, **Contact**, **Foyer**, **Compte** et **Confidentialité** -- chacune affichant vos informations actuelles avec un lien **Modifier** (ou **Ajouter un membre de la famille** / **Changer**) qui ouvre un panneau où vous pouvez effectuer des modifications.

## Photo et nom, et Contact

Ces sections regroupent les informations que votre église voit sur votre fiche de personne :

- **Photo et nom** -- touchez **Changer la photo** pour importer une nouvelle image, et modifiez votre prénom, votre deuxième prénom et votre nom de famille.
- **Contact** -- adresse e-mail, téléphone portable, téléphone fixe, téléphone professionnel, date de naissance et votre adresse (rue, ville, région et code postal). Si vous activez les rappels par SMS dans les [préférences de notification](./notification-preferences.md), ils seront envoyés à votre numéro de portable.

Effectuez vos modifications dans le panneau, puis touchez **Enregistrer les modifications**.

:::info
Si votre église exige une approbation pour les modifications de l'annuaire, la page affiche le message « Les modifications de votre profil sont transmises au personnel de l'église pour approbation. » et le bouton indique **Soumettre pour approbation** : vos modifications sont envoyées sous forme de demande au lieu d'être appliquées immédiatement. Consultez [Approuver les modifications de profil](/docs/b1-admin/profile/approving-profile-changes) pour savoir comment votre église examine ces demandes.
:::

## Foyer

La section Foyer affiche les autres personnes rattachées à votre foyer, chacune avec son rôle dans le foyer (Chef de famille, Conjoint, Enfant, etc.). Touchez un membre du foyer pour voir ses détails.

Pour ajouter un membre de la famille qui n'est pas encore dans le système, touchez **Ajouter un membre de la famille**, saisissez son prénom, puis touchez **Ajouter**. Les nouveaux membres de la famille sont placés dans une liste en attente et sont transmis avec vos autres modifications de profil pour que votre église les examine.

## Compte

La section Compte gère votre connexion plutôt que votre profil d'église. Touchez **Modifier** pour l'ouvrir :

- **Nom affiché** -- le prénom et le nom affichés sur votre connexion (distincts du nom figurant sur votre profil d'église).
- **Changer l'adresse e-mail** -- modifiez l'adresse e-mail que vous utilisez pour vous connecter.
- **Changer le mot de passe** -- saisissez votre mot de passe actuel, puis votre nouveau mot de passe deux fois. Votre nouveau mot de passe doit comporter au moins 8 caractères.

Chaque partie dispose de son propre bouton **Enregistrer**.

## Confidentialité

La section Confidentialité indique qui peut voir vos coordonnées dans l'ensemble de ChurchApps. Touchez **Changer** pour ouvrir **Préférences de visibilité** :

- **Me masquer de l'annuaire des membres** -- un interrupteur qui vous retire complètement de l'[annuaire des membres](../community/member-directory.md).
- **Visibilité de l'adresse**, **Visibilité du téléphone** et **Visibilité de l'e-mail** -- chacune dispose de son propre menu déroulant, ce qui vous permet, par exemple, de partager votre e-mail avec toute l'église tout en gardant votre adresse plus privée. Les options sont les suivantes :

| Niveau | Qui peut le voir |
|---|---|
| **Tout le monde** | Visible par toute personne pouvant consulter l'annuaire. |
| **Membres uniquement** | Visible par les autres membres de l'église connectés. |
| **Mes groupes uniquement** | Visible uniquement par les membres des groupes auxquels vous appartenez. |
| **Mes responsables de groupe et le personnel** | Visible uniquement par le personnel de l'église et les responsables des groupes auxquels vous appartenez. |
| **Personnel uniquement** | Visible uniquement par le personnel de l'église (personnes ayant le statut d'adhésion Personnel ou l'autorisation Consulter les personnes). |

Touchez **Enregistrer** pour appliquer vos choix. Votre église définit une valeur par défaut pour chacun de ces trois champs -- voir [Paramètres de l'application mobile](/docs/b1-admin/settings/mobile-app) -- mais ce que vous choisissez ici remplace cette valeur par défaut pour votre propre fiche.

:::tip
Vous voyez toujours vos propres informations, quels que soient ces paramètres, et le personnel disposant de l'autorisation Consulter les personnes peut toujours les voir également.
:::

## Articles connexes

- [La page Moi](./me-page.md) -- Votre tableau de bord personnel
- [Annuaire des membres](../community/member-directory.md) -- Parcourir les autres membres
- [Approuver les modifications de profil](/docs/b1-admin/profile/approving-profile-changes) -- Comment votre église examine les modifications soumises
