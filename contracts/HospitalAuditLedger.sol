// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title HospitalAuditLedger
 * @dev Decentralized immutable audit trail for hospital management actions.
 * Tracks user logins, ward inspections, conflict resolution reviews, medication reorders, and clinical updates.
 */
contract HospitalAuditLedger {
    // Contract Owner / System Admin
    address public owner;

    // Authorized recorders (backend servers, oracle nodes, or authorized staff addresses)
    mapping(address => bool) public isAuthorizedRecorder;

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

    // Array storing all audit records chronologically
    ActionRecord[] private records;

    // Mapping from userId to array of record IDs for fast querying
    mapping(string => uint256[]) private userActionIds;

    // Mapping from targetResource to array of record IDs
    mapping(string => uint256[]) private resourceActionIds;

    // Events
    event ActionLogged(
        uint256 indexed id,
        string indexed userId,
        string actionType,
        string targetResource,
        uint256 timestamp,
        address indexed recorder
    );

    event RecorderAuthorizationChanged(address indexed recorder, bool isAuthorized);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "HospitalAuditLedger: caller is not the owner");
        _;
    }

    modifier onlyAuthorized() {
        require(
            msg.sender == owner || isAuthorizedRecorder[msg.sender],
            "HospitalAuditLedger: caller is not authorized to log actions"
        );
        _;
    }

    constructor() {
        owner = msg.sender;
        isAuthorizedRecorder[msg.sender] = true;
        emit RecorderAuthorizationChanged(msg.sender, true);
    }

    /**
     * @notice Set authorization for a recorder address
     * @param recorder Address to authorize or revoke
     * @param authorized True to authorize, False to revoke
     */
    function setAuthorizedRecorder(address recorder, bool authorized) external onlyOwner {
        require(recorder != address(0), "Invalid recorder address");
        isAuthorizedRecorder[recorder] = authorized;
        emit RecorderAuthorizationChanged(recorder, authorized);
    }

    /**
     * @notice Transfer ownership of the contract
     * @param newOwner Address of the new owner
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner is zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    /**
     * @notice Record a new management action into the ledger
     * @param userId Unique identifier of the hospital staff/management user
     * @param userRole Role of the user (e.g., ADMIN, CMO, PHARMACY_HEAD, NURSE_LEAD)
     * @param actionType Category of action (e.g., LOGIN, VIEW_WARD, REVIEW_CONFLICT, REORDER_MED)
     * @param targetResource Specific entity impacted (e.g., WARD_GM, BED_GM-07, MED_AMOXICILLIN)
     * @param details Additional context, metadata or JSON payload
     * @return recordId Unique incremental ID of the logged action
     */
    function logAction(
        string calldata userId,
        string calldata userRole,
        string calldata actionType,
        string calldata targetResource,
        string calldata details
    ) external onlyAuthorized returns (uint256 recordId) {
        require(bytes(userId).length > 0, "User ID cannot be empty");
        require(bytes(actionType).length > 0, "Action type cannot be empty");

        recordId = records.length;
        ActionRecord memory newRecord = ActionRecord({
            id: recordId,
            userId: userId,
            userRole: userRole,
            actionType: actionType,
            targetResource: targetResource,
            details: details,
            timestamp: block.timestamp,
            recorder: msg.sender
        });

        records.push(newRecord);
        userActionIds[userId].push(recordId);
        
        if (bytes(targetResource).length > 0) {
            resourceActionIds[targetResource].push(recordId);
        }

        emit ActionLogged(
            recordId,
            userId,
            actionType,
            targetResource,
            block.timestamp,
            msg.sender
        );
    }

    /**
     * @notice Get total number of actions recorded in the ledger
     */
    function getTotalActions() external view returns (uint256) {
        return records.length;
    }

    /**
     * @notice Fetch a single action record by its ID
     * @param id The record index
     */
    function getAction(uint256 id) external view returns (ActionRecord memory) {
        require(id < records.length, "Record ID out of bounds");
        return records[id];
    }

    /**
     * @notice Get all action record IDs for a specific user
     * @param userId User identifier to filter by
     */
    function getUserActionIds(string calldata userId) external view returns (uint256[] memory) {
        return userActionIds[userId];
    }

    /**
     * @notice Get all action record IDs for a specific resource
     * @param targetResource Resource identifier to filter by
     */
    function getResourceActionIds(string calldata targetResource) external view returns (uint256[] memory) {
        return resourceActionIds[targetResource];
    }

    /**
     * @notice Fetch the most recent N records from the ledger (for live dashboard feeds)
     * @param count Number of recent records to retrieve
     */
    function getRecentActions(uint256 count) external view returns (ActionRecord[] memory) {
        uint256 total = records.length;
        if (count > total) {
            count = total;
        }

        ActionRecord[] memory recent = new ActionRecord[](count);
        for (uint256 i = 0; i < count; i++) {
            recent[i] = records[total - 1 - i];
        }
        return recent;
    }

    /**
     * @notice Fetch a paginated slice of records
     * @param offset Starting index
     * @param limit Maximum records to return
     */
    function getActionsPaginated(uint256 offset, uint256 limit)
        external
        view
        returns (ActionRecord[] memory paginatedRecords, uint256 total)
    {
        total = records.length;
        if (offset >= total) {
            return (new ActionRecord[](0), total);
        }

        uint256 to = offset + limit;
        if (to > total) {
            to = total;
        }

        uint256 size = to - offset;
        paginatedRecords = new ActionRecord[](size);
        for (uint256 i = 0; i < size; i++) {
            paginatedRecords[i] = records[offset + i];
        }
    }
}
