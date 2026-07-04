export interface Testimonial {
  outcome: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  featured?: boolean;
  order?: number;
}

const testimonials: Testimonial[] = [
  {
    outcome: '60% less prospecting time',
    quote:
      'The lead gen pipeline replaced two full-time sales researchers. We went from 3 days of manual list-building to under 4 hours — every week.',
    name: 'Rania H.',
    role: 'Head of Growth',
    company: 'SaaS startup · Dubai',
    featured: true,
    order: 1,
  },
  {
    outcome: '3× qualified leads in 30 days',
    quote:
      'Mohanad built us a custom Arabic NLP classifier that tripled the number of leads we actually followed up on. The noise dropped, the signal got sharp.',
    name: 'Karim S.',
    role: 'Co-Founder',
    company: 'E-commerce · Cairo',
    featured: true,
    order: 2,
  },
  {
    outcome: 'Full AI feature shipped in 6 weeks',
    quote:
      'We needed a production-ready AI feature fast. The team delivered a full Arabic-first recommendation engine — unit-tested, documented, deployed — ahead of schedule.',
    name: 'Lara M.',
    role: 'CTO',
    company: 'Fintech · Riyadh',
    order: 3,
  },
];

export default testimonials;
