import { useState, useRef, useEffect } from "react";

const COLORS = {
  red: "#BB0000",
  green: "#006600",
  black: "#1a1a1a",
  gold: "#D4A017",
  cream: "#FDF6E3",
  sand: "#E8D5A3",
  bark: "#8B6914",
  moss: "#4A7C59",
  lightMoss: "#E8F5EC",
  clay: "#C47C3A",
  darkText: "#1C1008",
  mutedText: "#6B5A3E",
  bubble: "#FFFFFF",
  bubbleAI: "#E8F5EC",
  border: "#D4C89A",
};

const TOPICS = [
  { id: "physics", label: "⚡ Physics", emoji: "⚡" },
  { id: "biology", label: "🌿 Biology", emoji: "🌿" },
  { id: "maths", label: "📐 Maths", emoji: "📐" },
  { id: "chemistry", label: "🧪 Chemistry", emoji: "🧪" },
];

const RESPONSES = {
  english: {
    physics: {
      intro: "Let's talk about Voltage and Current! 🔌",
      body: "Imagine a large water tank on top of your roof at home. The height of the water represents **Voltage** — the higher the tank, the more pressure pushing the water down. The actual flow of water through the pipes is **Current** (measured in Amperes). If you widen the pipe, more water flows — that's lowering **Resistance**. This is exactly **Ohm's Law**: V = I × R. The higher the voltage, the more current flows, assuming resistance stays the same. Simple, right?",
      followUp: "Can you now tell me — if you increase the pipe diameter (lower resistance), what happens to current flow?",
    },
    biology: {
      intro: "Let's explore Photosynthesis! 🌿",
      body: "Think of a plant as a chef in a kitchen. The kitchen uses **sunlight** (the energy source), **carbon dioxide** from the air (like flour — the raw ingredient), and **water** from the soil (like water for cooking). The plant combines these to cook up **glucose** — its food — and releases **oxygen** as a by-product. The equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. This all happens in the **chloroplasts**, the green parts of leaves.",
      followUp: "What do you think happens to photosynthesis on a cloudy day when sunlight is reduced?",
    },
    maths: {
      intro: "Let's crack Quadratic Equations! 📐",
      body: "A quadratic equation looks like: **ax² + bx + c = 0**. To solve it, use the formula: x = (−b ± √(b²−4ac)) / 2a. Think of it like finding out how many days it takes two people doing a job together. The ± means you get two possible answers. Let's try: x² + 5x + 6 = 0. Here a=1, b=5, c=6. The discriminant: 25−24 = 1. So x = (−5 ± 1)/2, giving x = −2 or x = −3. Always check your answers by substituting back!",
      followUp: "Try this one: x² − 7x + 12 = 0. What are the two values of x?",
    },
    chemistry: {
      intro: "Let's understand Acids and Bases! 🧪",
      body: "You've seen lemon juice taste sour and baking soda fizz in water — that's **acids** and **bases** in action. Acids have a **pH below 7**, bases above 7, and pure water is exactly 7 (neutral). The **pH scale** runs 0–14. Vinegar (pH 3) is acidic like battery acid. Soap (pH 9) is basic. When an acid meets a base, they neutralise — like fire meeting rain. The product is salt and water. Example: HCl + NaOH → NaCl + H₂O. That's the same salt you put on ugali!",
      followUp: "If you mix equal amounts of a strong acid (pH 2) and a strong base (pH 12), what pH do you expect?",
    },
    default: "Great question! Let me break that down for you step by step. STEM topics can seem hard at first, but with the right analogy, everything clicks. Could you tell me which subject area this falls under — Physics, Biology, Maths, or Chemistry?",
  },
  sheng: {
    physics: {
      intro: "Sawa fam, tunaimba kuhusu Voltage na Current! ⚡",
      body: "Fikiria tank ya maji juu ya nyumba yenu kwa plot — ule mwingine wa kupanda kwa nguvu. Urefu wa maji ndio **Voltage** — kama maji iko juu zaidi, pressure inakuwa kubwa zaidi, fam! Sasa mtiririko wa maji kwenye mabomba ndio **Current** (inapimwa kwa Amperes). Ukipanua bomba, maji mengi zaidi yanapita — hiyo ni kupunguza **Resistance**. Hii ndiyo exactly **Ohm's Law**: V = I × R. Simple aje — kama kuongeza tap kubwa zaidi, zaidi ya maji yanaweza kutoka!",
      followUp: "Sawa, sema — kama upanua bomba (resistance inashuka), nini kinatokea kwa mtiririko wa maji/current?",
    },
    biology: {
      intro: "Buda, twende kwenye Photosynthesis — si ngumu fam! 🌿",
      body: "Fikiria mmea kama mama akipika chapati nyumbani. Anatumia **jua** (hiyo ndiyo stove/moto), **CO₂** kutoka hewani (kama unga), na **maji** kutoka ardhini (maji ya kupikia). Anachanganya vyote hivi na kupika **glucose** — chakula cha mmea — na anatoa **oxygen** kama moshi, lakini moshi mzuri ambao tunaweza kupumua! Equation yake: 6CO₂ + 6H₂O + nishati ya jua → C₆H₁₂O₆ + 6O₂. Hii yote inafanyika kwenye **kloroplas** — sehemu za kijani za majani.",
      followUp: "Sasa niambie — ukiwa na siku ya mawingu bila jua, unafikiria photosynthesis inabadilika aje?",
    },
    maths: {
      intro: "Maze, tuambie kuhusu Quadratic Equations — ni sawa tu! 📐",
      body: "Equation ya quadratic inaonekana hivi: **ax² + bx + c = 0**. Kutoa jibu, tumia formula hii: x = (−b ± √(b²−4ac)) / 2a. Fikiria kama kujua wakati wanaochukua biashara mbili kukamilika pamoja — unaweza kupata majibu mawili! ± inamaanisha unaweza pata solutions mbili. Jaribu: x² + 5x + 6 = 0. Hapa a=1, b=5, c=6. Discriminant: 25−24 = 1. Kwa hivyo x = (−5 ± 1)/2, maana yake x = −2 au x = −3. Weka jibu back kwenye equation kucheck — kama kuangalia change baada ya kununua!",
      followUp: "Jaribu hii wewe mwenyewe: x² − 7x + 12 = 0. x ni nini? Niambie mara mbili!",
    },
    chemistry: {
      intro: "Fam, twende haraka kwenye Acids na Bases! 🧪",
      body: "Umewahi tafuna ndimu — ile sour taste? Hiyo ni **acid** fam! Na baking soda ukichanganya na maji, inafanyia kelele — hiyo ni **base**. **pH scale** inaenda 0 mpaka 14. Chini ya 7 ni acidic kama siki (pH 3), juu ya 7 ni basic kama sabuni (pH 9), na 7 mwenyewe ni neutral kama maji safi. Ukichanganya acid na base, wanasaidiana — *zinafuta nguvu zao* — na kutoa chumvi na maji. Mfano: HCl + NaOH → NaCl + H₂O. Hiyo NaCl — ndiyo chumvi unayoweka kwenye ugali wako!",
      followUp: "Sema, ukichanganya acid yenye pH 2 na base yenye pH 12, unafikiria pH ya mchanganyiko ni ngapi?",
    },
    default: "Sawa sawa fam, swali nzuri! Hebu tuangalie hilo pamoja. STEM inaweza ionekana ngumu lakini ukielewa analogy mzuri, inakuwa rahisi kama kupanda boda boda! Niambie — swali lako ni la Physics, Bio, Maths, ama Chem?",
  },
};

