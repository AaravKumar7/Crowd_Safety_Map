function handleEmergency(type) {
  const responses = {
    unsafe: {
      title: "Unsafe Area Alert",
      steps: [
        "Stay calm and avoid panic.",
        "Move away from the crowd slowly.",
        "Avoid narrow exits and bottlenecks.",
        "Follow official instructions if present."
      ]
    },
    medical: {
      title: "Medical Emergency",
      steps: [
        "Move to a safe and open area.",
        "Call local emergency services immediately.",
        "Seek help from trained people nearby.",
        "Do not give food or drink to the injured person."
      ]
    },
    fire: {
      title: "Fire Emergency",
      steps: [
        "Move away from smoke and fire immediately.",
        "Cover your nose and mouth with cloth.",
        "Use stairs instead of elevators.",
        "Exit the building calmly if possible."
      ]
    }
  };

  const responseBox = document.getElementById("emergency-response");
  const data = responses[type];

  responseBox.innerHTML = `
    <h4>${data.title}</h4>
    <ul>
      ${data.steps.map(step => `<li>${step}</li>`).join("")}
    </ul>
    <small>
      ⚠️ This guidance is advisory only and does not replace official emergency services.
    </small>
  `;
}
