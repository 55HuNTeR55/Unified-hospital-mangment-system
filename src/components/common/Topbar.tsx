import React from 'react';
import { ActiveTab } from '../../types/hospital';
import { useAuth } from '../../context/AuthContext';

interface TopbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Topbar: React.FC<TopbarProps> = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();

  return (
    <div className="topbar">
      <div className="brandmark">
        <span className="dot"></span>
        <div>
          <h1>Unified Ops View</h1>
          <div className="sub">
            Reconciled from HIS, lab log &amp; bed sheet — one view, no manual compilation
          </div>
        </div>
      </div>

      <div className="topbar-right">
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'hospital' ? 'active' : ''}`}
            onClick={() => onTabChange('hospital')}
            type="button"
          >
            Hospital Ops
          </button>
          <button
            className={`tab-btn ${activeTab === 'pharmacy' ? 'active' : ''}`}
            onClick={() => onTabChange('pharmacy')}
            type="button"
          >
            Pharmacy
          </button>
          <button
            className={`tab-btn ${activeTab === 'ledger' ? 'active' : ''}`}
            onClick={() => onTabChange('ledger')}
            type="button"
          >
            Audit Ledger (Solidity)
          </button>
        </div>

        {user && (
          <div className="user-profile-badge">
            <span className="user-avatar">{user.avatarInitials}</span>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.roleTitle}</span>
            </div>
            <button
              type="button"
              className="logout-btn"
              onClick={logout}
              title="Log out from management session"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
