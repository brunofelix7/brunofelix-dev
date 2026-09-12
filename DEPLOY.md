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
