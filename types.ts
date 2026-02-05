
export enum UserRole {
  PRIVATI = 'privati',
  PROFESSIONISTI = 'professionisti'
}

export interface BetaSignup {
  id?: string;
  email: string;
  role: UserRole;
  createdAt: any; // Firestore Timestamp
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}