function getAIResponse(userMsg, mode, topic) {
  const lang = mode === "english" ? "english" : "sheng";
  const lowerMsg = userMsg.toLowerCase();

  let detectedTopic = topic;
  if (!detectedTopic) {
    if (lowerMsg.match(/volt|current|resist|circuit|electron|ohm|electric/)) detectedTopic = "physics";
    else if (lowerMsg.match(/photo|plant|cell|dna|osmosis|enzyme|chloro|bio/)) detectedTopic = "biology";
    else if (lowerMsg.match(/equation|quadratic|algebra|calculus|matrix|math|trigon/)) detectedTopic = "maths";
    else if (lowerMsg.match(/acid|base|ph|react|element|atom|molecule|chem/)) detectedTopic = "chemistry";
  }

  const responses = RESPONSES[lang];
  if (detectedTopic && responses[detectedTopic]) {
    const r = responses[detectedTopic];
    return `${r.intro}\n\n${r.body}\n\n💡 *${r.followUp}*`;
  }
  return responses.default;
}

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
}

const styles = {
  app: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    maxWidth: 420,
    margin: "0 auto",
    background: COLORS.cream,
    fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
    position: "relative",
    overflow: "hidden",
    border: `1px solid ${COLORS.border}`,
    boxShadow: "0 0 40px rgba(0,0,0,0.15)",
  },
  header: {
    background: `linear-gradient(135deg, ${COLORS.green} 0%, #004400 100%)`,
    padding: "14px 16px 10px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    flexShrink: 0,
    borderBottom: `3px solid ${COLORS.red}`,
  },
  headerTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatarWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: COLORS.gold,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    border: `2px solid ${COLORS.sand}`,
    flexShrink: 0,
  },
  headerName: {
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 16,
    letterSpacing: 0.3,
  },
  headerSub: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    marginTop: 1,
  },
  toggleBtn: (active) => ({
    background: active ? COLORS.gold : "rgba(255,255,255,0.15)",
    border: "none",
    borderRadius: 20,
    padding: "6px 14px",
    fontSize: 11,
    fontWeight: 600,
    color: active ? COLORS.black : "#fff",
    cursor: "pointer",
    transition: "all 0.2s",
    letterSpacing: 0.3,
  }),
  topicBar: {
    display: "flex",
    gap: 6,
    overflowX: "auto",
    paddingBottom: 2,
    scrollbarWidth: "none",
  },
  topicBtn: (active) => ({
    background: active ? COLORS.gold : "rgba(255,255,255,0.15)",
    border: "none",
    borderRadius: 16,
    padding: "5px 12px",
    fontSize: 11,
    fontWeight: 600,
    color: active ? COLORS.black : "#fff",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.2s",
    flexShrink: 0,
  }),
  chatBg: {
    flex: 1,
    overflowY: "auto",
    padding: "16px 12px",
    background: `
      radial-gradient(ellipse at 10% 20%, rgba(0,102,0,0.04) 0%, transparent 50%),
      radial-gradient(ellipse at 90% 80%, rgba(187,0,0,0.03) 0%, transparent 50%),
      ${COLORS.cream}
    `,
    scrollbarWidth: "thin",
    scrollbarColor: `${COLORS.border} transparent`,
  },
  dateBadge: {
    textAlign: "center",
    fontSize: 11,
    color: COLORS.mutedText,
    margin: "8px 0 12px",
    background: "rgba(212,200,154,0.4)",
    borderRadius: 10,
    padding: "3px 10px",
    display: "inline-block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "fit-content",
  },
  msgRow: (isUser) => ({
    display: "flex",
    justifyContent: isUser ? "flex-end" : "flex-start",
    marginBottom: 6,
    alignItems: "flex-end",
    gap: 6,
  }),
  msgAvatar: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: COLORS.moss,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    flexShrink: 0,
  },
  bubble: (isUser) => ({
    maxWidth: "75%",
    background: isUser ? COLORS.green : COLORS.bubble,
    color: isUser ? "#fff" : COLORS.darkText,
    padding: "9px 13px",
    borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
    fontSize: 13.5,
    lineHeight: 1.55,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    border: isUser ? "none" : `0.5px solid ${COLORS.border}`,
    wordBreak: "break-word",
  }),
  bubbleTime: (isUser) => ({
    fontSize: 10,
    color: isUser ? "rgba(255,255,255,0.65)" : COLORS.mutedText,
    marginTop: 4,
    textAlign: "right",
  }),
  typingBubble: {
    background: COLORS.bubble,
    border: `0.5px solid ${COLORS.border}`,
    borderRadius: "18px 18px 18px 4px",
    padding: "10px 16px",
    display: "flex",
    gap: 5,
    alignItems: "center",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  typingDot: (delay) => ({
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: COLORS.moss,
    animation: "bounce 1.2s infinite",
    animationDelay: delay,
  }),
  inputBar: {
    background: "#fff",
    borderTop: `1px solid ${COLORS.border}`,
    padding: "10px 12px",
    display: "flex",
    gap: 8,
    alignItems: "flex-end",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    background: COLORS.cream,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 22,
    padding: "9px 16px",
    fontSize: 14,
    color: COLORS.darkText,
    outline: "none",
    resize: "none",
    fontFamily: "inherit",
    lineHeight: 1.4,
    maxHeight: 80,
    overflowY: "auto",
  },
  sendBtn: (enabled) => ({
    width: 42,
    height: 42,
    borderRadius: "50%",
    background: enabled ? COLORS.green : COLORS.border,
    border: "none",
    cursor: enabled ? "pointer" : "default",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    flexShrink: 0,
    transition: "background 0.2s, transform 0.1s",
    transform: enabled ? "scale(1)" : "scale(0.95)",
  }),
  kenyaStripe: {
    height: 4,
    background: `linear-gradient(to right, ${COLORS.black} 0%, ${COLORS.black} 33%, ${COLORS.red} 33%, ${COLORS.red} 66%, ${COLORS.green} 66%, ${COLORS.green} 100%)`,
    flexShrink: 0,
  },
};

