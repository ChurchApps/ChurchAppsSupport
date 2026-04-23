---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp est l'application de gestion du contenu des leçons pour [Lessons.church](https://lessons.church). Elle fournit une interface pour créer, organiser et publier le curriculum de leçons de l'église, construite avec Next.js et React.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installer **Node.js 22+** et **Git** -- voir [Prérequis](../setup/prerequisites)
- Configurer votre cible API (staging ou local) -- voir [Variables d'environnement](../setup/environment-variables)

</div>

:::warning
LessonsApp nécessite Node.js 22 ou ultérieur. Les versions antérieures ne sont pas supportées.
:::

## Configuration

### 1. Cloner le référentiel

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Installer les dépendances

```bash
cd LessonsApp
npm install
```

### 3. Configurer les variables d'environnement

Copiez le fichier d'exemple d'environnement vers `.env` et configurez les endpoints API :

```bash
cp dotenv.sample.txt .env
```

Mettre à jour les URLs des endpoints API pour pointer vers l'API de staging ou votre instance d'API locale.

### 4. Démarrer le serveur de développement

```bash
npm run dev
```

Le serveur de développement Next.js démarre à [http://localhost:3501](http://localhost:3501).

## Commandes clés

| Commande | Description |
|---------|-------------|
| `npm run dev` | Démarrer le serveur de développement Next.js sur le port 3501 |
| `npm run build` | Build de production via Next.js |

## Pile technologique

- **Next.js 16** avec TypeScript
- **React 19** pour les composants UI
- Paquets **`@churchapps/apphelper*`** pour les composants partagés

:::info
LessonsApp communique avec le backend **LessonsApi**, qui est une API séparée de l'Api principal de ChurchApps. Assurez-vous que votre environnement est configuré avec le endpoint correct de l'API Lessons.
:::

## Déploiement

Les builds de production sont déployés vers **S3 + CloudFront** :

1. `npm run build` génère la build Next.js optimisée
2. La sortie de build est synchronisée vers un bucket S3
3. L'invalidation CloudFront est déclenchée pour servir la nouvelle version

:::tip
Pour les instructions de déploiement détaillées, voir le guide [Déploiement des applications web](../deployment/web-apps).
:::
