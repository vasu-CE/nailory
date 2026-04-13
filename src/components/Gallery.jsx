import FadeUp from "./FadeUp"
import SectionHeading from "./SectionHeading"
import { GALLERY } from "../data/siteContent"
import image1 from "../assets/1.jpg"
import image2 from "../assets/2.jpg"
import image3 from "../assets/3.jpg"
import image4 from "../assets/4.jpg"
import image5 from "../assets/5.jpg"

const GALLERY_IMAGES = [image1, image2, image3, image4, image5]

export default function Gallery() {
  return (
    <section className="na-gallery" id="gallery">
      <FadeUp>
        <SectionHeading tag="Our Work" title={<>The Aura Gallery</>} />
      </FadeUp>
      <div className="na-gallery-grid">
        {GALLERY.map((item, index) => (
          <div className="na-gallery-item" key={item.label}>
            <img className="na-gallery-image" src={GALLERY_IMAGES[index]} alt={item.label} loading="lazy" />
            <div className="na-gallery-overlay">
              <span className="na-gallery-label">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
