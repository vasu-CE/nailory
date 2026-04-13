import "./App.css"
import Nav from "./components/Nav"
import Hero from "./components/Hero"
import Marquee from "./components/Marquee"
import Services from "./components/Services"
import About from "./components/About"
import Gallery from "./components/Gallery"
import Testimonials from "./components/Testimonials"
import Booking from "./components/Booking"
import Footer from "./components/Footer"

export default function App() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <Nav scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      <Marquee />
      <Services />
      <About scrollToSection={scrollToSection} />
      <Gallery />
      <Testimonials />
      <Booking />
      <Footer scrollToSection={scrollToSection} />
    </>
  )
}
