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

## Pending setup

These steps are done once, from the browser. No CLI required.

- [ ] Create the app at [dashboard.heroku.com/new-app](https://dashboard.heroku.com/new-app)
      and take note of its name. The Node buildpack is detected automatically
      from `package.json`.
- [ ] Copy the API key from **Account settings → API Key → Reveal**.
- [ ] On GitHub, go to **Settings → Secrets and variables → Actions** and add
      two repository secrets:
      - `HEROKU_API_KEY` → the API key from the previous step
      - `HEROKU_APP_NAME` → the app name from the first step
- [ ] Push to `main` and follow the run under the **Actions** tab.

Until both secrets exist the build job passes and the deploy job fails.

## Custom domain

`brunofelix.dev` stays registered at GoDaddy, but DNS is served by Cloudflare.
Heroku only hands out hostnames such as `*.herokudns.com`, never fixed IPs, and
the DNS spec forbids a CNAME at the zone apex, so the apex needs a provider that
flattens it. GoDaddy does not. On top of that `.dev` is HSTS preloaded at the
TLD level, which makes HTTPS mandatory and rules out any apex solution that
relies on a plain HTTP redirect.

The order below matters: the certificate is only issued once DNS resolves, and
`CANONICAL_HOST` only works once the certificate is live.

- [ ] Move the app off the free tier. Eco (5 USD/month) already covers custom
      domains and ACM; it sleeps after 30 minutes without traffic.
- [ ] `heroku domains:add brunofelix.dev` and `heroku domains:add
      www.brunofelix.dev`, then read the DNS target of each one with `heroku
      domains`. Every domain gets its own target.
- [ ] Create the zone on Cloudflare (free plan), replace the GoDaddy
      nameservers with the pair it returns and wait for the zone to go active.
- [ ] Add both records in Cloudflare as **DNS only** (grey cloud, not
      proxied), otherwise the Let's Encrypt challenge never reaches Heroku:
      - `CNAME @` → the apex DNS target, flattened by Cloudflare
      - `CNAME www` → the www DNS target
- [ ] `heroku certs:auto:enable`, then watch `heroku certs:auto` until both
      domains report `OK`.
- [ ] `heroku config:set CANONICAL_HOST=brunofelix.dev`, which makes `www`,
      plain HTTP and the `herokuapp.com` URL answer 301 to the canonical host
      and adds the `Strict-Transport-Security` header.

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
- The `origin` remote currently carries a GitHub personal access token in its
  URL. It is worth revoking that token and switching the remote to SSH.
