import { useState } from "react"
import FadeUp from "./FadeUp"
import SectionHeading from "./SectionHeading"
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, SERVICES, WHATSAPP_NUMBER } from "../data/siteContent"

const MAX_BOOKINGS_PER_DAY = 5
const BOOKING_STORAGE_KEY = "nailory-bookings"
const EMPTY_FORM = { name: "", phone: "", service: "Classic Manicure" }

function getTodayDateKey() {
  return new Date().toISOString().slice(0, 10)
}

function getTodayBookingState() {
  const today = getTodayDateKey()

  try {
    const rawValue = localStorage.getItem(BOOKING_STORAGE_KEY)
    if (!rawValue) {
      return { count: 0, submitted: false, lastBooking: EMPTY_FORM }
    }

    const parsedValue = JSON.parse(rawValue)
    if (parsedValue?.date !== today) {
      return { count: 0, submitted: false, lastBooking: EMPTY_FORM }
    }

    return {
      count: Number(parsedValue.count) || 0,
      submitted: Boolean(parsedValue.submitted),
      lastBooking: parsedValue.lastBooking || EMPTY_FORM,
    }
  } catch {
    return { count: 0, submitted: false, lastBooking: EMPTY_FORM }
  }
}

function saveTodayBookingState({ count, submitted, lastBooking }) {
  localStorage.setItem(
    BOOKING_STORAGE_KEY,
    JSON.stringify({
      date: getTodayDateKey(),
      count,
      submitted,
      lastBooking,
    }),
  )
}

export default function Booking() {
  const [initialBookingState] = useState(() => getTodayBookingState())
  const [form, setForm] = useState(initialBookingState.lastBooking || EMPTY_FORM)
  const [submitted, setSubmitted] = useState(initialBookingState.submitted)
  const [bookingCount, setBookingCount] = useState(initialBookingState.count)

  const remainingBookings = Math.max(0, MAX_BOOKINGS_PER_DAY - bookingCount)
  const isLimitReached = bookingCount >= MAX_BOOKINGS_PER_DAY

  const handleSubmit = () => {
    if (!form.name || !form.phone || isLimitReached) return

    const message = encodeURIComponent(
      `Hello Nailory Aura, I would like to book an appointment.\n\nName: ${form.name}\nPhone: ${form.phone}\nService: ${form.service}`,
    )
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`

    const nextBookingCount = bookingCount + 1
    setBookingCount(nextBookingCount)
    setSubmitted(true)
    saveTodayBookingState({
      count: nextBookingCount,
      submitted: true,
      lastBooking: form,
    })

    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  const handleRebook = () => {
    setSubmitted(false)
    setForm(EMPTY_FORM)
    saveTodayBookingState({
      count: bookingCount,
      submitted: false,
      lastBooking: EMPTY_FORM,
    })
  }

  return (
    <section className="na-booking" id="booking">
      <FadeUp>
        <SectionHeading tag="Reserve Your Spot" title={<>Book an Appointment</>} />
        <p style={{ fontSize: "0.95rem", color: "#7a5a5a", marginTop: "1.5rem", lineHeight: 1.9 }}>
          Ready to elevate your look? Fill in your details and we'll be in touch within 24 hours.
        </p>
      </FadeUp>

      {submitted ? (
        <FadeUp>
          <div
            style={{
              marginTop: "3rem",
              padding: "2rem",
              background: "var(--blush)",
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--mocha)", fontStyle: "italic" }}>
              ✿ Thank you, {form.name}!
            </p>
            <p style={{ marginTop: "0.8rem", fontSize: "0.88rem", color: "#7a5a5a", lineHeight: 1.8 }}>
              Your booking request for <strong>{form.service}</strong> was prepared and sent to WhatsApp.
            </p>
            <p style={{ marginTop: "0.8rem", fontSize: "0.82rem", color: "#7a5a5a" }}>
              Bookings today: {bookingCount}/{MAX_BOOKINGS_PER_DAY}
            </p>
            <button
              className="na-btn-primary"
              type="button"
              style={{ marginTop: "1.4rem" }}
              onClick={handleRebook}
              disabled={isLimitReached}
            >
              {isLimitReached ? "Daily Limit Reached" : "Re-book"}
            </button>
          </div>
        </FadeUp>
      ) : (
        <FadeUp>
          <div className="na-booking-form">
            <div className="na-form-group">
              <label htmlFor="booking-name">Your Name</label>
              <input
                id="booking-name"
                type="text"
                placeholder="Priya Mehta"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              />
            </div>
            <div className="na-form-group">
              <label htmlFor="booking-phone">Phone Number</label>
              <input
                id="booking-phone"
                type="tel"
                placeholder="+91 63537 74493"
                value={form.phone}
                onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              />
            </div>
            <div className="na-form-group">
              <label htmlFor="booking-service">Service</label>
              <select
                id="booking-service"
                value={form.service}
                onChange={(event) => setForm((current) => ({ ...current, service: event.target.value }))}
              >
                {SERVICES.map((service) => (
                  <option key={service.name}>{service.name}</option>
                ))}
              </select>
            </div>
            <button
              className="na-btn-primary"
              type="button"
              style={{ whiteSpace: "nowrap" }}
              onClick={handleSubmit}
              disabled={isLimitReached}
            >
              {isLimitReached ? "Daily Limit Reached" : "Book Now →"}
            </button>
          </div>
          <div style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#7a5a5a" }}>
            {isLimitReached ? "Booking limit reached for today. Please try again tomorrow." : `${remainingBookings} booking slot(s) remaining today.`}
          </div>
        </FadeUp>
      )}

      <p className="na-contact-info">
        📍 Nailory Aura Studio, Surat, Gujarat &nbsp;|&nbsp; 📞 +91 63537 74493 &nbsp;|&nbsp; 📸
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" style={{ color: "inherit", marginLeft: "0.35rem" }}>
          @{INSTAGRAM_HANDLE}
        </a>
      </p>
    </section>
  )
}
