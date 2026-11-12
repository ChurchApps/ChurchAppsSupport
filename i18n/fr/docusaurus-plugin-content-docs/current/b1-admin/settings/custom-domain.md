---
title: "Domaine personnalisé"
description: "Pointez votre propre domaine, comme www.yourchurch.org, vers votre site B1 dans B1 Admin en configurant les enregistrements DNS et en ajoutant le domaine dans les Paramètres."
---

# Domaine personnalisé

<div class="article-intro">

Vous pouvez faire pointer votre propre domaine (par exemple, **`www.yourchurch.org`**) vers votre site B1 afin que les visiteurs accèdent à votre véritable adresse web d'église plutôt qu'à l'adresse par défaut yourchurch.b1.church.

</div>

## Vidéo de formation {#training-video}

<YouTube id="L5yaDusHts8" title="Connecter un domaine personnalisé dans B1" next="Configurer la diffusion en direct dans B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Étape 1 — Ajouter d'abord l'enregistrement DNS {#step-1--add-the-dns-record-first}

Avant d'ajouter votre domaine dans B1, vous devez le faire pointer vers les serveurs de B1 auprès de votre bureau d'enregistrement (GoDaddy, Namecheap, Cloudflare, etc.).

Ajoutez l'un de ces enregistrements — CNAME est préférable :

| Type | Hôte | Valeur |
|------|------|--------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Utilisez le **CNAME** pour votre adresse `www`. Utilisez l'**enregistrement A** si votre bureau d'enregistrement ne prend pas en charge le CNAME sur un domaine racine (sans www), ou si vous voulez que le domaine racine fonctionne aussi.

Les modifications DNS peuvent prendre de quelques minutes à quelques heures pour prendre effet.

## Étape 2 — Ajouter le domaine dans B1 {#step-2--add-the-domain-in-b1}

Une fois que le DNS pointe vers B1 :

1. Allez dans **Paramètres** dans B1 Admin.
2. Cliquez sur **Domaines** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Domaines**.
3. Saisissez votre domaine dans le champ et cliquez sur **Enregistrer**.

Vous n'avez pas besoin de cliquer d'abord sur le bouton **+** : un domaine laissé dans le champ est ajouté lors de l'enregistrement. Utilisez **+** (ou appuyez sur **Entrée**) lorsque vous voulez ajouter plusieurs domaines à la liste avant d'enregistrer. Saisissez uniquement le domaine, comme `www.yourchurch.org` -- ni `https://` ni chemin de page.

Si votre église dispose de plusieurs sites web, chaque domaine obtient aussi une liste déroulante **Site web**. Laissez-la sur **Site principal**, ou choisissez le site que ce domaine doit ouvrir.

Pour supprimer un domaine, cliquez sur l'icône de suppression de sa ligne, puis cliquez sur **Enregistrer**.

B1 gère automatiquement le SSL — aucun achat de certificat n'est nécessaire.

:::warning
B1 enregistre le domaine même si vos enregistrements DNS ne sont pas encore en place, mais le domaine n'affichera pas votre site, et B1 ne peut pas émettre son certificat SSL, tant que le DNS ne pointe pas vers B1. Configurez d'abord le DNS. Un domaine déjà utilisé par une autre église ne peut pas être ajouté.
:::

## Vérifier que cela fonctionne {#checking-if-its-working}

Après l'enregistrement, ouvrez votre domaine dans un navigateur. Si votre site B1 s'affiche, c'est terminé. Si vous voyez une erreur, la propagation DNS n'est peut-être pas encore terminée — attendez quelques minutes et réessayez.

Vous pouvez aussi vérifier la propagation DNS sur [dnschecker.org](https://dnschecker.org) — recherchez votre domaine et vérifiez que votre enregistrement CNAME ou A apparaît.
