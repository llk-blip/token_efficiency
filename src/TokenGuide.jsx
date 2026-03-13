import { useState } from "react";

const sections = [
  {
    id: "what-are-tokens",
    title: "What Are Tokens?",
    emoji: "🧠",
    content: `Think of tokens as the "currency" of a conversation with Claude. Every word you type and every word Claude responds with costs tokens. A token is roughly 3–4 characters, so "birthday" is about 2 tokens, a full paragraph might be 80 tokens, and a long back-and-forth conversation can easily add up to thousands.
You hit limits in two ways: (1) the context window — Claude can only "see" a certain amount of text at once, like the short-term memory of a person, and (2) usage limits — how many tokens you can use per hour or day on your plan.
When you paste the same long document every message, ask Claude to repeat summaries, or write rambling prompts — you're spending tokens unnecessarily. The goal is to do more with less.`,
  },
  {
    id: "compress-context",
    title: "Compress Your Context",
    emoji: "📦",
    content: `The biggest token drain is carrying dead weight — old conversation history, repeated background, or information Claude already knows. Here's how to keep context lean:
**Start fresh conversations often.** Don't let one conversation run for 20+ messages. Once a task is done (e.g., you've finished drafting your cover letter), start a new chat. You don't need Claude to remember everything — just bring forward a short summary of what matters.
**Use a "state snapshot" at the start of each new chat.** Instead of re-pasting the full story, paste only the key facts. For example:
❌ Bloated: Pasting your entire 3-page resume every single message
✅ Lean: "I'm a teacher with 8 years experience applying for a school principal role. Current gap: leadership examples."
**Summarize completed work before moving on.** If you just finished planning a trip itinerary, compress it to 3 bullet points before asking Claude to help you write packing lists. Reserve full pastes for when you truly need them.`,
  },
  {
    id: "structured-prompts",
    title: "Use Structured Prompts",
    emoji: "🏗️",
    content: `Unstructured prompts force Claude to guess your intent, which leads to long, hedging responses that burn more tokens. Structured prompts are tighter and get you better answers faster.
**A simple template that always works:**
\`\`\`
TASK: [One line — what you want]
CONTEXT: [Only what's new or relevant]
CONSTRAINTS: [Format, length, what to skip]
OUTPUT: [Exactly what you want back]
\`\`\`
**Example — bad prompt:**
"Hey so I've been trying to plan this birthday dinner for my friend and I'm not sure what restaurant to pick because she likes Italian but also sometimes she mentioned Thai food and we have a budget of around $30 per person and there will be 6 of us..."
**Example — good prompt:**
\`\`\`
TASK: Suggest a restaurant type for a group birthday dinner
CONTEXT: 6 people, $30/person budget, friend likes Italian or Thai
CONSTRAINTS: Skip long explanations. Give top 2 options only.
OUTPUT: Bullet list, max 60 words
\`\`\`
The good prompt gets a faster, sharper answer — and uses far fewer tokens on both sides.`,
  },
  {
    id: "scope-control",
    title: "Control Claude's Output Scope",
    emoji: "🎯",
    content: `Claude is trained to be thorough. Left unconstrained, it will add caveats, explain background, offer alternatives, and hedge. All of that is tokens you didn't ask for. You can suppress this explicitly.
**Scope control phrases that save tokens:**
- "No preamble. Start with the answer."
- "Skip background — I know the concept."
- "Max 150 words."
- "Return the rewritten paragraph only. No commentary."
- "3 bullet points. No elaboration."
- "Confirm only — don't re-explain my request."
**Real examples:**
- Instead of: "Can you help me improve this email?" → "Rewrite this email to sound more professional. Return only the rewritten version. Max 100 words."
- Instead of: "What do you think about my plan?" → "What is the single biggest weakness in this plan? One sentence only."
These aren't rude — they're efficient. Claude performs better with clear constraints than open-ended questions.`,
  },
  {
    id: "chunking",
    title: "Chunk Long Workflows",
    emoji: "✂️",
    content: `If you have a big multi-step task (e.g., plan a two-week Europe trip — flights, hotels, daily activities, packing list, and budget breakdown), don't dump it all in one prompt. Break it into stages.
**The chunking pattern:**
Step 1 → Get output → Compress output to summary → Step 2 (with summary, not full output)
**Example: Planning a Europe trip across multiple chats**
\`\`\`
Chat 1: "Plan a 2-week Europe itinerary: Paris, Rome, Barcelona.
         Output: city order + 2-line summary per city only."
[Save that to a notes app]

Chat 2: "Given this itinerary: [paste 6-line summary],
         now suggest one hotel per city under $120/night."

Chat 3: "Itinerary: [2 lines]. Hotels: [2 lines].
         Now create a day-by-day packing list."
\`\`\`
Each chat stays small. You never carry the full accumulated history. The key habit: always compress before moving forward.`,
  },
  {
    id: "reusable-templates",
    title: "Build Reusable Prompt Templates",
    emoji: "📋",
    content: `If you do the same type of task repeatedly — writing emails, reviewing documents, brainstorming ideas, giving feedback — build a template once and reuse it. This avoids re-explaining context every time.
**Example: Email Drafting Template**
\`\`\`
TASK: Draft a professional email
RECIPIENT: [who — e.g., my manager, a new client]
PURPOSE: [e.g., request a meeting, follow up on proposal]
TONE: [formal / friendly / brief]
KEY POINTS: [2–3 bullet points to include]
CONSTRAINTS: Max 150 words. No filler phrases.
\`\`\`
**Example: Feedback Request Template**
\`\`\`
DOCUMENT TYPE: [e.g., cover letter, blog post, project plan]
GOAL: [what it's trying to achieve]
AUDIENCE: [who will read it]
QUESTION: [specific thing to evaluate — e.g., "Is the opening strong?"]
OUTPUT: Top 2 issues only. No full rewrite.
\`\`\`
Store these in a notes app or text file. Paste and fill in the blanks. You'll save time and tokens simultaneously.`,
  },
  {
    id: "avoid-antipatterns",
    title: "Avoid Common Token Waste Patterns",
    emoji: "🚫",
    content: `These habits silently drain your token budget:
**❌ Paste-and-ask:** Pasting a full 5-page document and saying "does this look good?" Claude has to read all of it to answer a vague question. Instead: paste only the section you want reviewed and ask something specific.
**❌ Open-ended exploration:** "What do you think about my business idea?" triggers a long, multi-angle response. Instead: "What is the single biggest risk in a meal-prep delivery business targeting office workers?"
**❌ Asking Claude to repeat back:** "Can you summarize what we've discussed?" wastes tokens re-generating what you already know. Keep your own short notes instead.
**❌ Over-explaining irrelevant background:** You don't need to share your full life story before asking Claude to fix a sentence. Only give what's directly relevant to the task.
**❌ Long back-and-forth for simple edits:** If you want small changes to a paragraph, list them all upfront in one prompt instead of going back and forth 5 times.`,
  },
  {
    id: "quick-reference",
    title: "Quick Reference Cheat Sheet",
    emoji: "⚡",
    content: `**Before you type — ask yourself:**
1. Is there anything in my prompt Claude doesn't need?
2. Can I compress any context to a 1-line summary?
3. Have I told Claude exactly what format I want back?
4. Should I start a fresh chat instead of continuing this one?
**Power phrases:**
- "No preamble."
- "Return only: [X]"
- "Max [N] words / [N] bullets."
- "Skip explanation — revised version only."
- "Assume I understand the basics."
- "What changed from my previous version only."
**Workflow habits:**
- Keep a short "task summary" in a notes app, updated after each chat session
- Start new chats for new sub-tasks
- Paste summaries, not full histories
- Use templates for tasks you do often
- Batch small edits into one prompt instead of many`,
  },
];

