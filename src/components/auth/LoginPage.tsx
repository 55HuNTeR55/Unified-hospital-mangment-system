import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { HOSPITAL_USERS } from '../../data/users';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = login(userId, password);
      setIsLoading(false);
      if (!res.success) {
        setError(res.error || 'Authentication failed');
      }
    }, 200);
  };

  const handleQuickLogin = (id: string, pass: string) => {
    setUserId(id);
    setPassword(pass);
    setError(null);
    login(id, pass);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-brandmark">
            <span className="dot"></span>
            <h2>Unified Ops Management</h2>
          </div>
          <p className="login-sub">
            Authenticated Access &amp; Decentralized Action Audit Ledger
          </p>
          <div className="contract-badge">
            <span className="chain-dot"></span>
            <span>Solidity Smart Contract: <b>HospitalAuditLedger.sol</b></span>
          </div>
        </div>

        {error && (
          <div className="login-error-banner">
            <span>⚠️ {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="userId">User ID or Staff Email</label>
            <input
              id="userId"
              type="text"
              className="login-input"
              placeholder="e.g. admin_ops or cmo_elena"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Management Password</label>
            <input
              id="password"
              type="password"
              className="login-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="login-submit-btn"
            disabled={isLoading || !userId || !password}
          >
            {isLoading ? 'Authenticating & Verifying...' : 'Sign In to Unified Console →'}
          </button>
        </form>

        <div className="demo-accounts-section">
          <div className="demo-title">Quick Demo Login (Hospital Management Roles)</div>
          <div className="demo-pills-grid">
            {HOSPITAL_USERS.map((acc) => (
              <button
                key={acc.user.id}
                type="button"
                className="demo-account-pill"
                onClick={() => handleQuickLogin(acc.user.id, acc.passwordHash)}
              >
                <div className="demo-pill-top">
                  <span className="demo-avatar">{acc.user.avatarInitials}</span>
                  <div className="demo-names">
                    <span className="demo-user-name">{acc.user.name}</span>
                    <span className="demo-user-role">{acc.user.roleTitle}</span>
                  </div>
                </div>
                <div className="demo-creds">
                  ID: <code>{acc.user.id}</code> · Pass: <code>{acc.passwordHash}</code>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="login-footer">
          <span>🔒 All sessions &amp; actions are cryptographically hashed and logged to the ledger.</span>
        </div>
      </div>
    </div>
  );
};
