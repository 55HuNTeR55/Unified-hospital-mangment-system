import React from 'react';
import { Conflict } from '../../types/hospital';

interface ConflictsPanelProps {
  conflicts: Conflict[];
}

export const ConflictsPanel: React.FC<ConflictsPanelProps> = ({ conflicts }) => {
  return (
    <div className="panel">
      <h4>Conflicts &amp; resolutions</h4>
      {conflicts.length ? (
        conflicts.map((c, idx) => (
          <div key={idx} className="conflict-item">
            <span className={`ci-tag ${c.severity}`}>
              {c.severity === 'resolved' ? 'Resolved' : 'Review'}
            </span>
            <span className="ci-text">
              {c.bed && <b>{c.bed} — </b>}
              <span dangerouslySetInnerHTML={{ __html: c.text }} />
            </span>
          </div>
        ))
      ) : (
        <div className="empty-note">No conflicts detected for this ward today.</div>
      )}
    </div>
  );
};
