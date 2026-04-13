import { INSTAGRAM_URL, WHATSAPP_URL } from "../data/siteContent"

export default function Footer({ scrollToSection }) {
  const footerLinks = {
    Services: ["Classic Manicure", "Gel Extensions", "Nail Art", "Bridal Package"],
    Studio: ["About Us", "Gallery", "Reviews", "Contact"],
    Connect: ["Instagram", "Facebook", "WhatsApp", "Google Maps"],
  }

  return (
    <>
      <footer className="na-footer">
        <div className="na-footer-brand">
          <div className="na-nav-logo" style={{ color: "var(--cream)", display: "block", marginBottom: "1rem" }}>
            Nailory Aura
          </div>
          <p>A luxury nail studio dedicated to the art of beautiful nails. Every detail, perfected.</p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            {footerLinks.Services.map((label) => (
              <li key={label}>
                <a
                  href="#services"
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToSection("services")
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Studio</h4>
          <ul>
            {footerLinks.Studio.map((label) => (
              <li key={label}>
                <a href="#">{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
            </li>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a>
            </li>
            <li>
              <a href="#">Google Maps</a>
            </li>
          </ul>
        </div>
      </footer>
      <div className="na-footer-bottom">© 2024 Nailory Aura · All Rights Reserved · Crafted with ♥</div>
    </>
  )
}
