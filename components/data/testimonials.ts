export interface Testimonial {
  outcome: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  featured?: boolean;
  order?: number;
}

// Intentionally empty — do not invent client quotes.
// Populate only from owner-approved, attributable testimonials (env/API or curated list).
const testimonials: Testimonial[] = [];

export default testimonials;
