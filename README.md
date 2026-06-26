# wedge-case-0 — explain why something was held, and how it resumed

A four-file MIT demo. **Runnable in 30 seconds, no signup, no dependencies.**

A script tries to send an external message that contains an embedded credential.
A boundary check holds the action and **explains it in plain English**:
who decided, why it blocked, and what would need to change to resume.
Change one line, run with `--continue`, and the action is shown resumed.

That's the whole thing. ~50 lines of code, terminal output only.
No agent framework, no policy DSL, no SDK. The scenario is hardcoded.
This is a **sketch of what a resumed event could look like** when the
boundary is readable in human language.

The credential check is a deliberately trivial placeholder. It is not
proposed as a production defense; it simply stands in for whatever
policy engine or validation mechanism would occupy that point.

## See it in 30 seconds

```bash
node demo.mjs              # → ⛔ HELD · reason · resume condition
node demo.mjs --continue   # → ✅ RESUMED · after one line changed
```

Optional: `--prevention` for the "could happen" framing, `--play` for paced output.

```
   ⛔  HELD
       Reason             :  credential detected
       Resume condition   :  remove the credential   ·   human approval required
       Without this check :  the credential would have been emailed to the customer.
```

## Why a sketch instead of a framework

Most agent-safety surfaces have words for **blocked** and **logged**.
Few have a word for **resumed**. This sketch tries to make the missing half
readable:

- **Who decided?** — a human (the example shows the role; no agent or LLM is wired up).
- **Why did it block?** — an explicit reason + the evidence that produced it.
- **Why did it resume?** — *what changed* (e.g. credential removed, hash `A → B`) — and who approved.

It is a sketch, not a product. There is no SDK, no policy engine, no runtime.

## Run it

No signup, no network, no dependencies. Clone the repo and run:

```bash
node demo.mjs
```

## Ran the demo?

Open an issue and leave one sentence.

*What happened next?*

---

*MIT-licensed sketch. Four files. No dependencies.*
