export function Reports(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <path
        d="M30,20 h40 l10,10 v50 h-50 z"
        fill="#fff6e6"
        stroke="#000"
        stroke-width="2"
      />
      <path
        d="M25,25 h40 l10,10 v50 h-50 z"
        fill="#fff6e6"
        stroke="#000"
        stroke-width="2"
      />
      <path
        d="M20,30 h40 l10,10 v50 h-50 z"
        fill="#fff6e6"
        stroke="#000"
        stroke-width="2"
      />

      <path d="M60,20 v10 h10" fill="none" stroke="#000" stroke-width="2" />
      <path d="M65,25 v10 h10" fill="none" stroke="#000" stroke-width="2" />
      <path d="M70,30 v10 h10" fill="none" stroke="#000" stroke-width="2" />

      <rect x="30" y="65" width="8" height="15" fill="#87CEEB" />
      <rect x="40" y="70" width="8" height="10" fill="#FFB6C1" />
      <rect x="50" y="60" width="8" height="20" fill="#87CEEB" />

      <circle
        cx="65"
        cy="45"
        r="15"
        fill="transparent"
        stroke="#000"
        stroke-width="2"
      />

      <path d="M65,45 L80,45 A15,15 0 0,1 65,60 z" fill="#FFB6C1" />
      <path d="M65,45 L65,30 A15,15 0 0,1 80,45 z" fill="#FFEB3B" />
      <path d="M65,45 L65,60 A15,15 0 0,1 50,45 L65,45 z" fill="#87CEEB" />
    </svg>
  )
}
