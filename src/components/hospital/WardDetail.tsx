import React from 'react';
import { ReconciledWard } from '../../types/hospital';
import { occColor } from '../../utils/formatters';
import { BedTile } from './BedTile';
import { LabBottlenecks } from './LabBottlenecks';
import { ConflictsPanel } from './ConflictsPanel';

interface WardDetailProps {
  ward: ReconciledWard;
  onBack: () => void;
}

export const WardDetail: React.FC<WardDetailProps> = ({ ward, onBack }) => {
  const color = occColor(ward.occupancyPct);

  return (
    <>
      <button className="back-btn" onClick={onBack} type="button">
        ← All wards
      </button>

      <div className="detail-head">
        <h2>{ward.name}</h2>
        <span
          className="occ-pill"
          style={{ background: `${color}22`, color: color }}
        >
          {ward.occupied}/{ward.beds.length} occupied · {ward.occupancyPct}%
        </span>
      </div>

      <div className="panel-grid">
        <div className="panel">
          <h4>Beds</h4>
          <div className="bed-grid">
            {ward.beds.map((bed) => (
              <BedTile key={bed.id} bed={bed} />
            ))}
          </div>
        </div>

        <div className="panel">
          <h4>Staff on ward</h4>
          <div className="staff-row">
            <span>Doctors</span>
            <span className="n num">{ward.doctors}</span>
          </div>
          <div className="staff-row">
            <span>Nurses</span>
            <span className="n num">{ward.nurses}</span>
          </div>
          <div className="staff-row">
            <span>Support staff</span>
            <span className="n num">{ward.staff}</span>
          </div>
        </div>
      </div>

      <div className="panel-grid">
        <LabBottlenecks bottlenecks={ward.bottlenecks} />
        <ConflictsPanel conflicts={ward.conflicts} />
      </div>
    </>
  );
};
