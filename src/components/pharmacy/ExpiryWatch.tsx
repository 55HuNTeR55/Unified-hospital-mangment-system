import React from 'react';
import { DerivedPharmacyItem } from '../../types/hospital';

interface ExpiryWatchProps {
  expiring: DerivedPharmacyItem[];
}

export const ExpiryWatch: React.FC<ExpiryWatchProps> = ({ expiring }) => {
  return (
    <div className="panel">
      <h4>Expiry watch — next 30 days</h4>
      {expiring.length ? (
        expiring.map((p) => (
          <div key={p.name} className="expiry-item">
            <span>{p.name}</span>
            <span
              className="expiry-days"
              style={{
                color: p.expiryDays <= 10 ? 'var(--critical)' : 'var(--warn)',
              }}
            >
              {p.expiryDays}d
            </span>
          </div>
        ))
      ) : (
        <div className="empty-note">Nothing expiring in the next 30 days.</div>
      )}
    </div>
  );
};
