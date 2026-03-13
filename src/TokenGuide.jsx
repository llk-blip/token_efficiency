import { useState } from "react";
import HallucinationExplainer from "./HallucinationExplainer";
import SkyToggle from "./SkyToggle";

// ── Section data ──────────────────────────────────────────────────────────────

const sections = [
  {
    id: "what-are-tokens",
    title: "What Are Tokens?",
    emoji: "🧠",
    content: `Think of tokens as the "fuel" powering every conversation with Claude. Every word you type and every word Claude writes back burns tokens. A token is roughly 3–4 characters — so "breakfast" is about 2 tokens, a short paragraph is around 80 tokens, and a long back-and-forth conversation can add up to thousands.
You hit limits in two ways: (1) the context window — Claude can only "see" a certain amount of text at once, like a whiteboard that gets full, and (2) usage limits — how many tokens you can use per hour or day on your plan.
**A simple everyday analogy:** Imagine you're texting a very smart friend, but each text costs you money. The more you write — and the more they reply — the more it costs. Token efficiency just means sending smarter texts so you get better answers without running up the bill.
When you paste the same long document every message, ask Claude to repeat summaries, or write rambling prompts — you're burning tokens needlessly. The goal: do more with less.`,
  },
  {
    id: "edit-dont-add",
    title: "Edit, Don't Send a Follow-Up",
    emoji: "✏️",
    content: `This is one of the biggest token-saving habits most new users never discover.
When Claude's answer misses the mark, most people type a follow-up message like "No, I meant..." or "Actually, can you change that to...". Every new message adds to the conversation history — and Claude re-reads the entire history every single turn.
**The better way: click the edit icon on your original message, fix your prompt, and regenerate.** The old exchange gets replaced, not added. Over 10 rounds of editing, this single habit cuts token use by 80–90%.
**Real example:**
❌ Slow & expensive:
"Write a birthday message for my mum."
[Claude writes something too formal]
"Make it warmer and more personal."
[Claude re-reads everything, writes again]
"Add a joke about her love of gardening."
[Claude re-reads everything again…]
✅ Fast & lean:
[Edit original message] → "Write a warm, personal birthday message for my mum. She loves gardening. Include a light joke about it. Keep it under 60 words."
[One clean response. Done.]
**Remember:** Fix the prompt. Don't stack the chat.`,
  },
  {
    id: "fresh-chat",
    title: "Start Fresh Every 15–20 Messages",
    emoji: "🔄",
    content: `Here's something most people don't realise: Claude re-reads your entire conversation history on every single reply. Your first message costs ~200 tokens. By message 30, a simple question can cost 50,000+ tokens — just from carrying all that history.
**Long chats are expensive chats.**
**What to do instead:**
- When you finish a task (you've drafted your email, planned your trip, finished your essay feedback), start a new chat.
- Before closing the old chat, ask: "Summarise what we decided in 5 bullet points." Copy that. Paste it at the top of your next chat as starting context.
**Real example:**
You've spent 25 messages planning a dinner party menu with Claude. Now you want help writing the invitations.
❌ Keep going in the same chat — Claude carries 25 messages of food discussion into every invitation reply.
✅ New chat → "I've finalised my dinner party menu: 3-course Italian, Saturday 7pm, 8 guests. Now help me write a casual invitation. Max 80 words."
**The rule of thumb:** Finish one task → summarise → new chat → paste summary. Repeat.`,
  },
  {
    id: "batch-questions",
    title: "Batch Your Questions",
    emoji: "📬",
    content: `Instead of sending three separate messages one after another, combine them into a single prompt. Three questions in one message means one context load — not three. The answers are often better too, because Claude sees the full picture at once.
**Example — the expensive way:**
Message 1: "What should I wear to a job interview at a startup?"
[Wait for reply]
Message 2: "What questions should I prepare to ask them?"
[Wait for reply]
Message 3: "How early should I arrive?"
[Wait for reply]
**Example — the smart way:**
\`\`\`
I have a job interview at a startup next week. Help me with:
1. What to wear (smart-casual or formal?)
2. Three good questions to ask the interviewer
3. How early to arrive and what to do if I'm running late
Keep each answer to 2–3 sentences.
\`\`\`
Three questions. One message. Always.
This works for anything: planning a holiday, reviewing a document, brainstorming gift ideas. If you have multiple related questions, batch them.`,
  },
  {
    id: "structured-prompts",
    title: "Use Structured Prompts",
    emoji: "🏗️",
    content: `Unstructured prompts force Claude to guess your intent, which leads to long, hedging responses that burn more tokens. Structured prompts are tighter and get you sharper answers faster.
**A simple template that always works:**
\`\`\`
TASK: [One line — what you want]
CONTEXT: [Only what's new or relevant]
CONSTRAINTS: [Format, length, what to skip]
OUTPUT: [Exactly what you want back]
\`\`\`
**Example — rambling prompt:**
"Hey so I'm trying to write a message to my landlord because the boiler broke two weeks ago and he hasn't fixed it and I want to sound firm but not rude because I still have 6 months left on my lease and I don't want to make things awkward…"
**Example — structured prompt:**
\`\`\`
TASK: Write a firm but polite message to my landlord
CONTEXT: Boiler broken 2 weeks, no response, 6 months left on lease
CONSTRAINTS: Professional tone. No threats. Max 100 words.
OUTPUT: The message only. No commentary.
\`\`\`
The structured prompt gets a better answer in fewer tokens — every time.`,
  },
  {
    id: "scope-control",
    title: "Control Claude's Output Length",
    emoji: "🎯",
    content: `Claude is built to be thorough. Left unconstrained, it will add background, caveats, alternatives, and disclaimers — all tokens you didn't ask for. You can stop this with simple instructions.
**Phrases that trim the fat:**
- "No preamble. Start with the answer."
- "Skip background — I know the basics."
- "Max 150 words."
- "Return the rewritten version only. No commentary."
- "3 bullet points. Nothing more."
- "Confirm only — don't re-explain my request."
**Real before/after examples:**
Instead of: "Can you help me improve this email?"
→ "Rewrite this email to sound more professional. Return only the rewritten version. Max 100 words."
Instead of: "What do you think about my business idea?"
→ "What is the single biggest weakness in a home-based cake business? One sentence only."
Instead of: "Review my CV"
→ "Review only the work experience section of my CV. Give me the top 2 improvements. No full rewrite."
These aren't rude — they're efficient. Claude actually performs better with clear constraints.`,
  },
  {
    id: "chunking",
    title: "Chunk Big Tasks Into Steps",
    emoji: "✂️",
    content: `If you have a large multi-step task, don't dump it all in one go. Break it into stages, compress each output, and carry only the summary forward.
**The chunking pattern:**
Step 1 → Get output → Compress to a short summary → Step 2 (with summary, not full output)
**Real example: Planning a birthday party across multiple chats**
\`\`\`
Chat 1: "Plan a surprise 30th birthday party for 20 people.
         Budget: £500. Venue: home. Theme: 90s nostalgia.
         Output: Top 5 decisions only. Bullet points."
[Save those 5 bullets to your notes app]

Chat 2: "Party details: 20 guests, £500, home, 90s theme.
         Now suggest a food and drink plan. Max 150 words."

Chat 3: "Party: 20 guests, 90s theme, home, food sorted.
         Now write the invitation message. Casual tone, 60 words."
\`\`\`
Each chat stays small. You never drag the full history forward. **The key habit: always compress before moving on.**`,
  },
  {
    id: "turn-off-features",
    title: "Turn Off Features You Don't Need",
    emoji: "🔧",
    content: `Web Search, Research mode, and connectors all add tokens to every response — even when you don't need them. These features make Claude scan the web or pull in extra data, which inflates every reply with information you didn't ask for.
**If you didn't turn it on, turn it off.**
**Features that silently add tokens:**
- **Web Search / Research mode** — Adds live web results to responses. Great for current events, expensive for everything else. Toggle it off when you're just writing, editing, or brainstorming.
- **Extended Thinking** — Claude "thinks longer" before answering. Leave it off by default. Only switch it on when your first answer wasn't good enough.
- **Connectors** (Google Drive, email, etc.) — If Claude has access to your files or apps, it reads them even when irrelevant. Disconnect what you're not actively using.
**How to check:** Look for toggles or a settings icon near the chat input box. Before starting a task, ask yourself: "Do I actually need this feature right now?"
**Rule of thumb:** Plain writing, editing, and Q&A tasks need zero extra features. Keep it simple.`,
  },
  {
    id: "right-model",
    title: "Pick the Right Claude Model",
    emoji: "🤖",
    content: `Using the right model is the single highest-impact decision you can make. Claude comes in different sizes — using a heavy model for a simple task is like hiring a surgeon to put on a plaster.
**Haiku** — Fast, cheap, great for everyday tasks
**Sonnet** — Balanced, the default for most work
**Opus** — Powerful, for complex and demanding tasks
**When to use each:**
- Use **Haiku** all day for: quick questions, grammar checks, short rewrites, brainstorming, translations, formatting. Haiku frees up 50–70% of your budget for tasks that actually need more power.
- Use **Sonnet** for: writing drafts, analysing documents, summarising long texts, planning, research.
- Use **Opus** for: complex problem-solving, long document review, nuanced analysis, tasks where your first attempt wasn't good enough.
**Everyday rule:**
"Haiku for quick tasks. Sonnet for real work. Opus for the hard stuff."
**How to switch:** Look for the model selector near the top of your Claude window. Most people never change it — and end up burning Opus tokens on tasks Haiku could handle in seconds.`,
    table: true,
  },
  {
    id: "spread-work",
    title: "Spread Your Work Across the Day",
    emoji: "⏰",
    content: `Claude runs on a rolling 5-hour usage window that resets continuously. If you burn through your limit in one long session, you're done until the window rolls over — even if it's only midday.
**Don't sprint. Pace yourself.**
**What this means in practice:**
Instead of sitting down for a 3-hour Claude marathon in the morning, split your work into 2–3 shorter sessions spread across the day. On a Pro plan, this approach can effectively get you 150–200+ messages per day instead of hitting a wall at 45.
**Real example:**
❌ Sprint: Spend 2 hours using Claude heavily for work emails, report drafting, and research all in one go. Hit the limit at 11am. Nothing left for the afternoon.
✅ Paced: 45 minutes in the morning for emails. 45 minutes after lunch for the report. 30 minutes in the evening for research. Smooth usage all day.
**Bonus tip:** Check your usage before starting a big task. If you're close to the limit, save the heavy work for when the window resets rather than burning out mid-task.`,
  },
  {
    id: "projects-recurring",
    title: "Use Projects for Recurring Files",
    emoji: "📁",
    content: `If you upload the same PDF, guide, or document across multiple chats, Claude is re-reading and re-counting those tokens every single time. That's like paying the entry fee to the same museum every visit, instead of getting a membership.
**Projects solve this.** Files uploaded to a Project are cached — Claude loads them once and remembers them across conversations. You only pay the token cost once.
**Who benefits most:**
- You refer to the same CV when applying for jobs
- You always include the same company brief when writing marketing content
- You use the same recipe file when planning weekly meals
- You keep a running document with your preferences, tone, or style
**How to use it:**
1. Create a Project in Claude (look for "Projects" in the sidebar)
2. Upload your recurring file(s) once
3. Start all related chats inside that Project — Claude already has the context
**The bottom line:** Upload once. Stop paying every time. Projects are one of the most underused features for saving tokens on repeat tasks.`,
  },
  {
    id: "memory-setup",
    title: "Set Up Memory & Custom Instructions",
    emoji: "💾",
    content: `Every conversation you start without any context makes Claude start from zero. That means you're burning 3–5 setup messages just re-explaining who you are and how you like to work — before you even get to the real task.
**Set it once. It runs forever.**
**What to put in your custom instructions:**
- Your role: "I'm a freelance graphic designer"
- Your tone preference: "Always be direct and skip pleasantries"
- What to skip: "Never add disclaimers or suggest I consult a professional"
- Your output format: "Use bullet points. Max 200 words per answer unless I ask for more"
- Your context: "I work on Mac, use Notion for notes, and prefer British English"
**How to set it up:** Go to **Settings → Memory and User Preferences** (or similar depending on your Claude version). Add a short profile. Claude will carry it into every new conversation automatically.
**Real example of what to write:**
\`\`\`
I'm a small business owner in the UK.
Tone: direct and friendly.
Skip: disclaimers, long intros, "certainly!" responses.
Format: bullet points preferred, max 150 words unless asked.
Assume I understand basic business concepts.
\`\`\`
That's it. Paste once, save forever.`,
  },
  {
    id: "reusable-templates",
    title: "Build Reusable Prompt Templates",
    emoji: "📋",
    content: `If you do the same type of task repeatedly — writing emails, reviewing documents, planning meals, giving feedback — build a template once and reuse it. This stops you re-explaining context every single time.
**Example: Email Drafting Template**
\`\`\`
TASK: Draft a professional email
RECIPIENT: [e.g. my manager / a new client / my landlord]
PURPOSE: [e.g. request a meeting / follow up / raise an issue]
TONE: [formal / friendly / firm but polite]
KEY POINTS: [2–3 bullet points to include]
CONSTRAINTS: Max 150 words. No filler phrases. Sign off as [name].
\`\`\`
**Example: Document Feedback Template**
\`\`\`
DOCUMENT TYPE: [e.g. cover letter / blog post / essay]
GOAL: [what it needs to achieve]
AUDIENCE: [who will read it]
QUESTION: [specific thing to check — e.g. "Is the opening strong?"]
OUTPUT: Top 2 issues only. No full rewrite.
\`\`\`
**Where to store them:** A notes app (Apple Notes, Notion, Google Keep), a text file on your desktop, or even a pinned message to yourself. Paste and fill in the blanks — done in seconds.`,
  },
  {
    id: "avoid-antipatterns",
    title: "Common Token Waste Habits",
    emoji: "🚫",
    content: `These habits silently drain your token budget without you noticing:
**❌ Paste-and-ask:** Sharing a full 5-page document and saying "does this look good?" Claude has to read all of it to answer a vague question. Instead: paste only the section you want reviewed and ask something specific.
**❌ Asking Claude to repeat back:** "Can you summarise what we've discussed?" re-generates everything you already know. Keep your own short notes instead.
**❌ Open-ended questions:** "What do you think about my idea?" triggers a long, multi-angle response. Instead: "What is the single biggest risk with a home-baking business?"
**❌ Over-explaining your background:** You don't need your full life story before asking Claude to fix a sentence. Only share what's directly relevant to the task.
**❌ Long back-and-forth for simple edits:** If you want small changes to a paragraph, list them all upfront in one prompt instead of going back and forth 5 times.
**❌ Staying in long chats:** After 20+ messages, every reply carries enormous context overhead. Start a new chat for new tasks.`,
  },
  {
    id: "quick-reference",
    title: "Quick Reference Cheat Sheet",
    emoji: "⚡",
    content: `**Before you type — ask yourself:**
1. Can I edit my last message instead of sending a new one?
2. Should I start a fresh chat for this new task?
3. Have I batched all my related questions into one prompt?
4. Have I told Claude exactly what format and length I want?
5. Am I using the right model for this task?
**Power phrases:**
- "No preamble. Start with the answer."
- "Return only: [X]"
- "Max [N] words / [N] bullets."
- "Skip explanation — revised version only."
- "Assume I understand the basics."
- "3 options only. No elaboration."
**Workflow habits:**
- Edit prompts instead of stacking follow-ups
- Start new chats for new tasks (every 15–20 messages)
- Batch related questions into one message
- Use Projects for files you upload repeatedly
- Set up Memory/Custom Instructions once — never re-explain yourself
- Pick Haiku for simple tasks, Sonnet for most work, Opus for hard problems
- Spread sessions across the day — don't sprint and hit the wall`,
  },
  {
    id: "hallucination-bonus",
    title: "Bonus: Why Claude Sometimes Gets Things Wrong",
    emoji: "🤯",
    isComponent: true,
    intro: `Understanding how Claude actually works under the hood makes you a much smarter user. This interactive explainer walks through how large language models generate text — and why they sometimes confidently produce wrong answers (a phenomenon called "hallucination"). Six short steps, no technical background needed.`,
  },
];

