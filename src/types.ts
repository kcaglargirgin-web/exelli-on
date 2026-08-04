export interface CapabilityItem {
  id: string;
  title: string;
  shortDesc: string;
  detail: string;
  iconName: string;
  metrics: string;
}

export interface SolutionItem {
  id: string;
  number: string;
  title: string;
  description: string;
  longDescription: string;
  keyBenefits: string[];
  deploymentTime: string;
}

export interface ContactFormState {
  fullName: string;
  email: string;
  vision: string;
}
