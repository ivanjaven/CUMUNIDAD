export function Registration(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect
        x="15"
        y="10"
        width="70"
        height="80"
        fill="#ffffff"
        stroke="#000000"
        stroke-width="4"
      />

      <rect
        x="25"
        y="20"
        width="25"
        height="25"
        fill="#dddddd"
        stroke="#000000"
        stroke-width="2"
      />

      <rect x="60" y="25" width="15" height="3" fill="#000000" />
      <rect x="60" y="33" width="15" height="3" fill="#000000" />

      <rect x="25" y="55" width="50" height="4" fill="#ff9999" />

      <g transform="translate(65,45) rotate(45)">
        <rect x="0" y="0" width="25" height="8" fill="#ffa500" />

        <polygon points="25,0 25,8 33,4" fill="#4a4a4a" />

        <rect x="-5" y="0" width="5" height="8" fill="#ffb6c1" />
      </g>
    </svg>
  )
}