// ── Theme config ──────────────────────────────────────────────────────────────

function getTheme(isDark) {
  return isDark ? {
    app:         "bg-slate-950",
    header:      "bg-slate-900 border-slate-800",
    sidebar:     "bg-slate-950 border-slate-800",
    navActive:   "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    navInactive: "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50",
    title:       "text-white",
    subtitle:    "text-slate-400",
    body:        "text-slate-300",
    bold:        "text-white",
    accent:      "text-amber-300",
    accentNum:   "text-amber-400",
    muted:       "text-slate-500",
    code:        "bg-slate-900 border-slate-700 text-emerald-300",
    tblWrap:     "border-slate-700",
    tblHead:     "bg-slate-800",
    tblAccent:   "text-amber-300",
    tblRow:      "border-slate-700 hover:bg-slate-800/40",
    footBorder:  "border-slate-800",
    navBtn:      "text-slate-400 hover:text-white border-slate-700 hover:border-slate-500 disabled:opacity-30",
    counter:     "text-slate-600",
    badge:       "text-slate-500 bg-slate-800",
    menuBtn:     "text-slate-400 hover:text-white",
    overlay:     "bg-black/60",
    introBg:     "bg-slate-800/50 border-slate-700",
    introText:   "text-slate-300",
  } : {
    app:         "bg-slate-50",
    header:      "bg-white border-slate-200",
    sidebar:     "bg-white border-slate-200",
    navActive:   "bg-amber-100 text-amber-700 border border-amber-300",
    navInactive: "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
    title:       "text-slate-900",
    subtitle:    "text-slate-500",
    body:        "text-slate-700",
    bold:        "text-slate-900",
    accent:      "text-amber-600",
    accentNum:   "text-amber-600",
    muted:       "text-slate-400",
    code:        "bg-slate-100 border-slate-300 text-emerald-700",
    tblWrap:     "border-slate-300",
    tblHead:     "bg-slate-100",
    tblAccent:   "text-amber-600",
    tblRow:      "border-slate-200 hover:bg-slate-50",
    footBorder:  "border-slate-200",
    navBtn:      "text-slate-500 hover:text-slate-900 border-slate-300 hover:border-slate-400 disabled:opacity-30",
    counter:     "text-slate-400",
    badge:       "text-slate-500 bg-slate-100 border border-slate-200",
    menuBtn:     "text-slate-500 hover:text-slate-900",
    overlay:     "bg-black/40",
    introBg:     "bg-amber-50 border-amber-200",
    introText:   "text-slate-700",
  };
}

