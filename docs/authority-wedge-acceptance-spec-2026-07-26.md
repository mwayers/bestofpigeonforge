## Recommendation

**Count the homepage and `/activities` hub among the first six. Do not select six dynamic pages.**

The first cohort should be:

1. `/`
2. `/activities`
3. `/activities/indoor-activities-pigeon-forge`
4. `/activities/things-to-do-pigeon-forge-with-kids`
5. `/activities/things-to-do-pigeon-forge-rainy-day`
6. `/compare/pigeon-forge-vs-gatlinburg`

This matches the MARK plan’s Sprint 3 recommendation and creates a coherent authority wedge:

- **Brand and trust:** homepage
- **Cluster consolidation:** activities hub
- **Core commercial-planning intent:** indoor
- **Primary audience:** families with kids
- **Urgent situational intent:** rainy day
- **First-visit geographic decision:** Pigeon Forge vs Gatlinburg

Six dynamic pages would produce more keyword endpoints but leave the site’s indexed homepage and main internal-link hub weak. Since `/` is already indexed and dynamic pages remain unapproved, improving the two authority distributors is more valuable than adding two more spokes.

Treat this as a **six-page release cohort**, not six entries in `editorial-approvals.json`: only the four dynamic routes require route-qualified approval. Static pages need an equivalent deterministic release review because they currently bypass the dynamic approval gate and always appear in the sitemap.

---

## Exact first-six-page wedge

### 1. `/`

- **Current sources**
  - `app/page.tsx`
  - `data/attractions.json`
  - `data/activity-pages.json`
  - `data/itinerary-pages.json`
- **Target intent**
  - Broad Pigeon Forge trip planning; brand discovery; “best things to do in Pigeon Forge.”
- **Unique local utility**
  - A problem-first trip-planning router by audience, weather, budget, and available time—not another generic attraction list.
- **Known quality risks**
  - Claims “Independent Smoky Mountains trip guide” while prominently promoting a connected Pigeon Forge Snow business.
  - Nonfunctional `SearchAction`.
  - Displays inflated inventory counts such as 492 activity guides and 103 itineraries even though almost all are quarantined.
  - Links directly to weak/unapproved inventory.
  - Ratings and “ranked attractions” have no visible methodology or source.
  - Claims such as “Only indoor snow in the Smokies” lack visible support.
  - Generic organization identity; no named editor or local-expertise proof.
  - PFS CTA is commercially prominent without ownership disclosure.
- **Required assets**
  - Named editor/reviewer module.
  - Local connection and ownership disclosure.
  - “How we choose” methodology summary.
  - Four intent routes: indoor, kids, rainy day, first-time visitor.
  - Transparent featured-attraction criteria.
  - First-hand local image or map/area orientation graphic.
  - Corrections/contact and sources links.
- **Editorial pass**
  - Independent claim replaced with accurate “locally operated” positioning.
  - PFS relationship disclosed before or adjacent to its first promotion.
  - Search schema removed unless real site search exists.
  - No links/cards/counts imply quarantined pages are endorsed inventory.
  - Every ranked or rating-based claim has visible methodology/source.
  - Homepage routes users primarily into the five-page approved wedge or trusted static tools.
  - Unique title/H1/description/canonical/social image validated.
  - Organization/WebSite/ItemList schema matches visible content.
- **Fail**
  - Undisclosed PFS connection, unsupported ranking/ratings, broken SearchAction, or prominent links to unapproved thin pages.

### 2. `/activities`

- **Current sources**
  - `app/activities/page.tsx`
  - `data/activity-pages.json`
- **Target intent**
  - “Things to do in Pigeon Forge” and selection by audience/situation.
- **Unique local utility**
  - A curated decision hub grouping activities by weather, age, budget, trip style, and available time.
- **Known quality risks**
  - Current implementation is a flat grid over **all 492 activity records**.
  - Exposes quarantined pages as if they were curated recommendations.
  - Nearly no original hub content or decision support.
  - Metadata contains a punctuation defect: `Pigeon Forge , All Activity Guides`.
  - Generic Article schema on a directory/hub.
  - No methodology, editor, source, freshness, or “best for” logic.
- **Required assets**
  - Curated categories and shortlists rather than the raw record array.
  - Filter/decision matrix: age, indoor/outdoor, rain, price band, time required, mobility, noise/crowd level.
  - “Start here” recommendations for families, rainy days, toddlers, budget, and first-timers.
  - Approved-page-only or editorially curated link source.
  - Hub methodology and last-reviewed panel.
