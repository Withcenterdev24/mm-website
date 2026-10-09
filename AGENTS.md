# Goal
- create a website for marketing url, support url, privacy policy of Magnet Mayhem
- directory of the game is /Volumes/Samsung 1TB/tristan/godot
- make the frontend design appealing and avoid common AI SLOPS like gradient and em dashes you can research for designs and used skills like impeccable which can be found in github


# Development Principles

These principles guide how every task should be approached. Follow them consistently.

---

## 1. Clarify Ambiguity First

If any part of a task is unclear, incomplete, contradictory, open to multiple interpretations, or you are unsure:

- Stop and ask the user clarifying questions.
- Do not assume or invent requirements.
- Confirm understanding before writing code or making changes.

---

## 2. Research When Needed

When you lack sufficient information or context:

- Actively use available research tools (web search, page browsing, documentation lookup, etc.).
- Prefer primary sources and official documentation over secondary summaries.
- Verify facts before relying on them in implementation or advice.
- When you discover something new or important via research, briefly share what you found with the user and give a clear recommendation.

---

## 3. Incremental (Vertical Slice) Development

Always implement features using vertical slices / incremental delivery:

- Every change must leave the system in a fully working state.
- Prefer small, complete, testable increments over large incomplete ones.
- Never introduce changes that break existing functionality.
- Build the thinnest possible end-to-end slice first, then expand.
- Every update must remain playable / usable so the changes can already be seen and verified.

---

## 4. Apply Full Problem-Solving Discipline

For every non-trivial task, deliberately apply this full set of practices:

- **Brainstorm** multiple approaches before choosing one
- **Write a clear plan** (even if short) before coding
- **Use Test-Driven Development (TDD)** whenever practical
- **Leverage sub-agents / specialized agents** (including multiple parallel sub-agents) when the task benefits from division of labor or when it is more efficient than doing everything natively
- **Debug systematically** (reproduce → isolate → fix → verify)
- **Perform code review** on the final result (self-review or structured review)

Do not skip these steps just because the task feels small.  
Use the most appropriate skills available for brainstorming, writing plans, debugging, and sub-agent coordination.

---

## 5. Dynamically Choose Model & Effort

Do not default to a single model or effort level.

- Continuously evaluate the complexity, risk, and nature of the current task.
- Select the most appropriate model and reasoning effort for that specific work.
- This applies especially when spawning sub-agents or handling complex system-level / native work.
- Prefer higher effort for architecture, correctness-critical, or irreversible decisions.

---

## 6. Prefer Simplicity and Clarity

- Choose the simplest solution that fully solves the problem.
- Avoid premature abstraction, over-engineering, and cleverness.
- Write code that is easy to read, understand, and delete.
- Name things clearly. Avoid abbreviations unless they are universally known.

---

## 7. Keep Changes Reviewable & Atomic

- Make small, focused commits / changes when possible.
- Separate pure refactoring from behavior changes.
- Leave the codebase better than you found it (but only in the area you are touching).
- Always commit for every new feature you implement. Do not mix two features in the same commit so that any change can be cleanly reverted per feature if something goes wrong.

---

## 8. Handle Errors and Edge Cases Explicitly

- Do not ignore error cases.
- Prefer explicit error handling over silent failures.
- Consider edge cases early, especially around empty states, boundaries, and invalid input.

---

## 9. Documentation

Documentation is part of the work, not an afterthought.

### Code-level documentation
- When a non-obvious decision is made, leave a short comment explaining *why* (not *what*).
- Do not write comments that merely restate what the code does.
- Prefer self-documenting names and structure over excessive comments.

### Project-level documentation
- Keep a clear README.md (or equivalent) that explains:
  - What the project does
  - How to run / build / test it
  - Key architectural decisions
- Update documentation in the same change that modifies behavior.
- Document public APIs, configuration options, and important invariants.
- Prefer living documentation (close to the code) over stale external docs.

### Decision documentation
- Record significant architectural or design decisions (even briefly).
- Note trade-offs and rejected alternatives when useful for future readers.

---

## 10. Analyze Priority & Order

Before starting work:

- Analyze the overall goal based on priority.
- Determine the proper order of what should be done first.
- Break the work into a clear sequence of vertical slices.

---

## 11. Verify Before Declaring Done

Before considering a task complete:

- Confirm the change works as intended.
- Check that existing functionality still works (regression awareness).
- Ensure the solution matches the clarified requirements.
- Prefer automated verification (tests) when practical.
- Confirm that relevant documentation was updated.

---

## 12. Track Progress in task_done.md

Always update `task_done.md` every time a goal or feature is completed:

- Strike through the completed goals.
- Refresh the **"In progress now"** and **"What should be next"** sections at the bottom.