# Curdux — Operational Job Checklist (Public Code Sample)

A **standalone React + TypeScript demonstration** adapted from the job-checklist workflow in my private Curdux field-engineering support project. It is deliberately separated from the live application.

## What it demonstrates
- A controlled form for adding operational checklist items
- Completion toggling and progress calculation
- An injected asynchronous save boundary (`saveItems`) rather than a hard-coded database connection
- Busy-state protection, save-error feedback, and accessible native controls
- How an operational requirement (track field-work completion) becomes an application component

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. `npm run build` runs TypeScript checking and bundles the application.

## Public-safety boundary

This demo **does not contain** Supabase credentials, private database schema, real users, production URLs, authentication rules, support documents, or any actual Curdux records. The tasks are illustrative. No remote API requests are made and changes remain only in the browser session.

## Provenance and contribution

The source concept and original job-checklist component came from the private Curdux application. This public adaptation was prepared with AI assistance for a portfolio/code-review context. My broader Curdux work involves identifying the field-engineering problem, specifying and validating workflows, coordinating AI-assisted implementation, testing and debugging. This sample should **not** be interpreted as a claim that every line was manually typed without assistance; I can discuss its behaviour, architecture and limitations.

## Difference from the private application

The private version interacts with Supabase, user identity, and audit events. The public version intentionally replaces those dependencies with an injectable save function, synthetic checklist items, and local-only state. It also introduces error and busy-state handling to keep the example understandable as a standalone component.

## What I would improve next

Add component tests for failed saves and concurrent actions, persistent storage behind an authenticated API, and better reconciliation when the parent receives newer checklist data. The demo uses no multi-user concurrency controls.
