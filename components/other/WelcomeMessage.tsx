import React from "react"

function WelcomeMessage(props) {
  return (
    <div
      style={{
        background: "#5f6ac4",
        padding: "20px 30px 30px",
        flex: 1,
        margin: 10,
        borderRadius: 8,
        color: "white",
        maxWidth: "450px",
      }}
    >
      <h3 style={{ marginBottom: 20, fontWeight: 600, fontSize: 22 }}>
        Helloooo! 🙂
      </h3>
      <p>
        Welcome to our English language platform! We're excited to help you
        improve your English skills and reach your language learning goals. With
        our user-friendly platform, experienced instructors, and engaging
        learning materials, we're confident you'll make great progress on your
        journey to fluency. Let's get started and unlock your potential in
        English!
      </p>
      <br />
      <p>Good luck!</p>
      <img
        src="welcomeImage.svg"
        style={{ width: 400, margin: "auto" }}
        alt=""
      />
    </div>
  )
}

export default WelcomeMessage