import styles from "../app/Heroillustration.module.css";

export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.illustration}
      aria-hidden="true"
    >
      {/* Server rack */}
      <rect
        x="40"
        y="60"
        width="190"
        height="260"
        rx="6"
        fill="#F5F5F5"
        stroke="#E0E0E0"
        strokeWidth="1.5"
      />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect
            x="52"
            y={76 + i * 36}
            width="166"
            height="26"
            rx="3"
            fill="#fff"
            stroke="#EAEAEA"
            strokeWidth="1"
          />
          <circle
            cx="202"
            cy={89 + i * 36}
            r="4"
            fill={i % 2 === 0 ? "#FD018B" : "#E0E0E0"}
            opacity={i % 2 === 0 ? (i === 0 ? 1 : 0.4) : 1}
          />
          <rect
            x="64"
            y={84 + i * 36}
            width={60 + i * 10}
            height="7"
            rx="2"
            fill="#EAEAEA"
          />
        </g>
      ))}
      <rect x="40" y="320" width="190" height="7" rx="2" fill="#EAEAEA" />

      {/* Network switch */}
      <rect
        x="270"
        y="140"
        width="170"
        height="54"
        rx="5"
        fill="#F5F5F5"
        stroke="#E0E0E0"
        strokeWidth="1.5"
      />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect
          key={i}
          x={282 + i * 19}
          y="159"
          width="11"
          height="17"
          rx="2"
          fill="#fff"
          stroke="#EAEAEA"
          strokeWidth="1"
        />
      ))}
      <circle cx="426" cy="156" r="4" fill="#FD018B" />

      {/* Cloud */}
      <ellipse
        cx="370"
        cy="72"
        rx="52"
        ry="32"
        fill="#fff"
        stroke="#EAEAEA"
        strokeWidth="1.5"
      />
      <ellipse
        cx="335"
        cy="82"
        rx="30"
        ry="22"
        fill="#fff"
        stroke="#EAEAEA"
        strokeWidth="1.5"
      />
      <ellipse
        cx="408"
        cy="80"
        rx="30"
        ry="22"
        fill="#fff"
        stroke="#EAEAEA"
        strokeWidth="1.5"
      />
      <rect x="320" y="72" width="102" height="20" fill="#fff" />
      <line
        x1="370"
        y1="104"
        x2="370"
        y2="140"
        stroke="#EAEAEA"
        strokeWidth="1"
        strokeDasharray="4 3"
      />

      {/* Laptop */}
      <rect
        x="270"
        y="270"
        width="170"
        height="110"
        rx="5"
        fill="#F5F5F5"
        stroke="#E0E0E0"
        strokeWidth="1.5"
      />
      <rect
        x="282"
        y="282"
        width="146"
        height="86"
        rx="3"
        fill="#fff"
        stroke="#EAEAEA"
        strokeWidth="1"
      />
      <rect x="292" y="292" width="84" height="7" rx="2" fill="#EAEAEA" />
      <rect x="292" y="305" width="126" height="5" rx="2" fill="#F5F5F5" />
      <rect x="292" y="316" width="110" height="5" rx="2" fill="#F5F5F5" />
      <rect
        x="292"
        y="331"
        width="56"
        height="16"
        rx="3"
        fill="#FD018B"
        opacity="0.15"
      />
      <rect
        x="296"
        y="335"
        width="48"
        height="8"
        rx="1.5"
        fill="#FD018B"
        opacity="0.5"
      />
      <rect x="258" y="382" width="194" height="7" rx="3.5" fill="#EAEAEA" />

      {/* Connector lines */}
      <line
        x1="230"
        y1="167"
        x2="270"
        y2="175"
        stroke="#EAEAEA"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <line
        x1="230"
        y1="203"
        x2="270"
        y2="193"
        stroke="#EAEAEA"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <line
        x1="355"
        y1="260"
        x2="355"
        y2="270"
        stroke="#EAEAEA"
        strokeWidth="1"
        strokeDasharray="4 3"
      />

      {/* Dot grid */}
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3, 4].map((c) => (
          <circle
            key={`${r}-${c}`}
            cx={40 + c * 24}
            cy={400 + r * 20}
            r="1.5"
            fill={r === 0 && c === 0 ? "#FD018B" : "#EAEAEA"}
            opacity={r === 0 && c === 0 ? 0.5 : 1}
          />
        )),
      )}
    </svg>
  );
}
