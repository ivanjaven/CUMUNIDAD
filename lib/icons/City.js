export function City(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <clipPath id="circleClip">
          <circle cx="50" cy="50" r="45" />
        </clipPath>
      </defs>

      <g clip-path="url(#circleClip)">
        <rect x="0" y="0" width="100" height="100" fill="#E6F3FF" />

        <path d="M0,50 Q25,30 50,45 Q75,30 100,50 V100 H0 Z" fill="#E1EAE6" />

        <path d="M0,60 Q30,45 60,55 Q90,50 100,60 V100 H0 Z" fill="#90BB84" />

        <rect x="20" y="35" width="10" height="35" fill="#F8F8F8" />
        <rect x="35" y="40" width="8" height="30" fill="#A4BEE0" />
        <rect x="48" y="25" width="12" height="45" fill="#6F9CDB" />
        <rect x="65" y="35" width="10" height="35" fill="#F8F8F8" />

        <rect x="42" y="20" width="4" height="15" fill="#F8F8F8" />
        <circle cx="44" cy="18" r="2" fill="#FF9999" />
      </g>

      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#E6F3FF"
        stroke-width="2"
      />
    </svg>
  )
}
