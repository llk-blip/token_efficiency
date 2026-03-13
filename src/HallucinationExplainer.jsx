import { useState } from "react";

// Token pill colours — hardcoded, look fine on both dark & light backgrounds
const TOKEN_STYLES = {
  hot:    { background: "#FAC775", color: "#633806", borderColor: "#EF9F27" },
  warm:   { background: "#FAEEDA", color: "#854F0B", borderColor: "#FAC775" },
  confid: { background: "#EAF3DE", color: "#3B6D11", borderColor: "#97C459" },
  wrong:  { background: "#FCEBEB", color: "#A32D2D", borderColor: "#F09595" },
};

function Tok({ type, large = false, pulse = false, children }) {
  return (
    <span style={{
      ...TOKEN_STYLES[type],
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      padding: "5px 11px", borderRadius: "6px", border: "0.5px solid",
      fontSize: large ? "18px" : "15px", fontWeight: 500, margin: "3px",
      animation: pulse ? "pulse 1.5s ease-in-out infinite" : undefined,
    }}>
      {children}
    </span>
  );
}

function Bar({ label, pct, bg, clr, mult = 1 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <span style={{ fontSize: 14, minWidth: 56, color: "var(--hl-text2)" }}>{label}</span>
      <div style={{ flex: 1, background: "var(--hl-bg2)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          width: `${Math.min(pct * mult, 100)}%`, height: 22, borderRadius: 4,
          background: bg, color: clr,
          display: "flex", alignItems: "center", padding: "0 8px",
          fontSize: 14, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden",
          transition: "width 0.5s ease",
        }}>{pct}%</div>
      </div>
    </div>
  );
}

function SlotLabel({ children }) {
  return (
    <p style={{
      fontSize: 15, fontWeight: 500, textTransform: "uppercase",
      letterSpacing: "0.06em", color: "var(--hl-text3)", margin: "0 0 6px",
    }}>{children}</p>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: "var(--hl-bg2)", borderRadius: 8, padding: "10px 14px", ...style,
    }}>{children}</div>
  );
}

// ── 6 stages ────────────────────────────────────────────────────────────────

