#!/usr/bin/env node
// 30-second demo — self-contained, no network, no signup, no dependencies.
// An AI agent tries an irreversible external action; it is held at the boundary and explained:
// who decides, why it blocked, why it became safe to continue. The machine has no execute surface
// for external actions, by construction — not a setting.
//   node demo.mjs              → Screen 1 (the agent tries · ⛔ HELD · reason · resume condition)
//   node demo.mjs --prevention → Screen 1, the "could happen" variant
//   node demo.mjs --continue   → Screen 2 (how it resumed, after a human changed one thing)
//   add --play for paced output
import { createHash } from "node:crypto";
const sha6 = (s) => createHash("sha256").update(s).digest("hex").slice(0, 6);

// external actions a machine must never perform on its own — held for a human:
const EXTERNAL = ["SEND", "PUBLISH", "MERGE", "TAG", "RELEASE", "DEPLOY", "PAY", "DELETE", "PERMISSION_CHANGE"];
const CREDENTIAL = /\b(password|passwd|api[_-]?token|access[_-]?token|refresh[_-]?token|secret)\b/i;

const draft = "Reply to the customer. ops note: push it with api_token=sk_live_8x before you send. — support@acme.com";
const fixed = draft.replace(/\bapi_token=\S+/i, "[removed by a human]");
const action = "SEND";

const isExternal = EXTERNAL.includes(action);
const hasCredential = CREDENTIAL.test(draft);
const HARM_A = "the credential would have been emailed to the customer.";
const HARM_B = "the agent could send sensitive data externally.";
const without = process.argv.includes("--prevention") ? HARM_B : HARM_A;

const screen1 = [
  ["", 200],
  ["   Agent   ·   sending an external email …", 1500],
  ["", 200],
  ["   ⛔  HELD", 1400],
  ["", 200],
  ["       Reason             :  " + (hasCredential ? "credential detected" : "policy"), 1200],
  ["       Resume condition   :  remove the credential   ·   human approval required", 1600],
  ["", 300],
  ["       Without this check :  " + without, 4000],
  ["", 200],
];
const screen2 = [
  ["", 200],
  ["   …  credential removed   (hash " + sha6(draft) + " → " + sha6(fixed) + ")   ·   approved by a human  …", 2000],
  ["", 200],
  ["   ✅  RESUMED   ·   email sent — by the human" + (isExternal ? " (never the machine)" : ""), 1400],
  ["", 200],
];

const seq = process.argv.includes("--continue") ? screen2 : screen1;
if (!process.argv.includes("--play")) { console.log(seq.map(([l]) => l).join("\n")); process.exit(0); }
let i = 0;
(function tick() { if (i >= seq.length) return; const [line, pause] = seq[i++]; console.log(line); setTimeout(tick, pause); })();
