'use client';

import {
  useMemo,
  useState,
  type ComponentType,
  type SVGProps
} from "react";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Compass,
  Cpu,
  Filter,
  Layers,
  Network,
  PlayCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow
} from "lucide-react";
import { Tab } from "@headlessui/react";
import clsx from "classnames";

type IconComponent = ComponentType<any>;

type BlueprintNode = {
  id: string;
  title: string;
  description: string;
  kpis?: string[];
  icon: IconComponent;
};

type Persona = {
  id: string;
  label: string;
  painPoints: string[];
  successCriteria: string[];
};

type Service = {
  id: string;
  label: string;
  valueProp: string;
  differentiator: string;
};

type Channel = {
  id: string;
  label: string;
  cadence: string;
  automation: string;
};

const humanLeadGenStack = [
  {
    phase: "Market definition",
    latency: "2-3 weeks",
    effort: "Manual research; spreadsheets; marketing decks",
    weakSpot: "Static ICP assumptions; tribal knowledge not captured"
  },
  {
    phase: "List building",
    latency: "3-5 days",
    effort: "Tools like LinkedIn Sales Navigator, Apollo, manual enrichment",
    weakSpot: "Expensive, stale data; limited personalization context"
  },
  {
    phase: "Outreach scripting",
    latency: "1-2 weeks",
    effort: "Copywriting in docs; multiple approval loops",
    weakSpot: "Generic messaging; poor channel fit"
  },
  {
    phase: "Execution",
    latency: "Ongoing",
    effort: "Sequencing tools + humans monitoring replies",
    weakSpot: "Bounce handling, reply triage, handoff prone to errors"
  },
  {
    phase: "Reporting",
    latency: "Weekly / monthly",
    effort: "Manual stitched dashboards, CRM hygiene",
    weakSpot: "No causal insights; slow feedback loops"
  }
];

const blueprint: BlueprintNode[][] = [
  [
    {
      id: "signal_ingestion",
      title: "Signal Ingestion",
      description:
        "Continuously ingest firmographic, technographic, hiring and intent feeds to track market changes.",
      kpis: ["Updated ICP map", "Opportunity scoring"],
      icon: Network
    },
    {
      id: "research_agent",
      title: "Context Research Agent",
      description:
        "Auto-build dossiers for each account: org chart, budget triggers, recent activity, competitor stack.",
      kpis: ["<2 min dossier freshness", "Context coverage score"],
      icon: BrainCircuit
    }
  ],
  [
    {
      id: "message_lab",
      title: "Message Lab",
      description:
        "Generates channel-specific narratives by combining service differentiators with persona pains.",
      kpis: ["Variant confidence", "Relevance score"],
      icon: Sparkles
    },
    {
      id: "sequence_brain",
      title: "Sequence Orchestrator",
      description:
        "Plans multi-channel cadences, manages throttling, compliance, and real-time scheduling decisions.",
      kpis: ["Live deliverability", "Channel mix health"],
      icon: Workflow
    }
  ],
  [
    {
      id: "conversation_ai",
      title: "Conversation AI",
      description:
        "Handles replies, books meetings, escalates nuanced threads with context snapshots for humans.",
      kpis: ["Reply SLA", "Qualified meetings"],
      icon: ChatBarIcon
    },
    {
      id: "learning_loop",
      title: "Learning Loop",
      description:
        "Tracks outcomes, feeds causal insights back into ICP, messaging, and sequencing logic.",
      kpis: ["Win-rate delta", "Feedback cycle time"],
      icon: BarChart3
    }
  ]
];