- **Editorial pass**
  - No raw rendering of all `activityPages`.
  - Every visible activity-page link is either approved/indexable or explicitly labeled as unavailable—not merely reachable and noindexed.
  - Hub contains a useful shortlist/matrix with explained criteria.
  - Links prominently to indoor, kids, rainy-day, homepage, and a relevant tool.
  - Metadata punctuation fixed; canonical and H1 unique.
  - Hub schema uses CollectionPage/ItemList or no optional schema—not unsupported Article semantics.
  - Named reviewer, last verified date, disclosure, and sources visible.
- **Fail**
  - Still functions as a 492-link thin-page directory or makes quarantined records a primary crawl path.

### 3. `/activities/indoor-activities-pigeon-forge`

- **Current sources**
  - Primary record: `data/activity-pages.json`
  - Attraction entities: `data/attractions.json`
  - Renderer: `app/activities/[slug]/page.tsx`, `components/ActivityListPage.tsx`
  - Inventory estimate: 640 words, zero body sections.
- **Target intent**
  - High-commercial/planning intent: best indoor activities in Pigeon Forge.
- **Unique local utility**
  - Ranked indoor-attraction matrix by ages, visit length, price, noise, mobility, advance-booking need, and whether it works during rain/heat.
- **Known quality risks**
  - Essentially an intro, cards, tips, and FAQs; no body sections or ranking methodology.
  - PFS is automatically separated and promoted first.
  - Unsupported prices: family-of-four ranges and dinner-show estimates.
  - Unsupported urgency/sellout and “nationally acclaimed/world-class/top aquarium” claims.
  - Gatlinburg options blur strict Pigeon Forge intent without distance/logistics context.
  - “Perfect for toddlers” and other suitability claims lack criteria.
  - Generic rating values in `attractions.json` have no source or checked date.
- **Required assets**
  - Ranked matrix with at least 8 verified attractions.
  - Columns for town, age fit, typical duration, price basis/date, noise, mobility, reservation policy, and best use case.
  - Pigeon Forge vs nearby Gatlinburg distinction.
  - Heat/rain fallback combinations.
  - First-hand notes/photos for several leading choices.
  - Source packet from official operator pages.
- **Editorial pass**
  - At least 8 candidates evaluated using a published method.
  - All volatile details have source URL and checked date.
  - PFS receives no preferential score outside declared criteria; ownership disclosed beside its first mention.
  - At least two credible “choose something else if…” recommendations.
  - No unsourced rankings, sellout claims, dollar ranges, or ratings.
  - 3–6 approved contextual links plus `/activities` and rainy-day planner.
  - FAQ, Article, breadcrumb, and any ItemList schema exactly match visible content.
- **Fail**
  - Remains a card list with PFS pinned first, or contains one unsupported price/schedule/rating/superlative claim.

### 4. `/activities/things-to-do-pigeon-forge-with-kids`

- **Current sources**
  - Primary record: `data/activity-pages.json`
  - Attraction entities: `data/attractions.json`
  - Shared activity renderer.
  - Inventory estimate: 574 words, zero body sections.
- **Target intent**
  - Best Pigeon Forge activities for families with children.
- **Unique local utility**
  - Age-band scorecard and realistic half-day pairings for toddlers, school-age children, teens, and mixed-age families.
- **Known quality risks**
  - Title promises “Ranked by Age,” but no visible age-ranked table exists.
  - Uses sweeping claims: Dollywood “one of the best theme parks in the world,” Pirates Voyage “best kid experiences…period.”
  - PFS age-two suitability and teen response claims are unsupported.
  - Budget/value advice has no price assumptions or date.
  - Laurel Falls and other park information may be outdated.
  - Recommendations combine Pigeon Forge and Gatlinburg without travel-time/crowd handling.
- **Required assets**
  - Age-band matrix: 1–4, 5–8, 9–12, teens.
  - Height/safety/restriction links where applicable.
  - Visit duration, walking burden, noise/sensory level, stroller access, restroom/food availability, weather dependence.
  - Mixed-age half-day combinations and quiet/low-stimulation alternatives.
  - Local parent or operational review notes.
- **Editorial pass**
  - “Ranked by age” claim is satisfied by visible, sourced scoring.
  - Every age, height, stroller, safety, and accessibility claim is verified.
  - Includes a credible “skip if” or limitation for each top recommendation.
  - PFS ownership and evidence basis disclosed.
  - No generic “all ages” rating used as a substitute for actual suitability.
  - At least two practical half-day plans and one bad-weather fallback.
  - Links to indoor, rainy-day, `/activities`, and relevant cost/planner tool.
- **Fail**
  - Age claim is not operationalized, or safety/accessibility assertions rely only on generic `attractions.json` fields.

### 5. `/activities/things-to-do-pigeon-forge-rainy-day`

