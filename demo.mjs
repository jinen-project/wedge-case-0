#!/usr/bin/env node
// wedge-case-0 — a four-file sketch. No network, no signup, no dependencies. Runs in ~30s.
// It separates three outcomes for one step in an AI-driven workflow:
//   PASS — no boundary matched; the action can continue.
//   HOLD — the action may continue once a condition changes (reason · resume condition · human check).
//   STOP — the action must not continue in this workflow (no resume; needs a new request).
// The scenarios are hardcoded and the checks are deliberately trivial placeholders.
// A sketch of the STOP/HOLD distinction.
//   node demo.mjs                        → the HOLD case (default)
//   node demo.mjs --case pass|hold|stop  → that case
//   node demo.mjs --case hold --continue → the HOLD case after its condition was met (RESUMED)
//   add --play for paced output

// --- boundaries (deliberately trivial placeholders) ---
const BLOCKED_DOMAINS = ["blocked.example", "sanctioned.example"];
const CREDENTIAL = /\b(password|passwd|api[_-]?token|access[_-]?token|refresh[_-]?token|secret)\b/i;

// --- one hardcoded scenario per outcome ---
const SCENARIOS = {
  pass: { action: "SEND", to: "customer@acme.com",     body: "Thanks — here is the summary you asked for.",                          irreversible: false },
  hold: { action: "SEND", to: "customer@acme.com",     body: "Reply to the customer. ops note: api_token=sk_live_8x before you send.", irreversible: false },
  stop: { action: "SEND", to: "list@blocked.example",  body: "Bulk export of the customer table.",                                   irreversible: true  },
};

// --- the one distinction wedge-case-0 is about ---
// STOP: must not continue.  HOLD: may continue once a condition changes.  PASS: nothing matched.
const evaluate = (s) => {
  if (BLOCKED_DOMAINS.some((d) => s.to.endsWith(d)) || s.irreversible) return "STOP";
  if (CREDENTIAL.test(s.body)) return "HOLD";
  return "PASS";
};

// --- rendering ---
const row = (k, v) => "       " + (k + " ".repeat(18)).slice(0, 18) + ":  " + v;

const blocks = {
  PASS: (s) => [
    ["", 200],
    ["   Agent  ·  " + s.action + " → " + s.to, 1200],
    ["", 200],
    ["   ✅  PASS", 1200],
    ["", 150],
    [row("Reason", "no boundary condition matched"), 900],
    [row("Action", "outbound message can continue"), 900],
    [row("Record", "pass_id=pass-001"), 600],
    ["", 200],
  ],
  HOLD: (s) => [
    ["", 200],
    ["   Agent  ·  " + s.action + " → " + s.to, 1200],
    ["", 200],
    ["   ⏸  HOLD", 1400],
    ["", 150],
    [row("Reason", "credential detected in outbound message"), 1200],
    [row("Resume condition", "remove the credential"), 1200],
    [row("Human check", "required before resume"), 1200],
    [row("Record", "hold_id=hold-001"), 600],
    ["", 200],
  ],
  RESUMED: () => [
    ["", 200],
    ["   …  the condition was met   ·   credential removed   ·   approved by a human  …", 2000],
    ["", 200],
    ["   ✅  RESUMED", 1400],
    ["", 150],
    [row("Previous state", "HOLD"), 900],
    [row("Change", "credential removed"), 900],
    [row("Human decision", "approved"), 900],
    [row("Record", "hold_id=hold-001"), 600],
    ["", 200],
  ],
  STOP: (s) => [
    ["", 200],
    ["   Agent  ·  " + s.action + " → " + s.to, 1200],
    ["", 200],
    ["   ⛔  STOP", 1400],
    ["", 150],
    [row("Reason", "blocked destination or irreversible unsafe action"), 1200],
    [row("Resume condition", "none in this workflow"), 1200],
    [row("Next step", "create a new request — the rule lives outside this demo"), 1200],
    [row("Record", "stop_id=stop-001"), 600],
    ["", 200],
  ],
};

// --- arg parsing ---
const argv = process.argv.slice(2);
const idx = argv.indexOf("--case");
const requested = idx === -1 ? "hold" : argv[idx + 1]; // default: node demo.mjs → HOLD
if (!SCENARIOS[requested]) {
  console.log("usage: node demo.mjs [--case pass|hold|stop] [--continue] [--play]");
  process.exit(1);
}

const scenario = SCENARIOS[requested];
const state = evaluate(scenario);
// --continue only resumes a genuine HOLD; PASS/STOP have nothing to resume.
const resumed = argv.includes("--continue") && state === "HOLD";
const seq = resumed ? blocks.RESUMED(scenario) : blocks[state](scenario);

if (!argv.includes("--play")) { console.log(seq.map(([l]) => l).join("\n")); process.exit(0); }
let i = 0;
(function tick() { if (i >= seq.length) return; const [line, pause] = seq[i++]; console.log(line); setTimeout(tick, pause); })();
