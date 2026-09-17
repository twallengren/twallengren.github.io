export interface Experience {
  company: string;
  role: string;
  period?: string;
  summary: string;
}

// Earlier operations/analytics dates were not supplied; leave them unspecified.
export const experience: Experience[] = [
  {
    company: 'Addepar',
    role: 'Staff Product Manager · Calculations',
    period: 'Oct 2024–present',
    summary: 'Led the derivatives product area, improving development processes and ownership. Delivered a new underlying-asset data model, Black–Scholes pricing for European options, and a Brazil-specific investment-return methodology.',
  },
  {
    company: 'Addepar',
    role: 'Software Engineer',
    period: 'Aug 2021–Sep 2024',
    summary: 'Built custodian ETL pipelines and supporting infrastructure, integrated Plaid and Coinbase, and helped move data processing from a legacy feeds framework to Databricks.',
  },
  {
    company: 'PassiveLogic',
    role: 'Computational Physics Engineer',
    period: 'Sep 2020–Jun 2021',
    summary: 'Joined as an intern in September 2020, becoming an engineer in March 2021. Modelled physical systems and pressurised water loops, analysed stability, and built a Swift framework to turn mathematical models into simulations.',
  },
  {
    company: 'Addepar',
    role: 'Operations & analytics',
    summary: 'Earlier work in operations and analytics provided a practical grounding in financial data and the people who use it.',
  },
];

export const highlights = [
  { title: 'Derivatives', detail: 'Product leadership across pricing and the underlying-asset model.' },
  { title: 'Return methodology', detail: 'Calculation work tailored to the Brazilian market.' },
  { title: '≈50× faster', detail: 'An improvement to one core return calculation.' },
];
