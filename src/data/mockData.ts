import { CapabilityItem, SolutionItem } from '../types';

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'cap-1',
    title: 'Strategic Synthesis',
    shortDesc: 'Merging legacy enterprise systems with autonomous neural networks.',
    detail: 'We integrate legacy business software with modern neural models, transforming fragmented corporate data into cohesive, real-time decision intelligence.',
    iconName: 'Layers',
    metrics: 'Seamless Integration // Zero Downtime'
  },
  {
    id: 'cap-2',
    title: 'Human-Centric Design',
    shortDesc: 'Designing interfaces that feel like natural extensions of the mind.',
    detail: 'Prioritizing tactile warmth, mathematical typographic rhythm, and intuitive user flows to make high-tech enterprise software pleasant and natural to navigate.',
    iconName: 'Sparkles',
    metrics: 'High Ergonomics // Instant Adoption'
  },
  {
    id: 'cap-3',
    title: 'Deep Tech R&D',
    shortDesc: 'Exploring the boundaries of quantum computing and mesh security.',
    detail: 'Our engineering lab builds post-quantum lattice encryption, spatial 3D visualization systems, and zero-knowledge data audit protocols.',
    iconName: 'Cpu',
    metrics: 'Future-Proof // NIST Post-Quantum Grade'
  }
];