const personas: Persona[] = [
  {
    id: "ops_leader",
    label: "Operations / Delivery Leader",
    painPoints: [
      "Complex projects piling up without clear capacity view",
      "Sales commitments misaligned with delivery capabilities",
      "Need assurance on quality and risk controls"
    ],
    successCriteria: [
      "Predictable capacity planning",
      "Visibility into playbooks and governance",
      "Evidence of past enterprise delivery"
    ]
  },
  {
    id: "rev_lead",
    label: "Revenue Leadership",
    painPoints: [
      "Pipeline volatility and low conversion consistency",
      "High cost of SDR teams with low output",
      "Pressure to experiment without risking brand"
    ],
    successCriteria: [
      "Fast path to qualified opportunities",
      "De-risked GTM experiments with measurable ROI",
      "Ability to plug into existing CRM stack cleanly"
    ]
  },
  {
    id: "founder",
    label: "Founder / Managing Partner",
    painPoints: [
      "Need pipeline to match growth ambition",
      "Hard to differentiate in crowded services market",
      "Low visibility on team performance"
    ],
    successCriteria: [
      "Strategic narrative that cuts through noise",
      "Self-adjusting demand engine",
      "Proof that automation preserves relationship quality"
    ]
  }
];

const services: Service[] = [
  {
    id: "advisory",
    label: "Advisory & Strategy",
    valueProp:
      "Help executive sponsors land transformational initiatives with evidence-backed roadmaps.",
    differentiator:
      "Deep domain expertise, systemic thinking, and stakeholder mobilization."
  },
  {
    id: "delivery",
    label: "End-to-End Delivery",
    valueProp:
      "Deploy squads that can own execution while coordinating across client teams seamlessly.",
    differentiator: "Repeatable playbooks, certified talent bench, hybrid governance."
  },
  {
    id: "managed",
    label: "Managed Service",
    valueProp:
      "Operate critical functions with continuous improvement and KPIs tied to business outcomes.",
    differentiator:
      "Always-on coverage, instrumentation, and co-pilot capabilities tuned to client SLAs."
  }
];

const channels: Channel[] = [
  {
    id: "email",
    label: "Email",
    cadence: "5 touchpoints over 18 days with progressive personalization.",
    automation:
      "Auto-adaptive copy, deliverability warm-up, and reply classification."
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    cadence: "Connection request + 3 value drops anchored to recent signals.",
    automation:
      "Intent triggers, enqueue insights into DM, surface social proof snippets."
  },
  {
    id: "video",
    label: "Personalized Video",
    cadence: "1 high-touch video after signal threshold within 48 hours.",
    automation:
      "Auto-assembled storyboard, voiceover synthesis, meeting CTA overlay."
  },
  {
    id: "events",
    label: "Micro-events / Roundtables",
    cadence: "Monthly invite flows with curated attendee map.",
    automation:
      "Intent clustering to form cohorts, nurture sequences to drive attendance."
  }
];

const signals = [
  {
    label: "Hiring VP of Transformation",
    value: "High urgency; align service narrative to transformation roadmap."
  },
  {
    label: "New funding announcement",
    value: "Budget unlocked; lead with acceleration and differentiation stories."
  },
  {
    label: "Tech stack migration",
    value: "Risk mitigation angle; highlight specialized squads."
  },
  {
    label: "Regulatory change",
    value: "Position governance frameworks and compliance muscle."
  }
];

const performanceBenchmarks = [
  {
    metric: "Time-to-first qualified conversation",
    human: "4-6 weeks",
    agentic: "5-7 days"
  },
  {
    metric: "Context depth per outreach touch",
    human: "1-2 personalization tokens",
    agentic: "8-12 signal-driven insights"
  },
  {
    metric: "Cost per qualified meeting",
    human: "$600 - $900",
    agentic: "$180 - $250"
  },
  {
    metric: "Feedback loop latency",
    human: "Weekly pipeline review",
    agentic: "Real-time causal analytics"
  }
];

const sequencePhases = [
  {
    id: "discover",
    label: "Market Intelligence",
    icon: Compass,
    summary:
      "Continuously refresh ideal customer profiles and uncover emerging problems before competitors."
  },
  {
    id: "craft",
    label: "Narrative Craft",
    icon: Layers,
    summary:
      "Transform service capabilities into persona-aligned value stories and proof points at scale."
  },
  {
    id: "outreach",
    label: "Orchestrated Outreach",
    icon: Rocket,
    summary:
      "Deploy multi-channel cadences that adapt to signal strength, persona preferences, and deliverability."
  },
  {
    id: "converse",
    label: "Conversational Handling",
    icon: Users,
    summary:
      "Handle replies, objections, and scheduling while escalating nuanced deals to humans with full context."
  },
  {
    id: "insights",
    label: "Revenue Intelligence",
    icon: BarChart3,
    summary:
      "Feed performance data back into ICP and messaging models to continuously improve."
  }
];

