---
title: "Domaine personnalisé"
---

# Domaine personnalisé

<div class="article-intro">

Vous pouvez pointer votre propre domaine (par exemple, **www.votreeglise.org**) vers votre site B1 afin que les visiteurs l'atteignent à l'adresse web réelle de votre église au lieu de l'adresse par défaut votreeglise.1.church.

</div>

## Étape 1 — Ajoutez d'abord l'enregistrement DNS

Avant d'ajouter votre domaine dans B1, vous devez le pointer vers les serveurs B1 auprès de votre registraire de domaine (GoDaddy, Namecheap, Cloudflare, etc.).

Ajoutez l'un de ces enregistrements -- CNAME est préféré :

| Type | Hôte | Valeur |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `votreeglise.org` | `3.23.251.61` |

Utilisez **CNAME** pour votre adresse `www`. Utilisez l'**enregistrement A** si votre registraire ne supporte pas CNAME sur un domaine racine/apex (sans www), ou si vous souhaitez que le domaine racine fonctionne également.

Les modifications DNS peuvent prendre quelques minutes à quelques heures pour prendre effet.

## Étape 2 — Ajoutez le domaine dans B1

Une fois que DNS pointe vers B1 :

1. Allez à **Paramètres** dans B1 Admin.
2. Cliquez sur **Domaines**.
3. Tapez votre domaine dans le champ et cliquez sur **Enregistrer**.

Vous n'avez pas besoin de cliquer d'abord sur le bouton **+** -- un domaine laissé saisi dans le champ est ajouté lorsque vous enregistrez. Utilisez **+** (ou appuyez sur **Entrée**) lorsque vous souhaitez ajouter plusieurs domaines à la liste avant d'enregistrer.

B1 gère automatiquement SSL -- aucun achat de certificat n'est nécessaire.

:::warning
Si vous ajoutez le domaine dans B1 avant que vos enregistrements DNS ne soient en place, il ne sera pas enregistré. Toujours configurer DNS en premier.
:::

## Vérification du fonctionnement

Après l'enregistrement, visitez votre domaine dans un navigateur. S'il charge votre site B1, vous avez terminé. Si vous voyez une erreur, DNS se propage peut-être encore -- attendez quelques minutes et réessayez.

Vous pouvez également vérifier la propagation DNS sur [dnschecker.org](https://dnschecker.org) -- recherchez votre domaine et cherchez votre enregistrement CNAME ou A en s'affichant.

