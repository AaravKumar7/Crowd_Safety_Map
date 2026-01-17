import { useState } from "react";
import EmergencyPanel from "./EmergencyPanel";
import { getEmergencyResponse } from "./ai/emergencyEngine";

function App() {
  const [response, setResponse] = useState(null);

  function handleSelect(type) {
    const result = getEmergencyResponse(type);
    setResponse(result);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Crowd Safety Map – Emergency Assistant</h2>

      <EmergencyPanel onSelect={handleSelect} />

      {response && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h4>{response.title}</h4>
          <ul>
            {response.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
          <small>{response.disclaimer}</small>
        </div>
      )}
    </div>
  );
}

export default App;
