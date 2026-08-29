import { ActionCategory, ActionLedgerEntry } from '../types/audit';
import { User } from '../types/auth';

const STORAGE_KEY = 'hospital_audit_ledger_v1';
const INITIAL_BLOCK = 19842500;

function generateTxHash(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  const rand = Array.from({ length: 56 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
  return `0x${hex}${rand}`.slice(0, 66);
}

const SEED_ENTRIES: ActionLedgerEntry[] = [
  {
    id: 1,
    txHash: '0x3a8f9c1b4e2d7a6f5e8c0d3b2a1f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a21',
    blockNumber: INITIAL_BLOCK - 14,
    userId: 'admin_ops',
    userName: 'Dr. Arthur Vance',
    userRole: 'HOSPITAL_ADMIN',
    actionType: 'RECORD_RECONCILED',
    actionTitle: 'System Auto-Reconciliation Engine Run',
    targetResource: 'SYSTEM_GLOBAL',
    details: 'Auto-reconciled HIS admissions against ward sheets; resolved 2 bed discrepancies.',
    timestamp: '2026-08-29T07:15:00',
    gasUsed: 84210,
    network: 'Ethereum Mainnet (EVM Ledger)',
    status: 'CONFIRMED',
  },
  {
    id: 2,
    txHash: '0x9b4c7d2e5f8a1c3b6d9e2f5a8c1b4d7e0f3a6c9b2e5d8a1c4f7b0e3d6a9c2f58',
    blockNumber: INITIAL_BLOCK - 8,
    userId: 'nurse_sup_priya',
    userName: 'Priya Sharma, RN',
    userRole: 'WARD_SUPERVISOR',
    actionType: 'WARD_INSPECT',
    actionTitle: 'Morning Shift Handover & Bed Audit',
    targetResource: 'WARD_GM',
    details: 'Verified 12 bed statuses in General Medicine; acknowledged patient P1008 in GM-11.',
    timestamp: '2026-08-29T08:00:00',
    gasUsed: 52140,
    network: 'Ethereum Mainnet (EVM Ledger)',
    status: 'CONFIRMED',
  },
  {
    id: 3,
    txHash: '0x1c4e7a0d3b6f9c2e5a8d1b4f7e0a3c6d9b2e5f8a1c4d7b0e3a6c9f2e5d8b1a47',
    blockNumber: INITIAL_BLOCK - 3,
    userId: 'pharm_marcus',
    userName: 'Marcus Chen, PharmD',
    userRole: 'PHARMACY_DIRECTOR',
    actionType: 'PHARMACY_INVENTORY_VIEW',
    actionTitle: 'Critical Inventory & Expiry Review',
    targetResource: 'PHARMACY_CENTRAL',
    details: 'Audited 12 medicine formulations; flagged Adrenaline Inj and Insulin Regular.',
    timestamp: '2026-08-29T09:30:00',
    gasUsed: 49830,
    network: 'Ethereum Mainnet (EVM Ledger)',
    status: 'CONFIRMED',
  },
];

class AuditLedgerService {
  private entries: ActionLedgerEntry[] = [];

  constructor() {
    this.loadEntries();
  }

  private loadEntries() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.entries = JSON.parse(stored);
      } else {
        this.entries = [...SEED_ENTRIES];
        this.saveEntries();
      }
    } catch {
      this.entries = [...SEED_ENTRIES];
    }
  }

  private saveEntries() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.entries));
    } catch {
      // ignore storage errors in sandbox environments
    }
  }

  public getEntries(): ActionLedgerEntry[] {
    return [...this.entries];
  }

  public recordAction(
    user: User,
    actionType: ActionCategory,
    actionTitle: string,
    targetResource: string,
    details: string
  ): ActionLedgerEntry {
    const nextId = this.entries.length + 1;
    const nowIso = new Date().toISOString();
    const txHash = generateTxHash(`${user.id}-${actionType}-${nextId}-${nowIso}`);
    const blockNumber = INITIAL_BLOCK + this.entries.length;

    const newEntry: ActionLedgerEntry = {
      id: nextId,
      txHash,
      blockNumber,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      actionType,
      actionTitle,
      targetResource,
      details,
      timestamp: nowIso,
      gasUsed: Math.floor(45000 + Math.random() * 40000),
      network: 'Ethereum Mainnet (EVM Ledger)',
      status: 'CONFIRMED',
    };

    this.entries = [newEntry, ...this.entries];
    this.saveEntries();
    return newEntry;
  }

  public getUserActions(userId: string): ActionLedgerEntry[] {
    return this.entries.filter((e) => e.userId === userId);
  }

  public clearLedger() {
    this.entries = [...SEED_ENTRIES];
    this.saveEntries();
  }
}

export const auditLedger = new AuditLedgerService();
