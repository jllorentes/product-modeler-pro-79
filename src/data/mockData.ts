export interface Product {
  id: string;
  globalId: string;
  name: string;
  type: string;
  provider: string;
  basePrice: number;
  status: "Active" | "Draft" | "Archived";
  country: string;
}

export const mockProducts: Product[] = [
  { id: "1", globalId: "SPM-DE-10234", name: "PlusGuarantee 5Y", type: "Warranty", provider: "Zurich Insurance", basePrice: 9.99, status: "Active", country: "DE" },
  { id: "2", globalId: "SPM-DE-10235", name: "SmartProtect 3Y", type: "Warranty", provider: "Allianz Partners", basePrice: 7.49, status: "Active", country: "DE" },
  { id: "3", globalId: "SPM-AT-20100", name: "TechCare Premium", type: "Digital Subscription", provider: "MediaMarkt Digital", basePrice: 4.99, status: "Draft", country: "AT" },
  { id: "4", globalId: "SPM-NL-30050", name: "HomeGuard Basic", type: "Warranty", provider: "Zurich Insurance", basePrice: 3.99, status: "Active", country: "NL" },
  { id: "5", globalId: "SPM-DE-10240", name: "DataSafe Cloud 1TB", type: "Digital Subscription", provider: "Saturn Digital", basePrice: 2.99, status: "Archived", country: "DE" },
  { id: "6", globalId: "SPM-ES-40010", name: "ExtendPlus 2Y", type: "Warranty", provider: "Mapfre Seguros", basePrice: 5.99, status: "Draft", country: "ES" },
  { id: "7", globalId: "SPM-IT-50020", name: "GaranziaTotale 4Y", type: "Warranty", provider: "Generali Italia", basePrice: 11.49, status: "Active", country: "IT" },
  { id: "8", globalId: "SPM-DE-10250", name: "StreamBundle Pro", type: "Digital Subscription", provider: "MediaMarkt Digital", basePrice: 14.99, status: "Active", country: "DE" },
];

export const spmMockData = {
  name: "PlusGuarantee 5Y",
  provider: "Zurich Insurance",
  cancelPeriod: "30 days",
  productCategory: "Extended Warranty",
  coverageType: "Full Coverage (Accidental + Defect)",
  maxClaimValue: "€2,000.00",
  isRecurring: true,
  isB2B: false,
};

export const dunningProfiles = [
  "Standard DE (3 Reminders)",
  "Standard AT (2 Reminders)",
  "Aggressive NL (5 Reminders)",
  "Soft ES (1 Reminder + Grace Period)",
];

export const reactivationPolicies = [
  "Allowed within 30 days",
  "Allowed within 14 days",
  "Not allowed",
  "Allowed with penalty fee",
];

export const billingCompanies = [
  "MediaMarkt Saturn DE",
  "MediaMarkt Saturn AT",
  "MediaMarkt NL",
  "MediaMarkt ES",
  "MediaMarkt IT",
];

export const workflowConfigurations = [
  "Auto-approval + Welcome Email",
  "Manual approval required",
  "Auto-approval only",
  "Auto-approval + Welcome Email + SMS",
];

export const provisioningSets = [
  "Zurich API V2",
  "Zurich API V1 (Legacy)",
  "Allianz Connect API",
  "Mapfre Digital Gateway",
  "Internal Provisioning",
];

export const countries = ["DE", "AT", "NL", "ES", "IT", "FR", "PL"];
