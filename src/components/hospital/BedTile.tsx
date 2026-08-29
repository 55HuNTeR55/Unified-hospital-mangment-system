import React from 'react';
import { ReconciledBed } from '../../types/hospital';

interface BedTileProps {
  bed: ReconciledBed;
}

export const BedTile: React.FC<BedTileProps> = ({ bed }) => {
  let cls = 'vac';
  let label = 'Vacant';

  if (bed.status === 'occupied') {
    cls = 'occ';
    label = bed.patient || 'Occupied';
  } else if (bed.status === 'needs_review') {
    cls = 'review';
    label = `${bed.patient || 'Unknown'} ?`;
  }

  const hasFlag = bed.flags.length > 0;
  const resolvedOnly = hasFlag && bed.flags.every((f) => f.severity === 'resolved');
  const title = hasFlag
    ? bed.flags.map((f) => f.text.replace(/<[^>]+>/g, '')).join(' ')
    : undefined;

  return (
    <div
      className={`bed-tile ${cls} ${resolvedOnly ? 'resolved-flag' : ''}`}
      title={title}
    >
      <div className="bed-id">{bed.id}</div>
      <div className="bed-status">{label}</div>
      {hasFlag && <div className="flag-dot" />}
    </div>
  );
};
