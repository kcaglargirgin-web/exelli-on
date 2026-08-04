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
    title: 'Neural Architecture',
    description: 'Advanced AI models designed to evolve alongside your organizational data, ensuring decision-making is always ahead of the curve.',
    longDescription: 'Neural Architecture creates an adaptive data backbone for your organization. Rather than relying on static dashboards, our neural pipelines continuously absorb operational feeds to predict demand spikes, optimize resource distribution, and surface actionable insights automatically.',
    keyBenefits: [
      'Self-evolving organizational data graph',
      'Automated predictive anomaly detection',
      'Seamless multi-department synchronization',
      'Custom fine-tuned domain models'
    ],
    deploymentTime: '2 - 4 Weeks'
  },
  {
    id: 'sol-2',
    number: '02',
    title: 'Cognitive Mesh Security',
    description: 'A self-healing security layer that predicts threats before they manifest, utilizing biometric synchronization.',
    longDescription: 'Engineered for high-security enterprise environments, Cognitive Mesh Security continuously audits system behavior. It uses zero-knowledge verification to isolate unusual activity within milliseconds without interrupting normal user workflows.',
    keyBenefits: [
      'Post-quantum resistant key infrastructure',
      'Zero-Knowledge state validation',
      'Real-time behavioral intrusion quarantine',
      'End-to-end encrypted telemetry'
    ],
    deploymentTime: '1 - 3 Weeks'
  },
  {
    id: 'sol-3',
    number: '03',
    title: 'Autonomous Workflows',
    description: 'Eliminate friction. Our engines automate complex supply chain and creative processes with 99.9% efficiency.',
    longDescription: 'Transform routine operational tasks into smooth, autonomous background flows. By orchestrating multi-step workflows with high precision, your team spends less time on manual administrative steps and more time on high-value strategy.',
    keyBenefits: [
      'Multi-agent workflow orchestration',
      'Instant document & contract synthesis',
      'API self-healing and error retry mechanisms',
      'Comprehensive human-in-the-loop review controls'
    ],
    deploymentTime: '2 Weeks'
  },
  {
    id: 'sol-4',
    number: '04',
    title: 'Quantum Data Visuals',
    description: 'Transforming massive datasets into immersive 3D environments that allow for intuitive spatial analysis.',
    longDescription: 'Complex multi-dimensional data becomes effortless to digest when visualized spatially. Quantum Data Visuals renders million-record datasets into interactive, fluid 3D maps and spatial graphs designed for immediate executive clarity.',
    keyBenefits: [
      'Sub-millisecond 3D data point rendering',
      'Spatial spatial-clustering and trend mapping',
      'Cross-platform mobile and desktop fluidity',
      'Custom color themes for executive presentation'
    ],
    deploymentTime: '3 Weeks'
  }
];