const STAGES = [
  {
    title: "How an LLM works: pattern completion",
    caption: "An LLM doesn't 'know' facts the way a person does. It learns patterns from billions of text examples, then predicts: given these words, what word most likely comes next?",
    Body: () => (
      <div className="stage-anim">
        <SlotLabel>Input prompt</SlotLabel>
        <div style={{ marginBottom: 14 }}>
          {["The", "capital", "of", "France", "is"].map(w => <Tok key={w} type="hot">{w}</Tok>)}
        </div>
        <SlotLabel>Most likely next word</SlotLabel>
        <div style={{ marginBottom: 10 }}>
          <Tok type="confid" large>Paris</Tok>
        </div>
        <p style={{ fontSize: 14, color: "var(--hl-text3)", margin: 0 }}>
          ✓ Pattern is extremely common in training data — high confidence, correct answer.
        </p>
      </div>
    ),
  },
  {
    title: "The problem: confidence without understanding",
    caption: "The model always produces an answer — it has no way to say 'I don't know' unless specifically trained to do so. It picks the most statistically likely next word, even when it shouldn't.",
    Body: () => (
      <div className="stage-anim">
        <SlotLabel>All words get a probability score</SlotLabel>
        <div style={{ marginBottom: 14 }}>
          <Bar label="Paris"  pct={72} bg="#639922" clr="#3B6D11" />
          <Bar label="London" pct={11} bg="#3B8BD4" clr="#0C447C" />
          <Bar label="Rome"   pct={8}  bg="#3B8BD4" clr="#0C447C" />
          <Bar label="Berlin" pct={5}  bg="#888780" clr="#444441" />
          <Bar label="Madrid" pct={4}  bg="#888780" clr="#444441" />
        </div>
        <p style={{ fontSize: 14, color: "var(--hl-text3)", margin: 0 }}>
          The model samples from this distribution. Usually fine — but what about obscure questions?
        </p>
      </div>
    ),
  },
  {
    title: "When the data is thin or absent",
    caption: "For rare facts — a niche historical figure, a small-town statistic, an obscure paper — there were barely any examples in training. The model still has to fill in the blank.",
    Body: () => (
      <div className="stage-anim">
        <SlotLabel>Prompt with a thin training signal</SlotLabel>
        <div style={{ marginBottom: 14 }}>
          {["The", "population", "of", "Llanfairpwll…", "is"].map(w => (
            <Tok key={w} type="warm">{w}</Tok>
          ))}
        </div>
        <SlotLabel>Probability spread is now flat and uncertain</SlotLabel>
        <div style={{ marginBottom: 12 }}>
          <Bar label="3,107"  pct={18} bg="#EF9F27" clr="#412402" mult={2.5} />
          <Bar label="3,200"  pct={16} bg="#EF9F27" clr="#412402" mult={2.5} />
          <Bar label="2,800"  pct={15} bg="#EF9F27" clr="#412402" mult={2.5} />
          <Bar label="4,500"  pct={14} bg="#D85A30" clr="#4A1B0C" mult={2.5} />
          <Bar label="12,000" pct={13} bg="#D85A30" clr="#4A1B0C" mult={2.5} />
          <Bar label="…"      pct={24} bg="#888780" clr="#444441" mult={2.5} />
        </div>
        <p style={{ fontSize: 14, color: "var(--hl-text3)", margin: 0 }}>
          Many options look equally plausible. The model still picks one — and sounds just as confident.
        </p>
      </div>
    ),
  },
  {
    title: "Hallucination: a plausible-sounding wrong answer",
    caption: "The model picks what 'sounds right' based on patterns — not what IS right. It generates text that fits the shape of a correct answer without actually being one.",
    Body: () => (
      <div className="stage-anim">
        <SlotLabel>What you asked</SlotLabel>
        <Card style={{ marginBottom: 12, fontSize: 15, color: "var(--hl-text1)" }}>
          "Can you cite the 2019 paper by Dr. Elena Voss on sleep and memory consolidation?"
        </Card>
        <SlotLabel>What the model produces</SlotLabel>
        <Card style={{ marginBottom: 12, fontSize: 15, lineHeight: 1.7, color: "var(--hl-text1)" }}>
          {["Voss, E.", "(2019).", "Sleep-dependent", "consolidation", "of", "declarative", "memory."].map(w => (
            <Tok key={w} type="confid">{w}</Tok>
          ))}
          <Tok type="wrong" pulse>Nature Neuroscience, 22(4), 511–519.</Tok>
        </Card>
        <div style={{
          display: "flex", alignItems: "flex-start", gap: 10,
          background: "var(--hl-bg-danger)", borderRadius: 8, padding: "10px 14px",
          border: "0.5px solid var(--hl-border-danger)",
        }}>
          <span style={{ fontSize: 18, marginTop: 1 }}>⚠</span>
          <span style={{ fontSize: 15, color: "var(--hl-text-danger)", lineHeight: 1.6 }}>
            This paper does not exist. The journal, volume, pages — all fabricated.
            But the format is perfect: it looks exactly like a real citation.
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Why it sounds so confident",
    caption: "Confidence in tone is a learned pattern too. Academic and factual text in training data is written assertively — so the model mimics that style regardless of whether it actually 'knows' the answer.",
    Body: () => (
      <div className="stage-anim">
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 8 }}>
          <Card>
            <SlotLabel>Hedged (honest uncertainty)</SlotLabel>
            <p style={{ fontSize: 15, margin: 0, color: "var(--hl-text2)", fontStyle: "italic" }}>
              "I'm not sure of the exact figure, but it might be around…"
            </p>
            <p style={{ fontSize: 15, color: "var(--hl-text3)", margin: "6px 0 0" }}>
              ← Rare pattern in formal text. Model learned to avoid this style.
            </p>
          </Card>
          <Card>
            <SlotLabel>Assertive (what the model learned)</SlotLabel>
            <p style={{ fontSize: 15, margin: 0, color: "var(--hl-text1)" }}>
              "The population of the town is 3,107 residents as of the 2018 census."
            </p>
            <p style={{ fontSize: 15, color: "var(--hl-text3)", margin: "6px 0 0" }}>
              ← Common pattern in authoritative text. Model mirrors this confidently.
            </p>
          </Card>
        </div>
        <p style={{ fontSize: 14, color: "var(--hl-text3)", margin: 0 }}>
          The model isn't lying — it has no concept of truth. It's completing patterns.
          Confident-sounding completions ranked higher in training.
        </p>
      </div>
    ),
  },
  {
    title: "A simple mental model",
    caption: "Think of an LLM as an incredibly well-read person who read millions of books and articles — but who can't re-read them, forgot the sources, and when uncertain, fills gaps with plausible-sounding guesses.",
    Body: () => (
      <div className="stage-anim">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
          <Card style={{ borderRadius: 10, padding: 12 }}>
            <p style={{ fontSize: 22, margin: "0 0 6px" }}>✅</p>
            <SlotLabel>LLMs are good at</SlotLabel>
            <ul style={{ fontSize: 15, lineHeight: 1.8, margin: 0, paddingLeft: 16, color: "var(--hl-text2)" }}>
              <li>Common, well-documented facts</li>
              <li>Synthesising & explaining</li>
              <li>Writing & reasoning tasks</li>
              <li>Patterns with abundant data</li>
            </ul>
          </Card>
          <Card style={{ borderRadius: 10, padding: 12 }}>
            <p style={{ fontSize: 22, margin: "0 0 6px" }}>⚠️</p>
            <SlotLabel>Hallucination risk is higher for</SlotLabel>
            <ul style={{ fontSize: 15, lineHeight: 1.8, margin: 0, paddingLeft: 16, color: "var(--hl-text2)" }}>
              <li>Specific citations & sources</li>
              <li>Precise statistics & dates</li>
              <li>Niche or obscure topics</li>
              <li>Anything easily verifiable</li>
            </ul>
          </Card>
        </div>
        <div style={{
          background: "var(--hl-bg-info)", borderRadius: 8, padding: "10px 14px",
          border: "0.5px solid var(--hl-border-info)",
        }}>
          <p style={{ fontSize: 15, color: "var(--hl-text-info)", margin: 0, lineHeight: 1.6 }}>
            💡 Always verify specific facts, citations, and statistics from an LLM against a reliable primary source.
          </p>
        </div>
      </div>
    ),
  },
];

