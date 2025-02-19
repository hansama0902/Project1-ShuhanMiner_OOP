/**
 * @class MonitoringSystem
 * @description Manages and monitors mining machines.
 * 
 * Implements:
 * - **Singleton Pattern**: Ensures only one instance manages all mining machines.
 * - **Encapsulation**: Uses private fields to protect data integrity.
 */
export default class MonitoringSystem {
    static #instance; // Private static instance for Singleton

    #miningMachines;
    #faultType;
    #firmwareVersion;
    #overheatedMachines;

    /**
     * Constructs the monitoring system.
     * Ensures only one instance exists (Singleton Pattern).
     */
    constructor() {
        if (!MonitoringSystem.#instance) {
            this.#miningMachines = [];
            this.#faultType = null; // Default: No faults
            this.#firmwareVersion = "v1.0.0"; // Default firmware version
            this.#overheatedMachines = [];
            MonitoringSystem.#instance = this;
        }
        return MonitoringSystem.#instance;
    }
    /**
     * Retrieves all monitored mining machines.
     * @returns {Array} - List of all mining machines.
     */
    getMiningMachines() {
        return this.#miningMachines;
    }
    /**
     * Retrieves all overheated mining machines.
     * @returns {Array} - List of overheated mining machines.
     */
    getOverheatedMachines() {
        return this.#overheatedMachines;
    }

    /**
     * Adds a mining machine to monitoring.
     * @param {Object} machine - The mining machine to be monitored.
     * @returns {void}
     */
    addMachine(machine) {
        if (!this.#miningMachines.some(m => m.ipAddress === machine.ipAddress)) {
            this.#miningMachines.push(machine);
        } else {
            console.log(`Machine with IP ${machine.ipAddress} is already in the system.`);
        }
    }

    /**
     * Monitors temperature and updates overheated machines.
     * @returns {void}
     */
    monitorTemperature() {
        this.#overheatedMachines = this.#miningMachines.filter(machine => machine.temperature > 80);
        if (this.#overheatedMachines.length > 0) {
            console.log(`⚠ Warning: ${this.#overheatedMachines.length} machines are overheating!`);
        }
    }

   /**
     * Diagnoses machine faults and sets the fault type.
     * @returns {void}
     */
    faultDiagnosis() {
        const faultyMachines = this.#miningMachines.filter(machine => machine.status === "Failed");
        if (faultyMachines.length > 0) {
            this.#faultType = "Hardware Failure"; // Example fault type
            console.log(`Detected ${faultyMachines.length} machines with faults. Fault Type: ${this.#faultType}`);
        } else {
            this.#faultType = null;
        }
    }

   /**
     * Updates the firmware for all mining machines.
     * @param {string} newVersion - The new firmware version.
     * @returns {void}
     */
    firmwareUpdate(newVersion) {
        if (typeof newVersion !== "string" || !newVersion.trim()) {
            console.error("Invalid firmware version provided.");
            return;
        }
        if (this.#firmwareVersion === newVersion) {
            console.log(`Firmware is already up-to-date (version: ${newVersion}).`);
            return;
        }
        console.log(`Updating firmware to version ${newVersion}...`);
    }
    /**
     * 
     * @returns {Array} - List of all mining machines.
     */
    getMachines() {
        return this.#miningMachines;
    }
    /**
     * 
     *  
     */
    clearMachines() {
        this.#miningMachines = [];
    }   
}

