import Link from 'next/link';

export default function RainyDayPlannerCTA({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`${compact ? 'my-6' : 'mb-10'} overflow-hidden rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-[#1B4332]/5 p-5 shadow-sm`} aria-labelledby="rainy-day-planner-cta">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-2xl" aria-hidden="true">🌧️</div>
          <div>
            <h2 id="rainy-day-planner-cta" className="text-lg font-black text-gray-900">Build a rainy-day backup plan</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Generate a custom indoor Pigeon Forge plan by group, time, budget, energy level, and location.
            </p>
          </div>
        </div>
        <Link
          href="/tools/rainy-day-indoor-planner"
          className="inline-flex flex-shrink-0 items-center justify-center rounded-xl bg-[#1B4332] px-4 py-2.5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#143326]"
        >
          Open planner →
        </Link>
      </div>
    </section>
  );
}