// ── CSS variable maps ─────────────────────────────────────────────────────────

const DARK_VARS = {
  "--hl-text1":        "#f1f5f9",
  "--hl-text2":        "#94a3b8",
  "--hl-text3":        "#64748b",
  "--hl-bg2":          "#1e293b",
  "--hl-bg3":          "#334155",
  "--hl-border2":      "#334155",
  "--hl-text-danger":  "#fca5a5",
  "--hl-bg-danger":    "#1c0505",
  "--hl-border-danger":"#7f1d1d",
  "--hl-text-info":    "#93c5fd",
  "--hl-bg-info":      "#0c1a2e",
  "--hl-border-info":  "#1e3a5f",
};

const LIGHT_VARS = {
  "--hl-text1":        "#0f172a",
  "--hl-text2":        "#475569",
  "--hl-text3":        "#94a3b8",
  "--hl-bg2":          "#f1f5f9",
  "--hl-bg3":          "#e2e8f0",
  "--hl-border2":      "#e2e8f0",
  "--hl-text-danger":  "#991b1b",
  "--hl-bg-danger":    "#fef2f2",
  "--hl-border-danger":"#fca5a5",
  "--hl-text-info":    "#1d4ed8",
  "--hl-bg-info":      "#eff6ff",
  "--hl-border-info":  "#bfdbfe",
};

// ── Main component ─────────────────────────────────────────────────────────

export default function HallucinationExplainer({ isDark }) {
  const [cur, setCur] = useState(0);
  const stage = STAGES[cur];
  const { Body } = stage;
  const vars = isDark ? DARK_VARS : LIGHT_VARS;

  const go = (dir) => setCur(c => Math.max(0, Math.min(STAGES.length - 1, c + dir)));

  const btnStyle = {
    padding: "7px 18px", fontSize: 15, borderRadius: 8,
    border: `0.5px solid ${vars["--hl-border2"]}`,
    background: vars["--hl-bg2"],
    color: vars["--hl-text1"],
    transition: "background 0.15s",
    cursor: "pointer",
  };

  return (
    <div style={vars}>
      {/* Progress dots */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {STAGES.map((_, i) => (
          <div key={i} style={{
            width: i === cur ? 20 : 8, height: 8, borderRadius: 4,
            background: i === cur ? vars["--hl-text1"] : vars["--hl-border2"],
            transition: "all 0.3s",
          }} />
        ))}
      </div>

      {/* Stage */}
      <div key={cur}>
        <p style={{ fontSize: 15, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: vars["--hl-text3"], margin: "0 0 4px" }}>
          {cur + 1} of {STAGES.length}
        </p>
        <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 8px", color: vars["--hl-text1"] }}>
          {stage.title}
        </h3>
        <p style={{ fontSize: 15, color: vars["--hl-text2"], lineHeight: 1.6, margin: "0 0 16px" }}>
          {stage.caption}
        </p>
        <Body />
      </div>

      {/* Nav buttons */}
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button onClick={() => go(-1)} disabled={cur === 0}
          style={{ ...btnStyle, opacity: cur === 0 ? 0.35 : 1, cursor: cur === 0 ? "default" : "pointer" }}>
          ← Back
        </button>
        <button onClick={() => go(1)} disabled={cur === STAGES.length - 1}
          style={{ ...btnStyle, opacity: cur === STAGES.length - 1 ? 0.35 : 1, cursor: cur === STAGES.length - 1 ? "default" : "pointer" }}>
          {cur === STAGES.length - 1 ? "Done ✓" : "Next →"}
        </button>
      </div>
    </div>
  );
}
