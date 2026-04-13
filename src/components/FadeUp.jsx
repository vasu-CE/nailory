import { useFadeUp } from "../hooks/useFadeUp"

export default function FadeUp({ children, className = "", style }) {
  const ref = useFadeUp()

  return (
    <div ref={ref} className={`na-fade-up ${className}`.trim()} style={style}>
      {children}
    </div>
  )
}
