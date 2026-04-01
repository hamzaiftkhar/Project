import { useEffect, useMemo, useState } from "react";
import "./App.css";

const SCAN_MESSAGES = [
  "Calibrating heartstrings...",
  "Checking overthinking frequency...",
  "Counting dramatic sighs from this week...",
  "Detecting hidden main character energy...",
  "Running absolutely scientific vibes analysis...",
];

const REASSURANCE_LINES = [
  "You are not too much. You are a whole plotline.",
  "You are allowed to be complicated and still lovable.",
  "You are not behind in life. You are in your own season.",
  "You are someone people are lucky to know.",
  "You deserve kindness, including from yourself.",
];

const RELATIONSHIP_STATUS = [
  "Single",
  "Situationship",
  "Crushing quietly",
  "In a relationship",
  "It's complicated",
];

const LOVE_LANGUAGES = [
  "Words of affirmation",
  "Quality time",
  "Acts of service",
  "Gift giving",
  "Physical touch",
];

const GREEN_FLAGS = [
  "Replies with context",
  "Sends good morning texts",
  "Remembers small details",
  "Respects boundaries",
  "Can apologize properly",
  "Likes your weird humor",
];

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function App() {
  const [name, setName] = useState("");
  const [crushName, setCrushName] = useState("");
  const [status, setStatus] = useState(RELATIONSHIP_STATUS[2]);
  const [loveLanguage, setLoveLanguage] = useState(LOVE_LANGUAGES[0]);
  const [favoriteSong, setFavoriteSong] = useState("");
  const [lastText, setLastText] = useState("");
  const [secretWish, setSecretWish] = useState("");
  const [dramaLevel, setDramaLevel] = useState(65);
  const [greenFlags, setGreenFlags] = useState([]);
  const [stage, setStage] = useState("intro");
  const [progress, setProgress] = useState(0);
  const [scanMessageIndex, setScanMessageIndex] = useState(0);

  const formReady =
    name.trim().length > 1 &&
    crushName.trim().length > 1 &&
    favoriteSong.trim().length > 2 &&
    lastText.trim().length > 3 &&
    secretWish.trim().length > 6;

  const scoreCards = useMemo(
    () => ({
      mainCharacter: randomBetween(88, 100),
      compatibility: randomBetween(76, 98),
      chemistryBurst: randomBetween(70, 97),
      textingSync: randomBetween(68, 96),
      emotionalSupportAnimal: ["Golden Retriever", "Concerned Cat", "Chaotic Capybara"][
        randomBetween(0, 2)
      ],
      line: REASSURANCE_LINES[randomBetween(0, REASSURANCE_LINES.length - 1)],
    }),
    []
  );

  useEffect(() => {
    if (stage !== "scanner") {
      return undefined;
    }

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + randomBetween(7, 14);
      });
    }, 430);

    const messageTimer = setInterval(() => {
      setScanMessageIndex((prev) => (prev + 1) % SCAN_MESSAGES.length);
    }, 900);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, [stage]);

  useEffect(() => {
    if (stage === "scanner" && progress >= 100) {
      const doneTimer = setTimeout(() => setStage("results"), 700);
      return () => clearTimeout(doneTimer);
    }
    return undefined;
  }, [progress, stage]);

  const startScan = () => {
    if (!formReady) {
      return;
    }
    setProgress(0);
    setScanMessageIndex(0);
    setStage("scanner");
  };

  const toggleGreenFlag = (flag) => {
    setGreenFlags((prev) => {
      if (prev.includes(flag)) {
        return prev.filter((item) => item !== flag);
      }
      return [...prev, flag];
    });
  };

  return (
    <main className="april-lab">
      <div className="backdrop-orb orb-1" />
      <div className="backdrop-orb orb-2" />
      <div className="backdrop-grid" />

      <section className="panel">
        <p className="eyebrow">APRIL FEELINGS LAB</p>

        {stage === "intro" && (
          <div className="intro reveal">
            <h1>Heartstrings Control Panel</h1>
            <p className="lead">
              This emotional-lens intake form builds a personalized compatibility profile and feelings report.
            </p>

            <div className="form-grid">
              <div>
                <label htmlFor="nameInput" className="label">
                  Your name
                </label>
                <input
                  id="nameInput"
                  value={name}
                  onChange={(event) => setName(event.target.value.slice(0, 24))}
                  placeholder="Type your name..."
                />
              </div>

              <div>
                <label htmlFor="crushInput" className="label">
                  Their name
                </label>
                <input
                  id="crushInput"
                  value={crushName}
                  onChange={(event) => setCrushName(event.target.value.slice(0, 24))}
                  placeholder="Type their name..."
                />
              </div>
            </div>

            <label htmlFor="statusSelect" className="label">
              Current status
            </label>
            <select
              id="statusSelect"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              {RELATIONSHIP_STATUS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <label htmlFor="loveLanguage" className="label">
              Your primary love language
            </label>
            <select
              id="loveLanguage"
              value={loveLanguage}
              onChange={(event) => setLoveLanguage(event.target.value)}
            >
              {LOVE_LANGUAGES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <label htmlFor="songInput" className="label">
              Song that reminds you of them
            </label>
            <input
              id="songInput"
              value={favoriteSong}
              onChange={(event) => setFavoriteSong(event.target.value.slice(0, 80))}
              placeholder="e.g. Yellow by Coldplay"
            />

            <label htmlFor="lastText" className="label">
              Last text you wanted to send but didn't
            </label>
            <textarea
              id="lastText"
              value={lastText}
              onChange={(event) => setLastText(event.target.value.slice(0, 220))}
              placeholder="Type the unsent text..."
              rows={3}
            />

            <label className="label">Green flags detected</label>
            <div className="chip-list">
              {GREEN_FLAGS.map((flag) => (
                <button
                  key={flag}
                  type="button"
                  className={`chip ${greenFlags.includes(flag) ? "chip-active" : ""}`}
                  onClick={() => toggleGreenFlag(flag)}
                >
                  {flag}
                </button>
              ))}
            </div>

            <label htmlFor="secretWish" className="label">
              Secret wish for this connection
            </label>
            <textarea
              id="secretWish"
              value={secretWish}
              onChange={(event) => setSecretWish(event.target.value.slice(0, 260))}
              placeholder="What do you genuinely hope happens?"
              rows={3}
            />

            <label htmlFor="dramaSlider" className="label">
              Drama sensitivity: {dramaLevel}%
            </label>
            <input
              id="dramaSlider"
              type="range"
              min="25"
              max="100"
              value={dramaLevel}
              onChange={(event) => setDramaLevel(Number(event.target.value))}
            />

            <button className="cta" type="button" onClick={startScan} disabled={!formReady}>
              Analyze Compatibility
            </button>
          </div>
        )}

        {stage === "scanner" && (
          <div className="scanner reveal">
            <h2>Analyzing {name} + {crushName}</h2>
            <p className="scan-line">{SCAN_MESSAGES[scanMessageIndex]}</p>
            <div className="meter" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
              <div className="meter-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="percent">{Math.min(progress, 100)}%</p>
          </div>
        )}

        {stage === "results" && (
          <div className="results reveal">
            <h2>Compatibility Report: {name} + {crushName}</h2>
            <div className="cards">
              <article>
                <h3>Love Compatibility</h3>
                <p>{scoreCards.compatibility}%</p>
              </article>
              <article>
                <h3>Main Character Energy</h3>
                <p>{scoreCards.mainCharacter}%</p>
              </article>
              <article>
                <h3>Chemistry Burst</h3>
                <p>{scoreCards.chemistryBurst}%</p>
              </article>
              <article>
                <h3>Texting Rhythm Sync</h3>
                <p>{scoreCards.textingSync}%</p>
              </article>
            </div>

            <p className="support-animal">
              Relationship status signal: <strong>{status}</strong>
            </p>

            <p className="support-animal">
              Dominant love language signal: <strong>{loveLanguage}</strong>
            </p>

            <p className="support-animal">
              Emotional support animal: <strong>{scoreCards.emotionalSupportAnimal}</strong>
            </p>

            <div className="truth-box">
              <p>
                {name}, based on your emotional tempo and selected signals, this connection has soft potential and big feelings.
              </p>
              <p className="tiny">Song anchor detected: {favoriteSong}</p>
            </div>

            <div className="truth-box">
              <p>{scoreCards.line}</p>
              <p className="tiny">Personal note: emotional honesty is attractive.</p>
            </div>

            <button className="reveal-btn" type="button" onClick={() => setStage("prank")}>
              Unlock Final Truth
            </button>
          </div>
        )}

        {stage === "prank" && (
          <div className="prank reveal">
            <p className="glitch">SYSTEM ALERT</p>
            <h2>APRIL FOOL, {name.toUpperCase()}!</h2>
            <p>
              There is no compatibility engine. This was a full emotional theater performance.
            </p>
            <p>
              But your feelings are real, your wish matters, and {scoreCards.line.toLowerCase()}
            </p>
            <div className="confetti-row" aria-hidden="true">
              <span>haha</span>
              <span>gotcha</span>
              <span>april fool</span>
              <span>you passed</span>
              <span>100% iconic</span>
            </div>
            <button className="cta" type="button" onClick={() => setStage("intro")}>
              Prank Someone Else
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
