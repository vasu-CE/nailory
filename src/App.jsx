import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --cream: #FAF5F0;
    --blush: #F2E8E1;
    --rose: #D4A5A0;
    --mocha: #6B3A3A;
    --dark: #3B1F1F;
    --gold: #C9A96E;
    --font-display: 'Cormorant Garamond', serif;
    --font-body: 'Jost', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--cream);
    color: var(--dark);
    font-family: var(--font-body);
    font-weight: 300;
    overflow-x: hidden;
  }

  .na-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.5rem 4rem;
    background: rgba(250,245,240,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(180,130,120,0.15);
  }
  .na-nav-logo {
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 400;
    letter-spacing: 0.18em;
    color: var(--mocha);
    text-transform: uppercase;
  }
  .na-nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .na-nav-links a {
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--dark);
    text-decoration: none;
    font-weight: 400;
    transition: color 0.3s;
  }
  .na-nav-links a:hover { color: var(--mocha); }
  .na-btn-primary {
    background: var(--mocha);
    color: var(--cream);
    border: none;
    padding: 0.85rem 2rem;
    font-family: var(--font-body);
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
  }
  .na-btn-primary:hover { background: var(--dark); transform: translateY(-1px); }
  .na-btn-ghost {
    background: transparent;
    color: var(--mocha);
    border: 1px solid var(--rose);
    padding: 0.85rem 2rem;
    font-family: var(--font-body);
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s;
  }
  .na-btn-ghost:hover { background: var(--blush); }

  /* HERO */
  .na-hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 80px;
  }
  .na-hero-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5rem 4rem 5rem 5rem;
  }
  .na-hero-tag {
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--rose);
    margin-bottom: 1.5rem;
    display: flex; align-items: center; gap: 1rem;
  }
  .na-hero-tag::before { content:''; display:block; width:2rem; height:1px; background:var(--rose); }
  .na-h1 {
    font-family: var(--font-display);
    font-size: 5.5rem;
    font-weight: 300;
    line-height: 1.0;
    color: var(--mocha);
    letter-spacing: -0.01em;
  }
  .na-h1 em { font-style: italic; color: var(--dark); }
  .na-hero-sub {
    margin-top: 2rem;
    font-size: 0.95rem;
    line-height: 1.9;
    color: #7a5a5a;
    max-width: 400px;
  }
  .na-hero-btns { display: flex; gap: 1rem; margin-top: 2.5rem; align-items: center; }
  .na-hero-right {
    background: var(--blush);
    display: flex; align-items: center; justify-content: center;
    position: relative;
    overflow: hidden;
  }
  .na-hero-right::before {
    content:'';
    position: absolute;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(212,165,160,0.25) 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
  }
  .na-logo-container {
    width: 320px; height: 320px;
    border-radius: 50%;
    background: var(--cream);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 20px 60px rgba(107,58,58,0.15);
    position: relative;
    z-index: 2;
    animation: naFloat 6s ease-in-out infinite;
  }
  @keyframes naFloat {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }
  .na-logo-container img { width: 260px; height: 260px; object-fit: contain; }
  .na-hero-badge {
    position: absolute; bottom: 3rem; right: 3rem;
    text-align: right;
    font-family: var(--font-display);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--mocha);
    line-height: 1.6;
  }

  /* MARQUEE */
  .na-marquee-bar {
    background: var(--mocha);
    color: var(--cream);
    padding: 1rem 0;
    overflow: hidden;
    white-space: nowrap;
  }
  .na-marquee-inner {
    display: inline-block;
    animation: naMarquee 22s linear infinite;
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
  }
  @keyframes naMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* SECTION COMMON */
  .na-section-header { text-align: center; margin-bottom: 4rem; }
  .na-section-tag {
    font-size: 0.7rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--rose);
    margin-bottom: 1rem;
  }
  .na-h2 {
    font-family: var(--font-display);
    font-size: 3.5rem;
    font-weight: 300;
    color: var(--mocha);
    line-height: 1.1;
  }
  .na-divider { width: 3rem; height: 1px; background: var(--rose); margin: 2rem 0; }

  /* SERVICES */
  .na-services { padding: 7rem 5rem; }
  .na-services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 3rem;
  }
  .na-service-card {
    background: var(--blush);
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: default;
  }
  .na-service-card::after {
    content:'';
    position:absolute; bottom:0; left:0; right:0;
    height: 3px;
    background: var(--rose);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s;
  }
  .na-service-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(107,58,58,0.12); }
  .na-service-card:hover::after { transform: scaleX(1); }
  .na-service-icon { font-size: 2rem; margin-bottom: 1.5rem; }
  .na-service-name {
    font-family: var(--font-display);
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--mocha);
    margin-bottom: 0.8rem;
  }
  .na-service-desc { font-size: 0.88rem; line-height: 1.8; color: #7a5a5a; }
  .na-service-price {
    margin-top: 1.5rem;
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-style: italic;
    color: var(--gold);
  }

  /* ABOUT */
  .na-about {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 80vh;
    background: var(--dark);
  }
  .na-about-left {
    background: var(--mocha);
    display: flex; align-items: center; justify-content: center;
    padding: 5rem;
    position: relative;
    overflow: hidden;
  }
  .na-about-left::before {
    content:'';
    position:absolute;
    width: 350px; height: 350px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 50%;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
  }
  .na-about-left::after {
    content:'';
    position:absolute;
    width: 250px; height: 250px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 50%;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
  }
  .na-stat-group { display: flex; flex-direction: column; gap: 3rem; position: relative; z-index: 2; }
  .na-stat { text-align: center; }
  .na-stat-num {
    font-family: var(--font-display);
    font-size: 4rem;
    font-weight: 300;
    color: var(--cream);
    line-height: 1;
  }
  .na-stat-label {
    font-size: 0.72rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(250,245,240,0.6);
    margin-top: 0.4rem;
  }
  .na-about-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5rem;
    color: var(--cream);
  }
  .na-about-right .na-section-tag { color: var(--rose); }
  .na-about-right .na-h2 { color: var(--cream); }
  .na-about-right p { font-size: 0.95rem; line-height: 1.9; color: rgba(250,245,240,0.7); margin-top: 1.5rem; max-width: 460px; }

  /* GALLERY */
  .na-gallery { padding: 7rem 5rem; }
  .na-gallery-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 200px 200px;
    gap: 1rem;
    margin-top: 3rem;
  }
  .na-gallery-item {
    background: var(--blush);
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  .na-gallery-item:first-child { grid-column: span 2; grid-row: span 2; }
  .na-gallery-placeholder {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    font-size: 3rem;
    color: rgba(107,58,58,0.25);
  }
  .na-gallery-overlay {
    position: absolute; inset: 0;
    background: rgba(107,58,58,0);
    display: flex; align-items: center; justify-content: center;
    transition: background 0.3s;
  }
  .na-gallery-item:hover .na-gallery-overlay { background: rgba(107,58,58,0.45); }
  .na-gallery-label {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 1.2rem;
    color: var(--cream);
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s;
    letter-spacing: 0.05em;
  }
  .na-gallery-item:hover .na-gallery-label { opacity: 1; transform: translateY(0); }

  /* TESTIMONIALS */
  .na-testimonials { padding: 7rem 5rem; background: var(--blush); }
  .na-testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 3rem;
  }
  .na-testimonial-card { padding: 2.5rem; border-top: 2px solid var(--rose); }
  .na-stars { color: var(--gold); font-size: 0.8rem; letter-spacing: 0.2em; margin-bottom: 1.2rem; }
  .na-testimonial-text {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--mocha);
  }
  .na-testimonial-author {
    margin-top: 1.5rem;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #7a5a5a;
  }

  /* BOOKING */
  .na-booking { padding: 7rem 5rem; text-align: center; }
  .na-booking-form {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr auto;
    gap: 1rem;
    max-width: 900px;
    margin: 3rem auto 0;
    align-items: end;
  }
  .na-form-group { text-align: left; }
  .na-form-group label {
    display: block;
    font-size: 0.68rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--mocha);
    margin-bottom: 0.6rem;
  }
  .na-form-group input, .na-form-group select {
    width: 100%;
    background: var(--cream);
    border: 1px solid rgba(180,130,120,0.3);
    padding: 0.85rem 1rem;
    font-family: var(--font-body);
    font-size: 0.88rem;
    color: var(--dark);
    outline: none;
    transition: border-color 0.3s;
    -webkit-appearance: none;
    appearance: none;
  }
  .na-form-group input:focus, .na-form-group select:focus { border-color: var(--rose); }
  .na-contact-info { margin-top: 2rem; font-size: 0.8rem; color: #9a7a7a; }

  /* FOOTER */
  .na-footer {
    background: var(--dark);
    color: var(--cream);
    padding: 4rem 5rem;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 3rem;
    align-items: start;
  }
  .na-footer-brand p { font-size: 0.85rem; line-height: 1.8; color: rgba(250,245,240,0.5); max-width: 280px; margin-top: 1rem; }
  .na-footer h4 {
    font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--rose); margin-bottom: 1.2rem;
  }
  .na-footer ul { list-style: none; }
  .na-footer ul li { margin-bottom: 0.6rem; }
  .na-footer ul a {
    font-size: 0.85rem;
    color: rgba(250,245,240,0.6);
    text-decoration: none;
    transition: color 0.3s;
  }
  .na-footer ul a:hover { color: var(--cream); }
  .na-footer-bottom {
    background: #2a1515;
    color: rgba(250,245,240,0.35);
    text-align: center;
    padding: 1.2rem;
    font-size: 0.72rem;
    letter-spacing: 0.15em;
  }

  /* FADE UP */
  .na-fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .na-fade-up.na-visible { opacity: 1; transform: translateY(0); }

  @media (max-width: 900px) {
    .na-nav { padding: 1.2rem 1.5rem; }
    .na-nav-links { display: none; }
    .na-hero { grid-template-columns: 1fr; }
    .na-hero-right { display: none; }
    .na-hero-left { padding: 3rem 2rem; }
    .na-h1 { font-size: 3.5rem; }
    .na-services { padding: 4rem 1.5rem; }
    .na-services-grid { grid-template-columns: 1fr; }
    .na-about { grid-template-columns: 1fr; }
    .na-about-left { padding: 3rem; }
    .na-about-right { padding: 3rem 2rem; }
    .na-gallery { padding: 4rem 1.5rem; }
    .na-gallery-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
    .na-gallery-item:first-child { grid-column: span 2; grid-row: span 1; }
    .na-testimonials { padding: 4rem 1.5rem; }
    .na-testimonials-grid { grid-template-columns: 1fr; }
    .na-booking { padding: 4rem 1.5rem; }
    .na-booking-form { grid-template-columns: 1fr; }
    .na-footer { grid-template-columns: 1fr 1fr; padding: 3rem 1.5rem; }
  }
