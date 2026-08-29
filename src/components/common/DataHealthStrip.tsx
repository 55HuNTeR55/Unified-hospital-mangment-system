import React from 'react';
import { NOW } from '../../data/hospitalData';
import { fmtTime } from '../../utils/formatters';
import {
  TOTAL_CONFLICTS,
  RESOLVED_CONFLICTS,
  REVIEW_CONFLICTS,
} from '../../utils/reconciliation';

export const DataHealthStrip: React.FC = () => {
  return (
    <div className="health">
      <span className="seg">
        <span className="pulse"></span> <b>Live reconciled</b> as of {fmtTime(NOW)}
      </span>
      <span className="sep"></span>
      <span className="seg">{TOTAL_CONFLICTS} conflicts found across sources today</span>
      <span className="sep"></span>
      <span className="seg" style={{ color: 'var(--ok)' }}>
        {RESOLVED_CONFLICTS} auto-resolved
      </span>
      <span className="sep"></span>
      <span className="seg" style={{ color: 'var(--warn)' }}>
        {REVIEW_CONFLICTS} flagged for staff review
      </span>
    </div>
  );
};
