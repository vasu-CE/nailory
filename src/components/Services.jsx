import FadeUp from "./FadeUp"
import SectionHeading from "./SectionHeading"
import { SERVICES } from "../data/siteContent"

export default function Services() {
  return (
    <section className="na-services" id="services">
      <FadeUp>
        <SectionHeading tag="What We Offer" title={<>Our Signature<br />Services</>} />
      </FadeUp>
      <div className="na-services-grid">
        {SERVICES.map((service) => (
          <FadeUp key={service.name}>
            <div className="na-service-card">
              <div className="na-service-icon">{service.icon}</div>
              <div className="na-service-name">{service.name}</div>
              <p className="na-service-desc">{service.desc}</p>
              <div className="na-service-price">{service.price}</div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
