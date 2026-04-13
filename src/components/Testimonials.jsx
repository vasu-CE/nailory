import FadeUp from "./FadeUp"
import SectionHeading from "./SectionHeading"
import { TESTIMONIALS } from "../data/siteContent"

export default function Testimonials() {
  return (
    <section className="na-testimonials" id="testimonials">
      <FadeUp>
        <SectionHeading tag="Client Love" title={<>What They're Saying</>} />
      </FadeUp>
      <div className="na-testimonials-grid">
        {TESTIMONIALS.map((testimonial) => (
          <FadeUp key={testimonial.author}>
            <div className="na-testimonial-card">
              <div className="na-stars">★★★★★</div>
              <p className="na-testimonial-text">"{testimonial.text}"</p>
              <p className="na-testimonial-author">— {testimonial.author}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
