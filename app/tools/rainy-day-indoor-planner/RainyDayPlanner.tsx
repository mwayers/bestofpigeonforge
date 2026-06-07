'use client';

import { useMemo, useState } from 'react';

type Group = 'toddlers' | 'kids' | 'teens' | 'couples' | 'adults' | 'mixed';
type TimeWindow = 'half' | 'full' | 'evening';
type Energy = 'low' | 'medium' | 'high';
type Budget = 'low' | 'medium' | 'splurge';
type Location = 'pigeon-forge' | 'gatlinburg' | 'either';

type RainyAttraction = {
  id: string;
  name: string;
  slug: string;
  category: string;
  tags: string[];
  ageRange: string;
  priceRange: string;
  rating: number;
  shortDesc: string;
  highlights: string[];
  website?: string;
  bookingUrl?: string;
  isFeaturedPFS?: boolean;
};

const groupOptions: Record<Group, { label: string; note: string }> = {
  toddlers: { label: 'Toddlers', note: 'gentle, flexible, easy exits' },
  kids: { label: 'Kids', note: 'hands-on, active, memorable' },
  teens: { label: 'Teens', note: 'less cheesy, more challenge' },
  couples: { label: 'Couples', note: 'date-friendly rainy day' },
  adults: { label: 'Adults', note: 'museums, food, shows' },
  mixed: { label: 'Mixed ages', note: 'works for a broad group' },
};

const timeOptions: Record<TimeWindow, { label: string; note: string; slots: number }> = {
  half: { label: 'Half day', note: '2 to 4 hours to save the day', slots: 2 },
  full: { label: 'Full rainy day', note: 'morning through evening', slots: 4 },
  evening: { label: 'Evening only', note: 'after dinner or after a wet afternoon', slots: 2 },
};

const energyOptions: Record<Energy, { label: string; note: string }> = {
  low: { label: 'Low-key', note: 'less walking, calmer pace' },
  medium: { label: 'Balanced', note: 'some activity, some downtime' },
  high: { label: 'Active', note: 'kids need to burn energy' },
};

const budgetOptions: Record<Budget, { label: string; note: string }> = {
  low: { label: 'Keep it cheap', note: 'favor lower-cost stops' },
  medium: { label: 'Moderate', note: 'one or two paid anchors' },
  splurge: { label: 'Splurge is okay', note: 'best experience wins' },
};

const locationOptions: Record<Location, { label: string; note: string }> = {
  'pigeon-forge': { label: 'Stay in Pigeon Forge', note: 'avoid the Gatlinburg drive' },
  gatlinburg: { label: 'Gatlinburg is fine', note: 'aquarium/food options included' },
  either: { label: 'Either is fine', note: 'best fit wins' },
};

const categoryWeights: Record<string, { energy: Energy[]; groups: Group[]; time: TimeWindow[] }> = {
  snow: { energy: ['medium', 'high'], groups: ['toddlers', 'kids', 'teens', 'mixed'], time: ['half', 'full', 'evening'] },
  indoor: { energy: ['low', 'medium'], groups: ['kids', 'teens', 'adults', 'mixed'], time: ['half', 'full'] },
  water: { energy: ['low', 'medium'], groups: ['toddlers', 'kids', 'teens', 'mixed'], time: ['half', 'full'] },
  'escape-room': { energy: ['medium'], groups: ['teens', 'couples', 'adults'], time: ['half', 'evening'] },
  shows: { energy: ['low'], groups: ['toddlers', 'kids', 'adults', 'mixed', 'couples'], time: ['evening', 'full'] },
  food: { energy: ['low'], groups: ['couples', 'adults', 'mixed'], time: ['half', 'full', 'evening'] },
  'mini-golf': { energy: ['medium', 'high'], groups: ['toddlers', 'kids', 'teens', 'couples', 'mixed'], time: ['half', 'evening'] },
  outdoor: { energy: ['medium'], groups: ['kids', 'teens', 'mixed'], time: ['half', 'full', 'evening'] },
};

function priceScore(priceRange: string, budget: Budget) {
  const level = priceRange === '$' ? 1 : priceRange === '$$' ? 2 : 3;
  if (budget === 'low') return 5 - level;
  if (budget === 'medium') return level === 2 ? 4 : 2;
  return level;
}

