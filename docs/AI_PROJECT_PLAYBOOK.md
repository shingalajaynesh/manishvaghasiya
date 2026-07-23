# AI Project Playbook

Prepared on July 14, 2026

## 1. Purpose

This document is the operating rulebook for AI and developers working on the Manish Vaghasiya platform.

It exists to make sure future work stays:

- structured
- scalable
- product-focused
- professional in tone and UI
- consistent across frontend, backend, and data design

This project should be built with the seriousness of the higher-maturity reference workspaces reviewed:

- `D:\WEBSITE DEVELOPMENT\thedivinegarbhsanskar`
- `D:\NEW DEVELOPER\Jaiminbhai Project`

Those projects show a better standard in:

- application boundaries
- shared model architecture
- documentation depth
- delivery discipline
- feature grouping
- logging and infrastructure thinking

This playbook brings that level of thinking into `manishvaghasiya`.

## 2. Product Understanding

This is not a generic speaker website.

This is a `speaker brand + editorial platform + lead generation + monetization system`.

The platform must help convert Manish Vaghasiya's existing authority into:

- trust
- search traffic
- email capture
- WhatsApp/community growth
- workshop and seminar inquiries
- digital product revenue
- later-stage ad and affiliate revenue

The AI must always remember:

- this is a content business
- this is a trust business
- this is a conversion business
- this is not a random blog

## 3. Current Repo Direction

The current repository is now organized as:

```text
manishvaghasiya/
|-- frontend/
|-- backend/
|-- data-models/
|-- docs/
|   |-- strategy/
|   `-- AI_PROJECT_PLAYBOOK.md
|-- README.md
`-- tsconfig.json
```

This is better than the original prototype state, but it is not yet at the final maturity level shown in the reference systems.

## 4. Target Architecture Standard

The long-term target should follow a more productized workspace pattern:

```text
manishvaghasiya/
|-- frontend/              # public website and editorial frontend
|-- backend/               # backend APIs, auth, forms, lead capture, admin/CMS endpoints
|-- data-models/           # centralized database models and shared domain contracts
|-- docs/
|   |-- strategy/
|   |-- architecture/
|   `-- operations/
|-- scripts/
|-- README.md
`-- tsconfig.json
```

## 5. Centralized Data Model Requirement

One of the most important lessons from the reference projects is this:

`database shape must not be scattered across random backend files`

The better pattern is a centralized shared data-model layer.

### 5.1 Reference Pattern Observed

From the reviewed projects:

- `divine-data-models` acts as a shared model package
- `hms-data-models` acts as a shared model package
- backend services depend on that package instead of redefining domain entities ad hoc

This is a strong pattern and should be adopted here.

### 5.2 What This Project Should Do

Create a future package:

