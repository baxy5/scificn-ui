import { Link } from "react-router-dom";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Panel, PanelHeader, PanelTitle, PanelContent } from "@/ui/panel";
import { Spinner } from "@/ui/spinner";
import { Progress } from "@/ui/progress";

const features = [
  {
    title: "ZERO ROUNDED CORNERS",
    desc: "Hard edges. Sharp geometry. No compromise.",
    icon: "□",
  },
  {
    title: "PHOSPHOR GLOW FX",
    desc: "Green, amber, and red glow effects on active states.",
    icon: "◈",
  },
  {
    title: "RADIX A11Y",
    desc: "Every component is accessible — keyboard, screen reader, ARIA.",
    icon: "◎",
  },
  {
    title: "COPY-PASTE",
    desc: "Own the code. No version lock-in. Modify everything.",
    icon: "▶",
  },
];

const componentList = [
  "ALERT",
  "BADGE",
  "BUTTON",
  "CHECKBOX",
  "DIALOG",
  "INPUT",
  "PANEL",
  "PROGRESS",
  "SELECT",
  "SEPARATOR",
  "SPINNER",
  "SWITCH",
  "TABS",
  "TEXTAREA",
  "TOAST",
  "TOOLTIP",
];

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
      {/* Hero */}
      <section style={{ paddingTop: "1rem" }}>
        <div
          style={{
            fontSize: "0.7rem",
            color: "var(--text-muted)",
            letterSpacing: "0.2em",
            marginBottom: "1rem",
          }}
        >
          ▶ SYSTEM INITIALIZED — COMPONENT LIBRARY ONLINE
        </div>

        <pre
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(1rem, 3vw, 1.75rem)",
            fontWeight: 700,
            color: "var(--color-green)",
            textShadow: "var(--text-glow-green)",
            letterSpacing: "0.12em",
            margin: "0 0 1rem",
            lineHeight: 1.2,
          }}
        >
          {`╔═══════════════════════╗
║  S C I F I C N / U I  ║
╚═══════════════════════╝`}
        </pre>

        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
            letterSpacing: "0.04em",
            lineHeight: 1.7,
            maxWidth: "560px",
            marginBottom: "1.5rem",
          }}
        >
          A retro sci-fi React component library. Built on Radix UI and Tailwind
          CSS. Copy-paste components into your project and own the code.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Button variant="EXEC" size="LG" asChild>
            <Link to="/docs/introduction">EXPLORE DOCS</Link>
          </Button>
          <Button variant="OUTLINE" size="LG" asChild>
            <Link to="/components/button">VIEW COMPONENTS</Link>
          </Button>
        </div>
      </section>

      {/* Component preview strip */}
      <section>
        <div
          style={{
            fontSize: "0.65rem",
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
            marginBottom: "1rem",
          }}
        >
          — LIVE PREVIEW ——————————————————————
        </div>
        <Panel
          notch="md"
          style={{
            padding: "1.5rem",
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
          className="scanlines"
        >
          <Badge variant="ACTIVE">ONLINE</Badge>
          <Badge variant="SCANNING">SCANNING</Badge>
          <Badge variant="WARNING">WARNING</Badge>
          <Badge variant="CRITICAL">CRITICAL</Badge>
          <Badge variant="OFFLINE">OFFLINE</Badge>
          <div
            style={{
              width: "1px",
              height: "24px",
              background: "var(--border)",
            }}
          />
          <Button variant="EXEC" size="SM">
            EXECUTE
          </Button>
          <Button variant="OUTLINE" size="SM">
            STANDBY
          </Button>
          <Button variant="ABORT" size="SM">
            ABORT
          </Button>
          <div
            style={{
              width: "1px",
              height: "24px",
              background: "var(--border)",
            }}
          />
          <Spinner label="SCANNING..." />
          <div style={{ width: "160px" }}>
            <Progress value={67} label="POWER CORE" />
          </div>
        </Panel>
      </section>

      {/* Features grid */}
      <section>
        <div
          style={{
            fontSize: "0.65rem",
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
            marginBottom: "1rem",
          }}
        >
          — SYSTEM FEATURES —————————————————————
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: "var(--surface)",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  color: "var(--color-green)",
                  fontSize: "1.25rem",
                  textShadow: "var(--text-glow-green)",
                }}
              >
                {f.icon}
              </span>
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "var(--text-secondary)",
                  letterSpacing: "0.1em",
                }}
              >
                {f.title}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                }}
              >
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick start */}
      <section>
        <div
          style={{
            fontSize: "0.65rem",
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
            marginBottom: "1rem",
          }}
        >
          — QUICK START ————————————————————————
        </div>
        <Panel notch="sm">
          <PanelHeader>
            <PanelTitle>INSTALLATION</PanelTitle>
          </PanelHeader>
          <PanelContent>
            <pre
              style={{
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                margin: 0,
                fontFamily: "var(--font-mono)",
              }}
            >
              {`# 1. Install dependencies
npm install tailwindcss @tailwindcss/vite \\
  @radix-ui/react-slot class-variance-authority \\
  clsx tailwind-merge

# 2. Copy globals.css into your project
# 3. Copy any component from src/ui/

# Example: using Button
import { Button } from '@/ui/button'

<Button variant="EXEC">INITIATE</Button>`}
            </pre>
          </PanelContent>
        </Panel>
      </section>

      {/* Component list */}
      <section>
        <div
          style={{
            fontSize: "0.65rem",
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
            marginBottom: "1rem",
          }}
        >
          — AVAILABLE COMPONENTS ——————————————
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {componentList.map((name) => (
            <Link
              key={name}
              to={`/components/${name.toLowerCase()}`}
              style={{
                fontSize: "0.65rem",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
                padding: "3px 8px",
                letterSpacing: "0.08em",
                textDecoration: "none",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-green)";
                e.currentTarget.style.borderColor = "var(--color-green)";
                e.currentTarget.style.textShadow = "var(--text-glow-green)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.textShadow = "none";
              }}
            >
              {name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