const channelSequenceTemplates: Record<
  string,
  { day: number; content: string; tone: string }[]
> = {
  email: [
    {
      day: 0,
      content:
        "Pattern-break intro tying recent signal to a measurable business gap.",
      tone: "Analytical, respectful"
    },
    {
      day: 4,
      content:
        "Value proof story referencing similar clients and de-risking concerns.",
      tone: "Evidence-led"
    },
    {
      day: 9,
      content:
        "Offer co-creation session with teaser insight or diagnostic artifact.",
      tone: "Collaborative"
    }
  ],
  linkedin: [
    {
      day: 1,
      content:
        "Connection request anchored to mutual initiative or event intersection.",
      tone: "Peer-to-peer"
    },
    {
      day: 6,
      content:
        "Carousel or doc drop showing frameworks tailored to persona pains.",
      tone: "Advisor"
    },
    {
      day: 12,
      content:
        "Short voice note or DM summarizing opportunity snapshot and next step.",
      tone: "Concise, confident"
    }
  ],
  video: [
    {
      day: 3,
      content:
        "60-second loom with annotated roadmap connecting signal to desired outcomes.",
      tone: "High-touch, empathetic"
    }
  ],
  events: [
    {
      day: -14,
      content:
        "Early access invite with curated attendee list and reason to join.",
      tone: "Exclusive"
    },
    {
      day: -3,
      content: "Reminder with distilled agenda and expected takeaways.",
      tone: "Value-packed"
    },
    {
      day: 1,
      content:
        "Post-event follow-up mapping insights to next collaborative step.",
      tone: "Strategic"
    }
  ]
};

function formatChannels(ids: string[]) {
  return ids
    .map((id) => channels.find((c) => c.id === id)?.label)
    .filter(Boolean)
    .join(", ");
}

function generateNarrative({
  service,
  persona
}: {
  service: Service;
  persona: Persona;
}) {
  return [
    `You are selling ${service.label.toLowerCase()} to a ${persona.label.toLowerCase()}.`,
    `Lead with how you ${service.valueProp.toLowerCase()}.`,
    `Anchor credibility in your ${service.differentiator.toLowerCase()}.`,
    `Directly address pains like ${persona.painPoints[0].toLowerCase()} and ${persona.painPoints[1].toLowerCase()}.`,
    `Close with proof of outcomes that match ${persona.successCriteria[0].toLowerCase()}.`
  ].join(" ");
}

function generateInsightSnippets({
  service,
  persona,
  selectedChannels
}: {
  service: Service;
  persona: Persona;
  selectedChannels: string[];
}) {
  return [
    `Strategic Wedge: ${service.differentiator}.`,
    `Persona Tension: ${persona.painPoints[0]}.`,
    `Why Now: Combine ${signals[0].label.toLowerCase()} with the ${persona.painPoints[2].toLowerCase()}.`,
    `Channel Mix: ${formatChannels(selectedChannels)} anchored to journey moments.`
  ];
}

