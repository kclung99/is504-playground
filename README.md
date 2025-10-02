# Tone × Engagement Experiment — MVP Demo

## Background (what this project is about)
We’re studying how **tone** (polite → harsh) and **content effort** (low → high engagement) shape conversation dynamics in social threads. The long-term goal is to:
- Assign a continuous **ToneScore (τ)** and an **EngagementScore (ε)** to **any** post or reply,
- Let threads evolve organically (people can reply to OP *or* to replies),
- And analyze whether different tone exposures or reply choices affect **engagement**, **depth**, and the **overall “feel”** of a thread.

This repo is a **lightweight demo** meant to show teammates the **participant experience** and the **basic logging** we’ll use in real experiments. It uses **mock data** for τ and ε (we’re not training models here).

---

## What this demo shows (high level)
- **Three threads** total (hardcoded).
- Each thread has:
  - An **Original Post (OP)** + **5–10 seeded replies**,
  - Every post/reply displays **Tone (τ)** and **Engagement (ε)** values (mock),
  - A **Like** button and a **Reply** button.
- Clicking **Reply** opens **four reply options** (E1–E4), representing **increasing engagement effort**. Selecting one:
  - Inserts that reply under the chosen parent node,
  - Logs the action (with what was on screen at that moment),
  - Enables **Next Thread** so the participant can advance.

> This is a demo of the **experimental flow** (not styling or architecture). Use any Next.js/React setup you prefer; client-side state is sufficient.

---

## Core interactions (must-have behavior)
1. **Thread navigation**
   - A small toolbar shows **“Thread X of 3”** and a **Next Thread** button.
   - **Next Thread** remains **disabled** until the user posts at least one reply in the current thread.

2. **Cards (OP + Replies)**
   - Show **text**, **Tone τ**, **Engagement ε**, current **likes**, and two actions: **Like**, **Reply**.
   - **Like** increments the like count locally (no need for idempotency in the demo).

3. **Reply flow**
   - Clicking **Reply** opens a chooser with **E1–E4** options (each option has a label + preview text + mock τ + mock ε).
   - On select:
     - Insert a new reply under the selected **parent** with the option’s text/τ/ε.
     - Close the chooser and show a small toast (e.g., “Reply added”).
     - Enable **Next Thread** (or auto-advance after ~500–800 ms).

4. **Visibility caps (keep choices manageable)**
   - Always render the **OP** (sticky at top).
   - Show **up to 6** top-ranked replies by default (others collapsed behind “Show more”).
   - If a reply has many children, show **up to 3** by default with a “Show replies (n)” toggle.
   - Simple ranking is fine (e.g., likes desc → ε desc → recency).

5. **Logging (console is fine)**
   - On **like**:
     ```js
     { type: "like", threadId, itemId, ts }
     ```
   - On **open reply chooser**:
     ```js
     { type: "open_reply", threadId, parentId, visibleIds: [...], ts }
     ```
   - On **post reply**:
     ```js
     { type: "post_reply", threadId, parentId, optionId, tau, epsilon, visibleIds: [...], ts }
     ```
   - “visibleIds” are the IDs of cards currently on screen (OP + replies) at the moment of action.

---

