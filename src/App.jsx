import { useEffect, useMemo, useRef, useState } from "react";
import { me, camps, MAX_ELEVATION } from "./data.js";

const STOPS = [
  [0.0, [206, 226, 218]],
  [0.35, [143, 184, 207]],
  [0.7, [47, 74, 107]],
  [1.0, [16, 22, 46]],
];
function skyAt(p) {
  for (let i = 1; i < STOPS.length; i++) {
    if (p <= STOPS[i][0]) {
      const [a, ca] = STOPS[i - 1], [b, cb] = STOPS[i];
      const t = (p - a) / (b - a);
      return ca.map((v, k) => Math.round(v + (cb[k] - v) * t));
    }
  }
  return STOPS[STOPS.length - 1][1];
}

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

function TypingText() {
  const texts = [
    "Java Developer",
    "Full Stack Developer",
    "AI Enthusiast"
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    // Hold the completed text for 2 seconds
    if (!deleting && displayText === currentText) {
      const timer = setTimeout(() => {
        setDeleting(true);
      }, 2000);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      } else {
        setDisplayText(currentText.slice(0, displayText.length - 1));

        if (displayText.length === 1) {
          setDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, deleting ? 70 : 100);

    return () => clearTimeout(timer);
  }, [displayText, deleting, textIndex]);

  return (
    <span>
      {displayText}
      <span className="typing-cursor">|</span>
    </span>
  );
}

function useProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? clamp(window.scrollY / max) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  return p;
}

// Living sky: sun turns into moon, clouds drift low down, snow falls up high.
function Sky({ p }) {
  const t = clamp((p - 0.5) / 0.25);
  const left = `${12 + p * 70}%`;
  return (
    <div className="sky" aria-hidden="true">
      <div className="orb sun" style={{ opacity: 1 - t, left }} />
      <div className="orb moon" style={{ opacity: t, left }} />
      <div className="clouds" style={{ opacity: clamp(1 - p * 1.3) }}><i /><i /><i /><i /></div>
      <div className="snow" style={{ opacity: clamp((p - 0.55) * 2.5) }} />
    </div>
  );
}

function Ridges({ p }) {
  const drop = p * 160;
  return (
    <svg className="ridges" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true">
      <path style={{ transform: `translateY(${drop * 0.3}px)` }} fill="#5c7f8f" opacity=".55"
        d="M0 260 L120 170 L220 230 L360 120 L470 220 L600 150 L740 240 L880 130 L1010 210 L1200 140 V400 H0Z" />
      <path style={{ transform: `translateY(${drop * 0.6}px)` }} fill="#2f5a55" opacity=".8"
        d="M0 320 L140 240 L260 300 L420 200 L560 290 L700 220 L860 310 L1000 230 L1200 300 V400 H0Z" />
      <path style={{ transform: `translateY(${drop}px)` }} fill="#173a33"
        d="M0 370 L180 310 L320 350 L520 290 L700 360 L900 300 L1050 350 L1200 320 V400 H0Z" />
    </svg>
  );
}

function Trail({ p, active }) {
  const elevation = Math.round(p * MAX_ELEVATION);
  const temp = Math.round(24 - p * 34);
  const here = camps.find((c) => c.id === active);
  return (
    <nav className="trail" aria-label="Trail map: jump to a camp">
      <div className="trail-line">
        <div className="trail-fill" style={{ height: `${p * 100}%` }} />
        <div className="hiker" style={{ bottom: `${p * 100}%` }} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="26" height="26">
            <circle cx="12" cy="5" r="3" fill="#f2b24c" stroke="#173a33" strokeWidth="1.5" />
            <path d="M12 8v7M12 10l-4 3M12 10l4 2M12 15l-3 6M12 15l3 6" stroke="#173a33" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M19 8v14" stroke="#173a33" strokeWidth="1.5" />
          </svg>
        </div>
        {camps.map((c) => (
          <a key={c.id} href={`#${c.id}`} className={"tick" + (active === c.id ? " on" : "")}
            style={{ bottom: `${(c.elevation / MAX_ELEVATION) * 100}%` }} aria-label={c.name}>
            <span>{c.name.split(":")[0]}</span>
          </a>
        ))}
      </div>
      <div className="altimeter">
        {elevation.toLocaleString()} m
        <small>{temp}°C{here ? ` · ${here.name.split(":")[0]}` : ""}</small>
      </div>
    </nav>
  );
}