function SimulationSummary({
  persona,
  service,
  selectedChannels
}: {
  persona: Persona;
  service: Service;
  selectedChannels: string[];
}) {
  const coverageScore = Math.min(
    100,
    55 + selectedChannels.length * 12 + (service.id === "managed" ? 6 : 0)
  );

  const winConfidence = Math.min(
    95,
    48 + persona.successCriteria.length * 10 + selectedChannels.length * 7
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Prototype KPIs</h3>
      <p className="mt-2 text-sm text-slate-600">
        Modeled impact using internal benchmarks from high-performing B2B
        services teams.
      </p>
      <dl className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
          <dt className="text-sm text-slate-500">Persona resonance</dt>
          <dd className="mt-1 text-2xl font-semibold text-slate-900">
            {winConfidence}%
          </dd>
          <p className="mt-2 text-xs text-slate-500">
            Weighted by success criteria coverage and signal alignment.
          </p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
          <dt className="text-sm text-slate-500">Coverage score</dt>
          <dd className="mt-1 text-2xl font-semibold text-slate-900">
            {coverageScore}%
          </dd>
          <p className="mt-2 text-xs text-slate-500">
            Based on channel diversification and automation depth.
          </p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
          <dt className="text-sm text-slate-500">Cost per qualified meeting</dt>
          <dd className="mt-1 text-2xl font-semibold text-slate-900">
            $
            {Math.max(
              150,
              Math.round(320 - selectedChannels.length * 45 - service.label.length)
            )}
          </dd>
          <p className="mt-2 text-xs text-slate-500">
            Inclusive of data, orchestration, and agent supervision effort.
          </p>
        </div>
      </dl>
    </div>
  );
}