const CSS_ANIM = `
  @keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-5px); }
  }
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .msg-anim { animation: fadeSlideIn 0.25s ease forwards; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #D4C89A; border-radius: 4px; }
  textarea:focus { box-shadow: 0 0 0 2px rgba(0,102,0,0.2); }
`;

function getTime() {
  return new Date().toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" });
}

export default function MwalimuAI() {
  const [mode, setMode] = useState("sheng");
  const [activeTopic, setActiveTopic] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1, role: "ai", time: getTime(),
      text: mode === "sheng"
        ? "Mambo fam! 👋 Mimi ni **Mwalimu AI** — tutor wako wa STEM. Chagua topic hapa juu ama niulize swali lolote. Tukae pamoja! 🇰🇪"
        : "Hello! 👋 I'm **Mwalimu AI**, your personal STEM tutor. Pick a topic above or ask me anything. Let's learn together! 🇰🇪",
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text, fromTopic) => {
    const msg = text || input.trim();
    if (!msg || isTyping) return;
    setInput("");
    const userMsg = { id: Date.now(), role: "user", time: getTime(), text: msg };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setTimeout(() => {
      const reply = getAIResponse(msg, mode, fromTopic || activeTopic);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: "ai", time: getTime(), text: reply }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 600);
  };

  const handleTopicClick = (topicId) => {
    setActiveTopic(topicId);
    const label = TOPICS.find(t => t.id === topicId)?.label || topicId;
    const prompt = mode === "sheng"
      ? `Nifundishe ${label} fam, nianze na basics`
      : `Teach me about ${label}, start with the basics`;
    sendMessage(prompt, topicId);
  };

  const handleToggle = () => {
    const newMode = mode === "english" ? "sheng" : "english";
    setMode(newMode);
    const switchMsg = newMode === "sheng"
      ? "Sawa! Sasa tunaongea Sheng/Mix — karibu zaidi! 🤙"
      : "Switched to Strict English mode. Let's keep it formal and clear! 📚";
    setMessages(prev => [...prev, { id: Date.now(), role: "ai", time: getTime(), text: switchMsg }]);
  };

  return (
    <>
      <style>{CSS_ANIM}</style>
      <div style={styles.app}>
        <div style={styles.kenyaStripe} />
        <div style={styles.header}>
          <div style={styles.headerTop}>
            <div style={styles.avatarWrap}>
              <div style={styles.avatar}>🎓</div>
              <div>
                <div style={styles.headerName}>Mwalimu AI</div>
                <div style={styles.headerSub}>STEM Tutor · Form 1–4 · 🟢 Online</div>
              </div>
            </div>
            <button style={styles.toggleBtn(true)} onClick={handleToggle}>
              {mode === "sheng" ? "🇰🇪 Sheng/Mix" : "📚 Strict EN"}
            </button>
          </div>
          <div style={styles.topicBar}>
            {TOPICS.map(t => (
              <button
                key={t.id}
                style={styles.topicBtn(activeTopic === t.id)}
                onClick={() => handleTopicClick(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.chatBg}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span style={styles.dateBadge}>Today</span>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className="msg-anim" style={styles.msgRow(msg.role === "user")}>
              {msg.role === "ai" && <div style={styles.msgAvatar}>🤖</div>}
              <div>
                <div
                  style={styles.bubble(msg.role === "user")}
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                />
                <div style={styles.bubbleTime(msg.role === "user")}>{msg.time}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="msg-anim" style={styles.msgRow(false)}>
              <div style={styles.msgAvatar}>🤖</div>
              <div style={styles.typingBubble}>
                <div style={styles.typingDot("0s")} />
                <div style={styles.typingDot("0.2s")} />
                <div style={styles.typingDot("0.4s")} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div style={styles.inputBar}>
          <textarea
            ref={inputRef}
            rows={1}
            style={styles.input}
            placeholder={mode === "sheng" ? "Andika swali lako..." : "Type your question..."}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
            }}
          />
          <button
            style={styles.sendBtn(!!input.trim() && !isTyping)}
            onClick={() => sendMessage()}
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
}
