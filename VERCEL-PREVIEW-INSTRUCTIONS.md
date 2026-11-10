# Vercel preview hand-off

This archive contains the current VERQIA source snapshot needed to build the Next.js site.
It excludes `node_modules`, build caches, local uploads, backups, test output and credentials.

## Preview only

The Vercel project already created is `verqia-site-preview`.

1. Extract this archive into a Git repository.
2. Commit and push the source to a branch (for example `preview`).
3. In Vercel, connect that repository to `verqia-site-preview`, then create a Preview deployment from the branch.
4. The project has `NEXT_PUBLIC_LOCAL_PRICING_REVIEW=true` configured for Preview only, so the approved pricing-review presentation appears in that preview. Do not set this value for Production.

No custom domain or DNS setup is required for a Vercel preview URL.

The preview is not approval to publish production. Keep the production target unset until the outstanding launch gates are closed.
