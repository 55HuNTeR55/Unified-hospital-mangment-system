import React, { useState, useEffect } from 'react';
import { ActiveTab, ActiveView } from './types/hospital';
import { RECONCILED } from './utils/reconciliation';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './components/auth/LoginPage';
import { Topbar } from './components/common/Topbar';
import { DataHealthStrip } from './components/common/DataHealthStrip';
import { HospitalOverview } from './components/hospital/HospitalOverview';
import { WardDetail } from './components/hospital/WardDetail';
import { PharmacyOverview } from './components/pharmacy/PharmacyOverview';
import { AuditLedgerView } from './components/ledger/AuditLedgerView';

const MainDashboard: React.FC = () => {
  const { isAuthenticated, logAction } = useAuth();
  const [tab, setTab] = useState<ActiveTab>('hospital');
  const [view, setView] = useState<ActiveView>('overview');
  const [selectedWardId, setSelectedWardId] = useState<string | null>(null);

  const handleTabChange = (newTab: ActiveTab) => {
    setTab(newTab);
    setView('overview');
    setSelectedWardId(null);

    if (newTab === 'pharmacy') {
      logAction(
        'PHARMACY_INVENTORY_VIEW',
        'Pharmacy Formulary & Inventory Inspection',
        'PHARMACY_CENTRAL',
        'Reviewed drug stock levels, shortage alerts, and 30-day expiry watch.'
      );
    }
  };

  const handleSelectWard = (wardId: string) => {
    setSelectedWardId(wardId);
    setView('ward');

    const ward = RECONCILED.find((w) => w.id === wardId);
    if (ward) {
      logAction(
        'WARD_INSPECT',
        `Ward Inpatient & Bed Matrix Inspection: ${ward.name}`,
        `WARD_${ward.id}`,
        `Inspected ${ward.name} (${ward.id}). Occupancy: ${ward.occupied}/${ward.beds.length} beds (${ward.occupancyPct}%). ${ward.conflicts.length} conflict(s) reviewed.`
      );
    }
  };

  const handleBackToOverview = () => {
    setSelectedWardId(null);
    setView('overview');
  };

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [tab, view, selectedWardId]);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const selectedWard = selectedWardId
    ? RECONCILED.find((w) => w.id === selectedWardId)
    : null;

  return (
    <div id="app">
      <Topbar activeTab={tab} onTabChange={handleTabChange} />
      <DataHealthStrip />

      {tab === 'ledger' ? (
        <AuditLedgerView />
      ) : tab === 'pharmacy' ? (
        <PharmacyOverview />
      ) : view === 'ward' && selectedWard ? (
        <WardDetail ward={selectedWard} onBack={handleBackToOverview} />
      ) : (
        <HospitalOverview onSelectWard={handleSelectWard} />
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainDashboard />
    </AuthProvider>
  );
};

export default App;
