import React from 'react';
import { DerivedPharmacyItem } from '../../types/hospital';

interface ShortageAlertsProps {
  shortages: DerivedPharmacyItem[];
}

export const ShortageAlerts: React.FC<ShortageAlertsProps> = ({ shortages }) => {
  return (
    <div className="panel">
      <h4>Shortage alerts — most urgent first</h4>
      {shortages.length ? (
        shortages.map((p) => (
          <div key={p.name} className="reorder-item">
            <div className="ri-top">
              <span>{p.name}</span>
              <span
                className="num"
                style={{
                  color: p.status === 'critical' ? 'var(--critical)' : 'var(--warn)',
                }}
              >
                {p.daysRemaining.toFixed(1)}d left
              </span>
            </div>
            <div className="ri-sub">
              Suggested reorder: <b className="num">{p.reorderQty}</b> {p.unit} (brings
              to ~2 weeks buffer)
            </div>
          </div>
        ))
      ) : (
        <div className="empty-note">No shortages — all stock levels adequate.</div>
      )}
    </div>
  );
};
