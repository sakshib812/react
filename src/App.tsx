import { useState } from 'react';
import './App.css';

export default function App() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="container">
      <div className="card">
        <div className="badge">Framework 02 / 14</div>
        <h1>SecureShield Test Website - React (TSX / JSX)</h1>
        <p className="subtitle">Modern React 18+ Vite Project Structure with Hooks & State.</p>

        <div className="meta-grid">
          <div className="meta-item">
            <span className="label">Framework Mode:</span>
            <span className="value">React 18 Concurrent createRoot</span>
          </div>
          <div className="meta-item">
            <span className="label">Interactions:</span>
            <span className="value highlight">{clickCount} Clicks</span>
          </div>
          <div className="meta-item">
            <span className="label">Integrity Status:</span>
            <span className="value success">VERIFIED_SECURE</span>
          </div>
        </div>

        <button className="btn" onClick={() => setClickCount(c => c + 1)}>
          Test Interactive Event (Trigger Action)
        </button>

        {/* SecureShield React Context Hook Integration Anchor */}
        <div className="secureshield-status-box">
          <h3>🛡️ SecureShield Protection Status</h3>
          <p>Hook ready: <code>useSecureShield()</code> context provider wraps this component tree.</p>
        </div>
      </div>
    </div>
  );
}
