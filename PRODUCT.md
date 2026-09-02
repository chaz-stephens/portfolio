# PRODUCT.md

## Platform
web

## Positioning
A personal portfolio site for Chaz Stephens, a program manager (PMP) with a clinical-data and
medical-device background, positioned toward product development and strategy roles — specifically
targeting medical device PM hiring managers. The mechanism a competing generic-PM portfolio could
not truthfully copy: real end-to-end product work spanning clinical operations (Merck, NCI, Quest
Diagnostics trial delivery) and a documented medical-device capstone (SubQ-Confirm) that covers the
full PM lifecycle — clinical need, regulatory/reimbursement strategy, evidence planning, human
factors, go-to-market — plus an independently conceived and shipped consumer tool (Fit Finder) that
is the highest-traffic product on the site.

## Operating Context
- Visited primarily by a hiring manager or recruiter at a medical device / pharma / healthcare
  company, at the screening stage, deciding whether to move the candidate to a phone screen.
- Deployed as a static Next.js export on Cloudflare Workers (see `wrangler.jsonc`, `out/`).
- Two case-study sub-pages carry the technical depth (SubQ-Confirm, Fit Finder); the home page
  carries the hero, experience timeline, and personality layer.

## Capabilities and Constraints
- Built with Next.js (App Router), React, CSS Modules + custom properties — no CSS framework.
- Content is static/authored in-repo (experience list, case-study copy), not CMS-driven.
- Existing design authority lives in `DESIGN_SPEC.md` (token contract + component specs) rather
  than a `DESIGN.md` — treat it as the incumbent visual system of record for this project.
- Denim-wash accent switcher (Raw / Indigo / Stone / Ecru) and monogram are shipped brand elements,
  not proposals.

## Brand Commitments
- Name: Chaz Stephens. Positioning line: "Program manager and PMP interested in product
  development: identifying market gaps and building the strategy to close them."
- Visual direction (from `DESIGN_SPEC.md`): bold monochrome + one accent, stark black/white base,
  heavy contrast, confident/authoritative type — a deliberate departure from institutional-blue
  medtech/pharma portfolio convention. Denim/tailoring metaphor used lightly, drawn from Chaz's own
  work (he runs a denim publication; Fit Finder is a garment-measurement tool), not borrowed
  decoration.
- Case-study sub-pages keep a restrained, data-forward register distinct from the home page's
  personality layer — this split is intentional, not an inconsistency to fix.

## Evidence on Hand
- Work history (real, in `app/page.tsx`): Merck (Associate Director, Global Clinical Data
  Standards, 2023–present), Quest Diagnostics (Senior PM, Oncology, 2021–2023), National Cancer
  Institute (Scientific Program Manager, 2017–2021, NCI Distinguished Achievement Award 2018 and
  2020), Smithers Avanza (2016–2017), Champions Oncology (2015–2016).
- Case study: SubQ-Confirm — delivery-confirmation subsystem for wearable insulin pumps, graduate
  Medical Device Product Management capstone, full PM lifecycle documented.
- Case study: Fit Finder — body-measurement jean-fit matching tool, conceived and built
  independently, highest-traffic product on the site.
- Nothing beyond what's in the code above is confirmed; do not fabricate additional press,
  testimonials, or awards.

## Product Principles
- Real proof over claims: every stat, award, and case study must trace to actual work in the repo.
- Read as designed, not templated, inside a category (medtech/pharma) whose default is
  institutional and generic.
- Home page carries expression and personality; case-study pages carry technical credibility for a
  medtech evaluator — keep that split rather than unifying the register.
- The denim/tailoring metaphor is a personal-authenticity device, used lightly — it must never
  read as borrowed decoration or overtake the medical-device-relevant substance.

## Accessibility & Inclusion
No project-specific requirement beyond ordinary good practice.
