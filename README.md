# Ragnarok WTM

## Development

Install dependencies with Bun and start the Vite development server:

```sh
bun install
bun run dev
```

Create a production build with `bun run build`. Builds in GitHub Actions use
the `/ragnarok-wtm/` base path required by this repository's GitHub Pages
project site; local builds use `/` so they can be previewed locally.

## Deployment

The GitHub Actions workflow in `.github/workflows/gh-deploy.yml` builds the
site and deploys it to GitHub Pages when changes are pushed to `main`. To
enable it, open the repository's **Settings → Pages** and select **GitHub
Actions** as the build and deployment source.

The workflow publishes the `dist/` directory and includes a `404.html`
fallback for the app's client-side routes, so direct links and page reloads
continue to work on GitHub Pages.

## Disclaimer

This is an independent and unofficial fan site. 

Ragnarok Online, its characters, names, images, logos, trademarks, and other related elements are the property of their respective owners. 

This site is not affiliated with, associated with, or officially endorsed by the rights holders.

## License

This project is licensed under the [MIT License](./LICENSE).
