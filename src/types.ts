export interface Lead {
  id: string;
  name: string;
  country: string;
  phone: string;
  investmentAmount: string; // Used for "Optional Investment Interest / Tier"
  notes?: string; // Additional optional messages/questions
  submittedAt: string;
}

export interface ValuationRow {
  category: string;
  details: string;
  valuation: number;
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}
