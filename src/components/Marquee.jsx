import { MARQUEE_TEXT } from "../data/siteContent"

export default function Marquee() {
  const text = MARQUEE_TEXT.repeat(2)

  return (
    <div className="na-marquee-bar">
      <div className="na-marquee-inner">
        {text}
        {text}
      </div>
    </div>
  )
}
