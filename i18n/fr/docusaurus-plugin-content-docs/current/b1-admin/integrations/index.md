---
title: "Intégrations"
description: "Connectez B1 Admin à Slack, Discord, Zapier, Make, Google Sheets et aux assistants IA comme Claude, avec les étapes de configuration et les autorisations de clé API requises pour chacun."
---

# Intégrations

<div class="article-intro">

B1 s'intègre aux outils que votre équipe utilise déjà. Connectez Slack ou Discord pour les notifications du personnel, automatisez des flux de travail avec Zapier ou Make, ou exportez des données à la demande vers Google Sheets — sans payer une plateforme d'intégration distincte et sans que ChurchApps héberge quoi que ce soit de plus. Chaque intégration fonctionne sur l'infrastructure du tiers et communique avec votre église par les webhooks ou l'API REST de B1.

</div>

## Ce qui est disponible {#whats-available}

| Intégration | Ce qu'elle fait | Sens | Effort de configuration |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | Publie des notifications lisibles (nouvelles personnes, dons, inscriptions, …) dans un canal Slack | B1 → Slack | 2 minutes |
| **[Discord](./slack-discord.md)** | Identique, dans un canal Discord | B1 → Discord | 2 minutes |
| **[Zapier](./zapier.md)** | Utilise les événements B1 comme déclencheurs et les actions B1 dans l'une des plus de 7 000 applications de Zapier (en attente de l'approbation de Zapier) | Les deux | 5 à 10 min par Zap |
| **[Make](./make.md)** | Même principe que Zapier, dans le constructeur de scénarios visuel de Make (pas encore publié) | Les deux | 5 à 10 min par scénario |
| **[Google Sheets](./google-sheets.md)** | Exporte les personnes, dons, groupes et fréquentation vers un tableur à la demande (pas encore publié) | B1 → Tableur | 5 minutes |
| **[Claude](./claude.md)** | Posez à Claude d'Anthropic des questions sur les données de votre église, limitées à vos autorisations — gratuit pour essayer, recommandé | Les deux | Moins de 3 minutes |
| **[ChatGPT](./chatgpt.md)** | Même principe avec ChatGPT d'OpenAI (nécessite un forfait ChatGPT payant) | Les deux | 10 minutes |
| **[Mailchimp](./services/mailchimp.md)** | Maintient une audience Mailchimp synchronisée avec vos personnes, vos groupes et vos listes enregistrées — intégré à B1 | B1 → Mailchimp | 5 minutes |
| **[Services connectés](./services/index.md)** | Recettes sélectionnées pour Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Variable | 5 à 10 min chacun |

## Comment choisir {#how-to-pick}

- **Vous voulez simplement une notification dans une messagerie ?** Utilisez **Slack** ou **Discord** — pas de compte tiers, pas de Zap à entretenir. Configuré entièrement dans B1Admin.
- **Vous voulez automatiser quelque chose entre plusieurs applications** (par exemple « quand quelqu'un donne, l'ajouter à ma liste Mailchimp et publier dans #dons sur Slack ») ? Utilisez **Zapier** ou **Make**. Zapier est plus convivial ; Make est moins cher à grande échelle et offre une logique plus souple.
- **Vous avez besoin d'une extraction de données ponctuelle ou d'un rapport planifié ?** Utilisez **Google Sheets** — collez une clé API dans le panneau latéral du module complémentaire et cliquez sur Exporter.
- **Vous voulez poser des questions en langage courant** (« combien de visiteurs venus pour la première fois dimanche dernier ? », « résume les dons de ce mois-ci ») ? Commencez par **[Claude](./claude.md)** — il est gratuit à essayer et se configure en moins de 3 minutes. **[ChatGPT](./chatgpt.md)** fonctionne aussi avec un forfait payant. Claude se connecte en utilisant votre compte B1 ; ChatGPT utilise une clé API B1.
- **Vous créez votre propre intégration sur mesure ?** Aucune des options ci-dessus — communiquez directement avec l'[API REST](/docs/developer/api) à l'aide d'une [clé API](/docs/developer/api/api-keys), ou abonnez un serveur que vous contrôlez aux [webhooks](/docs/developer/api/webhooks).

## Points communs {#what-they-have-in-common}

Tout se configure dans B1Admin sous **Paramètres → Développeur**, qui comporte trois onglets : **Clés API**, **Webhooks** et **Applications connectées**.

- **Slack, Discord et Mailchimp** sont des webhooks que vous créez vous-même dans l'onglet **Webhooks** (en choisissant le **Type de connecteur** correspondant). Ils n'ont pas besoin de clé API.
- **Claude** (connexion avec votre compte B1) apparaît dans l'onglet **Applications connectées**, où vous pouvez le révoquer.
- **Zapier, Make, Google Sheets, ChatGPT et Claude avec une clé** s'authentifient avec une **clé API B1**, créée dans l'onglet **Clés API**. La clé :

  - Est liée à la personne qui l'a créée et hérite de ses autorisations
  - Peut être restreinte à l'aide de **portées** — par exemple, une exportation vers Google Sheets n'a besoin que de `people:read`, et non de `settings:write`
  - Peut être supprimée à tout moment, ce qui coupe instantanément l'accès de l'intégration sans rien affecter d'autre

Certains connecteurs (Zapier, Make) enregistrent également un [webhook](/docs/developer/api/webhooks) en votre nom lorsque le Zap ou le scénario est activé, et le suppriment lorsque vous désactivez le Zap — vous ne gérez pas vous-même l'URL du webhook.

:::tip
Pour que Zapier et Make enregistrent automatiquement les webhooks, la clé API doit avoir la portée **`settings:write`** (ainsi que les portées de ressources pour tout ce que l'intégration utilise). Une clé en lecture seule fonctionne pour les actions et les exportations, mais pas pour les déclencheurs.
:::

## Coût {#cost}

ChurchApps est gratuit et open source. Slack/Discord, le [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), ainsi que les connecteurs officiels Zapier / Make / Google Sheets sont également gratuits de notre côté. Les tiers peuvent facturer leurs propres plateformes (Zapier et Make proposent tous deux des offres gratuites généreuses ; Slack, Discord et Google Sheets sont gratuits pour cet usage).

## Créer votre propre intégration {#building-your-own}

Si aucune des options ci-dessus ne convient, chaque surface de B1 est ouverte :

- **[API REST](/docs/developer/api)** — appelez B1 depuis n'importe quel langage avec un en-tête `Authorization: Bearer cak_…`
- **[Webhooks](/docs/developer/api/webhooks)** — abonnez un point de terminaison HTTPS public à un ou plusieurs types d'événements et recevez des charges utiles JSON signées
- **[OAuth + Applications connectées](/docs/developer/api/connected-apps)** — si vous développez un produit SaaS utilisé par de nombreuses églises

## Prochaines étapes {#next-steps}

- [Slack et Discord](./slack-discord.md) — publier des notifications dans les messageries
- [Zapier](./zapier.md) — se connecter à plus de 7 000 applications
- [Make](./make.md) — automatisation de flux de travail visuelle
- [Google Sheets](./google-sheets.md) — exporter vers des tableurs
- [Claude](./claude.md) — interroger Claude d'Anthropic sur les données de votre église
- [ChatGPT](./chatgpt.md) — interroger ChatGPT d'OpenAI sur les données de votre église
- [Services connectés](./services/index.md) — recettes par service (Mailchimp, Donorbox, Clearstream, …)
