export type ActionCategory =
  | 'AUTH_LOGIN'
  | 'AUTH_LOGOUT'
  | 'WARD_INSPECT'
  | 'CONFLICT_REVIEW'
  | 'LAB_BOTTLENECK_CHECK'
  | 'PHARMACY_INVENTORY_VIEW'
  | 'SHORTAGE_ALERT_ACK'
  | 'MEDICINE_REORDER_DISPATCH'
  | 'RECORD_RECONCILED';

export interface ActionLedgerEntry {
  id: number;
  txHash: string;
  blockNumber: number;
  userId: string;
  userName: string;
  userRole: string;
  actionType: ActionCategory;
  actionTitle: string;
  targetResource: string;
  details: string;
  timestamp: string;
  gasUsed: number;
  network: string;
  status: 'CONFIRMED' | 'PENDING';
}

export interface AuditFilter {
  search: string;
  actionType: string;
  userId: string;
}
