'use client';

import { useMemo, useState } from 'react';

type LodgingStyle = 'budget' | 'mid' | 'cabin' | 'premium';
type FoodStyle = 'budget' | 'mixed' | 'restaurant';
type Pace = 'light' | 'balanced' | 'packed';

const lodgingRates: Record<LodgingStyle, { label: string; nightly: number; note: string }> = {
  budget: { label: 'Budget hotel', nightly: 115, note: 'simple hotel or motel' },
  mid: { label: 'Mid-range hotel/condo', nightly: 185, note: 'typical family hotel or condo' },
  cabin: { label: 'Cabin rental', nightly: 275, note: 'private cabin, often best for groups' },
  premium: { label: 'Premium cabin/resort', nightly: 425, note: 'larger cabin, resort, or peak dates' },
};

const foodRates: Record<FoodStyle, { label: string; dailyPerPerson: number; note: string }> = {
  budget: { label: 'Mostly budget', dailyPerPerson: 28, note: 'groceries, quick service, snacks' },
  mixed: { label: 'Mixed meals', dailyPerPerson: 48, note: 'quick breakfast/lunch plus casual dinner' },
  restaurant: { label: 'Restaurant-heavy', dailyPerPerson: 76, note: 'sit-down meals and treats' },
};

const activityRates: Record<Pace, { label: string; dailyPerPerson: number; note: string }> = {
  light: { label: 'Light', dailyPerPerson: 28, note: 'one paid attraction some days' },
  balanced: { label: 'Balanced', dailyPerPerson: 55, note: 'one main attraction most days' },
  packed: { label: 'Packed', dailyPerPerson: 92, note: 'multiple paid attractions or shows' },
};

function dollars(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function NumberInput({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return (
    <label className="block rounded-3xl border border-[oklch(0.86_0.045_84)] bg-white p-5 shadow-sm">
      <span className="text-sm font-black text-[oklch(0.25_0.075_155)]">{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Math.min(max, Math.max(min, Number(event.target.value) || min)))}
        className="mt-3 w-full rounded-2xl border border-[oklch(0.82_0.045_84)] bg-[oklch(0.985_0.025_84)] px-4 py-3 text-lg font-black text-[oklch(0.24_0.075_155)] outline-none focus:border-[oklch(0.43_0.13_154)]"
      />
    </label>
  );
}

function OptionGroup<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: Record<T, { label: string; note: string }>; onChange: (value: T) => void }) {
  return (
    <fieldset className="rounded-3xl border border-[oklch(0.86_0.045_84)] bg-white p-5 shadow-sm">
      <legend className="mb-3 text-sm font-black text-[oklch(0.25_0.075_155)]">{label}</legend>
      <div className="grid gap-2">
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
            <span className="mt-1 block text-xs font-semibold text-[oklch(0.50_0.045_125)]">{option.note}</span>
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
  const [lodging, setLodging] = useState<LodgingStyle>('mid');
  const [food, setFood] = useState<FoodStyle>('mixed');
  const [pace, setPace] = useState<Pace>('balanced');
  const [parking, setParking] = useState(true);
  const [souvenirs, setSouvenirs] = useState(true);

  const result = useMemo(() => {
    const people = adults + kids;
    const days = Math.max(1, nights + 1);
    const lodgingTotal = lodgingRates[lodging].nightly * nights;
    const foodTotal = foodRates[food].dailyPerPerson * adults * days + foodRates[food].dailyPerPerson * 0.72 * kids * days;
    const activityTotal = activityRates[pace].dailyPerPerson * adults * days + activityRates[pace].dailyPerPerson * 0.78 * kids * days;
    const parkingTotal = parking ? days * 18 : 0;
    const souvenirTotal = souvenirs ? people * 35 : 0;
    const subtotal = lodgingTotal + foodTotal + activityTotal + parkingTotal + souvenirTotal;
    const cushion = subtotal * 0.12;
    const total = subtotal + cushion;
    return { people, days, lodgingTotal, foodTotal, activityTotal, parkingTotal, souvenirTotal, cushion, total };
  }, [adults, kids, nights, lodging, food, pace, parking, souvenirs]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="grid gap-4" aria-label="Trip cost inputs">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <NumberInput label="Adults" value={adults} min={1} max={12} onChange={setAdults} />
          <NumberInput label="Kids" value={kids} min={0} max={12} onChange={setKids} />
          <NumberInput label="Nights" value={nights} min={1} max={14} onChange={setNights} />
        </div>

        <OptionGroup label="Lodging style" value={lodging} options={lodgingRates} onChange={setLodging} />
        <OptionGroup label="Food style" value={food} options={foodRates} onChange={setFood} />
        <OptionGroup label="Attraction pace" value={pace} options={activityRates} onChange={setPace} />

        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={() => setParking(!parking)} className={`rounded-3xl border p-5 text-left font-black transition ${parking ? 'border-[oklch(0.43_0.13_154)] bg-[oklch(0.92_0.055_150)]' : 'border-[oklch(0.86_0.045_84)] bg-white'}`}>
            Parking / local transport
            <span className="mt-1 block text-sm font-semibold text-[oklch(0.50_0.045_125)]">{parking ? 'Included' : 'Not included'}</span>
          </button>
          <button type="button" onClick={() => setSouvenirs(!souvenirs)} className={`rounded-3xl border p-5 text-left font-black transition ${souvenirs ? 'border-[oklch(0.43_0.13_154)] bg-[oklch(0.92_0.055_150)]' : 'border-[oklch(0.86_0.045_84)] bg-white'}`}>
            Souvenirs / extras
            <span className="mt-1 block text-sm font-semibold text-[oklch(0.50_0.045_125)]">{souvenirs ? 'Included' : 'Not included'}</span>
          </button>
        </div>
      </section>

      <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Estimated trip cost">
        <div className="overflow-hidden rounded-[2rem] border border-[oklch(0.33_0.1_155)] bg-[oklch(0.22_0.08_155)] text-[oklch(0.985_0.02_84)] shadow-2xl">
          <div className="snow-badge p-6">
            <div className="text-sm font-black uppercase tracking-[0.14em] text-[oklch(0.84_0.14_82)]">Estimated total</div>
            <div className="mt-2 text-5xl font-black tracking-tight">{dollars(result.total)}</div>
            <p className="mt-3 text-sm leading-6 text-[oklch(0.92_0.03_86)]">
              For {result.people} travelers over {result.days} days / {nights} nights, including a 12% cushion.
            </p>
          </div>
          <div className="space-y-3 p-6">
            {[
              ['Lodging', result.lodgingTotal],
              ['Food', result.foodTotal],
              ['Attractions', result.activityTotal],
              ['Parking / transport', result.parkingTotal],
              ['Souvenirs / extras', result.souvenirTotal],
              ['Trip cushion', result.cushion],
            ].map(([label, value]) => (
              <div key={label as string} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm">
                <span className="font-bold text-[oklch(0.88_0.03_86)]">{label}</span>
                <span className="font-black">{dollars(value as number)}</span>
              </div>
            ))}
            <div className="rounded-3xl bg-white/10 p-4">
              <div className="text-sm font-black text-[oklch(0.84_0.14_82)]">Smart splurge</div>
              <p className="mt-2 text-sm leading-6 text-[oklch(0.9_0.025_86)]">
                If weather is uncertain, reserve at least one indoor activity. Pigeon Forge Snow is a strong backup because it works year-round and does not depend on mountain weather.
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
