# Explainable human-final for AI agent actions

When an AI agent tries something irreversible — send an email, cut a release, make a payment — this **stops it at the boundary** and explains it: **who decides, why it blocked, why it became safe to continue.**

The machine has **no execute surface** for those actions, by construction. Not a setting. A human is always the one who finally sends, releases, or pays.

## See it in 30 seconds

```bash
node demo.mjs              # an agent tries to send → ⛔ HELD → reason → resume condition
node demo.mjs --continue   # how it resumed, after a human changed one thing
```

```
   Agent   ·   sending an external email …

   ⛔  HELD
       Reason             :  credential detected
       Resume condition   :  remove the credential   ·   human approval required
       Without this check :  the credential would have been emailed to the customer.
```

## Why this is different

Most agent governance ends at **allow / deny**. This ends at **held → changed → resumed** — and every step is explainable:

- **Who made the final decision?** — a human (the machine cannot send/release/pay on its own).
- **Why did it block?** — an explicit reason + the evidence that produced it.
- **Why did it resume?** — *what changed* (e.g. the credential removed, hash `A → B`) and who approved.

## Run it

No signup. No network. Self-host (`docker compose up` in the full service). Your data never leaves your machine.

```bash
node demo.mjs
```

## Ran the demo?

Open an issue and leave one sentence.

*What happened next?*

---

*MIT-licensed demo. The decision engine binds to a runtime reason-code canon in the full service; this demo reproduces the behavior standalone.*
