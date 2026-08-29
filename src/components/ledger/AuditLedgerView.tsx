import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../common/StatCard';
import { fmtTime } from '../../utils/formatters';

export const AuditLedgerView: React.FC = () => {
  const { auditEntries } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [showContractCode, setShowContractCode] = useState(false);

  const filteredEntries = useMemo(() => {
    return auditEntries.filter((entry) => {
      const matchSearch =
        !search ||
        entry.txHash.toLowerCase().includes(search.toLowerCase()) ||
        entry.userName.toLowerCase().includes(search.toLowerCase()) ||
        entry.userId.toLowerCase().includes(search.toLowerCase()) ||
        entry.targetResource.toLowerCase().includes(search.toLowerCase()) ||
        entry.details.toLowerCase().includes(search.toLowerCase()) ||
        entry.actionTitle.toLowerCase().includes(search.toLowerCase());

      const matchUser = selectedUser === 'ALL' || entry.userId === selectedUser;
      const matchCategory =
        selectedCategory === 'ALL' || entry.actionType === selectedCategory;

      return matchSearch && matchUser && matchCategory;
    });
  }, [auditEntries, search, selectedUser, selectedCategory]);

  const uniqueUsers = useMemo(() => {
    const map = new Map<string, string>();
    auditEntries.forEach((e) => map.set(e.userId, e.userName));
    return Array.from(map.entries());
  }, [auditEntries]);

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(auditEntries.map((e) => e.actionType)));
  }, [auditEntries]);

  const getActionBadgeClass = (category: string) => {
    switch (category) {
      case 'AUTH_LOGIN':
      case 'RECORD_RECONCILED':
        return 'ci-tag resolved';
      case 'AUTH_LOGOUT':
      case 'SHORTAGE_ALERT_ACK':
        return 'ci-tag review';
      case 'MEDICINE_REORDER_DISPATCH':
      case 'CONFLICT_REVIEW':
        return 'flag-badge crit';
      default:
        return 'flag-badge';
    }
  };

  return (
    <div className="audit-ledger-container">
      <div className="stat-strip" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <StatCard label="Ledger Entries" value={auditEntries.length} />
        <StatCard
          label="Latest Block"
          value={`#${auditEntries[0]?.blockNumber || 19842500}`}
        />
        <StatCard label="Smart Contract" value="EVM Active" />
        <StatCard label="Immutable Status" value="100% Verified" />
      </div>

      <div className="panel" style={{ marginBottom: '20px' }}>
        <div className="ledger-header-row">
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '18px' }}>
              Solidity Action Ledger &amp; Immutable Audit Trail
            </h3>
            <div style={{ fontSize: '12.5px', color: 'var(--ink-muted)' }}>
              Contract: <code>HospitalAuditLedger.sol</code> · Tracked across all management sessions
            </div>
          </div>
          <button
            type="button"
            className="tab-btn"
            style={{
              background: showContractCode ? 'var(--brand)' : 'var(--surface-alt)',
              color: showContractCode ? '#fff' : 'var(--ink)',
              fontSize: '12px',
              padding: '6px 14px',
            }}
            onClick={() => setShowContractCode(!showContractCode)}
          >
            {showContractCode ? 'Hide Contract Source' : 'View Solidity Smart Contract'}
          </button>
        </div>

        {showContractCode && (
          <div className="solidity-preview">
            <div className="solidity-preview-head">
              <span>contracts/HospitalAuditLedger.sol (Solidity ^0.8.20)</span>
            </div>
            <pre className="solidity-code">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HospitalAuditLedger {
    struct ActionRecord {
        uint256 id;
        string userId;
        string userRole;
        string actionType;
        string targetResource;
        string details;
        uint256 timestamp;
        address recorder;
    }

    ActionRecord[] private records;
    mapping(string => uint256[]) private userActionIds;

    event ActionLogged(
        uint256 indexed id,
        string indexed userId,
        string actionType,
        string targetResource,
        uint256 timestamp,
        address indexed recorder
    );

    function logAction(
        string calldata userId,
        string calldata userRole,
        string calldata actionType,
        string calldata targetResource,
        string calldata details
    ) external returns (uint256 recordId) {
        recordId = records.length;
        records.push(ActionRecord(recordId, userId, userRole, actionType, targetResource, details, block.timestamp, msg.sender));
        userActionIds[userId].push(recordId);
        emit ActionLogged(recordId, userId, actionType, targetResource, block.timestamp, msg.sender);
    }
}`}
            </pre>
          </div>
        )}
      </div>

      <div className="ledger-filter-bar">
        <input
          type="text"
          className="ledger-search-input"
          placeholder="Filter by user, action, resource, or 0x hash..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="ledger-select"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="ALL">All Hospital Users</option>
          {uniqueUsers.map(([id, name]) => (
            <option key={id} value={id}>
              {name} ({id})
            </option>
          ))}
        </select>

        <select
          className="ledger-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="ALL">All Action Categories</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="med-list" style={{ overflowX: 'auto' }}>
        <div
          className="med-row head"
          style={{ gridTemplateColumns: '0.8fr 1.2fr 1fr 1.2fr 2fr 1.4fr' }}
        >
          <span>Block &amp; ID</span>
          <span>Timestamp</span>
          <span>User / Staff</span>
          <span>Action Category</span>
          <span>Target &amp; Details</span>
          <span>Tx Hash</span>
        </div>

        {filteredEntries.length ? (
          filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="med-row"
              style={{
                gridTemplateColumns: '0.8fr 1.2fr 1fr 1.2fr 2fr 1.4fr',
                alignItems: 'flex-start',
              }}
            >
              <div>
                <span className="num" style={{ fontWeight: 700, color: 'var(--brand)' }}>
                  #{entry.id}
                </span>
                <div style={{ fontSize: '11px', color: 'var(--ink-faint)' }}>
                  Blk {entry.blockNumber}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '12px', fontWeight: 600 }}>
                  {fmtTime(new Date(entry.timestamp))}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>
                  Gas: {entry.gasUsed.toLocaleString()}
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 600, fontSize: '12.5px' }}>{entry.userName}</div>
                <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>
                  <code>{entry.userId}</code>
                </div>
              </div>

              <div>
                <span className={getActionBadgeClass(entry.actionType)}>
                  {entry.actionType}
                </span>
              </div>

              <div>
                <div style={{ fontWeight: 600, fontSize: '12.5px', marginBottom: '2px' }}>
                  {entry.actionTitle}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--ink-muted)', marginBottom: '3px' }}>
                  Resource: <b>{entry.targetResource}</b>
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--ink)' }}>{entry.details}</div>
              </div>

              <div>
                <span
                  className="tx-hash-badge"
                  title={entry.txHash}
                  onClick={() => navigator.clipboard?.writeText(entry.txHash)}
                >
                  {entry.txHash.slice(0, 8)}...{entry.txHash.slice(-6)}
                </span>
                <div style={{ fontSize: '10.5px', color: 'var(--ok)', marginTop: '3px' }}>
                  ✓ {entry.status}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-note" style={{ padding: '24px', textAlign: 'center' }}>
            No ledger records match the selected search or filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};
