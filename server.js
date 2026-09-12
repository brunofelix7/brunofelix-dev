const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;
const browserDir = path.join(__dirname, 'dist', 'brunofelix-dev', 'browser');

// Set this only after the custom domain resolves and its certificate is live,
// otherwise every request gets redirected to a host that does not answer yet.
const canonicalHost = process.env.CANONICAL_HOST;

// Heroku terminates TLS, so the original scheme only survives in
// X-Forwarded-Proto and Express has to be told to trust it.
app.set('trust proxy', true);

if (canonicalHost) {
  app.use((req, res, next) => {
    if (req.protocol === 'https' && req.hostname === canonicalHost) {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
      next();
      return;
    }

    res.redirect(301, `https://${canonicalHost}${req.originalUrl}`);
  });
}

// Only the bundles get a content hash in their filename. Everything else
// (i18n, projects and certificates data, PDFs, images) keeps a stable URL and
// must be revalidated, otherwise a content update would stay invisible until
// the cache expires.
const IMMUTABLE_FILE = /\.(?:js|css)$/;

app.use(
  express.static(browserDir, {
    index: false,
    setHeaders: (res, filePath) => {
      const cacheControl = IMMUTABLE_FILE.test(filePath)
        ? 'public, max-age=31536000, immutable'
        : 'public, no-cache';

      res.setHeader('Cache-Control', cacheControl);
    },
  })
);

// Client side routes such as /projects/:id have no file on disk.
app.use((req, res) => {
  res.sendFile(path.join(browserDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`brunofelix-dev listening on port ${port}`);
});
