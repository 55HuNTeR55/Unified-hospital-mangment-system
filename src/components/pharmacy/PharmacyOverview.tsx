import React, { useMemo } from 'react';
import { StatCard } from '../common/StatCard';
import { MedicineList } from './MedicineList';
import { ShortageAlerts } from './ShortageAlerts';
import { ExpiryWatch } from './ExpiryWatch';
import {
  PHARM,
  PHARM_CRITICAL,
  PHARM_LOW,
  PHARM_EXPIRING,
} from '../../utils/reconciliation';

export const PharmacyOverview: React.FC = () => {
  const sorted = useMemo(
    () => [...PHARM].sort((a, b) => a.daysRemaining - b.daysRemaining),
    []
  );
  const shortages = useMemo(
    () =>
      PHARM.filter((p) => p.status !== 'adequate').sort(
        (a, b) => a.daysRemaining - b.daysRemaining
      ),
    []
  );
  const expiring = useMemo(
    () =>
      PHARM.filter((p) => p.expiryDays <= 30).sort(
        (a, b) => a.expiryDays - b.expiryDays
      ),
    []
  );

  return (
    <>
      <div className="stat-strip" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <StatCard label="Medicines Tracked" value={PHARM.length} />
        <StatCard label="Critical Stock" value={PHARM_CRITICAL} />
        <StatCard label="Low Stock" value={PHARM_LOW} />
        <StatCard label="Expiring ≤30 Days" value={PHARM_EXPIRING} />
      </div>

      <div className="pharm-grid">
        <MedicineList items={sorted} />
        <div className="side-panel-stack">
          <ShortageAlerts shortages={shortages} />
          <ExpiryWatch expiring={expiring} />
        </div>
      </div>
    </>
  );
};
