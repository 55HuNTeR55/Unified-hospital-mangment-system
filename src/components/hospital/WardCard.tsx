import React from 'react';
import { ReconciledWard } from '../../types/hospital';
import { occColor } from '../../utils/formatters';

interface WardCardProps {
  ward: ReconciledWard;
  onSelectWard: (wardId: string) => void;
}

export const WardCard: React.FC<WardCardProps> = ({ ward, onSelectWard }) => {
  const color = occColor(ward.occupancyPct);
  const reviewConflicts = ward.conflicts.filter((c) => c.severity === 'review');
  const hasReview = reviewConflicts.length > 0;
  const hasResolved = ward.conflicts.some((c) => c.severity === 'resolved');

  return (
    <button
      className="ward-card"
      onClick={() => onSelectWard(ward.id)}
      type="button"
    >
      <div className="wc-top">
        <div>
          <h3>{ward.name}</h3>
          <div className="wc-sub">
            {ward.id} · Ward {ward.id}
          </div>
        </div>
        {hasReview ? (
          <span className="flag-badge crit">
            ⚑ {reviewConflicts.length} needs review
          </span>
        ) : hasResolved ? (
          <span className="flag-badge">{ward.conflicts.length} auto-resolved</span>
        ) : null}
      </div>

      <div className="occ-row">
        <span className="big num">
          {ward.occupied}
          <span style={{ color: 'var(--ink-faint)', fontWeight: 500 }}>
            /{ward.beds.length}
          </span>
        </span>
        <span className="pct">beds occupied · {ward.occupancyPct}%</span>
      </div>

      <div className="bar-track">
        <div
          className="bar-fill"
          style={{ width: `${ward.occupancyPct}%`, background: color }}
        />
      </div>

      <div className="wc-meta">
        <span>
          <b className="num">{ward.doctors}</b> doctors
        </span>
        <span>
          <b className="num">{ward.nurses}</b> nurses
        </span>
        <span>
          <b className="num">{ward.bottlenecks.length}</b> pending labs
        </span>
      </div>
    </button>
  );
};
