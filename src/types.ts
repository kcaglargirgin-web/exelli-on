export interface CapabilityItem {
  id: string;
  title: string;
  shortDesc: string;
  detail: string;
  iconName: string;
  metrics: string;
}

export interface SectorBullet {
  sector: string;
  description: string;
}

export interface SolutionItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  problem: string;
  whatWeDo: string;
  keyDeliverables: string[];
  supportedDomains?: string[];
  sectorBullets?: SectorBullet[];
  scopeHighlights?: { title: string; desc: string }[];
}

export interface ContactFormState {
  fullName: string;
  email: string;
  vision: string;
}

