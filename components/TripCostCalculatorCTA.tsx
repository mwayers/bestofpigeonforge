import Link from 'next/link';

export default function TripCostCalculatorCTA({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`${compact ? 'my-6' : 'mb-10'} overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-[#1B4332]/5 p-5 shadow-sm`} aria-labelledby="trip-cost-calculator-cta">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-2xl" aria-hidden="true">💸</div>
          <div>
            <h2 id="trip-cost-calculator-cta" className="text-lg font-black text-gray-900">Estimate your Pigeon Forge trip cost</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Build a real vacation budget with lodging, meals, attractions, transportation, fees, and extras.
            </p>
          </div>
        </div>
        <Link
          href="/tools/pigeon-forge-trip-cost-calculator"
          className="inline-flex flex-shrink-0 items-center justify-center rounded-xl bg-[#1B4332] px-4 py-2.5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#143326]"
        >
          Open calculator →
        </Link>
      </div>
    </section>
  );
}