## Sameple Mock Data
```json
{
  "replyOptions": [
    { "id": "E1", "label": "E1 • quick nod", "text": "Same here lol.", "tau": -0.05, "epsilon": 0.20 },
    { "id": "E2", "label": "E2 • brief support", "text": "Ugh, unfair—happens a lot.", "tau": 0.00, "epsilon": 0.40 },
    { "id": "E3", "label": "E3 • advice", "text": "Loop your professor in early.", "tau": -0.10, "epsilon": 0.60 },
    { "id": "E4", "label": "E4 • personal tactic", "text": "Confronted my team; it helped.", "tau": 0.10, "epsilon": 0.80 }
  ],
  "threads": [
    {
      "threadId": "t1",
      "topic": "campus",
      "op": { "id": "t1-op", "text": "I did most of our group project and I'm exhausted.", "tau": 0.05, "epsilon": 0.50, "likes": 2, "depth": 0 },
      "seeded": [
        { "id": "t1-r1", "parentId": "t1-op", "text": "Classic group project pain.", "tau": 0.30, "epsilon": 0.45, "likes": 1, "depth": 1 },
        { "id": "t1-r2", "parentId": "t1-op", "text": "Sorry you’re dealing with that.", "tau": -0.20, "epsilon": 0.55, "likes": 3, "depth": 1 },
        { "id": "t1-r3", "parentId": "t1-op", "text": "Talk to the prof sooner next time.", "tau": -0.10, "epsilon": 0.60, "likes": 0, "depth": 1 }
      ]
    },
    {
      "threadId": "t2",
      "topic": "tech",
      "op": { "id": "t2-op", "text": "AI art isn’t real art if there’s no human skill involved.", "tau": 0.40, "epsilon": 0.50, "likes": 5, "depth": 0 },
      "seeded": [
        { "id": "t2-r1", "parentId": "t2-op", "text": "Gatekeeping much?", "tau": 0.50, "epsilon": 0.40, "likes": 1, "depth": 1 },
        { "id": "t2-r2", "parentId": "t2-op", "text": "Process > tools, imo.", "tau": -0.10, "epsilon": 0.55, "likes": 2, "depth": 1 }
      ]
    },
    {
      "threadId": "t3",
      "topic": "everyday",
      "op": { "id": "t3-op", "text": "Self-checkout makes me feel like unpaid staff.", "tau": 0.10, "epsilon": 0.50, "likes": 3, "depth": 0 },
      "seeded": [
        { "id": "t3-r1", "parentId": "t3-op", "text": "Same, but it’s faster.", "tau": -0.05, "epsilon": 0.45, "likes": 2, "depth": 1 }
      ]
    }
  ]
}
```

---

## Data you’ll provide (mock)
- **Threads**: 3 objects, each with:
  - `threadId`, `topic`
  - `op`: `{ id, text, tau, epsilon, likes, depth: 0 }`
  - `seeded`: an array of 5–10 replies `{ id, parentId, text, tau, epsilon, likes, depth }`
- **Reply Options** (E1–E4):
  - Each option has `{ id, label, text, tau, epsilon }` representing increasing engagement levels.
- Use whatever file/module structure you like (e.g., a `data.ts`/`data.js`).

> Keep τ around ~[-0.5 … +0.8] and ε in [0.00 … 1.00]. These are **mock** values; we’re just showing how they appear and flow through interactions.

---

## Minimal UX checklist
- [ ] Landing shows **Thread 1 of 3**; OP + seeded replies render with τ/ε badges.
- [ ] **Like** increments likes on a card.
- [ ] **Reply** opens the options (E1–E4); picking one inserts a new reply under the correct parent with the option’s τ/ε.
- [ ] Console logs **open_reply** and **post_reply** with a **visibleIds** array.
- [ ] **Next Thread** is disabled until the first reply is posted; then advances to the next thread.
- [ ] Default visible set capped to **OP + ≤6 replies**, with “Show more” and “Show replies (n)” toggles to keep choices small.
- [ ] Optional: a tiny banner summarizing the current thread’s **avg τ** and **avg ε** (just to hint at what we’ll analyze later).

---

## Demo script (how to present it live)
1. Open **Thread 1**. Point out the τ/ε badges on OP and a couple replies.
2. Click **Like** on a reply.
3. Click **Reply** on the OP → choose **E3** (advice). Watch the new reply appear with the option’s τ/ε.
4. Show **console logs** for exposure and actions.
5. Hit **Next Thread**; repeat once to show it’s consistent.
6. Close with: “Scale this to 20 posts × 10 participants; replace mock τ/ε with real scorers; and analyze thread-level tone vs engagement over time.”

---

## Notes
- Architecture is up to you (Next.js pages/app router, state via Context/Zustand/Redux, etc.).
- No backend needed; all state can live client-side for this demo.
- Keep styling clean but minimal; function > form.

---
