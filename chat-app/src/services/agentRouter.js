/**
 * Agent router for the BMAD Method chat.
 * Detects which specialized agent (Euclid or Ava) should handle the message
 * based on explicit @mentions or keyword analysis.
 */

import {
  BASE_SYSTEM_PROMPT,
  EUCLID_SYSTEM_PROMPT,
  AVA_SYSTEM_PROMPT,
} from './bmadContext.js';

/** Keywords that indicate a Product Management question → Euclid */
const EUCLID_KEYWORDS = [
  'initiative',
  'package',
  'epic',
  'story',
  'backlog',
  'roadmap',
  'gate',
  'lifecycle',
  'phase',
  'operating model',
  'product ops',
  'valuable',
  'viable',
  'usable',
  'feasible',
  'jira',
  'vision board',
  'go-to-market',
  'gtm',
  'product strategy',
  'product vision',
  'delivery manager',
  'product lifecycle',
  'feedback loop',
  'sunset',
];

/** Keywords that indicate a Technical question → Ava */
const AVA_KEYWORDS = [
  'global ready',
  'technical standards',
  'architecture',
  'security',
  'quality',
  'devops',
  'ci/cd',
  'api',
  'data compliance',
  'maturity level',
  'technical debt',
  'gdpr',
  'dev factory',
  'operations',
  'slo',
  'observability',
  'iam',
  'apization',
  'sec-',
  'api-',
  'fin-',
  'dat-',
  'ops-',
  'qua-',
  'technical lead',
];

/**
 * Determines which agent should respond to a given message.
 * @param {string} messageText - The latest user message text
 * @returns {{ systemPrompt: string, agentName: string }} Agent info
 */
export function routeToAgent(messageText) {
  const text = messageText.toLowerCase();

  // Explicit mention of @euclid
  if (text.includes('@euclid')) {
    return { systemPrompt: EUCLID_SYSTEM_PROMPT, agentName: 'Euclid' };
  }

  // Explicit mention of @ava
  if (text.includes('@ava')) {
    return { systemPrompt: AVA_SYSTEM_PROMPT, agentName: 'Ava' };
  }

  // Auto-detect: count keyword matches for each agent
  const euclidScore = EUCLID_KEYWORDS.filter((kw) => text.includes(kw)).length;
  const avaScore = AVA_KEYWORDS.filter((kw) => text.includes(kw)).length;

  if (euclidScore > 0 && euclidScore > avaScore) {
    return { systemPrompt: EUCLID_SYSTEM_PROMPT, agentName: 'Euclid' };
  }

  if (avaScore > 0 && avaScore > euclidScore) {
    return { systemPrompt: AVA_SYSTEM_PROMPT, agentName: 'Ava' };
  }

  // Tie: both scores equal and > 0 → default to Euclid (product-first approach)
  if (euclidScore > 0) {
    return { systemPrompt: EUCLID_SYSTEM_PROMPT, agentName: 'Euclid' };
  }

  // Default: use the base BMAD assistant
  return { systemPrompt: BASE_SYSTEM_PROMPT, agentName: 'BMAD Assistant' };
}
