# 🚀 Deploy

The site is deployed to Heroku. Every push to `main` triggers
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which runs
`npm ci` and `npm run build` first and only pushes to Heroku if the build
succeeds.

On Heroku, the `heroku/nodejs` buildpack installs the dependencies, runs the
`build` script and then starts the process declared in the `Procfile`
(`node server.js`). `server.js` serves `dist/brunofelix-dev/browser` and falls
back to `index.html` so client side routes such as `/projects/:id` work on a
full page load.

## Heroku

The app is `brunofelix-dev`, on a Basic dyno, with a single config var,
`CANONICAL_HOST=brunofelix.dev`. The workflow authenticates with two repository
secrets under **Settings → Secrets and variables → Actions**: `HEROKU_API_KEY`,
taken from **Account settings → API Key → Reveal**, and `HEROKU_APP_NAME`.

## Custom domain

The site answers on `https://brunofelix.dev`. `www`, plain HTTP and the
`herokuapp.com` URL all return 301 to it, and the canonical host also sends
`Strict-Transport-Security`. That redirect lives in `server.js` and only turns
on when `CANONICAL_HOST` is set, so the app stays reachable by its Heroku URL
whenever the custom domain is not ready.

`brunofelix.dev` is registered at GoDaddy, but DNS is served by Cloudflare on
the `cris`/`athena.ns.cloudflare.com` nameservers. Heroku only hands out
hostnames such as `*.herokudns.com`, never fixed IPs, and the DNS spec forbids a
CNAME at the zone apex, so the apex needs a provider that flattens it. GoDaddy
does not. On top of that `.dev` is HSTS preloaded at the TLD level, which makes
HTTPS mandatory and rules out any apex solution that relies on a plain HTTP
redirect.

Both records are **DNS only** (grey cloud) in Cloudflare. Proxying them would
keep the Let's Encrypt challenge from reaching Heroku, which breaks ACM
issuance and renewal. Each domain has its own target, readable with
`heroku domains`:

| Record | Name | Target |
| --- | --- | --- |
| CNAME | `@` | `metaphysical-melon-4l3mq5q8t9vuchq75cex1wvn.herokudns.com` |
| CNAME | `www` | `quantitative-fly-l4xxvj5wt4kh99ogzjvvmw54.herokudns.com` |

Certificates come from Heroku ACM (Let's Encrypt) and renew automatically about
a month before expiry. `heroku certs:auto` reports the status of each domain.

## Running the production build locally

```bash
npm run build
npm run serve:prod   # http://localhost:8080
```

## Notes

- `engines.node` is pinned to `24.x`, the current Active LTS and the Heroku
  default.
- Only the hashed bundles are cached long term. The `i18n`, `projects` and
  `certificates` JSON files, the PDFs and the images are revalidated on every
  request, so updating content does not require a new build.
- The `certificates` and `projects` data folders share their names with client
  side routes, so `express.static` runs with `redirect: false`. Otherwise a
  request to `/certificates` would 301 to `/certificates/` instead of reaching
  the Angular router.
- The `origin` remote currently carries a GitHub personal access token in its
  URL. It is worth revoking that token and switching the remote to SSH.