function locationScore(attraction: RainyAttraction, location: Location) {
  const text = `${attraction.name} ${attraction.shortDesc}`.toLowerCase();
  const isGatlinburg = text.includes('gatlinburg');
  if (location === 'either') return 0;
  if (location === 'gatlinburg') return isGatlinburg ? 3 : 0;
  return isGatlinburg ? -4 : 2;
}

function dollarsLabel(priceRange: string) {
  return priceRange === '$' ? 'Lower cost' : priceRange === '$$' ? 'Moderate cost' : 'Splurge';
}

function ChoiceGroup<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: Record<T, { label: string; note: string }>; onChange: (value: T) => void }) {
  return (
    <fieldset className="rounded-3xl border border-[oklch(0.86_0.045_84)] bg-white p-5 shadow-sm">
      <legend className="mb-3 text-sm font-black text-[oklch(0.25_0.075_155)]">{label}</legend>
      <div className="grid gap-2 md:grid-cols-3">
        {(Object.entries(options) as [T, { label: string; note: string }][]).map(([key, option]) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`rounded-2xl border px-4 py-3 text-left transition ${
              value === key
                ? 'border-[oklch(0.43_0.13_154)] bg-[oklch(0.92_0.055_150)] shadow-sm'
                : 'border-[oklch(0.88_0.035_84)] bg-[oklch(0.997_0.015_84)] hover:border-[oklch(0.55_0.12_155)]'
            }`}
          >
            <span className="block text-sm font-black text-[oklch(0.24_0.075_155)]">{option.label}</span>
            <span className="mt-1 block text-xs font-semibold leading-5 text-[oklch(0.50_0.045_125)]">{option.note}</span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function RainyDayPlanner({ attractions }: { attractions: RainyAttraction[] }) {
  const [group, setGroup] = useState<Group>('mixed');
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('full');
  const [energy, setEnergy] = useState<Energy>('medium');
  const [budget, setBudget] = useState<Budget>('medium');
  const [location, setLocation] = useState<Location>('pigeon-forge');
  const [mustIncludeSnow, setMustIncludeSnow] = useState(true);
  const [includeDinnerShow, setIncludeDinnerShow] = useState(true);

  const plan = useMemo(() => {
    const scored = attractions.map((attraction) => {
      const weights = categoryWeights[attraction.category] || categoryWeights.indoor;
      let score = attraction.rating;
      if (attraction.tags.includes('rainy-day')) score += 4;
      if (attraction.tags.includes('indoor')) score += 3;
      if (attraction.isFeaturedPFS) score += mustIncludeSnow ? 8 : 2;
      if (weights.groups.includes(group)) score += 3;
      if (weights.energy.includes(energy)) score += 2;
      if (weights.time.includes(timeWindow)) score += 2;
      if (group === 'toddlers' && attraction.tags.includes('toddler-friendly')) score += 4;
      if (group === 'teens' && attraction.tags.includes('teens')) score += 3;
      if (group === 'couples' && attraction.tags.includes('couples')) score += 3;
      if (!includeDinnerShow && attraction.category === 'shows') score -= 8;
      score += priceScore(attraction.priceRange, budget);
      score += locationScore(attraction, location);
      return { attraction, score };
    });

    const sorted = scored.sort((a, b) => b.score - a.score).map((item) => item.attraction);
    const snow = sorted.find((item) => item.id === 'pigeon-forge-snow');
    const show = sorted.find((item) => item.category === 'shows');
    const primary = sorted.filter((item) => item.id !== snow?.id && item.id !== show?.id);
    const slots = timeOptions[timeWindow].slots;
    const chosen: RainyAttraction[] = [];
    if (mustIncludeSnow && snow) chosen.push(snow);
    chosen.push(...primary.slice(0, Math.max(0, slots - chosen.length - (includeDinnerShow && timeWindow !== 'half' && show ? 1 : 0))));
    if (includeDinnerShow && timeWindow !== 'half' && show && chosen.length < slots) chosen.push(show);
    if (!mustIncludeSnow && chosen.length < slots) chosen.push(...sorted.filter((item) => !chosen.some((c) => c.id === item.id)).slice(0, slots - chosen.length));

    const backups = sorted.filter((item) => !chosen.some((c) => c.id === item.id)).slice(0, 4);
    return { chosen, backups };
  }, [attractions, group, timeWindow, energy, budget, location, mustIncludeSnow, includeDinnerShow]);

  const slotLabels = timeWindow === 'evening' ? ['Early evening', 'After dinner'] : timeWindow === 'half' ? ['First stop', 'Second stop'] : ['Morning', 'Lunch / reset', 'Afternoon', 'Evening'];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="grid gap-5" aria-label="Rainy day planner inputs">
        <ChoiceGroup label="Who needs to be happy?" value={group} options={groupOptions} onChange={setGroup} />
        <ChoiceGroup label="How much rainy-day time do you need to fill?" value={timeWindow} options={timeOptions} onChange={setTimeWindow} />
        <ChoiceGroup label="Energy level" value={energy} options={energyOptions} onChange={setEnergy} />
        <ChoiceGroup label="Budget" value={budget} options={budgetOptions} onChange={setBudget} />
        <ChoiceGroup label="Location preference" value={location} options={locationOptions} onChange={setLocation} />

        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={() => setMustIncludeSnow(!mustIncludeSnow)} className={`rounded-3xl border p-5 text-left font-black transition ${mustIncludeSnow ? 'border-[oklch(0.43_0.13_154)] bg-[oklch(0.92_0.055_150)]' : 'border-[oklch(0.86_0.045_84)] bg-white'}`}>
            Prioritize Pigeon Forge Snow
            <span className="mt-1 block text-sm font-semibold text-[oklch(0.50_0.045_125)]">{mustIncludeSnow ? 'Yes, make it the anchor' : 'No, just include if it fits'}</span>
          </button>
          <button type="button" onClick={() => setIncludeDinnerShow(!includeDinnerShow)} className={`rounded-3xl border p-5 text-left font-black transition ${includeDinnerShow ? 'border-[oklch(0.43_0.13_154)] bg-[oklch(0.92_0.055_150)]' : 'border-[oklch(0.86_0.045_84)] bg-white'}`}>
            Include a dinner show
            <span className="mt-1 block text-sm font-semibold text-[oklch(0.50_0.045_125)]">{includeDinnerShow ? 'Good for full-day plans' : 'Skip shows for now'}</span>
          </button>
        </div>
      </section>

      <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Generated rainy day plan">
        <div className="overflow-hidden rounded-[2rem] border border-[oklch(0.33_0.1_155)] bg-[oklch(0.22_0.08_155)] text-[oklch(0.985_0.02_84)] shadow-2xl">
          <div className="snow-badge p-6">
            <div className="text-sm font-black uppercase tracking-[0.14em] text-[oklch(0.84_0.14_82)]">Your rainy-day plan</div>
            <div className="mt-2 text-4xl font-black tracking-tight">{timeOptions[timeWindow].label}</div>
            <p className="mt-3 text-sm leading-6 text-[oklch(0.92_0.03_86)]">
              Built for {groupOptions[group].label.toLowerCase()}, {energyOptions[energy].label.toLowerCase()} energy, and a {budgetOptions[budget].label.toLowerCase()} budget.
            </p>
          </div>

          <div className="space-y-4 p-6">
            {plan.chosen.map((attraction, index) => (
              <div key={attraction.id} className="rounded-3xl bg-white/10 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.12em] text-[oklch(0.84_0.14_82)]">{slotLabels[index] || `Stop ${index + 1}`}</div>
                    <h3 className="mt-1 text-lg font-black text-white">{attraction.name}</h3>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black">{dollarsLabel(attraction.priceRange)}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[oklch(0.9_0.025_86)]">{attraction.shortDesc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {attraction.highlights.slice(0, 2).map((highlight) => (
                    <span key={highlight} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[oklch(0.9_0.025_86)]">{highlight}</span>
                  ))}
                </div>
                {attraction.bookingUrl || attraction.website ? (
                  <a href={attraction.bookingUrl || attraction.website} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex rounded-2xl bg-[oklch(0.78_0.16_78)] px-4 py-2 text-sm font-black text-[oklch(0.22_0.08_80)]">
                    {attraction.isFeaturedPFS ? 'Book Pigeon Forge Snow' : 'Check current details'}
                  </a>
                ) : null}
              </div>
            ))}

            <div className="rounded-3xl border border-white/10 p-4">
              <div className="text-sm font-black text-[oklch(0.84_0.14_82)]">Backup swaps</div>
              <div className="mt-3 grid gap-2">
                {plan.backups.map((attraction) => (
                  <div key={attraction.id} className="flex items-center justify-between gap-3 text-sm">
                    <span>{attraction.name}</span>
                    <span className="font-black text-[oklch(0.84_0.14_82)]">★ {attraction.rating}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
