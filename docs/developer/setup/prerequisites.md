---
title: "Prerequisites"
---

# Prerequisites

<div class="article-intro">

The tools you need depend on which projects you plan to work on. This page lists all required software organized by development area, from the universal requirements to platform-specific toolchains.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Review the [Project Overview](./project-overview) to determine which projects you want to work on
- Have administrator access on your development machine for installing software

</div>

## All Projects

These are required regardless of which project you work on:

| Tool | Version | Notes |
|------|---------|-------|
| **Node.js** | 20+ | Version 22+ required for B1App and LessonsApp (Next.js 16) |
| **npm** | Comes with Node.js | Used as the package manager across all projects |
| **Git** | Latest | Each project is a separate repository |

:::tip
Use a Node version manager like [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) to switch between Node versions easily.
:::

## Backend API Development

If you plan to run the API locally (rather than pointing to staging):

| Tool | Version | Notes |
|------|---------|-------|
| **MySQL** | 8.0+ | Each API module uses its own database |

You will need six databases for the core API: `membership`, `attendance`, `content`, `giving`, `messaging`, and `doing`. The API includes scripts to initialize the schema -- see the [API local setup](../api/local-setup) guide.

## Mobile App Development

For B1Mobile, B1Checkin, LessonsScreen, or other React Native / Expo apps:

| Tool | Version | Notes |
|------|---------|-------|
| **Expo CLI** | Latest | Install globally: `npm install -g expo-cli` |
| **Android Studio** | Latest | Required for Android development (includes Android SDK) |
| **Xcode** | Latest | Required for iOS development (macOS only) |

:::info
You can use the Expo Go app on a physical device for quick testing without Android Studio or Xcode. However, building production binaries requires the native toolchains.
:::

## FreeShow (Desktop App) Development

FreeShow has additional native build dependencies because it compiles native Node modules (like `canvas`):

### All Platforms

| Tool | Version | Notes |
|------|---------|-------|
| **Python** | 3.12 | Required by `node-gyp` for native module compilation |
| **setuptools** | Latest | Install via `pip install setuptools` |

### Windows

| Tool | Notes |
|------|-------|
| **Visual Studio** | Community edition is sufficient |
| **"Desktop development with C++" workload** | Select during Visual Studio installation |
| **Windows 10 SDK** | Included in the C++ workload; ensure it is checked |

You can install the Visual Studio build tools via the command line:

```bash
npm install --global windows-build-tools
```

Or install Visual Studio Community and select the "Desktop development with C++" workload during installation.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Xcode Command Line Tools are typically sufficient:

```bash
xcode-select --install
```

## Verify Your Installation

Run these commands to confirm everything is installed:

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## Next Steps

- **[Project Overview](./project-overview)** -- See all projects and what they do
- **[Environment Variables](./environment-variables)** -- Configure your `.env` files
