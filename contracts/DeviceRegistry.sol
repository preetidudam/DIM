// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title Decentralized IoT Device Identity Registry (DID-IoT)
 * @notice Stores identity information for IoT devices directly on-chain.
 * Owners can register multiple devices, list their devices, or fetch by id.
 */
contract DeviceRegistry {
    /// @dev Structure holding metadata for every registered IoT device.
    struct Device {
        bytes32 deviceId;
        string name;
        address owner;
        uint256 timestamp;
    }

    /// @notice Maps deviceId => Device metadata.
    mapping(bytes32 => Device) private devices;

    /// @notice Maps owner => array of deviceIds they registered.
    mapping(address => bytes32[]) private ownerDevices;

    /// @notice Emitted whenever a new device is registered.
    event DeviceRegistered(bytes32 indexed deviceId, address indexed owner, string name, uint256 timestamp);

    /**
     * @notice Registers a new device using the caller as owner.
     * @param deviceName The human-readable name of the device.
     * @return deviceId The unique identifier derived from caller + deviceName.
     */
    function registerDevice(string calldata deviceName) external returns (bytes32 deviceId) {
        require(bytes(deviceName).length > 0, "Device name required");

        deviceId = keccak256(abi.encodePacked(msg.sender, deviceName));
        require(devices[deviceId].timestamp == 0, "Device already exists");

        Device memory newDevice = Device({
            deviceId: deviceId,
            name: deviceName,
            owner: msg.sender,
            timestamp: block.timestamp
        });

        devices[deviceId] = newDevice;
        ownerDevices[msg.sender].push(deviceId);

        emit DeviceRegistered(deviceId, msg.sender, deviceName, block.timestamp);
    }

    /**
     * @notice Fetch metadata for a given deviceId.
     * @param deviceId The unique device identifier.
     */
    function getDeviceDetails(bytes32 deviceId) external view returns (Device memory) {
        Device memory stored = devices[deviceId];
        require(stored.timestamp != 0, "Device not found");
        return stored;
    }

    /**
     * @notice Returns only the IDs of the devices owned by the provided address.
     * @param owner The address to inspect.
     */
    function getDevicesByOwner(address owner) external view returns (bytes32[] memory) {
        return ownerDevices[owner];
    }

    /**
     * @notice Returns the full Device structs for the message sender.
     */
    function getAllMyDevices() external view returns (Device[] memory) {
        bytes32[] memory ids = ownerDevices[msg.sender];
        Device[] memory result = new Device[](ids.length);

        for (uint256 i = 0; i < ids.length; i++) {
            result[i] = devices[ids[i]];
        }

        return result;
    }
}

