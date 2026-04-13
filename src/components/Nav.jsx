import { NAV_ITEMS } from "../data/siteContent"

export default function Nav({ scrollToSection }) {
  return (
    <nav className="na-nav">
      <div className="na-nav-logo">Nailory Aura</div>
      <ul className="na-nav-links">
        {NAV_ITEMS.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(event) => {
                event.preventDefault()
                scrollToSection(id)
              }}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </li>
        ))}
      </ul>
      <button className="na-btn-primary" type="button" onClick={() => scrollToSection("booking")}>
        Book Now
      </button>
    </nav>
  )
}
