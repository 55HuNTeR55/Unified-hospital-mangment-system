export const HOSPITAL_AUDIT_LEDGER_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "string",
        "name": "userId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "actionType",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "targetResource",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "recorder",
        "type": "address"
      }
    ],
    "name": "ActionLogged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "recorder",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isAuthorized",
        "type": "bool"
      }
    ],
    "name": "RecorderAuthorizationChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "userId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "userRole",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "actionType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "targetResource",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "details",
        "type": "string"
      }
    ],
    "name": "logAction",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "recordId",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "getAction",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "userRole",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "actionType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "targetResource",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "details",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "recorder",
            "type": "address"
          }
        ],
        "internalType": "struct HospitalAuditLedger.ActionRecord",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalActions",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "userId",
        "type": "string"
      }
    ],
    "name": "getUserActionIds",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "count",
        "type": "uint256"
      }
    ],
    "name": "getRecentActions",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "userRole",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "actionType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "targetResource",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "details",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "recorder",
            "type": "address"
          }
        ],
        "internalType": "struct HospitalAuditLedger.ActionRecord[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