`;

const SERVICES = [
  { icon: "💅", name: "Classic Manicure", desc: "A timeless treatment featuring precise shaping, cuticle care, nourishing hand massage, and a flawless polish finish.", price: "From ₹499" },
  { icon: "✨", name: "Gel Extensions", desc: "Long-lasting, chip-resistant gel extensions sculpted to your desired length with a glass-like shine that endures.", price: "From ₹1,299" },
  { icon: "🌸", name: "Nail Art Design", desc: "Bespoke hand-painted designs — from delicate florals to bold geometric patterns. Your nails, your canvas.", price: "From ₹799" },
  { icon: "🌙", name: "Ombre & Chrome", desc: "Gradient blends and mirror-like chrome finishes for a show-stopping, editorial-worthy result.", price: "From ₹999" },
  { icon: "🌿", name: "Nail Spa Ritual", desc: "A luxurious full treatment — soak, exfoliation, mask, and massage — leaving hands silky and rejuvenated.", price: "From ₹1,499" },
  { icon: "👰", name: "Bridal Package", desc: "A curated bridal experience with trial session, big day manicure & pedicure, and premium products throughout.", price: "From ₹3,999" },
];

const GALLERY = [
  { emoji: "🌸", label: "Floral Art" },
  { emoji: "✨", label: "Chrome" },
  { emoji: "🌙", label: "Ombre" },
  { emoji: "💫", label: "Gel Art" },
  { emoji: "🌿", label: "Minimalist" },
];

const TESTIMONIALS = [
  { text: "Absolutely stunning work! The nail art lasted over three weeks without chipping. I've never felt so beautiful.", author: "Priya Mehta, Anand" },
  { text: "The bridal package was a dream. My nails looked perfect in every single wedding photo. Highly recommend!", author: "Sneha Patel, Vadodara" },
  { text: "Such a relaxing atmosphere and the nail spa ritual left my hands feeling incredible. Will definitely be back!", author: "Riya Shah, Ahmedabad" },
];

const MARQUEE_TEXT = "✦ Gel Manicure   ✦ Nail Art   ✦ Acrylic Extensions   ✦ French Tips   ✦ Nail Spa   ✦ Chrome Finish   ✦ Ombre Nails   ";

function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("na-visible"); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeUp({ children, style }) {
  const ref = useFadeUp();
  return <div ref={ref} className="na-fade-up" style={style}>{children}</div>;
}

function Nav({ scrollTo }) {
  return (
    <nav className="na-nav">
      <div className="na-nav-logo">Nailory Aura</div>
      <ul className="na-nav-links">
        {["services","about","gallery","testimonials","booking"].map(id => (
          <li key={id}>
            <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </li>
        ))}
      </ul>
      <button className="na-btn-primary" onClick={() => scrollTo("booking")}>Book Now</button>
    </nav>
  );
}

function Hero({ scrollTo }) {
  return (
    <section className="na-hero" id="hero">
      <div className="na-hero-left na-fade-up na-visible">
        <p className="na-hero-tag">Luxury Nail Studio</p>
        <h1 className="na-h1">Where Art<br />Meets <em>Your</em><br />Nails</h1>
        <p className="na-hero-sub">Elevating beauty through precision, creativity, and care. Each session is a bespoke experience crafted just for you.</p>
        <div className="na-hero-btns">
          <button className="na-btn-primary" onClick={() => scrollTo("booking")}>Book a Session</button>
          <button className="na-btn-ghost" onClick={() => scrollTo("services")}>Explore Services</button>
        </div>
      </div>
      <div className="na-hero-right">
        <div className="na-logo-container">
          <img
            src="logo.png"
            alt="Nailory Aura Logo"
            onError={e => {
              e.target.style.display = "none";
              e.target.parentNode.innerHTML = `<div style="font-family:'Cormorant Garamond',serif;font-size:1.4rem;color:#6B3A3A;text-align:center;letter-spacing:0.1em;line-height:2">✿<br/>Nailory<br/>Aura<br/>✿</div>`;
            }}
          />
        </div>
        <div className="na-hero-badge">Est. 2024<br />Premium Nail Care</div>
      </div>
    </section>
  );
}

function Marquee() {
  const text = MARQUEE_TEXT.repeat(2);
  return (
    <div className="na-marquee-bar">
      <div className="na-marquee-inner">{text}{text}</div>
    </div>
  );
}

function Services() {
  return (
    <section className="na-services" id="services">
      <FadeUp>
        <div className="na-section-header">
          <p className="na-section-tag">What We Offer</p>
          <h2 className="na-h2">Our Signature<br />Services</h2>
        </div>
      </FadeUp>
      <div className="na-services-grid">
        {SERVICES.map((s, i) => (
          <FadeUp key={i}>
            <div className="na-service-card">
              <div className="na-service-icon">{s.icon}</div>
              <div className="na-service-name">{s.name}</div>
              <p className="na-service-desc">{s.desc}</p>
              <div className="na-service-price">{s.price}</div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function About({ scrollTo }) {
  return (
    <section className="na-about" id="about">
      <div className="na-about-left">
        <div className="na-stat-group">
          {[["500+","Happy Clients"],["50+","Nail Art Designs"],["3+","Years of Artistry"]].map(([n,l]) => (
            <div className="na-stat" key={l}>
              <div className="na-stat-num">{n}</div>
              <div className="na-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="na-about-right">
        <FadeUp>
          <p className="na-section-tag">Our Story</p>
          <h2 className="na-h2">Crafted with<br />Care & Passion</h2>
          <div className="na-divider" />
          <p>At Nailory Aura, we believe your nails are a form of self-expression. Our studio was born from a deep love of nail artistry and a commitment to making every client feel truly special.</p>
          <p style={{ marginTop: "1rem" }}>We use only premium, skin-safe products and stay at the forefront of global nail trends — so you always leave looking and feeling your absolute best.</p>
          <button className="na-btn-ghost" style={{ marginTop: "2rem", borderColor: "rgba(212,165,160,0.4)", color: "var(--cream)" }} onClick={() => scrollTo("booking")}>
            Book Your Experience
          </button>
        </FadeUp>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="na-gallery" id="gallery">
      <FadeUp>
        <div className="na-section-header">
          <p className="na-section-tag">Our Work</p>
          <h2 className="na-h2">The Aura Gallery</h2>
        </div>
      </FadeUp>
      <div className="na-gallery-grid">
        {GALLERY.map((g, i) => (
          <div className="na-gallery-item" key={i}>
            <div className="na-gallery-placeholder">{g.emoji}</div>
            <div className="na-gallery-overlay">
              <span className="na-gallery-label">{g.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="na-testimonials" id="testimonials">
      <FadeUp>
        <div className="na-section-header">
          <p className="na-section-tag">Client Love</p>
          <h2 className="na-h2">What They're Saying</h2>
        </div>
      </FadeUp>
      <div className="na-testimonials-grid">
        {TESTIMONIALS.map((t, i) => (
          <FadeUp key={i}>
            <div className="na-testimonial-card">
              <div className="na-stars">★★★★★</div>
              <p className="na-testimonial-text">"{t.text}"</p>
              <p className="na-testimonial-author">— {t.author}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function Booking() {
  const [form, setForm] = useState({ name: "", phone: "", service: "Classic Manicure" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.phone) setSubmitted(true);
  };

  return (
    <section className="na-booking" id="booking">
      <FadeUp>
        <p className="na-section-tag">Reserve Your Spot</p>
        <h2 className="na-h2">Book an Appointment</h2>
        <p style={{ fontSize: "0.95rem", color: "#7a5a5a", marginTop: "1.5rem", lineHeight: 1.9 }}>
          Ready to elevate your look? Fill in your details and we'll be in touch within 24 hours.
        </p>
      </FadeUp>
      {submitted ? (
        <FadeUp>
          <div style={{ marginTop: "3rem", padding: "2rem", background: "var(--blush)", maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--mocha)", fontStyle: "italic" }}>
              ✿ Thank you, {form.name}!
            </p>
            <p style={{ marginTop: "0.8rem", fontSize: "0.88rem", color: "#7a5a5a" }}>
              We'll confirm your <strong>{form.service}</strong> appointment shortly on {form.phone}.
            </p>
          </div>
        </FadeUp>
      ) : (
        <FadeUp>
          <div className="na-booking-form">
            <div className="na-form-group">
              <label>Your Name</label>
              <input type="text" placeholder="Priya Mehta" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="na-form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            </div>
            <div className="na-form-group">
              <label>Service</label>
              <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
                {SERVICES.map(s => <option key={s.name}>{s.name}</option>)}
              </select>
            </div>
            <button className="na-btn-primary" style={{ whiteSpace: "nowrap" }} onClick={handleSubmit}>Book Now →</button>
          </div>
        </FadeUp>
      )}
      <p className="na-contact-info">📍 Nailory Aura Studio, Anand, Gujarat &nbsp;|&nbsp; 📞 +91 98765 43210 &nbsp;|&nbsp; 📸 @nailoryaura</p>
    </section>
  );
}

function Footer({ scrollTo }) {
  return (
    <>
      <footer className="na-footer">
        <div className="na-footer-brand">
          <div className="na-nav-logo" style={{ color: "var(--cream)", display: "block", marginBottom: "1rem" }}>Nailory Aura</div>
          <p>A luxury nail studio dedicated to the art of beautiful nails. Every detail, perfected.</p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            {["Classic Manicure","Gel Extensions","Nail Art","Bridal Package"].map(s => (
              <li key={s}><a href="#services" onClick={e => { e.preventDefault(); scrollTo("services"); }}>{s}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Studio</h4>
          <ul>
            {["About Us","Gallery","Reviews","Contact"].map(s => (
              <li key={s}><a href="#">{s}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul>
            {["Instagram","Facebook","WhatsApp","Google Maps"].map(s => (
              <li key={s}><a href="#">{s}</a></li>
            ))}
          </ul>
        </div>
      </footer>
      <div className="na-footer-bottom">© 2024 Nailory Aura · All Rights Reserved · Crafted with ♥</div>
    </>
  );
}

export default function NailoryAura() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{styles}</style>
      <Nav scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} />
      <Marquee />
      <Services />
      <About scrollTo={scrollTo} />
      <Gallery />
      <Testimonials />
      <Booking />
      <Footer scrollTo={scrollTo} />
    </>
  );
}