function Camp({ c, side }) {
  const ref = useRef(null);
  const [planted, setPlanted] = useState(false);
  const bits = useMemo(() => Array.from({ length: 30 }, () => ({
    x: `${Math.round(Math.random() * 100 - 50)}vw`,
    r: `${Math.round(Math.random() * 720)}deg`,
    d: `${(Math.random() * 0.4).toFixed(2)}s`,
    c: ["#f2b24c", "#7fd0e0", "#f4f8f7", "#e46a4b"][Math.floor(Math.random() * 4)],
  })), []);

  // Panel slides in the first time it comes into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id={c.id} className={`camp ${side}`} aria-labelledby={`${c.id}-h`}>
      <div className="panel" ref={ref} tabIndex={0}>
        <p className="camp-name">{c.name} · {c.elevation.toLocaleString()} m</p>

        {c.photo && (
          <img
            className="photo"
            src={`${import.meta.env.BASE_URL}${c.photo}`}
            alt={c.photoAlt || ""}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        )}

        <h2 id={`${c.id}-h`}>{c.title}</h2>
        {c.body?.map((t, i) => <p key={i}>{t}</p>)}

        {c.stats && (
          <ul className="stats">
            {c.stats.map((s) => <li key={s.label}><strong>{s.value}</strong><span>{s.label}</span></li>)}
          </ul>
        )}

        {c.timeline && c.timeline.map((t) => (
          <article key={t.title + t.when} className="project">
            <h3>{t.title}</h3>
            <p className="stack">{t.place} · {t.when}</p>
            {t.text && <p>{t.text}</p>}
          </article>
        ))}
        {c.reasons && c.reasons.map((r) => (
          <article key={r.title} className="project">
            <div className="reason-icon">{r.icon}</div>
            <h3>{r.title}</h3>
            <p>{r.text}</p>
          </article>
        ))}
        {c.skills && c.skills.map((g) => (
          <div key={g.group} className="skill-row">
            <h3>{g.group}</h3>
            <ul>{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        ))}

        {c.projects && c.projects.map((pr) => (
          <article key={pr.name} className="project">
            <h3><a href={pr.href} target="_blank" rel="noreferrer">{pr.name}</a></h3>
            <p>{pr.text}</p>
            <p className="stack">{pr.stack}</p>
          </article>
        ))}

        {/* Camp 4: achievements look like stamps in a trek passport */}
        {c.achievements && c.achievements.map((a, i) => (
          <article key={a.title + a.when} className="stamp"
            style={{ "--tilt": `${(i % 2 ? 1 : -1) * (1 + (i % 3) * 0.5)}deg` }}>
            <h3>{a.href ? <a href={a.href} target="_blank" rel="noreferrer">{a.title}</a> : a.title}</h3>
            <p className="stack">{a.by} · {a.when}</p>
            {a.text && <p>{a.text}</p>}
          </article>
        ))}

        {c.contact && (
          <>
            <a className="mail" href={`mailto:${me.email}`}>{me.email}</a>
            <ul className="links">
              {me.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={
                      l.label === "Resume (PDF)"
                        ? `${import.meta.env.BASE_URL}${l.href}`
                        : l.href
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <p>
              <button className="flag-btn" onClick={() => setPlanted(true)} disabled={planted}>
                {planted ? "🚩 Flag planted!" : "🚩 Plant my flag"}
              </button>
            </p>
            {planted && <p>Thanks for climbing all the way up. <a href="#base">Back to base camp ↑</a></p>}
          </>
        )}
      </div>
      {planted && (
        <div className="confetti" aria-hidden="true">
          {bits.map((b, i) => <i key={i} style={{ "--x": b.x, "--r": b.r, "--d": b.d, background: b.c }} />)}
        </div>
      )}
    </section>
  );
}

export default function App() {
  const p = useProgress();
  const [r, g, b] = skyAt(p);
  const active = [...camps].reverse().find((c) => p * MAX_ELEVATION >= c.elevation - 500)?.id;
  return (
    <div className="app" style={{ background: `rgb(${r},${g},${b})` }}>
      <Sky p={p} />
      <div className="stars" style={{ opacity: Math.max(0, (p - 0.65) * 3) }} aria-hidden="true" />
      <Ridges p={p} />
      <Trail p={p} active={active} />
      <header className="top"> <span>{me.name}</span><span><TypingText /></span></header>
      <main>
        {camps.map((c, i) => <Camp key={c.id} c={c} side={i % 2 ? "right" : "left"} />)}
      </main>
    </div>
  );
}