- **Current sources**
  - Primary record: `data/activity-pages.json`
  - Attraction entities: `data/attractions.json`
  - Shared activity renderer and rainy-day planner CTA.
  - Inventory estimate: 710 words, zero body sections.
- **Target intent**
  - Immediate “what do we do now that it is raining?” intent.
- **Unique local utility**
  - Time-, age-, location-, and budget-aware contingency plans with crowd fallback logic.
- **Known quality risks**
  - Strong promotional language makes PFS “the single best answer.”
  - Contradictory booking guidance: one section says no reservation needed; another says PFS fills up and should always be booked.
  - Unsupported “most fun indoors anywhere on the Parkway.”
  - Unverified discounts, savings, drive-time, parking-time, sellout, and crowd claims.
  - Static article does not account for current closures/hours or distinguish live from stable facts.
  - Rainy-day planner CTA exists, but recommendations are not transparently connected to page evidence.
- **Required assets**
  - Three plans: 2-hour, half-day, full-day.
  - Inputs/filters for age, budget, starting area, mobility, group size, and reservation status.
  - Crowd fallback decision tree.
  - Verified drive/parking caveats and “check live hours” links.
  - Printable/shareable planner output.
  - Clear stable-vs-live information labels.
- **Editorial pass**
  - Contradictory reservation statements eliminated.
  - Every plan has a fallback if the first venue is full or unsuitable.
  - Drive/parking/ticket statements are sourced and date-stamped.
  - PFS is recommended only by declared criteria and relationship is disclosed.
  - Page links directly into a functioning rainy-day planner whose assumptions are visible.
  - No “open now” implication unless backed by a maintained live source.
  - Links to indoor, kids, `/activities`, and comparison/tool next steps.
- **Fail**
  - Contains conflicting operational guidance, unverified live availability, or promotional “best” language without comparative evidence.

### 6. `/compare/pigeon-forge-vs-gatlinburg`

- **Current sources**
  - Primary record: `data/comparison-pages.json`
  - Renderer: `app/compare/[slug]/page.tsx`, `components/ComparisonPage.tsx`
  - Inventory estimate: approximately 500+ words; comparison is structurally the strongest current family.
- **Target intent**
  - First-time visitor decision: where to stay, spend time, and base a Smokies trip.
- **Unique local utility**
  - Scenario-based decision table covering lodging, traffic, walkability, children, nightlife, parking, park access, weather, and car dependence.
- **Known quality risks**
  - Unsupported lodging-price, traffic, crowd, “world-class,” “best,” and “superior value” claims.
  - “Free trolley connects the two cities” needs current route verification.
  - Incorrect national-park “vehicle entry fee” language.
  - “Tanger Outlets” may be geographically misleading for a Pigeon Forge comparison.
  - Strong conclusion favors Pigeon Forge without a transparent scoring model.
  - PFS is inserted into a broad destination comparison despite ownership connection.
  - No visible sources or verified-date fields.
- **Required assets**
  - Scenario matrix: families, couples, hikers, car-free visitors, nightlife, budget, rainy weather.
  - Annotated area map and verified travel-distance ranges.
  - Lodging-cost methodology or removal of price claims.
  - Current trolley/parking/park-fee source table.
  - “Stay in X if…” decision tree.
- **Editorial pass**
  - All transportation, fee, parking, mileage, and lodging assertions verified.
  - National park parking-tag policy described accurately; no entrance-fee claim.
  - Verdict follows published criteria and includes clear situations where Gatlinburg wins.
  - Any PFS reference is relevant, restrained, and disclosed.
  - At least one map/table provides utility unavailable from generic prose.
  - Related links resolve to approved routes only.
- **Fail**
  - One outdated fee/transit claim remains, or the verdict reads as undisclosed Pigeon Forge/PFS advocacy.

---

## Shared editorial acceptance checklist

Approval is **all-or-nothing**. A clean placeholder scan is not approval.

### Research and factual integrity

- [ ] One explicit query family and visitor job-to-be-done.
- [ ] Research packet records claim, source URL, source organization, checked date, effective period, volatility, confidence, and reviewer.
- [ ] Every price, hour, date, route, distance, age rule, safety statement, rating, ranking, superlative, availability, and event claim is supported.
- [ ] Conflicting sources are resolved or uncertainty is visible.
- [ ] Stable facts are separated from volatile/live information.
- [ ] No fabricated personal experience or unsourced “visitors say” language.

### Differentiation and usefulness

- [ ] One substantial page-specific utility exists: matrix, map, scorecard, itinerary, calculator, or decision tree.
- [ ] Direct answer/verdict appears near the top.
- [ ] “Best for” and “skip if” guidance is present.
- [ ] Content satisfies intent without padded word-count targets.
- [ ] Recommendations materially differ from sibling pages.

