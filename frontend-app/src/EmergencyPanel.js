function EmergencyPanel({ onSelect }) {
  return (
    <div>
      <h3>Emergency Assistance</h3>

      <button onClick={() => onSelect("unsafe")}>Unsafe Area</button>
      <br /><br />

      <button onClick={() => onSelect("medical")}>Medical Emergency</button>
      <br /><br />

      <button onClick={() => onSelect("fire")}>Fire Emergency</button>
    </div>
  );
}

export default EmergencyPanel;
