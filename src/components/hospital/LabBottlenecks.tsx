import React from 'react';
import { Bottleneck } from '../../types/hospital';
import { fmtTime } from '../../utils/formatters';

interface LabBottlenecksProps {
  bottlenecks: Bottleneck[];
}

export const LabBottlenecks: React.FC<LabBottlenecksProps> = ({ bottlenecks }) => {
  return (
    <div className="panel">
      <h4>Lab bottlenecks — pending results</h4>
      {bottlenecks.length ? (
        bottlenecks.map((b) => {
          const sev =
            b.hrs >= 8
              ? 'var(--critical)'
              : b.hrs >= 4
              ? 'var(--warn)'
              : 'var(--ok)';
          return (
            <div key={b.order} className="bottleneck-item">
              <div className="bi-top">
                <span>
                  {b.patient} — {b.test}
                </span>
                <span className="bi-wait num" style={{ color: sev }}>
                  {b.hrs.toFixed(1)}h
                </span>
              </div>
              <div className="bi-sub">
                Ordered {fmtTime(new Date(b.odt))} · order {b.order}
              </div>
            </div>
          );
        })
      ) : (
        <div className="empty-note">No pending lab orders for this ward.</div>
      )}
    </div>
  );
};
