'use client';

import { useMemo, useState } from 'react';

type Season = 'off' | 'normal' | 'peak';
type LodgingType = 'hotel' | 'condo' | 'cabin';
type Transport = 'own-car' | 'rental' | 'rideshare';

type Attraction = {
  id: string;
  name: string;
  adult: number;
  child: number;
  note: string;
  selectedDefault?: boolean;
};

const seasonOptions: Record<Season, { label: string; multiplier: number; note: string }> = {
  off: { label: 'Off-season', multiplier: 0.86, note: 'Jan-Feb, some weekdays, slower periods' },
  normal: { label: 'Normal', multiplier: 1, note: 'most spring/fall weekdays and non-holiday dates' },
  peak: { label: 'Peak', multiplier: 1.28, note: 'summer, holidays, fall foliage, busy weekends' },
};

const lodgingDefaults: Record<LodgingType, { label: string; nightly: number; fee: number; note: string }> = {
  hotel: { label: 'Hotel', nightly: 165, fee: 35, note: 'lower fees, smaller room, easier parking' },
  condo: { label: 'Condo', nightly: 225, fee: 95, note: 'more space, usually some cleaning/resort fees' },
  cabin: { label: 'Cabin', nightly: 310, fee: 165, note: 'best for groups, higher cleaning/service fees' },
};

const transportOptions: Record<Transport, { label: string; daily: number; fixed: number; note: string }> = {
  'own-car': { label: 'Driving own car', daily: 18, fixed: 40, note: 'parking, gas around town, small misc. transport costs' },
  rental: { label: 'Rental car', daily: 78, fixed: 55, note: 'rental, parking, gas, fees estimate' },
  rideshare: { label: 'Rideshare / shuttle', daily: 95, fixed: 0, note: 'Uber/Lyft style local trips can add up fast' },
};

const attractionOptions: Attraction[] = [
  { id: 'pfs', name: 'Pigeon Forge Snow', adult: 37, child: 37, note: 'indoor snow tubing, year-round', selectedDefault: true },
  { id: 'dollywood', name: 'Dollywood', adult: 92, child: 82, note: 'full theme park day', selectedDefault: true },
  { id: 'dinner-show', name: 'Dinner show', adult: 65, child: 38, note: 'Dolly/Paula-style dinner show' },
  { id: 'island', name: 'The Island attractions', adult: 35, child: 30, note: 'rides, wheel, arcades, treats', selectedDefault: true },
  { id: 'mountain-coaster', name: 'Mountain coaster', adult: 18, child: 14, note: 'one ride per person' },
  { id: 'mini-golf', name: 'Mini golf', adult: 16, child: 12, note: 'one round' },
  { id: 'museum', name: 'Museum / indoor attraction', adult: 30, child: 22, note: 'Titanic, WonderWorks, etc.' },
  { id: 'national-park', name: 'Smokies day', adult: 8, child: 5, note: 'parking tag/snacks, mostly free' },
];

const mealDefaults = {
  groceries: 18,
  quick: 16,
  casual: 28,
  nicer: 48,
  treats: 9,
};

function dollars(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.max(0, value));
}

function NumberField({ label, value, min, max, step = 1, prefix, suffix, onChange }: { label: string; value: number; min: number; max: number; step?: number; prefix?: string; suffix?: string; onChange: (value: number) => void }) {
  return (
    <label className="block rounded-3xl border border-[oklch(0.86_0.045_84)] bg-white p-5 shadow-sm">
      <span className="text-sm font-black text-[oklch(0.25_0.075_155)]">{label}</span>
      <div className="mt-3 flex items-center rounded-2xl border border-[oklch(0.82_0.045_84)] bg-[oklch(0.985_0.025_84)] px-4 focus-within:border-[oklch(0.43_0.13_154)]">
        {prefix && <span className="font-black text-[oklch(0.48_0.045_125)]">{prefix}</span>}
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Math.min(max, Math.max(min, Number(event.target.value) || 0)))}
          className="w-full bg-transparent px-2 py-3 text-lg font-black text-[oklch(0.24_0.075_155)] outline-none"
        />
        {suffix && <span className="font-black text-[oklch(0.48_0.045_125)]">{suffix}</span>}
      </div>
    </label>
  );
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

