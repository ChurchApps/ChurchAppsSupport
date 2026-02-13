# Web App Deployment

ChurchApps web applications are deployed as static sites to **Amazon S3** with **CloudFront** as the CDN.

## Deployment Steps

1. **Build the app** — generate the static output:

   ```bash
   npm run build
   ```

2. **Sync to S3** — upload the build output to the S3 bucket:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **Invalidate CloudFront** — clear the CDN cache so users receive the latest version:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Automated Deployments

GitHub Actions workflows handle deployment automatically on push to the `main` branch. The workflow performs all three steps above — build, S3 sync, and CloudFront invalidation — without manual intervention.

:::info
You typically do not need to run these commands manually. Merging a pull request into `main` triggers the automated deployment pipeline.
:::

:::tip
If you need to verify a build locally before deploying, run `npm run build` and inspect the output in the `build/` directory. You can serve it locally with any static file server to confirm everything works.
:::
