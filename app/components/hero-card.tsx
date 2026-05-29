export default function HeroCard() {
  return (
    <div
      style={{
        background: "#18181b",
        padding: "30px",
        borderRadius: "24px",
        marginTop: "20px"
      }}
    >
      <p
        style={{
          color: "#a1a1aa"
        }}
      >
        Welcome back
      </p>

      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          marginTop: "10px"
        }}
      >
        Mithu 👋
      </h1>

      <p
        style={{
          marginTop: "20px",
          color: "#22d3ee"
        }}
      >
        12 day learning streak
      </p>
    </div>
  )
}