export default function TripCostCalculator() {
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(2);
  const [nights, setNights] = useState(3);
  const [season, setSeason] = useState<Season>('normal');
  const [lodgingType, setLodgingType] = useState<LodgingType>('cabin');
  const [nightlyRate, setNightlyRate] = useState(lodgingDefaults.cabin.nightly);
  const [lodgingFees, setLodgingFees] = useState(lodgingDefaults.cabin.fee);
  const [lodgingTaxPercent, setLodgingTaxPercent] = useState(12.75);
  const [transport, setTransport] = useState<Transport>('own-car');
  const [selectedAttractions, setSelectedAttractions] = useState<Record<string, boolean>>(
    Object.fromEntries(attractionOptions.map((attraction) => [attraction.id, !!attraction.selectedDefault])),
  );
  const [groceries, setGroceries] = useState(1);
  const [quickMeals, setQuickMeals] = useState(4);
  const [casualMeals, setCasualMeals] = useState(3);
  const [nicerMeals, setNicerMeals] = useState(1);
  const [treatStops, setTreatStops] = useState(4);
  const [souvenirPerPerson, setSouvenirPerPerson] = useState(35);
  const [misc, setMisc] = useState(75);
  const [cushionPercent, setCushionPercent] = useState(12);

  function applyLodgingPreset(type: LodgingType) {
    setLodgingType(type);
    setNightlyRate(lodgingDefaults[type].nightly);
    setLodgingFees(lodgingDefaults[type].fee);
  }

  const result = useMemo(() => {
    const people = adults + kids;
    const days = nights + 1;
    const childEquivalent = kids * 0.72;
    const foodPeople = adults + childEquivalent;
    const adjustedNightly = nightlyRate * seasonOptions[season].multiplier;
    const lodgingBase = adjustedNightly * nights;
    const lodgingTax = (lodgingBase + lodgingFees) * (lodgingTaxPercent / 100);
    const lodgingTotal = lodgingBase + lodgingFees + lodgingTax;

    const mealsTotal =
      groceries * mealDefaults.groceries * foodPeople +
      quickMeals * mealDefaults.quick * foodPeople +
      casualMeals * mealDefaults.casual * foodPeople +
      nicerMeals * mealDefaults.nicer * foodPeople +
      treatStops * mealDefaults.treats * foodPeople;

    const attractionLines = attractionOptions
      .filter((attraction) => selectedAttractions[attraction.id])
      .map((attraction) => ({
        ...attraction,
        total: attraction.adult * adults + attraction.child * kids,
      }));
    const attractionsTotal = attractionLines.reduce((sum, attraction) => sum + attraction.total, 0);
    const transportTotal = transportOptions[transport].fixed + transportOptions[transport].daily * days;
    const extrasTotal = souvenirPerPerson * people + misc;
    const subtotal = lodgingTotal + mealsTotal + attractionsTotal + transportTotal + extrasTotal;
    const cushion = subtotal * (cushionPercent / 100);
    const total = subtotal + cushion;

    return {
      people,
      days,
      adjustedNightly,
      lodgingBase,
      lodgingTax,
      lodgingTotal,
      mealsTotal,
      attractionLines,
      attractionsTotal,
      transportTotal,
      extrasTotal,
      subtotal,
      cushion,
      total,
      perPerson: total / people,
      perDay: total / days,
    };
  }, [adults, kids, nights, season, nightlyRate, lodgingFees, lodgingTaxPercent, groceries, quickMeals, casualMeals, nicerMeals, treatStops, selectedAttractions, transport, souvenirPerPerson, misc, cushionPercent]);

  const breakdown = [
    ['Lodging', result.lodgingTotal],
    ['Food & treats', result.mealsTotal],
    ['Attractions', result.attractionsTotal],
    ['Transportation', result.transportTotal],
    ['Extras', result.extrasTotal],
    ['Cushion', result.cushion],
  ] as const;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
      <section className="grid gap-5" aria-label="Detailed trip cost inputs">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <NumberField label="Adults" value={adults} min={1} max={16} onChange={setAdults} />
          <NumberField label="Kids" value={kids} min={0} max={16} onChange={setKids} />
          <NumberField label="Nights" value={nights} min={1} max={21} onChange={setNights} />
        </div>

        <ChoiceGroup label="When are you going?" value={season} options={seasonOptions} onChange={setSeason} />

        <section className="rounded-[2rem] border border-[oklch(0.86_0.045_84)] bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-black text-[oklch(0.24_0.075_155)]">Lodging</h2>
              <p className="text-sm font-semibold text-[oklch(0.50_0.045_125)]">Pick a preset, then adjust the actual rate and fees.</p>
            </div>
            <div className="text-sm font-black text-[oklch(0.36_0.12_155)]">Adjusted nightly: {dollars(result.adjustedNightly)}</div>
          </div>
          <div className="mb-4 grid gap-2 md:grid-cols-3">
            {(Object.entries(lodgingDefaults) as [LodgingType, typeof lodgingDefaults[LodgingType]][]).map(([key, option]) => (
              <button key={key} type="button" onClick={() => applyLodgingPreset(key)} className={`rounded-2xl border px-4 py-3 text-left transition ${lodgingType === key ? 'border-[oklch(0.43_0.13_154)] bg-[oklch(0.92_0.055_150)]' : 'border-[oklch(0.88_0.035_84)] bg-[oklch(0.997_0.015_84)]'}`}>
                <span className="block text-sm font-black">{option.label}</span>
                <span className="mt-1 block text-xs font-semibold text-[oklch(0.50_0.045_125)]">{option.note}</span>
              </button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <NumberField label="Nightly rate" value={nightlyRate} min={50} max={2500} prefix="$" onChange={setNightlyRate} />
            <NumberField label="Cleaning / resort fees" value={lodgingFees} min={0} max={1500} prefix="$" onChange={setLodgingFees} />
            <NumberField label="Lodging tax" value={lodgingTaxPercent} min={0} max={25} step={0.25} suffix="%" onChange={setLodgingTaxPercent} />
          </div>
        </section>

        <section className="rounded-[2rem] border border-[oklch(0.86_0.045_84)] bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-[oklch(0.24_0.075_155)]">Meals & snacks</h2>
          <p className="mt-1 text-sm font-semibold text-[oklch(0.50_0.045_125)]">Enter how many of each meal type your group expects for the whole trip.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <NumberField label="Grocery days" value={groceries} min={0} max={21} onChange={setGroceries} />
            <NumberField label="Quick meals" value={quickMeals} min={0} max={60} onChange={setQuickMeals} />
            <NumberField label="Casual meals" value={casualMeals} min={0} max={60} onChange={setCasualMeals} />
            <NumberField label="Nicer meals" value={nicerMeals} min={0} max={30} onChange={setNicerMeals} />
            <NumberField label="Treat stops" value={treatStops} min={0} max={60} onChange={setTreatStops} />
          </div>
        </section>

        <section className="rounded-[2rem] border border-[oklch(0.86_0.045_84)] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-[oklch(0.24_0.075_155)]">Attractions</h2>
              <p className="text-sm font-semibold text-[oklch(0.50_0.045_125)]">Toggle real line items instead of choosing low/medium/high.</p>
            </div>
            <div className="text-sm font-black text-[oklch(0.36_0.12_155)]">{dollars(result.attractionsTotal)}</div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {attractionOptions.map((attraction) => (
              <button
                key={attraction.id}
                type="button"
                onClick={() => setSelectedAttractions((current) => ({ ...current, [attraction.id]: !current[attraction.id] }))}
                className={`rounded-2xl border p-4 text-left transition ${selectedAttractions[attraction.id] ? 'border-[oklch(0.43_0.13_154)] bg-[oklch(0.92_0.055_150)]' : 'border-[oklch(0.88_0.035_84)] bg-[oklch(0.997_0.015_84)] hover:border-[oklch(0.55_0.12_155)]'}`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span>
                    <span className="block text-sm font-black text-[oklch(0.24_0.075_155)]">{attraction.name}</span>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-[oklch(0.50_0.045_125)]">{attraction.note}</span>
                  </span>
                  <span className="whitespace-nowrap text-sm font-black text-[oklch(0.36_0.12_155)]">{dollars(attraction.adult * adults + attraction.child * kids)}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <ChoiceGroup label="Transportation" value={transport} options={transportOptions} onChange={setTransport} />

        <section className="rounded-[2rem] border border-[oklch(0.86_0.045_84)] bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-[oklch(0.24_0.075_155)]">Extras & safety margin</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <NumberField label="Souvenirs per person" value={souvenirPerPerson} min={0} max={500} prefix="$" onChange={setSouvenirPerPerson} />
            <NumberField label="Misc. trip costs" value={misc} min={0} max={1500} prefix="$" onChange={setMisc} />
            <NumberField label="Cushion" value={cushionPercent} min={0} max={30} suffix="%" onChange={setCushionPercent} />
          </div>
        </section>
      </section>

      <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Estimated trip cost">
        <div className="overflow-hidden rounded-[2rem] border border-[oklch(0.33_0.1_155)] bg-[oklch(0.22_0.08_155)] text-[oklch(0.985_0.02_84)] shadow-2xl">
          <div className="snow-badge p-6">
            <div className="text-sm font-black uppercase tracking-[0.14em] text-[oklch(0.84_0.14_82)]">Estimated total</div>
            <div className="mt-2 text-5xl font-black tracking-tight">{dollars(result.total)}</div>
            <p className="mt-3 text-sm leading-6 text-[oklch(0.92_0.03_86)]">
              {result.people} travelers, {result.days} days, {nights} nights. {dollars(result.perPerson)} per person, about {dollars(result.perDay)} per trip day.
            </p>
          </div>

          <div className="space-y-4 p-6">
            <div className="space-y-3">
              {breakdown.map(([label, value]) => {
                const percent = result.total ? Math.round((value / result.total) * 100) : 0;
                return (
                  <div key={label}>
                    <div className="mb-1 flex items-center justify-between gap-4 text-sm">
                      <span className="font-bold text-[oklch(0.88_0.03_86)]">{label}</span>
                      <span className="font-black">{dollars(value)} · {percent}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-[oklch(0.78_0.16_78)]" style={{ width: `${Math.min(100, percent)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-3xl bg-white/10 p-4">
              <div className="text-sm font-black text-[oklch(0.84_0.14_82)]">Selected attractions</div>
              <div className="mt-3 space-y-2">
                {result.attractionLines.length ? result.attractionLines.map((attraction) => (
                  <div key={attraction.id} className="flex items-center justify-between gap-3 text-xs">
                    <span className="text-[oklch(0.88_0.03_86)]">{attraction.name}</span>
                    <span className="font-black">{dollars(attraction.total)}</span>
                  </div>
                )) : <p className="text-sm text-[oklch(0.86_0.03_86)]">No paid attractions selected.</p>}
              </div>
            </div>

            <div className="rounded-3xl bg-white/10 p-4">
              <div className="text-sm font-black text-[oklch(0.84_0.14_82)]">Smart splurge</div>
              <p className="mt-2 text-sm leading-6 text-[oklch(0.9_0.025_86)]">
                If weather is uncertain, keep one indoor anchor in the plan. Pigeon Forge Snow works year-round, is easy to explain to kids, and is a clean backup if mountain weather ruins outdoor plans.
              </p>
              <a href="https://pigeonforgesnow.com" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex rounded-2xl bg-[oklch(0.78_0.16_78)] px-4 py-2 text-sm font-black text-[oklch(0.22_0.08_80)]">
                Check Pigeon Forge Snow
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
