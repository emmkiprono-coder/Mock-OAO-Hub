# Hub 1: Access & Opportunity

**Advocate Health | SVP Fernando's Access & Opportunity Function**

An enterprise intelligence hub for the Office of Access & Opportunity (formerly DEI), focused on opportunity for all including Strategic Growth Regions (SGR).

## Sections (9 navigable, all drillable)

- **Dashboard** -- 4 KPI drill-down cards with regional breakdowns
- **Opportunity Programs** -- 6 programs with ROI, budget, and 4 drillable metrics each
- **SGR Initiatives** -- 4 projects with milestone trackers and owner attribution
- **Governance** -- 4 decision bodies with meeting cadence and recent decisions
- **Feedback Loops** -- 4 structured listening channels with findings/actions
- **Cost Modeling** -- 3 clickable scenarios, 8 expandable budget lines
- **Predictive Analytics** -- 3 AI models with confidence-scored predictions
- **Structured Data Aggregation** -- 6 connected sources with quality scores
- **Teammate Engagement** -- Belonging, equity, and satisfaction by region

## Capabilities Built In

- Structured data aggregation (6 sources)
- Feedback loops (4 channels)
- Governance tracking (4 bodies)
- Predictive optimization (3 AI models)
- Cost modeling (3 scenarios)
- AI Agent with actionable intelligence

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Single-file deployable (bundle.html)

## Getting Started

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

## Deploy as Single HTML

```bash
# Install bundling dependencies
npm install --save-dev parcel @parcel/config-default html-inline

# Build and inline
npx parcel build index.html --no-source-maps
npx html-inline -i dist/index.html -o bundle.html -b dist
```

## Architecture

```
src/
  App.tsx          # All views, data, agent, and drill-down components
  main.tsx         # React entry point
  index.css        # Tailwind directives and CSS variables
  components/ui/   # shadcn/ui component library (40+ components)
  lib/utils.ts     # Utility functions (cn class merger)
```

## Color Identity

- Primary: Blue (#2a5a8c / #1a3a5c)
- Accent: Emerald, Amber, Purple
- Background: Dark navy (#080e14)
