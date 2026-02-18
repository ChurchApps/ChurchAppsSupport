---
title: "Configuration des dons en ligne"
---

# Configuration des dons en ligne

<div class="article-intro">

B1 Admin s'intègre avec **Stripe** et **PayPal** afin que vos membres puissent donner en ligne via votre site B1.church. Une fois configurés, les dons en ligne apparaissent automatiquement dans vos registres de dons aux côtés des dons saisis manuellement, gardant tout dans un seul système.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos [fonds de dons](funds.md) afin que les donateurs puissent désigner leurs dons
- Créez un compte Stripe sur [stripe.com](https://stripe.com) et activez-le (sortez-le du mode test)
- Ayez vos identifiants de connexion B1 Admin à portée de main

</div>

## Configurer Stripe

1. Créez un compte sur [stripe.com](https://stripe.com) si vous n'en avez pas encore. Assurez-vous d'**activer votre compte** et de le sortir du mode test.
2. Dans Stripe, allez dans **Développeurs > Clés API**.
3. Copiez votre **Clé publiable**.
4. Connectez-vous à [B1 Admin](https://admin.b1.church/).
5. Cliquez sur **Église** dans la navigation supérieure, puis cliquez sur **Modifier les paramètres de l'église**.
6. Cliquez sur l'icône de modification à côté de **Paramètres de l'église**.
7. Faites défiler jusqu'à la section **Dons**.
8. Définissez le **Fournisseur** sur **Stripe**.
9. Collez votre Clé publiable dans le champ **Clé publique**.
10. Retournez dans Stripe et révélez votre **Clé secrète** (vous ne pouvez la voir qu'une seule fois, alors conservez une copie de sauvegarde).
11. Collez la Clé secrète dans le champ **Clé secrète** et cliquez sur **Enregistrer**.

:::warning
Votre Clé secrète Stripe n'est affichée qu'une seule fois. Copiez-la dans un emplacement sécurisé avant de quitter le tableau de bord Stripe. Si vous la perdez, vous devrez générer une nouvelle clé.
:::

## Ajouter une page de dons à votre site B1.church

1. Allez sur [b1.church](https://b1.church/) et connectez-vous.
2. Cliquez sur l'icône **Paramètres**.
3. Cliquez sur **Ajouter un onglet**.
4. Choisissez **Don** comme type.
5. Saisissez un nom pour l'onglet (par exemple, « Donner ») et cliquez sur **Enregistrer**.
6. Facultativement, changez l'icône de l'onglet -- tapez « Giv » dans la recherche d'icônes pour une icône liée aux dons.

Votre page de dons est maintenant en ligne. Les membres peuvent la visiter à l'adresse `votresousdomaine.b1.church/donate`.

## Partager votre lien de don

Pour trouver votre URL de don, allez dans **B1 Admin** et cliquez sur l'icône **Paramètres** pour voir votre sous-domaine. Votre lien de don suit le format :

`https://votresousdomaine.b1.church/donate`

Partagez ce lien sur votre site web, dans vos e-mails ou dans votre bulletin afin que les membres sachent où donner en ligne.

## Notifications de dons

Stripe envoie une notification par e-mail chaque fois qu'un don est reçu. Pour changer l'adresse e-mail de notification, allez dans le tableau de bord Stripe, cliquez sur votre profil en haut à droite, choisissez **Profil** et mettez à jour votre adresse e-mail.

## Options de frais de traitement

Vous pouvez configurer votre page de dons pour permettre aux donateurs de couvrir optionnellement les frais de traitement afin que votre église reçoive le montant total du don. Ce paramètre est géré dans les paramètres de votre église dans B1 Admin.

:::tip
Après la configuration, effectuez un petit don test pour confirmer que tout fonctionne avant d'annoncer les dons en ligne à votre assemblée.
:::

## Prochaines étapes

- Utilisez l'[Import Stripe](stripe-import.md) pour importer les transactions en ligne dans B1 Admin si elles ne se synchronisent pas automatiquement
- Vérifiez vos [Rapports de dons](donation-reports.md) pour confirmer que les dons en ligne apparaissent correctement
- Générez des [Reçus fiscaux](giving-statements.md) incluant à la fois les dons en ligne et hors ligne