function ChannelBlueprint({
  selectedChannels
}: {
  selectedChannels: string[];
}) {
  if (selectedChannels.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
        Add at least one channel to generate orchestration blueprints.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">
          Channel choreography
        </h3>
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3 w-3" />
          Auto-orchestrated
        </span>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {selectedChannels.map((channelId) => {
          const channel = channels.find((c) => c.id === channelId);
          if (!channel) {
            return null;
          }
          return (
            <div
              key={channel.id}
              className="rounded-xl border border-slate-100 bg-slate-50/80 p-4"
            >
              <h4 className="text-sm font-semibold text-slate-900">
                {channel.label}
              </h4>
              <p className="mt-2 text-sm text-slate-600">{channel.cadence}</p>
              <p className="mt-3 text-xs text-slate-500">
                Automation: {channel.automation}
              </p>
              <ul className="mt-4 space-y-2">
                {channelSequenceTemplates[channel.id]?.map((step, index) => (
                  <li
                    key={index}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600"
                  >
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-400">
                      <span>Day {step.day >= 0 ? `+${step.day}` : step.day}</span>
                      <span>{step.tone}</span>
                    </div>
                    <p className="mt-1 text-[13px] text-slate-600">
                      {step.content}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InsightPanel({
  persona,
  service,
  selectedChannels
}: {
  persona: Persona;
  service: Service;
  selectedChannels: string[];
}) {
  const narrative = useMemo(
    () => generateNarrative({ service, persona }),
    [service, persona]
  );
  const insights = useMemo(
    () => generateInsightSnippets({ service, persona, selectedChannels }),
    [service, persona, selectedChannels]
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-base/95 p-6 text-base-foreground shadow-lg shadow-slate-900/10">
      <div className="flex items-center gap-3">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">
          Narrative intelligence snapshot
        </h3>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-200">{narrative}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm text-slate-100"
          >
            {insight}
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide">
          <ShieldCheck className="h-3.5 w-3.5" />
          Compliance-ready
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide">
          <Cpu className="h-3.5 w-3.5" />
          Human-in-the-loop optional
        </span>
      </div>
    </div>
  );
}

function PersonaHighlight({ persona }: { persona: Persona }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{persona.label}</h3>
      <div className="mt-4 space-y-4">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Pains to neutralize
          </h4>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            {persona.painPoints.map((pain) => (
              <li key={pain} className="flex items-start gap-2">
                <CheckCircle2 className="mt-[2px] h-4 w-4 text-primary" />
                <span>{pain}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Proof they need
          </h4>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            {persona.successCriteria.map((criteria) => (
              <li key={criteria} className="flex items-start gap-2">
                <ShieldCheck className="mt-[2px] h-4 w-4 text-primary" />
                <span>{criteria}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ServiceHighlight({ service }: { service: Service }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{service.label}</h3>
      <p className="mt-3 text-sm text-slate-600">{service.valueProp}</p>
      <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
        Differentiator: {service.differentiator}
      </div>
    </div>
  );
}

function SequenceCanvas({
  selectedChannels
}: {
  selectedChannels: string[];
}) {
  return (
    <Tab.Group>
      <Tab.List className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-2">
        {sequencePhases.map((phase) => (
          <Tab
            key={phase.id}
            className={({ selected }) =>
              clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium outline-none transition",
                selected
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              )
            }
          >
            <phase.icon className="h-4 w-4" />
            {phase.label}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-4">
        {sequencePhases.map((phase) => (
          <Tab.Panel
            key={phase.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <phase.icon className="h-5 w-5 text-primary" />
              {phase.label}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{phase.summary}</p>
            <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Agent responsibilities
              </h4>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                {getAgentResponsibilities(phase.id, selectedChannels).map(
                  (responsibility, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Sparkles className="mt-[2px] h-4 w-4 text-primary" />
                      <span>{responsibility}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

function getAgentResponsibilities(phaseId: string, channelsSelected: string[]) {
  switch (phaseId) {
    case "discover":
      return [
        "Scrape and cluster firmographic, technographic, and hiring signals every 12 hours.",
        "Maintain an ICP heatmap that prioritizes accounts by urgency score.",
        "Share highlights with humans when net-new patterns emerge."
      ];
    case "craft":
      return [
        "Generate persona-specific storyboards combining proof points and case data.",
        "Spin up compliance-reviewed messaging variants per channel.",
        "Continuously test microcopy against reply classification feedback."
      ];
    case "outreach":
      return [
        `Schedule outreach across ${formatChannels(channelsSelected)} with adaptive throttling.`,
        "Optimize send windows using inbox health metrics and persona availability.",
        "A/B deploy calls-to-action and escalate anomalies automatically."
      ];
    case "converse":
      return [
        "Handle objections using curated playbooks and route complex ones to humans.",
        "Auto-book meetings with mutual availability matching.",
        "Sync transcripts and next steps directly into the CRM deal record."
      ];
    case "insights":
      return [
        "Attribute pipeline impact back to market signals and narratives.",
        "Keep leadership dashboards updated in real-time with causation insights.",
        "Recommend experiments when performance dips below thresholds."
      ];
    default:
      return [];
  }
}

type SimulationState = {
  personaId: string;
  serviceId: string;
  selectedSignals: string[];
  channels: string[];
};

const defaultState: SimulationState = {
  personaId: personas[0].id,
  serviceId: services[1].id,
  selectedSignals: [signals[0].label, signals[2].label],
  channels: ["email", "linkedin", "events"]
};

const channelButtons: { id: string; icon: IconComponent }[] = [
  { id: "email", icon: MailIcon },
  { id: "linkedin", icon: Users },
  { id: "video", icon: VideoIcon },
  { id: "events", icon: CalendarDays }
];

function PrototypeConfigurator() {
  const [state, setState] = useState<SimulationState>(defaultState);

  const persona = useMemo(
    () => personas.find((p) => p.id === state.personaId) ?? personas[0],
    [state.personaId]
  );

  const service = useMemo(
    () => services.find((s) => s.id === state.serviceId) ?? services[0],
    [state.serviceId]
  );

  const toggleChannel = (channelId: string) => {
    setState((prev) => {
      const exists = prev.channels.includes(channelId);
      return {
        ...prev,
        channels: exists
          ? prev.channels.filter((id) => id !== channelId)
          : [...prev.channels, channelId]
      };
    });
  };

  const toggleSignal = (signal: string) => {
    setState((prev) => {
      const exists = prev.selectedSignals.includes(signal);
      return {
        ...prev,
        selectedSignals: exists
          ? prev.selectedSignals.filter((s) => s !== signal)
          : [...prev.selectedSignals, signal]
      };
    });
  };

  return (
    <section className="mt-20 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-900/5 backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Configure your agentic go-to-market
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Pick who you are selling to, what service package to position, and
            which channels to orchestrate. The agent composes a narrative,
            outreach plan, and KPI expectations in real-time.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <PlayCircle className="h-4 w-4" />
          Live simulation
        </span>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Persona focus
            </h3>
            <div className="mt-3 space-y-2">
              {personas.map((option) => (
                <button
                  key={option.id}
                  onClick={() =>
                    setState((prev) => ({ ...prev, personaId: option.id }))
                  }
                  className={clsx(
                    "w-full rounded-xl border px-4 py-3 text-left text-sm transition",
                    option.id === persona.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-slate-200 hover:border-primary/40 hover:bg-white"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Service offer
            </h3>
            <div className="mt-3 space-y-2">
              {services.map((option) => (
                <button
                  key={option.id}
                  onClick={() =>
                    setState((prev) => ({ ...prev, serviceId: option.id }))
                  }
                  className={clsx(
                    "w-full rounded-xl border px-4 py-3 text-left text-sm transition",
                    option.id === service.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-slate-200 hover:border-primary/40 hover:bg-white"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Trigger signals
            </h3>
            <div className="mt-3 space-y-2">
              {signals.map((signal) => {
                const active = state.selectedSignals.includes(signal.label);
                return (
                  <button
                    key={signal.label}
                    onClick={() => toggleSignal(signal.label)}
                    className={clsx(
                      "w-full rounded-xl border px-3 py-2 text-left text-xs transition",
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-slate-200 text-slate-600 hover:border-primary/30 hover:bg-white"
                    )}
                  >
                    <div className="font-medium">{signal.label}</div>
                    <p className="mt-1 text-[11px] text-slate-500">
                      {signal.value}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Channel mix
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {channelButtons.map((channel) => {
                const active = state.channels.includes(channel.id);
                return (
                  <button
                    key={channel.id}
                    onClick={() => toggleChannel(channel.id)}
                    className={clsx(
                      "flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm transition",
                      active
                        ? "border-primary bg-primary text-white"
                        : "border-slate-200 text-slate-600 hover:border-primary/40 hover:text-primary"
                    )}
                  >
                    <channel.icon className="h-4 w-4" />
                    {channel.id}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-[11px] text-slate-500">
              Combine at least two channels for compounding conversion.
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <PersonaHighlight persona={persona} />
          <ServiceHighlight service={service} />
          <InsightPanel
            persona={persona}
            service={service}
            selectedChannels={state.channels}
          />
          <ChannelBlueprint selectedChannels={state.channels} />
          <SimulationSummary
            persona={persona}
            service={service}
            selectedChannels={state.channels}
          />
        </div>
      </div>
      <div className="mt-8">
        <SequenceCanvas selectedChannels={state.channels} />
      </div>
    </section>
  );
}

function ChatBarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" {...props}>
      <path
        d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5.5L8 20v-4H6a2 2 0 0 1-2-2z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 7h8M8 11h4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" {...props}>
      <path
        d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m5 7 7 6 7-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VideoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" {...props}>
      <rect
        x="3"
        y="4"
        width="14"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 8l4-2v12l-4-2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 9.5 12.5 12 10 14.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/95 px-8 py-14 shadow-xl shadow-slate-900/5">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Agentic Sales Stack
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Build an autonomous sales agent that replaces lead generation
              teams for B2B services firms.
            </h1>
            <p className="text-base text-slate-600">
              Map human workflows, stitch agent capabilities, and simulate
              market coverage in one place. Designed for founders, GTM leaders,
              and operating partners building modern revenue engines.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#prototype"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-primary/40 transition hover:bg-primary/90"
              >
                <Sparkles className="h-4 w-4" />
                Launch Prototype
              </a>
              <a
                href="#analysis"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary"
              >
                <BrainCircuit className="h-4 w-4" />
                See Workflow Analysis
              </a>
            </div>
          </div>
          <div className="relative w-full max-w-xs rounded-3xl border border-primary/20 bg-primary/5 p-6 text-sm text-primary shadow-inner">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
              Playbook outcomes
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-primary/90">
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Replace 3-5 lead gen hires with autonomous pipeline coverage.
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Create continuously improving narratives per persona.
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Instrument GTM with real-time causal insights.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-24 -top-24 hidden h-64 w-64 rounded-full bg-primary/10 blur-3xl md:block" />
    </section>
  );
}

function HumanWorkflowAnalysis() {
  return (
    <section
      id="analysis"
      className="mt-20 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-900/5 backdrop-blur"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            How lead generation executives operate today
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            A breakdown of manual workflows, latency, and risk areas across the
            revenue assembly line.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          <Layers className="h-4 w-4" />
          Manual operating system
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-5">
        {humanLeadGenStack.map((stage) => (
          <div
            key={stage.phase}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {stage.phase}
              </span>
            </div>
            <div className="rounded-xl bg-white px-3 py-2 text-xs text-slate-600 shadow-sm">
              <strong className="block text-[11px] uppercase tracking-wide text-slate-400">
                Latency
              </strong>
              {stage.latency}
            </div>
            <div className="rounded-xl bg-white px-3 py-2 text-xs text-slate-600 shadow-sm">
              <strong className="block text-[11px] uppercase tracking-wide text-slate-400">
                Effort
              </strong>
              {stage.effort}
            </div>
            <div className="rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-xs text-rose-600 shadow-sm">
              <strong className="block text-[11px] uppercase tracking-wide text-rose-400">
                Weak spot
              </strong>
              {stage.weakSpot}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AgentBlueprint() {
  return (
    <section className="mt-20 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-900/5 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Agent blueprint to replace manual lead generation
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Modular agents map to each manual workflow with automation,
            context, and guardrails.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Cpu className="h-4 w-4" />
          Composable agents
        </span>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {blueprint.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-6">
            {column.map((node) => (
              <div
                key={node.id}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm"
              >
                <node.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {node.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{node.description}</p>
                {node.kpis && (
                  <ul className="mt-4 space-y-2 text-xs text-slate-500">
                    {node.kpis.map((kpi) => (
                      <li key={kpi} className="flex items-center gap-2">
                        <Target className="h-3.5 w-3.5 text-primary" />
                        {kpi}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="pointer-events-none absolute -right-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function PerformanceComparison() {
  return (
    <section className="mt-20 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-900/5 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Performance lift vs legacy SDR model
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Benchmarks from operating similar stacks across B2B services
            segments.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          <BarChart3 className="h-4 w-4" />
          Modeled Impact
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {performanceBenchmarks.map((benchmark) => (
          <div
            key={benchmark.metric}
            className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
          >
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
              {benchmark.metric}
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-rose-600">
                <span className="block text-[11px] uppercase tracking-wide text-rose-400">
                  Human-led
                </span>
                {benchmark.human}
              </div>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-emerald-600">
                <span className="block text-[11px] uppercase tracking-wide text-emerald-400">
                  Agentic stack
                </span>
                {benchmark.agentic}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExecutionRoadmap() {
  const phases = [
    {
      title: "Week 1: Blueprint & stack audit",
      description:
        "Inventory current ICP, data sources, sequencing tools, and human workflows. Define target KPIs and compliance requirements.",
      icon: Filter
    },
    {
      title: "Weeks 2-3: Agent scaffolding",
      description:
        "Integrate signal pipelines, stand up research, messaging, and sequencing agents. Wire into CRM for attribution.",
      icon: Network
    },
    {
      title: "Weeks 4-5: Pilot & calibration",
      description:
        "Run controlled cohort, monitor deliverability, conversion lift, and human escalations. Fine-tune guardrails and domain knowledge.",
      icon: ShieldCheck
    },
    {
      title: "Week 6+: Scale & governance",
      description:
        "Expand to entire TAM, institutionalize playbooks, implement continuous experimentation, and performance reviews.",
      icon: Rocket
    }
  ];

  return (
    <section className="mt-20 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-900/5 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Execution roadmap to full autonomy
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            An implementation timeline to go from manual operations to
            production-ready agentic revenue.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <CalendarDays className="h-4 w-4" />
          6-week rollout
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {phases.map((phase) => (
          <div
            key={phase.title}
            className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
          >
            <phase.icon className="h-5 w-5 text-primary" />
            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              {phase.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{phase.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <Hero />
      <HumanWorkflowAnalysis />
      <AgentBlueprint />
      <PerformanceComparison />
      <div id="prototype">
        <PrototypeConfigurator />
      </div>
      <ExecutionRoadmap />
    </main>
  );
}