```text
data-models/
|-- package.json
|-- README.md
|-- src/
|   |-- index.ts
|   |-- entities/
|   |-- schemas/
|   |-- validators/
|   `-- relations/
```

### 5.3 What Belongs in `data-models`

Examples for this project:

- subscriber
- inquiry
- lead magnet download
- article
- topic hub
- author
- testimonial
- seminar program
- booking request
- ebook product
- affiliate resource
- media asset
- site setting
- legal page
- email automation event

### 5.4 Data Model Rules

- one source of truth for entity structure
- one place for validation defaults
- one place for relation definitions
- backend imports models from the shared package
- frontend does not invent database shape itself
- do not duplicate entity structure in multiple apps

### 5.5 AI Rule for Data Models

When new features are added:

1. define or update shared entity contract first
2. define validation shape
3. define storage behavior
4. then implement backend logic
5. then wire frontend

Do not start from UI if the underlying entity is still unclear.

## 6. App Boundary Rules

The AI must preserve clear boundaries between apps.

### 6.1 `frontend`

This app is for:

- public website
- topic hubs
- articles
- resource landing pages
- booking pages
- legal pages
- public lead capture

It should not contain:

- server business logic
- database access logic
- secret-handling code
- ownership or permission decisions

### 6.2 `backend`

This app is for:

- form handling
- content APIs
- lead capture APIs
- admin or CMS APIs
- validation
- security
- rate limiting
- persistence
- email automation hooks

It should not contain:

- presentation logic
- duplicated UI copy
- frontend routing logic

### 6.3 `data-models`

This package should become:

- the single source of truth for persistent entities
- the shared contract layer between database and backend

## 7. Frontend Structure Rules

The reviewed projects show a clear pattern:

- routes are centralized
- feature boundaries are visible
- design tokens are centralized
- pages and reusable components are separated

This project should follow the same style.

### 7.1 Frontend Folder Standard

Inside `frontend/src`:

```text
src/
|-- app/                 # app shell, providers, router
|-- content/             # route metadata, editorial data, legal data, site config
|-- features/            # feature-specific UI blocks
|-- pages/               # page-level composition
|-- shared/
|   |-- components/      # reusable UI
|   |-- lib/             # utilities, API wrappers
|   `-- styles/          # future design tokens/theme layer
`-- main.tsx
```

### 7.2 Frontend Naming Rules

- page component: `AboutPage.tsx`
- feature section: `AudiencePathsSection.tsx`
- layout shell: `SiteLayout.tsx`
- reusable UI card: `ContentCard.tsx`
- hook: `useResourceDownload.ts`
- route metadata: `routes.ts`
- editorial data: `editorial.ts`

### 7.3 Routing Rules

Routes must be centrally declared.

Do not hardcode route strings repeatedly across components.

Use one route source file such as:

- `src/content/routes.ts`

### 7.4 Design Token Rules

The HMS reference shows the right idea:

- colors live in one file
- spacing lives in one file
- radius lives in one file
- status meaning lives in one file

This project should evolve toward:

```text
src/shared/styles/designTokens.ts
src/shared/styles/themeConfig.ts
```

Do not scatter raw hex values everywhere long term.

Frontend visual implementation must be centralized through:

- Ant Design theme tokens
- shared layout and page primitives
- a single approved editorial visual system

### 7.4.1 UI Framework Rule

For this project, use `Ant Design` as the primary component system.

This is now a hard project rule.

Expected default usage:

- `Button`
- `Menu`
- `Drawer`
- `Card`
- `Form`
- `Input`
- `Typography`
- `Tag`
- `Layout`
- `List`
- `Statistic`
- `Collapse`
- other Ant Design primitives where appropriate

Do not keep building custom one-off button systems, card systems, nav systems, and form systems when an Ant Design component already fits the need.

### 7.4.2 Theme Rule

Ant Design must be wrapped with a centralized theme configuration.

Required files:

- `src/shared/styles/designTokens.ts`
- `src/shared/styles/themeConfig.ts`

Rules:

- colors must be derived from shared tokens
- border radius must be consistent
- typography decisions must be centralized
- elevated surfaces must feel premium and editorial
- buttons must look intentional, not default Ant without branding
- the final UI must not look like a starter dashboard

### 7.4.3 Device Responsiveness Rule

Every design must work cleanly across:

- mobile phones
- tablets
- laptops
- large desktop screens

This is also a hard project rule.

Requirements:

- no horizontal scrolling in normal use
- no broken cards or overflow on smaller screens
- navigation must stay usable on touch devices
- forms must stay readable and tappable on mobile
- section spacing must scale down gracefully
- image, video, and media blocks must remain fluid
- layouts must adapt instead of relying on one desktop-only frame

The website must be flexible, standard, and usable everywhere.

### 7.4.4 Container Width Rule

Use a consistent content container system across the entire site.

Recommended standard:

- desktop content container around `1140px` to `1200px`
- readable text measures kept narrower where needed
- fluid side spacing on tablet and mobile

Do not let each page invent its own random max width or inconsistent side padding.

The visual result must feel:

- even
- balanced
- aligned
- professional

### 7.5 UI Feedback Rules

User requested direction:

- use React toast only
- avoid noisy UI
- avoid childish emoji behavior

Therefore the project standard should be:

- use `react-hot-toast` for transient success or error feedback
- pair toast behavior cleanly with Ant Design forms and actions
- do not invent custom floating notification systems unless truly needed
- do not show decorative emoji in toasts
- do not use celebratory emoji in buttons, forms, alerts, or headings
- keep feedback short, neutral, and professional

Good examples:

- `Saved successfully`
- `Inquiry submitted successfully`
- `Please enter a valid email address`

Bad examples:

- `You’re on the list! 🎉`
- `Awesome!!!`
- `Hurray, done!!!`

### 7.6 Icon Rules

Use professional icon libraries only.

Recommended:

- `@ant-design/icons`

Rules:

- icons must support meaning, not decoration
- use one icon library consistently as the default
- no mixed random icon styles
- no emoji used as icon replacement
- avoid over-iconifying every card and line item

### 7.7 Navigation Rules

Navigation should feel editorial and premium:

- clear top-level route set
- no clutter
- consistent labels
- strong mobile menu behavior
- route-aware active state

Do not build:

- confusing mega menus
- flashy motion-first navigation
- too many top-level items before content exists

### 7.8 Professional UI Rules

The user explicitly wants a more industrial, professional, senior-level interface standard.

That means:

- no beginner-looking card spam
- no random gradients without structure
- no generic AI-website composition
- no weak CTA hierarchy
- no over-rounded toy-like components
- no inconsistent spacing rhythm
- no "startup template" feel on a family and trust-driven platform

The frontend should instead feel:

- structured
- editorial
- premium
- conversion-aware
- calm
- credible for institutions and families
- strong on both desktop and mobile

## 8. Backend Structure Rules

The reference backends show stronger domain separation than the current simple API.

This project should move toward:

```text
backend/src/
|-- config/
|-- modules/
|   |-- subscribers/
|   |-- inquiries/
|   |-- resources/
|   |-- articles/
|   |-- bookings/
|   `-- products/
|-- routes/
|-- middleware/
|-- services/
|-- lib/
`-- index.ts
```

### 8.1 Backend Naming Rules

- service: `booking.service.ts`
- validation: `booking.validation.ts`
- route: `booking.route.ts`
- repository or data access: `booking.repository.ts`
- model adapter: imported from `data-models`

### 8.2 Backend Responsibility Rules

Backend must own:

- validation
- rate limiting
- sanitization
- persistence
- source tracking
- deduplication
- ownership rules
- admin visibility rules

Frontend must not decide:

- whether a lead is valid
- whether a user is authorized
- whether data belongs to a certain tenant or author

### 8.3 Validation Rules

Every public input must be validated.

Examples:

- subscribe form
- contact form
- booking inquiry
- ebook purchase intent
- article search query
- admin content draft submission

Recommended approach:

- schema-first validation
- consistent error shapes
- user-safe messages

## 9. Logging Rules

The reference backends use centralized logging patterns with context. This project should follow that discipline.

### 9.1 Required Standard

Use a centralized logger.

Recommended:

- `winston`

Do not rely on scattered raw `console.log()` across production code.

### 9.2 Logging Rules

- every important server flow should log through the logger
- logs should include context where possible
- use log levels consistently:
  - `info`
  - `warn`
  - `error`
  - `debug` only when appropriate

### 9.3 Logging Do Not Do

- do not leave random debug logs in business code
- do not log secrets
- do not log entire raw request bodies if they contain private data
- do not log using emojis
- do not use funny or dramatic log language

Bad:

- `console.log("Yay, payment worked!!!")`
- `console.log("🔥 BIG ERROR 🔥")`

Good:

- `logger.info("Booking inquiry created", { inquiryId, source })`
- `logger.warn("Duplicate subscriber attempt", { email })`
- `logger.error("Email dispatch failed", { error })`

## 10. Content Writing Rules For AI

This is one of the most important parts of the playbook.

The AI must write content that matches the product strategy and avoids low-trust behavior.

### 10.1 Content Goal

Every published page must do at least one of these:

- answer a real audience question
- build trust
- support SEO
- lead to a PDF funnel
- support booking
- support a later product sale

### 10.2 Content Voice

The voice should be:

- respectful
- grounded
- helpful
- clear
- warm but not dramatic
- mentor-like
- practical

The voice should not be:

- preachy
- spammy
- overhyped
- fake spiritual
- fake corporate
- generic AI self-help

### 10.3 Content Structure Rules

For articles:

- clear title
- real search intent
- strong intro
- subsections with meaningful headings
- practical examples
- culturally relevant context where appropriate
- CTA to a relevant resource
- FAQ section when useful

For hub pages:

- clear topic definition
- who this hub is for
- what problems it solves
- pillar article
- supporting articles
- resource CTA
- conversion CTA

For booking pages:

- who should book
- what sessions cover
- what outcomes to expect
- credibility and proof
- clean inquiry next step

### 10.4 Content Do

- write for students, parents, families, and organizers specifically
- tie content to one topic cluster
- include real problem framing
- use plain language
- prioritize usefulness over word count
- keep CTAs relevant to the topic
- keep tone professional and human

### 10.5 Content Do Not Do

- do not write generic motivation filler
- do not publish quote-only pages
- do not create random mixed-niche content
- do not use clickbait titles that weaken trust
- do not overpromise life transformation
- do not copy known speaker or competitor phrasing too closely
- do not use childish excitement copy
- do not use decorative emoji in article copy, buttons, headings, or trust pages

Bad:

- `This one secret habit will totally change your life!!!`
- `Parents must do this NOW 😍🔥`

Good:

- `How parents can better understand teenagers`
- `Why family communication breaks down`

### 10.6 Multilingual Rules

The strategy says:

- Gujarati primary
- Hindi secondary
- English selective

Therefore:

- English content must remain clean and neutral
- Gujarati support must be readable and intentional
- do not mix languages randomly within the same paragraph
- language switching must be structured, not messy

## 11. UX Copy Rules

UI copy must be product-grade.

### 11.1 Buttons

Good:

- `Download the guide`
- `Book a seminar`
- `Read the article`
- `Explore programs`

Bad:

- `Click here`
- `Let’s go`
- `Magic starts now`

### 11.2 Toasts and Alerts

Good:

- `Form submitted successfully`
- `Please complete all required fields`
- `We could not process your request`

Bad:

- `Awesome!!!`
- `Boom done`
- `Super success`

### 11.3 Empty States

Empty states must guide the user.

Good:

- `No articles have been added to this topic yet.`
- `No resource is available for this section yet.`

Bad:

- `Nothing here :(`
- `Oopsie`

## 12. Visual Style Rules

The design must feel professional and editorial.

### 12.1 Allowed Direction

- warm editorial palette
- strong serif headings
- clean body typography
- controlled spacing
- calm motion
- premium cards
- subtle gradients or texture
- richer accent usage with disciplined color application
- section-level color variation where it improves hierarchy

### 12.2 Avoid

- purple default AI aesthetics
- overly glossy startup visuals
- excessive glow
- gimmicky particle backgrounds on content-heavy pages
- emoji-led visual hierarchy
- random icon overload
- washed-out pages with no visual hierarchy
- uneven container widths and inconsistent section sizing

## 13. Documentation Rules

The Divine reference proves documentation maturity matters.

This project should grow docs in layers:

```text
docs/
|-- strategy/
|-- architecture/
|-- operations/
|-- content/
`-- AI_PROJECT_PLAYBOOK.md
```

### 13.1 Required Future Docs

- architecture overview
- content operations guide
- editorial standards
- release checklist
- SEO implementation guide
- analytics tracking plan
- CMS authoring guide

### 13.2 AI Documentation Rule

Before major new work:

1. read strategy docs
2. read this playbook
3. inspect code
4. implement only after understanding boundaries

## 14. Delivery Rules For AI

The implementation discipline should mirror the reference projects.

### 14.1 Work Order

When building a new feature:

1. understand the strategy goal
2. inspect current code
3. define or update shared data shape
4. implement backend contract
5. implement frontend integration
6. add user feedback states
7. verify builds
8. update docs if structure changed

### 14.2 Completion Standard

A task is not complete just because code exists.

A task is complete only when:

- architecture stays clean
- routes are wired correctly
- naming is consistent
- build passes
- UI copy is professional
- content follows topic strategy
- no random debug leftovers remain

## 15. What AI Must Not Do In This Project

- do not act like a generic website generator
- do not add childish emojis
- do not write hype-heavy self-help copy
- do not scatter data contracts across frontend and backend
- do not hardcode design choices repeatedly
- do not use multiple notification systems
- do not use inconsistent icons
- do not leave random console logs in production code
- do not build pages without a clear role in the funnel
- do not add features that weaken trust for ads or SEO

## 16. Immediate Architecture Recommendations

Based on the current repository and the two reference projects, the next structural improvements should be:

1. expand `data-models` for centralized entities
2. continue moving `backend/src/models` entities into that shared model layer
3. add `frontend/src/shared/styles/designTokens.ts`
4. standardize toast usage with `react-hot-toast`
5. introduce a centralized logger in `backend`
6. move backend business logic from route files into domain modules

## 17. Immediate Content and Product Recommendations

The next product-facing improvements should be:

1. finish first 10 real articles
2. deepen the first 3 topic hubs
3. create real booking inquiry flow
4. create actual PDF download and thank-you automation flow
5. add SEO metadata and schema
6. add author and trust blocks consistently

## 18. Short Operating Summary

Build this like a real media product.

Use:

- clear app boundaries
- centralized data models
- backend-owned logic
- professional UI feedback
- no emoji-heavy AI copy
- strong documentation
- strategy-led content

The AI should always optimize for:

1. correctness
2. trust
3. maintainability
4. shared structure
5. product usefulness
6. polished delivery
