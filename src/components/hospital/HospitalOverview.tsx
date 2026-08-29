import React from 'react';
import { StatCard } from '../common/StatCard';
import { WardCard } from './WardCard';
import { TOTALS, RECONCILED } from '../../utils/reconciliation';

interface HospitalOverviewProps {
  onSelectWard: (wardId: string) => void;
}

export const HospitalOverview: React.FC<HospitalOverviewProps> = ({ onSelectWard }) => {
  return (
    <>
      <div className="stat-strip">
        <StatCard label="Doctors" value={TOTALS.doctors} />
        <StatCard label="Nurses" value={TOTALS.nurses} />
        <StatCard label="Support Staff" value={TOTALS.staff} />
        <StatCard label="Beds Occupied" value={TOTALS.occupied} of={TOTALS.beds} />
        <StatCard label="Patients" value={TOTALS.occupied} />
      </div>

      <div className="section-title">Wards</div>

      <div className="ward-grid">
        {RECONCILED.map((ward) => (
          <WardCard key={ward.id} ward={ward} onSelectWard={onSelectWard} />
        ))}
      </div>
    </>
  );
};
