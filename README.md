# wedge-case-0

A four-file demo for separating PASS, HOLD, and STOP in AI workflows.
It focuses on making the stopped state visible, not on deciding what the rules should be.

## Quick start

```bash
node demo.mjs                          # ⏸ HOLD (default)
node demo.mjs --case pass              # ✅ PASS
node demo.mjs --case hold --continue   # ✅ RESUMED (after the condition is met)
node demo.mjs --case stop              # ⛔ STOP
```

No install. No signup, no network, no dependencies — just Node.js. Add `--play` for paced output.

## What you see

```
   ⏸  HOLD

       Reason            :  credential detected in outbound message
       Resume condition  :  remove the credential
       Human check       :  required before resume
       Record            :  hold_id=hold-001
```

```
   ⛔  STOP

       Reason            :  blocked destination or irreversible unsafe action
       Resume condition  :  none in this workflow
       Next step         :  create a new request — the rule lives outside this demo
       Record            :  stop_id=stop-001
```

- **STOP** — must not continue; not resumed in this flow.
- **HOLD** — can continue once a condition changes, so it carries a reason, a resume condition, a human check, and a record.
- **PASS** — nothing matched; continues as-is.

## Scope

The scenarios are hardcoded and the checks are deliberately simple placeholders.
There is no SDK, policy engine, runtime, agent, or LLM wired up.

This demo shows what becomes easier to handle when STOP and HOLD are separated:
the reason, the resume condition, the human check, and the record.

## Ran the demo?

Open an issue and leave one sentence.

*What happened next?*

---

*MIT-licensed. Four files. No dependencies.*