### Trust and conflicts

- [ ] Named author and named local/factual reviewer.
- [ ] Visible last-verified date tied to actual review.
- [ ] Sources visible to users.
- [ ] PFS ownership/financial relationship disclosed before or adjacent to the first recommendation.
- [ ] Methodology/scoring criteria visible.
- [ ] Corrections/contact link available.
- [ ] Affiliate or booking relationship disclosed where applicable.

### Search and site quality

- [ ] Unique title, description, H1, canonical, and social metadata.
- [ ] Schema is supported by visible content; no invented reviews/ratings.
- [ ] Links to one hub, 3–6 approved adjacent pages, and a useful tool/next step.
- [ ] Zero broken, unknown, ambiguous, or quarantined recommendation links.
- [ ] No placeholder, dummy, duplicate, or unsupported content.
- [ ] Route appears only once across canonical families.
- [ ] Real modification date is used, or `lastmod` is omitted.

### Release

- [ ] Dynamic canonical path appears in `data/editorial-approvals.json` with named approver and valid calendar date.
- [ ] Preview reviewed at mobile and desktop sizes.
- [ ] Rendered HTML confirms expected robots, canonical, metadata, and schema.
- [ ] Sitemap contains approved dynamic route and excludes unapproved routes.
- [ ] Tests, TypeScript, production build, broken-link scan, and generated-artifact checks pass.
- [ ] PR/rollback path exists; no direct automated publication.

**Immediate fail conditions:** one unsupported volatile claim, one undisclosed conflict, one broken/ambiguous internal link, one misleading schema object, or approval before rendered-preview review.

---

## Minimum trust infrastructure before any dynamic route is approved

The existing default-deny implementation is necessary but not sufficient. `data/editorial-approvals.json` is currently empty, which is correct.

Required minimum:

1. **Named identity**
   - Real author and local/factual reviewer profiles.
   - About page documenting Pigeon Forge experience.

2. **Editorial standards**
   - Public methodology, source hierarchy, scoring rules, update policy, and AI/editorial-use policy.

3. **Conflict disclosures**
   - Sitewide disclosure page.
   - Page-level PFS ownership disclosure.
   - Affiliate/booking disclosure before commercial CTAs.

4. **Claim provenance**
   - Structured source fields beyond the current page interfaces.
   - Checked/effective dates, volatility, confidence, reviewer.
   - No approval while facts exist only as free-form prose.

5. **Corrections and accountability**
   - Public corrections/contact route.
   - Review log or content-change record tied to the real last-verified date.

6. **Route-qualified approval**
   - Continue canonical-path approvals in `data/editorial-approvals.json`.
   - Classification and approval remain separate.
   - Approval should identify approver, approval date, and preferably reviewed commit/content hash to prevent stale approval surviving later edits.

7. **Static-page governance**
   - Add equivalent editorial eligibility for homepage and hubs.
   - Static pages must not automatically enter the sitemap merely because they are static.
   - Hubs must not expose the entire quarantined inventory.

8. **Rendered verification**
   - Check robots, sitemap inclusion, canonical, schema, source visibility, disclosures, and links in generated HTML—not just JSON records and helper tests.

9. **Schema cleanup before approval**
   - Remove unsupported SearchAction.
   - Replace generic organization-authored Article markup with real author/reviewer data.
   - Fix default publication/modification dates and mismatched speakable selectors.
   - Never expose source-less ratings.

10. **Release controls**
    - Branch/PR review, preview, human signoff, production smoke test, rollback, then selective indexing request.

---

## Repository findings and verification

- Branch confirmed: `seo/quarantine-quality-gates`.
- Default-deny dynamic indexing is implemented:
  - Unapproved routes receive `noindex,follow`.
  - Only approved clean routes enter the sitemap.
  - Approvals are route-qualified.
  - Unknown/ambiguous related links are suppressed.
- `data/editorial-approvals.json` is empty, so no dynamic route is currently approved.
- Static pages and tools remain automatically included in `app/sitemap.ts`; this is the principal governance gap.
- Existing classifier detects only obvious scaffold patterns and duplicate slugs. It does **not** verify sources, depth, trust, links, metadata quality, or editorial utility.
- `npm test` passed all content-quality, route-resolution, and editorial-approval tests.
- An initial attempt to run nonexistent individual npm scripts failed; inspecting `package.json` showed the correct command is `npm test`, which then passed.
- **Files created or modified:** none. Existing untracked `.brv/` and `docs/traffic-strategy-reevaluation-2026-07-25.md` were present in repository status; I did not edit them.