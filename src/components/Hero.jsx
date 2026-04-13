import heroLogo from "../assets/Pink Floral Wedding Organizer Logo_20250913_095542_0000.png"

export default function Hero({ scrollToSection }) {
  return (
    <section className="na-hero" id="hero">
      <div className="na-hero-left na-fade-up na-visible">
        <p className="na-hero-tag">Luxury Nail Studio</p>
        <h1 className="na-h1">
          Where Art
          <br />
          Meets <em>Your</em>
          <br />
          Nails
        </h1>
        <p className="na-hero-sub">
          Elevating beauty through precision, creativity, and care. Each session is a bespoke experience crafted just for you.
        </p>
        <div className="na-hero-btns">
          <button className="na-btn-primary" type="button" onClick={() => scrollToSection("booking")}>
            Book a Session
          </button>
          <button className="na-btn-ghost" type="button" onClick={() => scrollToSection("services")}>
            Explore Services
          </button>
        </div>
      </div>
      <div className="na-hero-right">
        <div className="na-logo-container">
          <img src={heroLogo} alt="Nailory Aura Logo" />
        </div>
        <div className="na-hero-badge">
          Est. 2024
          <br />
          Premium Nail Care
        </div>
      </div>
    </section>
  )
}