// ── Model table ───────────────────────────────────────────────────────────────

function ModelTable({ t }) {
  const rows = [
    { task: "Quick questions, grammar, formatting, brainstorming", model: "Haiku",  cost: "Very Low",  mColor: "text-emerald-500", cColor: "text-emerald-500" },
    { task: "Writing, analysis, summarising, drafts",              model: "Sonnet", cost: "Medium",    mColor: "text-amber-400",   cColor: "text-amber-400"   },
    { task: "Deep research, complex tasks, long document review",  model: "Opus",   cost: "High",      mColor: "text-rose-400",    cColor: "text-rose-400"    },
  ];
  return (
    <div className={`overflow-x-auto my-5 rounded-lg border ${t.tblWrap}`}>
      <table className="w-full text-base md:text-lg">
        <thead>
          <tr className={t.tblHead}>
            <th className={`px-4 py-3 font-semibold text-left ${t.tblAccent}`}>Task Type</th>
            <th className={`px-4 py-3 font-semibold text-left ${t.tblAccent}`}>Model</th>
            <th className={`px-4 py-3 font-semibold text-left ${t.tblAccent}`}>Cost</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.model} className={`border-t transition-colors ${t.tblRow}`}>
              <td className={`px-4 py-3 ${t.body}`}>{r.task}</td>
              <td className={`px-4 py-3 font-semibold ${r.mColor}`}>{r.model}</td>
              <td className={`px-4 py-3 font-semibold ${r.cColor}`}>{r.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Moon / Sun toggle icon ────────────────────────────────────────────────────

function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded-lg border transition-all ${
        isDark
          ? "bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:border-slate-500"
          : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300"
      }`}
    >
      {isDark ? (
        <>
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 1.78a1 1 0 011.42 1.42l-.71.7a1 1 0 11-1.42-1.41l.71-.71zM18 9a1 1 0 110 2h-1a1 1 0 110-2h1zM4.22 4.78a1 1 0 00-1.42 1.42l.71.7A1 1 0 004.93 5.5l-.71-.72zM3 9a1 1 0 100 2H2a1 1 0 100-2h1zm1.22 5.22a1 1 0 011.42 0l.7.71a1 1 0 11-1.41 1.42l-.71-.71a1 1 0 010-1.42zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm5.78-1.22a1 1 0 010 1.42l-.71.71a1 1 0 11-1.42-1.42l.71-.71a1 1 0 011.42 0zM10 6a4 4 0 100 8 4 4 0 000-8z"/>
          </svg>
          Light
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
          </svg>
          Dark
        </>
      )}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function TokenGuide() {
  const [active, setActive]       = useState("what-are-tokens");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark]       = useState(true);

  const t = getTheme(isDark);
  const activeSection = sections.find((s) => s.id === active);

  // ── Text renderer ─────────────────────────────────────────────────────────

  const renderLine = (line, i) => {
    if (line.startsWith("```")) return null;

    // Full-line bold header
    if (line.startsWith("**") && line.endsWith("**")) {
      return (
        <p key={i} className={`font-bold mt-6 mb-2 text-lg md:text-xl ${t.accent}`}>
          {line.replace(/\*\*/g, "")}
        </p>
      );
    }

    // Inline bold
    if (line.includes("**")) {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className={`text-lg md:text-xl leading-relaxed mb-3 ${t.body}`}>
          {parts.map((part, j) =>
            j % 2 === 1
              ? <strong key={j} className={`font-semibold ${t.bold}`}>{part}</strong>
              : part
          )}
        </p>
      );
    }

    // List / emoji bullets
    if (line.startsWith("- ") || line.startsWith("❌") || line.startsWith("✅") || line.startsWith("•")) {
      return (
        <div key={i} className="flex gap-2 mb-2">
          <span className={`text-lg md:text-xl mt-0.5 flex-shrink-0 ${t.muted}`}>›</span>
          <p className={`text-lg md:text-xl leading-relaxed ${t.body}`}>
            {line.replace(/^[-•]\s/, "")}
          </p>
        </div>
      );
    }

    // Numbered list
    if (line.match(/^\d+\./)) {
      return (
        <div key={i} className="flex gap-2 mb-2">
          <span className={`text-lg md:text-xl flex-shrink-0 font-semibold ${t.accentNum}`}>
            {line.match(/^\d+/)[0]}.
          </span>
          <p className={`text-lg md:text-xl leading-relaxed ${t.body}`}>
            {line.replace(/^\d+\.\s*/, "")}
          </p>
        </div>
      );
    }

    if (line.trim() === "") return <div key={i} className="h-3" />;

    return (
      <p key={i} className={`text-lg md:text-xl leading-relaxed mb-3 ${t.body}`}>
        {line}
      </p>
    );
  };

  const renderRichContent = (section) => {
    const blocks = [];
    let buffer = [], inCode = false, codeBuffer = [];

    section.content.split("\n").forEach((line, i) => {
      if (line.startsWith("```")) {
        if (inCode) {
          blocks.push({ type: "code", content: codeBuffer.join("\n"), key: i });
          codeBuffer = []; inCode = false;
        } else {
          if (buffer.length) { blocks.push({ type: "text", content: buffer.join("\n"), key: i }); buffer = []; }
          inCode = true;
        }
      } else if (inCode) {
        codeBuffer.push(line);
      } else {
        buffer.push(line);
      }
    });
    if (buffer.length) blocks.push({ type: "text", content: buffer.join("\n"), key: 9999 });

    // Inject model table into the right-model section after block index 1
    const rendered = blocks.map((block) => {
      if (block.type === "code") {
        return (
          <div key={block.key}
            className={`rounded-lg p-4 my-4 font-mono text-base md:text-lg whitespace-pre-wrap leading-relaxed overflow-x-auto border ${t.code}`}>
            {block.content}
          </div>
        );
      }
      return <div key={block.key}>{block.content.split("\n").map(renderLine)}</div>;
    });

    if (section.table) rendered.splice(2, 0, <ModelTable key="model-table" t={t} />);
    return rendered;
  };

  // ── Nav ───────────────────────────────────────────────────────────────────

  const handleNavClick = (id) => {
    setActive(id);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const curIdx = sections.findIndex((s) => s.id === active);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${t.app}`}
      style={{ fontFamily: "'Georgia', serif" }}>

      {/* Header */}
      <div className={`border-b px-4 md:px-6 py-4 sticky top-0 z-10 transition-colors duration-300 ${t.header}`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            {/* Hamburger */}
            <button className={`md:hidden mr-1 ${t.menuBtn}`}
              onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sidebarOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>

            <span className="text-2xl">⚙️</span>

            <div className="flex-1 min-w-0">
              <h1 className={`text-lg md:text-xl font-bold tracking-tight leading-tight ${t.title}`}
                style={{ fontFamily: "Georgia, serif" }}>
                Token Efficiency Guide
              </h1>
              <p className={`text-sm hidden md:block ${t.subtitle}`}>
                Stop hitting usage limits — practical habits for new Claude users
              </p>
            </div>

            {/* Theme toggle */}
            <SkyToggle isDark={isDark} onToggle={() => setIsDark(d => !d)} />

            <span className={`hidden sm:block text-xs font-mono px-2 py-1 rounded ${t.badge}`}>
              For New Users
            </span>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className={`fixed inset-0 z-20 md:hidden ${t.overlay}`}
          onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex flex-1 max-w-5xl mx-auto w-full relative">

        {/* Sidebar */}
        <div className={`
          fixed md:static top-0 left-0 h-full md:h-auto z-30 md:z-auto
          w-64 md:w-60 flex-shrink-0 border-r
          py-16 md:py-4 px-2
          transition-all duration-200 ease-in-out overflow-y-auto
          ${t.sidebar}
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          {sections.map((s) => (
            <button key={s.id} onClick={() => handleNavClick(s.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 transition-all text-base leading-snug ${
                active === s.id ? t.navActive : t.navInactive
              }`}>
              <span className="mr-2">{s.emoji}</span>
              {s.title}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-5 md:p-8 overflow-auto min-w-0">
          {activeSection && (
            <div>
              {/* Section heading */}
              <div className="flex items-start gap-3 mb-6">
                <span className="text-3xl md:text-4xl mt-1">{activeSection.emoji}</span>
                <h2 className={`text-2xl md:text-3xl font-bold leading-tight ${t.title}`}
                  style={{ fontFamily: "Georgia, serif" }}>
                  {activeSection.title}
                </h2>
              </div>

              {/* Content */}
              {activeSection.isComponent ? (
                <>
                  <div className={`rounded-lg border p-4 mb-6 ${t.introBg}`}>
                    <p className={`text-lg md:text-xl leading-relaxed ${t.introText}`}>
                      {activeSection.intro}
                    </p>
                  </div>
                  <HallucinationExplainer isDark={isDark} />
                </>
              ) : (
                <div className="max-w-none">
                  {renderRichContent(activeSection)}
                </div>
              )}
            </div>
          )}

          {/* Footer nav */}
          <div className={`mt-10 pt-6 border-t flex justify-between items-center ${t.footBorder}`}>
            <button
              onClick={() => curIdx > 0 && handleNavClick(sections[curIdx - 1].id)}
              disabled={curIdx === 0}
              className={`text-base md:text-lg transition-colors px-4 py-2 rounded border ${t.navBtn}`}
            >
              ← Previous
            </button>
            <span className={`text-base font-mono ${t.counter}`}>
              {curIdx + 1} / {sections.length}
            </span>
            <button
              onClick={() => curIdx < sections.length - 1 && handleNavClick(sections[curIdx + 1].id)}
              disabled={curIdx === sections.length - 1}
              className={`text-base md:text-lg transition-colors px-4 py-2 rounded border ${t.navBtn}`}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
