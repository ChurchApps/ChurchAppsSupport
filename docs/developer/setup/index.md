---
title: "Setup"
---

# Setup

This section walks you through setting up a local development environment for ChurchApps projects.

## Two Approaches

There are two ways to develop locally, depending on how much of the stack you need:

### 1. Point to Staging APIs (Easiest)

If you are working on a **frontend project** (web app, mobile app, or desktop app), the fastest path is to point your local app at the shared staging APIs. No database or backend setup required.

The staging API base URL is:

```
https://api.staging.churchapps.org
```

Each API module is available at a path under this base, for example:

```
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/giving
```

This approach lets you start making frontend changes in minutes.

### 2. Run Everything Locally

If you need to modify API code or work offline, you can run the full stack locally. This requires MySQL 8.0+ and additional configuration. See the [API local setup](../api/local-setup) guide for detailed instructions.

## Getting Started

Follow these pages in order:

1. **[Prerequisites](prerequisites)** -- Install the required tools (Node.js, Git, MySQL, etc.)
2. **[Project Overview](project-overview)** -- Understand which projects exist and what they do
3. **[Environment Variables](environment-variables)** -- Configure your `.env` files to connect everything together

:::info
Each ChurchApps project is an independent Git repository. You only need to clone the specific project(s) you want to work on.
:::
