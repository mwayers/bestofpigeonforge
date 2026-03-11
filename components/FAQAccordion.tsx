'use client';

import { useState } from 'react';
import type { FAQ } from '@/lib/types';

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-gray-50 transition-colors"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            <span className="font-medium text-gray-900 text-sm pr-4">{faq.question}</span>
            <span className={`text-[#1B4332] transition-transform flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {openIndex === index && (
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
