/**
 * Cross-in-a-Box logo icon (Logo B) — inline SVG.
 * Renders the golden shipping box with cross at any size.
 */
export default function LogoIcon({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Box body */}
      <path
        d="M8 26L32 38L56 26V50C56 51.1 55.1 52 54 52H10C8.9 52 8 51.1 8 50V26Z"
        fill="#C8963E"
      />
      {/* Box lid / flap — darker gold */}
      <path
        d="M8 26L32 14L56 26L32 38L8 26Z"
        fill="#D4A94E"
      />
      {/* Cross — vertical bar */}
      <rect x="29" y="4" width="6" height="28" rx="1" fill="#C8963E" />
      {/* Cross — horizontal bar */}
      <rect x="21" y="10" width="22" height="6" rx="1" fill="#C8963E" />
      {/* Cross shadow on box lid */}
      <path
        d="M29 26L32 27.5L35 26V32L32 33.5L29 32V26Z"
        fill="#B8862D"
        opacity="0.4"
      />
    </svg>
  );
}
