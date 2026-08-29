# 🏥 Unified Hospital Operations & Decentralized Action Audit Ledger

A modern, high-performance Hospital Management & Clinical Operations dashboard built with **React**, **TypeScript**, and **Vite**, featuring an immutable **Solidity Smart Contract** (`HospitalAuditLedger.sol`) for auditing all management actions on-chain.

---

## 🚀 Key Features

- **Multi-Source Clinical Reconciliation**:
  - Automatically reconciles Hospital Information System (HIS) records, manual ward bed sheets, and laboratory logs.
  - Automatically resolves duplicate records and flags discrepancies for clinical staff confirmation.
- **Hospital Operations View**:
  - Inpatient ward drill-downs (General Medicine, Surgery, ICU, Pediatrics).
  - Visual bed occupancy grid with conflict badges and hover tooltips.
  - Pending lab order bottleneck monitoring and wait-time calculation.
- **Pharmacy & Formulary Inventory**:
  - Real-time stock tracking with days-remaining forecasting.
  - Automated shortage alerts and suggested reorder buffer calculations.
  - 30-day medication expiry watch.
- **Hospital Management Authentication**:
  - Secure login portal with role-based presets for Hospital Admin, Chief Medical Officer, Pharmacy Director, and Lead Nurse.
- **Solidity Smart Contract Audit Ledger (`HospitalAuditLedger.sol`)**:
  - Immutable decentralized action ledger tracking logins, ward inspections, and medication audits.
  - Indexed events, pagination, and fast querying by User ID and Target Resource.
  - In-app live transaction ledger viewer with block heights and transaction hashes.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Vanilla CSS Design System
- **Typography**: Space Grotesk, Inter, IBM Plex Mono
- **Smart Contracts**: Solidity (^0.8.20)

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd hospital-managment
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 🔑 Demo Management Credentials

| Name | Role | User ID | Password |
| :--- | :--- | :--- | :--- |
| **Dr. Arthur Vance** | Hospital Operations Director | `admin_ops` | `admin123` |
| **Dr. Elena Rostova** | Chief Medical Officer | `cmo_elena` | `cmo123` |
| **Marcus Chen, PharmD** | Head of Pharmacy | `pharm_marcus` | `pharm123` |
| **Priya Sharma, RN** | Inpatient Ward Supervisor | `nurse_sup_priya` | `ward123` |

---

## 📜 Smart Contract

The Solidity smart contract source is located in [`contracts/HospitalAuditLedger.sol`](contracts/HospitalAuditLedger.sol).
It can be deployed to any EVM-compatible blockchain (Ethereum, Polygon, Arbitrum, Sepolia, Hardhat, Foundry, or Remix).

---

## 📄 License

MIT