export const SOLUTIONS: SolutionItem[] = [
  {
    id: 'sol-1',
    number: '01',
    title: 'Future Organization Operating Model with AI',
    tagline: 'Restructuring enterprise operating models around human-AI collaboration to accelerate decision speed and eliminate organizational silos.',
    problem: 'Traditional corporate structures are built around rigid functional silos and slow manual handoffs. As market cycles accelerate, slow cross-departmental communication and top-heavy approval chains create severe execution bottlenecks.',
    whatWeDo: 'We redesign your organizational structure, governance framework, and day-to-day operating models around intelligent AI coordination. Human teams are liberated from repetitive administrative overhead to focus on high-impact strategic decisions while autonomous AI systems streamline operational routing and information flow.',
    keyDeliverables: [
      'AI-native organizational structure & role definition blueprints',
      'Governance, accountability, and ethical oversight framework',
      'Cross-functional decision velocity and workflow architecture',
      'Leadership enablement and operating transition plan'
    ]
  },
  {
    id: 'sol-2',
    number: '02',
    title: 'Digital / AI Twin',
    tagline: 'High-fidelity AI simulation replicas of enterprise business processes, IT architectures, operating models, and organizational systems to stress-test and optimize performance before live execution.',
    problem: 'Making large-scale changes to complex business processes, IT systems, or organizational structures carries high risk. Without real-time simulation, leaders face unpredictable downstream bottlenecks, architectural breaking points, and costly trial-and-error.',
    whatWeDo: 'We build dynamic, data-driven AI Twins that replicate your entire operational reality—not just physical equipment, but core business processes, software architectures, team operating models, and organizational workflows. Connected to real-time telemetry and event logs, our AI Twins allow leadership to run scenario simulations, forecast impact, stress-test restructuring, and optimize system performance with zero operational risk.',
    scopeHighlights: [
      {
        title: 'Business Processes & Workflows',
        desc: 'Simulating end-to-end customer and operational pipelines, identifying hidden friction points, and modeling cycle-time optimizations.'
      },
      {
        title: 'Enterprise IT Architecture',
        desc: 'Mapping complex system dependencies, API traffic, data flow bottlenecks, and stress-testing cloud migrations or new integrations.'
      },
      {
        title: 'Operating Model & Organization',
        desc: 'Simulating cross-functional decision flows, team capacity limits, human-AI handoffs, and governance dynamics under various workloads.'
      },
      {
        title: 'Operational Systems & Strategy',
        desc: 'Testing strategic business decisions, regulatory shifts, and supply chain reconfigurations in a safe predictive sandbox.'
      }
    ],
    keyDeliverables: [
      'End-to-end process & workflow AI twin with live telemetry sync',
      'Enterprise architecture & system dependency simulation model',
      'Operating model velocity & team capacity stress-testing sandbox',
      'Predictive what-if scenario engine and automated KPI forecaster'
    ]
  },
  {
    id: 'sol-3',
    number: '03',
    title: 'Value Engine – Reimagine Processes with AI',
    tagline: 'End-to-end redesign of core business processes with AI to unlock hidden cost savings, eliminate waste, and accelerate execution velocity.',
    problem: 'Most companies merely add superficial software layers on top of outdated 20-year-old processes. This perpetuates structural inefficiencies, slow turnaround times, high operating overhead, and poor customer experience.',
    whatWeDo: 'We analyze your core value chains from first principles, identify every point of operational friction, and rebuild entire workflows around intelligent AI capabilities. Instead of minor incremental patches, we deliver radical throughput speedups and substantial bottom-line cost reductions.',
    keyDeliverables: [
      'End-to-end value stream mapping & friction diagnosis audit',
      'AI-reengineered workflow architecture and automated pipelines',
      'Operational cost reduction and throughput acceleration metrics',
      'Continuous process performance dashboard and KPI tracker'
    ]
  },
  {
    id: 'sol-4',
    number: '04',
    title: 'Neo-Agentic Automation',
    tagline: 'Coordinated multi-agent AI networks that execute multi-step enterprise workflows across disparate tools with human-in-the-loop governance.',
    problem: 'Legacy Robotic Process Automation (RPA) is fragile and breaks whenever user interfaces or data formats change. Meanwhile, skilled knowledge workers waste valuable hours manually bridging data between CRMs, ERPs, emails, and legacy software.',
    whatWeDo: 'We deploy coordinated networks of intelligent, specialized AI agents capable of reasoning, planning, and executing complex multi-step workflows across your existing enterprise software, databases, and APIs. These agents adapt dynamically to edge cases while giving managers total control with built-in human verification gates.',
    keyDeliverables: [
      'Autonomous multi-agent orchestration infrastructure',
      'Enterprise tool connectors (ERP, CRM, databases, communication)',
      'Human-in-the-loop review, approval, and audit system',
      'Self-healing execution handlers for dynamic edge cases'
    ]
  },
  {
    id: 'sol-5',
    number: '05',
    title: 'Sector-Specific WiseBrain',
    tagline: 'Dedicated, sector-tailored intelligence engines engineered for specific industry verticals—synthesizing domain regulations, engineering standards, and institutional knowledge for zero-hallucination decision support.',
    problem: 'Generic all-in-one AI models fail in specialized industries. They lack deep domain taxonomy, miss critical safety codes, and risk severe compliance violations when applied to complex, highly regulated enterprise environments.',
    whatWeDo: 'We do not build a generic, one-size-fits-all model. Instead, for each specific sector, we engineer a dedicated WiseBrain intelligence core trained exclusively on that industry’s exact technical standards, regulatory frameworks, engineering specifications, and institutional knowledge bases—providing instant, cited, and audit-ready intelligence.',
    sectorBullets: [
      {
        sector: 'Defense & Security',
        description: 'Military standards (MIL-STD), ITAR/EAR export controls, mission planning taxonomy, secure audit-ready operational documentation.'
      },
      {
        sector: 'Aerospace & Aviation',
        description: 'DO-178C / DO-254 avionics standards, FAA/EASA airworthiness compliance, flight system telemetry, and maintenance manuals.'
      },
      {
        sector: 'Automotive & Future Mobility',
        description: 'ISO 26262 functional safety, UNECE cybersecurity regulations, EV battery standards, and autonomous driving validation frameworks.'
      },
      {
        sector: 'Industrial Goods & Smart Manufacturing',
        description: 'Machinery safety directives, ISO 9001/14001, industrial IoT protocols (OPC UA), quality assurance and predictive shop-floor codes.'
      },
      {
        sector: 'Energy, Utilities & Sustainability',
        description: 'Grid compliance codes, ESG taxonomies, nuclear safety directives, renewable energy certification, and carbon accounting standards.'
      },
      {
        sector: 'Banking, Financial Services & Insurance',
        description: 'Basel III/IV frameworks, AML/KYC guidelines, MiFID II, Dodd-Frank, actuarial models, and algorithmic risk governance.'
      },
      {
        sector: 'Healthcare, Pharma & Life Sciences',
        description: 'FDA 21 CFR, EMA regulations, HIPAA compliance, clinical trial protocols, GxP validation, and pharmacovigilance.'
      },
      {
        sector: 'Technology, Media & Telecommunications',
        description: '3GPP/5G telecom standards, EU AI Act compliance, GDPR/privacy frameworks, and NIST/ISO 27001 cybersecurity architectures.'
      },
      {
        sector: 'Transportation & Logistics',
        description: 'IMO maritime safety codes, IATA aviation freight regulations, customs tariff databases, and supply chain security frameworks.'
      },
      {
        sector: 'Legal, Regulatory & Public Policy',
        description: 'Multi-jurisdictional statutory cross-referencing, contract clause compliance, antitrust analysis, and legislative impact tracking.'
      }
    ],
    supportedDomains: [
      'Defense & Security',
      'Aerospace & Aviation',
      'Automotive & Mobility',
      'Industrial Goods & Manufacturing',
      'Energy & Sustainability',
      'Banking & Financial Services',
      'Healthcare & Life Sciences',
      'Technology & Telecom',
      'Transportation & Logistics',
      'Legal & Compliance'
    ],
    keyDeliverables: [
      'Sector-dedicated WiseBrain core trained on industry standards & proprietary data',
      'Instant regulatory compliance verification with verified legal & technical citations',
      'Interactive engineering & domain query assistant with zero-hallucination guardrails',
      'Continuous regulatory change monitoring and automated compliance audit reporting'
    ]
  }
];

