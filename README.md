# chaz-stephens.com

Portfolio site for Chaz Stephens. Next.js App Router, statically exported, served
from a Cloudflare Worker. Two case studies live under `app/work/`: the Denim Fit
Finder and SubQ-Confirm.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
```

`npm run start` does **not** work here. `next.config.ts` sets `output: "export"`,
and Next refuses to run `next start` against an exported build. To preview the
real production output, build it and serve the directory:

```bash
npm run build          # writes ./out
npx serve out          # or: python3 -m http.server 4321 -d out
```

The exported routes are files, not directories, so a plain static server wants
`http://localhost:4321/work/fit-finder.html`. The Worker handles the
extensionless URL in production.

## Deploying

**Push to `main`.** Cloudflare builds and deploys within a few minutes. Nothing
is run by hand, and there are no GitHub Actions in this repo.

The target is a Cloudflare Worker named `portfolio` on the
`chaz@indigoandasphalt.com` account, configured in `wrangler.jsonc`. It serves
`./out` as static assets, which is why `out/` is gitignored but is still what
ships: Cloudflare runs the build itself.

To check what is actually live rather than trusting the local clone:

```bash
npx wrangler deployments list --name portfolio | tail -20
curl -sL https://chaz-stephens.com/work/fit-finder/ | grep -c "some phrase you just changed"
```

A deploy that has not landed yet looks like a 200 on the page with stale
content, so grep for something you just changed rather than only checking the
status code.

## Layout

| Path | What it is |
|---|---|
| `app/page.tsx` | Homepage, including the teaser cards and their stat numbers |
| `app/work/fit-finder/` | Denim Fit Finder case study, page plus CSS module |
| `app/work/subq-confirm/` | SubQ-Confirm case study |
| `components/` | Shared components: `SectionHeading`, `StatTile`, `CountUpNumber`, `ImageLightbox`, `Reveal` |
| `public/fit-finder/` | Case study screenshots, `tool-*.png`, all exported at 2000x1250 |
| `public/resume.pdf` | The CV linked from the header and the homepage |

## Conventions worth knowing

- **`DESIGN_SPEC.md` is the source of truth** for the visual system, and
  `AGENTS.md` carries the rules for working in this repo. Read both before
  changing anything visual.
- **Stat numbers render as `0` in the static HTML.** `CountUpNumber` animates
  from zero when the element scrolls into view, so the pre-rendered markup is
  correct even though it looks wrong in `curl` output.
- **`ImageLightbox` puts its `className` on the wrapping `<button>`, not the
  `<img>`.** Styling the image itself through that prop will not do what you
  expect. Size the source files instead.
- **Case study screenshots are captured at one viewport and exported at a single
  size** so the grid lines up without `object-fit` cropping. Match the existing
  dimensions when replacing one.
