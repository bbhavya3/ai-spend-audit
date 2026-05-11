export type PricingTool = {
  name: string;
  plans: {
    name: string;
    price: number;
    type: "seat" | "flat" | "api" | "custom";
  }[];
  recommendation: string;
};

export const tools: PricingTool[] = [
  {
    name: "Cursor",
    plans: [
      { name: "Hobby", price: 0, type: "seat" },
      { name: "Pro", price: 20, type: "seat" },
      { name: "Business", price: 40, type: "seat" },
      { name: "Enterprise", price: 0, type: "custom" },
    ],
    recommendation:
      "Small teams should usually start with Pro before moving to Business or Enterprise.",
  },
  {
    name: "GitHub Copilot",
    plans: [
      { name: "Individual", price: 10, type: "seat" },
      { name: "Business", price: 19, type: "seat" },
      { name: "Enterprise", price: 39, type: "seat" },
    ],
    recommendation:
      "For small teams, Individual or Business is usually enough unless enterprise controls are needed.",
  },
  {
    name: "Claude",
    plans: [
      { name: "Free", price: 0, type: "flat" },
      { name: "Pro", price: 20, type: "flat" },
      { name: "Max", price: 100, type: "flat" },
      { name: "Team", price: 30, type: "seat" },
      { name: "Enterprise", price: 0, type: "custom" },
      { name: "API direct", price: 0, type: "api" },
    ],
    recommendation:
      "Claude Pro is usually enough for individuals; Team or API direct makes sense only for heavier collaboration or usage.",
  },
  {
    name: "ChatGPT",
    plans: [
      { name: "Plus", price: 20, type: "flat" },
      { name: "Team", price: 30, type: "seat" },
      { name: "Enterprise", price: 0, type: "custom" },
      { name: "API direct", price: 0, type: "api" },
    ],
    recommendation:
      "Small teams should compare ChatGPT Team seats against API usage before scaling subscriptions.",
  },
  {
    name: "Anthropic API direct",
    plans: [{ name: "API direct", price: 0, type: "api" }],
    recommendation:
      "API direct is better when usage is workload-based instead of every person needing a fixed subscription.",
  },
  {
    name: "OpenAI API direct",
    plans: [{ name: "API direct", price: 0, type: "api" }],
    recommendation:
      "API direct can reduce cost when usage is metered and not every team member needs a paid ChatGPT seat.",
  },
  {
    name: "Gemini",
    plans: [
      { name: "Pro", price: 20, type: "flat" },
      { name: "Ultra", price: 250, type: "flat" },
      { name: "API", price: 0, type: "api" },
    ],
    recommendation:
      "Gemini API is often better for research or data workloads where usage is variable.",
  },
  {
    name: "Windsurf",
    plans: [
      { name: "Free", price: 0, type: "seat" },
      { name: "Pro", price: 15, type: "seat" },
      { name: "Teams", price: 30, type: "seat" },
      { name: "Enterprise", price: 0, type: "custom" },
    ],
    recommendation:
      "Windsurf Free or Pro can be a cheaper coding alternative for small teams.",
  },
];