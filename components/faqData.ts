/* ============================================================
   FAQ DATA
   `width` is the fixed question-text width from Figma (it decides where
   long questions wrap on desktop); `align` is how the +/× toggle sits
   against the question when the row is closed; `literal` marks rows where
   the number is typed into the text instead of using a list marker.
   ============================================================ */

export type Faq = {
  q: string;
  a: string;
  width: number;
  align: "center" | "start";
  literal?: boolean;
};

export const FAQS: Faq[] = [
  {
    q: "Is Mekark a turnkey factory construction company or only a steel supplier?",
    a: "Mekark is a turnkey factory construction company. We design, manufacture, erect and hand over complete factory buildings, with civil works and MEP coordinated alongside the steel structure.",
    width: 815,
    align: "center",
  },
  {
    q: "What is included in your turnkey industrial construction services?",
    a: "As a turnkey industrial construction company, our scope covers site evaluation, design and engineering, foundations, steel framing, MEP integration, quality checks and handover. We can tailor the scope to your plant.",
    width: 815,
    align: "center",
  },
  {
    q: "What does EPC mean for a factory project?",
    a: "EPC stands for engineering, procurement and construction. As a factory EPC company, we handle all three under one contract, so one team is responsible for your factory’s design, materials and build.",
    width: 815,
    align: "center",
  },
  {
    q: "Why hire an industrial EPC contractor instead of separate agencies?",
    a: "An industrial EPC contractor gives you one contract, one schedule and one point of accountability. This reduces delays and cost overruns that come from coordinating separate designers, fabricators and civil contractors.",
    width: 815,
    align: "center",
  },
  {
    q: "Can a factory EPC contractor manage a project from land to commissioning?",
    a: "Yes. As a factory EPC contractor, we take over from site evaluation and design through fabrication, erection and MEP, and hand over a building that is ready for machinery installation.",
    width: 815,
    align: "center",
  },
  {
    q: "Which industries does your industrial EPC company serve?",
    a: "As an industrial EPC company, we serve automotive, engineering, pharma, FMCG, food processing, textile, electronics and chemical manufacturers with customised pre-engineered factory buildings.",
    width: 815,
    align: "center",
  },
  {
    q: "How do I choose a turnkey factory contractor?",
    a: "Look for a turnkey factory contractor with in-house engineering, its own manufacturing, a track record of completed projects, and itemised pricing. Mekark offers all of these, with 200+ completed industrial and commercial projects.",
    width: 815,
    align: "center",
  },
  {
    q: "Do you work as a turnkey industrial building contractor outside TamilNadu?",
    a: "Yes. As a turnkey industrial building contractor, we build factories anywhere in India. Our in-house fabrication and erection teams keep the same quality and timelines at every location.",
    width: 815,
    align: "center",
  },
];