export default function TokenGuide() {
  const [active, setActive] = useState("what-are-tokens");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeSection = sections.find((s) => s.id === active);

  const renderContent = (text) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("```")) return null;
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={i} className="font-bold text-amber-300 mt-5 mb-2 text-base">
            {line.replace(/\*\*/g, "")}
          </p>
        );
      }
      if (line.includes("**")) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className="text-slate-300 text-base leading-relaxed mb-3">
            {parts.map((part, j) =>
              j % 2 === 1 ? (
                <strong key={j} className="text-white font-semibold">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        );
      }
      if (
        line.startsWith("- ") ||
        line.startsWith("❌") ||
        line.startsWith("✅") ||
        line.startsWith("•")
      ) {
        return (
          <div key={i} className="flex gap-2 mb-2">
            <span className="text-slate-400 text-base mt-0.5 flex-shrink-0">›</span>
            <p className="text-slate-300 text-base leading-relaxed">
              {line.replace(/^[-•]\s/, "")}
            </p>
          </div>
        );
      }
      if (line.match(/^\d+\./)) {
        return (
          <div key={i} className="flex gap-2 mb-2">
            <span className="text-amber-400 text-base flex-shrink-0 font-semibold">
              {line.match(/^\d+/)[0]}.
            </span>
            <p className="text-slate-300 text-base leading-relaxed">
              {line.replace(/^\d+\.\s*/, "")}
            </p>
          </div>
        );
      }
      if (line.trim() === "") return <div key={i} className="h-3" />;
      return (
        <p key={i} className="text-slate-300 text-base leading-relaxed mb-2">
          {line}
        </p>
      );
    });
  };

  const renderRichContent = (text) => {
    const blocks = [];
    let buffer = [];
    let inCode = false;
    let codeBuffer = [];
    text.split("\n").forEach((line, i) => {
      if (line.startsWith("```")) {
        if (inCode) {
          blocks.push({ type: "code", content: codeBuffer.join("\n"), key: i });
          codeBuffer = [];
          inCode = false;
        } else {
          if (buffer.length > 0) {
            blocks.push({ type: "text", content: buffer.join("\n"), key: i });
            buffer = [];
          }
          inCode = true;
        }
      } else if (inCode) {
        codeBuffer.push(line);
      } else {
        buffer.push(line);
      }
    });
    if (buffer.length > 0)
      blocks.push({ type: "text", content: buffer.join("\n"), key: 9999 });
    return blocks.map((block) => {
      if (block.type === "code") {
        return (
          <div
            key={block.key}
            className="bg-slate-900 border border-slate-700 rounded-lg p-4 my-4 font-mono text-sm text-emerald-300 whitespace-pre-wrap leading-relaxed overflow-x-auto"
          >
            {block.content}
          </div>
        );
      }
      return <div key={block.key}>{renderContent(block.content)}</div>;
    });
  };

  const handleNavClick = (id) => {
    setActive(id);
    setSidebarOpen(false);
  };

  return (
    <div
      className="min-h-screen bg-slate-950 text-white flex flex-col"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      {/* Header */}
      <div className="border-b border-slate-800 px-4 md:px-6 py-4 md:py-5 bg-slate-900 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              className="md:hidden text-slate-400 hover:text-white mr-1"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sidebarOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
            <span className="text-2xl">⚙️</span>
            <div className="flex-1 min-w-0">
              <h1
                className="text-lg md:text-xl font-bold tracking-tight text-white leading-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Token Efficiency Guide
              </h1>
              <p className="text-slate-400 text-sm hidden md:block">
                Practical techniques to do more work within your usage limits
              </p>
            </div>
            <span className="text-xs text-slate-500 font-mono bg-slate-800 px-2 py-1 rounded whitespace-nowrap">
              For New Users
            </span>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 max-w-5xl mx-auto w-full relative">
        {/* Sidebar */}
        <div
          className={`
            fixed md:static top-0 left-0 h-full md:h-auto z-30 md:z-auto
            w-64 md:w-56 flex-shrink-0
            bg-slate-950 md:bg-transparent
            border-r border-slate-800
            py-16 md:py-4 px-2
            transition-transform duration-200 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            overflow-y-auto
          `}
        >
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => handleNavClick(s.id)}
              className={`w-full text-left px-3 py-3 rounded-lg mb-1 transition-all text-sm leading-snug ${
                active === s.id
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <span className="mr-2">{s.emoji}</span>
              {s.title}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-5 md:p-8 overflow-auto min-w-0">
          {activeSection && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl md:text-4xl">{activeSection.emoji}</span>
                <h2
                  className="text-xl md:text-2xl font-bold text-white leading-tight"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {activeSection.title}
                </h2>
              </div>
              <div className="max-w-none">
                {renderRichContent(activeSection.content)}
              </div>
            </div>
          )}

          {/* Footer nav */}
          <div className="mt-10 pt-6 border-t border-slate-800 flex justify-between items-center">
            <button
              onClick={() => {
                const idx = sections.findIndex((s) => s.id === active);
                if (idx > 0) setActive(sections[idx - 1].id);
              }}
              disabled={active === sections[0].id}
              className="text-sm text-slate-400 hover:text-white disabled:opacity-30 transition-colors px-4 py-2 rounded border border-slate-700 hover:border-slate-500 disabled:hover:border-slate-700"
            >
              ← Previous
            </button>
            <span className="text-sm text-slate-600 font-mono">
              {sections.findIndex((s) => s.id === active) + 1} / {sections.length}
            </span>
            <button
              onClick={() => {
                const idx = sections.findIndex((s) => s.id === active);
                if (idx < sections.length - 1) setActive(sections[idx + 1].id);
              }}
              disabled={active === sections[sections.length - 1].id}
              className="text-sm text-slate-400 hover:text-white disabled:opacity-30 transition-colors px-4 py-2 rounded border border-slate-700 hover:border-slate-500 disabled:hover:border-slate-700"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
