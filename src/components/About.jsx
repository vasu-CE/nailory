import FadeUp from "./FadeUp"

export default function About({ scrollToSection }) {
  return (
    <section className="na-about" id="about">
      <div className="na-about-left">
        <div className="na-stat-group">
          {[
            ["500+", "Happy Clients"],
            ["50+", "Nail Art Designs"],
            ["3+", "Years of Artistry"],
          ].map(([number, label]) => (
            <div className="na-stat" key={label}>
              <div className="na-stat-num">{number}</div>
              <div className="na-stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="na-about-right">
        <FadeUp>
          <p className="na-section-tag">Our Story</p>
          <h2 className="na-h2">
            Crafted with
            <br />
            Care & Passion
          </h2>
          <div className="na-divider" />
          <p>
            At Nailory Aura, we believe your nails are a form of self-expression. Our studio was born from a deep love of nail artistry and a commitment to making every client feel truly special.
          </p>
          <p style={{ marginTop: "1rem" }}>
            We use only premium, skin-safe products and stay at the forefront of global nail trends — so you always leave looking and feeling your absolute best.
          </p>
          <button
            className="na-btn-ghost"
            style={{ marginTop: "2rem", borderColor: "rgba(212,165,160,0.4)", color: "var(--cream)" }}
            type="button"
            onClick={() => scrollToSection("booking")}
          >
            Book Your Experience
          </button>
        </FadeUp>
      </div>
    </section>
  )
}
