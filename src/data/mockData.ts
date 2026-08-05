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
    title: 'Edge Matrix Intelligence',
    description: 'Deploying self-organizing neural nodes directly at the perimeter for zero-latency execution and autonomous local computing.',
    longDescription: 'Engineered for high-throughput localized processing, Edge Matrix Intelligence deploys autonomous neural nodes directly where physical data originates. By operating independently of centralized cloud bottlenecks, localized edge nodes execute real-time inference with zero latency while maintaining resilient distributed mesh state synchronization.',
    keyBenefits: [
      'Sub-millisecond localized node inference',
      'Zero-latency edge event processing',
      'Self-healing distributed mesh state',
      'Resilient offline-first node execution'
    ],
    deploymentTime: '1 - 3 Weeks'
  },
  {
    id: 'sol-3',
    number: '03',
    title: 'Autonomous Workflows',
    description: 'Eliminate friction. Our engines orchestrate complex operational processes with ultra-fine precision and reliability.',
    longDescription: 'Transform routine operational tasks into smooth, autonomous background flows. By orchestrating multi-step workflows with high precision, your team spends less time on manual administrative steps and more time on high-value strategy.',
    keyBenefits: [
      'Multi-agent workflow orchestration',
      'Instant document & contract synthesis',
      'Self-healing API retry mechanisms',
      'Comprehensive human-in-the-loop review controls'
    ],
    deploymentTime: '2 Weeks'
  },
  {
    id: 'sol-4',
    number: '04',
    title: 'Perceptual Pattern Engine',
    description: 'Translating multi-source telemetry into intuitive, predictive horizons that illuminate strategic paths before trends emerge.',
    longDescription: 'Transform multi-dimensional data streams into fluid, intuitive decision vistas. The Perceptual Pattern Engine continuously synthesizes complex enterprise signals into real-time predictive projections, allowing organizations to navigate future trends with effortless clarity.',
    keyBenefits: [
      'Real-time multi-source telemetry synthesis',
      'High-dimensional trend projection engine',
      'Fluid executive decision vistas',
      'Adaptive pattern anomaly recognition'
    ],
    deploymentTime: '3 Weeks'
  }
];
