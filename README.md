# wedge-case-0

In AI-driven workflows, treating every interruption as STOP can be too coarse.

Some actions must not continue.
Those should STOP.

But some actions may be able to continue if something changes.
Those can be treated as HOLD.

When an action is held, the output shows:
why it was held,
what must change before it can resume,
and that a human decision is required.

The idea is simple:
if STOP and HOLD are separated, it becomes easier to reason about conditions,
explain why something paused, and keep a useful record of what happened.

wedge-case-0 is a four-file demo of that idea.

**Runnable in 30 seconds. No signup, no network, no dependencies.**

## See the three outcomes

```bash
node demo.mjs                          # → ⏸ HOLD (default)
node demo.mjs --case pass              # → ✅ PASS
node demo.mjs --case hold              # → ⏸ HOLD
node demo.mjs --case hold --continue   # → ✅ RESUMED (after the condition was met)
node demo.mjs --case stop              # → ⛔ STOP
```

Add `--play` for paced output.

```
   ⏸  HOLD
       Reason             :  credential detected in outbound message
       Resume condition   :  remove the credential
       Human check        :  required before resume
       Record             :  hold_id=hold-001
```

## Is this already a thing?

Yes, adjacent ideas already exist:
access control, policy engines, approval workflows, workflow engines,
human-in-the-loop systems, and pre-action authorization for agents.

wedge-case-0 does not try to replace any of them.

It only isolates one operational distinction:

- **STOP**: the action must not continue
- **HOLD**: the action may continue only after a condition changes

This demo makes that distinction visible in one place:
the reason, the resume condition, the human check, and the record.

## It's a sketch, not a product

The scenarios are hardcoded and the checks are deliberately trivial placeholders.
No SDK, no policy engine, no runtime; no agent or LLM is wired up.
It is not a production defense — it's a sketch for seeing what STOP/HOLD separation buys:
the reason, the resume condition, the human check, and the record.

## Ran the demo?

Open an issue and leave one sentence.

*What happened next?*

---

*MIT-licensed sketch. Four files. No dependencies.*
