---
title: "Environment Variables"
---

# Environment Variables

<div class="article-intro">

Every ChurchApps project uses a `.env` file for local configuration. Each project includes a sample file that you copy and customize. This page covers the environment variables for APIs, web apps, and mobile apps, including how to choose between staging and local API targets.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Install the [prerequisites](./prerequisites) for your project
- Clone the project repository you want to work on
- Review the [Project Overview](./project-overview) to understand which API modules your project needs

</div>

## General Pattern

1. Look for `dotenv.sample.txt` or `.env.sample` in the project root.
2. Copy it to `.env`.
3. Edit the values as needed.

```bash
# Example for a project with .env.sample
cp .env.sample .env

# Example for a project with dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Never commit `.env` files to version control.** They contain secrets such as database credentials, API keys, and JWT secrets. All ChurchApps projects include `.env` in `.gitignore`, but always double-check before committing.
:::

## Choosing an API Target

The most important decision is where your frontend points for API calls. There are two options:

### Option 1: Staging APIs (Recommended for Frontend Development)

Use the shared staging environment. No local API or database setup needed.

```bash
# Base URL pattern
https://api.staging.churchapps.org/{module}

# Example module URLs
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/content
https://api.staging.churchapps.org/giving
https://api.staging.churchapps.org/messaging
https://api.staging.churchapps.org/doing
```

### Option 2: Local API

Run the Api project on your machine. Requires MySQL 8.0+ with databases created for each module. See the [API local setup](../api/local-setup) guide.

```bash
# Base URL pattern
http://localhost:8084/{module}

# Example module URLs
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API Environment Variables

The core **Api** project (`.env.sample`) has the most configuration. Here are the key variables:

### Shared Settings

| Variable | Description | Example |
|----------|-------------|---------|
| `ENVIRONMENT` | Runtime environment | `dev` |
| `SERVER_PORT` | HTTP port for the local dev server | `8084` |
| `ENCRYPTION_KEY` | 192-bit encryption key for sensitive data | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Secret for signing JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Where to store uploaded files (`disk` or `s3`) | `disk` |
| `CORS_ORIGIN` | Allowed CORS origins (`*` for local dev) | `*` |

### Database Connections

Each API module has its own MySQL database and connection string:

| Variable | Database |
|----------|----------|
| `MEMBERSHIP_CONNECTION_STRING` | `mysql://root:password@localhost:3306/membership` |
| `ATTENDANCE_CONNECTION_STRING` | `mysql://root:password@localhost:3306/attendance` |
| `CONTENT_CONNECTION_STRING` | `mysql://root:password@localhost:3306/content` |
| `GIVING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/giving` |
| `MESSAGING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/messaging` |
| `DOING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/doing` |

:::tip
Update `root:password` with your actual MySQL credentials. Each database must be created before running the API. Use `npm run initdb` to create the schema for all modules, or `npm run initdb:membership` for a single module.
:::

### WebSocket Settings

| Variable | Description | Example |
|----------|-------------|---------|
| `SOCKET_PORT` | Port for the WebSocket server | `8087` |
| `SOCKET_URL` | WebSocket URL for clients to connect | `ws://localhost:8087` |

---

## Web App Environment Variables

### B1Admin (React + Vite)

Sample file: `.env.sample`

| Variable | Description | Example (Staging) |
|----------|-------------|-------------------|
| `REACT_APP_STAGE` | Environment name | `demo` |
| `PORT` | Dev server port | `3101` |
| `REACT_APP_MEMBERSHIP_API` | Membership API URL | `https://api.staging.churchapps.org/membership` |
| `REACT_APP_ATTENDANCE_API` | Attendance API URL | `https://api.staging.churchapps.org/attendance` |
| `REACT_APP_GIVING_API` | Giving API URL | `https://api.staging.churchapps.org/giving` |
| `REACT_APP_CONTENT_ROOT` | Content delivery URL | `https://content.staging.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics ID (optional) | `UA-123456789-1` |

For local API development, uncomment and use the `localhost` variants:

```bash
REACT_APP_MEMBERSHIP_API=http://localhost:8084/membership
REACT_APP_ATTENDANCE_API=http://localhost:8084/attendance
REACT_APP_GIVING_API=http://localhost:8084/giving
REACT_APP_CONTENT_API=http://localhost:8084/content
REACT_APP_DOING_API=http://localhost:8084/doing
REACT_APP_MESSAGING_API=http://localhost:8084/messaging
```

### B1App (Next.js)

Sample file: `.env.sample`

| Variable | Description | Example (Staging) |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_MEMBERSHIP_API` | Membership API URL | `https://api.staging.churchapps.org/membership` |
| `NEXT_PUBLIC_ATTENDANCE_API` | Attendance API URL | `https://api.staging.churchapps.org/attendance` |
| `NEXT_PUBLIC_GIVING_API` | Giving API URL | `https://api.staging.churchapps.org/giving` |
| `NEXT_PUBLIC_MESSAGING_API` | Messaging API URL | `https://api.staging.churchapps.org/messaging` |
| `NEXT_PUBLIC_CONTENT_API` | Content API URL | `https://api.staging.churchapps.org/content` |
| `NEXT_PUBLIC_CONTENT_ROOT` | Content delivery URL | `https://staging.churchapps.org/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | ChurchApps base URL | `https://staging.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics ID (optional) | `UA-123456789-1` |

:::info
Next.js requires the `NEXT_PUBLIC_` prefix for any environment variable that needs to be available in the browser. Server-only variables do not need this prefix.
:::

### LessonsApp (Next.js)

Sample file: `dotenv.sample.txt`

| Variable | Description | Example (Staging) |
|----------|-------------|-------------------|
| `STAGE` | Environment stage | `staging` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons API URL | `https://api.staging.lessons.church` |
| `NEXT_PUBLIC_CONTENT_ROOT` | Content delivery URL | `https://api.staging.lessons.church/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | ChurchApps base URL | `https://staging.churchapps.org` |

---

## Mobile App Environment Variables

### B1Mobile (React Native / Expo)

Sample file: `dotenv.sample.txt`

| Variable | Description | Example (Staging) |
|----------|-------------|-------------------|
| `STAGE` | Environment name | `dev` |
| `MEMBERSHIP_API` | Membership API URL | `https://api.staging.churchapps.org/membership` |
| `MESSAGING_API` | Messaging API URL | `https://api.staging.churchapps.org/messaging` |
| `ATTENDANCE_API` | Attendance API URL | `https://api.staging.churchapps.org/attendance` |
| `GIVING_API` | Giving API URL | `https://api.staging.churchapps.org/giving` |
| `DOING_API` | Doing API URL | `https://api.staging.churchapps.org/doing` |
| `CONTENT_API` | Content API URL | `https://api.churchapps.org/content` |
| `CONTENT_ROOT` | Content delivery URL | `https://content.staging.churchapps.org` |
| `LESSONS_ROOT` | Lessons site URL | `https://staging.lessons.church` |

:::info
Mobile apps do not use the `REACT_APP_` or `NEXT_PUBLIC_` prefix. Environment variable access is handled by the Expo configuration.
:::

---

## Quick Reference: Sample File Locations

| Project | Sample File |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
